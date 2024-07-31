import { routes } from "./routes"
import { RouterProvider } from "react-router-dom";
import { ProductsContextProvider } from "./contexts/productContext";
import { useEffect, useState } from "react";
import { ProductTypes } from "./types/product/productTypes";
import { getProducts } from "./api/products";

import "./assets/styles/base.scss";

function App() {
  const [products, setProducts] = useState<ProductTypes[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: ProductTypes[] = await getProducts();
        data.sort(
          (a, b) =>
            new Date(b.createDate).getTime() - new Date(a.createDate).getTime()
        );

        setProducts(data);
      } catch (error) {
        console.error("Error fetching customer info:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <ProductsContextProvider value={{ products, setProducts }}>
      {/* <Header /> */}
      <RouterProvider router={routes} />
        {/* <Router>
        
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Router> */}
      </ProductsContextProvider>
    </>
  );
}

export default App;
