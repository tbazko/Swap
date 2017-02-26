var requestListItemTemplate = '<a href="/request/{{id}}" class="row pb20" style="border: 2px solid red;">' +
  '<div class="col col-xs4 col-sm12 col-md4 clearfix">' +
  '{{#request.masterItems}}' +
    '<div class="left">' +
      '{{thumbnail}}' +
    '</div>' +
  '{{/request.masterItems}}' +
    '<div class="left p30">' +
      '<p>===></p>' +
      '<p><===</p>' +
    '</div>' +
    '<div class="left requestsOverview">' +
      '{{#request.slaveItems}}' +
        '<div class="requestsOverview-slaveItems">' +
          '{{thumbnail}}' +
        '</div>' +
      '{{/request.slaveItems}}' +
    '</div>' +
  '</div>' +
  '<div class="col col-xs4 col-sm12 col-md6">' +
    '<p>{{request.buyer.email}}:</p>' +
    '<p>{{request.message}}</p>' +
  '</div>' +
  '<div class="col col-xs4 col-sm12 col-md2">' +
    '<p>Inquiry</p>' +
    '<p>22 May 2016</p>' +
    '//- p Status (Inquiry, Accepted, Pending, Declined)' +
  '</div>' +
'</a>';

var Mustache = require('mustache');

function SwapRequestList() {
  this.id = 'incomingRequests';
}

SwapRequestList.prototype.addItem = function(request) {
  var incomingRequestsPane = document.getElementById(this.id);
  var requestListItem = document.createElement("div");
  requestListItem.innerHTML = Mustache.render(requestListItemTemplate, {request: request});

  if(incomingRequestsPane.firstChild) {
    incomingRequestsPane.insertBefore(requestListItem, incomingRequestsPane.firstChild);
  } else {
    incomingRequestsPane.appendChild(requestListItem);
  }
}

module.exports = SwapRequestList;
