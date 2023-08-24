import { useState } from "react";
import BlueCheck from "../../../assets/images/blue-check.png";

const TitleCardContent = ({ business }) => {
  const handleReviewCountClick = () => {
    const reviewsComponent = document.getElementById("reviews-container");
    reviewsComponent.scrollIntoView({ behavior: "smooth" });
  };

  const reviewString = business.reviews.length === 1 ? "review" : "reviews";

  const SecondLine = () => {
    return (
      <div id="ratings-reviews">
        <div className="star-box">
          <div className="box-1">
            <span>&lowast;</span>
          </div>
          <div className="box-2">
            <span>&lowast;</span>
          </div>
          <div className="box-3">
            <span>&lowast;</span>
          </div>
          <div className="box-4">
            <span>&lowast;</span>
          </div>
          <div className="box-5">
            <span>&lowast;</span>
          </div>
        </div>
        <div className="review-count" onClick={handleReviewCountClick}>
          <p>
            {business.reviews.length} {reviewString}
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
        <a href="#">
          <div className="see-hours-button-container">
            <div className="button-box"> </div>
            <div className="see-hours-text">See hours</div>
          </div>
        </a>
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
