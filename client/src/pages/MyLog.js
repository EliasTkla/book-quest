import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { useAuthUser } from 'react-auth-kit';
import Error from '../assets/images/bug.svg';
import BookCard  from '../components/BookCard.js';
import Placeholder from '../components/Placeholder.js';
import './Styles/MyLog.css';

export default function MyLog() {

  const authUser = useAuthUser();
  const email = authUser().email;
  const [booksId, setBooksId] = useState([]);
  const [booksData, setBooksData] = useState([]);
  const [booksLogged, setBooksLogged] = useState(false);
  const [searchKey, setSearchKey] = useState('');
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    Axios.post('https://bookquest.herokuapp.com/books', {
      email: email,
    }).then((response) => {
      if(response.data.message){
        setBooksLogged(false);
      } else { 
        setBooksLogged(true);

        setBooksId(response.data);  
        
        let array = [];

        booksId.map((log) => {
          Axios.get('https://www.googleapis.com/books/v1/volumes?q='+log.book_id)
          .then(res=> {
            array.push(res.data.items[0]);
            setError(false);
          })
          .catch(err=> {
            console.log(err);
            setError(true);
          });

          return null;
        })

        setBooksData(array);
      }

      setError(false);
    })
    .catch(err=> {
      console.log(err);
      setError(true);
    });
  }, [email, booksId]);

  function searchBook (search) {
    if(search !== ""){
      setLoading(true);

      let array = [];

      booksData.filter(book => book.volumeInfo.title === search).map(filteredBook => {
          array.push(filteredBook);

        return null;
      })

      setBooksData(array);

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

      {booksLogged ? '' : <h2 id='no-logs'>Looks like you don't have any books logged</h2>}

      { !error ?
          !searched ?
            booksData.map((book) => {
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
                  booksData.map((book) => {
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
