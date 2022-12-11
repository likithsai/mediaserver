//  utils.js
//  contains utility function

const spawn = require('child_process').spawn;

function formatBytes(bytes, decimals = 2) {
    if (!+bytes) return '0 Bytes'
    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}

function executeCMD(cmd, args, onData, onFinish) {
    var proc = spawn(cmd, args);
    proc.stdout.on('data', onData);
    proc.stderr.setEncoding("utf8")
    proc.stderr.on('data', err => console.log(err));
    proc.on('close', onFinish);
}

module.exports = { formatBytes, executeCMD };