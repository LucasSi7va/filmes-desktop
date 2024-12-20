import React, { useState, useEffect } from "react";
import { getGenres } from "../services/tmdb";

const SearchBar = ({ onSearch }) => {
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchGenres = async () => {
      const genresData = await getGenres();
      setGenres(genresData);
    };
    fetchGenres();
  }, []);

  const handleGenreChange = (e) => {
    const value = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setSelectedGenres(value);
  };

  const handleSearch = () => {
    onSearch({ genres: selectedGenres, query });
  };

  return (
    <div className="search-bar">
      <select multiple value={selectedGenres} onChange={handleGenreChange}>
        {genres.map((genre) => (
          <option key={genre.id} value={genre.id}>
            {genre.name}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Pesquisar por título..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Buscar</button>
    </div>
  );
};

export default SearchBar;
