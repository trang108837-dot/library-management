const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// --- CÁC ROUTE HIỆN TẠI ---
// Lấy danh sách thành viên (GET)
router.get("/", userController.getUsers);

// --- THÊM ROUTE MỚI (Tương tự logic trong server.js) ---
// Thêm thành viên mới (POST)
// Lưu ý: Nếu bạn đã viết logic trong userController.addUser thì dùng dòng dưới:
// router.post("/", userController.addUser); 

// Nếu chưa có trong Controller, bạn có thể viết tạm ở đây để chạy ngay:
router.post("/", (req, res) => {
    // Kết nối db (thường biến db được export từ file config hoặc lấy từ req.app.get('db'))
    // Ở đây tôi giả định bạn dùng db trực tiếp hoặc qua controller
    if (userController.addUser) {
        return userController.addUser(req, res);
    } else {
        res.status(501).json({ message: "Chức năng addUser chưa được định nghĩa trong Controller" });
    }
});

module.exports = router;