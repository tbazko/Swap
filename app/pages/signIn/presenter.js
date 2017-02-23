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
      this.model.currentUserId = this.req.user.id;
      this._redirect();
      this._setLoggedCookie();
    } else if(error) {
      this.model.pageDataPromise.then((pageData) => {
        this._renderAccountFormError(error, pageData);
      }).catch((err) => {
        console.log('SignInPage handleAccountRender error ' + err)
        this.view.redirect('/404');
      });
    } else {
      super.renderView();
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

  _renderAccountFormError(error, pageData) {
    let response = this._arrayToObject(pageData);
    if(response) {
      response.errorMessage = error;
      response.email = this.req.body.email;
      this.view.render(this.template, response);
    } else {
      this.view.redirect('/404');
    }
  }
}

module.exports = SignInPage;
