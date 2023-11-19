import React from "react";

export const MoviesContext = React.createContext({
  fetchMovies: async () => [],
  postNewMovie: async (movie) => {},
});
