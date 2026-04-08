import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, X, ChevronDown, Heart, Calendar, Image as ImageIcon, Users, MessageSquare, Video as VideoIcon } from 'lucide-react';

// --- MOCK DATA ---

const CLASS_MEMBERS = [
  { id: 1, name: 'Nguyễn Văn A', nickname: 'A "Cú Cáo"', quote: '"Thanh xuân như một tách trà, ăn xong miếng bánh hết bà thanh xuân."', img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400&h=400' },
  { id: 2, name: 'Trần Thị B', nickname: 'B "Điệu đà"', quote: '"Hứa với nhau là sẽ không quên nhé!"', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=400&h=400' },
  { id: 3, name: 'Lê Hoàng C', nickname: 'C "Học bá"', quote: '"Cảm ơn vì đã là một phần tuổi trẻ của tôi."', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400&h=400' },
  { id: 4, name: 'Phạm D', nickname: 'D "Tổ trưởng"', quote: '"Nhớ mãi những buổi chiều trốn trực nhật cùng nhau."', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400&h=400' },
  { id: 5, name: 'Hoàng Thị E', nickname: 'E "Bà La Sát"', quote: '"Đi đâu cũng được, miễn là đi cùng nhau."', img: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=400&h=400' },
  { id: 6, name: 'Vũ Văn F', nickname: 'F "Chúa hề"', quote: '"Cười lên đi, khóc làm gì cho nhòe mascara."', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400&h=400' },
  { id: 7, name: 'Đặng G', nickname: 'G "Mọt sách"', quote: '"Sau này hãy gặp lại nhau ở phiên bản tốt nhất nhé."', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400&h=400' },
  { id: 8, name: 'Bùi H', nickname: 'H "Ngủ nướng"', quote: '"Mai sau có ra sao, cũng đừng quên năm tháng này."', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400&h=400' },
];

const GALLERY_IMAGES = [
  { id: 1, url: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=80&w=800', caption: 'Lễ khai giảng năm ấy...' },
  { id: 2, url: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=800', caption: 'Chuyến dã ngoại mùa thu' },
  { id: 3, url: 'https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&q=80&w=800', caption: 'Những giờ học căng thẳng' },
  { id: 4, url: 'https://images.unsplash.com/photo-1606761568499-6d2451b08c66?auto=format&fit=crop&q=80&w=800', caption: 'Lễ tri ân - Khóc hết nước mắt' },
  { id: 5, url: 'https://images.unsplash.com/photo-1540317580384-e5d43867caa6?auto=format&fit=crop&q=80&w=800', caption: 'Vô địch kéo co toàn trường' },
  { id: 6, url: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=800', caption: 'Thanh xuân rực rỡ' },
];

const TIMELINE_EVENTS = [
  { id: 1, date: 'Tháng 9, 2022', title: 'Ngày Đầu Tiên', desc: 'Bỡ ngỡ bước vào lớp, những ánh mắt nhìn nhau còn ngại ngùng. Không ngờ sau này lại thân đến thế.', align: 'left' },
  { id: 2, date: 'Tháng 5, 2023', title: 'Kết Thúc Năm Nhất', desc: 'Đã biết "tẩy chay" đứa nào, lập nhóm chat nói xấu đứa nào. Bắt đầu hiểu tính nhau hơn.', align: 'right' },
  { id: 3, date: 'Tháng 3, 2024', title: 'Hội Trại 26/3', desc: 'Đêm đốt lửa trại đáng nhớ. Hát hò đến khản cổ, cùng nhau thức trắng đêm.', align: 'left' },
  { id: 4, date: 'Tháng 9, 2024', title: 'Năm Cuối Cấp', desc: 'Áp lực thi cử đè nặng, nhưng những trò đùa trong lớp vẫn không hề giảm bớt.', align: 'right' },
  { id: 5, date: 'Tháng 5, 2025', title: 'Lễ Trưởng Thành', desc: 'Những cái ôm thật chặt, những giọt nước mắt rơi. Chính thức chia tay mái trường.', align: 'left' },
];

const GUESTBOOK_NOTES = [
  { id: 1, text: 'Chúc A4 luôn thành công nhé! Nhớ mọi người nhiều.', color: 'bg-blue-100', rotate: '-rotate-2' },
  { id: 2, text: 'Thi đại học đỗ hết nha mấy đứa, không được đứa nào tạch đâu đấy!', color: 'bg-pink-100', rotate: 'rotate-3' },
  { id: 3, text: 'Gửi người ngồi bàn cuối: Cảm ơn vì đã luôn che chở tao ngủ gật.', color: 'bg-yellow-100', rotate: '-rotate-1' },
  { id: 4, text: 'Thanh xuân có các cậu là điều tuyệt vời nhất!', color: 'bg-purple-100', rotate: 'rotate-2' },
  { id: 5, text: 'Nhớ giữ liên lạc nha, 10 năm sau họp lớp không được vắng ai.', color: 'bg-green-100', rotate: '-rotate-3' },
  { id: 6, text: 'Yêu A4K41 nhất trên đời ❤️', color: 'bg-red-100', rotate: 'rotate-1' },
];

// --- COMPONENTS ---

export default function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  // Thêm font chữ từ Google Fonts
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Caveat:wght@400..700&family=Quicksand:wght@300;400;500;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);

  const toggleAudio = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="font-quicksand bg-[#fdfbf7] text-slate-800 min-h-screen smooth-scroll selection:bg-blue-200 selection:text-slate-900">
      {/* Styles nội tuyến cho các lớp tùy chỉnh */}
      <style dangerouslySetInnerHTML={{__html: `
        html { scroll-behavior: smooth; }
        .font-caveat { font-family: 'Caveat', cursive; }
        .font-quicksand { font-family: 'Quicksand', sans-serif; }
        .glass-nav { background: rgba(255, 255, 255, 0.7); backdrop-filter: blur(10px); border-bottom: 1px solid rgba(255, 255, 255, 0.3); }
        .masonry-grid { column-count: 2; column-gap: 1rem; }
        @media (min-width: 768px) { .masonry-grid { column-count: 3; } }
        .masonry-item { break-inside: avoid; margin-bottom: 1rem; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />

      {/* Audio Nhạc nền (Link nhạc lo-fi không bản quyền) */}
      <audio ref={audioRef} loop src="https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3"></audio>

      <Navbar toggleAudio={toggleAudio} isPlaying={isPlaying} />
      
      <main>
        <HeroSection />
        <MembersSection />
        <GallerySection />
        <TimelineSection />
        <VideoSection />
        <GuestbookSection />
      </main>

      <Footer />
    </div>
  );
}

// --- NAVBAR ---
function Navbar({ toggleAudio, isPlaying }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Trang chủ', href: '#home', icon: Heart },
    { name: 'Thành viên', href: '#members', icon: Users },
    { name: 'Khoảnh khắc', href: '#gallery', icon: ImageIcon },
    { name: 'Dòng thời gian', href: '#timeline', icon: Calendar },
    { name: 'Video', href: '#video', icon: VideoIcon },
    { name: 'Lưu bút', href: '#guestbook', icon: MessageSquare },
  ];

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'glass-nav py-3 shadow-sm' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        <a href="#home" className="font-caveat text-2xl md:text-3xl font-bold text-slate-800 tracking-wider">A4K41</a>
        
        <nav className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="text-sm font-medium text-slate-700 hover:text-blue-500 transition-colors">
              {link.name}
            </a>
          ))}
        </nav>

        <button 
          onClick={toggleAudio} 
          className="flex items-center justify-center w-10 h-10 rounded-full bg-white/50 hover:bg-white/80 backdrop-blur-sm transition-all shadow-sm border border-slate-100"
          title="Bật/Tắt nhạc nền"
        >
          {isPlaying ? <Pause size={18} className="text-slate-700" /> : <Play size={18} className="text-slate-700 ml-1" />}
        </button>
      </div>
    </header>
  );
}

// --- HERO SECTION ---
function HeroSection() {
  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0 scale-105 animate-[pulse_20s_ease-in-out_infinite]"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&q=80&w=1920&h=1080')" }}
      />
      
      {/* Soft Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/20 to-[#fdfbf7] backdrop-blur-[2px] z-10" />

      {/* Content */}
      <div className="relative z-20 text-center px-4 max-w-4xl mx-auto flex flex-col items-center">
        {/* Doodle Icon */}
        <div className="mb-6 opacity-80 animate-bounce">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#fcd34d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
          </svg>
        </div>

        <h1 className="font-caveat text-6xl md:text-8xl lg:text-9xl text-slate-800 drop-shadow-md mb-4 leading-tight">
          Thanh Xuân <br className="md:hidden" />Của Chúng Ta
        </h1>
        <p className="font-quicksand text-lg md:text-2xl text-slate-700 mb-10 max-w-2xl mx-auto font-medium">
          Những năm tháng rực rỡ dưới mái trường thân yêu - A4K41
        </p>
        
        <a 
          href="#members" 
          className="px-8 py-3 bg-white/80 hover:bg-white text-slate-800 font-semibold rounded-full shadow-md hover:shadow-lg transition-all duration-300 backdrop-blur-sm border border-slate-200 hover:-translate-y-1"
        >
          Khám phá kỷ niệm
        </a>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
        <a href="#members" className="text-slate-500 hover:text-slate-800 transition-colors">
          <ChevronDown size={32} />
        </a>
      </div>
    </section>
  );
}

// --- MEMBERS SECTION ---
function MembersSection() {
  const [selectedMember, setSelectedMember] = useState(null);

  return (
    <section id="members" className="py-24 px-4 md:px-8 max-w-7xl mx-auto">
      <SectionHeader title="Mảnh Ghép A4" subtitle="Mỗi người một vẻ, mười phân vẹn mười" />

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8 mt-12">
        {CLASS_MEMBERS.map((member) => (
          <div 
            key={member.id} 
            className="group bg-white rounded-[20px] p-3 md:p-4 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border border-slate-100 hover:border-blue-100 text-center"
            onClick={() => setSelectedMember(member)}
          >
            <div className="relative overflow-hidden rounded-2xl aspect-square mb-4">
              <img 
                src={member.img} 
                alt={member.name} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-blue-500/0 group-hover:bg-blue-500/10 transition-colors duration-300" />
            </div>
            <h3 className="font-bold text-lg text-slate-800">{member.name}</h3>
            <p className="text-sm text-slate-500 font-caveat text-xl">{member.nickname}</p>
          </div>
        ))}
      </div>

      {/* Member Modal */}
      {selectedMember && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm" onClick={() => setSelectedMember(null)}>
          <div 
            className="bg-white rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl relative transform transition-all animate-[fadeIn_0.3s_ease-out]"
            onClick={e => e.stopPropagation()}
          >
            <button onClick={() => setSelectedMember(null)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-800 bg-slate-100 rounded-full p-1 transition-colors">
              <X size={20} />
            </button>
            <div className="flex flex-col items-center text-center">
              <img src={selectedMember.img} alt={selectedMember.name} className="w-32 h-32 rounded-full object-cover shadow-md border-4 border-white mb-4" />
              <h2 className="text-2xl font-bold text-slate-800 mb-1">{selectedMember.name}</h2>
              <span className="inline-block bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm font-medium mb-6">
                {selectedMember.nickname}
              </span>
              <div className="relative p-6 bg-pink-50/50 rounded-2xl border border-pink-100 w-full">
                <span className="absolute top-2 left-3 text-4xl text-pink-200 font-serif">"</span>
                <p className="font-caveat text-2xl text-slate-700 relative z-10 leading-relaxed">
                  {selectedMember.quote}
                </p>
                <span className="absolute bottom-[-10px] right-3 text-4xl text-pink-200 font-serif transform rotate-180">"</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

// --- GALLERY SECTION ---
function GallerySection() {
  const [lightboxImg, setLightboxImg] = useState(null);

  return (
    <section id="gallery" className="py-24 bg-white/50 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeader title="Ngưng Đọng Thời Gian" subtitle="Những khoảnh khắc không thể nào quên" />

        <div className="masonry-grid mt-12">
          {GALLERY_IMAGES.map((img) => (
            <div 
              key={img.id} 
              className="masonry-item relative group overflow-hidden rounded-[20px] shadow-sm hover:shadow-lg transition-all cursor-pointer bg-white"
              onClick={() => setLightboxImg(img)}
            >
              <img src={img.url} alt={img.caption} className="w-full h-auto transform group-hover:scale-105 transition-transform duration-500" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <p className="p-6 text-white font-medium text-lg w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  {img.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxImg && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/90 backdrop-blur-md p-4" onClick={() => setLightboxImg(null)}>
          <button className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors">
            <X size={32} />
          </button>
          <div className="max-w-5xl w-full flex flex-col items-center">
            <img src={lightboxImg.url} alt={lightboxImg.caption} className="max-h-[80vh] w-auto object-contain rounded-lg shadow-2xl" onClick={e => e.stopPropagation()} />
            <p className="text-white/90 font-caveat text-3xl mt-6 text-center">{lightboxImg.caption}</p>
          </div>
        </div>
      )}
    </section>
  );
}

// --- TIMELINE SECTION ---
function TimelineSection() {
  return (
    <section id="timeline" className="py-24 px-4 md:px-8 max-w-5xl mx-auto">
      <SectionHeader title="Chuyến Tàu Thanh Xuân" subtitle="Nhìn lại chặng đường 3 năm đã qua" />

      <div className="mt-16 relative before:absolute before:inset-0 before:ml-5 md:before:mx-auto before:-translate-x-px md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-blue-200 before:to-transparent">
        {TIMELINE_EVENTS.map((item, index) => (
          <div key={item.id} className={`relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active mb-8 md:mb-12`}>
            {/* Timeline Dot */}
            <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-[#fdfbf7] bg-blue-300 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 relative z-10 group-hover:scale-110 group-hover:bg-blue-400 transition-all">
              <Calendar size={16} />
            </div>
            
            {/* Content Card */}
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-slate-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold text-blue-500 bg-blue-50 px-3 py-1 rounded-full">{item.date}</span>
              </div>
              <h3 className="font-bold text-xl text-slate-800 mb-2">{item.title}</h3>
              <p className="text-slate-600 leading-relaxed text-sm md:text-base">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// --- VIDEO SECTION ---
function VideoSection() {
  return (
    <section id="video" className="py-24 bg-[#e0f2fe]/30 px-4 md:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <SectionHeader title="Thước Phim Kỷ Niệm" subtitle="Chúng ta đã từng rực rỡ như thế" />
        
        <div className="mt-12 relative rounded-[30px] overflow-hidden shadow-2xl border-8 border-white bg-slate-100 aspect-video group">
          {/* Giả lập iframe YouTube để code chạy mượt, bạn có thể thay src thực tế */}
          <div className="absolute inset-0 flex items-center justify-center bg-slate-800 text-white">
            <img src="https://images.unsplash.com/photo-1540317580384-e5d43867caa6?auto=format&fit=crop&q=80&w=1200" alt="Video cover" className="absolute inset-0 w-full h-full object-cover opacity-60" />
            <div className="z-10 flex flex-col items-center group-hover:scale-110 transition-transform duration-300 cursor-pointer">
              <div className="w-20 h-20 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center mb-4 border border-white/50">
                <Play fill="white" size={32} className="ml-2 text-white" />
              </div>
              <p className="font-caveat text-3xl tracking-wide">Nhấn để xem video</p>
            </div>
          </div>
        </div>
        <p className="mt-6 font-caveat text-2xl text-slate-600">"Tạm biệt nhé, những tháng năm học trò..."</p>
      </div>
    </section>
  );
}

// --- GUESTBOOK SECTION ---
function GuestbookSection() {
  return (
    <section id="guestbook" className="py-24 px-4 md:px-8 max-w-7xl mx-auto overflow-hidden">
      <SectionHeader title="Góc Lưu Bút" subtitle="Những lời chưa kịp nói, gửi lại nơi đây" />

      <div className="mt-12 flex flex-wrap justify-center gap-6 md:gap-8 p-4">
        {GUESTBOOK_NOTES.map((note) => (
          <div 
            key={note.id} 
            className={`${note.color} ${note.rotate} p-6 w-64 h-64 shadow-md hover:shadow-xl hover:scale-105 hover:z-10 transition-all duration-300 flex flex-col relative`}
            style={{ 
              borderRadius: '2px 15px 2px 15px', 
              border: '1px solid rgba(0,0,0,0.05)'
            }}
          >
             {/* Pin illusion */}
            <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-3 h-3 rounded-full bg-slate-300/50 shadow-inner"></div>
            <p className="font-caveat text-2xl text-slate-800 leading-relaxed mt-4 flex-grow">
              {note.text}
            </p>
            <div className="text-right text-slate-500/50 font-caveat text-xl">
              ~ Thành viên A4
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// --- FOOTER ---
function Footer() {
  return (
    <footer className="bg-white border-t border-slate-100 py-10 mt-12 text-center">
      <div className="container mx-auto px-4">
        <h2 className="font-caveat text-4xl text-slate-800 mb-4">A4K41</h2>
        <p className="text-slate-500 text-sm mb-6 flex items-center justify-center gap-2">
          Thanh xuân của chúng ta <Heart size={14} className="text-red-400 fill-red-400" /> mãi mãi ở đây.
        </p>
        <p className="text-slate-400 text-xs">
          © 2025 Lớp A4K41. Thiết kế với nhiều cảm xúc.
        </p>
      </div>
    </footer>
  );
}

// --- UTILITY COMPONENTS ---
function SectionHeader({ title, subtitle }) {
  return (
    <div className="text-center max-w-2xl mx-auto">
      <h2 className="font-caveat text-5xl md:text-6xl text-slate-800 mb-3">{title}</h2>
      <p className="font-quicksand text-slate-500 uppercase tracking-widest text-sm font-semibold">{subtitle}</p>
      <div className="w-16 h-1 bg-blue-200 mx-auto mt-6 rounded-full"></div>
    </div>
  );
}
