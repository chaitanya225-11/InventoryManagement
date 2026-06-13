// backend/src/config/db.js
const { MongoClient } = require("mongodb");

let db;

const connectDB = async () => {
  if (db) return db; // reuse if already connected

  try {
    const client = new MongoClient(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await client.connect();
    console.log(" MongoDB connected");

    db = client.db("inventoryms"); // your database name
    return db;
  } catch (err) {
    console.error(" DB connection failed:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
