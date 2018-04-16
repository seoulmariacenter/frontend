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
    url: state.endpoints.baseUrl + state.endpoints.travel + payload + '/',
    header: {
      'Content-Type': 'application/json'
    },
    xsrfHeaderName: 'X-XSRF-TOKEN',
    credentials: true
  }).then((response) => {
    commit('clearMsg');
    commit('clearProductRetrieve');
    commit('updateProductRetrieve', response.data);
  }).catch((error) => {
    commit('clearProductRetrieve');
    commit('clearMsg');
    commit('UpdateMsg', error.message);
  })
};

export const getDateListQuery = ({commit, state}, payload) => {
  axios({
    method: 'get',
    url: state.endpoints.baseUrl + state.endpoints.travel + payload + '/' +
    state.endpoints.date,
    header: {
      'Content-Type': 'application/json'
    },
    xsrfHeaderName: 'X-XSRF-TOKEN',
    credentials: true
  }).then((response) => {
    commit('clearDateTable');
    commit('clearDateCounts');
    commit('updateDateTable', response.data.results);
    commit('updateDateCounts', response.data.count);
  }).catch((error) => {
    commit('clearMsg');
    commit('updateMsg', error.message)
  })
};

export const getScheduleListQuery = ({commit, state}, payload) => {
  axios({
    method: 'get',
    url: state.endpoints.baseUrl + state.endpoints.travel + payload.params + '/' +
    state.endpoints.date + payload.dateNum + '/schedule/',
    header: {
      'Content-Type': 'application/json'
    },
    xsrfHeaderName: 'X-XSRF-TOKEN',
    credentials: true
  }).then((response) => {
    const formData = {
      dateNum: payload.dateNum,
      schedule: response.data.results
    };
    commit('updateScheduleInfo', formData);
  }).catch((error) => {
    commit('clearMsg');
    commit('updateMsg', error.message)
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

export const createDate = ({commit, state, getters}, payload) => {
  axios({
    method: 'post',
    url: state.endpoints.baseUrl + state.endpoints.travel + payload + '/' + state.endpoints.date,
    data: {
      date_num: state.queryData.dateCounts + 1,
      date_time: getters.getNextDateText,
      product: payload
    },
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'JWT ' + localStorage.getItem('token')
    },
    xsrfHeaderName: 'X-XSRF-TOKEN',
    credentials: true
  }).then(() => {
    commit('clearMsg');
    router.go(router.currentRoute)
  }).catch((error) => {
    commit('clearMsg');
    commit('updateMsg', error.response.data)
  })
};

