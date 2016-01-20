'use strict'

const { assign } = Object

const dom =
module.exports = {

  $: document.querySelector.bind(document),

  $$: document.querySelectorAll.bind(document),

  ready: (fn) => {
    if (document.readyState !== 'loading') fn()
    else dom.once(document, 'DOMContentLoaded', fn)
  },

  element: document.createElement.bind(document),

  css(text) {
    return assign(dom.element('style'), {
      type: 'text/css', textContent: text
    })
  },

  stylesheet(href) {
    return assign(dom.element('link'), {
      rel: 'stylesheet', type: 'text', href
    })
  },

  append(node, to) {
    return to.appendChild(node)
  },

  on(node, ...args) {
    return node.addEventListener(...args)
  },

  once(node, type, fn, capture) {
    function delegate(...args) {
      dom.off(node, type, delegate, capture)
      fn(...args)
    }

    return dom.on(node, type, delegate, capture)
  },

  off(node, ...args) {
    return node.removeEventListener(...args)
  },

  emit(node, ...args) {
    return node.dispatchEvent(new Event(...args))
  }
}
