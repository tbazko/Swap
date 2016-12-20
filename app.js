"use strict";

const express       = require('express');
const path          = require('path');
const favicon       = require('serve-favicon');
const logger        = require('morgan');
const cookieParser  = require('cookie-parser');
const bodyParser    = require('body-parser');
const multer        = require('multer'); // v1.0.5
const upload        = multer(); // for parsing multipart/form-data

global.rootRequire = function(name) {
  return require(__dirname + '/' + name);
}

const signInOut     = require('./app/signInOut');
const signUp        = require('./app/signUp');
const passport      = require('./config/passport');
const session       = require('express-session');
const app           = express();

// view engine setup
app.set('views', path.join(__dirname, 'app/templatesCommon'));

var exphbs = require('express-handlebars');
var hbs = exphbs.create({
  layoutsDir: 'app/templatesCommon/layouts/',
  partialsDir: 'app/templatesCommon/partials/',
  defaultLayout: 'main',
  extname: '.hbs',
  helpers: {
    section: function(name, options){
        if(!this._sections) this._sections = {};
        this._sections[name] = options.fn(this);
        return null;
    },
    if_eq: function(a, b, options) {
      if(a == b) {
        return options.fn(this);
      } else {
        return options.inverse(this);
      }
    }
  }
})

app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// initialize session and passport here to have access to req.user from any other
// route. TODO: check is possible to do the same, but initialize in more appropriate
// place (account.js)
app.use(session({secret: 'secret strategic xxzzz code'}));
app.use(passport.initialize());
app.use(passport.session());

app.use(signInOut);
app.use(signUp);

app.use(require('./app/router'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
