//  fileUtils.js
//  utility module for managing files

const fs = require('fs');
const ps = require('path');
const crypto = require('crypto');
const mime = require('mime');
const utils = require('./utils');
const { appConstants } = require('../const/const');
const ffmpeg = require('fluent-ffmpeg');
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
        // let args = `-y -hide_banner -v panic -stats -i ${element.path} -c:v libx265 -crf 27 -preset veryfast -vtag hvc1 -c:a copy -threads 0 ${newfileName}`;
        // utils.executeCMD('ffmpeg', args.split(' '), data => {
        //     console.log(data);
        // }, () => {
        //     console.log(appConstants.SUCCESS_COLOR, `finished optimizing ${element.name} video file`);
        //     if (params.includes(appConstants.GENERATE_SCREENSHOT)) {
        //         generateScreenshots(newfileName);
        //     }
        //     if (params.includes(appConstants.DELETE_ORIGIN_FILE)) {
        //         deleteOriginalFile(element.path)
        //     }
        // });

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
        }).on('error', function (err) {
            console.log('an error happened: ' + err.message);
        }).save(newFileName);
    });
}

const generateScreenshots = (path) => {
    let newfileName = fileDir(path) + '/' + calculateChecksumOfFile(path);
    const args = `-y -i ${path} -vf "select='not(mod(n,10))',setpts='N/(30*TB)'" -f image2 iamge%03d.jpg`;

    utils.executeCMD('ffmpeg', args.split(' '), data => {
        console.log(data);
    }, () => {
        console.log(appConstants.SUCCESS_COLOR, `finished generating screenshot for ${path.basename(path)} video file`);
    });
}

const deleteOriginalFile = (path) => {
    return path;
}

const calculateChecksumOfFile = (path) => {
    const file = fs.readFileSync(path);
    return crypto.createHash('sha1').update(file).digest("hex");
}

module.exports = { scanFiles, fileDir, optimizeVideo };