import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { API_KEY } from "../app/config";
import apiService from "../app/apiService";
import {
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  Typography,
  Container,
} from "@mui/material";

function DetailPage() {
  let params = useParams();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [video, setVideo] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
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
    getMovies();
  }, [params.id]);
  console.log(video);

  return (
    <div>
      {video.slice(0, 1).map((v) => (
        <Container
          sx={{
            width: "100%",
            height: "100vh",
            padding: { sm: "5px 30px", md: "5px 70px" },
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Card
            sx={{
              boxShadow: "none",
              backgroundImage: "none",
              alignSelf: "center",
            }}
          >
            <iframe
              src={`https://www.youtube.com/embed/${v.key}?autoplay=1&mute=1`}
              frameborder="0"
              width="560"
              height="315"
              title={"video"}
            ></iframe>
          </Card>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Lizard
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Lizards are a widespread group of squamate reptiles, with over
              6,000 species, ranging across all continents except Antarctica
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Share</Button>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Container>
      ))}
    </div>
  );
}

export default DetailPage;
