import { Breadcrumbs, Card, CardMedia, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import {
  Link,
  Link as RouterLink,
  useNavigate,
  useParams,
} from "react-router-dom";
import apiService from "../app/apiService";
import { API_KEY } from "../app/config";
import useAuth from "../hooks/useAuth";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const getDataFromLocalStorage = () => {
  try {
    return JSON.parse(localStorage.getItem("favorite")).list || [];
  } catch (err) {
    return [];
  }
};

function GenrePage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [movies, setMovies] = useState([]);

  const navigate = useNavigate();
  let { genre } = useParams();

  let favoriteList = getDataFromLocalStorage();
  const { user } = useAuth();
  const [favorites, setFavorites] = useState(getDataFromLocalStorage());

  const addFavorite = (movieId) => {
    let arr = favorites;

    if (favorites.includes(movieId)) {
      arr.splice(favorites.indexOf(movieId), 1);
    } else {
      arr.push(movieId);
    }
    setFavorites([...arr]);
    localStorage.setItem(
      "favorite",
      JSON.stringify({ user: user.username, list: favorites })
    );
  };

  useEffect(() => {
    const getMovieGenres = async () => {
      setLoading(true);
      try {
        const res = await apiService.get(
          `/3/genre/movie/list?api_key=${API_KEY}&language=en-US`
        );
        const genres = res.data.genres;
        const id = genres.find((g) => g.name === genre)?.id;
        const res2 = await apiService.get(
          `/3/discover/movie?api_key=${API_KEY}&language=en-US&page=1&with_genres=${id}`
        );
        setMovies(res2.data.results);
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
      <Breadcrumbs
        separator="›"
        aria-label="breadcrumb"
        sx={{
          mb: 3,
          width: "100%",
          padding: { sm: "0px 30px", md: "0px 70px" },
          marginTop: "65px",
        }}
      >
        <Link
          underline="hover"
          component={RouterLink}
          to="/"
          style={{ color: "gray" }}
        >
          Homepage
        </Link>
        <Typography color="text.primary" fontWeight={550} fontSize="1.5rem">
          {genre}
        </Typography>
      </Breadcrumbs>
      <Grid
        container
        spacing={2}
        maxWidth={"100%"}
        sx={{ padding: { sm: "0px 30px", md: "0px 70px" } }}
      >
        {movies
          .filter((movie) => {
            return movie.title != null;
          })
          .map((movie) => (
            <Grid key={movie.id} item padding={1} sm={4} md={4} lg={3}>
              <Card sx={{ cursor: "pointer" }}>
                <CardMedia
                  onClick={() => navigate(`/film/${movie.id}`)}
                  component="img"
                  image={
                    movie.backdrop_path === null
                      ? "https://cdn.sanity.io/images/0vv8moc6/contobgyn/d198c3b708a35d9adcfa0435ee12fe454db49662-640x400.png"
                      : `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`
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
                      fontSize: "0.9rem",
                      fontWeight: "550",
                      height: "2.2rem",
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
                      alignItems: "center",
                      justifyContent: "flex-start",
                      mt: "0.5rem",
                    }}
                  >
                    <Typography
                      sx={{
                        width: "30px",
                        fontSize: "1rem",
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
                    {favoriteList.includes(movie.id) ? (
                      <FavoriteIcon
                        onClick={() => addFavorite(movie.id)}
                        sx={{
                          cursor: "pointer",
                          fontSize: "1.5rem",
                          color: "red",
                        }}
                      />
                    ) : (
                      <FavoriteBorderIcon
                        onClick={() => addFavorite(movie.id)}
                        sx={{
                          cursor: "pointer",
                          fontSize: "1.5rem",
                          color: "red",
                        }}
                      />
                    )}
                  </Box>
                </Box>
              </Card>
            </Grid>
          ))}
      </Grid>
    </>
  );
}

export default GenrePage;
