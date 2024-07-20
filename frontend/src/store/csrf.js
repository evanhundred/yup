const csrfFetch = async (url, options = {}) => {
  options.method = options.method || 'GET';
  options.headers = options.headers || {};

  if (options.method.toUpperCase() !== 'GET') {
    options.headers['Content-Type'] = options.headers['Content-Type'] || 'application/json';
    options.headers['X-CSRF-Token'] = sessionStorage.getItem('X-CSRF-Token');
  }

  // console.log('csrfFetch');

  const res = await fetch(url, options);
  return res;
};

// export const restoreCSRF = async () => {
//   // console.log('restoreCSRF');
//   const res = await csrfFetch('/api/session');
//   storeCSRFToken(res);
//   return res;
// };

export default csrfFetch;
