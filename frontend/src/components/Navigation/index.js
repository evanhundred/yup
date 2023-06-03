import { useMemo, useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./navigation.css";
import githubLogo from "../../assets/images/github.png";
import githubLogoBlack from "../../assets/images/github-black.png";
import linkedinLogo from "../../assets/images/linkedin.png";
import linkedinLogoBlack from "../../assets/images/linkedin-black.png";
import SearchIcon from "../../assets/images/search.png";

const Navigation = () => {
  const sessionUser = useSelector((state) => state.session.user);

  const location = useLocation();
  const blackTextOnWhite = useMemo(() => {
    return ["businesses", "search", "biz-photos"];
  }, []);
  const [pageType, setPageType] = useState(
    blackTextOnWhite.some((pageType) => location.pathname.includes(pageType))
      ? "business"
      : "index"
  );

  useEffect(() => {
    if (
      blackTextOnWhite.some((pageType) => location.pathname.includes(pageType))
    ) {
      setPageType("business");
    } else {
      setPageType("index");
    }
  }, [location, blackTextOnWhite]);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = <ProfileButton user={sessionUser} />;
  } else {
    sessionLinks = (
      <>
        <div className="session-link log-in-button">
          <NavLink to="/login">Log In</NavLink>
        </div>
        <div className="session-link signupButton">
          <NavLink to="/signup" className="signupButton">
            Sign Up
          </NavLink>
        </div>
      </>
    );
  }

  const HomeNav = ({ navType }) => {
    return (
      <div id="nav-bar">
        <div className="left-side">
          <NavLink exact className="homeLink" to="/">
            <h1 id="logo" className={pageType}>
              yup<span className="star">*</span>
            </h1>
          </NavLink>
          <div className="search-bar-container">
            <form>
              <input />
              <input />
              <button>
                <img src={SearchIcon} alt="find businesses" />
              </button>
            </form>
          </div>
        </div>
        <div className="right-side">
          <div className="socials">
            <div id="github">
              <a
                href="https://www.github.com/evanhundred/yup"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={pageType === "business" ? githubLogoBlack : githubLogo}
                  alt="GitHub"
                />
              </a>
            </div>
            <div id="linkedin">
              <a
                href="https://www.linkedin.com/in/evan-ryan-dev/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={
                    pageType === "business" ? linkedinLogoBlack : linkedinLogo
                  }
                  alt="LinkedIn"
                />
              </a>
            </div>
          </div>
          <div id="session-links" className={pageType}>
            {sessionLinks}
          </div>
        </div>
      </div>
    );
  };

  const FormHeader = () => {
    return (
      <>
        <div id="header-bar">
          <NavLink exact className="homeLink" to="/">
            <div id="form-header-logo-container">
              <h1 id="logo">
                yup
                <span className="star">*</span>
              </h1>
            </div>
          </NavLink>
          <div className="socials">
            <div id="github">
              <a
                href="https://www.github.com/evanhundred/yup"
                target="_blank"
                rel="noreferrer"
              >
                <img src={githubLogo} alt="GitHub" />
              </a>
            </div>
            <div id="linkedin">
              <a
                href="https://www.linkedin.com/in/evan-ryan-dev/"
                target="_blank"
                rel="noreferrer"
              >
                <img src={linkedinLogo} alt="LinkedIn" />
              </a>
            </div>
          </div>
        </div>
      </>
    );
  };

  let headerType;
  if (["/login", "/signup"].includes(window.location.pathname)) {
    headerType = <FormHeader />;
  } else {
    headerType = <HomeNav />;
  }

  return <>{headerType}</>;
};

export default Navigation;
