import { Typography, IconButton } from "@mui/material";
import StorefrontIcon from "@mui/icons-material/Storefront";
import { Link } from "react-router-dom";

const BasicAppBar = () => {
  return (
    <>
      <Link to="/">
        <IconButton size="large" edge="start" color="secondary" sx={{ mr: 2 }}>
          <StorefrontIcon />
        </IconButton>
      </Link>
      <Typography
        variant="h6"
        component="div"
        sx={{
          flexGrow: 1,
          overflow: "hidden",
          textOverflow: "ellipsis",
          display: "-webkit-box",
          WebkitLineClamp: 1,
          WebkitBoxOrient: "vertical",
        }}
      >
        Fake E-commerce Site
      </Typography>
    </>
  );
};

export default BasicAppBar;
