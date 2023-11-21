import { React, useEffect, useState } from 'react';
import { useUserAuth } from '../context/UserAuthContext';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from "react-query";
import Axios from 'axios';
import './Styles/myLog.css';
import SearchBar from '../components/SearchBar.js';
import BookList from '../components/BookList.js';

export default function MyLog() {
    const { currentUser, getSavedBooks } = useUserAuth();
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get("search") ? searchParams.get("search") : "";
    const [searchState, setSearchState] = useState(false);

    // React Query hook for fetching and caching logged books data
    const { data: logBooks, isError, isFetching, refetch } = useQuery(['loggedBooks'], async () => {
        let loggedBooks = [];

        try {
            // Fetching the list of logged books for the current user
            const log = await getSavedBooks(currentUser.uid);
            loggedBooks = log;
        } catch (error) {
            // console.log(error);
            loggedBooks = null;
        }

        if (loggedBooks) {
            const list = [];

            // Iterating over each logged book id and fetching its corresponding book data
            for (let i = 0; i < loggedBooks.length; i++) {
                try {
                    const res = await Axios.get('https://www.googleapis.com/books/v1/volumes?q=' + loggedBooks[i] + '&key=' + process.env.REACT_APP_API_KEY + '&maxResults=1');
                    list.push(res.data.items[0]);
                } catch (error) {
                    // console.log(error);
                    return null;
                }
            }

            return list;
        } else {
            return null;
        }
    }, {
        staleTime: 60 * 60 * 1000,
    });

    // Effect to update search state and trigger a refetch when the query changes
    useEffect(() => {
        setSearchState(query !== "" ? true : false);
        refetch();
    }, [query, refetch]);

    // Function to clear the search and update the URL
    function clearSearch() {
        setSearchParams("");
        setSearchState(false);
    }

    return (
        <div className='page-container'>
            <div className='searchbar-container'>
                <SearchBar />

            </div>

            {searchState && (
                <button className='mylog-clear-search' onClick={() => { clearSearch() }}><u>Clear Search</u></button>
            )}

            <BookList data={logBooks} isError={isError} isFetching={isFetching} mylog={true} />
        </div>
    )
}
