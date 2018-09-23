(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global['vue-on-click-outside'] = global['vue-on-click-outside'] || {})));
}(this, (function (exports) { 'use strict';

var registeredHandlers = [];
var domListener = void 0;

function on(el, event, callback) {
  el.addEventListener(event, callback, false);
  return { destroy: function destroy() {
      return el.removeEventListener(event, callback, false);
    } };
}

function dynamicStrategy(el, callback) {
  var hasMouseOver = false;
  var enterListener = on(el, 'mouseenter', function () {
    hasMouseOver = true;
  });
  var leaveListener = on(el, 'mouseleave', function () {
    hasMouseOver = false;
  });

  return {
    el: el,
    check: function check(event) {
      if (!hasMouseOver) {
        callback(event);
      }
    },
    destroy: function destroy() {
      enterListener.destroy();
      leaveListener.destroy();
    }
  };
}

function staticStrategy(el, callback) {
  return {
    el: el,
    check: function check(event) {
      if (!el.contains(event.target)) {
        callback(event);
      }
    },

    destroy: function destroy() {}
  };
}

function bind(el, binding) {
  var callback = binding.value,
      modifiers = binding.modifiers;

  // unbind any existing listeners first

  unbind(el);

  if (!domListener) {
    domListener = on(document.documentElement, 'click', function (event) {
      registeredHandlers.forEach(function (handler) {
        return handler.check(event);
      });
    });
  }

  setTimeout(function () {
    registeredHandlers.push(modifiers.static ? staticStrategy(el, callback) : dynamicStrategy(el, callback));
  }, 0);
}

function update(el, binding) {
  if (binding.value !== binding.oldValue) {
    bind(el, binding);
  }
}

function unbind(el) {
  var index = registeredHandlers.length - 1;

  while (index >= 0) {
    if (registeredHandlers[index].el === el) {
      registeredHandlers[index].destroy();
      registeredHandlers.splice(index, 1);
    }

    index -= 1;
  }

  if (registeredHandlers.length === 0 && domListener) {
    domListener.destroy();
    domListener = null;
  }
}

var directive = {
  bind: bind, unbind: unbind, update: update
};

var mixin = {
  directives: { 'on-click-outside': directive }
};

exports.directive = directive;
exports.mixin = mixin;

Object.defineProperty(exports, '__esModule', { value: true });

})));
