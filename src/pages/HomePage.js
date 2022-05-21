import React from "react";
import Featured from "../components/Featured";
import FilmList from "../components/FilmList";
import MovieGenreFilter from "../components/MovieGenreFilter";

function HomePage() {
  return (
    <div>
      <Featured />
      <MovieGenreFilter />
      <FilmList />
    </div>
  );
}

export default HomePage;
