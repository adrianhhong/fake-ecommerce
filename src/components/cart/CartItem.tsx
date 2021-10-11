import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
  Chip,
} from "@mui/material";
import { CartItemType } from "../../client/types";

type Props = {
  item: CartItemType;
  removeFromCart: (clickedItem: CartItemType) => void;
};

const CartItem: React.FC<Props> = ({ item, removeFromCart }) => {
  return (
    <div>
      <Card
        sx={{
          height: 700,
          width: 500,
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
              {item.quantity}
            </Typography>
            <Typography gutterBottom variant="h5" component="div">
              {item.title}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
};

export default CartItem;
