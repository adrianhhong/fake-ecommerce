import { Typography, IconButton } from "@mui/material";
import StorefrontIcon from "@mui/icons-material/Storefront";
import { Link } from "react-router-dom";

const BasicAppBar = () => {
  return (
    <>
      <Link to="/">
        <IconButton size="large" edge="start" color="inherit" sx={{ mr: 2 }}>
          <StorefrontIcon />
        </IconButton>
      </Link>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        Kwik-E-Comm
      </Typography>
    </>
  );
};

export default BasicAppBar;
