define([
  'components/utils/utils'
], function (
  utils
) {
  function SwapRequestStatusChanger() {
    this.swapRequestButtons = document.getElementById('swapRequestOverviewButtons');
    this.acceptButton = document.getElementById('acceptSwapRequest');
    this.declineButton = document.getElementById('declineSwapRequest');
    this.statusLabels = document.getElementsByClassName('statusLabel');
    this.mainContainer = document.getElementById('main');
    this.status = null;
  }

  SwapRequestStatusChanger.prototype.init = function() {
    if(this.acceptButton && this.declineButton) {
      this.bindEvents();
    }
    this.listenToSockets();
  }

  SwapRequestStatusChanger.prototype.bindEvents = function () {
    this.acceptButton.addEventListener('click', this.emitStatusChange.bind(this, 'accepted'));
    this.declineButton.addEventListener('click', this.emitStatusChange.bind(this, 'declined'));
  }

  SwapRequestStatusChanger.prototype.listenToSockets = function () {
    window.socket.on('updateStatus', this.updateView.bind(this));
  };

  SwapRequestStatusChanger.prototype.emitStatusChange = function (status, e) {
    e.preventDefault();
    window.socket.emit('statusChanged', status);
  }

  SwapRequestStatusChanger.prototype.updateView = function(status) {
    this.status = status;
    this.updateStatusLabels();
    this.updateMainContainer();
    this.removeSwapRequestButtons();
  }

  SwapRequestStatusChanger.prototype.updateStatusLabels = function () {
    for(var i = 0, l = this.statusLabels.length; i < l; i++) {
      this.statusLabels[i].className = 'statusLabel statusLabel--' + this.status;
      var p = document.createElement('p');
      p.innerText = this.status;
      this.statusLabels[i].innerHTML = '';
      this.statusLabels[i].appendChild(p);
    }
  };

  SwapRequestStatusChanger.prototype.updateMainContainer = function () {
    this.mainContainer.className = 'main-container ' + this.status;
  };

  SwapRequestStatusChanger.prototype.removeSwapRequestButtons = function () {
    if(!this.swapRequestButtons) return;
    utils.addClass(this.swapRequestButtons, 'is-hidden');
    setTimeout(function() {
      this.swapRequestButtons.innerHTML = '';
    }.bind(this), 250);
  };

  return SwapRequestStatusChanger;
});
