import { useEffect, useState } from "react";

import "./index.css";

// import FlagAR from "../../assets/icons/flags/4x3/ar.svg";
// import FlagAU from "../../assets/icons/flags/4x3/au.svg";
// import FlagAT from "../../assets/icons/flags/4x3/at.svg";
// import FlagBE from "../../assets/icons/flags/4x3/be.svg";
// import FlagBR from "../../assets/icons/flags/4x3/br.svg";
// import { ReactComponent as FlagAR } from "../../assets/icons/flags/4x3/br.svg";

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
// console.log(images);

// require("./[A-Z]{2}.svg/", ".svg");
// const context = require.context(
//   "../../assets/icons/flags/4x3/",
//   false,
//   /[a-z]{2}\.svg/
// );
// console.log(context);

const AddBusinessAsOwner = () => {
  // const history = useHistory();

  const [businessName, setBusinessName] = useState("");
  const [componentToRender, setComponentToRender] = useState("initial");
  const [showSelectIntlCodeMenu, setShowSelectIntlCodeMenu] = useState(false);
  const [chosenCountryCode, setChosenCountryCode] = useState(1);
  const [businessPhoneNumber, setBusinessPhoneNumber] = useState("");

  const handleBusinessNameSubmit = (e) => {
    e.preventDefault();

    setComponentToRender("step-two");
  };

  // const InitialComponent = () => {
  //   return (
  //     <div className="initial-component">
  //       <div className="prompt">
  //         <h2 className="prompt-title">
  //           Hello. Let's start with your business name
  //         </h2>
  //         <p className="prompt-text">
  //           We'll use this information to help you claim your Yelp page. Your
  //           business will come up automatically if it is already listed.
  //         </p>
  //       </div>
  //       <div className="business-name-input-form">
  //         <form onSubmit={(e) => handleBusinessNameSubmit(e)}>
  //           <input
  //             onChange={(e) => setBusinessName(e.target.value)}
  //             // value={businessName}
  //             value={`${businessName}`}
  //             className="business-name"
  //             // placeholder="Your business name"
  //           />
  //           <button className="continue">Continue</button>
  //         </form>
  //       </div>
  //     </div>
  //   );
  // };

  // const StepTwo = () => {
  //   return (
  //     <div className="step-two-container">
  //       <h2>business name: {businessName}</h2>
  //     </div>
  //   );
  // };

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

  // const countryCodesObject = {};

  // countriesArray.forEach((countryCell) => {
  //   countryCodesObject[countryCell[0]] = {
  //     fileName: countryCell[2],
  //     code: `+${countryCell[1]}`
  //   };
  // });

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
              <div className="flag-icon-container" key={countryCell[0]}>
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
    return (
      <div className="business-info-form">
        <label htmlFor="country">country</label>
        <select id="country" name="country">
          {countriesArray.map((countryCell) => {
            const countryName = countryCell[0];
            return (
              <option value={countryName.toLowerCase()}>{countryName}</option>
            );
          })}
        </select>
        <label htmlFor="company-name">Company Name</label>
        <input
          id="company-name"
          name="company-name"
          placeholder="Restaurant Mozart"
        />
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
    </div>
  );
};

export default AddBusinessAsOwner;
