import React, { useState } from 'react';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // Thêm state mới
  const [error, setError] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    
    // Logic kiểm tra 2 mật khẩu
    if (password.length < 6) {
      setError("Mật khẩu phải có ít nhất 6 ký tự!");
    } else if (password !== confirmPassword) {
      setError("Mật khẩu xác nhận không khớp!"); // Bắt lỗi nếu không giống nhau
    } else {
      setError("");
      alert("Đăng ký tài khoản thư viện thành công!");
      console.log({ email, password });
    }
  };

  return (
    <div style={{ padding: '60px 20px', textAlign: 'center', minHeight: '70vh', backgroundColor: '#f4f7f6' }}>
      <div style={{ 
        display: 'inline-block', 
        textAlign: 'left', 
        background: 'white', 
        padding: '40px', 
        borderRadius: '10px', 
        boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
        width: '100%',
        maxWidth: '400px'
      }}>
        <h2 style={{ textAlign: 'center', color: '#2c3e50', marginBottom: '30px' }}>Đăng Ký Tài Khoản</h2>
        
        <form onSubmit={handleRegister}>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ fontWeight: 'bold' }}>Email:</label><br/>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="nhapemail@dongda.edu.vn"
              required 
              style={styles.input}
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ fontWeight: 'bold' }}>Mật khẩu:</label><br/>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="Ít nhất 6 ký tự"
              required 
              style={styles.input}
            />
          </div>

          {/* Ô NHẬP LẠI MẬT KHẨU MỚI THÊM */}
          <div style={{ marginBottom: '15px' }}>
            <label style={{ fontWeight: 'bold' }}>Xác nhận mật khẩu:</label><br/>
            <input 
              type="password" 
              value={confirmPassword} 
              onChange={(e) => setConfirmPassword(e.target.value)} 
              placeholder="Nhập lại mật khẩu trên"
              required 
              style={styles.input}
            />
          </div>

          {error && <p style={{ color: '#e74c3c', fontSize: '13px', fontWeight: 'bold', marginBottom: '15px' }}>{error}</p>}
          
          <button type="submit" style={styles.btn}>Đăng ký ngay</button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px' }}>
          Đã có tài khoản? <a href="/login" style={{ color: '#3498db', textDecoration: 'none', fontWeight: 'bold' }}>Đăng nhập</a>
        </p>
      </div>
    </div>
  );
};

const styles = {
  input: { 
    width: '100%', 
    padding: '12px', 
    marginTop: '8px', 
    borderRadius: '5px', 
    border: '1px solid #ddd',
    boxSizing: 'border-box' 
  },
  btn: { 
    width: '100%', 
    padding: '12px', 
    background: '#2c3e50', 
    color: 'white', 
    border: 'none', 
    borderRadius: '5px', 
    cursor: 'pointer', 
    fontWeight: 'bold',
    fontSize: '16px',
    marginTop: '10px'
  }
};

export default RegisterPage;