import { useEffect, useState } from "react";
import Table from "../../../components/Table";
import { Pagination } from "@mui/material";
import {
  deleteCustomerInfo,
} from "../../../api/customer";

import "./index.scss";
import { getProducts } from "../../../api/products";
import { ProductTypes } from "../../../types/product/productTypes";

export interface SortEnums {
  asc: "ASC";
  desc: "DESC";
}

// eslint-disable-next-line react-refresh/only-export-components
export const ENUMS: SortEnums = {
  asc: "ASC",
  desc: "DESC",
};

// interface Customer {
//   id: number;
//   companyName: string;
//   contactTitle: string;
//   city: string;
//   country: string;
//   createDate: string;
//   liked: boolean;
// }



const AdminProducts = () => {
  const [products, setProducts] = useState<ProductTypes[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [columnName, setColumnName] = useState("");
  const [sortType, setSortType] = useState<"ASC" | "DESC" | "">("");

  const itemsPerPage = 5;

  const tableColumns = [
    { key: "id", name: "ID", isFilterable: false },
    { key: "companyName", name: "Company Name", isFilterable: true },
    { key: "contactTitle", name: "Contact Title", isFilterable: false },
    { key: "country", name: "Country", isFilterable: false },
    { key: "delete", name: "Delete", isFilterable: false },
    { key: "addFav", name: "Add To Favorites", isFilterable: false },
  ];

  const emptyTableMessage = "There is not any customer";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: ProductTypes[] = await getProducts();
        data.sort(
          (a, b) =>
            new Date(b.createDate).getTime() - new Date(a.createDate).getTime()
        );

        if (columnName && columnName !== "delete" && columnName !== "addFav") {
          data.sort((a, b) => {
            const key = columnName as keyof ProductTypes;
            if (sortType === ENUMS.desc) {
              if (typeof a[key] === "string" && typeof b[key] === "string") {
                return a[key].localeCompare(b[key]);
              }
            } else if (sortType === ENUMS.asc) {
              if (typeof a[key] === "string" && typeof b[key] === "string") {
                return b[key].localeCompare(a[key]);
              }
            }
            return 0;
          });
        }

        setProducts(data);
      } catch (error) {
        console.error("Error fetching customer info:", error);
      }
    };

    fetchData();
  }, [columnName, sortType]);

  const handleDelete = async (id: number) => {
    const confirmMessage = confirm(`Are you sure you want to delete ${id}?`);
    if (confirmMessage) {
      await deleteCustomerInfo(id);
      setProducts(products.filter((customer) => customer.id !== id));
    }
  };



  const handlePageChange = (_event: unknown, value: number) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setCurrentPage(value);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="AdminProducts">
      <Table
        tableItems={currentItems}
        tableColumns={tableColumns}
        deleteFunction={handleDelete}
        emptyTableMessage={emptyTableMessage}
        // addFavoritesFunction={handleAddToFavorites}
        showDeleteColumn
        setColumnName={setColumnName}
        setSortType={setSortType}
        sortType={sortType}
      />

      {products.length > itemsPerPage && (
        <div className="CustomersPagination">
          <Pagination
            count={Math.ceil(products.length / itemsPerPage)}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          />
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
