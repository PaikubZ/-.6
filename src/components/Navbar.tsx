import React, { useState } from 'react';
import { PageTab } from '../types';
import {
  Home,
  BookOpen,
  Gamepad2,
  Palette,
  MessageSquare,
  Clock,
  Menu,
  X,
  Sparkles,
  Laptop
} from 'lucide-react';

interface NavbarProps {
  currentTab: PageTab;
  onTabChange: (tab: PageTab) => void;
  onOpenTimer: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onTabChange,
  onOpenTimer
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { tab: PageTab; label: string; icon: React.FC<{ className?: string }>; badge?: string; badgeColor?: string }[] = [
    {
      tab: 'home',
      label: 'หน้าหลัก',
      icon: Home
    },
    {
      tab: 'lessons',
      label: 'บทเรียน',
      icon: BookOpen
    },
    {
      tab: 'games',
      label: 'เกมคลายเครียด',
      icon: Gamepad2,
      badge: 'เล่นฟรี',
      badgeColor: 'bg-amber-400 text-amber-950'
    },
    {
      tab: 'gallery',
      label: 'โชว์ผลงานนักเรียน',
      icon: Palette,
      badge: 'ป.6',
      badgeColor: 'bg-indigo-500 text-white'
    },
    {
      tab: 'contact',
      label: 'ติดต่ออาจารย์',
      icon: MessageSquare
    }
  ];

  const handleSelectTab = (tab: PageTab) => {
    onTabChange(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b-2 border-sky-100 shadow-sm transition-all">
      {/* Top Banner Ribbon */}
      <div className="bg-gradient-to-r from-blue-600 via-sky-500 to-amber-500 text-white text-xs py-1.5 px-4 font-medium flex items-center justify-center text-center">
        <span className="inline truncate">
          🌟 วิชาเทคโนโลยี ชั้นประถมศึกษาปีที่ 6
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 sm:h-20">
          {/* Logo & Course Title */}
          <div
            onClick={() => handleSelectTab('home')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="relative">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-blue-500 via-sky-500 to-amber-400 flex items-center justify-center text-white shadow-md shadow-sky-200 group-hover:scale-105 transition-transform duration-200">
                <Laptop className="w-7 h-7 sm:w-8 sm:h-8" />
              </div>
              <span className="absolute -bottom-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-amber-500 text-[9px] font-black text-white items-center justify-center">
                  6
                </span>
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg sm:text-xl text-blue-900 tracking-tight group-hover:text-blue-700 transition">
                  วิชาเทคโนโลยี
                </span>
              </div>
              <p className="text-[10px] text-slate-500 font-medium truncate max-w-[280px] sm:max-w-none">
                โรงเรียนสาธิตแห่งมหาวิทยาลัยเกษตรศาสตร์ ศูนย์วิจัยและพัฒนาการศึกษา
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1.5 xl:gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.tab;
              return (
                <button
                  key={item.tab}
                  onClick={() => handleSelectTab(item.tab)}
                  className={`relative flex items-center gap-2 px-3.5 py-2.5 rounded-2xl font-bold text-sm transition-all duration-200 ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-200 scale-102'
                      : 'text-slate-600 hover:text-blue-600 hover:bg-sky-50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-amber-300' : 'text-slate-500 group-hover:text-blue-500'}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span
                      className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded-full ${
                        isActive ? 'bg-amber-400 text-amber-950' : item.badgeColor || 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Mobile menu trigger */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-sky-50 border border-sky-200 text-blue-700 hover:bg-sky-100 transition"
              aria-label="เปิดเมนูนำทาง"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b-2 border-sky-200 px-4 pt-3 pb-6 space-y-2 shadow-xl animate-fade-in">
          <div className="text-xs font-bold text-slate-400 px-2 uppercase tracking-wider mb-1">
            เมนูวิชาเทคโนโลยี ป.6
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.tab;
            return (
              <button
                key={item.tab}
                onClick={() => handleSelectTab(item.tab)}
                className={`w-full flex items-center justify-between p-3 rounded-2xl font-bold text-base transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-200'
                    : 'text-slate-700 hover:bg-sky-50 hover:text-blue-600'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                      isActive ? 'bg-blue-500 text-amber-300' : 'bg-sky-100 text-sky-700'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-xs font-extrabold px-2 py-0.5 rounded-full ${
                      isActive ? 'bg-amber-400 text-amber-950' : item.badgeColor || 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTimer();
              }}
              className="w-full flex items-center justify-center gap-2 p-3 rounded-2xl bg-amber-100 border border-amber-300 text-amber-900 font-bold text-sm hover:bg-amber-200 transition"
            >
              <Clock className="w-4 h-4 text-amber-700" />
              <span>เปิดตัวจับเวลาเตือนพักสายตา (20 นาที)</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
