import { useEffect, useState } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBusiness, fetchBusiness } from "../../store/businesses";
import { createReview } from "../../store/reviews";
import "./index.css";

const NewReviewForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { businessId } = useParams();
  const business = useSelector(getBusiness(businessId));

  const [body, setBody] = useState("");
  const [rating, setRating] = useState("");

  useEffect(() => {
    dispatch(fetchBusiness(businessId));
  }, [businessId, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { body: body, rating: rating };
    dispatch(createReview(data, businessId)).then(() => {
      history.push(`/businesses/${businessId}`);
    });
  };

  const handleGuidelinesClick = () => {
    console.log("review guidelines link.");
    // open modal
  };

  return (
    <div id="create-review-form-container">
      <div className="top-line">
        <h3>
          <Link
            to={business ? `/businesses/${business.id}` : "/"}
            rel="noreferrer"
            target="_blank"
          >{`${business ? business.name : ""}`}</Link>
        </h3>
        <p className="review-guidelines-link" onClick={handleGuidelinesClick}>
          Read our review guidelines
        </p>
      </div>
      <div className="rating-and-review-text-box">
        <div className="rating-stars-line">
          <div className="rating-stars">*****</div>
          <h4>Select your rating</h4>
        </div>
        <div className="review-prompt-line">
          <h5>A few things to consider in your review</h5>
          <div className="prompt-items">
            <p>Food</p>
            <p>Service</p>
            <p>Ambiance</p>
          </div>
        </div>
        <textarea
          id="review-body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
      </div>
      {/* <div className="create-form">
        <form onSubmit={handleSubmit}>
          <label for="review-body">
            <textarea
              id="review-body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
          </label>
          <label for="review-rating">
            <input
              id="review-rating"
              type="number"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            />
          </label>
          <button>Create Review</button>
        </form>
      </div> */}
    </div>
  );
};

export default NewReviewForm;
