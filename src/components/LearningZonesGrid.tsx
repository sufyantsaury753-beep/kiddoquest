"use client";

import React from "react";
import { sound } from "@/lib/sound";
import { GraduationCap, ChevronRight } from "lucide-react";

interface LearningZonesGridProps {
  onSelectZone: (zoneId: string) => void;
  audioEnabled: boolean;
  liteMode: boolean;
}

/* =========================================================================
   100% PURE SVG GIANT GAME ICONS (NO TEXT EMOJIS, ZERO DEPENDENCIES)
   ========================================================================= */

// 1. Lab Sains: Botol Kimia / Labu Erlenmeyer Besar dengan Cairan Hijau & Gelembung
const ScienceFlaskIcon = () => (
  <svg
    viewBox="0 0 120 120"
    className="w-16 h-16 sm:w-24 sm:h-24 drop-shadow-lg group-hover:scale-110 group-hover:rotate-2 transition-transform duration-300"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="flaskLiquidGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#34d399" />
        <stop offset="100%" stopColor="#059669" />
      </linearGradient>
      <linearGradient id="flaskShineGrad" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="white" stopOpacity="0.8" />
        <stop offset="100%" stopColor="white" stopOpacity="0.1" />
      </linearGradient>
      <filter id="flaskGlowFilter" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#059669" floodOpacity="0.35" />
      </filter>
    </defs>

    {/* Cairan Kimia Dalam Tabung */}
    <path
      d="M44 56 L30 92 C27 99 32 106 40 106 L80 106 C88 106 93 99 90 92 L76 56 Z"
      fill="url(#flaskLiquidGrad)"
      filter="url(#flaskGlowFilter)"
    />

    {/* Gelombang Permukaan Cairan */}
    <path
      d="M44 56 Q52 52 60 56 T76 56"
      stroke="#6ee7b7"
      strokeWidth="3.5"
      strokeLinecap="round"
    />

    {/* Gelembung Udara Sains (Bubbles) */}
    <circle cx="52" cy="85" r="4.5" fill="#a7f3d0" opacity="0.9" />
    <circle cx="68" cy="74" r="5.5" fill="#a7f3d0" opacity="0.85" />
    <circle cx="56" cy="66" r="3.5" fill="#ecfdf5" opacity="0.9" />
    <circle cx="62" cy="42" r="4" fill="#34d399" opacity="0.8" />
    <circle cx="58" cy="28" r="3" fill="#10b981" opacity="0.75" />

    {/* Rangka Kaca Tabung Erlenmeyer */}
    <path
      d="M48 20 L48 42 L24 94 C20 103 26 112 36 112 L84 112 C94 112 100 103 96 94 L72 42 L72 20"
      stroke="#065f46"
      strokeWidth="6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    {/* Mulut Bibir Tabung Atas */}
    <rect
      x="42"
      y="14"
      width="36"
      height="8"
      rx="4"
      fill="#ccfbf1"
      stroke="#065f46"
      strokeWidth="5"
    />

    {/* Garis Ukur Mililiter */}
    <line x1="68" y1="70" x2="78" y2="70" stroke="#047857" strokeWidth="3" strokeLinecap="round" />
    <line x1="65" y1="82" x2="80" y2="82" stroke="#047857" strokeWidth="3" strokeLinecap="round" />
    <line x1="62" y1="94" x2="83" y2="94" stroke="#047857" strokeWidth="3" strokeLinecap="round" />

    {/* Kilau Pantulan Kaca Bening */}
    <path
      d="M34 94 L50 50 L52 30"
      stroke="url(#flaskShineGrad)"
      strokeWidth="4.5"
      strokeLinecap="round"
    />
    <circle cx="86" cy="98" r="3.5" fill="white" opacity="0.7" />
  </svg>
);

// 2. Hitung Ceria: Ilustrasi Angka Ceria "1 2 3" Tebal Berwarna-warni
const MathNumbersIcon = () => (
  <svg
    viewBox="0 0 120 120"
    className="w-16 h-16 sm:w-24 sm:h-24 drop-shadow-lg group-hover:scale-110 group-hover:-rotate-2 transition-transform duration-300"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="num1Grad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#38bdf8" />
        <stop offset="100%" stopColor="#0284c7" />
      </linearGradient>
      <linearGradient id="num2Grad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#fbbf24" />
        <stop offset="100%" stopColor="#ea580c" />
      </linearGradient>
      <linearGradient id="num3Grad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#fb7185" />
        <stop offset="100%" stopColor="#e11d48" />
      </linearGradient>
      <filter id="numShadow" x="-10%" y="-10%" width="130%" height="130%">
        <feDropShadow dx="0" dy="4" stdDeviation="2.5" floodColor="#000000" floodOpacity="0.25" />
      </filter>
    </defs>

    {/* Simbol Matematika Ceria Tambahan */}
    <g transform="translate(14, 16)">
      <rect x="7" y="0" width="4" height="18" rx="2" fill="#fb7185" opacity="0.85" />
      <rect x="0" y="7" width="18" height="4" rx="2" fill="#fb7185" opacity="0.85" />
    </g>
    <g transform="translate(92, 14)">
      <circle cx="8" cy="8" r="4" fill="#fbbf24" />
      <path d="M8 0 L8 16 M0 8 L16 8" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" />
    </g>

    {/* ANGKA 1 (Biru Langit - Kiri) */}
    <g transform="translate(10, 36) rotate(-8)" filter="url(#numShadow)">
      <path
        d="M6 14 C10 12 16 7 18 2 L26 2 L26 52 C26 55 24 57 21 57 L13 57 C10 57 8 55 8 52 L8 18 L4 21 C2 22 0 20 0 17 C0 15 3 14 6 14 Z"
        fill="url(#num1Grad)"
        stroke="#0369a1"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      <path d="M14 8 L22 4 L22 46" stroke="white" strokeWidth="2.5" strokeLinecap="round" opacity="0.65" />
    </g>

    {/* ANGKA 2 (Kuning Oranye - Tengah) */}
    <g transform="translate(42, 22)" filter="url(#numShadow)">
      <path
        d="M4 18 C4 8 13 0 24 0 C35 0 44 8 44 19 C44 28 36 37 26 46 L26 48 L41 48 C45 48 48 51 48 55 C48 59 45 62 41 62 L9 62 C4 62 1 58 3 53 L18 36 C27 27 31 22 31 17 C31 12 28 8 23 8 C18 8 15 11 14 16 C13 19 9 21 6 20 C4 19 4 18 4 18 Z"
        fill="url(#num2Grad)"
        stroke="#c2410c"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <path d="M18 6 C24 4 33 6 36 12" stroke="white" strokeWidth="3" strokeLinecap="round" opacity="0.75" />
    </g>

    {/* ANGKA 3 (Merah Stroberi - Kanan) */}
    <g transform="translate(74, 38) rotate(6)" filter="url(#numShadow)">
      <path
        d="M4 8 C4 3 8 0 14 0 L32 0 C36 0 39 3 39 7 C39 11 36 14 32 14 L20 14 C19 14 19 16 21 17 C26 18 38 21 38 34 C38 47 26 55 14 55 C5 55 0 49 0 44 C0 40 4 37 8 38 C12 39 14 43 18 43 C22 43 25 40 25 35 C25 29 19 26 13 26 C9 26 6 23 6 19 C6 15 8 12 11 11 L11 9 C8 9 4 8 4 8 Z"
        fill="url(#num3Grad)"
        stroke="#be123c"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      <path d="M18 5 L30 5" stroke="white" strokeWidth="2.5" strokeLinecap="round" opacity="0.65" />
      <path d="M22 32 C26 34 26 42 22 45" stroke="white" strokeWidth="2.5" strokeLinecap="round" opacity="0.65" />
    </g>
  </svg>
);

// 3. Tata Surya: Planet Saturnus Besar & Cincin Orbit Angkasa Bercahaya
const SolarPlanetIcon = () => (
  <svg
    viewBox="0 0 120 120"
    className="w-16 h-16 sm:w-24 sm:h-24 drop-shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="planetBodyGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#818cf8" />
        <stop offset="50%" stopColor="#6366f1" />
        <stop offset="100%" stopColor="#4338ca" />
      </linearGradient>
      <linearGradient id="saturnRingGrad" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#fde047" />
        <stop offset="50%" stopColor="#38bdf8" />
        <stop offset="100%" stopColor="#f472b6" />
      </linearGradient>
      <filter id="planetGlowFilter" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#3730a3" floodOpacity="0.4" />
      </filter>
    </defs>

    {/* Bintang-bintang Kosmik */}
    <path d="M20 25 L22 30 L27 32 L22 34 L20 39 L18 34 L13 32 L18 30 Z" fill="#fde047" />
    <path d="M102 20 L103 24 L107 25 L103 26 L102 30 L101 26 L97 25 L101 24 Z" fill="#38bdf8" />
    <circle cx="106" cy="90" r="4" fill="#f472b6" />
    <circle cx="16" cy="85" r="3" fill="#a5b4fc" />

    {/* Cincin Saturnus Bagian Belakang */}
    <path
      d="M10 58 C12 40 40 32 75 39 C98 44 114 54 112 64"
      stroke="url(#saturnRingGrad)"
      strokeWidth="12"
      strokeLinecap="round"
      opacity="0.9"
    />
    <path
      d="M10 58 C12 40 40 32 75 39 C98 44 114 54 112 64"
      stroke="#ffffff"
      strokeWidth="3"
      strokeLinecap="round"
      opacity="0.75"
    />

    {/* Bola Planet Saturnus */}
    <circle
      cx="60"
      cy="60"
      r="34"
      fill="url(#planetBodyGrad)"
      stroke="#312e81"
      strokeWidth="4"
      filter="url(#planetGlowFilter)"
    />

    {/* Lapisan Atmosfer Planet */}
    <path
      d="M30 52 C42 56 78 56 90 52"
      stroke="#a5b4fc"
      strokeWidth="4"
      strokeLinecap="round"
      opacity="0.7"
    />
    <path
      d="M28 66 C42 72 78 72 92 66"
      stroke="#4f46e5"
      strokeWidth="5"
      strokeLinecap="round"
      opacity="0.8"
    />
    <path
      d="M36 78 C46 82 74 82 84 78"
      stroke="#3730a3"
      strokeWidth="4"
      strokeLinecap="round"
      opacity="0.6"
    />

    {/* Cincin Saturnus Bagian Depan */}
    <path
      d="M112 64 C110 78 82 86 45 81 C22 76 6 66 8 56"
      stroke="url(#saturnRingGrad)"
      strokeWidth="12"
      strokeLinecap="round"
    />
    <path
      d="M112 64 C110 78 82 86 45 81 C22 76 6 66 8 56"
      stroke="#ffffff"
      strokeWidth="3"
      strokeLinecap="round"
      opacity="0.9"
    />

    {/* Pantulan Kilau Planet */}
    <path
      d="M40 38 C48 32 60 30 70 32"
      stroke="white"
      strokeWidth="3.5"
      strokeLinecap="round"
      opacity="0.65"
    />
  </svg>
);

// 4. Cerita Nusantara: Ilustrasi Buku Cerita Terbuka Magis Besar
const StoryBookIcon = () => (
  <svg
    viewBox="0 0 120 120"
    className="w-16 h-16 sm:w-24 sm:h-24 drop-shadow-lg group-hover:scale-110 group-hover:-rotate-2 transition-transform duration-300"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="bookCoverGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#a855f7" />
        <stop offset="100%" stopColor="#6b21a8" />
      </linearGradient>
      <linearGradient id="bookPageGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#fefce8" />
        <stop offset="100%" stopColor="#fef08a" />
      </linearGradient>
      <filter id="bookShadowFilter" x="-10%" y="-10%" width="130%" height="130%">
        <feDropShadow dx="0" dy="5" stdDeviation="3.5" floodColor="#581c87" floodOpacity="0.3" />
      </filter>
    </defs>

    {/* Kilau Bintang Dongeng di Atas Buku */}
    <path d="M60 14 L62 20 L68 22 L62 24 L60 30 L58 24 L52 22 L58 20 Z" fill="#facc15" />
    <path d="M36 24 L37 28 L41 29 L37 30 L36 34 L35 30 L31 29 L35 28 Z" fill="#c084fc" />
    <path d="M84 22 L85 26 L89 27 L85 28 L84 32 L83 28 L79 27 L83 26 Z" fill="#38bdf8" />

    {/* Sampul Keras Buku (Hardcover) */}
    <path
      d="M12 88 L58 98 L60 100 L62 98 L108 88 C112 87 114 83 112 79 L100 45 C99 41 95 38 91 39 L60 48 L29 39 C25 38 21 41 20 45 L8 79 C6 83 8 87 12 88 Z"
      fill="url(#bookCoverGrad)"
      stroke="#581c87"
      strokeWidth="4"
      strokeLinejoin="round"
      filter="url(#bookShadowFilter)"
    />

    {/* Tumpukan Lembar Halaman Kiri */}
    <path
      d="M16 82 L58 92 L58 48 L18 42 C16 42 14 44 14 46 Z"
      fill="#fde047"
      stroke="#7e22ce"
      strokeWidth="2.5"
    />

    {/* Tumpukan Lembar Halaman Kanan */}
    <path
      d="M104 82 L62 92 L62 48 L102 42 C104 42 106 44 106 46 Z"
      fill="#fde047"
      stroke="#7e22ce"
      strokeWidth="2.5"
    />

    {/* Lembar Halaman Terbuka Kiri */}
    <path
      d="M20 44 C34 40 48 44 59 49 L59 90 C48 85 34 82 20 84 Z"
      fill="url(#bookPageGrad)"
      stroke="#6b21a8"
      strokeWidth="3.5"
      strokeLinejoin="round"
    />

    {/* Lembar Halaman Terbuka Kanan */}
    <path
      d="M100 44 C86 40 72 44 61 49 L61 90 C72 85 86 82 100 84 Z"
      fill="url(#bookPageGrad)"
      stroke="#6b21a8"
      strokeWidth="3.5"
      strokeLinejoin="round"
    />

    {/* Punggung Buku */}
    <path d="M59 49 L61 49 L61 92 L59 92 Z" fill="#9333ea" />

    {/* Garis Tulisan Cerita & Gambar Dongeng */}
    <line x1="28" y1="56" x2="50" y2="58" stroke="#a855f7" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="28" y1="64" x2="52" y2="66" stroke="#a855f7" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="28" y1="72" x2="46" y2="74" stroke="#a855f7" strokeWidth="2.5" strokeLinecap="round" />

    <line x1="68" y1="58" x2="92" y2="56" stroke="#a855f7" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="68" y1="66" x2="90" y2="64" stroke="#a855f7" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="80" cy="74" r="5" fill="#f43f5e" />

    {/* Pita Pembatas Buku Emas */}
    <path
      d="M60 48 C64 54 62 70 66 84 L60 80 L54 84 C58 70 56 54 60 48 Z"
      fill="#f59e0b"
      stroke="#b45309"
      strokeWidth="1.5"
    />
  </svg>
);

// 5. Harmoni Nasional: Melodi Musik & Bendera Merah-Putih / Not Balok & Pianika Emas
const NationalMusicIcon = () => (
  <svg
    viewBox="0 0 120 120"
    className="w-16 h-16 sm:w-24 sm:h-24 drop-shadow-lg group-hover:scale-110 group-hover:rotate-2 transition-transform duration-300"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="musicRedGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#ef4444" />
        <stop offset="100%" stopColor="#b91c1c" />
      </linearGradient>
      <linearGradient id="musicGoldGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#fef08a" />
        <stop offset="50%" stopColor="#f59e0b" />
        <stop offset="100%" stopColor="#d97706" />
      </linearGradient>
      <linearGradient id="musicWhiteGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="100%" stopColor="#f1f5f9" />
      </linearGradient>
      <filter id="musicShadow" x="-10%" y="-10%" width="130%" height="130%">
        <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#991b1b" floodOpacity="0.3" />
      </filter>
    </defs>

    {/* Bintang-bintang & Kilau Melodi */}
    <path d="M22 24 L24 29 L29 31 L24 33 L22 38 L20 33 L15 31 L20 29 Z" fill="#facc15" />
    <path d="M100 20 L101 24 L105 25 L101 26 L100 30 L99 26 L95 25 L99 24 Z" fill="#facc15" />
    <circle cx="14" cy="72" r="3" fill="#fb7185" />
    <circle cx="106" cy="76" r="3.5" fill="#fde047" />

    {/* Pita Bendera Merah Putih Melengkung Elegan di Belakang */}
    <path
      d="M16 48 C36 30 84 30 104 48 C94 56 70 46 60 46 C50 46 26 56 16 48 Z"
      fill="url(#musicRedGrad)"
      stroke="#991b1b"
      strokeWidth="2"
    />
    <path
      d="M16 48 C26 56 50 46 60 46 C70 46 94 56 104 48 C94 56 72 52 60 52 C48 52 26 56 16 48 Z"
      fill="url(#musicWhiteGrad)"
      stroke="#cbd5e1"
      strokeWidth="1.5"
    />

    {/* Rangka Harpa / Lira Emas */}
    <path
      d="M32 94 C26 70 26 50 36 36 C42 27 50 28 50 36 C50 48 40 68 40 94"
      stroke="url(#musicGoldGrad)"
      strokeWidth="6"
      strokeLinecap="round"
      filter="url(#musicShadow)"
    />
    <path
      d="M88 94 C94 70 94 50 84 36 C78 27 70 28 70 36 C70 48 80 68 80 94"
      stroke="url(#musicGoldGrad)"
      strokeWidth="6"
      strokeLinecap="round"
      filter="url(#musicShadow)"
    />

    {/* Palang Dasar Pianika / Dudukan Harpa */}
    <rect
      x="28"
      y="90"
      width="64"
      height="18"
      rx="6"
      fill="url(#musicRedGrad)"
      stroke="#991b1b"
      strokeWidth="3.5"
      filter="url(#musicShadow)"
    />
    {/* Tuts Pianika Putih & Hitam */}
    <rect x="34" y="93" width="7" height="12" rx="2" fill="white" stroke="#64748b" strokeWidth="1" />
    <rect x="43" y="93" width="7" height="12" rx="2" fill="white" stroke="#64748b" strokeWidth="1" />
    <rect x="52" y="93" width="7" height="12" rx="2" fill="white" stroke="#64748b" strokeWidth="1" />
    <rect x="61" y="93" width="7" height="12" rx="2" fill="white" stroke="#64748b" strokeWidth="1" />
    <rect x="70" y="93" width="7" height="12" rx="2" fill="white" stroke="#64748b" strokeWidth="1" />
    <rect x="79" y="93" width="7" height="12" rx="2" fill="white" stroke="#64748b" strokeWidth="1" />
    {/* Tuts Hitam */}
    <rect x="39" y="93" width="4" height="7" rx="1" fill="#1e293b" />
    <rect x="48" y="93" width="4" height="7" rx="1" fill="#1e293b" />
    <rect x="66" y="93" width="4" height="7" rx="1" fill="#1e293b" />
    <rect x="75" y="93" width="4" height="7" rx="1" fill="#1e293b" />

    {/* Not Balok Ganda Utama Melayang */}
    <g transform="translate(42, 28) rotate(-6)" filter="url(#musicShadow)">
      {/* Batang & Bendera */}
      <rect x="8" y="10" width="4.5" height="28" rx="2" fill="#ef4444" stroke="#991b1b" strokeWidth="1" />
      <rect x="26" y="5" width="4.5" height="28" rx="2" fill="#ef4444" stroke="#991b1b" strokeWidth="1" />
      <path
        d="M8 10 L30 5 L30 11 L8 16 Z"
        fill="url(#musicGoldGrad)"
        stroke="#b45309"
        strokeWidth="1.5"
      />
      {/* Kepala Not Balok Kiri */}
      <ellipse cx="6" cy="38" rx="7" ry="5.5" transform="rotate(-25 6 38)" fill="#dc2626" stroke="#991b1b" strokeWidth="1.5" />
      <circle cx="5" cy="37" r="2" fill="#fca5a5" />
      {/* Kepala Not Balok Kanan */}
      <ellipse cx="24" cy="33" rx="7" ry="5.5" transform="rotate(-25 24 33)" fill="#dc2626" stroke="#991b1b" strokeWidth="1.5" />
      <circle cx="23" cy="32" r="2" fill="#fca5a5" />
    </g>

    {/* Not Balok Tunggal Kecil Berdenting Ceria */}
    <g transform="translate(80, 50) rotate(15)">
      <ellipse cx="6" cy="18" rx="5" ry="4" transform="rotate(-20 6 18)" fill="#f59e0b" />
      <rect x="9" y="3" width="3" height="15" rx="1.5" fill="#f59e0b" />
      <path d="M11 3 C16 4 19 8 18 11" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" />
    </g>
  </svg>
);

/* =========================================================================
   DEFINISI ZONA PETUALANGAN
   ========================================================================= */

export const LEARNING_ZONES = [
  {
    id: "sains",
    title: "Lab Sains",
    IconComponent: ScienceFlaskIcon,
    colorScheme: {
      bg: "bg-emerald-50 hover:bg-emerald-100/60",
      border: "border-emerald-400",
      shadow: "shadow-[0_4px_0_0_#059669] sm:shadow-[0_8px_0_0_#059669]",
    },
  },
  {
    id: "berhitung",
    title: "Hitung Ceria",
    IconComponent: MathNumbersIcon,
    colorScheme: {
      bg: "bg-rose-50 hover:bg-rose-100/60",
      border: "border-rose-400",
      shadow: "shadow-[0_4px_0_0_#e11d48] sm:shadow-[0_8px_0_0_#e11d48]",
    },
  },
  {
    id: "tatasurya",
    title: "Tata Surya",
    IconComponent: SolarPlanetIcon,
    colorScheme: {
      bg: "bg-indigo-50 hover:bg-indigo-100/60",
      border: "border-indigo-400",
      shadow: "shadow-[0_4px_0_0_#4338ca] sm:shadow-[0_8px_0_0_#4338ca]",
    },
  },
  {
    id: "cerita",
    title: "Literasi Nusantara",
    IconComponent: StoryBookIcon,
    colorScheme: {
      bg: "bg-purple-50 hover:bg-purple-100/60",
      border: "border-purple-400",
      shadow: "shadow-[0_4px_0_0_#9333ea] sm:shadow-[0_8px_0_0_#9333ea]",
    },
  },
  {
    id: "lagunasional",
    title: "Lagu Nasional",
    IconComponent: NationalMusicIcon,
    colorScheme: {
      bg: "bg-red-50 hover:bg-red-100/60",
      border: "border-red-400",
      shadow: "shadow-[0_4px_0_0_#dc2626] sm:shadow-[0_8px_0_0_#dc2626]",
    },
  },
];

export default function LearningZonesGrid({
  onSelectZone,
  audioEnabled: _audioEnabled,
  liteMode,
}: LearningZonesGridProps) {
  const handleZoneClick = (zoneId: string) => {
    sound.playChime();
    onSelectZone(zoneId);
  };

  return (
    <section className="py-6 sm:py-8">
      <div className="mb-5 sm:mb-8 text-center sm:text-left">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-display text-slate-800 tracking-tight">
          Pilih Petualangan Serumu!
        </h2>
      </div>

      {/* Grid Menu Ikon Game Anak (2 Kolom Kompak di HP dgn Kartu ke-5 Full-Span, 5 Kolom Sejajar di Desktop) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-5">
        {LEARNING_ZONES.map((zone, idx) => {
          const Icon = zone.IconComponent;
          return (
            <div
              key={zone.id}
              onClick={() => handleZoneClick(zone.id)}
              className={`group relative rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 flex flex-col items-center justify-center text-center border-3 sm:border-4 transition-all duration-200 cursor-pointer select-none ${
                zone.colorScheme.bg
              } ${zone.colorScheme.border} ${
                idx === 4 ? "col-span-2 sm:col-span-1" : ""
              } ${
                liteMode
                  ? "hover:opacity-95"
                  : `${zone.colorScheme.shadow} hover:-translate-y-1.5 hover:scale-[1.03] active:translate-y-1 active:shadow-none`
              }`}
            >
              {/* 1. Ikon SVG Murni Berukuran Pas di HP & Besar di Desktop */}
              <div className="mb-2 sm:mb-3 flex items-center justify-center">
                <Icon />
              </div>

              {/* 2. Judul Singkat, Tebal, dan Ceria */}
              <h3 className="text-sm sm:text-lg lg:text-xl font-black font-display text-slate-800 tracking-wide text-center group-hover:text-amber-800 transition-colors leading-tight">
                {zone.title}
              </h3>
            </div>
          );
        })}
      </div>

      {/* Kartu Khusus: Pusat Evaluasi Literasi SD 10 Mapel */}
      <div 
        onClick={() => handleZoneClick("evaluasi")}
        className={`mt-4 sm:mt-6 rounded-2xl sm:rounded-3xl p-4 sm:p-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white border-3 sm:border-4 border-indigo-700 shadow-[0_6px_0_0_#3730a3] sm:shadow-[0_8px_0_0_#3730a3] flex flex-col md:flex-row items-center justify-between gap-4 cursor-pointer select-none transition-all ${
          liteMode ? "hover:opacity-95" : "hover:-translate-y-1 hover:brightness-105 active:translate-y-0.5 active:shadow-none"
        }`}
      >
        <div className="flex items-center gap-3.5 sm:gap-5 text-center md:text-left">
          <div className="w-13 h-13 sm:w-16 sm:h-16 rounded-2xl bg-white/20 backdrop-blur-sm border-2 border-white/40 flex items-center justify-center flex-shrink-0 shadow-inner">
            <GraduationCap className="w-8 h-8 sm:w-10 sm:h-10 text-yellow-300" />
          </div>
          <div>
            <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-black bg-yellow-400 text-yellow-950 uppercase tracking-wider">
                Simulasi Ujian & Asesmen Mandiri
              </span>
              <span className="hidden sm:inline text-xs text-indigo-200 font-bold">
                Kurikulum Merdeka 2026
              </span>
            </div>
            <h3 className="text-base sm:text-2xl font-black font-display tracking-tight text-white">
              Pusat Evaluasi Literasi SD (10 Mapel Lengkap)
            </h3>
          </div>
        </div>

        <button className="flex items-center gap-2 px-5 py-2.5 sm:py-3 rounded-2xl bg-yellow-400 hover:bg-yellow-300 text-yellow-950 font-black text-xs sm:text-sm shadow-[0_3px_0_0_#b45309] btn-chunky flex-shrink-0">
          <span>Mulai Evaluasi</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
}
