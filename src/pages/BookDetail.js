import { React, useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import $ from 'jquery';
import { useUserAuth } from '../context/UserAuthContext';
import './Styles/bookDetail.css';
import Loading from '../components/Loading';

export default function BookDetail() {

    const { currentUser, checkBookSaved, saveBook, removeBook } = useUserAuth();

    const [logStatus, setLogStatus] = useState(false);
    const [isLoading, setIsloading] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();
    const book = location.state.data;

    // Effect to check if the book is saved by the current user
    useEffect(() => {
        const checkIfSaved = async () => {
            try {
                const state = await checkBookSaved(currentUser.uid, book.id);
                setLogStatus(state);
            } catch (error) {
                console.log(error);
                setLogStatus(false);
            }
        }

        setTimeout(() => {
            if (!book) {
                navigate("/");
            } else {
                setIsloading(false);
            }
        }, 1000);

        if (currentUser) {
            checkIfSaved();
        } else {
            setLogStatus(false);
        }
    }, [currentUser, book, checkBookSaved, navigate]);

    // Function to toggle and display a popup message
    function togglePopup(text) {
        document.getElementById("popup").innerHTML = text;

        setTimeout(() => {
            $("#popup").fadeIn(1000);
            $("#popup").fadeOut(1500);
        }, 50)
    }

    // Function to add or remove the book from the user's saved list
    const editLog = async () => {
        if (currentUser) {
            if (logStatus) {
                // Removing the book if it's already saved
                try {
                    await removeBook(currentUser.uid, book.id);
                    setLogStatus(false);
                    togglePopup("&emsp; book removed!");
                } catch (error) {
                    console.log(error);
                    setLogStatus(false);
                    togglePopup("&emsp; unable to remove book!");
                }
            } else {
                // Saving the book if it's not saved
                try {
                    await saveBook(currentUser.uid, book.id);
                    setLogStatus(true);
                    togglePopup("&emsp; book saved!");
                } catch (error) {
                    console.log(error);
                    setLogStatus(false);
                    togglePopup("&emsp; unable to save book!");
                }
            }
        } else {
            // Displaying a message if the user is not logged in
            togglePopup('&ensp; Login to save books');
        }
    }

    return (
        <div className='page-container'>
            {isLoading ?
                <Loading />
                :
                <div className="book-content">

                    <img src={"https://books.google.com/books/publisher/content/images/frontcover/" + book.id + "?fife=w800-h1000&source=gbs_api"} alt='Book cover' />

                    <div className='detail-container'>
                        <h1>{book.volumeInfo.title ? book.volumeInfo.title : "N/A"} </h1>

                        <h3>By {book.volumeInfo.authors ? book.volumeInfo.authors : 'N/A'}</h3>

                        <div className="rating" >
                            <input type="radio" id="star5" name="rate" value="5" defaultChecked={book.volumeInfo.averageRating === 5} />
                            <label htmlFor="star5" title="text">5 stars</label>
                            <input type="radio" id="star4" name="rate" value="4" defaultChecked={book.volumeInfo.averageRating === 4} />
                            <label htmlFor="star4" title="text">4 stars</label>
                            <input type="radio" id="star3" name="rate" value="3" defaultChecked={book.volumeInfo.averageRating === 3} />
                            <label htmlFor="star3" title="text">3 stars</label>
                            <input type="radio" id="star2" name="rate" value="2" defaultChecked={book.volumeInfo.averageRating === 2} />
                            <label htmlFor="star2" title="text">2 stars</label>
                            <input type="radio" id="star1" name="rate" value="1" defaultChecked={book.volumeInfo.averageRating === 1} />
                            <label htmlFor="star1" title="text">1 star</label>
                        </div>

                        <div className='sub-detail-container'>
                            <button onClick={() => { editLog() }}>{logStatus ? <span>Saved</span> : <span>Save Book</span>}</button><span id='popup'></span><br />

                            <br />

                            <Link to={book.volumeInfo.previewLink ? book.volumeInfo.previewLink : "#"} target="_blank">Read</Link>

                            <br />

                            <h4>Genres: {book.volumeInfo.categories ? book.volumeInfo.categories : "N/A"}</h4>

                            <h4>Pages: {book.volumeInfo.pageCount ? book.volumeInfo.pageCount : "N/A"}</h4>

                            <h4>Summary:</h4>
                            <p>{book.volumeInfo.description ? book.volumeInfo.description : 'Not Available'}</p>
                        </div>
                    </div>
                </div>
            }

        </div>
    )
}