const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./src/config/db");

dotenv.config();

const app = express();

// Enable CORS for your frontend
app.use(cors({
  origin: "http://localhost:5173",  // allow only your React app
  methods: ["GET", "POST", "DELETE"],
  allowedHeaders: ["Content-Type"],
}));

app.use(express.json());

// connect to DB once at startup
connectDB().then((db) => {
  console.log("Database ready");
  app.use("/api/products", require("./src/routes/productRoutes")(db));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
