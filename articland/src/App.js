
import { BrowserRouter, Routes, Route } from "react-router-dom";

import './styles/styles.css';
import { Home, Page, ArticleDemo, Login, SignUp, Write, Edit } from './pages';
//import Header from "./components/header";
import Header from "./components/header/header";
import { Profile } from "./pages";
import { useState, createContext, useContext } from "react";

//import ReactDOM from "react-dom/client";
export const TestContext = createContext();

function App() {

  const [userCreds, setUserCreds] = useState("");

  return (

    <TestContext.Provider value={{userCreds, setUserCreds}}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/profile" element={<Profile />} />

          <Route path="/write" element={<Write />} />
          <Route path="/edit" element={<Edit />} />

          <Route path="/article_demo" element={
            <ArticleDemo />
          } />

          {/*<Route path="*" element={<NoPage />} />*/}
        </Routes>
      </BrowserRouter>
    </TestContext.Provider>
  );
}


export default App;


/*

import './App.css';
import TestPage from './components/testpage';
import './styles/styles.css';
import {Home, Page} from './pages';
function App() {

  return (
    <div class="main-content">
      <Page />
    </div>
  );
}

export default App;
*/