import { useEffect, useState } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBusiness, fetchBusiness } from "../../store/businesses";
import { fetchReview, updateReview, deleteReview } from "../../store/reviews";
import { backgroundNavBar, unBackgroundNavBar } from "../../utils/modal";
import "./index.css";

const EditReviewForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { businessId, id } = useParams();
  const business = useSelector(getBusiness(businessId));
  let reviewId = id;
  let review;
  let i;
  if (business && business.reviews) {
    for (i = 0; i < business.reviews.length; i++) {
      if (business.reviews[i].id === parseInt(reviewId))
        review = business.reviews[i];
    }
  }

  const [body, setBody] = useState(review ? review.body : "");
  const [rating, setRating] = useState(review ? review.rating : "");
  const [errors, setErrors] = useState([]);
  const [hideErrorBox, setHideErrorBox] = useState(false);

  const [showReviewGuidelinesModal, setShowReviewGuidelinesModal] =
    useState(false);

  useEffect(() => {
    dispatch(fetchBusiness(businessId));
  }, [businessId, dispatch]);

  const html = document.querySelector("html");

  const clickUpdate = (e) => {
    e.preventDefault();
    if (rating < 1 || rating > 5) {
      errors.push("Please select a rating between 1 and 5.");
      console.log(errors);
    } else {
      const data = { ...review, body: body, rating: rating };
      dispatch(updateReview(data, businessId)).then(() => {
        history.push(`/businesses/${businessId}`);
      });
    }
  };

  const clickDelete = (e) => {
    e.preventDefault();
    dispatch(deleteReview(reviewId, businessId)).then(() => {
      history.push(`/businesses/${businessId}`);
    });
  };

  // const closeBox = () => setHideErrorBox(true);

  // const ErrorBox = () => {
  //   if (errors.length > 0 && !hideErrorBox) {
  //     return (
  //       <div id="update-review-errors">
  //         <ul>
  //           {errors.map((error) => (
  //             <li key={error}>{error}</li>
  //           ))}
  //         </ul>

  //         <button id="closeBoxButton" onClick={closeBox}>
  //           x
  //         </button>
  //       </div>
  //     );
  //   } else {
  //     return null;
  //   }
  // };

  const handleGuidelinesClick = () => {
    if (html) html.style.overflow = "hidden";
    setShowReviewGuidelinesModal(true);
    backgroundNavBar();
  };

  return (
    <div id="edit-review-form-container">
      <div className="top-line"></div>
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
      <div className="edit-form">
        <form>
          <label>
            Body
            <textarea
              value={`${body}`}
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
