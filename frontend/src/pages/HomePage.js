import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const HomePage = () => {
  // 1. Quản lý trạng thái Thư mục (Category)
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const keyword = searchParams.get('search')?.toLowerCase() || '';

  // 2. Dữ liệu sách có thêm thuộc tính category (Thư mục)
  const libraryBooks = [
    { id: 1, title: 'Nhà Giả Kim', author: 'Paulo Coelho', category: 'Kỹ năng', status: 'Sẵn có', code: 'S-001', rating: 5, img: 'https://cdn0.fahasa.com/media/catalog/product/i/m/image_195509_1_36793.jpg' },
    { id: 2, title: 'Đắc Nhân Tâm', author: 'Dale Carnegie', category: 'Kỹ năng', status: 'Đang mượn', code: 'S-002', rating: 4, img: 'https://tiemsach.org/wp-content/uploads/2023/07/Ebook-Dac-nhan-tam.jpg' },
    { id: 3, title: 'Cách Nghĩ Để Thành Công', author: 'Napoleon Hill', category: 'Kỹ năng', status: 'Sẵn có', code: 'S-003', rating: 5, img: 'https://tiemsach.org/wp-content/uploads/2023/07/Ebook-Cach-nghi-de-thanh-cong.jpg' },
    { id: 4, title: 'Hạt Giống Tâm Hồn (Tập 1)', author: 'Nhiều tác giả', category: 'Kỹ năng', status: 'Sẵn có', code: 'S-004', rating: 4, img: 'https://product.hstatic.net/200000696663/product/8935086856147_548921fbc8024e75a05fcbfc4be2b199_grande.jpg' },
    { id: 5, title: 'Đọc Vị Bất Kỳ Ai', author: 'David J.Lieberman', category: 'Kỹ năng', status: 'Đang mượn', code: 'S-005', rating: 3, img: 'https://tse1.mm.bing.net/th/id/OIP.gvoicF2TOlolIx5U9k6e-wHaKX?rs=1&pid=ImgDetMain&o=7&rm=3' },
    { id: 6, title: 'IT - Chú Hề Ma Quái', author: 'Stephen King', category: 'Kinh dị', status: 'Sẵn có', code: 'S-006', rating: 5, img: 'https://th.bing.com/th/id/OIP.MsJ9cM-dp2XQVa6ldLeTyAHaHa?w=159&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3' },
    { id: 7, title: 'Chuyện Con Mèo Dạy Hải Âu Bay', author: 'Luis Sepúlveda', category: 'Hài hước', status: 'Sẵn có', code: 'S-007', rating: 5, img: 'https://th.bing.com/th/id/OIP.W9caWzLWCW-VgC81wkeK-AHaK2?w=142&h=208&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3' },
    { id: 8, title: 'Tiếng Gọi Cthulhu', author: 'H.P. Lovecraft', category: 'Kinh dị', status: 'Đang mượn', code: 'S-008', rating: 4, img: 'https://th.bing.com/th/id/OIP.T9NHzpTTt-oESKw2ZUg0ZgAAAA?w=115&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3' },
    { id: 9, title: 'The Shining (Thị Kiến)', author: 'Stephen King', category: 'Kinh dị', status: 'Sẵn có', code: 'S-009', rating: 5, img: 'https://th.bing.com/th/id/OIP.lUPgc0XMJNTjt9qyEnLFiQHaHa?w=211&h=211&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3' },
    { id: 10, title: 'Nhật Ký Chú Bé Nhút Nhát', author: 'Jeff Kinney', category: 'Hài hước', status: 'Sẵn có', code: 'S-010', rating: 5, img: 'https://th.bing.com/th/id/OIP.ae610HoTrXn4Pf8FeG-xTAHaHa?w=211&h=211&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3' },
  ];

  const categories = ['Tất cả', 'Kỹ năng', 'Kinh dị', 'Hài hước'];

  // 4. Logic lọc sách (Category + Search)
  const filteredBooks = libraryBooks.filter(book => {
    const matchesCategory = selectedCategory === 'Tất cả' || book.category === selectedCategory;
    const matchesSearch = book.title.toLowerCase().includes(keyword) || 
                          book.author.toLowerCase().includes(keyword);
    return matchesCategory && matchesSearch;
  });

  return (
    <div style={styles.container}>
      {/* BANNER NÂNG CẤP */}
      <div style={styles.banner}>
        <div style={styles.bannerOverlay}>
          <h1 style={styles.bannerTitle}>HỆ THỐNG QUẢN LÝ THƯ VIỆN</h1>
          <p style={styles.bannerSub}>Khám phá kho tàng tri thức với hàng ngàn đầu sách chọn lọc</p>
          <div style={styles.bannerStats}>
            <div style={styles.statItem}><strong>10,000+</strong> <br/> Đầu sách</div>
            <div style={styles.statDivider}></div>
            <div style={styles.statItem}><strong>5,000+</strong> <br/> Bạn đọc</div>
            <div style={styles.statDivider}></div>
            <div style={styles.statItem}><strong>24/7</strong> <br/> Hỗ trợ</div>
          </div>
        </div>
      </div>

      <div style={styles.content}>
        {/* THANH CHỌN THƯ MỤC NỔI BẬT */}
        <div style={styles.categoryBar}>
          {categories.map(cat => (
            <button 
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                ...styles.categoryBtn,
                background: selectedCategory === cat ? 'linear-gradient(135deg, #d70018 0%, #9e0012 100%)' : 'white',
                color: selectedCategory === cat ? 'white' : '#333',
                boxShadow: selectedCategory === cat ? '0 4px 15px rgba(215, 0, 24, 0.4)' : 'none',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* TIÊU ĐỀ PHÂN MỤC */}
        <div style={styles.sectionHeader}>
          <h3 style={styles.sectionTitle}>
            {keyword ? `🔍 Kết quả cho: "${keyword}"` : `📚 Danh mục: ${selectedCategory}`}
          </h3>
          <span style={styles.bookCount}>Tìm thấy <strong>{filteredBooks.length}</strong> cuốn</span>
        </div>
        
        {/* LƯỚI DANH SÁCH SÁCH */}
        <div style={styles.bookGrid}>
          {filteredBooks.length > 0 ? (
            filteredBooks.map((book) => (
              <div key={book.id} style={styles.bookCard} className="book-card-hover">
                {/* Badge trạng thái */}
                <div style={{
                  ...styles.statusBadge,
                  background: book.status === 'Sẵn có' ? '#2ecc71' : '#e74c3c'
                }}>
                  {book.status}
                </div>

                <div style={styles.bookCoverWrapper}>
                  <img src={book.img} alt={book.title} style={styles.bookCoverImg} />
                </div>
                
                <div style={styles.bookDetailArea}>
                  <h4 style={styles.bookName}>{book.title}</h4>
                  <p style={styles.bookAuthor}>Tác giả: {book.author}</p>
                  
                  <div style={styles.rating}>
                    {'★'.repeat(book.rating)}{'☆'.repeat(5 - book.rating)}
                  </div>

                  <div style={styles.actionGroup}>
                    <button style={styles.detailsBtn}>Chi tiết</button>
                    <button 
                      disabled={book.status !== 'Sẵn có'} 
                      style={{
                        ...styles.borrowBtn, 
                        opacity: book.status === 'Sẵn có' ? 1 : 0.6,
                        cursor: book.status === 'Sẵn có' ? 'pointer' : 'not-allowed'
                      }}
                      onClick={() => alert(`Đã thêm vào yêu cầu mượn: ${book.title}`)}
                    >
                      Mượn ngay
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div style={styles.noResult}>
              <img src="https://cdn-icons-png.flaticon.com/512/6134/6134065.png" alt="not found" style={{width: '100px', opacity: 0.5}} />
              <p>Rất tiếc, chúng tôi không tìm thấy sách bạn cần.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// --- HỆ THỐNG STYLES HOÀN CHỈNH ---
const styles = {
  container: { fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", backgroundColor: '#f0f2f5', color: '#1c1e21', minHeight: '100vh' },
  
  // Banner đẹp hơn
  banner: {
    height: '350px',
    backgroundImage: 'url("https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=1600&auto=format&fit=crop")',
    backgroundSize: 'cover', backgroundPosition: 'center',
    display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative'
  },
  bannerOverlay: { 
    textAlign: 'center', color: 'white', background: 'rgba(0, 0, 0, 0.6)', 
    padding: '40px', borderRadius: '15px', backdropFilter: 'blur(3px)', width: '80%', maxWidth: '800px' 
  },
  bannerTitle: { fontSize: '2.8rem', margin: '0 0 10px 0', fontWeight: '800', letterSpacing: '1px' },
  bannerSub: { fontSize: '1.2rem', marginBottom: '25px', opacity: 0.9, fontWeight: '300' },
  bannerStats: { display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '30px' },
  statItem: { fontSize: '0.9rem', lineHeight: '1.4' },
  statDivider: { width: '1px', height: '30px', background: 'rgba(255,255,255,0.3)' },
  
  content: { maxWidth: '1200px', margin: '-40px auto 50px auto', padding: '0 20px', position: 'relative', zIndex: 10 },
  
  // Category bar kiểu bo tròn hiện đại
  categoryBar: { display: 'flex', justifyContent: 'center', gap: '15px', marginBottom: '40px', background: 'white', padding: '15px', borderRadius: '50px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)' },
  categoryBtn: { 
    padding: '10px 25px', borderRadius: '30px', border: 'none', 
    cursor: 'pointer', fontWeight: '600', transition: 'all 0.3s ease', fontSize: '14px' 
  },

  sectionHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px', padding: '0 10px' },
  sectionTitle: { margin: 0, fontSize: '1.5rem', color: '#2c3e50', fontWeight: '700' },
  bookCount: { color: '#7f8c8d', fontSize: '0.95rem' },
  
  // Card sách sang trọng
  bookGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '25px' },
  bookCard: { 
    background: 'white', borderRadius: '15px', overflow: 'hidden', textAlign: 'left', 
    position: 'relative', boxShadow: '0 5px 15px rgba(0,0,0,0.08)', transition: '0.3s' 
  },
  statusBadge: { position: 'absolute', top: '12px', right: '12px', color: 'white', padding: '4px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: 'bold', zIndex: 2 },
  
  bookCoverWrapper: { height: '240px', background: '#f9f9f9', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '15px' },
  bookCoverImg: { height: '100%', maxWidth: '100%', objectFit: 'contain', transition: '0.5s transform' },
  
  bookDetailArea: { padding: '15px' },
  bookName: { fontSize: '1rem', fontWeight: '700', color: '#2c3e50', margin: '0 0 8px 0', height: '42px', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' },
  bookAuthor: { fontSize: '0.85rem', color: '#7f8c8d', margin: '0 0 10px 0' },
  rating: { color: '#f1c40f', marginBottom: '15px', fontSize: '0.8rem' },
  
  actionGroup: { display: 'flex', gap: '8px' },
  detailsBtn: { flex: 1, padding: '10px', background: '#f0f2f5', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: '600', color: '#4b5563' },
  borrowBtn: { flex: 2, padding: '10px', background: '#d70018', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '700', fontSize: '0.85rem' },

  noResult: { gridColumn: '1 / -1', textAlign: 'center', padding: '80px 0', color: '#95a5a6' }
};

export default HomePage;