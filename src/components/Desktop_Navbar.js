import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Desktop_Navbar.css';

function Desktop_Navbar() {
    
    const [toggleIcon, setToggleIcon] = useState(false)
    const [toggleButtons, setToggleButtons] = useState(true)

    const toggleProfile = () => {
        setToggleIcon(!toggleIcon)
    }    

    const toggleUserButtons = () => {
        setToggleButtons(!toggleButtons)
    }

    return (
        <nav className='desktop-navbar'>
            <Link to='/' className='logo'>
                <i className="fa-solid fa-book-open"></i> BookQuest
            </Link>

            <div className='navbar-links'>
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
                        <Link to='/login' onClick={toggleProfile}>
                            Login
                        </Link>
                    </li>
                    <li >
                        <Link to='/signup' id='signup-button'>
                            Sign up
                        </Link>
                    </li>
                    </>
                    )}
                    {toggleIcon && (
                        <li>
                            <Link to='/profile' onClick={toggleUserButtons}>
                                <img className='user-icon' src={require('../assets/images/user-icon.png')} alt='user-icon' />
                            </Link>
                        </li>
                    )}
                </ul>
            </div>
        </nav>
    )
}

export default Desktop_Navbar