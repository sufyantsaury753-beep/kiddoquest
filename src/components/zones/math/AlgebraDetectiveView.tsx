"use client";

import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { 
  Search, 
  Shuffle, 
  CheckCircle2, 
  Lightbulb, 
  Volume2 
} from "lucide-react";
import { sound } from "@/lib/sound";
import { 
  FruitVariable, 
  FRUIT_VARIABLES, 
  generateOptions 
} from "@/components/zones/math/MathFruitSvgs";

interface AlgebraDetectiveViewProps {
  onEarnStars: (amount: number) => void;
  audioEnabled: boolean;
  liteMode: boolean;
}

export default function AlgebraDetectiveView({
  onEarnStars,
  audioEnabled,
  liteMode,
}: AlgebraDetectiveViewProps) {
  const [detFruitA, setDetFruitA] = useState<FruitVariable>(FRUIT_VARIABLES[1]);
  const [detFruitB, setDetFruitB] = useState<FruitVariable>(FRUIT_VARIABLES[2]);
  const [detLine1, setDetLine1] = useState(4);
  const [detLine2, setDetLine2] = useState(5);
  const [detTargetOp, setDetTargetOp] = useState<"+" | "onlyB">("+");
  const [detAnswer, setDetAnswer] = useState(0);
  const [detOptions, setDetOptions] = useState<number[]>([]);
  const [detHint, setDetHint] = useState("");
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showHint, setShowHint] = useState(false);

  const generateNewQuestion = () => {
    setSelectedAnswer(null);
    setIsCorrect(null);
    setShowHint(false);

    const shuffled = [...FRUIT_VARIABLES].sort(() => Math.random() - 0.5);
    const fA = shuffled[0];
    const fB = shuffled[1];
    const l1 = fA.value * 2;
    const l2 = fA.value + fB.value;
    const op = Math.random() > 0.5 ? "+" : "onlyB";
    const ans = op === "+" ? fA.value + fB.value : fB.value;

    setDetFruitA(fA);
    setDetFruitB(fB);
    setDetLine1(l1);
    setDetLine2(l2);
    setDetTargetOp(op);
    setDetAnswer(ans);
    setDetOptions(generateOptions(ans));
    setDetHint(
      `Langkah 1: Dua ${fA.name} bernilai ${l1}, maka 1 ${fA.name} = ${l1} ÷ 2 = ${fA.value}. Langkah 2: ${fA.value} + ${fB.name} = ${l2}, maka 1 ${fB.name} = ${l2} - ${fA.value} = ${fB.value}! ${
        op === "+" ? `Langkah 3: Jumlahkan ${fA.value} + ${fB.value} = ${ans}.` : ""
      }`
    );
  };

  useEffect(() => {
    generateNewQuestion();
  }, []);

  const handleSelectAnswer = (ans: number) => {
    setSelectedAnswer(ans);
    if (ans === detAnswer) {
      setIsCorrect(true);
      sound.playCelebration();
      onEarnStars(30);
      if (!liteMode) {
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
      }
      if (audioEnabled) {
        sound.speak(`Hebat sekali detektif cilik! Jawabanmu benar, yaitu ${ans}! Kamu mendapatkan 30 bintang!`);
      }
    } else {
      setIsCorrect(false);
      sound.playSocraticHint();
      if (audioEnabled) {
        sound.speak("Hampir tepat! Pecahkan nilai baris pertama dulu, lalu cari buah kedua!");
      }
    }
  };

  const handleSpeakTobi = () => {
    sound.playChime();
    if (!audioEnabled) return;
    sound.speak("Pecahkan teka-teki misteri buah! Cari nilai buah pertama di baris atas, lalu gunakan untuk mengungkap buah kedua!");
  };

  return (
    <div className="bg-white rounded-3xl border-4 border-rose-300 shadow-xl p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Header Stasiun */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b-2 border-rose-100">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-rose-600 text-white flex items-center justify-center shadow-md">
            <Search className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-display">
              Stasiun 3: Detektif Aljabar Buah
            </h2>
            <p className="text-xs sm:text-sm font-semibold text-rose-700">
              Pecahkan petunjuk berantai untuk membongkar nilai rahasia buah!
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleSpeakTobi}
            className="px-3 py-1.5 rounded-xl text-xs font-black border-2 border-rose-500 bg-rose-50 text-rose-700 hover:bg-rose-100 flex items-center gap-1.5 transition-all btn-chunky"
            title="Dengarkan Petunjuk Tobi"
          >
            <Volume2 className="w-4 h-4 text-rose-600" />
            <span className="hidden sm:inline">Dengarkan Tobi</span>
          </button>
          <button
            onClick={() => {
              sound.playChime();
              generateNewQuestion();
            }}
            className="px-3 py-1.5 rounded-xl text-xs font-black border-2 border-rose-600 bg-rose-500 hover:bg-rose-600 text-white shadow-[0_2px_0_0_#9f1239] flex items-center gap-1.5 transition-all btn-chunky"
            title="Ganti Soal Baru"
          >
            <Shuffle className="w-4 h-4" />
            <span>Soal Baru</span>
          </button>
        </div>
      </div>

      {/* Main Detective Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Kolom Kiri: Papan Clue Aljabar Berjenjang */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center space-y-3">
          <div className="w-full bg-gradient-to-br from-rose-50 via-amber-50/30 to-rose-100/60 rounded-3xl border-3 border-rose-300 p-4 sm:p-6 shadow-inner space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-black uppercase text-rose-700 bg-white/90 px-3 py-1 rounded-full border border-rose-200 shadow-sm">
                Petunjuk Berantai Detektif:
              </span>
              <span className="text-xs font-bold text-slate-500">
                Pecahkan baris per baris
              </span>
            </div>

            {/* Baris 1: Buah Kembar A + A */}
            <div className="flex items-center justify-between p-3 sm:p-4 rounded-2xl bg-white border-2 border-rose-200 shadow-sm">
              <div className="flex items-center gap-3">
                <detFruitA.SvgComponent className="w-8 h-8 sm:w-10 sm:h-10" />
                <span className="text-xl sm:text-2xl font-black text-rose-600">+</span>
                <detFruitA.SvgComponent className="w-8 h-8 sm:w-10 sm:h-10" />
                <span className="text-xs font-extrabold text-slate-600 hidden sm:inline">
                  (2 × {detFruitA.name})
                </span>
              </div>
              <span className="text-xl sm:text-2xl font-black text-rose-700 font-display">
                = {detLine1}
              </span>
            </div>

            {/* Baris 2: Buah A + Buah B */}
            <div className="flex items-center justify-between p-3 sm:p-4 rounded-2xl bg-white border-2 border-rose-200 shadow-sm">
              <div className="flex items-center gap-3">
                <detFruitA.SvgComponent className="w-8 h-8 sm:w-10 sm:h-10" />
                <span className="text-xl sm:text-2xl font-black text-rose-600">+</span>
                <detFruitB.SvgComponent className="w-8 h-8 sm:w-10 sm:h-10" />
                <span className="text-xs font-extrabold text-slate-600 hidden sm:inline">
                  ({detFruitA.name} + {detFruitB.name})
                </span>
              </div>
              <span className="text-xl sm:text-2xl font-black text-rose-700 font-display">
                = {detLine2}
              </span>
            </div>

            {/* Baris 3: Target Misi Pertanyaan */}
            <div className="flex items-center justify-between p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-rose-600 to-rose-500 text-white shadow-md border-2 border-rose-700">
              <div className="flex items-center gap-2">
                <span className="text-xs sm:text-sm font-black uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded-lg">
                  Misi:
                </span>
                <span className="text-sm sm:text-base font-black">
                  {detTargetOp === "+"
                    ? `Berapa ${detFruitA.name} + ${detFruitB.name}?`
                    : `Berapa nilai 1 ${detFruitB.name}?`}
                </span>
              </div>
              <span className="text-xl sm:text-2xl font-black font-display text-yellow-300">
                = ?
              </span>
            </div>
          </div>
        </div>

        {/* Kolom Kanan: Pilihan Jawaban 2x2 & Feedback */}
        <div className="lg:col-span-5 flex flex-col justify-center space-y-3">
          <span className="text-xs sm:text-sm font-black text-rose-800 uppercase tracking-wider">
            Pilih Jawaban yang Tepat:
          </span>

          <div className="grid grid-cols-2 gap-3">
            {detOptions.map((opt) => {
              const isSelected = selectedAnswer === opt;
              const isThisCorrect = isCorrect && isSelected;
              const isThisWrong = isCorrect === false && isSelected;

              let btnStyle = "bg-white border-rose-300 text-slate-800 hover:bg-rose-50 shadow-[0_4px_0_0_#fecdd3]";
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
                  <span>{opt}</span>
                  {isThisCorrect && <CheckCircle2 className="w-5 h-5 ml-2 text-white shrink-0" />}
                </button>
              );
            })}
          </div>

          {/* Banner Feedback */}
          <div className="min-h-[52px] flex items-center">
            {selectedAnswer !== null ? (
              <div
                className={`p-3 rounded-2xl border-2 text-xs sm:text-sm font-bold flex items-center justify-between gap-2 w-full shadow-sm ${
                  isCorrect
                    ? "bg-emerald-50 border-emerald-400 text-emerald-950"
                    : "bg-amber-50 border-amber-400 text-amber-950"
                }`}
              >
                <div className="flex items-center gap-2 overflow-hidden">
                  {isCorrect ? (
                    <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-600" />
                  ) : (
                    <Lightbulb className="w-5 h-5 shrink-0 text-amber-600" />
                  )}
                  <span className="truncate">
                    {isCorrect
                      ? `Luar biasa detektif! Jawabanmu ${detAnswer} benar (+30 Bintang)`
                      : "Hampir tepat! Cari nilai buah baris 1 terlebih dahulu!"}
                  </span>
                </div>
                <button
                  onClick={() => {
                    sound.playChime();
                    generateNewQuestion();
                  }}
                  className="shrink-0 px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-black text-xs btn-chunky shadow-sm"
                >
                  Lanjut
                </button>
              </div>
            ) : (
              <div className="w-full py-2.5 text-center text-xs font-bold text-slate-400">
                Pilih angka yang tepat di atas untuk menyelesaikan investigasi aljabar!
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer Cheat Sheet & Panduan */}
      <div className="pt-4 border-t-2 border-rose-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-[10px] font-black uppercase text-slate-500 shrink-0 mr-1">
            Katalog Nilai Buah:
          </span>
          {FRUIT_VARIABLES.map((f) => (
            <div
              key={f.id}
              className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded-xl border border-slate-200 shrink-0"
            >
              <f.SvgComponent className="w-4 h-4" />
              <span className="text-[11px] font-bold text-slate-700">
                {f.name} = {f.value}
              </span>
            </div>
          ))}
        </div>

        <button
          onClick={() => setShowHint(!showHint)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 text-xs font-black self-end sm:self-auto shrink-0 btn-chunky"
        >
          <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
          <span>{showHint ? "Tutup Panduan" : "Panduan Detektif"}</span>
        </button>
      </div>

      {/* Popover Bantuan */}
      {showHint && (
        <div className="p-3.5 bg-amber-50 rounded-2xl border-2 border-amber-200 text-xs sm:text-sm font-semibold text-amber-950">
          {detHint}
        </div>
      )}
    </div>
  );
}
