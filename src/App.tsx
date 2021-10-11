import { useState, useEffect } from "react";
import Drawer from "@mui/material";
import client from "./client";

function App() {
  useEffect(() => {
    (async function getProducts() {
      const products = await client.getProducts();
      console.log(products);
    })();
  });

  return <div className="App">Learn React</div>;
}

export default App;
