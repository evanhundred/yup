import { createSelector } from '@reduxjs/toolkit';
import { createOwnedBusiness } from './ownedBusinesses';
import csrfFetch from './csrf';

// Action Types
export const RECEIVE_BUSINESSES = 'businesses/RECEIVE_BUSINESSES';
export const RECEIVE_BUSINESS = 'businesses/RECEIVE_BUSINESS';
export const CLEAR_BUSINESSES = 'businesses/CLEAR_BUSINESSES';
export const REMOVE_BUSINESS = 'businesses/REMOVE_BUSINESS';
export const RECEIVE_ERRORS = 'businesses/RECEIVE_ERRORS';
export const CLEAR_ERRORS = 'busineses/CLEAR_ERRORS';
// export const RECEIVE_BUSINESS_ERRORS = 'businesses/RECEIVE_BUSINESS_ERRORS';
// export const CLEAR_BUSINESS_ERRORS = 'businesses/CLEAR_BUSINESS_ERRORS';

// Action Creators
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

// Selectors
export const resetBusinesses = () => async (dispatch) => {
  dispatch(clearBusinesses());
};

export const getBusiness =
  (businessId) =>
  ({ businesses }) => {
    return businesses[businessId] || null;
    // if (businesses.errors) return businesses.errors;
    // return businesses[businessId];
  };

export const getBusinesses = createSelector(
  (state) => state.businesses,
  (businesses) => Object.values(businesses).filter((item) => typeof item === 'object' && item.id)
);

export const getBusinessErrors = (state) => state.businesses.errors || null;

// Helper function to handle API errors consistently
const handleApiError = async (response) => {
  let errorData;

  try {
    errorData = await response.json();
  } catch {
    // If JSON parsing fails, create a generic error
    errorData = { errors: ['An unexpected error occurred'] };
  }

  // Ensure we always return an array of error messages
  const errors = errorData.errors || [errorData.message] || ['An error occurred.'];

  return {
    ok: false,
    errors: Array.isArray(errors) ? errors : [errors],
    status: response.status
  };
};

// Thunk Actions
export const fetchBusinesses = () => async (dispatch) => {
  try {
    const response = await csrfFetch('/api/businesses');

    if (response.ok) {
      const data = await response.json();
      dispatch(receiveBusinesses(data));
      return { ok: true, data };
    } else {
      const errorResult = await handleApiError(response);
      dispatch(receiveErrors(errorResult.errors));
      return errorResult;
    }
  } catch (error) {
    const errors = ['Network error: Unable to fetch businesses'];
    dispatch(receiveErrors(errors));
    return { ok: false, errors };
  }
  // const res = await csrfFetch('/api/businesses');
  // let data;
  // if (res.ok) {
  //   data = await res.json();
  //   dispatch(receiveBusinesses(data));
  // } else {
  //   data = res.errors;
  // }
};

export const fetchBusiness = (businessId) => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/businesses/${businessId}`);

    if (response.ok) {
      const data = await response.json();
      dispatch(receiveBusiness(data));
      return { ok: true, data };
    } else {
      const errorResult = await handleApiError(response);
      dispatch(receiveErrors(errorResult.errors));
      return errorResult;
    }
  } catch (error) {
    const errors = ['Network error: Unable to fetch business'];
    dispatch(receiveErrors(errors));
    return { ok: false, errors };
  }
  // const res = await csrfFetch(`/api/businesses/${businessId}`).catch((errors) => dispatch(receiveBusinessErrors(errors)));
  // let data;
  // if (res.ok) {
  //   data = await res.json();
  //   dispatch(receiveBusiness(data));
  // }
};

export const createBusinessStub = (business) => async (dispatch) => {
  try {
    const response = await csrfFetch('/api/businesses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(business)
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(createOwnedBusiness(data.id));
      dispatch(receiveBusiness(data));
      return { ok: true, data };
    } else {
      const errorResult = await handleApiError(response);
      dispatch(receiveErrors(errorResult.errors));
      return errorResult;
    }
  } catch (error) {
    const errors = ['Network error: Unable to create business'];
    dispatch(receiveErrors(errors));
    return { ok: false, errors };
  }
  //   let data;
  //   const res = await csrfFetch(`/api/businesses/`, {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify(business)
  //   }).catch((error) => {
  //     data = error;
  //   });
  //   if (res && res.ok) {
  //     data = await res.json();
  //     dispatch(createOwnedBusiness(data.id));
  //     dispatch(receiveBusiness(data));
  //   }
  //   return data;
};

// FINISH UPDATING AND REFACTORING PER CLAUDE SUGGESTIONS!!!

export const updateBusiness = (business) => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/businesses/${business.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(business) // wrap in business object for Rails strong params
      // body: JSON.stringify({ business }) // wrap in business object for Rails strong params
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(receiveBusiness(data));
      return { ok: true, data };
    } else {
      const errorResult = await handleApiError(response);
      dispatch(receiveErrors(errorResult.errors));
      return errorResult;
    }
    // const data = await res.json();

    // if (res.ok) {
    //   dispatch(receiveBusiness(data.business));
    //   return { success: true, business: data.business };
    // } else {
    //   dispatch(receiveBusinessErrors(data.errors || ['Update failed']));
    //   return { sucess: false, errors: data.errors };
    // // handle non-200 responses
    // const errorData = await res.json();
    // return {
    //   success: false,
    //   errors: errorData.errors || ['Something went wrong']
    // };
  } catch (error) {
    const errors = ['Network error: Unable to update business'];
    dispatch(receiveErrors(errors));
    return { ok: false, errors };
  }
  // } catch (error) {
  //   // handle network errors or other exceptions
  //   const errorMessage = 'Network error. Please try again.';
  //   // console.error('Update business error:', error);
  //   dispatch(receiveBusinessErrors([errorMessage]));
  //   return {
  //     success: false,
  //     errors: [errorMessage]
  //   };
  // }
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
  try {
    const response = await csrfFetch(`/api/businesses/${businessId}`, {
      method: 'DELETE'
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(removeBusiness(businessId));
      return { ok: true, data };
    } else {
      const errorResult = await handleApiError(response);
      dispatch(receiveErrors(errorResult.errors));
      return errorResult;
    }
  } catch (error) {
    const errors = ['Network error: Unable to delete business'];
    dispatch(receiveErrors(errors));
    return { ok: false, errors };
  }
};

export const searchBusinesses = (query) => async (dispatch) => {
  try {
    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      const errors = ['Search query cannot be empty'];
      dispatch(receiveErrors(errors));
      return { ok: false, errors };
    }

    const response = await csrfFetch('/api/businesses/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: trimmedQuery })
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(receiveBusiness(data));
      return { ok: true, data };
    } else {
      const errorResult = await handleApiError(response);
      dispatch(receiveErrors(errorResult.errors));
      return errorResult;
    }
  } catch (error) {
    const errors = ['Network error: Unable to search businesses'];
    dispatch(receiveErrors(errors));
    return { ok: false, errors };
  }
  // const res = await csrfFetch(`/api/businesses/search`, {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ query: query })
  // }).catch((error) => {
  //   data = error;
  // });
  // if (res && res.ok) {
  //   data = await res.json();
  //   dispatch(receiveBusinesses(await data));
  // } else {
  //   data = res;
  // }
  // return data;
};

// Reducer
const businessesReducer = (state = {}, action) => {
  // const newState = { ...preloadedState };
  switch (action.type) {
    case RECEIVE_BUSINESSES:
      return { ...action.businesses };

    case RECEIVE_BUSINESS:
      return {
        ...state,
        [action.business.id]: action.business
      };
    // if (action.business.id) newState[action.business.id] = action.business;
    // else newState.errors = action.business;
    // return newState;

    case RECEIVE_ERRORS:
      // newState.errors = action.errors;
      return {
        ...state,
        errors: action.errors
      };

    case REMOVE_BUSINESS: {
      const newState = { ...state };
      delete newState[action.businessId];
      return newState;
    }

    case CLEAR_ERRORS: {
      const newState = { ...state };
      delete newState.errors;
      return newState;
    }

    case CLEAR_BUSINESSES:
      return {};

    default:
      return state;
  }
};

export default businessesReducer;
