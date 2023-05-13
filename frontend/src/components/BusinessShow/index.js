import { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getBusiness,
  fetchBusiness,
  receiveErrors
} from "../../store/businesses";
import "./index.css";
import TitleCard from "./TitleCard";
import MainContent from "./MainContent";

const BusinessShow = ({ props }) => {
  console.log(useParams());
  const dispatch = useDispatch();
  const history = useHistory();
  const { businessId } = useParams();

  const business = useSelector(getBusiness(businessId));
  const errors = useSelector((state) => state.errors);

  // if !business, redirect to home
  //  incorrect: this redirects on every refresh
  //  if (!business) history.push(`/`);
  // if ()

  // let fetched = false;
  // let data;
  useEffect(() => {
    dispatch(fetchBusiness(businessId));
  }, [businessId, dispatch]);

  // console.log(data);

  // useEffect(() => {
  //   const fetchBiz = async () => {
  //     dispatch(fetchBusiness(businessId));
  //     try {
  //       const response = await
  //     }
  //   }
  // }, [businessId, dispatch]);

  // debugger;
  if (errors) return <div className="errors">{errors}</div>;
  if (!business) return <div className="loading">loading...{`${errors}`}</div>;

  // if (props === "goToReviews") {
  // }

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
