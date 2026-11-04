import React, { useState } from 'react';
import { Lesson } from '../types';
import { X, Download, Printer, CheckCircle, FileText, Sparkles, BookOpen, User, Hash } from 'lucide-react';

interface PdfViewerModalProps {
  lesson: Lesson | null;
  onClose: () => void;
  onDownloaded?: () => void;
}

export const PdfViewerModal: React.FC<PdfViewerModalProps> = ({ lesson, onClose, onDownloaded }) => {
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [mockStudentName, setMockStudentName] = useState('');
  const [mockStudentClass, setMockStudentClass] = useState('ป.6/1');
  const [mockStudentNo, setMockStudentNo] = useState('');

  if (!lesson) return null;

  const handleDownload = () => {
    const content = `ใบงานและใบความรู้วิชาเทคโนโลยี ชั้นประถมศึกษาปีที่ 6
โรงเรียนสาธิตแห่งมหาวิทยาลัยเกษตรศาสตร์ ศูนย์วิจัยและพัฒนาการศึกษา
กลุ่มสาระการเรียนรู้วิทยาศาสตร์และเทคโนโลยี
==================================================
สัปดาห์ที่ ${lesson.week} (${lesson.dateRange}): ${lesson.title}
${lesson.subtitle}
หน่วยการเรียนรู้ที่ ${lesson.unitNumber}: ${lesson.unitName}
--------------------------------------------------
ชื่อ-นามสกุล นักเรียน: ${mockStudentName || '...................................................'}
ชั้น: ${mockStudentClass}  เลขที่: ${mockStudentNo || '........'}
--------------------------------------------------

[เนื้อหากิจกรรมประจำสัปดาห์]
${lesson.tasks.map((task, i) => `${i + 1}. ${task}`).join('\n')}

[คำอธิบายบทเรียน]
${lesson.description}

[ประเด็นสำคัญประจำสัปดาห์]
${lesson.keyPoints.map((kp, i) => `- [ ] ${kp}`).join('\n')}

${lesson.scoreWeight ? `[เกณฑ์คะแนน]: ${lesson.scoreWeight}\n` : ''}${lesson.homeworkDue ? `[กำหนดการ]: ${lesson.homeworkDue}\n` : ''}==================================================
ดาวน์โหลดจากเว็บไซต์วิชาเทคโนโลยี
`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ใบงาน_${lesson.week}_${lesson.title.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setDownloadSuccess(true);
    if (onDownloaded) onDownloaded();
    setTimeout(() => {
      setDownloadSuccess(false);
    }, 4000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border-4 border-blue-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Top Bar */}
        <div className="bg-gradient-to-r from-blue-600 via-sky-600 to-amber-500 text-white p-4 sm:px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-white">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs bg-amber-400 text-amber-950 font-bold px-2 py-0.5 rounded-full">
                  PDF Preview
                </span>
                <span className="text-xs text-sky-100">
                  สัปดาห์ที่ {lesson.week} • {lesson.pdfPages} หน้า ({lesson.pdfSize})
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-bold truncate max-w-md sm:max-w-xl text-white">
                {lesson.pdfTitle}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-white/15 hover:bg-white/25 rounded-xl text-xs font-bold transition"
              title="พิมพ์เอกสาร"
            >
              <Printer className="w-4 h-4" />
              <span>พิมพ์</span>
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-4 py-2 bg-amber-400 hover:bg-amber-300 text-amber-950 rounded-xl text-xs sm:text-sm font-extrabold shadow-md transition active:scale-95"
            >
              <Download className="w-4 h-4" />
              <span>ดาวน์โหลด</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-white/80 hover:text-white bg-black/10 hover:bg-black/20 rounded-xl transition"
              title="ปิด"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {downloadSuccess && (
          <div className="bg-emerald-500 text-white text-xs font-bold py-2 px-4 flex items-center justify-center gap-2 animate-bounce-short">
            <CheckCircle className="w-4 h-4" />
            <span>ดาวน์โหลดใบงานสำเร็จแล้ว! นักเรียนสามารถเปิดไฟล์เพื่ออ่านและพิมพ์ได้เลย</span>
          </div>
        )}

        {/* Modal Scrollable Content - Simulated PDF Sheet */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-slate-100">
          <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-md border border-slate-300 p-6 sm:p-10 space-y-6 text-slate-800 printable-area">
            {/* Sheet Header */}
            <div className="border-b-2 border-slate-800 pb-4 text-center space-y-1">
              <div className="flex items-center justify-center gap-2 text-blue-700 font-bold text-xs uppercase tracking-wider">
                <BookOpen className="w-4 h-4" />
                <span>โรงเรียนสาธิตแห่งมหาวิทยาลัยเกษตรศาสตร์ ศูนย์วิจัยและพัฒนาการศึกษา</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                ใบความรู้และใบงานประจำสัปดาห์ที่ {lesson.week} ({lesson.dateRange})
              </h2>
              <p className="text-sm font-bold text-blue-600">
                วิชาเทคโนโลยี ชั้น ป.6 • {lesson.title}
              </p>
            </div>

            {/* Student Info Box */}
            <div className="bg-sky-50/70 p-4 rounded-xl border border-sky-200 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <label className="block text-slate-500 font-bold mb-1">ชื่อ - สกุล นักเรียน:</label>
                <input
                  type="text"
                  placeholder="เช่น ด.ช. รักเรียน ตั้งใจ"
                  value={mockStudentName}
                  onChange={(e) => setMockStudentName(e.target.value)}
                  className="w-full bg-white border border-sky-300 rounded-lg px-2.5 py-1 text-slate-800 font-medium focus:outline-blue-500"
                />
              </div>
              <div>
                <label className="block text-slate-500 font-bold mb-1">ชั้นประถมศึกษาปีที่:</label>
                <select
                  value={mockStudentClass}
                  onChange={(e) => setMockStudentClass(e.target.value)}
                  className="w-full bg-white border border-sky-300 rounded-lg px-2.5 py-1 text-slate-800 font-medium focus:outline-blue-500"
                >
                  <option value="ป.6/1">ป.6/1</option>
                  <option value="ป.6/2">ป.6/2</option>
                  <option value="ป.6/3">ป.6/3</option>
                </select>
              </div>
              <div>
                <label className="block text-slate-500 font-bold mb-1">เลขที่:</label>
                <input
                  type="text"
                  placeholder="เช่น 15"
                  value={mockStudentNo}
                  onChange={(e) => setMockStudentNo(e.target.value)}
                  className="w-full bg-white border border-sky-300 rounded-lg px-2.5 py-1 text-slate-800 font-medium focus:outline-blue-500"
                />
              </div>
            </div>

            {/* Objectives */}
            <div className="space-y-2">
              <h4 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                จุดประสงค์การเรียนรู้ (Learning Objectives)
              </h4>
              <ul className="list-disc list-inside text-xs sm:text-sm text-slate-600 space-y-1 pl-2">
                {lesson.learningObjectives.map((obj, i) => (
                  <li key={i}>{obj}</li>
                ))}
              </ul>
            </div>

            {/* Key concepts */}
            <div className="space-y-2">
              <h4 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                สรุปเนื้อหาสำคัญ (Key Concepts)
              </h4>
              <div className="bg-amber-50/60 p-4 rounded-xl border border-amber-200 text-xs sm:text-sm text-amber-950 space-y-2">
                <p className="font-medium leading-relaxed">{lesson.description}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-amber-200/60">
                  {lesson.keyPoints.map((point, i) => (
                    <div key={i} className="flex items-start gap-1.5 text-xs text-amber-900 font-medium">
                      <span className="text-amber-600 font-bold">✓</span>
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Interactive Worksheet Questions Section */}
            <div className="space-y-4 pt-2">
              <h4 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                กิจกรรมฝึกทักษะประจำสัปดาห์ (Practice Activity)
              </h4>

              <div className="p-4 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 space-y-3">
                <p className="text-xs sm:text-sm font-bold text-slate-800">
                  ตอนที่ 1: ตอบคำถามและอธิบายแนวคิดตามสถานการณ์ต่อไปนี้
                </p>
                <p className="text-xs text-slate-600">
                  1.1 ให้นักเรียนยกตัวอย่างการใช้เหตุผลเชิงตรรกะในชีวิตประจำวันมา 1 ตัวอย่าง พร้อมอธิบายขั้นตอน
                </p>
                <div className="w-full h-16 border border-slate-300 rounded-lg bg-white p-2 text-xs text-slate-400 italic">
                  (นักเรียนสามารถพิมพ์คำตอบ หรือพิมพ์ปริ้นต์ออกมาเขียนด้วยลายมือ)
                </div>

                <p className="text-xs text-slate-600 pt-1">
                  1.2 วาดหรือบรรยายลำดับขั้นตอนเพื่อแก้ปัญหานี้ให้เพื่อนเข้าใจ
                </p>
                <div className="w-full h-20 border border-slate-300 rounded-lg bg-white p-2 text-xs text-slate-400 italic">
                  [พื้นที่สำหรับวาดผังงาน Flowchart หรือเขียนลำดับขั้นตอน]
                </div>
              </div>
            </div>

            {/* Footer teacher remark */}
            <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-2">
              <span>กำหนดส่ง: {lesson.homeworkDue || 'ในคาบเรียน'}</span>
              <span>ครูผู้สอน: นายสมชาย พัฒนกิจ (ห้องคอมฯ 2)</span>
            </div>
          </div>
        </div>

        {/* Modal Bottom Actions */}
        <div className="p-4 bg-white border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-500">
            💡 <span className="font-bold">เคล็ดลับ:</span> สามารถกดดาวน์โหลดไฟล์เพื่อพิมพ์ส่งครู หรือทำในสมุดบันทึกก็ได้ครับ
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-100 transition"
            >
              ปิดหน้าต่าง
            </button>
            <button
              onClick={handleDownload}
              className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition flex items-center justify-center gap-1.5"
            >
              <Download className="w-4 h-4" />
              <span>ดาวน์โหลดเอกสาร ({lesson.pdfSize})</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
