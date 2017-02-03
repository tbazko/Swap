'use strict';
const passport = require('passport');
const bcrypt = require('bcrypt-nodejs');
const AccountModel = require('./AccountModel');
const User = rootRequire('app/core/dataBaseModels/User');
let AccountsList = {};

class AccountPresenter {
  constructor(template) {
    this.model = new AccountModel();
    this.template = template;
    this.redirects = {};
  }

  signIn(req, res, next) {
    this.res = res;
    this.req = req;
    this.next = next;
    this.model.data = req;

    if (this.model.method === 'GET') {
      this._renderView();
    } else {
      this._authenticate();
    }
  }

  signUp(req, res, next) {
    this.res = res;
    this.req = req;
    this.next = next;
    this.model.data = req;

    if (this.model.method === 'GET') {
      this._renderView();
    } else {
      this._createNewUser();
    }
  }

  _createNewUser() {
    let userData = this.req.body;
    let usernamePromise = null;
    let user = new User(this.req);
    user.idName = 'email';

    user.getOneByIdentifier(userData.email, (err, userDataModel) => {
       if(userDataModel) {
         this.res.render(this.template, {
           errorMessage: 'Account with such Email already exists'
         });
       } else {
          //****************************************************//
          // MORE VALIDATION GOES HERE(E.G. PASSWORD VALIDATION)
          //****************************************************//
          userData.hash = bcrypt.hashSync(userData.password);
          user.createAndFetch(userData, (err, user) => {
            this.signIn(this.req, this.res, this.next);
          });
       }
    });
  }

  signOut(req, res) {
    this.res = res;
    this.req = req;
    this.model.data = req;
    this._signOutAndRedirect();
  }

  _renderView(error) {
    if (this.model.userIsLoggedIn) {
      if(this.req.session.lastOpenedUrl) {
        this.res.redirect(this.req.session.lastOpenedUrl);
        this.req.session.lastOpenedUrl = null;
      } else {
        this.res.redirect(this.redirects.successRedirect);
      }
      this.res.cookie('logged', this.model.user.id, { maxAge: global.sessionCookieAge });
    } else if(error) {
      this.res.render(this.template, {errorMessage: error})
    } else {
      this.res.render(this.template);
    }
  }

  _signOutAndRedirect() {
    if (this.model.userIsLoggedIn) {
      var cookies = this.req.cookies;
      for (var key in cookies) {
        // skip loop if the property is from prototype
        if (!cookies.hasOwnProperty(key)) continue;
        this.res.clearCookie(key);
      }
      this.req.logout();
      this.res.redirect('/account/signin');
    } else {
      this._renderNotFound404page();
    }
  }

  _renderNotFound404page() {
    this.res.redirect('/404');
  }

  _authenticate() {
    let callback = passport.authenticate('local', this._authenticationHandler.bind(this));
    callback(this.req, this.res, this.next);
  }

  _authenticationHandler(error, user, info) {
    if (error) {
      console.log(error.message);
      return this._renderView(error.message);
    }

    if (!user) {
      console.log(info.message);
      return this._renderView(info.message);
    }

    return this.req.logIn(user, (error) => {
      if (error) {
        console.log(error.message);
      }

      this.model.userIsLoggedIn = true;
      this.model.user = user;
      AccountsList[user.id] = this.model;
      this._renderView();
    });
  }
}

module.exports = AccountPresenter;
