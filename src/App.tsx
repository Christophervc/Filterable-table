import { useEffect, useState } from "react";
import "./App.css";
import "./index.css";
import { Product } from "./types";
import FilterableProductTable from "./components/FilterableProductTable";
import ProductForm from "./components/ProductForm";

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
