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
const logStr = `\n:date[iso] :remote-addr :method :url :status :res[content-length] :response-time ms\n:user-agent`;
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

    //  get screenshot from video
    app.use("/:id/thumbnail", (req, res) => {
        let filteredFile = videos.filter(obj => obj.id == req.params.id)[0];
        res.status(200).json(filteredFile);
    });

    //  used to stream video files
    app.get("/:id", (req, res) => {
        fileUtil.streamVideoFiles(videos.filter(obj => obj.id == req.params.id)[0].path, res);
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

