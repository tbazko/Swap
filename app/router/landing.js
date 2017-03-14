"use strict";
const express = require('express');
const IndexPagePresenter = rootRequire('app/pages/index/IndexPagePresenter');
const SearchResultsPagePresenter = rootRequire('app/pages/searchResults/presenter');
const ItemList = rootRequire('app/itemList/ItemList');
const CurrentUrl = rootRequire('app/CurrentUrl');
const Search = rootRequire('app/Search');
let app = express();

app.set('views', __dirname + '/../templatesCommon');
app.get('/', makeIndexPage);
app.get('/category/:id/', makeCategoryPage);
app.get('/suggest', makeSuggestedSearch);
app.get('/search', makeSearchResultsPage);
app.get('/items',makeItemList);

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

function makeItemList(req, res, next) {
  let i = new ItemList(req);
  let u = new CurrentUrl(req);
  let listResponse;
  i.responseDataPromise.then((response) => {
    listResponse = response;
    return u.responseDataPromise;
  }).then((urlResponse) => {
    var formattedData = arrayToObject([listResponse, urlResponse]);
    res.send(formattedData);
  });
}

function arrayToObject(pageData) {
  let formattedPageData = {};
  pageData.forEach((cluster) => {
    for(var key in cluster) {
      if (!cluster.hasOwnProperty(key)) continue;
      formattedPageData[key] = cluster[key];
    }
  });
  return formattedPageData;
}

module.exports = app;
