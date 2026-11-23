import React from 'react';

const SNOWFLAKES = [
  { left: '4%', size: 12, duration: '11s', delay: '0s', opacity: 0.55 },
  { left: '11%', size: 16, duration: '14s', delay: '-3s', opacity: 0.45 },
  { left: '18%', size: 10, duration: '9.5s', delay: '-6s', opacity: 0.6 },
  { left: '26%', size: 14, duration: '13s', delay: '-2s', opacity: 0.4 },
  { left: '33%', size: 11, duration: '10.5s', delay: '-8s', opacity: 0.55 },
  { left: '41%', size: 15, duration: '15s', delay: '-4s', opacity: 0.4 },
  { left: '49%', size: 10, duration: '12s', delay: '-1s', opacity: 0.5 },
  { left: '56%', size: 14, duration: '13.5s', delay: '-7s', opacity: 0.45 },
  { left: '63%', size: 12, duration: '10s', delay: '-5s', opacity: 0.6 },
  { left: '71%', size: 16, duration: '14.5s', delay: '-9s', opacity: 0.4 },
  { left: '78%', size: 11, duration: '11.5s', delay: '-2.5s', opacity: 0.55 },
  { left: '85%', size: 13, duration: '12.5s', delay: '-6.5s', opacity: 0.45 },
  { left: '92%', size: 15, duration: '13s', delay: '-4.5s', opacity: 0.5 },
  { left: '97%', size: 10, duration: '9.8s', delay: '-1.5s', opacity: 0.55 }
];

export const ChristmasSnowfall: React.FC = () => {
  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden z-30 select-none"
      aria-hidden="true"
    >
      {SNOWFLAKES.map((flake, idx) => (
        <span
          key={idx}
          className="christmas-snowflake absolute -top-6 text-sky-200 drop-shadow-[0_1px_2px_rgba(148,163,184,0.45)]"
          style={{
            left: flake.left,
            fontSize: `${flake.size}px`,
            animationDuration: flake.duration,
            animationDelay: flake.delay,
            opacity: flake.opacity
          }}
        >
          ❄
        </span>
      ))}
    </div>
  );
};

export const ChristmasLightsSvg: React.FC<{ className?: string }> = ({ className = '' }) => {
  const bulbs = [
    { cx: 45, cy: 14, color: '#EF4444', glow: '#FCA5A5', delay: '0s' },
    { cx: 115, cy: 20, color: '#FBBF24', glow: '#FDE68A', delay: '0.4s' },
    { cx: 185, cy: 23, color: '#22C55E', glow: '#86EFAC', delay: '0.8s' },
    { cx: 255, cy: 21, color: '#38BDF8', glow: '#BAE6FD', delay: '0.2s' },
    { cx: 325, cy: 15, color: '#EF4444', glow: '#FCA5A5', delay: '0.6s' },
    { cx: 395, cy: 12, color: '#FBBF24', glow: '#FDE68A', delay: '1s' },
    { cx: 465, cy: 16, color: '#22C55E', glow: '#86EFAC', delay: '0.3s' },
    { cx: 535, cy: 22, color: '#EF4444', glow: '#FCA5A5', delay: '0.7s' },
    { cx: 605, cy: 23, color: '#FBBF24', glow: '#FDE68A', delay: '0.1s' },
    { cx: 675, cy: 19, color: '#38BDF8', glow: '#BAE6FD', delay: '0.5s' },
    { cx: 745, cy: 14, color: '#22C55E', glow: '#86EFAC', delay: '0.9s' },
    { cx: 815, cy: 14, color: '#EF4444', glow: '#FCA5A5', delay: '0.2s' },
    { cx: 885, cy: 20, color: '#FBBF24', glow: '#FDE68A', delay: '0.6s' },
    { cx: 955, cy: 23, color: '#22C55E', glow: '#86EFAC', delay: '0.4s' },
    { cx: 1025, cy: 20, color: '#EF4444', glow: '#FCA5A5', delay: '0.8s' },
    { cx: 1095, cy: 15, color: '#38BDF8', glow: '#BAE6FD', delay: '0.1s' },
    { cx: 1160, cy: 11, color: '#FBBF24', glow: '#FDE68A', delay: '0.5s' }
  ];

  return (
    <svg
      viewBox="0 0 1200 42"
      fill="none"
      preserveAspectRatio="none"
      className={`w-full h-8 sm:h-10 pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      <path
        d="M0,6 Q180,28 360,10 Q540,28 720,12 Q900,28 1080,12 Q1140,18 1200,6"
        stroke="#064E3B"
        strokeWidth="3"
        fill="none"
      />
      {bulbs.map((bulb, idx) => (
        <g key={idx}>
          <rect x={bulb.cx - 3} y={bulb.cy - 5} width="6" height="5" rx="1" fill="#1E293B" />
          <circle
            cx={bulb.cx}
            cy={bulb.cy + 5}
            r="8"
            fill={bulb.glow}
            opacity="0.35"
            className="christmas-twinkle"
            style={{ animationDelay: bulb.delay }}
          />
          <ellipse
            cx={bulb.cx}
            cy={bulb.cy + 5}
            rx="4.5"
            ry="6"
            fill={bulb.color}
            stroke="#1E293B"
            strokeWidth="1.5"
            className="christmas-twinkle"
            style={{ animationDelay: bulb.delay }}
          />
        </g>
      ))}
    </svg>
  );
};

export const ChristmasTreeCornerSvg: React.FC<{ flip?: boolean; className?: string }> = ({
  flip = false,
  className = ''
}) => (
  <svg
    viewBox="0 0 160 150"
    fill="none"
    className={`w-28 h-24 sm:w-36 sm:h-32 pointer-events-none select-none ${
      flip ? '-scale-x-100' : ''
    } ${className}`}
    aria-hidden="true"
  >
    {/* Snow hill base */}
    <ellipse cx="80" cy="142" rx="74" ry="12" fill="#F8FAFC" stroke="#1E293B" strokeWidth="2" />
    {/* Tree trunk */}
    <rect x="64" y="114" width="16" height="22" rx="3" fill="#78350F" stroke="#1E293B" strokeWidth="2" />
    {/* Tree layers */}
    <polygon points="72,62 24,118 120,118" fill="#15803D" stroke="#1E293B" strokeWidth="2.5" strokeLinejoin="round" />
    <polygon points="72,38 32,88 112,88" fill="#16A34A" stroke="#1E293B" strokeWidth="2.5" strokeLinejoin="round" />
    <polygon points="72,18 42,60 102,60" fill="#22C55E" stroke="#1E293B" strokeWidth="2.5" strokeLinejoin="round" />
    {/* Gold Star */}
    <polygon
      points="72,5 76,14 86,15 79,22 81,31 72,26 63,31 65,22 58,15 68,14"
      fill="#FBBF24"
      stroke="#1E293B"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    {/* Ornaments */}
    <circle cx="58" cy="52" r="5" fill="#EF4444" stroke="#1E293B" strokeWidth="1.8" />
    <circle cx="84" cy="76" r="5" fill="#FBBF24" stroke="#1E293B" strokeWidth="1.8" />
    <circle cx="52" cy="98" r="5.5" fill="#38BDF8" stroke="#1E293B" strokeWidth="1.8" />
    <circle cx="88" cy="106" r="5" fill="#EF4444" stroke="#1E293B" strokeWidth="1.8" />
    {/* Gift box */}
    <rect x="100" y="114" width="28" height="24" rx="4" fill="#DC2626" stroke="#1E293B" strokeWidth="2" />
    <rect x="111" y="114" width="6" height="24" fill="#FBBF24" />
    <rect x="100" y="123" width="28" height="5" fill="#FBBF24" />
    <path d="M114,114 C108,106 102,110 110,114 M114,114 C120,106 126,110 118,114" stroke="#FBBF24" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

export const SantaHatSvg: React.FC<{ className?: string }> = ({ className = 'w-10 h-10' }) => (
  <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
    <path
      d="M14,38 C16,18 32,10 48,18 C52,20 53,26 48,28 C44,30 43,35 45,38 Z"
      fill="#DC2626"
      stroke="#1E293B"
      strokeWidth="2.5"
      strokeLinejoin="round"
    />
    <rect x="10" y="36" width="38" height="11" rx="5.5" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2.5" />
    <circle cx="51" cy="23" r="6" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2.5" />
  </svg>
);
