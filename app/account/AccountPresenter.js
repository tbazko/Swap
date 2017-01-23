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

    user.getOneByIdentifier(userData.username, (err, userDataModel) => {
       if(userDataModel) {
         console.log('username already exists');
          // this.res.render('signup', {title: 'signup', errorMessage: 'username already exists'});
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

  _renderView() {
    if (this.model.userIsLoggedIn) {
      this.res.redirect('/user/profile');
      this.res.cookie('logged', this.model.user.id, { maxAge: global.sessionCookieAge });
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
      console.log(err.message);
      return this._renderView();
    }

    if (!user) {
      console.log(info.message);
      return this._renderView();
    }

    return this.req.logIn(user, (error) => {
      if (error) {
        console.log(err.message);
      }

      this.model.userIsLoggedIn = true;
      this.model.user = user;
      AccountsList[user.id] = this.model;
      this._renderView();
    });
  }
}

module.exports = AccountPresenter;
