var $ = require('jquery');
function Slider(sliderClass, options) {
  this.$slider = $(sliderClass);
  this.$slide = this.$slider.find('.js-slide');
  this.$next = this.$slider.find('.js-next');
  this.$prev = this.$slider.find('.js-prev');
  this.$dots = this.$slider.find('.js-dots');
  this.delay = options.delay;
  this.autoplay = options.autoplay;
  this.lastSlideIndex = this.$slide.length - 1;
}

Slider.prototype.init = function() {
  this.createDots();
  this.bindEvents();
  this.addBackwardsClass(this.lastSlideIndex);
  this.play();
}

Slider.prototype.bindEvents = function() {
  this.$next.on('click', this.next.bind(this));
  this.$prev.on('click', this.prev.bind(this));
  this.$slider
    .on('mouseover', this.pause.bind(this))
    .on('mouseout', this.play.bind(this));
  this.$dot.on('click', this.onClickedDot.bind(this));
}

Slider.prototype.addBackwardsClass = function(index) {
  this.$slide.eq(index).addClass('is-going-backwards').siblings().removeClass('is-going-backwards');
}

Slider.prototype.createDots = function() {
  var html = '<div class="slider-dot js-dot is-active"></div>';
  for(var i = 1; i < this.$slide.length; i++) {
    html += '<div class="slider-dot js-dot"></div>';
  }
  this.$dots.append(html);
  this.$dot = this.$dots.find('.js-dot');
}

Slider.prototype.onClickedDot = function(e) {
  var currentTarget = e.target || e.currentTarget;
  var $clickedDot = $(currentTarget).closest('.js-dot');
  this.addBackwardsClass($clickedDot.index() - 1);
  this.goto(this.$slide, $clickedDot.index());
  this.goto(this.$dot, $clickedDot.index());
}

Slider.prototype.goto = function($element, index) {
  $element.eq(index).addClass('is-active').siblings().removeClass('is-active');
}

Slider.prototype.next = function() {
  var $currentSlide = this.$slide.filter('.is-active');
  var $nextSlide, $nextDot;
  this.$slide.removeClass('is-going-backwards');
  if($currentSlide.index() === this.lastSlideIndex) {
    $nextSlide = this.$slide.eq(0);
    $nextDot = this.$dot.eq(0);
  } else {
    $nextSlide = $currentSlide.next();
    $nextDot = $currentSlide.next();
  }
  $currentSlide.removeClass('is-active').addClass('is-going-backwards');
  $nextSlide.addClass('is-active');
  this.goto(this.$dot, $nextSlide.index());
}

Slider.prototype.prev = function() {
  var $currentSlide = this.$slide.filter('.is-active');
  var $nextSlide, $nextDot;
  this.$slide.addClass('is-going-backwards');

  if($currentSlide.index() === 0) {
    $nextSlide = this.$slide.eq(this.lastSlideIndex);
    $nextDot = this.$dot.eq(this.lastSlideIndex);
  } else {
    $nextSlide = $currentSlide.prev();
    $nextDot = $currentSlide.prev();
  }

  $currentSlide.removeClass('is-active').removeClass('is-going-backwards');
  $nextSlide.addClass('is-active');
  this.goto(this.$dot, $nextSlide.index());
}

Slider.prototype.play = function() {
  if(this.autoplay) {
    this.playing = setInterval(function() {
      this.next();
    }.bind(this), this.delay);
  }
}

Slider.prototype.pause = function() {
  if(this.autoplay) {
    clearInterval(this.playing);
  }
}

module.exports = Slider;