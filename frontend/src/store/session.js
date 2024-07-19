import csrfFetch from './csrf';

const SET_CURRENT_USER = 'session/setCurrentUser';
const REMOVE_CURRENT_USER = 'session/removeCurrentUser';

const setCurrentUser = (user) => ({
  type: SET_CURRENT_USER,
  user
});

const removeCurrentUser = () => ({
  type: REMOVE_CURRENT_USER
});

const storeCSRFToken = (response) => {
  const csrfToken = response.headers.get('X-CSRF-Token');
  // console.log(csrfToken);
  if (csrfToken) sessionStorage.setItem('X-CSRF-Token', csrfToken);
};

const storeCurrentUser = (user) => {
  // console.log('storeCurrentUser');
  if (user) sessionStorage.setItem('currentUser', JSON.stringify(user));
  else sessionStorage.removeItem('currentUser');
};

export const login =
  ({ email, password }) =>
  async (dispatch) => {
    const res = await csrfFetch('/api/session', {
      method: 'POST',
      body: JSON.stringify({
        email,
        password
      })
    });
    const data = await res.json();
    // console.log(data);
    storeCurrentUser(data);
    dispatch(setCurrentUser(data));
    return res;
  };

export const signup = (user) => async (dispatch) => {
  const { name, email, password } = user;
  const res = await csrfFetch('/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name,
      email,
      password
    })
  });
  const data = await res.json();
  // console.log(data);
  storeCurrentUser(data);
  dispatch(setCurrentUser(data));
  return res;
};

export const logout = () => async (dispatch) => {
  const res = await csrfFetch('/api/session', {
    method: 'DELETE'
  });
  storeCurrentUser(null);
  dispatch(removeCurrentUser());
  return res;
};

export const restoreSession = () => async (dispatch) => {
  // console.log('restoreSession');
  const res = await csrfFetch('/api/session');
  // console.log(res);
  storeCSRFToken(res);
  // console.log('after store');
  const data = await res.json();
  // console.log(data);
  storeCurrentUser(data.user);
  dispatch(setCurrentUser(data.user));
  return res;
};

const initialState = {
  user: JSON.parse(sessionStorage.getItem('currentUser'))
};

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return { ...state, user: action.user };
    case REMOVE_CURRENT_USER:
      return { ...state, user: null };
    default:
      return state;
  }
};

export default sessionReducer;
