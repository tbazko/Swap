'use strict';
const formidable = require('formidable');
const BasePagePresenter = rootRequire('app/pages/base/BasePagePresenter');
const Model = require('./model');

class UserProfileEditPagePresenter extends BasePagePresenter {
  constructor(options) {
    super(options);
    this.model = new Model();
    this.eventEmitter = this.model.eventEmitter;
    this.bindEvents();
  }

  bindEvents() {
    this.eventEmitter.on('formError', () => this.onFormError());
    this.eventEmitter.on('formSaved', (user) => this.onFormSaved(user));
  }

  parseRequest() {
    super.parseRequest();
    this.model.currentUser = this.req.user;
    this.model.userId = this.req.params.userId || this.req.user.id;
    this.model.isCurrentUserProfile = this.req.params.userId ? false : true;
  }

  renderView() {
    if(this.req.method === 'GET') {
      super.renderView();
    } else if(this.req.method === 'POST') {
      this._parseForm();
    }
  }

  _parseForm() {
    let form = new formidable.IncomingForm();
    form.multiples = true;
    form.parse(this.req, this.model.handleFormData.bind(this.model));
  }

  onFormError() {

  }

  onFormSaved(user) {
    this.view.redirect('/user/profile');
  }
}

module.exports = UserProfileEditPagePresenter;
