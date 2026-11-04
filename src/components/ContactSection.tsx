import React, { useState, useRef } from 'react';
import { TEACHERS_LIST } from '../data/mockData';
import { ContactMessageForm, TeacherItem } from '../types';
import {
  MessageSquare,
  MapPin,
  Send,
  CheckCircle2,
  User,
  GraduationCap,
  Sparkles,
  School,
  Maximize2,
  X,
  ExternalLink,
  MessageCircle,
  Hash
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const ContactSection: React.FC = () => {
  const formRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState<ContactMessageForm>({
    studentName: '',
    studentClass: 'ป.6/1',
    studentNumber: '',
    targetTeacher: 'อาจารย์ทุกท่าน',
    topic: 'การบ้านและใบงานประจำสัปดาห์',
    message: '',
    parentEmailOrLine: ''
  });

  const [selectedPhotoTeacher, setSelectedPhotoTeacher] = useState<TeacherItem | null>(null);

  const [submittedMessages, setSubmittedMessages] = useState<
    Array<ContactMessageForm & { id: string; timestamp: string }>
  >([]);

  const [isSuccessToast, setIsSuccessToast] = useState<boolean>(false);

  const handleSelectTeacherForInquiry = (teacherName: string) => {
    setFormData((prev) => ({
      ...prev,
      targetTeacher: teacherName
    }));
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.studentName.trim() || !formData.message.trim()) return;

    const newMessage = {
      ...formData,
      id: Date.now().toString(),
      timestamp: 'วันนี้ เวลา ' + new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' })
    };

    setSubmittedMessages([newMessage, ...submittedMessages]);
    setIsSuccessToast(true);

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 }
    });

    // Reset message field
    setFormData((prev) => ({
      ...prev,
      message: ''
    }));

    setTimeout(() => {
      setIsSuccessToast(false);
    }, 6000);
  };

  return (
    <div className="space-y-10 pb-16">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-sky-600 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute -right-12 -top-12 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-bold text-sky-100 border border-white/20">
            <School className="w-3.5 h-3.5" />
            <span>โรงเรียนสาธิตแห่งมหาวิทยาลัยเกษตรศาสตร์ ศูนย์วิจัยและพัฒนาการศึกษา</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
            ติดต่ออาจารย์ผู้สอน (Contact Us)
          </h1>

          <p className="text-sky-100 text-xs sm:text-sm max-w-3xl leading-relaxed">
            คณะอาจารย์ผู้รับผิดชอบรายวิชาเทคโนโลยี ชั้นประถมศึกษาปีที่ 6 พร้อมให้คำปรึกษา แนะนำการเรียน และตอบข้อสงสัยของนักเรียนทุกคน
          </p>
        </div>
      </div>

      {/* Teachers 4-Card Showcase */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2.5">
              <span className="w-3.5 h-7 bg-amber-500 rounded-full inline-block" />
              <span>อาจารย์ผู้รับผิดชอบรายวิชาเทคโนโลยี ป.6</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              คลิกที่รูปภาพเพื่อดูภาพขนาดใหญ่ หรือกดปุ่มสอบถามเพื่อส่งข้อความถึงอาจารย์โดยตรง
            </p>
          </div>
          <span className="self-start sm:self-auto text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200 px-3 py-1 rounded-full">
            อาจารย์ผู้สอน 4 ท่าน
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {TEACHERS_LIST.map((teacher) => {
            const isComputerTeacher = teacher.subject.includes('คอมพิวเตอร์');
            return (
              <div
                key={teacher.id}
                className="bg-white rounded-3xl border-2 border-slate-200 hover:border-blue-400 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group"
              >
                {/* Image or Avatar Container */}
                <div className="relative bg-gradient-to-b from-slate-100 to-slate-200 aspect-[3/4] overflow-hidden">
                  {teacher.imageUrl ? (
                    <>
                      <img
                        src={teacher.imageUrl}
                        alt={teacher.name}
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 cursor-pointer"
                        onClick={() => setSelectedPhotoTeacher(teacher)}
                        loading="lazy"
                      />
                      <button
                        type="button"
                        onClick={() => setSelectedPhotoTeacher(teacher)}
                        className="absolute bottom-3 right-3 bg-slate-900/75 hover:bg-slate-900 text-white text-xs font-bold px-2.5 py-1.5 rounded-xl backdrop-blur-md transition flex items-center gap-1 shadow-md opacity-90 group-hover:opacity-100"
                        title="ดูภาพขนาดใหญ่"
                      >
                        <Maximize2 className="w-3.5 h-3.5" />
                        <span>ดูภาพเต็ม</span>
                      </button>
                    </>
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-tr from-sky-500 via-indigo-500 to-purple-600 text-white">
                      <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-5xl border-4 border-white/30 shadow-inner mb-3">
                        {teacher.avatarEmoji || '👨‍🏫'}
                      </div>
                      <span className="text-xs font-extrabold tracking-wider uppercase opacity-90 bg-white/20 px-3 py-1 rounded-full">
                        อาจารย์ผู้สอน
                      </span>
                    </div>
                  )}

                  {/* Subject Tag Badge Overlay */}
                  <div className="absolute top-3 left-3">
                    <span
                      className={`text-[11px] font-black px-2.5 py-1 rounded-full shadow-md backdrop-blur-sm ${
                        isComputerTeacher
                          ? 'bg-purple-600 text-white border border-purple-400'
                          : 'bg-emerald-600 text-white border border-emerald-400'
                      }`}
                    >
                      {teacher.subject}
                    </span>
                  </div>
                </div>

                {/* Teacher Details */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-lg font-black text-slate-900 leading-snug group-hover:text-blue-600 transition">
                      {teacher.name}
                    </h3>
                    <p className="text-xs font-bold text-slate-500">
                      {teacher.role} • วิชาเทคโนโลยี
                    </p>

                    {teacher.facebookTag && (
                      <div className="flex flex-wrap gap-1 pt-1">
                        {teacher.facebookTag.split(' ').map((tag, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center gap-0.5 text-[10px] font-semibold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md"
                          >
                            <Hash className="w-2.5 h-2.5 text-blue-500" />
                            {tag.replace('#', '')}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="space-y-1.5 text-xs text-slate-600 pt-2 border-t border-slate-100">
                      <div className="flex items-center gap-2 text-slate-500">
                        <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                        <span className="truncate">{teacher.room}</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <button
                    type="button"
                    onClick={() => handleSelectTeacherForInquiry(teacher.name)}
                    className="w-full py-2 px-3 bg-sky-50 hover:bg-sky-600 hover:text-white text-sky-700 font-bold text-xs rounded-xl border border-sky-200 hover:border-transparent transition flex items-center justify-center gap-1.5 active:scale-95 shadow-xs"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>สอบถามอาจารย์ {teacher.name.replace('อาจารย์', '')}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Student Question Form */}
      <section ref={formRef} className="bg-white rounded-3xl border-2 border-slate-200 shadow-md p-6 sm:p-8 space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <div className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1 rounded-full mb-2">
            <Send className="w-3.5 h-3.5 text-amber-600" />
            <span>แบบฟอร์มส่งข้อความ</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            ส่งข้อความสอบถามอาจารย์ผู้สอน (Student Inquiry Form)
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            นักเรียนสามารถพิมพ์คำถาม ข้อสงสัย หรือปัญหาการใช้งานระบบส่งให้อาจารย์ผู้สอนได้ตลอดเวลา อาจารย์จะให้คำแนะนำและตอบกลับให้ครับ
          </p>
        </div>

        {isSuccessToast && (
          <div className="p-4 bg-emerald-50 border-2 border-emerald-400 rounded-2xl flex items-center gap-3 text-emerald-900 text-xs sm:text-sm animate-fade-in font-bold">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <div>
              ส่งคำถามถึง <span className="underline">{formData.targetTeacher}</span> สำเร็จแล้ว! อาจารย์ได้รับข้อความแล้ว และจะตรวจสอบให้คนเก่งนะ
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
          {/* Target Teacher Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              เลือกอาจารย์ที่ต้องการสอบถาม <span className="text-rose-500">*</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, targetTeacher: 'อาจารย์ทุกท่าน' })}
                className={`py-2 px-3 rounded-xl border text-xs font-bold transition text-center ${
                  formData.targetTeacher === 'อาจารย์ทุกท่าน'
                    ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                👥 อาจารย์ทุกท่าน
              </button>
              {TEACHERS_LIST.map((teacher) => (
                <button
                  key={teacher.id}
                  type="button"
                  onClick={() => setFormData({ ...formData, targetTeacher: teacher.name })}
                  className={`py-2 px-3 rounded-xl border text-xs font-bold transition text-center truncate ${
                    formData.targetTeacher === teacher.name
                      ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                  title={teacher.name}
                >
                  {teacher.name}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Student Name */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                ชื่อ-นามสกุล นักเรียน <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="เช่น ด.ช. ก้องภพ สถิตคุณ"
                value={formData.studentName}
                onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-blue-500 focus:bg-white transition"
              />
            </div>

            {/* Class */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                ห้องเรียน <span className="text-rose-500">*</span>
              </label>
              <select
                value={formData.studentClass}
                onChange={(e) => setFormData({ ...formData, studentClass: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-blue-500 focus:bg-white transition font-medium"
              >
                <option value="ป.6/1">ป.6/1</option>
                <option value="ป.6/2">ป.6/2</option>
                <option value="ป.6/3">ป.6/3</option>
                <option value="ป.6/4">ป.6/4</option>
                <option value="ป.6/5">ป.6/5</option>
              </select>
            </div>

            {/* Student Number */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                เลขที่
              </label>
              <input
                type="text"
                placeholder="เช่น 12"
                value={formData.studentNumber}
                onChange={(e) => setFormData({ ...formData, studentNumber: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-blue-500 focus:bg-white transition"
              />
            </div>
          </div>

          {/* Topic & Contact */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                เรื่องที่ต้องการสอบถาม <span className="text-rose-500">*</span>
              </label>
              <select
                value={formData.topic}
                onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-blue-500 focus:bg-white transition font-medium"
              >
                <option value="การบ้านและใบงานประจำสัปดาห์">การบ้านและใบงานประจำสัปดาห์ 📝</option>
                <option value="การใช้งานเว็บไซต์ Canva">การออกแบบและใช้งานเว็บไซต์ Canva 🎨</option>
                <option value="การค้นหา Search Engine และ AI Search">การค้นหา Search Engine & AI Search 🔍</option>
                <option value="การเขียน Prompt และเครื่องมือ AI">การเขียน Prompt สร้างภาพและวิดีโอ 🤖</option>
                <option value="สอบถามการสอบเก็บคะแนนและสอบกลางภาค">การสอบเก็บคะแนนและสอบกลางภาค 📊</option>
                <option value="ลืมรหัสผ่านหรือติดปัญหาการใช้งาน">ลืมรหัสผ่าน / บัญชีเข้าใช้งานคอมพิวเตอร์ 🔐</option>
                <option value="เรื่องอื่นๆ ทั่วไป">เรื่องอื่นๆ ทั่วไป 💬</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                เบอร์หรือ Line ผู้ปกครอง (สำหรับติดต่อกลับ)
              </label>
              <input
                type="text"
                placeholder="เช่น 081-xxx-xxxx หรือ Line ID (ไม่บังคับ)"
                value={formData.parentEmailOrLine}
                onChange={(e) => setFormData({ ...formData, parentEmailOrLine: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-blue-500 focus:bg-white transition"
              />
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              ข้อความรายละเอียด <span className="text-rose-500">*</span>
            </label>
            <textarea
              required
              rows={4}
              placeholder="เขียนข้อความหรือคำถามที่ต้องการให้อาจารย์ช่วยเหลือได้เลยครับ เช่น สอบถามขั้นตอนการ Export งานจาก Canva หรือการเขียน Prompt..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-blue-500 focus:bg-white transition text-xs sm:text-sm"
            ></textarea>
          </div>

          {/* Submit button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-600 hover:from-blue-700 hover:to-sky-700 text-white font-black rounded-xl shadow-md transition active:scale-95 flex items-center justify-center gap-2 text-sm"
            >
              <Send className="w-4 h-4" />
              <span>ส่งข้อความถึงอาจารย์ผู้สอน 🚀</span>
            </button>
          </div>
        </form>

        {/* List of sent inquiries in this session */}
        {submittedMessages.length > 0 && (
          <div className="pt-6 border-t border-slate-100 space-y-3">
            <span className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>ประวัติการส่งคำถามของคุณ ({submittedMessages.length} รายการ):</span>
            </span>
            <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
              {submittedMessages.map((msg) => (
                <div key={msg.id} className="p-3.5 bg-sky-50/70 rounded-2xl border border-sky-100 text-xs space-y-1">
                  <div className="flex flex-wrap items-center justify-between gap-2 font-bold text-blue-900">
                    <div className="flex items-center gap-2">
                      <span className="bg-blue-600 text-white text-[10px] px-2 py-0.5 rounded-md">
                        ถึง: {msg.targetTeacher}
                      </span>
                      <span>หัวข้อ: {msg.topic}</span>
                    </div>
                    <span className="text-slate-400 font-normal text-[11px]">{msg.timestamp}</span>
                  </div>
                  <p className="text-slate-700 pl-1">{msg.message}</p>
                  <p className="text-[11px] text-slate-400 pl-1">
                    ผู้ส่ง: {msg.studentName} ({msg.studentClass} {msg.studentNumber ? `เลขที่ ${msg.studentNumber}` : ''})
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>



      {/* Image Modal Lightbox */}
      {selectedPhotoTeacher && selectedPhotoTeacher.imageUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-hidden shadow-2xl border-4 border-sky-300 flex flex-col">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div>
                <h3 className="font-black text-slate-900 text-base">
                  {selectedPhotoTeacher.name}
                </h3>
                <p className="text-xs text-slate-500">
                  {selectedPhotoTeacher.subject}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedPhotoTeacher(null)}
                className="w-8 h-8 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-700 flex items-center justify-center transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-2 overflow-y-auto flex-1 flex items-center justify-center bg-slate-900">
              <img
                src={selectedPhotoTeacher.imageUrl}
                alt={selectedPhotoTeacher.name}
                className="max-h-[70vh] w-auto object-contain rounded-xl shadow-lg"
              />
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3">
              <span className="text-xs text-slate-500 truncate">
                {selectedPhotoTeacher.facebookTag}
              </span>
              <button
                type="button"
                onClick={() => {
                  const teacherName = selectedPhotoTeacher.name;
                  setSelectedPhotoTeacher(null);
                  handleSelectTeacherForInquiry(teacherName);
                }}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-sm transition shrink-0"
              >
                ส่งคำถามถึงท่านนี้
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
