import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import UserManagement from './pages/UserManagement';

function NavigationWrapper() {
  const location = useLocation();
  // Kiểm tra xem trang hiện tại có phải là trang admin không
  const isAdminPage = location.pathname.startsWith('/admin');

  return (
    <>
      {/* Chỉ hiển thị Header nếu không phải trang admin */}
      {!isAdminPage && <Header />}
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin/users" element={<UserManagement />} />
      </Routes>
      
      {/* Chỉ hiển thị Footer nếu không phải trang admin */}
      {!isAdminPage && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <NavigationWrapper />
    </Router>
  );
}

export default App;