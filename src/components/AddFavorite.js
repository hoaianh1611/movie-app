import React, { useState } from "react";

function getDataFromLocalStorage() {
  try {
    return JSON.parse(localStorage.getItem("favorite")) || [];
  } catch (err) {
    return [];
  }
}

function AddFavorite() {
  const [favorites, setFavorites] = useState(getDataFromLocalStorage());

  const addFavorite = (movieId) => {
    let arr = favorites;
    if (favorites.includes(movieId)) {
      arr.splice(favorites.indexOf(movieId), 1);
    } else {
      arr.push(movieId);
    }
    setFavorites([...arr]);
    localStorage.setItem("favorite", JSON.stringify(favorites));
  };
}

export { getDataFromLocalStorage, AddFavorite };
