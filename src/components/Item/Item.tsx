import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
  CardActions,
  Chip,
  Button,
} from "@mui/material";
import { ProductType } from "../../client/types";

type Props = {
  item: ProductType;
};

const Item: React.FC<Props> = ({ item }) => {
  return (
    <Card
      sx={{
        height: 700,
      }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height="300"
          image={item.image}
          alt={item.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h4" component="div">
            ${item.price}
          </Typography>
          <Chip label={item.category} variant="outlined"></Chip>
          <Typography gutterBottom variant="h5" component="div">
            {item.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {item.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
};

export default Item;
