import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./Home";
import AddProduct from "./AddProduct";   
import ViewProduct from "./viewProduct"; 
import Reports from "./Reports";
import "./App.css";

function App() {
  const [editingProduct, setEditingProduct] = useState(null);

  return (
    <Router>
      <Navbar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route 
            path="/add" 
            element={<AddProduct editingProduct={editingProduct} setEditingProduct={setEditingProduct} />} 
          />
          <Route 
            path="/view" 
            element={<ViewProduct editingProduct={editingProduct} setEditingProduct={setEditingProduct} />} 
          />
          <Route path="/reports" element={<Reports />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
