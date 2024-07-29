import { useContext } from "react";
import { ProductsContext } from "../../contexts/productContext";
import "./index.scss";
import CustomCard from "../../components/Card";

const Products = () => {
  const { products } = useContext(ProductsContext);

  return (
    <div className="Products">
      {products.map((product) => (
        <CustomCard
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );
};

export default Products;
