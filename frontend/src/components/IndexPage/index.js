import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBusinesses,
  getBusinesses,
  clearErrors
} from "../../store/businesses";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import MainContent from "./MainContent";
import TitleCard from "./TitleCard";

const IndexPage = () => {
  const dispatch = useDispatch();
  const businesses = useSelector(getBusinesses);
  const location = useLocation();

  console.log(location);

  const [showRedirectMessage, setShowRedirectMessage] = useState(
    !!location.message
  );

  // if (location.message) setShowRedirectMessage(true);

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

  const redirectMessageModal = () => {
    const closeModal = (e = null) => {
      if (e) e.preventDefault();
      if (html) html.style.overflow = "auto";
      setShowRedirectMessage(false);
    };
    const fadeOut = () => {
      setTimeout(closeModal, 12000);
    };
    return (
      <div id="redirect-message-modal-container" onLoad={fadeOut}>
        <div
          className="redirect-message-modal-overlay"
          onClick={(e) => closeModal(e)}
        />
        <div className="redirect-message-modal-box">
          <div className="redirect-mesage-modal-content">
            <div className="message-container">
              <h2>{location.message}</h2>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const html = document.querySelector("html");
  if (html) html.style.overflow = "auto";

  return (
    <div id="index-page">
      {showRedirectMessage && redirectMessageModal()}
      <TitleCard businesses={businesses} />
      <MainContent businesses={businesses} />
    </div>
  );
};

export default IndexPage;
