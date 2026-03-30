const db = require("./db");

const getAllBooks = async () => {
  const [rows] = await db.query("SELECT * FROM books");
  return rows;
};

const addBook = async (title, author) => {
  const [result] = await db.query(
    "INSERT INTO books (title, author) VALUES (?, ?)",
    [title, author]
  );
  return result;
};

module.exports = {
  getAllBooks,
  addBook,
};