//  media server
//  https://www.100ms.live/blog/create-video-streaming-server-nodejs

const express = require("express");
const expressip = require('express-ip');
const cors = require("cors");
const fs = require('fs');
const morgan = require("morgan");
const fileUtil = require('./src/utils/fileUtils');
const path = require("path");
const app = express();
const PORT = process.env.port || 8000;
// const logStr = `:user-agent \n:[date[web]] - :status :remote-addr :method :url HTTP/:http-version :status :res[content-length] - :response-time ms`;
const logStr = `:date[iso] :remote-addr :method :url :status :res[content-length] :response-time ms`;
let videos = [];

app.use(express.json());
app.use(expressip().getIpInfoMiddleware);
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(morgan(logStr));
app.use(morgan(logStr, {
    stream: fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
}));

// app starting point
const startApp = () => {
    app.listen(8000, function () {
        console.log(`Server Listening at`, `\x1b[4mhttp://localhost:${PORT}\x1b[0m`);
        console.log('\x1b[31m%s\x1b[0m', 'Press CNTRL+C to stop server');
    });

    app.get("/", (req, res) => {
        res.sendFile(__dirname + "/template/index.html");
    });

    //  used to scan all the files and optimise the vidoes
    app.get("/info", (req, res) => {
        res.status(200).json(videos);
    });

    app.get("/:id/info", (req, res) => {
        let temp = videos.filter(obj => obj.id == req.params.id)[0];
        res.status(200).json(temp);
    });

    //  used to stream video files
    app.get("/:id", (req, res) => {
        const videoPath = videos.filter(obj => obj.id == req.params.id)[0].path;
        const videoStat = fs.statSync(videoPath);
        const fileSize = videoStat.size;
        const videoRange = req.headers.range;
        if (videoRange) {
            const parts = videoRange.replace(/bytes=/, "").split("-");
            const start = parseInt(parts[0], 10);
            const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
            const chunksize = (end - start) + 1;
            const file = fs.createReadStream(videoPath, { start, end });
            const head = {
                'Content-Range': `bytes ${start}-${end}/${fileSize}`,
                'Accept-Ranges': 'bytes',
                'Content-Length': chunksize,
                'Content-Type': 'video/mp4',
            };
            res.writeHead(206, head).on('error', function (err) {
                console.log('Error writing stream: ', err);
            });
            file.pipe(res).on('error', function (err) {
                console.log('Error streaming files', err);
            });
        } else {
            const head = {
                'Content-Length': fileSize,
                'Content-Type': 'video/mp4',
            };
            res.writeHead(200, head);
            fs.createReadStream(videoPath).pipe(res).on('error', function (err) {
                console.log('Error reading stream', err);
            });
        }
    });
}

// check if path is passed or not
if (process.argv[2]) {
    console.log('\x1b[36m%s\x1b[0m', "\n:: MEDIASERVER V 1.0 ::");
    console.log("Simple media server for managing videos and photos :)");
    videos = fileUtil.scanFiles(process.argv[2]);
    startApp();
} else {
    console.log('Please enter folder path!');
}

