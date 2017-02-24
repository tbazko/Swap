'use strict';
const nodemailer = require('nodemailer');
const UserModel = rootRequire('app/core/dataBaseModels/User');
const async = require('async');
const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');

class ResetPassword {
  constructor(req, res, next) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.userModel = new UserModel();
    this.userModel.idName = 'email';
  }

  requestReset() {
    async.waterfall([
      this.createToken.bind(this),
      this.attachTokenToUser.bind(this),
      this.sendMailWithToken.bind(this)
    ], function(err) {
      if (err) return this.next(err);
      this.res.redirect('/account/forgot-password');
    }.bind(this));
  }

  createToken(done) {
    crypto.randomBytes(20, function(err, buf) {
      var token = buf.toString('hex');
      done(err, token);
    });
  }

  attachTokenToUser(token, done) {
    this.userModel.getOneByIdentifier(this.req.body.email, (err, user) => {
      if (!user) {
        console.log('error', 'No account with that email address exists.');
        return this.res.redirect('/account/forgot-password');
      }

      user.resetPasswordToken = token;
      user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
      this.userModel.editAndGet(user).then((editedUser) => {
        done(err, token, editedUser);
      }).catch((err) => done(err, token, editedUser));
    });
  }

  sendMailWithToken(token, user, done) {
    var smtpTransport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAILLOGIN,
        pass: process.env.MAILPASS
      }
    });
    var mailOptions = {
      to: user.email,
      from: 'passwordreset@demo.com',
      subject: 'Node.js Password Reset',
      text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
        'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
        'http://' + this.req.headers.host + '/reset/' + token + '\n\n' +
        'If you did not request this, please ignore this email and your password will remain unchanged.\n'
    };
    smtpTransport.sendMail(mailOptions, function(err) {
      console.log('info', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
      done(err, 'done');
    });
  }
}

module.exports = ResetPassword;
