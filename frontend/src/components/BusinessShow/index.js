import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBusiness, fetchBusiness } from "../../store/businesses";
import "./index.css";
import PhotoCard from "./PhotoCard";
import MainContent from "./MainContent";

const BusinessShow = () => {
  const dispatch = useDispatch();
  const { businessId } = useParams();
  const business = useSelector(getBusiness(businessId));

  useEffect(() => {
    dispatch(fetchBusiness(businessId));
  }, [businessId, dispatch]);

  if (!business) return null;

  return (
    <>
      <PhotoCard business={business} />
      <MainContent business={business} />
    </>
  );
};

export default BusinessShow;
