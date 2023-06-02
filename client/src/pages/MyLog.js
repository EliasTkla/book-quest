import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { useIsAuthenticated } from 'react-auth-kit';
import { useNavigate } from 'react-router-dom';
import { useAuthUser } from 'react-auth-kit';
import Error from '../assets/images/bug.svg';
import BookCard  from '../components/BookCard.js';
import Placeholder from '../components/Placeholder.js';
import './Styles/MyLog.css';

export default function MyLog() {

  const isAuthenticated = useIsAuthenticated();
  const authUser = useAuthUser();
  const navigate = useNavigate();  
  const [booksId, setBooksId] = useState([]);
  const [booksData, setBooksData] = useState([]);
  const [booksLogged, setBooksLogged] = useState();
  const [searchKey, setSearchKey] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);


  useEffect(() => {
    if(isAuthenticated()){
      const email = authUser().email;
      Axios.post('https://bookquest.herokuapp.com/books', {
        email: email,
      }).then((response) => {
        if(response.data.message){
          setBooksLogged(false);
        } else { 
          setBooksLogged(true);
          setBooksId(response.data.map(log => { return log.book_id; }));
        }

        setError(false);
      })
      .catch(err=> {
        console.log(err);
        setError(true);
      });
    } else {
      navigate("/login");
    }
  }, [authUser, isAuthenticated, navigate]);

  const loadBooks = () => {
    let array = [];

    for(let i = 0; i < booksId.length; i++){
      booksId.map((id) => {
        Axios.get('https://www.googleapis.com/books/v1/volumes?q='+id+'&maxResults=40')
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
      
    }

    setBooksData(array);
  }

  function searchBook (search) {
    if(search !== ""){
      setLoading(true);

      let array = [];

      for(let i = 0; i < booksData.length; i++){
        booksData.map((book) => {
          if(book.volumeInfo.title === search){
            array.push(book);
          }

          return null;
        })
      }

      setBooksData(array);

      setTimeout(()=> setLoading(false), 3000);
    }
  }

  return (
    <div className='mylog-page'>
      <input className='search-input' type="search" placeholder="Search title, author, genre ..." value={searchKey} onChange={e => setSearchKey(e.target.value)} onKeyDown={(e) => {if (e.key === 'Enter') {searchBook(searchKey)}}}/>
      
      {booksLogged ? loadBooks() : <span id='no-logs'><h2 >You haven't logged any books, head to the Explore page to start</h2></span>}
      <span>
      { !error ?
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
      </span>  
    </div>
  )
}
