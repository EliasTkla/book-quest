import React from 'react';
import { Link } from 'react-router-dom';
import Bookshelf from '../assets/images/bookshelf.svg'
import Bookmark from '../assets/images/bookmark.svg';
import './Styles/Home.css';

function Home() {
  
  return (
    <div className='home-panel'>
      <div className='text-content'>
        <h1>Your reading log start's today</h1>
        <p>Keep a digital record of all your reading experiences, 
          from the books you've loved to the ones you couldn't quite 
          finish. Never forget the details of a story again and always 
          have a comprehensive list of books to choose from for your 
          next reading adventure. With this platform, embark on a journey 
          of new discoveries and start your quest for new books with ease 
          and convenience.</p><br/>
        <Link to="/signup">
          <button>Search Now</button>
        </Link>
      </div><br/>

      <img className='home-image' src={Bookshelf} alt="person by bookshelf"/>

      <img className='home-image2' src={Bookmark} alt="person holding plus sign"/>
      
      
      <div className='quote-content'>
        <p>Reading books is not just a form of entertainment, but an adventure
           in itself. Through books, we can visit different places, meet new 
           people, and learn new things. Reading also stimulates the mind, 
           expands our vocabulary, and improves our critical thinking skills. 
           It is a great way to relax and escape from the stresses of daily 
           life, and also helps us develop empathy and understanding towards 
           others. Whether you prefer fiction or non-fiction, reading books is 
           a rewarding experience that can enrich our lives in countless ways.</p>
      </div>
    </div>
  )
}

export default Home