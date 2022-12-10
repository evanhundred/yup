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
        <a href="#">
          <div class="see-hours-button-container">
            <div className="button-box"> </div>
            <div className="see-hours-text">See hours</div>
          </div>
        </a>
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

  const ContentNavBar = () => {
    return (
      <div className="content-nav-bar-container">
        <div className="write-review-button container">
          <a href="#">
            <div class="write-review-button content">
              <div className="star-icon icon">
                <i class="fa-regular fa-star"></i>
              </div>
              <div className="write-review-text">Write a review</div>
            </div>
          </a>
        </div>

        <div className="add-photo-button container">
          <a href="#">
            <div className="add-photo-button content">
              <div className="camera-icon icon">
                <i class="fa-solid regular fa-camera"></i>
              </div>
              <div className="add-photo-text">Add Photo</div>
            </div>
          </a>
        </div>

        <div className="share-button container">
          <a href="#">
            <div className="share-button content">
              <div className="share-icon icon">
                <i class="fa-solid fa-arrow-up-from-bracket"></i>
              </div>
              <div className="share-text">Share</div>
            </div>
          </a>
        </div>

        <div className="save-bookmark-button container">
          <a href="#">
            <div className="save-bookmark-button content">
              <div className="bookmark-button icon">
                <i class="fa-regular fa-bookmark"></i>
              </div>
              <div className="save-bookmark-text">Save</div>
            </div>
          </a>
        </div>
      </div>
    );
  };

  const MenuCard = () => {
    return (
      <div className="menu-bar card-container">
        {/* main title */}
        <div className="main-title">
          <h2>Menu</h2>{" "}
        </div>
        <div className="subtitle">
          <h3>Popular dishes</h3>
        </div>
        <div className="menu-items-bar">
          <div className="popular-item-subcard"></div>
          <div className="popular-item-subcard"></div>
          <div className="popular-item-subcard"></div>
          items
        </div>

        {/* subtitle
    menu-items-bar */}
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
      <div className="main-content-container">
        <ContentNavBar />

        {/* menu */}
        <MenuCard />
        {/* Location & hours */}
        {/* Other xxx nearby */}
        {/* Amenities and more */}
        {/* Help improve yelp */}
        {/* about the business */}
        {/* ask the community */}
        {/* recommended reviews */}
        {/* collections containing */}
        {/* {/* people also view */}
        {/* footer */}
      </div>
    </>
  );
};

export default BusinessShow;
