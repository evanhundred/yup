export const RECEIVE_MESSAGE = "message/RECEIVE_MESSAGE";

export const CLEAR_MESSAGES = "message/CLEAR_MESSAGES";

export const receiveMessage = (message) => ({
  type: RECEIVE_MESSAGE,
  message
});

export const clearMessages = () => ({
  type: CLEAR_MESSAGES
});

export const loadMessage = (message) => async (dispatch) => {
  const res = dispatch(receiveMessage(message));
  // let data;
  // if (res) data = await res.json();
  // console.log(res);
  return res;
};

export const getMessages = ({ messages }) => ({ ...messages });

export const resetMessages = () => async (dispatch) => {
  // const res = await dispatch(clearMessage);
  // const data = await res.json();
  // return data;
  dispatch(clearMessages());
};

const messagesReducer = (preloadedState = {}, action) => {
  const newState = { ...preloadedState };
  switch (action.type) {
    case RECEIVE_MESSAGE:
      return { ...newState, ...action.message };
    case CLEAR_MESSAGES:
      return {};
    default:
      return newState;
  }
};

export default messagesReducer;
