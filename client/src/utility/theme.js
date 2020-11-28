import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#e2c599",
      main: "#8d7141",
      dark: "#4f3e13"
    },
    secondary: {
      light: "#82c098",
      main: "#21825C",
      dark: "#005237"
    },
    info: {
      light: "#e1c6a7",
      main: "#e29a60",
      dark: "#e88441"
    }
  },
  typography: {
    fontFamily: "inherit",
    fontSize: "inherit"
  }
});

export default theme;
