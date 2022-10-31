const express = require('express')
const app = express();
const config = require('./config.js');
const port = process.env.PORT;
var bodyParser = require('body-parser')
const cors = require('cors');
var msg=require('./message')
const oracledbexec = require('oracledbexec')

oracledbexec.initialize()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(cors());
app.options('*', cors());


if (process.env.NODE_ENV == 'dev') {
  app.use(function logger(req, res, next) {
      console.log('\x1b[33m%s\x1b[0m', "HTTP => " + new Date().toDateString() + " " + new Date().toLocaleTimeString(), req.method, req.url, req.body, req.query);
      next();
  });
}

app.use(function (req, res, next) {
  //menghilangkan OPTION
  if (req.method === 'OPTIONS') {
      var headers = {};
      // IE8 does not allow domains to be specified, just the *
      // headers["Access-Control-Allow-Origin"] = req.headers.origin;
      headers["Access-Control-Allow-Origin"] = "*";
      headers["Access-Control-Allow-Methods"] = "POST, GET, PUT, DELETE, OPTIONS";
      headers["Access-Control-Allow-Credentials"] = false;
      headers["Access-Control-Max-Age"] = '86400'; // 24 hours
      headers["Access-Control-Allow-Headers"] = "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept,Authorization";
      res.writeHead(200, headers);
      res.end();
  } else {

      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
      res.header("Access-Control-Allow-Headers", "Origin,Content-Type, X-Requested-With, Access-Control-Allow-Headers, Accept, Authorization");
      next();
  }
});

app.use('/data/tes', require('./routes/rtes'));
app.use('/data/kppn', require('./routes/rkppn'));



app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/nama', (req, res) => {
    res.send('Hello namaku Jati')
  })
  
  
app.get('/alamat', (req, res) => {
    res.send('Alamatku depok')
  })

  app.get('/cekenv', (req, res) => {
    res.send(process.env.NODE_ENV)
  })
  
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})