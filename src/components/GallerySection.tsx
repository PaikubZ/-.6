import React, { useState, useEffect, useCallback, useRef } from 'react';
import { StudentWork, AwardRank, ShowcaseProject } from '../types';
import { STUDENT_WORKS, SHOWCASE_PROJECTS } from '../data/mockData';
import {
  Palette,
  Heart,
  Eye,
  X,
  Sparkles,
  Trophy,
  Search,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Leaf,
  Filter,
  CheckCircle2,
  Maximize2,
  ArrowLeft,
  ArrowRight,
  FolderOpen,
  Star
} from 'lucide-react';
import confetti from 'canvas-confetti';

const EMOJI_OPTIONS = [
  { emoji: '❤️', label: 'ชอบมาก', defaultCount: 18 },
  { emoji: '👏', label: 'ปรบมือ', defaultCount: 15 },
  { emoji: '🌟', label: 'ยอดเยี่ยม', defaultCount: 22 },
  { emoji: '🔥', label: 'สุดยอด', defaultCount: 14 },
  { emoji: '💡', label: 'ไอเดียเจ๋ง', defaultCount: 12 },
  { emoji: '🎉', label: 'ยินดีด้วย', defaultCount: 25 },
];

export const getAwardTitle = (rank: AwardRank | string): string => {
  if (rank === 'winner') return 'รางวัลชนะเลิศอันดับ 1';
  if (rank === 'runner1') return 'รางวัลรองชนะเลิศอันดับ 1';
  return 'รางวัลรองชนะเลิศอันดับ 2';
};

export const getAwardBadge = (rank: AwardRank | string): string => {
  if (rank === 'winner') return '🥇 รางวัลชนะเลิศอันดับ 1';
  if (rank === 'runner1') return '🥈 รางวัลรองชนะเลิศอันดับ 1';
  return '🥉 รางวัลรองชนะเลิศอันดับ 2';
};

export const getStudentAvatar = (name: string): string => {
  return name.startsWith('เด็กหญิง')
    ? '/assets/aistudio/2_ad589254.png'
    : '/assets/aistudio/1_016fadcb.png';
};

const BuntingFlagsSvg: React.FC = () => (
  <svg
    viewBox="0 0 1200 64"
    fill="none"
    preserveAspectRatio="none"
    className="w-full h-10 sm:h-12 pointer-events-none select-none"
    aria-hidden="true"
  >
    <path d="M0,4 Q300,32 600,10 Q900,32 1200,4" stroke="#1e293b" strokeWidth="3" fill="none" />
    {[
      { x: 35, y: 9, color: '#F43F5E', rot: 6 },
      { x: 95, y: 15, color: '#FBBF24', rot: 4 },
      { x: 155, y: 19, color: '#34D399', rot: 2 },
      { x: 215, y: 21, color: '#60A5FA', rot: 0 },
      { x: 275, y: 22, color: '#A78BFA', rot: -2 },
      { x: 335, y: 20, color: '#FB923C', rot: -4 },
      { x: 395, y: 17, color: '#F43F5E', rot: -4 },
      { x: 455, y: 14, color: '#FBBF24', rot: -2 },
      { x: 515, y: 12, color: '#34D399', rot: 0 },
      { x: 645, y: 12, color: '#60A5FA', rot: 2 },
      { x: 705, y: 16, color: '#A78BFA', rot: 4 },
      { x: 765, y: 20, color: '#FB923C', rot: 2 },
      { x: 825, y: 22, color: '#F43F5E', rot: 0 },
      { x: 885, y: 21, color: '#FBBF24', rot: -2 },
      { x: 945, y: 19, color: '#34D399', rot: -3 },
      { x: 1005, y: 15, color: '#60A5FA', rot: -4 },
      { x: 1065, y: 11, color: '#A78BFA', rot: -5 },
      { x: 1125, y: 7, color: '#FB923C', rot: -6 }
    ].map((flag, idx) => (
      <polygon
        key={idx}
        points={`${flag.x},${flag.y} ${flag.x + 38},${flag.y + 2} ${flag.x + 17},${flag.y + 34}`}
        fill={flag.color}
        stroke="#1e293b"
        strokeWidth="2.5"
        strokeLinejoin="round"
        transform={`rotate(${flag.rot}, ${flag.x + 18}, ${flag.y})`}
      />
    ))}
  </svg>
);

const BotanicalGardenCornerSvg: React.FC<{ flip?: boolean }> = ({ flip = false }) => (
  <svg
    viewBox="0 0 180 140"
    fill="none"
    className={`w-28 h-24 sm:w-36 sm:h-28 pointer-events-none select-none ${flip ? '-scale-x-100' : ''}`}
    aria-hidden="true"
  >
    {/* Tropical leaves */}
    <path d="M18,136 C8,96 24,56 64,46 C54,84 44,116 18,136 Z" fill="#10B981" stroke="#064E3B" strokeWidth="2.5" />
    <path d="M44,138 C52,92 86,62 126,68 C100,98 76,120 44,138 Z" fill="#34D399" stroke="#064E3B" strokeWidth="2.5" />
    <path d="M8,138 C2,110 8,82 28,68 C28,94 24,116 8,138 Z" fill="#059669" stroke="#064E3B" strokeWidth="2.5" />
    {/* Flower 1 */}
    <g transform="translate(52, 72)">
      <circle cx="0" cy="-12" r="8" fill="#FB7185" stroke="#1e293b" strokeWidth="2" />
      <circle cx="11" cy="-3" r="8" fill="#FB7185" stroke="#1e293b" strokeWidth="2" />
      <circle cx="7" cy="10" r="8" fill="#FB7185" stroke="#1e293b" strokeWidth="2" />
      <circle cx="-7" cy="10" r="8" fill="#FB7185" stroke="#1e293b" strokeWidth="2" />
      <circle cx="-11" cy="-3" r="8" fill="#FB7185" stroke="#1e293b" strokeWidth="2" />
      <circle cx="0" cy="0" r="6" fill="#FBBF24" stroke="#1e293b" strokeWidth="2" />
    </g>
    {/* Flower 2 */}
    <g transform="translate(106, 98)">
      <circle cx="0" cy="-9" r="6" fill="#FDE047" stroke="#1e293b" strokeWidth="2" />
      <circle cx="9" cy="-2" r="6" fill="#FDE047" stroke="#1e293b" strokeWidth="2" />
      <circle cx="5" cy="8" r="6" fill="#FDE047" stroke="#1e293b" strokeWidth="2" />
      <circle cx="-5" cy="8" r="6" fill="#FDE047" stroke="#1e293b" strokeWidth="2" />
      <circle cx="-9" cy="-2" r="6" fill="#FDE047" stroke="#1e293b" strokeWidth="2" />
      <circle cx="0" cy="0" r="4.5" fill="#F97316" stroke="#1e293b" strokeWidth="2" />
    </g>
  </svg>
);

export const GallerySection: React.FC = () => {
  const [works, setWorks] = useState<StudentWork[]>(STUDENT_WORKS);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [activeClassFilter, setActiveClassFilter] = useState<string>('ป.6/1');
  const [activeRankFilter, setActiveRankFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [driveToast, setDriveToast] = useState<boolean>(false);
  
  // Lightbox Modal state
  const [modalIndex, setModalIndex] = useState<number | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [emojiReactions, setEmojiReactions] = useState<{
    [workId: string]: { [emoji: string]: number };
  }>({});
  const [recentEmojiKey, setRecentEmojiKey] = useState<string | null>(null);

  const imageContainerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  const selectedProject: ShowcaseProject | null =
    SHOWCASE_PROJECTS.find((p) => p.id === selectedProjectId) ?? null;

  const projectWorks = selectedProjectId
    ? works.filter((w) => (w.projectId || 'botanical-garden-2569') === selectedProjectId)
    : [];

  const handleSelectProject = (projectId: string) => {
    setSelectedProjectId(projectId);
    setActiveClassFilter('ป.6/1');
    setActiveRankFilter('all');
    setSearchQuery('');
    setModalIndex(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToProjects = () => {
    setSelectedProjectId(null);
    setActiveClassFilter('ป.6/1');
    setActiveRankFilter('all');
    setSearchQuery('');
    setModalIndex(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenDriveCollection = () => {
    setActiveClassFilter('all');
    setActiveRankFilter('all');
    setSearchQuery('');
    setDriveToast(true);
    setTimeout(() => {
      stageRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
    setTimeout(() => setDriveToast(false), 4500);
  };

  const handleEmojiClick = (workId: string, emoji: string) => {
    confetti({
      particleCount: 28,
      spread: 60,
      origin: { y: 0.65 },
      colors: ['#F59E0B', '#10B981', '#6366F1', '#EC4899', '#3B82F6']
    });

    setRecentEmojiKey(`${workId}-${emoji}`);
    setTimeout(() => setRecentEmojiKey(null), 500);

    setEmojiReactions((prev) => {
      const workData = prev[workId] || {};
      const defaultOption = EMOJI_OPTIONS.find((o) => o.emoji === emoji);
      const currentCount =
        workData[emoji] !== undefined ? workData[emoji] : (defaultOption?.defaultCount ?? 10);
      return {
        ...prev,
        [workId]: {
          ...workData,
          [emoji]: currentCount + 1
        }
      };
    });
  };

  // Filtered works list within the selected project
  const filteredWorks = projectWorks.filter((w) => {
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
    { id: 'all', label: 'ทุกห้อง', count: projectWorks.length },
    { id: 'ป.6/1', label: 'ป.6/1', count: projectWorks.filter((w) => w.studentClass === 'ป.6/1').length },
    { id: 'ป.6/2', label: 'ป.6/2', count: projectWorks.filter((w) => w.studentClass === 'ป.6/2').length },
    { id: 'ป.6/3', label: 'ป.6/3', count: projectWorks.filter((w) => w.studentClass === 'ป.6/3').length },
    { id: 'ป.6/4', label: 'ป.6/4', count: projectWorks.filter((w) => w.studentClass === 'ป.6/4').length },
    { id: 'ป.6/5', label: 'ป.6/5', count: projectWorks.filter((w) => w.studentClass === 'ป.6/5').length },
    { id: 'ป.6/6', label: 'ป.6/6', count: projectWorks.filter((w) => w.studentClass === 'ป.6/6').length },
    { id: 'ป.6/7', label: 'ป.6/7', count: projectWorks.filter((w) => w.studentClass === 'ป.6/7').length }
  ];

  const winnerCount = projectWorks.filter((w) => w.awardRank === 'winner').length;
  const runner1Count = projectWorks.filter((w) => w.awardRank === 'runner1').length;
  const runner2Count = projectWorks.filter((w) => w.awardRank === 'runner2').length;

  const rankFilterList = [
    { id: 'all', label: 'ทุกอันดับ' },
    { id: 'winner', label: '🥇 ชนะเลิศ' },
    { id: 'runner1', label: '🥈 รองชนะเลิศอันดับ 1' },
    { id: 'runner2', label: '🥉 รองชนะเลิศอันดับ 2' }
  ];

  const showPodiumView =
    activeClassFilter !== 'all' && activeRankFilter === 'all' && !searchQuery.trim();

  const podiumWinner = filteredWorks.find((w) => w.awardRank === 'winner');
  const podiumRunner1 = filteredWorks.find((w) => w.awardRank === 'runner1');
  const podiumRunner2 = filteredWorks.find((w) => w.awardRank === 'runner2');

  if (!selectedProject) {
    return (
      <div className="space-y-8 pb-20">
        {/* Project Selection Header Banner */}
        <div className="relative overflow-hidden bg-gradient-to-br from-indigo-950 via-purple-900 to-indigo-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl border border-indigo-700/50">
          <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-purple-500/10 blur-3xl pointer-events-none" />
          <div className="absolute right-1/3 -bottom-20 w-72 h-72 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
                <FolderOpen className="w-4 h-4 shrink-0" />
                <span>คลังโชว์ผลงานนักเรียน</span>
                <span aria-hidden="true">·</span>
                <span className="text-purple-200">ชั้นประถมศึกษาปีที่ 6</span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
                เลือกงานที่ต้องการเข้าชมผลงาน
              </h1>
              <p className="text-sm sm:text-base text-purple-200 font-medium max-w-2xl leading-relaxed">
                รวบรวมผลงานสร้างสรรค์และรางวัลยอดเยี่ยมของนักเรียน ชั้น ป.6 ในแต่ละกิจกรรมและรายวิชา สามารถเลือกหัวข้องานด้านล่างเพื่อเข้าชมรายละเอียดและส่งกำลังใจให้เพื่อนๆ ได้เลยครับ
              </p>
            </div>

            <div className="hidden lg:flex items-end gap-2 shrink-0 self-end -mb-6 sm:-mb-10 mr-2 select-none pointer-events-none">
              <div className="relative">
                <img
                  src="/assets/aistudio/24_feafe487.png"
                  alt="การ์ตูนนักเรียนทำคอมพิวเตอร์"
                  className="w-36 h-36 xl:w-40 xl:h-40 object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.4)]"
                />
              </div>
              <div className="relative -ml-6">
                <img
                  src="/assets/aistudio/20_bf556e21.png"
                  alt="การ์ตูนนักเรียนสวัสดี"
                  className="w-36 h-36 xl:w-40 xl:h-40 object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.4)]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Project Cards Grid */}
        <section className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                รายการงานและกิจกรรมทั้งหมด
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                คลิกเลือกงานที่ต้องการเพื่อเข้าไปชมผลงานแยกตามห้องเรียนและอันดับรางวัล
              </p>
            </div>
            <span className="text-xs font-medium text-slate-500 tabular-nums">
              เปิดให้เข้าชม {SHOWCASE_PROJECTS.length} งาน
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
            {SHOWCASE_PROJECTS.map((project) => {
              const countInProject = works.filter(
                (w) => (w.projectId || 'botanical-garden-2569') === project.id
              ).length;

              return (
                <div
                  key={project.id}
                  onClick={() => handleSelectProject(project.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleSelectProject(project.id);
                    }
                  }}
                  className="group bg-white rounded-3xl border border-slate-200 hover:border-indigo-400 shadow-sm hover:shadow-xl transition-all duration-200 overflow-hidden flex flex-col justify-between cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  <div>
                    {/* Preview Strip Collage */}
                    <div className="relative h-52 sm:h-56 bg-slate-900 overflow-hidden">
                      <div className="grid grid-cols-3 gap-1 h-full w-full p-1 bg-slate-950">
                        {project.previewImages.slice(0, 3).map((imgUrl, idx) => (
                          <div
                            key={idx}
                            className="relative h-full w-full overflow-hidden rounded-xl bg-slate-800"
                          >
                            <img
                              src={imgUrl}
                              alt={`${project.title} ตัวอย่างที่ ${idx + 1}`}
                              referrerPolicy="no-referrer"
                              loading="lazy"
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        ))}
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent pointer-events-none" />
                      <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white">
                        <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                          <Trophy className="w-4 h-4 shrink-0" />
                          <span>{countInProject} ผลงานรางวัล · ป.6/1 - ป.6/7</span>
                        </span>
                      </div>
                    </div>

                    {/* Card Details */}
                    <div className="p-6 space-y-2.5">
                      <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 font-medium">
                        <span>{project.termLabel}</span>
                        <span aria-hidden="true">·</span>
                        <span>{project.academicYear}</span>
                        <span aria-hidden="true">·</span>
                        <span>{project.categoryLabel}</span>
                      </div>

                      <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 group-hover:text-indigo-700 transition-colors">
                        {project.title}
                      </h3>

                      <p className="text-sm font-bold text-emerald-700">
                        หัวข้อ: "{project.subtitle}"
                      </p>

                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {project.description}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectProject(project.id);
                      }}
                      className="w-full py-3 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-2xl text-sm font-bold flex items-center justify-center gap-2 shadow-sm transition active:scale-98 cursor-pointer"
                    >
                      <span>เข้าชมผลงาน ({countInProject} รางวัล)</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              );
            })}

            {/* Future Projects Placeholder Information Card */}
            <div className="bg-slate-50/80 rounded-3xl border-2 border-dashed border-slate-300 p-6 sm:p-8 flex flex-col justify-between gap-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                  <span>ภาคปลาย</span>
                  <span aria-hidden="true">·</span>
                  <span>ปีการศึกษา 2569</span>
                  <span aria-hidden="true">·</span>
                  <span>รออัปเดตผลงาน</span>
                </div>

                <h3 className="text-xl font-extrabold text-slate-800">
                  ผลงานกิจกรรมถัดไป (เร็วๆ นี้)
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-md">
                  เมื่อนักเรียนส่งผลงานชิ้นใหม่ในภาคปลาย หรือมีกิจกรรมประกวดเพิ่มเติม เช่น ผังงาน Flowchart และโครงงานโปรแกรม Scratch ระบบจะเพิ่มหัวข้องานใหม่ให้เลือกเข้าชมในหน้านี้ครับ
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-200/80">
                <span className="text-xs font-bold text-slate-500">
                  เตรียมพบกับผลงานใหม่ๆ จากเพื่อนทั้ง 7 ห้อง
                </span>
                <img
                  src="/assets/aistudio/2_ad589254.png"
                  alt="การ์ตูนนักเรียน"
                  className="w-16 h-16 object-contain opacity-90 shrink-0"
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-20">
      {/* Back to Project Selection Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white rounded-2xl px-4 py-3 border-2 border-slate-800 shadow-[0_3px_0_#1e293b]">
        <button
          type="button"
          onClick={handleBackToProjects}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-sky-100 hover:bg-amber-300 text-slate-900 border-2 border-slate-800 border-b-4 active:translate-y-0.5 font-extrabold text-xs sm:text-sm transition cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>กลับไปเลือกงานอื่น</span>
        </button>

        <div className="flex items-center gap-2 text-xs text-slate-600 font-bold">
          <span>โชว์ผลงานนักเรียน</span>
          <span aria-hidden="true">/</span>
          <span className="text-blue-700 font-extrabold">{selectedProject.title}</span>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 1. GAMIFIED SKY HERO BANNER (ท้องฟ้าสดใส & งานเฉลิมฉลอง) */}
      {/* ========================================================= */}
      <section className="relative overflow-hidden rounded-3xl border-2 border-slate-800 bg-gradient-to-b from-sky-400 via-sky-300 to-cyan-100 shadow-[0_6px_0_#1e293b]">
        {/* Top Bunting Flags */}
        <div className="absolute top-0 left-0 right-0 z-10">
          <BuntingFlagsSvg />
        </div>

        {/* Soft Cartoon Clouds */}
        <div className="absolute top-12 left-8 w-24 h-8 bg-white/75 rounded-full blur-[1px] pointer-events-none" />
        <div className="absolute top-16 left-20 w-16 h-8 bg-white/80 rounded-full pointer-events-none" />
        <div className="absolute top-14 right-1/3 w-28 h-9 bg-white/70 rounded-full pointer-events-none" />

        {/* Decorative Confetti / Sparkle Shapes */}
        <div className="absolute top-16 left-1/4 w-3 h-3 rounded-full bg-rose-400 border border-slate-800 rotate-12 pointer-events-none hidden sm:block" />
        <div className="absolute top-28 left-12 w-3.5 h-3.5 bg-amber-300 border border-slate-800 rotate-45 pointer-events-none hidden sm:block" />
        <div className="absolute top-20 right-1/4 w-3 h-3 rounded-full bg-emerald-400 border border-slate-800 pointer-events-none hidden sm:block" />

        {/* Bottom-Left Decorative Botanical & Tech Accent */}
        <div className="hidden lg:block absolute bottom-0 left-2 z-10 pointer-events-none">
          <BotanicalGardenCornerSvg />
        </div>

        {/* Bottom-Right Decorative Botanical Accent */}
        <div className="hidden lg:block absolute bottom-0 right-2 z-10 pointer-events-none">
          <BotanicalGardenCornerSvg flip />
        </div>

        {/* Main Hero Content */}
        <div className="relative z-20 pt-14 pb-8 px-5 sm:px-10 lg:px-14 flex flex-col lg:flex-row items-center justify-between gap-6">
          {/* Center/Left Text + Stats + Primary CTA */}
          <div className="flex-1 text-center lg:text-left space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/90 border-2 border-slate-800 px-3.5 py-1 rounded-full text-xs font-black text-emerald-700 shadow-[0_2px_0_#1e293b]">
              <Leaf className="w-3.5 h-3.5 text-emerald-600" />
              <span>{selectedProject.title} · {selectedProject.academicYear}</span>
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-slate-900 leading-tight drop-shadow-[0_2px_0_rgba(255,255,255,0.9)]">
                ประกาศรางวัล &amp; โชว์ผลงานนักเรียน ชั้น ป.6
              </h1>
              <p className="text-xs sm:text-base text-slate-800 font-bold max-w-3xl leading-relaxed">
                การประกวดสื่ออินโฟกราฟิก: พันธุ์ไม้งานสวนพฤกษศาสตร์โรงเรียน:{' '}
                <span className="text-blue-900 underline decoration-amber-400 decoration-2 underline-offset-4">
                  {selectedProject.subtitle}
                </span>{' '}
                ด้วย Canva
              </p>
            </div>

            {/* 4-Column White Translucent Stats Card */}
            <div className="bg-white/90 backdrop-blur-sm border-2 border-slate-800 rounded-2xl shadow-[0_4px_0_#1e293b] p-3 sm:p-3.5 grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-0 sm:divide-x-2 sm:divide-slate-200 max-w-2xl mx-auto lg:mx-0">
              <div className="px-2 text-center">
                <div className="text-[11px] font-bold text-slate-500">ผลงานทั้งหมด</div>
                <div className="text-base sm:text-lg font-black text-orange-600 tabular-nums">
                  {projectWorks.length} รางวัล
                </div>
              </div>
              <div className="px-2 text-center">
                <div className="text-[11px] font-bold text-slate-500">🥇 ชนะเลิศ</div>
                <div className="text-base sm:text-lg font-black text-amber-600 tabular-nums">
                  {winnerCount} รางวัล
                </div>
              </div>
              <div className="px-2 text-center">
                <div className="text-[11px] font-bold text-slate-500">🥈 รองฯ 1</div>
                <div className="text-base sm:text-lg font-black text-slate-700 tabular-nums">
                  {runner1Count} รางวัล
                </div>
              </div>
              <div className="px-2 text-center">
                <div className="text-[11px] font-bold text-slate-500">🥉 รองฯ 2</div>
                <div className="text-base sm:text-lg font-black text-amber-800 tabular-nums">
                  {runner2Count} รางวัล
                </div>
              </div>
            </div>

            {/* Gold Capsule Game Button */}
            <div className="pt-1 flex flex-wrap items-center justify-center lg:justify-start gap-3">
              <button
                type="button"
                onClick={handleOpenDriveCollection}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-b from-amber-300 via-amber-400 to-orange-400 hover:from-amber-200 hover:to-amber-400 text-slate-900 font-black text-xs sm:text-sm border-2 border-slate-800 shadow-[0_4px_0_#1e293b] active:translate-y-1 active:shadow-[0_1px_0_#1e293b] transition-all cursor-pointer"
              >
                <FolderOpen className="w-4 h-4 text-slate-900 shrink-0" />
                <span>ดูโฟลเดอร์ผลงานรวมใน Google Drive ➔</span>
              </button>
            </div>
          </div>

          {/* Right Cartoon Student Mascot & Computer */}
          <div className="flex items-end justify-center gap-1 shrink-0 select-none pointer-events-none lg:pr-12">
            <img
              src="/assets/aistudio/24_feafe487.png"
              alt="การ์ตูนนักเรียนกับคอมพิวเตอร์"
              className="w-32 h-32 sm:w-40 sm:h-40 xl:w-44 xl:h-44 object-contain drop-shadow-[0_8px_0_rgba(30,41,59,0.25)]"
            />
            <img
              src="/assets/aistudio/20_bf556e21.png"
              alt="การ์ตูนนักเรียนทักทาย"
              className="w-28 h-28 sm:w-36 sm:h-36 xl:w-40 xl:h-40 -ml-8 object-contain drop-shadow-[0_8px_0_rgba(30,41,59,0.25)]"
            />
          </div>
        </div>
      </section>

      {/* Optional Toast when clicking Google Drive Collection button */}
      {driveToast && (
        <div className="bg-amber-100 border-2 border-slate-800 rounded-2xl px-4 py-3 flex items-center justify-between gap-3 text-slate-900 shadow-[0_3px_0_#1e293b]">
          <div className="flex items-center gap-2 text-xs sm:text-sm font-bold">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>เปิดคลังผลงานรวมทั้ง {projectWorks.length} ชิ้น (ทุกห้อง ป.6/1 - ป.6/7) ให้ชมครบด้านล่างแล้วครับ คลิกดูภาพเต็มจอได้ทุกใบเลย!</span>
          </div>
          <button
            type="button"
            onClick={() => setDriveToast(false)}
            className="text-slate-700 hover:text-slate-950 p-1 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* ========================================================= */}
      {/* 2 & 3. GAMIFIED FILTER BAR + STARRY BLUE 3D PODIUM STAGE  */}
      {/* ========================================================= */}
      <section
        ref={stageRef}
        className="relative overflow-hidden rounded-3xl border-2 border-slate-800 bg-gradient-to-b from-blue-800 via-blue-600 to-sky-600 shadow-[0_6px_0_#1e293b] p-4 sm:p-7 space-y-6"
      >
        {/* Subtle Starry Pattern Overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-25"
          style={{
            backgroundImage:
              'radial-gradient(circle at 12% 18%, #ffffff 2px, transparent 2.5px), radial-gradient(circle at 28% 72%, #fde047 2px, transparent 2.5px), radial-gradient(circle at 46% 24%, #ffffff 1.5px, transparent 2px), radial-gradient(circle at 68% 15%, #fde047 2.5px, transparent 3px), radial-gradient(circle at 82% 40%, #ffffff 2px, transparent 2.5px), radial-gradient(circle at 90% 78%, #fde047 2px, transparent 2.5px), radial-gradient(circle at 18% 48%, #ffffff 1.5px, transparent 2px)',
            backgroundSize: '360px 260px'
          }}
        />

        {/* Gamified Filter Toolbar */}
        <div className="relative z-10 bg-blue-950/35 backdrop-blur-sm border-2 border-white/20 rounded-2xl p-3.5 sm:p-4 space-y-3">
          <div className="flex flex-col xl:flex-row items-stretch xl:items-center justify-between gap-3">
            {/* Room Selector Game Buttons */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1.5 xl:pb-0 scrollbar-none">
              {classList.map((cls) => {
                const isActive = activeClassFilter === cls.id;
                return (
                  <button
                    key={cls.id}
                    type="button"
                    onClick={() => setActiveClassFilter(cls.id)}
                    className={`px-3.5 py-2 rounded-xl font-black text-xs sm:text-sm whitespace-nowrap shrink-0 border-2 border-b-4 active:translate-y-1 transition-all flex items-center gap-1.5 cursor-pointer ${
                      isActive
                        ? 'bg-orange-500 text-white border-slate-900 shadow-[0_2px_0_#1e293b]'
                        : 'bg-sky-100 hover:bg-white text-slate-800 border-slate-800'
                    }`}
                  >
                    {cls.id !== 'all' && isActive && <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-200" />}
                    <span>{cls.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Search Input */}
            <div className="relative w-full xl:w-72 shrink-0">
              <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="🔍 ค้นหาชื่อนักเรียน..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-xs sm:text-sm font-bold text-slate-900 placeholder:text-slate-400 pl-10 pr-8 py-2 bg-white border-2 border-slate-800 rounded-full shadow-[0_3px_0_#1e293b] focus:outline-hidden focus:ring-2 focus:ring-amber-300 transition"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-900 p-0.5 cursor-pointer"
                  aria-label="ล้างคำค้นหา"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Award Rank Filter Row + View Mode Indicator */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pt-2 border-t border-white/15">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
              <span className="text-xs font-extrabold text-sky-100 whitespace-nowrap mr-1">
                อันดับรางวัล:
              </span>
              {rankFilterList.map((rf) => {
                const isActive = activeRankFilter === rf.id;
                return (
                  <button
                    key={rf.id}
                    type="button"
                    onClick={() => setActiveRankFilter(rf.id)}
                    className={`px-3 py-1.5 rounded-full font-black text-xs whitespace-nowrap shrink-0 border-2 transition cursor-pointer ${
                      isActive
                        ? 'bg-amber-300 text-slate-900 border-slate-900 shadow-[0_2px_0_#1e293b]'
                        : 'bg-white/90 hover:bg-white text-slate-800 border-slate-800'
                    }`}
                  >
                    {rf.label}
                  </button>
                );
              })}
            </div>

            <div className="text-xs font-bold text-sky-100 tabular-nums shrink-0">
              แสดง <span className="text-amber-300 font-black">{filteredWorks.length}</span> จาก {projectWorks.length} ผลงาน
            </div>
          </div>
        </div>

        {/* Empty State */}
        {filteredWorks.length === 0 ? (
          <div className="relative z-10 bg-white/95 rounded-3xl p-10 text-center border-2 border-slate-800 shadow-[0_4px_0_#1e293b] space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-sky-100 text-blue-600 flex items-center justify-center mx-auto text-2xl border-2 border-slate-800">
              🔍
            </div>
            <p className="text-slate-900 font-black text-base">ไม่พบผลงานตามเงื่อนไขที่เลือก</p>
            <button
              type="button"
              onClick={() => {
                setActiveClassFilter('ป.6/1');
                setActiveRankFilter('all');
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-xl bg-amber-300 hover:bg-amber-400 text-slate-900 font-black text-xs border-2 border-slate-800 shadow-[0_3px_0_#1e293b] cursor-pointer"
            >
              กลับไปดูแท่นรางวัล ป.6/1
            </button>
          </div>
        ) : showPodiumView ? (
          /* ========================================================= */
          /* 3. 3D PODIUM VIEW (แสดงเมื่อเลือกดูรายห้อง ป.6/1 - ป.6/7)  */
          /* ========================================================= */
          <div className="relative z-10 pt-2 pb-4">
            {/* Room Spotlight Header */}
            <div className="text-center mb-6 sm:mb-8">
              <div className="inline-flex items-center gap-2 bg-white/95 text-slate-900 border-2 border-slate-800 shadow-[0_3px_0_#1e293b] px-4 py-1.5 rounded-full text-xs sm:text-sm font-black">
                <Trophy className="w-4 h-4 text-amber-500" />
                <span>แท่นรับรางวัลผู้ชนะ ห้อง {activeClassFilter}</span>
              </div>
            </div>

            {/* 3D Podium Grid: Mobile (1st -> 2nd -> 3rd), Desktop (2nd Left -> 1st Center Highest -> 3rd Right) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 lg:gap-6 items-end max-w-6xl mx-auto px-1 sm:px-3">
              {/* ---------- 2ND PLACE (LEFT ON DESKTOP) ---------- */}
              {podiumRunner1 && (
                <div className="order-2 md:order-1 flex flex-col items-center">
                  {/* Card */}
                  <div className="w-full relative bg-white rounded-3xl border-4 border-slate-300 ring-2 ring-slate-900 shadow-2xl p-3 sm:p-3.5 transition-transform duration-200 hover:-translate-y-1">
                    {/* Floating Silver Medal & Header */}
                    <div className="flex items-center justify-center gap-1.5 mb-2.5">
                      <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-slate-200 via-white to-slate-300 text-slate-800 border-2 border-slate-800 px-3 py-1 rounded-full text-xs font-black shadow-sm">
                        <span>🥈</span>
                        <span>รองชนะเลิศอันดับ 1</span>
                      </span>
                    </div>

                    {/* Infographic Image */}
                    <div
                      onClick={() => openModal(podiumRunner1)}
                      className="relative aspect-4/3 w-full rounded-2xl overflow-hidden bg-slate-900 border-2 border-slate-300 cursor-pointer group"
                    >
                      <img
                        src={podiumRunner1.imageSrc}
                        alt={podiumRunner1.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          openModal(podiumRunner1);
                        }}
                        className="absolute bottom-2 right-2 bg-slate-900/85 hover:bg-indigo-600 text-white text-[11px] font-black px-2.5 py-1 rounded-full border border-white/40 shadow-md flex items-center gap-1 cursor-pointer transition"
                      >
                        <span>🔍 ซูมดูรูป</span>
                      </button>
                    </div>

                    {/* Student Name Footer */}
                    <div className="pt-3 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <div className="w-8 h-8 rounded-xl bg-slate-100 border border-slate-300 overflow-hidden shrink-0">
                          <img
                            src={getStudentAvatar(podiumRunner1.studentName)}
                            alt={podiumRunner1.studentName}
                            className="w-full h-full object-cover object-top"
                          />
                        </div>
                        <div className="min-w-0">
                          <div className="font-black text-slate-900 text-xs sm:text-sm truncate">
                            {podiumRunner1.studentName}
                          </div>
                          <div className="text-[11px] font-bold text-slate-500">
                            ห้อง {podiumRunner1.studentClass}
                          </div>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => handleLike(podiumRunner1.id, e)}
                        className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-black border transition cursor-pointer shrink-0 ${
                          podiumRunner1.hasLiked
                            ? 'bg-rose-500 text-white border-rose-700'
                            : 'bg-slate-100 text-slate-700 border-slate-300 hover:bg-rose-50 hover:text-rose-600'
                        }`}
                        title="กดหัวใจส่งกำลังใจ"
                      >
                        <Heart className={`w-3.5 h-3.5 ${podiumRunner1.hasLiked ? 'fill-current' : ''}`} />
                        <span className="tabular-nums">{podiumRunner1.likes}</span>
                      </button>
                    </div>
                  </div>

                  {/* 3D Silver Cylindrical Pedestal */}
                  <div className="w-[88%] relative -mt-2 pt-3 select-none pointer-events-none">
                    <div className="relative h-24 sm:h-28 bg-gradient-to-r from-slate-400 via-slate-100 to-slate-400 border-x-2 border-b-2 border-slate-900 rounded-b-[28px] shadow-[0_8px_18px_rgba(15,23,42,0.45)] flex items-center justify-center">
                      {/* Top 3D Cylinder Rim */}
                      <div className="absolute -top-3.5 left-0 right-0 h-7 rounded-[100%] bg-gradient-to-b from-white via-slate-200 to-slate-300 border-2 border-slate-900" />
                      <span className="relative z-10 mt-2 text-4xl sm:text-5xl font-black text-white drop-shadow-[0_3px_0_#1e293b] [-webkit-text-stroke:2px_#1e293b]">
                        2
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* ---------- 1ST PLACE (CENTER ON DESKTOP - HIGHEST) ---------- */}
              {podiumWinner && (
                <div className="order-1 md:order-2 flex flex-col items-center">
                  {/* Floating Crown / Trophy above Winner Card */}
                  <div className="flex items-center justify-center gap-1.5 -mb-3 z-20 select-none pointer-events-none">
                    <Sparkles className="w-5 h-5 text-amber-300 animate-pulse" />
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-b from-yellow-300 to-amber-500 border-2 border-slate-900 shadow-lg flex items-center justify-center">
                      <Trophy className="w-7 h-7 text-amber-950" />
                    </div>
                    <Sparkles className="w-5 h-5 text-amber-300 animate-pulse" />
                  </div>

                  {/* Winner Card */}
                  <div className="w-full relative bg-white rounded-3xl border-4 border-amber-400 ring-2 ring-slate-900 shadow-[0_14px_30px_rgba(15,23,42,0.45)] p-3.5 sm:p-4 pt-5 transition-transform duration-200 hover:-translate-y-1">
                    {/* Floating Gold Seal */}
                    <div className="flex items-center justify-center gap-1.5 mb-2.5">
                      <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-300 via-yellow-300 to-amber-400 text-amber-950 border-2 border-slate-900 px-4 py-1 rounded-full text-xs sm:text-sm font-black shadow-sm">
                        <span>🥇</span>
                        <span>ชนะเลิศ</span>
                      </span>
                    </div>

                    {/* Infographic Image */}
                    <div
                      onClick={() => openModal(podiumWinner)}
                      className="relative aspect-4/3 w-full rounded-2xl overflow-hidden bg-slate-900 border-2 border-amber-400 cursor-pointer group"
                    >
                      <img
                        src={podiumWinner.imageSrc}
                        alt={podiumWinner.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          openModal(podiumWinner);
                        }}
                        className="absolute bottom-2 right-2 bg-slate-900/85 hover:bg-indigo-600 text-white text-[11px] font-black px-2.5 py-1 rounded-full border border-white/40 shadow-md flex items-center gap-1 cursor-pointer transition"
                      >
                        <span>🔍 ซูมดูรูป</span>
                      </button>
                    </div>

                    {/* Student Name Footer */}
                    <div className="pt-3 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <div className="w-9 h-9 rounded-xl bg-amber-50 border-2 border-amber-300 overflow-hidden shrink-0">
                          <img
                            src={getStudentAvatar(podiumWinner.studentName)}
                            alt={podiumWinner.studentName}
                            className="w-full h-full object-cover object-top"
                          />
                        </div>
                        <div className="min-w-0">
                          <div className="font-black text-slate-900 text-sm sm:text-base truncate">
                            {podiumWinner.studentName}
                          </div>
                          <div className="text-[11px] font-bold text-amber-700">
                            ห้อง {podiumWinner.studentClass}
                          </div>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => handleLike(podiumWinner.id, e)}
                        className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-black border transition cursor-pointer shrink-0 ${
                          podiumWinner.hasLiked
                            ? 'bg-rose-500 text-white border-rose-700'
                            : 'bg-amber-50 text-amber-800 border-amber-300 hover:bg-rose-50 hover:text-rose-600'
                        }`}
                        title="กดหัวใจส่งกำลังใจ"
                      >
                        <Heart className={`w-3.5 h-3.5 ${podiumWinner.hasLiked ? 'fill-current' : ''}`} />
                        <span className="tabular-nums">{podiumWinner.likes}</span>
                      </button>
                    </div>
                  </div>

                  {/* Tall 3D Gold Cylindrical Pedestal */}
                  <div className="w-[92%] relative -mt-2 pt-3 select-none pointer-events-none">
                    <div className="relative h-32 sm:h-40 bg-gradient-to-r from-amber-500 via-yellow-300 to-amber-500 border-x-2 border-b-2 border-slate-900 rounded-b-[30px] shadow-[0_10px_22px_rgba(15,23,42,0.5)] flex items-center justify-center">
                      {/* Top 3D Cylinder Rim */}
                      <div className="absolute -top-4 left-0 right-0 h-8 rounded-[100%] bg-gradient-to-b from-yellow-200 via-amber-300 to-amber-400 border-2 border-slate-900" />
                      <span className="relative z-10 mt-2 text-5xl sm:text-6xl font-black text-amber-50 drop-shadow-[0_4px_0_#1e293b] [-webkit-text-stroke:2.5px_#1e293b]">
                        1
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* ---------- 3RD PLACE (RIGHT ON DESKTOP) ---------- */}
              {podiumRunner2 && (
                <div className="order-3 md:order-3 flex flex-col items-center">
                  {/* Card */}
                  <div className="w-full relative bg-white rounded-3xl border-4 border-amber-600 ring-2 ring-slate-900 shadow-2xl p-3 sm:p-3.5 transition-transform duration-200 hover:-translate-y-1">
                    {/* Floating Bronze Medal & Header */}
                    <div className="flex items-center justify-center gap-1.5 mb-2.5">
                      <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-orange-200 via-amber-100 to-orange-300 text-amber-950 border-2 border-slate-800 px-3 py-1 rounded-full text-xs font-black shadow-sm">
                        <span>🥉</span>
                        <span>รองชนะเลิศอันดับ 2</span>
                      </span>
                    </div>

                    {/* Infographic Image */}
                    <div
                      onClick={() => openModal(podiumRunner2)}
                      className="relative aspect-4/3 w-full rounded-2xl overflow-hidden bg-slate-900 border-2 border-amber-500/60 cursor-pointer group"
                    >
                      <img
                        src={podiumRunner2.imageSrc}
                        alt={podiumRunner2.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          openModal(podiumRunner2);
                        }}
                        className="absolute bottom-2 right-2 bg-slate-900/85 hover:bg-indigo-600 text-white text-[11px] font-black px-2.5 py-1 rounded-full border border-white/40 shadow-md flex items-center gap-1 cursor-pointer transition"
                      >
                        <span>🔍 ซูมดูรูป</span>
                      </button>
                    </div>

                    {/* Student Name Footer */}
                    <div className="pt-3 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <div className="w-8 h-8 rounded-xl bg-orange-50 border border-amber-400/60 overflow-hidden shrink-0">
                          <img
                            src={getStudentAvatar(podiumRunner2.studentName)}
                            alt={podiumRunner2.studentName}
                            className="w-full h-full object-cover object-top"
                          />
                        </div>
                        <div className="min-w-0">
                          <div className="font-black text-slate-900 text-xs sm:text-sm truncate">
                            {podiumRunner2.studentName}
                          </div>
                          <div className="text-[11px] font-bold text-slate-500">
                            ห้อง {podiumRunner2.studentClass}
                          </div>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => handleLike(podiumRunner2.id, e)}
                        className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-black border transition cursor-pointer shrink-0 ${
                          podiumRunner2.hasLiked
                            ? 'bg-rose-500 text-white border-rose-700'
                            : 'bg-orange-50 text-amber-900 border-amber-300 hover:bg-rose-50 hover:text-rose-600'
                        }`}
                        title="กดหัวใจส่งกำลังใจ"
                      >
                        <Heart className={`w-3.5 h-3.5 ${podiumRunner2.hasLiked ? 'fill-current' : ''}`} />
                        <span className="tabular-nums">{podiumRunner2.likes}</span>
                      </button>
                    </div>
                  </div>

                  {/* 3D Bronze/Copper Cylindrical Pedestal */}
                  <div className="w-[86%] relative -mt-2 pt-3 select-none pointer-events-none">
                    <div className="relative h-18 sm:h-20 bg-gradient-to-r from-amber-800 via-orange-400 to-amber-800 border-x-2 border-b-2 border-slate-900 rounded-b-[26px] shadow-[0_8px_18px_rgba(15,23,42,0.45)] flex items-center justify-center">
                      {/* Top 3D Cylinder Rim */}
                      <div className="absolute -top-3.5 left-0 right-0 h-7 rounded-[100%] bg-gradient-to-b from-orange-200 via-orange-400 to-amber-600 border-2 border-slate-900" />
                      <span className="relative z-10 mt-2 text-3xl sm:text-4xl font-black text-amber-50 drop-shadow-[0_3px_0_#1e293b] [-webkit-text-stroke:2px_#1e293b]">
                        3
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Stage Decoration & CTA */}
            <div className="relative z-10 pt-4 flex items-center justify-between">
              <div className="hidden sm:block pointer-events-none">
                <BotanicalGardenCornerSvg />
              </div>
              <div className="mx-auto">
                <button
                  type="button"
                  onClick={handleOpenDriveCollection}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-b from-amber-300 to-amber-400 hover:from-amber-200 hover:to-amber-400 text-slate-900 font-black text-xs sm:text-sm border-2 border-slate-900 shadow-[0_4px_0_#1e293b] active:translate-y-1 active:shadow-[0_1px_0_#1e293b] transition-all cursor-pointer"
                >
                  <span>ดูโฟลเดอร์ผลงานรวมทุกห้อง ({projectWorks.length} คน) ➔</span>
                </button>
              </div>
              <div className="hidden sm:block pointer-events-none">
                <BotanicalGardenCornerSvg flip />
              </div>
            </div>
          </div>
        ) : (
          /* ========================================================= */
          /* 3-COLUMN GAMIFIED GRID (ทุกห้อง / ค้นหา / กรองอันดับ)     */
          /* ========================================================= */
          <div className="relative z-10 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="inline-flex items-center gap-2 bg-white/95 text-slate-900 border-2 border-slate-800 shadow-[0_3px_0_#1e293b] px-4 py-1.5 rounded-full text-xs font-black">
                <Palette className="w-4 h-4 text-blue-600" />
                <span>
                  {activeClassFilter === 'all'
                    ? `ผลงานรวมทุกห้อง (${filteredWorks.length} คน)`
                    : `ผลการค้นหา (${filteredWorks.length} คน)`}
                </span>
              </div>

              {activeClassFilter === 'all' && !searchQuery.trim() && activeRankFilter === 'all' && (
                <button
                  type="button"
                  onClick={() => setActiveClassFilter('ป.6/1')}
                  className="inline-flex items-center gap-1.5 bg-amber-300 hover:bg-amber-400 text-slate-900 border-2 border-slate-900 shadow-[0_2px_0_#1e293b] px-3.5 py-1.5 rounded-full text-xs font-black cursor-pointer transition"
                >
                  <Trophy className="w-3.5 h-3.5" />
                  <span>ดูแบบแท่นรับรางวัล 3D Podium</span>
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredWorks.map((work) => {
                const rankStyle = getRankStyle(work.awardRank);
                const cardBorderStyle =
                  work.awardRank === 'winner'
                    ? 'border-4 border-amber-400 ring-2 ring-slate-900'
                    : work.awardRank === 'runner1'
                    ? 'border-4 border-slate-300 ring-2 ring-slate-900'
                    : 'border-4 border-amber-600 ring-2 ring-slate-900';

                return (
                  <div
                    key={work.id}
                    className={`group bg-white rounded-3xl ${cardBorderStyle} shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-200 overflow-hidden flex flex-col justify-between p-3.5`}
                  >
                    <div className="space-y-3">
                      {/* Card Header: Medal Badge & Class */}
                      <div className="flex items-center justify-between gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-black border border-slate-800 ${rankStyle.badgeBg}`}>
                          {getAwardBadge(work.awardRank)}
                        </span>
                        <span className="text-xs font-black text-slate-800 bg-sky-100 border border-slate-800 px-2.5 py-0.5 rounded-full">
                          {work.studentClass}
                        </span>
                      </div>

                      {/* Infographic Image Box */}
                      <div
                        onClick={() => openModal(work)}
                        className="relative aspect-4/3 w-full rounded-2xl overflow-hidden bg-slate-900 border-2 border-slate-200 cursor-pointer"
                      >
                        <img
                          src={work.imageSrc}
                          alt={work.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            openModal(work);
                          }}
                          className="absolute bottom-2.5 right-2.5 bg-slate-900/85 hover:bg-indigo-600 text-white text-[11px] font-black px-3 py-1 rounded-full border border-white/40 shadow-md flex items-center gap-1 cursor-pointer transition"
                        >
                          <span>🔍 ซูมดูรูป</span>
                        </button>
                      </div>
                    </div>

                    {/* Student Name + Avatar + Like */}
                    <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-9 h-9 rounded-xl bg-sky-50 border border-slate-300 overflow-hidden shrink-0">
                          <img
                            src={getStudentAvatar(work.studentName)}
                            alt={work.studentName}
                            className="w-full h-full object-cover object-top"
                          />
                        </div>
                        <div className="min-w-0">
                          <h4 className="font-black text-slate-900 text-xs sm:text-sm truncate">
                            {work.studentName}
                          </h4>
                          <div className="text-[11px] text-slate-500 font-bold">
                            ห้อง {work.studentClass}
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => handleLike(work.id, e)}
                        className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-black border transition active:scale-90 cursor-pointer shrink-0 ${
                          work.hasLiked
                            ? 'bg-rose-500 text-white border-rose-700 shadow-xs'
                            : 'bg-slate-100 text-slate-700 border-slate-300 hover:bg-rose-50 hover:text-rose-600'
                        }`}
                        title="กดหัวใจส่งกำลังใจให้เพื่อน"
                      >
                        <Heart className={`w-3.5 h-3.5 ${work.hasLiked ? 'fill-current' : ''}`} />
                        <span className="tabular-nums">{work.likes}</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </section>

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
              {/* Left: Medal, Cartoon Avatar, Student Name & Nav Indicator */}
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="text-xl sm:text-2xl">{currentModalWork.awardBadge.split(' ')[0]}</span>
                <div className="w-8 h-8 rounded-lg overflow-hidden bg-white/10 shrink-0 border border-amber-400/40 hidden sm:block">
                  <img
                    src={getStudentAvatar(currentModalWork.studentName)}
                    alt={currentModalWork.studentName}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs bg-amber-400 text-amber-950 font-black px-2 py-0.5 rounded-md">
                      {getAwardBadge(currentModalWork.awardRank)}
                    </span>
                    <span className="text-xs font-bold text-slate-300">
                      ห้อง {currentModalWork.studentClass}
                    </span>
                    <span className="text-xs text-indigo-400 font-bold">
                      (คนที่ {modalIndex + 1} จาก {filteredWorks.length})
                    </span>
                  </div>
                  <h3 className="text-xs sm:text-sm font-bold text-white truncate max-w-xs sm:max-w-md">
                    {currentModalWork.studentName}
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
                    referrerPolicy="no-referrer"
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
                {/* Sidebar Header */}
                <div className="px-5 py-3.5 border-b border-white/10 bg-slate-950/40 shrink-0 flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-400">รายละเอียดผลงาน</span>
                  <span className="text-[10px] text-slate-400">งานสวนพฤกษศาสตร์</span>
                </div>

                {/* Sidebar Content */}
                <div className="p-4 sm:p-5 flex-1 overflow-y-auto space-y-4 text-xs">
                  {/* Award Badge Box */}
                  <div className="bg-gradient-to-r from-amber-500/20 via-yellow-500/15 to-transparent border border-amber-400/40 rounded-2xl p-3.5 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-amber-300 font-black text-sm flex items-center gap-1.5">
                        <Trophy className="w-4 h-4 text-amber-400" />
                        <span>{getAwardTitle(currentModalWork.awardRank)}</span>
                      </span>
                    </div>
                    <div className="text-white font-bold text-sm flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg overflow-hidden bg-slate-950/60 border border-amber-400/30 shrink-0 shadow-xs">
                        <img
                          src={getStudentAvatar(currentModalWork.studentName)}
                          alt={currentModalWork.studentName}
                          className="w-full h-full object-cover object-top"
                        />
                      </div>
                      <span className="truncate">{currentModalWork.studentName}</span>
                    </div>
                    <div className="text-slate-300 text-[11px] font-medium">
                      ห้อง {currentModalWork.studentClass}
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
                    <p className="text-amber-300 font-bold text-xs flex items-center gap-1.5 pt-0.5">
                      <Trophy className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>{getAwardTitle(currentModalWork.awardRank)}</span>
                    </p>
                  </div>

                  {/* Interactive Emoji Reaction System */}
                  <div className="space-y-2.5 bg-white/5 p-3.5 rounded-2xl border border-white/10">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-black text-amber-300 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                        <span>กด Emoji ชื่นชมผลงาน:</span>
                      </span>
                      <span className="text-[10px] text-slate-400">แตะเพื่อส่งกำลังใจ</span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 pt-0.5">
                      {EMOJI_OPTIONS.map((item) => {
                        const count =
                          emojiReactions[currentModalWork.id]?.[item.emoji] ?? item.defaultCount;
                        const isClicked = recentEmojiKey === `${currentModalWork.id}-${item.emoji}`;

                        return (
                          <button
                            key={item.emoji}
                            type="button"
                            onClick={() => handleEmojiClick(currentModalWork.id, item.emoji)}
                            className={`flex items-center justify-center gap-1.5 py-2 px-2 bg-slate-950/70 hover:bg-indigo-950/90 active:scale-90 border rounded-xl transition duration-150 cursor-pointer group ${
                              isClicked
                                ? 'border-amber-400 bg-amber-400/25 scale-105'
                                : 'border-white/10 hover:border-amber-400/40'
                            }`}
                            title={`กดส่ง ${item.label}`}
                          >
                            <span className="text-base group-hover:scale-125 transition-transform duration-200">
                              {item.emoji}
                            </span>
                            <span className="text-xs font-bold text-slate-200 group-hover:text-amber-300">
                              {count}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Cute cartoon mascot tip */}
                    <div className="flex items-center gap-2 pt-2 border-t border-white/10 mt-1">
                      <div className="w-7 h-7 rounded-full overflow-hidden bg-white/10 shrink-0 border border-amber-400/40 p-0.5">
                        <img
                          src="/assets/aistudio/1_016fadcb.png"
                          alt="การ์ตูนนักเรียนส่งกำลังใจ"
                          className="w-full h-full object-cover object-top"
                        />
                      </div>
                      <span className="text-[10px] text-amber-200/90 font-medium">
                        คลิก Emoji ส่งกำลังใจให้เพื่อนๆ ป.6 กันนะ! ✨
                      </span>
                    </div>
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
                        title={`${item.studentName} (${getAwardTitle(item.awardRank)})`}
                      >
                        <img
                          src={item.imageSrc}
                          alt={item.studentName}
                          referrerPolicy="no-referrer"
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
