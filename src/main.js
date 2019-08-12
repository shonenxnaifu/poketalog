import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import store from './store'
import BootstrapVue from 'bootstrap-vue'
import '../src/assets/sass/custom.scss'

Vue.config.productionTip = false

Vue.use(VueAxios, axios)
Vue.axios.defaults.baseURL = 'https://pokeapi.co/api/v2/'

Vue.use(BootstrapVue)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
