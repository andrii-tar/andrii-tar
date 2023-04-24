import { React, useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';

import { ArticleTile } from './articletile'
import { getArticleList, getArticleVersionListByVersion } from '../api_list.js';




export const ArticleList = () => {

    const [allArticlesList, setArticleList] = useState([]);

    const location = useLocation();
   // const [versionId, setVersionId] = useState(null);
    let versionId = null;

    if (location.state != null)
        versionId = (location.state.articleData.article_version_id);



    async function getAllVersions() {

        const allVersionsList = await getArticleVersionListByVersion(versionId);
        setArticleList(allVersionsList);

    }

    async function getAllArticles() {
        const temp = await getArticleList();
        setArticleList(temp);
    }

    useEffect(() => async () => {
        if (versionId != null)
            await getAllVersions();
        else
            await getAllArticles();
    }, []);

    return (
        <div class={(versionId != null) ? "article-version-list" : "article-list"}>
            {
                allArticlesList.map((temp_art) => {
                    return <ArticleTile articleData={temp_art} />
                })
            }
        </div>
    )
}