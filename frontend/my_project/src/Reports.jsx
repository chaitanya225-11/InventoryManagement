import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
  ResponsiveContainer,
} from "recharts";

function Reports() {
  const [stockData, setStockData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);

  useEffect(() => {
    fetchStockReport();
    fetchMonthlyReport();
  }, []);

  // Product-wise stock
  const fetchStockReport = async () => {
    try {
      const res = await fetch("https://inventory-backend-2wgl.onrender.com/api/products/reports/stock");
      const data = await res.json();
      setStockData(data);
    } catch (err) {
      console.error("Error fetching stock report", err);
    }
  };

  // Monthly stock trend
  const fetchMonthlyReport = async () => {
    try {
      const res = await fetch("https://inventory-backend-2wgl.onrender.com/api/products/reports/monthly");
      const data = await res.json();

      // Convert month number → name
      const formatted = data.map((item) => ({
        name: new Date(2024, item.month - 1).toLocaleString("default", {
          month: "short",
        }),
        stock: item.stock,
      }));

      setMonthlyData(formatted);
    } catch (err) {
      console.error("Error fetching monthly report", err);
    }
  };

  return (
    <div>
      <h1>Reports</h1>
      <p>Stock analysis based on your stored product data</p>

      {/* Bar Chart */}
      <h2>Product-wise Stock</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={stockData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="stock" fill="#007bff" />
        </BarChart>
      </ResponsiveContainer>

      {/* Line Chart */}
      <h2>Monthly Stock Trend</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={monthlyData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="stock" stroke="#28a745" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Reports;
