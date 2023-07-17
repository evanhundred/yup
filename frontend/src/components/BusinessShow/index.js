import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBusiness, fetchBusiness } from "../../store/businesses";
import "./index.css";
import TitleCard from "./TitleCard";
import MainContent from "./MainContent";
import webSpider from "../../assets/images/web-spider.jpg";

const BusinessShow = ({ props }) => {
  const dispatch = useDispatch();
  const { businessId } = useParams();

  const business = useSelector(getBusiness(businessId));

  // let layoutWidth;
  // useEffect(() => {
  //   if (window.innerWidth >= 932) layoutWidth = "full-size";
  //   else layoutWidth = "narrow-size";
  // }, []);

  useEffect(() => {
    dispatch(fetchBusiness(businessId)); // .catch((errors) => console.log(errors));
  }, [businessId, dispatch]);

  console.log("innerWidth:");
  console.log(window.innerWidth);

  // const windowWidth = window.innerWidth; // 932 min size for full render
  // if (windowWidth < 932)
  const [windowSize, setWindowSize] = useState(0);
  let layoutWidth;
  const updateSize = () => {
    setWindowSize(window.innerWidth);
    layoutWidth = window.innerWidth >= 600 ? "full-size" : "narrow-size";
  };
  window.addEventListener("resize", updateSize);
  layoutWidth = window.innerWidth >= 600 ? "full-size" : "narrow-size";

  if (!business) return <div className="loading">loading...</div>;

  if (business.status === 500)
    return (
      <div id="invalid-business-container" className={layoutWidth}>
        <div className={`left-side ${layoutWidth}`}>
          <h2>We're sorry. We can't find the page you're looking for.</h2>
          <h3>
            Please try a new <Link to="/search">search</Link>.
          </h3>
        </div>
        <div className={`right-side ${layoutWidth}`}>
          <img src={webSpider} alt="web spider" title="image by freepik" />
        </div>
      </div>
    );

  return (
    <>
      <TitleCard business={business} />
      <MainContent
        business={business}
        props={props === "goToReviews" ? "goToReviews" : "none"}
      />
    </>
  );
};

export default BusinessShow;
