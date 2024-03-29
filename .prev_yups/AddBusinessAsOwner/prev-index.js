import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import "./index.css";

import LeftArrow from "../../assets/icons/arrow-left.png";
import downArrow from "../../assets/icons/down-arrow-black.png";

const importAll = (r) => {
  let images = {};
  r.keys().map((item) => {
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

  const CountryCodeDropdown = () => {
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
    setComponentToRender("step-three");
  };

  const stepThreePromptText =
    "Fill out the fields below. Your Yup listing will not appear in searches until it has been reviewed and approved by our moderators. You will then receive an email with further information on how to take over your Yup listing.";

  const BusinessInfoForm = () => {
    const handleBizInfoFormSubmit = () => {
      setComponentToRender("step-four");
    };
    return (
      <div className="business-info-form">
        <label htmlFor="country">Country</label>
        <select id="country" name="country">
          {countriesArray.map((countryCell) => {
            const countryName = countryCell[0];
            return (
              <option key={countryCell[0]} value={countryName.toLowerCase()}>
                {countryName}
              </option>
            );
          })}
        </select>
        <label htmlFor="company-name">Company Name</label>
        <input
          id="company-name"
          name="company-name"
          placeholder="Junior's Cheesecake"
        />
        <label htmlFor="address-line-1">Address Line 1</label>
        <input
          id="address-line-1"
          name="address-line-1"
          placeholder="1176 Pennsylvania Ave."
        />
        <label htmlFor="address-line-2">Address Line 2</label>
        <input id="address-line-2" name="address-line-2" />
        <label htmlFor="city">City</label>
        <input id="city" name="city" placeholder="New Dorp" />
        <label htmlFor="state">State</label>
        <input id="state" name="state" placeholder="New York" />
        <label htmlFor="zip-code">City</label>
        <input id="zip-code" name="zip-code" placeholder="11003" />
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
                // value={`${businessName}`}
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
          <div
            className="continue-submit-button"
            onClick={handlePhoneNumberSubmit}
          >
            Continue
          </div>
        </div>
      )}
      {showSelectIntlCodeMenu && (
        <div className="select-intl-code-menu-container">
          <CountryCodeDropdown />
        </div>
      )}
      {componentToRender === "step-three" && (
        <div className="step-three-container">
          <div className="prompt">
            <h2>List your business on Yup</h2>
            <p>{stepThreePromptText}</p>
          </div>
          <BusinessInfoForm />
        </div>
      )}
      {componentToRender === "step-four" && (
        <div className="step-four-container">
          <h2>Great. Now create your Yup account.</h2>
          <h4>
            A Yup account enables you to manage your page, upload photos, and
            respond to reviews on Yup.
          </h4>
          <p>
            already have an account?{" "}
            <span className="login" onClick={handleLogInClick}>
              Log in
            </span>
          </p>
        </div>
      )}
    </div>
  );
};

export default AddBusinessAsOwner;
