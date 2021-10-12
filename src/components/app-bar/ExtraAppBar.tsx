import BasicAppBar from "./BasicAppBar";
import { AppBar, Box, Toolbar, IconButton, Badge } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link } from "react-router-dom";

type Props = {
  cartItems: number;
  clickCart: () => void;
};

const ButtonAppBar: React.FC<Props> = ({ cartItems, clickCart }) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <BasicAppBar />
          <Link to="/profile">
            <IconButton size="large" edge="start" color="inherit">
              <AccountCircleIcon />
            </IconButton>
          </Link>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            sx={{ ml: 1 }}
            onClick={clickCart}
          >
            <Badge badgeContent={cartItems} color="error"></Badge>
            <ShoppingCartIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default ButtonAppBar;
