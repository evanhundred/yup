import csrfFetch from "./csrf";

export const RECEIVE_USERS = "users/RECEIVE_USERS";
export const RECEIVE_CURRENT_USER = "users/RECEIVE_USER";

export const receiveUsers = (users) => ({
  type: RECEIVE_USERS,
  users
});

export const receiveUser = (user) => ({
  type: RECEIVE_CURRENT_USER,
  user
});

export const getUsers = ({ users }) => (users ? Object.values(users) : []);

export const fetchUsers = () => async (dispatch) => {
  const res = await csrfFetch(`/api/users`);
  let data;
  if (res.ok) {
    data = await res.json();
    dispatch(receiveUsers(data));
  } else {
    data = res.errors;
  }
};
const usersReducer = (preloadedState = {}, action) => {
  const newState = { ...preloadedState };
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      newState[action.user.id] = action.user;
      return newState;
    default:
      return preloadedState;
  }
};

export default usersReducer;
