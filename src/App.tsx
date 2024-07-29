import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from "./layout/Header";
// import AddCustomer from "./pages/AddCustomers";
// import CustomerList from "./pages/Customers";
// import Favorites from "./pages/Favorites";

import "./assets/styles/base.scss"
import Home from './pages/Home';
import Products from './pages/Products';
import { ProductsContextProvider } from './contexts/productContext';
import { useEffect, useState } from 'react';
import { ProductTypes } from './types/product/productTypes';
import { getProducts } from './api/products';
import Favorites from './pages/Favorites';

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

  console.log(products)

  return (
    <>
    <ProductsContextProvider value={{products,setProducts}} >
      <Router>
        <Header />
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/favorites" element={<Favorites />} />
          {/* <Route path="/add-customer" element={<AddCustomer />} />
          <Route path="/customer-list" element={<CustomerList />} />
          <Route path="/favorites" element={<Favorites />} /> */}
        </Routes>
      </Router>

    </ProductsContextProvider>
    </>
  );
}

export default App;
