//  fileUtils.js
//  utility module for managing files

const fs = require('fs');
const ps = require('path');
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
                id: fileStat.dev + fileStat.ino,
                name: f,
                basepath: path,
                path: absPath,
                size: utils.formatBytes(fileStat.size),
                createddate: fileStat.birthtime
            });
        }
    });
    return temp;
}

module.exports = { scanFiles };