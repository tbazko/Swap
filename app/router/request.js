'use strict';
const express = require('express');
const helpers = require('../helpers/index');
const MessageCreator = rootRequire('app/message/MessageCreator');
const SwapRequestCreator = rootRequire('app/swapRequest/SwapRequestCreator');
const SwapRequestListPresenter = rootRequire('app/swapRequest/list/SwapRequestListPresenter');
const SwapRequestOverviewPresenter = rootRequire('app/swapRequest/overview/SwapRequestOverviewPresenter');
let app = express();

app.get('/requests', helpers.signInRedirect, makeRequestsList);
app.get('/request/:id(\\d+)/', helpers.signInRedirect, makeRequestOverview);

app.post('/request/:id/message', helpers.signInRedirect, createMessage);
app.post('/request/item/:id/create', createRequest);

function makeRequestsList(req, res, next) {
  app.set('views', __dirname + '/../swapRequest/list');
  let swapRequestList = new SwapRequestListPresenter();
  swapRequestList.handle(req, res, next);
}

function makeRequestOverview(req, res, next) {
  console.log(1);
  app.set('views', __dirname + '/../swapRequest/overview');
  let swapRequestOverview = new SwapRequestOverviewPresenter();
  console.log(2);
  swapRequestOverview.handle(req, res, next);
}

function createMessage(req, res, next) {
  let messageCreator = new MessageCreator();
  messageCreator.handle(req, res, next);
}

function createRequest(req, res, next) {
  let swapRequestCreator = new SwapRequestCreator();
  swapRequestCreator.handle(req, res, next);
}

// app.get('/requests', helpers.signInRedirect, controller.renderOverview);
// app.get('/requests/:id', helpers.signInRedirect, controller.renderOne);

module.exports = app;
