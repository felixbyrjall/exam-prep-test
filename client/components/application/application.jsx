import React, { useEffect, useState } from "react";
import { LoginContext } from "../login/loginContext";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

import { LoginNavLink } from "../login/loginNavLink";
import { LoginPage } from "../login/loginPage";
import { ProfilePage } from "../profile/profilePage";
import { LoginCallback } from "../login/loginCallback";

import { ListMovies } from "../movies/listMovies";
import { AddMovies } from "../movies/addMovies";

// eslint-disable-next-line no-undef
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;

export function Application() {
  const [username, setUsername] = useState();
  const [user, setUser] = useState();

  async function loadUser() {
    try {
      const res = await fetch("/api/login");
      if (!res.ok) {
        throw new Error("Something went wrong fetching user " + res.statusText);
      }
      const userData = await res.json();
      setUser(userData);
      setUsername(userData.username);
    } catch (error) {
      console.error("Error loading user:", error);
    }
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
      <BrowserRouter>
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
          <Routes>
            <Route path={"/"} element={<h2>Front page</h2>} />
            <Route path={"/movies"} element={<ListMovies />} />
            <Route path={"/movies/new"} element={<AddMovies />} />
            <Route path={"/login"} element={<LoginPage />} />
            <Route path={"/login/callback"} element={<LoginCallback />} />
            <Route path={"/profile"} element={<ProfilePage />} />
            <Route path={"*"} element={<h2>404 not found</h2>} />
          </Routes>
        </main>
        <footer></footer>
      </BrowserRouter>
    </LoginContext.Provider>
  );
}
