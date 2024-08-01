import {instance} from "./index.ts";

const ENUMS = {
    products: "products"
};

export const getProducts = async () => {
  const res = await instance.get(`/${ENUMS.products}`);
  return res.data;
};
export const getOneProduct = async (id:number) => {
  const res = await instance.get(`/${ENUMS.products}/${id}`);
  return res.data;
};

export const deleteProduct = async (id: number) => {
  const res = await instance.delete(`/${ENUMS.products}/${id}`);
  return res.data;
};