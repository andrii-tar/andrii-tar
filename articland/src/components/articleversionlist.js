import { React, useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';

import { ListItem } from './listitem';

import { useNavigate } from "react-router-dom";
import { ErrorHandler } from '../api_v2.js';

import { AxClient } from '../client';

export const ArticleVersionList = () => {

    const navigate = useNavigate();

    const [allArticlesList, setArticleList] = useState([]);

    const location = useLocation();

    let versionId = null;

    async function getAllVersions() {
        AxClient.get(`/article/version/${versionId}`, {})
        .then(function (response) {
            setArticleList(response.data);
        })
        .catch(function (error) {
            ErrorHandler(error);
            setArticleList([]);
        });
    }
    
    useEffect(() => async () => {
        console.log("hello");
      //  navigate("/");

        if (location.state == null) {
            navigate("/");
        }
        else {
            versionId = (location.state.articleData.article_version_id);
            if (versionId!== null)  await getAllVersions();
        }

    }, []);



    return (
        <div data-testid="version-list" class="article-version-list">
            <ListItem  aList={allArticlesList} />
        </div>
    )
}