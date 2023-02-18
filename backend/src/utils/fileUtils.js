//  fileUtils.js
//  utility module for managing files

const fs = require('fs');
const ps = require('path');
const crypto = require('crypto');
const mime = require('mime');
const utils = require('./utils');
const { appConstants } = require('../const/const');
var ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
var ffprobePath = require('@ffprobe-installer/ffprobe').path;
var ffmpeg = require('fluent-ffmpeg');

ffmpeg.setFfmpegPath(ffmpegPath);
ffmpeg.setFfprobePath(ffprobePath);
var temp = [];

const scanFiles = (path) => {
    fs.readdirSync(path).forEach(f => {
        const absPath = ps.join(path, f);
        const fileStat = fs.statSync(absPath);

        if (fileStat.isDirectory()) {
            return scanFiles(absPath);
        } else {
            temp.push({
                id: crypto.randomBytes(5).toString("hex"),
                name: f,
                path: absPath,
                size: utils.formatBytes(fileStat.size),
                mimetype: mime.getType(absPath.split('.')[1]) || null,
                hash: calculateChecksumOfFile(absPath),
                createddate: fileStat.birthtime
            });
        }
    });
    return temp;
}

const fileDir = (file) => {
    return ps.dirname(file);
}

const optimizeVideo = (fileList, params) => {
    fileList.forEach(element => {
        let newFileName = fileDir(element.path) + '/new_' + element.name;

        console.log('Input File: ' + element.path);
        ffmpeg(element.path).addOutputOption([
            '-y',
            '-hide_banner',
            '-v panic',
            '-stats',
            '-c:v libx265',
            '-crf 27',
            '-preset superfast',
            '-vtag hvc1',
            '-c:a copy',
            '-threads 0'
        ]).on('end', function () {
            console.log('File saved in ' + newFileName);

            // if --generate-screenshot param is passed
            if (params.includes(appConstants.GENERATE_SCREENSHOT)) {
                generateScreenshots(element.path);
            }

            // if --delete-original-file is passed
            if (params.includes(appConstants.DELETE_ORIGIN_FILE)) {
                deleteOriginalFile(element.path);
            }
        }).on('error', function (err) {
            console.log('an error happened: ' + err.message);
        }).save(newFileName);
    });
}

const generateScreenshots = (path) => {
    const startTime = '00:00:02',
        gifDuration = 10,
        gifFPS = 40,
        newfileName = fileDir(path) + '/' + calculateChecksumOfFile(path) + '.gif';

    ffmpeg(path)
        .setStartTime(startTime)
        .duration(gifDuration)
        .fps(gifFPS)
        .output(newfileName)
        .on('end', function (err) {
            if (!err) {
                console.log('Screenshot generated')
            }
        })
        .run();
}

const deleteOriginalFile = (path) => {
    return path;
}

const calculateChecksumOfFile = (path) => {
    const file = fs.readFileSync(path);
    return crypto.createHash('sha1').update(file).digest("hex");
}

module.exports = { scanFiles, fileDir, optimizeVideo };