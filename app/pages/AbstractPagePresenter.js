'use strict';

class AbstractPagePresenter {
  constructor(options) {
    this.template = options.template;
    this.model = undefined;
  }

  render(req, res, next) {
    if(!this.model) return console.log('model is not set');
    this._handleCommonSetup(req, res, next);
    if(this.redirectUrl) {
      this.redirect();
    } else {
      this.renderView();
    }
  }

  _handleCommonSetup(req, res, next) {
    this.view = res;
    this.req = req;
    this.next = next;
    this.parseRequest();
    if(!this.redirectUrl) {
      this.model.addComponents();
    }
  }

  parseRequest() {
    return console.log('parseRequest is not set');
  }

  redirect() {
    this.view.redirect(this.redirectUrl);
  }

  renderView() {
    this.model.pageDataPromise.then((pageData) => {
      let response = this._arrayToObject(pageData);
      if(response) {
        this.view.render(this.template, response);
      } else {
        this.view.redirect('/404');
      }
    }).catch((err) => {
      console.log('Abstract renderView error ' + err)
      this.view.redirect('/404');
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
