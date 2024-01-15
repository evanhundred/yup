import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import "./ProfileButton.css";
import profileIcon from "../../assets/images/profile.png";
import logoutButton from "../../assets/images/logout.png";

const Carrot = () => (
  <div
    className="profile-picture"
    style={{ color: "orange", fontSize: "40px" }}
  >
    <i className="fa-solid fa-carrot"></i>
  </div>
);

const ProfileButton = ({ user }) => {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  // const [clickIsInDropbox, setClickIsInDropbox] = useState(false);

  const openMenu = () => {
    // e.preventDefault();
    // console.log(showMenu);
    if (showMenu) return;
    setShowMenu(true);
  };

  const closeMenu = (e) => {
    // e.preventDefault();

    console.log(e);
    // if (
    //   e.target !== "ul.profile-dropdown" ||
    //   e.target === "li div.logout-button.profile-dropdown-row"
    // ) {
    setShowMenu(false);
  };

  useEffect(() => {
    if (!showMenu) return;

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogoutClick = (e) => {
    logout(e);
  };

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  // const preventDropdownClose = (e) => {
  //   console.log(e);
  //   if (e.target !== "div.logout-button.profile-dropdown-row") {
  //     // e.preventDefault();
  //     setClickIsInDropbox(true);
  //   }
  // };

  return (
    <div id="profile-menu-button">
      <div className="profile-image-container" onClick={(e) => openMenu(e)}>
        <Carrot />
      </div>
      {showMenu && (
        <ul
          className="profile-dropdown"
          // onClick={(e) => preventDropdownClose(e)}
        >
          <li className="user-options-container">
            {/* <a href="#"> */}
            <div className="first-row profile-dropdown-row">
              <div className="profile-icon">
                <img src={profileIcon} alt="your profile" />
              </div>
              <div className="profile-dropdown-option">
                <p>{user.name}</p>
              </div>
            </div>
            {/* </a> */}
          </li>
          <li className="logout-button-container">
            <div
              className="logout-button profile-dropdown-row"
              onClick={handleLogoutClick}
            >
              <div className="profile-icon">
                <img src={logoutButton} alt="logout" />
              </div>
              <div className="profile-dropdown-option">
                <p>Log Out</p>
              </div>
            </div>
          </li>
        </ul>
      )}
    </div>
  );
};

export default ProfileButton;
