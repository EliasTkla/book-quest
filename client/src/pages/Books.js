import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import BookSlides from '../components/BookSlides.js';
import Error from '../assets/images/bug.svg';
import LeftArrow from '../assets/images/angle-left.svg';
import RightArrow from '../assets/images/angle-right.svg';
import BookCard  from '../components/BookCard.js';
import Placeholder from '../components/Placeholder.js';
import './Styles/Books.css';

export default function Books() {
  const [searchKey, setSearchKey] = useState('');
  const [searched, setSearched] = useState(false);
  const [bookData, setBookData] = useState([]);
  const [bookData1, setBookData1] = useState([]);
  const [bookData2, setBookData2] = useState([]);
  const [bookData3, setBookData3] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    Axios.all([
        Axios.get('https://www.googleapis.com/books/v1/volumes?q=fiction&maxResults=15'),
        Axios.get('https://www.googleapis.com/books/v1/volumes?q=fantasy&maxResults=15'),
        Axios.get('https://www.googleapis.com/books/v1/volumes?q=history&maxResults=15')
    ])
    .then(res=> {
        setBookData1(res[0].data.items);
        setBookData2(res[1].data.items);
        setBookData3(res[2].data.items);

        setError(false);
    })
    .catch(err=> {
        console.log(err);
        setError(true);
    });
  }, []);

  function searchBook (search) {
    if(search !== ""){
      setLoading(true);
      
      Axios.get('https://www.googleapis.com/books/v1/volumes?q='+search+'&maxResults=40')
      .then(res=> {
        setBookData(res.data.items);
        setError(false);
      })
      .catch(err=> {
        console.log(err);
        setError(true);
      });

      setTimeout(()=> setLoading(false), 3000);
      setSearched(true);
    } else {
      setSearched(false);
    }
  }

  return (
    <>
      <div id='search-container'>
        <input className='search-input' type="search" placeholder="Search title, author, genre ..." value={searchKey} onChange={e => setSearchKey(e.target.value)} onKeyDown={(e) => {if (e.key === 'Enter') {searchBook(searchKey)}}}/>

        <div className='filter-container'>
          <img src={LeftArrow} alt='left arrow button' onClick={()=>{document.getElementById('filter-menu').scrollLeft -= 200;}}/>

          <div id='filter-menu'>
            <span onClick={()=>{searchBook('Fiction')}}>Fiction</span>
            <span onClick={()=>{searchBook('Crime')}}>Crime</span>
            <span onClick={()=>{searchBook('Science')}}>Science</span>
            <span onClick={()=>{searchBook('Poetry')}}>Poetry</span>
            <span onClick={()=>{searchBook('Health')}}>Health</span>
            <span onClick={()=>{searchBook('Education')}}>Education</span>
            <span onClick={()=>{searchBook('Philosophy')}}>Philosophy</span>
            <span onClick={()=>{searchBook('Religion')}}>Religion</span>
            <span onClick={()=>{searchBook('Travel')}}>Travel</span>
            <span onClick={()=>{searchBook('Music')}}>Music</span>
            <span onClick={()=>{searchBook('Art')}}>Art</span>
            <span onClick={()=>{searchBook('Cooking')}}>Cooking</span>
          </div>

          <img src={RightArrow} alt='right arrow button' onClick={()=>{document.getElementById('filter-menu').scrollLeft += 200;}}/>
        </div>
      </div>

      { !error ?
          !searched ?
            <>
              <BookSlides category={'Fiction'} bookData={bookData1}/>
              <BookSlides category={'Fantasy'} bookData={bookData2}/>
              <BookSlides category={'History'} bookData={bookData3}/>
            </>
          :
            <div className='search-results'>
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
                    <Placeholder/>
                    <Placeholder/>
                    <Placeholder/>
                    <Placeholder/>
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
                          <BookCard bookData={book}/> 
                        </span> 
                      )
                    } else {
                      return null;
                    }
                  }) 
              )}
            </div>
        :
          <span className='error-container'>
            <h2>Something went wrong, please refresh the page</h2>
            <img src={Error} alt='error'/>
          </span>
      }  
    </>
  )
}
