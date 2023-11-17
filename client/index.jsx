import React from "react";
import ReactDOM from "react-dom/client";
import "./application.css";
import {BrowserRouter, Link} from "react-router-dom";
import {MoviesRoutes} from "./components/moviesRoutes";

const root = ReactDOM.createRoot(document.getElementById("root"));

function Application(){
    return (
        <>
            <header>
                <h1>Movie database</h1>
            </header>
            <nav>
                <Link to={"/"}>Front page</Link>
                <Link to={"/movies/new"}>Add movie</Link>
                <Link to={"/movies"}>List movies</Link>
                <Link to={"/"}>Event more page</Link>
                <Link to={"/"}>Event more page</Link>
                <div className={"divider"}/>
                <Link to={"/login"}>Log in</Link>
            </nav>
            <main>
                <MoviesRoutes/>
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