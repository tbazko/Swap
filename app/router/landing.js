"use strict";
const express = require('express');
const IndexPagePresenter = rootRequire('app/pages/index/IndexPagePresenter');
const SearchResultsPagePresenter = rootRequire('app/pages/searchResults/presenter');
const Search = rootRequire('app/Search');
let app = express();

app.set('views', __dirname + '/../templatesCommon');
app.get('/', makeIndexPage);
app.get('/category/:id/', makeCategoryPage);
app.get('/suggest', makeSuggestedSearch);
app.get('/search', makeSearchResultsPage);

function makeCategoryPage(req, res, next) {
  let p = new IndexPagePresenter({
    template: 'pages/categoryPageView'
  });
  p.render(req, res, next);
}

function makeIndexPage(req, res, next) {
  let p = new IndexPagePresenter({
    template: 'pages/indexPageView'
  });
  p.render(req, res, next);
}

function makeSuggestedSearch(req, res, next) {
  let s = new Search();
  s.search(req.query.search, function(results) {
    res.end(JSON.stringify(results));
  });
}

function makeSearchResultsPage(req, res, next) {
  let p = new IndexPagePresenter({
    template: 'pages/searchResultsView'
  });
  p.render(req, res, next);
}

module.exports = app;
