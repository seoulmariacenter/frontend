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

export const router = new VueRouter({
  mode: 'history',
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!localStorage.getItem('token')) {
      next({
        name: 'signIn',
        query: {redirect:to.fullPath}
      })
    } else {
      next()
    }
  } else {
    next()
  }
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.hasToken)) {
    if (localStorage.getItem('token')) {
      next({
        name: 'Dashboard',
        query: {redirect:to.fullPath}
      })
    } else {
      next()
    }
  } else {
    next()
  }
});

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
}).$mount('#app');
