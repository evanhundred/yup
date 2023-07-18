import "./index.css";
import { useLocation } from "react-router-dom";

// i want to allow components to autonomously populate the footer component as needed.
// biz show error page - spider image attribution

const Footer = () => {
  const location = useLocation();

  const BizShowErrorCopy = () => {
    return <p className="image-attribution">Spider image by freepik.</p>;
  };

  return (
    <div className="footer">
      <p>
        Copyright © 2023 Yup Inc. and{" "}
        <a
          href="https://www.github.com/evanhundred"
          rel="noreferrer"
          target="_blank"
        >
          Evan Ryan
        </a>
        . Ruby, Rails, PostgreSQL, JavaScript, React, Redux, and related
        languages and frameworks are implemented by Yup.
      </p>
      {location.state === "404" && <BizShowErrorCopy />}
    </div>
  );
};

export default Footer;
