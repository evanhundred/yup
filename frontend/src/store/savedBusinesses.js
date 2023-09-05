import csrfFetch from "./csrf";

export const RECEIVE_SAVED_BUSINESS = "/savedBusinesses/RECEIVE_SAVED_BUSINESS";

export const receiveSavedBusiness = (savedBusiness) => ({
  type: RECEIVE_SAVED_BUSINESS,
  savedBusiness
});

export const createSavedBusiness = (savedBusiness) => async (dispatch) => {
  const res = await csrfFetch("/api/savedBusinesses", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(savedBusiness)
  });
  let data;
  if (res.ok) {
    data = await res.json();
    dispatch(receiveSavedBusiness(savedBusiness));
  } else {
    data = await res.errors;
  }
  return data;
};

const savedBusinessesReducer = (preloadedState = {}, action) => {
  const newState = { ...preloadedState };
  switch (action.type) {
    case RECEIVE_SAVED_BUSINESS:
      newState[action.savedBusiness.id] = action.savedBusiness;
      return newState;
    default:
      return newState;
  }
};

export default savedBusinessesReducer;
