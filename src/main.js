import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource'
import router from './routes'
import Button from './components/UI/Button.vue'
import { MdCard } from 'vue-material/dist/components'
import store from './Store/store.js'
import 'vue-material/dist/vue-material.min.css'
import Vuelidate from 'vuelidate'

//Vue use Vuelidate
Vue.use(Vuelidate)

// Vue Material
Vue.use(MdCard)

//Vue Resource
Vue.use(VueResource)
Vue.http.options.root=""

Vue.component('app-button',Button)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
