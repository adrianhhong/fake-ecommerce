import { ProductType, CartType, ProfileType } from "./types";
import server from "../config";

class Client {
  url: string;
  constructor(url: string) {
    this.url = url;
  }

  public async getProducts(): Promise<ProductType[] | undefined> {
    try {
      const res = await fetch(`${this.url}/products`, {
        method: "GET",
      });
      return await res.json();
    } catch (e) {
      console.error(e);
    }
  }

  public async getCart(id: number): Promise<CartType | undefined> {
    try {
      const res = await fetch(`${this.url}/carts/${id}`, {
        method: "GET",
      });
      return await res.json();
    } catch (e) {
      console.error(e);
    }
  }

  public async getProfile(id: number): Promise<ProfileType | undefined> {
    try {
      const res = await fetch(`${this.url}/users/${id}`, {
        method: "GET",
      });
      return await res.json();
    } catch (e) {
      console.error(e);
    }
  }

  public async patchProfile(
    id: number,
    body: ProfileType
  ): Promise<ProfileType | undefined> {
    try {
      const res = await fetch(`${this.url}/users/${id}`, {
        method: "PATCH",
        body: JSON.stringify(body),
        headers: new Headers({ "content-type": "application/json" }),
      });
      return await res.json();
    } catch (e) {
      console.error(e);
    }
  }
}

const client = new Client(server.url);

export default client;
