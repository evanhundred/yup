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

  const PhotosGrid = ({ business }) => {
    return (
      <ul className="photos-grid-ul">
        {business.imageUrls.map((photo) => (
          <li>
            <img src={photo} alt="delicious item" />
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="biz-photos-container">
      <PhotosGrid business={business} />
    </div>
  );
};

export default BusinessPhotos;
