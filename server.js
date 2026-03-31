const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

// Import route
const authRoutes = require("./backend/routes/authRoutes");
const userRoutes = require("./backend/routes/userRoutes");
const bookRoutes = require("./backend/routes/bookRoutes");
const borrowRoutes = require("./backend/routes/borrowRoutes");

// Định nghĩa route
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/borrows", borrowRoutes);

// Listen server (chỉ 1 lần thôi)
app.listen(3000, '0.0.0.0', () => {
  console.log("Server chạy tại http://localhost:3000");
});