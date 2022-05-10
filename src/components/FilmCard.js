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

//need set display to
const settings = {
  dots: true,
  infinite: true,
  slidesToShow: 7,
  slidesToScroll: 7,
  responsive: [
    {
      breakpoint: 1200,
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
        dots: true,
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 4,
      },
    },
    {
      breakpoint: 600,
      settings: {
        dots: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 3,
      },
    },
  ],
};

function FilmCard({ movieId }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [movies, setMovies] = useState([]);
  const [isShown, setIsShown] = useState(false);

  useEffect(() => {
    const getMovies = async () => {
      setLoading(true);
      try {
        const res = await apiService.get(
          `/3/discover/movie?api_key=${API_KEY}&language=en-US&page=1&with_genres=${movieId}`
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
  }, [movieId]);

  const navigate = useNavigate();
  return (
    <div>
      <Grid
        container
        spacing={1.5}
        mt={1}
        wrap={"nowrap"}
        style={{ display: "inline-block", zIndex: "1" }}
      >
        <Slider {...settings}>
          {movies.map((movie) => (
            <Grid
              key={movie.id}
              item
              padding={1}
              sx={{ flexShrink: 0, zIndex: "1" }}
            >
              <Card
                onClick={() => navigate(`/film/${movie.id}`)}
                sx={{ cursor: "pointer" }}
                onMouseEnter={() => setIsShown(true)}
                onMouseLeave={() => setIsShown(false)}
              >
                <CardMedia
                  component="img"
                  image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt="green iguana"
                />
                {isShown && (
                  <div>I'll appear when you hover over the button.</div>
                )}
              </Card>
            </Grid>
          ))}
        </Slider>
      </Grid>
    </div>
  );
}

export default FilmCard;
