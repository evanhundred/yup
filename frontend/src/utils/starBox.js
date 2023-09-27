export const overallStarBox = (reviews) => {
  const ratingsSum = reviews.reduce((sum, review) => sum + review.rating, 0);
  const ratingsAvg = Math.round((ratingsSum / reviews.length) * 10) / 10;

  const lastRatingDigit = (ratingsAvg * 10) % 10;
  const firstRatingDigit = Math.floor(ratingsAvg);
  let isHalfStar = false;
  if (lastRatingDigit >= 2.5) isHalfStar = true;
  let ratingDigitColor;
  if (ratingsAvg >= 1 && ratingsAvg < 1.75) {
    ratingDigitColor = "rgb(255, 196, 78)";
  }
  if (ratingsAvg >= 1.75 && ratingsAvg < 2.75) {
    ratingDigitColor = "rgb(248, 137, 0)";
  }
  if (ratingsAvg >= 2.75 && ratingsAvg < 3.75) {
    ratingDigitColor = "rgb(248, 83, 0)";
  }
  if (ratingsAvg >= 3.75 && ratingsAvg < 4.75) {
    ratingDigitColor = "rgb(244, 57, 0)";
  }
  if (ratingsAvg >= 4.75) {
    ratingDigitColor = "rgb(230, 0, 0)";
  }

  const starBoxDivs = [];
  for (let i = 1; i <= 5; i++) {
    starBoxDivs.push(
      <div
        key={i}
        className={`new-star-box-${i} ${firstRatingDigit}-rating${
          isHalfStar && firstRatingDigit + 1 === i ? " half-star" : ""
        }`}
        style={
          i <= ratingsAvg
            ? {
                background: ratingDigitColor
              }
            : isHalfStar && i === firstRatingDigit + 1
            ? {
                background: `linear-gradient(to right, ${ratingDigitColor}, rgb(223, 223, 223))`
              }
            : {
                background: "rgb(223, 223, 223)"
              }
        }
      >
        <span>&lowast;</span>
      </div>
    );
  }

  return <>{starBoxDivs.map((div) => div)}</>;
};

export const reviewItemStarBox = (rating) => {
  let ratingDigitColor;
  switch (rating) {
    case 1:
      ratingDigitColor = "rgb(255, 196, 78)";
      break;
    case 2:
      ratingDigitColor = "rgb(248, 137, 0)";
      break;
    case 3:
      ratingDigitColor = "rgb(248, 83, 0)";
      break;
    case 4:
      ratingDigitColor = "rgb(244, 57, 0)";
      break;
    case 5:
      ratingDigitColor = "rgb(230, 0, 0)";
      break;
    default:
      break;
  }

  const starBoxDivs = [];
  for (let i = 1; i <= 5; i++) {
    starBoxDivs.push(
      <div
        key={i}
        className={`review-item-star-box-${i} ${rating}-rating`}
        style={
          i <= rating
            ? {
                background: ratingDigitColor
              }
            : {
                background: "rgb(223, 223, 223)"
              }
        }
      >
        <span>&lowast;</span>
      </div>
    );
  }

  return <>{starBoxDivs.map((div) => div)}</>;
};
