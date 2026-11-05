import React, { useState } from 'react';
import { PageTab, Announcement } from '../types';
import { ANNOUNCEMENTS, LESSONS, GAMES_LIST, STUDENT_WORKS } from '../data/mockData';
import {
  Sparkles,
  BookOpen,
  Gamepad2,
  Palette,
  MessageSquare,
  Calendar,
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  Clock,
  Lightbulb,
  Award,
  ChevronRight,
  Smile,
  Zap,
  Download,
  Share2,
  ExternalLink,
  Laptop
} from 'lucide-react';

interface HomeSectionProps {
  onNavigate: (tab: PageTab) => void;
  onOpenLessonDetails?: (lessonId: string) => void;
}

export const HomeSection: React.FC<HomeSectionProps> = ({ onNavigate, onOpenLessonDetails }) => {
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);
  const [activeAnnouncementFilter, setActiveAnnouncementFilter] = useState<string>('all');
  const [currentTipIndex, setCurrentTipIndex] = useState<number>(0);

  const tips = [
    {
      title: 'รู้หรือไม่? ทำไมคำว่า "บั๊ก" (Bug) ถึงแปลว่าข้อผิดพลาดของโปรแกรม?',
      content: 'ในปี 1947 คุณเกรซ ฮอปเปอร์ (Grace Hopper) นักวิทยาศาสตร์คอมพิวเตอร์ พบ "แมลงมอดจริงๆ" บินเข้าไปติดอยู่ในวงจรรีเลย์ของเครื่องคอมพิวเตอร์ Mark II จนเครื่องหยุดทำงาน ตั้งแต่นั้นมาจึงเรียกว่าการแก้ปัญหาโปรแกรมว่า "Debugging" หรือการกำจัดแมลงนั่นเอง!',
      emoji: '🐞'
    },
    {
      title: 'ทำไมรหัสผ่าน (Password) ที่ดีต้องยาวเกิน 12 ตัวอักษร?',
      content: 'เพราะคอมพิวเตอร์ของแฮกเกอร์สามารถสุ่มรหัสผ่าน 6 ตัวอักษรที่เป็นตัวเลขได้ในเวลาไม่ถึง 1 วินาที! แต่ถ้าเราใช้รหัส 12 ตัว ผสมทั้งตัวพิมพ์เล็ก พิมพ์ใหญ่ ตัวเลข และสัญลักษณ์พิเศษ แฮกเกอร์จะต้องใช้เวลาสุ่มนานถึง 34,000 ปีเลยทีเดียว!',
      emoji: '🔐'
    },
    {
      title: 'โปรแกรม Scratch ตั้งชื่อตามอะไร?',
      content: 'ชื่อ Scratch ได้แรงบันดาลใจมาจากดีเจ (DJ) ที่กำลัง "ขูดแผ่นเสียง" (Scratching) เพื่อนำท่อนเพลงต่างๆ มารวมกันเป็นเพลงใหม่ เปรียบเหมือนพวกเราที่นำบล็อกคำสั่งสั้นๆ มาต่อรวมกันจนกลายเป็นเกมนั่นเอง!',
      emoji: '🎧'
    },
    {
      title: 'วิธีค้นหา Google ให้เจอรายงานใน 3 วินาที!',
      content: 'ลองพิมพ์คำว่า filetype:pdf ต่อท้ายสิ่งที่เราจะค้นหา เช่น "วิทยาการคำนวณ ป.6 filetype:pdf" Google จะคัดมาเฉพาะเอกสารที่มีใบงานและเนื้อหาแบบสมบูรณ์ให้เราทันที ไม่ต้องเปิดหาหลายเว็บ!',
      emoji: '🔍'
    }
  ];

  const filteredAnnouncements = ANNOUNCEMENTS.filter((item) => {
    if (activeAnnouncementFilter === 'all') return true;
    return item.category === activeAnnouncementFilter;
  });

  return (
    <div className="space-y-10 sm:space-y-12 pb-16">
      {/* Hero Banner - กิจกรรมประจำสัปดาห์ ภาคปลาย */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-sky-600 to-amber-500 text-white shadow-xl p-6 sm:p-10 lg:p-12">
        {/* Decorative background shapes */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/3 -mb-20 w-72 h-72 bg-amber-400/20 rounded-full blur-2xl pointer-events-none"></div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Hero Left Content */}
          <div className="lg:col-span-8 space-y-4 text-left">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3.5 py-1 rounded-full border border-white/30 text-xs sm:text-sm font-bold text-amber-200">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>กิจกรรมประจำสัปดาห์ ภาคปลาย</span>
            </div>

            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white drop-shadow-sm">
                กิจกรรมประจำสัปดาห์ ภาคปลาย
              </h1>
              <div className="inline-block mt-2 px-3.5 py-1 bg-amber-400 text-amber-950 font-bold rounded-xl text-sm sm:text-base shadow-sm">
                📅 สัปดาห์ที่ 1 (3 - 6 พฤศจิกายน 2569)
              </div>
            </div>

            {/* Weekly Tasks List */}
            <div className="space-y-2.5 pt-2">
              <div className="bg-white/15 backdrop-blur-md rounded-2xl p-3 sm:p-3.5 border border-white/20 flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-amber-400 text-amber-950 font-black text-xs flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                  1
                </span>
                <p className="text-xs sm:text-sm text-white font-medium leading-relaxed">
                  ดูสื่อวิดีโอการเรียนรู้ เรื่อง "ความสำคัญของปัญหา (ลิปดา&amp;โพล่า)" และเรื่อง "ผังงาน (Flowchart)"
                </p>
              </div>

              <div className="bg-white/15 backdrop-blur-md rounded-2xl p-3 sm:p-3.5 border border-white/20 flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-amber-400 text-amber-950 font-black text-xs flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                  2
                </span>
                <p className="text-xs sm:text-sm text-white font-medium leading-relaxed">
                  ศึกษาบทเรียนขั้นตอนการแก้ปัญหาอย่างเป็นระบบ 4 ขั้นตอน (วิเคราะห์ปัญหา &gt; วางแผน &gt; ดำเนินการ &gt; ตรวจสอบ) และแนวคิดเชิงตรรกะ (ลำดับขั้นตอน, มีเงื่อนไข, วนซ้ำ)
                </p>
              </div>

              <div className="bg-white/15 backdrop-blur-md rounded-2xl p-3 sm:p-3.5 border border-white/20 flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-amber-400 text-amber-950 font-black text-xs flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                  3
                </span>
                <p className="text-xs sm:text-sm text-white font-medium leading-relaxed">
                  ทำใบงาน เรื่อง "การแก้ปัญหาอย่างเป็นระบบ" (เก็บคะแนนสะสม 5 คะแนน)
                </p>
              </div>

              <div className="bg-white/15 backdrop-blur-md rounded-2xl p-3 sm:p-3.5 border border-white/20 flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-amber-400 text-amber-950 font-black text-xs flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                  4
                </span>
                <p className="text-xs sm:text-sm text-white font-medium leading-relaxed">
                  สรุปความรู้การเขียนรหัสลำลอง (Pseudocode) และการใช้สัญลักษณ์ผังงาน (Flowchart)
                </p>
              </div>
            </div>

            {/* Quick Action button */}
            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={() => onNavigate('lessons')}
                className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 active:scale-95 text-amber-950 font-extrabold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center gap-2"
              >
                <BookOpen className="w-4 h-4" />
                <span>ดูบทเรียนสัปดาห์ที่ 1</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Hero Right Cheerful Mascot */}
          <div className="lg:col-span-4 flex justify-center">
            <div className="relative w-full max-w-xs">
              <div className="relative bg-white/15 backdrop-blur-md rounded-3xl p-5 border-2 border-white/30 shadow-2xl animate-float text-center flex flex-col items-center">
                <div className="w-32 h-32 mx-auto drop-shadow-xl mb-2 flex items-center justify-center">
                  <img
                    src="/assets/aistudio/20_bf556e21.png"
                    alt="การ์ตูนนักเรียนสวัสดี"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="inline-block bg-amber-400 text-amber-950 text-xs font-black px-3 py-1 rounded-full mb-2 uppercase tracking-wider shadow-sm">
                  สัปดาห์ที่ 1 ภาคปลาย
                </div>
                <h3 className="text-lg font-bold text-white mb-1">
                  "ยินดีต้อนรับสู่ภาคปลาย!"
                </h3>
                <p className="text-xs text-sky-100">
                  ฝึกคิดเป็นระบบและเขียนผังงาน Flowchart สนุกๆ ไปด้วยกันนะคนเก่ง 🌟
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links Section (เมนูลัด 4 ช่องหลัก) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2">
              <Zap className="w-6 h-6 text-amber-500" />
              <span>เมนูลัดเพื่อการเรียนรู้</span>
            </h2>
            <p className="text-sm text-slate-500">เลือกหน้าที่ต้องการเข้าชมได้อย่างสะดวกรวดเร็ว</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {/* Card 1: Lessons */}
          <div
            onClick={() => onNavigate('lessons')}
            className="group relative bg-white p-5 rounded-3xl border-2 border-blue-100 hover:border-blue-400 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden transform hover:-translate-y-1"
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-500 to-sky-400 flex items-center justify-center text-white mb-4 shadow-md group-hover:scale-110 transition-transform">
              <BookOpen className="w-6 h-6" />
            </div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full">
                8 สัปดาห์
              </span>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition">
              คลังบทเรียน ป.6
            </h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              ตรรกะ, Flowchart, Scratch, Google Search, และ พ.ร.บ.คอมฯ พร้อมไฟล์ PDF
            </p>
          </div>

          {/* Card 2: Games */}
          <div
            onClick={() => onNavigate('games')}
            className="group relative bg-white p-5 rounded-3xl border-2 border-amber-100 hover:border-amber-400 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden transform hover:-translate-y-1"
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 to-orange-500 flex items-center justify-center text-white mb-4 shadow-md group-hover:scale-110 transition-transform">
              <Gamepad2 className="w-6 h-6" />
            </div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full">
                สนุก & ตรรกะ
              </span>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-amber-600 group-hover:translate-x-1 transition" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 group-hover:text-amber-600 transition">
              เกมคลายเครียด
            </h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              เกม Scratch, Code.org, Interland, Y8, CrazyGames และเกมเรียงโค้ดในเว็บ
            </p>
          </div>

          {/* Card 3: Student Gallery */}
          <div
            onClick={() => onNavigate('gallery')}
            className="group relative bg-white p-5 rounded-3xl border-2 border-indigo-100 hover:border-indigo-400 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden transform hover:-translate-y-1"
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white mb-4 shadow-md group-hover:scale-110 transition-transform">
              <Palette className="w-6 h-6" />
            </div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full">
                ฝีมือเพื่อน ป.6
              </span>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition">
              โชว์ผลงานนักเรียน
            </h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              ชมอินโฟกราฟิกและเกม Scratch ฝีมือเพื่อนห้องอื่น
            </p>
          </div>

          {/* Card 4: Contact */}
          <div
            onClick={() => onNavigate('contact')}
            className="group relative bg-white p-5 rounded-3xl border-2 border-emerald-100 hover:border-emerald-400 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden transform hover:-translate-y-1"
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-white mb-4 shadow-md group-hover:scale-110 transition-transform">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-600 transition">
                ติดต่ออาจารย์
              </h3>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition" />
            </div>
          </div>
        </div>
      </section>

      {/* Announcements Board (ประกาศข่าวสาร) */}
      <section className="bg-white rounded-3xl border-2 border-slate-100 shadow-sm p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-2.5 w-2.5 rounded-full bg-blue-500"></span>
              <h2 className="text-2xl font-extrabold text-slate-900">
                ประกาศข่าวสาร
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              ติดตามการบ้าน นัดหมายการสอบ และกิจกรรมพิเศษประจำรายวิชา
            </p>
          </div>

          {/* Filter Pills - only show when announcements exist */}
          {ANNOUNCEMENTS.length > 0 && (
            <div className="flex flex-wrap gap-1.5 bg-slate-50 p-1.5 rounded-2xl border border-slate-200">
              {[
                { id: 'all', label: 'ทั้งหมด' },
                { id: 'การบ้าน', label: 'การบ้าน 📝' },
                { id: 'วันสอบ', label: 'วันสอบ ⏰' },
                { id: 'กิจกรรม', label: 'กิจกรรม 🏆' }
              ].map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setActiveAnnouncementFilter(filter.id)}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                    activeAnnouncementFilter === filter.id
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Announcement Cards List */}
        {filteredAnnouncements.length === 0 ? (
          <div className="py-10 px-6 sm:px-10 bg-gradient-to-b from-sky-50/60 via-white to-slate-50/70 rounded-3xl border-2 border-dashed border-sky-200 text-center space-y-3.5 shadow-2xs">
            <div className="w-16 h-16 mx-auto rounded-3xl bg-sky-100 text-sky-600 flex items-center justify-center text-3xl shadow-sm border border-sky-200">
              📬
            </div>
            <div className="space-y-1">
              <h3 className="text-base sm:text-lg font-black text-slate-800">
                ยังไม่มีประกาศข่าวสารใหม่ในขณะนี้
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto leading-relaxed">
                อาจารย์ยังไม่มีประกาศเพิ่มเติมสำหรับช่วงเวลานี้ครับ ขอให้นักเรียนทุกคนตั้งใจเรียนรู้และมีความสุขกับการเรียน หากมีกำหนดการส่งงาน การสอบ หรือกิจกรรมพิเศษ อาจารย์จะนำมาอัปเดตแจ้งให้ทราบที่นี่ครับ
              </p>
            </div>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-sky-100/80 text-sky-800 rounded-full text-xs font-bold border border-sky-200/60">
                ✨ นักเรียนสามารถติดตามภารกิจประจำสัปดาห์ได้จากป้ายด้านบนครับ
              </span>
              <button
                onClick={() => onNavigate('lessons')}
                className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-xs font-bold rounded-full shadow-xs transition flex items-center gap-1.5"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>ดูบทเรียนสัปดาห์นี้</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredAnnouncements.map((ann) => (
              <div
                key={ann.id}
                onClick={() => setSelectedAnnouncement(ann)}
                className={`group relative p-5 rounded-2xl border-2 transition-all cursor-pointer hover:shadow-md flex flex-col justify-between ${
                  ann.isImportant
                    ? 'bg-gradient-to-br from-amber-50/60 to-orange-50/40 border-amber-300 hover:border-amber-500'
                    : 'bg-white border-slate-200 hover:border-blue-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-xs ${ann.categoryColor}`}>
                      {ann.category}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] text-slate-400 font-medium">
                      <Calendar className="w-3.5 h-3.5" />
                      {ann.date}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-blue-600 transition line-clamp-2">
                    {ann.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                    {ann.summary}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  {ann.dueDate ? (
                    <span className="text-rose-600 font-bold flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> กำหนด: {ann.dueDate}
                    </span>
                  ) : (
                    <span className="text-slate-400">คลิกเพื่ออ่านรายละเอียด</span>
                  )}
                  <span className="text-blue-600 font-bold group-hover:underline flex items-center gap-1">
                    อ่านต่อ <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Daily Computing Tip & Riddle (เกร็ดความรู้ลับประจำวัน) */}
      <section className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 rounded-3xl p-6 sm:p-8 text-amber-950 shadow-md">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white text-3xl flex items-center justify-center shadow-md">
              {tips[currentTipIndex].emoji}
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider font-black text-amber-900">
                เกร็ดความรู้วิทยาการคำนวณประจำวัน
              </span>
              <h3 className="text-lg sm:text-xl font-black text-amber-950">
                {tips[currentTipIndex].title}
              </h3>
            </div>
          </div>

          <button
            onClick={() => setCurrentTipIndex((prev) => (prev + 1) % tips.length)}
            className="px-4 py-2 bg-white/90 hover:bg-white text-amber-950 font-bold text-xs rounded-xl shadow-sm transition active:scale-95 flex items-center gap-1.5 self-end sm:self-auto"
          >
            <Sparkles className="w-4 h-4 text-orange-600" />
            <span>อ่านเกร็ดเรื่องถัดไป ({currentTipIndex + 1}/{tips.length})</span>
          </button>
        </div>

        <p className="text-sm sm:text-base text-amber-950/90 leading-relaxed bg-white/40 p-4 rounded-2xl backdrop-blur-xs border border-white/50">
          {tips[currentTipIndex].content}
        </p>
      </section>



      {/* Announcement Detail Modal */}
      {selectedAnnouncement && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border-4 border-sky-200 space-y-4">
            <div className="flex items-center justify-between gap-2">
              <span className={`text-xs font-bold px-3 py-1 rounded-full ${selectedAnnouncement.categoryColor}`}>
                {selectedAnnouncement.category}
              </span>
              <span className="text-xs text-slate-400 font-medium">
                {selectedAnnouncement.date}
              </span>
            </div>

            <h3 className="text-xl font-bold text-slate-900">
              {selectedAnnouncement.title}
            </h3>

            {selectedAnnouncement.dueDate && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 font-bold flex items-center gap-2">
                <Clock className="w-4 h-4 text-rose-600" />
                <span>กำหนดส่ง: {selectedAnnouncement.dueDate}</span>
              </div>
            )}

            <div className="text-sm text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-200 whitespace-pre-line">
              {selectedAnnouncement.content}
            </div>

            <div className="flex items-center justify-between pt-3 gap-3">
              <button
                onClick={() => setSelectedAnnouncement(null)}
                className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-600 hover:bg-slate-100 font-bold text-sm transition"
              >
                ปิดหน้าต่าง
              </button>

              {selectedAnnouncement.actionTab && (
                <button
                  onClick={() => {
                    const tab = selectedAnnouncement.actionTab;
                    setSelectedAnnouncement(null);
                    if (tab) onNavigate(tab);
                  }}
                  className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md transition flex items-center gap-1.5"
                >
                  <span>{selectedAnnouncement.actionText || 'ไปยังหน้านั้น'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
