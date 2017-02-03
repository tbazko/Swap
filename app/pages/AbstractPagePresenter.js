'use strict';

class AbstractPagePresenter {
  constructor(options) {
    this.template = options.template;
    this.model = undefined;
  }

  render(req, res, next) {
    if(!this.model) return console.log('model is not set');
    this._handleCommonSetup(req, res);
    this._renderView();
  }

  _handleCommonSetup(req, res) {
    this.view = res;
    this.req = req;
    this._parseRequest();
    this.model.addComponents();
  }

  _parseRequest() {
    return console.log('parseRequest is not set');
  }

  _renderView() {
    this.model.pageDataPromise.then((pageData) => {
      let response = this._arrayToObject(pageData);
      this.view.render(this.template, response);
    });
  }

  _arrayToObject(pageData) {
    let formattedPageData = {};
    pageData.forEach((cluster) => {
      for(var key in cluster) {
        if (!cluster.hasOwnProperty(key)) continue;
        formattedPageData[key] = cluster[key];
      }
    });
    return formattedPageData;
  }
}

module.exports = AbstractPagePresenter;
