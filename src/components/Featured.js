import React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { useNavigate } from "react-router-dom";

function Featured() {
  const navigate = useNavigate();
  return (
    <Card sx={{ cursor: "pointer" }}>
      <CardMedia
        onClick={() => navigate(`/film/836009`)}
        component="img"
        image={`https://image.tmdb.org/t/p/original/bnMKMhGJuvELSjRp8KpkuDsBDw2.jpg`}
        alt="green iguana"
      />
    </Card>
  );
}

export default Featured;
