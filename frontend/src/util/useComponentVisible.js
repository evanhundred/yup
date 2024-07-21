import { useRef, useEffect, useState } from 'react';

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
    document.addEventListener('click', handleClickOutside, true);

    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [isComponentVisible]);

  // const toggleComponent = (activeState) => {
  //   setIsComponentVisible(!activeState);
  //   return isComponentVisible;
  // };

  return { menuRef, toggleRef, isComponentVisible };
};

export default useComponentVisible;
