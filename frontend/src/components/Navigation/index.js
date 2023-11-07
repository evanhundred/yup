import { useMemo, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useLocation, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { searchBusinesses, resetBusinesses } from "../../store/businesses";
import { loadMessages, resetMessages } from "../../store/messages";

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
  const messages = useSelector((state) => state.messages);

  const history = useHistory();
  const location = useLocation();

  const blackTextOnWhite = useMemo(() => {
    return [
      "businesses",
      "search",
      "biz-photos",
      "biz-user-photos",
      "write-a-review",
      "add-business-as-owner",
      "add-business-as-customer"
    ];
  }, []);

  // const minimalNavHeader = useMemo(() => {
  //   return ["write-a-review", "add-business-owner", "add-business-customer"];
  // }, []);

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

  const SearchBar = () => {
    const dispatch = useDispatch();

    const [query, setQuery] = useState("");

    const handleSearchBarClick = (e) => {
      e.preventDefault();
      // let locationState = { from: "search-bar" };
      if (query.length >= 1) {
        dispatch(resetBusinesses());
        // dispatch(clearBusinesses());
        dispatch(resetMessages());
        let errors;
        // console.log(errors);
        let messageStateObject = {};

        // dispatch(resetMessages())
        //   .then(() => dispatch(searchBusinesses(query)))
        dispatch(searchBusinesses(query))
          .then((res) => {
            if (res && res.status === 404) {
              // console.log(res);
              errors = { searchErrors: `404 - ${query} not found` };
              // dispatch(loadMessage(errors));
            }
          })
          .then(() => {
            if (errors) {
              // dispatch(loadMessage(errors));
              const keyName = Object.keys(errors)[0];
              messageStateObject[keyName] = errors[keyName];
              // locationState = { ...locationState, ...errors };
            }

            messageStateObject.from = "nav-search-bar";
            messageStateObject.loaded = false;

            // console.log(errors);
            // console.log(messages);
            // console.log({ ...messages, ...messageStateObject });
            // dispatch(loadMessage({ from: "nav-search-bar" }));
            dispatch(loadMessages(messageStateObject));
            // dispatch(loadMessage({ loaded: false }));
            history.push(`/search?${query}`);
            // if (errors) history.push(`/search?${query}`, errors);
            // else history.push(`/search?${query}`, { from: "search-bar" });
          });
      }
    };
    return (
      <form onSubmit={(e) => handleSearchBarClick(e)}>
        {/* <form onSubmit={(e) => handleSearchBarClick(e)}> */}
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

  const YupForBusinessMenu = () => {
    const [showYupForBusinessMenu, setShowYupForBusinessMenu] = useState(false);
    const openYupForBusinessMenu = () => {
      if (showYupForBusinessMenu) return;
      setShowYupForBusinessMenu(true);
    };

    useEffect(() => {
      if (!showYupForBusinessMenu) return;

      const closeYupForBusinessMenu = () => {
        setShowYupForBusinessMenu(false);
      };

      document.addEventListener("click", closeYupForBusinessMenu);
      return () =>
        document.removeEventListener("click", closeYupForBusinessMenu);
    }, [showYupForBusinessMenu]);

    const currentUser = useSelector((state) => state.session.user);

    const handleYupForBusinessClick = () => {
      if (currentUser) history.push("/add-business-as-owner");
      else history.push("/login");
    };

    return (
      <div className="yup-for-business-link" onClick={openYupForBusinessMenu}>
        <h4>Yup for Business</h4>
        <img
          src={pageType === "index" ? downArrowWhite : downArrowBlack}
          alt="drop down this menu"
        />
        {showYupForBusinessMenu && (
          <ul className="yup-for-business-dropdown">
            <li>
              <div className="first-row" onClick={handleYupForBusinessClick}>
                {/* <Link to="/add-business-as-owner"> */}
                <img src={onlineStore} alt="add a business" />
                <div className="menu-h4-container">
                  <div className="spacer" />
                  <h4>Add a business</h4>
                </div>
                {/* </Link> */}
              </div>
            </li>
            <li>
              <div className="second-row" onClick={handleYupForBusinessClick}>
                {/* <Link to="/add-business-as-owner"> */}
                <img src={checkIcon} alt="claim your business" />
                <div className="menu-h4-container">
                  <div className="spacer" />
                  <h4>Claim your business</h4>
                </div>
                {/* </Link> */}
              </div>
            </li>
          </ul>
        )}
      </div>
    );
  };

  const writeReviewNavLink = () => {
    const handleClick = () => {
      history.push("/search?write-review");
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

          <YupForBusinessMenu />
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

  const MinimalNavHeader = () => {
    return (
      <div id="minimal-nav-header-container">
        <div className="left-side">
          <NavLink exact className="homeLink" to="/">
            <div className="logo-container">
              <h1 id="logo">
                yup
                <span className="star">*</span>
              </h1>
            </div>
          </NavLink>
        </div>
        <div className="right-side">
          <div className="socials">
            <div id="github">
              <a
                href="https://www.github.com/evanryan/yup"
                target="_blank"
                rel="noreferrer"
              >
                <img src={githubLogoBlack} alt="GitHub repo" />
              </a>
            </div>
            <div id="linkedin">
              <a
                href="https://www.linkedin.com/in/evan-ryan-dev"
                target="_blank"
                rel="noreferrer"
              >
                <img src={linkedinLogoBlack} alt="LinkedIn page" />
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

  let headerType;
  if (["/login", "/signup"].includes(window.location.pathname)) {
    headerType = <FormHeader />;
  } else if (
    [
      "/write-a-review",
      "/add-business-as-owner",
      "/add-business-as-spocustomer"
    ].includes(window.location.pathname)
  ) {
    headerType = <MinimalNavHeader />;
  } else {
    headerType = <HomeNav />;
  }
  return <>{headerType}</>;
};

export default Navigation;
