import client from "../client";
import {
  ProductType,
  CartType,
  CartItemType,
  CategoryType,
} from "../client/types";
import Item from "../components/item/Item";
import ExtraAppBar from "../components/app-bar/ExtraAppBar";
import Cart from "../components/cart/Cart";
import Filter from "../components/filter/Filter";
import { useState, useEffect } from "react";
import { Grid, Drawer, Box, LinearProgress } from "@mui/material";

const Main = () => {
  const loggedInUser = 1;
  const [allProducts, setAllProducts] = useState<ProductType[]>([]);
  const [cartIsOpen, setCartIsOpen] = useState(false);
  const [cart, setCart] = useState<CartType>({} as CartType);
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [displayedProducts, setDisplayedProducts] = useState<ProductType[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  const [isLoadingCart, setIsLoadingCart] = useState(false);

  // Get allProducts, load allCategories
  useEffect(() => {
    setIsLoadingProducts(true);
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
      setIsLoadingProducts(false);
    })();
  }, []);

  // Get cart
  const getCart = async () => {
    setIsLoadingCart(true);
    const newCart = await client.getCart(loggedInUser);
    if (newCart != null) {
      setCart(newCart);
    }
    setIsLoadingCart(false);
  };

  // Get cart on mount so we can show amount of items in cart
  useEffect(() => {
    (async function cartGetter() {
      getCart();
    })();
  }, []);

  // Map cartItems
  useEffect(() => {
    const mappedCartItems = cart?.products?.map((p) => {
      const product = allProducts.find((item) => item.id === p.productId);
      if (product != null) return { ...product, quantity: p.quantity };
      // Probably could improve this
      return {
        id: 0,
        title: "",
        price: 0,
        category: "",
        description: "",
        image: "",
        quantity: 0,
      };
    });
    setCartItems(mappedCartItems);
  }, [allProducts, cart]);

  // Load displayedProducts
  useEffect(() => {
    const categoriesToDisplay = categories?.filter((c) => c.isSelected);
    if (categoriesToDisplay?.length) {
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
      <ExtraAppBar
        cartItems={cartItems?.length}
        clickCart={() => {
          getCart();
          setCartIsOpen(true);
        }}
      />
      {isLoadingProducts && (
        <Box sx={{ width: "100%" }}>
          <LinearProgress />
        </Box>
      )}
      <Drawer
        anchor="right"
        open={cartIsOpen}
        onClose={() => setCartIsOpen(false)}
      >
        {isLoadingCart && (
          <Box sx={{ width: "100%" }}>
            <LinearProgress />
          </Box>
        )}
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
