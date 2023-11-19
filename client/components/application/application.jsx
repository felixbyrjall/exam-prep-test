import React, { useEffect, useState } from "react";
import { LoginContext } from "../login/loginContext";
import { MoviesContext } from "../movies/moviesContext";
import { Link, Route, Routes } from "react-router-dom";
import { LoginNavLink } from "../login/loginNavLink";
import { MoviesRoutes } from "../movies/moviesRoutes";
import { LoginPage } from "../login/loginPage";
import { ProfilePage } from "../profile/profilePage";
import { LoginCallback } from "../login/loginCallback";

const GOOGLE_CLIENT_ID =
  "625916858663-tenc6s13hukrgg4tueqi62hg08v6o3ka.apps.googleusercontent.com";

export function Application() {
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
  const [user, setUser] = useState();

  async function loadUser() {
    const res = await fetch("/api/login");
    if (!res.ok) {
      throw new Error("Something went wrong fetching user " + res.statusText);
    }
    const user = await res.json();
    setUser(user);
    setUsername(user.username);
  }

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <LoginContext.Provider
      value={{
        username,
        user,
        loadUser,
        client_id: GOOGLE_CLIENT_ID,
      }}
    >
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
            <Route path={"/login/callback"} element={<LoginCallback />} />
            <Route path={"/profile"} element={<ProfilePage />} />
            <Route path={"*"} element={<h2>404 not found</h2>} />
          </Routes>
        </main>
        <footer>Lecture 9: Open ID Connect</footer>
      </MoviesContext.Provider>
    </LoginContext.Provider>
  );
}
