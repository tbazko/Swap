'use strict';
const nodemailer = require('nodemailer');
const UserModel = rootRequire('app/core/dataBaseModels/User');
const async = require('async');
const bcrypt = require('bcrypt-nodejs');

class ResetPassword {
  constructor(req, res) {
    this.req = req;
    this.res = res;
    this.userModel = new UserModel();
    this.userModel.idName = 'reset_password_token';
  }

  reset() {
    async.waterfall([
      this.findUserByToken.bind(this),
      this.sendPasswordResetConfirmation.bind(this)
    ], function(err) {
      this.res.redirect('/');
    }.bind(this));
  }

  findUserByToken(done) {
    this.userModel.getOneByIdentifier(this.req.params.token, (err, user) => {
      if (!user || user.reset_token_expires < Date.now()) {
        console.log('error', 'Password reset token is invalid or has expired.');
        return res.redirect('back');
      }

      user.passwordChange = true;
      user.password = bcrypt.hashSync(this.req.body.password);
      user.resetPasswordToken = null;
      user.resetPasswordExpires = null;

      this.userModel.editAndGet(user).then((editedUser) => {
        this.req.logIn(editedUser, function(err) {
          done(err, editedUser);
        });
      }).catch((err) => console.log(err));
    });
  }

  sendPasswordResetConfirmation(user, done) {
    var smtpTransport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
          user: '',
          pass: ''
      }
    });
    var mailOptions = {
      to: user.email,
      from: 'passwordreset@demo.com',
      subject: 'Your password has been changed',
      text: 'Hello,\n\n' +
        'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
    };
    smtpTransport.sendMail(mailOptions, function(err) {
      console.log('success', 'Success! Your password has been changed.');
      done(err);
    });
  }
}

module.exports = ResetPassword;
