import React, { useContext, useEffect, useState } from "react";
import { MoviesContext } from "./moviesContext";

export function MoviesList() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  const { fetchMovies } = useContext(MoviesContext);

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
      <h2>List the movies</h2>
      {loading && <div>Spinner</div>}
      {movies.map((m) => (
        <div key={m._id}>{m.title}</div>
      ))}
    </>
  );
}
