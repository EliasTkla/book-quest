import React from 'react';
import './books.css';

function books() {
  return (
    <div className='search-page'>
      <div className='searchbar'>
        <input type="text" placeholder="Enter book name" />
      </div>

      <div className='book-results'>
        books
      </div>

      <div className='book-info'>
        book
      </div>
    </div>
  )
}

export default books