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

  if (!business) return <div className="loading">Loading...</div>;

  const businessInfoForm = () => {
    return (
      <div className="business-info-form-container">
        <form>
          <label>
            <input />
          </label>
        </form>
      </div>
    );
  };

  if (business.stub === "true") {
    return (
      <div id="edit-business-container">
        <h2>Edit business stub.</h2>
        {businessInfoForm()}
      </div>
    );
  }
  if (business.stub === "false") {
    return <div id="edit-business-container">Edit business.</div>;
  }

  return <div className="error">error: no stub information.</div>;
};

export default EditBusiness;
