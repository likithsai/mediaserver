const fileUtil = require('./src/utils/fileUtils');
const { appConstants } = require('./src/const/const');

//  check if folder path params is passed or not
if (appConstants.FOLDER_PATH) {
    console.log(appConstants.WARN_COLOR, appConstants.APPNAME + ' ' + appConstants.APPVERSION);
    console.log(appConstants.DEFAULT_COLOR, appConstants.APPDESC + '\n');
    console.log(appConstants.WARN_COLOR, `Scanning files ...`);
    fileUtil.processVideos(fileUtil.scanFiles(appConstants.FOLDER_PATH));
    // fileUtil.processVideos([
    //     {
    //         id: 'd123567016',
    //         name: 'video1.mp4',
    //         path: 'public/folder1/folder2/video1.mp4',
    //         size: '38.18 MB',
    //         mimetype: 'video/mp4',
    //         hash: '530b0207abdf302e9ed59f3ef14527694cedeaa2',
    //         createddate: '2022-11-20T09:48:53.153Z'
    //     },
    //     {
    //         id: '89b4644421',
    //         name: 'video.mp4',
    //         path: 'public/folder1/video.mp4',
    //         size: '13.28 MB',
    //         mimetype: 'video/mp4',
    //         hash: '15bfe142b06571dd84d3d6952a01cbf324ca3f36',
    //         createddate: '2022-11-20T09:47:47.624Z'
    //     },
    //     {
    //         id: 'c383485508',
    //         name: 'video.mp4',
    //         path: 'public/video.mp4',
    //         size: '13.28 MB',
    //         mimetype: 'video/mp4',
    //         hash: '15bfe142b06571dd84d3d6952a01cbf324ca3f36',
    //         createddate: '2022-12-08T06:38:53.754Z'
    //     }
    // ]);
} else {
    console.log(appConstants.ERROR_COLOR, 'Please enter folder path!');
}
