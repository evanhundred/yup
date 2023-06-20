import "./index.css";

import { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBizPhotoBox, fetchBizPhotoBox } from "../../store/bizPhotoBoxes";

const BizPhotoBoxShow = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { businessId } = useParams();

  const bizPhotoBox = useSelector(getBizPhotoBox(businessId));

  useEffect(() => {
    dispatch(fetchBizPhotoBox(businessId));
  }, [businessId, dispatch]);

  return (
    <>
      <div className="biz-photo-box-container">
        <h1>Welcome to biz photo box.</h1>
      </div>
    </>
  );
};

export default BizPhotoBoxShow;
