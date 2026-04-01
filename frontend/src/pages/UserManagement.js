import React, { useState, useEffect } from 'react'; 
import axios from 'axios'; 
import { Search, UserPlus, Edit, Trash2, Lock, Unlock, X, Plus } from 'lucide-react';

// CẬP NHẬT: Link ngrok duy nhất
const API_BASE_URL = "https://unrelegated-unentangled-mya.ngrok-free.dev/api/users";
const NGROK_HEADERS = {
  "ngrok-skip-browser-warning": "true",
  "Content-Type": "application/json"
};

const UserManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null); 
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    contact: ''
  });

  // 1. Lấy dữ liệu khi load trang
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(API_BASE_URL, { headers: NGROK_HEADERS });
      setUsers(response.data);
    } catch (error) {
      console.error("Lỗi lấy danh sách:", error);
    }
  };

  // 2. Logic tìm kiếm
  const filteredUsers = users.filter(user => {
    if (!user) return false;
    const search = searchTerm.toLowerCase();
    return (
      (user.username?.toLowerCase().includes(search)) ||
      (user.email?.toLowerCase().includes(search)) ||
      (user.id?.toString().includes(search))
    );
  });

  // 3. Hàm Xóa
  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa thành viên này?")) {
      try {
        await axios.delete(`${API_BASE_URL}/${id}`, { headers: NGROK_HEADERS });
        alert("Xóa thành công!");
        fetchUsers(); // Load lại danh sách
      } catch (error) {
        alert("Lỗi khi xóa thành viên!");
      }
    }
  };

  // 4. Hàm Khóa / Mở khóa
  const handleToggleStatus = async (user) => {
    const newStatus = user.status === 'active' ? 'locked' : 'active';
    try {
      await axios.put(`${API_BASE_URL}/${user.id}`, { 
        ...user, 
        status: newStatus 
      }, { headers: NGROK_HEADERS });
      fetchUsers();
    } catch (error) {
      alert("Lỗi khi cập nhật trạng thái");
    }
  };

  // Mở modal sửa
  const handleEditClick = (user) => {
    setEditingUser(user); 
    setFormData({
      name: user.username || '', 
      role: user.role || '',
      contact: user.email || '' 
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingUser(null);
    setFormData({ name: '', role: '', contact: '' });
  };

  // 5. Hàm Gửi dữ liệu (Thêm hoặc Sửa)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        username: formData.name,
        email: formData.contact,
        password: "123",
        role: formData.role || "user",
        status: editingUser ? editingUser.status : "active"
      };

      if (editingUser) {
        // Nếu đang sửa: Gửi PUT
        await axios.put(`${API_BASE_URL}/${editingUser.id}`, payload, { headers: NGROK_HEADERS });
        alert("Cập nhật thành công!");
      } else {
        // Nếu thêm mới: Gửi POST
        await axios.post(API_BASE_URL, payload, { headers: NGROK_HEADERS });
        alert("Thêm mới thành công!");
      }

      fetchUsers(); // Cập nhật lại bảng
      handleCloseModal();
    } catch (error) {
      console.error("Lỗi:", error.response);
      alert("Lỗi khi lưu dữ liệu. Kiểm tra lại Server!");
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen text-slate-900 font-sans">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border-b border-gray-100 flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-[#1A237E]">Quản lý người dùng</h2>
          <p className="text-gray-500 mt-1">Hệ thống N5 BOOK</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative w-80">
            <input 
              type="text" 
              placeholder="Tìm theo tên, mã số, email..." 
              className="w-full pl-11 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1A237E] outline-none transition"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3.5 top-3 text-gray-400" size={20} />
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-[#FFB300] hover:bg-yellow-600 text-white px-5 py-2.5 rounded-xl flex items-center gap-2 font-bold shadow-sm transition"
          >
            <Plus size={20} /> Thêm mới
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#1A237E] text-white text-[11px] uppercase tracking-wider">
              <th className="py-4 px-6 font-semibold">Thông tin thành viên</th>
              <th className="py-4 px-6 font-semibold text-center">Vai trò</th>
              <th className="py-4 px-6 font-semibold">Trạng thái</th>
              <th className="py-4 px-6 font-semibold text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filteredUsers.length > 0 ? filteredUsers.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="py-5 px-6">
                  <div className="font-bold text-slate-800">{user.username}</div>
                  <div className="text-xs text-gray-400 mt-0.5">ID: {user.id} • {user.email}</div>
                </td>
                <td className="py-5 px-6 text-center">
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase bg-blue-100 text-blue-600">
                    {user.role}
                  </span>
                </td>
                <td className="py-5 px-6">
                  <span className={`flex items-center gap-2 text-sm font-medium ${user.status === 'active' ? 'text-green-600' : 'text-red-500'}`}>
                    <div className={`w-2 h-2 rounded-full ${user.status === 'active' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    {user.status === 'active' ? 'Hoạt động' : 'Bị khóa'}
                  </span>
                </td>
                <td className="py-5 px-6 text-right">
                  <div className="flex justify-end gap-2 text-gray-400">
                    <button onClick={() => handleEditClick(user)} className="p-2 hover:text-blue-600 transition"><Edit size={18} /></button>
                    <button onClick={() => handleToggleStatus(user)} className="p-2 hover:text-orange-500 transition">
                      {user.status === 'active' ? <Lock size={18} /> : <Unlock size={18} />}
                    </button>
                    <button onClick={() => handleDelete(user.id)} className="p-2 hover:text-red-600 transition"><Trash2 size={18} /></button>
                  </div>
                </td>
              </tr>
            )) : (
              <tr><td colSpan="4" className="py-10 text-center text-gray-400">Không có dữ liệu</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl">
            <div className="bg-[#1A237E] p-5 flex justify-between items-center text-white rounded-t-2xl">
              <h3 className="font-bold flex items-center gap-2">
                <UserPlus size={20} /> {editingUser ? 'Cập nhật thành viên' : 'Thêm thành viên mới'}
              </h3>
              <button onClick={handleCloseModal}><X size={20} /></button>
            </div>
            <form className="p-6 space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase">Họ và tên</label>
                <input required className="w-full border p-3 rounded-xl mt-1 outline-none focus:ring-2 focus:ring-blue-500" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase">Vai trò</label>
                <select className="w-full border p-3 rounded-xl mt-1 outline-none" value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})}>
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                  <option value="giangvien">Giảng viên</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase">Email / SĐT</label>
                <input required className="w-full border p-3 rounded-xl mt-1 outline-none focus:ring-2 focus:ring-blue-500" value={formData.contact} onChange={e => setFormData({...formData, contact: e.target.value})} />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={handleCloseModal} className="flex-1 py-3 font-bold text-gray-500 border rounded-xl">Hủy</button>
                <button type="submit" className="flex-1 py-3 bg-[#FFB300] text-white font-bold rounded-xl shadow-md">Lưu ngay</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;