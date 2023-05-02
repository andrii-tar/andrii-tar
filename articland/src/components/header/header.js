import React from 'react'
import logoImage from "../../images/logo_3.webp";
import { Link } from 'react-router-dom';
import { useContext } from 'react';

import { TestContext } from '../../App';
import GuestMenu from './guestmenu';
import UserMenu from './usermenu';


export default function Header() {
    const authCtx = useContext(TestContext);
    console.log("credentials", authCtx.userCreds);
    return (
        <nav class="navbar">
            <div class="navbar__logo">
                <img class="navbar__logo__img" src={logoImage} alt="logo"></img>
                <Link to="/">
                    Articland
                </Link>

            </div>

                {(authCtx.userCreds) == "" ?
                    (<GuestMenu/>)
                    :
                    (<UserMenu/>)
                }

        </nav>

    )
}