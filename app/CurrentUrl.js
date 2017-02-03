'use strict';

class CurrentUrl {
  constructor(pageModel) {
    this.currentOriginalUrl = pageModel.originalUrl;
  }

  get responseDataPromise() {
    let promise = new Promise((resolve, reject) => {
      resolve({url: this.currentOriginalUrl});
    });
    return promise;
  }
}

module.exports = CurrentUrl;
