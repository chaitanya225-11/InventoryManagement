import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./productTable.css";

function ProductTable({ editingProduct, setEditingProduct }) {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const res = await fetch("https://inventory-backend-2wgl.onrender.com/api/products");
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [editingProduct]);

  const handleDelete = async (id, name) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${name}"?`
    );
    if (!confirmDelete) return;

    try {
      await fetch(`https://inventory-backend-2wgl.onrender.com/api/products/${id}`, {
  method: "DELETE",
});
      fetchProducts();
      window.alert(`Product "${name}" deleted successfully!`);
    } catch (err) {
      console.error("Error deleting product:", err);
      window.alert("Failed to delete product. Please try again.");
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    navigate("/add");
  };

  return (
    <div className="product-table-container">
      <table className="product-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Quantity</th>
            <th>Price (₹)</th>
            <th>Category</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.length > 0 ? (
            products.map((p) => (
              <tr key={p._id}>
                <td>{p.name}</td>
                <td>{p.quantity}</td>
                <td>₹{p.price}</td>
                <td>{p.category}</td>

                <td>
                 {p.date
                  ? new Date(p.date).toLocaleDateString("en-IN")
                  : "-"}
                </td>


                {/* ACTIONS */}
                <td className="action-buttons">
                  <button
                    className="edit-btn"
                    onClick={() => handleEdit(p)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(p._id, p.name)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={{ textAlign: "center" }}>
                No products found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ProductTable;
