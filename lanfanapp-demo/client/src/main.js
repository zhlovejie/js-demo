import Vue from 'vue'
import tools from './utils/tools'
import './cube-ui'
import './swiper'
import App from './App.vue'
import store from './store'
import router from './router'
import axios from 'axios'


Vue.config.productionTip = false
const $http = axios.create({
  baseURL: 'http://192.168.1.103:3000/',
  timeout: 5000
  //headers: {'X-Custom-Header': 'foobar'}
});



new Vue({
  provide:{
    $http:$http,
    $tools:tools
  },
  store,
  router,
  render: h => h(App)
}).$mount('#app')
