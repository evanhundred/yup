import { useState } from "react";
// import { useSelector } from "react-redux";
// import { getBusiness } from "../../store/businesses";
import BlueCheck from "../../assets/images/blue-check.png";

const BusinessTitleCard = ({ businesses }) => {
  const randomNum = Math.floor(Math.random * businesses.length);
  const businessIdx = businesses[randomNum];
  const business = businesses[businessIdx];

  if (!businesses) return null;

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
        <div className="review-count">561 reviews</div>
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
        <a href="#">
          <div className="edit-button-container">
            <div className="button-box"> </div>
            <div className="edit-text">Edit</div>
          </div>
        </a>
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
      <SecondLine />
      <ThirdLine business={business} />
      <FourthLine business={business} />
      {/* <ThirdLine business={business} />
      <FourthLine business={business} /> */}
    </>
  );
};

export default BusinessTitleCard;
