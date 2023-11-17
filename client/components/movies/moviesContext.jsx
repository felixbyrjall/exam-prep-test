import React from "react";

const MoviesContext = React.createContext({
    fetchMovies: async () => [],
    onSaveMovie: async (movie) => {
    },
});