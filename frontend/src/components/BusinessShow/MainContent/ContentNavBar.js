import { useHistory } from "react-router-dom";
import { useState, useRef } from "react";

import { backgroundNavBar, unBackgroundNavBar } from "../../../utils/modal";

import CopyIcon from "../../../assets/icons/copy-icon.png";

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

  const [copySuccess, setCopySuccess] = useState("");
  const textAreaRef = useRef(null);
  const contactFieldRef = useRef(null);

  const copyToClipboard = (e) => {
    textAreaRef.current.select();
    document.execCommand("copy");

    e.target.focus();
    setCopySuccess("Copied!");
    setTimeout(() => {
      setCopySuccess("");
    }, 4000);
  };

  const CopySuccessDiv = () => {
    return <div className="copy-success-div">{copySuccess}</div>;
  };

  const ShareModal = () => {
    // setTimeout(()=>{
    //   const div = document.querySelector(".copySuccessDiv");
    // })
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
            <div className="share-modal-line-2">
              <div className="share-fb">
                <div className="fb-logo-container">f</div>
                <h3>Share on Facebook</h3>
              </div>
              <div className="share-twitter">
                <div className="twitter-logo-container">t</div>
                <h3>Share on Twitter</h3>
              </div>
            </div>
            <div className="share-modal-line-3">
              <div
                className="link-icon-container"
                onClick={(e) => copyToClipboard(e)}
              >
                <img src={CopyIcon} alt="copy this link" />
                {copySuccess === "Copied!" && <CopySuccessDiv />}
              </div>
              <div className="share-link-input-container">
                <input
                  ref={textAreaRef}
                  className="share-link"
                  defaultValue={`https://yup.evanryan.dev/businesses/${business.id}`}
                />
              </div>
            </div>
            <div className="share-modal-line-4">
              <div className="left-side-line" />
              <h4>OR</h4>
              <div className="right-side-line" />
            </div>
            <div className="share-modal-line-5">
              <div className="share-to-input">
                <h4>To</h4>
                <div className="share-to-field-input-container">
                  <input
                    ref={contactFieldRef}
                    className="contact-input-field"
                  />
                </div>

                <p className="info-text">Yup user names or email addresses</p>
              </div>
            </div>
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
