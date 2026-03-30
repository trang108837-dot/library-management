const db = require("../models/db");

// 📚 mượn sách
const borrowBook = async (req, res) => {
  try {
    const { user_id, book_id } = req.body;

    const [book] = await db.query(
      "SELECT * FROM books WHERE id = ?",
      [book_id]
    );

    if (!book[0] || book[0].quantity < 1) {
      return res.status(400).json({ error: "Sách không có sẵn" });
    }

    await db.query(
      "INSERT INTO borrows (user_id, book_id) VALUES (?, ?)",
      [user_id, book_id]
    );

    await db.query(
      "UPDATE books SET quantity = quantity - 1 WHERE id = ?",
      [book_id]
    );

    res.json({ message: "Mượn sách thành công" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🔁 trả sách
const returnBook = async (req, res) => {
  try {
    const { id } = req.params;

    const [borrow] = await db.query(
      "SELECT * FROM borrows WHERE id = ?",
      [id]
    );

    if (!borrow[0]) {
      return res.status(404).json({ error: "Không tìm thấy" });
    }

    await db.query(
      "UPDATE borrows SET return_date = NOW() WHERE id = ?",
      [id]
    );

    await db.query(
      "UPDATE books SET quantity = quantity + 1 WHERE id = ?",
      [borrow[0].book_id]
    );

    res.json({ message: "Trả sách thành công" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 📋 lấy danh sách mượn
const getBorrows = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT b.id, u.name AS user_name, bk.title AS book_title, b.borrow_date, b.return_date
      FROM borrows b
      JOIN users u ON b.user_id = u.id
      JOIN books bk ON b.book_id = bk.id
      ORDER BY b.borrow_date DESC
    `);

    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


module.exports = {
  borrowBook,
  returnBook,
  getBorrows
};