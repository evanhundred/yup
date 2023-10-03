import { useEffect, useRef } from "react";
import { useParams, Link, useLocation, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBusiness, fetchBusiness } from "../../store/businesses";
import { fetchUser } from "../../store/users";
import "./index.css";
import TitleCard from "./TitleCard";
import MainContent from "./MainContent";
import webSpider from "../../assets/images/web-spider.jpg";

const BusinessShow = ({ props, searchBoxRef }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  // const searchBoxRef = useRef(null);
  // const searchBoxRef = props.searchBoxRef;
  // console.log(searchBoxRef);

  const { businessId } = useParams();
  const business = useSelector(getBusiness(businessId));

  const currentUser = useSelector((state) => state.session.user);

  // console.log(currentUser);

  const handleWriteReview = (e) => {
    e.preventDefault();
    if (currentUser) history.push(`/businesses/${business.id}/reviews/new`);
    else history.push("/login");
  };

  location.state = null;
  useEffect(() => {
    dispatch(fetchBusiness(businessId)); // .catch((errors) => console.log(errors));
    if (currentUser) dispatch(fetchUser(currentUser.id));
  }, [businessId, currentUser, dispatch]);
  // const fetchedUser = useSelector((state) => state.users[currentUser.id]);

  let layoutWidth;
  const updateSize = () => {
    layoutWidth = window.innerWidth >= 600 ? "full-size" : "narrow-size";
  };
  window.addEventListener("resize", updateSize);
  layoutWidth = window.innerWidth >= 600 ? "full-size" : "narrow-size";

  if (!business) return <div className="loading">loading...</div>;

  const handleSearchClick = () => {
    // searchBoxRef.current.focus();
    const searchInputBox = document.querySelector(
      ".search-bar-container input.user-search-string"
    );
    searchInputBox.focus();
  };

  if (business.status === 500) {
    location.state = "404";

    return (
      <div id="invalid-business-container" className={layoutWidth}>
        <div className={`left-side ${layoutWidth}`}>
          <h2>We're sorry. We can't find the page you're looking for.</h2>
          <h3>
            Please try a new <span onClick={handleSearchClick}>search</span>.
          </h3>
        </div>
        <div className={`right-side ${layoutWidth}`}>
          <img src={webSpider} alt="web spider" />
        </div>
      </div>
    );
  }

  return (
    <>
      <TitleCard business={business} />
      <MainContent
        business={business}
        currentUser={currentUser}
        // fetchedUser={fetchedUser}
        props={
          props && props.goToReviews === "goToReviews" ? "goToReviews" : "none"
        }
        // searchBoxRef={props.searchBoxRef}
        handleWriteReview={handleWriteReview}
      />
    </>
  );
};

export default BusinessShow;
