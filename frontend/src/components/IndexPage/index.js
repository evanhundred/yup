import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBusinesses,
  getBusinesses,
  clearErrors
} from "../../store/businesses";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import MainContent from "./MainContent";
import TitleCard from "./TitleCard";

const IndexPage = () => {
  const dispatch = useDispatch();
  const businesses = useSelector(getBusinesses);
  const location = useLocation();

  console.log(location);

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

  const html = document.querySelector("html");
  if (html) html.style.overflow = "auto";

  return (
    <div id="index-page">
      <TitleCard businesses={businesses} />
      <MainContent businesses={businesses} />
    </div>
  );
};

export default IndexPage;
