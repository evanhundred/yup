import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBusinesses,
  getBusinesses,
  clearErrors
} from "../../store/businesses";
import { resetMessages, getMessages } from "../../store/messages";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import MainContent from "./MainContent";
import TitleCard from "./TitleCard";

const IndexPage = () => {
  const dispatch = useDispatch();
  const businesses = useSelector(getBusinesses);
  const location = useLocation();

  // console.log(location);

  // console.log(location.state && location.state.message);

  const messages = useSelector(getMessages);

  const [showRedirectMessage, setShowRedirectMessage] = useState(
    messages && messages.delete ? true : false
  );

  // console.log(message);
  // console.log(message.keys);

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
    // const message = location.state.message.slice();
    const closeModal = async (e = null) => {
      if (e) e.preventDefault();

      const res = await dispatch(resetMessages());
      // const data = await res.json();
      // console.log(res);

      if (html) html.style.overflow = "auto";
      setShowRedirectMessage(false);
    };
    // const fadeOut = () => {
    //   setTimeout(closeModal, 12000);
    // };
    const handleOK = () => {
      closeModal();
    };
    return (
      <div id="redirect-message-modal-container">
        <div className="redirect-message-modal-overlay" onClick={handleOK} />
        <div className="redirect-message-modal-box">
          <div className="redirect-message-modal-content">
            <div className="message-container">
              <h2 className="message">{messages.delete}</h2>
              <h2 className="ok" onClick={handleOK}>
                OK
              </h2>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const html = document.querySelector("html");
  if (html) html.style.overflow = "auto";

  // if (location.state.message) setShowRedirectMessage(true);

  // console.log(showRedirectMessage);
  return (
    <div id="index-page">
      {showRedirectMessage && redirectMessageModal()}
      <TitleCard businesses={businesses} />
      <MainContent businesses={businesses} />
    </div>
  );
};

export default IndexPage;
