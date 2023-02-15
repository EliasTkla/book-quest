import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSignOut } from 'react-auth-kit';
import { useNavigate } from 'react-router-dom';
import { useIsAuthenticated } from 'react-auth-kit';
import $ from 'jquery';
import './Styles/Navbar.css';

function Navbar() {
    
    const isAuthenticated = useIsAuthenticated();
    const signOut = useSignOut();
    const navigate = useNavigate();
    const [loggedIn, setLoggedIn] = useState(false);
    const [mobileMenuState, setMobileMenuState] = useState(false);
    const [screenWidth, setScreenWidth] = useState();

    const logout = () => {
        signOut();
        setLoggedIn(false);
        navigate("/login");
    } 

    useEffect(() => {
        if(isAuthenticated()){
            setLoggedIn(true);
        } else {
            setLoggedIn(false);
        }
    }, [isAuthenticated]);

    useEffect(()=> {
        if(window.location.pathname === "/books") {
            setTimeout(()=> {
                document.getElementById("navbar").style.paddingBottom = "90px";
                $("#search-bar").fadeIn(1000);
            }, 50);
            
        } else {
            setTimeout(()=> {
                document.getElementById("navbar").style.paddingBottom = "0px";
                $("#search-bar").fadeOut(50);
            }, 50);
        }

        window.addEventListener('resize', windowWidth);

        setTimeout(()=> {
            localStorage.removeItem("searchKey");
        }, 2 * 60 * 1000);        
    })

    function windowWidth () {
       setScreenWidth(window.innerWidth);
       if(screenWidth > 600 && mobileMenuState) {
            setMobileMenuState(!mobileMenuState);
        }
    };

    const toggleMobileMenu = () => {
        if(document.getElementById("mobile-links").style.display === "none" || document.getElementById("mobile-links").style.display === "" || document.getElementById("mobile-links").style.display === undefined ){
            setMobileMenuState(!mobileMenuState);
            document.getElementById("mobile-links").style.display = "block";
            document.getElementById("m-overlay").style.display = "block";

            setTimeout(()=> {
                document.getElementById("mobile-links").style.right = "0px";
            }, 50);

        } else {
            setMobileMenuState(!mobileMenuState);
            document.getElementById("mobile-links").style.right = "-400px";
            document.getElementById("m-overlay").style.display = "none";

            setTimeout(()=> {
                document.getElementById("mobile-links").style.display = "none";
            }, 500);
        }
        
    }

    return (
        <>
        <nav id='navbar'>
            <Link to='/' className='logo'>
                <i className="fa-solid fa-book-open"></i> BookQuest
            </Link>
                
            <div className='navbar-links'>
                <ul>
                    <li>
                        <Link className='navbutton' to='/books'>
                            Books
                        </Link>
                    </li>
                    {loggedIn && (
                        <li>
                            <Link className='navbutton' to='/mylog'>
                                My Log
                            </Link>
                        </li>
                     )}
                    {!loggedIn && (
                        <>
                            <li>
                                <Link className='navbutton' to='/login'>
                                    Login
                                </Link>
                            </li>
                            <li>
                                <Link className='navbutton' to='/signup' id='signup-button'>
                                    Sign up
                                </Link>
                            </li>
                        </>
                    )}
                    {loggedIn && (
                        <>
                            <li>
                                <Link to='/Profile' >
                                    <img id='user-icon' src={require('../assets/images/user-icon.png')} alt='user-icon' />
                                </Link>      
                            </li>
                            <li className='logoutbtn'>
                                <i className="fa-solid fa-right-from-bracket" onClick={()=> {logout()}}></i>
                            </li>   
                        </>
                    )}
                </ul>

                <div id='hamburger-icon' onClick={()=> {toggleMobileMenu()}}>
                    {mobileMenuState ? <i className="fa-solid fa-xmark"></i> : <i className="fa-solid fa-bars"></i>}
                </div>
            </div>
        </nav>

        { (screenWidth <= 600) &&
            <>
            <div id='mobile-links'>
                <ul>
                    <li>
                        <Link to='/books' onClick={()=> {toggleMobileMenu()}}>
                            Books
                        </Link>
                    </li>
                    {loggedIn && (
                        <li>
                            <Link to='/mylog' onClick={()=> {toggleMobileMenu()}}>
                                My Log
                            </Link>
                        </li>
                        )}
                    {!loggedIn && (
                        <>
                            <li>
                                <Link to='/login' onClick={()=> {toggleMobileMenu()}}>
                                    Login
                                </Link>
                            </li>
                            <li>
                                <Link to='/signup' onClick={()=> {toggleMobileMenu()}}>
                                    Sign up
                                </Link>
                            </li>
                        </>
                    )}
                    {loggedIn && (
                        <>
                            <li>
                                <Link to='/Profile' onClick={()=> {toggleMobileMenu()}}>
                                    <img id='m-user-icon' src={require('../assets/images/user-icon.png')} alt='user-icon' />
                                </Link>      
                            </li>
                            <li className='m-logoutbtn' onClick={()=> {toggleMobileMenu()}}>
                                <i className="fa-solid fa-right-from-bracket" onClick={()=> {logout()}}></i>
                            </li>   
                        </>
                    )}
                </ul>
            </div>
        
          <div id="m-overlay" onClick={()=> {toggleMobileMenu()}}></div> 
          </>
        }
        </>
    )
}

export default Navbar