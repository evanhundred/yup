import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBusiness, fetchBusiness } from "../../store/businesses";
import "./index.css";

// debugger;
const BusinessShow = () => {
  // debugger;
  const dispatch = useDispatch();
  const { businessId } = useParams();
  const business = useSelector(getBusiness(businessId));

  useEffect(() => {
    // debugger;
    dispatch(fetchBusiness(businessId));
  }, [businessId, dispatch]);

  const [isOpen, setIsOpen] = useState(true);

  // ;

  // const ParseAbout = () => {
  //   const businessArray = business.about.split("+++");
  //   // businessArray
  //   // ;
  //   return businessArray.map((paragraph) => <p>{paragraph}</p>);
  // };

  // const businessImage =

  // const isOpen = () => {};
  const HoursDiv = () => {
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
    // console.log(business.openAt);

    return (
      <>
        <div className={openTextColor}>
          <h3>{openText}</h3>
        </div>
        <div className="hours-range-div">{hoursRange}</div>
      </>
    );
  };

  const FourthLine = () => {
    return (
      <div className="fourth-line">
        <HoursDiv />
      </div>
    );
  };

  return (
    <>
      {/* <p>{JSON.stringify(business)}</p> */}
      <div class="business-image">
        <img
          src={require("../../assets/images/1-devocion/indoor.jpg")}
          alt="cafe - inside"
        />
      </div>
      <div id="business-title-card">
        <h1>{business.name}</h1>
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
        <div className="third-line">
          <div className="check-circle">
            <img
              src={require("../../assets/images/blue-check.png")}
              className="check-symbol"
              alt="claimed - check mark"
            />
          </div>
          <p>Claimed</p>
          <p>· {business.price} ·</p>
          <p>{business.category}</p>
          <a href="#">
            <div class="edit-button-container">
              {/* <img
                src={require("../../assets/images/box-transparency-and-translucency-glass-color-text-box.png")}
                alt="edit button"
                className="button-box"
              /> */}
              <div className="button-box"> </div>
              <div className="edit-text">Edit</div>
            </div>
          </a>
        </div>
        <FourthLine />
      </div>

      {/* <h2>{business.about}</h2> */}
      {/* <ParseAbout /> */}
    </>
  );
};

export default BusinessShow;
