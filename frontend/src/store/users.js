import csrfFetch from "./csrf";

export const RECEIVE_USERS = "users/RECEIVE_USERS";
export const RECEIVE_CURRENT_USER = "users/RECEIVE_USER";

export const RECEIVE_SAVED_BUSINESS = "users/RECEIVED_SAVED_BUSINESS";

export const receiveUsers = (users) => ({
  type: RECEIVE_USERS,
  users
});

export const receiveUser = (user) => ({
  type: RECEIVE_CURRENT_USER,
  user
});

export const receiveSavedBusiness = (businessId) => ({
  type: RECEIVE_SAVED_BUSINESS,
  businessId
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

export const saveBusiness = (businessId) => async (dispatch) => {
  const res = await csrfFetch(`/api/saved_businesses/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      businessId
    })
  });
  let data;
  if (res.ok) {
    data = await res.json();
    dispatch(receiveSavedBusiness(data));
  } else {
    data = res.errors;
  }

  return data;
};

const usersReducer = (preloadedState = {}, action) => {
  const newState = { ...preloadedState };
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      newState[action.user.id] = action.user;
      return newState;
    case RECEIVE_SAVED_BUSINESS:
      // newState[action.businessId] = action.businessId;
      return { ...newState };
    default:
      return preloadedState;
  }
};

export default usersReducer;
