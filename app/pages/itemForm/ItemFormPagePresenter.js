'use strict';
const formidable  = require('formidable');
const BasePagePresenter = rootRequire('app/pages/base/BasePagePresenter');
const ItemFormPageModel = require('./ItemFormPageModel');

class ItemFormPagePresenter extends BasePagePresenter {
  constructor(options) {
    super(options);
    this.model = new ItemFormPageModel();
    this.eventEmitter = this.model.eventEmitter;
    this._bindEvents();
  }

  parseRequest() {
    super.parseRequest();
    this.model.itemId = this.req.params && this.req.params.id;
    this.method = this.req.method;
  }

  renderView() {
    if(this.method === 'GET') {
      this._renderForm();
    } else if(this.method === 'POST') {
      this._parseForm();
    }
  }

  _bindEvents() {
    this.eventEmitter.on('formError', () => this._onFormError());
    this.eventEmitter.on('formSaved', (isNew, item) => this._onFormSaved(isNew, item));
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

  _onFormError() {
    this.view.json({error: this.model.error});
  }

  _onFormSaved(isNew, item) {
    this.view.json({isNewItem: isNew, changed: true, item: item});
  }

  _renderEmptyForm() {
    super.renderView();
  }

  _renderEditForm() {
    this.model.pageDataPromise.then((pageData) => {
      let response = this._arrayToObject(pageData);
      if(response.item) {
        if(!response.itemBelongsToCurrentUser) return this._denyItemEditing();
        response.userId = this.model.currentUserId;
        response.newItem = 0;
        this.view.render(this.template, response);
      } else {
        this._redirectToItemNotExists();
      }
    });
  }

  _denyItemEditing() {
    this.view.render(this.template, {itemBelongsToCurrentUser: response.itemBelongsToCurrentUser});
  }

  _redirectToItemNotExists() {
    this.view.redirect(this.req.path.replace(/\/edit/gi, ''));
  }
}

module.exports = ItemFormPagePresenter;
