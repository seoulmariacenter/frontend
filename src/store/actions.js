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
export const getPublishedProductListQuery = ({commit, state}, payload) => {
  axios({
    method: 'get',
    url: state.endpoints.baseUrl + state.endpoints.travel + 'publish/' + payload,
    headers: {
      'Content-Type': 'application/json'
    },
    xsrfHeaderName: 'X-XSRF-TOKEN',
    credentials: true
  }).then((response) => {
    commit('clearMsg');
    commit('clearProductLists');
    commit('updateProductLists', response.data);
  }).catch((error) => {
    commit('clearProductLists');
    commit('clearMsg');
    commit('updateMsg', error.message)
  })
};

export const getProductListQuery = ({commit, state}, payload) => {
  axios({
    method: 'get',
    url: state.endpoints.baseUrl + state.endpoints.travel + payload,
    headers: {
      'Content-Type': 'application/json'
    },
    xsrfHeaderName: 'X-XSRF-TOKEN',
    credentials: true
  }).then((response) => {
    commit('clearMsg');
    commit('clearProductLists');
    commit('updateProductLists', response.data);
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
    commit('clearScheduleInfo');
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

export const getScheduleRetrieveQuery = ({commit, state}, payload) => {
  axios({
    method: 'get',
    url: state.endpoints.baseUrl + state.endpoints.travel + payload.params + '/' + state.endpoints.date
    + payload.dateNum + '/' + state.endpoints.schedule + payload.schedulePk + '/',
    headers: {
      'Content-Type': 'application/json'
    },
    xsrfHeaderName: 'X-XSRF-TOKEN',
    credentials: true
  }).then((response) => {
    commit('clearScheduleRetrieve');
    commit('updateScheduleRetrieve', response.data)
  }).catch((error) => {
    commit('clearMsg');
    commit('updateMsg', error.response.data)
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
      end_time: payload.endDate,
      image: payload.image,
      publish: false
    },
    headers: {
      'Content-Type': 'application/*',
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
      commit('updateMsg', error.response.data)
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
    commit('updateMsg', error.response.data.detail)
  })
};

export const createSchedule = ({commit, state}, payload) => {
  axios({
    method: 'post',
    url: state.endpoints.baseUrl + state.endpoints.travel + payload.params + '/' + state.endpoints.date +
    payload.date + '/' + state.endpoints.schedule,
    data: {
      place: payload.place,
      description: payload.description,
      date: [payload.params, payload.date],
      transport: payload.transport,
      time: payload.time
    },
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'JWT ' + localStorage.getItem('token')
    },
    xsrfHeaderName: 'X-XSRF-TOKEN',
    credentials: true
  }).then(() => {
    router.go(router.currentRoute)
  }).catch((error) => {
    commit('clearMsg');
    commit('updateMsg', error.response.data)
  })
};

// 쿼리 수정
export const updateProduct = ({commit, state}, payload) => {
  axios({
    method: 'patch',
    url: state.endpoints.baseUrl + state.endpoints.travel + payload.params + '/',
    data: {
      title: payload.title,
      price: payload.price,
      start_time: payload.startDate,
      end_time: payload.endDate,
      image: payload.image,
      publish: payload.publish
    },
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'JWT ' + localStorage.getItem('token')
    },
    xsrfHeaderName: 'X-XSRF-TOKEN',
    credentials: true
  }).then((response) => {
    router.push({
      name: 'Product',
      params: {pk: response.data.pk}
    })
  }).catch((error) => {
    if (typeof error.response !== 'undefined') {
      commit('clearMsg');
      commit('updateMsg', error.response.data)
    }
  })
};

export const updateSchedule = ({commit, state}, payload) => {
  axios({
    method: 'patch',
    url: state.endpoints.baseUrl + state.endpoints.travel + payload.params + '/' + state.endpoints.date
    + payload.date + '/' + state.endpoints.schedule + payload.schedulePk + '/',
    data: {
      place: payload.place,
      description: payload.description,
      date: [payload.params, payload.date],
      transport: payload.transport,
      time: payload.time
    },
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'JWT ' + localStorage.getItem('token')
    },
    xsrfHeaderName: 'X-XSRF-TOKEN',
    credentials: true
  }).then(() => {
    router.go(router.currentRoute)
  }).catch((error) => {
    commit('clearMsg');
    commit('updateMsg', error.response.data)
  })
};

// 쿼리 삭제
export const DestroyProduct = ({commit, state}, payload) => {
  axios({
    method: 'delete',
    url: state.endpoints.baseUrl + state.endpoints.travel + payload + '/',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'JWT ' + localStorage.getItem('token')
    },
    xsrfHeaderName: 'X-XSRF-TOKEN',
    credentials: true
  }).then(() => {
    alert('삭제가 완료되었습니다');
    router.go(router.currentRoute);
    router.replace({
      name: 'ProductManagement'
    })
  }).catch((error) => {
    commit('clearMsg');
    commit('updateMsg', error.response.data.detail)
  })
};

export const DestroySchedule = ({commit, state}, payload) => {
  axios({
    method: 'delete',
    url: state.endpoints.baseUrl + state.endpoints.travel + payload.params + '/' + state.endpoints.date
    + payload.date + '/' + state.endpoints.schedule + payload.schedulePk + '/',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'JWT ' + localStorage.getItem('token')
    },
    xsrfHeaderName: 'X-XSRF-TOKEN',
    credentials: true
  }).then(() => {
    router.go(router.currentRoute)
  }).catch((error) => {
    commit('clearMsg');
    commit('updateMsg', error.response.data)
  })
};
