import client from "../client";
import { ProductType, CartItemType, CategoryType } from "../client/types";
import Item from "../components/item/Item";
import AppBar from "../components/app-bar/AppBar";
import Cart from "../components/cart/Cart";
import Filter from "../components/filter/Filter";
import { useState, useEffect } from "react";
import { Grid, Drawer } from "@mui/material";

const Main = () => {
  const loggedInUser = 1;
  const [allProducts, setAllProducts] = useState<ProductType[]>([]);
  const [cartIsOpen, setCartIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [displayedProducts, setDisplayedProducts] = useState<ProductType[]>([]);

  // Load allProducts
  useEffect(() => {
    (async function getProducts() {
      const allProducts = await client.getProducts();
      if (allProducts != null) {
        setAllProducts(allProducts);
      }

      const allCategories = allProducts?.map((p) => p.category);
      if (allCategories != null) {
        const uniqueCategories = allCategories.filter(
          (p, i, a) => a.indexOf(p) === i
        );
        const categories = uniqueCategories.map((c) => {
          return { category: c, isSelected: false };
        });
        setCategories(categories);
      }
    })();
  }, []);

  // Load cart
  useEffect(() => {
    (async function getCart() {
      const cart = await client.getCart(loggedInUser);
      if (cart != null) {
        const mappedCartItems = cart.products.map((p) => {
          const product = allProducts.find((item) => item.id === p.productId);
          if (product != null) return { ...product, quantity: p.quantity };
          // Probably could improve this
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
  }, [allProducts]);

  // Load displayedProducts
  useEffect(() => {
    const categoriesToDisplay = categories.filter((c) => c.isSelected);
    if (categoriesToDisplay.length) {
      const productsToDisplay = allProducts.filter((p) => {
        return categoriesToDisplay.some((c) => c.category === p.category);
      });
      setDisplayedProducts(productsToDisplay);
    } else {
      setDisplayedProducts(allProducts); // Want to show everything when no categories are selected
    }
  }, [allProducts, categories]);

  const handleRemoveFromCart = () => {};

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newCategories = categories.map((c) => {
      if (c.category === event.target.value)
        return { ...c, isSelected: event.target.checked };
      return c;
    });
    setCategories(newCategories);
  };

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
      <Filter
        categories={categories}
        onCheckboxChange={handleCheckboxChange}
      ></Filter>
      <Grid container spacing={{ xs: 2 }}>
        {displayedProducts?.map((p, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} xl={3} key={index}>
            <Item item={p}></Item>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Main;
