import csrfFetch from "./csrf";

export const RECEIVE_BUSINESSES = "businesses/RECEIVE_BUSINESSES";
export const RECEIVE_BUSINESS = "businesses/RECEIVE_BUSINESS";

export const receiveBusinesses = (businesses) => ({
  type: RECEIVE_BUSINESSES,
  businesses
});

export const receiveBusiness = (business) => ({
  type: RECEIVE_BUSINESSES,
  business
});

export const getBusiness = (businessId) => (state) =>
  state.businesses ? state.businesses[businessId] : null;
export const getBusinesses = (state) =>
  state.businesses ? Object.values(state.businesses) : [];

export const fetchBusinesses = () => async (dispatch) => {
  const res = await csrfFetch("/api/businesses");
  let data;
  if (res.ok) {
    data = await res.json();
    dispatch(receiveBusinesses(data));
  } else {
    data = res.errors;
  }
  console.log(data);
};

export const fetchBusiness = (businessId) => async (dispatch) => {
  const res = await csrfFetch(`/api/businesses/${businessId}`);
  const data = await res.json();
  dispatch(receiveBusiness(data));
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
