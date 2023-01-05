import React from 'react'
import './Welcomepanel.css';

function Welcomepanel() {
  return (
    <div className='welcome-container'>
        <div className='inner-container'>
            <h1>Welcome to BookQuest! 
            We are excited to offer you a convenient and easy 
            way to discover new books and keep track of your 
            reading. With our vast selection and customizable 
            features, you'll be able to find the perfect book 
            for any occasion and keep track of your progress 
            with ease. Whether you're a casual reader or a 
            bookworm, our website has something for you. We 
            hope you enjoy using our website and finding your 
            next great read. Happy reading!</h1> 
        
            <img src={require('../assets/images/book.png')} alt='an open book' />
        </div>
    </div>
  )
}

export default Welcomepanel