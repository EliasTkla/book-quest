import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { useIsAuthenticated } from 'react-auth-kit';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthUser } from 'react-auth-kit';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import Error from '../assets/images/problem-image.svg';
import './Styles/MyLog.css';

function MyLog() {

  const isAuthenticated = useIsAuthenticated();
  const authUser = useAuthUser();
  const navigate = useNavigate();  
  const [logData, setLogData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [booksLogged, setBooksLogged] = useState();
  const [error, setError] = useState(false);

  useEffect(() => {
    if(isAuthenticated()){
      const email = authUser().email;
      Axios.post('https://bookquest.herokuapp.com/books', {
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

          setTimeout(()=> {
            setIsLoading(false);
          }, 2000);
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

  return (
    <div className='mylog-page'>
      { isLoading ? <div id='loading'><h1>Grabbing your books...</h1><img  src={require('../assets/images/loading.gif')} alt='loading gif' /> </div> :
      <>{booksLogged ? '' : <h2 id='no-logs'>Looks like you don't have any books logged</h2>}
      <span>
        { !error ?
          logData.map((book) => {
            return (
              <Link key={book} to='/bookdetail' state={{id: book, page: '/mylog'}}>
                <LazyLoadImage className='log-book' src={"https://books.google.com/books/publisher/content/images/frontcover/"+book+"?fife=w400-h600&source=gbs_api"}  effect='blur'/>
              </Link> 
            )
          }) 
          :<>
              <h2>Sorry, no books are currently available</h2>
              <img src={Error} alt='error' className='error-img'/>
            </>
        }
      </span>  
      </>
      }
    </div>
  )
}

export default MyLog
