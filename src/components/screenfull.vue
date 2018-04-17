<template>
  <icon-svg @click.native="click" style="fill: #fff;" :size="size" icon-class="quanping"></icon-svg>
</template>

<script>
import screenfull from 'screenfull'

export default {
  props: {
    size: {
      type: [Number, String],
      default: 30
    },
    fill: {
      type: String,
      default: '#48576a'
    }
  },
  data: function () {
    return {
      isFullscreen: false
    }
  },
  methods: {
    click: function () {
      if (!screenfull.enabled) {
        this.$message({
          message: 'you browser can not work',
          type: 'warning'
        })
        return false
      }
      screenfull.toggle()
    }
  }
}
</script>
