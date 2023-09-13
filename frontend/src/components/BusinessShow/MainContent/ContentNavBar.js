import { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import { backgroundNavBar, unBackgroundNavBar } from "../../../utils/modal";
import {
  createSavedBusiness,
  deleteSavedBusiness
} from "../../../store/savedBusinesses.js";
import CopyIcon from "../../../assets/icons/copy-icon.png";

const ContentNavBar = ({ business, currentUser, handleWriteReview }) => {
  const dispatch = useDispatch();

  const [showShareModal, setShowShareModal] = useState(false);
  const html = document.querySelector("html");

  const fetchedUser = useSelector((state) => state.users[currentUser.id]);

  // console.log(fetchedUser);

  const compareBizToSavedBiz = (businessId, savedBizId) =>
    businessId === savedBizId;

  let savedBizId;
  let businessIsSaved = false;
  for (
    let i = 0;
    !businessIsSaved && i < fetchedUser.savedBusinesses.length;
    i++
  ) {
    if (fetchedUser.savedBusinesses[i].saved_business_id === business.id) {
      businessIsSaved = true;
      savedBizId = fetchedUser.savedBusinesses[i].id;
    }
  }

  // if (
  //   fetchedUser &&
  //   fetchedUser.savedBusinesses.some((savedBiz) =>
  //     compareBizToSavedBiz(business.id, savedBiz.savedBusinessId)
  //   )
  // ) {
  //   businessIsSaved = true;
  // } else {
  //   businessIsSaved = false;
  // }

  // console.log(businessIsSaved);

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
    return (
      <div
        className="share-modal-container"
        onLoad={() => {
          listenForEsc();
        }}
      >
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
              <a
                target="_blank"
                rel="noreferrer"
                href={`https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fyup.evanryan.dev%2Fbusinesses%2F${business.id}&amp;src=sdkpreparse`}
                className="fb-xfbml-parse-ignore"
              >
                <div className="share-fb">
                  <div className="fb-logo-container">f</div>
                  <h3>Share on Facebook</h3>
                </div>
              </a>
              <a
                rel="noreferrer"
                target="_blank"
                href={`https://twitter.com/intent/tweet?text=Check out this amazing business on Yup.&url=https://yup.evanryan.dev/businesses/${business.id}`}
                className="twitter-share-button"
                data-show-count="false"
              >
                <div className="share-twitter">
                  <div className="twitter-logo-container">t</div>
                  <h3>Share on Twitter</h3>
                </div>
              </a>
            </div>
            <div className="share-modal-line-3">
              <div className="border-holder">
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
            </div>
          </div>
        </div>
      </div>
    );
  };

  const handleShareClick = (e) => {
    if (html) html.style.overflow = "hidden";
    setShowShareModal(true);
    backgroundNavBar();
  };

  const handleSaveClick = async () => {
    if (!businessIsSaved) {
      const res = await dispatch(createSavedBusiness(business.id));
      console.log(res);
      if (res.body) console.log(res.status);
    } else {
      const res = await dispatch(deleteSavedBusiness(savedBizId));
      console.log(res);
    }
    // console.log(res.body.status);
  };

  const savedTextString = (saved) => (saved ? "Saved" : "Save");

  return (
    <div className="content-nav-bar-container">
      <div
        className="write-review-button container"
        onClick={(e) => handleWriteReview(e)}
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

      <div
        className={`save-bookmark-button container button-container ${
          businessIsSaved ? "saved" : "unsaved"
        }`}
        onClick={handleSaveClick}
      >
        <div className={`save-bookmark-button content `}>
          <div className="bookmark-button icon">
            <i className="fa-regular fa-bookmark"></i>
          </div>
          <div className="save-bookmark-text">
            <h2>{savedTextString(businessIsSaved)}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentNavBar;
