import { CartItemType } from "../../client/types";
import CartItem from "./CartItem";

type Props = {
  cartItems: CartItemType[];
  removeFromCart: (clickedItem: CartItemType) => void;
};

const Cart: React.FC<Props> = ({ cartItems, removeFromCart }) => {
  return (
    <div>
      <h2>Shopping Cart</h2>
      {cartItems?.length === 0 ? <p>You have no items.</p> : null}
      {cartItems?.map((item) => (
        <CartItem item={item} removeFromCart={removeFromCart} key={item.id} />
      ))}
    </div>
  );
};

export default Cart;
