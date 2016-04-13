var express       = require('express');
var path          = require('path');
var favicon       = require('serve-favicon');
var logger        = require('morgan');
var cookieParser  = require('cookie-parser');
var bodyParser    = require('body-parser');
var multer        = require('multer'); // v1.0.5
var upload        = multer(); // for parsing multipart/form-data
var passport      = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var session       = require('express-session');
var bcrypt        = require('bcrypt-nodejs');

var index        = require('./app/routes/index');
var userInfo      = require('./app/routes/user');
var product       = require('./app/routes/product');
var app           = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/user', userInfo);
app.use('/product', product);

var account = require('./app/requestHandlers/account');
var UserModel = require('./app/models/models').userModel;

passport.use(new LocalStrategy(function(username, password, done) {
   new UserModel({Email: username}).fetch().then(function(data) {
      var user = data;
      if(user === null) {
         return done(null, false, {message: 'Invalid username or password'});
      } else {
         user = data.toJSON();

         if(!bcrypt.compareSync(password, user.Password)) {
            return done(null, false, {message: 'Invalid username or password'});
         } else {
            return done(null, user);
         }
      }
   });
}));

passport.serializeUser(function(user, done) {
  done(null, user.Email);
});

passport.deserializeUser(function(username, done) {
   new UserModel({Email: username}).fetch().then(function(user) {
      done(null, user);
   });
});

app.use(session({secret: 'secret strategic xxzzz code'}));
app.use(passport.initialize());
app.use(passport.session());


app.get('/profile', account.profile);

app.get('/add-product', account.isAuthenticated, function(req, res, next) {
  res.render('addProduct', {url: req.path, userId: req.user.get('UserId')});
});
// signin
app.get('/signin', account.signIn);
app.post('/signin', account.signInPost);

// signup
app.get('/signup', account.signUp);
app.post('/signup', account.signUpPost);

// logout
app.get('/signout', account.signOut);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
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
