"use strict";

global.rootRequire = function(name) {
  return require(__dirname + '/' + name);
}
global.sessionCookieAge = 60000 * 60 * 24 * 5;

const compression   = require('compression');
const express       = require('express');
const app           = express();
const path          = require('path');
const favicon       = require('serve-favicon');
const logger        = require('morgan');
const cookieParser  = require('cookie-parser');
const bodyParser    = require('body-parser');
const passport      = require('./app/authentication/passport');
const session       = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session);
const server        = require('http').createServer(app);
const socketAPI     = require('./app/socketAPI').wrapServer(server);
const hbs           = require('./config/templates');
const knex          = require('./config/database').knex;

const store = new KnexSessionStore({
    knex: knex,
    tablename: 'sessions'
});

app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');

// uncomment after placing your favicon in /public
app.use(compression({threshold: 0}));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'secret',//process.env.SESSION_SECRET,
  cookie: {
    maxAge: global.sessionCookieAge
  },
  store: store
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(require('./app/router'));

module.exports = {app: app, server: server};
