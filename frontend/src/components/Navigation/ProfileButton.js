import { useState } from 'react';
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import useComponentVisible from '../../util/useComponentVisible';
import { useEscape } from '../../util';
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
  const { menuRef, toggleRef, isComponentVisible } = useComponentVisible(false);
  // const [initiallyClicked, setInitiallyClicked] = useState(false);
  // const [isMenuVisible, setIsMenuVisible] = [isComponentVisible, setIsComponentVisible];
  console.log(isComponentVisible);
  const [isMenuVisible, setIsMenuVisible] = useState(isComponentVisible);

  useEscape(() => {
    // console.log(isMenuVisible);
    if (isMenuVisible) setIsMenuVisible(false);
    // setInitiallyClicked(false);
  });

  // useEffect(() => {
  //   const closeIfEscape = (e) => {
  //     e.key === 'Escape' && setIsMenuVisible(false);
  //   };
  //   document.addEventListener('keydown', (e) => closeIfEscape(e));
  //   return () => {
  //     document.removeEventListener('keydown', (e) => closeIfEscape(e));
  //   };
  // }, [setIsMenuVisible]);

  // const toggleProfileMenu = () => {
  //   // setIsComponentVisible(!isComponentVisible);
  //   console.log(isMenuVisible);
  //   toggleComponent(isMenuVisible);
  //   // if (!isMenuVisible) {
  //   //   setIsMenuVisible(true);
  //   // } else {
  //   //   setIsMenuVisible(false);
  //   // }
  //   console.log(isMenuVisible);
  // };

  const handleLogoutClick = (e) => {
    logout(e);
  };

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  return (
    <div id='profile-menu-button' ref={toggleRef}>
      <div className='profile-image-container'>
        <Carrot />
      </div>
      {isMenuVisible && (
        <ul className='profile-dropdown' ref={menuRef}>
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
