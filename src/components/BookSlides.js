import React from 'react';
import { useQuery } from "react-query";
import './Styles/bookSlides.css';
import Axios from 'axios';
import LeftArrow from '../assets/images/arrow-left.svg';
import RightArrow from '../assets/images/arrow-right.svg';
import BookCard from './BookCard';
import Placeholder from './Placeholder';
import ErrorMessage from './ErrorMessage';

export default function BookSlides({ category, sliders, currentBookId }) {

    // fetches data for category passed
    const { data, isFetching, isError } = useQuery([category], async () => {
        try {
            const res = await Axios.get('https://www.googleapis.com/books/v1/volumes?q=subject:' + category + '&key=' + process.env.REACT_APP_API_KEY + '&maxResults=15');
            return res.data.items;
        } catch (error) {
            return null;
        }
    }, {
        staleTime: 60 * 60 * 1000,
    })

    if (isError) {
        return <ErrorMessage pageError={"bug"} />;
    }

    return (
        <>
            {sliders && (
                <div className='list-slider'>
                    <h2>{category}</h2>
                    <hr />
                    <div>
                        <img src={RightArrow} alt='right arrow button' width={25} height={25} onClick={() => { document.getElementById(category).scrollLeft += 700; }} />
                        <img src={LeftArrow} alt='left arrow button' width={25} height={25} onClick={() => { document.getElementById(category).scrollLeft -= 700; }} />
                    </div>
                </div>
            )}

            <div id={category} className='book-slide'>
                {isFetching || !data ?
                    <>
                        <Placeholder />
                        <Placeholder />
                        <Placeholder />
                        <Placeholder />
                        <Placeholder />
                    </>
                    :
                    <>
                        {data.map((book) => {
                            let title = book.volumeInfo.title;
                            let authors = book.volumeInfo.authors;
                            let cover = book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail;

                            if (cover && title && authors) {
                                if (currentBookId) {
                                    if (book.id !== currentBookId) {
                                        return (
                                            <span key={book.id}>
                                                <BookCard bookData={book} returnPage={'/explore'} />
                                            </span>
                                        )
                                    } else {
                                        return null;
                                    }
                                } else {
                                    return (
                                        <span key={book.id}>
                                            <BookCard bookData={book} returnPage={'/explore'} />
                                        </span>
                                    )
                                }
                            } else {
                                return null;
                            }
                        })}
                    </>
                }
            </div>

            {!sliders && (
                <div className='home-list-slider'>
                    <img src={LeftArrow} alt='left arrow button' width={25} height={25} onClick={() => { document.getElementById(category).scrollLeft -= 700; }} />
                    <img src={RightArrow} alt='right arrow button' width={25} height={25} onClick={() => { document.getElementById(category).scrollLeft += 700; }} />
                </div>
            )}
        </>
    )
}