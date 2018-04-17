import Vue from 'vue'
import Main from './main.vue'
import { isVNode } from '../../../utils/vdom'
// import { merge } from '../../../utils/index'

const LayerConstructor = Vue.extend(Main)
const LayerTypes = ['url', 'vnode']

let instance
const instances = []
let seed = 1
let zIndex = 2000

const addLayerMove = function () {
  if (!document.getElementById('layer-move')) {
    const om = document.createElement('div')
    om.id = 'layer-move'
    om.style.cssText = 'display:none;position:fixed;top:0;left:0;right:0;bottom:0;cursor:move;opacity:0;z-index:2147483647;'
    document.body.appendChild(om)
    document.addEventListener('mouseup', () => {
      om.style.display = 'none'
    })
  }
}

const Layer = function (options) {
  // const options = merge(opt ? opt : {}, {
  //   width: '300px',
  //   height: '200px',
  //   left: 0,
  //   top: 0,
  //   type: 'url', // vnode
  //   content: ''
  // })
  options = options || {}
  options.width = options.width || '600px'
  options.height = options.height || '400px'
  options.left = options.left === 0 ? 0 : options.left || (document.body.offsetWidth - parseInt(options.width)) / 2 + 'px'
  options.top = options.top === 0 ? 0 : options.top || (document.body.offsetHeight - parseInt(options.height)) / 2 + 'px'
  const id = 'G_Layer_' + seed++
  const userOnClose = options.onClose
  const userOnMinimize = options.onMinimize
  const userMinimizeReset = options.onMinimizeReset

  options.zIndex = zIndex++
  options.onClose = function () {
    return Layer.close(id, userOnClose)
  }
  options.onMinimize = function () {
    Layer.minimize(id, userOnMinimize)
  }
  options.onMinimizeReset = function () {
    Layer.minimizeReset(id, userMinimizeReset)
  }

  addLayerMove()

  instance = new LayerConstructor({
    data: options
  })

  if (isVNode(options.content) && options.type === 'vnode') {
    instance.$slots.default = [options.content]
    options.content = 'REPLACED_BY_VNODE'
  }

  instance.id = id
  instance.vm = instance.$mount()
  document.body.appendChild(instance.vm.$el)

  instance.vm.$el.addEventListener('mousedown', function (e) {
    this.style.zIndex = zIndex++
    if (e.target.className === 'layer-title') {
      document.getElementById('layer-move').style.display = 'block'
    }
  })

  instances.push(instance)
  return instance.vm
}

LayerTypes.forEach(type => {
  Layer[type] = options => {
    options.type = type
    if (typeof options === 'string' || isVNode(options)) {
      options = {
        content: options
      }
      return Layer(options)
    }
    if (typeof options === 'object') {
      return Layer(options)
    }
  }
})

Layer.close = function (id, userOnClose) {
  const instance = instances.find(instance => instance.id === id)
  if (!instance) return

  let close = true
  if (typeof userOnClose === 'function') {
    close = userOnClose(instance)
  }
  close = typeof close === 'boolean' ? close : true

  if (close) {
    // 可以移除
    const index = instances.indexOf(instance)
    const len = instances.length
    instances.splice(index, 1)

    if (len > 1 && instance.minimize) {
      const left = parseInt(instance.left)
      instances.filter(instance => instance.minimize && parseInt(instance.left) > left).forEach(instance => {
        instance.left = `${parseInt(instance.left) - 241}px`
      })
    }
  }
  return close
}

Layer.minimize = function (id, userOnMinimize) {
  const instance = instances.find(instance => instance.id === id)
  const lefts = instances.filter(instance => instance.minimize).map(instance => parseInt(instance.left))
  const len = lefts.length

  let targetLeft = 0
  if (len > 0) {
    targetLeft = Math.max.apply(null, lefts) + 241
  }
  if (typeof userOnMinimize === 'function') {
    userOnMinimize(instance)
  }
  instance.left = targetLeft + 'px'
}

Layer.minimizeReset = function (id, userMinimizeReset) {
  const instance = instances.find(instance => instance.id === id)
  const len = instances.length

  if (len > 1) {
    const left = parseInt(instance.left)
    if (typeof userMinimizeReset === 'function') {
      userMinimizeReset(instance)
    }
    instances.filter(instance => instance.minimize && parseInt(instance.left) > left).forEach(instance => {
      instance.left = `${parseInt(instance.left) - 241}px`
    })
  }
}

export default Layer
