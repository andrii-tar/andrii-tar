import React, { useEffect } from 'react';
//import { deleteUser } from '../api_list';
import { useState } from 'react';
import { Link } from 'react-router-dom';


import ProfileInput from './profileinput';
import { createContext } from 'react';

import { useNavigate } from "react-router-dom";


import { useContext } from 'react';

import { TestContext } from '../../App';

import { AxClient, ErrorHandler, loginUser } from '../../api_v2';



const ProfileContext = createContext();


export default function ProfileForm() {

    let authCtx = useContext(TestContext);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [email, setEmail] = useState("");
    const [confpassword, setConfPassword] = useState("");
    const [role, setRole] = useState(1);

    const navigate = useNavigate();

    authCtx = useContext(TestContext);
    useEffect(() => async () => {
        let userData = {};

        userData = await loginUser(authCtx.userCreds, authCtx);
        setUsername(userData.user_name);
        setEmail(userData.email);
        setRole(userData.role_id);
        //  console.log("ud", userData);
    }, []);

    const deleteUser = async (event) => {

        event.preventDefault();
        await AxClient.delete(`/user`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: authCtx.userCreds,
            }
        })
            .then(function (response) {
                sessionStorage.setItem('basicAuth', "");
                authCtx.setUserCreds(sessionStorage.getItem('basicAuth'));
                navigate("/");
            })
            .catch(function (error) {
                console.log(error.message);
                if (error.response.status === 401) {
                    //console.log(error.response.status);
                    alert("Wrong credentials");
                }
                else{
                    ErrorHandler(error);
                }
            });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        AxClient.put(`/user`, {
            "user_name": username,
            "password": password,
            "role_id": role,
            "email": email
        }, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: authCtx.userCreds
            }
        })
            .then(async function (response) {
                console.log("resp", response);

                const token = `Basic ${btoa(`${username}:${password}`)}`;
                await loginUser(token, authCtx);

                navigate("/");
            })
            .catch(function (error) {
                console.log(error);
                alert(error.response.data);
            });
    }

    return (
        <>
            <div class="input-form__signupFrm">
                <form action="" onSubmit={handleSubmit} class="input-form__form">
                    <p>
                        <h1 class="input-form__title">
                            User Info
                        </h1>
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
                        <div class="navBtn">
                            <button type="submit" class="navBtn__button">Save</button>
                            <Link class="navBtn__button" to="/" id="button"> Home</Link >
                        </div>

                        <p>Want to delete account?</p>
                        <div class="navBtn">
                            <button type="button" class="navBtn__button" onClick={deleteUser}> DELETE</button>
                        </div>
                    </>
                </form>
            </div>
        </>
    )
}

