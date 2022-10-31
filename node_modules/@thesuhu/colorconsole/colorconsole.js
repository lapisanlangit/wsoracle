/**
  * MIT License
  * https://github.com/thesuhu/colorconsole/blob/master/LICENSE
*/

const chalk = require('chalk')
const log = console.log

module.exports = {
    httpLogConsole: (req, res, next) => {
        var forwardedIp = req.header('x-forwarded-for')
        if (forwardedIp) {
            var ipremotes = forwardedIp.split(',')
            var ipremote = ipremotes[0]
        }
        if (!ipremote) {
            ipremote = req.connection.remoteAddress
        }

        var ct = req.headers['content-type']
        var rf = req.files

        var option = '\n' + chalk.gray('http: ') + chalk.green(ipremote) + chalk.yellow(' [' + getCurrentTime() + '] ') +
            chalk.bgRed(req.method) + ' ' + chalk.gray(req.originalUrl)

        log(option, '\n' + chalk.cyan('parameter: '), req.query, '\n' + chalk.cyan('body: '), req.body,
            '\n' + chalk.cyan('files: '), rf == undefined ? '{}' : rf, '\n' + chalk.red('content-type: '), ct == undefined ? '' : ct,
            '\n' + chalk.red('user-agent: '), chalk.green(req.headers['user-agent']))
    },
    sqlLogConsole: (sql) => {
        var option = '\n' + chalk.gray('sql: ') + chalk.white(sql)
        log(option)
    },
    logConsole: (message, datetime) => {
        if (datetime == undefined) {
            datetime = true
        }
        var option = '\n' + ((datetime) ? chalk.yellow(' [' + getCurrentTime() + '] ') : '') + chalk.green('message: ') + chalk.white(message)
        log(option)
    },
    errorConsole: (message, datetime) => {
        if (datetime == undefined) {
            datetime = true
        }
        var option = '\n' + ((datetime) ? chalk.yellow(' [' + getCurrentTime() + '] ') : '') + chalk.red('error: ') + chalk.white(message)
        log(option)
    }
}

function getCurrentTime() {
    var currentdate = new Date()
    var datetime = currentdate.getDate() + "/" +
        (currentdate.getMonth() + 1) + "/" +
        currentdate.getFullYear() + " @ " +
        currentdate.getHours().toString().padStart(2, "0") + ":" +
        currentdate.getMinutes().toString().padStart(2, "0") + ":" +
        currentdate.getSeconds().toString().padStart(2, "0")
    return datetime
}