const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

// Load environment variables
dotenv.config();
connectDB();

console.log("🔗 MONGO_URI:", process.env.MONGO_URI ? "Loaded ✅" : "Not Loaded ❌");
console.log("🔑 JWT_SECRET:", process.env.JWT_SECRET ? "Loaded ✅" : "Not Loaded ❌");

const app = express();
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/expenses", require("./routes/expenseRoutes"));

// Start server
app.listen(5000, () => console.log("🚀 Server running on port 5000"));
