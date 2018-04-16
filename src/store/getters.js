// 쿼리 관련

export const getProductLists = state => {
  return state.queryData.productLists
};

export const getProductRetrieve = state => {
  return state.queryData.productRetrieve
};

export const getDateTable = state => {
  return state.queryData.dateTable
};

export const getDateCounts = state => {
  return state.queryData.dateCounts
};

export const getScheduleInfo = state => {
  return state.queryData.scheduleInfo
};


// 시간 관련

export const calcDate = state => {
  const startDate = new Date(state.queryData.productRetrieve.start_time);
  const endDate = new Date(state.queryData.productRetrieve.end_time);
  const dayValue = 24 * 60 * 60 * 1000;
  return parseInt((endDate - startDate) / dayValue);
};

export const getEndDateObj = (state, getters) => {
  const endDateText = getters.getProductRetrieve.end_time;
  const endDateArray = endDateText.split('-');
  return new Date(endDateArray[0], parseInt(endDateArray[1]), parseInt(endDateArray[2]));
};

export const getNextDateObj = (state, getters) => {
  if (getters.getDateTable.length === 0) {
    const dateText = getters.getProductRetrieve.start_time;
    const dateArray = dateText.split('-');
    return new Date(dateArray[0], parseInt(dateArray[1]), parseInt(dateArray[2]) + 1);
  } else {
    const dateText = getters.getDateTable[getters.getDateTable.length -1].date_time;
    const dateArray = dateText.split('-');
    return new Date(dateArray[0], parseInt(dateArray[1]), parseInt(dateArray[2]) + 1);
  }
};

export const getNextDateText = (state, getters) => {
  if (getters.getDateTable.length === 0) {
    return getters.getProductRetrieve.start_time
  } else {
    return getters.getNextDateObj.getFullYear() + '-' + getters.getNextDateObj.getMonth() + '-' + getters.getNextDateObj.getDate()
  }
};


// 메시지 관련

export const checkoutMsg = state => state.message;
