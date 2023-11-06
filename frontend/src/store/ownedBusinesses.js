import csrfFetch from "./csrf";

export const RECEIVE_OWNED_BUSINESS = "/ownedBusinesses/RECEIVE_OWNED_BUSINESS";
export const REMOVE_OWNED_BUSINESS = "/ownedBusiness/REMOVE_SAVED_BUSINESS";

export const receiveOwnedBusiness = (ownedBusiness) => ({
  type: RECEIVE_OWNED_BUSINESS,
  ownedBusiness
});

export const removeOwnedBusiness = (ownedBusinessId) => ({
  type: REMOVE_OWNED_BUSINESS,
  ownedBusinessId
});

export const createOwnedBusiness = (businessId) => async (dispatch) => {
  const res = await csrfFetch("/api/owned_businesses", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ businessId })
  });
  let data;
  if (res.ok) {
    data = await res.json();
    dispatch(receiveOwnedBusiness(data));
  } else {
    data = await res.errors;
  }
  return data;
};

const ownedBusinessesReducer = (preloadedState = {}, action) => {
  const newState = { ...preloadedState };
  switch (action.type) {
    case RECEIVE_OWNED_BUSINESS:
      if (action.ownedBusiness.id)
        newState[action.ownedBusiness.id] = action.ownedBusiness;
      return newState;
    default:
      return newState;
  }
};

export default ownedBusinessesReducer;
