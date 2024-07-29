import { createContext } from "react";
import { ProductTypes } from "../types/product/productTypes";
import { defaultValTye } from "../types/product/defaultProductType";




const defaultProduct: ProductTypes = {
    id: 0,
    name: "",
    price: 0,
    imageSrc: "",
    createDate: new Date(),
    liked: false,
};

export const ProductsContext = createContext<defaultValTye>({
    products: [defaultProduct],
    setProducts: () => [],
});



export const ProductsContextProvider = ProductsContext.Provider;