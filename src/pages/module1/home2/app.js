import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'normalize.css'
import App from './app.vue'
import IconSvg from 'components/icon-svg.vue'
import LayoutTable from 'components/layout-table.vue'
import gadMap from 'components/business/gad-map.vue'

Vue.component('icon-svg', IconSvg)
Vue.component('layout-table', LayoutTable)
Vue.component('gad-map', gadMap)

Vue.use(ElementUI)

Vue.config.productionTip = false
Vue.config.devtools = false

new Vue({
  render: h => h(App)
}).$mount('#app')
