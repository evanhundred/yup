export const RECEIVE_MESSAGE = "message/RECEIVE_MESSAGE";

export const CLEAR_MESSAGE = "message/CLEAR_MESSAGE";

export const receiveMessage = (message) => ({
  type: RECEIVE_MESSAGE,
  message
});

export const clearMessage = () => ({
  type: CLEAR_MESSAGE
});

export const loadMessage = (message) => async (dispatch) => {
  const res = dispatch(receiveMessage(message));
  // let data;
  // if (res) data = await res.json();
  return res;
};

export const resetMessage = () => async (dispatch) => {
  // const res = await dispatch(clearMessage);
  // const data = await res.json();
  // return data;
  dispatch(clearMessage());
};

const messageReducer = (preloadedState = {}, action) => {
  const newState = { ...preloadedState };
  switch (action.type) {
    case RECEIVE_MESSAGE:
      return { ...newState, message: action.message };
    case CLEAR_MESSAGE:
      return {};
    default:
      return newState;
  }
};

export default messageReducer;
