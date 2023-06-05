import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { useAuthUser } from 'react-auth-kit';
import Error from '../assets/images/bug.svg';
import BookCard  from '../components/BookCard.js';
import Placeholder from '../components/Placeholder.js';
import './Styles/MyLog.css';

export default function MyLog() {

  const authUser = useAuthUser();
  const [loggedBooks, setLoggedBooks] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [noLogs, setNoLogs] = useState(true);
  const [searchKey, setSearchKey] = useState('');
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const email = authUser().email;

    Axios.post('https://bookquest.herokuapp.com/books', {
      email: email,
    }).then((response) => {
      if(response.data.message){
        setNoLogs(true);
      } else { 
        setNoLogs(false);  
        
        setLoggedBooks(response.data.map(log => {
          let book = [];
          Axios.get('https://www.googleapis.com/books/v1/volumes?q='+log.book_id+'&key=AIzaSyDQ8kCRJpt7BCr2_WoshbW57wBBd_ppMFE')
          .then(res=> {
            setError(false);
            book = res.data;
          })
          .catch(err=> {
            console.log(err);
            setError(true);
          });

          return book;
        }));
      }

      setError(false);
    })
    .catch(err=> {
      console.log(err);
      setError(true);
    });
  }, [authUser]);


  function searchBook (search) {
    if(search !== ""){
      setLoading(true);

      let array = [];

      loggedBooks.filter(book => book.volumeInfo.title === search).map(filteredBook => {
          array.push(filteredBook);

        return null;
      })

      setSearchResults(array);

      setTimeout(()=> setLoading(false), 3000);
      setSearched(true);
    } else {
      setSearched(false);
    }
  }

  return (
    <div className='mylog-page'>
      <div id='search-container'>
        <input className='search-input' type="search" placeholder="Search title, author, genre ..." value={searchKey} onChange={e => setSearchKey(e.target.value)} onKeyDown={(e) => {if (e.key === 'Enter') {searchBook(searchKey)}}}/>
      </div>

      {!noLogs ? '' : <h2 id='no-logs'>You haven't logged any books yet, head to the explore page to find some books.</h2>}

      { !error ?
          !searched ?
            searchResults.map((book) => {
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
                  loggedBooks.map((book) => {
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
        :
          <span className='error-container'>
            <h2>Something went wrong, please refresh the page</h2>
            <img src={Error} alt='error'/>
          </span>
      }  
    </div>
  )
}
