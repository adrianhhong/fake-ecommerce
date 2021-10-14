import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  Box,
} from "@mui/material";
import { ProductType } from "../../client/types";

type Props = {
  item: ProductType;
};

const Item: React.FC<Props> = ({ item }) => {
  return (
    <Card
      sx={{
        height: 600,
        p: 1,
      }}
    >
      <Box display="flex" justifyContent="center" alignItems="center">
        <CardMedia
          component="img"
          image={item.image}
          alt={item.title}
          sx={{
            width: "auto",
            maxHeight: "300px",
          }}
        />
      </Box>
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          ${item.price}
        </Typography>
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
          }}
        >
          {item.title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
          }}
        >
          {item.description}
        </Typography>
        <Chip label={item.category} variant="outlined" sx={{ mt: 1 }}></Chip>
      </CardContent>
    </Card>
  );
};

export default Item;
