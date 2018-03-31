import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import {routes} from "./router";
import store from "./store";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min'

Vue.config.productionTip = false;
Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes,
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
