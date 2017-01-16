var exphbs = require('express-handlebars');

module.exports = exphbs.create({
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
    },
    subtract: function(a, b) {
      return a - b;
    }
  }
});
