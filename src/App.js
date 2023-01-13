import React, { useState, useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import './App.css';
import DesktopNavbar from './components/Desktop_Navbar';
import MobileNavbar from './components/Mobile_Navbar';
import Footer from './components/Footer';
import Home from './pages/home';
import Books from './pages/books';
import MyLog from './pages/mylog';
import Login from './pages/login';
import Signup from './pages/signup';
import Profile from './pages/profile';
import Error from './pages/error';

function App(){

  const [screenWidth, setScreenWidth] = useState(window.innerWidth)

  useEffect(() => {

    const changeWidth = () => {
        setScreenWidth(window.innerWidth)
    }

    window.addEventListener('resize', changeWidth)

    return () => {
        window.removeEventListener('resize', changeWidth)
    }

  })

  return (
    
    <Router>
      <div className='navbar-container'>
        {screenWidth > 700 && (
          <DesktopNavbar />
        )}

        {screenWidth < 700 && (
          <MobileNavbar />
        )}
      </div>
      
      <div className='body-container'>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/books' element={<Books />}/>
          <Route path='/mylog' element={<MyLog />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/signup' element={<Signup />}/>
          <Route path='/profile' element={<Profile />}/>
          <Route path='*' element={<Error />}/>
        </Routes>
      </div>

      <Footer />
    </Router>
  )
}

export default App;
