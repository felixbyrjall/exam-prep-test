import React, { useEffect, useState } from "react";
import { MoviesContext } from "./moviesContext";

export function ListMovies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  function postNewMovie(movie) {
    setMovies((oldMovies) => [...oldMovies, movie]);
  }
  async function fetchMovies() {
    const res = await fetch("/api/movies");
    return await res.json();
  }

  async function loadMovies() {
    setLoading(true);
    setMovies([]);
    setError(undefined);

    try {
      setMovies(await fetchMovies());
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadMovies();
  }, []);

  return (
    <>
      <MoviesContext.Provider
        value={{
          fetchMovies,
          postNewMovie,
        }}
      >
        <h2>List the movies</h2>
        {loading && <div>Spinner</div>}
        {movies.map((m) => (
          <div key={m._id}>
            <h4>
              {m.title} ({m.year}) - Metacritic: {m.metacritic}
            </h4>
          </div>
        ))}
      </MoviesContext.Provider>
    </>
  );
}
