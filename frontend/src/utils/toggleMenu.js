const toggleMenu = (initiallyClicked, setInitiallyClicked, isComponentVisible, setIsComponentVisible) => {
  if (initiallyClicked) {
    setInitiallyClicked(false);
  } else if (!isComponentVisible) {
    setInitiallyClicked(true);
    setIsComponentVisible(true);
    return isComponentVisible;
  }
};

export default toggleMenu;
