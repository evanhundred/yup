import { useState } from "react";
import BlueCheck from "../../../assets/images/blue-check.png";

const TitleCardContent = ({ business }) => {
  const handleReviewCountClick = () => {
    const reviewsComponent = document.getElementById("reviews-container");
    reviewsComponent.scrollIntoView({ behavior: "smooth" });
  };

  const handleSeeHoursClick = () => {
    const hoursComponent = document.querySelector(
      "div.location.card-container"
    );
    hoursComponent.scrollIntoView({ behavior: "smooth" });
  };

  const ratingsSum = business.reviews.reduce(
    (sum, review) => sum + review.rating,
    0
  );
  const ratingsAvg =
    Math.round((ratingsSum / business.reviews.length) * 10) / 10;

  const lastRatingDigit = (ratingsAvg * 10) % 10;
  const firstRatingDigit = Math.floor(ratingsAvg);
  let isHalfStar;
  if (lastRatingDigit >= 2.5 && lastRatingDigit <= 7.5) isHalfStar = true;
  else isHalfStar = false;

  console.log(isHalfStar);
  // const ratingsAvgHalves = Math.round(ratingsAvg);
  const targetDiv = document.querySelector(`.box-${firstRatingDigit + 1}`);
  if (targetDiv && isHalfStar) {
    console.log(targetDiv);
    targetDiv.classList.add("half-star");
    targetDiv.setAttribute("data-title-text", "&lowast;");
  }

  console.log(ratingsAvg, firstRatingDigit);

  // ratingsAvgHalves / 10

  const reviewString = business.reviews.length === 1 ? "review" : "reviews";

  let twoThings = (boxIdx) => {
    return `box-${boxIdx}${boxIdx <= firstRatingDigit ? " orange" : " grey"}${
      isHalfStar && firstRatingDigit + 1 === boxIdx ? " half-star" : ""
    }`;
  };

  const countToFive = [1, 2, 3, 4, 5];
  const myStarBox = countToFive.map((num) => {
    return (
      <div className={`${twoThings(num)}`} key={num}>
        <span>&lowast;</span>
      </div>
    );
  });

  // const starBoxClassNames = [
  //   ,
  //   `box-2 ${isHalfStar && firstRatingDigit === 2 ? "half-star" : ""}`,
  //   `box-3 ${isHalfStar && firstRatingDigit === 3 ? "half-star" : ""}`,
  //   `box-4 ${isHalfStar && firstRatingDigit === 4 ? "half-star" : ""}`,
  //   `box-5 ${isHalfStar && firstRatingDigit === 5 ? "half-star" : ""}`
  // ];

  const ratingsStarBox = () => {
    for (let i = 1; i <= 5; i++) {
      return (
        <div className={`${twoThings(i)}`}>
          <span>&lowast;</span>
        </div>
      );
    }
  };

  // return {
  /* <div className={starBoxClassNames[1]}>
      <span>&lowast;</span>
      </div>
      <div className={starBoxClassNames[2]}>
      <span>&lowast;</span>
      </div>
      <div className={starBoxClassNames[3]}>
      <span>&lowast;</span>
      </div>
      <div className={starBoxClassNames[4]}>
      <span>&lowast;</span>
    </div> */
  // };

  const SecondLine = () => {
    return (
      <div id="ratings-reviews">
        <div className="star-box">{myStarBox}</div>

        <div className="review-count" onClick={handleReviewCountClick}>
          <p>
            {ratingsAvg || ""} ({business.reviews.length} {reviewString})
          </p>
        </div>
      </div>
    );
  };

  const ThirdLine = ({ business }) => {
    return (
      <div className="third-line">
        <div className="check-circle">
          <img
            src={BlueCheck}
            className="check-symbol"
            alt="claimed - check mark"
          />
        </div>
        <p>Claimed</p>
        <p>· {business?.price || ""} ·</p>
        <p>{business?.category || ""}</p>
        {/* <a href="#">
          <div className="edit-button-container">
            <div className="button-box"> </div>
            <div className="edit-text">Edit</div>
          </div>
        </a> */}
      </div>
    );
  };

  const FourthLine = ({ business }) => {
    const [isOpen, setIsOpen] = useState(true);
    let openText;
    let openTextColor;
    if (isOpen) {
      openText = "Open";
      openTextColor = "open-text";
    } else {
      openText = "Closed";
      openTextColor = "closed-text";
    }

    const hoursRange = business.openAt + " - " + business.closedAt;

    return (
      <div className="fourth-line">
        <div className={openTextColor}>
          <h3>{openText}</h3>
        </div>
        <div className="hours-range-div">{hoursRange}</div>
        <div
          className="see-hours-button-container"
          onClick={handleSeeHoursClick}
        >
          <div className="button-box"> </div>
          <div className="see-hours-text">See hours</div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div id="business-title-card">
        <h1>{business.name}</h1>
        <SecondLine />
        <ThirdLine business={business} />
        <FourthLine business={business} />
      </div>
    </>
  );
};
export default TitleCardContent;
