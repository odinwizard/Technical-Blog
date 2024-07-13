import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
    const location = useLocation();
    const pathname = location.pathname;

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);
  
    return null; 
};

export default ScrollToTop;