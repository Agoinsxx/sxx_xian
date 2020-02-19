import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import api from './api'
//富文本
import VueUeditorWrap from 'vue-ueditor-wrap'


import './plugins/element.js'
import './assets/css/common.css'

Vue.config.productionTip = false

Vue.prototype.$api = api

Vue.component('vue-ueditor-wrap', VueUeditorWrap)

//刷新后先判断是否登录过
if(localStorage.getItem('token')){
  store.commit("loginModule/setToken",localStorage.getItem('token'))
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
