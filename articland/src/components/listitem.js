import { React, useState, useEffect } from 'react'

import { ArticleTile } from './article/articletile';

export const ListItem = (props) => {

    const [allArticlesList, setArticleList] = useState(props.aList);


    useEffect(() => {
        setArticleList(props.aList);
    }, [props.aList]);

    return (
        <>
            {
                allArticlesList.map((temp_art) => {
                    return <ArticleTile articleData={temp_art} />
                })
            }
        </>
    )
}