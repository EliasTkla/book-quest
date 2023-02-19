import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import $ from 'jquery';
import { Link } from 'react-router-dom';
import { useIsAuthenticated } from 'react-auth-kit';
import { useAuthUser } from 'react-auth-kit';
import { useLocation } from 'react-router-dom';
import Error from '../assets/images/problem-image.svg';
import './Styles/BookDetail.css';

function Books() {

  const isAuthenticated = useIsAuthenticated();
  const authUser = useAuthUser();
  const [bookData, setBookData] = useState([]);
  const [logStatus, setLogStatus] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [error, setError] = useState(false);
  const location = useLocation();
  const pageCall = location.state.page;
  const bookId = location.state.id;

  useEffect(() => {
    Axios.get("https://www.googleapis.com/books/v1/volumes/"+bookId)
    .then(res=> setBookData(res.data))
    .catch(err=> {
      console.log(err);
      setError(true);
    });

    if(isAuthenticated()) {
      const email = authUser().email;

      Axios.post('http://localhost:3001/booklogged', {
      email: email,
      bookId: bookId,
      }).then((response) => {
          if(response.data.message){
            setLogStatus(false);
          } else {
            setLogStatus(true);
          }
      })
      .catch(err=> {
        console.log(err);
        setError(true);
      });
        
    } else {
      setLogStatus(false);
    }
    
    setTimeout(()=> {
      setIsLoading(false);
    }, 2000);
  }, []);

  function togglePopup(text) {
    document.getElementById("popup").innerHTML = text;

    setTimeout(()=> {
      $("#popup").fadeIn(1000);   
      $("#popup").fadeOut(1000);
    },50) 
  }

  const editLog = () => {
    if(bookId !== undefined && bookId !== null) {
      if(isAuthenticated()) {
        const email = authUser().email;

        Axios.post('http://localhost:3001/editlog', {
          email: email,
          bookId: bookId,
        }).then((response) => {
          if(response.data.message){
            console.log(response.data.message);
          } else {
            if(response.data.message1) {
              setLogStatus(false);
              togglePopup("&emsp;"+response.data.message1);
            } else if(response.data.message2) {
              setLogStatus(true);
              togglePopup("&emsp;"+response.data.message2);
            }
          }
        })
        .catch(err=> {
          console.log(err);
          setError(true);
        });
      } else {
        togglePopup('&ensp;Login to log book');
      }
    } else {
      togglePopup('&ensp; Not able to edit log');
    }
  }

  function handleImageLoaded() {
    setImgLoaded(true);
  }

  return (
    <div className='book-page'>
      { isLoading ? <div id='loading'><h1>Grabbing book details...</h1><br/><img  src={require('../assets/images/loading.gif')} alt='loading gif' /> </div> : 
        <>
          { !error ?
              <div key={bookData.id} className="book-content">
                  { !imgLoaded &&
                    <div className='placeholder'></div>
                  }
                  
                  <img src={"https://books.google.com/books/publisher/content/images/frontcover/"+bookData.id+"?fife=w800-h1000&source=gbs_api"} alt='Book cover' onLoad={()=> {handleImageLoaded()}}/>
                  <Link to={pageCall}><i id='close' className="fa-regular fa-circle-left"></i></Link>

                  <h1>{bookData.volumeInfo.title} </h1><br/>
                  <h3>Author: {bookData.volumeInfo.authors}</h3><br/>

                  <Link id='preview' to={bookData.volumeInfo.previewLink} target="_blank">Preview</Link><br/><br/><br/>
                  <button id='logbtn' onClick={()=> {editLog()}}>{logStatus ? <i className="fa-solid fa-check"></i>: <i className="fa-solid fa-plus"></i>}<span id='popup'></span></button>
                  
                  <h4>Summary:</h4><br/>
                  <p>
                    {bookData.volumeInfo.description}
                  </p>  
              </div> 
            :<span className='error-content'>
              <h2>Sorry, something went wrong on our end.</h2>
              <img src={Error} alt='error' />
            </span>
          } 
        </>
      }
    </div>     
  )
}

export default Books