import Vue from 'vue'
import * as $tools from './utils/tools'
import './cube-ui'
import './swiper'
import App from './App.vue'
import store from './store'
import router from './router'
import axios from 'axios'
import lodash from 'lodash' 


document.querySelector("meta[name='viewport']")["content"] = "width=device-width,initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0,user-scalable=no"

// flexable()

// function flexable(){
//   const d = document,w = window
//   function setFontSize(){
//     let htmlWidth = d.documentElement.clientWidth || d.body.clientWidth 
//     htmlWidth = htmlWidth > 720 ? 720 : htmlWidth
//     let htmlDom   = d.getElementsByTagName('html')[0]
//     htmlDom.style.fontSize = (htmlWidth / 10) + 'px'
//   }
//   setFontSize()
//   w.addEventListener('resize',setFontSize)
// }

Vue.config.productionTip = false
const $http = axios.create({
  baseURL: 'http://192.168.1.103:3000/',
  timeout: 5000
  //headers: {'X-Custom-Header': 'foobar'}
});

Vue.prototype.$http = $http
Vue.prototype.$tools = $tools
Vue.prototype.$_ = lodash

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
