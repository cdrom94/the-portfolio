/**
 * main.js
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2016, Codrops
 * http://www.codrops.com
 */
;(function (window) {
  'use strict';
  function extend(a, b) {
    for (var key in b) {
      if (b.hasOwnProperty(key)) {
        a[key] = b[key];
      }
    }
    return a;
  }
  class Line {
    constructor(options) {
      this.options = extend({}, this.options);
      extend(this.options, options);
      this._init();
    }
    _init() {
      this.el = document.createElement('div');
      this.el.className = 'decoline';
      var opts = this.options;
      this.el.style.width = typeof opts.width === 'number' ? opts.width + 'px' : opts.width;
      this.el.style.height = typeof opts.height === 'number' ? opts.height + 'px' : opts.height;
      this.el.style.left = opts.left;
      this.el.style.top = opts.top;
      this.el.style.background = opts.color;
      this.el.style.opacity = opts.hidden ? 0 : 1;
      this._setOrigin();
      this.rendered = !opts.hidden;
    }
    _setOrigin() {} 
    animate(settings) {
      if (this.isAnimating) {
        return false;
      }
      this.isAnimating = true;
      var animeProps = {
        targets: this.el,
        duration: this.options.animation.duration,
        easing: this.options.animation.easing,
        delay: this.options.animation.delay
      };
      if (settings && settings.direction) {
        this.options.animation.direction = settings.direction;
      }
      this._setOrigin();
      if (this.options.animation.direction === 'TopBottom'
      ) {
          animeProps.scaleY = this.rendered ? [1, 0] : [0, 1];
        } else {
        animeProps.scaleX = this.rendered ? [1, 0] : [0, 1];
      }
      if (!this.rendered) {
        this.el.style.opacity = 0.5;
      }
      let self = this;
      animeProps.complete = function () {
        self.rendered = !self.rendered;
        if (settings && settings.complete) {
          settings.complete();
        }
        self.isAnimating = false;
      };
      anime(animeProps);
    }
    show() {
      this.el.style.opacity = 1;
      this.el.style.WebkitTransform = this.el.style.transform = 'scale3d(1,1,1)';
      this.rendered = true;
    }
    hide() {
      this.el.style.opacity = 0;
      this.rendered = false;
    }
  }
  Line.prototype.options = {
    width: 1,
    height: '100%',
    left: '50%',
    top: '0%',
    color: '#000',
    hidden: false,
    animation: {
      duration: 500,
      easing: 'linear',
      delay: 0,
      direction: 'TopBottom'
    }
  };
  class LineMaker {
    constructor(options) {
      this.options = extend({}, this.options);
      extend(this.options, options);

      this._init();
    }
    _init() {
      this.lines = [];
      this.decolines = document.createElement('div');
      this.decolines.className = 'decolines';
      if (this.options.position === 'fixed') {
        this.decolines.className += ' decolines--fixed';
      }
      for (var i = 0, len = this.options.lines.length; i < len; ++i) {
        var lineconfig = this.options.lines[i],
            line = new Line(lineconfig);
        this.decolines.appendChild(line.el);
        this.lines.push(line);
      } 
      var p = this.options.parent,
          pEl = typeof p.element === 'string' ? document.querySelector(p.element) : p.element;
      if (p.position === 'prepend') {
        pEl.insertBefore(this.decolines, pEl.firstChild);
      } else {
        pEl.appendChild(this.decolines);
      }
    }
    _animateLine(lineIdx, dir, settings) {
      var line = this.lines[lineIdx];

      if (line && dir === 'in' && !line.rendered || dir === 'out' && line.rendered) {
        line.animate(settings);
      }
    }
    _animateLines(dir, callback) {
      var completed = 0,
          totalLines = this.lines.length;
      if (!totalLines) {
        callback();
        return;
      }
      var checkCompleted = function () {
        completed++;
        if (completed === totalLines && typeof callback === 'function') {
          callback();
        }
      };
      for (var i = 0; i < totalLines; ++i) {
        var line = this.lines[i];
        if (dir === 'in' && !line.rendered || dir === 'out' && line.rendered) {
          line.animate({
            complete: function () {
              checkCompleted();
            }
          });
        } else {
          checkCompleted();
        }
      }
    }
    _toggleLine(lineIdx, action) {
      var line = this.lines[lineIdx];
      if (!line) {
        return;
      }
      if (action === 'show' && !line.rendered) {
        line.show();
      } else if (action === 'hide' && line.rendered) {
        line.hide();
      }
    }
    _toggleLines(action) {
      for (var i = 0, len = this.lines.length; i < len; ++i) {
        this._toggleLine(i, action);
      }
    }
    animateLineIn(lineIdx, settings) {
      this._animateLine(lineIdx, 'in', settings);
    }
    animateLineOut(lineIdx, settings) {
      this._animateLine(lineIdx, 'out', settings);
    }
    animateLinesIn(callback) {
      this._animateLines('in', callback);
    }
    animateLinesOut(callback) {
      this._animateLines('out', callback);
    }
    showLine(lineIdx) {
      this._toggleLine(lineIdx, 'show');
    }
    hideLine(lineIdx) {
      this._toggleLine(lineIdx, 'hide');
    }
    showLines() {
      this._toggleLines('show');
    }
    hideLines() {
      this._toggleLines('hide');
    }
    removeLine(lineIdx) {
      var line = this.lines[lineIdx];

      if (line) {
        this.lines.splice(lineIdx, 1);
        this.decolines.removeChild(this.decolines.children[lineIdx]);
      }
    }
    removeLines() {
      this.lines = [];
      this.decolines.innerHTML = '';
    }
    createLine(settings) {
      var line = new Line(settings);
      this.decolines.appendChild(line.el);
      this.lines.push(line);
    }
    getTotalLines() {
      return this.lines.length;
    }
  }
  LineMaker.prototype.options = {
    parent: {
      element: document.body,
      position: 'prepend'
    },
    position: 'fixed',
    lines: []
  };
  window.LineMaker = LineMaker;
})(window);
(function () {
  var colorName = 'rgba(166, 188, 237, 0.65)';
  var lineMaker = new LineMaker({
    position: 'fixed',
    lines: [
    {
      top: 0,
      left: '5vw',
      width: 1,
      height: '100%',
      color: colorName,
      hidden: true,
      animation: {
        duration: 1000,
        easing: 'easeInOutSine',
        delay: 0,
        direction: 'TopBottom'
      }
    }, {
      top: 0,
      left: '7.5vw',
      width: 1,
      height: '100%',
      color: colorName,
      hidden: true,
      animation: {
        duration: 1000,
        easing: 'easeInOutSine',
        delay: 0,
        direction: 'TopBottom'
      }
    }, {
      top: 0,
      left: '10vw',
      width: 1,
      height: '100%',
      color: colorName,
      hidden: true,
      animation: {
        duration: 1000,
        easing: 'easeInOutSine',
        delay: 0,
        direction: 'TopBottom'
      }
    }, {
      top: 0,
      left: '12.5vw',
      width: 1,
      height: '100%',
      color: colorName,
      hidden: true,
      animation: {
        duration: 1000,
        easing: 'easeInOutSine',
        delay: 0,
        direction: 'TopBottom'
      }
    }, {
      top: 0,
      left: '15vw',
      width: 1,
      height: '100%',
      color: colorName,
      hidden: true,
      animation: {
        duration: 1000,
        easing: 'easeInOutSine',
        delay: 0,
        direction: 'TopBottom'
      }
    }, {
      top: 0,
      left: '17.5vw',
      width: 1,
      height: '100%',
      color: colorName,
      hidden: true,
      animation: {
        duration: 1000,
        easing: 'easeInOutSine',
        delay: 0,
        direction: 'TopBottom'
      }
    }, {
      top: 0,
      left: '20vw',
      width: 1,
      height: '100%',
      color: colorName,
      hidden: true,
      animation: {
        duration: 1000,
        easing: 'easeInOutSine',
        delay: 20,
        direction: 'TopBottom'
      }
    }, {
      top: 0,
      left: '22.5vw',
      width: 1,
      height: '100%',
      color: colorName,
      hidden: true,
      animation: {
        duration: 1000,
        easing: 'easeInOutSine',
        delay: 0,
        direction: 'TopBottom'
      }
    }, {
      top: 0,
      left: '25vw',
      width: 1,
      height: '100%',
      color: colorName,
      hidden: true,
      animation: {
        duration: 1000,
        easing: 'easeInOutSine',
        delay: 0,
        direction: 'TopBottom'
      }
    }, {
      top: 0,
      left: '27.5vw',
      width: 1,
      height: '100%',
      color: colorName,
      hidden: true,
      animation: {
        duration: 1000,
        easing: 'easeInOutSine',
        delay: 0,
        direction: 'TopBottom'
      }
    }, {
      top: 0,
      left: '30vw',
      width: 1,
      height: '100%',
      color: colorName,
      hidden: true,
      animation: {
        duration: 1000,
        easing: 'easeInOutSine',
        delay: 40,
        direction: 'TopBottom'
      }
    }, {
      top: 0,
      left: '32.5vw',
      width: 1,
      height: '100%',
      color: colorName,
      hidden: true,
      animation: {
        duration: 1000,
        easing: 'easeInOutSine',
        delay: 0,
        direction: 'TopBottom'
      }
    }, {
      top: 0,
      left: '35vw',
      width: 1,
      height: '100%',
      color: colorName,
      hidden: true,
      animation: {
        duration: 1000,
        easing: 'easeInOutSine',
        delay: 0,
        direction: 'TopBottom'
      }
    }, {
      top: 0,
      left: '37.5vw',
      width: 1,
      height: '100%',
      color: colorName,
      hidden: true,
      animation: {
        duration: 1000,
        easing: 'easeInOutSine',
        delay: 0,
        direction: 'TopBottom'
      }
    }, {
      top: 0,
      left: '40vw',
      width: 1,
      height: '100%',
      color: colorName,
      hidden: true,
      animation: {
        duration: 1000,
        easing: 'easeInOutSine',
        delay: 60,
        direction: 'TopBottom'
      }
    }, {
      top: 0,
      left: '42.5vw',
      width: 1,
      height: '100%',
      color: colorName,
      hidden: true,
      animation: {
        duration: 1000,
        easing: 'easeInOutSine',
        delay: 0,
        direction: 'TopBottom'
      }
    }, {
      top: 0,
      left: '45vw',
      width: 1,
      height: '100%',
      color: colorName,
      hidden: true,
      animation: {
        duration: 1000,
        easing: 'easeInOutSine',
        delay: 0,
        direction: 'TopBottom'
      }
    }, {
      top: 0,
      left: '47.5vw',
      width: 1,
      height: '100%',
      color: colorName,
      hidden: true,
      animation: {
        duration: 1000,
        easing: 'easeInOutSine',
        delay: 0,
        direction: 'TopBottom'
      }
    }, {
      top: 0,
      left: '50vw',
      width: 1,
      height: '100%',
      color: colorName,
      hidden: true,
      animation: {
        duration: 1000,
        easing: 'easeInOutSine',
        delay: 80,
        direction: 'TopBottom'
      }
    }, {
      top: 0,
      left: '52.5vw',
      width: 1,
      height: '100%',
      color: colorName,
      hidden: true,
      animation: {
        duration: 1000,
        easing: 'easeInOutSine',
        delay: 0,
        direction: 'TopBottom'
      }
    }, {
      top: 0,
      left: '55vw',
      width: 1,
      height: '100%',
      color: colorName,
      hidden: true,
      animation: {
        duration: 1000,
        easing: 'easeInOutSine',
        delay: 0,
        direction: 'TopBottom'
      }
    }, {
      top: 0,
      left: '57.5vw',
      width: 1,
      height: '100%',
      color: colorName,
      hidden: true,
      animation: {
        duration: 1000,
        easing: 'easeInOutSine',
        delay: 0,
        direction: 'TopBottom'
      }
    }, {
      top: 0,
      left: '60vw',
      width: 1,
      height: '100%',
      color: colorName,
      hidden: true,
      animation: {
        duration: 1000,
        easing: 'easeInOutSine',
        delay: 100,
        direction: 'TopBottom'
      }
    }, {
      top: 0,
      left: '62.5vw',
      width: 1,
      height: '100%',
      color: colorName,
      hidden: true,
      animation: {
        duration: 1000,
        easing: 'easeInOutSine',
        delay: 0,
        direction: 'TopBottom'
      }
    }, {
      top: 0,
      left: '65vw',
      width: 1,
      height: '100%',
      color: colorName,
      hidden: true,
      animation: {
        duration: 1000,
        easing: 'easeInOutSine',
        delay: 0,
        direction: 'TopBottom'
      }
    }, {
      top: 0,
      left: '67.5vw',
      width: 1,
      height: '100%',
      color: colorName,
      hidden: true,
      animation: {
        duration: 1000,
        easing: 'easeInOutSine',
        delay: 0,
        direction: 'TopBottom'
      }
    }, {
      top: 0,
      left: '70vw',
      width: 1,
      height: '100%',
      color: colorName,
      hidden: true,
      animation: {
        duration: 1000,
        easing: 'easeInOutSine',
        delay: 120,
        direction: 'TopBottom'
      }
    }, {
      top: 0,
      left: '72.5vw',
      width: 1,
      height: '100%',
      color: colorName,
      hidden: true,
      animation: {
        duration: 1000,
        easing: 'easeInOutSine',
        delay: 0,
        direction: 'TopBottom'
      }
    }, {
      top: 0,
      left: '75vw',
      width: 1,
      height: '100%',
      color: colorName,
      hidden: true,
      animation: {
        duration: 1000,
        easing: 'easeInOutSine',
        delay: 0,
        direction: 'TopBottom'
      }
    }, {
      top: 0,
      left: '77.5vw',
      width: 1,
      height: '100%',
      color: colorName,
      hidden: true,
      animation: {
        duration: 1000,
        easing: 'easeInOutSine',
        delay: 0,
        direction: 'TopBottom'
      }
    }, {
      top: 0,
      left: '80vw',
      width: 1,
      height: '100%',
      color: colorName,
      hidden: true,
      animation: {
        duration: 1000,
        easing: 'easeInOutSine',
        delay: 140,
        direction: 'TopBottom'
      }
    }, {
      top: 0,
      left: '82.5vw',
      width: 1,
      height: '100%',
      color: colorName,
      hidden: true,
      animation: {
        duration: 1000,
        easing: 'easeInOutSine',
        delay: 0,
        direction: 'TopBottom'
      }
    }, {
      top: 0,
      left: '85vw',
      width: 1,
      height: '100%',
      color: colorName,
      hidden: true,
      animation: {
        duration: 1000,
        easing: 'easeInOutSine',
        delay: 0,
        direction: 'TopBottom'
      }
    }, {
      top: 0,
      left: '87.5vw',
      width: 1,
      height: '100%',
      color: colorName,
      hidden: true,
      animation: {
        duration: 1000,
        easing: 'easeInOutSine',
        delay: 0,
        direction: 'TopBottom'
      }
    }, {
      top: 0,
      left: '90vw',
      width: 1,
      height: '100%',
      color: colorName,
      hidden: true,
      animation: {
        duration: 1000,
        easing: 'easeInOutSine',
        delay: 160,
        direction: 'TopBottom'
      }
    }, {
      top: 0,
      left: '92.5vw',
      width: 1,
      height: '100%',
      color: colorName,
      hidden: true,
      animation: {
        duration: 1000,
        easing: 'easeInOutSine',
        delay: 0,
        direction: 'TopBottom'
      }
    }, {
      top: 0,
      left: '95vw',
      width: 1,
      height: '100%',
      color: colorName,
      hidden: true,
      animation: {
        duration: 1000,
        easing: 'easeInOutSine',
        delay: 0,
        direction: 'TopBottom'
      }
    }, {
      top: '10vh',
      left: 0,
      width: '100%',
      height: 1,
      color: colorName,
      hidden: true,
      animation: {
        duration: 1000,
        easing: 'easeInOutSine',
        delay: 20,
        direction: 'LeftRight'
      }
    }, {
      top: '15vh',
      left: 0,
      width: '100%',
      height: 1,
      color: colorName,
      hidden: true,
      animation: {
        duration: 1000,
        easing: 'easeInOutSine',
        delay: 20,
        direction: 'LeftRight'
      }
    }, {
      top: '20vh',
      left: 0,
      width: '100%',
      height: 1,
      color: colorName,
      hidden: true,
      animation: {
        duration: 1000,
        easing: 'easeInOutSine',
        delay: 40,
        direction: 'LeftRight'
      }
    }, {
      top: '25vh',
      left: 0,
      width: '100%',
      height: 1,
      color: colorName,
      hidden: true,
      animation: {
        duration: 1000,
        easing: 'easeInOutSine',
        delay: 20,
        direction: 'LeftRight'
      }
    }, {
      top: '30vh',
      left: 0,
      width: '100%',
      height: 1,
      color: colorName,
      hidden: true,
      animation: {
        duration: 1000,
        easing: 'easeInOutSine',
        delay: 60,
        direction: 'LeftRight'
      }
    }, {
      top: '35vh',
      left: 0,
      width: '100%',
      height: 1,
      color: colorName,
      hidden: true,
      animation: {
        duration: 1000,
        easing: 'easeInOutSine',
        delay: 20,
        direction: 'LeftRight'
      }
    }, {
      top: '40vh',
      left: 0,
      width: '100%',
      height: 1,
      color: colorName,
      hidden: true,
      animation: {
        duration: 1000,
        easing: 'easeInOutSine',
        delay: 80,
        direction: 'LeftRight'
      }
    }, {
      top: '45vh',
      left: 0,
      width: '100%',
      height: 1,
      color: colorName,
      hidden: true,
      animation: {
        duration: 1000,
        easing: 'easeInOutSine',
        delay: 20,
        direction: 'LeftRight'
      }
    }, {
      top: '50vh',
      left: 0,
      width: '100%',
      height: 1,
      color: colorName,
      hidden: true,
      animation: {
        duration: 1000,
        easing: 'easeInOutSine',
        delay: 100,
        direction: 'LeftRight'
      }
    }, {
      top: '55vh',
      left: 0,
      width: '100%',
      height: 1,
      color: colorName,
      hidden: true,
      animation: {
        duration: 1000,
        easing: 'easeInOutSine',
        delay: 20,
        direction: 'LeftRight'
      }
    }, {
      top: '60vh',
      left: 0,
      width: '100%',
      height: 1,
      color: colorName,
      hidden: true,
      animation: {
        duration: 1000,
        easing: 'easeInOutSine',
        delay: 120,
        direction: 'LeftRight'
      }
    }, {
      top: '65vh',
      left: 0,
      width: '100%',
      height: 1,
      color: colorName,
      hidden: true,
      animation: {
        duration: 1000,
        easing: 'easeInOutSine',
        delay: 20,
        direction: 'LeftRight'
      }
    }, {
      top: '70vh',
      left: 0,
      width: '100%',
      height: 1,
      color: colorName,
      hidden: true,
      animation: {
        duration: 1000,
        easing: 'easeInOutSine',
        delay: 140,
        direction: 'LeftRight'
      }
    }, {
      top: '75vh',
      left: 0,
      width: '100%',
      height: 1,
      color: colorName,
      hidden: true,
      animation: {
        duration: 1000,
        easing: 'easeInOutSine',
        delay: 20,
        direction: 'LeftRight'
      }
    }, {
      top: '80vh',
      left: 0,
      width: '100%',
      height: 1,
      color: colorName,
      hidden: true,
      animation: {
        duration: 1000,
        easing: 'easeInOutSine',
        delay: 160,
        direction: 'LeftRight'
      }
    }, {
      top: '85vh',
      left: 0,
      width: '100%',
      height: 1,
      color: colorName,
      hidden: true,
      animation: {
        duration: 1000,
        easing: 'easeInOutSine',
        delay: 20,
        direction: 'LeftRight'
      }
    }, {
      top: '90vh',
      left: 0,
      width: '100%',
      height: 1,
      color: colorName,
      hidden: true,
      animation: {
        duration: 1000,
        easing: 'easeInOutSine',
        delay: 180,
        direction: 'LeftRight'
      }
    }, {
      top: '95vh',
      left: 0,
      width: '100%',
      height: 1,
      color: colorName,
      hidden: true,
      animation: {
        duration: 1000,
        easing: 'easeInOutSine',
        delay: 20,
        direction: 'LeftRight'
      }
    }]
  });
  setTimeout(function () {
    lineMaker.animateLinesIn();
  }, 500);
})();