import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBusiness, fetchBusiness } from "../../store/businesses";
import { createReview } from "../../store/reviews";
import "./index.css";

const CreateReviewForm = () => {
  const dispatch = useDispatch();
  const { businessId } = useParams();
  const business = useSelector(getBusiness(businessId));

  const [body, setBody] = useState("");
  const [rating, setRating] = useState("");
  // const { reviewId } = useSelector()

  useEffect(() => {
    dispatch(fetchBusiness(businessId));
  }, [businessId, dispatch]);

  // useEffect(() => {
  //   dispatch(fetchReview(reviewId));
  // }, [reviewId, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { body: body, rating: rating };
    dispatch(createReview(data));
  };

  return (
    <div id="edit-review-form-container">
      <h3>Create Review for {`${business ? business.name : ""}`}</h3>
      <div className="create-form">
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

export default CreateReviewForm;