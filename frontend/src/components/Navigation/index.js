import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./navigation.css";
import githubLogo from "../../assets/images/github.png";
import linkedinLogo from "../../assets/images/linkedin.png";
// import HomeLogo from "./yelp_logo.png";

const Navigation = () => {
  const sessionUser = useSelector((state) => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = <ProfileButton user={sessionUser} />;
  } else {
    sessionLinks = (
      <>
        <NavLink to="/login">Log In</NavLink>
        <NavLink to="/signup" className="signupButton">
          Sign Up
        </NavLink>
      </>
    );
  }

  const HomeNav = () => {
    let pageType = window.location.pathname.match(regPath)
      ? "business-show"
      : "root-index";
    return (
      <div id="nav-bar">
        <div className="left-side">
          <NavLink exact className="homeLink" to="/">
            {/* <img src={HomeLogo} alt="home" /> */}
            <h1 id="logo" className={pageType}>
              yup<span className="star">*</span>
            </h1>
          </NavLink>
        </div>
        <div className="right-side">
          <div className="socials">
            <div id="github">
              <a href="https://www.github.com/evanhundred/yup" target="_blank">
                {/* <p>gh</p> */}
                {/* <img src="../../assets/images/github-mark.png" /> */}
                <img src={githubLogo} alt="GitHub" />
              </a>
            </div>
            <div id="linkedin">
              <a
                href="https://www.linkedin.com/in/evan-ryan-1a2b07131/"
                target="_blank"
              >
                {/* <p>li</p> */}
                <img src={linkedinLogo} alt="LinkedIn" />
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
          <div id="form-header-logo-container">
            <NavLink exact className="homeLink" to="/">
              <h1 className="yup-logo">yup</h1>
              <h1 className="star">*</h1>
            </NavLink>
          </div>
          <div className="socials">
            <div id="github">
              <a href="https://www.github.com/evanhundred/yup" target="_blank">
                {/* <p>gh</p> */}
                {/* <img src="../../assets/images/github-mark.png" /> */}
                <img src={githubLogo} alt="GitHub" />
              </a>
            </div>
            <div id="linkedin">
              <a
                href="https://www.linkedin.com/in/evan-ryan-1a2b07131/"
                target="_blank"
              >
                {/* <p>li</p> */}
                <img src={linkedinLogo} alt="LinkedIn" />
              </a>
            </div>
          </div>
        </div>
      </>
    );
  };

  let { businessId } = useParams();
  let regPath = /\/businesses\/\d*/;

  let headerType =
    window.location.pathname === "/" ||
    window.location.pathname.match(regPath) ? (
      <HomeNav />
    ) : (
      <FormHeader />
    );

  return <>{headerType}</>;
};

export default Navigation;
