import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./application.css";
import { BrowserRouter, Link } from "react-router-dom";
import { MoviesRoutes } from "./components/movies/moviesRoutes";
import { MoviesContext } from "./components/movies/moviesContext";
import { LoginNavLink } from "./components/login/loginNavLink";

const root = ReactDOM.createRoot(document.getElementById("root"));

function Application() {
  const [movies, setMovies] = useState([
    {
      title: "Oppenheimer",
    },
  ]);
  function fetchMovies() {
    return movies;
  }

  function onAddMovie(movie) {
    setMovies((oldMovies) => [...oldMovies, movie]);
  }

  return (
    <MoviesContext.Provider
      value={{
        fetchMovies,
        onAddMovie,
      }}
    >
      <header>
        <h1>Movie database</h1>
      </header>
      <nav>
        <Link to={"/"}>Front page</Link>
        <Link to={"/movies/new"}>Add movie</Link>
        <Link to={"/movies"}>List movies</Link>
        <Link to={"/"}>Event more page</Link>
        <Link to={"/"}>Event more page</Link>
        <div className={"divider"} />
        <LoginNavLink />
      </nav>
      <main>
        <MoviesRoutes />
      </main>
      <footer>Lecture 9: Open ID Connect</footer>
    </MoviesContext.Provider>
  );
}

root.render(
  <BrowserRouter>
    <Application />
  </BrowserRouter>,
);
