'use strict';
const User = rootRequire('app/core/dataBaseModels/User');
const validator = require('validator');

class FormValidator {
  constructor() {
    this.formData = null;
    this.errors = [];
    this.userModel = new User();
    this.userModel.idName = 'email';
    this.errorMessages = {
      email: 'Invalid email format',
      address: 'Address contains forbidden symbols',
      firstName: 'First name contains forbidden symbols',
      city: 'City name contains forbidden symbols',
      state: 'State name contains forbidden symbols',
      country: 'Country name contains forbidden symbols',
      password: 'Password should contain at least 6 symbols',
      emailIsTaken: 'Sorry, user with such email already exists'
    }
  }

  isEmailFreePromise(email) {
    let promise = new Promise((resolve, reject) => {
      this.userModel.getOneByIdentifier(email, (err, userDataModel) => {
        if(userDataModel) {
         this.errors.push(this.errorMessages.emailIsTaken);
         resolve(false);
       } else {
         resolve(true);
       }
      });
    });
    return promise;
  }

  checkEmail(email) {
    let emailStr = email || this.formData.email;
    if(!FormValidator.isEmail(email)) {
      this.errors.push(this.errorMessages.email);
    }
  }

  checkPassword(password) {
    if(password.length < 6) {
      this.errors.push(this.errorMessages.password);
    }
  }

  checkString(restrictedStrings) {
    let strings = restrictedStrings;
    for(var key in strings) {
      if (!strings.hasOwnProperty(key)) continue;
      if(strings[key] && strings[key] != '' && !FormValidator.isValidString(strings[key])) {
        this.errors.push(this.errorMessages[key]);
      }
    }
  }

  static isEmail(email) {
    if(!email) return false;
    var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;
    return regex.test(email);
  }

  static isValidString(str) {
    if(!str) return false;
    var regex = /^[а-яА-ЯЁёІіЇїҐґЄєЩщa-zA-Z0-9.,!"'_\-()@?:;\s\u00A0\u00A0\u000D\u000A\000C]+$/gm;
    return regex.test(str);
  }
}
module.exports = FormValidator;
