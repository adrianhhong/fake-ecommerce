import {} from "@mui/material";
import { CartItemType } from "../../client/types";

type Props = {
  item: CartItemType;
  removeFromCart: (clickedItem: CartItemType) => void;
};

const CartItem: React.FC<Props> = ({ item, removeFromCart }) => {
  return <div></div>;
};

export default CartItem;
