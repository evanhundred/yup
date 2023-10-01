import { createSelector } from "@reduxjs/toolkit";

import csrfFetch from "./csrf";

export const RECEIVE_BUSINESSES = "businesses/RECEIVE_BUSINESSES";
export const RECEIVE_BUSINESS = "businesses/RECEIVE_BUSINESS";

export const RECEIVE_ERRORS = "businesses/RECEIVE_ERRORS";
export const CLEAR_ERRORS = "businesses/CLEAR_ERRORS";

export const SHARE_BUSINESS = "businesses/SHARE_BUSINESS";
export const CLEAR_BUSINESSES = "businesses/CLEAR_BUSINESSES";
// export const SEARCH_BUSINESSES = "businesses/SEARCH_BUSINESSES";

export const receiveBusinesses = (businesses) => ({
  type: RECEIVE_BUSINESSES,
  businesses
});

export const receiveBusiness = (business) => ({
  type: RECEIVE_BUSINESS,
  business
});

export const receiveErrors = (errors) => ({
  type: RECEIVE_ERRORS,
  errors
});

export const clearErrors = () => ({
  type: CLEAR_ERRORS
});

export const shareBusiness = (data) => ({
  type: SHARE_BUSINESS,
  data
});

export const clearBusinesses = () => {
  console.log("clear");
  return {
    type: CLEAR_BUSINESSES
  };
};

// export const searchBusinesses = (query) => ({
//   type: SEARCH_BUSINESSES,
//   query
// });

export const getBusiness =
  (businessId) =>
  ({ businesses }) => {
    if (businesses.errors) return businesses.errors;
    return businesses[businessId];
  };

// export const getBusinesses = ({ businesses }) => {
//   return businesses ? Object.values(businesses) : [];
// };

export const getBusinesses = createSelector(
  (state) => state.businesses,
  (businesses) => {
    return Object.values(businesses);
  }
);

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
  const res = await csrfFetch(`/api/businesses/${businessId}`).catch((errors) =>
    dispatch(receiveErrors(errors))
  );
  let data;
  if (res.ok) {
    data = await res.json();
    dispatch(receiveBusiness(data));
  } // else {
  // const errors = await res.statusText;
  //dispatch(receiveErrors(errors));
  // }
};

export const searchBusinesses = (query) => async (dispatch) => {
  // const res = await csrfFetch(`/api/businesses/search/${query}`);
  const res = await csrfFetch(`/api/businesses/search`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: query })
  });
  let data;
  if (res.ok) {
    data = await res.json();
    dispatch(receiveBusinesses(data));
  } else {
    data = res.errors;
  }
  console.log(data);
};

const businessesReducer = (preloadedState = {}, action) => {
  const newState = { ...preloadedState };
  switch (action.type) {
    case RECEIVE_BUSINESSES:
      return { ...newState, ...action.businesses };
    case RECEIVE_BUSINESS:
      // if (action.)
      if (action.business.id) newState[action.business.id] = action.business;
      else newState.errors = action.business;
      // newState[]
      return newState;
    case RECEIVE_ERRORS:
      newState.errors = action.errors;
      return { ...newState, ...action.errors };
    case CLEAR_ERRORS:
      return {};
    case CLEAR_BUSINESSES:
      return {};
    default:
      return preloadedState;
  }
};

export default businessesReducer;
