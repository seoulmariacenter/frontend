import axios from 'axios/index'
import {router} from '../main'

export const signInAdmin = ({commit, state}, payload) => {
  axios({
    method: 'post',
    url: state.endpoints.baseUrl + state.endpoints.member + state.endpoints.signIn,
    data: {
      username: payload.username,
      password: payload.password
    },
    headers: {
      'Content-Type': 'application/json'
    },
    xsrfHeaderName: 'X-XSRF-TOKEN',
    credentials: true
  }).then((response) => {
    commit('updateInfo', response.data);
    router.replace({
      name: 'Dashboard'
    })
  }).catch((error) => {
    console.log(error)
  })
};

export const signOut = ({commit}) => {
  commit('removeInfo');
  router.replace({
    name: 'Home'
  })
};

export const getScheduleListQuery = ({commit}, payload) => {
  axios({
    method: 'get',
    url: this.$store.state.endpoints.baseUrl + this.$store.state.endpoints.travel + this.$route.params.pk + '/' +
    this.$store.state.endpoints.date + parseInt(payload) + '/schedule/',
    header: {
      'Content-Type': 'application/json'
    },
    xsrfHeaderName: 'X-XSRF-TOKEN',
    credentials: true
  }).then((response) => {
    commit('updateSchedule', {[payload]: response.data.results});
  }).catch((error) => {
    console.log(error)
  })
};

export const iterateScheduleLoop = ({state, dispatch}) => {
  let step;
  console.log('hello');
  console.log(state.dateCounts);
  for (step = 1; step < state.dateCounts.last; step++) {
    dispatch('getScheduleListQuery')
  }
};
