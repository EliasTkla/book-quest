import React from 'react';
import { Link } from 'react-router-dom';
import BookStack from '../assets/images/reading-list.svg'
import './Styles/Home.css';

export default function Home() {

  return (
    <div className='home-panel'>
      <div className='text-content'>
        <h1>Start Your Reading Log Today</h1>

        <p>Keep a digital record of all your reading experiences, 
          from the books you've loved to the ones you couldn't quite 
          finish. Never forget the details of a story again and always 
          have a comprehensive list of books to choose from for your 
          next reading adventure. With BookQuest, embark on a journey 
          of new discoveries and start your quest for new books with ease 
          and convenience.</p><br/>
          
        <Link to="/signup">
          <button>Begin Now</button>
        </Link>
      </div>

      <img className='home-image' src={BookStack} alt="person by bookshelf"/>
    </div>
  )
}