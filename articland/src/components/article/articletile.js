import React from 'react'
import { Link } from 'react-router-dom';
export const ArticleTile = (props) => {
    let articleData = props.articleData;
   
    
    return (
        <div class="article">
            <Link to="/article_demo" state={{ articleData: articleData}}>
                <p class="article__title">
                    {articleData.title}
                </p>
            </Link>
            <p class="article__info">Author: {articleData.author_name}</p>
            <p class="article__info">Published: {articleData.last_change}</p>
            <p class="article__body">{articleData.text}</p>

        </div>
    )
}



