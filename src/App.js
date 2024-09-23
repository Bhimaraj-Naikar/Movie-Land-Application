import { useState, useEffect } from "react";
import "./App.css";
import MovieCard from "./MovieCard.jsx";
import searchIcon from "./search.svg";
//a4928ae1
const API_URL = "http://www.omdbapi.com?apikey=a4928ae1"; // API URL with API key
const movie = {
  Title: "Spiderman in Cannes",
  Year: "2016",
  imdbID: "tt5978586",
  Type: "movie",
  Poster:
    "https://m.media-amazon.com/images/M/MV5BZDlmMGQwYmItNTNmOS00OTNkLTkxNTYtNDM3ZWVlMWUyZDIzXkEyXkFqcGdeQXVyMTA5Mzk5Mw@@._V1_SX300.jpg",
};

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`); //this is going to call our API
    const data = await response.json();

    setMovies(data.Search);
  };

  useEffect(
    () => {
      searchMovies("Superman");
    },
    [] /*<=This is empty dependency array */
  );
  return (
    <div className="app">
      <h1>MovieLand</h1>

      <div className="search">
        <input
          type="text"
          placeholder="Search for movie"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img
          src={searchIcon}
          alt="search"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No Movie Found</h2>
        </div>
      )}

      <div className="container">
        <MovieCard movie={movie} />
      </div>
    </div>
  );
};
export default App;
