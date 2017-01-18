define([
  'text!components/templates/requestListItem.html',
  'mustache'
], function (
  requestListItemTemplate,
  Mustache
) {
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

  return SwapRequestList;
});