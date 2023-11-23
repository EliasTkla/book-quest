import { React, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from "react-query";
import Axios from 'axios';
import './Styles/explore.css';
import BookSlides from '../components/BookSlides.js';
import SearchBar from '../components/SearchBar.js';
import BookList from '../components/BookList.js';

export default function Explore() {
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get("search") ? searchParams.get("search") : "";
    const [searchState, setSearchState] = useState(false);

    // React Query hook for fetching and caching search results
    const { data: searchResults, isError, isFetching, refetch } = useQuery(['searchResults'], async () => {
        if (query !== "") {
            try {
                const res = await Axios.get('https://www.googleapis.com/books/v1/volumes?q=' + (query.includes("genre") ? "subject:" + query.split("-")[1] : query) + '&key=' + process.env.REACT_APP_API_KEY + '&maxResults=40');
                return res.data.items;
            } catch (error) {
                // console.log(error);
                return null;
            }
        } else {
            return null;
        }
    }, {
        staleTime: 15 * 60 * 1000,
    });

    // Effect to update search state and trigger a refetch when the query changes
    useEffect(() => {
        setSearchState(query !== "" ? true : false);
        refetch();
    }, [query, refetch])

    // Function to clear the search and update the URL
    function clearSearch() {
        setSearchParams("");
        setSearchState(false);
    }

    return (
        <div className='page-container'>
            <SearchBar enableFilter={true} />

            {!searchState ?
                <>
                    <BookSlides category={'Art'} sliders={true} />
                    <BookSlides category={'Fantasy'} sliders={true} />
                    <BookSlides category={'History'} sliders={true} />
                </>
                :
                <>
                    <button className='clear-search' onClick={() => { clearSearch() }}><u>Clear Search</u></button>

                    <BookList data={searchResults} isError={isError} isFetching={isFetching} mylog={false} />
                </>
            }
        </div>
    )
}
