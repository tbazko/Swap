(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

// var $ = require('./lib/jquery');
// var utils = require('./components/utils/utils');
// var Menu = require('./components/Menu');
// var Counter = require('./components/Counter');
// var FormValidator = require('./components/FormValidator');
// var Search = require('./components/Search');

// var myDropzone = new Dropzone("div#dropzone", {
//   url: '/',
//   autoProcessQueue: false,
//   uploadMultiple: true,
//   parallelUploads: 100,
//   maxFiles: 10
// });

if (utils.readCookie('logged')) {
  var userId = utils.readCookie('logged');
  window.socket = io();
  var socket = window.socket;
  var counter;

  socket.on('newSwapRequest', function (data) {
    if (!counter) {
      counter = new Counter();
    }
    counter.update();
  });

  socket.emit('joinRoom', userId);
}
var form = new FormValidator('js-form');
var menu = new Menu('js-menu-wrapper', 'js-menu-trigger');
var search = new Search();
form.init();
menu.init();
search.init();

$('.js-destroy-btn').on('click', onSubmit);

function onSubmit(e) {
  e.preventDefault();
  var $destroyForm = $(e.target).closest('.js-destroy-form');
  var url = $destroyForm.attr("action");
  var formData = {};
  var formData = utils.gatherFormData($destroyForm);

  $.ajax({
    url: url,
    method: 'POST',
    data: formData
  }).done(function (resp) {
    $(e.target).closest('.item').remove();
  }).fail(function (jqXHR, textStatus) {
    console.log(jqXHR, textStatus);
    return false;
  });
}

},{}]},{},[1]);
