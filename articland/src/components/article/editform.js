import React, { useEffect } from 'react';
import { useState } from 'react';

import { useNavigate } from "react-router-dom";
import { useContext } from 'react';
//import { TestContext } from '../../App';
import { TestContext } from '../../context_store';
import { ErrorHandler } from '../../api_v2';
import { AxClient } from '../../client';
import { useLocation } from 'react-router-dom';

export default function EditForm() {

    let authCtx = useContext(TestContext);
    const location = useLocation();
    const navigate = useNavigate();


    if (location.state == null) {
        window.location.href = "/";
    }

    const [title, setTitle] = useState("");
    const [text, setText] = useState("");

    useEffect(() => {
        setTitle(location.state.articleData.title);
        setText(location.state.articleData.text);
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const id = location.state.articleData.article_version_id;


        AxClient.post(`/article/version`, {
            "title": title,
            "text": text,
            "article_version_id": id
        }, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: authCtx.userCreds
            }
        })
            .then(function (response) {
                // console.log("resp", response);
                navigate("/");
            })
            .catch(function (error) {
                ErrorHandler(error);
            });
    }

    return (

        <>
            <form class="input-form__writeFrm" onSubmit={handleSubmit} id="write-form">
                <div class="navBtn">
                    <div class="input-form__inputContainer">
                        <input type="text" class="input" name="title" placeholder="Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                    <input type="submit" class="navBtn__article-button" value="Save" />
                </div>
                <textarea class="comment" name="text" rows="50"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    required
                >
                </textarea>

            </form>

        </>
    )
}





/*



    <form class="input-form__writeFrm" id="write-form">
        <div class="navBtn">
            <div class="input-form__inputContainer">
                <input type="text" class="input" name="title" placeholder="Title">
            </div>
            <input type="submit" class="navBtn__button" value="Save">
        </div>
        <textarea class="comment" name="text" rows="50">First paragraph of the potential article</textarea>

    </form>


*/