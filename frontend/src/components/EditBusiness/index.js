import "./index.css";

import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getBusiness,
  fetchBusiness,
  updateBusiness
} from "../../store/businesses";

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

  const businessObject = { ...business };
  const [bizTemplate, setBizTemplate] = useState(
    business ? { ...businessObject } : null
  );

  const [initialPriceRatingClicked, setInitialPriceRatingClicked] =
    useState(false);

  const getPriceNumber = () => {
    if (business && business.price) return business.price.length;
    else return 0;
  };
  const [priceRating, setPriceRating] = useState(getPriceNumber());

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
    const fieldOrderObject = {};
    keyPositions.forEach((key, idx) => {
      keyPositionsObject[idx + 1] = { fieldName: key, component: null };
      fieldOrderObject[key] = idx + 1;
      // keyPositionsObject[key] = { position: idx, component: null };
    });

    console.log(keyPositionsObject);
    console.log(fieldOrderObject);

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

    const priceSpans = document.querySelectorAll(
      "#edit-business-container .price-input-container div.dollar-box"
    );
    // console.log(priceSpans);

    const stylePriceSpans = (num) => {
      const oldNum = priceRating;
      priceSpans.forEach((span, idx) => {
        if (idx < oldNum) span.classList.remove(`hovered`);
        if (idx < num) span.classList.add(`hovered`);
        // if (idx < oldNum) span.classList.remove(`hovered-${oldNum}`);
        // if (idx < num) span.classList.add(`hovered-${num}`);
      });
    };

    const handlePriceHover = (e, isHovered, num) => {
      // console.log(e);
      if (isHovered) {
        setPriceRating(num);
      } else {
        setPriceRating(0);
      }
      priceSpans.forEach((span, idx) => {
        if (idx < num) {
          if (isHovered) span.classList.add(`hovered`);
          else span.classList.remove(`hovered`);
          // if (isHovered) span.classList.add(`hovered-${num}`);
          // else span.classList.remove(`hovered-${num}`);
        }
      });
    };

    const handlePriceClick = (num, e = null) => {
      if (e) e.preventDefault();
      // console.log(e);
      if (!initialPriceRatingClicked) setInitialPriceRatingClicked(true);
      stylePriceSpans(num);
      setPriceRating(num);
    };
    // console.log(priceRating);

    filteredKeysArray.forEach((key) => {
      if (exclude.includes(key)) return <h3 key={key}>hi</h3>;
      let proxyKey;
      if (bizTemplate) {
        if (!bizTemplate[[key]]) {
          proxyKey = "";
        } else {
          proxyKey = bizTemplate[[key]];
        }
      }

      let labelComponent;

      if (key === "price") {
        const getDollarArray = () => {
          const dollars = [];
          let count = 1;
          while (count <= 4) {
            const spanNumber = count;
            const dollarComponent = (
              <div
                key={spanNumber}
                className={`dollar-box dollar-${spanNumber}`}
                onMouseEnter={(e) =>
                  !initialPriceRatingClicked &&
                  handlePriceHover(e, true, spanNumber)
                }
                onMouseLeave={(e) => {
                  if (!initialPriceRatingClicked)
                    handlePriceHover(e, false, spanNumber);
                }}
                onClick={(e) => handlePriceClick(spanNumber, e)}
              >
                $
              </div>
            );
            dollars.push(dollarComponent);
            count += 1;
          }
          return dollars;
        };
        labelComponent = (
          <label className="price">
            <h4>{key}</h4>
            <div className="price-input-container">{getDollarArray()}</div>
          </label>
        );
      } else {
        const toSkewerCase = (string) => {
          const stringArray = string.split("");
          const skeweredArray = [];
          for (let i = 0; i < string.length; i++) {
            if (i === 0) {
              skeweredArray.push(stringArray[i].toLowerCase());
            } else if (stringArray[i] === stringArray[i].toUpperCase()) {
              skeweredArray.push("-");
              skeweredArray.push(stringArray[i].toLowerCase());
            } else {
              skeweredArray.push(stringArray[i]);
            }
          }
          return skeweredArray.join("");
        };
        labelComponent = (
          <label className={`${toSkewerCase(key)}`} key={key}>
            <h4>{key}</h4>
            <input
              value={proxyKey}
              type={fieldsObject[key]}
              onChange={(e) => handleChange(e, key)}
            />
          </label>
        );
      }

      keyPositionsObject[fieldOrderObject[key]] = {
        ...keyPositionsObject[fieldOrderObject[key]],
        component: labelComponent
      };
    });

    const orderedLabelComponents = () => {
      const numberOfKeys = Object.keys(keyPositionsObject).length;
      const componentsArray = [];
      let count = 1;
      while (count <= numberOfKeys) {
        componentsArray.push(keyPositionsObject[count].component);
        count++;
      }
      return componentsArray;
    };

    const handleSubmit = (e) => {
      const runValidations = () => {
        e.preventDefault();

        // create validations
        const basicChars = /^[a-zA-Z0-9\s]+/g;
        const numbersOnly = /^\d+/g;

        const constraints = {};

        const numbersFieldsArray = ["phone", "countryCode"];
        const numbersFieldsObject = {};
        numbersFieldsArray.forEach((field) => {
          numbersFieldsObject[field] = field;
        });
        const timeFieldsArray = ["openAt", "closedAt"];
        const timeFieldsObject = {};
        timeFieldsArray.forEach((field) => {
          timeFieldsObject[field] = field;
        });
        // console.log(numbersFieldsObject);

        const validateTimeFields = () => {
          // timeFieldsArray.forEach((field) => {
          //   const [hours, minutes] = field
          //     .split(":")
          //     .map((string) => parseInt(string));
          // });
        };

        keyPositions.forEach((key) => {
          let expression;
          let errorMsg;
          if (numbersFieldsObject[key]) {
            expression = numbersOnly;
            errorMsg = `${key} must contain 1 or more numbers.`;
          } else if (!timeFieldsObject[key]) {
            expression = basicChars;
            errorMsg = `${key} must contain 1 or more numbers.`;
          }

          constraints[key] = {
            expression: expression || null,
            errorMsg: errorMsg || null
          };
        });

        console.log(constraints);

        // validate
        let inputsValid = true;
        const fieldsArray = Object.keys(constraints);
        while (fieldsArray.length > 0) {
          const field = fieldsArray.pop();

          // if (!bizTemplate[field].match(constraints[[field]])) {
          //   console.log("ok");
          // }
        }

        // const fieldsArray=
        return false;
      };
      if (runValidations()) {
        dispatch(updateBusiness(bizTemplate));
        setComponentToRender("success");
      }
    };

    stylePriceSpans(priceRating);

    return (
      <div className="business-info-form-container">
        {/* <p>hi</p> */}
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="input-fields">
            {keyPositionsObject &&
              keyPositionsObject &&
              orderedLabelComponents()}
          </div>
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
