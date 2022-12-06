import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import HomeLogo from "./yelp_logo.png";

const Navigation = () => {
  const sessionUser = useSelector((state) => state.session.user);

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
  return (
    <ul>
      <li id="nav-bar">
        <NavLink exact className="homeLink" to="/">
          <img src={HomeLogo} alt="home" />
        </NavLink>
        <div id="session-links">{sessionLinks}</div>
      </li>
    </ul>
  );
};

export default Navigation;
