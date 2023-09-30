import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBusinesses,
  getBusinesses,
  clearErrors
} from "../../store/businesses";
import { useEffect } from "react";
import { createSelector } from "@reduxjs/toolkit";
import MainContent from "./MainContent";
import TitleCard from "./TitleCard";

const IndexPage = () => {
  const dispatch = useDispatch();

  // const businessesObject = (state) => state.businesses;

  // const businesses = useSelector((state) => Object.values(state.businesses));

  // const businessesObject = useSelector(getBusinesses);
  // const businesses = Object.values(businessesObject);

  const readBusinesses = createSelector(
    (state) => state.businesses,
    (businesses) => {
      return Object.values(businesses);
    }
  );
  const businesses = useSelector(readBusinesses);

  // console.log(businesses);
  // useEffect(() => {
  //   const clearErrors = () => {
  //     delete businesses.errors;
  //   };
  //   clearErrors();
  // }, [businesses.errors]);
  useEffect(() => {
    dispatch(clearErrors());
    dispatch(fetchBusinesses());
  }, [dispatch]);

  if (businesses.errors) {
    return null;
  }

  if (!businesses.length || !businesses[0].imageUrls)
    return (
      <div>
        <h1>loading...</h1>
      </div>
    );

  return (
    <>
      <TitleCard businesses={businesses} />
      <MainContent businesses={businesses} />
    </>
  );
};

export default IndexPage;
