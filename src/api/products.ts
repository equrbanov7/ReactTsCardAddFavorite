import {instance} from "./index.ts";

const ENUMS = {
    products: "products"
};

export const getProducts = async () => {
  const res = await instance.get(`/${ENUMS.products}`);
  return res.data;
};