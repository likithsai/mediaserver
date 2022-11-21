const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffprobePath = require('@ffprobe-installer/ffprobe').path;

ffmpeg.setFfmpegPath(ffmpegPath);
ffmpeg.setFfprobePath(ffprobePath);

if(process.argv[2]) {
    console.log('\x1b[36m%s\x1b[0m', "\n:: ffmpeg-custom V 1.0 ::");
    console.log("Simple media scanner for managing videos and photos :)");

    new Promise((resolve, reject) => {
        ffmpeg(process.argv[2] + '/video2.mp4')
        .save(process.argv[2] + '/1.mp4')
        .on('progress', (progress, event) => {
            console.log(`frames: ${progress.frames} \t percent: ${(progress.percent).toFixed()}% \t time: ${progress.timemark} \t target size: ${progress.targetSize}`);
        })
        .on('error', function(err) {
            console.log('an error happened: ' + err.message);
        })
        .on('end', () => {
            resolve('done');
            startApp();
        });
    });
}