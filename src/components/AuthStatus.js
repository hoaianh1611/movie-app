import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Link, useLocation } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import useAuth from "../hooks/useAuth";
import LogoutIcon from "@mui/icons-material/Logout";

function AuthStatus() {
  let location = useLocation();
  let auth = useAuth();
  let navigate = useNavigate();

  if (!auth.isAuthenticated) {
    return (
      <Button
        color="inherit"
        startIcon={<LoginIcon />}
        component={Link}
        to="/login"
      >
        Sign In
      </Button>
    );
  } else {
    return (
      <Button
        color="inherit"
        startIcon={<AccountCircleIcon style={{ width: 34, height: 34 }} />}
        endIcon={<LogoutIcon />}
        onClick={() => {
          auth.logout(() => navigate("/"));
        }}
        style={{ textTransform: "none" }}
      >
        {auth.user.username}
      </Button>
    );
  }
}

export default AuthStatus;
