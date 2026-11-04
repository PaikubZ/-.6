import React, { useState } from 'react';
import { StudentWork } from '../types';
import { STUDENT_WORKS } from '../data/mockData';
import {
  Palette,
  Heart,
  Eye,
  X,
  Sparkles,
  Award,
  Search,
  MessageCircle,
  Share2,
  CheckCircle2,
  User,
  GraduationCap
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const GallerySection: React.FC = () => {
  const [works, setWorks] = useState<StudentWork[]>(STUDENT_WORKS);
  const [selectedWork, setSelectedWork] = useState<StudentWork | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeClassFilter, setActiveClassFilter] = useState<string>('all');
  const [cheerMessage, setCheerMessage] = useState<string>('');
  const [cheersList, setCheersList] = useState<{ [workId: string]: { name: string; text: string; time: string }[] }>({
    'work-1': [
      { name: 'น้องฟ้าใส ป.6/2', text: 'สรุปเข้าใจง่ายมากเลยน้องก้อง ชอบสีโปสเตอร์จ้า!', time: '1 วันที่แล้ว' },
      { name: 'ครูสมชาย', text: 'ออกแบบสวยงามมากครับ เป็นแบบอย่างที่ดีของ ป.6', time: '2 วันที่แล้ว' }
    ]
  });

  const handleLike = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setWorks((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newLiked = !item.hasLiked;
          if (newLiked) {
            confetti({
              particleCount: 40,
              spread: 50,
              origin: { y: 0.8 },
              colors: ['#F43F5E', '#FB7185', '#FDA4AF']
            });
          }
          return {
            ...item,
            likes: newLiked ? item.likes + 1 : item.likes - 1,
            hasLiked: newLiked
          };
        }
        return item;
      })
    );

    if (selectedWork && selectedWork.id === id) {
      setSelectedWork((prev) =>
        prev
          ? {
              ...prev,
              likes: !prev.hasLiked ? prev.likes + 1 : prev.likes - 1,
              hasLiked: !prev.hasLiked
            }
          : null
      );
    }
  };

  const handleAddCheer = (workId: string) => {
    if (!cheerMessage.trim()) return;
    const newCheer = {
      name: 'เพื่อน ป.6 ร่วมให้กำลังใจ',
      text: cheerMessage.trim(),
      time: 'เมื่อสักครู่'
    };
    setCheersList((prev) => ({
      ...prev,
      [workId]: [newCheer, ...(prev[workId] || [])]
    }));
    setCheerMessage('');
  };

  const filteredWorks = works.filter((w) => {
    if (activeCategory !== 'all' && w.category !== activeCategory) return false;
    if (activeClassFilter !== 'all' && w.studentClass !== activeClassFilter) return false;
    return true;
  });

  return (
    <div className="space-y-8 pb-16">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 rounded-3xl p-6 sm:p-8 text-white shadow-lg space-y-4">
        <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-pink-200">
          <Palette className="w-3.5 h-3.5" />
          <span>หอเกียรติยศและเวทีแสดงความสามารถ</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          โชว์ผลงานนักเรียน ป.6 (Student Showcase)
        </h1>
        <p className="text-purple-100 text-xs sm:text-sm max-w-2xl leading-relaxed">
          รวมผลงานการออกแบบอินโฟกราฟิกความรู้ ผังงานอัลกอริทึม และโครงงานเกม Scratch จากเพื่อนๆ ป.6 ทุกห้องเรียน ร่วมกดหัวใจส่งกำลังใจให้เพื่อนๆ กันนะ!
        </p>

        {/* Filter Toolbar */}
        <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/20 flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Class Filter */}
          <div className="flex items-center gap-2">
            <span className="font-bold text-white/80">ห้องเรียน:</span>
            <div className="flex gap-1">
              {['all', 'ป.6/1', 'ป.6/2', 'ป.6/3'].map((cls) => (
                <button
                  key={cls}
                  onClick={() => setActiveClassFilter(cls)}
                  className={`px-3 py-1 rounded-xl font-bold transition ${
                    activeClassFilter === cls
                      ? 'bg-amber-400 text-amber-950 shadow-xs'
                      : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                >
                  {cls === 'all' ? 'ทุกห้อง' : cls}
                </button>
              ))}
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-1.5 overflow-x-auto">
            {[
              { id: 'all', label: 'ผลงานทั้งหมด' },
              { id: 'infographic', label: 'อินโฟกราฟิก 📊' },
              { id: 'scratch', label: 'เกม Scratch 🎮' },
              { id: 'flowchart', label: 'ผังงาน 📋' }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1 rounded-xl font-bold transition whitespace-nowrap ${
                  activeCategory === cat.id
                    ? 'bg-white text-indigo-900 shadow-xs'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid of Student Works */}
      {filteredWorks.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border-2 border-dashed border-slate-300">
          <p className="text-slate-500 font-bold">ไม่พบผลงานตามเงื่อนไขที่เลือก</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWorks.map((work) => (
            <div
              key={work.id}
              onClick={() => setSelectedWork(work)}
              className="group bg-white rounded-3xl border-2 border-slate-200 hover:border-indigo-400 shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer flex flex-col justify-between transform hover:-translate-y-1"
            >
              <div>
                {/* Visual Image / Thumbnail */}
                <div className="relative aspect-4/3 w-full overflow-hidden bg-slate-100">
                  <img
                    src={work.imageSrc}
                    alt={work.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="bg-white/90 backdrop-blur-md text-slate-800 text-[11px] font-black px-2.5 py-0.5 rounded-full shadow-sm">
                      {work.studentClass}
                    </span>
                    <span className="bg-indigo-600 text-white text-[11px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                      {work.categoryLabel}
                    </span>
                  </div>

                  {/* Hover view hint */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-indigo-950/40 backdrop-blur-xs text-white font-bold text-xs gap-1.5">
                    <Eye className="w-4 h-4" />
                    <span>คลิกเพื่อขยายภาพขนาดใหญ่</span>
                  </div>

                  {/* Title overlay on bottom of image */}
                  <div className="absolute bottom-3 inset-x-3 text-white">
                    <h3 className="font-extrabold text-sm sm:text-base leading-tight line-clamp-1 drop-shadow-md">
                      {work.title}
                    </h3>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-4 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 font-bold text-slate-800">
                      <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-[10px] font-black">
                        ป.6
                      </div>
                      <span>{work.studentName}</span>
                      <span className="text-slate-400 font-normal">({work.studentNickname})</span>
                    </div>
                    {work.scoreGrade && (
                      <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                        {work.scoreGrade}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {work.summary}
                  </p>

                  <div className="flex flex-wrap gap-1">
                    {work.toolsUsed.map((tool, i) => (
                      <span key={i} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-medium">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Card Footer: Like & Date */}
              <div className="p-4 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-[11px] text-slate-400">{work.date}</span>

                <button
                  onClick={(e) => handleLike(work.id, e)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold transition active:scale-90 ${
                    work.hasLiked
                      ? 'bg-rose-500 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-rose-50 hover:text-rose-600'
                  }`}
                  title="กดหัวใจให้เพื่อน"
                >
                  <Heart className={`w-3.5 h-3.5 ${work.hasLiked ? 'fill-current' : ''}`} />
                  <span>{work.likes}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Full-Screen Pop-up Modal for Enlarged View */}
      {selectedWork && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/80 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border-4 border-indigo-200 overflow-hidden flex flex-col max-h-[92vh]">
            {/* Modal Top Bar */}
            <div className="bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-600 text-white p-4 sm:px-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-xl">
                  🎨
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs bg-amber-400 text-amber-950 font-bold px-2 py-0.5 rounded-full">
                      ห้อง {selectedWork.studentClass}
                    </span>
                    <span className="text-xs text-purple-200">
                      เลขที่ {selectedWork.studentNo} • {selectedWork.date}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white truncate max-w-md sm:max-w-xl">
                    {selectedWork.title}
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleLike(selectedWork.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition active:scale-95 ${
                    selectedWork.hasLiked
                      ? 'bg-rose-500 text-white shadow-md'
                      : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${selectedWork.hasLiked ? 'fill-current' : ''}`} />
                  <span>{selectedWork.likes} หัวใจ</span>
                </button>

                <button
                  onClick={() => setSelectedWork(null)}
                  className="p-2 text-white/80 hover:text-white bg-black/20 hover:bg-black/30 rounded-xl transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Scrollable Modal Content */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-50 space-y-6">
              {/* High-Resolution Picture Preview */}
              <div className="bg-slate-900 rounded-2xl overflow-hidden shadow-lg border border-slate-300 max-h-[460px] flex items-center justify-center">
                <img
                  src={selectedWork.imageSrc}
                  alt={selectedWork.title}
                  className="w-full h-full object-contain max-h-[440px]"
                />
              </div>

              {/* Work Details & Author Grid */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                {/* Left: Summary & Highlights */}
                <div className="md:col-span-7 space-y-4">
                  <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm">
                          {selectedWork.studentClass}
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900 text-sm">
                            {selectedWork.studentName} ({selectedWork.studentNickname})
                          </h4>
                          <span className="text-[11px] text-slate-500">
                            นักเรียนชั้น ป.6 • เลขที่ {selectedWork.studentNo}
                          </span>
                        </div>
                      </div>

                      {selectedWork.scoreGrade && (
                        <div className="text-right">
                          <span className="text-[10px] text-slate-400 block font-bold">คะแนนประเมิน</span>
                          <span className="text-xs font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-200">
                            {selectedWork.scoreGrade}
                          </span>
                        </div>
                      )}
                    </div>

                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed pt-2 border-t border-slate-100">
                      {selectedWork.summary}
                    </p>

                    <div className="space-y-1.5 pt-2">
                      <span className="text-xs font-bold text-slate-500">จุดเด่นของผลงานชิ้นนี้:</span>
                      <ul className="space-y-1 text-xs text-slate-600 pl-2">
                        {selectedWork.highlights.map((h, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-emerald-500 font-bold">✓</span>
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex items-center gap-2 pt-2">
                      <span className="text-xs font-bold text-slate-500">โปรแกรมที่ใช้สร้าง:</span>
                      {selectedWork.toolsUsed.map((tool, i) => (
                        <span key={i} className="text-xs font-bold bg-indigo-50 text-indigo-700 px-2.5 py-0.5 rounded-md">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Teacher Feedback Card */}
                  <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-4 sm:p-5 flex gap-3 text-amber-950">
                    <div className="w-10 h-10 rounded-xl bg-amber-400 text-amber-950 flex items-center justify-center text-xl shrink-0">
                      👨‍🏫
                    </div>
                    <div className="space-y-1">
                      <span className="text-xs font-extrabold text-amber-900 block">
                        คำชมและข้อเสนอแนะจาก คุณครูสมชาย:
                      </span>
                      <p className="text-xs sm:text-sm leading-relaxed italic text-amber-900">
                        "{selectedWork.teacherComment}"
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right: Classmate Cheers Section */}
                <div className="md:col-span-5 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
                  <div className="flex items-center justify-between">
                    <h5 className="font-bold text-slate-900 text-xs sm:text-sm flex items-center gap-1.5">
                      <MessageCircle className="w-4 h-4 text-indigo-600" />
                      <span>กล่องข้อความให้กำลังใจเพื่อน</span>
                    </h5>
                  </div>

                  {/* Add cheer comment */}
                  <div className="space-y-2">
                    <input
                      type="text"
                      placeholder="พิมพ์ข้อความชมเพื่อน เช่น เก่งมากเลยเพื่อน..."
                      value={cheerMessage}
                      onChange={(e) => setCheerMessage(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleAddCheer(selectedWork.id);
                      }}
                      className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-blue-500 focus:bg-white"
                    />
                    <button
                      onClick={() => handleAddCheer(selectedWork.id)}
                      className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition shadow-xs"
                    >
                      ส่งกำลังใจให้เพื่อน 💬
                    </button>
                  </div>

                  {/* Cheers list */}
                  <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                    {(cheersList[selectedWork.id] || []).length === 0 ? (
                      <p className="text-xs text-slate-400 text-center py-4">
                        ยังไม่มีข้อความ เป็นคนแรกที่ให้กำลังใจเพื่อนนะ!
                      </p>
                    ) : (
                      (cheersList[selectedWork.id] || []).map((ch, idx) => (
                        <div key={idx} className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-xs space-y-0.5">
                          <div className="flex justify-between text-[11px] font-bold text-slate-600">
                            <span>{ch.name}</span>
                            <span className="text-slate-400 font-normal">{ch.time}</span>
                          </div>
                          <p className="text-slate-800">{ch.text}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Bottom Close */}
            <div className="p-3 px-6 bg-white border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setSelectedWork(null)}
                className="px-6 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs rounded-xl transition"
              >
                ปิดหน้าต่าง
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
