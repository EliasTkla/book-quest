import React, { useState, useEffect } from 'react';

function Book_Slide() {

    const [img, setImg] = useState();

    useEffect(() => {
    const imageUrl = `https://covers.openlibrary.org/b/isbn/0385472579-L.jpg`;

    const fetchImage = async () => {
    const res = await fetch(imageUrl);
    const imageBlob = await res.blob();
    const imageObjectURL = URL.createObjectURL(imageBlob);
    setImg(imageObjectURL);
    }
    fetchImage();
    }, []);

    return (
        <div className='book-slide'>
            <img src={img} alt='book cover' />
            <img src={img} alt='book cover' />
            <img src={img} alt='book cover' />
            <img src={img} alt='book cover' />
        </div>
    )
}

export default Book_Slide