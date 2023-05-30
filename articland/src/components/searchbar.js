import React, { useEffect } from 'react'
import { SearchContext } from '../pages';
import { useContext } from 'react';
import { useState } from 'react';

import { AxClient } from '../client';


export default function SearchBar() {

    const searchCtx = useContext(SearchContext);

    const [title, setTitle] = useState("");

    async function searchByTitle(curTitle) {
        AxClient.get(`/article/version/search?title=${curTitle}`, {})
        .then(function (response) {
            searchCtx.setAList(response.data);
        })
        .catch(function (error) {
          //  console.log(error.message);
            searchCtx.setAList([]);
        });

    }

    async function searchHandle(e) {
        e.preventDefault();
        await searchByTitle(title);
    };

    useEffect(() => {
        if (!title) searchByTitle("");
    }, [title]);


    return (
        <div class="search-box">
            <form data-testid='search-form' role="search" id="search-form" onSubmit={async (e) => await searchHandle(e)}>
                <label for="search">Search article by title</label>
                <input data-testid='searchbox' id="search" type="search" name="title" placeholder="Search..." autofocus required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <button data-testid='submit-search' type="submit">Go</button>
            </form>
        </div>

    )
}

