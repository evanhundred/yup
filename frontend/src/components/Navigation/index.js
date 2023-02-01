import { useEffect, useMemo, useState } from "react";
import { NavLink, useLocation, useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./navigation.css";
import githubLogo from "../../assets/images/github.png";
import linkedinLogo from "../../assets/images/linkedin.png";
import { renderBusinessNav, renderIndexNav } from "../../store/navigation";

const Navigation = ({ navType }) => {
  const sessionUser = useSelector((state) => state.session.user);

  const location = useLocation();
  const [pageType, setPageType] = useState(
    location.pathname.includes("businesses") ? "business" : "index"
  );
  // console.log(`location:`, location);

  useEffect(() => {
    // console.log(location.pathname);
    // regPaths.some((regPath) =>
    //   location.pathname.match(regPath)
    // )
    //   ? "business"
    //   : "index"
    if (location.pathname.includes("businesses")) {
      setPageType("business");
    } else {
      setPageType("index");
    }
  }, [location]);

  const regPaths = [/\/businesses\/\d*/, /\/search/];

  // let pageType;
  // useEffect(() => {
  //   pageType = regPaths.some((regPath) =>
  //     location.pathname.match(regPath)
  //   )
  //     ? "business"
  //     : "index";
  // }, [regPaths]);

  // useEffect(() => {
  //   dispatch(pageType === "index" ? renderIndexNav() : renderBusinessNav());
  // }, [dispatch, pageType]);

  // const [loca, setLoca] = useState(window.location.href);

  // const handleLocationChange = () => {
  //   setLoca(window.location.href);
  // };

  // useEffect(() => {
  //   window.addEventListener("hashchange", handleLocationChange);
  //   return () => {
  //     window.removeEventListener("hashchange", handleLocationChange);
  //   };
  // }, []);

  // console.log(loca);

  // const regPaths = useMemo(() => {
  //   return [/\/businesses\/\d*/, /\/search/];
  // }, []);
  // const [navType

  // const pageType = regPaths.some((regPath) =>
  //   window.location.pathname.match(regPath)
  // )
  //   ? "business"
  //   : "index";

  // const dispatch = useDispatch();
  // const selectorNavType = useSelector((state) => state.navType.navType);
  // // setStateNavType(pageType);
  // const [stateNavType, setStateNavType] = useState("");

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
    return (
      <div id="nav-bar">
        <div className="left-side">
          <NavLink exact className="homeLink" to="/">
            <h1 id="logo" className={pageType}>
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
