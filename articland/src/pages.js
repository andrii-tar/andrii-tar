
import SearchBar from './components/searchbar';
import { ArticleList } from './components/articlelist';
import { Article } from './components/article/article';
import LoginForm from './components/user/loginform';
import SignUpForm from './components/user/signupform';
import WriteForm from './components/article/writeform';
import { ArticleVersionList } from './components/articleversionlist';
import ProfileForm from './components/user/profileform';
import { useState, createContext, useContext } from "react";
import EditForm from './components/article/editform';

export const SearchContext = createContext();



export function Home() {
    const [aList, setAList] = useState([]);


    return (
        <>
            <SearchContext.Provider value={{ aList, setAList }}>
                <SearchBar/>
                <ArticleList aList={aList} />
            </SearchContext.Provider>
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
            <SignUpForm/>
        </>

    )
}

export function Profile() {
    return (
        <>
            <ProfileForm/>
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
                <ArticleVersionList />
            </div>
        </>
    )
}



export function Write() {
    return (
        <>
            <WriteForm/>
        </>

    )
}


export function Edit() {
    return (
        <>
            <EditForm/>
        </>

    )
}
