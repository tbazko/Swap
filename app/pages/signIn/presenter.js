'use strict';
const BasePagePresenter = rootRequire('app/pages/base/BasePagePresenter');
const Model = require('./model');
const passport = require('passport');
const Authentication = rootRequire('app/authentication/Authentication');

class SignInPage extends BasePagePresenter {
  constructor(options) {
    super(options);
    this.model = new Model();
    this.redirects = options.redirects;
    this.authentication = new Authentication();
  }

  parseRequest() {
    super.parseRequest();
    this.authentication.req = this.req;
    this.authentication.res = this.view;
    this.authentication.next = this.next;
    this.authentication.handleAccountRender = this.handleAccountRender.bind(this);
  }

  renderView() {
    if (this.req.method === 'GET') {
      this.handleAccountRender();
    } else {
      this.authentication.signIn();
    }
  }

  handleAccountRender(error) {
    if (this.req.isAuthenticated()) {
      if(this.req.session.lastOpenedUrl) {
        this.view.redirect(this.req.session.lastOpenedUrl);
        this.req.session.lastOpenedUrl = null;
      } else {
        this.view.redirect(this.redirects.successRedirect);
      }
      this.view.cookie('logged', this.model.currentUserId, { maxAge: global.sessionCookieAge });
    } else if(error) {
      this.view.render(this.template, {errorMessage: error, email: this.req.body.email})
    } else {
      this.view.render(this.template);
    }
  }
}

module.exports = SignInPage;
