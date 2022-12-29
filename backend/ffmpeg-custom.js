const fileUtil = require('./src/utils/fileUtils');
const paramHandler = require('./src/const/paramHandler');

//  check if folder path params is passed or not
if (paramHandler.FOLDER_PATH) {
    console.log('\x1b[36m%s\x1b[0m', "\n:: ffmpeg-custom V 1.0 ::");
    console.log("Simple media scanner for managing videos and photos :) \n");

    // fileUtil.optimizeVideo(fileUtil.scanFiles(paramHandler.FOLDER_PATH), paramHandler.COMMAND_ARGV);
    fileUtil.optimizeVideo([
        {
            id: 58298561,
            name: '1.mp4',
            path: 'public/1.mp4',
            size: '7.32 MB'
        }
    ], paramHandler.COMMAND_ARGV);
} else {
    console.log('Please enter folder path!');
}
