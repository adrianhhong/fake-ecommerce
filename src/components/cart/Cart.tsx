import { CartItemType } from "../../client/types";
import CartItem from "./CartItem";
import { Typography, Box } from "@mui/material";

type Props = {
  cartItems: CartItemType[];
};

const Cart: React.FC<Props> = ({ cartItems }) => {
  return (
    <Box sx={{ p: 1 }}>
      <Typography gutterBottom variant="h4" component="div">
        Shopping Cart
      </Typography>
      {cartItems?.length === 0 ? <p>You have no items.</p> : null}
      {cartItems?.map((item) => (
        <CartItem item={item} key={item.id} />
      ))}
    </Box>
  );
};

export default Cart;
