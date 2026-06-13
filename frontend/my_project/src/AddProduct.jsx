import React from "react";
import ProductForm from "./ProductForm";

function AddProduct({ editingProduct, setEditingProduct }) {
  return (
    <div>
      <h1>{editingProduct ? "Edit Product" : "Add Product"}</h1>
      <ProductForm editingProduct={editingProduct} setEditingProduct={setEditingProduct} />
    </div>
  );
}

export default AddProduct;
