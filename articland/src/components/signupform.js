import React from 'react';
import { deleteUser, getUserInfo, registerUser } from '../api_list';
import { useState } from 'react';
import { Link } from 'react-router-dom';
export default function SignUpForm(props) {


    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [email, setEmail] = useState("");
    const [confpassword, setConfPassword] = useState("");
    const [role, setRole] = useState(1);

    if (props.existing === true) {
        (async function () {
            let userData = await getUserInfo();
            setUsername(userData.user_name);
            setEmail(userData.email);
            setRole(userData.role_id);
            console.log("ud", userData);
        })();

    }


    const handleSubmit = async (event) => {
        event.preventDefault();
        //alert(`credentials: ${username}, ${password}`);

        //await loginUser({ user_name: username, password: password });
        await props.submitFunc({ "user_name": username, "password": password, "role_id": role, "email": email });
    }

    return (
        <>

            <div class="input-form__signupFrm">
                <form action="" onSubmit={handleSubmit} class="input-form__form">
                    <p>
                        <h1 class="input-form__title">{
                            (props.existing === true)
                                ? "User Info" : "Sign Up"}
                        </h1>
                    </p>

                    <div class="input-form__inputContainer">
                        <input type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            class="input" placeholder="Email" />
                    </div>

                    <div class="input-form__inputContainer">
                        <input type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            class="input" placeholder="Username" />
                    </div>

                    <div class="input-form__inputContainer">
                        <input type="password" class="input" placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div class="input-form__inputContainer">
                        <input type="password" class="input" placeholder="Confirm password"
                            value={confpassword}
                            onChange={(e) => setConfPassword(e.target.value)}
                        />
                    </div>

                    <div class="select-role">
                        <select name="role_id"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                        >
                            <option value="1">User</option>
                            <option value="2">Moderator</option>
                        </select>
                    </div>
                    {
                            (props.existing === false)
                                ? 
                                (
                                    <>
                                    <div>
                                        <input type="submit" class="input-form__submitBtn" value="Sign up" />
                                    </div>
                                    <p>Already have an acount?</p>
                                    <div class="navBtn">
                                        <Link class="navBtn__button" to="/login" id="button">Log in</Link >
                                        <Link class="navBtn__button" to="/" id="button"> Home</Link >
                                    </div>
                                </>
                                )
                                :
                                (
                                    <>

                                    <div class="navBtn">
                                        <button class="navBtn__button">Save</button>
                                        <Link class="navBtn__button" to="/" id="button"> Home</Link >
                                    </div>
            
                                    <p>Want to delete account?</p>
                                    <div class="navBtn">
                                        <button class="navBtn__button"onClick={deleteUser}> DELETE</button>
                                    </div>
                                </>
                                )
                                }
                   
                 

                </form>
            </div>
        </>
    )
}

