const fileUtil = require('./src/utils/fileUtils');
const { appConstants } = require('./src/const/const');

//  check if folder path params is passed or not
if (appConstants.FOLDER_PATH) {
    console.log(appConstants.WARN_COLOR, appConstants.APPNAME + ' ' + appConstants.APPVERSION);
    console.log(appConstants.DEFAULT_COLOR, appConstants.APPDESC + '\n');
    // fileUtil.optimizeVideo(fileUtil.scanFiles(appConstants.FOLDER_PATH), appConstants.COMMAND_ARGV);
    fileUtil.optimizeVideo([
        {
            id: 58298561,
            name: '1.mp4',
            path: 'public/1.mp4',
            size: '7.32 MB'
        }
    ], appConstants.COMMAND_ARGV);
} else {
    console.log(appConstants.ERROR_COLOR, 'Please enter folder path!');
}
