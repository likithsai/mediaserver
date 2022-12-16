//  fileUtils.js
//  utility module for managing files

const fs = require('fs');
const ps = require('path');
const crypto = require('crypto');
const mime = require('mime');
const utils = require('./utils');
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
                mimetype: mime.getType(absPath.split('.')[1]) || '',
                createddate: fileStat.birthtime
            });
        }
    });
    return temp;
}

const fileDir = (file) => {
    return ps.dirname(file);
}

const optimizeVideo = (fileList) => {
    fileList.forEach(element => {
        let newfileName = fileDir(element.path) + '/new_' + element.name;
        let args = `-y -hide_banner -v panic -stats -i ${element.path} -c:v libx265 -crf 27 -preset veryfast -vtag hvc1 -c:a copy -threads 0 ${newfileName}`;
        utils.executeCMD('ffmpeg', args.split(' '), data => {
            console.log(data);
        }, () => {
            console.log('\x1b[36m%s\x1b[0m', `finished optimizing ${element.name} video file`);
        });
    });
}

module.exports = { scanFiles, fileDir, optimizeVideo };