import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBusiness, fetchBusiness } from "../../store/businesses";
import "./index.css";

const BusinessShow = () => {
  const dispatch = useDispatch();
  const { businessId } = useParams();
  const business = useSelector(getBusiness(businessId));

  useEffect(() => {
    dispatch(fetchBusiness(businessId));
  }, [businessId, dispatch]);

  const [isOpen, setIsOpen] = useState(true);

  // Photo + Business title card

  const PhotoCard = () => {
    return (
      <>
        <div class="business-image">
          <img
            src={require("../../assets/images/1-devocion/indoor.jpg")}
            alt="cafe - inside"
          />
        </div>
        <div id="business-title-card">
          <h1>{business.name}</h1>
          <SecondLine />
          <ThirdLine />
          <FourthLine />
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

  const ThirdLine = () => {
    return (
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
            <div className="button-box"> </div>
            <div className="edit-text">Edit</div>
          </div>
        </a>
      </div>
    );
  };

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

  // Main Content

  const MainContent = () => {
    return (
      <div className="reset-height">
        <div className="main-content-container">
          <ContentNavBar />

          {/* menu */}
          <MenuCard />

          {/* Location & hours */}
          <LocationAndHours />

          {/* Other xxx nearby - AD*/}

          {/* Amenities and more */}
          {/* <Amenities /> */}

          {/* Help improve yelp */}
          {/* <HelpImprove /> */}

          {/* about the business */}
          {/* <AboutCard /> */}

          {/* ask the community */}
          {/* <QuestionsCard /> */}

          {/* recommended reviews */}
          {/* <Recommended /> */}

          {/* collections containing */}
          {/* <Collections /> */}

          {/* {/* people also view */}
          {/* <AlsoViewed /> */}

          {/* footer */}
          {/* <Footer /> */}
        </div>
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
              <div className="write-review-text">
                <h2>Write a review</h2>
              </div>
            </div>
          </a>
        </div>

        <div className="add-photo-button container">
          <a href="#">
            <div className="add-photo-button content">
              <div className="camera-icon icon">
                <i class="fa-solid regular fa-camera"></i>
              </div>
              <div className="add-photo-text">
                <h2>Add Photo</h2>
              </div>
            </div>
          </a>
        </div>

        <div className="share-button container">
          <a href="#">
            <div className="share-button content">
              <div className="share-icon icon">
                <i class="fa-solid fa-arrow-up-from-bracket"></i>
              </div>
              <div className="share-text">
                <h2>Share</h2>
              </div>
            </div>
          </a>
        </div>

        <div className="save-bookmark-button container">
          <a href="#">
            <div className="save-bookmark-button content">
              <div className="bookmark-button icon">
                <i class="fa-regular fa-bookmark"></i>
              </div>
              <div className="save-bookmark-text">
                <h2>Save</h2>
              </div>
            </div>
          </a>
        </div>
      </div>
    );
  };

  const MenuCard = () => {
    return (
      <div className="menu-bar card-container">
        <div className="main-title">
          <h2>Menu</h2>{" "}
        </div>

        <div className="subtitle">
          <h3>Popular dishes</h3>
        </div>

        <div className="popular-items-bar">
          <div className="popular-item-subcard">
            <div className="popular-item-image">
              <img
                src={require("../../assets/images/1-devocion/popular-items/choc-croissant-coffee.jpg")}
                alt="chocolate croissant"
              />
            </div>
            <div className="popular-item-name">
              <h2>Chocolate Croissant</h2>
              <h3>1 Photo · 6 Reviews</h3>
            </div>
          </div>

          <div className="popular-item-subcard"></div>

          <div className="popular-item-subcard"></div>
        </div>
      </div>
    );
  };

  const LocationAndHours = () => {
    return (
      <div className="location card-container">
        <div className="main-title">
          <h2>Location and Hours</h2>
        </div>
        <div className="main-content-div">
          <div className="left-side-map">
            <img
              src={require("../../assets/images/1-devocion/google-map.png")}
              alt="google maps"
            />
            <div className="bottom-left-side">
              <div className="address">
                <h3 className="street-address">276 Livingston St</h3>
                <h4>Brooklyn, NY 11201</h4>
                <p>Boerum Hill,</p>
                <p>Downtown Brooklyn</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <PhotoCard />
      <MainContent />
    </>
  );
};

export default BusinessShow;
