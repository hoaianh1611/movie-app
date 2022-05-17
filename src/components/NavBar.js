import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import useAuth from "../hooks/useAuth";
import LogoutIcon from "@mui/icons-material/Logout";
import { Button, Card, Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import SearchBox from "./SearchBox";

function NavBar() {
  const [display, setDisplay] = useState([false]);
  let auth = useAuth();
  let navigate = useNavigate();

  if (auth.isAuthenticated) {
    return (
      <Container
        sx={{
          paddingRight: "0px",
          marginRight: "0px",
          width: "auto",
          display: "flex",
          position: "static",
        }}
      >
        <SearchBox />
        <Box
          sx={{
            marginLeft: "1rem",
            backgroundColor: "transparent",
            boxShadow: "none",
            borderRadius: "0px !important",
          }}
        >
          <Button
            onMouseEnter={() => setDisplay(true)}
            onMouseLeave={() => setDisplay(false)}
            color="inherit"
            style={{
              textTransform: "none",
              boxShadow: "none",
              background: "none",
            }}
          >
            <AccountCircleIcon
              style={{ width: 34, height: 34, marginRight: "0.5rem" }}
            />
            <ArrowDropDownIcon
              fontSize="large"
              color="inherit"
              sx={{
                padding: "0px",
                marginLeft: "0px",
                mt: 0.8,
                cursor: "pointer",
              }}
            />
          </Button>
          {display && (
            <Card
              onMouseEnter={() => setDisplay(true)}
              onMouseLeave={() => setDisplay(false)}
              sx={{
                backgroundColor: "rgba(0,0,0,0.7)",
                position: "absolute",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-around",
                padding: "0.9rem 0.7rem",
                marginLeft: "-30px",
                zIndex: 3,
              }}
            >
              <Typography sx={{ paddingBottom: 1 }}>
                Welcome {auth.user.username}!
              </Typography>
              <Button
                onClick={() => {
                  auth.logout(() => navigate("/"));
                }}
                color="inherit"
                sx={{
                  backgroundColor: "transparent",
                  color: "white",
                  textAlign: "center",
                }}
              >
                Sign Out <LogoutIcon sx={{ ml: 2 }} />
              </Button>
            </Card>
          )}
        </Box>
      </Container>
    );
  }
}

export default NavBar;
