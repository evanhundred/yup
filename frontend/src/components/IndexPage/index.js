import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBusinesses,
  getBusinesses,
  clearErrors
} from "../../store/businesses";
import { resetMessages, getMessages } from "../../store/messages";
import { useEffect, useState } from "react";
import MainContent from "./MainContent";
import TitleCard from "./TitleCard";
import Loading from "../Loading";

const IndexPage = () => {
  const dispatch = useDispatch();
  const businesses = useSelector(getBusinesses);
  // const location = useLocation();

  // console.log(location);

  // console.log(location.state && location.state.message);

  const messages = useSelector(getMessages);

  const [showRedirectMessage, setShowRedirectMessage] = useState(
    messages && messages.deleted ? true : false
  );

  // console.log(message);
  // console.log(message.keys);

  // if (location.message) setShowRedirectMessage(true);

  useEffect(() => {
    dispatch(clearErrors());
    dispatch(fetchBusinesses());
  }, [dispatch]);

  // console.log(messages);
  // useEffect(() => {
  //   // if (!businesses) {
  //   //   console.log(messages);
  //   //   dispatch(loadMessage({ isLoading: true }));
  //   // }
  //   if (businesses && messages.isLoading) {
  //     console.log(messages);
  //     const killMessage = { indexLoaded: true, isLoading: false };
  //     dispatch(loadMessages(killMessage));
  //     dispatch(loadMessage({ isLoading: false }));
  //     // dispatch(deleteMessage(messages.isLoading));
  //   }
  // }, [dispatch, messages, businesses]);

  if (businesses.errors) {
    return null;
  }

  // const loadingAnimation = () => {
  //   return (
  //     <>
  //       <div
  //         className="loader"
  //         onAnimationStart={(e) => console.log("onAnimationStart")}
  //         onAnimationIteration={(e) => console.log("onAnimationIteration")}
  //         onAnimationEnd={(e) => console.log("onAnimationEnd")}
  //       ></div>
  //     </>
  //   );
  // };

  // if (true)
  //   return (
  //     <div id="loading-container">
  //       <h1 className="prompt">{loadingAnimation()}</h1>
  //       {/* <h1 className="prompt">loading{<span>{getPeriods()}</span>}</h1> */}
  //     </div>
  //   );

  // if (true) return <Loading />;
  if (!businesses.length || !businesses[0].imageUrls) {
    // const message = { indexLoaded: false };
    // dispatch(loadMessage(message));
    return <Loading />;
  }

  // dispatch(resetMessages());

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
              <h2 className="message">{messages.deleted}</h2>
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
