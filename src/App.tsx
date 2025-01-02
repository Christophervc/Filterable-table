import { useState } from "react";
import "./App.css";

interface Product {
  category: string;
  price: string;
  stocked: boolean;
  name: string;
}

interface FilterableProductTableProps {
  products: Product[];
}

interface SearchBarProps {
  filterText: string;
  inStockOnly: boolean;
  onFilterTextChange: (text: string) => void;
  onInStockOnlyChange: (checked: boolean) => void;
}

interface ProductTableProps {
  products: Product[];
  filterText: string;
  inStockOnly: boolean;
}

interface ProductFormProps {
  onAddProduct: (product: Product) => void;
}

const products: Product[] = [
  { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
  { category: "Fruits", price: "$1", stocked: true, name: "Dragon fruit" },
  { category: "Fruits", price: "$2", stocked: false, name: "Passion fruit" },
  { category: "Fruits", price: "$1", stocked: true, name: "Grapes" },
  { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
  { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
  { category: "Vegetables", price: "$1", stocked: true, name: "Avocado" },
  { category: "Vegetables", price: "$1", stocked: true, name: "Onion" },
  { category: "Vegetables", price: "$1", stocked: false, name: "Tomato" },
];

function ProductCategoryRow({ category }: { category: string }) {
  return (
    <tr>
      <th colSpan={2}>{category}</th>
    </tr>
  );
}

function ProductRow({ product }: { product: Product }) {
  const name = product.stocked ? (
    product.name
  ) : (
    <span style={{ color: "red" }}>{product.name}</span>
  );

  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  );
}

function ProductTable({
  products,
  filterText,
  inStockOnly,
}: ProductTableProps) {
  const rows: JSX.Element[] = [];
  let lastCategory: null | string = null;

  products.forEach((product) => {
    if (product.name.toLowerCase().indexOf(filterText.toLowerCase()) === -1) {
      return;
    }
    if (inStockOnly && !product.stocked) {
      return;
    }

    if (product.category !== lastCategory) {
      rows.push(
        <ProductCategoryRow
          category={product.category}
          key={product.category}
        />
      );
    }
    rows.push(<ProductRow product={product} key={product.name} />);
    lastCategory = product.category;
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function SearchBar({
  filterText,
  inStockOnly,
  onFilterTextChange,
  onInStockOnlyChange,
}: SearchBarProps) {
  return (
    <form>
      <input
        type="text"
        placeholder="Search..."
        value={filterText}
        onChange={(e) => onFilterTextChange(e.target.value)}
      />
      <label>
        <input
          type="checkbox"
          checked={inStockOnly}
          onChange={(e) => onInStockOnlyChange(e.target.checked)}
        />{" "}
        Show only in stock
      </label>
    </form>
  );
}

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

function ProductForm({ onAddProduct }: ProductFormProps) {
  const [productName, setProductName] = useState<string>("");
  const [productPrice, setProductPrice] = useState<string>("");
  const [productStocked, setProductStocked] = useState<boolean>(true);
  const [productCategory, setProductCategory] = useState<string>("Fruits");
  const HandleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onAddProduct({
      name: productName,
      price: productPrice,
      stocked: productStocked,
      category: productCategory,
    });
    setProductName("");
    setProductPrice("");
    setProductStocked(true);
    setProductCategory("Fruits");
  };

  return (
    <form onSubmit={HandleSubmit}>
      <label htmlFor="name">Name</label>
      <input
        id="name"
        type="text"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
      />
      <label htmlFor="price">Price</label>
      <input
        id="price"
        type="text"
        value={productPrice}
        onChange={(e) => setProductPrice(e.target.value)}
      />
      <label htmlFor="stocked">Stocked</label>
      <input
        id="stocked"
        type="checkbox"
        checked={productStocked}
        onChange={(e) => setProductStocked(e.target.checked)}
      />
      <label htmlFor="category">Category</label>
      <select
        id="category"
        value={productCategory}
        onChange={(e) => setProductCategory(e.target.value)}
      >
        <option value="Fruits">Fruits</option>
        <option value="Vegetables">Vegetables</option>
      </select>
      <button>Add Product</button>
    </form>
  );
}

function App() {

  return (
    <>
      <ProductForm onAddProduct={(product) => console.log(product)}  />
      <FilterableProductTable products={products} />
    </>
  );
}

export default App;
