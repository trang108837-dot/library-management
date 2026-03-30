export const bookService = {
  getBooksByCategory: () => {
    return [
      { id: 1, title: 'Nhà Giả Kim', category: 'Kỹ năng', status: 'Sẵn có', code: 'S-001' },
      { id: 2, title: 'Đắc Nhân Tâm', category: 'Kỹ năng', status: 'Đang mượn', code: 'S-002' },
      { id: 6, title: 'Tiếng Gọi Cthulhu', category: 'Kinh dị', status: 'Sẵn có', code: 'S-006' },
      { id: 7, title: 'Chuyện Con Mèo Dạy Hải Âu Bay', category: 'Hài hước', status: 'Sẵn có', code: 'S-007' },
      { id: 8, title: 'IT - Chú Hề Ma Quái', category: 'Kinh dị', status: 'Sẵn có', code: 'S-008' },
    ];
  },
  
  // Hàm để lấy danh sách các thể loại duy nhất
  getCategories: () => {
    return ['Tất cả', 'Kỹ năng', 'Kinh dị', 'Hài hước', 'Văn học'];
  }
};