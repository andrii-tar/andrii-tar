import React from 'react'
import { Link } from 'react-router-dom';
import { useContext } from 'react';

import { TestContext } from '../../App';


export default function UserMenu() {
    const authCtx = useContext(TestContext);
    console.log("credentials", authCtx.userCreds);
    return (
        <>
            <div class="navbar__menu">
                <Link to="/write" class='navbar__menu--links'>Write</Link>
                <Link to="/profile" class='navbar__menu--links' >Profile</Link>
            </div>


            <div class="hamburger-menu">
                <input id="menu__toggle" type="checkbox" />
                <label class="menu__btn" for="menu__toggle">
                    <span></span>
                </label>

                <ul class="menu__box">
                    <li>
                        <Link to="/write" class='navbar__menu--links'>Write</Link>
                    </li>
                    <li>
                        <Link to="/profile" class='navbar__menu--links' >Profile</Link>
                    </li>
                </ul>
            </div>
        </>

    )
}