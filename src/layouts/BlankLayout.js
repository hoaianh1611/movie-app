import { Outlet } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Logo from "../components/Logo";
import { Stack } from "@mui/material";

const HeaderStyle = styled("header")(({ theme }) => ({
  top: "0%",
  left: "0%",
  position: "absolute",
}));

function BlankLayout() {
  return (
    <Stack
      height={"100vh"}
      justifyContent="center"
      alignItems="center"
      sx={{
        backgroundImage: {
          sm: "url(https://assets.nflxext.com/ffe/siteui/vlv3/3e521d6d-a53b-4c3f-a85f-dd77c06f7ac7/54cd5a62-8b2a-44f8-a55a-4c1a62028228/VN-en-20220425-popsignuptwoweeks-perspective_alpha_website_medium.jpg)",
        },
        backgroundColor: ["rgba(0, 0, 0)"],
        opacity: {
          md: "80%",
        },
        minHeight: { sm: "100vh" },
      }}
    >
      <HeaderStyle>
        <Logo sx={{ width: ["90px", "180px"], margin: "1.5rem" }} />
      </HeaderStyle>
      <Outlet />
    </Stack>
  );
}

export default BlankLayout;
