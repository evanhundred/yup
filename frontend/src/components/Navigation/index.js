import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./navigation.css";
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
        <NavLink exact className="homeLink" to="/">
          {/* <img src={HomeLogo} alt="home" /> */}
          <h1 id="logo" className={pageType}>
            yup<span className="star">*</span>
          </h1>
        </NavLink>
        <div id="session-links" className={pageType}>
          {sessionLinks}
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
