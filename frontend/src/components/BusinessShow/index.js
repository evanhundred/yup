import { useEffect } from "react";
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

  useEffect(() => {
    dispatch(fetchBusiness(businessId)); // .catch((errors) => console.log(errors));
  }, [businessId, dispatch]);

  if (business.status === 500)
    return (
      <div id="invalid-business-container">
        <div className="left-side">
          <h2>We're sorry. We can't find the page you're looking for.</h2>
          <h3>
            Please try a new <Link to="/search">search</Link>.
          </h3>
        </div>
        <div className="right-side">
          <img src={webSpider} alt="web spider" />
        </div>
      </div>
    );

  if (!business) return <div className="loading">loading...</div>;

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
