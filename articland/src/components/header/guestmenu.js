import React from 'react'
import { Link } from 'react-router-dom';
import { useContext } from 'react';

import { TestContext } from '../../App';


export default function GuestMenu() {
    const authCtx = useContext(TestContext);
    console.log("credentials", authCtx.userCreds);
    return (
        <>
            <div class="navbar__menu">
                <>
                    <Link to="/login" class='navbar__menu--links' >Login</Link>
                    <Link to="/signup" class='navbar__menu--links' id="button">Sign up</Link>
                </>
            </div>


            <div class="hamburger-menu">
                <input id="menu__toggle" type="checkbox" />
                <label class="menu__btn" for="menu__toggle">
                    <span></span>
                </label>

                <ul class="menu__box">
                    <>
                        <li>
                            <Link to="/login" class='navbar__menu--links' >Login</Link>
                        </li>
                        <li>
                            <Link to="/signup" class='navbar__menu--links' id="button">Sign up</Link>
                        </li>
                    </>
                </ul>
            </div>
        </>

    )
}