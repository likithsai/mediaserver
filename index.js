//  media server
//  https://www.100ms.live/blog/create-video-streaming-server-nodejs
const express = require("express");
const fs = require("fs");
const cors = require("cors");
const app = express();
const PORT = process.env.port || 8000;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/template/index.html");
});


app.listen(8000, function () {
    console.log(`[info] Mediaserver listening at http://localhost:${PORT}`);
});