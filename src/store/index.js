import Vue from 'vue'
import Vuex from 'vuex'

import * as getters from './getters'
import * as actions from './actions'
import * as mutations from './mutations'

Vue.use(Vuex);

const state = {
  endpoints: {
    baseUrl: 'http://localhost:8000/',
    member: 'member/',
    travel: 'travel/product/',
    date: 'date/',
    schedule: 'schedule/',
    signIn: 'sign-in/'
  },
  message: null,
  productLists: null,
  productRetrieve: Object(),
  dateCounts: Array(),
  scheduleInfo: Object()
};

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
});

