//  media server
//  https://www.100ms.live/blog/create-video-streaming-server-nodejs

const express = require("express");
const cors = require("cors");
const fs = require('fs');
const app = express();
const utils = require('./src/utils/utils');
const PORT = process.env.port || 8000;
const videos = [];

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

// app starting point
const startApp = () => {
    app.listen(8000, function () {
        console.log(`Server Listening at`, `\x1b[4mhttp://localhost:${PORT}\x1b[0m`);
        console.log('\x1b[31m%s\x1b[0m', 'Press CNTRL+C to stop server');
    });

    app.get("/", (req, res) => {
        res.sendFile(__dirname + "/template/index.html");
    });
        
    app.get("/videos", (req,res) => {
        res.json(videos);
    });

    app.get("/video/:id", (req, res) => {
        const videoPath = `./public/video.mp4`;
        const videoStat = fs.statSync(videoPath);
        const fileSize = videoStat.size;
        const videoRange = req.headers.range;
        if (videoRange) {
            const parts = videoRange.replace(/bytes=/, "").split("-");
            const start = parseInt(parts[0], 10);
            const end = parts[1] ? parseInt(parts[1], 10) : fileSize-1;
            const chunksize = (end-start) + 1;
            const file = fs.createReadStream(videoPath, {start, end});
            const head = {
                'Content-Range': `bytes ${start}-${end}/${fileSize}`,
                'Accept-Ranges': 'bytes',
                'Content-Length': chunksize,
                'Content-Type': 'video/mp4',
            };
            res.writeHead(206, head);
            file.pipe(res);
        } else {
            const head = {
                'Content-Length': fileSize,
                'Content-Type': 'video/mp4',
            };
            res.writeHead(200, head);
            fs.createReadStream(videoPath).pipe(res);
        }
    });
}

// check if path is passed or not
if(process.argv[2]) {
    console.log('\x1b[36m%s\x1b[0m', "\n:: MEDIASERVER V 1.0 ::");
    console.log("Simple media server for managing videos and photos :)");

    fs.readdirSync(process.argv[2]).forEach(f => {
        videos.push({
            id: '7836743893498',
            name: f,
            path: process.argv[2] + '/' + f,
            size: utils.formatBytes(fs.statSync(process.argv[2] + '/' + f).size)
        });
    });

    startApp();
}

