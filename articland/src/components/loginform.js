import React from 'react';
import { loginUser } from '../api_list';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function LoginForm() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        //alert(`credentials: ${username}, ${password}`);
        
        await loginUser({ user_name: username, password: password });
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
                        class="input" placeholder="Username" />
                </div>

                <div class="input-form__inputContainer">
                    <input type="password" class="input" placeholder="Password" 
                     value={password} 
                     onChange={(e) => setPassword(e.target.value)}
                    />
                </div>


                <div>
                    <input type="submit" class="input-form__submitBtn" value="Log in" />
                </div>
                <p>Don`t have an acount?</p>
                <div class="navBtn">
                    <Link class="navBtn__button" to="/signup">Sign up</Link>
                    <Link class="navBtn__button" to="/"> Home</Link>
                </div>

            </form>
        </div>


    )
}

