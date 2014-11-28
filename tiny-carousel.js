var TinyCarousel = (function () {
  function query(element, selector) {
    return element.querySelectorAll(selector)
  }

  function merge(source, target) {
    for (var key in target) source[key] = target[key]
    return source
  }

  function proxy(fn, context) {
    return function () { fn.apply(context) }
  }

  var TinyCarousel = function (element, options) {
    this.element = element
    this.options = merge({ interval: 5000 }, options)
    this.items = query(this.element, '.item')
    this.goto(0)
    this.eventListen()
  }

  TinyCarousel.prototype.eventListen = function () {
    if (typeof touch != 'undefined') {
      touch.on(this.element, 'swiperight', proxy(this.prev, this))
      touch.on(this.element, 'swipeleft', proxy(this.next, this))
    }
  }

  TinyCarousel.prototype.goto = function (index) {
    index = index < 0 ? this.items.length - 1 : index % this.items.length
    for (var i = 0; i < this.items.length; i++) {
      if (i == index) {
        this.items[i].classList.add('active')
        this.active = i
      } else {
        this.items[i].classList.remove('active')
      }
    }
    this.cycle()
  }

  TinyCarousel.prototype.cycle = function () {
    this.interval && clearInterval(this.interval)
    this.interval = setInterval(proxy(this.next, this), this.options.interval)
  }

  TinyCarousel.prototype.next = function () {
    this.goto(this.active + 1)
  }

  TinyCarousel.prototype.prev = function () {
    this.goto(this.active - 1)
  }

  return TinyCarousel
})()
