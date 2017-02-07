'use strict';
const bcrypt = require('bcrypt-nodejs');
const passport = require('passport');
const User = rootRequire('app/core/dataBaseModels/User');
const FormValidator = rootRequire('app/FormValidator');

class Authentication {
  constructor() {
    this.res = null;
    this.req = null;
    this.next = null;
    this.handleAccountRender = null;
    this.template = null;
    this.userModel = new User();
    this.validator = new FormValidator();
  }

  signIn() {
    let callback = passport.authenticate('local', this._signInHandler.bind(this));
    callback(this.req, this.res, this.next);
  }

  signOut() {
    if (this.req.isAuthenticated()) {
      var cookies = this.req.cookies;
      for (var key in cookies) {
        // skip loop if the property is from prototype
        if (!cookies.hasOwnProperty(key)) continue;
        this.res.clearCookie(key);
      }
      this.req.logout();
    }

    this.res.redirect(this.redirects.failureRedirect);
  }

  signUp() {
    let formData = this.req.body;
    this.validator.isEmailFreePromise(formData.email).then((emailIsFree) => {
      if(emailIsFree) {
        this.validator.checkEmail(formData.email);
        this.validator.checkPassword(formData.password);
        this.validator.checkStringInput({
          firstName: formData.firstName,
          city: formData.city || formData.address,
          state: formData.state,
          country: formData.country
        });

        if(this.validator.errors.length > 0) {
          return this._failSignUp();
        } else {
          return this._createNewUser();
        }
      } else {
        return this._failSignUp();
      }
    });
  }


  _failSignUp() {
    delete this.req.body.password;

    this.res.render(this.template, {
      errorMessages: this.validator.errors,
      data: this.req.body
    });
    return;
  }

  _createNewUser() {
    let userData = this.req.body;
    userData.hash = bcrypt.hashSync(userData.password);
    this.userModel.createAndFetch(userData, (err, user) => {
      this.signIn();
    });
  }

  _signInHandler(error, user, info) {
    if (error) {
      console.log(error.message);
      return this.handleAccountRender(error.message);
    }

    if (!user) {
      console.log(info.message);
      return this.handleAccountRender(info.message);
    }

    return this.req.logIn(user, (error) => {
      if (error) {
        console.log(error.message);
      }

      this.userIsLoggedIn = true;
      this.user = user;
      this.handleAccountRender();
    });
  }
}

module.exports = Authentication;
