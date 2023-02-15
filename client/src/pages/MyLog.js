import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { useIsAuthenticated } from 'react-auth-kit';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthUser } from 'react-auth-kit';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import './Styles/MyLog.css';

function MyLog() {

  const isAuthenticated = useIsAuthenticated();
  const authUser = useAuthUser();
  const navigate = useNavigate();  
  const [bookData, setBookData] = useState([]);
  const [logData, setLogData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [booksLogged, setBooksLogged] = useState();

  useEffect(() => {
    if(isAuthenticated()){
      const email = authUser().email;
      Axios.post('http://localhost:4000/books', {
        email: email,
      }).then((response) => {
        if(response.data.message){
          setBooksLogged(false);
          
          setTimeout(()=> {
            setIsLoading(false);
          }, 1000);
        } else { 
          setBooksLogged(true);
          setLogData(response.data.map(log => { return log.book_id; }));
          
          Axios.get("https://www.googleapis.com/books/v1/volumes?q=subject:fiction:&filter=ebooks&key=AIzaSyDQ8kCRJpt7BCr2_WoshbW57wBBd_ppMFE"+"&maxResults=40")
          .then(res=> setBookData(res.data.items)); 

          setTimeout(()=> {
            setIsLoading(false);
          }, 1000);
        }
      })
      .catch(err=>console.log(err));;
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <div className='mylog-page'>
      { isLoading ? <div id='loading'><h1>Grabbing your books...</h1><br/><img  src={require('../assets/images/loading.gif')} alt='loading gif' /> </div> :
      <>{booksLogged ? '' : <h2 id='no-logs'>Looks like you don't have any books logged</h2>}
      <span>
        {
          bookData.filter(book => logData.includes(book.id)).map((book) => {
            let cover = book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail;
            let bookId = book.id;
            let bookD = book;

            if(cover !== undefined){
              return (
                // <Link className='log-book' key={book.id} to='/bookdetail' state={{id: bookId, page: '/mylog', data: bookD}}>
                //   <img src={cover} alt='Book cover' />
                // </Link> 
                <Link key={bookId} className='log-book' to='/bookdetail' state={{id: bookId, page: '/books', data: bookD}}>
                <LazyLoadImage className='img-loader' src={cover}  effect='blur'/>
              </Link> 
              )
            }
          }) 
        }
      </span>  
      </>
      }
    </div>
  )
}

export default MyLog