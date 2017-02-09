"use strict";
const express = require('express');
const IndexPagePresenter = rootRequire('app/pages/index/IndexPagePresenter');
const Search = rootRequire('app/Search');
let app = express();

app.set('views', __dirname + '/../templatesCommon');
app.get('/tag/:id/', makeIndexPageWithItemsFilteredByTag);
app.get('/', makeIndexPage);
app.get('/search', makeSearch);


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

function makeSearch(req, res, next) {
  let s = new Search();
  s.search(req.query.key, function(results) {
    res.end(JSON.stringify(results));
  });
}

module.exports = app;
