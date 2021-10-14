import Main from "./views/Main";
import Profile from "./views/Profile";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#5a6283",
    },
    secondary: {
      main: "#ffcdd5",
    },
  },
  typography: {
    fontFamily: "Inter",
  },
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router basename={process.env.PUBLIC_URL}>
        <Switch>
          <Route exact path="/">
            <Main />
          </Route>
          <Route exact path="/profile">
            <Profile />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}
