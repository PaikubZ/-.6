import React, { useState } from 'react';
import { Lesson } from '../types';
import { LESSONS } from '../data/mockData';
import {
  BookOpen,
  Search,
  FileText,
  Download,
  Clock,
  Sparkles,
  Calendar,
  CheckCircle2,
  Award,
  ExternalLink
} from 'lucide-react';

interface LessonsSectionProps {
  onOpenPdf: (lesson: Lesson) => void;
}

export const LessonsSection: React.FC<LessonsSectionProps> = ({ onOpenPdf }) => {
  const [selectedSemester, setSelectedSemester] = useState<1 | 2>(2);
  const [selectedUnit, setSelectedUnit] = useState<number | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const unitsTerm2 = [
    { number: 'all', title: 'ทั้งหมด (ภาคปลาย)' },
    { number: 1, title: 'หน่วยที่ 1: การแก้ปัญหาอย่างเป็นระบบ & ผังงาน' }
  ];

  const unitsTerm1 = [
    { number: 'all', title: 'ทั้งหมด (ภาคต้น สัปดาห์ 1-8)' },
    { number: 1, title: 'หน่วยที่ 1: การค้นหาข้อมูล & AI Search' },
    { number: 2, title: 'หน่วยที่ 2: วิดีโอ & การเขียน Prompt' },
    { number: 3, title: 'หน่วยที่ 3: อินโฟกราฟิก & NotebookLM' },
    { number: 4, title: 'หน่วยที่ 4: ผู้ประกอบการ & โปสเตอร์ AI' },
    { number: 5, title: 'หน่วยที่ 5: ทบทวน & สอบกลางภาค' }
  ];

  const currentUnits = selectedSemester === 2 ? unitsTerm2 : unitsTerm1;

  const filteredLessons = LESSONS.filter((lesson) => {
    // Semester filter
    if (lesson.semester !== selectedSemester) {
      return false;
    }

    // Unit filter
    if (selectedUnit !== 'all' && lesson.unitNumber !== selectedUnit) {
      return false;
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = lesson.title.toLowerCase().includes(q);
      const matchSub = lesson.subtitle.toLowerCase().includes(q);
      const matchDesc = lesson.description.toLowerCase().includes(q);
      const matchDate = lesson.dateRange.toLowerCase().includes(q);
      const matchTasks = lesson.tasks.some((t) => t.toLowerCase().includes(q));
      const matchPoints = lesson.keyPoints.some((p) => p.toLowerCase().includes(q));
      return matchTitle || matchSub || matchDesc || matchDate || matchTasks || matchPoints;
    }

    return true;
  });

  return (
    <div className="space-y-8 pb-16">
      {/* Section Header */}
      <div className="bg-gradient-to-r from-blue-700 via-sky-600 to-indigo-700 rounded-3xl p-6 sm:p-8 text-white shadow-lg space-y-5">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-amber-200 mb-2">
            <BookOpen className="w-3.5 h-3.5" />
            <span>หลักสูตรรายวิชาเทคโนโลยี (แยกภาคต้น - ภาคปลาย)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            คลังบทเรียนและเนื้อหากิจกรรมประจำสัปดาห์
          </h1>
          <p className="text-sky-100 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
            เลือกดูเนื้อหาตามภาคเรียน ติดตามหัวข้อการเรียนรู้ในแต่ละสัปดาห์ พร้อมเอกสารและใบงานประกอบการเรียน
          </p>
        </div>

        {/* Search Bar */}
        <div className="bg-white p-2.5 rounded-2xl shadow-md text-slate-800">
          <div className="relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="ค้นหาบทเรียน เช่น 'แก้ปัญหา', 'ผังงาน', 'Flowchart', 'Pseudocode', 'Canva'..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 bg-slate-50 focus:bg-white transition"
            />
          </div>
        </div>
      </div>

      {/* Semester Switcher Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-3.5 rounded-3xl border-2 border-slate-200 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider px-2 shrink-0">
            ภาคเรียน:
          </span>
          <div className="inline-flex p-1 bg-slate-100 rounded-2xl border border-slate-200 w-full sm:w-auto">
            <button
              onClick={() => { setSelectedSemester(2); setSelectedUnit('all'); }}
              className={`flex-1 sm:flex-initial px-5 py-2 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-2 ${
                selectedSemester === 2
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-600 hover:text-blue-600'
              }`}
            >
              <span>🌸 ภาคปลาย (ปี 2569)</span>
              <span className="bg-amber-400 text-amber-950 text-[10px] font-bold px-2 py-0.5 rounded-full">
                กำลังเรียน
              </span>
            </button>
            <button
              onClick={() => { setSelectedSemester(1); setSelectedUnit('all'); }}
              className={`flex-1 sm:flex-initial px-5 py-2 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-2 ${
                selectedSemester === 1
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-600 hover:text-blue-600'
              }`}
            >
              <span>🌱 ภาคต้น (คลังย้อนหลัง)</span>
            </button>
          </div>
        </div>

        <div className="text-xs font-bold text-slate-500 px-2 sm:px-0">
          แสดงบทเรียน <span className="text-blue-600 font-extrabold">{selectedSemester === 2 ? 'ภาคปลาย' : 'ภาคต้น'}</span> ({filteredLessons.length} รายการ)
        </div>
      </div>

      {/* Unit Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
        {currentUnits.map((u) => (
          <button
            key={u.number}
            onClick={() => setSelectedUnit(u.number as any)}
            className={`whitespace-nowrap px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
              selectedUnit === u.number
                ? 'bg-blue-600 text-white shadow-md shadow-blue-200'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-sky-50 hover:text-blue-600'
            }`}
          >
            {u.title}
          </button>
        ))}
      </div>

      {/* Lesson Cards List */}
      {filteredLessons.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border-2 border-dashed border-slate-300 space-y-3">
          <div className="text-4xl">🔍</div>
          <h3 className="text-lg font-bold text-slate-800">ไม่พบบทเรียนที่ค้นหา</h3>
          <p className="text-xs text-slate-500">ลองเปลี่ยนคำค้นหา หรือกดเลือก "ทั้งหมด" เพื่อดูบทเรียนที่มี</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedUnit('all');
            }}
            className="mt-2 px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl"
          >
            ล้างตัวกรองทั้งหมด
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredLessons.map((lesson) => {
            const difficultyBadge =
              lesson.difficulty === 'ง่าย'
                ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
                : lesson.difficulty === 'ปานกลาง'
                ? 'bg-amber-100 text-amber-800 border-amber-200'
                : 'bg-rose-100 text-rose-800 border-rose-200';

            return (
              <div
                key={lesson.id}
                className="bg-white rounded-3xl border-2 border-slate-200 hover:border-blue-400 transition-all duration-300 overflow-hidden shadow-sm hover:shadow-xl"
              >
                {/* Lesson Header Banner */}
                <div className="p-5 sm:p-7 border-b border-slate-100 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`font-black text-xs sm:text-sm px-3.5 py-1.5 rounded-xl shadow-xs ${
                        lesson.semester === 2 ? 'bg-indigo-600 text-white' : 'bg-slate-700 text-white'
                      }`}>
                        {lesson.termLabel || (lesson.semester === 2 ? 'ภาคปลาย' : 'ภาคต้น')} • สัปดาห์ที่ {lesson.week}
                      </span>
                      <span className="bg-amber-100 text-amber-900 font-bold text-xs px-3 py-1 rounded-xl border border-amber-300 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-amber-700" />
                        <span>{lesson.dateRange}</span>
                      </span>
                      <span className="bg-sky-100 text-sky-800 text-xs font-bold px-2.5 py-1 rounded-xl border border-sky-200">
                        {lesson.unitName}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {lesson.scoreWeight && (
                        <span className="bg-rose-50 text-rose-700 border border-rose-200 font-bold text-xs px-2.5 py-1 rounded-xl flex items-center gap-1">
                          <Award className="w-3.5 h-3.5 text-rose-500" />
                          <span>{lesson.scoreWeight}</span>
                        </span>
                      )}
                      <span className={`text-[11px] font-bold px-2 py-0.5 rounded-lg border ${difficultyBadge}`}>
                        {lesson.difficulty}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                      {lesson.title}
                    </h2>
                    <p className="text-xs sm:text-sm font-semibold text-blue-600 mt-0.5">
                      {lesson.subtitle}
                    </p>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-2 max-w-4xl">
                      {lesson.description}
                    </p>
                  </div>
                </div>

                {/* Lesson Tasks (Numbered Activities) */}
                <div className="p-5 sm:p-7 bg-slate-50/70 border-b border-slate-100 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-blue-900 uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-amber-500" />
                      <span>เนื้อหากิจกรรมประจำสัปดาห์ ({lesson.tasks.length} รายการ):</span>
                    </span>
                  </div>

                  <div className="space-y-2">
                    {lesson.tasks.map((task, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 bg-white p-3 sm:p-3.5 rounded-2xl border border-slate-200/90 shadow-2xs hover:border-blue-300 transition"
                      >
                        <span className="w-6 h-6 rounded-xl bg-blue-600 text-white font-black text-xs flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                          {idx + 1}
                        </span>
                        <p className="text-xs sm:text-sm font-medium text-slate-800 leading-relaxed">
                          {task}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Lesson Key Points & PDF Action Grid */}
                <div className="p-5 sm:p-7 bg-white grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  {/* Left: Key concept bullet points */}
                  <div className="lg:col-span-8 space-y-2">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                      📌 สรุปประเด็นสำคัญประจำสัปดาห์:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {lesson.keyPoints.map((point, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-xs text-slate-700"
                        >
                          <span className="text-emerald-500 font-bold shrink-0 mt-0.5">✓</span>
                          <span className="font-medium leading-snug">{point}</span>
                        </div>
                      ))}
                    </div>

                    {lesson.homeworkDue && (
                      <div className="pt-1 flex items-center gap-1.5 text-xs text-amber-800 font-bold">
                        <Clock className="w-3.5 h-3.5 text-amber-600" />
                        <span>กำหนดการ / ส่งงาน: {lesson.homeworkDue}</span>
                      </div>
                    )}
                  </div>

                  {/* Right: PDF Action Button */}
                  <div className="lg:col-span-4 flex">
                    {lesson.downloadUrl ? (
                      <a
                        href={lesson.downloadUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group w-full flex items-center justify-between p-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-2xl shadow-md hover:shadow-lg transition-all active:scale-98"
                      >
                        <div className="flex items-center gap-3 text-left">
                          <div className="w-11 h-11 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center shrink-0">
                            <FileText className="w-6 h-6 text-amber-300" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-amber-200 flex items-center gap-1.5">
                              <span>ดาวน์โหลดใบงาน (Google Drive)</span>
                              <ExternalLink className="w-3.5 h-3.5 text-amber-200" />
                            </div>
                            <div className="text-xs font-medium text-white/90 truncate max-w-[160px] sm:max-w-[200px]">
                              {lesson.pdfTitle}
                            </div>
                            <div className="text-[10px] text-sky-100">
                              คลิกเพื่อเปิดและดาวน์โหลดไฟล์บน Google Drive
                            </div>
                          </div>
                        </div>
                        <ExternalLink className="w-5 h-5 text-white/80 group-hover:text-white group-hover:scale-110 transition shrink-0 ml-2" />
                      </a>
                    ) : (
                      <button
                        onClick={() => onOpenPdf(lesson)}
                        className="group w-full flex items-center justify-between p-4 bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-700 hover:to-sky-700 text-white rounded-2xl shadow-md transition-all active:scale-98"
                      >
                        <div className="flex items-center gap-3 text-left">
                          <div className="w-11 h-11 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center shrink-0">
                            <FileText className="w-6 h-6 text-amber-300" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-amber-200">
                              ดาวน์โหลดใบงาน/เอกสาร
                            </div>
                            <div className="text-xs font-medium text-white/90 truncate max-w-[160px] sm:max-w-[200px]">
                              {lesson.pdfTitle}
                            </div>
                            <div className="text-[10px] text-sky-100">
                              PDF • {lesson.pdfPages} หน้า ({lesson.pdfSize})
                            </div>
                          </div>
                        </div>
                        <Download className="w-5 h-5 text-white/80 group-hover:text-white group-hover:scale-110 transition shrink-0 ml-2" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
