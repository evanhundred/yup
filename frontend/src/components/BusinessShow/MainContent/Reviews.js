import { Link } from "react-router-dom";

const Reviews = ({ business, handleWriteReview }) => {
  // const reviewsIndexItemStarBox = [];
  const reviewItems = business.reviews.map((review, idx) => (
    <div key={idx} className="review-item-container" id="reviews-container">
      <div className="top-card">
        <div className="profile-image-container">C</div>
        <h5 className="author-name">Firstname L.</h5>
      </div>
      <div className="star-rating"></div>

      <div className="review-text">{review.body}</div>
      <div className="review-rating">
        <span>{review.rating}</span>/5
      </div>
      <div className="edit-link">
        <Link to={`/businesses/${business.id}/reviews/${review.id}/edit`}>
          <h4>Edit Review</h4>
        </Link>
      </div>
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
            <div className="star-rating-legend-container">
              <h4>{string}</h4>
            </div>
          );
        })}
      </>
    );
  };

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
              <div className={`bar-${num}-star`}>
                <div className="color-bar" />
              </div>
            </>
          );
        })}
      </>
    );
  };

  return (
    <div id="reviews-container" className="card-container">
      <div className="main-title review">
        <h2>Reviews</h2>
      </div>
      <div className="write-review-link" onClick={(e) => handleWriteReview(e)}>
        <h3>Write your review.</h3>
      </div>
      <div className="overall-ratings-box">
        <div className="left-side">
          <h4>Overall rating</h4>
          <div className="overall-rating-star-box-container">*****</div>
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
