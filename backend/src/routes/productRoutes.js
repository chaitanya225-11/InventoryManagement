// backend/src/routes/productRoutes.js
const express = require("express");
const { ObjectId } = require("mongodb");

const router = express.Router();

module.exports = (db) => {
  const collection = db.collection("inventoryc");

  // GET all products
  router.get("/", async (req, res) => {
    try {
      const products = await collection.find().toArray();
      res.json(products);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  // STOCK REPORT
  router.get("/reports/stock", async (req, res) => {
    try {
      const products = await collection.find().toArray();

      const stockReport = products.map((product) => ({
        name: product.name,
        stock: Number(product.quantity),
      }));

      res.json(stockReport);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  // MONTHLY REPORT
  router.get("/reports/monthly", async (req, res) => {
    try {
      const monthlyReport = await collection
        .aggregate([
          {
            $group: {
              _id: { $month: "$date" },
              stock: { $sum: "$quantity" },
            },
          },
          {
            $project: {
              _id: 0,
              month: "$_id",
              stock: 1,
            },
          },
          {
            $sort: { month: 1 },
          },
        ])
        .toArray();

      res.json(monthlyReport);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  // ADD product
  router.post("/", async (req, res) => {
    try {
      const { name, quantity, price, category, date } = req.body;

      const newProduct = {
        name,
        quantity: Number(quantity),
        price: Number(price),
        category,
        date: new Date(date),
      };

      await collection.insertOne(newProduct);
      res.status(201).json(newProduct);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  // UPDATE product
  router.put("/:id", async (req, res) => {
    try {
      const { name, quantity, price, category, date } = req.body;

      const updatedProduct = {
        name,
        quantity: Number(quantity),
        price: Number(price),
        category,
        date: new Date(date),
      };

      const result = await collection.updateOne(
        { _id: new ObjectId(req.params.id) },
        { $set: updatedProduct }
      );

      if (result.matchedCount === 0) {
        return res.status(404).json({ message: "Product not found" });
      }

      res.json({ message: "Product updated successfully" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  // DELETE product
  router.delete("/:id", async (req, res) => {
    try {
      await collection.deleteOne({ _id: new ObjectId(req.params.id) });
      res.json({ message: "Product deleted" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  return router;
};
