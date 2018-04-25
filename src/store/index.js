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
    reservation: 'reservation/',
    make: 'make/',
    check: 'check/',
    cancel: 'cancel/',
    signIn: 'sign-in/'
  },
  queryData: {
    productLists: {
      'count': 0,
      'next': null,
      'previous': null,
      'results': Array()
    },
    productRetrieve: Object(),
    dateCounts: 0,
    dateTable: Array(),
    scheduleInfo: Object(),
    scheduleRetrieve: Object(),
    reservationInfo: Object()
  },
  message: null,
};

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
});

