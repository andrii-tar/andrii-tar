import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';


import { useContext } from 'react';

import { TestContext } from '../../App';

import { loginUser } from '../../api_v2';

export default function LoginForm() {

    const authCtx = useContext(TestContext);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        const token = `Basic ${btoa(`${username}:${password}`)}`;

        await loginUser(token, authCtx);

        if(sessionStorage.getItem("basicAuth")!=="")
            window.history.back();
    }

    return (
        <div class="input-form__signupFrm">
            <form action="" onSubmit={handleSubmit} class="input-form__form">
                <p>
                    <h1 class="input-form__title">Log in</h1>
                </p>

                <div class="input-form__inputContainer">
                    <input type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        class="input" placeholder="Username" required
                    />
                </div>

                <div class="input-form__inputContainer">
                    <input type="password" class="input" placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        pattern=".{8,}" title="Eight or more characters"

                    />
                </div>


                <div>
                    <input type="submit" class="input-form__submitBtn" value="Log in" />
                </div>
                <p>Don`t have an acount?</p>
                <div class="navBtn">
                    <Link class="navBtn__button" to="/signup">Sign up</Link>
                    {/*
                    <Link class="navBtn__button" to="/"> Home</Link>
                */}
                </div>

            </form>
        </div>


    )
}

