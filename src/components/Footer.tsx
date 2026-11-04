import React from 'react';
import { PageTab } from '../types';
import { Laptop, ExternalLink } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: PageTab) => void;
  onOpenTimer?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t-4 border-amber-400 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Col 1: About the course */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-500 to-amber-400 flex items-center justify-center text-white shadow-md">
                <Laptop className="w-6 h-6" />
              </div>
              <span className="font-extrabold text-white text-base">
                วิชาเทคโนโลยี
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              โรงเรียนสาธิตแห่งมหาวิทยาลัยเกษตรศาสตร์ ศูนย์วิจัยและพัฒนาการศึกษา
            </p>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-white text-sm font-bold uppercase tracking-wider">
              แผนผังเว็บไซต์
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-amber-300 transition flex items-center gap-1"
                >
                  <span>🏠 หน้าหลัก & ประกาศข่าวสาร</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('lessons')}
                  className="hover:text-amber-300 transition flex items-center gap-1"
                >
                  <span>📚 คลังบทเรียน & ใบงาน PDF</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('games')}
                  className="hover:text-amber-300 transition flex items-center gap-1"
                >
                  <span>🎮 ห้องเกมคลายเครียด & เสริมทักษะ</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('gallery')}
                  className="hover:text-amber-300 transition flex items-center gap-1"
                >
                  <span>🎨 โชว์ผลงานนักเรียน</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-amber-300 transition flex items-center gap-1"
                >
                  <span>💬 ติดต่ออาจารย์ผู้สอน</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: External Educational Platforms */}
          <div className="space-y-3">
            <h4 className="text-white text-sm font-bold uppercase tracking-wider">
              แหล่งเรียนรู้ภายนอก
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="https://scratch.mit.edu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-300 transition flex items-center gap-1"
                >
                  <span>🐱 Scratch 3.0 (MIT)</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://code.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-300 transition flex items-center gap-1"
                >
                  <span>💻 Code.org Hour of Code</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};
