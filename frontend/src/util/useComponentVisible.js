import { useRef, useEffect, useState } from 'react';

const useComponentVisible = (initialIsVisible) => {
  const [isComponentVisible, setIsComponentVisible] = useState(initialIsVisible);
  const menuRef = useRef(null);
  const toggleRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      // console.log(e.target);
      // console.log(menuRef.current);
      // console.log(menuRef.current && menuRef.current.contains(e.target));
      if (menuRef.current && menuRef.current.contains(e.target)) {
        return;
      } else if (toggleRef.current && toggleRef.current.contains(e.target)) {
        setIsComponentVisible(!isComponentVisible);
      } else {
        setIsComponentVisible(false);
      }
    };
    const handleKeypress = (e) => {
      // console.log(e);
      if (isComponentVisible && e.keyCode === 27) {
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

  return { menuRef, toggleRef, isComponentVisible };
};

export default useComponentVisible;
