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
  queryData: {
    productLists: Array(),
    productRetrieve: Object(),
    dateCounts: 0,
    dateTable: Array(),
    scheduleInfo: Object(),
  },
  message: null,
};

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
});

