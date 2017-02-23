'use strict';
const AbstractPagePresenter = rootRequire('app/pages/AbstractPagePresenter');
const Model = require('./model');

class ResetPasswordPagePresenter extends AbstractPagePresenter {
  constructor(options) {
    super(options);
    this.model = new Model();
  }

  parseRequest() {
    this.model.currentUserId = this.req.user ? this.req.user.id : null;
    this.model.originalUrl = this.req.originalUrl;
    this.model.token = this.req.params.token;
  }

  renderView() {
    this.model.reset().then((error, user) => {
      if(error) {
        this.redirectUrl = '/account/forgot-password';
        return this.redirect();
      }
      this.view.render('pages/resetPasswordView', {user: user});
    });
  }
}

module.exports = ResetPasswordPagePresenter;
