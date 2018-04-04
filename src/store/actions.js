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
