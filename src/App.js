import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LucideHome, LucideSearch, LucidePlus, LucideMessageCircle, LucideUser } from "lucide-react";

// المكون الرئيسي للتطبيق - تصميم Desert Industrial
const Home = () => (
  <div className="w-full max-w-md mx-auto min-h-screen bg-[#F9F8F6] relative pb-20 border-x border-[#E5E2DC]">
    {/* الهيدر */}
    <header className="p-4 flex justify-between items-center bg-white border-b border-[#E5E2DC]">
      <div className="font-bold text-xl text-[#1A3636]">دورها</div>
      <div className="w-8 h-8 bg-[#C84C09] rounded-full"></div>
    </header>

    {/* المحتوى */}
    <main className="p-4 space-y-6">
      {/* شريط البحث */}
      <div className="bg-white p-3 rounded-2xl border border-[#E5E2DC] shadow-sm">
        <input type="text" placeholder="ابحث عن خردة..." className="w-full outline-none text-sm" />
      </div>

      {/* الأقسام (Bento Grid) */}
      <div className="grid grid-cols-4 gap-4">
        {['معادن', 'إلكترونيات', 'أثاث', 'مكيفات'].map((cat) => (
          <button key={cat} className="flex flex-col items-center gap-2">
            <div className="w-14 h-14 bg-white border border-[#E5E2DC] rounded-2xl flex items-center justify-center hover:border-[#C84C09] transition-all">
               <LucidePlus className="text-[#C84C09]" />
            </div>
            <span className="text-[10px] font-light">{cat}</span>
          </button>
        ))}
      </div>
    </main>

    {/* شريط التنقل السفلي */}
    <nav className="fixed bottom-0 w-full max-w-md bg-white/90 backdrop-blur-xl border-t border-[#E5E2DC] flex justify-around p-4 z-50">
      <LucideHome className="text-[#1A3636]" />
      <LucideSearch className="text-[#8A8A8A]" />
      <button className="bg-[#C84C09] p-3 rounded-full -mt-8 text-white shadow-lg"><LucidePlus /></button>
      <LucideMessageCircle className="text-[#8A8A8A]" />
      <LucideUser className="text-[#8A8A8A]" />
    </nav>
  </div>
);

function App() {
  return (
    <div dir="rtl" className="font-sans">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
