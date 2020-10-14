// ie polyfill
import '@babel/polyfill'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
import { VueAxios } from './utils/request'

import bootstrap from './core/bootstrap'
import './core/use'
import './permission' // 生成权限路由
import './utils/filter' // global filter
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import preview from 'vue-photo-preview'
import 'vue-photo-preview/dist/skin.css'
// import './auth'

import 'vue-area-linkage/dist/index.css' // v2 or higher
import VueAreaLinkage from 'vue-area-linkage'

let options = {
  fullscreenEl: false,
  zoomEl: false
}

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(preview, options)
Vue.use(VueAreaLinkage)
Vue.use(VueAxios)

new Vue({
  router,
  store,
  created: bootstrap,
  render: h => h(App)
}).$mount('#app')
