import { React, useState, useEffect } from 'react'


import { SearchContext } from '../pages';
import { useContext } from 'react';
import { ListItem } from './listitem';



export const ArticleList = () => {

    const searchCtx = useContext(SearchContext);

    const [allArticlesList, setArticleList] = useState(searchCtx.aList);

    useEffect(() => {
        setArticleList(searchCtx.aList);
    }, [searchCtx.aList]);

    return (
        <div class="article-list">
            {
                <ListItem aList={allArticlesList} />
            }
        </div>
    )
}