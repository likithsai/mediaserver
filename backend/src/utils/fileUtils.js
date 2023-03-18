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
            console.log('ffmpeg stdout: ' + stdout);
            console.log('ffmpeg stderr: ' + stderr);
        })
        .pipe(res, { end: true });

}

const optimizeVideos = async (element, params) => {
    let newFileName = fileDir(element.path) + '/new_' + element.name;
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
            // console.log(appConstants.WARN_COLOR, ps.basename(element.path), " --> [" + Math.round(progress.percent.toFixed(2)) + '%]');
            process.stdout.write(ps.basename(element.path) + ' --> ' + Math.round(progress.percent.toFixed(2)) + '%\033[0G');
        }).on('end', function () {
            console.log(appConstants.SUCCESS_COLOR, 'Optimized file saved in ' + newFileName);

            // if --generate-screenshot param is passed
            if (params.includes(appConstants.GENERATE_SCREENSHOT)) {
                generateScreenshots(element.path);
            }

            // if --delete-original-file is passed
            if (params.includes(appConstants.DELETE_ORIGIN_FILE)) {
                deleteOriginalFile(element.path);
            }

            return resolve();
        }).on('error', function (err) {
            console.log(appConstants.ERROR_COLOR, 'an error happened: ' + err.message);
            return reject(err)
        }).save(newFileName);
    })
}

const processVideos = async (fileList, params) => {
    for (i = 0; i < fileList.length; i++) {
        await optimizeVideos(fileList[i], params).catch(err => {
            console.log(fileList[i].name);
        });
    }
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
        .on('start', (commandLine) => {
            console.log(appConstants.FGMAGENTA, 'Generating thumbnails for ' + path);
        })
        .on('progress', function (progress) {
            console.log(appConstants.WARN_COLOR, path, " [" + Math.round(progress.percent.toFixed(2)) + '%]');
        })
        .on('end', function (err) {
            if (!err) {
                console.log(appConstants.SUCCESS_COLOR, 'Screenshot generated')
            }
        })
        .on('error', function (err) {
            console.log(appConstants.ERROR_COLOR, 'an error happened: ' + err.message);
        })
        .run();
}

const deleteOriginalFile = (path) => {
    const filename = ps.basename(path) + '.temp';
    console.log(filename);
}

const calculateChecksumOfFile = (path) => {
    const file = fs.readFileSync(path);
    return crypto.createHash('sha1').update(file).digest("hex");
}

module.exports = { scanFiles, fileDir, processVideos, streamVideoFiles, deleteOriginalFile };