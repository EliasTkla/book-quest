import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import './Styles/Books.css';

function Books() {
  const [searchKey, setSearchKey] = useState('');
  const [bookData, setBookData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const searchT = localStorage.getItem("searchKey");

  useEffect(() => {
    if(searchT === undefined || !searchT || searchT === "") {
      Axios.get("https://www.googleapis.com/books/v1/volumes?q=subject:fiction&filter=ebooks&key=AIzaSyDQ8kCRJpt7BCr2_WoshbW57wBBd_ppMFE"+"&maxResults=40")
      .then(res=> setBookData(res.data.items))
      .catch(err=>console.log(err));
    } else {
      setSearchKey(searchT);
      Axios.get('https://www.googleapis.com/books/v1/volumes?q='+searchT+'&key=AIzaSyDQ8kCRJpt7BCr2_WoshbW57wBBd_ppMFE'+'&maxResults=40')
      .then(res=> setBookData(res.data.items))
      .catch(err=>console.log(err));
    }

       

    setTimeout(()=> {
      setIsLoading(false);
    }, 1500);
  }, [searchT]);

  const searchBook = () => {
    if(searchKey !== undefined || searchKey !== "") {
      setIsLoading(true);
      Axios.get('https://www.googleapis.com/books/v1/volumes?q='+searchKey+'&key=AIzaSyDQ8kCRJpt7BCr2_WoshbW57wBBd_ppMFE'+'&maxResults=40')
      .then(res=> setBookData(res.data.items))
      .catch(err=>console.log(err));

      localStorage.setItem("searchKey", searchKey);

      setTimeout(()=> {
        setIsLoading(false);
      }, 1500);
    }
    
  }  

  return (
    <>
    <div id='search-bar'>
      <input type="text" placeholder="Search by title, author, genre, or keyword" value={searchKey} onChange={e => setSearchKey(e.target.value)} onKeyDown={event => {if (event.key === 'Enter') {searchBook()}}}/>
      <button onClick={()=> {searchBook()}}><i className="fa-solid fa-magnifying-glass"></i></button>
    </div>

    <div className='book-results'>
      { isLoading ? <div id='loading'><h1>Grabbing some books...</h1><br/><img  src={require('../assets/images/loading.gif')} alt='loading gif' /> </div> : 
        <span>
          { 
            bookData.map((book) => {
              let cover = book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail;
              let bookId = book.id;
              let bookD = book;

              if(cover !== undefined){
                return (
                  <Link key={bookId} className='book' to='/bookdetail' state={{id: bookId, page: '/books', data: bookD}}>
                    <LazyLoadImage className='img-loader' src={cover}  effect='blur'/>
                  </Link>  
                )
              }
            }) 
          }
        </span>
      }
    </div>
    </>
  )
}

export default Books