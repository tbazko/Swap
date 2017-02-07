'use strict';
const FormValidator = rootRequire('app/FormValidator');

describe('FormValidator', () => {
  let v = new FormValidator();
  let fakeFunc = function(err, length) {return true};

  it('should be initialized', () => {
    expect(v).not.toBeUndefined();
  });

  it('should return false if string isn\'t in email format', () => {
    expect(v.isEmail(null)).toBe(false);
    expect(v.isEmail(undefined)).toBe(false);
    expect(v.isEmail('')).toBe(false);
    expect(v.isEmail('notanemail')).toBe(false);
    expect(v.isEmail('notanemail@')).toBe(false);
    expect(v.isEmail('notanemail@c')).toBe(false);
    expect(v.isEmail('notanemail@.')).toBe(false);
    expect(v.isEmail('notanemail@.com')).toBe(false);
    expect(v.isEmail('notanemail.com')).toBe(false);
    expect(v.isEmail('notanemail@not..com')).toBe(false);
    expect(v.isEmail('notanemail@not;.com')).toBe(false);
    expect(v.isEmail('notanemail@not.com.')).toBe(false);
    expect(v.isEmail('>notanemail@not.com')).toBe(false);
    expect(v.isEmail('nota>nemail@not.com')).toBe(false);
    expect(v.isEmail('notanemail@no>t.com')).toBe(false);
    expect(v.isEmail('notanemail@not.com>')).toBe(false);

    expect(v.isEmail('<notanemail@not.com')).toBe(false);
    expect(v.isEmail('nota<nemail@not.com')).toBe(false);
    expect(v.isEmail('notanemail@no<t.com')).toBe(false);
    expect(v.isEmail('notanemail@not.com<')).toBe(false);

    expect(v.isEmail('@notanemail@not.com')).toBe(false);
    expect(v.isEmail('nota@nemail@not.com')).toBe(false);
    expect(v.isEmail('notanemail@no@t.com')).toBe(false);
    expect(v.isEmail('notanemail@not.com@')).toBe(false);

    expect(v.isEmail(';notanemail@not.com')).toBe(false);
    expect(v.isEmail('nota;nemail@not.com')).toBe(false);
    expect(v.isEmail('notanemail@no;t.com')).toBe(false);
    expect(v.isEmail('notanemail@not.com;')).toBe(false);

    expect(v.isEmail('notanemail@no*t.com')).toBe(false);
    expect(v.isEmail('notanemail@not.com*')).toBe(false);

    expect(v.isEmail('notanemail@no!t.com')).toBe(false);
    expect(v.isEmail('notanemail@not.com!')).toBe(false);
  });

  it('should return true for email format', () => {
    expect(v.isEmail('isemail@yep.com')).toBe(true);
  });

  xit('should return string with error description if email is invalid', () => {
    v.checkEmail('notanemail');
    expect(v.errors[0]).toEqual('Invalid email format');
  });

  it('should return true for valid string format', () => {
    expect(v.isValidString('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')).toBe(true);
    expect(v.isValidString('абвгдеёжзийклмнопрстуфхцчшщъыьэюяАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ')).toBe(true);
    expect(v.isValidString('абвгґдеєжзиіїйклмнопрстуфхцчшщьюяАБВГҐДЕЄЖЗИІЇЙКЛМНОПРСТУФХЦЧШЩЬЮЯ')).toBe(true);
    expect(v.isValidString('.,!"\'_-()@?:; '));
    expect(v.isValidString('0123456789'));
  });

  it('should return false for invalid string format', () => {
    expect(v.isValidString(null)).toBe(false);
    expect(v.isValidString(undefined)).toBe(false);
    expect(v.isValidString('<>')).toBe(false);
    expect(v.isValidString('[]')).toBe(false);
    expect(v.isValidString('{}')).toBe(false);
    expect(v.isValidString('=')).toBe(false);
    expect(v.isValidString('+')).toBe(false);
    expect(v.isValidString('*')).toBe(false);
    expect(v.isValidString('/')).toBe(false);
  });

  it('should not check if valued is undefined or empty', () => {
    v.checkStringInput({firstName: ''});
    v.checkStringInput({address: undefined});
    v.checkStringInput({country: null});
    expect(v.errors[0]).toEqual(undefined);
  });

  it('should add correct errormessage for invalid string format', () => {
    v.checkStringInput({firstName: '<script>'});
    expect(v.errors[0]).toEqual('First name contains forbidden symbols');
  });
});
