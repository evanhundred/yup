const PresentStars = ({ business }) => {
  if (business.reviews.length === 0) return null;

  let avgRating;
  if (business.reviews.length === 1) {
    avgRating = business.reviews[0].rating;
  } else {
    let sumRatings = 0;
    for (let i = 0; i < business.reviews.length; i++) {
      sumRatings += business.reviews[i].rating;
    }
    avgRating = sumRatings / business.reviews.length;

    // step 1. chop off decimals after the first 2
    let avgRating2dp = Math.round(avgRating * 100) / 100;

    let reducedAvg; // average ratings "rounded" to the nearest .5
    if (Number.isInteger(avgRating2dp)) reducedAvg = avgRating2dp;
    else {
      let avgDecimals = avgRating2dp - Math.floor(avgRating2dp);
      if (avgDecimals < 0.25) reducedAvg = Math.floor(avgRating2dp);
      else if (avgDecimals < 0.75) reducedAvg = Math.floor(avgRating2dp) + 0.5;
      else reducedAvg = Math.ceil(avgRating2dp);
    }
    // CHECK THIS SYNTAX ^^^^^ I HAVE SEEN IT USED BUT NOT TESTED IT
  }
  // now we have the average ratings for the business, rounded to the nearest half-star.
  // TODO: use this tool to calculate business ratings, and format output to be presented
  // as stars. 04-25-23
};

export default PresentStars;

// business has no reviews
// business has one review
// business has more than one review
