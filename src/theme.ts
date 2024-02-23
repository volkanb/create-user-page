import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: '#1e7898'
    },
  },
  typography: {
    button: {
      textTransform: 'none'
    }
  },
});

export default theme;