import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'normalize.css'
import App from './app.vue'
import IconSvg from 'components/icon-svg.vue'
import Screenfull from 'components/screenfull.vue'
import LayoutTable from 'components/layout-table.vue'
import Layer from 'components/layer'
import 'viewerjs/dist/viewer.min.css'

Vue.component('icon-svg', IconSvg)
Vue.component('screenfull', Screenfull)
Vue.component('layout-table', LayoutTable)
Vue.component('layer', Layer)
Vue.prototype.$layer = Layer
// this.$layer.url({ content: '/organizational/coupon-definition.html' })

Vue.use(ElementUI)

Vue.config.productionTip = false
Vue.config.devtools = false

new Vue({
  render: h => h(App)
}).$mount('#app')