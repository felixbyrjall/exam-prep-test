import React, { useContext, useState } from "react";
import { MoviesContext } from "./moviesContext";
import { useNavigate } from "react-router-dom";

export function AddMovies() {
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [metacritic, setMetacritic] = useState("");
  const navigate = useNavigate();
  const { postNewMovie } = useContext(MoviesContext);

  async function handleSubmit(e) {
    e.preventDefault();
    postNewMovie({ title, year, metacritic }).then(() => {
      navigate("/movies");
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add movie</h2>
      <div>
        <div>
          TITLE:
          <input
            required
            name={"title"}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          YEAR:
          <input
            required
            name={"year"}
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
        </div>
        <div>
          METACRITIC:
          <input
            required
            name={"metacritic"}
            value={metacritic}
            onChange={(e) => setMetacritic(e.target.value)}
          />
        </div>
      </div>
      <div>
        <button>Submit</button>
      </div>
    </form>
  );
}
