import React from "react";
import { postJSON } from "../../func/postJSON";

export const MoviesContext = React.createContext({
  fetchMovies: async () => [],
  async postNewMovie(movie) {
    return await postJSON("/api/movies", movie);
  },
});
