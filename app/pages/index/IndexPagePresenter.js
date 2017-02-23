'use strict';
const BasePagePresenter = rootRequire('app/pages/base/BasePagePresenter');
const IndexPageModel = require('./IndexPageModel');

class IndexPagePresenter extends BasePagePresenter {
  constructor(options) {
    super(options);
    this.model = new IndexPageModel();
    this.model.itemListStrategy = options.itemListStrategy;
  }

  parseRequest() {
    super.parseRequest();
    this.model.path = this.req.path;
    this.model.userId = this.req.user ? this.req.user.id : false;
    this.model.params = this.req.params ? this.req.params : false;
    this.model.query = this.req.query;
    if(typeof this.model.query.tag === 'object') {
      this._normalizeUrl();
    }
  }

  _normalizeUrl() {
    let tags = this.model.query.tag;
    let regex = /[?,&]tag=.+/gmi;
    let startsFromTag = /\?tag/gmi.test(this.req.originalUrl);
    let redirect;
    if(startsFromTag) {
      this.req.originalUrl = this.req.originalUrl.replace(/[?,&]tag=.+/gmi, '?tag=' + tags[tags.length-1]);
    } else {
      this.req.originalUrl = this.req.originalUrl.replace(/[?,&]tag=.+/gmi, '&tag=' + tags[tags.length-1]);
    }
    this.redirectUrl = this.req.originalUrl;
  }
}

module.exports = IndexPagePresenter;
