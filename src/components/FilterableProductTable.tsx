import { useState } from "react";
import { FilterableProductTableProps } from "../types";
import ProductTable from "./ProductTable";
import SearchBar from "./SearchBar";

function FilterableProductTable({ products }: FilterableProductTableProps) {
  const [filterText, setfilterText] = useState<string>("");
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);

  return (
    <div>
      <SearchBar
        filterText={filterText}
        inStockOnly={inStockOnly}
        onFilterTextChange={setfilterText}
        onInStockOnlyChange={setInStockOnly}
      />
      <ProductTable
        products={products}
        filterText={filterText}
        inStockOnly={inStockOnly}
      />
    </div>
  );
}

export default FilterableProductTable;
