import React, { useEffect } from 'react';
import { useState } from 'react';

import { useNavigate } from "react-router-dom";
import { useContext } from 'react';
import { TestContext } from '../../App';
import { ErrorHandler, AxClient } from '../../api_v2';



export default function WriteForm() {

    let authCtx = useContext(TestContext);

    const navigate = useNavigate();


    const [title, setTitle] = useState("");
    const [text, setText] = useState("First paragraph of the potential article");


    const handleSubmit = async (event) => {
        event.preventDefault();


        AxClient.post(`/article`, {
            "title": title,
            "text": text
        }, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: authCtx.userCreds
            }
        })
            .then(function (response) {
                console.log("resp", response);
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