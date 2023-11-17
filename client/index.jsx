import React from "react";
import ReactDOM from "react-dom/client";
import {TodoApplication} from "./application";
import "./application.css";
import {BrowserRouter, Link} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));

function Application(){
    return (
        <>
            <header>
                <h1>Movie database</h1>
            </header>
            <nav>
                <Link to={"/"}>Front page</Link>
                <Link to={"/"}>Another page</Link>
                <Link to={"/"}>Yet one more page</Link>
                <Link to={"/"}>Event more page</Link>
                <Link to={"/"}>Event more page</Link>
                <div className={"divider"} />
                <Link to={"/login"}>Log in</Link>
            </nav>
            <main>
                <Routes>
                    <Route path={"/"} element={<h2>Front page</h2>} />
                    <Route path={"*"} element={<h2>Not Found</h2>} />
                </Routes>
            </main>
            <footer>Lecture 9: Open ID Connect</footer>
        </>
    );
}


root.render(
    <BrowserRouter>
        <Application />
    </BrowserRouter>
)
//root.render(<TodoApplication />);