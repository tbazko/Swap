'use strict';
const ItemFormModel = require('./ItemFormModel');
const formidable  = require('formidable');

class ItemFormPresenter {
  constructor() {
    this.model = new ItemFormModel();
    this.template = 'itemFormView';
    this.eventEmitter = this.model.eventEmitter;
    this.bindEvents();
  }

  bindEvents() {
    this.eventEmitter.on('methodChanged', () => this.onMethodChanged());
    this.eventEmitter.on('formError', () => this.onFormError());
    this.eventEmitter.on('formSaved', (isNew, item) => this.onFormSaved(isNew, item));
  }

  handle(req, res, next) {
    this.res = res;
    this.req = req;
    this.model.modelData = this.req;
  }

  onMethodChanged() {
    if(this.model.method === 'GET') {
      this._renderForm();
    } else if(this.model.method === 'POST') {
      this._parseForm();
    }
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
    form.parse(this.req, this._handleParsedFormData.bind(this));
  }

  _handleParsedFormData(error, fields, files) {
    if(error) this.model.error = error;
    this.model.parsedFormData = {fields: fields, files: files};
  }

  onFormError() {

  }

  onFormSaved(isNew, item) {
    this.res.json({isNewItem: isNew, changed: true, item: item});
  }

  _renderEmptyForm() {
    this.res.render(this.template, {url: this.model.path, userId: this.model.user.id, newItem: 1});
  }

  _renderEditForm() {
    this.model.item.then((item) => {
      if(item) {
        this.res.render(this.template, {item: item, userId: this.model.user.id, newItem: 0, url: this.model.path });
      } else {
        this.res.send('Sorry such item doesn\'t exist');
        // this._renderEmptyForm();
      }
    });
  }
}

module.exports = ItemFormPresenter;
