import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Mobile_Navbar.css';

function Mobile_Navbar() {

    const [toggleMobileMenu, setToggleMobileMenu] = useState(false)
    const [toggleOverlay, setToggleOverlay] = useState(false)
    const [toggleIcon, setToggleIcon] = useState(false)
    const [toggleButtons, setToggleButtons] = useState(true)

    const toggleNav = () => {
        setToggleMobileMenu(!toggleMobileMenu)
        setToggleOverlay(!toggleOverlay)
    }

    const toggleProfile = () => {
        setToggleIcon(!toggleIcon)
    }    

    const toggleUserButtons = () => {
        setToggleButtons(!toggleButtons)
    }

    return (
        <>
            <nav className='mobile-navbar'>
                <Link to='/' className='mobile-logo'>
                    <i className="fa-solid fa-book-open"></i> BookQuest
                </Link>
                
                <Link to='#' className='toggle-button' onClick={toggleNav}>
                    <span className='bar'></span>
                    <span className='bar'></span>
                    <span className='bar'></span> 
                </Link>
            </nav>

            {toggleMobileMenu && (
                <div className='wrapper'>
                <div className='navbar-links-mobile'>
                    <ul>
                        <li>
                            <Link to='/books'>
                                Books
                            </Link>
                        </li>
                        {toggleIcon && (
                        <li>
                            <Link to='/mylog'>
                                My Log
                            </Link>
                        </li>
                        )}
                        {toggleButtons && (
                        <>
                        <li>
                            <Link to='/login' onClick={toggleProfile} className='divider'>
                                Login
                            </Link>
                        </li>
                        <li >
                            <Link to='/signup' id='signup-button2'>
                                Sign up
                            </Link>
                        </li>
                        </>
                        )}
                        {toggleIcon && (
                            <li>
                                <Link to='/profile' onClick={toggleUserButtons}>
                                    <img className='user-icon-mobile' src={require('../assets/images/user-icon.png')} alt='user-icon' />
                                </Link>
                            </li>
                        )}
                    </ul>
                </div>
                </div>
            )}

            {toggleOverlay && (<div onClick={toggleNav} className='overlay'></div>)}
        </>
  )
}

export default Mobile_Navbar