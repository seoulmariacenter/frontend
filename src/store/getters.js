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
  if (getters.getDateTable.length === 0) {
    return getters.getProductRetrieve.start_time
  } else {
    const dateText = getters.getDateTable[getters.getDateTable.length -1].date_time;
    const dateArray = dateText.split('-');
    const dateObj =  new Date(dateArray[0], parseInt(dateArray[1]), parseInt(dateArray[2]) + 1);
    return dateObj.getFullYear() + '-' + dateObj.getMonth() + '-' + dateObj.getDate()
  }
};

export const checkoutMsg = state => state.message;
