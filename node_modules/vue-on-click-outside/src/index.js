const registeredHandlers = []
let domListener

function on (el, event, callback) {
  el.addEventListener(event, callback, false)
  return { destroy: () => el.removeEventListener(event, callback, false) }
}

function dynamicStrategy (el, callback) {
  let hasMouseOver = false
  const enterListener = on(el, 'mouseenter', () => { hasMouseOver = true })
  const leaveListener = on(el, 'mouseleave', () => { hasMouseOver = false })

  return {
    el,
    check (event) {
      if (!hasMouseOver) {
        callback(event)
      }
    },
    destroy () {
      enterListener.destroy()
      leaveListener.destroy()
    }
  }
}

function staticStrategy (el, callback) {
  return {
    el,
    check (event) {
      if (!el.contains(event.target)) {
        callback(event)
      }
    },
    destroy: () => {}
  }
}

function bind (el, binding) {
  const { value: callback, modifiers } = binding

  // unbind any existing listeners first
  unbind(el)

  if (!domListener) {
    domListener = on(document.documentElement, 'click', event => {
      registeredHandlers.forEach(handler => handler.check(event))
    })
  }

  setTimeout(() => {
    registeredHandlers.push(
      modifiers.static ? staticStrategy(el, callback) : dynamicStrategy(el, callback)
    )
  }, 0)
}

function update (el, binding) {
  if (binding.value !== binding.oldValue) {
    bind(el, binding)
  }
}

function unbind (el) {
  let index = registeredHandlers.length - 1

  while (index >= 0) {
    if (registeredHandlers[index].el === el) {
      registeredHandlers[index].destroy()
      registeredHandlers.splice(index, 1)
    }

    index -= 1
  }

  if (registeredHandlers.length === 0 && domListener) {
    domListener.destroy()
    domListener = null
  }
}

export const directive = {
  bind, unbind, update
}

export const mixin = {
  directives: { 'on-click-outside': directive }
}
