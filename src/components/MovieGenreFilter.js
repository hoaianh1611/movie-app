import React, { useEffect, useState } from "react";
import apiService from "../app/apiService";
import { API_KEY } from "../app/config";
import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import FilmCard from "./FilmCard";
import { useNavigate } from "react-router-dom";

function MovieGenreFilter() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [movieGenres, setMovieGenres] = useState([]);
  const [isShown, setIsShown] = useState(false);
  const [display, setDisplay] = useState(false);

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

  return (
    <>
      <Box
        width={"100%"}
        display={"flex"}
        position="relative"
        alignItems="center"
        margin={"5px auto"}
        top={5}
        sx={{ padding: { sm: "0px 30px", md: "0px 70px" } }}
      >
        <Typography fontSize={"1.5rem"} fontWeight={"bold"}>
          Movies
        </Typography>

        <Box
          onClick={() => {
            isShown === true ? setIsShown(false) : setIsShown(true);
          }}
          display={"flex"}
          alignItems="center"
          sx={{
            ml: 2,
            border: "solid 1px white",
            padding: "0px 0.3rem",
            cursor: "pointer",
          }}
        >
          <Typography
            sx={{
              mr: 2,
              textAlign: "center",
              fontSize: "0.9rem",
            }}
          >
            Genres
          </Typography>
          <ArrowDropDownIcon />
        </Box>
      </Box>
      {isShown && (
        <Grid
          container
          spacing={1}
          padding={1}
          maxWidth={"440px"}
          ml={21}
          position="absolute"
          zIndex={23}
          border="solid 1px rgba(255,255,255,.15)"
          // top={55}
          sx={{
            backgroundColor: "rgba(0,0,0,.9)",
            ml: { xs: 12, sm: 16, md: 21 },
          }}
        >
          {movieGenres.map((g) => (
            <Grid key={g.id} item xs={4}>
              <Typography
                onClick={() => navigate(`/genre/${g.name}`)}
                fontSize={"0.9rem"}
                sx={{ cursor: "pointer" }}
              >
                {g.name}
              </Typography>
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
}

export default MovieGenreFilter;
