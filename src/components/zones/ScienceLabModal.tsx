"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { 
  X, 
  FlaskConical, 
  RotateCcw, 
  Sparkles, 
  Volume2, 
  Sun, 
  CloudRain, 
  Droplets,
  Star,
  Target,
  Trophy,
  CheckCircle2,
  HelpCircle,
  Orbit
} from "lucide-react";
import { sound } from "@/lib/sound";

interface ScienceLabModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEarnStars: (amount: number) => void;
  audioEnabled: boolean;
  liteMode: boolean;
  onOpenSolarSystem?: () => void;
}

export type ColorType = "red" | "yellow" | "blue" | "white" | "black";

interface ColorRecipeQuest {
  id: string;
  targetName: string;
  hint: string;
  colors: [ColorType, ColorType];
  prompt: string;
  icon: string;
}

const COLOR_QUESTS: ColorRecipeQuest[] = [
  {
    id: "pink",
    targetName: "Merah Muda (Pink)",
    hint: "Campurkan warna Merah dengan Putih pencerah!",
    colors: ["red", "white"],
    prompt: "Tobi ingin mewarnai kelopak bunga mawar yang indah! Bisakah kamu meracik warna Pink?",
    icon: "🌸",
  },
  {
    id: "sky-blue",
    targetName: "Biru Langit (Cyan)",
    hint: "Campurkan warna Biru dengan Putih pencerah!",
    colors: ["blue", "white"],
    prompt: "Tobi ingin menggambar langit cerah di siang hari! Bisakah kamu meracik warna Biru Langit?",
    icon: "☁️",
  },
  {
    id: "orange",
    targetName: "Oranye / Jingga",
    hint: "Campurkan warna Merah dengan Kuning!",
    colors: ["red", "yellow"],
    prompt: "Tobi ingin mewarnai buah jeruk manis yang segar! Bisakah kamu meracik warna Oranye?",
    icon: "🍊",
  },
  {
    id: "green",
    targetName: "Hijau Segar",
    hint: "Campurkan warna Kuning dengan Biru!",
    colors: ["yellow", "blue"],
    prompt: "Tobi ingin melukis daun-daun pepohonan di hutan! Bisakah kamu meracik warna Hijau?",
    icon: "🍃",
  },
  {
    id: "purple",
    targetName: "Ungu Anggur",
    hint: "Campurkan warna Merah dengan Biru!",
    colors: ["red", "blue"],
    prompt: "Tobi ingin mewarnai buah anggur manis yang lezat! Bisakah kamu meracik warna Ungu?",
    icon: "🍇",
  },
  {
    id: "brown",
    targetName: "Cokelat Tanah",
    hint: "Campurkan warna Kuning dengan Hitam penggelap!",
    colors: ["yellow", "black"],
    prompt: "Tobi ingin melukis batang pohon yang kokoh dan tanah subur! Bisakah kamu meracik warna Cokelat?",
    icon: "🪵",
  },
  {
    id: "maroon",
    targetName: "Merah Marun",
    hint: "Campurkan warna Merah dengan Hitam penggelap!",
    colors: ["red", "black"],
    prompt: "Tobi ingin mewarnai jubah pahlawan yang gagah! Bisakah kamu meracik warna Merah Marun?",
    icon: "🦸",
  },
  {
    id: "navy",
    targetName: "Biru Dongker (Navy)",
    hint: "Campurkan warna Biru dengan Hitam penggelap!",
    colors: ["blue", "black"],
    prompt: "Tobi ingin melukis langit malam samudera bertabur bintang! Bisakah kamu meracik warna Biru Dongker?",
    icon: "🌌",
  },
  {
    id: "gray",
    targetName: "Abu-abu",
    hint: "Campurkan warna Hitam dengan Putih!",
    colors: ["black", "white"],
    prompt: "Tobi ingin mewarnai antena robot sahabatnya! Bisakah kamu meracik warna Abu-abu?",
    icon: "🤖",
  },
];

export default function ScienceLabModal({
  isOpen,
  onClose,
  onEarnStars,
  audioEnabled,
  liteMode,
  onOpenSolarSystem,
}: ScienceLabModalProps) {
  const [activeTab, setActiveTab] = useState<"colors" | "waterCycle">("colors");

  // Color mixing state
  const [selectedColor1, setSelectedColor1] = useState<ColorType | null>(null);
  const [selectedColor2, setSelectedColor2] = useState<ColorType | null>(null);
  const [mixedColor, setMixedColor] = useState<{
    name: string;
    hex: string;
    desc: string;
  } | null>(null);

  // Recipe Quest Mode
  const [isRecipeMode, setIsRecipeMode] = useState(false);
  const [currentQuestIdx, setCurrentQuestIdx] = useState(0);
  const [questSuccess, setQuestSuccess] = useState(false);

  // Water cycle state
  const [waterStep, setWaterStep] = useState<1 | 2 | 3>(1);

  if (!isOpen) return null;

  const activeQuest = COLOR_QUESTS[currentQuestIdx];

  const handleSelectColor = (color: ColorType) => {
    sound.playChime();
    if (!selectedColor1) {
      setSelectedColor1(color);
      setMixedColor(null);
    } else if (!selectedColor2) {
      setSelectedColor2(color);
      mixColors(selectedColor1, color);
    }
  };

  const mixColors = (c1: ColorType, c2: ColorType) => {
    let result = { name: "", hex: "", desc: "" };

    const pair = [c1, c2].sort().join("+");

    // Comprehensive combinations with Red, Yellow, Blue, White, Black
    if (c1 === c2) {
      if (c1 === "red") result = { name: "Merah Murni", hex: "#ef4444", desc: "Warna merah tetap merah terang menyala!" };
      else if (c1 === "yellow") result = { name: "Kuning Murni", hex: "#facc15", desc: "Warna kuning tetap cerah seperti sinar matahari!" };
      else if (c1 === "blue") result = { name: "Biru Murni", hex: "#3b82f6", desc: "Warna biru tetap sejuk seperti air samudera!" };
      else if (c1 === "white") result = { name: "Putih Kristal", hex: "#f8fafc", desc: "Warna putih bersih murni seperti salju!" };
      else if (c1 === "black") result = { name: "Hitam Pekat", hex: "#0f172a", desc: "Warna hitam misterius seperti kegelapan malam!" };
    } 
    // Red combinations
    else if (pair === "red+white") {
      result = {
        name: "Merah Muda / Pink Manis",
        hex: "#f472b6",
        desc: "Ajaib! Merah yang berani diberi Putih pencerah menjadi Merah Muda (Pink) yang manis seperti bunga mawar mekar!",
      };
    } else if (pair === "black+red") {
      result = {
        name: "Merah Marun Pekat",
        hex: "#881337",
        desc: "Gagah! Merah diberi sentuhan Hitam penggelap menjadi Merah Marun yang dalam dan berwibawa!",
      };
    } else if (pair === "red+yellow") {
      result = {
        name: "Jingga / Oranye Jeruk Segar",
        hex: "#f97316",
        desc: "Ajaib! Merah yang berani dicampur Kuning yang ceria menghasilkan Oranye yang hangat seperti buah jeruk manis!",
      };
    } else if (pair === "blue+red") {
      result = {
        name: "Ungu Anggur Megah",
        hex: "#a855f7",
        desc: "Hebat! Merah dan Biru bersatu menjadi warna Ungu yang anggun seperti buah anggur lezat!",
      };
    }
    // Blue combinations
    else if (pair === "blue+white") {
      result = {
        name: "Biru Langit / Cyan Cerah",
        hex: "#38bdf8",
        desc: "Keren sekali! Biru tua ditambah Putih pencerah berubah menjadi Biru Langit cerah seperti angkasa di siang hari!",
      };
    } else if (pair === "black+blue") {
      result = {
        name: "Biru Dongker / Navy Malam",
        hex: "#1e1b4b",
        desc: "Misterius dan indah! Biru dicampur Hitam menjadi Biru Dongker pekat seperti langit malam bertabur bintang!",
      };
    } else if (pair === "blue+yellow") {
      result = {
        name: "Hijau Dedaunan Segar",
        hex: "#22c55e",
        desc: "Luar biasa! Kuning cerah bertemu Biru sejuk melahirkan warna Hijau yang menyejukkan seperti dedaunan hutan tropis!",
      };
    }
    // Yellow combinations
    else if (pair === "white+yellow") {
      result = {
        name: "Kuning Pastel / Krim Lembut",
        hex: "#fef08a",
        desc: "Lembut sekali! Kuning dicampur Putih pencerah menjadi Kuning Pastel yang manis seperti es krim vanila!",
      };
    } else if (pair === "black+yellow") {
      result = {
        name: "Cokelat Tanah / Zaitun Alami",
        hex: "#78350f",
        desc: "Hebat! Kuning terang diberi Hitam penggelap menjadi warna Cokelat hangat seperti tanah subur dan batang pohon!",
      };
    }
    // Black & White
    else if (pair === "black+white") {
      result = {
        name: "Abu-abu Perak / Awan Mendung",
        hex: "#64748b",
        desc: "Menakjubkan! Hitam dan Putih bersatu menjadi Abu-abu netral seperti bebatuan gunung dan awan mendung!",
      };
    } else {
      result = {
        name: "Campuran Warna Khusus",
        hex: "#6b7280",
        desc: "Dua cairan warna telah tercampur rata di dalam tabung reaksi kimia!",
      };
    }

    setMixedColor(result);

    // Check if matching current quest in Recipe Quest Mode
    const isQuestMatch = 
      isRecipeMode &&
      ((activeQuest.colors[0] === c1 && activeQuest.colors[1] === c2) ||
       (activeQuest.colors[0] === c2 && activeQuest.colors[1] === c1));

    if (isQuestMatch) {
      setQuestSuccess(true);
      sound.playCelebration();
      onEarnStars(40);
      if (!liteMode) {
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#f472b6", "#38bdf8", "#facc15", "#34d399"],
        });
      }
      if (audioEnabled) {
        sound.speak(`Hore luar biasa! Misi Resep Tobi berhasil! Kamu berhasil membuat warna ${activeQuest.targetName}!`);
      }
    } else {
      setQuestSuccess(false);
      sound.playCelebration();
      onEarnStars(30);
      if (!liteMode) {
        confetti({
          particleCount: 35,
          spread: 55,
          origin: { y: 0.6 },
        });
      }
      if (audioEnabled) {
        sound.speak(`Selamat! Warna baru tercipta: ${result.name}! ${result.desc}`);
      }
    }
  };

  const handleResetColors = () => {
    setSelectedColor1(null);
    setSelectedColor2(null);
    setMixedColor(null);
    setQuestSuccess(false);
    sound.playChime();
  };

  const handleNextQuest = () => {
    const nextIdx = (currentQuestIdx + 1) % COLOR_QUESTS.length;
    setCurrentQuestIdx(nextIdx);
    handleResetColors();
    if (audioEnabled) {
      sound.speak(COLOR_QUESTS[nextIdx].prompt);
    }
  };

  const handleToggleRecipeMode = () => {
    const nextState = !isRecipeMode;
    setIsRecipeMode(nextState);
    handleResetColors();
    sound.playChime();
    if (nextState && audioEnabled) {
      sound.speak(`Mode Misi Resep Warna Ajaib aktif! ${activeQuest.prompt}`);
    }
  };

  const handleWaterStep = (step: 1 | 2 | 3) => {
    setWaterStep(step);
    sound.playChime();

    const explanations = {
      1: "Tahap Evaporasi: Matahari bersinar terik, memanaskan air laut dan danau hingga menguap naik ke angkasa menjadi butiran uap yang tak terlihat!",
      2: "Tahap Kondensasi: Di atas langit yang dingin, uap air berkumpul dan memadat membentuk awan putih yang semakin lama semakin tebal dan gelap!",
      3: "Tahap Presipitasi: Awan sudah sangat berat dan tak sanggup lagi menampung air. Hore, hujan ajaib turun menyirami tanah, pepohonan, dan kembali mengalir ke laut!",
    };

    if (audioEnabled) {
      sound.speak(explanations[step]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-5 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl border-4 border-emerald-400 shadow-2xl p-4 sm:p-7 overflow-hidden my-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b-2 border-emerald-100 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center border border-emerald-300">
              <FlaskConical className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-black font-display text-slate-800">
                Lab Sains Cilik 🧪
              </h3>
              <p className="text-xs font-semibold text-emerald-700">
                Eksperimen Interaktif Bebas Bahaya, Reaksi Warna, & Siklus Air
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {onOpenSolarSystem && (
              <button
                onClick={() => {
                  onClose();
                  onOpenSolarSystem();
                }}
                className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-xl bg-indigo-100 hover:bg-indigo-200 text-indigo-900 text-xs font-black border border-indigo-300 btn-chunky"
                title="Buka Lab Tata Surya"
              >
                <Orbit className="w-4 h-4 text-indigo-600" />
                <span>Tata Surya 🪐</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 btn-chunky"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 mb-5">
          <button
            onClick={() => {
              setActiveTab("colors");
              sound.playChime();
            }}
            className={`flex-1 py-2 sm:py-2.5 px-3 rounded-2xl font-black text-xs sm:text-sm border-2 btn-chunky flex items-center justify-center gap-2 ${
              activeTab === "colors"
                ? "bg-emerald-500 text-white border-emerald-600 shadow-[0_3px_0_0_#065f46]"
                : "bg-slate-100 text-slate-700 border-slate-200 hover:bg-emerald-50"
            }`}
          >
            <FlaskConical className="w-4 h-4" />
            <span>Eksperimen 1: Lab Warna & Resep Ajaib</span>
          </button>

          <button
            onClick={() => {
              setActiveTab("waterCycle");
              sound.playChime();
            }}
            className={`flex-1 py-2 sm:py-2.5 px-3 rounded-2xl font-black text-xs sm:text-sm border-2 btn-chunky flex items-center justify-center gap-2 ${
              activeTab === "waterCycle"
                ? "bg-sky-500 text-white border-sky-600 shadow-[0_3px_0_0_#0369a1]"
                : "bg-slate-100 text-slate-700 border-slate-200 hover:bg-sky-50"
            }`}
          >
            <CloudRain className="w-4 h-4" />
            <span>Eksperimen 2: Siklus Air Hujan</span>
          </button>
        </div>

        {/* TAB 1: COLOR MIXING */}
        {activeTab === "colors" && (
          <div>
            {/* Mode Switch & Quest Banner */}
            <div className="flex flex-wrap items-center justify-between gap-2.5 mb-4">
              <button
                onClick={handleToggleRecipeMode}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl font-black text-xs sm:text-sm border-2 btn-chunky transition-all ${
                  isRecipeMode
                    ? "bg-amber-400 text-amber-950 border-amber-500 shadow-[0_3px_0_0_#b45309]"
                    : "bg-white text-slate-700 border-slate-300 hover:bg-amber-50 shadow-sm"
                }`}
              >
                <Target className="w-4 h-4 text-amber-800" />
                <span>{isRecipeMode ? "🎯 Mode Misi Resep: AKTIF" : "🎯 Coba Misi Resep Warna Ajaib"}</span>
              </button>

              <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                5 Warna Lab: Primer, Pencerah (⚪), & Penggelap (⚫)
              </span>
            </div>

            {/* If Recipe Quest Mode is Active */}
            {isRecipeMode ? (
              <div className="bg-gradient-to-r from-amber-50 via-rose-50 to-purple-50 rounded-2xl p-4 border-2 border-amber-300 mb-5 relative">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <span className="text-3xl flex-shrink-0">{activeQuest.icon}</span>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[11px] font-black uppercase tracking-wider text-amber-900 bg-amber-200 px-2.5 py-0.5 rounded-full border border-amber-400">
                          Tantangan Tobi ({currentQuestIdx + 1}/{COLOR_QUESTS.length})
                        </span>
                        <span className="text-[11px] font-bold text-purple-700 bg-purple-100 px-2 py-0.5 rounded-full border border-purple-300 flex items-center gap-1">
                          <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                          +40 Bintang
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm font-black text-slate-800 leading-snug">
                        "{activeQuest.prompt}"
                      </p>
                      <p className="text-[11px] font-semibold text-slate-600 mt-0.5">
                        💡 <strong>Petunjuk:</strong> {activeQuest.hint}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center flex-shrink-0">
                    <button
                      onClick={() => {
                        sound.playChime();
                        if (audioEnabled) sound.speak(activeQuest.prompt);
                      }}
                      className="p-2 rounded-xl bg-white hover:bg-amber-100 text-amber-900 border border-amber-300 shadow-sm"
                      title="Dengarkan soal misi"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={handleNextQuest}
                      className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold border border-slate-300 btn-chunky"
                    >
                      Ganti Misi ➔
                    </button>
                  </div>
                </div>

                {questSuccess && (
                  <div className="mt-3 p-2.5 rounded-xl bg-emerald-100 border border-emerald-400 text-emerald-950 font-black text-xs flex items-center justify-between gap-2 animate-bounce">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>HEBAT! Resep {activeQuest.targetName} Berhasil Dibuat! (+40 ⭐)</span>
                    </div>
                    <button
                      onClick={handleNextQuest}
                      className="px-3 py-1 rounded-lg bg-emerald-600 text-white font-bold text-xs btn-chunky"
                    >
                      Misi Selanjutnya ➔
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-emerald-50/70 rounded-2xl p-3.5 border border-emerald-200 mb-5">
                <p className="text-xs sm:text-sm font-bold text-emerald-900">
                  👉 <strong>Instruksi Tobi:</strong> Pilih dua tabung warna di bawah (termasuk ⚪ Putih pencerah & ⚫ Hitam penggelap) untuk dituang ke mangkuk percobaan!
                </p>
              </div>
            )}

            {/* 5 COLOR BEAKERS GRID */}
            <div className="grid grid-cols-5 gap-2 sm:gap-3 mb-5">
              {/* 1. Red */}
              <button
                onClick={() => handleSelectColor("red")}
                disabled={Boolean(selectedColor1 && selectedColor2)}
                className={`p-2.5 sm:p-3 rounded-2xl border-2 sm:border-3 flex flex-col items-center gap-1.5 btn-chunky ${
                  selectedColor1 === "red" || selectedColor2 === "red"
                    ? "bg-rose-100 border-rose-500 shadow-[0_3px_0_0_#e11d48]"
                    : "bg-rose-50 border-rose-300 hover:bg-rose-100"
                }`}
              >
                <div className="w-9 h-11 sm:w-11 sm:h-13 rounded-b-2xl bg-gradient-to-b from-rose-400 to-red-600 border border-red-700 shadow-inner flex items-center justify-center text-white font-black text-xs">
                  ❤️
                </div>
                <span className="font-black text-[11px] sm:text-xs text-red-900 leading-none">Merah</span>
                <span className="text-[9px] font-bold text-red-700 hidden sm:inline">Primer</span>
              </button>

              {/* 2. Yellow */}
              <button
                onClick={() => handleSelectColor("yellow")}
                disabled={Boolean(selectedColor1 && selectedColor2)}
                className={`p-2.5 sm:p-3 rounded-2xl border-2 sm:border-3 flex flex-col items-center gap-1.5 btn-chunky ${
                  selectedColor1 === "yellow" || selectedColor2 === "yellow"
                    ? "bg-amber-100 border-amber-500 shadow-[0_3px_0_0_#d97706]"
                    : "bg-amber-50 border-amber-300 hover:bg-amber-100"
                }`}
              >
                <div className="w-9 h-11 sm:w-11 sm:h-13 rounded-b-2xl bg-gradient-to-b from-yellow-300 to-amber-500 border border-amber-600 shadow-inner flex items-center justify-center text-amber-950 font-black text-xs">
                  💛
                </div>
                <span className="font-black text-[11px] sm:text-xs text-amber-900 leading-none">Kuning</span>
                <span className="text-[9px] font-bold text-amber-700 hidden sm:inline">Primer</span>
              </button>

              {/* 3. Blue */}
              <button
                onClick={() => handleSelectColor("blue")}
                disabled={Boolean(selectedColor1 && selectedColor2)}
                className={`p-2.5 sm:p-3 rounded-2xl border-2 sm:border-3 flex flex-col items-center gap-1.5 btn-chunky ${
                  selectedColor1 === "blue" || selectedColor2 === "blue"
                    ? "bg-sky-100 border-sky-500 shadow-[0_3px_0_0_#0284c7]"
                    : "bg-sky-50 border-sky-300 hover:bg-sky-100"
                }`}
              >
                <div className="w-9 h-11 sm:w-11 sm:h-13 rounded-b-2xl bg-gradient-to-b from-sky-400 to-blue-600 border border-blue-700 shadow-inner flex items-center justify-center text-white font-black text-xs">
                  💙
                </div>
                <span className="font-black text-[11px] sm:text-xs text-sky-900 leading-none">Biru</span>
                <span className="text-[9px] font-bold text-sky-700 hidden sm:inline">Primer</span>
              </button>

              {/* 4. White (NEW!) */}
              <button
                onClick={() => handleSelectColor("white")}
                disabled={Boolean(selectedColor1 && selectedColor2)}
                className={`p-2.5 sm:p-3 rounded-2xl border-2 sm:border-3 flex flex-col items-center gap-1.5 btn-chunky ${
                  selectedColor1 === "white" || selectedColor2 === "white"
                    ? "bg-slate-200 border-slate-600 shadow-[0_3px_0_0_#475569]"
                    : "bg-slate-50 border-slate-300 hover:bg-slate-100"
                }`}
              >
                <div className="w-9 h-11 sm:w-11 sm:h-13 rounded-b-2xl bg-gradient-to-b from-white to-slate-200 border-2 border-slate-400 shadow-inner flex items-center justify-center text-slate-800 font-black text-xs">
                  ⚪
                </div>
                <span className="font-black text-[11px] sm:text-xs text-slate-800 leading-none">Putih</span>
                <span className="text-[9px] font-bold text-slate-600 hidden sm:inline">Pencerah</span>
              </button>

              {/* 5. Black (NEW!) */}
              <button
                onClick={() => handleSelectColor("black")}
                disabled={Boolean(selectedColor1 && selectedColor2)}
                className={`p-2.5 sm:p-3 rounded-2xl border-2 sm:border-3 flex flex-col items-center gap-1.5 btn-chunky ${
                  selectedColor1 === "black" || selectedColor2 === "black"
                    ? "bg-slate-900 text-white border-slate-950 shadow-[0_3px_0_0_#0f172a]"
                    : "bg-slate-800 text-white border-slate-900 hover:bg-slate-700"
                }`}
              >
                <div className="w-9 h-11 sm:w-11 sm:h-13 rounded-b-2xl bg-gradient-to-b from-slate-700 to-black border border-slate-600 shadow-inner flex items-center justify-center text-white font-black text-xs">
                  ⚫
                </div>
                <span className="font-black text-[11px] sm:text-xs text-white leading-none">Hitam</span>
                <span className="text-[9px] font-bold text-slate-300 hidden sm:inline">Penggelap</span>
              </button>
            </div>

            {/* Mixing Bowl Result */}
            <div className="bg-slate-50 rounded-2xl p-4 sm:p-5 border-2 border-slate-200 flex flex-col items-center text-center">
              <span className="text-xs font-black text-slate-500 uppercase tracking-wider mb-2">
                Mangkuk Pencampuran Kimia Ceria
              </span>

              {/* Big Flask */}
              <div
                className="w-24 h-28 rounded-b-3xl border-4 border-slate-400 flex flex-col justify-end p-2 transition-all duration-500 shadow-lg relative overflow-hidden"
                style={{
                  backgroundColor: mixedColor ? mixedColor.hex : "#f1f5f9",
                }}
              >
                {mixedColor && (
                  <span className="text-white text-xs font-black drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] text-center animate-bounce z-10">
                    ✨ Tercipta!
                  </span>
                )}
              </div>

              {mixedColor ? (
                <div className="mt-4">
                  <h4 className="text-lg sm:text-xl font-black font-display text-slate-900">
                    Hasil: {mixedColor.name} 🎉
                  </h4>
                  <p className="text-xs sm:text-sm font-semibold text-slate-700 max-w-lg mt-1 leading-relaxed">
                    {mixedColor.desc}
                  </p>
                  <div className="mt-3.5 flex flex-wrap items-center justify-center gap-3">
                    <button
                      onClick={handleResetColors}
                      className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs btn-chunky"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Coba Campuran Lain</span>
                    </button>
                    <span className="text-xs font-bold text-amber-600 flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-amber-500" />
                      +{isRecipeMode && questSuccess ? "40" : "30"} Bintang diperoleh!
                    </span>
                  </div>
                </div>
              ) : (
                <p className="text-xs sm:text-sm font-medium text-slate-500 mt-3">
                  {selectedColor1
                    ? `Pilihan pertama: ${selectedColor1.toUpperCase()}. Sekarang pilih satu tabung warna lagi!`
                    : "Belum ada warna yang dipilih. Klik tabung warna di atas!"}
                </p>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: WATER CYCLE SIMULATION */}
        {activeTab === "waterCycle" && (
          <div>
            <div className="bg-sky-50/70 rounded-2xl p-4 border border-sky-200 mb-5">
              <p className="text-xs sm:text-sm font-bold text-sky-900">
                👉 <strong>Instruksi Tobi:</strong> Tekan tahapan 1, 2, atau 3 untuk melihat perjalanan luar biasa setetes air dari laut menjadi hujan!
              </p>
            </div>

            {/* Stages Selector */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-5">
              <button
                onClick={() => handleWaterStep(1)}
                className={`p-3 rounded-2xl border-2 flex flex-col items-center gap-1 btn-chunky ${
                  waterStep === 1
                    ? "bg-amber-100 border-amber-500 shadow-[0_3px_0_0_#d97706]"
                    : "bg-white border-slate-200"
                }`}
              >
                <Sun className="w-6 h-6 text-amber-500 animate-spin" style={{ animationDuration: "12s" }} />
                <span className="text-xs font-black text-slate-800">1. Evaporasi</span>
                <span className="text-[10px] text-slate-500">Air Laut Menguap</span>
              </button>

              <button
                onClick={() => handleWaterStep(2)}
                className={`p-3 rounded-2xl border-2 flex flex-col items-center gap-1 btn-chunky ${
                  waterStep === 2
                    ? "bg-sky-100 border-sky-500 shadow-[0_3px_0_0_#0284c7]"
                    : "bg-white border-slate-200"
                }`}
              >
                <Droplets className="w-6 h-6 text-sky-500 animate-pulse" />
                <span className="text-xs font-black text-slate-800">2. Kondensasi</span>
                <span className="text-[10px] text-slate-500">Menjadi Awan</span>
              </button>

              <button
                onClick={() => handleWaterStep(3)}
                className={`p-3 rounded-2xl border-2 flex flex-col items-center gap-1 btn-chunky ${
                  waterStep === 3
                    ? "bg-blue-100 border-blue-500 shadow-[0_3px_0_0_#1d4ed8]"
                    : "bg-white border-slate-200"
                }`}
              >
                <CloudRain className="w-6 h-6 text-blue-600 animate-bounce" />
                <span className="text-xs font-black text-slate-800">3. Presipitasi</span>
                <span className="text-[10px] text-slate-500">Hujan Turun</span>
              </button>
            </div>

            {/* Visual Nature Canvas Preview */}
            <div className="relative rounded-2xl h-52 sm:h-60 bg-gradient-to-b from-sky-300 via-sky-100 to-emerald-200 overflow-hidden border-2 border-sky-300 p-4 flex flex-col justify-between">
              {/* Sun */}
              <div className="flex justify-between items-start">
                <div className={`transition-all duration-500 ${waterStep === 1 ? "scale-125" : "scale-90 opacity-70"}`}>
                  <div className="w-14 h-14 rounded-full bg-amber-400 border-4 border-amber-300 shadow-[0_0_20px_#f59e0b] flex items-center justify-center text-2xl">
                    ☀️
                  </div>
                </div>

                {/* Cloud */}
                <div className={`transition-all duration-500 ${
                  waterStep === 1 ? "opacity-30 scale-75" : waterStep === 2 ? "scale-110 opacity-100" : "scale-125 opacity-100"
                }`}>
                  <div className={`px-4 py-2 rounded-full text-white font-extrabold text-sm shadow-md flex items-center gap-1.5 ${
                    waterStep === 3 ? "bg-slate-600 border border-slate-700" : "bg-white text-slate-700"
                  }`}>
                    <span>☁️ Awan {waterStep === 3 ? "Mendung" : "Uap"}</span>
                  </div>
                </div>
              </div>

              {/* Rain Drops (Visible on step 3) */}
              {waterStep === 3 && (
                <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
                  <div className="text-2xl animate-bounce space-x-4">
                    <span>💧</span>
                    <span>🌧️</span>
                    <span>💧</span>
                    <span>🌧️</span>
                  </div>
                </div>
              )}

              {/* Landscape Bottom: Ocean & Mountain */}
              <div className="flex justify-between items-end">
                <div className="bg-sky-600 text-white text-xs font-bold px-3 py-1.5 rounded-t-xl border-t border-sky-400">
                  🌊 Samudera Laut
                </div>

                <div className="bg-emerald-600 text-white text-xs font-bold px-3 py-1.5 rounded-t-xl border-t border-emerald-400">
                  🌳 Pepohonan & Tanah Subur
                </div>
              </div>
            </div>

            {/* Explanation footer */}
            <div className="mt-4 p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between gap-2">
              <p className="text-xs sm:text-sm font-bold text-slate-800">
                {waterStep === 1 && "☀️ Evaporasi: Panas matahari mengubah air laut menjadi uap."}
                {waterStep === 2 && "☁️ Kondensasi: Uap air mendingin dan berkumpul menjadi awan tebal."}
                {waterStep === 3 && "🌧️ Presipitasi: Butiran air jatuh sebagai hujan menyegarkan bumi!"}
              </p>
              <button
                onClick={() => handleWaterStep(waterStep === 3 ? 1 : ((waterStep + 1) as 1 | 2 | 3))}
                className="px-3 py-1.5 rounded-xl bg-sky-500 text-white font-black text-xs border border-sky-600 btn-chunky flex-shrink-0"
              >
                Langkah Berikutnya ➔
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
