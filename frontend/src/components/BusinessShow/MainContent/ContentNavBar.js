// import { useHistory } from "react-router-dom";
import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useHistory } from "react-router-dom";

import { backgroundNavBar, unBackgroundNavBar } from "../../../utils/modal";
// import { handleWriteReview } from "./handleWriteReview";

import { createSavedBusiness } from "../../../store/savedBusinesses.js";
import { fetchUser } from "../../../store/users";

import CopyIcon from "../../../assets/icons/copy-icon.png";

const ContentNavBar = ({ business, currentUser, handleWriteReview }) => {
  // const history = useHistory();
  const dispatch = useDispatch();

  // const [errors, setErrors] = useState([]);

  const [showShareModal, setShowShareModal] = useState(false);
  const html = document.querySelector("html");
  // const currentUser = useSelector((state) => state.session.user);

  // console.log("currentUser:");
  // console.log(currentUser);

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
  // const contactFieldRef = useRef(null);
  // const addANoteFieldRef = useRef(null);

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

  // const startingWindowHeight = window.innerHeight;
  // const originalModalHeight = (startingWindowHeight * 98.5) / 100;
  // console.log(originalModalHeight);

  // const whitespaceHeight = startingWindowHeight - originalModalHeight;

  // const getWindowHeight = () => {
  //   const thisDiv = document.querySelector("div.share-modal-box");
  //   thisDiv.style.height = `${originalModalHeight}px`;
  // };

  const ShareModal = () => {
    // setTimeout(()=>{
    //   const div = document.querySelector(".copySuccessDiv");
    // })

    // const handleSubmitShare = (e) => {
    //   const payload = {
    //     recepient:
    //   }
    // }

    return (
      <div
        className="share-modal-container"
        onLoad={() => {
          listenForEsc();
          // getWindowHeight();
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
                // href="https://twitter.com/share?ref_src=twsrc%5Etfw"
                // data-text="Check out this amazing business on Yup."
                // data-url="http://yup.evanryan.dev/businesses/1"
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
            {/* <div className="share-modal-line-4">
              <div className="left-side-line" />
              <h4>OR</h4>
              <div className="right-side-line" />
            </div> */}
            {/* <div className="share-modal-line-5">
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
            </div> */}
            {/* <div className="share-modal-line-6">
              <div className="share-add-note-container">
                <h4>Add a note (optional)</h4>
                <div className="share-add-note-textarea-container">
                  <textarea
                    ref={addANoteFieldRef}
                    className="add-a-note-field"
                  />
                </div>
              </div>
            </div> */}
            {/* <div className="share-modal-line-7">
              <h3 className="share-submit-button" onClick={e=>handleSubmitShare(e)}>Share</h3>
            </div> */}
          </div>
        </div>
      </div>
    );
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

  const handleSaveClick = async () => {
    // const data = { businessId: business.id ;
    const res = await dispatch(createSavedBusiness(business.id));
    // .catch(async (res) => {
    //   let data;
    //   try {
    //     data = await res.clone().json();
    //   } catch {
    //     data = await res.text();
    //   }
    //   if (data?.errors) setErrors(data.errors);
    //   else if (data) setErrors([data]);
    //   else setErrors([res.statusText]);
    // })
    // .then(() => console.log(data));
    // const data = await res.json();
    console.log(res);
  };

  // console.log("currentUser.savedBusinesses:");
  // console.log(currentUser.savedBusinesses);
  // console.log("currentUser.reviews:");
  // console.log(currentUser.reviews);

  const fetchedUser = useSelector((state) => state.users[currentUser.id]);
  console.log(fetchedUser);

  if (currentUser) {
    dispatch(fetchUser(currentUser.id));
    console.log("fetching...");
  }

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

      <div
        className="save-bookmark-button container button-container"
        onClick={handleSaveClick}
      >
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
