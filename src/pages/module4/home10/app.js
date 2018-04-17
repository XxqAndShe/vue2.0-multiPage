import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'normalize.css'
import App from './app.vue'
import IconSvg from 'components/icon-svg.vue'
import LayoutTable from 'components/layout-table.vue'

Vue.component('icon-svg', IconSvg)
Vue.component('layout-table', LayoutTable)

Vue.use(ElementUI)

Vue.config.productionTip = false
Vue.config.devtools = false

new Vue({
  render: h => h(App)
}).$mount('#app')
