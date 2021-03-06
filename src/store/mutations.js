// 회원 인증

export const updateInfo = (state, response) => {
  const base64 = response.token.split('.')[1];
  const result = JSON.parse(window.atob(base64));

  sessionStorage.setItem('token', response.token.toString());

  sessionStorage.setItem('pk', result.user_id);
  sessionStorage.setItem('username', result.username);
  sessionStorage.setItem('orig', result.orig_iat);
  sessionStorage.setItem('exp', result.exp);
};

export const removeInfo = () => {
  sessionStorage.removeItem('token');

  sessionStorage.removeItem('pk');
  sessionStorage.removeItem('username');
  sessionStorage.removeItem('orig');
  sessionStorage.removeItem('exp');
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

export const updateReservationStorage = (state, payload) => {
  sessionStorage.setItem('session_pk', payload.pk);
  sessionStorage.setItem('session_product', payload.product);
  sessionStorage.setItem('session_product_pk', payload.product_pk);
  sessionStorage.setItem('session_username', payload.username);
  sessionStorage.setItem('session_christian_name', payload.christian_name);
  sessionStorage.setItem('session_phone_number', payload.phone_number);
  sessionStorage.setItem('session_gender', payload.gender)
};

export const clearReservationStorage = () => {
  sessionStorage.removeItem('session_pk');
  sessionStorage.removeItem('session_product');
  sessionStorage.removeItem('session_product_pk');
  sessionStorage.removeItem('session_username');
  sessionStorage.removeItem('session_christian_name');
  sessionStorage.removeItem('session_phone_number');
  sessionStorage.removeItem('session_gender');
};

export const updateReservationQuery = (state, payload) => {
  state.queryData.reservationQuery = payload
};

export const clearReservationQuery = state => {
  state.queryData.reservationQuery = {
    'count': 0,
    'next': null,
    'previous': null,
    'results': Array()
  }
};

export const updateActiveReservationCount = (state, payload) => {
  state.queryData.activeReservationCount = payload
};

export const clearActiveReservationCount = state => {
  state.queryData.activeReservationCount = 0
};

export const updateReservationMemberQuery = (state, payload) => {
  state.queryData.reservationMemberQuery = payload
};

export const clearReservationMemberQuery = state => {
  state.queryData.reservationMemberQuery =  {
    'count': 0,
    'next': null,
    'previous': null,
    'results': Array()
  }
};

// 메시지 관리
export const clearMsg = state => {
  state.message = null
};

export const updateMsg = (state, payload) => {
  state.message = payload
};
