import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Logo from "../components/Logo";
import { useScrollPosition } from "react-use-scroll-position";
import NavBar from "../components/NavBar";

// const colors = gradient(["#03fc2c", "#FD743C", "#03fc2c"], 100);

function MainHeader() {
  const { y } = useScrollPosition();
  // const getColor = (prev) => {
  //   if (prev >= 100) {
  //     return getColor(prev - 100);
  //   } else {
  //     // console.log(prev);
  //   }
  //   return colors[prev];
  // };

  return (
    <AppBar
      sx={{ display: y < 100 ? "block" : "none" }}
      style={{
        transitionDuration: 0.5,
        backgroundImage: "none",
        backgroundColor: "transparent",
        boxShadow: "none",
        marginTop: 0,
      }}
    >
      <Toolbar
        sx={{
          backgroundColor: "transparent!important",
          padding: { sm: "0px 30px", md: "0px 70px" },
          display: "flex",
          alignItems: "space-between",
        }}
      >
        <Logo />
        <NavBar />
      </Toolbar>
    </AppBar>
  );
}

export default MainHeader;
