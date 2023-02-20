import React from 'react';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { RequireAuth } from 'react-auth-kit';
import {  } from 'react-auth-kit';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Books from './pages/Books';
import MyLog from './pages/MyLog';
import BookDetail from './components/BookDetail';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import Error from './pages/error';

function App(){
  return (
    <div className='app-content'>
    <Router>
      <Navbar className="grid-item-1"/>
      
      <div className='grid-item-2'>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/books' element={<Books />}/>
          <Route path='/mylog' element={<RequireAuth loginPath='/login'>
              <MyLog />
            </RequireAuth>}/>
          <Route path='/bookdetail' element={<BookDetail />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/signup' element={<Signup />}/>
          <Route path='/profile' element={<RequireAuth loginPath='/login'>
              <Profile />
            </RequireAuth>}/>
          <Route path='*' element={<Error />}/>
        </Routes>
      </div>

      <Footer className="grid-item-3"/>
    </Router>
    </div>
  )
}

export default App;
