"use client";

import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { 
  Scale, 
  Shuffle, 
  CheckCircle2, 
  Lightbulb, 
  Volume2 
} from "lucide-react";
import { sound } from "@/lib/sound";
import {
  generateProceduralScaleQuestion,
  ScaleQuestionData,
  MysteryChestGraphic,
  BrassWeightGraphic,
  GemWeightGraphic,
  WoodBlockGraphic,
} from "@/components/zones/math/MathFruitSvgs";

interface BalanceScaleViewProps {
  onEarnStars: (amount: number) => void;
  audioEnabled: boolean;
  liteMode: boolean;
}

export default function BalanceScaleView({
  onEarnStars,
  audioEnabled,
  liteMode,
}: BalanceScaleViewProps) {
  const [scaleLevel, setScaleLevel] = useState<1 | 2 | 3 | 4>(1);
  const [scaleQuestion, setScaleQuestion] = useState<ScaleQuestionData>(() =>
    generateProceduralScaleQuestion(1)
  );
  const [selectedScaleAnswer, setSelectedScaleAnswer] = useState<number | null>(null);
  const [isScaleCorrect, setIsScaleCorrect] = useState<boolean | null>(null);
  const [showHint, setShowHint] = useState(false);

  const startNewQuestion = (lvl: 1 | 2 | 3 | 4 = scaleLevel) => {
    setSelectedScaleAnswer(null);
    setIsScaleCorrect(null);
    setShowHint(false);
    setScaleLevel(lvl);
    setScaleQuestion(generateProceduralScaleQuestion(lvl));
  };

  useEffect(() => {
    startNewQuestion(1);
  }, []);

  const handleSelectAnswer = (ans: number) => {
    setSelectedScaleAnswer(ans);
    const target = scaleQuestion.correctAnswer;
    const chosenWeight = ans;
    const currentLeftTotal =
      scaleQuestion.leftKnownWeight + scaleQuestion.mysteryCount * chosenWeight;
    const currentRightTotal = scaleQuestion.rightTotalWeight;

    if (ans === target) {
      setIsScaleCorrect(true);
      sound.playCelebration();
      onEarnStars(35);
      if (!liteMode) {
        confetti({ particleCount: 55, spread: 65, origin: { y: 0.58 } });
      }
      if (audioEnabled) {
        sound.speak(
          `Luar biasa! Neraca sekarang seimbang sempurna di ${currentRightTotal} kilogram! Berat setiap peti adalah ${ans} kilogram. Kamu mendapatkan 35 bintang!`
        );
      }
    } else {
      setIsScaleCorrect(false);
      sound.playSocraticHint();
      if (audioEnabled) {
        if (currentLeftTotal > currentRightTotal) {
          sound.speak(
            `Belum seimbang! Sisi kiri sekarang terlalu berat dengan total ${currentLeftTotal} kilogram. Coba pilih angka yang lebih ringan!`
          );
        } else {
          sound.speak(
            `Belum seimbang! Sisi kanan masih lebih berat dengan ${currentRightTotal} kilogram. Coba pilih angka yang lebih besar!`
          );
        }
      }
    }
  };

  const handleSpeakTobi = () => {
    sound.playChime();
    if (!audioEnabled) return;
    sound.speak(scaleQuestion.hint);
  };

  // Perhitungan Sudut Kemiringan Dinamis Neraca
  let tiltAngle = 12; // default: sisi kanan lebih berat sebelum dijawab (+12 deg)
  if (selectedScaleAnswer !== null) {
    const leftCalc =
      scaleQuestion.leftKnownWeight +
      scaleQuestion.mysteryCount * selectedScaleAnswer;
    const rightCalc = scaleQuestion.rightTotalWeight;
    if (leftCalc === rightCalc) {
      tiltAngle = 0; // SEIMBANG SEMPURNA
    } else if (leftCalc > rightCalc) {
      tiltAngle = -13; // Sisi kiri lebih berat
    } else {
      tiltAngle = 13; // Sisi kanan lebih berat
    }
  }

  return (
    <div className="bg-white rounded-3xl border-4 border-amber-300 shadow-xl p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Header Stasiun */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b-2 border-amber-100">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-500 text-amber-950 flex items-center justify-center shadow-md">
            <Scale className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-display">
              Stasiun 2: Timbangan Neraca Misteri
            </h2>
            <p className="text-xs sm:text-sm font-semibold text-amber-800">
              Temukan berat peti rahasia agar kedua lengan neraca seimbang rata!
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleSpeakTobi}
            className="px-3 py-1.5 rounded-xl text-xs font-black border-2 border-amber-500 bg-amber-50 text-amber-900 hover:bg-amber-100 flex items-center gap-1.5 transition-all btn-chunky"
            title="Dengarkan Petunjuk Tobi"
          >
            <Volume2 className="w-4 h-4 text-amber-700" />
            <span className="hidden sm:inline">Dengarkan Tobi</span>
          </button>
          <button
            onClick={() => {
              sound.playChime();
              startNewQuestion(scaleLevel);
            }}
            className="px-3 py-1.5 rounded-xl text-xs font-black border-2 border-amber-600 bg-amber-500 hover:bg-amber-600 text-amber-950 shadow-[0_2px_0_0_#b45309] flex items-center gap-1.5 transition-all btn-chunky"
            title="Ganti Soal Baru"
          >
            <Shuffle className="w-4 h-4" />
            <span>Soal Baru</span>
          </button>
        </div>
      </div>

      {/* Level Selector Bar */}
      <div className="flex items-center justify-between flex-wrap gap-2 bg-amber-50/80 p-2.5 rounded-2xl border-2 border-amber-200">
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-black text-amber-950 uppercase mr-1">Tingkat:</span>
          {([1, 2, 3, 4] as const).map((lvl) => (
            <button
              key={lvl}
              onClick={() => {
                sound.playChime();
                startNewQuestion(lvl);
              }}
              className={`px-3 py-1 rounded-xl text-xs font-black transition-all btn-chunky ${
                scaleLevel === lvl
                  ? "bg-amber-500 text-amber-950 shadow-md border-2 border-amber-600 scale-105"
                  : "bg-white hover:bg-amber-100 text-slate-700 border-2 border-amber-200"
              }`}
            >
              Lvl {lvl}
            </button>
          ))}
        </div>
        <span className="text-xs font-extrabold text-amber-900">
          {scaleQuestion.levelName}
        </span>
      </div>

      {/* Main Interactive Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Kolom Kiri: Simulasi Neraca Fisika Pure SVG */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center space-y-3">
          <div className="w-full aspect-[360/195] bg-gradient-to-b from-amber-50/80 via-white to-orange-50/50 rounded-3xl border-3 border-amber-300 shadow-inner relative flex items-center justify-center overflow-hidden">
            {/* Status Keseimbangan Badge */}
            <div className="absolute top-3 left-3 z-10">
              {tiltAngle === 0 ? (
                <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-500 text-white shadow-md flex items-center gap-1.5 animate-pulse">
                  <CheckCircle2 className="w-4 h-4 text-white" />
                  <span>SEIMBANG SEMPURNA!</span>
                </span>
              ) : (
                <span className="px-3 py-1 rounded-full text-xs font-black bg-amber-100 text-amber-900 border-2 border-amber-300 shadow-sm">
                  {tiltAngle > 0 ? "Kanan Lebih Berat" : "Kiri Lebih Berat"}
                </span>
              )}
            </div>

            {/* SVG Neraca Dua Piringan */}
            <svg viewBox="0 0 360 200" className="w-full h-full" fill="none">
              {/* Tiang Poros Tengah & Dasar Penyangga */}
              <path d="M152 186 L167 80 L193 80 L208 186 Z" fill="#78350f" stroke="#451a03" strokeWidth="2" />
              <rect x="130" y="180" width="100" height="15" rx="4" fill="#92400e" stroke="#451a03" strokeWidth="2" />
              <circle cx="180" cy="188" r="3" fill="#facc15" />
              <circle cx="150" cy="188" r="2" fill="#ca8a04" />
              <circle cx="210" cy="188" r="2" fill="#ca8a04" />

              {/* Skala Derajat Pusat (Arc Gauge) */}
              <path d="M164 116 A 20 20 0 0 0 196 116" stroke="#ca8a04" strokeWidth="2" strokeDasharray="2 3" />
              <circle cx="180" cy="120" r="3" fill={tiltAngle === 0 ? "#10b981" : "#f59e0b"} />

              {/* Rangka Lengan Neraca Berputar (Rotating Beam) */}
              <g
                style={{
                  transform: `rotate(${tiltAngle}deg)`,
                  transformOrigin: "180px 80px",
                  transition: "transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)",
                }}
              >
                {/* Lengan Kuningan */}
                <rect x="45" y="76" width="270" height="8" rx="4" fill="#d97706" stroke="#78350f" strokeWidth="2" />

                {/* Jarum Penunjuk Tengah Merah */}
                <polygon
                  points="178,86 182,86 180,118"
                  fill={tiltAngle === 0 ? "#10b981" : "#ef4444"}
                  stroke="#7f1d1d"
                  strokeWidth="1"
                />

                {/* Poros Putar Tengah Emas */}
                <circle cx="180" cy="80" r="10" fill="#f59e0b" stroke="#78350f" strokeWidth="2.5" />
                <circle cx="180" cy="80" r="4" fill="#fef08a" />

                {/* --- PIRINGAN KIRI --- */}
                <g
                  style={{
                    transform: `rotate(${-tiltAngle}deg)`,
                    transformOrigin: "55px 80px",
                    transition: "transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)",
                  }}
                >
                  <line x1="55" y1="80" x2="28" y2="132" stroke="#92400e" strokeWidth="1.5" strokeDasharray="3 2" />
                  <line x1="55" y1="80" x2="82" y2="132" stroke="#92400e" strokeWidth="1.5" strokeDasharray="3 2" />
                  <circle cx="55" cy="80" r="3.5" fill="#f59e0b" stroke="#78350f" strokeWidth="1.5" />

                  <path d="M22 132 C26 148 84 148 88 132 Z" fill="#fde047" stroke="#ca8a04" strokeWidth="2" />
                  <ellipse cx="55" cy="132" rx="33" ry="3.5" fill="#fef08a" stroke="#ca8a04" strokeWidth="1.5" />

                  {/* Beban di Piringan Kiri */}
                  {scaleQuestion.leftItems.map((item, idx) => {
                    const isDouble = scaleQuestion.leftItems.length > 1;
                    const posX = isDouble ? (idx === 0 ? 41 : 69) : 55;
                    const posY = 130;
                    const scaleVal = isDouble ? 0.68 : 0.82;

                    return (
                      <g key={idx} transform={`translate(${posX}, ${posY}) scale(${scaleVal})`}>
                        {item.type === "mystery" ? (
                          <MysteryChestGraphic
                            label={selectedScaleAnswer !== null ? `${selectedScaleAnswer}` : "?"}
                          />
                        ) : item.type === "brass" ? (
                          <BrassWeightGraphic weight={item.value} />
                        ) : item.type === "gem" ? (
                          <GemWeightGraphic weight={item.value} />
                        ) : (
                          <WoodBlockGraphic weight={item.value} />
                        )}
                      </g>
                    );
                  })}
                </g>

                {/* --- PIRINGAN KANAN --- */}
                <g
                  style={{
                    transform: `rotate(${-tiltAngle}deg)`,
                    transformOrigin: "305px 80px",
                    transition: "transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)",
                  }}
                >
                  <line x1="305" y1="80" x2="278" y2="132" stroke="#92400e" strokeWidth="1.5" strokeDasharray="3 2" />
                  <line x1="305" y1="80" x2="332" y2="132" stroke="#92400e" strokeWidth="1.5" strokeDasharray="3 2" />
                  <circle cx="305" cy="80" r="3.5" fill="#f59e0b" stroke="#78350f" strokeWidth="1.5" />

                  <path d="M272 132 C276 148 334 148 338 132 Z" fill="#fde047" stroke="#ca8a04" strokeWidth="2" />
                  <ellipse cx="305" cy="132" rx="33" ry="3.5" fill="#fef08a" stroke="#ca8a04" strokeWidth="1.5" />

                  {/* Beban di Piringan Kanan */}
                  {scaleQuestion.rightItems.map((item, idx) => {
                    const isDouble = scaleQuestion.rightItems.length > 1;
                    const posX = isDouble ? (idx === 0 ? 291 : 319) : 305;
                    const posY = 130;
                    const scaleVal = isDouble ? 0.68 : 0.82;

                    return (
                      <g key={idx} transform={`translate(${posX}, ${posY}) scale(${scaleVal})`}>
                        {item.type === "brass" ? (
                          <BrassWeightGraphic weight={item.value} />
                        ) : item.type === "gem" ? (
                          <GemWeightGraphic weight={item.value} />
                        ) : (
                          <WoodBlockGraphic weight={item.value} />
                        )}
                      </g>
                    );
                  })}
                </g>
              </g>
            </svg>
          </div>

          {/* Persamaan Aljabar Neraca */}
          <div className="w-full py-2 px-4 bg-amber-100 rounded-2xl border-2 border-amber-300 text-center">
            <span className="text-sm sm:text-base font-black font-display text-amber-950">
              {scaleQuestion.equationText}
            </span>
          </div>
        </div>

        {/* Kolom Kanan: Pilihan Jawaban 2x2 & Feedback */}
        <div className="lg:col-span-5 flex flex-col justify-center space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs sm:text-sm font-black text-amber-900 uppercase tracking-wider">
              Tebak Berat 1 Peti [ ? ]:
            </span>
            <span className="text-xs font-bold text-slate-500">
              Beban Kanan: {scaleQuestion.rightTotalWeight} kg
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {scaleQuestion.options.map((opt) => {
              const isSelected = selectedScaleAnswer === opt;
              const isThisCorrect = isScaleCorrect && isSelected;
              const isThisWrong = isScaleCorrect === false && isSelected;

              let btnStyle = "bg-white border-amber-300 text-slate-800 hover:bg-amber-50 shadow-[0_4px_0_0_#fde68a]";
              if (isThisCorrect) {
                btnStyle = "bg-emerald-500 border-emerald-600 text-white shadow-[0_4px_0_0_#065f46]";
              } else if (isThisWrong) {
                btnStyle = "bg-rose-500 border-rose-600 text-white shadow-[0_4px_0_0_#9f1239]";
              }

              return (
                <button
                  key={opt}
                  onClick={() => handleSelectAnswer(opt)}
                  className={`py-3.5 sm:py-4 px-3 rounded-2xl border-3 font-display font-black text-xl sm:text-2xl flex items-center justify-center transition-all btn-chunky ${btnStyle}`}
                >
                  <span>{opt} kg</span>
                  {isThisCorrect && <CheckCircle2 className="w-5 h-5 ml-2 text-white shrink-0" />}
                </button>
              );
            })}
          </div>

          {/* Banner Feedback */}
          <div className="min-h-[52px] flex items-center">
            {selectedScaleAnswer !== null ? (
              <div
                className={`p-3 rounded-2xl border-2 text-xs sm:text-sm font-bold flex items-center justify-between gap-2 w-full shadow-sm ${
                  isScaleCorrect
                    ? "bg-emerald-50 border-emerald-400 text-emerald-950"
                    : "bg-amber-50 border-amber-400 text-amber-950"
                }`}
              >
                <div className="flex items-center gap-2 overflow-hidden">
                  {isScaleCorrect ? (
                    <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-600" />
                  ) : (
                    <Lightbulb className="w-5 h-5 shrink-0 text-amber-600" />
                  )}
                  <span className="truncate">
                    {isScaleCorrect
                      ? `Seimbang sempurna! Peti = ${scaleQuestion.correctAnswer} kg (+35 Bintang)`
                      : (tiltAngle < 0
                          ? "Kiri terlalu berat! Pilih angka lebih ringan."
                          : "Kanan masih berat! Pilih angka lebih besar.")}
                  </span>
                </div>
                <button
                  onClick={() => {
                    sound.playChime();
                    startNewQuestion(scaleLevel);
                  }}
                  className="shrink-0 px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-amber-950 font-black text-xs btn-chunky shadow-sm border border-amber-600"
                >
                  Lanjut
                </button>
              </div>
            ) : (
              <div className="w-full py-2.5 text-center text-xs font-bold text-slate-400">
                Pilih angka kg di atas untuk menyeimbangkan neraca!
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer Cheat Sheet & Panduan */}
      <div className="pt-4 border-t-2 border-amber-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs font-bold text-amber-950">
          <span className="font-black uppercase text-slate-500 shrink-0">Jenis Beban:</span>
          <span className="bg-amber-100 px-2 py-1 rounded-xl border border-amber-300 shrink-0">
            Peti [ ? ] = Misteri
          </span>
          <span className="bg-yellow-100 px-2 py-1 rounded-xl border border-yellow-300 shrink-0">
            Kuningan = kg Tetap
          </span>
          <span className="bg-cyan-100 px-2 py-1 rounded-xl border border-cyan-300 shrink-0">
            Kristal / Balok Kayu
          </span>
        </div>

        <button
          onClick={() => setShowHint(!showHint)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 text-xs font-black self-end sm:self-auto shrink-0 btn-chunky"
        >
          <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
          <span>{showHint ? "Tutup Bantuan" : "Bantuan Logika"}</span>
        </button>
      </div>

      {/* Popover Bantuan */}
      {showHint && (
        <div className="p-3.5 bg-amber-50 rounded-2xl border-2 border-amber-200 text-xs sm:text-sm font-semibold text-amber-950">
          {scaleQuestion.hint}
        </div>
      )}
    </div>
  );
}
