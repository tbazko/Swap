'use strict';

class CurrentUrl {
  constructor(pageModel) {
    this.currentOriginalUrl = pageModel.originalUrl;
    this.query = pageModel.query;
    this.path = pageModel.path;
    this.hostname = pageModel.hostname;
    this.params = pageModel.params;
  }

  get responseDataPromise() {
    let promise = new Promise((resolve, reject) => {
      resolve({
        url: {
          original: this.currentOriginalUrl,
          path: this.path,
          hostname: this.hostname,
          query: this.query,
          params: this.params
        }
      });
    });
    return promise;
  }
}

module.exports = CurrentUrl;
