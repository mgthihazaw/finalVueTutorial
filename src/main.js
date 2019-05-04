import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource'
import router from './routes'
import Button from './components/UI/Button.vue'
import { MdCard } from 'vue-material/dist/components'
import store from './Store/store.js'
import 'vue-material/dist/vue-material.min.css'
import Vuelidate from 'vuelidate'
import wysiwyg from "vue-wysiwyg";
import { MdDialog, MdButton ,MdContent} from 'vue-material/dist/components'
import 'vue-material/dist/vue-material.min.css'

//Vue  Material
Vue.use(MdButton)
Vue.use(MdContent)

Vue.use(MdDialog)

//WYS WYG
Vue.use(wysiwyg, {});

//Vue use Vuelidate
Vue.use(Vuelidate)

// Vue Material
Vue.use(MdCard)

//Vue Resource
Vue.use(VueResource)
Vue.http.options.root="https://finalapp-2da92.firebaseio.com/"

Vue.component('app-button',Button)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
