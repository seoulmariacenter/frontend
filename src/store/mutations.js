export const updateInfo = (state, response) => {
  const base64 = response.token.split('.')[1];
  const result = JSON.parse(window.atob(base64));

  localStorage.setItem('token', base64);

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

export const updateDateCounts = (state, payload) => {
  state.dateCounts = payload
};

export const clearMsg = state => {
  state.message = null
};

export const setMsg = (state, payload) => {
  state.message = payload
};
