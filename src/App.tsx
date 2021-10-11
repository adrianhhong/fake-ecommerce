import client from "./client";
import { ProductType, CartItemType } from "./client/types";
import Item from "./components/item/Item";
import AppBar from "./components/app-bar/AppBar";
import Cart from "./components/cart/Cart";
import { useState, useEffect } from "react";
import { Grid, Drawer } from "@mui/material";

const App = () => {
  const loggedInUser = 1;
  const [products, setProducts] = useState<ProductType[]>([]);
  const [cartIsOpen, setCartIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);

  useEffect(() => {
    (async function getProducts() {
      const products = await client.getProducts();
      if (products != null) {
        setProducts(products);
      }
    })();
  }, []);

  useEffect(() => {
    (async function getCart() {
      const cart = await client.getCart(loggedInUser);
      if (cart != null) {
        const mappedCartItems = cart.products.map((p) => {
          const product = products.find((item) => item.id === p.productId);
          if (product != null) return { ...product, quantity: p.quantity };
          return {
            id: 999,
            title: "Unknown",
            price: 0,
            category: "Unknown",
            description: "Unkown",
            image: "",
            quantity: 0,
          };
        });
        setCartItems(mappedCartItems);
      }
    })();
  }, [products]);

  const handleRemoveFromCart = () => {};

  return (
    <div>
      <AppBar
        cartItems={cartItems.length}
        clickCart={() => setCartIsOpen(true)}
      />
      <Drawer
        anchor="right"
        open={cartIsOpen}
        onClose={() => setCartIsOpen(false)}
      >
        <Cart
          cartItems={cartItems}
          removeFromCart={handleRemoveFromCart}
        ></Cart>
      </Drawer>

      <Grid container spacing={{ xs: 2 }}>
        {products?.map((p, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} xl={3} key={index}>
            <Item item={p}></Item>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default App;
