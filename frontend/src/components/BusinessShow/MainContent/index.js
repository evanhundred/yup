import { useHistory, useLocation, Link } from "react-router-dom";
// import { useState } from "react";

const MainContent = ({ business = null, props }) => {
  // debugger;
  const location = useLocation();
  // console.log(location);
  let reviewsComponent = document.getElementById("reviews-container");

  if (location.state && reviewsComponent && location.state.scrollToReviews) {
    reviewsComponent.scrollIntoView({ behavior: "smooth" });
  } else {
    const rootElement = document.getElementById("root");
    rootElement.scrollIntoView(true);
  }

  // REDUNDANT-- CLEAN
  if (props === "goToReviews") {
    const reviewsComponent = document.getElementById("reviews-container");
    reviewsComponent.scrollIntoView({ behavior: "smooth" });
  }
  // debugger;
  return (
    <>
      <div className="main-content-container">
        <ContentNavBar business={business} />

        {/* menu */}
        <MenuCard business={business} />

        {/* Location & hours */}
        <LocationAndHours business={business} />

        {/* Other xxx nearby - AD*/}

        {/* Amenities and more */}
        <Amenities business={business} />

        {/* FUTURE */}
        {/* Help improve yelp */}
        {/* <HelpImprove /> */}

        {/* about the business */}
        <AboutCard business={business} />

        {/* FUTURE */}
        {/* ask the community */}
        {/* <QuestionsCard /> */}

        {/* recommended reviews */}
        <Reviews business={business} props={props} />

        {/* collections containing */}
        {/* <Collections /> */}

        {/* {/* people also view */}
        {/* <AlsoViewed /> */}
        <div id="pre-footer-height-reset"></div>
      </div>
    </>
  );
};

const ContentNavBar = ({ business }) => {
  // const location = useLocation();
  const history = useHistory();

  // console.log(location);

  // let reviewsComponent = document.getElementById("reviews-container");
  // if (location.state.scrollToReviews) {
  //   reviewsComponent.scrollIntoView({ behavior: "smooth" });
  // }

  // if (location.state && reviewsComponent && location.state.scrollToReviews) {
  //   reviewsComponent.scrollIntoView({ behavior: "smooth" });
  // } else {
  //   const rootElement = document.getElementById("root");
  //   rootElement.scrollIntoView(true);
  // }

  const handleAddReviewClick = (e) => {
    e.preventDefault();
    history.push(`/businesses/${business.id}/reviews/new`);
    // goToReviews = true;
    // history.push(location.pathname.concat("?goToReviews"));
  };

  // need to come up with a hash for each biz entity, to use for this
  // likely this is a feature made necessary by yelp's scale and links to real
  // world entities, not necessary
  // if I can make a simple hashing function, it would have no functional value,
  // but would not be a sacrifice, and would be a handy place to expand if
  // necessary due to scale.
  // this feature could have the benefit of keeping user-added photos in a
  // 'sandbox', where they can be inspected and copied to the database where appropriate
  // this should result in  upload to a aws folder for each of these sandboxes
  // in contrast, user uploaded user photos, or business owner uploaded business
  // photos, can be added directly to the related aws folder

  // for now, I will use just the business number

  const handleAddPhotoClick = (e) => {
    e.preventDefault();
    history.push(`/biz-user-photos/${business.id}`);
  };

  return (
    <div className="content-nav-bar-container">
      <div
        className="write-review-button container"
        onClick={(e) => handleAddReviewClick(e)}
      >
        {/* <a href="#"> */}
        <div className="write-review-button content">
          <div className="star-icon icon">
            <i className="fa-regular fa-star"></i>
          </div>
          <div className="write-review-text">
            <h2>Write a review</h2>
          </div>
        </div>
        {/* </a> */}
      </div>

      {/* <Link to="/biz-user-photos"> */}
      <div
        className="add-photo-button button-container container"
        onClick={(e) => handleAddPhotoClick(e)}
      >
        <div className="add-photo-button content">
          <div className="camera-icon icon">
            <i className="fa-solid regular fa-camera"></i>
          </div>
          <div className="add-photo-text">
            <h2>Add Photo</h2>
          </div>
        </div>
      </div>
      {/* </Link> */}

      <div className="share-button container button-container">
        <div className="share-button content">
          <div className="share-icon icon">
            <i className="fa-solid fa-arrow-up-from-bracket"></i>
          </div>
          <div className="share-text">
            <h2>Share</h2>
          </div>
        </div>
      </div>

      <div className="save-bookmark-button container button-container">
        <div className="save-bookmark-button content">
          <div className="bookmark-button icon">
            <i className="fa-regular fa-bookmark"></i>
          </div>
          <div className="save-bookmark-text">
            <h2>Save</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

const MenuCard = ({ business }) => {
  return (
    <div className="menu-bar card-container">
      <div className="main-title">
        <h2>Menu</h2>
      </div>

      <div className="subtitle">
        <h3>Popular dishes</h3>
      </div>

      <div className="popular-items-bar">
        <div className="popular-item-subcard">
          <div className="popular-item-image">
            <img src={business.imageUrls[5]} alt="chocolate croissant" />
          </div>
          <div className="popular-item-name">
            <h2>Delicious Item</h2>
            <h3>1 Photo · 6 Reviews</h3>
          </div>
        </div>

        <div className="popular-item-subcard"></div>

        <div className="popular-item-subcard"></div>
      </div>

      <a href={business.website} target="_blank" rel="noreferrer">
        <div className="website-menu-link">
          <i className="fa-solid fa-up-right-from-square"></i>
          <h2>Website menu</h2>
        </div>
      </a>
    </div>
  );
};

const LocationAndHours = ({ business }) => {
  return (
    <div className="location card-container">
      <div className="main-title">
        <h2>Location and Hours</h2>
      </div>

      <div className="main-content-div">
        <div className="left-side-map">
          <img src={business.imageUrls[6]} alt="google maps" />
          <div className="bottom-left-side">
            <div className="address">
              <a
                href="https://google.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <h3 className="street-address">{business.address}</h3>
              </a>

              <h4 className="city-state-zip">
                {business.city}, {business.state} {business.zipcode}
              </h4>
              <p>Delicious Neighborhood</p>
            </div>

            <div className="get-directions-container">
              <div className="get-directions-button">
                <a href="#">Get directions</a>
              </div>
            </div>
          </div>
        </div>

        <div className="hours-div">
          <div className="day-container">
            <div className="day-name">Mon</div>
            <div className="time-range">{`${business.openAt} - ${business.closedAt}`}</div>
          </div>
          <div className="day-container">
            <div className="day-name">Tue</div>
            <div className="time-range">{`${business.openAt} - ${business.closedAt}`}</div>
          </div>
          <div className="day-container">
            <div className="day-name">Wed</div>
            <div className="time-range">{`${business.openAt} - ${business.closedAt}`}</div>
          </div>
          <div className="day-container">
            <div className="day-name">Thu</div>
            <div className="time-range">{`${business.openAt} - ${business.closedAt}`}</div>
          </div>
          <div className="day-container">
            <div className="day-name">Fri</div>
            <div className="time-range">{`${business.openAt} - ${business.closedAt}`}</div>
          </div>
          <div className="day-container">
            <div className="day-name">Sat</div>
            <div className="time-range">{`${business.openAt} - ${business.closedAt}`}</div>
          </div>
          <div className="day-container">
            <div className="day-name">Sun</div>
            <div className="time-range">{`${business.openAt} - ${business.closedAt}`}</div>
          </div>
          <a href="#">
            <div className="edit-info-button">
              <i className="fa-solid fa-pencil"></i>
              <div>Edit Business info</div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

const Amenities = ({ business }) => {
  return (
    <div className="amenitites card-container">
      <div className="main-title">
        <h2>Amenities & more</h2>
      </div>
      <div className="amenities-content">
        <div className="amenities-item">
          <div className="cross-symbol">
            <img
              src={require("../../../assets/images/cross.png")}
              alt="amenities"
            ></img>
          </div>

          <div className="health-score-box">
            <div className="health-score">
              <div className="blue">
                <h3>Health Score</h3>
              </div>
              <div>
                <h3>A</h3>
              </div>
            </div>
            <div className="caption">Powered by Hazel Analytics</div>
          </div>
        </div>

        <div className="amenities-item gray">
          <div className="x-symbol">
            <i className="fa-solid fa-xmark"></i>
          </div>
          <h3>No Reservations</h3>
        </div>
        <div className="amenities-item gray">
          <div className="x-symbol">
            <i className="fa-solid fa-xmark"></i>
          </div>{" "}
          <h3>No Delivery</h3>
        </div>
        <div className="amenities-item gray">
          <div className="x-symbol">
            <i className="fa-solid fa-xmark"></i>
          </div>
          <h3>No Takeout</h3>
        </div>
      </div>
      <div className="more-attributes-container">
        <div className="get-directions-container">
          <div className="get-directions-button">
            <a href="#">
              <h3>26 More Attributes</h3>
            </a>
          </div>
        </div>
      </div>
      <div className="main-content-div"></div>
    </div>
  );
};

const ParsedAbout = ({ business }) => {
  const paragraphs = business.about.split(123);
  return paragraphs.map((paragraph, idx) => <p key={idx}>{paragraph}</p>);
};

const AboutCard = ({ business }) => {
  return (
    <>
      <div className="about card-container">
        <div className="main-title">
          <h2>About the business</h2>
        </div>
        <div className="about-text">{<ParsedAbout business={business} />}</div>
        <div className="read-more-button-container">
          <div className="read-more-button get-directions-button">
            <h3>
              <a href="#">Read more</a>
            </h3>
          </div>
        </div>
      </div>
    </>
  );
};

// if ()

const Reviews = ({ business, props }) => {
  const reviewItems = business.reviews.map((review, idx) => (
    <div key={idx} className="review-item-container" id="reviews-container">
      <div className="author subtitle">
        <h2>Author ID: {review.author_id}</h2>
      </div>
      <div className="review-text">{review.body}</div>
      <div className="review-rating">
        <span>{review.rating}</span>/5
      </div>
      <div className="edit-link">
        <Link to={`/businesses/${business.id}/reviews/${review.id}/edit`}>
          <h4>Edit Review</h4>
        </Link>
      </div>
    </div>
  ));

  return (
    <div id="reviews-container" className="card-container">
      <div className="main-title review">
        <h2>Reviews</h2>
      </div>
      <Link to={`/businesses/${business.id}/reviews/new`}>
        <h3>Write your review.</h3>
      </Link>

      <div className="reviews-content">{reviewItems}</div>
    </div>
  );
};

export default MainContent;
