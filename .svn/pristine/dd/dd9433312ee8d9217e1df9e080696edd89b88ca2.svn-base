<template>
  <div
    class="component-layer animated zoomIn"
    :class="{dragging: moveStart}"
    :style="[baseStyles]">
    <!-- 标题 -->
    <div class="layer-title" @mousedown="mouseDown">{{title}}</div>
    <!-- 窗口操作 -->
    <div class="layer-handles">
      <div v-show="!fullScreen && !minimize" @click="minimizeFn">
        <i class="el-icon-minus"></i>
      </div>
      <div v-show="!fullScreen && !minimize" @click="fullScreenFn">
        <icon-svg :size="16" icon-class="caozuo_quanpingfangda"></icon-svg>
      </div>
      <div v-show="minimize" @click="resetFn">
        <icon-svg :size="16" icon-class="caozuo_quanpingfangda"></icon-svg>
      </div>
      <div v-show="fullScreen" @click="resetFn">
        <icon-svg :size="16" icon-class="caozuo_suoxiao"></icon-svg>
      </div>
      <div @click="close">
        <i class="el-icon-close"></i>
      </div>
    </div>
    <!-- 内容 -->
    <div class="layer-content">
      <slot>
        <div v-if="type === 'vnode'" v-html="content"></div>
        <iframe v-else :src="content" frameborder="0"></iframe>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      moveStart: false,
      fullScreen: false,
      minimize: false,
      safeX: 0,
      safeY: 0,
      downX: 0,
      downY: 0,
      downLeft: 0,
      downTop: 0,
      prevLeft: 0,
      prevTop: 0,
      prevWidth: '',
      prevHeight: '',
      width: '',
      height: '',
      left: '',
      top: '',
      zIndex: '',
      onClose: null,
      onMinimize: null,
      onMinimizeReset: null,
      type: 'url',
      content: '',
      title: ''
    }
  },
  computed: {
    baseStyles () {
      return {
        width: this.width,
        height: this.height,
        left: this.left,
        top: this.top,
        zIndex: this.zIndex
      }
    }
  },
  mounted () {
    this.prevWidth = this.width
    this.prevHeight = this.height
    this.prevLeft = this.left
    this.prevTop = this.top
    document.addEventListener('mousemove', this.mouseMove)
    document.addEventListener('mouseup', this.mouseUp)
  },
  beforeDestroy () {
    document.removeEventListener('mousemove', this.mouseMove)
    document.removeEventListener('mouseup', this.mouseUp)
  },
  methods: {
    destroyElement () {
      this.$destroy(true)
      this.$el.parentNode.removeChild(this.$el)
    },
    mouseDown (e) {
      if (!this.fullScreen && !this.minimize) {
        const parent = e.target.parentNode
        // 记录起点
        this.downX = e.clientX
        this.downY = e.clientY
        this.downLeft = parent.offsetLeft
        this.downTop = parent.offsetTop
        // 安全距离
        this.safeX = document.body.offsetWidth - parseInt(this.width)
        this.safeY = document.body.offsetHeight - 84
        this.moveStart = true
      }
      e.preventDefault()
      return false
    },
    mouseMove (e) {
      if (this.moveStart && !this.fullScreen && !this.minimize) {
        let tx = e.clientX - this.downX + this.downLeft
        let ty = e.clientY - this.downY + this.downTop
        // 边界处理
        tx < 0 && (tx = 0)
        ty < 0 && (ty = 0)
        tx > this.safeX && (tx = this.safeX)
        ty > this.safeY && (ty = this.safeY)
        this.setPosition(tx, ty)
      }
    },
    mouseUp () {
      this.moveStart = false
    },
    // 全屏
    fullScreenFn () {
      this.fullScreen = true
      this.width = `${document.body.offsetWidth}px`
      this.height = `${document.body.offsetHeight}px`
      this.top = 0
      this.left = 0
    },
    // 最小化
    minimizeFn () {
      this.onMinimize()
      this.minimize = true
      this.width = '240px'
      this.top = `${document.body.offsetHeight - 42}px`
    },
    // 复原
    resetFn () {
      this.fullScreen && (this.fullScreen = false)
      if (this.minimize) {
        this.minimize = false
        this.onMinimizeReset()
      }
      this.width = this.prevWidth
      this.height = this.prevHeight
      this.top = this.prevTop
      this.left = this.prevLeft
    },
    // 关闭
    close () {
      this.onClose() && this.destroyElement()
    },
    setPosition (left, top) {
      const x = `${left}px`
      const y = `${top}px`
      this.left = x
      this.top = y
      this.prevLeft = x
      this.prevTop = y
    }
  }
}
</script>

<style lang="less">
.component-layer {
  box-sizing: border-box;
  position: absolute;
  padding-top: 42px;
  border-radius: 2px;
  border: 1px solid rgba(0,0,0,.1);
  box-shadow: 1px 1px 10px rgba(0,0,0,.2);
  background-color: #fff;
  // transition: width,left,top .3s,.3s,.3s;
  &.dragging {
    transition: none;
  }
  .layer-title {
    box-sizing: border-box;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 42px;
    padding: 0 80px 0 20px;
    line-height: 42px;
    cursor: move;
    background-color: #eee;
  }
  .layer-handles {
    box-sizing: border-box;
    position: absolute;
    display: flex;
    top: 0;
    right: 0;
    width: 80px;
    height: 42px;
    padding-right: 10px;
    align-items: stretch;
    justify-content: flex-end;
    cursor: pointer;
    > div {
      flex: 0 0 16px;
      margin-left: 5px;
      cursor: pointer;
      &:hover i{
        color: red;
      }
      &:hover .svg-icon {
        fill: red;
      }
    }
    i {
      margin-top: 13px;
      color: #000;
      cursor: pointer;
    }
    .svg-icon {
      margin-top: 13px;
      fill: #000;
      cursor: pointer;
    }
  }
  .layer-content {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
  }
  &.animated {
    animation-duration: .4s;
  }
  iframe {
    width: 100%;
    height: 100%;
    border: none;
  }
}
</style>
