import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Badge,
} from "@mui/material";
import StorefrontIcon from "@mui/icons-material/Storefront";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

type Props = {
  cartItems: number;
  clickCart: () => void;
};

const ButtonAppBar: React.FC<Props> = ({ cartItems, clickCart }) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <StorefrontIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Kwik-E-Comm
          </Typography>
          <Button color="inherit" onClick={clickCart}>
            <Badge badgeContent={cartItems} color="success"></Badge>
            <ShoppingCartIcon />
          </Button>
          <Button color="inherit">
            <AccountCircleIcon />
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default ButtonAppBar;
