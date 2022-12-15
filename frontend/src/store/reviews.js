import csrfFetch from "./csrf";

export const RECEIVE_REVIEWS = "reviews/RECEIVE_REVIEWS";
export const RECEIVE_REVIEW = "reviews/RECEIVE_REVIEW";

export const receiveReviews = (reviews) => ({
  type: RECEIVE_REVIEWS,
  reviews
});

export const receiveReview = (review) => ({
  type: RECEIVE_REVIEW,
  review
});

export const getReview =
  (reviewId) =>
  ({ reviews }) => {
    console.log(reviews);
    return reviews[reviewId];
  };

export const getReviews = ({ reviews }) =>
  reviews ? Object.values(reviews) : [];

export const fetchReviews =
  ({ businessId }) =>
  async (dispatch) => {
    const res = await csrfFetch(`/api/businesses/${businessId}/reviews`);
    let data;
    if (res.ok) {
      data = await res.json();
      dispatch(receiveReviews(data));
    } else {
      data = res.errors;
    }
    console.log(data);
  };

export const fetchReview =
  ({ reviewId }) =>
  async (dispatch) => {
    const res = await csrfFetch(`/api/reviews/${reviewId}`);
    let data;
    if (res.ok) {
      data = await res.json();
      dispatch(receiveReview(data));
    } else {
      data = res.errors;
    }
    console.log(data);
  };

const reviewsReducer = (preloadedState = {}, action) => {
  const newState = { ...preloadedState };
  switch (action.type) {
    case RECEIVE_REVIEWS:
      return { ...newState, ...action.reviews };
    case RECEIVE_REVIEW:
      newState[action.review.id] = action.review;
      return newState;
    default:
      return preloadedState;
  }
};

export default reviewsReducer;
