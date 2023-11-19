import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import "./application.css";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { MoviesRoutes } from "./components/movies/moviesRoutes";
import { MoviesContext } from "./components/movies/moviesContext";
import { LoginNavLink } from "./components/login/loginNavLink";
import { LoginPage } from "./components/login/loginPage";
import { ProfilePage } from "./components/profile/profilePage";
import { LoginContext } from "./components/login/loginContext";

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

  const [username, setUsername] = useState();
  async function loadUser() {
    const res = await fetch("/api/login");
    if (!res.ok) {
      throw new Error("Something went wrong fetching user " + res.statusText);
    }
    const user = await res.json();
    setUsername(user.username);
  }

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <LoginContext.Provider value={{ username, loadUser }}>
      <MoviesContext.Provider
        value={{
          fetchMovies,
          onAddMovie,
        }}
      >
        <></>
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
          <Routes>
            <Route path={"/login"} element={<LoginPage />} />
            <Route path={"/profile"} element={<ProfilePage />} />
            <Route path={"*"} element={<h2>404 not found</h2>} />
          </Routes>
        </main>
        <footer>Lecture 9: Open ID Connect</footer>
      </MoviesContext.Provider>
    </LoginContext.Provider>
  );
}

root.render(
  <BrowserRouter>
    <Application />
  </BrowserRouter>,
);
