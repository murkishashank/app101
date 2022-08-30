import { createTheme } from "@mui/material/styles";

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: "#eb0101",
    },
    secondary: {
      main: "#98a27f",
    },
  },
  components: {
    MuiButtonBase: {
      styleOverrides: {
        root: {
          "&:hover": {
            color: "#eb0101",
          },
        },
      },
    },
  },
});

export default theme;
