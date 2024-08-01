import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getOneProduct } from "../../../api/products";
import { Card, CardContent, CardMedia, Typography, Box } from "@mui/material";
import Rating from "@mui/material/Rating";
import "./index.scss";
import { ProductTypes } from "../../../types/product/productTypes";

const ProductInfo = () => {
  const [product, setProduct] = useState<ProductTypes | null>(null);
  const { pathname } = useLocation();
  const productId = pathname ? +pathname.split("/").pop()! : undefined;

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        let fetchedProduct;
        if (productId) {
          fetchedProduct = await getOneProduct(productId);
        }
        setProduct(fetchedProduct);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchProductData();
  }, [productId]);

  if (!product) return <div>Loading...</div>;

  return (
    <Box
      className="ProductInfo"
      display="flex"
      justifyContent="center"
      alignItems="center"
      p={4}
    >
      <Card sx={{ display: "flex", maxWidth: 800 }}>
        <CardMedia
          component="img"
          sx={{ width: 400 }}
          image={product?.imageSrc}
          alt={product.name}
        />
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography component="div" variant="h5">
            {product.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            {product?.description}
          </Typography>
          <Typography variant="h6">Price: ${product.price}</Typography>
          <Rating name="read-only" value={product.rating} readOnly />
        </CardContent>
      </Card>
    </Box>
  );
};

export default ProductInfo;
