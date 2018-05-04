import Vue from 'vue'
import Vuex from 'vuex'

import * as getters from './getters'
import * as actions from './actions'
import * as mutations from './mutations'

Vue.use(Vuex);

const state = {
  endpoints: {
    baseUrl: 'http://api.seoulmariacenter.net/',
    member: 'member/',
    travel: 'travel/product/',
    date: 'date/',
    schedule: 'schedule/',
    reservation: 'reservation/',
    list: 'list/',
    make: 'make/',
    check: 'check/',
    cancel: 'cancel/',
    destroy: 'destroy/',
    signIn: 'sign-in/',
    refresh: 'refresh/'
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
    reservationInfo: Object(),
    reservationQuery: {
      'count': 0,
      'next': null,
      'previous': null,
      'results': Array()
    },
    reservationMemberQuery: {
      'count': 0,
      'next': null,
      'previous': null,
      'results': Array()
    },
    activeReservationCount: 0
  },
  message: null,
};

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
});

