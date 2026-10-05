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
  Star
} from "lucide-react";
import { sound } from "@/lib/sound";

interface ScienceLabModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEarnStars: (amount: number) => void;
  audioEnabled: boolean;
  liteMode: boolean;
}

type ColorType = "red" | "yellow" | "blue";

export default function ScienceLabModal({
  isOpen,
  onClose,
  onEarnStars,
  audioEnabled,
  liteMode,
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

  // Water cycle state
  const [waterStep, setWaterStep] = useState<1 | 2 | 3>(1); // 1: Evaporasi, 2: Kondensasi, 3: Presipitasi (Hujan)

  if (!isOpen) return null;

  const handleSelectColor = (color: ColorType) => {
    sound.playChime();
    if (!selectedColor1) {
      setSelectedColor1(color);
      setMixedColor(null);
    } else if (!selectedColor2) {
      if (selectedColor1 === color) {
        // Same color selected twice
        setSelectedColor2(color);
        mixColors(selectedColor1, color);
      } else {
        setSelectedColor2(color);
        mixColors(selectedColor1, color);
      }
    }
  };

  const mixColors = (c1: ColorType, c2: ColorType) => {
    let result = { name: "", hex: "", desc: "" };

    if (c1 === c2) {
      if (c1 === "red") result = { name: "Merah Murni", hex: "#ef4444", desc: "Warna merah tetap merah terang!" };
      if (c1 === "yellow") result = { name: "Kuning Murni", hex: "#facc15", desc: "Warna kuning tetap cerah seperti sinar matahari!" };
      if (c1 === "blue") result = { name: "Biru Murni", hex: "#3b82f6", desc: "Warna biru tetap sejuk seperti air samudera!" };
    } else if ((c1 === "red" && c2 === "yellow") || (c1 === "yellow" && c2 === "red")) {
      result = {
        name: "Jingga / Oranye Jeruk Segar",
        hex: "#f97316",
        desc: "Ajaib! Merah yang berani dicampur Kuning yang ceria menghasilkan Oranye yang hangat seperti buah jeruk manis!",
      };
    } else if ((c1 === "yellow" && c2 === "blue") || (c1 === "blue" && c2 === "yellow")) {
      result = {
        name: "Hijau Dedaunan Segar",
        hex: "#22c55e",
        desc: "Luar biasa! Kuning cerah bertemu Biru sejuk melahirkan warna Hijau yang menyejukkan seperti dedaunan hutan tropis!",
      };
    } else if ((c1 === "red" && c2 === "blue") || (c1 === "blue" && c2 === "red")) {
      result = {
        name: "Ungu Anggur Megah",
        hex: "#a855f7",
        desc: "Hebat! Merah dan Biru bersatu menjadi warna Ungu yang misterius dan anggun seperti buah anggur lezat!",
      };
    }

    setMixedColor(result);
    sound.playCelebration();
    onEarnStars(30);

    if (!liteMode) {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.6 },
      });
    }

    if (audioEnabled) {
      sound.speak(`Selamat! Warna baru tercipta: ${result.name}! ${result.desc}`);
    }
  };

  const handleResetColors = () => {
    setSelectedColor1(null);
    setSelectedColor2(null);
    setMixedColor(null);
    sound.playChime();
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl border-4 border-emerald-400 shadow-2xl p-5 sm:p-7 overflow-hidden my-auto">
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
                Eksperimen Interaktif Bebas Bahaya & Penuh Keajaiban
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 btn-chunky"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 mb-6">
          <button
            onClick={() => {
              setActiveTab("colors");
              sound.playChime();
            }}
            className={`flex-1 py-2.5 px-3 rounded-2xl font-black text-xs sm:text-sm border-2 btn-chunky flex items-center justify-center gap-2 ${
              activeTab === "colors"
                ? "bg-emerald-500 text-white border-emerald-600 shadow-[0_3px_0_0_#065f46]"
                : "bg-slate-100 text-slate-700 border-slate-200 hover:bg-emerald-50"
            }`}
          >
            <FlaskConical className="w-4 h-4" />
            <span>Eksperimen 1: Pencampuran Warna</span>
          </button>

          <button
            onClick={() => {
              setActiveTab("waterCycle");
              sound.playChime();
            }}
            className={`flex-1 py-2.5 px-3 rounded-2xl font-black text-xs sm:text-sm border-2 btn-chunky flex items-center justify-center gap-2 ${
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
            <div className="bg-emerald-50/70 rounded-2xl p-4 border border-emerald-200 mb-5">
              <p className="text-xs sm:text-sm font-bold text-emerald-900">
                👉 <strong>Instruksi Tobi:</strong> Pilih dua tabung warna primer di bawah untuk dituang ke mangkuk percobaan, dan lihat warna baru yang tercipta!
              </p>
            </div>

            {/* Color Beakers */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-6">
              {/* Red */}
              <button
                onClick={() => handleSelectColor("red")}
                disabled={Boolean(selectedColor1 && selectedColor2)}
                className={`p-4 rounded-2xl border-3 flex flex-col items-center gap-2 btn-chunky ${
                  selectedColor1 === "red" || selectedColor2 === "red"
                    ? "bg-rose-100 border-rose-500 shadow-[0_4px_0_0_#e11d48]"
                    : "bg-rose-50 border-rose-300 hover:bg-rose-100"
                }`}
              >
                <div className="w-12 h-14 rounded-b-2xl bg-gradient-to-b from-rose-400 to-red-600 border-2 border-red-700 shadow-inner flex items-center justify-center text-white font-black text-sm">
                  ❤️
                </div>
                <span className="font-extrabold text-xs sm:text-sm text-red-900">Warna Merah</span>
                <span className="text-[10px] font-bold text-red-700">Warna Primer</span>
              </button>

              {/* Yellow */}
              <button
                onClick={() => handleSelectColor("yellow")}
                disabled={Boolean(selectedColor1 && selectedColor2)}
                className={`p-4 rounded-2xl border-3 flex flex-col items-center gap-2 btn-chunky ${
                  selectedColor1 === "yellow" || selectedColor2 === "yellow"
                    ? "bg-amber-100 border-amber-500 shadow-[0_4px_0_0_#d97706]"
                    : "bg-amber-50 border-amber-300 hover:bg-amber-100"
                }`}
              >
                <div className="w-12 h-14 rounded-b-2xl bg-gradient-to-b from-yellow-300 to-amber-500 border-2 border-amber-600 shadow-inner flex items-center justify-center text-amber-950 font-black text-sm">
                  💛
                </div>
                <span className="font-extrabold text-xs sm:text-sm text-amber-900">Warna Kuning</span>
                <span className="text-[10px] font-bold text-amber-700">Warna Primer</span>
              </button>

              {/* Blue */}
              <button
                onClick={() => handleSelectColor("blue")}
                disabled={Boolean(selectedColor1 && selectedColor2)}
                className={`p-4 rounded-2xl border-3 flex flex-col items-center gap-2 btn-chunky ${
                  selectedColor1 === "blue" || selectedColor2 === "blue"
                    ? "bg-sky-100 border-sky-500 shadow-[0_4px_0_0_#0284c7]"
                    : "bg-sky-50 border-sky-300 hover:bg-sky-100"
                }`}
              >
                <div className="w-12 h-14 rounded-b-2xl bg-gradient-to-b from-sky-400 to-blue-600 border-2 border-blue-700 shadow-inner flex items-center justify-center text-white font-black text-sm">
                  💙
                </div>
                <span className="font-extrabold text-xs sm:text-sm text-sky-900">Warna Biru</span>
                <span className="text-[10px] font-bold text-sky-700">Warna Primer</span>
              </button>
            </div>

            {/* Mixing Bowl Result */}
            <div className="bg-slate-50 rounded-2xl p-5 border-2 border-slate-200 flex flex-col items-center text-center">
              <span className="text-xs font-black text-slate-500 uppercase tracking-wider mb-2">
                Mangkuk Pencampuran Kimia Ceria
              </span>

              {/* Big Flask */}
              <div
                className="w-24 h-28 rounded-b-3xl border-4 border-slate-400 flex flex-col justify-end p-2 transition-all duration-500 shadow-lg"
                style={{
                  backgroundColor: mixedColor ? mixedColor.hex : "#f1f5f9",
                }}
              >
                {mixedColor && (
                  <span className="text-white text-xs font-black drop-shadow text-center animate-bounce">
                    ✨ Tercipta!
                  </span>
                )}
              </div>

              {mixedColor ? (
                <div className="mt-4">
                  <h4 className="text-lg sm:text-xl font-black font-display text-slate-900">
                    Hasil: {mixedColor.name} 🎉
                  </h4>
                  <p className="text-xs sm:text-sm font-semibold text-slate-700 max-w-md mt-1">
                    {mixedColor.desc}
                  </p>
                  <div className="mt-3 flex items-center justify-center gap-3">
                    <button
                      onClick={handleResetColors}
                      className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs btn-chunky"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Coba Campuran Lain</span>
                    </button>
                    <span className="text-xs font-bold text-amber-600 flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-amber-500" />
                      +30 Bintang diperoleh!
                    </span>
                  </div>
                </div>
              ) : (
                <p className="text-xs sm:text-sm font-medium text-slate-500 mt-3">
                  {selectedColor1
                    ? `Pilihan pertama: ${selectedColor1.toUpperCase()}. Sekarang pilih satu warna lagi!`
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
                {/* Ocean */}
                <div className="bg-sky-600 text-white text-xs font-bold px-3 py-1.5 rounded-t-xl border-t border-sky-400">
                  🌊 Samudera Laut
                </div>

                {/* Tree and Land */}
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
