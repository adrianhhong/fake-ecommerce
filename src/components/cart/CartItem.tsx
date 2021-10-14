import { Card, CardContent, CardMedia, Typography, Box } from "@mui/material";
import { CartItemType } from "../../client/types";

type Props = {
  item: CartItemType;
};

const CartItem: React.FC<Props> = ({ item }) => {
  return (
    <div>
      <Card
        sx={{
          height: 400,
          width: 400,
          mt: 3,
          p: 1,
          border: 2,
          borderColor: "#ddd",
          borderRadius: "2%",
          boxShadow: "none",
        }}
      >
        <Box display="flex" justifyContent="center" alignItems="center">
          <CardMedia
            component="img"
            sx={{
              width: "auto",
              maxHeight: "200px",
            }}
            image={item.image}
            alt={item.title}
          />
        </Box>
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            ${item.price}
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            {item.title}
          </Typography>
          <Typography gutterBottom variant="h6" component="div" align="left">
            Quantity: {item.quantity}
          </Typography>
          <Typography gutterBottom variant="h6" component="div" align="right">
            <b> SUBTOTAL: ${item.quantity * item.price} </b>
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default CartItem;
