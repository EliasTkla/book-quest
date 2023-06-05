import React from 'react';
import { Link } from 'react-router-dom';
import './Styles/BookCard.css'

export default function BookCard (props) {

    const book = props.bookData;
    const bookId = book.id;
    const bookTitle = book.volumeInfo.title;
    const bookAuthor = book.volumeInfo.authors;
    const previewLink = book.volumeInfo.previewLink;
    const summary = book.volumeInfo.description;

    return (
        <Link className='book' key={book.id} to='/bookdetail' state={{page: props.returnPage, id: book.id, title: bookTitle, author: bookAuthor, preview: previewLink, description: summary}}>
            <img src={"https://books.google.com/books/publisher/content/images/frontcover/"+bookId+"?fife=w800-h1000&source=gbs_api"}  alt='book cover' loading="lazy"/>
            <p>{bookTitle}</p>
        </Link>
    )
}