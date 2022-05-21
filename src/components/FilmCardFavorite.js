import React from "react";
import { Grid, Typography } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import CardFavorite from "./CardFavorite";

const getDataFromLocalStorage = () => {
  try {
    return JSON.parse(localStorage.getItem("favorite")).list || [];
  } catch (err) {
    return [];
  }
};

function FilmCardFavorite() {
  let favoriteList = getDataFromLocalStorage();

  let settings;

  if (favoriteList.length < 6) {
    let slidenums = favoriteList.length;
    settings = {
      slidesToShow: slidenums,
      slidesToScroll: slidenums,
      variableWidth: true,
      responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: slidenums,
            slidesToScroll: slidenums,
            variableWidth: true,
          },
        },
        {
          breakpoint: 1000,
          settings: {
            slidesToShow: slidenums,
            slidesToScroll: slidenums,
            variableWidth: true,
          },
        },
        {
          breakpoint: 800,
          settings: {
            slidesToShow: slidenums,
            slidesToScroll: slidenums,
            variableWidth: true,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: slidenums,
            slidesToScroll: slidenums,
            arrows: false,
            variableWidth: true,
          },
        },
      ],
    };
  } else {
    settings = {
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
  }

  return (
    <>
      {favoriteList.length === 0 ? (
        <Typography
          sx={{
            fontSize: "1.5rem",
            textAlign: "center",
            color: "red",
            height: "100px",
          }}
        >
          Add your favorite movie
        </Typography>
      ) : (
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
            {favoriteList.map((movie) => (
              <Grid
                key={movie}
                item
                padding={1}
                sx={{
                  flexShrink: 0,
                  zIndex: "2",
                }}
              >
                <CardFavorite favMovieId={movie} />
              </Grid>
            ))}
          </Slider>
        </Grid>
      )}
    </>
  );
}

export default FilmCardFavorite;
