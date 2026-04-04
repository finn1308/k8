import React, { useState, useEffect } from 'react';
import { Heart, Play, X, Send, Camera, BookOpen } from 'lucide-react';

// --- MOCK DATA ---

const members = [
  { id: 1, name: 'Hải Yến', role: 'Lớp trưởng', img: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80' },
  { id: 2, name: 'Bảo Ngọc', role: 'Bí thư', img: 'https://images.unsplash.com/photo-1517365830460-955ce3ccd263?auto=format&fit=crop&w=400&q=80' },
  { id: 3, name: 'Tuấn Anh', role: 'Lớp phó học tập', img: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80' },
  { id: 4, name: 'Minh Khoa', role: 'Thành viên', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80' },
  { id: 5, name: 'Gia Linh', role: 'Thành viên', img: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=400&q=80' },
  { id: 6, name: 'Đức Phát', role: 'Thành viên', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80' },
  { id: 7, name: 'Lan Anh', role: 'Thành viên', img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80' },
  { id: 8, name: 'Hữu Trí', role: 'Thành viên', img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80' },
  { id: 9, name: 'Phương Thảo', role: 'Thành viên', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80' },
];

const galleryPhotos = [
  'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1511629091441-ee46146481b6?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1491841550275-ad7854e35ca6?auto=format&fit=crop&w=600&q=80',
];

const timelineEvents = [
  { id: 1, date: 'Tháng 9 - 2021', title: 'Ngày Tựu Trường', desc: 'Bỡ ngỡ bước vào ngôi trường mới, những người bạn mới.' },
  { id: 2, date: 'Tháng 11 - 2021', title: 'Hội Diễn Văn Nghệ', desc: 'Lần đầu tiên cả lớp cùng nhau tập múa hát đến tối mịt.' },
  { id: 3, date: 'Tháng 3 - 2022', title: 'Hội Trại Thanh Niên', desc: 'Đêm lửa trại không thể quên, cùng nhau nướng khoai và đàn hát.' },
  { id: 4, date: 'Tháng 5 - 2023', title: 'Chuyến Đi Mùa Hè', desc: 'Chuyến dã ngoại 2 ngày 1 đêm ngập tràn tiếng cười và những trò quậy phá.' },
  { id: 5, date: 'Tháng 1 - 2024', title: 'Chiến Dịch Ôn Thi', desc: 'Những buổi chiều ở lại trường giải đề, chia nhau từng ổ bánh mì.' },
  { id: 6, date: 'Tháng 5 - 2024', title: 'Lễ Trưởng Thành', desc: 'Chính thức khép lại hành trình 3 năm thanh xuân tươi đẹp.' },
];

const initialNotes = [
  { id: 1, name: 'Hải Đăng', text: 'Cảm ơn vì những kỷ niệm tuyệt vời. Chúc mọi người luôn thành công nhé!', color: 'bg-yellow-100', rotate: '-rotate-2' },
  { id: 2, name: 'Mai Anh', text: 'Thanh xuân có các cậu là điều tuyệt vời nhất. Nhớ mãi lớp mình!', color: 'bg-pink-100', rotate: 'rotate-3' },
  { id: 3, name: 'Tuấn Kiệt', text: 'Hẹn một ngày không xa chúng ta sẽ gặp lại nhau đông đủ nhé!', color: 'bg-blue-100', rotate: '-rotate-1' },
  { id: 4, name: 'Bảo Nhi', text: 'Giữ liên lạc nhé mọi người ơi, đừng quên nhau nha!', color: 'bg-green-100', rotate: 'rotate-2' },
  { id: 5, name: 'Cô Lan (GVCN)', text: 'Chúc các em thi tốt và đạt được ước mơ của mình!', color: 'bg-purple-100', rotate: '-rotate-3' },
  { id: 6, name: 'Minh Khoa', text: '3 năm trôi qua nhanh quá, chưa kịp làm quen hết mà đã ra trường.', color: 'bg-orange-100', rotate: 'rotate-1' },
  { id: 7, name: 'Gia Linh', text: 'Sẽ nhớ những giờ ra chơi vội vàng chạy xuống căn tin.', color: 'bg-yellow-100', rotate: 'rotate-2' },
  { id: 8, name: 'Đức Phát', text: 'Chúc anh em luôn vững bước trên đường đời.', color: 'bg-blue-100', rotate: '-rotate-2' },
];

const colors = ['bg-yellow-100', 'bg-pink-100', 'bg-blue-100', 'bg-green-100', 'bg-purple-100', 'bg-orange-100'];
const rotations = ['-rotate-2', 'rotate-1', '-rotate-1', 'rotate-2', 'rotate-3', '-rotate-3'];

export default function Yearbook() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notes, setNotes] = useState(initialNotes);
  const [newNote, setNewNote] = useState({ name: '', text: '', color: colors[0] });

  // Handle scroll for sticky navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAddNote = (e) => {
    e.preventDefault();
    if (!newNote.name || !newNote.text) return;
    
    setNotes([
      { 
        id: Date.now(), 
        ...newNote, 
        rotate: rotations[Math.floor(Math.random() * rotations.length)] 
      },
      ...notes
    ]);
    setNewNote({ name: '', text: '', color: colors[0] });
    setIsModalOpen(false);
  };

  return (
    <div className="bg-[#faf9f6] text-slate-800 font-sans min-h-screen">
      {/* Import Font for Script Headers */}
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap');
        .font-script { font-family: 'Dancing Script', cursive; }
      `}} />

      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className={`font-script text-2xl font-bold ${isScrolled ? 'text-slate-800' : 'text-white'}`}>
            12A1 Memory
          </div>
          <div className="hidden md:flex space-x-8">
            <a href="#thanh-vien" className={`text-sm font-medium hover:opacity-70 transition-opacity ${isScrolled ? 'text-slate-700' : 'text-white'}`}>Thành Viên</a>
            <a href="#khoanh-khac" className={`text-sm font-medium hover:opacity-70 transition-opacity ${isScrolled ? 'text-slate-700' : 'text-white'}`}>Khoảnh Khắc</a>
            <a href="#thoi-gian" className={`text-sm font-medium hover:opacity-70 transition-opacity ${isScrolled ? 'text-slate-700' : 'text-white'}`}>Thời Gian</a>
            <a href="#loi-nhan" className={`text-sm font-medium hover:opacity-70 transition-opacity ${isScrolled ? 'text-slate-700' : 'text-white'}`}>Lời Nhắn</a>
          </div>
        </div>
      </nav>

      {/* 1. Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1920&q=80" 
            alt="Lớp chụp kỷ yếu" 
            className="w-full h-full object-cover object-center filter brightness-[0.7]"
          />
        </div>
        <div className="relative z-10 text-center px-4">
          <p className="text-white text-lg md:text-xl mb-4 tracking-widest uppercase font-light">Kỷ yếu niên khóa 2021 - 2024</p>
          <h1 className="text-6xl md:text-8xl lg:text-9xl text-white font-script mb-8 drop-shadow-lg text-red-50">
            Thanh Xuân Của Chúng Ta
          </h1>
          <a href="#thanh-vien" className="inline-block mt-8 animate-bounce bg-white/20 backdrop-blur-sm p-3 rounded-full text-white hover:bg-white/30 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
          </a>
        </div>
      </section>

      {/* 2. Thành Viên (Members) */}
      <section id="thanh-vien" className="py-20 md:py-32 max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-script text-slate-800 mb-4 relative inline-block">
            Thành Viên
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 h-0.5 bg-slate-800 rounded"></div>
          </h2>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-10">
          {members.map((member) => (
            <div key={member.id} className="flex flex-col items-center group">
              <div className="w-full aspect-[3/4] overflow-hidden rounded-2xl mb-4 bg-slate-200 shadow-sm relative">
                <img 
                  src={member.img} 
                  alt={member.name} 
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                  <span className="text-white text-sm font-medium">{member.role}</span>
                </div>
              </div>
              <h3 className="text-lg font-bold text-slate-800">{member.name}</h3>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <button className="px-8 py-3 rounded-full border border-slate-300 text-slate-600 hover:bg-slate-800 hover:text-white transition-colors duration-300 text-sm font-medium uppercase tracking-wider">
            Xem thêm
          </button>
        </div>
      </section>

      {/* 3. Khoảnh Khắc Đáng Nhớ (Gallery) */}
      <section id="khoanh-khac" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-script text-slate-800 mb-4 relative inline-block">
              Khoảnh Khắc Đáng Nhớ
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 h-0.5 bg-slate-800 rounded"></div>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[250px]">
            {galleryPhotos.map((photo, index) => (
              <div 
                key={index} 
                className={`rounded-xl overflow-hidden shadow-sm group ${index === 0 ? 'md:col-span-2 md:row-span-2' : ''} ${index === 3 ? 'lg:col-span-2' : ''}`}
              >
                <img 
                  src={photo} 
                  alt="Kỷ niệm" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Dòng Thời Gian (Timeline) */}
      <section id="thoi-gian" className="py-20 md:py-32 max-w-5xl mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-script text-slate-800 mb-4 relative inline-block">
            Dòng Thời Gian
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 h-0.5 bg-slate-800 rounded"></div>
          </h2>
        </div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-slate-200 transform md:-translate-x-1/2"></div>
          
          <div className="space-y-12">
            {timelineEvents.map((event, index) => (
              <div key={event.id} className={`relative flex items-center justify-between md:justify-normal w-full ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                
                {/* Dot */}
                <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-slate-800 shadow-[0_0_0_4px_#faf9f6] transform -translate-x-1/2 z-10"></div>
                
                {/* Content Desktop Layout*/}
                <div className="w-[calc(100%-3rem)] md:w-5/12 ml-12 md:ml-0">
                  <div className={`bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow ${index % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                    <span className="inline-block py-1 px-3 rounded-full bg-slate-100 text-xs font-bold text-slate-500 mb-3 tracking-wider">{event.date}</span>
                    <h3 className="text-xl font-bold text-slate-800 mb-2">{event.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{event.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Phim Ngắn Kỷ Niệm (Video) */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-script mb-10 relative inline-block text-white">
            Phim Ngắn Kỷ Niệm
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 h-0.5 bg-white rounded"></div>
          </h2>
          
          <div className="relative aspect-video rounded-2xl overflow-hidden bg-black shadow-2xl group cursor-pointer">
            <img 
              src="https://images.unsplash.com/photo-1516280440504-a0817712e3e6?auto=format&fit=crop&w=1200&q=80" 
              alt="Video Thumbnail" 
              className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-300"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Play className="w-8 h-8 text-white ml-1" fill="currentColor" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Những Lời Nhắn Gửi (Guestbook / Sticky Notes) */}
      <section id="loi-nhan" className="py-20 md:py-32 max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-script text-slate-800 mb-4 relative inline-block">
            Những Lời Nhắn Gửi
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 h-0.5 bg-slate-800 rounded"></div>
          </h2>
          <p className="text-slate-500 mt-4 max-w-xl mx-auto">Những tình cảm, những lời chúc chưa kịp trao nhau, hãy để lại đây làm kỷ niệm nhé!</p>
        </div>

        {/* Masonry Grid for Notes */}
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6 pb-12">
          {notes.map((note) => (
            <div 
              key={note.id} 
              className={`relative break-inside-avoid p-6 rounded-lg shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ${note.color} ${note.rotate}`}
            >
              {/* Pin */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-slate-800/30 shadow-inner"></div>
              </div>
              
              <p className="text-slate-700 font-medium leading-relaxed mb-6 whitespace-pre-wrap">
                "{note.text}"
              </p>
              
              <div className="text-right border-t border-black/5 pt-3">
                <p className="font-bold text-slate-800 text-sm">{note.name}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button to open form modal */}
        <div className="text-center mt-10">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 bg-slate-800 text-white px-8 py-4 rounded-full font-medium hover:bg-slate-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <Send className="w-4 h-4" /> Gửi lời nhắn của bạn
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-10 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="font-script text-3xl text-white mb-4">12A1 Memory</p>
          <p className="flex items-center justify-center gap-1 text-sm mb-4">
            Tạo với <Heart className="w-4 h-4 text-red-500 fill-red-500 mx-1" /> lưu giữ thanh xuân
          </p>
          <p className="text-xs">© 2024 Lớp Chúng Mình. All rights reserved.</p>
        </div>
      </footer>

      {/* Modal Form Lời Nhắn */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          ></div>
          <div className="bg-white rounded-2xl w-full max-w-md p-6 relative z-10 shadow-2xl animate-in fade-in zoom-in duration-200">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 bg-slate-100 p-1 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
            
            <h3 className="text-2xl font-script font-bold text-slate-800 mb-6 text-center">Viết Lời Nhắn</h3>
            
            <form onSubmit={handleAddNote} className="space-y-4">
              <div>
                <input 
                  type="text" 
                  placeholder="Tên của bạn" 
                  value={newNote.name}
                  onChange={(e) => setNewNote({...newNote, name: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-300"
                  required
                />
              </div>
              <div>
                <textarea 
                  placeholder="Viết gì đó thật hay nhé..." 
                  value={newNote.text}
                  onChange={(e) => setNewNote({...newNote, text: e.target.value})}
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-300 resize-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-2">Màu giấy note:</label>
                <div className="flex gap-2 justify-center">
                  {colors.map(color => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setNewNote({...newNote, color})}
                      className={`w-8 h-8 rounded-full ${color} border-2 ${newNote.color === color ? 'border-slate-800 scale-110' : 'border-transparent'}`}
                    />
                  ))}
                </div>
              </div>
              <button 
                type="submit"
                className="w-full bg-slate-800 text-white font-medium py-3 rounded-xl hover:bg-slate-700 transition-colors mt-2"
              >
                Gắn lên bảng
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}