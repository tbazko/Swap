"use strict";
const events = require('events');
const eventEmitter = new events.EventEmitter();
const formidable  = require("formidable");
const Product = require('../core/models/Product');

let render = function(req, res, next) {
  let productId = req.params.id;
  let product = new Product();
  
  product
    .getWithRelations(productId, '[user.[products], images, tags, swapForTags]', function(err, items) {
      if(items) {
        res.render('product', {
          product: items[0],
          author: items[0].user,
          productImage: items[0].images[0]
        });
      } else {
        res.redirect('/');
        res.end();
      }
    });
}

let renderForm = function(req, res, next) {
  if(req.body.productId) {
    renderEditingForm(req, res, next);
  } else {
    res.render('editItemForm', {url: req.path, userId: req.user.id, newItem: 1});
  }
}

let renderEditingForm = function(req, res, next) {
  let product = new Product();

  product
    .getWithRelations(req.body.productId, 'images', function(err, model) {
      res.render('editItemForm', { product: model[0], userId: req.user.id, newItem: 0, url: req.path });
    })
}

let destroy = function(req, res, next) {
  let product = new Product();
  product.destroy(req.body.productId, function(err) {
    if (err) console.log(err);

    res.redirect('/account/my-items');
  });
}

var create = function(req, res) {
  eventEmitter
    .once('formParsed', onFormParsed)
    .once('itemEdited', onItemEdited.bind(this, res));
  uploadImage(req, res);
}

function onFormParsed(fields, files) {
  let product = new Product();
  if(fields.newItem === '1') {
    product.create(fields, files, eventEmitter);
  } else {
    product.edit(fields, files, eventEmitter);
  }
}

function onItemEdited(res, isNew, item) {
  res.json({isNewItem: isNew, changed: true, product: item});
}

function uploadImage(req, res) {
  var form = new formidable.IncomingForm();
  form.parse(req, function(error, fields, files) {
    if(error) { console.log(error); }
    eventEmitter.emit('formParsed', fields, files);
  });
}

module.exports.render = render;
module.exports.renderForm = renderForm;
module.exports.destroy = destroy;
module.exports.create = create;
