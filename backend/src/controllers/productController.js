const connectDB = require("../config/db");

// GET all items
async function getItems(req, res) {
  try {
    const db = await connectDB();
    const items = await db.collection("inventoryc").find().toArray(); // collection = inventoryc
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// POST add item
// async function addItem(req, res) {
//   try {
//     const db = await connectDB();
//     const result = await db.collection("inventoryc").insertOne(req.body);
//     res.status(201).json(result);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// }

async function addItem(req, res) {
  try {
    const db = await connectDB();

    const newProduct = {
      ...req.body,
      date: req.body.date ? new Date(req.body.date) : new Date()
    };

    await db.collection("inventoryc").insertOne(newProduct);
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// PRODUCT-WISE STOCK REPORT
async function productStockReport(req, res) {
  try {
    const db = await connectDB();

    const products = await db
      .collection("inventoryc")
      .find({}, { projection: { name: 1, quantity: 1 } })
      .toArray();

    res.json(
      products.map(p => ({
        name: p.name,
        stock: p.quantity
      }))
    );
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// MONTHLY STOCK REPORT
async function monthlyStockReport(req, res) {
  try {
    const db = await connectDB();

    const data = await db.collection("inventoryc").aggregate([
      {
        $group: {
          _id: { $month: "$date" },
          totalStock: { $sum: "$quantity" }
        }
      },
      { $sort: { _id: 1 } }
    ]).toArray();

    const months = [
      "Jan","Feb","Mar","Apr","May","Jun",
      "Jul","Aug","Sep","Oct","Nov","Dec"
    ];

    res.json(
      data.map(d => ({
        month: months[d._id - 1],
        stock: d.totalStock
      }))
    );
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}


module.exports = { getItems, addItem,  productStockReport,
  monthlyStockReport };
