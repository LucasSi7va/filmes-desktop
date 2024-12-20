// src/services/tmdb.js
import axios from "axios";

const API_KEY = "b861b99806c1aaa1c6f8b636986937fe"; // Substitua pela sua API Key
const BASE_URL = "https://api.themoviedb.org/3";

const tmdb = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: "pt-BR", // Configura para português
  },
});

// Busca gêneros
export const getGenres = async () => {
  const response = await tmdb.get("/genre/movie/list");
  return response.data.genres;
};

// Busca filmes por gênero
export const getMoviesByGenre = async (genreId, page = 1) => {
  const response = await tmdb.get("/discover/movie", {
    params: {
      with_genres: genreId,
      page,
    },
  });
  return response.data.results;
};

// Busca detalhes do filme
export const getMovieDetails = async (movieId) => {
  const response = await tmdb.get(`/movie/${movieId}`, {
    params: {
      append_to_response: "videos",
    },
  });
  return response.data;
};

// Busca filmes por título
export const searchMovies = async (query, page = 1) => {
  const response = await tmdb.get("/search/movie", {
    params: {
      query,
      page,
    },
  });
  return response.data.results;
};
