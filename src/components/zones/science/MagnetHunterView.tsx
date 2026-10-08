"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import {
  Magnet,
  Star,
  RotateCcw,
  Volume2,
  CheckCircle2,
  Info,
  Trophy,
} from "lucide-react";
import { sound } from "@/lib/sound";

/* =========================================================================
   MAGNET HUNTER: 8 OBJEK EKSPLORASI SIFAT KEMAGNETAN (SVG)
   ========================================================================= */

export const PakuBesiSvg = () => (
  <svg viewBox="0 0 48 48" className="w-10 h-10 sm:w-12 sm:h-12" fill="none">
    <ellipse cx="24" cy="8" rx="10" ry="3.5" fill="#94a3b8" stroke="#475569" strokeWidth="1.5" />
    <path d="M21 10 L21 14 L27 14 L27 10 Z" fill="#64748b" />
    <path d="M21 14 L21 34 L24 44 L27 34 L27 14 Z" fill="#cbd5e1" stroke="#475569" strokeWidth="1.5" />
    <line x1="23" y1="14" x2="23" y2="34" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
    <line x1="25" y1="14" x2="25" y2="34" stroke="#64748b" strokeWidth="1" strokeLinecap="round" />
  </svg>
);

export const PenitiLogamSvg = () => (
  <svg viewBox="0 0 48 48" className="w-10 h-10 sm:w-12 sm:h-12" fill="none">
    <path d="M14 6 C14 6 22 4 28 6 C32 7.5 33 13 29 16 C25 18 16 18 14 14 Z" fill="#94a3b8" stroke="#475569" strokeWidth="1.5" />
    <circle cx="27" cy="11" r="2" fill="#475569" />
    <circle cx="16" cy="38" r="4.5" fill="none" stroke="#64748b" strokeWidth="2.5" />
    <path d="M15 14 L12 37" stroke="#cbd5e1" strokeWidth="3" strokeLinecap="round" />
    <path d="M15 14 L12 37" stroke="#475569" strokeWidth="1" strokeLinecap="round" />
    <path d="M20 38 L25 13" stroke="#cbd5e1" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M20 38 L25 13" stroke="#ffffff" strokeWidth="1" strokeLinecap="round" />
  </svg>
);

export const KlipKertasSvg = () => (
  <svg viewBox="0 0 48 48" className="w-10 h-10 sm:w-12 sm:h-12" fill="none">
    <path
      d="M17 18 L17 34 C17 38.5 21 41 24.5 41 C28 41 32 38.5 32 34 L32 13 C32 8.5 28 6 24 6 C20 6 16 8.5 16 13 L16 32 C16 34.5 18 36 21 36 C24 36 26 34.5 26 32 L26 18"
      stroke="#94a3b8"
      strokeWidth="4"
      strokeLinecap="round"
    />
    <path
      d="M17 18 L17 34 C17 38.5 21 41 24.5 41 C28 41 32 38.5 32 34 L32 13 C32 8.5 28 6 24 6 C20 6 16 8.5 16 13 L16 32 C16 34.5 18 36 21 36 C24 36 26 34.5 26 32 L26 18"
      stroke="#f8fafc"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

export const PensilKayuSvg = () => (
  <svg viewBox="0 0 48 48" className="w-10 h-10 sm:w-12 sm:h-12" fill="none">
    <path d="M10 38 L14 42 L18 38 L14 34 Z" fill="#f472b6" stroke="#db2777" strokeWidth="1" />
    <path d="M13 35 L17 39 L20 36 L16 32 Z" fill="#cbd5e1" stroke="#64748b" strokeWidth="1" />
    <path d="M16 32 L34 14 L38 18 L20 36 Z" fill="#facc15" stroke="#d97706" strokeWidth="1.5" />
    <line x1="18" y1="34" x2="36" y2="16" stroke="#eab308" strokeWidth="2" />
    <path d="M34 14 L42 6 L38 18 Z" fill="#fed7aa" stroke="#c2410c" strokeWidth="1" />
    <path d="M39 9 L42 6 L40 12 Z" fill="#1e293b" />
  </svg>
);

export const PenghapusKaretSvg = () => (
  <svg viewBox="0 0 48 48" className="w-10 h-10 sm:w-12 sm:h-12" fill="none">
    <path d="M8 26 L22 12 L30 18 L16 32 Z" fill="#38bdf8" stroke="#0284c7" strokeWidth="1.5" />
    <path d="M16 32 L30 18 L38 24 L24 38 Z" fill="#f472b6" stroke="#db2777" strokeWidth="1.5" />
    <path d="M8 26 L10 30 L18 36 L16 32 Z" fill="#0284c7" />
    <path d="M18 36 L26 42 L24 38 Z" fill="#db2777" />
    <line x1="22" y1="12" x2="24" y2="14" stroke="#ffffff" strokeWidth="1" />
  </svg>
);

export const KertasOrigamiSvg = () => (
  <svg viewBox="0 0 48 48" className="w-10 h-10 sm:w-12 sm:h-12" fill="none">
    <polygon points="6,30 24,10 42,30" fill="#06b6d4" stroke="#0891b2" strokeWidth="1.5" />
    <polygon points="12,30 24,18 36,30" fill="#22d3ee" stroke="#0891b2" strokeWidth="1.5" />
    <polygon points="6,30 24,38 42,30" fill="#3b82f6" stroke="#1d4ed8" strokeWidth="1.5" />
    <polygon points="18,30 24,24 30,30" fill="#f43f5e" stroke="#e11d48" strokeWidth="1.5" />
    <line x1="24" y1="10" x2="24" y2="38" stroke="#0e7490" strokeWidth="1.5" strokeDasharray="2 2" />
  </svg>
);

export const KoinEmasSvg = () => (
  <svg viewBox="0 0 48 48" className="w-10 h-10 sm:w-12 sm:h-12" fill="none">
    <circle cx="24" cy="24" r="18" fill="#eab308" stroke="#ca8a04" strokeWidth="2.5" />
    <circle cx="24" cy="24" r="14" fill="#facc15" stroke="#ca8a04" strokeWidth="1.5" />
    <polygon
      points="24,15 26.5,21 33,21.5 28,25.5 29.8,32 24,28 18.2,32 20,25.5 15,21.5 21.5,21"
      fill="#fef08a"
      stroke="#b45309"
      strokeWidth="1"
    />
    <path d="M12 16 A 16 16 0 0 1 28 9" stroke="#fef08a" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const DaunKeringSvg = () => (
  <svg viewBox="0 0 48 48" className="w-10 h-10 sm:w-12 sm:h-12" fill="none">
    <path
      d="M8 38 C8 38 10 24 22 14 C28 9 38 6 42 6 C42 6 39 16 34 22 C24 34 8 38 8 38 Z"
      fill="#d97706"
      stroke="#92400e"
      strokeWidth="2"
    />
    <path
      d="M14 34 C18 26 28 18 38 10"
      stroke="#78350f"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <line x1="22" y1="26" x2="28" y2="22" stroke="#92400e" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="26" y1="21" x2="33" y2="18" stroke="#92400e" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="18" y1="30" x2="22" y2="33" stroke="#92400e" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M8 38 L4 44" stroke="#78350f" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

export interface MagnetObject {
  id: string;
  name: string;
  material: string;
  isMagnetic: boolean;
  category: "Magnetik (Feromagnetik)" | "Non-Magnetik";
  desc: string;
  speechSuccess: string;
  speechFail: string;
  badgeBg: string;
  borderColor: string;
  bgColor: string;
  SvgComponent: React.ComponentType;
}

export const MAGNET_OBJECTS: MagnetObject[] = [
  {
    id: "paku_besi",
    name: "Paku Besi",
    material: "Logam Besi (Fe)",
    isMagnetic: true,
    category: "Magnetik (Feromagnetik)",
    desc: "Paku pertukangan dari besi pejal berkekuatan magnetik tinggi.",
    speechSuccess: "Hebat! Paku besi terbuat dari besi feromagnetik yang ditarik kuat oleh kutub magnet!",
    speechFail: "",
    badgeBg: "bg-emerald-100 text-emerald-800 border-emerald-300",
    borderColor: "border-emerald-400",
    bgColor: "bg-emerald-50",
    SvgComponent: PakuBesiSvg,
  },
  {
    id: "peniti_logam",
    name: "Peniti Logam",
    material: "Baja & Nikel",
    isMagnetic: true,
    category: "Magnetik (Feromagnetik)",
    desc: "Peniti pakaian berbahan kawat baja tahan karat berlapis nikel.",
    speechSuccess: "Bagus sekali! Peniti logam terbuat dari kawat baja berkandungan besi sehingga langsung menempel ke magnet!",
    speechFail: "",
    badgeBg: "bg-emerald-100 text-emerald-800 border-emerald-300",
    borderColor: "border-emerald-400",
    bgColor: "bg-emerald-50",
    SvgComponent: PenitiLogamSvg,
  },
  {
    id: "klip_kertas",
    name: "Klip Kertas",
    material: "Kawat Besi Baja",
    isMagnetic: true,
    category: "Magnetik (Feromagnetik)",
    desc: "Penjepit kertas berpegas lentur dari kawat besi berlapis seng.",
    speechSuccess: "Tepat sekali! Klip kertas terbuat dari kawat besi yang langsung ditarik oleh gaya magnet!",
    speechFail: "",
    badgeBg: "bg-emerald-100 text-emerald-800 border-emerald-300",
    borderColor: "border-emerald-400",
    bgColor: "bg-emerald-50",
    SvgComponent: KlipKertasSvg,
  },
  {
    id: "pensil_kayu",
    name: "Pensil Kayu",
    material: "Kayu & Grafit",
    isMagnetic: false,
    category: "Non-Magnetik",
    desc: "Alat tulis berbahan batang kayu pinus dan inti karbon grafit.",
    speechSuccess: "",
    speechFail: "Wah, pensil ini terbuat dari kayu! Kayu bukan benda feromagnetik, jadi tidak dapat ditarik magnet.",
    badgeBg: "bg-slate-100 text-slate-700 border-slate-300",
    borderColor: "border-slate-300",
    bgColor: "bg-slate-50",
    SvgComponent: PensilKayuSvg,
  },
  {
    id: "penghapus_karet",
    name: "Penghapus Karet",
    material: "Karet Sintetis",
    isMagnetic: false,
    category: "Non-Magnetik",
    desc: "Pembersih goresan pensil dari karet elastis non-logam.",
    speechSuccess: "",
    speechFail: "Penghapus terbuat dari karet elastis! Karet adalah benda non-magnetik dan tidak memiliki sifat kemagnetan.",
    badgeBg: "bg-slate-100 text-slate-700 border-slate-300",
    borderColor: "border-slate-300",
    bgColor: "bg-slate-50",
    SvgComponent: PenghapusKaretSvg,
  },
  {
    id: "kertas_origami",
    name: "Kertas Origami",
    material: "Serat Selulosa",
    isMagnetic: false,
    category: "Non-Magnetik",
    desc: "Lembaran kertas lipat dari bubur serat kayu pohon.",
    speechSuccess: "",
    speechFail: "Kertas terbuat dari serat selulosa tumbuhan! Benda ini non-magnetik sehingga magnet tidak bereaksi.",
    badgeBg: "bg-slate-100 text-slate-700 border-slate-300",
    borderColor: "border-slate-300",
    bgColor: "bg-slate-50",
    SvgComponent: KertasOrigamiSvg,
  },
  {
    id: "koin_emas",
    name: "Koin Emas",
    material: "Logam Mulia (Au)",
    isMagnetic: false,
    category: "Non-Magnetik",
    desc: "Uang logam berharga murni emas, logam mulia non-feromagnetik.",
    speechSuccess: "",
    speechFail: "Emas adalah logam mulia! Meskipun termasuk logam, emas bukan feromagnetik seperti besi, sehingga tidak tertarik magnet.",
    badgeBg: "bg-amber-100 text-amber-800 border-amber-300",
    borderColor: "border-amber-300",
    bgColor: "bg-amber-50",
    SvgComponent: KoinEmasSvg,
  },
  {
    id: "daun_kering",
    name: "Daun Kering",
    material: "Organik Alami",
    isMagnetic: false,
    category: "Non-Magnetik",
    desc: "Guguran daun tanaman dari bahan nabati alami.",
    speechSuccess: "",
    speechFail: "Daun adalah bahan organik alam! Magnet hanya menarik logam-logam tertentu seperti besi, nikel, dan kobalt.",
    badgeBg: "bg-orange-100 text-orange-800 border-orange-300",
    borderColor: "border-orange-300",
    bgColor: "bg-orange-50",
    SvgComponent: DaunKeringSvg,
  },
];

interface MagnetHunterViewProps {
  onEarnStars: (amount: number) => void;
  audioEnabled: boolean;
  liteMode: boolean;
}

export default function MagnetHunterView({
  onEarnStars,
  audioEnabled,
  liteMode,
}: MagnetHunterViewProps) {
  const [stuckMagnetIds, setStuckMagnetIds] = useState<string[]>([]);
  const [lastTestedMagnetId, setLastTestedMagnetId] = useState<string | null>(null);
  const [isMagnetShaking, setIsMagnetShaking] = useState<boolean>(false);
  const [hasEarnedMagnetStars, setHasEarnedMagnetStars] = useState<boolean>(false);

  const handleTestMagnetObject = (obj: MagnetObject) => {
    setLastTestedMagnetId(obj.id);

    if (obj.isMagnetic) {
      if (!stuckMagnetIds.includes(obj.id)) {
        const nextStuck = [...stuckMagnetIds, obj.id];
        setStuckMagnetIds(nextStuck);
        sound.playCelebration();

        if (nextStuck.length === 3 && !hasEarnedMagnetStars) {
          setHasEarnedMagnetStars(true);
          onEarnStars(45);
          sound.playCelebration();
          if (!liteMode) {
            confetti({
              particleCount: 60,
              spread: 80,
              origin: { y: 0.6 },
            });
          }
          if (audioEnabled) {
            sound.speak(
              "Luar biasa, Detektif Cilik! Kamu berhasil menemukan seluruh 3 benda feromagnetik yang menempel kuat pada kutub magnet!"
            );
          }
        } else {
          if (audioEnabled) {
            sound.speak(obj.speechSuccess);
          }
        }
      } else {
        sound.playChime();
        if (audioEnabled) {
          sound.speak(`${obj.name} sudah menempel di kutub magnet!`);
        }
      }
    } else {
      setIsMagnetShaking(true);
      setTimeout(() => setIsMagnetShaking(false), 600);
      sound.playSocraticHint();
      if (audioEnabled) {
        sound.speak(obj.speechFail);
      }
    }
  };

  const handleResetMagnetHunter = () => {
    setStuckMagnetIds([]);
    setLastTestedMagnetId(null);
    sound.playChime();
    if (audioEnabled) {
      sound.speak("Semua benda telah dilepaskan dari magnet. Silakan uji coba kembali!");
    }
  };

  const handleSpeakMagnetExplanation = () => {
    sound.playChime();
    if (!audioEnabled) return;
    sound.speak(
      "Magnet memiliki dua kutub: Kutub Utara berwarna merah dan Kutub Selatan berwarna biru. Magnet hanya menarik benda feromagnetik seperti besi dan baja, sedangkan kayu, karet, kertas, dan emas tidak ditarik magnet!"
    );
  };

  return (
    <div className="space-y-4">
      <style>{`
        @keyframes magnetShakeKeyframes {
          0%, 100% { transform: translateX(0) rotate(0deg); }
          20% { transform: translateX(-8px) rotate(-1.5deg); }
          40% { transform: translateX(8px) rotate(1.5deg); }
          60% { transform: translateX(-6px) rotate(-1deg); }
          80% { transform: translateX(6px) rotate(1deg); }
        }
        .animate-magnet-shake {
          animation: magnetShakeKeyframes 0.5s ease-in-out;
          transform-origin: center center;
        }
      `}</style>

      {/* Top Bar: Mission Progress, Star Reward, Audio Guide & Reset */}
      <div className="bg-slate-100 rounded-2xl p-3 border border-slate-200 flex flex-wrap items-center justify-between gap-2.5">
        <div className="flex items-center gap-2">
          <span className="text-xs sm:text-sm font-black text-slate-800 flex items-center gap-1.5">
            <Magnet className="w-4 h-4 text-rose-500" />
            <span>Benda Magnetik Terkumpul:</span>
            <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 border border-rose-300 font-black">
              {stuckMagnetIds.length} / 3
            </span>
          </span>

          <span className="text-[11px] sm:text-xs font-black text-amber-900 bg-amber-100 px-2.5 py-1 rounded-full border border-amber-300 flex items-center gap-1">
            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            +45 Bintang Misi
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleResetMagnetHunter}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 text-xs font-bold border border-slate-300 shadow-sm btn-chunky"
            title="Lepas semua benda dari magnet"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-600" />
            <span className="hidden sm:inline">Lepas Semua</span>
          </button>

          <button
            onClick={handleSpeakMagnetExplanation}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-rose-50 text-slate-800 text-xs font-bold border border-slate-300 shadow-sm btn-chunky"
            title="Dengarkan penjelasan Tobi"
          >
            <Volume2 className="w-4 h-4 text-rose-600" />
            <span className="hidden sm:inline">Dengarkan Tobi</span>
          </button>
        </div>
      </div>

      {/* Papan U-Magnet Interaktif (Pure SVG Canvas) */}
      <div className="bg-slate-950 rounded-3xl p-3 sm:p-5 border-4 border-slate-800 shadow-xl relative overflow-hidden">
        {/* Header Status di Atas Papan Magnet */}
        <div className="flex items-center justify-between gap-2 mb-3 px-1">
          <div className="flex items-center gap-2">
            <Magnet className="w-4 h-4 text-rose-400" />
            <span className="text-xs font-black tracking-wider text-slate-300 uppercase">
              Laboratorium Gaya Magnet Ladam (U-Magnet)
            </span>
          </div>

          <div>
            <span
              className={`text-[11px] font-black px-2.5 py-0.5 rounded-full border flex items-center gap-1 ${
                stuckMagnetIds.length === 3
                  ? "bg-emerald-950 text-emerald-300 border-emerald-500 animate-pulse"
                  : stuckMagnetIds.length > 0
                  ? "bg-rose-950 text-rose-300 border-rose-500"
                  : "bg-slate-900 text-slate-400 border-slate-700"
              }`}
            >
              <CheckCircle2 className="w-3 h-3" />
              {stuckMagnetIds.length === 3
                ? "Semua Benda Magnetik Ditemukan"
                : `${stuckMagnetIds.length} Benda Menempel`}
            </span>
          </div>
        </div>

        {/* SVG Canvas U-Magnet */}
        <div className="w-full flex items-center justify-center">
          <svg
            viewBox="0 0 600 320"
            className={`w-full h-auto max-h-[300px] sm:max-h-[340px] select-none ${
              isMagnetShaking ? "animate-magnet-shake" : ""
            }`}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="magnetSteelGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#94a3b8" />
                <stop offset="50%" stopColor="#64748b" />
                <stop offset="100%" stopColor="#475569" />
              </linearGradient>
              <linearGradient id="poleNorthGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#ef4444" />
                <stop offset="100%" stopColor="#dc2626" />
              </linearGradient>
              <linearGradient id="poleSouthGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#2563eb" />
              </linearGradient>
              <radialGradient id="sparkleGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#fef08a" stopOpacity="1" />
                <stop offset="100%" stopColor="#facc15" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Canvas Background */}
            <rect width="600" height="320" rx="20" fill="#0f172a" />
            <circle cx="20" cy="20" r="5" fill="#334155" stroke="#1e293b" strokeWidth="1.5" />
            <circle cx="580" cy="20" r="5" fill="#334155" stroke="#1e293b" strokeWidth="1.5" />
            <circle cx="20" cy="300" r="5" fill="#334155" stroke="#1e293b" strokeWidth="1.5" />
            <circle cx="580" cy="300" r="5" fill="#334155" stroke="#1e293b" strokeWidth="1.5" />

            {/* Garis-Garis Medan Magnet Tak Kasat Mata (Magnetic Flux Lines) */}
            <path
              d="M 235 215 C 235 270, 365 270, 365 215"
              stroke="#38bdf8"
              strokeWidth="2.5"
              strokeDasharray="5 5"
              fill="none"
              opacity="0.8"
            />
            <path
              d="M 220 215 C 220 300, 380 300, 380 215"
              stroke="#38bdf8"
              strokeWidth="1.5"
              strokeDasharray="4 4"
              fill="none"
              opacity="0.5"
            />
            <path
              d="M 250 215 C 250 245, 350 245, 350 215"
              stroke="#38bdf8"
              strokeWidth="2"
              strokeDasharray="3 3"
              fill="none"
              opacity="0.9"
            />
            <text x="300" y="275" fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="middle" opacity="0.8">
              GARIS MEDAN MAGNET (GAYA TARIK)
            </text>

            {/* Busur Baja Magnet Ladam (U-Magnet Arch) */}
            <path
              d="M 210 140 L 210 95 C 210 30, 390 30, 390 95 L 390 140 L 340 140 L 340 95 C 340 65, 260 65, 260 95 L 260 140 Z"
              fill="url(#magnetSteelGrad)"
              stroke="#334155"
              strokeWidth="2.5"
            />
            <path
              d="M 230 85 C 250 55, 350 55, 370 85"
              stroke="#ffffff"
              strokeWidth="3"
              strokeLinecap="round"
              opacity="0.4"
              fill="none"
            />

            {/* Kutub Utara (U - Merah) di Kaki Kiri */}
            <g>
              <rect x="210" y="140" width="50" height="75" rx="3" fill="url(#poleNorthGrad)" stroke="#b91c1c" strokeWidth="2" />
              <rect x="210" y="210" width="50" height="10" rx="1.5" fill="#cbd5e1" stroke="#64748b" strokeWidth="1.5" />
              <text x="235" y="180" fill="#ffffff" fontSize="26" fontWeight="900" textAnchor="middle">
                U
              </text>
              <text x="235" y="198" fill="#fecaca" fontSize="9" fontWeight="900" textAnchor="middle">
                UTARA
              </text>
            </g>

            {/* Kutub Selatan (S - Biru) di Kaki Kanan */}
            <g>
              <rect x="340" y="140" width="50" height="75" rx="3" fill="url(#poleSouthGrad)" stroke="#1d4ed8" strokeWidth="2" />
              <rect x="340" y="210" width="50" height="10" rx="1.5" fill="#cbd5e1" stroke="#64748b" strokeWidth="1.5" />
              <text x="365" y="180" fill="#ffffff" fontSize="26" fontWeight="900" textAnchor="middle">
                S
              </text>
              <text x="365" y="198" fill="#bfdbfe" fontSize="9" fontWeight="900" textAnchor="middle">
                SELATAN
              </text>
            </g>

            {/* Paku Besi menempel di Kutub U (Kiri) */}
            {stuckMagnetIds.includes("paku_besi") && (
              <g transform="translate(230, 220) rotate(-22)">
                <ellipse cx="0" cy="0" rx="9" ry="3" fill="#94a3b8" stroke="#475569" strokeWidth="1.5" />
                <path d="M -3 3 L -3 28 L 0 38 L 3 28 L 3 3 Z" fill="#cbd5e1" stroke="#475569" strokeWidth="1.5" />
                <line x1="-1" y1="3" x2="-1" y2="28" stroke="#ffffff" strokeWidth="1.5" />
                <circle cx="10" cy="5" r="4" fill="url(#sparkleGrad)" />
                <circle cx="-12" cy="18" r="3" fill="url(#sparkleGrad)" />
              </g>
            )}

            {/* Peniti Logam menempel di Kutub S (Kanan) */}
            {stuckMagnetIds.includes("peniti_logam") && (
              <g transform="translate(365, 220) rotate(22)">
                <path d="M -8 0 C -8 0 0 -2 6 0 C 10 1 11 6 7 9 C 3 11 -6 11 -8 7 Z" fill="#94a3b8" stroke="#475569" strokeWidth="1.5" />
                <circle cx="5" cy="5" r="1.5" fill="#475569" />
                <circle cx="-6" cy="30" r="3.5" fill="none" stroke="#64748b" strokeWidth="2" />
                <path d="M -7 7 L -9 29" stroke="#cbd5e1" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M -3 30 L 2 7" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" />
                <circle cx="-10" cy="12" r="4" fill="url(#sparkleGrad)" />
                <circle cx="8" cy="22" r="3" fill="url(#sparkleGrad)" />
              </g>
            )}

            {/* Klip Kertas menempel di Antara Kedua Kutub */}
            {stuckMagnetIds.includes("klip_kertas") && (
              <g transform="translate(300, 225) rotate(12)">
                <path
                  d="M -12 -12 L -12 12 C -12 18 -6 20 0 20 C 6 20 12 18 12 12 L 12 -15 C 12 -20 6 -22 0 -22 C -6 -22 -10 -20 -10 -15 L -10 10 C -10 13 -8 15 -4 15 C 0 15 4 13 4 10 L 4 -12"
                  stroke="#e2e8f0"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  fill="none"
                />
                <path
                  d="M -12 -12 L -12 12 C -12 18 -6 20 0 20 C 6 20 12 18 12 12 L 12 -15 C 12 -20 6 -22 0 -22 C -6 -22 -10 -20 -10 -15 L -10 10 C -10 13 -8 15 -4 15 C 0 15 4 13 4 10 L 4 -12"
                  stroke="#94a3b8"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  fill="none"
                />
                <circle cx="14" cy="-5" r="4" fill="url(#sparkleGrad)" />
                <circle cx="-14" cy="5" r="4" fill="url(#sparkleGrad)" />
              </g>
            )}
          </svg>
        </div>
      </div>

      {/* Socratic Feedback Box: Hasil Uji Terakhir */}
      {lastTestedMagnetId && (() => {
        const testedObj = MAGNET_OBJECTS.find((o) => o.id === lastTestedMagnetId);
        if (!testedObj) return null;
        return (
          <div
            className={`p-3.5 sm:p-4 rounded-2xl border-2 shadow-sm transition-all flex items-start gap-3 ${
              testedObj.isMagnetic
                ? "bg-emerald-50 border-emerald-400 text-emerald-950"
                : "bg-amber-50 border-amber-300 text-amber-950"
            }`}
          >
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                testedObj.isMagnetic
                  ? "bg-emerald-200 text-emerald-900"
                  : "bg-amber-200 text-amber-900"
              }`}
            >
              {testedObj.isMagnetic ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-700" />
              ) : (
                <Info className="w-5 h-5 text-amber-700" />
              )}
            </div>
            <div className="flex-1">
              <h5 className="font-black text-sm mb-0.5">
                {testedObj.isMagnetic
                  ? `SNAP & STICK! ${testedObj.name} Tertarik Kuat ke Magnet`
                  : `${testedObj.name} Tidak Tertarik Magnet`}
              </h5>
              <p className="text-xs font-medium leading-relaxed">
                {testedObj.isMagnetic
                  ? testedObj.speechSuccess
                  : testedObj.speechFail}
              </p>
            </div>
          </div>
        );
      })()}

      {/* Celebration Banner when 3/3 Objects Found */}
      {stuckMagnetIds.length === 3 && (
        <div className="bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 rounded-2xl p-4 border-2 border-amber-600 shadow-lg text-slate-950 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white text-amber-600 flex items-center justify-center shadow-md shrink-0">
              <Trophy className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <h4 className="font-black text-base sm:text-lg leading-tight">
                Misi Detektif Magnet Selesai!
              </h4>
              <p className="text-xs sm:text-sm font-bold text-amber-950">
                Kamu berhasil menemukan ketiga benda feromagnetik! (+45 Bintang Didapatkan)
              </p>
            </div>
          </div>
          <button
            onClick={handleResetMagnetHunter}
            className="px-4 py-2 rounded-xl bg-slate-950 text-white font-black text-xs sm:text-sm border-2 border-slate-800 shadow-md flex items-center gap-1.5 btn-chunky"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Ulangi Eksperimen</span>
          </button>
        </div>
      )}

      {/* Meja Percobaan: 8 Kartu Objek Eksplorasi Sifat Kemagnetan */}
      <div>
        <div className="flex items-center justify-between mb-3 px-1">
          <div className="flex items-center gap-1.5">
            <Magnet className="w-4 h-4 text-rose-500" />
            <span className="text-xs font-black text-slate-800 uppercase tracking-wide">
              Meja Percobaan (Sentuh Benda untuk Menguji):
            </span>
          </div>
          <span className="text-[11px] font-bold text-slate-500">
            Temukan 3 benda yang ditarik magnet
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
          {MAGNET_OBJECTS.map((obj) => {
            const isStuck = stuckMagnetIds.includes(obj.id);
            const SvgIcon = obj.SvgComponent;
            return (
              <div
                key={obj.id}
                onClick={() => handleTestMagnetObject(obj)}
                className={`p-3 rounded-2xl border-2 transition-all cursor-pointer btn-chunky flex flex-col justify-between ${
                  isStuck
                    ? "bg-emerald-50 border-emerald-400 shadow-[0_3px_0_0_#059669]"
                    : "bg-white border-slate-200 hover:border-slate-300 shadow-sm"
                }`}
              >
                <div>
                  {/* Status Badge */}
                  <div className="flex items-center justify-between mb-1.5">
                    <span className={`text-[10px] font-black px-1.5 py-0.5 rounded-md border ${
                      isStuck
                        ? "bg-emerald-200 text-emerald-950 border-emerald-400"
                        : obj.badgeBg
                    }`}>
                      {isStuck ? "Menempel di Magnet" : obj.category}
                    </span>
                  </div>

                  {/* Visual SVG Icon */}
                  <div className="flex items-center justify-center py-2">
                    <SvgIcon />
                  </div>

                  {/* Title & Material */}
                  <h5 className="font-black text-xs sm:text-sm text-slate-900 leading-tight">
                    {obj.name}
                  </h5>
                  <p className="text-[10px] text-slate-500 font-bold mb-1">
                    {obj.material}
                  </p>
                  <p className="text-[10px] text-slate-600 line-clamp-2 leading-snug">
                    {obj.desc}
                  </p>
                </div>

                {/* Action Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleTestMagnetObject(obj);
                  }}
                  className={`mt-2.5 py-1.5 px-2 rounded-xl text-xs font-black border flex items-center justify-center gap-1.5 btn-chunky transition-all ${
                    isStuck
                      ? "bg-emerald-500 text-white border-emerald-600 shadow-[0_2px_0_0_#065f46]"
                      : "bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300"
                  }`}
                >
                  {isStuck ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Menempel</span>
                    </>
                  ) : (
                    <>
                      <Magnet className="w-3.5 h-3.5 text-rose-500" />
                      <span>Uji Tempel</span>
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Catatan Konsep Edukatif IPAS SD: Teori Kemagnetan */}
      <div className="bg-gradient-to-r from-rose-50 to-pink-50 rounded-2xl p-4 border-2 border-rose-200 shadow-sm">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-rose-200 text-rose-900 flex items-center justify-center flex-shrink-0 mt-0.5">
            <Info className="w-5 h-5" />
          </div>
          <div>
            <h5 className="font-black text-sm text-slate-900 mb-1">
              Konsep Sifat Kemagnetan Benda (IPAS SD Kelas 4 & 5)
            </h5>
            <p className="text-xs text-slate-700 leading-relaxed font-medium">
              1. <strong>Benda Feromagnetik</strong> adalah benda yang ditarik sangat kuat oleh gaya magnet. Contohnya: paku besi, peniti baja, dan klip kertas logam.
              <br />
              2. <strong>Benda Non-Magnetik</strong> adalah benda yang tidak dapat ditarik oleh magnet. Terdiri dari bahan kayu, karet, kertas, plastik, dan bahkan logam mulia tertentu seperti emas murni.
              <br />
              3. <strong>Kutub Magnet</strong> selalu berpasangan: Kutub Utara (U/Merah) dan Kutub Selatan (S/Biru). Gaya tarik magnet paling kuat terletak pada kedua ujung kutubnya!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
