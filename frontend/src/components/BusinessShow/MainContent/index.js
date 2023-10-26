import { useHistory, useLocation } from "react-router-dom";
import "./share-modal.css";
import ContentNavBar from "./ContentNavBar";
import MenuCard from "./MenuCard";
import LocationAndHours from "./LocationAndHours";
import AboutCard from "./AboutCard";
import Reviews from "./Reviews";
const MainContent = ({
  business = null,
  currentUser = null,
  props,
  handleWriteReview
}) => {
  const history = useHistory();
  const location = useLocation();

  let reviewsComponent = document.getElementById("reviews-container");

  if (reviewsComponent && location.search.includes("reviews")) {
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

  const businessIsOwnedBy = (user) =>
    business.owns.some((own) => own.id === user.id);

  const handleEditStubClick = () => {
    history.push(`/businesses/${business.id}/edit`);
  };

  if (business.stub === "true")
    return (
      <div id="stub-container">
        <div className="first-line">
          <h2>this is a stub.</h2>
          {business.owns && currentUser && businessIsOwnedBy(currentUser) && (
            <h2 className="edit-button" onClick={handleEditStubClick}>
              edit stub
            </h2>
          )}
        </div>
      </div>
    );

  return (
    <>
      <div className="main-content-container">
        <ContentNavBar
          business={business}
          currentUser={currentUser}
          handleWriteReview={handleWriteReview}
        />

        <MenuCard business={business} />

        {/* Location & hours */}
        <LocationAndHours business={business} />

        {/* Other xxx nearby - AD*/}

        {/* Amenities and more */}
        {/* <Amenities business={business} /> */}

        {/* FUTURE */}
        {/* Help improve yelp */}
        {/* <HelpImprove /> */}

        {/* about the business */}
        <AboutCard business={business} />

        {/* FUTURE */}
        {/* ask the community */}
        {/* <QuestionsCard /> */}

        {/* recommended reviews */}
        <Reviews
          business={business}
          props={props}
          handleWriteReview={handleWriteReview}
          currentUser={currentUser}
        />

        {/* collections containing */}
        {/* <Collections /> */}

        {/* {/* people also view */}
        {/* <AlsoViewed /> */}
        <div id="pre-footer-height-reset"></div>
      </div>
    </>
  );
};

export default MainContent;
