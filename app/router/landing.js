"use strict";
const express = require('express');
const IndexPagePresenter = rootRequire('app/pages/index/IndexPagePresenter');
let app = express();
app.set('views', __dirname + '/../templatesCommon');
app.get('/tag/:id/', makeIndexPageWithItemsFilteredByTag);
app.get('/', makeIndexPage);
app.get('/stressy--KbtDED_a_-rupwxm9AV.html', verify);

function makeIndexPageWithItemsFilteredByTag(req, res, next) {
  let p = new IndexPagePresenter({
    template: 'pages/landingPageView',
    itemListStrategy: rootRequire('app/itemList/strategies/filteredByTag')
  });
  p.render(req, res, next);
}

function makeIndexPage(req, res, next) {
  let p = new IndexPagePresenter({
    template: 'pages/landingPageView',
    itemListStrategy: rootRequire('app/itemList/strategies/default')
  });
  p.render(req, res, next);
}

function verify(req, res, next) {
  res.render('pages/stressy--KbtDED_a_-rupwxm9AV');
}

module.exports = app;
