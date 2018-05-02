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

export const signOutAdmin = ({commit}) => {
  commit('removeInfo');
  commit('clearMsg');
  router.replace({
    name: 'Home'
  })
};

export const refreshTokenAdmin = ({commit, state}) => {
  axios({
    method: 'post',
    url: state.endpoints.baseUrl + state.endpoints.member + state.endpoints.refresh,
    data: {
      "token": sessionStorage.getItem('token')
    },
    headers: {
      'Content-Type': 'application/json'
    },
    xsrfHeaderName: 'X-XSRF-TOKEN',
    credentials: true
  }).then((response) => {
    commit('clearMsg');
    commit('updateInfo', response.data);
  }).catch((error) => {
    commit('clearMsg');
    commit('updateMsg', error.response.data.message)
  })
};

// 예약 관련
export const createReservation = ({commit, state}, payload) => {
  axios({
    method: 'post',
    url: state.endpoints.baseUrl + state.endpoints.reservation + state.endpoints.make,
    data: {
      username: payload.name,
      phone_number: payload.phone,
      gender: payload.gender,
      product: payload.product
    },
    headers: {
      'Content-Type': 'application/json'
    },
    xsrfHeaderName: 'X-XSRF-TOKEN',
    credentials: true
  }).then((response) => {
    commit('clearMsg');
    commit('clearReservationInfo');
    commit('updateReservationInfo', response.data);
    router.push({
      name: 'Complete'
    })
  }).catch((error) => {
    commit('clearMsg');
    commit('updateMsg', error.response.data.message);
  })
};

export const checkReservation = ({commit, state}, payload) => {
  axios({
    method: 'post',
    url: state.endpoints.baseUrl + state.endpoints.reservation + state.endpoints.check,
    data: {
      name: payload.name,
      password: payload.password
    },
    headers: {
      'Content-Type': 'application/json'
    },
    xsrfHeaderName: 'X-XSRF-TOKEN',
    credentials: true
  }).then((response) => {
    commit('clearMsg');
    commit('clearReservationStorage');
    commit('updateReservationStorage', response.data);
    router.push({
      name: 'Detail'
    })
  }).catch((error) => {
    commit('clearMsg');
    commit('updateMsg', error.response.data.message);
  })
};

export const cancelReservation = ({commit, state}, payload) => {
  axios({
    method: 'post',
    url: state.endpoints.baseUrl + state.endpoints.reservation + state.endpoints.cancel,
    data: {
      name: payload.name,
      password: payload.password
    },
    headers: {
      'Content-Type': 'application/json'
    },
    xsrfHeaderName: 'X-XSRF-TOKEN',
    credentials: true
  }).then(()=> {
    commit('clearReservationInfo');
    sessionStorage.removeItem('hostname');
    router.go(router.currentRoute);
    router.replace({
      name: 'Cancel'
    })
  }).catch((error) => {
    commit('clearMsg');
    commit('updateMsg', error.response.data.message);
  })
};

export const destroyReservation = ({commit, state}, payload) => {
  axios({
    method: 'delete',
    url: state.endpoints.baseUrl + state.endpoints.reservation + state.endpoints.destroy,
    data: {
      pk: payload
    },
    headers: {
      'Content-Type': 'application/json',
      'authorization': 'JWT ' + sessionStorage.getItem('token')
    },
    xsrfHeaderName: 'X-XSRF-TOKEN',
    credentials: true
  }).then(() => {
    commit('clearMsg');
    router.go(router.currentRoute)
  }).catch((error) => {
    commit('clearMsg');
    commit('updateMsg', error.response.data.message)
  })
};

export const createReservationMember = ({commit, state}, payload) => {
  axios({
    method: 'post',
    url: state.endpoints.baseUrl + state.endpoints.reservation + state.endpoints.member + payload.host + '/',
    data: {
      name: payload.name,
      phone_number: payload.phone,
      gender: payload.gender,
      host: payload.host
    },
    headers: {
      'Content-Type': 'application/json'
    },
    xsrfHeaderName: 'X-XSRF-TOKEN',
    credentials: true
  }).then((response) => {
    commit('clearMsg');
    commit('clearReservationMemberQuery');
    commit('updateReservationMemberQuery', response.data);
    router.go(router.currentRoute)
  }).catch((error) => {
    commit('clearMsg');
    commit('updateMsg', error.response.data)
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

export const getReservationListQuery = ({commit, state}, payload) => {
  axios({
    method: 'get',
    url: state.endpoints.baseUrl + state.endpoints.reservation + state.endpoints.list + payload + '/',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'JWT ' + sessionStorage.getItem('token')
    },
    xsrfHeaderName: 'X-XSRF-TOKEN',
    credentials: true
  }).then((response) => {
    commit('clearMsg');
    commit('clearReservationQuery');
    commit('updateReservationQuery', response.data)
  }).catch((error) => {
    commit('clearMsg');
    commit('updateMsg', error.response.data)
  })
};

export const getActiveReservationCount = ({commit, state}, payload) => {
  axios({
    method: 'get',
    url: state.endpoints.baseUrl + state.endpoints.reservation + state.endpoints.list + payload + '/active/',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'JWT ' + sessionStorage.getItem('token')
    },
    xsrfHeaderName: 'X-XSRF-TOKEN',
    credentials: true
  }).then((response) => {
    commit('clearMsg');
    commit('clearActiveReservationCount');
    commit('updateActiveReservationCount', response.data.count)
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
export const destroyProduct = ({commit, state}, payload) => {
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

export const destroySchedule = ({commit, state}, payload) => {
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
