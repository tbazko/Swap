'use strict';
const events = require('events');
const eventEmitter = new events.EventEmitter();
global.eventEmitter = eventEmitter;

class UserMediator {
  constructor() {
    this.eventEmitter = global.eventEmitter;
    this.bindEvents();
  }

  set currentUser(user) {
    this._currentUser = user;
  }

  get currentUser() {
    return this._currentUser;
  }

  // set eventEmitter(eventEmitter) {
  //   this._eventEmitter = eventEmitter;
  //   console.log('eventEmitter set');
  //   this.bindEvents();
  // }
  //
  // get eventEmitter() {
  //   return this._eventEmitter;
  // }

  bindEvents() {
    console.log('bindEvents');
    this.eventEmitter.on('newSwapRequestCreated', this.onNewSwapRequestCreated.bind(this));
  }

  onNewSwapRequestCreated(seller_id) {
    console.log(`seller_id ${seller_id}`);
    console.log(this.currentUser);
    console.log(this.currentUser.id);
    let sellerId = parseFloat(seller_id);
    if(this.currentUser && (this.currentUser.id === sellerId)) {
      console.log('orly?');
    } else {
      console.log('nope');
    }
  }
}

module.exports = UserMediator;
