import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min'

import {routes} from './router'
import store from './store/index'

Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.prototype.$http = axios;

const router = new VueRouter({
  mode: 'history',
  routes,
});

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
}).$mount('#app');
