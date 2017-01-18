'use strict';
const express = require('express');
const helpers = require('../helpers/index');
const MessageCreator = rootRequire('app/chat/MessageCreator');
const SwapRequestCreator = rootRequire('app/swapRequest/SwapRequestCreator');
const SwapRequestListPresenter = rootRequire('app/swapRequest/list/SwapRequestListPresenter');
const SwapRequestOverviewPresenter = rootRequire('app/swapRequest/overview/SwapRequestOverviewPresenter');
let app = express();

app.get('/requests', helpers.signInRedirect, makeRequestsList);
app.get('/request/:id(\\d+)/', helpers.signInRedirect, makeRequestOverview);
// app.post('/request/:id/message', helpers.signInRedirect, createMessage);

app.post('/request/item/:id/create', helpers.signInRedirect, createRequest);

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

function createMessage(req, res, next) {
  let m = new MessageCreator();
  m.handle(req, res, next);
}

function createRequest(req, res, next) {
  let s = new SwapRequestCreator();
  s.handle(req, res, next);
}

module.exports = app;
