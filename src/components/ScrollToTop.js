import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);

        // disables scrolling only on the login and signup pages
        if (pathname === "/login" || pathname === "/signup") {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [pathname]);

    return null;
}

export default ScrollToTop;