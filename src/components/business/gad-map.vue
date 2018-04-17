<template>
  <div id="container"></div>
</template>

<script>
import { loadPlugin } from 'utils/multiplexing'

export default {
  name: 'gad-map',
  data () {
    return {

    }
  },
  // 接收的参数及说明
  props: {
    latitude: {
      type: String,
      default: '113.025242'
    },
    longitude: {
      type: String,
      default: '28.136978'
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      loadPlugin('//webapi.amap.com/maps?v=1.4.2&key=0bf1ac31275c32a2135df00cdcdf95dc', 'AMap').then(AMap => {
        let map = new AMap.Map('container', {
          resizeEnable: true,
          zoomEnable:true,
          dragEnable: true,
          center: [this.latitude, this.longitude],
          zoom: 8
        })
        var marker = new AMap.Marker({
          position: [this.latitude, this.longitude]
        })
        marker.setMap(map)
        // let circle = new AMap.Circle({
        //   center: [this.latitude, this.longitude],
        //   radius: 100,
        //   fillOpacity: 0.2,
        //   strokeWeight: 1
        // })
        // circle.setMap(map)
        map.setFitView()
      })
    }
  }
}
</script>

<style lang="less">
//去除水印
.amap-logo {
  right: 0 !important;
  left: auto !important;
  display: none;
}
</style>
