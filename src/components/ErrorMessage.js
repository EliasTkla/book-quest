import React from 'react';
import './Styles/errorMessage.css';
import Bug from '../assets/images/bug.svg';
import Error from '../assets/images/404.svg';
import Empty from '../assets/images/empty.svg';

export default function ErrorMessage({ pageError }) {

    // returns for empty search results
    if (pageError === "empty") {
        return (
            <div className='error-container'>
                <img src={Empty} alt='error' />

                <h3>No results found.</h3>
            </div>
        )
    }

    // returns for error in data fetching
    if (pageError === "bug") {
        return (
            <div className='error-container'>
                <img src={Bug} alt='error' />

                <h3>Something went wrong!<br /> Please refresh the page or try again later.</h3>
            </div>
        )
    }

    // returns for non-existent page
    return (
        <div className='error-container'>
            <img src={Error} alt='error' />

            <h3>Page not found.</h3>
        </div>
    )
}
