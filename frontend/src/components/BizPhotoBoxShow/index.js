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

  // const business = useSelector(getBusiness(businessId));

  // useEffect(() => {
  //   dispatch(fetchBusiness(businessId));
  // }, [businessId, dispatch]);

  console.log(useParams());
  console.log();
  // debugger;
  // const bizPhotoBox = useSelector(getBizPhotoBox(businessId));
  // const bizPhotoBox = useSelector((state) => state.bizPhotoBoxes[0]);

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
