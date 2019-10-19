import Vue from 'vue'
import './cube-ui'
import 'normalize.css'
import App from './App.vue'
import router from './routers/router'
import store from './stores/store'
import $axios from 'axios'

Vue.config.productionTip = false
Vue.prototype.$axios = $axios



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

