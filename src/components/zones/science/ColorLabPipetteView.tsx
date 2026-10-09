"use client";

import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { 
  RotateCcw, 
  Sparkles, 
  Trophy, 
  CheckCircle2, 
  Volume2, 
  Droplets,
  BookOpen,
  Shuffle,
  Plus,
  ArrowRight,
  Flame
} from "lucide-react";
import { sound } from "@/lib/sound";

interface ColorLabPipetteViewProps {
  onEarnStars: (amount: number) => void;
  audioEnabled: boolean;
  liteMode: boolean;
}

export interface ColorTube {
  id: string;
  name: string;
  colorType: "primary" | "tint";
  hex: string;
  gradientFrom: string;
  gradientTo: string;
  desc: string;
}

export const COLOR_TUBES: ColorTube[] = [
  {
    id: "red",
    name: "Merah Delima",
    colorType: "primary",
    hex: "#ef4444",
    gradientFrom: "from-red-500",
    gradientTo: "to-rose-600",
    desc: "Warna primer hangat lambang semangat dan keberanian.",
  },
  {
    id: "yellow",
    name: "Kuning Matahari",
    colorType: "primary",
    hex: "#facc15",
    gradientFrom: "from-amber-300",
    gradientTo: "to-yellow-500",
    desc: "Warna primer cerah seperti pancaran sinar mentari pagi.",
  },
  {
    id: "blue",
    name: "Biru Samudera",
    colorType: "primary",
    hex: "#0284c7",
    gradientFrom: "from-sky-400",
    gradientTo: "to-blue-600",
    desc: "Warna primer sejuk seperti kedalaman samudra nusantara.",
  },
  {
    id: "white",
    name: "Putih Salju",
    colorType: "tint",
    hex: "#f8fafc",
    gradientFrom: "from-slate-100",
    gradientTo: "to-white",
    desc: "Warna netral terang untuk menerangi dan melembutkan warna.",
  },
  {
    id: "black",
    name: "Hitam Pekat",
    colorType: "tint",
    hex: "#1e293b",
    gradientFrom: "from-slate-700",
    gradientTo: "to-slate-900",
    desc: "Warna netral gelap untuk memberi kedalaman bayangan pekat.",
  },
];

export interface ColorQuest {
  id: string;
  title: string;
  targetName: string;
  targetHex: string;
  ingredients: [string, string];
  scienceDesc: string;
  funFact: string;
}

export const COLOR_QUESTS: ColorQuest[] = [
  {
    id: "quest-orange",
    title: "Sirup Jeruk Segar",
    targetName: "Oranye Jingga",
    targetHex: "#f97316",
    ingredients: ["red", "yellow"],
    scienceDesc: "Penyatuan warna primer Merah + Kuning membentuk warna sekunder Oranye yang segar ceria!",
    funFact: "Buah jeruk dan wortel kaya beta-karoten yang memantulkan pigmen jingga alami.",
  },
  {
    id: "quest-green",
    title: "Ramuan Daun Rindang",
    targetName: "Hijau Zamrud",
    targetHex: "#10b981",
    ingredients: ["yellow", "blue"],
    scienceDesc: "Kuning hangat berpadu dengan Biru sejuk melahirkan warna sekunder Hijau alami klorofil tumbuhan!",
    funFact: "Zat hijau daun (klorofil) membantu tumbuhan berfotosintesis menghasilkan oksigen untuk kita bernapas.",
  },
  {
    id: "quest-purple",
    title: "Anggur Bintang Malam",
    targetName: "Ungu Violet",
    targetHex: "#8b5cf6",
    ingredients: ["red", "blue"],
    scienceDesc: "Pencampuran Merah Delima dengan Biru Samudera menghasilkan warna sekunder Ungu bangsawan yang anggun!",
    funFact: "Bunga anggrek ungu di hutan tropis Indonesia adalah salah satu keajaiban pigmen antosianin alam.",
  },
  {
    id: "quest-pink",
    title: "Kelopak Mawar Cantik",
    targetName: "Merah Muda (Pink)",
    targetHex: "#fb7185",
    ingredients: ["red", "white"],
    scienceDesc: "Merah terang yang diencerkan oleh Putih Salju membentuk warna pastel Merah Muda yang lembut!",
    funFact: "Warna merah muda sering dijumpai pada bulu burung flamingo dan kelopak bunga sakura.",
  },
  {
    id: "quest-grey",
    title: "Awan Mendung Ceria",
    targetName: "Abu-Abu Elegan",
    targetHex: "#64748b",
    ingredients: ["black", "white"],
    scienceDesc: "Dua warna netral Hitam + Putih menyatu harmonis membentuk warna monokrom Abu-Abu!",
    funFact: "Batu candi Borobudur terbuat dari batuan andesit vulkanik berwarna abu-abu kokoh tahan ribuan tahun.",
  },
];

export function calculateColorMix(idA: string, idB: string): { name: string; hex: string; desc: string } {
  const pair = [idA, idB].sort().join("-");
  switch (pair) {
    case "red-yellow":
      return {
        name: "Oranye Jingga",
        hex: "#f97316",
        desc: "Sintesis Merah + Kuning: Terbentuk warna sekunder Oranye yang hangat dan penuh energi kehidupan!",
      };
    case "blue-yellow":
      return {
        name: "Hijau Zamrud",
        hex: "#10b981",
        desc: "Sintesis Kuning + Biru: Terbentuk warna sekunder Hijau yang menyejukkan seperti rimbunnya hutan tropis!",
      };
    case "blue-red":
      return {
        name: "Ungu Violet",
        hex: "#8b5cf6",
        desc: "Sintesis Merah + Biru: Terbentuk warna sekunder Ungu magis yang memesona dan elegan!",
      };
    case "red-white":
      return {
        name: "Merah Muda (Pink)",
        hex: "#fb7185",
        desc: "Pencerahan Merah + Putih: Pigmen merah terurai menjadi warna pastel merah muda yang manis!",
      };
    case "blue-white":
      return {
        name: "Biru Muda Langit",
        hex: "#38bdf8",
        desc: "Pencerahan Biru + Putih: Terbentuk warna biru langit cerah seperti angkasa di siang hari!",
      };
    case "white-yellow":
      return {
        name: "Kuning Mentega",
        hex: "#fef08a",
        desc: "Pencerahan Kuning + Putih: Terbentuk warna kuning lembut yang hangat di mata!",
      };
    case "black-white":
      return {
        name: "Abu-Abu Elegan",
        hex: "#64748b",
        desc: "Netralisasi Hitam + Putih: Menghasilkan rona abu-abu monokromatik yang seimbang!",
      };
    case "black-red":
      return {
        name: "Merah Marun Pekat",
        hex: "#7f1d1d",
        desc: "Pemekatan Merah + Hitam: Menghasilkan rona marun gelap berwibawa!",
      };
    case "black-yellow":
      return {
        name: "Hijau Zaitun Gelap",
        hex: "#4d7c0f",
        desc: "Kombinasi Kuning + Hitam: Menghasilkan rona zaitun alami seperti buah zaitun matang!",
      };
    case "black-blue":
      return {
        name: "Biru Dongker Malam",
        hex: "#0f172a",
        desc: "Pemekatan Biru + Hitam: Menghasilkan warna biru malam samudra yang dalam!",
      };
    default:
      return {
        name: "Campuran Warna Unik",
        hex: "#a855f7",
        desc: "Kedua cairan berhasil larut dan membentuk senyawa larutan molekul warna baru!",
      };
  }
}

export default function ColorLabPipetteView({
  onEarnStars,
  audioEnabled,
  liteMode,
}: ColorLabPipetteViewProps) {
  const [isQuestMode, setIsQuestMode] = useState<boolean>(true);
  const [currentQuestIdx, setCurrentQuestIdx] = useState<number>(0);
  const [questSuccess, setQuestSuccess] = useState<boolean>(false);

  // Status Tabung & Cairan
  const [drippedColors, setDrippedColors] = useState<ColorTube[]>([]);
  const [isDrippingAnimation, setIsDrippingAnimation] = useState<boolean>(false);
  const [drippingTube, setDrippingTube] = useState<ColorTube | null>(null);
  const [liquidVolumeMl, setLiquidVolumeMl] = useState<number>(0);

  // Reaksi Pengadukan
  const [isFizzing, setIsFizzing] = useState<boolean>(false);
  const [isStirring, setIsStirring] = useState<boolean>(false);
  const [mixedResult, setMixedResult] = useState<{ name: string; hex: string; desc: string } | null>(null);

  const activeQuest = COLOR_QUESTS[currentQuestIdx];

  // Narasi suara saat beralih quest
  useEffect(() => {
    if (isQuestMode && audioEnabled) {
      sound.speak(`Tantangan Ramuan: Buat ${activeQuest.title}. Sentuh 2 warna di rak untuk mencampurnya!`);
    }
  }, [currentQuestIdx, isQuestMode]);

  // SENTUH TABUNG: Langsung meneteskan cairan ke labu (Game-like 1-tap interaction!)
  const handleTapTubeToDrip = (tube: ColorTube) => {
    if (mixedResult) {
      sound.playChime();
      if (audioEnabled) {
        sound.speak("Labu sudah berisi ramuan jadi. Tekan Cuci Labu untuk meracik resep baru!");
      }
      return;
    }
    if (drippedColors.length >= 2 || isDrippingAnimation) {
      sound.playChime();
      if (audioEnabled) {
        sound.speak("Labu sudah berisi 2 bahan warna. Tekan tombol Aduk Ramuan!");
      }
      return;
    }

    sound.playWaterDrop();
    setIsDrippingAnimation(true);
    setDrippingTube(tube);

    setTimeout(() => {
      sound.playWaterDrop();
      const nextColors = [...drippedColors, tube];
      setDrippedColors(nextColors);
      setLiquidVolumeMl(nextColors.length * 50);
      setIsDrippingAnimation(false);
      setDrippingTube(null);

      if (nextColors.length === 2) {
        setIsFizzing(true);
        sound.playFizz();
        if (audioEnabled) {
          sound.speak(`Warna ${tube.name} masuk! Dua warna sudah siap di dalam labu, sekarang tekan Aduk Ramuan!`);
        }
        setTimeout(() => setIsFizzing(false), 2400);
      } else {
        if (audioEnabled) {
          sound.speak(`Tetesan ${tube.name} masuk ke labu! Sekarang sentuh warna kedua.`);
        }
      }
    }, 400);
  };

  // Batang Pengaduk Kaca: Putar pusaran cairan & satukan warna
  const handleStirLiquid = () => {
    if (drippedColors.length < 2 || isStirring) return;

    setIsStirring(true);
    sound.playChime();

    setTimeout(() => {
      const result = calculateColorMix(drippedColors[0].id, drippedColors[1].id);
      setMixedResult(result);
      setIsStirring(false);

      if (isQuestMode) {
        const sortedDripped = drippedColors.map((c) => c.id).sort().join("-");
        const sortedQuest = [...activeQuest.ingredients].sort().join("-");

        if (sortedDripped === sortedQuest) {
          setQuestSuccess(true);
          sound.playCelebration();
          onEarnStars(15);
          if (!liteMode) {
            confetti({
              particleCount: 65,
              spread: 80,
              origin: { y: 0.6 },
              colors: [result.hex, "#facc15", "#38bdf8", "#10b981"],
            });
          }
          if (audioEnabled) {
            sound.speak(`Hebat sekali! Resep ${activeQuest.title} berhasil diracik!`);
          }
        } else {
          sound.playSocraticHint();
          if (audioEnabled) {
            sound.speak(`Hasil ramuan adalah ${result.name}. Coba periksa kembali resep yang diminta!`);
          }
        }
      } else {
        sound.playCelebration();
        if (audioEnabled) {
          sound.speak(`Bagus! ${result.name} berhasil tercipta!`);
        }
      }
    }, 1200);
  };

  // Cuci dan kosongkan labu
  const handleWashFlask = () => {
    sound.playChime();
    setDrippedColors([]);
    setLiquidVolumeMl(0);
    setIsFizzing(false);
    setIsStirring(false);
    setMixedResult(null);
    setQuestSuccess(false);

    if (audioEnabled) {
      sound.speak("Labu bersih kembali! Siap meracik ramuan baru.");
    }
  };

  // Ganti Quest berikutnya
  const handleNextQuest = () => {
    handleWashFlask();
    const nextIdx = (currentQuestIdx + 1) % COLOR_QUESTS.length;
    setCurrentQuestIdx(nextIdx);
  };

  return (
    <div className="max-w-4xl mx-auto px-3 sm:px-4 py-3 sm:py-5 space-y-4 font-sans select-none">
      
      {/* 1. TOP GAME HUD: Target Resep Ramuan */}
      <div className="bg-white/95 rounded-3xl p-3.5 sm:p-4 border-2 border-amber-200/90 shadow-md flex flex-wrap items-center justify-between gap-3">
        {/* Target Misi Card */}
        <div className="flex items-center gap-3">
          <div
            style={{ backgroundColor: activeQuest.targetHex }}
            className="w-12 h-12 rounded-2xl border-3 border-white shadow-md flex items-center justify-center shrink-0 animate-soft-bounce"
          >
            <Sparkles className="w-6 h-6 text-white drop-shadow" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-300 px-2 py-0.5 rounded-full">
                {isQuestMode ? `Misi #${currentQuestIdx + 1}` : "Eksplorasi"}
              </span>
              <span className="text-xs font-bold text-amber-600">
                +15 Bintang
              </span>
            </div>
            <h3 className="text-sm sm:text-base font-black text-slate-900 leading-tight">
              {isQuestMode ? activeQuest.title : "Racik Bebas Sesukamu!"}
            </h3>
            <p className="text-[11px] text-slate-500 font-semibold">
              Target: <span className="font-bold text-slate-800">{activeQuest.targetName}</span>
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {isQuestMode && (
            <button
              onClick={handleNextQuest}
              className="px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 font-bold text-xs border border-amber-200 btn-chunky flex items-center gap-1.5"
            >
              <Shuffle className="w-3.5 h-3.5 text-amber-600" />
              <span>Ganti Misi</span>
            </button>
          )}

          <button
            onClick={handleWashFlask}
            className="px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs border border-rose-200 btn-chunky flex items-center gap-1.5"
            title="Bersihkan Labu"
          >
            <RotateCcw className="w-3.5 h-3.5 text-rose-500" />
            <span>Cuci Labu</span>
          </button>
        </div>
      </div>

      {/* 2. RAK TABUNG CAIRAN AJAIB (SENTUH UNTUK LANGSUNG TETESKAN) */}
      <div className="bg-gradient-to-b from-amber-50 to-orange-50/40 rounded-3xl p-3.5 sm:p-5 border-2 border-amber-300 shadow-sm">
        <div className="flex items-center justify-between mb-2.5 px-1">
          <span className="text-xs font-black uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
            <Droplets className="w-4 h-4 text-amber-700" />
            <span>Sentuh Tabung untuk Meneteskan:</span>
          </span>
          <span className="text-[11px] font-bold text-slate-500">
            {drippedColors.length === 0
              ? "Pilih warna ke-1"
              : drippedColors.length === 1
              ? "Pilih warna ke-2"
              : "Siap diaduk!"}
          </span>
        </div>

        {/* 5 Vials Grid */}
        <div className="grid grid-cols-5 gap-2 sm:gap-3">
          {COLOR_TUBES.map((tube) => {
            const isDripping = drippingTube?.id === tube.id;
            return (
              <button
                key={tube.id}
                onClick={() => handleTapTubeToDrip(tube)}
                disabled={drippedColors.length >= 2 && !mixedResult}
                className={`group relative flex flex-col items-center justify-between p-2 sm:p-3 rounded-2xl border-2 sm:border-3 transition-all cursor-pointer btn-chunky ${
                  isDripping
                    ? "bg-amber-200 border-amber-500 scale-95"
                    : "bg-white hover:bg-amber-50 border-slate-200 hover:border-amber-400 shadow-sm"
                }`}
              >
                {/* Tabung Reaksi Kaca */}
                <div className="relative w-7 h-16 sm:w-10 sm:h-22 mb-1.5">
                  <div className="absolute inset-0 rounded-b-full border-2 border-slate-400/80 bg-slate-100/40 overflow-hidden flex flex-col justify-end shadow-inner">
                    <div
                      style={{ backgroundColor: tube.hex }}
                      className="w-full h-3/4 rounded-b-full opacity-90 transition-all group-hover:h-4/5"
                    />
                  </div>
                  {/* Kilau Kaca */}
                  <div className="absolute left-1 top-2 bottom-3 w-1 bg-white/70 rounded-full pointer-events-none" />
                </div>

                {/* Nama Warna */}
                <span className="text-[10px] sm:text-xs font-black text-slate-800 text-center leading-tight truncate w-full">
                  {tube.name.split(" ")[0]}
                </span>
                <span className="text-[8px] sm:text-[9px] font-bold text-slate-400 uppercase mt-0.5">
                  {tube.colorType === "primary" ? "Primer" : "Netral"}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. FORMULA RECIPE HUD + MEJA LABU ERLENMEYER (PANGGUNG UTAMA) */}
      <div className="bg-slate-900/90 rounded-3xl p-5 sm:p-8 border-4 border-amber-400/80 shadow-2xl relative overflow-hidden text-center text-white">
        
        {/* Background Ambient Glow */}
        <div className="absolute inset-0 bg-radial from-amber-500/10 via-transparent to-transparent pointer-events-none" />

        {/* FORMULA SLOTS: [ Warna 1 ] + [ Warna 2 ] = [ Hasil ] */}
        <div className="relative z-10 flex items-center justify-center gap-2 sm:gap-4 mb-6">
          {/* Slot 1 */}
          <div className="flex flex-col items-center">
            <div
              className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl border-2 flex items-center justify-center transition-all ${
                drippedColors[0]
                  ? "border-white shadow-lg scale-105"
                  : "border-dashed border-slate-600 bg-slate-800/80 text-slate-500"
              }`}
              style={{ backgroundColor: drippedColors[0]?.hex }}
            >
              {drippedColors[0] ? (
                <Droplets className="w-6 h-6 text-white drop-shadow" />
              ) : (
                <span className="text-xs font-bold">1</span>
              )}
            </div>
            <span className="text-[10px] font-bold text-slate-400 mt-1 truncate max-w-[70px]">
              {drippedColors[0]?.name || "Bahan 1"}
            </span>
          </div>

          <Plus className="w-5 h-5 text-amber-400 shrink-0" />

          {/* Slot 2 */}
          <div className="flex flex-col items-center">
            <div
              className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl border-2 flex items-center justify-center transition-all ${
                drippedColors[1]
                  ? "border-white shadow-lg scale-105"
                  : "border-dashed border-slate-600 bg-slate-800/80 text-slate-500"
              }`}
              style={{ backgroundColor: drippedColors[1]?.hex }}
            >
              {drippedColors[1] ? (
                <Droplets className="w-6 h-6 text-white drop-shadow" />
              ) : (
                <span className="text-xs font-bold">2</span>
              )}
            </div>
            <span className="text-[10px] font-bold text-slate-400 mt-1 truncate max-w-[70px]">
              {drippedColors[1]?.name || "Bahan 2"}
            </span>
          </div>

          <ArrowRight className="w-5 h-5 text-amber-400 shrink-0" />

          {/* Slot Hasil */}
          <div className="flex flex-col items-center">
            <div
              className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl border-2 flex items-center justify-center transition-all ${
                mixedResult
                  ? "border-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.8)] scale-110"
                  : "border-dashed border-slate-600 bg-slate-800/80 text-slate-500"
              }`}
              style={{ backgroundColor: mixedResult?.hex }}
            >
              {mixedResult ? (
                <Sparkles className="w-6 h-6 text-white drop-shadow animate-pulse" />
              ) : (
                <span className="text-base font-black">?</span>
              )}
            </div>
            <span className="text-[10px] font-bold text-amber-300 mt-1 truncate max-w-[80px]">
              {mixedResult?.name || "Hasil"}
            </span>
          </div>
        </div>

        {/* ERLENMEYER FLASK (STAGE VISUAL) */}
        <div className="relative flex flex-col items-center justify-center my-2">
          {/* Tetesan air animasi yang sedang jatuh */}
          {isDrippingAnimation && drippingTube && (
            <div 
              style={{ backgroundColor: drippingTube.hex }}
              className="w-4 h-6 rounded-full animate-bounce mb-2 shadow-lg"
            />
          )}

          {/* Erlenmeyer Flask SVG */}
          <div className="relative w-48 sm:w-56 aspect-[1/1.1] flex items-end justify-center">
            <svg viewBox="0 0 200 240" className="w-full h-full drop-shadow-2xl overflow-visible" fill="none">
              <defs>
                <clipPath id="flaskBodyClipGame">
                  <path d="M78 50 L30 190 C24 205 35 220 52 220 L148 220 C165 220 176 205 170 190 L122 50 Z" />
                </clipPath>
              </defs>

              {/* Cairan di Dalam Labu */}
              <g clipPath="url(#flaskBodyClipGame)">
                {liquidVolumeMl > 0 && (
                  <g className="transition-all duration-500">
                    {(() => {
                      const liquidY = liquidVolumeMl === 50 ? 175 : 130;
                      return (
                        <g>
                          {mixedResult ? (
                            <rect x="0" y={liquidY} width="200" height="150" fill={mixedResult.hex} opacity="0.9" />
                          ) : drippedColors.length === 2 ? (
                            <>
                              <rect x="0" y={liquidY} width="100" height="150" fill={drippedColors[0].hex} opacity="0.85" />
                              <rect x="100" y={liquidY} width="100" height="150" fill={drippedColors[1].hex} opacity="0.85" />
                            </>
                          ) : drippedColors.length === 1 ? (
                            <rect x="0" y={liquidY} width="200" height="150" fill={drippedColors[0].hex} opacity="0.85" />
                          ) : null}

                          {/* Riak Air */}
                          <path
                            d={`M20 ${liquidY} Q50 ${liquidY - 5} 100 ${liquidY} T180 ${liquidY} L180 230 L20 230 Z`}
                            fill="white"
                            opacity="0.2"
                          />
                        </g>
                      );
                    })()}
                  </g>
                )}
              </g>

              {/* Garis Kaca Labu */}
              <path
                d="M78 20 L78 50 L30 190 C24 205 35 220 52 220 L148 220 C165 220 176 205 170 190 L122 50 L122 20 Z"
                stroke="#94a3b8"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <rect x="72" y="14" width="56" height="8" rx="4" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="4" />

              {/* Pengaduk Kaca saat Berputar */}
              {isStirring && (
                <g className="animate-spin origin-[100px_100px]">
                  <line x1="70" y1="10" x2="130" y2="210" stroke="#cbd5e1" strokeWidth="7" strokeLinecap="round" opacity="0.8" />
                  <line x1="70" y1="10" x2="130" y2="210" stroke="white" strokeWidth="3" strokeLinecap="round" />
                </g>
              )}
            </svg>

            {/* Busa Reaksi */}
            {isFizzing && (
              <div className="absolute inset-x-4 bottom-8 top-16 pointer-events-none flex flex-col items-center justify-end z-20">
                <span className="px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black animate-bounce mb-2">
                  ✨ Reaksi Kimia!
                </span>
                <div className="w-full h-20 relative">
                  <div className="absolute bottom-2 left-6 w-4 h-4 rounded-full bg-white/90 border border-emerald-400 animate-ping" />
                  <div className="absolute bottom-6 right-8 w-4 h-4 rounded-full bg-white/90 border border-yellow-400 animate-bounce" />
                  <div className="absolute bottom-10 left-12 w-5 h-5 rounded-full bg-white/90 border border-rose-400 animate-pulse" />
                </div>
              </div>
            )}
          </div>

          {/* TOMBOL ADUK BESAR & MENYALA (MUNCUL OTOMATIS KETIKA 2 WARNA MASUK) */}
          <div className="mt-4">
            {drippedColors.length === 2 && !mixedResult && (
              <button
                onClick={handleStirLiquid}
                disabled={isStirring}
                className="py-3 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-500 hover:from-emerald-400 hover:to-teal-300 text-white font-black text-sm sm:text-base border-3 border-emerald-300 shadow-[0_0_25px_rgba(16,185,129,0.9)] animate-pulse btn-chunky flex items-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-5 h-5 text-yellow-300 animate-spin" />
                <span>{isStirring ? "Mengaduk Pusaran..." : "✨ ADUK RAMUAN AJAIB! ✨"}</span>
              </button>
            )}

            {/* HASIL REAKSI SUKSES */}
            {mixedResult && (
              <div className="bg-slate-800/90 rounded-2xl p-4 border-2 border-emerald-400 max-w-md mx-auto shadow-xl">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <span className="text-base font-black text-white">
                    {mixedResult.name}
                  </span>
                </div>
                <p className="text-xs text-slate-300 font-medium mb-3">
                  {mixedResult.desc}
                </p>

                {questSuccess ? (
                  <button
                    onClick={handleNextQuest}
                    className="py-2 px-5 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 font-black text-xs sm:text-sm border border-amber-500 shadow-md btn-chunky flex items-center justify-center gap-2 mx-auto"
                  >
                    <Trophy className="w-4 h-4 text-amber-800" />
                    <span>Lanjut ke Resep Berikutnya ➔</span>
                  </button>
                ) : (
                  <button
                    onClick={handleWashFlask}
                    className="py-2 px-4 rounded-xl bg-slate-700 hover:bg-slate-600 text-white font-bold text-xs border border-slate-500 btn-chunky mx-auto"
                  >
                    🔄 Coba Resep Lain
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 4. EDUKASI SINGKAT (RANGKUMAN WARNA) */}
      <div className="bg-white rounded-3xl p-4 border border-slate-200 text-xs text-slate-600 flex items-center gap-3">
        <BookOpen className="w-5 h-5 text-emerald-600 shrink-0" />
        <p className="leading-snug">
          <strong>Rumus Warna Dasar:</strong> Merah + Kuning = <strong>Oranye</strong> | Kuning + Biru = <strong>Hijau</strong> | Merah + Biru = <strong>Ungu</strong>.
        </p>
      </div>

    </div>
  );
}
