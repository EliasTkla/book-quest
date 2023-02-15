import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import Bookshelf from '../assets/images/bookshelf.svg'
import Bookmark from '../assets/images/bookmark.svg';
import Book from '../assets/images/book.svg';
import './Styles/Home.css';

function Home() {

  useEffect(()=> {
    $(".text-content").fadeIn(2000); 
    $(".home-image").fadeIn(4000); 
  })
  
  return (
    <div className='home-panel'>
      <div className='text-content'>
        <h1>Your reading log start's today</h1><br/>
        <p>Keep a digital record of all your reading experiences, 
          from the books you've loved to the ones you couldn't quite 
          finish. Never forget the details of a story again and always 
          have a comprehensive list of books to choose from for your 
          next reading adventure. With our platform, embark on a journey 
          of new discoveries and start your quest for new books with ease 
          and convenience.</p><br/>
        <Link to="/signup">
          <button>Search Now</button>
        </Link>
      </div>

      <img className='home-image' src={Bookshelf} alt="person by bookshelf"/>
    
      <div className='book-showcase'>
        <h2>Featured Books</h2>
        <div className='book-slide'>
          <img src={require('../assets/images/book.jpeg')}/>
          <img src={require('../assets/images/book.jpeg')}/>
          <img src={require('../assets/images/book.jpeg')}/>
          <img src={require('../assets/images/book.jpeg')}/>
          <img src={require('../assets/images/book.jpeg')}/>
        </div>
      </div>

      <img className='home-image2' src={Bookmark} alt="person holding plus sign"/>
      
      <div className='quote-content'>
        <h2>Reading is not just a journey, it's an odyssey. 
          You never know where it will take you or what wonders 
          you will discover along the way.</h2>
      </div>
    </div>
  )
}

export default Home