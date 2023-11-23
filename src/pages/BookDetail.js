import { React, useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import $ from 'jquery';
import { useUserAuth } from '../context/UserAuthContext';
import './Styles/bookDetail.css';
import Loading from '../components/Loading';
import BookSlides from '../components/BookSlides';
import Rating from '../components/Rating';

export default function BookDetail() {

    const { currentUser, checkBookSaved, saveBook, removeBook } = useUserAuth();

    const [logStatus, setLogStatus] = useState(false);
    const [isLoading, setIsloading] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();
    const book = location.state.data;
    const categories = book.volumeInfo.categories ? book.volumeInfo.categories : book.volumeInfo.authors;

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
                <>


                    <div className="book-content">

                        <img src={"https://books.google.com/books/publisher/content/images/frontcover/" + book.id + "?fife=w800-h1000&source=gbs_api"} alt='Book cover' />

                        <div className='detail-container'>
                            <h1>{book.volumeInfo.title ? book.volumeInfo.title : "N/A"} </h1>

                            <h2>Author(s) - {book.volumeInfo.authors ? book.volumeInfo.authors : 'N/A'}</h2>

                            <Rating ratingValue={book.volumeInfo.averageRating} ratings={book.volumeInfo.ratingsCount} />

                            <div className='sub-detail-container'>
                                <button onClick={() => { editLog() }}>{logStatus ? <span>Saved</span> : <span>Save Book</span>}</button><span id='popup'></span><br />

                                <div>
                                    <h4>Publisher | <span>{book.volumeInfo.publisher ? book.volumeInfo.publisher : "N/A"}</span></h4>
                                    <h4>Publish Date | <span>{book.volumeInfo.publishedDate ? book.volumeInfo.publishedDate : "N/A"}</span></h4>
                                    <h4>Pages | <span>{book.volumeInfo.pageCount ? book.volumeInfo.pageCount : "N/A"}</span></h4>
                                    <h4>Genres | <span>{book.volumeInfo.categories ? book.volumeInfo.categories : "N/A"}</span></h4>
                                </div>

                                <p>{book.volumeInfo.description ? book.volumeInfo.description : 'Not Available'}</p>

                                <Link to={book.volumeInfo.previewLink ? book.volumeInfo.previewLink : "#"} target="_blank">Read More</Link>
                            </div>
                        </div>
                    </div>

                    <div className='related-books-list'>
                        <div className='similiar-books-title'>
                            <hr />
                            <h2>Similiar Books</h2>
                            <hr />
                        </div>

                        <BookSlides category={categories} sliders={false} currentBookId={book.id} />
                    </div>
                </>
            }
        </div>
    )
}