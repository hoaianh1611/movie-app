import React, { useEffect, useState } from "react";
import { Box, Card, CardMedia, Grid, Typography } from "@mui/material";
import { API_KEY } from "../app/config";
import apiService from "../app/apiService";
import { useNavigate, useSearchParams } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

function SearchPage() {
  const navigate = useNavigate();

  // let favoriteList = getDataFromLocalStorage();
  // const [favorites, setFavorites] = useState(getDataFromLocalStorage());

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [movieResults, setMovieResults] = useState([]);
  let [searchParams, setSearchParams] = useSearchParams();
  let movie = searchParams.get("movie");

  useEffect(() => {
    const getMovies = async () => {
      setLoading(true);
      try {
        const res = await apiService.get(
          `/3/search/movie?api_key=${API_KEY}&language=en-US&page=1&query=${movie}&include_adult=false`
        );
        setMovieResults(res.data.results);
        setError("");
        console.log(res);
      } catch (error) {
        console.log(error);
        setError(error.message);
      }
      setLoading(false);
    };
    getMovies();
  }, [movie]);

  return (
    <div>
      <Grid
        container
        spacing={2}
        mt={7}
        maxWidth={"100%"}
        sx={{ padding: { sm: "0px 30px", md: "0px 70px" } }}
      >
        {movieResults
          .filter((movie) => {
            return movie.title != null;
          })
          .map((movie) => (
            <Grid key={movie.id} item padding={1} xs={2}>
              <Card sx={{ cursor: "pointer" }}>
                <CardMedia
                  onClick={() => navigate(`/film/${movie.id}`)}
                  component="img"
                  image={
                    movie.poster_path === null
                      ? "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png"
                      : `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  }
                  alt=""
                />
                <Box
                  sx={{
                    padding: "0.5rem 0.4rem",
                    backgroundColor: "black",
                  }}
                >
                  <Typography
                    gutterBottom
                    sx={{
                      display: "inline-block",
                      fontSize: "0.7rem",
                      fontWeight: "550",
                      height: "1.9rem",
                      overflow: "hidden",
                      marginY: "0.04vw",
                      textOverflow: "ellipsis",
                    }}
                    component="div"
                  >
                    {movie.title}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      width: "100%",
                      boxShadow: "none",
                      alignItems: "flex-start",
                    }}
                  >
                    <Typography
                      sx={{
                        width: "22px",
                        fontSize: "0.7rem",
                        fontWeight: "bold",
                        color: "#46d369",
                        marginRight: "0.5rem",
                        border: "solid 1px",
                        textAlign: "center",
                        padding: "1.5px",
                        borderRadius: "5px",
                      }}
                    >
                      {movie.vote_average}
                    </Typography>
                    {/* {favoriteList.includes(movieId) ? (
                    <FavoriteIcon
                      onClick={() => addFavorite()}
                      sx={{ cursor: "pointer", fontSize: "1rem", color: "red" }}
                    />
                  ) : (
                    <FavoriteBorderIcon
                      onClick={() => addFavorite()}
                      sx={{ cursor: "pointer", fontSize: "1rem", color: "red" }}
                    />
                  )} */}
                  </Box>
                </Box>
              </Card>
            </Grid>
          ))}
      </Grid>
    </div>
  );
}

export default SearchPage;
