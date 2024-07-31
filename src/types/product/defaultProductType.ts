import { Dispatch, SetStateAction } from "react";
import { ProductTypes } from "./productTypes"


export type defaultValTye = {
    products: ProductTypes[],
    setProducts:  Dispatch<SetStateAction<ProductTypes[]>>;
}