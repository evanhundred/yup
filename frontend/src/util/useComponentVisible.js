import { useRef, useEffect, useState } from 'react';
// import { useEscape } from '.'

const useComponentVisible = (initialIsVisible) => {
  const [isComponentVisible, setIsComponentVisible] = useState(initialIsVisible);
  const menuRef = useRef(null);
  const toggleRef = useRef(null);

  console.log('useComponentVisible');

  useEffect(() => {
    const handleClickOutside = (e) => {
      // console.log(e.target);
      if (toggleRef.current && toggleRef.current.contains(e.target)) {
        setIsComponentVisible(!isComponentVisible);
      } else if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsComponentVisible(false);
      }
    };
    const handleKeypress = (e) => {
      console.log(e);
      if (isComponentVisible && e.keyCode === 27) {
        // Escape key
        setIsComponentVisible(false);
      }
    };
    document.addEventListener('click', handleClickOutside, true);
    document.addEventListener('keydown', handleKeypress, true);

    return () => {
      document.removeEventListener('click', handleClickOutside, true);
      document.removeEventListener('keydown', handleKeypress, true);
    };
  }, [isComponentVisible]);

  // const toggleComponent = (activeState) => {
  //   setIsComponentVisible(!activeState);
  //   return isComponentVisible;
  // };

  return { menuRef, toggleRef, isComponentVisible };
};

export default useComponentVisible;
