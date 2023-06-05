import React from 'react';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { RequireAuth } from 'react-auth-kit';
import {  } from 'react-auth-kit';
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Explore from './pages/Explore';
import MyLog from './pages/MyLog';
import BookDetail from './components/BookDetail';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import Error from './pages/error';

export default function App(){
  return (
    <Router>
      <Navbar/>
      
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/explore' element={<Explore />}/>
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
    </Router>
  )
}
