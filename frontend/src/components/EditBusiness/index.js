import "./index.css";

import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBusiness, fetchBusiness } from "../../store/businesses";
import { newBusinessFull } from "../../utils/businesses";

const EditBusiness = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { businessId } = useParams();

  useEffect(() => {
    dispatch(fetchBusiness(businessId));
  }, [dispatch, businessId]);

  const business = useSelector(getBusiness(businessId));
  const currentUser = useSelector((state) => state.session.user);

  if (!currentUser) history.push("/login");
  // const newBusinessTemplate = newBusinessFull();
  const businessObject = { ...business };
  const [bizTemplate, setBizTemplate] = useState({ ...businessObject });

  const keysArray = Object.keys(business);
  const exclude = ["id", "imageUrls", "authorNames", "reviews", "owns"];

  const keysArrayCopy = keysArray.slice();
  console.log(keysArrayCopy);
  // while (keysArrayCopy) {
  //   const key = keysArrayCopy.pop();
  //   setBizTemplate({
  //     ...bizTemplate,
  //     [[key]]: business[key]
  //   });
  // }
  // setBizTemplate(businessObject);
  console.log(bizTemplate);
  console.log(businessObject);

  // console.log(bizT)

  if (!business) return <div className="loading">Loading...</div>;
  const businessInfoForm = () => {
    const handleChange = (e, key) => {
      setBizTemplate({
        ...bizTemplate,
        [key]: e.target.value
      });
    };
    const data = keysArray.map((key) => {
      if (exclude.includes(key)) return <>{/* <h3>hi</h3> */}</>;
      return (
        <label key={key}>
          <h4>{key}</h4>
          <input
            value={bizTemplate[[key]]}
            onChange={(e) => handleChange(e, key)}
          />
        </label>
      );
    });
    // const data
    return (
      <div className="business-info-form-container">
        {/* <p>hi</p> */}
        <form>{data}</form>
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
