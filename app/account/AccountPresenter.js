'use strict';
const passport = require('passport');
const bcrypt = require('bcrypt-nodejs');
const AccountModel = require('./AccountModel');
const User = rootRequire('app/core/dataBaseModels/User');
const socketio = rootRequire('app/socketio').getSocketio();
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
         console.log(userDataModel);
         console.log('username already exists');
          // this.res.render('signup', {title: 'signup', errorMessage: 'username already exists'});
       } else {
          //****************************************************//
          // MORE VALIDATION GOES HERE(E.G. PASSWORD VALIDATION)
          //****************************************************//
          userData.hash = bcrypt.hashSync(userData.password);
          user.createAndFetch(userData, (err, user) => {
            console.log(user);
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
      // socketio.on('connection', (socket) => {
      //   console.log(socket);
      //   socket.join(this.model.user.id);
      //   socket.emit('connectToRoom', `you are in room for user ${this.model.user.id}`)
      //   socket.on('newSwapRequestFromClient', () => {
      //     console.log('works with newSwapRequestFromClient');
      //   });
      // });

      this.res.redirect('/user/profile');
      this.res.cookie('logged', this.model.user.id, { maxAge: 900000 });
    } else {
      this.res.render(this.template);
    }
  }

  _signOutAndRedirect() {
    if (this.model.userIsLoggedIn) {
      this.res.clearCookie('logged');
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
      console.log(AccountsList);
      this._renderView();
    });
  }
}

module.exports = AccountPresenter;
