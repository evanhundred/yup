import { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBusiness, fetchBusiness } from "../../store/businesses";
import "./index.css";
import TitleCard from "./TitleCard";
import MainContent from "./MainContent";

const BusinessShow = ({ props }) => {
  console.log(useParams());
  const dispatch = useDispatch();
  const history = useHistory();
  // const location = useLocation();
  const { businessId } = useParams();

  const business = useSelector(getBusiness(businessId));
  console.log(business);
  // if !business, redirect to home
  if (!business) history.push(`/`);

  useEffect(() => {
    dispatch(fetchBusiness(businessId));
  }, [businessId, dispatch]);

  if (!business) return null;
  if (props === "goToReviews") {
  }

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
