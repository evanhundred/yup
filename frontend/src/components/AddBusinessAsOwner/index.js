import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { getBusiness, newBusiness } from "../../store/businesses";
import { newBusiness } from "../../utils/businesses";
import { createBusinessStub } from "../../store/businesses";
import "./index.css";

import LeftArrow from "../../assets/icons/arrow-left.png";
import downArrow from "../../assets/icons/down-arrow-black.png";

const importAll = (r) => {
  let images = {};
  r.keys().map((item) => {
    // added 'return'
    return (images[item.replace("./", "")] = r(item));
  });
  return images;
};

const images = importAll(
  require.context("../../assets/icons/flags/4x3/", false, /\.svg/)
);

const AddBusinessAsOwner = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [componentToRender, setComponentToRender] = useState("initial");
  const [showSelectIntlCodeMenu, setShowSelectIntlCodeMenu] = useState(false);

  // const [businessName, setBusinessName] = useState("");
  // const [chosenCountryCode, setChosenCountryCode] = useState(1);
  // const [chosenPhoneNumber, setChosenPhoneNumber] = useState("");
  // const [countryName, setCountryName] = useState("");
  // const [addressLine1, setAddressLine1] = useState("");
  // const [addressLine2, setAddressLine2] = useState("");
  // const [city, setCity] = useState("");
  // const [chosenState, setChosenState] = useState("");

  const newBusinessTemplate = newBusiness();
  const [bizTemplate, setBizTemplate] = useState(newBusinessTemplate);

  // console.log(bizTemplate);

  const handleBusinessNameSubmit = (e) => {
    e.preventDefault();

    setComponentToRender("step-two");
  };

  const handleBackButtonClick = () => {
    setComponentToRender("initial");
  };

  const openSelectIntlCodeMenu = (e) => {
    e.preventDefault();
    setShowSelectIntlCodeMenu(true);
  };

  useEffect(() => {
    if (!showSelectIntlCodeMenu) return;

    const closeSelectIntlCodeMenu = () => {
      setShowSelectIntlCodeMenu(false);
    };

    document.addEventListener("click", closeSelectIntlCodeMenu);
    return () => document.removeEventListener("click", closeSelectIntlCodeMenu);
  }, [showSelectIntlCodeMenu]);

  const countriesArray = [
    ["Argentina", 54, "ar"],
    ["Australia", 61, "au"],
    ["Austria", 43, "at"],
    ["Belgium", 32, "be"],
    ["Brazil", 55, "br"],
    ["Canada", 1, "ca"],
    ["Chile", 56, "cl"],
    ["Czhech Republic", 420, "cz"],
    ["Denmark", 45, "dk"],
    ["Finland", 358, "fi"],
    ["France", 33, "fr"],
    ["Germany", 49, "de"],
    ["Hong Kong", 852, "hk"],
    ["Italy", 39, "it"],
    ["Japan", 81, "jp"],
    ["Malaysia", 60, "my"],
    ["Mexico", 52, "mx"],
    ["New Zealand", 64, "nz"],
    ["Norway", 47, "no"],
    ["Philippines", 63, "ph"],
    ["Poland", 48, "pl"],
    ["Portugal", 351, "pt"],
    ["Republic of Ireland", 353, "ie"],
    ["Singapore", 65, "sg"],
    ["Spain", 34, "es"],
    ["Sweden", 46, "se"],
    ["Switzerland", 41, "ch"],
    ["Taiwan", 886, "tw"],
    ["The Netherlands", 31, "nl"],
    ["Turkey", 90, "tr"],
    ["United Kingdom", 44, "gb"],
    ["United States", 1, "us"]
  ];

  const countryCodeDropdown = () => {
    const handleCountryCodeClick = (code) => {
      bizTemplate.countryCode = code;

      // setChosenCountryCode(code);
    };
    return (
      <ul className="select-intl-code-dropdown">
        {countriesArray.map((countryCell) => {
          return (
            <li
              key={countryCell[0]}
              onClick={() => handleCountryCodeClick(countryCell[1])}
            >
              <div className="flag-icon-container">
                <img
                  className="flag-icon"
                  src={images[`${countryCell[2]}.svg`]}
                  alt={countryCell[0]}
                  style={{ width: "40px" }}
                />
              </div>
              <h4>{`${countryCell[0]} +${countryCell[1]}`}</h4>
            </li>
          );
        })}
      </ul>
    );
  };

  const handlePhoneNumberSubmit = () => {
    // business.phone = chosenCountryCode.toString().concat(chosenPhoneNumber);
    if (!bizTemplate.countryCode) {
      bizTemplate.countryCode = 1;
    }

    const countryCodeDoesMatch = (countryCell) => {
      const countryCellCode = countryCell[1];
      if (countryCellCode === bizTemplate.countryCode) {
        if (countryCellCode === 1) {
          bizTemplate.country = "United States";
        } else {
          bizTemplate.country = countryCell[0];
        }
        return true;
      }
    };
    countriesArray.some(countryCodeDoesMatch);
    setComponentToRender("step-three");
  };

  // const handleCountryNameChange = (e) => {
  //   e.preventDefault();

  //   bizTemplate.country = e.target.value;
  //   // setCountryName(e.target.value);
  // };

  // console.log(bizTemplate);

  const [errors, setErrors] = useState(null);

  const submitBizInfoToBackend = async () => {
    const businessObject = { business: bizTemplate };
    const res = await dispatch(createBusinessStub(businessObject)).catch(
      async (res) => {
        let data;
        try {
          data = await res.clone().json();
        } catch {
          data = await res.text();
        }
        if (data?.errors) setErrors(data.errors);
        else if (data) setErrors([data]);
        else setErrors([res.statusText]);
        console.log(errors);
      }
    );

    let next;
    // const data = await res.json();
    // console.log(res);
    if (res.id) next = "step-four";
    else next = "submission-fail";

    setComponentToRender(next);

    // let data;
    // if (res.ok) {
    //   data = await res.json();
    //   console.log(await data);
    //   return data;
    // } else {
    //   data = await res.json();
    //   // data = { errors: res };
    //   console.log(data);
    // }
  };

  const businessFormPromptText =
    "Fill out the fields below. Your Yup listing will not appear in searches until it has been reviewed and approved by our moderators. You will then receive an email with further information on how to take over your Yup listing.";

  const handleChange = (e) => {
    const errorIndex = e.target.className.indexOf("error");
    // console.log(errorIndex);
    // console.log(e);
    let attributeName;
    if (errorIndex === -1) {
      attributeName = e.target.className;
    } else {
      if (errorIndex > 0) {
        attributeName = e.target.className.slice(0, errorIndex).trim();
      }
      if (errorIndex === 0) {
        attributeName = e.target.className.slice(5).trim();
      }
    }
    // console.log(attributeName);
    setBizTemplate((bizTemplate) => ({
      ...bizTemplate,
      [attributeName]: e.target.value
    }));
  };

  const [formErrors, setFormErrors] = useState({});

  const businessInfoForm = () => {
    const handleBizInfoFormSubmit = async () => {
      const clearErrors = () => {
        setFormErrors({});
        const inputBoxes = document.querySelectorAll(
          "#add-business-owner-container .business-info-form input.error"
        );
        inputBoxes.forEach((box) => box.classList.remove("error"));
      };

      clearErrors();

      const mccString = " must contain characters.";
      const anyDigitsOrLetters = /[0-9a-zA-Z]+/;

      const constraints = {
        name: [anyDigitsOrLetters, `Business name${mccString}`],
        phone: [/.{5,}/, "Phone number must contain 5 or more characters"],
        address: [anyDigitsOrLetters, `Address${mccString}`],
        city: [anyDigitsOrLetters, `City name${mccString}`],
        state: [anyDigitsOrLetters, `State name${mccString}`],
        // zipcode: [/\d{5,}/, `Zipcode must contain 5 or more numeric integers.`],
        neighborhood: [anyDigitsOrLetters, `Neighborhood name${mccString}`]
      };

      const constraintKeys = Object.keys(constraints);

      while (constraintKeys.length > 0) {
        const constraintKey = constraintKeys.pop();
        const valueArray = constraints[[constraintKey]];
        constraints[[constraintKey]] = {
          expression: valueArray[0],
          errorMsg: valueArray[1]
        };
      }

      // console.log(constraints);

      const validateInputs = () => {
        let inputsValid = true;

        const fieldsArray = Object.keys(constraints);
        while (fieldsArray.length > 0) {
          const field = fieldsArray.pop();
          // console.log(field);
          // console.log(constraints[[field]]);
          // console.log(bizTemplate[[field]]);
          // console.log(
          //   bizTemplate[[field]].match(constraints[[field]].expression)
          // );
          // console.log(
          //   !bizTemplate[field].match(constraints[[field]].expression)
          // );

          if (!bizTemplate[field].match(constraints[[field]].expression)) {
            // console.log(formErrors);
            const newError = { [field]: constraints[[field]].errorMsg };
            // console.log({
            //   ...newError
            // });
            setFormErrors((formErrors) => ({
              ...formErrors,
              ...newError
            }));

            const inputBox = document.querySelector(
              `#add-business-owner-container .business-info-form input.${field}`
            );
            inputBox.classList.add("error");
            // console.log(formErrors);

            if (inputsValid) inputsValid = false;
          }
        }

        return inputsValid;
      };

      if (validateInputs()) {
        const res = await submitBizInfoToBackend(); // this also sets next componentToRender
        console.log(res);
      }
      // else {
      //   console.log("errors exist.");
      //   // const styleInputBoxes = () => {
      //   //   const inputBoxes = document.querySelectorAll(
      //   //     "#add-business-owner-container .business-info-form input"
      //   //   );
      //   //   inputBoxes.forEach((box) => {
      //   //     console.log(formErrors[box.className]);
      //   //     if (formErrors[box.className]) {
      //   //       box.classList.add("error");
      //   //     }
      //   //   });
      //   // };

      //   // styleInputBoxes();
      // }
    };

    const errorBox = (field) => {
      return (
        <div className="error-box">
          <p>{formErrors[field]}</p>
        </div>
      );
    };

    // const inputHasError = (field) => {
    //   if (formErrors[field])
    // }

    return (
      <div className="business-info-form">
        <label>
          <p>Country</p>
          <select
            name="country"
            className="country"
            value={bizTemplate.country.toLowerCase()}
            onChange={(e) => handleChange(e)}
          >
            {countriesArray.map((countryCell) => {
              const countryArrayName = countryCell[0];

              return (
                <option
                  key={countryCell[0]}
                  value={countryArrayName.toLowerCase()}
                >
                  {countryArrayName}
                </option>
              );
            })}
          </select>
        </label>
        <label>
          <p>Company Name</p>
          <input
            className="name"
            value={bizTemplate.name}
            onChange={(e) => handleChange(e)}
          />
          {formErrors.name && errorBox("name")}
        </label>
        <label>
          <p>Phone Number</p>
          <input
            className="phone"
            value={bizTemplate.phone}
            onChange={(e) => handleChange(e)}
          />
          {formErrors.phone && errorBox("phone")}
        </label>
        <label>
          <p>Address</p>
          <input
            className="address"
            value={bizTemplate.address}
            onChange={(e) => handleChange(e)}
            placeholder="386 Flatbush Ave."
          />
          {formErrors.address && errorBox("address")}
        </label>
        <label>
          <p>City</p>
          <input
            className="city"
            value={bizTemplate.city}
            onChange={(e) => handleChange(e)}
            placeholder="New York"
          />
          {formErrors.city && errorBox("city")}
        </label>
        <label>
          <p>State</p>
          <input
            className="state"
            value={bizTemplate.state}
            onChange={(e) => handleChange(e)}
            placeholder="NY"
          />
          {formErrors.state && errorBox("state")}
        </label>
        <label>
          <p>Zip Code</p>
          <input
            placeholder="11003"
            className="zipcode"
            value={bizTemplate.zipcode}
            onChange={(e) => handleChange(e)}
          />
          {formErrors.zipcode && errorBox("zipcode")}
        </label>
        <label>
          <p>Neighborhood</p>
          <input
            className="neighborhood"
            placeholder="Downtown Brooklyn"
            value={bizTemplate.neighborhood}
            onChange={(e) => handleChange(e)}
          />
          {formErrors.neighborhood && errorBox("neighborhood")}
        </label>
        <div
          className="continue-submit-button"
          onClick={handleBizInfoFormSubmit}
        >
          Continue
        </div>
      </div>
    );
  };

  const currentUser = useSelector((state) => state.session.user);
  if (!currentUser) history.push("/login");

  const SuccessMessage = () => {
    const handleEditStubClick = () => {
      console.log("edit stub");
    };

    return (
      <div className="step-four-container">
        <div className="prompt">
          <h2>Successful submission.</h2>
          <p>
            Your business is now live in "stub mode". Business stubs can accept
            reviews from all users, and revisions by the stub owner. Yup will
            then verify this business, and fill in the details. As a business
            owner, your account will have live access to edit and destroy the
            business profile.
          </p>
          <p className="edit-stub-link" onClick={handleEditStubClick}>
            Edit Stub
          </p>
        </div>
      </div>
    );
  };

  return (
    <div id="add-business-owner-container">
      {componentToRender === "initial" && (
        <div className="initial-component">
          <div className="prompt">
            <h2 className="prompt-title">
              Hello. Let's start with your business name
            </h2>
            <p className="prompt-text">
              We'll use this information to help you claim your Yup page. Your
              business will come up automatically if it is already listed.
            </p>
          </div>
          <div className="business-name-input-form">
            <form onSubmit={(e) => handleBusinessNameSubmit(e)}>
              <input
                onChange={(e) => handleChange(e)}
                // onChange={(e) => (bizTemplate.name = e.target.value)}
                // onChange={(e) => setBusinessName(e.target.value)}
                value={bizTemplate.name}
                className="name"
                placeholder="Your business name"
              />
              <button className="continue">Continue</button>
            </form>
          </div>
        </div>
      )}
      {componentToRender === "step-two" && (
        <div className="step-two-container">
          <div className="back-button" onClick={handleBackButtonClick}>
            <img src={LeftArrow} alt="previous page" />
            <p>Back</p>
          </div>
          <div className="prompt">
            <h2 className="prompt-title">
              Give customers a phone number so they can call your business
            </h2>
            <p>
              Add the phone number for <span>{bizTemplate.name}</span> to help
              customers connect with you.
            </p>
          </div>
          <div className="phone-number-entry">
            <div className="prefix" onClick={(e) => openSelectIntlCodeMenu(e)}>
              <p>{`+${bizTemplate.countryCode || 1}`}</p>
              <img src={downArrow} alt="choose country code" />
            </div>
            <div className="main-number">
              <input
                className="phone"
                placeholder="Business Phone Number"
                value={bizTemplate.phone}
                onChange={(e) => handleChange(e)}
              />
            </div>
          </div>
          {showSelectIntlCodeMenu && (
            <div className="select-intl-code-menu-container">
              {countryCodeDropdown()}
            </div>
          )}
          <div
            className="continue-submit-button"
            onClick={handlePhoneNumberSubmit}
          >
            Continue
          </div>
        </div>
      )}
      {componentToRender === "step-three" && (
        <div className="step-three-container">
          <div className="prompt">
            <h2>List your business on Yup</h2>
            <p>{businessFormPromptText}</p>
          </div>
          {businessInfoForm()}
        </div>
      )}
      {componentToRender === "step-four" && <SuccessMessage />}
      {componentToRender === "submission-fail" && (
        <div className="error-message">Submission fail.</div>
      )}
    </div>
  );
};

export default AddBusinessAsOwner;
