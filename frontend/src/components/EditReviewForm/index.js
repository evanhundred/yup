import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBusiness, fetchBusiness } from "../../store/businesses";
import "./index.css";

const EditReviewForm = () => {
  const dispatch = useDispatch();
  const { businessId } = useParams();
  const business = useSelector(getBusiness(businessId));
  const { reviewId } = useParams();
  const review = useSelector(getReview(reviewId));
  // const { reviewId } = useSelector()

  useEffect(() => {
    dispatch(fetchBusiness(businessId));
  }, [businessId, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {};
  };

  return (
    <div id="edit-review-form-container">
      <h3>Edit Review for {`${business.name}`}</h3>
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
          <button value="Update Review" />
        </form>
      </div>
    </div>
  );
};

export default EditReviewForm;
