'use strict';
const express = require('express');
const helpers = require('../helpers/index');
const SwapRequestCreator = rootRequire('app/swapRequest/SwapRequestCreator');
const SwapRequestListPresenter = rootRequire('app/swapRequest/list/SwapRequestListPresenter');
const SwapRequestOverviewPresenter = rootRequire('app/swapRequest/overview/SwapRequestOverviewPresenter');
let app = express();

app.get('/requests', helpers.signInRedirect, makeRequestsList);
app.get('/request/:id(\\d+)/', helpers.signInRedirect, makeRequestOverview);

app.post('/request/item/:id(\\d+)//create', helpers.signInRedirect, createRequest);

function makeRequestsList(req, res, next) {
  app.set('views', __dirname + '/../swapRequest/list');
  let s = new SwapRequestListPresenter();
  s.handle(req, res, next);
}

function makeRequestOverview(req, res, next) {
  app.set('views', __dirname + '/../swapRequest/overview');
  let s = new SwapRequestOverviewPresenter();
  s.handle(req, res, next);
}

function createRequest(req, res, next) {
  let s = new SwapRequestCreator();
  s.handle(req, res, next);
}

module.exports = app;
