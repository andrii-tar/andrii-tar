import React from 'react'
import logoImage from "../images/logo_3.webp";
import { Link } from 'react-router-dom';
export default function Header() {

    return (
        <nav class="navbar">
            <div class="navbar__logo">
                <img class="navbar__logo__img" src={logoImage} alt="logo"></img>
                <Link to="/">
                    Articland
                </Link>

            </div>

            <div class="navbar__menu">
                <Link to="/write" class='navbar__menu--links'>Write</Link>
                <Link to="/profile" class='navbar__menu--links' >Profile</Link>
                <Link to="/login" class='navbar__menu--links' >Login</Link>
                <Link to="/signup" class='navbar__menu--links' id="button">Sign up</Link>
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
                        <Link to="/login" class='navbar__menu--links' >Login</Link>
                    </li>
                    <li>
                        <Link to="/signup" class='navbar__menu--links' id="button">Sign up</Link>
                    </li>
                    <li>
                    <Link to="/profile" class='navbar__menu--links' >Profile</Link>
                    </li>
                </ul>
            </div>
        </nav>

    )
}