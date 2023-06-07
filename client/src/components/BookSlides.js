import React, { useEffect, useState } from 'react';
import LeftArrow from '../assets/images/arrow-left-solid.svg';
import RightArrow from '../assets/images/arrow-right-solid.svg';
import BookCard  from './BookCard';
import Placeholder from '../components/Placeholder.js';
import '../pages/Styles/Books.css';
import './Styles/BookSlides.css';

export default function BookSlides (props) {
    const category = props.category;
    const bookData = props.bookData;
    const [loading, setLoading] = useState(true);

    useEffect (()=> {
      setTimeout(()=> setLoading(false), 1000);
    }, [])

    return (
        <>
            <div className='list-slider'>
                <h2>{category}</h2>
                <img src={RightArrow} alt='right arrow button' onClick={()=>{document.getElementById(category).scrollLeft += 700;}}/>
                <img src={LeftArrow} alt='left arrow button' onClick={()=>{document.getElementById(category).scrollLeft -= 700;}}/>
            </div>

            <div id={category} className='book-slide'>
                { loading ? (
                  <>
                    <Placeholder/>
                    <Placeholder/>
                    <Placeholder/>
                    <Placeholder/>
                    <Placeholder/>
                    <Placeholder/>
                    <Placeholder/>
                    <Placeholder/>
                    <Placeholder/>
                  </>
                ) : (
                  bookData.map((book) => {
                    let cover =  book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail;

                    if(cover !== undefined){
                      return (
                        <span key={book.id}>
                          <BookCard bookData={book} returnPage={'/explore'}/> 
                        </span> 
                      )
                    } else {
                      return null;
                    }
                  }) 
              )}
            </div>
        </> 
    )
}