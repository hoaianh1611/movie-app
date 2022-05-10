import { Link as RouterLink } from "react-router-dom";
import { Box } from "@mui/material";
import logoImg from "../logo.png";

function Logo({ disabledLink = false, sx }) {
  const logo = (
    <Box
      sx={{
        width: "95px",
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        backgroundColor: "transparent",
        ...sx,
      }}
    >
      <img src={logoImg} alt="logo" width="100%" />
    </Box>
  );

  if (disabledLink) {
    return <>{logo}</>;
  }

  return <RouterLink to="/">{logo}</RouterLink>;
}

export default Logo;
