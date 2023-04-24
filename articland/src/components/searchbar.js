import React from 'react'
export default function SearchBar() {

    /*
async function search(title) {
    let searchArticlesList = [];
    searchArticlesList = await searchArticle(title);
    let htmlString = '';
    const mainAL = document.getElementById('main-article-list');
    searchArticlesList.forEach((element) => {
        htmlString += renderArticleTile(element);
    });
}
    */

    return (

        <div class="search-box">
            <form role="search" id="search-form">
                <label for="search">Search article by title</label>
                <input id="search" type="search" name="title" placeholder="Search..." autofocus required />
                <button type="submit">Go</button>
            </form>
        </div>

    )
}

