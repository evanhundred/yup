import csrfFetch from "./csrf";

export const RECEIVE_BUSINESSES = "businesses/RECEIVE_BUSINESSES";
export const RECEIVE_BUSINESS = "businesses/RECEIVE_BUSINESS";

export const receiveBusinesses = (businesses) => ({
  type: RECEIVE_BUSINESSES,
  businesses
});

export const receiveBusiness = (business) => ({
  type: RECEIVE_BUSINESS,
  business
});

export const getBusiness =
  (businessId) =>
  ({ businesses }) => {
    return businesses[businessId];
  };

export const getBusinesses = ({ businesses }) => {
  // debugger;
  return businesses ? Object.values(businesses) : [];
};

export const fetchBusinesses = () => async (dispatch) => {
  // debugger;
  const res = await csrfFetch("/api/businesses");
  let data;
  if (res.ok) {
    data = await res.json();
    // debugger;
    dispatch(receiveBusinesses(data));
  } else {
    data = res.errors;
  }
};

export const fetchBusiness = (businessId) => async (dispatch) => {
  const res = await csrfFetch(`/api/businesses/${businessId}`);
  let data;
  if (res.ok) {
    data = await res.json();
    dispatch(receiveBusiness(data));
  } else {
    data = res.errors;
  }
};

const businessesReducer = (preloadedState = {}, action) => {
  const newState = { ...preloadedState };
  switch (action.type) {
    case RECEIVE_BUSINESSES:
      return { ...newState, ...action.businesses };
    case RECEIVE_BUSINESS:
      newState[action.business.id] = action.business;
      return newState;
    default:
      return preloadedState;
  }
};

export default businessesReducer;
