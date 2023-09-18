import "./index.css";
import { useLocation } from "react-router-dom";

// i want to allow components to autonomously populate the footer component as needed.
// biz show error page - spider image attribution

const Footer = () => {
  const location = useLocation();

  // console.log(location);
  const BizShowErrorCopy = () => {
    return <p className="image-attribution">Spider image by freepik.</p>;
  };

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
        from{" "}
        <a
          href="https://www.flaticon.com/"
          rel="noreferrer"
          target="_blank"
          title="Flaticon"
        >
          www.flaticon.com.
        </a>
      </p>
    );
  };

  // console.log(location);

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
        languages and frameworks are implemented by Yup.
      </p>
      {location.state === "404" && <BizShowErrorCopy />}
      {location.state !== "404" &&
        location.pathname.match(/businesses\/[0-9]+/) && <ShareIconCopy />}
    </div>
  );
};

export default Footer;
