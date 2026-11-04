import React, { useState } from 'react';
import { GameItem } from '../types';
import { GAMES_LIST } from '../data/mockData';
import {
  Gamepad2,
  ExternalLink,
  Clock,
  Sparkles,
  Star,
  ShieldAlert,
  Play,
  RotateCcw,
  CheckCircle,
  HelpCircle,
  Award,
  ChevronRight,
  Smile
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface GamesSectionProps {
  onOpenTimer: () => void;
}

export const GamesSection: React.FC<GamesSectionProps> = ({ onOpenTimer }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showInAppGame, setShowInAppGame] = useState<boolean>(true);

  // In-App Mini Game State (Code Runner Bot)
  // Grid size 4x4
  const [botPos, setBotPos] = useState<{ x: number; y: number; dir: 'up' | 'down' | 'left' | 'right' }>({
    x: 0,
    y: 0,
    dir: 'right'
  });
  const [commands, setCommands] = useState<string[]>([]);
  const [isRunningCode, setIsRunningCode] = useState<boolean>(false);
  const [gameLevel, setGameLevel] = useState<number>(1);
  const [hasCollectedStar, setHasCollectedStar] = useState<boolean>(false);
  const [gameResult, setGameResult] = useState<string | null>(null);

  // Level configuration
  const levelConfigs: {
    [key: number]: {
      start: { x: number; y: number; dir: 'up' | 'down' | 'left' | 'right' };
      goal: { x: number; y: number };
      star: { x: number; y: number };
      obstacles: { x: number; y: number }[];
      hint: string;
    };
  } = {
    1: {
      start: { x: 0, y: 0, dir: 'right' },
      goal: { x: 3, y: 0 },
      star: { x: 2, y: 0 },
      obstacles: [{ x: 1, y: 1 }],
      hint: 'เดินหน้า 3 ก้าว เพื่อเก็บดาวและเข้าเส้นชัย!'
    },
    2: {
      start: { x: 0, y: 0, dir: 'right' },
      goal: { x: 2, y: 2 },
      star: { x: 2, y: 0 },
      obstacles: [{ x: 1, y: 1 }, { x: 0, y: 2 }],
      hint: 'เดินหน้า 2 ก้าว เก็บดาว เลี้ยวขวา แล้วเดินหน้า 2 ก้าว!'
    },
    3: {
      start: { x: 0, y: 3, dir: 'up' },
      goal: { x: 3, y: 0 },
      star: { x: 1, y: 1 },
      obstacles: [{ x: 1, y: 2 }, { x: 2, y: 1 }],
      hint: 'วางแผนหลบสิ่งกีดขวางสีแดง แล้วพาน้องหุ่นยนต์ไปให้ถึงดาว!'
    }
  };

  const currentLevelConfig = levelConfigs[gameLevel];

  const resetGame = (level = gameLevel) => {
    const config = levelConfigs[level];
    setBotPos({ ...config.start });
    setCommands([]);
    setHasCollectedStar(false);
    setGameResult(null);
    setIsRunningCode(false);
  };

  const handleAddCommand = (cmd: string) => {
    if (commands.length < 8 && !isRunningCode) {
      setCommands([...commands, cmd]);
    }
  };

  const handleRemoveLastCommand = () => {
    if (!isRunningCode && commands.length > 0) {
      setCommands(commands.slice(0, -1));
    }
  };

  const runRobotCommands = async () => {
    if (commands.length === 0 || isRunningCode) return;
    setIsRunningCode(true);
    setGameResult(null);

    let current = { ...currentLevelConfig.start };
    let gotStar = false;

    for (let i = 0; i < commands.length; i++) {
      const cmd = commands[i];
      await new Promise((resolve) => setTimeout(resolve, 600));

      if (cmd === 'FORWARD') {
        let nextX = current.x;
        let nextY = current.y;
        if (current.dir === 'right') nextX += 1;
        if (current.dir === 'left') nextX -= 1;
        if (current.dir === 'down') nextY += 1;
        if (current.dir === 'up') nextY -= 1;

        // Check boundaries
        if (nextX < 0 || nextX > 3 || nextY < 0 || nextY > 3) {
          setGameResult('ชนขอบตาราง! น้อง Codi มึนหัวเลย ลองใหม่อีกครั้งนะ');
          setIsRunningCode(false);
          return;
        }

        // Check obstacle
        const isObstacle = currentLevelConfig.obstacles.some(
          (obs) => obs.x === nextX && obs.y === nextY
        );
        if (isObstacle) {
          setGameResult('ชนสิ่งกีดขวางสีแดง! ลองปรับทิศทางใหม่นะ');
          setIsRunningCode(false);
          return;
        }

        current.x = nextX;
        current.y = nextY;
      } else if (cmd === 'TURN_LEFT') {
        const turnMap: Record<'up' | 'down' | 'left' | 'right', 'up' | 'down' | 'left' | 'right'> = {
          up: 'left',
          left: 'down',
          down: 'right',
          right: 'up'
        };
        current.dir = turnMap[current.dir];
      } else if (cmd === 'TURN_RIGHT') {
        const turnMap: Record<'up' | 'down' | 'left' | 'right', 'up' | 'down' | 'left' | 'right'> = {
          up: 'right',
          right: 'down',
          down: 'left',
          left: 'up'
        };
        current.dir = turnMap[current.dir];
      }

      setBotPos({ ...current });

      // Check star
      if (current.x === currentLevelConfig.star.x && current.y === currentLevelConfig.star.y) {
        gotStar = true;
        setHasCollectedStar(true);
      }
    }

    // Check goal
    if (current.x === currentLevelConfig.goal.x && current.y === currentLevelConfig.goal.y) {
      if (gotStar) {
        setGameResult('ยินดีด้วย! ผ่านด่านสมบูรณ์แบบ ได้ดาวครบ 3 ดวง! 🏆');
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } else {
        setGameResult('ถึงเส้นชัยแล้ว แต่ยังไม่ได้เก็บดาวสีทองนะ ลองใหม่อีกนิด!');
      }
    } else {
      setGameResult('คำสั่งหมดก่อนถึงคอมพิวเตอร์เป้าหมาย ลองเพิ่มบล็อกดูนะ!');
    }

    setIsRunningCode(false);
  };

  const filteredGames = GAMES_LIST.filter((game) => {
    if (selectedCategory === 'all') return true;
    return game.type === selectedCategory;
  });

  return (
    <div className="space-y-8 pb-16">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 rounded-3xl p-6 sm:p-8 text-white shadow-lg space-y-4">
        <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-amber-100">
          <Gamepad2 className="w-3.5 h-3.5" />
          <span>ศูนย์รวมเกมเพื่อการเรียนรู้และผ่อนคลายสมอง</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          ห้องเกมคลายเครียด & เสริมทักษะโค้ดดิ้ง (Breakroom)
        </h1>
        <p className="text-amber-50 text-xs sm:text-sm max-w-2xl leading-relaxed">
          รวมเกมสร้างสรรค์ ฝึกคิดแก้ปัญหาอย่างเป็นระบบ เช่น Scratch, Code.org, LightBot และ Google Interland พร้อมเล่นเกมเรียงบล็อกในเว็บได้ทันที!
        </p>

        {/* Responsible Gaming Notice Banner */}
        <div className="bg-amber-950/40 backdrop-blur-md rounded-2xl p-4 border border-amber-300/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs sm:text-sm">
          <div className="flex items-center gap-2.5">
            <ShieldAlert className="w-5 h-5 text-amber-300 shrink-0" />
            <div>
              <span className="font-extrabold text-amber-200 block">คำเตือนเรื่องเวลาเล่นเกมสำหรับเด็ก ป.6:</span>
              เล่นเกมได้ไม่เกิน 20-30 นาทีต่อครั้ง แล้วควรพักสายตา ดื่มน้ำ และช่วยเหลืองานบ้านผู้ปกครองนะจ๊ะ
            </div>
          </div>
          <button
            onClick={onOpenTimer}
            className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-amber-950 font-bold rounded-xl shadow-md transition active:scale-95 whitespace-nowrap self-end sm:self-auto text-xs"
          >
            ตั้งเวลาเตือนพักสายตา ⏱️
          </button>
        </div>
      </div>

      {/* Featured In-App Mini Game: Code Runner Bot */}
      <section className="bg-white rounded-3xl border-3 border-blue-200 shadow-md p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center text-2xl shadow-md">
              🤖
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full border border-emerald-300">
                  เล่นในเว็บได้เลย
                </span>
                <span className="text-xs font-bold text-slate-400">ระดับ ป.6</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                Code Runner Bot: ปริศนาเรียงคำสั่งหุ่นยนต์
              </h2>
            </div>
          </div>

          {/* Level Switcher */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500">เลือกด่าน:</span>
            {[1, 2, 3].map((lvl) => (
              <button
                key={lvl}
                onClick={() => {
                  setGameLevel(lvl);
                  resetGame(lvl);
                }}
                className={`w-8 h-8 rounded-xl font-bold text-xs transition ${
                  gameLevel === lvl
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-600">
          💡 <span className="font-bold text-slate-800">คำใบ้ด่านที่ {gameLevel}:</span> {currentLevelConfig.hint}
        </p>

        {/* Game Canvas & Control Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* 4x4 Grid Board */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center bg-slate-50 p-4 sm:p-6 rounded-3xl border-2 border-slate-200">
            <div className="grid grid-cols-4 gap-2 w-full max-w-[320px] aspect-square">
              {Array.from({ length: 16 }).map((_, idx) => {
                const cellX = idx % 4;
                const cellY = Math.floor(idx / 4);

                const isBot = botPos.x === cellX && botPos.y === cellY;
                const isGoal = currentLevelConfig.goal.x === cellX && currentLevelConfig.goal.y === cellY;
                const isStar = currentLevelConfig.star.x === cellX && currentLevelConfig.star.y === cellY;
                const isObs = currentLevelConfig.obstacles.some((o) => o.x === cellX && o.y === cellY);

                return (
                  <div
                    key={idx}
                    className={`relative rounded-2xl flex items-center justify-center font-bold text-xl border-2 transition-all ${
                      isBot
                        ? 'bg-blue-500 text-white border-blue-600 shadow-md scale-105 z-10'
                        : isObs
                        ? 'bg-rose-100 border-rose-300 text-rose-700'
                        : isGoal
                        ? 'bg-amber-100 border-amber-300 text-amber-800'
                        : 'bg-white border-slate-200'
                    }`}
                  >
                    {/* Bot Graphic with direction arrow */}
                    {isBot && (
                      <div className="flex flex-col items-center">
                        <span className="text-2xl">🤖</span>
                        <span className="text-[10px] font-black leading-none bg-blue-700 px-1 rounded text-white">
                          {botPos.dir === 'right' ? '▶' : botPos.dir === 'left' ? '◀' : botPos.dir === 'up' ? '▲' : '▼'}
                        </span>
                      </div>
                    )}

                    {/* Star Graphic */}
                    {!isBot && isStar && !hasCollectedStar && (
                      <span className="text-2xl animate-bounce-short">⭐</span>
                    )}

                    {/* Goal Graphic */}
                    {!isBot && isGoal && (
                      <span className="text-2xl" title="เส้นชัย">🖥️</span>
                    )}

                    {/* Obstacle Graphic */}
                    {!isBot && isObs && (
                      <span className="text-xl" title="สิ่งกีดขวาง">🧱</span>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="flex flex-wrap justify-center gap-4 text-[11px] font-bold text-slate-500 mt-4">
              <span className="flex items-center gap-1">🤖 หุ่นยนต์</span>
              <span className="flex items-center gap-1">⭐ ดาวคะแนน</span>
              <span className="flex items-center gap-1">🧱 สิ่งกีดขวาง</span>
              <span className="flex items-center gap-1">🖥️ เป้าหมาย</span>
            </div>
          </div>

          {/* Command Builder Panel */}
          <div className="lg:col-span-6 space-y-4">
            <div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
                1. เลือกบล็อกคำสั่ง (เรียงลำดับได้สูงสุด 8 บล็อก):
              </span>
              <div className="grid grid-cols-3 gap-2">
                <button
                  disabled={isRunningCode || commands.length >= 8}
                  onClick={() => handleAddCommand('FORWARD')}
                  className="p-3 bg-blue-50 hover:bg-blue-100 border-2 border-blue-200 text-blue-800 font-bold rounded-2xl text-xs flex flex-col items-center gap-1 transition active:scale-95 disabled:opacity-50"
                >
                  <span className="text-lg">⬆️</span>
                  <span>เดินหน้า 1 ช่อง</span>
                </button>

                <button
                  disabled={isRunningCode || commands.length >= 8}
                  onClick={() => handleAddCommand('TURN_LEFT')}
                  className="p-3 bg-amber-50 hover:bg-amber-100 border-2 border-amber-200 text-amber-900 font-bold rounded-2xl text-xs flex flex-col items-center gap-1 transition active:scale-95 disabled:opacity-50"
                >
                  <span className="text-lg">↪️</span>
                  <span>หมุนซ้าย 90°</span>
                </button>

                <button
                  disabled={isRunningCode || commands.length >= 8}
                  onClick={() => handleAddCommand('TURN_RIGHT')}
                  className="p-3 bg-emerald-50 hover:bg-emerald-100 border-2 border-emerald-200 text-emerald-900 font-bold rounded-2xl text-xs flex flex-col items-center gap-1 transition active:scale-95 disabled:opacity-50"
                >
                  <span className="text-lg">↩️</span>
                  <span>หมุนขวา 90°</span>
                </button>
              </div>
            </div>

            {/* Sequence of added commands */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-slate-500">
                  2. ลำดับคำสั่งที่ต่อไว้ ({commands.length}/8):
                </span>
                {commands.length > 0 && !isRunningCode && (
                  <button
                    onClick={handleRemoveLastCommand}
                    className="text-[11px] text-rose-600 hover:underline font-bold"
                  >
                    ลบบล็อกล่าสุด ✕
                  </button>
                )}
              </div>

              <div className="min-h-16 p-3 bg-slate-100 rounded-2xl border-2 border-slate-200 flex flex-wrap gap-1.5 items-center">
                {commands.length === 0 ? (
                  <span className="text-xs text-slate-400 italic mx-auto">
                    คลิกเลือกบล็อกด้านบนเพื่อเริ่มต้นเรียงโค้ด...
                  </span>
                ) : (
                  commands.map((cmd, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 bg-white border border-slate-300 rounded-xl text-xs font-bold shadow-2xs flex items-center gap-1 text-slate-800"
                    >
                      <span className="w-4 h-4 rounded-full bg-slate-200 text-[10px] flex items-center justify-center text-slate-600">
                        {i + 1}
                      </span>
                      {cmd === 'FORWARD' ? 'เดินหน้า' : cmd === 'TURN_LEFT' ? 'หมุนซ้าย' : 'หมุนขวา'}
                    </span>
                  ))
                )}
              </div>
            </div>

            {/* Action Buttons: Run & Reset */}
            <div className="flex gap-3 pt-2">
              <button
                disabled={commands.length === 0 || isRunningCode}
                onClick={runRobotCommands}
                className="flex-1 py-3 px-5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-extrabold rounded-2xl shadow-md transition active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 text-sm"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>{isRunningCode ? 'กำลังรันคำสั่ง...' : 'กดปุ่มรันคำสั่ง (Run Code) 🚀'}</span>
              </button>

              <button
                disabled={isRunningCode}
                onClick={() => resetGame()}
                className="py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-2xl text-xs flex items-center gap-1.5 transition active:scale-95"
                title="เริ่มด่านใหม่"
              >
                <RotateCcw className="w-4 h-4" />
                <span>รีเซ็ต</span>
              </button>
            </div>

            {/* Feedback message */}
            {gameResult && (
              <div
                className={`p-3.5 rounded-2xl border text-xs sm:text-sm font-bold animate-fade-in ${
                  gameResult.includes('ยินดีด้วย')
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                    : 'bg-amber-50 text-amber-900 border-amber-300'
                }`}
              >
                {gameResult}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* External Educational & Relaxing Games Grid */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-amber-500" />
              <span>คลังเกมการเรียนรู้และเว็บเกมแนะนำ</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              เลือกลิงก์เพื่อเปิดเล่นใน Tab ใหม่ ปลอดภัยและเหมาะกับนักเรียนระดับประถมศึกษา
            </p>
          </div>

          {/* Filter tabs */}
          <div className="flex flex-wrap gap-1.5 bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
            {[
              { id: 'all', label: 'ทั้งหมด' },
              { id: 'coding', label: 'เขียนโค้ด 💻' },
              { id: 'logic', label: 'ตรรกะ & ปลอดภัย 🛡️' },
              { id: 'puzzle', label: 'พัซเซิล 💡' },
              { id: 'arcade', label: 'คลายเครียด 🎮' }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Games Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredGames.map((game) => {
            return (
              <div
                key={game.id}
                className="group bg-white rounded-3xl border-2 border-slate-200 hover:border-amber-400 p-5 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Top Header of Card */}
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-sky-100 to-blue-50 border border-sky-200 flex items-center justify-center text-3xl shadow-xs group-hover:scale-105 transition-transform">
                      {game.thumbnail}
                    </div>
                    <div className="text-right">
                      <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                        {game.typeLabel}
                      </span>
                      <div className="flex items-center gap-0.5 justify-end mt-1 text-amber-400">
                        {Array.from({ length: game.stars }).map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>
                    </div>
                  </div>

                  <h3 className="text-base sm:text-lg font-black text-slate-900 group-hover:text-blue-600 transition">
                    {game.title}
                  </h3>

                  <p className="text-xs text-slate-500 font-medium mt-1">
                    ผู้ให้บริการ: <span className="text-slate-700 font-semibold">{game.provider}</span>
                  </p>

                  <p className="text-xs text-slate-600 mt-2 leading-relaxed line-clamp-3">
                    {game.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {game.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-sky-50 text-sky-700 border border-sky-100"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Card Action */}
                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                  <div className="text-[11px] text-slate-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-amber-500" />
                    <span>{game.timeRecommended}</span>
                  </div>

                  {game.isExternal ? (
                    <a
                      href={game.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-700 hover:to-sky-700 text-white font-bold text-xs rounded-xl shadow-xs transition flex items-center gap-1.5 group-hover:shadow-md"
                    >
                      <span>เปิดเล่น (Tab ใหม่)</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <button
                      onClick={() => {
                        window.scrollTo({ top: 300, behavior: 'smooth' });
                      }}
                      className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold text-xs rounded-xl shadow-xs transition flex items-center gap-1.5"
                    >
                      <span>เล่นในหน้านี้ ↑</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
