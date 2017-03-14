var exphbs = require('express-handlebars');
var helpers = require('../client/js/components/utils/template-helpers').helpers;
var Handlebars = require('handlebars');

module.exports = exphbs.create({
  layoutsDir: 'app/templatesCommon/layouts/',
  partialsDir: 'app/templatesCommon/partials/',
  defaultLayout: 'main',
  extname: '.hbs',
  helpers: helpers
});