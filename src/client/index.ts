import { ProductType } from "./types";
import server from "../config";

class Client {
  url: string;
  constructor(url: string) {
    this.url = url;
  }

  public async getProducts(): Promise<ProductType | undefined> {
    try {
      const res = await fetch(`${this.url}/products`, {
        method: "GET",
      });
      const data: ProductType = await res.json();
      return data;
    } catch (e) {
      console.error(e);
    }
  }
}

const client = new Client(server.url);

export default client;
