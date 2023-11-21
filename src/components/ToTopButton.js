'use client';
import { useEffect, useState } from 'react';
import './Styles/toTopButton.css';

export default function ToTopButton() {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const toggleVisibility = () => {
            window.scrollY > 500 ? setIsVisible(true) : setIsVisible(false)
        }

        window.addEventListener("scroll", toggleVisibility)

        return () => {
            window.removeEventListener("scroll", toggleVisibility)
        }
    }, [])

    const scrollToTop = () => {
        isVisible &&
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            })
    }

    return (
        <button onClick={scrollToTop} className={'top_btn ' + (isVisible ? '' : 'hide_btn')}></button>
    )
}