import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

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
  const history = useHistory();

  const [businessName, setBusinessName] = useState("");
  const [componentToRender, setComponentToRender] = useState("initial");
  const [showSelectIntlCodeMenu, setShowSelectIntlCodeMenu] = useState(false);
  const [chosenCountryCode, setChosenCountryCode] = useState(1);
  const [businessPhoneNumber, setBusinessPhoneNumber] = useState("");
  const [countryName, setCountryName] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [city, setCity] = useState("");
  const [chosenState, setChosenState] = useState("");

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
      setChosenCountryCode(code);
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
    const countryCodeDoesMatch = (countryCell) => {
      const countryCellName = countryCell[0];
      if (countryCell[1] === chosenCountryCode) {
        if (countryCellName === "Canada") {
          setCountryName("United States");
        } else {
          setCountryName(countryCell[0]);
        }
        return true;
      }
    };
    countriesArray.some(countryCodeDoesMatch);

    // countriesArray.forEach(countryCell=>{
    //   if (countryCell[1] === chosenCountryCode) setCountryName(countryCell[0]);
    //   break;
    // });

    // switch (chosenCountryCode) {
    //   case
    // }
    setComponentToRender("step-three");
  };
  const handleCountryNameChange = (e) => {
    e.preventDefault();

    setCountryName(e.target.value);
  };

  const businessFormPromptText =
    "Fill out the fields below. Your Yup listing will not appear in searches until it has been reviewed and approved by our moderators. You will then receive an email with further information on how to take over your Yup listing.";

  const businessInfoForm = () => {
    const handleBizInfoFormSubmit = () => {
      setComponentToRender("step-four");
    };

    return (
      <div className="business-info-form">
        <label>
          <p>Country</p>
          <select
            name="country"
            value={countryName.toLowerCase()}
            onChange={(e) => handleCountryNameChange(e)}
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
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
          />
        </label>
        <label>
          <p>Address Line 1</p>
          <input
            value={addressLine1}
            onChange={(e) => setAddressLine1(e.target.value)}
            placeholder="386 Flatbush Ave."
          />
        </label>
        <label>
          <p>Address Line 2</p>
          <input
            value={addressLine2}
            onChange={(e) => setAddressLine2(e.target.value)}
          />
        </label>
        <label>
          <p>City</p>
          <input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="New York"
          />
        </label>
        <label>
          <p>State</p>
          <input
            value={chosenState}
            onChange={(e) => setChosenState(e.target.value)}
            placeholder="New York"
          />
        </label>
        <label>
          <p>Zip Code</p>
          <input placeholder="11003" />
        </label>
        <label>
          <p>Neighborhood</p>
          <input placeholder="Downtown Brooklyn" />
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

  const handleLogInClick = () => {
    const addBusinessObject = {
      addBusiness: true,
      businessName: businessName
    };
    history.push("/login", addBusinessObject);
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
              We'll use this information to help you claim your Yelp page. Your
              business will come up automatically if it is already listed.
            </p>
          </div>
          <div className="business-name-input-form">
            <form onSubmit={(e) => handleBusinessNameSubmit(e)}>
              <input
                onChange={(e) => setBusinessName(e.target.value)}
                value={businessName}
                className="business-name"
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
              Add the phone number for <span>{businessName}</span> to help
              customers connect with you.
            </p>
          </div>
          <div className="phone-number-entry">
            <div className="prefix" onClick={(e) => openSelectIntlCodeMenu(e)}>
              <p>{`+${chosenCountryCode}`}</p>
              <img src={downArrow} alt="choose country code" />
            </div>
            <div className="main-number">
              <input
                placeholder="Business Phone Number"
                value={businessPhoneNumber}
                onChange={(e) => setBusinessPhoneNumber(e.target.value)}
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
    </div>
  );
};

export default AddBusinessAsOwner;
