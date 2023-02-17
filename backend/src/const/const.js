const appConstants = {
    COMMAND_ARGV: process.argv,
    FOLDER_PATH: process.argv[2],
    GENERATE_SCREENSHOT: '--generate-screenshot',
    DELETE_ORIGIN_FILE: '--delete-orig-file',

    // colors
    ERROR_COLOR: '\x1b[31m%s\x1b[0m',
    SUCCESS_COLOR: '\x1b[32m%s\x1b[0m',
    WARN_COLOR: '\x1b[33m%s\x1b[0m',
    DEFAULT_COLOR: '\x1b[37m%s\x1b[0m',
    RESET: "\x1b[0m%s\x1b[0m",
    BRIGHT: "\x1b[1m%s\x1b[0m",
    DIM: "\x1b[2m%s\x1b[0m",
    UNDERSCORE: "\x1b[4m%s\x1b[0m",
    BLINK: "\x1b[5m%s\x1b[0m",
    REVERSE: "\x1b[7m%s\x1b[0m",
    HIDDEN: "\x1b[8m%s\x1b[0m",
    FGBLACK: "\x1b[30m%s\x1b[0m",
    FGRED: "\x1b[31m%s\x1b[0m",
    FGGREEN: "\x1b[32m%s\x1b[0m",
    FGYELLOW: "\x1b[33m%s\x1b[0m",
    FGBLUE: "\x1b[34m%s\x1b[0m",
    FGMAGENTA: "\x1b[35m%s\x1b[0m",
    FGCYAN: "\x1b[36%s\x1b[0m",
    FGWHITE: "\x1b[37m%s\x1b[0m",
    FGGRAY: "\x1b[90m%s\x1b[0m",
    BGBLACK: "\x1b[40m%s\x1b[0m",
    BGRED: "\x1b[41m%s\x1b[0m",
    BGGREEN: "\x1b[42m%s\x1b[0m",
    BGYELLOW: "\x1b[43m%s\x1b[0m",
    BGBLUE: "\x1b[44m%s\x1b[0m",
    BGMAGENTA: "\x1b[45m%s\x1b[0m",
    BGCYAN: "\x1b[46m%s\x1b[0m",
    BGWHITE: "\x1b[47m%s\x1b[0m",
    BGGRAY: "\x1b[100m%s\x1b[0m"
}


module.exports = { appConstants };