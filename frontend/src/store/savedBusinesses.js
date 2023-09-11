import csrfFetch from "./csrf";

export const RECEIVE_SAVED_BUSINESS = "/savedBusinesses/RECEIVE_SAVED_BUSINESS";

export const receiveSavedBusiness = (savedBusiness) => ({
  type: RECEIVE_SAVED_BUSINESS,
  savedBusiness
});

export const createSavedBusiness = (businessId) => async (dispatch) => {
  const res = await csrfFetch("/api/saved_businesses", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    // body: { businessId }
    body: JSON.stringify({ businessId })
  });
  let data;
  if (res.ok) {
    data = await res.json();
    // savedBusiness = {
    //   businessId: businessId,
    //   saverId: saverId
    // }
    dispatch(receiveSavedBusiness(data));
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
      // newState[user.savedBusinesses]
      return newState;
    default:
      return newState;
  }
};

export default savedBusinessesReducer;
