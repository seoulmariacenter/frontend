// 회원 인증

export const updateInfo = (state, response) => {
  const base64 = response.token.split('.')[1];
  const result = JSON.parse(window.atob(base64));

  localStorage.setItem('token', response.token.toString());

  localStorage.setItem('pk', result.user_id);
  localStorage.setItem('username', result.username);
  localStorage.setItem('orig', result.orig_iat);
  localStorage.setItem('exp', result.exp);
};

export const removeInfo = () => {
  localStorage.removeItem('token');

  localStorage.removeItem('pk');
  localStorage.removeItem('username');
  localStorage.removeItem('orig');
  localStorage.removeItem('exp');
};

// 쿼리 호출
// 순례 상품
export const updateProductLists = (state, payload) => {
  state.queryData.productLists = payload
};

export const clearProductLists = state => {
  state.queryData.productLists = {
    'count': 0,
    'next': null,
    'previous': null,
    'results': Array()
  }
};

export const updateProductRetrieve = (state, payload) => {
  state.queryData.productRetrieve = payload
};

export const clearProductRetrieve = state => {
  state.queryData.productRetrieve = Object()
};

// 스케줄 상세
export const updateScheduleRetrieve = (state, payload) => {
  state.queryData.scheduleRetrieve = payload
};

export const clearScheduleRetrieve = state => {
  state.queryData.scheduleRetrieve = Object()
};

// 일정표
export const updateDateTable = (state, payload) => {
  state.queryData.dateTable = payload
};

export const clearDateTable = state => {
  state.queryData.dateTable = Array()
};

export const updateDateCounts = (state, payload) => {
  state.queryData.dateCounts = payload
};

export const clearDateCounts = state => {
  state.queryData.dateCounts = 0
};

// 스케줄 리스트
export const updateScheduleInfo = (state, payload) => {
  state.queryData.scheduleInfo[payload.dateNum] = payload.schedule
};

export const clearScheduleInfo = state => {
  state.queryData.scheduleInfo = Object()
};

// 예약 정보
export const updateReservationInfo = (state, payload) => {
  state.queryData.reservationInfo = payload
};

export const clearReservationInfo = state => {
  state.queryData.reservationInfo = Object()
};

// 메시지 관리
export const clearMsg = state => {
  state.message = null
};

export const updateMsg = (state, payload) => {
  state.message = payload
};
