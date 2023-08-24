import { useLocation } from "react-router-dom";
import "./share-modal.css";
import ContentNavBar from "./ContentNavBar";
import MenuCard from "./MenuCard";
import LocationAndHours from "./LocationAndHours";
import AboutCard from "./AboutCard";
import Reviews from "./Reviews";
const MainContent = ({ business = null, props, handleWriteReview }) => {
  const location = useLocation();

  // if (location.search.includes("reviews") {

  // }

  let reviewsComponent = document.getElementById("reviews-container");

  console.log(location);

  if (reviewsComponent && location.search.includes("reviews")) {
    reviewsComponent.scrollIntoView({ behavior: "smooth" });
  } else {
    const rootElement = document.getElementById("root");
    rootElement.scrollIntoView(true);
  }
  // if (location.state && reviewsComponent && location.state.scrollToReviews) {
  //   reviewsComponent.scrollIntoView({ behavior: "smooth" });
  // } else {
  //   const rootElement = document.getElementById("root");
  //   rootElement.scrollIntoView(true);
  // }

  // REDUNDANT-- CLEAN
  if (props === "goToReviews") {
    const reviewsComponent = document.getElementById("reviews-container");
    reviewsComponent.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <>
      <div className="main-content-container">
        <ContentNavBar
          business={business}
          handleWriteReview={handleWriteReview}
        />

        {/* menu */}
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
