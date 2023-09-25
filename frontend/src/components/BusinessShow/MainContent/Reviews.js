import { Link } from "react-router-dom";

const Reviews = ({ business, handleWriteReview }) => {
  const reviewItems = business.reviews.map((review, idx) => (
    <div key={idx} className="review-item-container" id="reviews-container">
      <div className="top-card">
        <div className="profile-image-container">C</div>
        <h5 className="author-name">Firstname L.</h5>
      </div>
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

  return (
    <div id="reviews-container" className="card-container">
      <div className="main-title review">
        <h2>Reviews</h2>
      </div>
      <div className="write-review-link" onClick={(e) => handleWriteReview(e)}>
        <h3>Write your review.</h3>
      </div>

      <div className="reviews-content">{reviewItems}</div>
    </div>
  );
};

export default Reviews;
