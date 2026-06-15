import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

import Navbar from "./Navbar";
import Home from "./Home";
import AddProduct from "./AddProduct";
import ViewProduct from "./viewProduct";
import Reports from "./Reports";
import Login from "./Login";
import { auth } from "./firebase";

import "./App.css";

function App() {
  const [editingProduct, setEditingProduct] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <h2 style={{ textAlign: "center", marginTop: "100px" }}>Loading...</h2>;
  }

  if (!user) {
    return <Login />;
  }

  return (
    <Router>
      <Navbar user={user} />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/add"
            element={
              <AddProduct
                editingProduct={editingProduct}
                setEditingProduct={setEditingProduct}
              />
            }
          />
          <Route
            path="/view"
            element={
              <ViewProduct
                editingProduct={editingProduct}
                setEditingProduct={setEditingProduct}
              />
            }
          />
          <Route path="/reports" element={<Reports />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
