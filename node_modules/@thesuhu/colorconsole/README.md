# colorconsole

[![npm](https://img.shields.io/npm/v/@thesuhu/colorconsole.svg?style=flat-square)](https://www.npmjs.com/package/@thesuhu/colorconsole)
[![license](https://img.shields.io/github/license/thesuhu/colorconsole?style=flat-square)](https://github.com/thesuhu/colorconsole/blob/master/LICENSE)

Make console log more colorful. While developing, we often deal with console logs. This module provides four templates namely regular log, error log, HTTP log and SQL log.

## Install

```sh
npm install @thesuhu/colorconsole --save-dev
```

## Usage

Below is an example regular and error log.
```js
const { logConsole, errorConsole } = require('@thesuhu/colorconsole')

// regular log
logConsole('Hello world!')

// error log
errorConsole('A very cool error here')
```
Below is an example HTTP log.
```js
const { httpLogConsole } = require('@thesuhu/colorconsole')

// log request for dev
app.use((req, res, next) => {
  if (env == 'dev') httpLogConsole(req)
  next()
})
```
Below is an example SQL log.
```js
const { sqlLogConsole } = require('@thesuhu/colorconsole')

// when work with MySQL
let query = mysql.format(sql, param)
if (env == 'dev') {
    sqlLogConsole(query)
}

// when work with Oracle
let query = queryBindToString(sql, param)
if (env == 'dev') {
    sqlLogConsole(query)
}
```

## License

[MIT](https://github.com/thesuhu/colorconsole/blob/master/LICENSE)