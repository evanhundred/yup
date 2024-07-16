import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import './ProfileButton.css';
import profileIcon from '../../assets/images/profile.png';
import logoutButton from '../../assets/images/logout.png';

const Carrot = () => (
  <div className='profile-picture' style={{ color: 'orange', fontSize: '40px' }}>
    <i className='fa-solid fa-carrot'></i>
  </div>
);

const ProfileButton = ({ user }) => {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const dropdownRef = useRef(null);

  const toggleMenu = (e) => {
    console.log(dropdownRef);
    console.log(e.target);

    // if (!showMenu) {
    //   document.addEventListener('click', toggleMenu);
    // } else {
    //   document.removeEventListener('click', toggleMenu);
    // }

    if (!showMenu) {
      setShowMenu(true);
      document.addEventListener('click', toggleMenu);
    } else if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      console.log('ok');
      document.removeEventListener('click', toggleMenu);
      setShowMenu(false);
    }
    // console.log(dropdownRef);
    // if (!showMenu || !dropdownRef.current.contains(e.target)) {
    //   setShowMenu(!showMenu);
    //   console.log(showMenu);
    //   if (showMenu) {
    //     console.log(dropdownRef);
    //     document.addEventListener('click', toggleMenu);
    //   }
    // }
  };

  // const openMenu = () => {
  //   if (showMenu) return;
  //   setShowMenu(true);
  // };

  // const closeMenu = (e) => {
  //   if (!dropdownRef.current.contains(e.target)) {
  //     setShowMenu(false);
  //   }
  // };

  // useEffect(() => {
  //   if (!showMenu) return;

  //   document.addEventListener("click", closeMenu);

  //   return () => document.removeEventListener("click", closeMenu);
  // }, [showMenu]);

  const handleLogoutClick = (e) => {
    logout(e);
  };

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  return (
    <div id='profile-menu-button'>
      <div className='profile-image-container' onClick={toggleMenu}>
        <Carrot />
      </div>
      {showMenu && (
        <ul className='profile-dropdown' ref={dropdownRef}>
          <li className='user-options-container'>
            <div className='first-row profile-dropdown-row'>
              <div className='profile-icon'>
                <img src={profileIcon} alt='your profile' />
              </div>
              <div className='profile-dropdown-option'>
                <p>{user.name}</p>
              </div>
            </div>
          </li>
          <li className='logout-button-container'>
            <div className='logout-button profile-dropdown-row' onClick={handleLogoutClick}>
              <div className='profile-icon'>
                <img src={logoutButton} alt='logout' />
              </div>
              <div className='profile-dropdown-option'>
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
