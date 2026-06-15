import React, { useEffect, useState } from "react";
import "./home.css";
import { Link } from "react-router-dom";

function Home() {
  const [products, setProducts] = useState([]);
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalQuantity: 0,
    totalValue: 0,
    totalCategories: 0,
  });

  useEffect(() => {
    fetch("https://inventory-backend-2wgl.onrender.com/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);

        const totalProducts = data.length;
        const totalQuantity = data.reduce((sum, p) => sum + p.quantity, 0);
        const totalValue = data.reduce(
          (sum, p) => sum + p.quantity * p.price,
          0
        );
        const totalCategories = new Set(
          data.map((p) => p.category)
        ).size;

        setStats({
          totalProducts,
          totalQuantity,
          totalValue,
          totalCategories,
        });
      })
      .catch((err) => console.error("Error fetching stats:", err));
  }, []);

  return (
    <div className="dashboard">
      <h1>Inventory Dashboard</h1>
      <h1>hii welcome</h1>

      <div className="cards">
        <div className="card1">
          <h2>{stats.totalProducts}</h2>
          <p>Total Products</p>
        </div>

        <div className="card2">
          <h2>{stats.totalQuantity}</h2>
          <p>Total Quantity</p>
        </div>

        <div className="card3">
          <h2>₹{stats.totalValue}</h2>
          <p>Total Inventory Value</p>
        </div>

        <div className="card4">
          <h2>{stats.totalCategories}</h2>
          <p>Categories</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
