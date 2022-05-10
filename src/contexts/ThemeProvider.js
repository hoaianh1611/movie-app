import { CssBaseline } from "@mui/material";
import {
  createTheme,
  ThemeProvider as MUIThemeProvider,
} from "@mui/material/styles";

const PRIMARY = {
  lighter: "#ff8b6c",
  light: "#ff5740",
  main: "#e50914",
  dark: "#aa0000",
  darker: "#e4472c",
  contrastText: "#FFFFFF",
};
const SECONDARY = {
  lighter: "#ffffff",
  light: "#ffffff",
  main: "#f3f3f3",
  dark: "#c0c0c0",
  darker: "#cccccc",
  contrastText: "#000000",
};
const SUCCESS = {
  lighter: "#E9FCD4",
  light: "#AAF27F",
  main: "#54D62C",
  dark: "#229A16",
  darker: "#08660D",
  contrastText: "#FFF",
};

function ThemeProvider({ children }) {
  const themeOptions = {
    palette: {
      mode: "dark",
      primary: PRIMARY,
      secondary: SECONDARY,
      success: SUCCESS,
    },
    shape: { borderRadius: 3 },
  };

  const theme = createTheme(themeOptions);

  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  );
}

export default ThemeProvider;
