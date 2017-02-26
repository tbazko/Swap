define(function (require) {
  function Menu(menuClass, triggerClass, options) {
  	this.menu = document.getElementsByClassName(menuClass)[0];
  	this.trigger = document.getElementsByClassName(triggerClass)[0];
  	this.container = document.getElementById('main');
  	this.navigation = document.getElementById('navigation');
  	this.navigationHeight = this.navigation.offsetHeight;

  	this.lastKnownScrollPosition = 0;
  	this.ticking = false;
  }

  Menu.prototype.init = function () {
  	this.bindEvents();
  }

  Menu.prototype.bindEvents = function () {
  	this.trigger.addEventListener('click', this.toggleMenu.bind(this), false);
  	window.addEventListener('scroll', this.onScrollThrottle.bind(this), false);
  	window.addEventListener('optimizedResize', this.setNavigationHeight.bind(this), false);
  }

  Menu.prototype.onScrollThrottle = function () {
  	this.lastKnownScrollPosition = window.scrollY;
  	if (!this.ticking) {
  		window.requestAnimationFrame(function () {
  			this.getSticky(this.lastKnownScrollPosition);
  			this.ticking = false;
  		}.bind(this));
  	}
  	this.ticking = true;
  }

  Menu.prototype.setNavigationHeight = function () {
  	this.navigation.style.height = '';
  	this.navigationHeight = this.navigation.offsetHeight;
  	if (this.lastKnownScrollPosition) {
  		this.getSticky(this.lastKnownScrollPosition);
  	}
  }

  Menu.prototype.toggleMenu = function () {
  	this.menu.classList.toggle('is-active');
  	this.trigger.classList.toggle('is-active');
  	this.container.classList.toggle('is-active-menu');
  }

  Menu.prototype.getSticky = function () {
  	var max = 54;
  	var newHeight = this.lastKnownScrollPosition < this.navigationHeight - max ? this.navigationHeight - this.lastKnownScrollPosition : max;
  	this.navigation.style.height = newHeight + 'px';

  	if (this.lastKnownScrollPosition > (this.navigationHeight - max) / 2) {
  		this.navigation.classList.add('is-sticky');
  	} else {
  		this.navigation.classList.remove('is-sticky');
  	}
  }

  return Menu;
});
