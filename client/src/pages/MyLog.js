import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { useAuthUser } from 'react-auth-kit';
import Error from '../assets/images/bug.svg';
import BookCard  from '../components/BookCard.js';
import Placeholder from '../components/Placeholder.js';
import './Styles/MyLog.css';

export default function MyLog() {

  const authUser = useAuthUser();
  const [loggedBooks] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [noLogs, setNoLogs] = useState(false);
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
        
        response.data.map(log => { 
          Axios.get('https://www.googleapis.com/books/v1/volumes?q='+log.book_id+'&key=AIzaSyDQ8kCRJpt7BCr2_WoshbW57wBBd_ppMFE&maxResults=1')
          .then(res=> {
            setError(false);
            loggedBooks.push(res.data.items[0]);
          })
          .catch(err=> {
            console.log(err);
            setError(true);
          });

          return null;
        });  
      }
      console.log(loggedBooks);
      setTimeout(()=> setLoading(false), 3000);
      setError(false);
    })
    .catch(err=> {
      console.log(err);
      setError(true);
    });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function searchBook (search) {
    if(search !== ""){
      setLoading(true);

      var array = [];

      loggedBooks.filter(book => {
        let bk = book.volumeInfo.title;

        if(bk.toLowerCase().includes(search.toLowerCase())){
          array.push(book);
        }

        return null;
      })

      setSearchResults(array);
      
      setTimeout(()=> setLoading(false), 1000);
      setSearched(true);
    } else {
      setSearched(false);
    }
  }

  return (
    <div>
      <div id='search-container'>
        <input className='search-input-full-width' type="search" placeholder="Search title, author, genre ..." value={searchKey} onChange={e => setSearchKey(e.target.value)} onKeyDown={(e) => {if (e.key === 'Enter') {searchBook(searchKey)}}}/>
      </div>

    <div className='search-results'>
      {noLogs ? 
          <h3 id='no-logs'>You haven't logged any books yet, head to the explore page to start logging.</h3> 
        : 
          !error ?
            loading ?
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
                </>
              : 
                searched ?
                    searchResults.map((book) => {
                      let cover =  book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail;

                      if(cover !== undefined){
                        return (
                          <span key={book.id}>
                            <BookCard bookData={book} returnPage={'/mylog'}/> 
                          </span> 
                        )
                      } else {
                        return null;
                      }
                    }) 
                  :
                    loggedBooks.map((book) => {
                      let cover =  book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail;

                      if(cover !== undefined){
                        return (
                          <span key={book.id}>
                            <BookCard bookData={book} returnPage={'/mylog'}/> 
                          </span> 
                        )
                      } else {
                        return null;
                      }
                    })      
            :
              <span className='error-container'>
                <h3>Something went wrong, please refresh the page</h3>
                <img src={Error} alt='error'/>
              </span>  
      }
      </div>
    </div>
  )
}
