import { useEffect, useState } from "react";
import Table from "../../../components/Table";
import { Pagination } from "@mui/material";
import "./index.scss";
import { deleteProduct, getProducts } from "../../../api/products";
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

const AdminProducts = () => {
  const [products, setProducts] = useState<ProductTypes[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [columnName, setColumnName] = useState("");
  const [sortType, setSortType] = useState<"ASC" | "DESC" | "">("");

  const itemsPerPage = 5;

  const tableColumns = [
    { key: "id", name: "ID", isFilterable: false },
    { key: "image", name: "Image", isFilterable: false },
    { key: "name", name: "Title", isFilterable: true },
    { key: "price", name: "Price", isFilterable: true },
    { key: "description", name: "Description", isFilterable: false },
    { key: "delete", name: "Delete", isFilterable: false },
    { key: "edit", name: "Edit", isFilterable: false },
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

        if (columnName && columnName !== "delete" && columnName !== "edit") {
          data.sort((a, b) => {
            const key = columnName as keyof ProductTypes;
            if (key === "name") {
              if (sortType === ENUMS.asc) {
                if (typeof a[key] === "string" && typeof b[key] === "string") {
                  return a[key].localeCompare(b[key]);
                }
              } else if (sortType === ENUMS.desc) {
                if (typeof a[key] === "string" && typeof b[key] === "string") {
                  return b[key].localeCompare(a[key]);
                }
              }
            } else if (key === "price") {
              if (sortType === ENUMS.asc) {
                return a[key] - b[key];
              } else if (sortType === ENUMS.desc) {
                return b[key] - a[key];
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
      await deleteProduct(id);
      setProducts((prevProducts) =>
        prevProducts.filter((customer) => customer.id !== id)
      );
    }
  };

  const handleEditProduct = async (id: number) => {
    console.log(id)
    // const customer = customers.find((customer) => customer.id === id);
    // if (customer) {
    //   try {
    //     await updateCustomerInfo(id, { liked: !customer.liked });
    //     setCustomers((prevCustomers) =>
    //       prevCustomers.map((customer) =>
    //         customer.id === id
    //           ? { ...customer, liked: !customer.liked }
    //           : customer
    //       )
    //     );
    //   } catch (error) {
    //     console.error("Error updating customer:", error);
    //   }
    // }
  };

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
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
         handleEditProduct={handleEditProduct}
        showDeleteColumn
        setColumnName={setColumnName}
        setSortType={setSortType}
        sortType={sortType}
        columnNameClick={columnName}
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
