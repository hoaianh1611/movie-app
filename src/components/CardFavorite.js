import React, { useEffect, useState } from "react";
import { API_KEY } from "../app/config";
import apiService from "../app/apiService";
import CardItem from "./CardItem";

function CardFavorite({ favMovieId }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [movieFavorite, setMovieFavorite] = useState([]);

  useEffect(() => {
    const getMovieFavorite = async () => {
      setLoading(true);
      try {
        const res = await apiService.get(
          `/3/movie/${favMovieId}?api_key=${API_KEY}&language=en-US`
        );
        setMovieFavorite(res.data);
        setError("");
      } catch (error) {
        console.log(error);
        setError(error.message);
      }
      setLoading(false);
    };
    getMovieFavorite();
  }, [favMovieId]);

  return (
    <CardItem
      movieId={movieFavorite.id}
      moviePosterPath={movieFavorite.poster_path}
      movieTitle={movieFavorite.title}
      movieOverview={movieFavorite.overview}
      movieVote={movieFavorite.vote_average}
      movieBackdropPath={movieFavorite.backdrop_path}
    />
  );
}

export default CardFavorite;
