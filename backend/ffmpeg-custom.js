const fileUtil = require('./src/utils/fileUtils');
const { paramHandler, consoleLogColors } = require('./src/const/const');

//  check if folder path params is passed or not
if (paramHandler.FOLDER_PATH) {
    console.log(consoleLogColors.WARN_COLOR, "\n:: ffmpeg-custom V 1.0 ::");
    console.log(consoleLogColors.DEFAULT_COLOR, "Simple media scanner for managing videos and photos :) \n");
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
    console.log(consoleLogColors.ERROR_COLOR, 'Please enter folder path!');
}
