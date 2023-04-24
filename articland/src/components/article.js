import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { rateArticle, getArticle, getArticleVersion, approveArticle } from '../api_list';
import { Link } from 'react-router-dom';
export const Article = () => {

    const location = useLocation();

    const [articleData, setArticleData] = useState(location.state.articleData);
    async function loadRatingInfo() {
        let art = await getArticle(articleData.article_id);
        setArticleData({ ...articleData, ...art });
    }

    async function loadVersionInfo() {
        let temp = await getArticleVersion(articleData.article_version_id);
        setArticleData({ ...articleData, ...temp });
    }

    async function approve() {
        await approveArticle(articleData.article_version_id);
        loadVersionInfo();
    }

    if (parseInt(articleData.article_version_id) !== parseInt(location.state.articleData.article_version_id)) {
        setArticleData({ ...articleData, ...location.state.articleData });
    }

    useEffect(() => async () => {
        loadRatingInfo();
    }, []);

    const handleChange = async (e) => {
        await rateArticle(e.target.value, articleData.article_version_id);
        await loadRatingInfo();
    }

    return (
        <div class="article">

            <p class="article__title">{articleData.title}</p>
            <p class="article__info">Author: {articleData.author_name}</p>
            <p class="article__info">Moderator: {articleData.status === 'published' ? articleData.moderator_name : "unrevised"}</p>
            <p class="article__info">Published:{articleData.last_change}</p>
            <p class="article__info">Rating {Math.round(articleData.rating * 100) / 100} average based on {articleData.rates_cnt} reviews.</p>


            <p class="article__body">
                {articleData.text}
            </p>

            <div class="navBtn">
                <div class="rating-form">

                    <p>Like article? Rate it!</p>
                    <form class="radio-button">
                        <div class="stars">
                            <input type="radio" id="radio1" name="radios" value="1"
                                onChange={handleChange} />
                            <label for="radio1">★</label>
                            <input type="radio" id="radio2" name="radios" value="2"
                                onChange={handleChange} />
                            <label for="radio2">★</label>
                            <input type="radio" id="radio3" name="radios" value="3"
                                onChange={handleChange} />
                            <label for="radio3">★</label>
                            <input type="radio" id="radio4" name="radios" value="4"
                                onChange={handleChange} />
                            <label for="radio4">★</label>
                            <input type="radio" id="radio5" name="radios" value="5"
                                onChange={handleChange} />
                            <label for="radio5">★</label>
                        </div>
                    </form>
                </div>
                <Link to='/edit' state={{ articleData: articleData}} class="navBtn__button" > Edit</Link>
                <button class="navBtn__button" onClick={approve}>Aprove</button>

            </div>
        </div>
    )
}


