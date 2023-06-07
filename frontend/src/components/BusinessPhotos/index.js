import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getBusiness, fetchBusiness } from "../../store/businesses";
import "./index.css";
import "./modal.css";
import rightArrowCircle from "../../assets/images/right-arrow-circle.png";
import leftArrowCircle from "../../assets/images/left-arrow-circle.png";

// import { ShowPhotoModal } from "../../context/Modal";
import x from "../../assets/images/close.png";

const BusinessPhotos = () => {
  const dispatch = useDispatch();
  const { businessId } = useParams();
  const business = useSelector(getBusiness(businessId));
  useEffect(() => {
    dispatch(fetchBusiness(businessId));
  }, [businessId, dispatch]);

  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [chosenPhoto, setChosenPhoto] = useState(null);
  const [chosenPhotoIdx, setChosenPhotoIdx] = useState(null);

  // show grid of all photos
  // next stage: add tags to photos (outside, inside, food) and navigate
  // by tag/category

  // limit 50? photos per page, then divide into pages

  if (!business) return null;

  // photos grid stays at 6 across, regardless of window size

  const PhotosGrid = ({ business }) => {
    const handlePhotoClick = (e) => {
      e.preventDefault();
      // launch modal with pic
      setShowPhotoModal(true);
      console.log(e.target.src);
      setChosenPhoto(business.imageUrls[chosenPhotoIdx]);
      const navBar = document.getElementById("nav-bar");
      navBar.classList.add("backgrounded");
    };

    let colIdx = 0;
    return (
      <ul className="photos-grid-ul">
        {business.imageUrls.map((photo, idx) => {
          colIdx += 1;
          if (colIdx === 7) colIdx = 1;

          if (idx !== business.imageUrls.length - 1)
            return (
              <li
                key={`image${idx}`}
                className={`biz-photo`}
                style={{ gridColumn: colIdx }}
                onClick={(e) => {
                  setChosenPhotoIdx(idx);
                  handlePhotoClick(e);
                }}
              >
                <img src={photo} alt="delicious item" />
              </li>
            );
          else return null;
        })}
      </ul>
    );
  };

  const Modal = () => {
    // const imageNode = document.createElement("img");
    // imageNode.src = chosenPhoto.src;
    // imageNode.alt = "delicious item of food";
    // imageNode.className=`photo-box`;

    const getImageWidth = (e) => {
      console.log(e.target);
      // find image dimensions to determine how margins will be constructed
      // to fit page + modal
    };

    const handleNavClick = (e, direction) => {
      e.preventDefault();
      const amountPhotos = business.imageUrls.length;

      let newPhotoIdx;
      if (direction === "next") {
        if (chosenPhotoIdx < amountPhotos - 2) newPhotoIdx = chosenPhotoIdx + 1;
        else newPhotoIdx = 0;
      } else {
        // direction === "prev"
        if (chosenPhotoIdx > 0) newPhotoIdx = chosenPhotoIdx - 1;
        else newPhotoIdx = amountPhotos - 2;
      }
      setChosenPhotoIdx(newPhotoIdx);

      // if (chosenPhotoIdx < amountPhotos - 1 && direction === "next") {
      //   setChosenPhotoIdx(chosenPhotoIdx + 1);
      // } else if (chosenPhotoIdx === amountPhotos - 1) {
      //   setChosenPhotoIdx(0);
      // } else if (chosenPhotoIdx > 0 && direction === "prev") {
      //   setChosenPhotoIdx(chosenPhotoIdx - 1);
      // } else if (chosenPhotoIdx === 0 && direction === "prev") {
      //   setChosenPhotoIdx(amountPhotos - 1);
      // }

      setChosenPhoto(business.imageUrls[chosenPhotoIdx]);
    };

    const handleCloseModal = (e) => {
      e.preventDefault();
      setShowPhotoModal(false);
      const navBar = document.getElementById("nav-bar");
      navBar.classList.remove("backgrounded");
    };

    return (
      <div className="modal-container">
        <div className="overlay" onClick={(e) => handleCloseModal(e)} />
        <div className="modal-content">
          <div className="close-box" onClick={(e) => handleCloseModal(e)}>
            <h3 className="close-text">Close</h3>
            <img src={x} className="photo-modal-x" alt="close modal" />
          </div>
          <div className="modal-left-side">
            <div className="left-margin">
              <img
                src={leftArrowCircle}
                className="photo-modal-nav-button"
                alt="previous visualization"
                onClick={(e) => handleNavClick(e, "prev")}
              />
            </div>
            <div className="photo-container">
              <img
                src={chosenPhoto}
                alt="delicious food item"
                className="photo-image"
                onLoad={(e) => getImageWidth(e)}
              />
            </div>
            <div className="right-margin">
              <img
                src={rightArrowCircle}
                className="photo-modal-nav-button"
                alt="next visualization"
                onClick={(e) => handleNavClick(e, "next")}
              />
            </div>
          </div>
          <div className="modal-right-side">
            <div className="modal-right-side-content">
              <h3 className="biz-photos-title">{`Photos for ${business.name}`}</h3>
              <h4 className="photo-count">{`${chosenPhotoIdx + 1} of ${
                business.imageUrls.length - 1
              }`}</h4>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="overall-page-container">
        <div className="left-side-margin" />
        <div className="biz-photos-container">
          <h2 className="biz-photos-title">{`Photos for ${business.name}`}</h2>
          <PhotosGrid business={business} />
        </div>
        <div className="right-side-margin" />
      </div>
      {showPhotoModal && <Modal />}
    </>
  );
};

export default BusinessPhotos;

// {showPhotoModal && (
//   <ShowPhotoModal onClose={() => setShowPhotoModal(false)}>
//     <img
//       onClick={() => setShowPhotoModal(false)}
//       src={x}
//       className="photo-modal-x"
//       alt="close modal"
//     />
//     <div className="modal-card">
//       <div className="left-side">
//         <div className="left-margin" />
//         <div className="photo-container">
//           <img src={chosenPhoto} alt="delicious food item" />
//         </div>
//       </div>
//       <div className="right-side"></div>
//     </div>
//   </ShowPhotoModal>
// )}
