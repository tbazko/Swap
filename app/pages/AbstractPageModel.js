'use strict';

class AbstractPageModel {
  constructor() {
    this.componentsResponseDataPromises = [];
  }

  get pageDataPromise() {
    return Promise.all(this.componentsResponseDataPromises);
  }

  addComponents() {
    return console.log('components aren\'t added');
  }

  _add(componentClass) {
    let c = new componentClass(this);
    let promise = c.responseDataPromise;
    this.componentsResponseDataPromises.push(promise);
  }

  _create(componentClass) {
    let c = new componentClass(this);
    let promise = c.responseDataPromise;
    this.componentsResponseDataPromises.push(promise);
    return c;
  }
}

module.exports = AbstractPageModel;
