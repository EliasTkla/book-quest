import './Styles/rating.css';

export default function Rating({ ratingValue, ratings }) {
    const rating = ratingValue ? ratingValue : 0;
    const totalRatings = ratings ? ratings : 0;

    return (
        <>
            <div className='rating-container'>
                <h3>{rating}</h3>

                <div className="rating">
                    <input type="radio" id="star5" name="rating" checked={Math.round(rating) === 5} disabled />
                    <label htmlFor="star5" title="5 stars"></label>
                    <input type="radio" id="star4" name="rating" checked={Math.round(rating) === 4} disabled />
                    <label htmlFor="star4" title="4 stars"></label>
                    <input type="radio" id="star3" name="rating" checked={Math.round(rating) === 3} disabled />
                    <label htmlFor="star3" title="3 stars"></label>
                    <input type="radio" id="star2" name="rating" checked={Math.round(rating) === 2} disabled />
                    <label htmlFor="star2" title="2 stars"></label>
                    <input type="radio" id="star1" name="rating" checked={Math.round(rating) === 1} disabled />
                    <label htmlFor="star1" title="1 star"></label>
                </div>

                <h4> ({totalRatings === 1 ? totalRatings + " rating" : totalRatings + " ratings"})</h4>
            </div>
        </>
    )
}