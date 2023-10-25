import "./index.css";

import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBusiness, fetchBusiness } from "../../store/businesses";

const EditBusiness = () => {
  const dispatch = useDispatch();

  const { businessId } = useParams();
  const business = useSelector(getBusiness(businessId));
  const currentUser = useSelector((state) => state.session.user);

  return <div id="edit-business-container">Edit business.</div>;
};

export default EditBusiness;
