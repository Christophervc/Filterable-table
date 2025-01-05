import { useState } from "react";
import { ProductFormProps } from "../types";

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

export default ProductForm;