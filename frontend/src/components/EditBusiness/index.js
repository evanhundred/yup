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
  const exclude = ["id", "imageUrls", "authorNames", "reviews", "owns", "stub"];
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
  // console.log(bizTemplate);
  // console.log(businessObject);

  const [componentToRender, setComponentToRender] = useState("initial");

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

    const keyPositions = [
      "name",
      "category",
      "price",
      "website",
      "countryCode",
      "phone",
      "address",
      "city",
      "state",
      "zipcode",
      "country",
      "neighborhood",
      "openAt",
      "closedAt",
      "about",
      "latitude",
      "longitude",
      "placeId"
    ];
    const keyPositionsObject = {};
    keyPositions.forEach((key, idx) => {
      keyPositionsObject[key] = idx;
    });

    console.log(keyPositionsObject);

    const fieldsObject = {};

    const textFields = [
      "name",
      "address",
      "city",
      "state",
      "neighborhood",
      "about",
      "country"
    ];
    textFields.forEach((field) => {
      fieldsObject[field] = "text";
    });
    const timeFields = ["openAt", "closedAt"];
    timeFields.forEach((field) => {
      fieldsObject[field] = "time";
    });
    // fieldsObject.zipcode = "tel";
    // fieldsObject.phone = "tel";
    // fieldsObject.website = "url";
    // fieldsObject.price =

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

      if (key === "price")
        return (
          <label style={{ order: keyPositionsObject[["price"]] }}>
            <h4>{key}</h4>
            <div className="price-input-container">
              <p>$$$$</p>
            </div>
          </label>
        );

      const styleObject = () => {
        let orderNumber;
        if (keyPositionsObject && keyPositionsObject[key]) {
          orderNumber = keyPositionsObject[key];
        } else {
          orderNumber = 0;
        }
        return { order: orderNumber };
      };

      return (
        <label
          style={styleObject()}
          // style={{ order: `${keyPositions[key]}` }}
          className={`${key}`}
          // className={`${key} order-${keyPositions[key]}`}
          key={key}
        >
          <h4>{key}</h4>
          <input
            value={proxyKey}
            type={fieldsObject[key]}
            onChange={(e) => handleChange(e, key)}
          />
        </label>
      );
    });
    const handleSubmit = () => {
      const runValidations = () => {
        // "category",
        const constraints = {
          name: /^[a-zA-Z0-9\s]+/g
        };
        // validate
        let inputsValid = true;

        // const fieldsArray=
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
          <div className="input-fields">{data}</div>
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
