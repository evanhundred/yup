import { createSelector } from "@reduxjs/toolkit";

export const RECEIVE_MESSAGE = "message/RECEIVE_MESSAGE";
export const RECEIVE_MESSAGES = "message/RECEIVE_MESSAGES";

export const CLEAR_MESSAGES = "message/CLEAR_MESSAGES";
export const REMOVE_MESSAGE = "message/REMOVE_MESSAGE";

export const receiveMessages = (messages) => ({
  type: RECEIVE_MESSAGES,
  messages
});

export const receiveMessage = (message) => ({
  type: RECEIVE_MESSAGE,
  message
});

export const clearMessages = () => ({
  type: CLEAR_MESSAGES
});

export const removeMessage = (key) => ({
  type: REMOVE_MESSAGE,
  key
});

export const loadMessage = (message) => async (dispatch) => {
  const res = dispatch(receiveMessage(message));
  return res;
};

export const loadMessages = (messages) => async (dispatch) => {
  const res = dispatch(receiveMessages(messages));
  // let data;
  // if (res) data = await res.json();
  // console.log(res);
  return res;
};

export const getMessages = createSelector(
  (state) => state.messages,
  (messages) => {
    return messages;
  }
);

// ({ messages }) => ({ ...messages });

export const deleteMessage = (message) => async (dispatch) => {
  const messageKey = Object.keys(message)[0];
  dispatch(removeMessage(messageKey));
};

export const resetMessages = () => async (dispatch) => {
  // console.log("resetMessages");
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
    case RECEIVE_MESSAGES:
      return { ...newState, ...action.messages };
    case REMOVE_MESSAGE:
      delete newState[action.key];
      return newState;
    case CLEAR_MESSAGES:
      return {};
    default:
      return newState;
  }
};

export default messagesReducer;
