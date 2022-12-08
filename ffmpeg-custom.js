const spawn = require('child_process').spawn;
const fileUtil = require('./src/utils/fileUtils');

const executeCMD = (cmd, args, onData, onFinish) => {
    var proc = spawn(cmd, args);
    proc.stdout.on('data', onData);
    proc.stderr.setEncoding("utf8")
    proc.stderr.on('data', err => console.log(err));
    proc.on('close', onFinish);
}

const convertVideos = (fileList) => {
    fileList.forEach(element => {
        let newfileName = element.basepath + '/new_' + element.name;
        let args = `-i ${element.path} -c:v libx265 -crf 27 -preset veryfast -vtag hvc1 -c:a copy ${newfileName}`;
        executeCMD('ffmpeg', args.split(' '), data => {
            console.log(data);
        }, () => {
            console.log('\x1b[36m%s\x1b[0m', `finished converting ${element.name}`);
        });
    });
}

//  check if params is passed or not
if (process.argv[2]) {
    console.log('\x1b[36m%s\x1b[0m', "\n:: ffmpeg-custom V 1.0 ::");
    console.log("Simple media scanner for managing videos and photos :) \n");
    convertVideos(fileUtil.scanFiles(process.argv[2]));
    // convertVideos([
    //     {
    //         id: 58298561,
    //         name: '1.mp4',
    //         path: 'public/1.mp4',
    //         size: '7.32 MB',
    //         basepath: 'public/'
    //     },
    //     {
    //         id: 58244300,
    //         name: 'video.mp4',
    //         path: 'public/video.mp4',
    //         size: '13.28 MB',
    //         basepath: 'public/'
    //     }
    // ]);
} else {
    console.log('Please enter folder path!');
}
