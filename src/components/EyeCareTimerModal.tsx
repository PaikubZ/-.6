import React, { useState, useEffect } from 'react';
import { Eye, Clock, CheckCircle2, AlertCircle, X, Volume2, Sparkles, Smile } from 'lucide-react';

interface EyeCareTimerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EyeCareTimerModal: React.FC<EyeCareTimerModalProps> = ({ isOpen, onClose }) => {
  const [minutes, setMinutes] = useState<number>(20);
  const [secondsLeft, setSecondsLeft] = useState<number>(20 * 60);
  const [isRunning, setIsRunning] = useState<boolean>(true);
  const [isAlertShowing, setIsAlertShowing] = useState<boolean>(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRunning && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (secondsLeft === 0) {
      setIsAlertShowing(true);
      setIsRunning(false);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, secondsLeft]);

  const handleSetTimer = (min: number) => {
    setMinutes(min);
    setSecondsLeft(min * 60);
    setIsRunning(true);
    setIsAlertShowing(false);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border-4 border-amber-300 overflow-hidden transform transition-all p-6 sm:p-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors"
          title="ปิดหน้าต่าง"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 to-orange-500 flex items-center justify-center text-white shadow-md shadow-amber-200">
            <Eye className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              ผู้ช่วยเตือนพักสายตา 20-20-20
              <span className="text-xs bg-amber-100 text-amber-800 font-semibold px-2 py-0.5 rounded-full border border-amber-300">
                ดูแลสายตาเด็ก
              </span>
            </h3>
            <p className="text-sm text-slate-500">สำหรับนักเรียน ป.6 เวลาใช้คอมพิวเตอร์และเล่นเกม</p>
          </div>
        </div>

        {/* Alert state or Timer state */}
        {isAlertShowing ? (
          <div className="p-5 bg-amber-50 border-2 border-amber-400 rounded-2xl mb-6 text-center animate-bounce-short">
            <div className="text-4xl mb-2">👀 ✨</div>
            <h4 className="text-lg font-bold text-amber-900">หมดเวลาแล้วจ้า! ถึงเวลาพักสายตา</h4>
            <p className="text-sm text-amber-800 mt-1">
              ละสายตาจากหน้าจอ มองออกไปไกลๆ 6 เมตร (20 ฟุต) นาน 20 วินาที หรือลุกขึ้นยืดเส้นยืดสาย ดื่มน้ำสักแก้วนะคนเก่ง!
            </p>
            <button
              onClick={() => handleSetTimer(20)}
              className="mt-4 px-5 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-xl shadow-md hover:from-amber-600 hover:to-orange-600 transition-all text-sm"
            >
              รีเซ็ตจับเวลาต่ออีก 20 นาที ⏱️
            </button>
          </div>
        ) : (
          <div className="my-5 p-5 bg-gradient-to-b from-sky-50 to-blue-50/50 rounded-2xl border-2 border-sky-200 text-center">
            <span className="text-xs uppercase tracking-wider text-sky-600 font-bold">เวลาที่เหลือก่อนพักสายตา</span>
            <div className="text-5xl sm:text-6xl font-black text-sky-900 tracking-wider my-2 font-mono">
              {formatTime(secondsLeft)}
            </div>
            <div className="flex items-center justify-center gap-2 text-xs text-sky-700">
              <span className={`inline-block w-2.5 h-2.5 rounded-full ${isRunning ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`}></span>
              {isRunning ? 'กำลังนับถอยหลังอย่างปลอดภัย' : 'หยุดชั่วคราว'}
            </div>

            <div className="flex justify-center gap-2 mt-4">
              <button
                onClick={() => setIsRunning(!isRunning)}
                className="px-4 py-1.5 text-xs font-bold rounded-lg bg-white border border-sky-300 text-sky-700 hover:bg-sky-100 shadow-sm transition"
              >
                {isRunning ? 'หยุดชั่วคราว' : 'นับเวลาต่อ'}
              </button>
              <button
                onClick={() => handleSetTimer(minutes)}
                className="px-4 py-1.5 text-xs font-bold rounded-lg bg-white border border-sky-300 text-sky-700 hover:bg-sky-100 shadow-sm transition"
              >
                เริ่มนับใหม่
              </button>
            </div>
          </div>
        )}

        {/* Select timer presets */}
        <div className="mb-5">
          <label className="block text-xs font-bold text-slate-700 mb-2">เลือกระยะเวลานับถอยหลัง:</label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { min: 15, label: '15 นาที (แนะนำช่วงเล่นเกม)' },
              { min: 20, label: '20 นาที (กฎมาตรฐาน 20-20-20)' },
              { min: 30, label: '30 นาที (ช่วงทำการบ้าน)' }
            ].map((preset) => (
              <button
                key={preset.min}
                onClick={() => handleSetTimer(preset.min)}
                className={`p-2.5 rounded-xl border text-center transition-all ${
                  minutes === preset.min
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md font-bold'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <div className="text-sm font-bold">{preset.min} นาที</div>
                <div className={`text-[10px] truncate ${minutes === preset.min ? 'text-blue-100' : 'text-slate-500'}`}>
                  {preset.min === 20 ? '⭐ แนะนำ' : ''}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Tip Box for Kids */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex gap-3 text-xs text-emerald-900">
          <Smile className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold block text-emerald-950 mb-0.5">เคล็ดลับสายตาสดใสจากคุณครู:</span>
            นั่งห่างจากหน้าจออย่างน้อย 1 ช่วงแขน (ประมาณ 50 ซม.) ปรับความสว่างหน้าจอให้พอดีกับห้อง และอย่าเล่นในที่มืดนะจ๊ะ!
          </div>
        </div>

        {/* Footer OK */}
        <div className="mt-5 flex justify-end">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md transition-all text-sm"
          >
            เข้าใจแล้ว เริ่มจับเวลาเลย! 🚀
          </button>
        </div>
      </div>
    </div>
  );
};
