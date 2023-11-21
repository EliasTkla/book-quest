import { React, useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import LeftArrow from '../assets/images/chevron-left.svg';
import RightArrow from '../assets/images/chevron-right.svg';
import './Styles/searchBar.css';

export default function SearchBar({ enableFilter }) {
    const [searchParams, setSearchParams] = useSearchParams();
    const search = searchParams.get("search") ? searchParams.get("search") : "";
    const [searchInput, setSearchInput] = useState('');

    useEffect(() => {
        setSearchInput(search);
    }, [search]);

    function updateSearch(e) {
        if (e.target.name === "searchBar") {
            if (searchInput !== "") {
                setSearchParams(params => {
                    params.set("search", e.target.value);
                    return params;
                });
            }
        } else {
            setSearchParams(params => {
                params.set("search", e.target.ariaLabel);
                return params;
            });
        }
    }

    return (
        <>
            {!enableFilter ?
                <input className='search-input' type="search" name='searchBar' placeholder="Search title, author, genre ..." value={searchInput} onChange={e => setSearchInput(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') { updateSearch(e) } }} />
                :
                <div id='search-container'>
                    <input className='search-input' type="search" name='searchBar' placeholder="Search title, author, genre ..." value={searchInput} onChange={e => setSearchInput(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') { updateSearch(e) } }} />

                    <div className='filter-container'>
                        <img src={LeftArrow} alt='left arrow button' onClick={() => { document.getElementById('filter-menu').scrollLeft -= 200; }} />

                        <div id='filter-menu'>
                            <span aria-label={'Fiction'} onClick={updateSearch}>Fiction</span>
                            <span aria-label={'Crime'} onClick={updateSearch}>Crime</span>
                            <span aria-label={'Science'} onClick={updateSearch}>Science</span>
                            <span aria-label={'Poetry'} onClick={updateSearch}>Poetry</span>
                            <span aria-label={'Health'} onClick={updateSearch}>Health</span>
                            <span aria-label={'Education'} onClick={updateSearch}>Education</span>
                            <span aria-label={'Philosophy'} onClick={updateSearch}>Philosophy</span>
                            <span aria-label={'Religion'} onClick={updateSearch}>Religion</span>
                            <span aria-label={'Travel'} onClick={updateSearch}>Travel</span>
                            <span aria-label={'Music'} onClick={updateSearch}>Music</span>
                            <span aria-label={'Art'} onClick={updateSearch}>Art</span>
                            <span aria-label={'Cooking'} onClick={updateSearch}>Cooking</span>
                        </div>

                        <img src={RightArrow} alt='right arrow button' onClick={() => { document.getElementById('filter-menu').scrollLeft += 200; }} />
                    </div>
                </div>
            }
        </>
    )
}