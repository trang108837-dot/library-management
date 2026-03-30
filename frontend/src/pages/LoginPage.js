import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Khởi tạo điều hướng

  const handleLogin = (e) => {
    e.preventDefault();
    
    // 1. Lấy tên từ Email (ví dụ: quynh108862)
    const username = email.split('@')[0]; 
    
    // 2. Lưu tên vào localStorage để Header có thể đọc được
    localStorage.setItem('user', username);

    alert(`Chào mừng ${username} đã quay trở lại!`);
    
    // 3. Chuyển hướng về trang chủ ngay lập tức
    navigate('/'); 
    
    // 4. Load lại trang để Header cập nhật tên mới
    window.location.reload(); 
  };

  return (
    <div style={{ padding: '100px', textAlign: 'center', minHeight: '60vh', backgroundColor: '#f4f7f6' }}>
      <h2 style={{ color: '#282c34' }}>Đăng Nhập</h2>
      <form onSubmit={handleLogin} style={{ display: 'inline-block', textAlign: 'left', background: '#fff', padding: '30px', borderRadius: '10px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
        <div style={{ marginBottom: '15px' }}>
          <label>Email:</label><br/>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            style={styles.input}
            placeholder="Nhập email của bạn"
          />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label>Mật khẩu:</label><br/>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            style={styles.input}
            placeholder="Nhập mật khẩu"
          />
        </div>
        <button type="submit" style={styles.btn}>Đăng nhập</button>
        <p style={{ marginTop: '15px', fontSize: '14px' }}>Chưa có tài khoản? <a href="/register" style={{ color: '#3498db', textDecoration: 'none' }}>Đăng ký ngay</a></p>
      </form>
    </div>
  );
};

const styles = {
  input: { width: '300px', padding: '12px', marginTop: '5px', borderRadius: '5px', border: '1px solid #ddd', boxSizing: 'border-box' },
  btn: { width: '100%', padding: '12px', background: '#2c3e50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }
};

export default LoginPage;