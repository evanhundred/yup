import { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { backgroundNavBar, unBackgroundNavBar } from "../../../utils/modal";
import {
  createSavedBusiness,
  deleteSavedBusiness
} from "../../../store/savedBusinesses";
import CopyIcon from "../../../assets/icons/copy-icon.png";

const ContentNavBar = ({ business, currentUser, handleWriteReview }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  // let businessIsSaved = false;
  const currentUserId = currentUser ? currentUser.id : null;
  const fetchedUser = useSelector((state) => state.users[currentUserId]);
  // console.log(fetchedUser);

  const defaultSavedBizState = {
    businessIsSaved: false,
    savedBizId: null
  };

  const determineIfSaved = () => {
    for (let i = 0; i < fetchedUser.savedBusinesses.length; i++) {
      if (fetchedUser.savedBusinesses[i].savedBusinessId === business.id) {
        return {
          businessIsSaved: true,
          savedBizId: fetchedUser.savedBusinesses[i].id
        };
      }
    }
    return {
      businessIsSaved: false,
      savedBizId: null
    };
  };

  const savedStateData = fetchedUser
    ? determineIfSaved()
    : defaultSavedBizState;

  const [showShareModal, setShowShareModal] = useState(false);
  const [businessIsSaved, setBusinessIsSaved] = useState(
    savedStateData.businessIsSaved
  );
  const [savedBizId, setSavedBizId] = useState(savedStateData.savedBizId);
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
                rel="noopener noreferrer"
                href={`https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fyup.evanryan.dev%2Fbusinesses%2F${business.id}&amp;src=sdkpreparse`}
                className="fb-xfbml-parse-ignore"
              >
                <div className="share-fb">
                  <div className="fb-logo-container">f</div>
                  <h3>Share on Facebook</h3>
                </div>
              </a>
              <a
                rel="noopener noreferrer"
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
    if (currentUser) {
      const savedDiv = document.querySelector(
        "div.save-bookmark-button.button-container"
      );
      const savedH2 = document.querySelector(".save-bookmark-button h2");

      if (!businessIsSaved) {
        const res = await dispatch(createSavedBusiness(business.id));
        setBusinessIsSaved(true);
        setSavedBizId(res.saved_business_id);
        savedDiv.classList.remove("unsaved");
        savedDiv.classList.add("saved");
        savedH2.innerText = "Saved";
      } else {
        const res = await dispatch(
          deleteSavedBusiness(savedBizId || savedStateData.savedBizId)
        );
        setBusinessIsSaved(false);
        setSavedBizId(null);
        savedDiv.classList.remove("saved");
        savedDiv.classList.add("unsaved");
        savedH2.innerText = "Save";
      }
    } else {
      history.push("/login");
    }
  };

  const savedTextString = () =>
    businessIsSaved || savedStateData.businessIsSaved ? "Saved" : "Save";

  const editBusinessButton = () => {
    const handleEditBusinessClick = () => {
      history.push(`/businesses/${business.id}/edit`);
    };
    return (
      <div className="edit-business-button" onClick={handleEditBusinessClick}>
        <div className="icon">
          <i className="fa-solid fa-pencil"></i>
        </div>
        <h2>Edit Business</h2>
      </div>
    );
  };

  const currentUserIsOwner = currentUser
    ? business.owns &&
      business.owns.some((own) => own.ownerId === currentUser.id)
    : false;

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
          businessIsSaved || savedStateData.businessIsSaved
            ? "saved"
            : "unsaved"
        }`}
        onClick={handleSaveClick}
      >
        <div className={`save-bookmark-button content `}>
          <div className="bookmark-button icon">
            <i className="fa-regular fa-bookmark"></i>
          </div>
          <div className="save-bookmark-text">
            <h2>{savedTextString()}</h2>
          </div>
        </div>
      </div>
      {currentUserIsOwner && editBusinessButton()}
    </div>
  );
};

export default ContentNavBar;
