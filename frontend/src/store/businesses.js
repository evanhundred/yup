import csrfFetch from "./csrf";

export const RECEIVE_BUSINESSES = "businesses/RECEIVE_BUSINESSES";
export const RECEIVE_BUSINESS = "businesses/RECEIVE_BUSINESS";

export const RECEIVE_ERRORS = "businesses/RECEIVE_ERRORS";

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
  const res = await csrfFetch(`/api/businesses/${businessId}`).catch((errors) =>
    receiveErrors(errors)
  );
  let data;
  if (res.ok) {
    data = await res.json();
    dispatch(receiveBusiness(data));
  } else {
    const errors = await res.statusText;
    dispatch(receiveErrors(errors));
  }

  // {"title":"Server Error",
  // "message":"ActiveRecord::RecordNotFound - Couldn't find Business with 'id'=22",
  // "stack":["app/controllers/api/businesses_controller.rb:15:in `show'"]}

  // Response {
  // type: "basic",
  // url: "http://localhost:3000/api/businesses/22",
  // redirected: false,
  // status: 500,
  // ok: false,
  // statusText: "Internal Server Error",
  // headers: Headers(21),
  // body: ReadableStream, bodyUsed: false
  // }

  // dispatch(receiveErrors(data));
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
      return { ...newState, ...action.errors };
    default:
      return preloadedState;
  }
};

export default businessesReducer;
