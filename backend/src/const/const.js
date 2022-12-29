const paramHandler = {
    COMMAND_ARGV: process.argv,
    FOLDER_PATH: process.argv[2],
    GENERATE_SCREENSHOT: '--generate-screenshot',
    DELETE_ORIGIN_FILE: '--delete-orig-file'
}

const consoleLogColors = {
    ERROR_COLOR: '\x1b[31m%s\x1b[0m',
    SUCCESS_COLOR: '\x1b[32m%s\x1b[0m',
    WARN_COLOR: '\x1b[33m%s\x1b[0m',
    DEFAULT_COLOR: '\x1b[37m%s\x1b[0m'
}

module.exports = { paramHandler, consoleLogColors };