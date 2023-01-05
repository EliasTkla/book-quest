import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/home.js';
import About from './pages/about.js';
import Search from './pages/search.js';

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='./pages/home' element={<Home/>}/>
        <Route path='./pages/about' element={<About/>}/>
        <Route path='./pages/search' element={<Search/>}/>
      </Routes>
    </BrowserRouter>

    
  )
}

export default AppRouter