import "./index.css";

import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getBusiness,
  fetchBusiness,
  updateBusiness
} from "../../store/businesses";
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
  const [bizTemplate, setBizTemplate] = useState(
    business ? { ...businessObject } : null
  );

  const keysArray = business ? Object.keys(business) : null;
  const exclude = ["id", "imageUrls", "authorNames", "reviews", "owns"];
  const excludeObject = {};
  exclude.forEach((key) => {
    excludeObject[key] = key;
  });

  // let keysArrayCopy;
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

  const [componentToRender, setComponentToRender] = useState("initial");

  // console.log(bizT)

  if (!business) return <div className="loading">Loading...</div>;
  const businessInfoForm = () => {
    if (!bizTemplate) setBizTemplate({ ...businessObject });
    const handleChange = (e, key) => {
      setBizTemplate({
        ...bizTemplate,
        [key]: e.target.value
      });
    };

    const filteredKeysArray = [];
    keysArray.forEach((key) => {
      if (!excludeObject[key]) filteredKeysArray.push(key);
    });

    const data = filteredKeysArray.map((key) => {
      if (exclude.includes(key)) return <h3 key={key}>hi</h3>;
      let proxyKey;
      if (bizTemplate) {
        if (!bizTemplate[[key]]) {
          proxyKey = "";
        } else {
          proxyKey = bizTemplate[[key]];
        }
      }

      return (
        <label key={key}>
          <h4>{key}</h4>
          <input value={proxyKey} onChange={(e) => handleChange(e, key)} />
        </label>
      );
    });
    const handleSubmit = () => {
      const runValidations = () => {
        // validate
      };
      if (runValidations()) {
        dispatch(updateBusiness(bizTemplate));
        setComponentToRender("success");
      }
    };
    return (
      <div className="business-info-form-container">
        {/* <p>hi</p> */}
        <form onSubmit={handleSubmit}>
          {data}
          <button>Submit</button>
        </form>
      </div>
    );
  };

  const successComponent = () => <div className="success">success.</div>;
  if (business.stub === "true") {
    return (
      <div id="edit-business-container">
        <h2>Edit business stub.</h2>
        {businessInfoForm()}
        {componentToRender === "success" && successComponent()}
      </div>
    );
  }
  if (business.stub === "false") {
    return <div id="edit-business-container">Edit business.</div>;
  }

  return <div className="error">error: no stub information.</div>;
};

export default EditBusiness;
