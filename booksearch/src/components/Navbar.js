import React from 'react';
import { Link } from 'react-router-dom'
import './Navbar.css';

const Navbar = () => {
  return (
        <nav className='navbar'>
            <Link to='/' className='navbar-logo'>
                <i class="fa-solid fa-book-open"></i> <div className='vl'></div> BookQuest
            </Link>
            
            <ul className='navbar-buttons'>
                <input type='text' placeholder='Search...'></input>
                <li className='nav-item'>
                    <Link to='/'>
                        Home
                    </Link>
                </li>
                <li className='nav-item'>
                    <Link to='/about'>
                        About
                    </Link>
                </li>
                <li className='nav-item'>
                    <Link to='/login' className='login-button'>
                        Login
                    </Link>
                </li>
                <li className='nav-item'>
                    <Link to='/signup' className='signup-button'>
                        Signup
                    </Link>
                </li>
            </ul>
        </nav>
  )
}

export default Navbar