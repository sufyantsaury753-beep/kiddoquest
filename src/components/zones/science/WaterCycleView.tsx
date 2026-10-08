"use client";

import React, { useState, useEffect } from "react";
import { Sun, CloudRain, Droplets, Volume2, ArrowRight } from "lucide-react";
import { sound } from "@/lib/sound";

interface WaterCycleViewProps {
  onEarnStars?: (amount: number) => void;
  audioEnabled: boolean;
  liteMode: boolean;
}

export default function WaterCycleView({
  onEarnStars,
  audioEnabled,
  liteMode: _liteMode,
}: WaterCycleViewProps) {
  const [waterStep, setWaterStep] = useState<1 | 2 | 3>(1);
  const [hasCompletedCycle, setHasCompletedCycle] = useState<boolean>(false);

  // Preload gambar WebP siklus air untuk instan zero-latency switching
  useEffect(() => {
    if (typeof window !== "undefined") {
      const img1 = new Image();
      img1.src = "/images/evaporasi.webp";
      const img2 = new Image();
      img2.src = "/images/kondensasi.webp";
      const img3 = new Image();
      img3.src = "/images/presipitasi.webp";
    }
  }, []);

  const handleWaterStep = (step: 1 | 2 | 3) => {
    setWaterStep(step);
    sound.playChime();

    if (step === 3 && !hasCompletedCycle) {
      setHasCompletedCycle(true);
      if (onEarnStars) {
        onEarnStars(20);
      }
    }

    if (audioEnabled) {
      if (step === 1) {
        sound.speak("Tahap 1: Evaporasi. Panas energi matahari memanaskan air laut, sungai, dan danau hingga menguap naik ke atmosfer menjadi uap air yang tak kasat mata.");
      } else if (step === 2) {
        sound.speak("Tahap 2: Kondensasi. Saat uap air naik ke tempat tinggi yang dingin, uap air mengembun menjadi titik-titik air kecil dan berkumpul membentuk gumpalan awan tebal.");
      } else if (step === 3) {
        sound.speak("Tahap 3: Presipitasi. Ketika butiran air di awan sudah terlalu berat, butiran jatuh ke bumi sebagai hujan, menyuburkan tanah dan kembali mengalir ke laut lepas!");
      }
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-3 sm:px-6 py-4 sm:py-6 space-y-5 select-none">
      {/* 3 Step Interactive Buttons */}
      <div className="grid grid-cols-3 gap-2 sm:gap-4">
        <button
          onClick={() => handleWaterStep(1)}
          className={`p-3 sm:p-4 rounded-2xl border-2 sm:border-3 transition-all btn-chunky flex flex-col items-center text-center cursor-pointer ${
            waterStep === 1
              ? "bg-amber-100 border-amber-500 shadow-[0_3px_0_0_#b45309] scale-102"
              : "bg-white border-slate-200 hover:bg-slate-50"
          }`}
        >
          <Sun className="w-6 h-6 sm:w-8 sm:h-8 text-amber-500 mb-1 animate-spin-slow" />
          <span className="text-xs sm:text-sm font-black text-slate-800">1. Evaporasi</span>
          <span className="text-[10px] sm:text-xs text-slate-500 font-bold hidden sm:inline">Penguapan Air Laut</span>
        </button>

        <button
          onClick={() => handleWaterStep(2)}
          className={`p-3 sm:p-4 rounded-2xl border-2 sm:border-3 transition-all btn-chunky flex flex-col items-center text-center cursor-pointer ${
            waterStep === 2
              ? "bg-sky-100 border-sky-500 shadow-[0_3px_0_0_#0284c7] scale-102"
              : "bg-white border-slate-200 hover:bg-slate-50"
          }`}
        >
          <Droplets className="w-6 h-6 sm:w-8 sm:h-8 text-sky-500 mb-1 animate-pulse" />
          <span className="text-xs sm:text-sm font-black text-slate-800">2. Kondensasi</span>
          <span className="text-[10px] sm:text-xs text-slate-500 font-bold hidden sm:inline">Pembentukan Awan</span>
        </button>

        <button
          onClick={() => handleWaterStep(3)}
          className={`p-3 sm:p-4 rounded-2xl border-2 sm:border-3 transition-all btn-chunky flex flex-col items-center text-center cursor-pointer ${
            waterStep === 3
              ? "bg-blue-100 border-blue-500 shadow-[0_3px_0_0_#1d4ed8] scale-102"
              : "bg-white border-slate-200 hover:bg-slate-50"
          }`}
        >
          <CloudRain className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 mb-1 animate-bounce" />
          <span className="text-xs sm:text-sm font-black text-slate-800">3. Presipitasi</span>
          <span className="text-[10px] sm:text-xs text-slate-500 font-bold hidden sm:inline">Turun Hujan ke Bumi</span>
        </button>
      </div>

      {/* High-Resolution 2D Educational Illustration Container */}
      <div className="relative rounded-3xl overflow-hidden border-4 border-sky-300 shadow-xl aspect-[4/3] sm:aspect-[16/9] bg-sky-950 flex items-center justify-center transition-all duration-300">
        <img
          key={waterStep}
          src={
            waterStep === 1
              ? "/images/evaporasi.webp"
              : waterStep === 2
              ? "/images/kondensasi.webp"
              : "/images/presipitasi.webp"
          }
          alt={
            waterStep === 1
              ? "Tahap Evaporasi Air Laut"
              : waterStep === 2
              ? "Tahap Kondensasi Pembentukan Awan"
              : "Tahap Presipitasi Turunnya Hujan"
          }
          className="w-full h-full object-cover object-center transition-opacity duration-200"
        />

        {/* Step Title Badge Overlay */}
        <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-2xl border-2 border-sky-200 shadow-md flex items-center gap-2">
          <Droplets className="w-4 h-4 text-sky-600" />
          <span className="text-xs sm:text-sm font-black text-slate-800 font-display">
            {waterStep === 1 && "Tahap 1: Evaporasi (Penguapan Air Laut)"}
            {waterStep === 2 && "Tahap 2: Kondensasi (Pembentukan Awan Tebal)"}
            {waterStep === 3 && "Tahap 3: Presipitasi (Turunnya Hujan ke Bumi)"}
          </span>
        </div>
      </div>

      {/* Explanation Footer Bar */}
      <div className="p-4 bg-white rounded-2xl border-2 border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => {
              sound.playChime();
              if (audioEnabled) {
                if (waterStep === 1) {
                  sound.speak("Tahap Evaporasi: Panas matahari menguapkan air laut menjadi uap air tak kasat mata.");
                } else if (waterStep === 2) {
                  sound.speak("Tahap Kondensasi: Uap air mendingin dan berkumpul menjadi awan tebal di atmosfer.");
                } else {
                  sound.speak("Tahap Presipitasi: Butiran air jatuh sebagai hujan menyegarkan bumi dan kembali ke laut.");
                }
              }
            }}
            className="p-2 rounded-xl bg-sky-50 text-sky-700 hover:bg-sky-100 border border-sky-200 shrink-0 btn-chunky"
            title="Dengarkan Narasi Suara Tobi"
          >
            <Volume2 className="w-4 h-4" />
          </button>
          <p className="text-xs sm:text-sm font-bold text-slate-800 leading-snug">
            {waterStep === 1 && "Tahap Evaporasi: Panas matahari menguapkan air laut menjadi uap air tak kasat mata."}
            {waterStep === 2 && "Tahap Kondensasi: Uap air mendingin dan berkumpul menjadi awan tebal di atmosfer."}
            {waterStep === 3 && "Tahap Presipitasi: Butiran air jatuh sebagai hujan menyegarkan bumi dan kembali ke laut."}
          </p>
        </div>

        <button
          onClick={() => handleWaterStep(waterStep === 3 ? 1 : ((waterStep + 1) as 1 | 2 | 3))}
          className="w-full sm:w-auto px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-black text-xs sm:text-sm border-2 border-sky-600 btn-chunky flex items-center justify-center gap-1.5 shrink-0"
        >
          <span>Tahap Berikutnya</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
