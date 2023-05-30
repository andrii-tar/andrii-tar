import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import { useState } from 'react';

import { Link } from 'react-router-dom';
import { useContext } from 'react';

import { ErrorHandler } from '../../api_v2';
import { AxClient } from '../../client';
//import { baseHostUrl } from '../../client';
//import axios from 'axios';

export const Article = () => {


    const location = useLocation();
    
    function checkLocation() {
        if (location.state == null) {
            window.location.href = "/";
        }
    }

    console.log("location state info:", location.state);

    checkLocation();

    const [articleData, setArticleData] = useState(location.state.articleData);
    if (parseInt(articleData.article_version_id) !== parseInt(location.state.articleData.article_version_id)) {
        setArticleData({ ...articleData, ...location.state.articleData });
    }


    

    async function loadRatingInfo() {
        AxClient.get(`/article/${articleData.article_id}`, {})
            .then(function (response) {
                setArticleData({ ...articleData, ...response.data });
            })
            .catch(function (error) {
                ErrorHandler(error);
                setArticleData([]);
            });
    }

    async function loadVersionInfo() {
        AxClient.get(`/version/${articleData.article_version_id}`, {})
            .then(function (response) {
                setArticleData({ ...articleData, ...response.data });
            })
            .catch(function (error) {
                ErrorHandler(error);
                setArticleData([]);
            });
    }

    async function approve() {

        console.log("sessionstrg", localStorage.getItem('basicAuth'));


        AxClient.put(`/version/${articleData.article_version_id}`, {},
            {
                headers: {
                    Authorization: localStorage.getItem('basicAuth')
                }
            })
            .then(function (response) {
                loadVersionInfo();
            })
            .catch(function (error) {
                ErrorHandler(error);
            });
    }



    useEffect(() => async () => {
        loadRatingInfo();
    }, []);

    const handleChange =async(e) => {
        AxClient.put(`/article/r/${articleData.article_version_id}`, {
            rate: parseInt(e.target.value, 10)
        }, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(function (response) {
                loadRatingInfo();
            })
            .catch(function (error) {
                ErrorHandler(error);
            });
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
                            <input data-testid="radio1" type="radio" id="radio1" name="radios" value="1"
                                onChange={handleChange} />
                            <label for="radio1">★</label>
                            <input data-testid="radio2" type="radio" id="radio2" name="radios" value="2"
                                onChange={handleChange} />
                            <label for="radio2">★</label>
                            <input data-testid="radio3" type="radio" id="radio3" name="radios" value="3"
                                onChange={handleChange} />
                            <label for="radio3">★</label>
                            <input data-testid="radio4" type="radio" id="radio4" name="radios" value="4"
                                onChange={handleChange} />
                            <label for="radio4">★</label>
                            <input data-testid="radio5" type="radio" id="radio5" name="radios" value="5"
                                onChange={handleChange} />
                            <label for="radio5">★</label>
                        </div>
                    </form>
                </div>
                <Link to='/edit' state={{ articleData: articleData }} class="navBtn__button" > Edit</Link>
                <button class="navBtn__button" onClick={approve}>Approve</button>

            </div>
        </div>
    )
}

