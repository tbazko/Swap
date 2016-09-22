"use strict";

let express       = require('express');
let path          = require('path');
let favicon       = require('serve-favicon');
let logger        = require('morgan');
let cookieParser  = require('cookie-parser');
let bodyParser    = require('body-parser');
let multer        = require('multer'); // v1.0.5
let upload        = multer(); // for parsing multipart/form-data

let productList   = require('./app/productList/index');
let signInOut     = require('./app/signInOut/index');
let signUp        = require('./app/signUp/index');
let profile       = require('./app/profile/index');
let swapRequest   = require('./app/swapRequest/index');
let product       = require('./app/product/index');
let message       = require('./app/message/index');
let userInfo      = require('./app/user/index');
let jsonSender    = require('./app/jsonSender/index');
let passport      = require('./config/passport');
let session       = require('express-session');
let app           = express();

// view engine setup
app.set('views', path.join(__dirname, 'app/viewsCommon'));
var exphbs = require('express-handlebars');
var hbs = exphbs.create({
  layoutsDir: 'app/viewsCommon/layouts/',
  partialsDir: 'app/viewsCommon/partials/',
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

app.use(productList);
app.use(signInOut);
app.use(signUp);
app.use(profile);
app.use(swapRequest);
app.use(product);
app.use(message);
app.use(userInfo);
app.use(jsonSender);

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
