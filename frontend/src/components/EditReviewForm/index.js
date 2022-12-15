import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBusiness, fetchBusiness } from "../../store/businesses";
import { getReview, fetchReview, updateReview } from "../../store/reviews";
import "./index.css";

const EditReviewForm = () => {
  const dispatch = useDispatch();
  const { businessId } = useParams();
  const business = useSelector(getBusiness(businessId));
  const { id } = useParams();
  // const review = useSelector(getReview(id));
  const review = id && business ? business.reviews[id] : {};

  const [body, setBody] = useState(review ? review.body : "");
  const [rating, setRating] = useState(review ? review.rating : "");
  // const { reviewId } = useSelector()

  useEffect(() => {
    dispatch(fetchBusiness(businessId));
  }, [businessId, dispatch]);

  // useEffect(() => {
  //   dispatch(fetchReview(reviewId));
  // }, [reviewId, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { ...review, body: body, rating: rating };
    dispatch(updateReview(data));
  };

  return (
    <div id="edit-review-form-container">
      <h3>Edit Review for {`${business ? business.name : ""}`}</h3>
      <div className="edit-form">
        <form onSubmit={handleSubmit}>
          <label>
            Body
            <input value={body} onChange={(e) => setBody(e.target.value)} />
          </label>
          <label>
            Rating
            <input value={rating} onChange={(e) => setRating(e.target.value)} />
          </label>
          <button>Update Review</button>
        </form>
      </div>
    </div>
  );
};

export default EditReviewForm;
