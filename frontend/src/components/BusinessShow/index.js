import { useEffect } from "react";
import { useParams, useLocation, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getBusiness,
  fetchBusiness,
  clearBusinesses
} from "../../store/businesses";
import { fetchUser } from "../../store/users";
import "./index.css";
import TitleCard from "./TitleCard";
import MainContent from "./MainContent";
import webSpider from "../../assets/images/web-spider.jpg";
import Loading from "../Loading";

const BusinessShow = ({ props }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  const { businessId } = useParams();
  const business = useSelector(getBusiness(businessId));

  const currentUser = useSelector((state) => state.session.user);

  // const currentUserId = currentUser ? currentUser.id : null;
  // const fetchedUser = useSelector(state=>state.users[currentUserId]);

  const handleWriteReview = (e) => {
    e.preventDefault();
    if (currentUser) history.push(`/businesses/${business.id}/reviews/new`);
    else history.push("/login");
  };

  location.state = null;
  useEffect(() => {
    dispatch(clearBusinesses());
    dispatch(fetchBusiness(businessId)); // .catch((errors) => console.log(errors));
    if (currentUser) dispatch(fetchUser(currentUser.id));
  }, [businessId, currentUser, dispatch]);

  let layoutWidth;
  const updateSize = () => {
    layoutWidth = window.innerWidth >= 600 ? "full-size" : "narrow-size";
  };
  window.addEventListener("resize", updateSize);
  layoutWidth = window.innerWidth >= 600 ? "full-size" : "narrow-size";

  // if (true) return <Loading />;
  if (!business) return <Loading />;

  const handleSearchClick = () => {
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
  const isStub = business.stub === "true";

  const html = document.querySelector("html");
  if (html) {
    html.style.overflow = "auto";
  }

  return (
    <div
      id={`business-show-container`}
      className={`${isStub ? "stub" : "full"}`}
    >
      <TitleCard business={business} currentUser={currentUser} />
      <MainContent
        business={business}
        currentUser={currentUser}
        props={
          props && props.goToReviews === "goToReviews" ? "goToReviews" : "none"
        }
        handleWriteReview={handleWriteReview}
      />
    </div>
  );
};

export default BusinessShow;
