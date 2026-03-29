const db = require("../models/db");

// 📚 Lấy tất cả sách
const getBooks = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM books");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🔍 Lấy 1 sách theo id
const getBookById = async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await db.query(
      "SELECT * FROM books WHERE id = ?",
      [id]
    );

    if (!rows[0]) {
      return res.status(404).json({ error: "Không tìm thấy sách" });
    }

    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ➕ Thêm sách
const createBook = async (req, res) => {
  try {
    const { title, author, quantity } = req.body;

    if (!title || !author || !quantity) {
      return res.status(400).json({ error: "Thiếu thông tin" });
    }

    await db.query(
      "INSERT INTO books (title, author, quantity) VALUES (?, ?, ?)",
      [title, author, quantity]
    );

    res.json({ message: "Thêm sách thành công" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✏️ Cập nhật sách
const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, quantity } = req.body;

    await db.query(
      "UPDATE books SET title = ?, author = ?, quantity = ? WHERE id = ?",
      [title, author, quantity, id]
    );

    res.json({ message: "Cập nhật thành công" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ❌ Xóa sách
const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;

    await db.query("DELETE FROM books WHERE id = ?", [id]);

    res.json({ message: "Xóa thành công" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
};