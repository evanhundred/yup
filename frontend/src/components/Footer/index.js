import "./index.css";
import { useLocation } from "react-router-dom";

// i want to allow components to autonomously populate the footer component as needed.
// biz show error page - spider image attribution

const Footer = () => {
  const location = useLocation();

  // console.log(location);
  const spiderImageAttribution = (
    <span className="spider-image-attribution">
      Spider image created by
      <a
        href="https://www.flaticon.com/free-icons/draw"
        title="draw icons"
        rel="noreferrer"
        target="_blank"
      >
        {" "}
        Freepik - Flaticon
      </a>
      .
    </span>
  );
  const BizShowErrorCopy = () => {
    return <p className="image-attribution">Spider image by freepik.</p>;
  };

  const reviewWriteIconAttribution = (
    <div className="review-write-icon-attribution">
      <p>
        Draw icons created by
        <a
          href="https://www.flaticon.com/free-icons/draw"
          title="draw icons"
          rel="noreferrer"
          target="_blank"
        >
          {" "}
          Freepik - Flaticon
        </a>
        .
      </p>
    </div>
  );

  const ShareIconCopy = () => {
    return (
      <p className="image-attribution">
        'Copy' Icon made by
        <a
          href="https://www.flaticon.com/authors/catalin-fertu"
          title="Catalin Fertu"
          rel="noreferrer"
          target="_blank"
        >
          {" "}
          Catalin Fertu
        </a>{" "}
        from
        <a
          href="https://www.flaticon.com/"
          rel="noreferrer"
          target="_blank"
          title="Flaticon"
        >
          {" "}
          www.flaticon.com.
        </a>
      </p>
    );
  };

  const navBarAttribution = (
    <span className="nav-bar-attribution">
      Down arrow icons created by{" "}
      <a
        href="https://www.flaticon.com/free-icons/down-arrow"
        title="down arrow icons"
        rel="noreferrer"
        target="_blank"
      >
        Roundicons - Flaticon
      </a>
      .
    </span>
  );

  const addBizAsOwnerAttribution = (
    <span className="add-biz-as-owner-attribution">
      Left arrow icon created by{" "}
      <a
        href="https://www.flaticon.com/authors/ariefstudio"
        title="ariefstudio"
        rel="noreferrer"
        target="_blank"
      >
        ariefstudio - Flaticon
      </a>
      .
    </span>
  );

  return (
    <div className="footer">
      <p>
        Copyright © 2023 Yup Inc. and
        <a
          href="https://www.github.com/evanhundred"
          rel="noreferrer"
          target="_blank"
        >
          {" "}
          Evan Ryan
        </a>
        . Ruby, Rails, PostgreSQL, JavaScript, React, Redux, and related
        languages and frameworks are implemented by Yup.{" "}
        {!["/add-business-as-owner", "add-business-as-customer"].includes(
          location.pathname
        ) && navBarAttribution}{" "}
        {location.state &&
          location.state.searchErrors &&
          spiderImageAttribution}
        {["/add-business-as-owner", "add-business-as-customer"].includes(
          location.pathname
        ) && addBizAsOwnerAttribution}
      </p>
      {location.state === "404" && <BizShowErrorCopy />}
      {location.state !== "404" &&
        location.pathname.match(/businesses\/[0-9]+/) && (
          <div className="business-show-footer-copy">
            <ShareIconCopy />
            {reviewWriteIconAttribution}
          </div>
        )}
    </div>
  );
};

export default Footer;
