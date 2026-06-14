import React, { useState, useEffect } from "react";
import "./productForm.css";

function ProductForm({ onAdd, editingProduct, setEditingProduct }) {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");

  // -----------------------------
  // LOAD DATA WHEN EDITING
  // -----------------------------
  useEffect(() => {
    if (editingProduct) {
      setName(editingProduct.name || "");
      setQuantity(editingProduct.quantity || "");
      setPrice(editingProduct.price || "");
      setCategory(editingProduct.category || "");
      setDate(
        editingProduct.date
          ? editingProduct.date.slice(0, 10) // format for <input type="date">
          : ""
      );
    }
  }, [editingProduct]);

  // -----------------------------
  // SUBMIT HANDLER
  // -----------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare product data
    const product = {
      name,
      quantity: Number(quantity),
      price: Number(price),
      category,
      date: new Date(date).toISOString(), 
    };

    try {
      // Determine URL and method
     const url = editingProduct
  ? `https://inventory-backend-2wgl.onrender.com/api/products/${editingProduct._id}`
  : "https://inventory-backend-2wgl.onrender.com/api/products";

      const method = editingProduct ? "PUT" : "POST";

      // Send request
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });


      alert(editingProduct ? "Product updated successfully!" : "Product added successfully!");

      // Reset form
      setName("");
      setQuantity("");
      setPrice("");
      setCategory("");
      setDate("");
      setEditingProduct(null);

      // Refresh parent product list
      if (onAdd) await onAdd(); 

    } catch (err) {
      console.error("Error saving product:", err);
      alert("Failed to save product. Please check backend server and console.");
    }
  };

  return (
    <div className="form-container">
      <h2>{editingProduct ? "Update Product" : "Add New Product"}</h2>

      <form className="product-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="product-input"
        />

        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
          className="product-input"
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          className="product-input"
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          className="product-input"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          className="product-input"
        >
          <option value="">Select Category</option>
          <option value="Tech">Tech</option>
          <option value="Fashion">Fashion</option>
          <option value="Grocery">Grocery</option>
          <option value="Home">Home</option>
          <option value="Other">Other</option>
        </select>

        <div className="button-group">
          <button type="submit" className="btn btn-primary">
            {editingProduct ? "Update" : "Add"} Product
          </button>

          {editingProduct && (
            <button
              type="button"
              className="btn btn-cancel"
              onClick={() => setEditingProduct(null)}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default ProductForm;
