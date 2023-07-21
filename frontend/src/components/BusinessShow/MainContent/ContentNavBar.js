import { useHistory } from "react-router-dom";
import { useState } from "react";

import { backgroundNavBar, unBackgroundNavBar } from "../../../utils/modal";

const ContentNavBar = ({ business }) => {
  const history = useHistory();
  const [showShareModal, setShowShareModal] = useState(false);
  const html = document.querySelector("html");

  const handleCloseModal = (e) => {
    e.preventDefault();
    if (html) html.style.overflow = "auto";
    setShowShareModal(false);
    unBackgroundNavBar();
  };
  const closeOnPressEsc = (e) => {
    if (e.key === "Escape") {
      handleCloseModal(e);
      html.removeEventListener("keydown", closeOnPressEsc);
    }
  };
  const listenForEsc = () => {
    html.addEventListener("keydown", closeOnPressEsc, { once: true });
  };

  const ShareModal = () => {
    return (
      <div className="share-modal-container" onLoad={listenForEsc()}>
        <div
          className="share-modal-overlay"
          onClick={(e) => handleCloseModal(e)}
        />
        <div className="share-modal-box">
          <div className="share-modal-content">
            <div className="share-modal-line-1">
              <h2 className="share-modal-title">Share business</h2>
              <div className="close-x" onClick={(e) => handleCloseModal(e)}>
                X
              </div>
            </div>
            <div className="share-modal-line-2"></div>
          </div>
        </div>
      </div>
    );
  };

  const handleAddReviewClick = (e) => {
    e.preventDefault();
    history.push(`/businesses/${business.id}/reviews/new`);
    // goToReviews = true;
    // history.push(location.pathname.concat("?goToReviews"));
  };

  // const handleAddPhotoClick = (e) => {
  //   e.preventDefault();
  //   history.push(`/biz-user-photos/${business.id}`);
  // };

  const handleShareClick = (e) => {
    if (html) html.style.overflow = "hidden";
    setShowShareModal(true);
    backgroundNavBar();
  };

  return (
    <div className="content-nav-bar-container">
      <div
        className="write-review-button container"
        onClick={(e) => handleAddReviewClick(e)}
      >
        <div className="write-review-button content">
          <div className="star-icon icon">
            <i className="fa-regular fa-star"></i>
          </div>
          <div className="write-review-text">
            <h2>Write a review</h2>
          </div>
        </div>
      </div>

      {showShareModal && <ShareModal />}
      {/* {!showShareModal && stopListeningForEsc()} */}

      {/* <Link to="/biz-user-photos"> */}
      {/* <div
        className="add-photo-button button-container container"
        onClick={(e) => handleAddPhotoClick(e)}
      >
        <div className="add-photo-button content">
          <div className="camera-icon icon">
            <i className="fa-solid regular fa-camera"></i>
          </div>
          <div className="add-photo-text">
            <h2>Add Photo</h2>
          </div>
        </div>
      </div> */}
      {/* </Link> */}

      <div
        className="share-button container button-container"
        onClick={(e) => handleShareClick(e)}
      >
        <div className="share-button content">
          <div className="share-icon icon">
            <i className="fa-solid fa-arrow-up-from-bracket"></i>
          </div>
          <div className="share-text">
            <h2>Share</h2>
          </div>
        </div>
      </div>

      <div className="save-bookmark-button container button-container">
        <div className="save-bookmark-button content">
          <div className="bookmark-button icon">
            <i className="fa-regular fa-bookmark"></i>
          </div>
          <div className="save-bookmark-text">
            <h2>Save</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentNavBar;
