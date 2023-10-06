import { useMemo, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useLocation, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { searchBusinesses, clearBusinesses } from "../../store/businesses";

import ProfileButton from "./ProfileButton";
import "./navigation.css";
import githubLogo from "../../assets/images/github.png";
import githubLogoBlack from "../../assets/images/github-black.png";
import linkedinLogo from "../../assets/images/linkedin.png";
import linkedinLogoBlack from "../../assets/images/linkedin-black.png";
import SearchIcon from "../../assets/images/search.png";
import downArrowBlack from "../../assets/icons/down-arrow-black.png";
import downArrowWhite from "../../assets/icons/down-arrow-white.png";
import onlineStore from "../../assets/icons/online-store.png";
import checkIcon from "../../assets/icons/check.png";

const Navigation = ({ props }) => {
  const sessionUser = useSelector((state) => state.session.user);

  const history = useHistory();
  const location = useLocation();

  const blackTextOnWhite = useMemo(() => {
    return [
      "businesses",
      "search",
      "biz-photos",
      "biz-user-photos",
      "write-a-review"
    ];
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

  // let SessionLinks;
  // if (sessionUser) {
  //   SessionLinks = <ProfileButton user={sessionUser} />;
  // } else {
  //   SessionLinks = (
  //     <>
  //       <div className="session-link log-in-button">
  //         <NavLink to="/login">Log In</NavLink>
  //       </div>
  //       <div className="session-link signupButton">
  //         <NavLink to="/signup" className="signupButton">
  //           Sign Up
  //         </NavLink>
  //       </div>
  //     </>
  //   );
  // }

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

  const SearchBar = () => {
    // const history = useHistory();
    const dispatch = useDispatch();

    const [query, setQuery] = useState("");

    const handleSearchBarClick = (e) => {
      e.preventDefault();
      if (query.length >= 1) {
        dispatch(clearBusinesses());
        let errors;
        dispatch(searchBusinesses(query))
          .then((res) => {
            if (res && res.status === 404) {
              errors = { searchErrors: "404 not found" };
            }
          })
          .then(() => {
            if (errors) history.push(`/search?${query}`, errors);
            else history.push(`/search?${query}`);
          });
      }
    };
    return (
      <form>
        <input
          className="user-search-string"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <input
          className="location-input"
          value="New York, NY"
          readOnly={true}
        />
        <button
          onClick={(e) => {
            handleSearchBarClick(e);
          }}
        >
          <img src={SearchIcon} alt="find businesses" />
        </button>
      </form>
    );
  };

  const YelpForBusinessMenu = () => {
    const [showYelpForBusinessMenu, setShowYelpForBusinessMenu] =
      useState(false);
    const openYelpForBusinessMenu = () => {
      if (showYelpForBusinessMenu) return;
      setShowYelpForBusinessMenu(true);
    };

    useEffect(() => {
      if (!showYelpForBusinessMenu) return;

      const closeYelpForBusinessMenu = () => {
        setShowYelpForBusinessMenu(false);
      };

      document.addEventListener("click", closeYelpForBusinessMenu);
      return () =>
        document.removeEventListener("click", closeYelpForBusinessMenu);
    }, [showYelpForBusinessMenu]);

    return (
      <div className="yelp-for-business-link" onClick={openYelpForBusinessMenu}>
        <h4>Yelp for Business</h4>
        <img
          src={pageType === "index" ? downArrowWhite : downArrowBlack}
          alt="drop down this menu"
        />
        {showYelpForBusinessMenu && (
          <ul className="yelp-for-business-dropdown">
            <li>
              <div className="first-row">
                <img src={onlineStore} alt="add a business" />
                <h4>Add a business</h4>
              </div>
            </li>
            <li>
              <div className="second-row">
                <img src={checkIcon} alt="claim your business" />
                <h4>Claim your business</h4>
              </div>
            </li>
          </ul>
        )}
      </div>
    );
  };

  const writeReviewNavLink = () => {
    const handleClick = () => {
      history.push("/write-a-review");
    };
    return (
      <div
        className="write-review-link"
        onClick={() => {
          handleClick();
        }}
      >
        <h4>Write a Review</h4>
      </div>
    );
  };

  const HomeNav = ({ navType }) => {
    return (
      <div id="nav-bar" className={pageType}>
        <div className="left-side">
          <NavLink exact className="homeLink" to="/">
            <h1 id="logo" className={pageType}>
              yup<span className="star">*</span>
            </h1>
          </NavLink>
          <div className="search-bar-container">
            <SearchBar />
          </div>

          <YelpForBusinessMenu />
          {writeReviewNavLink()}
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
            {/* <SessionLinks /> */}
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
