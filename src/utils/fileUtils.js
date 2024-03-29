//  fileUtils.js
//  utility module for managing files

const fs = require('fs');
const ps = require('path');
const crypto = require('crypto');
const utils = require('./utils');
const mime = require('mime');
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
                createddate: fileStat.birthtime.toISOString()
            });
        }
    });
    return temp;
}

const fileDir = (file) => {
    return ps.dirname(file);
}

const streamVideoFiles = (filePath, res) => {
    var stat = fs.statSync(filePath);
    res.writeHead(200, {
        'Content-Type': 'video/mp4',
        'Content-Length': stat.size
    });

    return ffmpeg(filePath)
        .outputOptions(['-movflags isml+frag_keyframe', '-vprofile high'])
        .toFormat('mp4')
        .withAudioCodec('copy')
        .on('progress', function (progress) {
            console.log('Processing: ' + Math.round(progress.percent.toFixed(2)) + '%');
        })
        .on('end', function () {
            console.log('Processing finished !');
        })
        .on('error', function (err, stdout, stderr) {
            console.log('an error happened: ' + err.message);
        })
        .pipe(res, { end: true });

}

const optimizeVideos = async (element) => {
    let newFileName = fileDir(element.path) + '/new_' + element.name,
        videoConvertTime, videoConvertFilesize;
    return new Promise((resolve, reject) => {
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
        ]).on('start', (commandLine) => {
            // console.log(appConstants.FGMAGENTA, 'Converting ' + element.path + ' media file');
        }).on('progress', function (progress) {
            videoConvertTime = progress.timemark;
            videoConvertFilesize = progress.targetSize;

            process.stdout.write(`${ps.basename(element.path)} -->  ${Math.round(progress.percent.toFixed(2))}% (${videoConvertTime})` + '\033[0G');
        }).on('end', function () {
            return resolve(`Optimized file saved in ${newFileName}\nTime: ${videoConvertTime}, Filesize: ${utils.formatBytes(videoConvertFilesize)}`);
        }).on('error', function (err) {
            return reject(err.message)
        }).save(newFileName);
    })
}

const processVideos = async (fileList, params) => {
    for (i = 0; i < fileList.length; i++) {
        await optimizeVideos(fileList[i]).then((msg) => {
            console.log(appConstants.SUCCESS_COLOR, msg);
        }).catch(err => {
            console.log(appConstants.ERROR_COLOR, fileList[i].name + ' --> ' + err.message);
        });
    }
}

const calculateChecksumOfFile = (path) => {
    const file = fs.readFileSync(path);
    return crypto.createHash('sha1').update(file).digest("hex");
}

module.exports = { scanFiles, processVideos, streamVideoFiles };