import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { API_KEY } from "../app/config";
import apiService from "../app/apiService";
import { CardContent, CardActions, Typography, Card } from "@mui/material";
import { Box } from "@mui/system";
import ReactPlayer from "react-player";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const getDataFromLocalStorage = () => {
  try {
    return JSON.parse(localStorage.getItem("favorite")) || [];
  } catch (err) {
    return [];
  }
};

function DetailPage() {
  let params = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [video, setVideo] = useState([]);
  const [movieDetail, setMovieDetail] = useState([]);
  const [favorites, setFavorites] = useState(getDataFromLocalStorage());

  const addFavorite = () => {
    let arr = favorites;
    if (favorites.includes(movieDetail.id)) {
      arr.splice(favorites.indexOf(movieDetail.id), 1);
    } else {
      arr.push(movieDetail.id);
    }
    setFavorites([...arr]);
    localStorage.setItem("favorite", JSON.stringify(favorites));
  };

  useEffect(() => {
    const getVideos = async () => {
      setLoading(true);
      try {
        const res = await apiService.get(
          `/3/movie/${params.id}/videos?api_key=${API_KEY}&append_to_response=videos`
        );
        setVideo(res.data.results);
        setError("");
      } catch (error) {
        console.log(error);
        setError(error.message);
      }
      setLoading(false);
    };
    getVideos();

    const getMovies = async () => {
      setLoading(true);
      try {
        const res = await apiService.get(
          `/3/movie/${params.id}?api_key=${API_KEY}&language=en-US`
        );
        setMovieDetail(res.data);
        setError("");
      } catch (error) {
        console.log(error);
        setError(error.message);
      }
      setLoading(false);
    };
    getMovies();
  }, [params.id]);

  return (
    <Card
      sx={{
        width: "100%",
        height: "100vh",
        padding: { sm: "0px 30px", md: "0px 70px" },
        display: "flex",
        flexDirection: "column",
        marginTop: "65px",
      }}
    >
      {/* Should use arr?.map(...) to ask if the array existed */}
      <ReactPlayer
        url={video?.map((v) => `https://www.youtube.com/embed/${v.key}`)}
        width={"100%"}
        height={"100%"}
        volume={0.03}
        // controls={true}
      />

      <Box
        sx={{
          display: ["block", "block", "grid"],
          gridTemplateColumns: "minmax(0,2fr) minmax(0,1fr);",
          paddingX: "1.5rem",
          boxShadow: "rgb(0 0 0 / 75%) 0px 3px 10px",
        }}
      >
        <CardContent>
          <Typography
            gutterBottom
            component="div"
            sx={{ fontWeight: "bold", fontSize: ["25px", "30px", "35px"] }}
          >
            {movieDetail.original_title}
          </Typography>
          <CardActions
            sx={{
              display: "flex",
              alignItems: "center",
              padding: "0px",
              marginLeft: "0",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                borderRadius: "50%",
                border: "solid 2px",
                color: "#46d369",
                height: "2.8rem",
                width: "2.8rem",
                marginRight: "0.5rem",
              }}
            >
              <Typography
                sx={{
                  fontSize: "0.9rem",
                  fontWeight: "bold",
                  color: "white",
                  padding: "0.5rem",
                  margin: "auto 0px",
                }}
              >
                {movieDetail.vote_average}
              </Typography>
            </Box>

            {favorites.includes(movieDetail.id) ? (
              <FavoriteIcon
                onClick={() => addFavorite()}
                sx={{ cursor: "pointer", fontSize: "2rem", color: "red" }}
              />
            ) : (
              <FavoriteBorderIcon
                onClick={() => addFavorite()}
                sx={{ cursor: "pointer", fontSize: "2rem", color: "red" }}
              />
            )}
          </CardActions>
          <Typography
            sx={{
              fontSize: "1.2rem",
              letterSpacing: "0.2rem",
              fontWeight: "540",
              lineHeight: "2",
              marginTop: "1rem",
              color: "whitesmoke",
              textTransform: "uppercase",
            }}
          >
            overview
          </Typography>
          <Typography
            variant="body2"
            sx={{
              lineHeight: "2",
              color: "whitesmoke",
              paddingRight: "0.5rem",
            }}
          >
            {movieDetail.overview}
          </Typography>
        </CardContent>

        <CardContent sx={{ margin: "auto 0px" }}>
          <Typography
            gutterBottom
            variant="body"
            component="div"
            sx={{ display: "flex" }}
          >
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ lineHeight: "2", fontStyle: "bold" }}
            >
              Genres:
            </Typography>
            <Typography
              variant="body2"
              sx={{ lineHeight: "2", color: "white", marginLeft: "0.5rem" }}
            >
              {movieDetail.genres?.map((g) => g.name).join(", ")}
            </Typography>
          </Typography>
          <Typography sx={{ display: "flex" }}>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ lineHeight: "2" }}
            >
              Tagline:
            </Typography>
            <Typography
              variant="body2"
              sx={{ lineHeight: "2", color: "white", marginLeft: "0.5rem" }}
            >
              {movieDetail.tagline}
            </Typography>
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
}

export default DetailPage;
