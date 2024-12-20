import React, { useState, useEffect } from "react";
import { getMovieDetails } from "../services/tmdb";
import { useParams } from "react-router-dom";

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      const movieData = await getMovieDetails(id);
      setMovie(movieData);
      addToHistory(movieData);
    };
    fetchMovie();
  }, [id]);

  const addToHistory = (movie) => {
    const history = JSON.parse(localStorage.getItem("history")) || [];
    if (!history.some((m) => m.id === movie.id)) {
      history.push({
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
      });
      localStorage.setItem("history", JSON.stringify(history));
    }
  };

  if (!movie) return <p>Carregando...</p>;

  const trailer = movie.videos.results.find(
    (video) => video.type === "Trailer" && video.site === "YouTube"
  );

  return (
    <div className="movie-detail">
      <h2>{movie.title}</h2>
      <p>{movie.overview}</p>
      <p>
        <strong>Gêneros:</strong> {movie.genres.map((g) => g.name).join(", ")}
      </p>
      <p>
        <strong>Avaliação:</strong> {movie.vote_average}
      </p>
      {trailer && (
        <div className="trailer">
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${trailer.key}`}
            title="Trailer"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default MovieDetail;
