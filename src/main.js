// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iview from 'iview'
import VueCookies from 'vue-cookies'
import 'iview/dist/styles/iview.css'
import API from './utils/api'
import store from './utils/store'
import './assets/fonts/iconfont.css' // 引入阿里字体图标

import SubmenuSystem from './components/SubmenuSystem'



Vue.config.productionTip = false

Vue.use(iview)
Vue.use(VueCookies)

Vue.component('submenu-system', SubmenuSystem)

console.log('vueCookies')
console.log(VueCookies)

// 定义全局变量
Vue.prototype.API = API

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})