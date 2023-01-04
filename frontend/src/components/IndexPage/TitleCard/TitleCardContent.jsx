import { useState } from "react";

const TitleCardContent = ({ business }) => {
  const FirstLine = () => {
    return (
      <>
        <h1>Mind-blowing coffee</h1>
      </>
    );
  };
  const SecondLine = () => {
    return <div id="second-line"></div>;
  };

  const ThirdLine = ({ business }) => {
    return (
      <div className="third-line">
        <p>Claimed</p>
        <p>· {business?.price || ""} ·</p>
        <p>{business?.category || ""}</p>
        <span className="fake-link">
          <div className="edit-button-container">
            <div className="button-box"> </div>
            <div className="edit-text">Edit</div>
          </div>
        </span>
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
        <FirstLine />
        <SecondLine />
        <ThirdLine business={business} />
        <FourthLine business={business} />
      </div>
    </>
  );
};
export default TitleCardContent;
