import { useState } from "react";

const PhotoCard = ({ business = null }) => {
  return (
    <>
      <div className="business-image-container">
        <div className="business-image one">
          <img src={business.imageUrls[0]} alt="delicious items" />
        </div>
        <div className="business-image two">
          <img src={business.imageUrls[3]} alt="fantastic store" />
        </div>
        <div className="business-image three">
          <img src={business.imageUrls[1]} alt="more delicious items" />
        </div>
        <div className="business-image four">
          <img src={business.imageUrls[2]} alt="more delicious deliciousness" />
        </div>
        <div className="business-image five">
          <img
            src={business.imageUrls[4]}
            alt="more more delicious deliciousness"
          />
        </div>
      </div>
      <div id="business-title-card">
        <h1>{business.name}</h1>
        <SecondLine />
        <ThirdLine business={business} />
        <FourthLine business={business} />
      </div>
    </>
  );
};

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
          src={require("../../../assets/images/blue-check.png")}
          className="check-symbol"
          alt="claimed - check mark"
        />
      </div>
      <p>Claimed</p>
      <p>· {business.price} ·</p>
      <p>{business.category}</p>
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

export default PhotoCard;
