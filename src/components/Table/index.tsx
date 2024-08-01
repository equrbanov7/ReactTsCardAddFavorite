import SwapVertIcon from "@mui/icons-material/SwapVert";
import SouthIcon from "@mui/icons-material/South";
import NorthIcon from "@mui/icons-material/North";
import "./index.scss";
import { Dispatch, SetStateAction, useState } from "react";
import { ProductTypes } from "../../types/product/productTypes";
import { ENUMS } from "../../pages/Admin/Products";

interface Column {
  name: string;
  isFilterable: boolean;
  key: string;
}

interface TableProps {
  tableColumns: Column[];
  tableItems: ProductTypes[];
  emptyTableMessage: string;
  deleteFunction?: (id: number) => void;
  handleEditProduct?: (id: number) => void;
  showDeleteColumn: boolean;
  setColumnName: (columnName: string) => void;
  setSortType: Dispatch<SetStateAction<"" | "ASC" | "DESC">>;
  sortType: string;
  columnNameClick:string;
}

const Table = ({
  tableColumns,
  tableItems,
  emptyTableMessage,
  deleteFunction,
  handleEditProduct,
  showDeleteColumn = true,
  setColumnName,
  setSortType,
  sortType,
  columnNameClick
}: TableProps) => {
  const [countOfColumnClick, setCountOfColumnClick] = useState<{
    [key: string]: number;
  }>({});

  const handleHeaderClick = (columnName: string) => {
    if (countOfColumnClick[columnName] === undefined) {
      setCountOfColumnClick({});
    }

    if (
      countOfColumnClick[columnName] === 0 ||
      countOfColumnClick[columnName] === undefined
    ) {
      setColumnName(columnName);
      setSortType(ENUMS.desc);
      setCountOfColumnClick((prev) => ({ ...prev, [columnName]: 1 }));
    } else if (countOfColumnClick[columnName] === 1) {
      setColumnName(columnName);
      setSortType(ENUMS.asc);
      setCountOfColumnClick((prev) => ({ ...prev, [columnName]: 2 }));
    } else {
      setColumnName("");
      setSortType("");
      setCountOfColumnClick({});
    }
  };

  return (
    <div className="Table">
      <table>
        <thead>
          <tr>
            {tableColumns.map((column, index) => (
              <th
                key={index}
                className={`${column.isFilterable && "tableColumns"}`}
                onClick={() =>
                  column.isFilterable && handleHeaderClick(column.key)
                }
              >
                {column.name}
                {column.isFilterable && (
                  <>
                    {sortType === ENUMS.desc && column.key === columnNameClick ? (
                      <SouthIcon className="sortIcon" />
                    ) : sortType === ENUMS.asc && column.key === columnNameClick ? (
                      <NorthIcon className="sortIcon"  />
                    ) : (
                      <SwapVertIcon className="sortIcon"  />
                    )}
                  </>
                )}
              </th>
            ))}
          </tr>
        </thead>
        {tableItems?.length > 0 ? (
          <>
            <tbody>
              {tableItems?.map((tableItem) => (
                <tr key={tableItem.id}>
                  <td>{tableItem.id}</td>
                  <td>
                    <img
                      src={tableItem.imageSrc}
                      className="imgTableItem"
                      alt="img"
                    />
                  </td>
                  <td>{tableItem.name} </td>
                  <td>{tableItem.price}</td>
                  <td>{tableItem.description}</td>
                  {showDeleteColumn && deleteFunction && (
                    <td>
                      <button onClick={() => deleteFunction(tableItem.id)}>
                        Delete
                      </button>
                    </td>
                  )}

                  {handleEditProduct && (
                    <td>
                      <button
                        className={!tableItem.liked ? "favorite" : ""}
                        onClick={() => handleEditProduct(tableItem.id)}
                      >
                        Edit
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </>
        ) : (
          <>
            <tbody>
              <tr>
                <td colSpan={tableColumns.length}>
                  <div className="TableEmptyInfo">
                    <h3>{emptyTableMessage} </h3>
                  </div>
                </td>
              </tr>
            </tbody>
          </>
        )}
      </table>
    </div>
  );
};

export default Table;
