import React from 'react';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/home';
import About from './pages/about';
import Search from './pages/search';
import Error from './pages/Error';

function App(){
  return (
    <Router>
      <div className='navbar-container'>
        <Navbar />
      </div>
      
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/about' element={<About />}/>
        <Route path='/search' element={<Search />}/>
        <Route path='*' element={<Error />}/>
      </Routes>

      <div className='footer-container'>
        <Footer />
      </div>
    </Router>
  )
}

export default App;
