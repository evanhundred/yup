import { useEffect } from 'react';

export const useEscape = (onEscape) => {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.keyCode === 27) onEscape();
    };
    window.addEventListener('keydown', handleEsc);
  }, [onEscape]);
};
