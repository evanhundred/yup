import "./PresentStars.css";

const PresentStars = ({ business }) => {
  if (business.reviews.length === 0)
    return <div className="no-reviews-yet">No reviews yet!</div>;

  let avgRating;
  let reducedAvg; // average ratings "rounded" to the nearest .5
  if (business.reviews.length === 1) {
    reducedAvg = business.reviews[0].rating;
  } else {
    let sumRatings = 0;
    for (let i = 0; i < business.reviews.length; i++) {
      sumRatings += business.reviews[i].rating;
    }
    avgRating = sumRatings / business.reviews.length;

    // chop off decimals after the first 2
    let avgRating2dp = Math.round(avgRating * 100) / 100;

    if (Number.isInteger(avgRating2dp)) reducedAvg = avgRating2dp;
    else {
      let avgDecimals = avgRating2dp - Math.floor(avgRating2dp);
      if (avgDecimals < 0.25) reducedAvg = Math.floor(avgRating2dp);
      else if (avgDecimals < 0.75) reducedAvg = Math.floor(avgRating2dp) + 0.5;
      else reducedAvg = Math.ceil(avgRating2dp);
    }
  }
  // now we have the average ratings for the business, rounded to the nearest half-star.
  // TODO: use this tool to calculate business ratings, and format output to be presented
  // as stars. 04-25-23

  const renderStars = () => {
    let starText;
    if (reducedAvg === 1) starText = "★";
    if (reducedAvg === 1.5)
      starText = (
        <div className="star-text">
          ★
          <span data-title-text="★" className="half-star">
            ★
          </span>
        </div>
      );
    if (reducedAvg === 2) starText = "★★";
    if (reducedAvg === 2.5)
      starText = (
        <div className="star-text">
          ★★
          <span data-title-text="★" className="half-star">
            ★
          </span>
        </div>
      );
    if (reducedAvg === 3) starText = "★★★";
    if (reducedAvg === 3.5)
      starText = (
        <div className="star-text">
          ★★★
          <span data-title-text="★" className="half-star">
            ★
          </span>
        </div>
      );
    if (reducedAvg === 4) starText = "★★★★";
    if (reducedAvg === 4.5)
      starText = (
        <div className="star-text">
          ★★★★
          <span data-title-text="★" className="half-star">
            ★
          </span>
        </div>
      );
    if (reducedAvg === 5) starText = "★★★★★";
    return starText;
  };

  const reviewCount = business.reviews.length;

  return (
    <div className="stars-and-count-container star-rating">
      <div className="rendered-stars">{renderStars()}</div>
      <div className="review-count">
        <p>{reviewCount}</p>
      </div>
    </div>
  );
};

export default PresentStars;

// business has no reviews
// business has one review
// business has more than one review
