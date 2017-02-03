'use strict';
const express = require('express');
const helpers = require('../helpers/index');
const RequestListPage = rootRequire('app/pages/swapRequestList/presenter');
const RequestOverviewPage = rootRequire('app/pages/swapRequestOverview/presenter');
const SwapRequestCreator = rootRequire('app/swapRequest/SwapRequestCreator');
let app = express();
app.set('views', __dirname + '/../templatesCommon');
app.get('/requests', helpers.signInRedirect, makeRequestListPage);
app.get('/request/:id(\\d+)', helpers.signInRedirect, makeRequestOverviewPage);

app.post('/request/item/:id(\\d+)/create', helpers.signInRedirect, createRequest);

function makeRequestListPage(req, res, next) {
  let p = new RequestListPage({
    template: 'pages/swapRequestListView'
  });
  p.render(req, res, next);
}

function makeRequestOverviewPage(req, res, next) {
  let p = new RequestOverviewPage({
    template: 'pages/swapRequestOverviewView'
  });
  p.render(req, res, next);
}

function createRequest(req, res, next) {
  let s = new SwapRequestCreator();
  s.handle(req, res, next);
}

module.exports = app;
