import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { useAuthUser } from 'react-auth-kit';
import Error from '../assets/images/bug.svg';
import BookCard from '../components/BookCard.js';
import Placeholder from '../components/Placeholder.js';
import './Styles/MyLog.css';

export default function MyLog() {

    const authUser = useAuthUser();
    const [loggedBooks, setLoggedBooks] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [noLogs, setNoLogs] = useState(false);
    const [searchKey, setSearchKey] = useState('');
    const [searched, setSearched] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (!window.localStorage.getItem("myLog-recentSearch") && window.localStorage.getItem("myLog-recentSearch") !== undefined) {
            setSearched(false);

            loadLoggedBooks();
        } else {
            setSearchResults(JSON.parse(window.localStorage.getItem("myLog-recentSearch")));
            setSearchKey(window.localStorage.getItem("myLog-searchKey"));

            setSearched(true);
            setLoading(false);

            if (window.localStorage.getItem("scrollTo")) {
                var scrollY = window.localStorage.getItem("scrollTo");

                window.scrollTo(0, scrollY);
            }
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function loadLoggedBooks() {
        if (window.localStorage.getItem("myLogs") && window.localStorage.getItem("myLogs") !== undefined && window.localStorage.getItem("myLogs") !== []) {
            setLoggedBooks(JSON.parse(window.localStorage.getItem("myLogs")));
            setLoading(false);
        } else {
            const email = authUser().email;

            Axios.post('https://bookquest.herokuapp.com/books', {
                email: email,
            }).then((response) => {
                if (response.data.message) {
                    setNoLogs(true);
                } else {
                    setNoLogs(false);

                    response.data.map(log => {
                        Axios.get('https://www.googleapis.com/books/v1/volumes?q=' + log.book_id + '&key=' + process.env.REACT_APP_API_KEY + '&maxResults=1')
                            .then(res => {
                                setError(false);
                                loggedBooks.push(res.data.items[0]);
                            })
                            .catch(err => {
                                console.log(err);
                                setError(true);
                            });

                        return null;
                    });

                    setTimeout(() => setLoading(false), 3000);

                    setTimeout(() => {
                        let array = loggedBooks;

                        let list = JSON.stringify(array);
                        window.localStorage.setItem("myLogs", list);
                    }, 3500);
                }

                setError(false);
            })
                .catch(err => {
                    console.log(err);
                    setError(true);
                });
        }

        if (window.localStorage.getItem("scrollTo")) {
            var scrollY = window.localStorage.getItem("scrollTo");

            window.scrollTo(0, scrollY - 300);
        }
    }

    function searchBook(search) {
        if (search !== "") {
            setLoading(true);

            window.localStorage.setItem("myLog-searchKey", search);

            var array = [];

            loggedBooks.map(book => {
                let bk = book.volumeInfo.title;

                if (bk.toLowerCase().includes(search.toLowerCase())) {
                    array.push(book);
                }

                return null;
            })

            let list = JSON.stringify(array);
            window.localStorage.setItem("myLog-recentSearch", list);

            setSearchResults(array);

            setTimeout(() => setLoading(false), 1000);
            setSearched(true);
        } else {
            setSearched(false);
        }
    }

    function clearSearch() {
        window.localStorage.removeItem("myLog-searchKey");
        window.localStorage.removeItem("myLog-recentSearch");

        setSearchKey('');
        setLoggedBooks('');

        loadLoggedBooks();

        setSearched(false);

        window.scrollTo(0, 0);
    }

    return (
        <div>
            <div id='search-container'>
                <input className='search-input-full-width' type="search" placeholder="Search title, author, genre ..." value={searchKey} onChange={e => setSearchKey(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') { searchBook(searchKey) } }} />
            </div>

            {searched && (
                <button id='clear-search' onClick={() => { clearSearch() }}><u>Clear Search</u></button>
            )}

            <div className='search-results'>
                {noLogs ?
                    <h3 id='no-logs'>You haven't logged any books yet, head to the explore page to start logging.</h3>
                    :
                    !error ?
                        loading ?
                            <>
                                <Placeholder />
                                <Placeholder />
                                <Placeholder />
                                <Placeholder />
                                <Placeholder />
                                <Placeholder />
                                <Placeholder />
                                <Placeholder />
                                <Placeholder />
                                <Placeholder />
                                <Placeholder />
                                <Placeholder />
                            </>
                            :
                            searched ?
                                searchResults.map((book) => {
                                    let cover = book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail;

                                    if (cover !== undefined) {
                                        return (
                                            <span key={book.id}>
                                                <BookCard bookData={book} returnPage={'/mylog'} />
                                            </span>
                                        )
                                    } else {
                                        return null;
                                    }
                                })
                                :
                                loggedBooks.map((book) => {
                                    let cover = book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail;

                                    if (cover !== undefined) {
                                        return (
                                            <span key={book.id}>
                                                <BookCard bookData={book} returnPage={'/mylog'} />
                                            </span>
                                        )
                                    } else {
                                        return null;
                                    }
                                })
                        :
                        <span className='error-container'>
                            <h3>Something went wrong, please refresh the page</h3>
                            <img src={Error} alt='error' />
                        </span>
                }
            </div>
        </div>
    )
}
