import { useEffect, useState } from "react";
import { useHistory, useParams, Link, useRouteMatch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBusiness, fetchBusiness } from "../../store/businesses";
import { createReview, updateReview, deleteReview } from "../../store/reviews";
import { backgroundNavBar, unBackgroundNavBar } from "../../utils/modal";

import "./index.css";
import "./review-guidelines-modal.css";
import "./confirmUpdateModal.css";

const ReviewForm = () => {
  const match = useRouteMatch();

  let pathType;
  switch (match.path) {
    case "/businesses/:businessId/reviews/:id/edit":
      pathType = "edit";
      break;
    case "/businesses/:businessId/reviews/new":
      pathType = "new";
      break;
    default:
      break;
  }

  const { businessId, id } = useParams();
  let reviewId = id;

  const dispatch = useDispatch();
  const history = useHistory();

  const business = useSelector(getBusiness(businessId));

  let review;
  if (pathType === "edit" && business && business.reviews) {
    let i;
    for (i = 0; i < business.reviews.length; i++) {
      if (business.reviews[i].id === parseInt(reviewId))
        review = business.reviews[i];
    }
  }

  const [body, setBody] = useState(review ? review.body : "");
  const [rating, setRating] = useState(review ? review.rating : 0);
  const [initialRatingClicked, setInitialRatingClicked] = useState(
    review ? true : false
  );

  const [errors, setErrors] = useState("");
  const [showReviewGuidelinesModal, setShowReviewGuidelinesModal] =
    useState(false);

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [updateType, setUpdateType] = useState(null);

  useEffect(() => {
    dispatch(fetchBusiness(businessId));
  }, [businessId, dispatch]);

  const handleSubmitCreate = (e) => {
    e.preventDefault();
    if (rating && body) {
      const data = { body: body, rating: rating };
      dispatch(createReview(data, businessId)).then(() => {
        history.push(`/businesses/${businessId}`);
      });
    } else {
      if (!body) {
        setErrors("ⓘ no review text.");
      } else if (!rating) {
        setErrors("ⓘ no rating selected.");
      }
    }
  };

  const dispatchUpdateReview = () => {
    const data = { ...review, body: body, rating: rating };
    dispatch(updateReview(data, businessId)).then(() => {
      history.push(`/businesses/${businessId}`);
    });
  };

  const html = document.querySelector("html");
  if (!showConfirmModal || !showReviewGuidelinesModal) {
    html.style.overflow = "auto";
  }

  // console.log(html);
  const handleSubmitUpdate = (e, type) => {
    // const html = document.querySelector("html");
    e.preventDefault();
    if (html) html.style.overflow = "hidden";
    backgroundNavBar();
    switch (type) {
      case "update":
        setUpdateType("update");
        if (!body) setErrors("ⓘ no review text.");
        if (rating && body) {
          setShowConfirmModal(true);
        }
        break;
      case "delete":
        setUpdateType("delete");
        setShowConfirmModal(true);
        break;
      default:
        return;

      // dispatchUpdateReview();
    }
  };

  const handleCloseModal = (e, modalType) => {
    e.preventDefault();
    // const html = document.querySelector("html");
    if (html) html.style.overflow = "auto";
    unBackgroundNavBar();
    switch (modalType) {
      case "review-guidelines":
        setShowReviewGuidelinesModal(false);
        break;
      case "confirm":
        setShowConfirmModal(false);
        break;
      default:
        return;
    }
  };
  const closeOnPressEsc = (e) => {
    // const html = document.querySelector("html");
    if (e.key === "Escape") {
      handleCloseModal(e);
      html.removeEventListener("keydown", closeOnPressEsc);
    }
  };

  const listenForEsc = () => {
    // const html = document.querySelector("html");
    html.addEventListener("keydown", closeOnPressEsc, { once: true });
  };

  const capitalize = (string) => {
    const capitalized = string
      .slice(0, 1)
      .toUpperCase()
      .concat(string.slice(1));
    // capitalized[0] = capitalized[0].toUpperCase;
    return capitalized;
  };

  const dispatchDeleteReview = () => {
    dispatch(deleteReview(reviewId, businessId)).then(() => {
      history.push(`/businesses/${businessId}`);
    });
  };

  const confirmUpdate = () => {
    // console.log(updateType);
    switch (updateType) {
      case "update":
        dispatchUpdateReview();
        break;
      case "delete":
        dispatchDeleteReview();
        break;
      default:
        return;
    }
  };
  const ConfirmModal = () => {
    return (
      <div id="confirm-modal-container" onLoad={listenForEsc}>
        <div
          className="confirm-modal-overlay"
          onClick={(e) => handleCloseModal(e)}
        />
        <div className="confirm-modal-box">
          <div className="confirm-modal-content">
            <div className="prompt">
              <div className="confirm-modal-line-1">
                <div
                  className="close-x"
                  onClick={(e) => handleCloseModal(e, "confirm")}
                >
                  <p>X</p>
                </div>
                <h2>{`Please confirm ${capitalize(updateType)}.`}</h2>
              </div>
              <div className="buttons">
                <h3 className="cancel" onClick={(e) => handleCloseModal(e)}>
                  Cancel
                </h3>
                <h3 className="confirm" onClick={confirmUpdate}>
                  Confirm
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // const handleSubmitDelete = (e) => {
  //   e.preventDefault();
  //   setUpdateType("delete");
  //   setShowConfirmModal(true);
  // confirmUpdate();
  // dispatch(deleteReview(reviewId, businessId)).then(() => {
  //   history.push(`/businesses/${businessId}`);
  // });
  // };

  const handleGuidelinesClick = () => {
    // const html = document.querySelector("html");
    if (html) html.style.overflow = "hidden";
    setShowReviewGuidelinesModal(true);
    backgroundNavBar();
  };

  const starBoxDivs = document.querySelectorAll(`.rating-stars > div`);

  const ratingTextStringObject = {
    0: "Select your rating",
    1: "Not good",
    2: "OK",
    3: "Decent",
    4: "Delicious",
    5: "Top-notch"
  };

  const styleStarBoxes = (num) => {
    const oldNum = rating;
    starBoxDivs.forEach((starBox, idx) => {
      if (idx < oldNum) starBox.classList.remove(`hovered-num-${oldNum}`);
      if (idx < num) starBox.classList.add(`hovered-num-${num}`);
    });
  };

  const handleHover = (isHovered, e, num) => {
    e.preventDefault();

    if (isHovered) {
      setRating(num);
    } else {
      setRating(0);
    }

    starBoxDivs.forEach((starBox, idx) => {
      if (idx < num) {
        if (isHovered) starBox.classList.add(`hovered-num-${num}`);
        else starBox.classList.remove(`hovered-num-${num}`);
      }
    });
  };

  const handleStarBoxClick = (num, e = null) => {
    if (e) e.preventDefault();
    if (!initialRatingClicked) setInitialRatingClicked(true);
    styleStarBoxes(num);
    setRating(num);
  };

  const reviewStarBox = [1, 2, 3, 4, 5].map((num) => (
    <div
      className={`star-box-${num}`}
      key={num}
      onMouseEnter={(e) => {
        if (!initialRatingClicked) handleHover(true, e, num);
      }}
      onMouseLeave={(e) => {
        if (!initialRatingClicked) handleHover(false, e, num);
      }}
      onClick={(e) => handleStarBoxClick(num, e)}
    >
      <span>&lowast;</span>
    </div>
  ));

  const errorMessages = () => {
    return <h2>{errors}</h2>;
  };

  const ReviewGuidelinesModal = () => {
    const reviewGuidelinesSubheader =
      "Please respect the following principles.";
    const reviewGuidelinesBulletList = () => {
      const bullets = [
        "Relevance.",
        "Inappropriate content.",
        "Conflicts of interest.",
        "Privacy.",
        "Post your own content."
      ];
      return (
        <ul className="bullet-list">
          {bullets.map((bulletText) => {
            return (
              <>
                <li>
                  <p className="dot">·</p>
                  <p className="bullet-text">{bulletText}</p>
                </li>
              </>
            );
          })}
        </ul>
      );
    };

    return (
      <div
        className="review-guidelines-modal-container"
        onLoad={() => {
          listenForEsc();
        }}
      >
        <div
          className="review-guidelines-modal-overlay"
          onClick={(e) => handleCloseModal(e)}
        />
        <div className="review-guidelines-modal-box">
          <div className="review-guidelines-modal-content">
            <div className="review-guidelines-modal-line-1">
              <h2 className="review-guidelines-title">
                Review Content Guidelines
              </h2>
              <div
                className="close-x"
                onClick={(e) => handleCloseModal(e, "review-guidelines")}
              >
                X
              </div>
            </div>
            <div className="review-guidelines-modal-line-2">
              <h3>{reviewGuidelinesSubheader}</h3>
            </div>
            {reviewGuidelinesBulletList()}
          </div>
        </div>
      </div>
    );
  };

  if (rating) {
    styleStarBoxes(rating);
  }

  const currentUser = useSelector((state) => state.session.user);
  if (!currentUser) history.push("/login");

  return (
    <div id="review-form-container">
      <div className="top-line">
        <h3>
          <Link
            to={business ? `/businesses/${business.id}` : "/"}
            rel="noopener noreferrer"
            target="_blank"
          >{`${business ? business.name : ""}`}</Link>
        </h3>
        <p className="review-guidelines-link" onClick={handleGuidelinesClick}>
          Read our review guidelines
        </p>
      </div>
      <div className="rating-and-review-text-box">
        <form>
          <div className="rating-stars-line">
            <div className="rating-stars">{reviewStarBox}</div>
            <h4>{ratingTextStringObject[rating]}</h4>
          </div>
          <div className="review-prompt-line">
            <h5>A few things to consider in your review</h5>
            <div className="prompt-items">
              <p>Food</p>
              <p>Service</p>
              <p>Ambiance</p>
            </div>
          </div>
          <label htmlFor="review-body" />
          <textarea
            id="review-body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </form>
      </div>

      <div className="error-box">{errorMessages()}</div>
      {pathType === "new" && (
        <div className="post-review-button" onClick={handleSubmitCreate}>
          <h3>Post Review</h3>
        </div>
      )}
      {pathType === "edit" && (
        <div className="edit-buttons-container">
          <div
            className="update-review-button"
            onClick={(e) => handleSubmitUpdate(e, "update")}
          >
            <h3>Update Review</h3>
          </div>
          <div
            className="delete-review-button"
            onClick={(e) => handleSubmitUpdate(e, "delete")}
          >
            <h3>Delete Review</h3>
          </div>
        </div>
      )}
      {showConfirmModal && <ConfirmModal />}
      {showReviewGuidelinesModal && <ReviewGuidelinesModal />}
    </div>
  );
};

export default ReviewForm;
