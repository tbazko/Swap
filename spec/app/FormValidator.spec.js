'use strict';
const FormValidator = rootRequire('app/FormValidator');

describe('FormValidator', () => {
  let v = new FormValidator();
  let fakeFunc = function(err, length) {return true};

  it('should be initialized', () => {
    expect(v).not.toBeUndefined();
  });

  it('should return false if string isn\'t in email format', () => {
    expect(FormValidator.isEmail(null)).toBe(false);
    expect(FormValidator.isEmail(undefined)).toBe(false);
    expect(FormValidator.isEmail('')).toBe(false);
    expect(FormValidator.isEmail('notanemail')).toBe(false);
    expect(FormValidator.isEmail('notanemail@')).toBe(false);
    expect(FormValidator.isEmail('notanemail@c')).toBe(false);
    expect(FormValidator.isEmail('notanemail@.')).toBe(false);
    expect(FormValidator.isEmail('notanemail@.com')).toBe(false);
    expect(FormValidator.isEmail('notanemail.com')).toBe(false);
    expect(FormValidator.isEmail('notanemail@not..com')).toBe(false);
    expect(FormValidator.isEmail('notanemail@not;.com')).toBe(false);
    expect(FormValidator.isEmail('notanemail@not.com.')).toBe(false);
    expect(FormValidator.isEmail('>notanemail@not.com')).toBe(false);
    expect(FormValidator.isEmail('nota>nemail@not.com')).toBe(false);
    expect(FormValidator.isEmail('notanemail@no>t.com')).toBe(false);
    expect(FormValidator.isEmail('notanemail@not.com>')).toBe(false);

    expect(FormValidator.isEmail('<notanemail@not.com')).toBe(false);
    expect(FormValidator.isEmail('nota<nemail@not.com')).toBe(false);
    expect(FormValidator.isEmail('notanemail@no<t.com')).toBe(false);
    expect(FormValidator.isEmail('notanemail@not.com<')).toBe(false);

    expect(FormValidator.isEmail('@notanemail@not.com')).toBe(false);
    expect(FormValidator.isEmail('nota@nemail@not.com')).toBe(false);
    expect(FormValidator.isEmail('notanemail@no@t.com')).toBe(false);
    expect(FormValidator.isEmail('notanemail@not.com@')).toBe(false);

    expect(FormValidator.isEmail(';notanemail@not.com')).toBe(false);
    expect(FormValidator.isEmail('nota;nemail@not.com')).toBe(false);
    expect(FormValidator.isEmail('notanemail@no;t.com')).toBe(false);
    expect(FormValidator.isEmail('notanemail@not.com;')).toBe(false);

    expect(FormValidator.isEmail('notanemail@no*t.com')).toBe(false);
    expect(FormValidator.isEmail('notanemail@not.com*')).toBe(false);

    expect(FormValidator.isEmail('notanemail@no!t.com')).toBe(false);
    expect(FormValidator.isEmail('notanemail@not.com!')).toBe(false);
  });

  it('should return true for email format', () => {
    expect(FormValidator.isEmail('isemail@yep.com')).toBe(true);
  });

  xit('should return string with error description if email is invalid', () => {
    v.checkEmail('notanemail');
    expect(v.errors[0]).toEqual('Invalid email format');
  });

  it('should return true for valid string format', () => {
    expect(FormValidator.isValidString('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')).toBe(true);
    expect(FormValidator.isValidString('абвгдеёжзийклмнопрстуфхцчшщъыьэюяАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ')).toBe(true);
    expect(FormValidator.isValidString('абвгґдеєжзиіїйклмнопрстуфхцчшщьюяАБВГҐДЕЄЖЗИІЇЙКЛМНОПРСТУФХЦЧШЩЬЮЯ')).toBe(true);
    expect(FormValidator.isValidString('.,!"\'_-()@?:; '));
    expect(FormValidator.isValidString('0123456789'));
  });

  it('should return false for invalid string format', () => {
    expect(FormValidator.isValidString(null)).toBe(false);
    expect(FormValidator.isValidString(undefined)).toBe(false);
    expect(FormValidator.isValidString('<>')).toBe(false);
    expect(FormValidator.isValidString('[]')).toBe(false);
    expect(FormValidator.isValidString('{}')).toBe(false);
    expect(FormValidator.isValidString('=')).toBe(false);
    expect(FormValidator.isValidString('+')).toBe(false);
    expect(FormValidator.isValidString('*')).toBe(false);
    expect(FormValidator.isValidString('/')).toBe(false);
  });

  it('should not check if valued is undefined or empty', () => {
    v.checkString({firstName: ''});
    v.checkString({address: undefined});
    v.checkString({country: null});
    expect(v.errors[0]).toEqual(undefined);
  });

  it('should add correct errormessage for invalid string format', () => {
    v.checkString({firstName: '<script>'});
    expect(v.errors[0]).toEqual('First name contains forbidden symbols');
  });
});
