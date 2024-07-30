import { SetStateAction, useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./index.scss";
import { ProductsContext } from "../../contexts/productContext";

const Header = () => {
  const [activeLink, setActiveLink] = useState("");
  const { products } = useContext(ProductsContext);
  const location = useLocation();

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location]);

  const likedProducts = products.filter((product) => product.liked);

  const handleLinkClick = (link: SetStateAction<string>) => {
    setActiveLink(link);
  };

  return (
    <div className="Header">
      <nav className="HeaderNavLinks">
        <Link
          to="/"
          className={`HeaderNavBarLink ${activeLink === "/" ? "active" : ""}`}
          onClick={() => handleLinkClick("/")}
        >
          Home
        </Link>
        <Link
          to="/products"
          className={`HeaderNavBarLink ${
            activeLink === "/products" ? "active" : ""
          }`}
          onClick={() => handleLinkClick("/products")}
        >
          Products
        </Link>
        <Link
          to="/favorites"
          className={`HeaderNavBarLink ${
            activeLink === "/favorites" ? "active" : ""
          }`}
          onClick={() => handleLinkClick("/favorites")}
        >
          Favorites
          {likedProducts.length > 0 && (
            <span className="FavoritesCount">{likedProducts.length}</span>
          )}
        </Link>
      </nav>
    </div>
  );
};

export default Header;
