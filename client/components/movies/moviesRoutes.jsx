import { Route, Routes } from "react-router-dom";
import React from "react";
import { MoviesList } from "./moviesList";
import { AddMovieForm } from "./addMovieForm";
import { LoginPage } from "../login/loginPage";

export function MoviesRoutes() {
  return (
    <Routes>
      <Route path={"/"} element={<h2>Front page</h2>} />
      <Route path={"/movies"} element={<MoviesList />} />
      <Route path={"/movies/new"} element={<AddMovieForm />} />
      <Route path={"/login"} element={<LoginPage />} />
      <Route path={"*"} element={<h2>404 not found</h2>} />
    </Routes>
  );
}
