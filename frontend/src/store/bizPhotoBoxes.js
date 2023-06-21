import csrfFetch from "./csrf";

export const RECEIVE_BIZ_PHOTO_BOXES =
  "biz_photo_boxes/RECEIVE_BIZ_PHOTO_BOXES";
export const RECEIVE_BIZ_PHOTO_BOX = "biz_photo_boxes/RECEIVE_BIZ_PHOTO_BOX";
export const RECEIVE_ERRORS = "biz_photo_boxes/RECEIVE_ERRORS";

export const receiveBizPhotoBoxes = (bizPhotoBoxes) => ({
  type: RECEIVE_BIZ_PHOTO_BOXES,
  bizPhotoBoxes
});

export const receiveBizPhotoBox = (bizPhotoBox) => ({
  type: RECEIVE_BIZ_PHOTO_BOX,
  bizPhotoBox
});

export const receiveErrors = (errors) => ({
  type: RECEIVE_ERRORS,
  errors
});

export const getBizPhotoBox =
  (businessId) =>
  ({ bizPhotoBoxes }) => {
    // debugger;
    return bizPhotoBoxes[businessId];
  };

export const fetchBizPhotoBox = (businessId) => async (dispatch) => {
  const res = await csrfFetch(
    `/api/businesses/${businessId}/biz_photo_boxes/1`
  ).catch((errors) => receiveErrors(errors));
  // console.log(res);
  let data;
  if (res.ok) {
    data = await res.json();
    dispatch(receiveBizPhotoBox(data));
  } else {
    // data = res.errors;
    const errors = await res.statusText;
    dispatch(receiveErrors(errors));
  }
};

const bizPhotoBoxesReducer = (preloadedState = {}, action) => {
  const newState = { ...preloadedState };
  switch (action.type) {
    case RECEIVE_BIZ_PHOTO_BOXES:
      return { ...newState, ...action.bizPhotoBoxes };
    case RECEIVE_BIZ_PHOTO_BOX:
      newState[action.bizPhotoBox.id] = action.bizPhotoBox;
      return newState;
    case RECEIVE_ERRORS:
      return { ...newState, ...action.errors };
    default:
      return preloadedState;
  }
};

export default bizPhotoBoxesReducer;
