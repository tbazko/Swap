"use strict";

global.rootRequire = function(name) {
  return require(__dirname + '/' + name);
}

const express       = require('express');
const path          = require('path');
const favicon       = require('serve-favicon');
const logger        = require('morgan');
const cookieParser  = require('cookie-parser');
const bodyParser    = require('body-parser');
const multer        = require('multer')(); // for parsing multipart/form-data
const passport      = require('./app/account/passport');
const session       = require('express-session');
const app           = express();
const server        = require('http').createServer(app);
const socketio      = require('socket.io')(server);
const hbs           = require('./config/templates');

app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({secret: 'secret strategic xxzzz code'}));
app.use(passport.initialize());
app.use(passport.session());

app.socketio = socketio;
require('./app/socketio').setSocketio(socketio);
app.use(require('./app/router'));

module.exports = {app: app, server: server};
