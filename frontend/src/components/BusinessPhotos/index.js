import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getBusiness, fetchBusiness } from "../../store/businesses";
import "./index.css";

const BusinessPhotos = () => {
  const dispatch = useDispatch();
  const { businessId } = useParams();
  const business = useSelector(getBusiness(businessId));
  useEffect(() => {
    dispatch(fetchBusiness(businessId));
  }, [businessId, dispatch]);

  // show grid of all photos
  // next stage: add tags to photos (outside, inside, food) and navigate
  // by tag/category

  // limit 50? photos per page, then divide into pages

  if (!business) return null;

  // photos grid stays at 6 across, regardless of window size

  const PhotosGrid = ({ business }) => {
    let rowCount = 0;
    let rowIdx = 1;

    return (
      <ul className="photos-grid-ul">
        {business.imageUrls.map((photo, idx) => {
          if (rowCount === 6) {
            rowIdx += 1;
            rowCount = 0;
          }
          rowCount += 1;

          if (idx !== business.imageUrls.length - 1)
            return (
              <li
                key={`image${idx}`}
                className={`biz-photo`}
                style={{ gridRow: rowIdx }}
              >
                <img src={photo} alt="delicious item" />
              </li>
            );
        })}
      </ul>
    );
  };

  return (
    <div className="overall-page-container">
      <div className="left-side-margin" />
      <div className="biz-photos-container">
        <h2 className="biz-photos-title">{`Photos for ${business.name}`}</h2>
        <PhotosGrid business={business} />
      </div>
    </div>
  );
};

export default BusinessPhotos;
