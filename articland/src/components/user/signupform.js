import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import ProfileInput from './profileinput';
import { createContext } from 'react';
import { ErrorHandler } from '../../api_v2';

import { useNavigate } from "react-router-dom";
import { AxClient } from '../../client';


//export const ProfileContext = createContext();
import { ProfileContext } from '../../context_store';
export default function SignUpForm() {


    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [email, setEmail] = useState("");
    const [confpassword, setConfPassword] = useState("");
    const [role, setRole] = useState(1);

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password !== confpassword) {
            alert("Passwords are different");
            return;
        }

        AxClient.post(`/user`, {
            "user_name": username,
            "password": password,
            "role_id": role,
            "email": email
        }, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(function (response) {
                console.log("resp", response);
                navigate("/");
            })
            .catch(function (error) {
                console.log(error.response);
                if (error.response.status === 400) {
                    alert(error.response.data);
                }
                else {
                    ErrorHandler(error);
                }
            });

    }

    return (
        <>
            <div class="input-form__signupFrm">
                <form action="" onSubmit={handleSubmit} class="input-form__form">
                    <p>
                        <h1 class="input-form__title">Sign Up</h1>
                    </p>
                    <ProfileContext.Provider value={{
                        username, setUsername,
                        password, setPassword,
                        email, setEmail,
                        confpassword, setConfPassword,
                        role, setRole
                    }}>
                        <ProfileInput ProfileContext={ProfileContext} />
                    </ProfileContext.Provider>
                    <>
                        <div>
                            <input type="submit" class="input-form__submitBtn" value="Sign up" />
                        </div>
                        <p data-testid="account_exists">Already have an account?</p>
                        <div class="navBtn">
                            <Link class="navBtn__button" to="/login" id="button">Log in</Link >
                            {/*
                             <Link class="navBtn__button" to="/" id="button"> Home</Link >
                           */}
                        </div>
                    </>
                </form>
            </div>
        </>
    )
}

