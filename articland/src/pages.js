import React from 'react'

import SearchBar from './components/searchbar';
import { ArticleList } from './components/articlelist';
import { Article } from './components/article';
import LoginForm from './components/loginform';
import SignUpForm from './components/signupform';
import WriteForm from './components/writeform';
import { editArticle, postArticle, registerUser, updateUser } from './api_list';
export function Home() {
    return (
        <>
            <SearchBar />
            <ArticleList />
        </>

    )
}



export function Login() {
    return (
        <>
            <LoginForm />
        </>

    )
}



export function SignUp() {
    return (
        <>
            <SignUpForm
                existing={false}
                submitFunc={registerUser}
            />
        </>

    )
}

export function Profile() {
    return (
        <>
            <SignUpForm
                existing={true}
                submitFunc={updateUser}
            />
        </>

    )
}
export function ArticleDemo() {
    return (
        <>
            <div class="article-section">
                <Article />
            </div>
            <div class="version-section">
                <div class="additional-text">
                    <p>Previous versions</p>
                    <hr />
                </div>
                <ArticleList />
            </div>
        </>
    )
}



export function Write() {
    return (
        <>
            <WriteForm
                existing={false}
                submitFunc={postArticle} 
                />
        </>

    )
}


export function Edit() {
    return (
        <>
            <WriteForm
                existing={true}
                submitFunc={editArticle}
            />
        </>

    )
}
