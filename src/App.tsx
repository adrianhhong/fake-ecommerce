import client from "./client";
import { ProductType } from "./client/types";
import Item from "./components/Item/Item";
import { useState, useEffect } from "react";
import { LinearProgress } from "@mui/material";
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
      console.log(products);

      if (products != null) {
        setProducts(products);
      }
    })();
  }, []);

  return (
    <div className="App">
      {/* {isLoading ? <LinearProgress /> : <div></div>}
      {isError ? <p>Something went wrong</p> : <div></div>} */}

      {products.map((p) => (
        <Item item={p} />
      ))}
    </div>
  );
};

export default App;
