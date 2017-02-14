'use strict';
const BasePagePresenter = rootRequire('app/pages/base/BasePagePresenter');
const Model = require('./model');
const Authentication = rootRequire('app/authentication/Authentication');

class SignUpPagePresenter extends BasePagePresenter {
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
    this.authentication.template = this.template;
    this.authentication.handleAccountRender = this.handleAccountRender.bind(this);
  }

  renderView() {
    if(this.req.method === 'GET') {
      this.handleAccountRender();
    } else if(this.req.method === 'POST') {
      this.authentication.signUp();
    }
  }

  handleAccountRender(error) {
    if (this.req.isAuthenticated()) {
      this._redirect();
      this._setLoggedCookie();
    } else if(error) {
      this.view.render(this.template, {errorMessage: error});
    } else {
      this.view.render(this.template);
    }
  }

  _redirect() {
    if(this.req.session.lastOpenedUrl) {
      this.view.redirect(this.req.session.lastOpenedUrl);
      this.req.session.lastOpenedUrl = null;
    } else {
      this.view.redirect(this.redirects.successRedirect);
    }
  }

  _setLoggedCookie() {
    this.view.cookie('logged', this.model.currentUserId, { maxAge: global.sessionCookieAge });
  }

}

module.exports = SignUpPagePresenter;
