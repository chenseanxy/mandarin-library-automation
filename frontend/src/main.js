import Vue from 'vue'
import VueBarcode from 'vue-barcode';
import App from './App.vue'
import router from './router/index.js'
import './plugins/element.js'
import './assets/theme/index.css'
import './assets/css/global.css'
Vue.config.productionTip = false
Vue.component('barcode', VueBarcode);
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
