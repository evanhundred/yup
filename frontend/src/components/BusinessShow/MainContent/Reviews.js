import { Link } from "react-router-dom";

import { overallStarBox, reviewItemStarBox } from "../../../utils/starBox";
import writeReviewIcon from "../../../assets/icons/writing.png";

const Reviews = ({ business, handleWriteReview, currentUser }) => {
  const getAuthorName = (review) => {
    if (!review || !business || !business.authorNames) return null;
    const authorNames = business.authorNames;
    let authorName;
    authorNames.forEach((name) => {
      if (name.reviewId === review.id) authorName = name.name;
    });
    return authorName;
  };
  const reviewItems = business.reviews.map((review, idx) => (
    <div key={idx} className="review-item-container">
      <div className="top-card">
        <div className="profile-image-container">
          <div
            className="profile-picture"
            style={{ color: "orange", fontSize: "40px" }}
          >
            <i className="fa-solid fa-carrot"></i>
          </div>
        </div>
        <h5 className="author-name">{getAuthorName(review)}</h5>
      </div>
      <div className="star-rating">{reviewItemStarBox(review.rating)}</div>
      <div className="review-text">{review.body}</div>
      {currentUser && currentUser.id === review.author_id && (
        <div className="edit-link">
          <Link to={`/businesses/${business.id}/reviews/${review.id}/edit`}>
            <h4 className="edit-review-link">Edit Review</h4>
          </Link>
        </div>
      )}
    </div>
  ));

  const starsLegendsDivs = () => {
    const legendTextStrings = [];
    for (let i = 5; i >= 1; i--) {
      const nextString = `${i} star${i > 1 ? "s" : ""}`;
      legendTextStrings.push(nextString);
    }
    return (
      <>
        {legendTextStrings.map((string) => {
          return (
            <div key={string} className="star-rating-legend-container">
              <h4>{string}</h4>
            </div>
          );
        })}
      </>
    );
  };

  const calculateBarWidths = () => {
    const ratingTotals = {};

    for (let i = 5; i >= 1; i--) {
      ratingTotals[i] = 0;
    }

    business.reviews.forEach((review) => {
      ratingTotals[review.rating] += 1;
    });

    const findHighestRating = () => {
      let greatestAmount = 0;
      const highestRatingNums = [];
      for (let i = 5; i >= 1; i--) {
        const currentRating = ratingTotals[i];
        if (currentRating > greatestAmount) greatestAmount = currentRating;
      }
      for (let i = 5; i >= 1; i--) {
        if (ratingTotals[i] === greatestAmount) highestRatingNums.push(i);
      }
      const data = {
        greatestAmount,
        highestRatingNums
      };
      return data;
    };

    const greatestAmount = findHighestRating().greatestAmount;
    const ratingPercentages = {};
    for (let i = 5; i >= 1; i--) {
      ratingPercentages[i] = ratingTotals[i] / greatestAmount;
    }

    return ratingPercentages;
  };

  const barWidthsObject = calculateBarWidths();
  const stylePercentages = {};
  for (let i = 5; i >= 1; i--) {
    stylePercentages[i] = barWidthsObject[i] * 100;
  }

  const ratingBarsDivs = () => {
    const fiver = [];
    for (let i = 5; i >= 1; i--) {
      fiver.push(i);
    }
    return (
      <>
        {fiver.map((num) => {
          return (
            <>
              <div key={num} className={`bar-${num}-star`}>
                <div
                  className="color-bar"
                  style={{ width: `${stylePercentages[num]}%` }}
                />
              </div>
            </>
          );
        })}
      </>
    );
  };

  return (
    <div id="reviews-container" className="reviews-card-container">
      <div className="reviews-title-container">
        <h2>Reviews</h2>
      </div>
      <div className="write-review-link" onClick={(e) => handleWriteReview(e)}>
        <div className="write-review-icon">
          <img src={writeReviewIcon} alt="write your review" />
        </div>
        <h3>Write your review.</h3>
      </div>
      <div className="recommended-reviews-title">
        <h4>Recommended Reviews</h4>
      </div>
      <div className="overall-ratings-box">
        <div className="left-side">
          <h4>Overall rating</h4>
          <div className="overall-rating-star-box-container">
            {overallStarBox(business.reviews)}
          </div>
          <p className="review-count">{business.reviews.length} reviews</p>
        </div>

        <div className="right-side">
          <div className="stars-legends-container">{starsLegendsDivs()}</div>
          <div className="rating-bars-container">{ratingBarsDivs()}</div>
        </div>
      </div>

      <div className="reviews-content">{reviewItems}</div>
    </div>
  );
};

export default Reviews;
