const MainContent = ({ business = null }) => {
  return (
    <>
      <div className="main-content-container">
        <ContentNavBar />

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
        {/* <Recommended /> */}

        {/* collections containing */}
        {/* <Collections /> */}

        {/* {/* people also view */}
        {/* <AlsoViewed /> */}

        {/* footer */}
        {/* <Footer /> */}
      </div>
    </>
  );
};

const ContentNavBar = () => {
  return (
    <div className="content-nav-bar-container">
      <div className="write-review-button container">
        <a href="#">
          <div className="write-review-button content">
            <div className="star-icon icon">
              <i className="fa-regular fa-star"></i>
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
              <i className="fa-solid regular fa-camera"></i>
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
              <i className="fa-solid fa-arrow-up-from-bracket"></i>
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
              <i className="fa-regular fa-bookmark"></i>
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

const MenuCard = ({ business }) => {
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
            <img src={business.imageUrls[5]} alt="chocolate croissant" />
          </div>
          <div className="popular-item-name">
            <h2>Chocolate Croissant</h2>
            <h3>1 Photo · 6 Reviews</h3>
          </div>
        </div>

        <div className="popular-item-subcard"></div>

        <div className="popular-item-subcard"></div>
      </div>
      <a href={business.website}>
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
              <p>Williamsburg - North Side</p>
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
            <img src={require("../../../assets/images/cross.png")}></img>
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

export default MainContent;
