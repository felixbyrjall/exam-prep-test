import React, {useContext, useEffect, useState} from "react";
import {MoviesContext} from "./moviesContext";

export function MoviesList() {
    const [movies, setMovies] = useState([])
    const {fetchMovies} = useContext(MoviesContext)
    async function loadMovies(){
        setMovies(await fetchMovies());
    }

    useEffect(() => {
        loadMovies();
    }, []);

    return (
        <>
            <h2>List movies</h2>
            {movies.map((m) => (
                <div>{m.title}</div>
            ))}
        </>
    )
}