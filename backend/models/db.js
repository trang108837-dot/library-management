const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "", // ⚠️ XAMPP thường để trống
  database: "library_db"
});

db.connect((err) => {
  if (err) {
    console.log("❌ Lỗi kết nối MySQL!");
  } else {
    console.log("✅ Kết nối MySQL thành công!");
  }
});

module.exports = db;