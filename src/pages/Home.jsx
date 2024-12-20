import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import MovieList from "../components/MovieList";
import { getMoviesByGenre, searchMovies } from "../services/tmdb";

const Home = () => {
  const [movies, setMovies] = useState([]);

  const handleSearch = async ({ genres, query }) => {
    let results = [];
    if (genres.length) {
      const genreParams = genres.join(",");
      const genreMovies = await getMoviesByGenre(genreParams);
      results = genreMovies;
    }
    if (query) {
      const searchedMovies = await searchMovies(query);
      results = results.length
        ? results.filter((movie) =>
            searchedMovies.some((sm) => sm.id === movie.id)
          )
        : searchedMovies;
    }
    setMovies(results);
  };

  return (
    <div className="home-page">
      <SearchBar onSearch={handleSearch} />
      <MovieList movies={movies} />
    </div>
  );
};

export default Home;
