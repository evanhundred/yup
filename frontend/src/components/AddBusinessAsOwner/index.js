import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import "./index.css";

import LeftArrow from "../../assets/icons/arrow-left.png";
import downArrow from "../../assets/icons/down-arrow-black.png";

// const importAll = (r) => {
//   let images = {};
//   r.keys().map((item) => {
//     // added 'return'
//     return (images[item.replace("./", "")] = r(item));
//   });
//   return images;
// };

// const images = importAll(
//   require.context("../../assets/icons/flags/4x3/", false, /\.svg/)
// );

const AddBusinessAsOwner = () => {
  const history = useHistory();

  const [businessName, setBusinessName] = useState("");
  const [componentToRender, setComponentToRender] = useState("business-form");
  const [showSelectIntlCodeMenu, setShowSelectIntlCodeMenu] = useState(false);
  const [chosenCountryCode, setChosenCountryCode] = useState(1);
  const [businessPhoneNumber, setBusinessPhoneNumber] = useState("");
  const [countryName, setCountryName] = useState("United States");

  const handleBusinessNameSubmit = (e) => {
    e.preventDefault();
  };

  const handleBackButtonClick = () => {
    setComponentToRender("initial");
  };

  const openSelectIntlCodeMenu = (e) => {
    e.preventDefault();
    setShowSelectIntlCodeMenu(true);
  };

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

  const handlePhoneNumberSubmit = () => {};
  const handleCountryNameChange = (e) => {
    e.preventDefault();

    setCountryName(e.target.value);
  };

  const businessFormPromptText =
    "Fill out the fields below. Your Yup listing will not appear in searches until it has been reviewed and approved by our moderators. You will then receive an email with further information on how to take over your Yup listing.";

  const BusinessInfoForm = () => {
    const handleBizInfoFormSubmit = () => {};
    return (
      <div className="business-info-form">
        <label>
          <p className="label">Country</p>
          <select
            name="country"
            value={countryName}
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
      {componentToRender === "business-form" && (
        <div className="step-three-container">
          <div className="prompt">
            <h2>List your business on Yup</h2>
            <p>{businessFormPromptText}</p>
          </div>
          <BusinessInfoForm />
        </div>
      )}
    </div>
  );
};

export default AddBusinessAsOwner;
