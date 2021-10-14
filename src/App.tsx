import Main from "./views/Main";
import Profile from "./views/Profile";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  HashRouter,
} from "react-router-dom";
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
      <HashRouter>
        <Router>
          <div>
            <Switch>
              <Route exact path="/">
                <Main />
              </Route>
              <Route path="/profile">
                <Profile />
              </Route>
            </Switch>
          </div>
        </Router>
      </HashRouter>
    </ThemeProvider>
  );
}
