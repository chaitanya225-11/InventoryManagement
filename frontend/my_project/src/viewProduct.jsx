import React from "react";
import ProductTable from "./ProductTable";

function ViewProduct({ editingProduct, setEditingProduct }) {
  return (
    <div>
      <h1>Product List</h1>
      <ProductTable editingProduct={editingProduct} setEditingProduct={setEditingProduct} />
    </div>
  );
}

export default ViewProduct;
