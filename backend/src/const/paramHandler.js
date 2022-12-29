const paramHandler = {
    COMMAND_ARGV: process.argv,
    FOLDER_PATH: process.argv[2],
    GENERATE_SCREENSHOT: '--generate-screenshot',
    DELETE_ORIGIN_FILE: '--delete-orig-file'
}

module.exports = paramHandler;