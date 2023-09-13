import csrfFetch from "./csrf";

export const RECEIVE_SAVED_BUSINESS = "/savedBusinesses/RECEIVE_SAVED_BUSINESS";
export const REMOVE_SAVED_BUSINESS = "/savedBusinesses/REMOVE_SAVED_BUSINESS";

export const receiveSavedBusiness = (savedBusiness) => ({
  type: RECEIVE_SAVED_BUSINESS,
  savedBusiness
});

export const removeSavedBusiness = (savedBusinessId) => ({
  type: REMOVE_SAVED_BUSINESS,
  savedBusinessId
});

export const createSavedBusiness = (businessId) => async (dispatch) => {
  const res = await csrfFetch("/api/saved_businesses", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ businessId })
  });
  let data;
  if (res.ok) {
    data = await res.json();
    dispatch(receiveSavedBusiness(data));
  } else {
    data = await res.errors;
  }
  return data;
};

export const deleteSavedBusiness = (savedBusinessId) => async (dispatch) => {
  const res = await csrfFetch(`/api/saved_business/${savedBusinessId}`, {
    method: "DELETE"
  });
  let data;
  if (res.ok) {
    dispatch(removeSavedBusiness(savedBusinessId));
    data = await res.json();
  } else {
    data = res.errors;
  }
  return data;
};

const savedBusinessesReducer = (preloadedState = {}, action) => {
  const newState = { ...preloadedState };
  switch (action.type) {
    case RECEIVE_SAVED_BUSINESS:
      if (action.savedBusiness.id)
        newState[action.savedBusiness.id] = action.savedBusiness;

      // newState[user.savedBusinesses]
      return newState;
    case REMOVE_SAVED_BUSINESS:
      delete newState[action.savedBusinessId];
      return newState;
    default:
      return newState;
  }
};

export default savedBusinessesReducer;
