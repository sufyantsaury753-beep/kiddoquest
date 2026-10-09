"use client";

import React, { useState, useEffect } from "react";
import { 
  Shuffle, 
  CheckCircle2, 
  Lightbulb, 
  Volume2,
  Sparkles,
  Calculator
} from "lucide-react";
import { sound } from "@/lib/sound";
import { 
  FruitVariable, 
  FRUIT_VARIABLES, 
  generateOptions 
} from "@/components/zones/math/MathFruitSvgs";

interface FruitCalculationViewProps {
  onEarnStars: (amount: number) => void;
  audioEnabled: boolean;
  liteMode: boolean;
}

export default function FruitCalculationView({
  onEarnStars,
  audioEnabled,
  liteMode,
}: FruitCalculationViewProps) {
  const [calcTerms, setCalcTerms] = useState<{ fruit: FruitVariable; count: number; op: "+" | "-" }[]>([]);
  const [calcAnswer, setCalcAnswer] = useState(0);
  const [calcOptions, setCalcOptions] = useState<number[]>([]);
  const [calcHint, setCalcHint] = useState("");
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showHint, setShowHint] = useState(false);

  const generateNewQuestion = () => {
    setSelectedAnswer(null);
    setIsCorrect(null);
    setShowHint(false);

    const shuffled = [...FRUIT_VARIABLES].sort(() => Math.random() - 0.5);
    const fruit1 = shuffled[0];
    const fruit2 = shuffled[1];
    const count1 = Math.floor(Math.random() * 2) + 1;
    const count2 = Math.floor(Math.random() * 2) + 1;

    const terms: { fruit: FruitVariable; count: number; op: "+" | "-" }[] = [
      { fruit: fruit1, count: count1, op: "+" },
      { fruit: fruit2, count: count2, op: "+" },
    ];
    const ans = count1 * fruit1.value + count2 * fruit2.value;
    setCalcTerms(terms);
    setCalcAnswer(ans);
    setCalcOptions(generateOptions(ans));
    setCalcHint(
      `1 ${fruit1.name} bernilai ${fruit1.value} (total: ${count1 * fruit1.value}). 1 ${fruit2.name} bernilai ${fruit2.value} (total: ${count2 * fruit2.value}). Jumlahkan kedua kelompok: ${count1 * fruit1.value} + ${count2 * fruit2.value} = ${ans}.`
    );
  };

  useEffect(() => {
    generateNewQuestion();
  }, []);

  const handleSelectAnswer = (ans: number) => {
    setSelectedAnswer(ans);
    if (ans === calcAnswer) {
      setIsCorrect(true);
      sound.playCelebration();
      onEarnStars(30);
      if (audioEnabled) {
        sound.speak(`Hebat sekali! Jawabanmu benar, yaitu ${ans}! Kamu mendapatkan 30 bintang!`);
      }
    } else {
      setIsCorrect(false);
      sound.playSocraticHint();
      if (audioEnabled) {
        sound.speak("Hampir tepat! Yuk cermati kembali nilai masing-masing buah dan jumlahkan!");
      }
    }
  };

  const handleSpeakTobi = () => {
    sound.playChime();
    if (!audioEnabled) return;
    sound.speak("Hitung nilai total dari buah-buah di layar! Setiap buah memiliki nilai angka rahasia masing-masing. Berapa totalnya?");
  };

  return (
    <div className="bg-white rounded-3xl border-4 border-rose-300 shadow-xl p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Header Kartu Stasiun */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b-2 border-rose-100">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-rose-500 text-white flex items-center justify-center shadow-md">
            <Calculator className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-display">
              Stasiun 1: Kalkulasi Buah Ajaib
            </h2>
            <p className="text-xs sm:text-sm font-semibold text-rose-700">
              Gunakan nilai rahasia setiap buah untuk menjumlahkan totalnya!
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

      {/* Main Calculation Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Kolom Kiri: Visual Nampan Buah & Persamaan */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center space-y-4">
          <div className="w-full bg-gradient-to-br from-rose-50 via-amber-50/40 to-rose-100/60 rounded-3xl border-3 border-rose-300 p-5 sm:p-7 shadow-inner flex flex-col items-center justify-center min-h-[220px]">
            <span className="text-[11px] font-black uppercase text-rose-700 bg-white/90 px-3 py-1 rounded-full border border-rose-200 shadow-sm mb-4">
              Hitung Nilai Total Buah di Nampan:
            </span>

            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 w-full">
              {calcTerms.map((t, idx) => (
                <React.Fragment key={idx}>
                  {idx > 0 && (
                    <span className="text-2xl sm:text-3xl font-black text-rose-600 px-1">+</span>
                  )}
                  <div className="flex items-center gap-2.5 bg-white p-2.5 sm:p-3.5 rounded-2xl border-2 border-rose-300 shadow-md">
                    <t.fruit.SvgComponent className="w-10 h-10 sm:w-12 sm:h-12" />
                    <div className="text-left">
                      <span className="text-xs sm:text-sm font-black text-slate-900 block leading-tight">
                        {t.count > 1 ? `${t.count}x ` : ""}{t.fruit.name}
                      </span>
                      <span className="text-[10px] sm:text-xs font-extrabold text-rose-600 block leading-tight">
                        (= {t.fruit.value})
                      </span>
                    </div>
                  </div>
                </React.Fragment>
              ))}

              <span className="text-2xl sm:text-3xl font-black text-rose-600 px-1">=</span>

              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-rose-600 text-white text-xl sm:text-2xl font-black flex items-center justify-center shadow-lg border-2 border-rose-700 animate-pulse">
                ?
              </div>
            </div>
          </div>

          {/* Banner Rumus Cepat */}
          <div className="w-full bg-rose-50/80 rounded-2xl border-2 border-rose-200 px-4 py-2.5 flex items-center justify-between text-xs sm:text-sm font-bold text-slate-700">
            <span className="font-extrabold text-rose-800">Rumus:</span>
            <span>
              {calcTerms.map((t, i) => `${i > 0 ? " + " : ""}(${t.count} × ${t.fruit.value})`).join("")} = ?
            </span>
          </div>
        </div>

        {/* Kolom Kanan: Pilihan Jawaban 2x2 & Feedback */}
        <div className="lg:col-span-5 flex flex-col justify-center space-y-3">
          <span className="text-xs sm:text-sm font-black text-rose-800 uppercase tracking-wider">
            Pilih Jawaban yang Tepat:
          </span>

          <div className="grid grid-cols-2 gap-3">
            {calcOptions.map((opt) => {
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

          {/* Feedback Banner */}
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
                      ? `Hebat! Jawabanmu ${calcAnswer} benar (+30 Bintang)`
                      : "Kurang tepat! Coba hitung lagi nilai buahnya ya."}
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
                Ketik atau ketuk pilihan angka di atas untuk menjawab!
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Cheat Sheet Nilai 10 Buah */}
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
          <span>{showHint ? "Tutup Panduan" : "Panduan Hint"}</span>
        </button>
      </div>

      {/* Hint Popover */}
      {showHint && (
        <div className="p-3.5 bg-amber-50 rounded-2xl border-2 border-amber-200 text-xs sm:text-sm font-semibold text-amber-950">
          {calcHint}
        </div>
      )}
    </div>
  );
}
