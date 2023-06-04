import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getBusiness, fetchBusiness } from "../../store/businesses";
import "./index.css";
import "./modal.css";

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
      console.log(e.target.src);
      setChosenPhoto(e.target);
      setShowPhotoModal(true);
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
                onClick={(e) => handlePhotoClick(e)}
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

    return (
      <div className="modal-container">
        <div className="overlay"></div>

        <div className="modal-content">
          <img
            onClick={() => setShowPhotoModal(false)}
            src={x}
            className="photo-modal-x"
            alt="close modal"
          />
          <div className="left-side">
            <div className="left-margin" />
            <div className="photo-container">
              <img
                src={chosenPhoto.src}
                alt="delicious food item"
                className="photo-image"
                onLoad={(e) => getImageWidth(e)}
              />
            </div>
            <div className="right-margin" />
          </div>
          <div className="right-side"></div>
        </div>
      </div>
    );
  };
  // debugger;
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
