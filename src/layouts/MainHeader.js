import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Logo from "../components/Logo";
import AuthStatus from "../components/AuthStatus";
import { useScrollPosition } from "react-use-scroll-position";
import gradient from "gradient-color";

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
      position="sticky"
      style={{
        transitionDuration: 0.5,
        backgroundImage: "none",
        backgroundColor: y > 100 ? "rgba(0, 0, 0)" : "transparent",
      }}
    >
      <Toolbar
        sx={{
          backgroundColor: "transparent!important",
          padding: { sm: "0px 30px", md: "0px 70px" },
        }}
      >
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <Logo />
        </IconButton>

        <Box sx={{ flexGrow: 1 }} />
        <AuthStatus />
      </Toolbar>
    </AppBar>
  );
}

export default MainHeader;
