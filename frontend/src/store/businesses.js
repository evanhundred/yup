import { createSelector } from '@reduxjs/toolkit';
import { createOwnedBusiness } from './ownedBusinesses';
import csrfFetch from './csrf';

export const RECEIVE_BUSINESSES = 'businesses/RECEIVE_BUSINESSES';
export const RECEIVE_BUSINESS = 'businesses/RECEIVE_BUSINESS';
export const CLEAR_BUSINESSES = 'businesses/CLEAR_BUSINESSES';
export const REMOVE_BUSINESS = 'businesses/REMOVE_BUSINESS';
export const RECEIVE_ERRORS = 'businesses/RECEIVE_ERRORS';
export const CLEAR_ERRORS = 'businesses/CLEAR_ERRORS';

export const receiveBusinesses = (businesses) => ({
  type: RECEIVE_BUSINESSES,
  businesses
});

export const receiveBusiness = (business) => ({
  type: RECEIVE_BUSINESS,
  business
});

export const clearBusinesses = () => ({
  type: CLEAR_BUSINESSES
});

export const removeBusiness = (businessId) => ({
  type: REMOVE_BUSINESS,
  businessId
});

export const receiveErrors = (errors) => ({
  type: RECEIVE_ERRORS,
  errors
});

export const clearErrors = () => ({
  type: CLEAR_ERRORS
});

export const resetBusinesses = () => async (dispatch) => {
  dispatch(clearBusinesses());
};

export const getBusiness =
  (businessId) =>
  ({ businesses }) => {
    if (businesses.errors) return businesses.errors;
    return businesses[businessId];
  };

export const getBusinesses = createSelector(
  (state) => state.businesses,
  (businesses) => {
    return Object.values(businesses);
  }
);

export const fetchBusinesses = () => async (dispatch) => {
  const res = await csrfFetch('/api/businesses');
  let data;
  if (res.ok) {
    data = await res.json();
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
  }
};

export const createBusinessStub = (business) => async (dispatch) => {
  let data;
  const res = await csrfFetch(`/api/businesses/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(business)
  }).catch((error) => {
    data = error;
  });
  if (res && res.ok) {
    data = await res.json();
    dispatch(createOwnedBusiness(data.id));
    dispatch(receiveBusiness(data));
  }
  return data;
};

export const updateBusiness = (business) => async (dispatch) => {
  let data;
  const res = await csrfFetch(`/api/businesses/${business.id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(business)
  }).catch((error) => {
    data = error;
  });
  if (res && res.ok) {
    data = await res.json();
    dispatch(receiveBusiness(data));
  }
  return data;
};

export const deleteBusiness = (businessId) => async (dispatch) => {
  const res = await csrfFetch(`/api/businesses/${businessId}`, {
    method: 'DELETE'
  });
  if (res.ok) {
    dispatch(removeBusiness(businessId));
    const data = res.json();
    return data;
  } else {
    return res;
  }
};

export const searchBusinesses = (query) => async (dispatch) => {
  let data;
  query = query.trim();
  const res = await csrfFetch(`/api/businesses/search`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: query })
  }).catch((error) => {
    data = error;
  });
  if (res && res.ok) {
    data = await res.json();
    dispatch(receiveBusinesses(await data));
  } else {
    data = res;
  }
  return data;
};

const businessesReducer = (preloadedState = {}, action) => {
  const newState = { ...preloadedState };
  switch (action.type) {
    case RECEIVE_BUSINESSES:
      return { ...newState, ...action.businesses };
    case RECEIVE_BUSINESS:
      if (action.business.id) newState[action.business.id] = action.business;
      else newState.errors = action.business;
      return newState;
    case RECEIVE_ERRORS:
      newState.errors = action.errors;
      return { ...newState, ...action.errors };
    case REMOVE_BUSINESS:
      delete newState[action.businessId];
      return newState;
    case CLEAR_ERRORS:
      return {};
    case CLEAR_BUSINESSES:
      return {};
    default:
      return preloadedState;
  }
};

export default businessesReducer;
