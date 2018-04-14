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
    commit('clearMsg');
    commit('updateInfo', response.data);
    router.replace({
      name: 'Dashboard'
    })
  }).catch((error) => {
    if (typeof error.response !== 'undefined') {
      commit('clearMsg');
      commit('setMsg', error.response.data.message)
    }
  })
};

export const signOut = ({commit}) => {
  commit('removeInfo');
  commit('clearMsg');
  router.replace({
    name: 'Home'
  })
};

export const createProduct = ({commit, state}, payload) => {
  axios({
    method: 'post',
    url: state.endpoints.baseUrl + state.endpoints.travel,
    data: {
      title: payload.title,
      price: payload.price,
      start_time: payload.startDate,
      end_time: payload.endDate
    },
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'JWT ' + localStorage.getItem('token')
    },
    xsrfHeaderName: 'X-XSRF-TOKEN',
    credentials: true
  }).then((response) => {
    commit('clearMsg');
    router.push({
      name: 'Product',
      params: {pk: response.data.pk}
    })
  }).catch((error) => {
    if (typeof error.response !== 'undefined') {
      commit('clearMsg');
      commit('setMsg', error.response.data.detail)
    }
  })
};
