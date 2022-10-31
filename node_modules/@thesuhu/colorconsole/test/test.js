/**
  * MIT License
  * https://github.com/thesuhu/colorconsole/blob/master/LICENSE
*/

const { logConsole, errorConsole, httpLogConsole, sqlLogConsole } = require('../colorconsole')

// regular log
logConsole('Hello world!')

// error log
errorConsole('A very cool error here')

// http error
// when you work on http, use httpLogConsole(req) to display collorfull standard http log to console (see README.md)

// sql error
// when you execute sql statement, use sqlLogConsole(err.message) to display collorfull error message to console (see README.md)