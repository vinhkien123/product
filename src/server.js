const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const server = require('http').Server(app);
const io = require('socket.io')(server);
const port = process.env.PORT || 4000
const data = require('./database/database')
app.use(function (req, res, next) {
  req.io = io;
  next();
});
const router = require('express').Router()
var path = require('path');
const socketModule = require('./sockets/socket');
const user = require('./api/user')
// const data = require('./database/database')
const apiRouter = require('./api/index');
const cors = require('cors')
var corsOption = {
  origin: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  exposedHeaders: ['x-auth-token']
};
app.use(cors(corsOption));
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json());

app.get('/images/:images', function (req, res) {

  res.sendFile(path.join(__dirname, 'images', `${req.params.images}`));
});
app.get('/videos/:video', function (req, res) {

  res.sendFile(path.join(__dirname, '../videos', `${req.params.video}`));
});
app.use('/api', apiRouter);

app.use(express.static(path.join(__dirname, 'public/build')))
app.use(express.static(path.join(__dirname, 'public/build1')))
app.get('/admin', function (req, res) {
  res.sendFile(path.join(__dirname, 'public/build1', 'index.html'));
});
app.get('/admin/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'public/build1', 'index.html'));
});
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'public/build', 'index.html'));
});

const opts = {
    errorEventName: 'error',
    logDirectory:  `${__dirname}/log`,
    fileNamePattern: 'log.txt',
    dateFormat: 'YYYY.MM.DD'
};
const log = require('simple-node-logger').createRollingFileLogger(opts);
init = async function () {

  data.connect.connect(function (err) {
    if (err) {
      log.info(err)
      throw err;
    } 
    console.log("Connected!");
  });
  socketModule.socket(io);
  server.listen(port);
  
  console.log(router.post);
  console.log(`running on port: ${port}`);
  log.info(`running on port: ${port}`);


}

init();