import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import $ from 'jquery';
import { Link } from 'react-router-dom';
import { useIsAuthenticated } from 'react-auth-kit';
import { useAuthUser } from 'react-auth-kit';
import { useLocation } from 'react-router-dom';
import Error from '../assets/images/bug.svg';
import LeftArrow from '../assets/images/arrow-left-solid.svg';
import './Styles/BookDetail.css';

export default function Books() {

  const isAuthenticated = useIsAuthenticated();
  const authUser = useAuthUser();
  const [logStatus, setLogStatus] = useState();
  const [error, setError] = useState(false);
  const location = useLocation();
  const pageCall = location.state.page;
  const bookId = location.state.id;
  const bookTitle = location.state.title;
  const bookAuthor = location.state.author;
  const previewLink = location.state.preview;
  const summary = location.state.description;

  useEffect(() => {
    if(isAuthenticated()) {
      const email = authUser().email;

      Axios.post('https://bookquest.herokuapp.com/booklogged', {
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
  }, [authUser, isAuthenticated, bookId]);

  useEffect(() => {

  });

  function togglePopup(text) {
    document.getElementById("popup").innerHTML = text;

    setTimeout(()=> {
      $("#popup").fadeIn(1000);   
      $("#popup").fadeOut(1500);
    },50) 
  }

  const editLog = () => {
    if(bookId !== undefined && bookId !== null) {
      if(isAuthenticated()) {
        const email = authUser().email;

        Axios.post('https://bookquest.herokuapp.com/editlog', {
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
        togglePopup('&ensp; Login to save books');
      }
    } else {
      togglePopup('&ensp; Unable to remove saved book ');
    }
  }

  return (
    <div className='book-page'>
        { !error ?
            <div className="book-content">
              <img src={"https://books.google.com/books/publisher/content/images/frontcover/"+bookId+"?fife=w800-h1000&source=gbs_api"} alt='Book cover' />
          
              <Link id='close' to={pageCall}><img src={LeftArrow} alt='left arrow button' /></Link>
              <h1>{bookTitle} </h1>
              <h3>By {bookAuthor}</h3>
              <Link id='preview' to={previewLink} target="_blank">Preview</Link><br/><br/>
              
              <div className='detail-container'>
                <button id='logbtn' onClick={()=> {editLog()}}>{logStatus ? <i>Saved</i>: <i>Save Book</i>}</button><span id='popup'></span><br/>
                <br/>
                <h4>Summary:</h4>
                <p>{summary}</p>  
              </div>
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