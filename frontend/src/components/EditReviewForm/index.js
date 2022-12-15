import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBusiness, fetchBusiness } from "../../store/businesses";
import {
  getReview,
  fetchReview,
  updateReview,
  deleteReview
} from "../../store/reviews";
import "./index.css";

const EditReviewForm = () => {
  const dispatch = useDispatch();
  const { businessId } = useParams();
  const business = useSelector(getBusiness(businessId));
  const { id } = useParams();
  const reviewId = id;
  // debugger;
  // const review = useSelector(getReview(id));
  const review = reviewId && business ? business.reviews[reviewId - 1] : {};

  const [body, setBody] = useState(review ? review.body : "");
  const [rating, setRating] = useState(review ? review.rating : "");
  // const { reviewId } = useSelector()

  useEffect(() => {
    dispatch(fetchBusiness(businessId));
  }, [businessId, dispatch]);

  useEffect(() => {
    dispatch(fetchReview(reviewId));
  }, [reviewId, dispatch]);

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (e.target.className === "update") {
  //     const data = { body: body, rating: rating };
  //     dispatch(updateReview(data));
  //   } else if (e.target.className === "delete") {
  //     dispatch(deleteReview(review.id));
  //   }
  // };

  const clickUpdate = (e) => {
    e.preventDefault();
    const data = { body: body, rating: rating };
    dispatch(updateReview(data));
  };

  const clickDelete = (e) => {
    e.preventDefault();
    dispatch(deleteReview(reviewId, businessId));
  };

  return (
    <div id="edit-review-form-container">
      <h3>Edit Review for {`${business ? business.name : ""}`}</h3>
      <div className="edit-form">
        <form>
          <label>
            Body
            <textarea
              value={`${review ? review.body : ""}`}
              onChange={(e) => setBody(e.target.value)}
            />
          </label>
          <label>
            Rating
            <input
              type="number"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            />
          </label>
          <button type="button" className="update" onClick={clickUpdate}>
            Update Review
          </button>
          <button type="date" className="delete" onClick={clickDelete}>
            Delete Review
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditReviewForm;
