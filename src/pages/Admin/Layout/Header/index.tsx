import { Link, useLocation } from "react-router-dom";
import "./index.scss";
import { SetStateAction, useEffect, useState } from "react";

const Header = () => {
  const [activeLink, setActiveLink] = useState("");
  const location = useLocation();

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location]);

  const handleLinkClick = (link: SetStateAction<string>) => {
    setActiveLink(link);
  };

  return (
    <div className="AdminHeader">
      <Link
        to="/"
        className={`HeaderNavBarLink HeaderLogo`}
        onClick={() => handleLinkClick("/admin")}
      >
        3KED
      </Link>

      <nav className="HeaderNavLinks">
        <Link
          to="/admin"
          className={`HeaderNavBarLink ${activeLink === "/admin" ? "active" : ""}`}
          onClick={() => handleLinkClick("/admin")}
        >
          Dashboard
        </Link>
        <Link
          to="/admin/products"
          className={`HeaderNavBarLink ${
            activeLink === "/admin/products" ? "active" : ""
          }`}
          onClick={() => handleLinkClick("/admin/products")}
        >
          Products
        </Link>
        <Link
          to="/admin/addproduct"
          className={`HeaderNavBarLink ${
            activeLink === "/admin/addproduct" ? "active" : ""
          }`}
          onClick={() => handleLinkClick("/admin/addproduct")}
        >
         Add Products
        </Link>
        
      </nav>
    </div>
  );
};

export default Header;
