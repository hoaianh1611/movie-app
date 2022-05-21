import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import useAuth from "../hooks/useAuth";

const getDataFromLocalStorage = () => {
  try {
    return JSON.parse(localStorage.getItem("favorite")).list || [];
  } catch (err) {
    return [];
  }
};
// const getUserFromLocalStorage = () => {
//   try {
//     return JSON.parse(localStorage.getItem("favorite")) || [];
//   } catch (err) {
//     return [];
//   }
// };

function CardItem({ movieId, moviePosterPath, movieTitle, movieVote }) {
  const [isShown, setIsShown] = useState(false);
  const navigate = useNavigate();
  let favoriteList = getDataFromLocalStorage();
  const { user } = useAuth();
  const [favorites, setFavorites] = useState(getDataFromLocalStorage());
  // const [dataLocalStorage, setDataLocalStorage] = useState(
  //   getUserFromLocalStorage()
  // );

  // console.log(user);
  // console.log(typeof dataLocalStorage);

  const addFavorite = () => {
    let arr = favorites;
    // let arrData = dataLocalStorage;

    // if (arrData.find((i) => i.user === user.username) === undefined) {
    //   setDataLocalStorage([...{ user: user.username, list: favoriteList }]);
    // }

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

  return (
    <Box>
      {isShown ? (
        <Card
          sx={{ cursor: "pointer" }}
          onMouseEnter={() => setIsShown(true)}
          onMouseLeave={() => setIsShown(false)}
        >
          <CardMedia
            onClick={() => navigate(`/film/${movieId}`)}
            component="img"
            image={`https://image.tmdb.org/t/p/w500${moviePosterPath}`}
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
              {movieTitle}
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
                {movieVote}
              </Typography>
              {favoriteList.includes(movieId) ? (
                <FavoriteIcon
                  onClick={() => addFavorite()}
                  sx={{ cursor: "pointer", fontSize: "1rem", color: "red" }}
                />
              ) : (
                <FavoriteBorderIcon
                  onClick={() => addFavorite()}
                  sx={{ cursor: "pointer", fontSize: "1rem", color: "red" }}
                />
              )}
            </Box>
          </Box>
        </Card>
      ) : (
        <Card
          sx={{ cursor: "pointer" }}
          onMouseEnter={() => setIsShown(true)}
          // onMouseLeave={() => setIsShown(false)}
        >
          <CardMedia
            onClick={() => navigate(`/film/${movieId}`)}
            component="img"
            image={`https://image.tmdb.org/t/p/w500${moviePosterPath}`}
            alt=""
          />
        </Card>
      )}
    </Box>
  );
}

export default CardItem;
