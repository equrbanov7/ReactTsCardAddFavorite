import { useContext } from "react";
import { ProductsContext } from "../../contexts/productContext";
import "./index.scss";
import CustomCard from "../../components/Card";
import { Link } from "react-router-dom";




const Favorites = () => {

  const { products } = useContext(ProductsContext);

  const likedProducts = products.filter(product => product.liked);

  return (
    <div className="Favorites">
      {likedProducts?.map((product) => (
        <CustomCard
          key={product.id}
          product={product}
        />
      ))}

      {
        likedProducts.length <1 && <Link to="/products" >Back To Shopping</Link>
      }
      
    </div>
  );
};

export default Favorites;
