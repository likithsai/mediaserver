const fileUtil = require('./src/utils/fileUtils');

//  check if params is passed or not
if (process.argv[2]) {
    console.log('\x1b[36m%s\x1b[0m', "\n:: ffmpeg-custom V 1.0 ::");
    console.log("Simple media scanner for managing videos and photos :) \n");
    // fileUtil.optimizeVideo(fileUtil.scanFiles(process.argv[2]));
    console.log(fileUtil.scanFiles(process.argv[2]));
    // fileUtil.optimizeVideo([
    //     {
    //         id: 58298561,
    //         name: '1.mp4',
    //         path: 'public/1.mp4',
    //         size: '7.32 MB'
    //     }
    //     // {
    //     //     id: 58244300,
    //     //     name: 'video.mp4',
    //     //     path: 'public/video.mp4',
    //     //     size: '13.28 MB'
    //     // }
    // ]);
} else {
    console.log('Please enter folder path!');
}
