const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");

// 📚 lấy danh sách sách
router.get("/", bookController.getBooks);

// 🔍 lấy chi tiết sách
router.get("/:id", bookController.getBookById);

// ➕ thêm sách
router.post("/", bookController.createBook);

// ✏️ cập nhật
router.put("/:id", bookController.updateBook);

// ❌ xóa
router.delete("/:id", bookController.deleteBook);

module.exports = router;