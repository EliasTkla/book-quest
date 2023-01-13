import React from 'react';
import './home.css';
import BookSlide from '../components/Book_Slide';

function home() {
  
  return (
    <div className='home-panel'>
    <div className='welcome-panel'>
      <div className='intro-text'>
        <h1>Keep a Log through your reading journey</h1>

        <p>Take control of your reading journey by keeping a 
          digital record of every book you read. Organize your 
          reading journey, explore new genres, and let our platform 
          guide you through your quest for new books. No more forgotten 
          titles or missed opportunities, start your next reading 
          adventure with confidence and convenience.
        </p>
      </div>
      <div className='home-image'>
        <img src={require('../assets/images/reading3.png')}  alt='illustration of girl reading book' />
      </div>
    </div>

    <div className='book-intro'>
      <h1>Start Here</h1>

      <BookSlide />
    </div>
    </div>
  )
}

export default home