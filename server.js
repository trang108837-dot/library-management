const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql2");

const app = express();

// --- 1. CẤU HÌNH MIDDLEWARE (Đã sửa để nhận diện ngrok) ---
app.use(cors({
    origin: '*', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'ngrok-skip-browser-warning']
}));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Header bổ sung cho ngrok
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("ngrok-skip-browser-warning", "true");
    next();
});

// --- 2. KẾT NỐI DATABASE ---
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "", // Nếu XAMPP có pass thì điền vào đây
    database: "library_db",
    port: 3306 
});

db.connect((err) => {
    if (err) {
        console.error("❌ Lỗi kết nối MySQL: ", err.message);
        console.log("👉 Hãy đảm bảo XAMPP/MySQL đã nhấn START.");
    } else {
        console.log("✅ Đã kết nối Database library_db thành công!");
    }
});

// --- 3. ĐỊNH NGHĨA CÁC ROUTE API ---

// Lấy danh sách thành viên (GET)
app.get('/api/users', (req, res) => {
    db.query("SELECT * FROM users", (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Thêm thành viên mới (POST) - ĐÃ SỬA THỨ TỰ VALUES
app.post('/api/users', (req, res) => {
    const { username, email, role, password, status } = req.body;
    
    // Thứ tự trong SQL: username, email, password, role, status
    const sql = "INSERT INTO users (username, email, password, role, status) VALUES (?, ?, ?, ?, ?)";
    
    // Mảng giá trị phải khớp 100% với thứ tự câu lệnh SQL ở trên
    const values = [
        username || "No Name",
        email || "No Email",
        password || "123",  // Đưa password lên trước role cho đúng cột
        role || "user",      // Đưa role xuống sau password
        status || "active"
    ];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("❌ Lỗi SQL:", err.message);
            return res.status(500).json({ message: "Lỗi Database", details: err.message });
        }
        console.log("✅ Đã thêm user mới, ID:", result.insertId);
        res.status(201).json({ message: "Lưu thành công!", id: result.insertId });
    });
});

// --- 4. KHỞI CHẠY SERVER ---
const PORT = 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`-----------------------------------------`);
    console.log(`🚀 Server backend đang chạy!`);
    console.log(`📂 API Users: http://localhost:${PORT}/api/users`);
    console.log(`-----------------------------------------`);
});