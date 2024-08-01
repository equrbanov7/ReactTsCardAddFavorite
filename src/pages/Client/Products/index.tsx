import { useContext, useMemo } from "react";
import { useForm, Controller } from "react-hook-form";
import { ProductsContext } from "../../../contexts/productContext";
import "./index.scss";
import CustomCard from "../../../components/Card";
import { Outlet, useNavigate } from "react-router-dom";
import {
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";

const Products = () => {
  const { products } = useContext(ProductsContext);
  const navigate = useNavigate();

  const handleNavigateProductInfo = (id: number) => {
    navigate(`/products/${id}`);
  };

  const { control, watch } = useForm({
    defaultValues: {
      searchText: "",
      sortType: "default",
    },
  });

  const searchText = watch("searchText");
  const sortType = watch("sortType");

  const filteredAndSortedProducts = useMemo(() => {
    let filteredProducts = [...products];

    if (searchText) {
      filteredProducts = filteredProducts.filter((product) =>
        product.name.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (sortType === "asc") {
      filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sortType === "desc") {
      filteredProducts.sort((a, b) => b.price - a.price);
    }

    return filteredProducts;
  }, [products, searchText, sortType]);

  return (
    <div className="Products">
      <div className="ProductsFilter" style={{ display: "flex", gap: "1rem" }}>
        <Controller
          name="searchText"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Search"
              variant="outlined"
              size="small"
              fullWidth
            />
          )}
        />

        <FormControl variant="outlined" size="small" fullWidth>
          <InputLabel id="sort-label">Sort By</InputLabel>
          <Controller
            name="sortType"
            control={control}
            render={({ field }) => (
              <Select {...field} labelId="sort-label" label="Sort By">
                <MenuItem value="default">
                  <em>Default</em>
                </MenuItem>
                <MenuItem value="asc">Price: Low to High</MenuItem>
                <MenuItem value="desc">Price: High to Low</MenuItem>
              </Select>
            )}
          />
        </FormControl>
      </div>

      <div className="ProductsCardWrapper">
        {filteredAndSortedProducts.map((product) => (
          <CustomCard
            key={product.id}
            product={product}
            onClick={() => handleNavigateProductInfo(product.id)}
          />
        ))}
      </div>
      <Outlet />
    </div>
  );
};

export default Products;
