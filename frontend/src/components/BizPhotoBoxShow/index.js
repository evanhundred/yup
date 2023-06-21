import "./index.css";

import { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBizPhotoBox, fetchBizPhotoBox } from "../../store/bizPhotoBoxes";
import { getBusiness, fetchBusiness } from "../../store/businesses";

const BizPhotoBoxShow = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { businessId } = useParams();

  const business = useSelector(getBusiness(businessId));

  useEffect(() => {
    dispatch(fetchBusiness(businessId));
  }, [businessId, dispatch]);

  const bizPhotoBox = useSelector(getBizPhotoBox(businessId));
//   console.log(bizPhotoBox);
  // const bizPhotoBox = useSelector((state) => state.bizPhotoBoxes[0]);

  useEffect(() => {
    dispatch(fetchBizPhotoBox(businessId));
  }, [businessId, dispatch]);

  return (
    <>
      <div className="biz-photo-box-container">
        <h2>Photos for {bizPhotoBox.name}</h2>
        <ul className="bpb-grid">
          {bizPhotoBox.imageUrls.map((photo, idx) => (
            <li key={`${bizPhotoBox.name}Photo${idx}`} className="user-photo">
              <img src={photo} alt="delicious splendor" />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default BizPhotoBoxShow;
