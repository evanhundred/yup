import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getBusiness, fetchBusiness } from "../../store/businesses";
import "./index.css";

const BusinessAddUserPhotos = () => {
  const dispatch = useDispatch();
  const { businessId } = useParams();

  const business = useSelector(getBusiness(businessId));

  useEffect(() => {
    dispatch(fetchBusiness(businessId));
  }, [businessId, dispatch]);

  if (!business) return null;

  return (
    <div className="everything-container">
      <p className="add-photos-title">
        <Link to={`/businesses/${business.id}`}>{business.name}: </Link>
        Add Photos
      </p>
      <p>
        <Link to={`/biz-photos/${business.id}`}>View all photos</Link>
      </p>
    </div>
  );
};

export default BusinessAddUserPhotos;
