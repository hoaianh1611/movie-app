import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { API_KEY } from "../app/config";
import apiService from "../app/apiService";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import CardItem from "./CardItem";

//settings of slick sliider
const settings = {
  dots: true,
  infinite: true,
  arrows: true,
  slidesToShow: 9,
  slidesToScroll: 9,
  responsive: [
    {
      breakpoint: 1300,
      settings: {
        dots: true,
        infinite: true,
        slidesToShow: 8,
        slidesToScroll: 8,
      },
    },
    {
      breakpoint: 1250,
      settings: {
        dots: true,
        infinite: true,
        slidesToShow: 7,
        slidesToScroll: 7,
      },
    },
    {
      breakpoint: 1150,
      settings: {
        dots: true,
        infinite: true,
        slidesToShow: 6,
        slidesToScroll: 6,
      },
    },
    {
      breakpoint: 1000,
      settings: {
        dots: true,
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 5,
      },
    },
    {
      breakpoint: 800,
      settings: {
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 4,
      },
    },
    {
      breakpoint: 500,
      settings: {
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 3,
      },
    },
  ],
};

function FilmCard({ genreId }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      setLoading(true);
      try {
        const res = await apiService.get(
          `/3/discover/movie?api_key=${API_KEY}&language=en-US&page=1&with_genres=${genreId}`
        );
        setMovies(res.data.results);
        setError("");
      } catch (error) {
        console.log(error);
        setError(error.message);
      }
      setLoading(false);
    };
    getMovies();
  }, [genreId]);

  return (
    <div>
      <Grid
        container
        spacing={1.5}
        mt={1}
        wrap={"nowrap"}
        sx={{
          display: "inline-block",
          py: 10,
          my: -10,
        }}
      >
        <Slider {...settings}>
          {movies.map((movie) => (
            <Grid
              key={movie.id}
              item
              padding={1}
              sx={{
                flexShrink: 0,
              }}
            >
              <CardItem
                movieId={movie.id}
                moviePosterPath={movie.poster_path}
                movieTitle={movie.title}
                movieOverview={movie.overview}
                movieVote={movie.vote_average}
                movieBackdropPath={movie.backdrop_path}
              />
            </Grid>
          ))}
        </Slider>
      </Grid>
    </div>
  );
}

export default FilmCard;
