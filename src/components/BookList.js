import { React } from 'react';
import { useSearchParams } from 'react-router-dom';
import './Styles/bookList.css';
import BookCard from '../components/BookCard.js';
import Placeholder from '../components/Placeholder.js';
import ToTopButton from '../components/ToTopButton.js';
import ErrorMessage from './ErrorMessage';

export default function BookList({ data, isError, isFetching, mylog }) {
    const [searchParams] = useSearchParams();
    const searchKey = searchParams.get("search") ? searchParams.get("search") : "";

    if (isError) {
        return <ErrorMessage pageError={"bug"} />;
    }

    if (isFetching) {
        return (
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
        )
    }

    if (!data) {
        return <ErrorMessage pageError={"empty"} />;
    }

    // checks if search results will be empty on mylog page
    if (mylog && searchKey !== "") {
        let filtered = data.filter((book) => {
            let title = book.volumeInfo.title;
            let authors = book.volumeInfo.authors;

            if (title.toLowerCase().includes(searchKey.toLowerCase())
                || authors.toString().toLowerCase().includes(searchKey.toLowerCase())) {
                return book;
            } else {
                return null;
            }
        })

        if (filtered.length === 0) {
            return <ErrorMessage pageError={"empty"} />;
        }
    }

    return (
        <div className='search-results'>
            {mylog ?
                <>
                    {data.map((book) => {
                        let title = book.volumeInfo.title;
                        let authors = book.volumeInfo.authors;

                        if (title.toLowerCase().includes(searchKey.toLowerCase()) || authors.toString().toLowerCase().includes(searchKey.toLowerCase())) {
                            return (
                                <span key={book.id}>
                                    <BookCard bookData={book} returnPage={'/explore'} default={true} />
                                </span>
                            )
                        } else {
                            return null;
                        }
                    })}
                </>
                :
                <>
                    {data.map((book) => {
                        let title = book.volumeInfo.title;
                        let authors = book.volumeInfo.authors;
                        let cover = book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail;

                        if (cover && title && authors) {
                            return (
                                <span key={book.id}>
                                    <BookCard bookData={book} returnPage={'/explore'} default={true} />
                                </span>
                            )
                        } else {
                            return null;
                        }
                    })}
                </>
            }

            <ToTopButton />
        </div>
    )
}