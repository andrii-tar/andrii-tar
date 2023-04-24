import React, { useEffect } from 'react';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function WriteForm(props) {


    const [title, setTitle] = useState("");
    const [text, setText] = useState("");

    const location = useLocation();


    useEffect(() => {
        if (props.existing === true) {
            setTitle(location.state.articleData.title);
            setText(location.state.articleData.text);        }
    }, []);


    const handleSubmit = async (event) => {
        event.preventDefault();
        let value = JSON.stringify({ title: title, text: text });
        if (props.existing === true) {
            const id = location.state.articleData.article_version_id;
            value = JSON.stringify({title:title, text:text, article_version_id:id});
        }
        await props.submitFunc(value);
    }

    return (

        <>
            <form class="input-form__writeFrm" onSubmit={handleSubmit} id="write-form">
                <div class="navBtn">
                    <div class="input-form__inputContainer">
                        <input type="text" class="input" name="title" placeholder="Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <input type="submit" class="navBtn__button" value="Save" />
                </div>
                <textarea class="comment" name="text" rows="50"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                >
                    First paragraph of the potential article
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