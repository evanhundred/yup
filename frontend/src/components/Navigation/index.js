import { NavLink, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import HomeLogo from "./yelp_logo.png";

const Navigation = () => {
  const sessionUser = useSelector((state) => state.session.user);
  const history = useHistory();

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = <ProfileButton user={sessionUser} />;
  } else {
    sessionLinks = (
      <>
        <NavLink to="/login">Log In</NavLink>
        <NavLink to="/signup">Sign Up</NavLink>
      </>
    );
  }

  const HomeNav = () => {
    return (
      <ul>
        <li id="nav-bar">
          <NavLink exact className="homeLink" to="/">
            {/* <img src={HomeLogo} alt="home" /> */}
            <h1 id="logo">
              yup<span className="star">*</span>
            </h1>
          </NavLink>
          <div id="session-links">{sessionLinks}</div>
        </li>
      </ul>
    );
  };

  const FormHeader = () => {
    return (
      <>
        <div id="header-bar">
          <div id="form-header-logo-container">
            <NavLink exact className="homeLink" to="/">
              {/* <img src={HomeLogo} alt="home" /> */}

              <h1 className="yup-logo">yup</h1>
              <h1 className="star">*</h1>
            </NavLink>
          </div>
        </div>
      </>
    );
  };

  let headerType =
    window.location.pathname === "/" ? <HomeNav /> : <FormHeader />;

  return <>{headerType}</>;

  // ORIGINAL DUAL CHOICE NAV BAR
  // if (window.location.pathname === "/") {
  //   return (
  //     <ul>
  //       <li id="nav-bar">
  //         <NavLink exact className="homeLink" to="/">
  //           {/* <img src={HomeLogo} alt="home" /> */}
  //           <h1 id="logo">
  //             yup<span className="star">*</span>
  //           </h1>
  //         </NavLink>
  //         <div id="session-links">{sessionLinks}</div>
  //       </li>
  //     </ul>
  //   );
  // } else {
  //   return (
  //     <>
  //       <div id="header-bar">
  //         <NavLink exact className="homeLink" to="/">
  //           {/* <img src={HomeLogo} alt="home" /> */}
  //           <div id="form-header-logo-container">
  //             <h1 className="yup-logo">yup</h1>
  //             <h1 className="star">*</h1>
  //           </div>
  //         </NavLink>
  //       </div>
  //     </>
  //   );
  // }
};

export default Navigation;
