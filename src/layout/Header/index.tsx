import { useState } from "react";
import { Link } from "react-router-dom";
import "./index.scss";

const Header = () => {
  const [activeLink, setActiveLink] = useState("");

  const handleLinkClick = (link: string) => {
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
        </Link>
      </nav>
    </div>
  );
};

export default Header;
