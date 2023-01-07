import { useState } from "react";

const TitleCardContent = ({ business }) => {
  const FirstLine = () => {
    return (
      <>
        <h1>Mind-blowing coffee</h1>
      </>
    );
  };
  const SecondLine = () => {
    return (
      <div className="second-line">
        <p>Sip on the freshest grinds at {`${business.name}`}</p>
        <p>
          Explore more top-notch{" "}
          <span className="fake-link">coffee houses in NYC</span>
        </p>
      </div>
    );
  };

  return (
    <>
      <div id="business-title-card">
        <FirstLine />
        <SecondLine />
      </div>
    </>
  );
};
export default TitleCardContent;
