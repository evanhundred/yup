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
  const [initialRatingClicked, setInitialRatingClicked] = useState(false);

  useEffect(() => {
    dispatch(fetchBusiness(businessId));
  }, [businessId, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating && body) {
      const data = { body: body, rating: rating };
      dispatch(createReview(data, businessId)).then(() => {
        history.push(`/businesses/${businessId}`);
      });
    } else {
      if (!body) console.log("no review text.");
      else if (!rating) console.log("no rating selected.");
    }
  };

  const handleGuidelinesClick = () => {
    console.log("review guidelines link.");
    // open modal
  };

  const starBoxDivs = document.querySelectorAll(`.rating-stars > div`);

  const ratingTextString = () => {
    const ratingTextStrings = [
      "Select your rating",
      "Not good",
      "OK",
      "Decent",
      "Delicious",
      "Top-notch"
    ];

    return ratingTextStrings[rating];
  };

  const styleStarBoxes = (num) => {
    const oldNum = rating;
    starBoxDivs.forEach((starBox, idx) => {
      if (idx < oldNum) starBox.classList.remove(`hovered-num-${oldNum}`);
      if (idx < num) starBox.classList.add(`hovered-num-${num}`);
    });
  };

  const handleHover = (isHovered, e, num) => {
    e.preventDefault();

    if (isHovered) {
      setRating(num);
    } else {
      setRating(0);
    }

    starBoxDivs.forEach((starBox, idx) => {
      // console.log(idx);

      if (idx < num) {
        if (isHovered) starBox.classList.add(`hovered-num-${num}`);
        else starBox.classList.remove(`hovered-num-${num}`);
      }
    });
  };

  const handleStarBoxClick = (e, num) => {
    e.preventDefault();
    console.log(num);
    if (!initialRatingClicked) setInitialRatingClicked(true);
    styleStarBoxes(num);
    setRating(num);
  };

  const newReviewStarBox = [1, 2, 3, 4, 5].map((num) => (
    <div
      className={`star-box-${num}`}
      key={num}
      onMouseEnter={(e) => {
        if (!initialRatingClicked) handleHover(true, e, num);
      }}
      onMouseLeave={(e) => {
        if (!initialRatingClicked) handleHover(false, e, num);
      }}
      onClick={(e) => handleStarBoxClick(e, num)}
    >
      <span>&lowast;</span>
    </div>
  ));

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
        <form onSubmit={handleSubmit}>
          <div className="rating-stars-line">
            <div className="rating-stars">{newReviewStarBox}</div>
            <h4>{ratingTextString()}</h4>
          </div>
          <div className="review-prompt-line">
            <h5>A few things to consider in your review</h5>
            <div className="prompt-items">
              <p>Food</p>
              <p>Service</p>
              <p>Ambiance</p>
            </div>
          </div>
          <label htmlFor="review-body" />
          {/* <input
            id="review-body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          /> */}
          <textarea
            id="review-body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </form>
      </div>

      <div className="post-review-button" onClick={handleSubmit}>
        <h3>Post Review</h3>
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
