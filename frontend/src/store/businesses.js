import { createSelector } from '@reduxjs/toolkit';
import { createOwnedBusiness } from './ownedBusinesses';
import csrfFetch from './csrf';

export const RECEIVE_BUSINESSES = 'businesses/RECEIVE_BUSINESSES';
export const RECEIVE_BUSINESS = 'businesses/RECEIVE_BUSINESS';
export const CLEAR_BUSINESSES = 'businesses/CLEAR_BUSINESSES';
export const REMOVE_BUSINESS = 'businesses/REMOVE_BUSINESS';
export const RECEIVE_BUSINESS_ERRORS = 'businesses/RECEIVE_BUSINESS_ERRORS';
export const CLEAR_BUSINESS_ERRORS = 'businesses/CLEAR_BUSINESS_ERRORS';

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

export const receiveBusinessErrors = (errors) => ({
  type: RECEIVE_BUSINESS_ERRORS,
  errors
});

export const clearBusinessErrors = () => ({
  type: CLEAR_BUSINESS_ERRORS
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
  const res = await csrfFetch(`/api/businesses/${businessId}`).catch((errors) => dispatch(receiveBusinessErrors(errors)));
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
  try {
    const res = await csrfFetch(`/api/businesses/${business.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ business }) // wrap in business object for Rails strong params
    });

    const data = await res.json();

    if (res.ok) {
      dispatch(receiveBusiness(data.business));
      return { success: true, business: data.business };
    } else {
      dispatch(receiveBusinessErrors(data.errors || ['Update failed']));
      return { sucess: false, errors: data.errors };
      // // handle non-200 responses
      // const errorData = await res.json();
      // return {
      //   success: false,
      //   errors: errorData.errors || ['Something went wrong']
      // };
    }
  } catch (error) {
    // handle network errors or other exceptions
    const errorMessage = 'Network error. Please try again.';
    // console.error('Update business error:', error);
    dispatch(receiveBusinessErrors([errorMessage]));
    return {
      success: false,
      errors: [errorMessage]
    };
  }
};

// export const updateBusiness = (business) => async (dispatch) => {
//   let data;
//   const res = await csrfFetch(`/api/businesses/${business.id}`, {
//     method: 'PATCH',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(business)
//   }).catch((error) => {
//     data = error;
//   });
//   if (res && res.ok) {
//     data = await res.json();
//     dispatch(receiveBusiness(data));
//   }
//   return data;
// };

// export const updateBusiness = (business) => async (dispatch) => {
//   try {
//     console.log('Submitting data:', business);

//     const response = await csrfFetch(`/api/businesses/*{business.id}`, {
//       method: 'PATCH',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({business: business})
//     });

//     console.log('Response status:', response.status);

//     const result = await response.json();
//     return result;
//     // console.log('Response data:', result);

//     // if (!response.ok) {
//     //   console.log('Backend errors received:', result.errors);
//     //   return result.errors;
//     // }

//     // onSuccess(result.business);
//   } catch (error) {
//     console.error('Network error:', error);

//   }
// }

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
    case RECEIVE_BUSINESS_ERRORS:
      newState.errors = action.errors;
      return { ...newState, ...action.errors };
    case REMOVE_BUSINESS:
      delete newState[action.businessId];
      return newState;
    case CLEAR_BUSINESS_ERRORS:
      return { ...newState, errors: [] };
    case CLEAR_BUSINESSES:
      return {};
    default:
      return preloadedState;
  }
};

export default businessesReducer;
