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

  var TinyCarousel = function (selector, options) {
    this.element = query(document, selector)[0]
    this.options = merge({ interval: 5000 }, options)
    this.items = query(this.element, '.item')
    this.images = query(this.element, '.item img')
    this.goto(0)
    this.eventListen()

    for (var i = 0; i < this.images.length; i++) {
      this.images[i].addEventListener('load', proxy(this.setHeight, this))
    }
  }

  TinyCarousel.prototype.setHeight = function () {
    var maxHeight = 0

    for (var i = 0; i < this.items.length; i++) {
      var height = query(this.items[i], 'img')[0].clientHeight
      if (height > maxHeight) {
        maxHeight = height
      }
    }

    this.element.style.height = maxHeight + 'px'
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
