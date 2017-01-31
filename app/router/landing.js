"use strict";
const express = require('express');
const IndexPagePresenter = rootRequire('app/pages/index/IndexPagePresenter');
let app = express();
app.set('views', __dirname + '/../pages/templates');
app.get('/tag/:id/', makeIndexPageWithItemsFilteredByTag);
app.get('/', makeIndexPage);

function makeIndexPageWithItemsFilteredByTag(req, res, next) {
  let p = new IndexPagePresenter({
    template: 'landingPageView',
    itemListStrategy: rootRequire('app/itemList/strategies/filteredByTag')
  });
  p.render(req, res, next);
}

function makeIndexPage(req, res, next) {
  let p = new IndexPagePresenter({
    template: 'landingPageView',
    itemListStrategy: rootRequire('app/itemList/strategies/default')
  });
  p.render(req, res, next);
}

module.exports = app;
