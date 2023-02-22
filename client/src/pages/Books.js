import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import $ from 'jquery';
import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import Error from '../assets/images/problem-image.svg';
import './Styles/Books.css';

function Books() {
  const [searchKey, setSearchKey] = useState('');
  const [bookData, setBookData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const searchT = localStorage.getItem("searchKey");

    if(searchT === undefined || !searchT) {
      Axios.get("https://www.googleapis.com/books/v1/volumes?q=subject:fiction&filter=ebooks&key=AIzaSyDQ8kCRJpt7BCr2_WoshbW57wBBd_ppMFE&maxResults=40")
      .then(res=> {
        setBookData(res.data.items);
        setError(false);
      })
      .catch(err=> {
        console.log(err);
        setError(true);
      });
    } else {
      Axios.get('https://www.googleapis.com/books/v1/volumes?q='+searchT+'&key=AIzaSyDQ8kCRJpt7BCr2_WoshbW57wBBd_ppMFE&maxResults=40')
      .then(res=> {
        setBookData(res.data.items);
        setError(false);
      })
      .catch(err=> {
        console.log(err);
        setError(true);
      });
    }

    setTimeout(()=> {
      $("#search-input").fadeIn(); 
      $("#search-button").fadeIn();
    }, 300);
    
    setTimeout(()=> {
      setIsLoading(false);
    }, 2000);
  }, []);

  const searchBook = (e) => {
    e.preventDefault();
    if(searchKey !== undefined) {
      setIsLoading(true);
      Axios.get('https://www.googleapis.com/books/v1/volumes?q='+searchKey+'&key=AIzaSyDQ8kCRJpt7BCr2_WoshbW57wBBd_ppMFE&maxResults=40')
      .then(res=> {
        setBookData(res.data.items);
        setError(false);
      })
      .catch(err=> {
        console.log(err);
        setError(true);
      });

      localStorage.setItem("searchKey", searchKey);

      setTimeout(()=> {
        setIsLoading(false);
      }, 1500);
    }
  }  

  return (
    <>
    <form id='search-bar'>
      <input id='search-input' type="text" placeholder="Title, author, genre, or keyword" value={searchKey} onChange={e => setSearchKey(e.target.value)} onKeyDown={(e) => {if (e.key === 'Enter') {searchBook(e)}}}/>
      <button id='search-button' className="fa-solid fa-magnifying-glass" onClick={(e)=> {searchBook(e)}}></button>
    </form>

    <div className='book-results'>
      { isLoading ? <div id='loading'><h1>Grabbing some books...</h1><br/><img  src={require('../assets/images/loading.gif')} alt='loading gif' /> </div> : 
        <span>
          { !error ?
            bookData.map((book) => {
              let cover = book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail;
              let bookId = book.id;
              let bookD = book;

              if(cover !== undefined){
                return (
                  <Link key={bookId} to='/bookdetail' state={{id: bookId, page: '/books', data: bookD}}>
                    <LazyLoadImage className='book' src={cover}  effect='blur'/>
                  </Link>  
                )
              } else {
                return null;
              }
            }) 
            :<>
              <h2>Sorry, no books are currently available</h2>
              <img src={Error} alt='error' />
            </>
          }
        </span>
      }
    </div>
    </>
  )
}

export default Books
