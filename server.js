const express = require("express");
const app = express();

app.use(express.json());

const authRoutes = require("./backend/routes/authRoutes");
const userRoutes = require("./backend/routes/userRoutes");
const bookRoutes = require("./backend/routes/bookRoutes");
const borrowRoutes = require("./backend/routes/borrowRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/borrows", borrowRoutes);

app.listen(3000, () => {
  console.log("Server chạy tại http://localhost:3000");
});