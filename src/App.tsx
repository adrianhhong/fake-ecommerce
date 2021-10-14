import Main from "./views/Main";
import Profile from "./views/Profile";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#509ab5",
    },
    secondary: {
      main: "#6b6b6b",
    },
  },
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div>
          <Switch>
            <Route path="/profile">
              <Profile />
            </Route>
            <Route path="/">
              <Main />
            </Route>
          </Switch>
        </div>
      </Router>
    </ThemeProvider>
  );
}
