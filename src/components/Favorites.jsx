import React, { useState, useEffect } from "react";
import MovieCard from "./MovieCard";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(favs);
  }, []);

  if (!favorites.length) {
    return <p>Você ainda não adicionou filmes aos favoritos.</p>;
  }

  return (
    <div className="favorites-list">
      {favorites.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default Favorites;
