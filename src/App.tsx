import client from "./client";
import { ProductType } from "./client/types";
import Item from "./components/item/Item";
import AppBar from "./components/app-bar/AppBar";
import { useState, useEffect } from "react";
import { LinearProgress, Grid } from "@mui/material";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";

const App = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  // const { isLoading, isError, data, error } = useQuery(
  //   "products",
  //   client.getProducts
  // );

  useEffect(() => {
    (async function getProducts() {
      const products = await client.getProducts();
      if (products != null) {
        setProducts(products);
      }
    })();
  }, []);

  return (
    <div>
      <AppBar />
      {/* {isLoading ? <LinearProgress /> : <div></div>}
      {isError ? <p>Something went wrong</p> : <div></div>} */}

      <Grid container spacing={{ xs: 2 }}>
        {products.map((p, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={index}>
            <Item item={p}></Item>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default App;
