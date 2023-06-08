import { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getBusiness,
  fetchBusiness,
  fetchBusinesses
} from "../../store/businesses";
import "./index.css";
import TitleCard from "./TitleCard";
import MainContent from "./MainContent";

const BusinessShow = ({ props }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { businessId } = useParams();

  const business = useSelector(getBusiness(businessId));
  const businessCount = useSelector(
    (state) => Object.values(state.businesses).length
  );

  useEffect(() => {
    dispatch(fetchBusiness(businessId));
  }, [businessId, dispatch]);

  useEffect(() => {
    dispatch(fetchBusinesses());
  }, [dispatch]);

  if (businessCount > 1 && businessCount < parseInt(businessId))
    history.push(`/`);
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
