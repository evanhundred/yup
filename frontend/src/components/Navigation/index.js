import { useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./navigation.css";
import githubLogo from "../../assets/images/github.png";
import linkedinLogo from "../../assets/images/linkedin.png";
import { renderBusinessNav, renderIndexNav } from "../../store/navigation";

const Navigation = () => {
  const sessionUser = useSelector((state) => state.session.user);

  const regPaths = [/\/businesses\/\d*/, /\/search/];

  // const location = useLocation();
  // console.log(location);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = <ProfileButton user={sessionUser} />;
  } else {
    sessionLinks = (
      <>
        <div className="session-link">
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
    // const dispatch = useDispatch();
    // const statePageType = useSelector((state) => state.navType.navType);

    // useEffect(() => {
    //   let pageType = regPaths.some((regPath) =>
    //     window.location.pathname.match(regPath)
    //   )
    //     ? "business-result"
    //     : "root-index";
    //   dispatch(
    //     pageType === "root-index" ? renderIndexNav() : renderBusinessNav()
    //   );
    // }, [dispatch]);

    return (
      <div id="nav-bar">
        <div className="left-side">
          <NavLink exact className="homeLink" to="/">
            <h1 id="logo" className={navType}>
              yup<span className="star">*</span>
            </h1>
          </NavLink>
        </div>
        <div className="right-side">
          <div className="socials">
            <div id="github">
              <a
                href="https://www.github.com/evanhundred/yup"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={githubLogo} alt="GitHub" />
              </a>
            </div>
            <div id="linkedin">
              <a
                href="https://www.linkedin.com/in/evan-ryan-1a2b07131/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={linkedinLogo} alt="LinkedIn" />
              </a>
            </div>
          </div>
          <div id="session-links" className={navType}>
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
          <div id="form-header-logo-container">
            <NavLink exact className="homeLink" to="/">
              <h1 className="yup-logo">yup</h1>
              <h1 className="star">*</h1>
            </NavLink>
          </div>
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
                href="https://www.linkedin.com/in/evan-ryan-1a2b07131/"
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
    let navType = regPaths.some((regPath) =>
      window.location.pathname.match(regPath)
    )
      ? "business"
      : "index";
    headerType = <HomeNav navType={navType} />;
  }

  // let headerType = ["/login", "/signup"].includes(window.location.pathname) ? (
  //   <FormHeader />
  // ) : (
  //   <HomeNav />
  // );

  return <>{headerType}</>;
};

export default Navigation;
