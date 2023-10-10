import { useState } from "react";
// import { useHistory } from "react-router-dom";

import "./index.css";

const AddBusinessAsOwner = () => {
  // const history = useHistory();

  const [businessName, setBusinessName] = useState("");
  const [componentToRender, setComponentToRender] = useState("initial");

  const handleBusinessNameSubmit = (e) => {
    e.preventDefault();

    setComponentToRender("step-two");
    // history.push("step-two");
  };

  const InitialComponent = () => {
    return (
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
              // value={businessName}
              value={`${businessName}`}
              className="business-name"
              // placeholder="Your business name"
            />
            <button className="continue">Continue</button>
          </form>
        </div>
      </div>
    );
  };

  const StepTwo = () => {
    return (
      <div className="step-two-container">
        <h2>business name: {businessName}</h2>
      </div>
    );
  };

  // const componentSelector = () => {
  //   switch (componentToRender) {
  //     case "initial":
  //       return <InitialComponent key="initial" />;
  //     case "step-two":
  //       return <StepTwo key="step-2" />;
  //     default:
  //       return null;
  //   }
  // };

  const handleBackButtonClick = () => {
    setComponentToRender("initial");
  };

  return (
    <div id="add-business-owner-container">
      {/* <InitialComponent /> */}
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
            {`<---`} Back
          </div>
          <h2>business name: {businessName}</h2>
        </div>
      )}
    </div>
  );
};

export default AddBusinessAsOwner;
