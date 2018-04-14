import axios from 'axios/index'
import {router} from '../main'

// 회원 인증
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
      commit('updateMsg', error.response.data.message)
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

// 쿼리 호출
export const getProductListsQuery = ({commit, state}) => {
  axios({
    method: 'get',
    url: state.endpoints.baseUrl + state.endpoints.travel,
    headers: {
      'Content-Type': 'application/json'
    },
    xsrfHeaderName: 'X-XSRF-TOKEN',
    credentials: true
  }).then((response) => {
    commit('clearMsg');
    commit('updateProductLists', response.data.results);
  }).catch((error) => {
    commit('clearProductLists');
    commit('clearMsg');
    commit('updateMsg', error.message)
  })
};

export const getProductRetrieveQuery = ({commit, state}, payload) => {
  axios({
    method: 'get',
    url: state.endpoints.baseUrl + state.endpoints.travel + this.$route.params.pk + '/',
    header: {
      'Content-Type': 'application/json'
    },
    xsrfHeaderName: 'X-XSRF-TOKEN',
    credentials: true
  }).then((response) => {
    this.parentLoading = false;
    this.product = response.data;
    this.calcDate(this.product.start_time, this.product.end_time)
  }).catch((error) => {
    this.parentLoading = false;
    this.error = error.message;
  })
};

// 쿼리 생성
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
      commit('updateMsg', error.response.data.detail)
    }
  })
};


