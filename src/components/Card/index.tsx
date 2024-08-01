import { useContext } from "react";
import MuiCard from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { ProductsContext } from "../../contexts/productContext";
import { ProductTypes } from "../../types/product/productTypes";
import "./index.scss";

interface CustomCardProps {
  product: ProductTypes;
  onClick?: () => void;
}

const CustomCard = ({ product, onClick }: CustomCardProps) => {
  const { products, setProducts } = useContext(ProductsContext);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const updatedProducts = products.map((p) =>
      p.id === product.id ? { ...p, liked: !p.liked } : p
    );
    setProducts(updatedProducts);
  };

  return (
    <div className="Card" onClick={onClick}>
      <div onClick={handleFavoriteClick} className="FavoriteIcon">
        {product.liked ? (
          <FavoriteIcon className="EmptyFavoriteIcon" />
        ) : (
          <FavoriteBorderIcon className="EmptyFavoriteIcon" />
        )}
      </div>
      <MuiCard>
        <CardActionArea>
          <CardMedia
            component="img"
            height="240"
            image={product?.imageSrc}
            alt={product.name}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {product.name.length > 15
                ? product.name.slice(0, 10) + "..."
                : product.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              ${product.price}
            </Typography>
          </CardContent>
        </CardActionArea>
      </MuiCard>
    </div>
  );
};

export default CustomCard;
