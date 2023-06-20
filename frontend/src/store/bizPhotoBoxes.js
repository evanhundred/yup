import csrfFetch from "./csrf";

export const RECEIVE_BIZ_PHOTO_BOXES =
  "biz_photo_boxes/RECEIVE_BIZ_PHOTO_BOXES";
export const RECEIVE_BIZ_PHOTO_BOX = "biz_photo_boxes/RECEIVE_BIZ_PHOTO_BOX";

export const receiveBizPhotoBoxes = (bizPhotoBoxes) => ({
  type: RECEIVE_BIZ_PHOTO_BOXES,
  bizPhotoBoxes
});

export const receiveBizPhotoBox = (bizPhotoBox) => ({
  type: RECEIVE_BIZ_PHOTO_BOX,
  bizPhotoBox
});

export const getBizPhotoBox =
  (bizPhotoBoxId) =>
  ({ bizPhotoBoxes }) => {
    return bizPhotoBoxes[bizPhotoBoxId];
  };

export const fetchBizPhotoBox =
  ({ businessId }) =>
  async (dispatch) => {
    const res = await csrfFetch(
      `/api/businesses/${businessId}/biz-photo-boxes/1`
    );
    let data;
    if (res.ok) {
      data = await res.json();
      dispatch(receiveBizPhotoBox(data));
    } else {
      data = res.errors;
    }
  };

const bizPhotoBoxesReducer = (preloadedState = {}, action) => {
  const newState = { ...preloadedState };
  switch (action.type) {
    case RECEIVE_BIZ_PHOTO_BOXES:
      return { ...newState, ...action.bizPhotoBoxes };
    case RECEIVE_BIZ_PHOTO_BOX:
      newState[action.bizBhotoBox.id] = action.bizPhotoBox;
      return newState;
    default:
      return preloadedState;
  }
};

export default bizPhotoBoxesReducer;
