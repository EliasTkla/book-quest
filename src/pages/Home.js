import { React } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Styles/home.css';
import Cover1 from '../assets/images/cover1.jpeg';
import Cover2 from '../assets/images/cover2.jpeg';
import Cover3 from '../assets/images/cover3.jpeg';
import Cover4 from '../assets/images/cover4.jpeg';
import BookSlides from '../components/BookSlides';

export default function Home() {
    const navigate = useNavigate();

    // Function to navigate to the explore page with a specified genre search
    function searchGenre(e) {
        if (e.target.ariaLabel !== "") {
            navigate('/explore?search=' + e.target.ariaLabel);
        }
    }

    return (
        <>
            <div className='intro-container'>
                <div className='intro-text'>
                    <hr />
                    <h1>Discover new additions <br />for your digital shelf!</h1>

                    <p>Keep a digital record of all your reading experiences,
                        from the books you've loved to the ones you couldn't quite
                        finish. Embark on a journey
                        of new discoveries and start your quest for new books with ease
                        and convenience.</p><br />

                    <br />
                    <br />
                    <br />

                    <Link to="/signup">
                        Begin Now
                    </Link>
                </div>

                <div className='background-container'>
                    <img src={Cover1} alt="book cover" />
                    <img src={Cover2} alt="book cover" />
                    <img src={Cover3} alt="book cover" />
                    <img src={Cover4} alt="book cover" />
                </div>
            </div>

            <div className='slide-container'>
                <hr />
                <h1>To get you started</h1>

                <Link className='more-link' to="/explore">
                    Explore more
                </Link>

                <BookSlides category={"nonFiction"} sliders={false} />
            </div>

            <div className='genre-text'>
                <hr />
                <h1>Explore different genres</h1>

                <p>Search through the genres available to find the right books to create your perfect collection. <br />Start your discovery by selecting one of the few options below!</p>
            </div>

            <div className='genre-container'>
                <div>
                    <button aria-label='Fantasy' onClick={searchGenre}>Fantasy</button>
                </div>
                <div>
                    <button aria-label='Crime' onClick={searchGenre}>Crime</button>
                </div>
                <div>
                    <button aria-label='Science' onClick={searchGenre}>Science</button>
                </div>
                <div>
                    <button aria-label='Poetry' onClick={searchGenre}>Poetry</button>
                </div>
                <div>
                    <button aria-label='Cooking' onClick={searchGenre}>Cooking</button>
                </div>
                <div>
                    <button aria-label='Philosophy' onClick={searchGenre}>Philosophy</button>
                </div>
                <div>
                    <button aria-label='Travel' onClick={searchGenre}>Travel</button>
                </div>
                <div>
                    <button aria-label='Fiction' onClick={searchGenre}>Fiction</button>
                </div>
                <div>
                    <button aria-label='Religion' onClick={searchGenre}>Religion</button>
                </div>
            </div>
        </>
    )
}