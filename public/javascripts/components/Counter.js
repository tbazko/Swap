define([], function () {
  function Counter() {
    this.id = 'requestCounter';
    this.count = 0;
  }

  Counter.prototype.update = function() {
    var counter = document.getElementById(this.id);
    counter.innerHTML = ++this.count;
  }

  return Counter;
});
