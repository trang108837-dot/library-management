const db = require("../models/db");

// 1. Lấy danh sách thành viên
exports.getUsers = async (req, res) => {
    try {
        const [results] = await db.query("SELECT * FROM users");
        res.json(results);
    } catch (err) {
        console.error("Lỗi lấy danh sách:", err);
        res.status(500).json({ message: "Lỗi Server", error: err.message });
    }
};

// 2. Thêm thành viên mới
exports.addUser = async (req, res) => {
  try {
    const { username, email, password, role, status } = req.body;
    const sql = "INSERT INTO users (username, email, password, role, status) VALUES (?, ?, ?, ?, ?)";
    
    const [result] = await db.execute(sql, [
      username || 'New User', 
      email || null, 
      password || '123', 
      role || 'user', 
      status || 'active'
    ]);

    res.status(201).json({ message: "Lưu thành công!", id: result.insertId });
  } catch (err) {
    console.error("Lỗi thêm user:", err);
    res.status(500).json({ message: "Lỗi Database khi thêm", details: err.message });
  }
};

// 3. Cập nhật thông tin (ĐÃ SỬA LẠI DÙNG AWAIT)
exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { username, email, role, status } = req.body;
        const sql = "UPDATE users SET username = ?, email = ?, role = ?, status = ? WHERE id = ?";

        await db.execute(sql, [username, email, role, status, id]);
        res.json({ message: "Cập nhật thành công!" });
    } catch (err) {
        console.error("Lỗi cập nhật:", err);
        res.status(500).json({ message: "Lỗi Database khi sửa", details: err.message });
    }
};

// 4. Xóa thành viên (ĐÃ SỬA LẠI DÙNG AWAIT)
exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        await db.execute("DELETE FROM users WHERE id = ?", [id]);
        res.json({ message: "Đã xóa thành viên!" });
    } catch (err) {
        console.error("Lỗi xóa:", err);
        res.status(500).json({ message: "Lỗi Database khi xóa", details: err.message });
    }
};