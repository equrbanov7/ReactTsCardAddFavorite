import { ProductTypes } from "./productTypes"


export type defaultValTye = {
    products: ProductTypes[],
    setProduct: (product: ProductTypes) => void;
}