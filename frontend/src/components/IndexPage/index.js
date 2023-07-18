import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchBusinesses, clearErrors } from "../../store/businesses";
import { useEffect } from "react";
import MainContent from "./MainContent";
import TitleCard from "./TitleCard";

const IndexPage = () => {
  const dispatch = useDispatch();
  const businesses = useSelector((state) => Object.values(state.businesses));

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
