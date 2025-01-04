import { useEffect, useState } from "react";
import "./App.css";
import "./index.css";
import {
  Product,
  ProductFormProps,
  ProductTableProps,
  SearchBarProps,
  FilterableProductTableProps,
} from "./types";

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
    <div className="product-form">
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
    </div>
  );
}

function App() {
  const [products, setProducts] = useState<Product[]>(() => {
    const savedProducts = localStorage.getItem("products");
    return savedProducts ? JSON.parse(savedProducts) : [];
  });

  useEffect(() => {
    const savedProducts = localStorage.getItem("products");
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  const AddProduct = (newProduct: Product) => {
    if (products.find((product) => product.name === newProduct.name)) {
      return alert("Product already exists");
    }
    const updatedProducts = setProducts([...products, newProduct]);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
  };

  return (
    <>
      <ProductForm onAddProduct={AddProduct} />
      <FilterableProductTable products={products} />
    </>
  );
}

export default App;
