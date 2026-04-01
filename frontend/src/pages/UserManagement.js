import React, { useState, useEffect } from 'react'; 
import axios from 'axios'; 
import { Search, UserPlus, Edit, Trash2, Lock, Unlock, X, Plus } from 'lucide-react';

// CẬP NHẬT: Link ngrok dùng chung
const API_BASE_URL = "https://unrelegated-unentangled-mya.ngrok-free.dev/api/users";
const NGROK_HEADERS = {
  "ngrok-skip-browser-warning": "69420",
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

  // 1. Lấy dữ liệu từ ngrok khi load trang
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

  // 2. Logic lọc danh sách (Search)
  const filteredUsers = users.filter(user => {
    if (!user) return false;
    const search = searchTerm.toLowerCase();
    return (
      (user.name?.toLowerCase().includes(search)) ||
      (user.username?.toLowerCase().includes(search)) ||
      (user.email?.toLowerCase().includes(search)) ||
      (user.id?.toString().toLowerCase().includes(search))
    );
  });

  // 3. Hàm Xóa (Dùng ID tùy chỉnh SV/GV/KH để khớp với server JSON)
  const handleDelete = async (customId) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa thành viên này?")) {
        try {
            const response = await fetch(`${API_BASE_URL}/${customId}`, {
                method: 'DELETE',
                headers: NGROK_HEADERS 
            });

            if (response.ok) {
                alert("Xóa thành công!");
                setUsers(prevUsers => prevUsers.filter(user => user.id !== customId));
            } else {
                alert("Xóa thất bại. Vui lòng kiểm tra lại server.");
            }
        } catch (error) {
            alert("Lỗi kết nối Server ngrok!");
        }
    }
  };

  // 4. Hàm Khóa / Mở khóa (Cập nhật qua ngrok)
  const handleToggleStatus = async (user) => {
    const newStatus = user.status === 'Active' ? 'Locked' : 'Active';
    try {
      // Dùng user.id để đồng bộ với cấu trúc file JSON
      await axios.put(`${API_BASE_URL}/${user.id}`, { ...user, status: newStatus }, { headers: NGROK_HEADERS });
      await fetchUsers();
    } catch (error) {
      alert("Lỗi khi cập nhật trạng thái qua ngrok");
    }
  };

  const handleEditClick = (user) => {
    setEditingUser(user); 
    setFormData({
      name: user.name || user.username || '', 
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

  // 5. Hàm Lưu/Cập nhật (Tự động tạo mã ID và lưu vào file JSON)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let prefix = "KH";
      const roleUpper = formData.role ? formData.role.toUpperCase() : "";
      if (roleUpper.includes("SINH VIÊN") || roleUpper === "SV") prefix = "SV";
      else if (roleUpper.includes("GIẢNG VIÊN") || roleUpper === "GV") prefix = "GV";

      const payload = {
        name: formData.name,
        username: formData.name,
        email: formData.contact,
        role: formData.role,
        password: "123",
        status: "Active",
        borrowed: editingUser ? editingUser.borrowed : 0
      };

      if (editingUser) {
        // Cập nhật người dùng cũ dựa trên id
        await axios.put(`${API_BASE_URL}/${editingUser.id}`, payload, { headers: NGROK_HEADERS });
      } else {
        // Thêm người dùng mới với mã tự sinh
        await axios.post(API_BASE_URL, {
          ...payload,
          id: prefix + Math.floor(1000 + Math.random() * 9000)
        }, { headers: NGROK_HEADERS });
      }
      
      await fetchUsers();
      handleCloseModal();
    } catch (error) {
      alert("Lỗi khi lưu dữ liệu qua ngrok.");
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen text-slate-900 font-sans">
      <div className="bg-white p-6 rounded-2xl shadow-sm border-b border-gray-100 flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-[#1A237E]">Quản lý người dùng</h2>
          <p className="text-gray-500 mt-1">Quản lý thành viên hệ thống N5 BOOK</p>
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

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#1A237E] text-white text-[11px] uppercase tracking-wider">
              <th className="py-4 px-6 font-semibold">Thông tin thành viên</th>
              <th className="py-4 px-6 font-semibold text-center">Vai trò</th>
              <th className="py-4 px-6 font-semibold text-center">Sách mượn</th>
              <th className="py-4 px-6 font-semibold">Trạng thái</th>
              <th className="py-4 px-6 font-semibold text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filteredUsers.length > 0 ? filteredUsers.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="py-5 px-6">
                  <div className="font-bold text-slate-800">
                    {user.name || user.username || user.email || "Thành viên mới"}
                  </div>
                  <div className="text-xs text-gray-400 mt-0.5">
                    {user.id || "Chưa có mã"} • {user.email}
                  </div>
                </td>
                <td className="py-5 px-6 text-center">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                    user.role?.toUpperCase().includes('SINH VIÊN') ? 'bg-blue-100 text-blue-600' : 
                    user.role?.toUpperCase().includes('GIẢNG VIÊN') ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {user.role || 'KHÁCH HÀNG'}
                  </span>
                </td>
                <td className="py-5 px-6 text-center font-black text-[#1A237E] text-xl">{user.borrowed || 0}</td>
                <td className="py-5 px-6">
                  <span className={`flex items-center gap-2 text-sm font-medium ${user.status === 'Active' ? 'text-green-600' : 'text-red-500'}`}>
                    <div className={`w-2 h-2 rounded-full ${user.status === 'Active' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    {user.status === 'Active' ? 'Hoạt động' : 'Bị khóa'}
                  </span>
                </td>
                <td className="py-5 px-6 text-right">
                  <div className="flex justify-end gap-2 text-gray-400">
                    <button onClick={() => handleEditClick(user)} className="p-2 hover:text-blue-600 transition" title="Chỉnh sửa"><Edit size={18} /></button>
                    <button 
                      onClick={() => handleToggleStatus(user)} 
                      className={`p-2 transition ${user.status === 'Active' ? 'hover:text-orange-500' : 'hover:text-green-500 text-red-400'}`}
                      title={user.status === 'Active' ? "Khóa tài khoản" : "Mở khóa tài khoản"}
                    >
                      {user.status === 'Active' ? <Lock size={18} /> : <Unlock size={18} />}
                    </button>
                    <button onClick={() => handleDelete(user.id)} className="p-2 hover:text-red-600 transition" title="Xóa"><Trash2 size={18} /></button>
                  </div>
                </td>
              </tr>
            )) : (
              <tr><td colSpan="5" className="py-10 text-center text-gray-400">Không tìm thấy thành viên phù hợp</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl animate-in zoom-in duration-200">
            <div className="bg-[#1A237E] p-5 flex justify-between items-center text-white rounded-t-2xl">
              <h3 className="font-bold flex items-center gap-2"><UserPlus size={20} /> {editingUser ? 'Cập nhật' : 'Thêm mới'}</h3>
              <button onClick={handleCloseModal}><X size={20} /></button>
            </div>
            <form className="p-6 space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase ml-1">Họ và tên</label>
                <input required className="w-full border p-3 rounded-xl outline-none focus:ring-1 focus:ring-blue-500 mt-1" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase ml-1">Vai trò</label>
                <input className="w-full border p-3 rounded-xl outline-none focus:ring-1 focus:ring-blue-500 mt-1" value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase ml-1">Email / SĐT</label>
                <input className="w-full border p-3 rounded-xl outline-none focus:ring-1 focus:ring-blue-500 mt-1" value={formData.contact} onChange={e => setFormData({...formData, contact: e.target.value})} />
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