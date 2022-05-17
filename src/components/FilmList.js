import { Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import apiService from "../app/apiService";
import { API_KEY } from "../app/config";
import FilmCard from "../components/FilmCard";
import FilmCardFavorite from "./FilmCardFavorite";

function FilmList() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [movieGenres, setMovieGenres] = useState([]);

  useEffect(() => {
    const getMovieGenres = async () => {
      setLoading(true);
      try {
        const res = await apiService.get(
          `/3/genre/movie/list?api_key=${API_KEY}&language=en-US`
        );
        setMovieGenres(res.data.genres);
        setError("");
      } catch (error) {
        console.log(error);
        setError(error.message);
      }
      setLoading(false);
    };
    getMovieGenres();
  }, []);

  //randomize movie genres to display different genres when refresh
  function shuffle(array) {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex !== 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }

  return (
    <div>
      <Grid
        container
        spacing={2}
        mt={1}
        maxWidth={"100%"}
        sx={{ padding: { sm: "0px 30px", md: "0px 70px" } }}
      >
        {shuffle(movieGenres)
          .slice(0, 5)
          .map((movieGenre) => (
            <Grid key={movieGenre.id} item width={"100%"}>
              <Typography fontWeight={"600"} fontSize={"20px"} mt={3}>
                {movieGenre.name} Movies
              </Typography>

              <FilmCard genreId={movieGenre.id} />
            </Grid>
          ))}
        <Grid key={"favoriteList"} item width={"100%"}>
          <Typography fontWeight={"600"} fontSize={"20px"} mt={3}>
            My Favorite Movies
          </Typography>

          <FilmCardFavorite />
        </Grid>
      </Grid>
    </div>
  );
}

export default FilmList;
