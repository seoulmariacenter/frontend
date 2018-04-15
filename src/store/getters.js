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

export const getNextDateText = (state, getters) => {
  if (state.queryData.dateTable.length === 0) {
    return '아직 일정이 없습니다'
  } else {
    const dateText = getters.getDateTable[getters.getDateTable.length -1].date_time;
    const dateArray = dateText.split('-');
    const dateObj =  new Date(dateArray[0], parseInt(dateArray[1]), parseInt(dateArray[2]) + 1);
    return dateObj.getFullYear() + '-' + dateObj.getMonth() + '-' + dateObj.getDate()
  }
};

export const checkoutMsg = state => state.message;
