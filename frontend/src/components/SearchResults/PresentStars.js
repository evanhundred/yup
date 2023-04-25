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

    let finalAvg;
    if (Number.isInteger(avgRating2dp)) finalAvg = avgRating2dp;
  }
};

export default PresentStars;

// business has no reviews
// business has one review
// business has more than one review
