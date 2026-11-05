import React, { useState, useEffect, useCallback, useRef } from 'react';
import { StudentWork, AwardRank } from '../types';
import { STUDENT_WORKS } from '../data/mockData';
import {
  Palette,
  Heart,
  Eye,
  X,
  Sparkles,
  Trophy,
  Search,
  MessageCircle,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Leaf,
  Filter,
  CheckCircle2,
  Maximize2
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const GallerySection: React.FC = () => {
  const [works, setWorks] = useState<StudentWork[]>(STUDENT_WORKS);
  const [activeClassFilter, setActiveClassFilter] = useState<string>('all');
  const [activeRankFilter, setActiveRankFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Lightbox Modal state
  const [modalIndex, setModalIndex] = useState<number | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [activeInfoTab, setActiveInfoTab] = useState<'details' | 'comments'>('details');
  const [cheerMessage, setCheerMessage] = useState<string>('');
  const [cheersList, setCheersList] = useState<{ [workId: string]: { name: string; text: string; time: string }[] }>({
    'work-6-1-winner': [
      { name: 'เพื่อน ป.6/1', text: 'ออกแบบสวยงามมาก ลำดับเนื้อหาอ่านง่ายสุดๆ เลยพุฒิ!', time: '1 วันที่แล้ว' },
      { name: 'คุณครูวัชระ', text: 'ชื่นชมการใช้คู่สีพฤกษศาสตร์ และการจัดองค์ประกอบภาพครับ', time: '2 วันที่แล้ว' }
    ],
    'work-6-2-winner': [
      { name: 'เพื่อนห้อง 2', text: 'วาดภาพประกอบและอินโฟกราฟิกถั่วลิสงได้ละเอียดน่าทานมากจ้า', time: '1 วันที่แล้ว' }
    ],
    'work-6-3-winner': [
      { name: 'กลุ่มรักพฤกษา', text: 'ข้อมูลเมล็ดถั่วพูครบถ้วนมาก นำไปทำรายงานต่อได้เลย!', time: '2 วันที่แล้ว' }
    ]
  });

  const imageContainerRef = useRef<HTMLDivElement>(null);

  // Filtered works list
  const filteredWorks = works.filter((w) => {
    if (activeClassFilter !== 'all' && w.studentClass !== activeClassFilter) return false;
    if (activeRankFilter !== 'all' && w.awardRank !== activeRankFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchName = w.studentName.toLowerCase().includes(q);
      const matchNickname = w.studentNickname?.toLowerCase().includes(q) ?? false;
      const matchTitle = w.title.toLowerCase().includes(q);
      const matchTopic = w.botanicalTopic?.toLowerCase().includes(q) ?? false;
      const matchClass = w.studentClass.toLowerCase().includes(q);
      if (!matchName && !matchNickname && !matchTitle && !matchTopic && !matchClass) {
        return false;
      }
    }
    return true;
  });

  // Current selected work in modal
  const currentModalWork: StudentWork | null =
    modalIndex !== null && filteredWorks[modalIndex] ? filteredWorks[modalIndex] : null;

  // Like action handler with confetti
  const handleLike = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setWorks((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newLiked = !item.hasLiked;
          if (newLiked) {
            confetti({
              particleCount: 50,
              spread: 60,
              origin: { y: 0.75 },
              colors: ['#F43F5E', '#FB7185', '#FDA4AF', '#F59E0B', '#10B981']
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
  };

  // Add classmate cheer comment
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

  // Open modal at given index
  const openModal = (work: StudentWork) => {
    const idx = filteredWorks.findIndex((w) => w.id === work.id);
    if (idx !== -1) {
      setModalIndex(idx);
      setZoomLevel(1);
    }
  };

  const closeModal = () => {
    setModalIndex(null);
    setZoomLevel(1);
  };

  // Lightbox navigation
  const handlePrev = useCallback(() => {
    if (modalIndex === null || filteredWorks.length <= 1) return;
    setModalIndex((prev) => (prev === null ? null : (prev - 1 + filteredWorks.length) % filteredWorks.length));
    setZoomLevel(1);
  }, [modalIndex, filteredWorks.length]);

  const handleNext = useCallback(() => {
    if (modalIndex === null || filteredWorks.length <= 1) return;
    setModalIndex((prev) => (prev === null ? null : (prev + 1) % filteredWorks.length));
    setZoomLevel(1);
  }, [modalIndex, filteredWorks.length]);

  // Zoom handlers
  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.25, 2.5));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.25, 1));
  };

  const handleResetZoom = () => {
    setZoomLevel(1);
  };

  // Keyboard navigation for Lightbox modal
  useEffect(() => {
    if (modalIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === '+' || e.key === '=') {
        handleZoomIn();
      } else if (e.key === '-') {
        handleZoomOut();
      } else if (e.key === '0') {
        handleResetZoom();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [modalIndex, handlePrev, handleNext]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (modalIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [modalIndex]);

  // Helper for Rank Badges styling
  const getRankStyle = (rank: AwardRank) => {
    switch (rank) {
      case 'winner':
        return {
          cardBorder: 'border-amber-300 ring-2 ring-amber-400/40 shadow-amber-100 hover:border-amber-400',
          badgeBg: 'bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 text-amber-950 font-black shadow-sm',
          ribbonBg: 'bg-amber-500 text-amber-950',
          tagBg: 'bg-amber-50 text-amber-900 border-amber-200'
        };
      case 'runner1':
        return {
          cardBorder: 'border-slate-300 ring-1 ring-slate-300/60 shadow-slate-100 hover:border-slate-400',
          badgeBg: 'bg-gradient-to-r from-slate-300 via-slate-200 to-slate-400 text-slate-800 font-black shadow-sm',
          ribbonBg: 'bg-slate-400 text-white',
          tagBg: 'bg-slate-100 text-slate-800 border-slate-200'
        };
      case 'runner2':
        return {
          cardBorder: 'border-amber-700/30 ring-1 ring-amber-700/20 shadow-amber-50 hover:border-amber-700/50',
          badgeBg: 'bg-gradient-to-r from-amber-700 via-amber-600 to-amber-800 text-white font-black shadow-sm',
          ribbonBg: 'bg-amber-700 text-white',
          tagBg: 'bg-amber-50 text-amber-900 border-amber-200'
        };
      default:
        return {
          cardBorder: 'border-slate-200 hover:border-indigo-400',
          badgeBg: 'bg-indigo-600 text-white',
          ribbonBg: 'bg-indigo-600 text-white',
          tagBg: 'bg-slate-100 text-slate-700 border-slate-200'
        };
    }
  };

  const classList = [
    { id: 'all', label: 'ดูผลงานรวมทุกห้อง', count: works.length },
    { id: 'ป.6/1', label: 'ป.6/1', count: works.filter((w) => w.studentClass === 'ป.6/1').length },
    { id: 'ป.6/2', label: 'ป.6/2', count: works.filter((w) => w.studentClass === 'ป.6/2').length },
    { id: 'ป.6/3', label: 'ป.6/3', count: works.filter((w) => w.studentClass === 'ป.6/3').length },
    { id: 'ป.6/4', label: 'ป.6/4', count: works.filter((w) => w.studentClass === 'ป.6/4').length },
    { id: 'ป.6/5', label: 'ป.6/5', count: works.filter((w) => w.studentClass === 'ป.6/5').length },
    { id: 'ป.6/6', label: 'ป.6/6', count: works.filter((w) => w.studentClass === 'ป.6/6').length },
    { id: 'ป.6/7', label: 'ป.6/7', count: works.filter((w) => w.studentClass === 'ป.6/7').length }
  ];

  const rankFilterList = [
    { id: 'all', label: 'ทุกอันดับรางวัล', icon: Trophy },
    { id: 'winner', label: '🥇 ชนะเลิศ (7 รางวัล)', icon: Trophy },
    { id: 'runner1', label: '🥈 รองอันดับ 1 (7 รางวัล)', icon: Trophy },
    { id: 'runner2', label: '🥉 รองอันดับ 2 (7 รางวัล)', icon: Trophy }
  ];

  return (
    <div className="space-y-8 pb-20">
      {/* Official Competition Header Banner */}
      <div className="relative overflow-hidden bg-gradient-to-br from-indigo-950 via-purple-900 to-indigo-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl border border-indigo-700/50">
        {/* Background Decorative Circles */}
        <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-purple-500/10 blur-3xl pointer-events-none" />
        <div className="absolute right-1/3 -bottom-20 w-72 h-72 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 bg-amber-400 text-amber-950 px-3 py-1 rounded-full text-xs font-black shadow-sm">
              <Trophy className="w-3.5 h-3.5" />
              <span>ประกาศรางวัลผลงานยอดเยี่ยม</span>
            </span>
            <span className="inline-flex items-center gap-1.5 bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-3 py-1 rounded-full text-xs font-bold">
              <Leaf className="w-3.5 h-3.5" />
              <span>งานสวนพฤกษศาสตร์โรงเรียน สาธิตเกษตรฯ</span>
            </span>
          </div>

          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
              ประกาศรางวัลและโชว์ผลงานนักเรียน ชั้น ป.6
            </h1>
            <p className="mt-2 text-sm sm:text-base text-purple-200 font-medium max-w-4xl leading-relaxed">
              โครงการประกวดการสร้างสื่ออินโฟกราฟิก หัวข้อ{' '}
              <span className="text-amber-300 font-bold">
                "พันธุ์ไม้งานสวนพฤกษศาสตร์โรงเรียน: เมล็ดพันธุ์แห่งคุณค่า ๗ พฤกษาถั่วนานาพรรณ"
              </span>{' '}
              ด้วยเว็บไซต์ Canva วิชาเทคโนโลยี (วิทยาการคำนวณ) ประจำปีการศึกษา 2569
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="pt-2 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/15">
              <div className="text-xs text-purple-200">ผลงานทั้งหมด</div>
              <div className="text-xl font-black text-amber-300">21 รางวัล</div>
              <div className="text-[11px] text-purple-300">จาก 7 ห้องเรียน (ป.6/1 - ป.6/7)</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/15">
              <div className="text-xs text-purple-200">🥇 ชนะเลิศ</div>
              <div className="text-xl font-black text-yellow-300">7 รางวัล</div>
              <div className="text-[11px] text-purple-300">อันดับ 1 ของแต่ละห้อง</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/15">
              <div className="text-xs text-purple-200">🥈 รองอันดับ 1</div>
              <div className="text-xl font-black text-slate-200">7 รางวัล</div>
              <div className="text-[11px] text-purple-300">ผลงานคะแนนยอดเยี่ยม</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/15">
              <div className="text-xs text-purple-200">🥉 รองอันดับ 2</div>
              <div className="text-xl font-black text-amber-400">7 รางวัล</div>
              <div className="text-[11px] text-purple-300">ผลงานคะแนนดีเด่น</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Toolbar: Class Tabs & Rank Filter & Search */}
      <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-200 space-y-4">
        {/* Class Filter Tabs */}
        <div>
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-xs font-black text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-indigo-600" />
              <span>เลือกห้องเรียนเพื่อดูผลงาน:</span>
            </span>
            <span className="text-xs text-slate-500">
              กำลังแสดง <span className="font-bold text-indigo-600">{filteredWorks.length}</span> จาก 21 ผลงาน
            </span>
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {classList.map((cls) => {
              const isActive = activeClassFilter === cls.id;
              return (
                <button
                  key={cls.id}
                  onClick={() => setActiveClassFilter(cls.id)}
                  className={`px-4 py-2 rounded-2xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200 scale-102'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <span>{cls.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full font-black ${
                      isActive ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    {cls.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Rank Filter & Search Bar */}
        <div className="pt-3 border-t border-slate-100 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Rank pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-xs font-bold text-slate-500 whitespace-nowrap mr-1">อันดับรางวัล:</span>
            {rankFilterList.map((rf) => {
              const isActive = activeRankFilter === rf.id;
              return (
                <button
                  key={rf.id}
                  onClick={() => setActiveRankFilter(rf.id)}
                  className={`px-3 py-1.5 rounded-xl font-bold text-xs whitespace-nowrap transition cursor-pointer ${
                    isActive
                      ? 'bg-amber-400 text-amber-950 shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {rf.label}
                </button>
              );
            })}
          </div>

          {/* Search box */}
          <div className="relative min-w-[240px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="ค้นหาชื่อนักเรียน, หัวข้อพืช หรือห้อง..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-indigo-500 focus:bg-white transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Grid of Student Award Cards (21 Works) */}
      {filteredWorks.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border-2 border-dashed border-slate-300 space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto text-xl">
            🔍
          </div>
          <p className="text-slate-700 font-bold">ไม่พบผลงานตามเงื่อนไขที่เลือก</p>
          <button
            onClick={() => {
              setActiveClassFilter('all');
              setActiveRankFilter('all');
              setSearchQuery('');
            }}
            className="text-xs font-bold text-indigo-600 hover:underline cursor-pointer"
          >
            ล้างตัวกรองทั้งหมด
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWorks.map((work) => {
            const rankStyle = getRankStyle(work.awardRank);

            return (
              <div
                key={work.id}
                className={`group bg-white rounded-3xl border-2 ${rankStyle.cardBorder} shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between`}
              >
                <div>
                  {/* Card Header: Award Title & Class Badge */}
                  <div className="p-4 pb-3 flex items-center justify-between border-b border-slate-100 bg-slate-50/70">
                    <div className="flex items-center gap-2">
                      <span className={`px-2.5 py-1 rounded-xl text-xs font-black ${rankStyle.badgeBg}`}>
                        {work.awardBadge}
                      </span>
                      <span className="text-xs font-bold text-slate-700 bg-white border border-slate-200 px-2 py-0.5 rounded-lg shadow-2xs">
                        {work.studentClass}
                      </span>
                    </div>
                  </div>

                  {/* High-Resolution Infographic Image Box */}
                  <div
                    onClick={() => openModal(work)}
                    className="relative aspect-4/3 w-full overflow-hidden bg-slate-900 cursor-pointer"
                  >
                    <img
                      src={work.imageSrc}
                      alt={work.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20" />

                    {/* Botanical Topic Badge */}
                    {work.botanicalTopic && (
                      <div className="absolute top-3 left-3">
                        <span className="inline-flex items-center gap-1 bg-black/60 backdrop-blur-md text-emerald-300 border border-emerald-400/40 text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                          <Leaf className="w-3 h-3" />
                          <span>{work.botanicalTopic}</span>
                        </span>
                      </div>
                    )}

                    {/* Hover Hint */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-indigo-950/50 backdrop-blur-2xs text-white font-bold text-xs gap-1.5">
                      <div className="bg-white text-indigo-950 px-3 py-1.5 rounded-xl shadow-lg flex items-center gap-1.5 font-black">
                        <Eye className="w-4 h-4 text-indigo-600" />
                        <span>คลิกเพื่อดูรูปภาพเต็มจอ</span>
                      </div>
                    </div>

                    {/* Title on Image */}
                    <div className="absolute bottom-3 inset-x-3 text-white">
                      <h3 className="font-extrabold text-sm sm:text-base leading-snug drop-shadow-md line-clamp-2">
                        {work.title}
                      </h3>
                    </div>
                  </div>

                  {/* High-Contrast In-App Expand Button */}
                  <div className="p-3 bg-indigo-50/70 border-b border-indigo-100">
                    <button
                      onClick={() => openModal(work)}
                      className="w-full py-2.5 px-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition active:scale-98 cursor-pointer"
                    >
                      <Eye className="w-4 h-4" />
                      <span>🔍 คลิกเพื่อขยายดูรูปภาพเต็มจอ</span>
                    </button>
                  </div>

                  {/* Card Body: Student Info, Summary, Highlights */}
                  <div className="p-4 space-y-3">
                    {/* Student Identity */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-800 flex items-center justify-center font-black text-xs">
                          {work.studentClass.replace('ป.', '')}
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900 text-xs sm:text-sm">
                            {work.studentName}
                          </h4>
                          <div className="text-[11px] text-slate-500">
                            ห้อง {work.studentClass} • เลขที่ {work.studentNo || '-'}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Work Summary */}
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {work.summary}
                    </p>

                    {/* Tools badges */}
                    <div className="flex flex-wrap gap-1 pt-1">
                      {work.toolsUsed.map((tool, i) => (
                        <span
                          key={i}
                          className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-medium"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Card Footer: Like & Date */}
                <div className="p-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs bg-slate-50/50">
                  <span className="text-[11px] text-slate-400">{work.date}</span>

                  <button
                    onClick={(e) => handleLike(work.id, e)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold transition active:scale-90 cursor-pointer ${
                      work.hasLiked
                        ? 'bg-rose-500 text-white shadow-xs'
                        : 'bg-white text-slate-600 border border-slate-200 hover:bg-rose-50 hover:text-rose-600'
                    }`}
                    title="กดหัวใจส่งกำลังใจให้เพื่อน"
                  >
                    <Heart className={`w-3.5 h-3.5 ${work.hasLiked ? 'fill-current' : ''}`} />
                    <span>{work.likes}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ========================================================= */}
      {/* INTERNAL FULLSCREEN LIGHTBOX / MODAL VIEWER              */}
      {/* 100% In-App Viewing with Zoom, Pan, Next/Prev Navigation   */}
      {/* ========================================================= */}
      {currentModalWork && modalIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/90 backdrop-blur-md animate-fade-in"
          onClick={closeModal}
        >
          <div
            className="relative w-full max-w-6xl h-[95vh] bg-slate-900 rounded-3xl shadow-2xl border-2 border-indigo-500/40 overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Control Bar */}
            <div className="bg-slate-950/90 border-b border-white/10 px-4 py-3 sm:px-6 flex items-center justify-between text-white shrink-0">
              {/* Left: Medal, Student Name & Nav Indicator */}
              <div className="flex items-center gap-3 min-w-0">
                <span className="text-xl sm:text-2xl">{currentModalWork.awardBadge.split(' ')[0]}</span>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs bg-amber-400 text-amber-950 font-black px-2 py-0.5 rounded-md">
                      {currentModalWork.awardBadge}
                    </span>
                    <span className="text-xs font-bold text-slate-300">
                      ห้อง {currentModalWork.studentClass}
                    </span>
                    <span className="text-xs text-slate-400 hidden sm:inline">
                      • เลขที่ {currentModalWork.studentNo || '-'}
                    </span>
                    <span className="text-xs text-indigo-400 font-bold">
                      (คนที่ {modalIndex + 1} จาก {filteredWorks.length})
                    </span>
                  </div>
                  <h3 className="text-xs sm:text-sm font-bold text-white truncate max-w-xs sm:max-w-md">
                    {currentModalWork.studentName} : {currentModalWork.title}
                  </h3>
                </div>
              </div>

              {/* Center/Right: Zoom Controls, Like & Close */}
              <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                {/* Zoom Controls */}
                <div className="flex items-center bg-white/10 rounded-xl p-1 border border-white/15">
                  <button
                    onClick={handleZoomOut}
                    disabled={zoomLevel <= 1}
                    className="p-1.5 text-white/80 hover:text-white disabled:text-white/30 rounded-lg hover:bg-white/10 transition cursor-pointer"
                    title="ซูมออก (กด -)"
                  >
                    <ZoomOut className="w-4 h-4" />
                  </button>
                  <span className="px-2 text-xs font-mono font-bold text-purple-200 min-w-[44px] text-center">
                    {Math.round(zoomLevel * 100)}%
                  </span>
                  <button
                    onClick={handleZoomIn}
                    disabled={zoomLevel >= 2.5}
                    className="p-1.5 text-white/80 hover:text-white disabled:text-white/30 rounded-lg hover:bg-white/10 transition cursor-pointer"
                    title="ซูมเข้า (กด +)"
                  >
                    <ZoomIn className="w-4 h-4" />
                  </button>
                  {zoomLevel > 1 && (
                    <button
                      onClick={handleResetZoom}
                      className="ml-1 px-2 py-1 bg-white/20 hover:bg-white/30 text-[11px] font-bold rounded-lg transition text-white cursor-pointer"
                      title="รีเซ็ตขนาดภาพ (กด 0)"
                    >
                      รีเซ็ต
                    </button>
                  )}
                </div>

                {/* Like Button */}
                <button
                  onClick={() => handleLike(currentModalWork.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition active:scale-95 cursor-pointer ${
                    currentModalWork.hasLiked
                      ? 'bg-rose-500 text-white shadow-md'
                      : 'bg-white/10 hover:bg-white/20 text-white'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${currentModalWork.hasLiked ? 'fill-current' : ''}`} />
                  <span>{currentModalWork.likes}</span>
                </button>

                {/* Close Button */}
                <button
                  onClick={closeModal}
                  className="p-2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-xl transition cursor-pointer"
                  title="ปิดหน้าต่าง (กด Esc)"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body: Left High-Res Canvas + Right Sidebar Details */}
            <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
              {/* Left / Main Stage: High-Resolution Viewer with Prev/Next buttons */}
              <div
                ref={imageContainerRef}
                className="flex-1 relative bg-black/90 flex items-center justify-center overflow-auto p-4 select-none min-h-[300px]"
              >
                {/* Previous Navigation Button */}
                <button
                  onClick={handlePrev}
                  className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-slate-900/80 hover:bg-indigo-600 text-white flex items-center justify-center backdrop-blur-md border border-white/20 shadow-xl transition-all transform hover:scale-110 active:scale-95 cursor-pointer"
                  title="รูปก่อนหน้า (ลูกศรซ้าย ◀)"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                {/* Next Navigation Button */}
                <button
                  onClick={handleNext}
                  className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-slate-900/80 hover:bg-indigo-600 text-white flex items-center justify-center backdrop-blur-md border border-white/20 shadow-xl transition-all transform hover:scale-110 active:scale-95 cursor-pointer"
                  title="รูปถัดไป (ลูกศรขวา ▶)"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>

                {/* Zoomable Image */}
                <div
                  className="transition-transform duration-200 ease-out max-h-full max-w-full flex items-center justify-center"
                  style={{
                    transform: `scale(${zoomLevel})`,
                    cursor: zoomLevel > 1 ? 'grab' : 'zoom-in'
                  }}
                  onClick={() => {
                    if (zoomLevel === 1) handleZoomIn();
                  }}
                >
                  <img
                    src={currentModalWork.imageSrc}
                    alt={currentModalWork.title}
                    className="max-h-[75vh] w-auto max-w-full object-contain rounded-lg shadow-2xl pointer-events-auto"
                    draggable={false}
                  />
                </div>

                {/* Keyboard Shortcuts Hint Bar */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-md text-white/70 px-3 py-1 rounded-full text-[11px] font-medium hidden sm:flex items-center gap-3 border border-white/10 pointer-events-none">
                  <span>◀ ▶ เปลี่ยนรูป</span>
                  <span>+ - ซูมเข้า/ออก</span>
                  <span>Esc ปิด</span>
                </div>
              </div>

              {/* Right Sidebar: Details, Teacher Feedback & Classmate Cheers */}
              <div className="w-full lg:w-96 bg-slate-900 border-t lg:border-t-0 lg:border-l border-white/10 flex flex-col text-slate-100 overflow-y-auto max-h-[40vh] lg:max-h-full">
                {/* Tabs */}
                <div className="flex border-b border-white/10 bg-slate-950/40 shrink-0">
                  <button
                    onClick={() => setActiveInfoTab('details')}
                    className={`flex-1 py-3 text-xs font-bold transition cursor-pointer ${
                      activeInfoTab === 'details'
                        ? 'text-amber-400 border-b-2 border-amber-400 bg-white/5'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    รายละเอียดผลงาน
                  </button>
                  <button
                    onClick={() => setActiveInfoTab('comments')}
                    className={`flex-1 py-3 text-xs font-bold transition cursor-pointer flex items-center justify-center gap-1.5 ${
                      activeInfoTab === 'comments'
                        ? 'text-amber-400 border-b-2 border-amber-400 bg-white/5'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>ให้กำลังใจ ({(cheersList[currentModalWork.id] || []).length})</span>
                  </button>
                </div>

                {/* Tab Content */}
                <div className="p-4 sm:p-5 flex-1 overflow-y-auto space-y-4 text-xs">
                  {activeInfoTab === 'details' ? (
                    <>
                      {/* Award Badge Box */}
                      <div className="bg-gradient-to-r from-amber-500/20 via-yellow-500/15 to-transparent border border-amber-400/40 rounded-2xl p-3.5 space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-amber-300 font-black text-sm">
                            {currentModalWork.awardBadge}
                          </span>
                        </div>
                        <div className="text-white font-bold text-sm">
                          {currentModalWork.studentName}
                        </div>
                        <div className="text-slate-400 text-[11px]">
                          ห้อง {currentModalWork.studentClass} • เลขที่ {currentModalWork.studentNo || '-'} • โรงเรียนสาธิตแห่ง มก.
                        </div>
                      </div>

                      {/* Topic & Botany Info */}
                      <div className="space-y-1.5 bg-white/5 p-3.5 rounded-2xl border border-white/10">
                        <span className="text-[11px] font-black text-indigo-300 flex items-center gap-1">
                          <Leaf className="w-3.5 h-3.5 text-emerald-400" />
                          <span>หัวข้องานสวนพฤกษศาสตร์:</span>
                        </span>
                        <div className="text-white font-bold">
                          {currentModalWork.botanicalTopic || '๗ พฤกษาถั่วนานาพรรณ'}
                        </div>
                        <p className="text-slate-300 leading-relaxed text-[11px]">
                          {currentModalWork.summary}
                        </p>
                      </div>

                      {/* Highlights */}
                      <div className="space-y-2 bg-white/5 p-3.5 rounded-2xl border border-white/10">
                        <span className="text-[11px] font-black text-slate-300">
                          จุดเด่นของผลงาน:
                        </span>
                        <ul className="space-y-1.5 text-slate-300 text-[11px]">
                          {currentModalWork.highlights.map((h, i) => (
                            <li key={i} className="flex items-start gap-1.5">
                              <span className="text-emerald-400 font-bold shrink-0">✓</span>
                              <span>{h}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Tools Used */}
                      <div className="flex items-center gap-2 pt-1">
                        <span className="text-slate-400 text-[11px]">เครื่องมือ:</span>
                        {currentModalWork.toolsUsed.map((tool, i) => (
                          <span
                            key={i}
                            className="text-[10px] bg-indigo-900/60 text-indigo-300 border border-indigo-700/50 px-2 py-0.5 rounded-md font-bold"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </>
                  ) : (
                    /* Classmate Cheers Tab */
                    <div className="space-y-3">
                      {/* Input */}
                      <div className="space-y-2">
                        <textarea
                          rows={2}
                          placeholder="พิมพ์ข้อความชมเพื่อน เช่น เก่งมากเลยเพื่อน..."
                          value={cheerMessage}
                          onChange={(e) => setCheerMessage(e.target.value)}
                          className="w-full text-xs p-2.5 bg-slate-950 border border-white/15 rounded-xl focus:outline-hidden focus:border-indigo-400 text-white placeholder-slate-500"
                        />
                        <button
                          onClick={() => handleAddCheer(currentModalWork.id)}
                          className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl transition shadow-xs cursor-pointer"
                        >
                          ส่งข้อความให้กำลังใจเพื่อน 💬
                        </button>
                      </div>

                      {/* Cheers list */}
                      <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                        {(cheersList[currentModalWork.id] || []).length === 0 ? (
                          <p className="text-xs text-slate-500 text-center py-6">
                            ยังไม่มีข้อความ เป็นคนแรกที่ให้กำลังใจเพื่อนนะ!
                          </p>
                        ) : (
                          (cheersList[currentModalWork.id] || []).map((ch, idx) => (
                            <div
                              key={idx}
                              className="bg-white/5 p-2.5 rounded-xl border border-white/10 text-xs space-y-0.5"
                            >
                              <div className="flex justify-between text-[10px] font-bold text-slate-400">
                                <span className="text-indigo-300">{ch.name}</span>
                                <span>{ch.time}</span>
                              </div>
                              <p className="text-slate-200">{ch.text}</p>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Bottom Quick Switch Thumbnail Strip */}
                <div className="p-3 bg-slate-950/80 border-t border-white/10 shrink-0">
                  <div className="text-[10px] text-slate-400 font-bold mb-1.5 flex justify-between items-center">
                    <span>เพื่อนๆ ในหมวดนี้ ({filteredWorks.length})</span>
                    <span className="text-indigo-400">คลิกเพื่อสลับภาพ</span>
                  </div>
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                    {filteredWorks.map((item, idx) => (
                      <button
                        key={item.id}
                        onClick={() => {
                          setModalIndex(idx);
                          setZoomLevel(1);
                        }}
                        className={`relative w-10 h-10 rounded-lg overflow-hidden shrink-0 border-2 transition cursor-pointer ${
                          idx === modalIndex
                            ? 'border-amber-400 scale-105 shadow-md shadow-amber-500/30'
                            : 'border-transparent opacity-50 hover:opacity-100'
                        }`}
                        title={`${item.studentName} (${item.awardBadge})`}
                      >
                        <img
                          src={item.imageSrc}
                          alt={item.studentName}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
