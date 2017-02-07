'use strict';
const formidable  = require('formidable');
const BasePagePresenter = rootRequire('app/pages/base/BasePagePresenter');
const ItemFormPageModel = require('./ItemFormPageModel');

class ItemFormPagePresenter extends BasePagePresenter {
  constructor(options) {
    super(options);
    this.model = new ItemFormPageModel();
    this.eventEmitter = this.model.eventEmitter;
    this.bindEvents();
  }

  parseRequest() {
    super.parseRequest();
    this.model.itemId = this.req.params && this.req.params.id;
    this.model.path = this.req.path;
    this.model.user = this.req.user ? this.req.user : false;
    this.method = this.req.method;
  }

  _renderView() {
    if(this.method === 'GET') {
      this._renderForm();
    } else if(this.method === 'POST') {
      this._parseForm();
    }
  }

  bindEvents() {
    this.eventEmitter.on('formError', () => this.onFormError());
    this.eventEmitter.on('formSaved', (isNew, item) => this.onFormSaved(isNew, item));
  }

  _renderForm() {
    if(this.model.itemId) {
      this._renderEditForm();
    } else {
      this._renderEmptyForm();
    }
  }

  _parseForm() {
    let form = new formidable.IncomingForm();
    form.multiples = true;
    form.parse(this.req, this.model.handleFormData.bind(this.model));
  }

  onFormError() {

  }

  onFormSaved(isNew, item) {
    this.view.json({isNewItem: isNew, changed: true, item: item});
  }

  _renderEmptyForm() {
    this.view.render(this.template, {userId: this.model.user.id, newItem: 1});
  }

  _renderEditForm() {
    this.model.pageDataPromise.then((pageData) => {
      let response = this._arrayToObject(pageData);
      response.userId = this.model.user.id;
      response.newItem = 0;
      response.url = this.model.path;
      if(response.item) {
        this.view.render(this.template, response);
      } else {
        this.view.send('Sorry such item doesn\'t exist');
        // this._renderEmptyForm();
      }
    });
  }
}

module.exports = ItemFormPagePresenter;
