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
}

const CustomCard = ({ product }: CustomCardProps) => {
  const { products, setProducts } = useContext(ProductsContext);

  const handleFavoriteClick = () => {
    const updatedProducts = products.map((p) =>
      p.id === product.id ? { ...p, liked: !p.liked } : p
    );
    setProducts(updatedProducts);
  };

  return (
    <div className="Card">
      <div onClick={handleFavoriteClick} className="FavoriteIcon">
        {product.liked ? (
          <FavoriteIcon className="EmptyFavoriteIcon" />
        ) : (
          <FavoriteBorderIcon className="EmptyFavoriteIcon" />
        )}
      </div>
      <MuiCard sx={{ width: 300 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="240"
            image={product.imageSrc}
            alt={product.name}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {product.name}
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
