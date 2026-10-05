"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { X, Apple, RotateCcw, Sparkles, Star, CheckCircle, Volume2 } from "lucide-react";
import { sound } from "@/lib/sound";

interface MathAdventureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEarnStars: (amount: number) => void;
  audioEnabled: boolean;
  liteMode: boolean;
}

export default function MathAdventureModal({
  isOpen,
  onClose,
  onEarnStars,
  audioEnabled,
  liteMode,
}: MathAdventureModalProps) {
  // Total apples on tree initially
  const TOTAL_APPLES = 10;
  const [treeApples, setTreeApples] = useState<number[]>(
    Array.from({ length: TOTAL_APPLES }, (_, i) => i + 1)
  );
  const [basketApples, setBasketApples] = useState<number[]>([]);
  const [targetCount, setTargetCount] = useState<number>(5);
  const [completed, setCompleted] = useState<boolean>(false);

  if (!isOpen) return null;

  const handlePickApple = (id: number) => {
    if (completed) return;
    sound.playChime();
    setTreeApples((prev) => prev.filter((item) => item !== id));
    setBasketApples((prev) => {
      const next = [...prev, id];
      if (next.length === targetCount) {
        setCompleted(true);
        sound.playCelebration();
        onEarnStars(30);
        if (!liteMode) {
          confetti({
            particleCount: 50,
            spread: 70,
            origin: { y: 0.6 },
          });
        }
        if (audioEnabled) {
          sound.speak(`Hore! Tepat sekali! Ada ${targetCount} apel manis di dalam keranjang! Kamu pintar sekali berhitung!`);
        }
      }
      return next;
    });
  };

  const handleReturnApple = (id: number) => {
    if (completed) return;
    sound.playChime();
    setBasketApples((prev) => prev.filter((item) => item !== id));
    setTreeApples((prev) => [...prev, id]);
  };

  const handleReset = (newTarget?: number) => {
    setTreeApples(Array.from({ length: TOTAL_APPLES }, (_, i) => i + 1));
    setBasketApples([]);
    setCompleted(false);
    if (newTarget) {
      setTargetCount(newTarget);
    }
    sound.playChime();
  };

  const handleSpeakInstruction = () => {
    sound.playChime();
    if (audioEnabled) {
      sound.speak(
        `Misi berhitung ceria! Ayo petik ${targetCount} apel manis dari dahan pohon dan masukkan ke dalam keranjang di bawah!`
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl border-4 border-rose-400 shadow-2xl p-5 sm:p-7 overflow-hidden my-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b-2 border-rose-100 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center border border-rose-300">
              <Apple className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-black font-display text-slate-800">
                Pohon Apel Hitung Ceria 🍎
              </h3>
              <p className="text-xs font-semibold text-rose-700">
                Manipulatif Matematika Konkret: Sentuh & Hitung Buah Nyata
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

        {/* Mission Goal Box */}
        <div className="bg-rose-50/80 rounded-2xl p-4 border-2 border-rose-200 mb-5 flex items-center justify-between gap-3">
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-rose-800 block">
              🎯 Misi Berhitung Hari Ini:
            </span>
            <p className="text-sm sm:text-base font-extrabold text-slate-800">
              Petik <span className="text-rose-600 text-lg font-black">{targetCount}</span> apel manis dari pohon ke dalam keranjang!
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSpeakInstruction}
              className="p-2 rounded-xl bg-white hover:bg-rose-100 text-rose-600 border border-rose-300 shadow-sm"
              title="Dengarkan soal"
            >
              <Volume2 className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleReset(targetCount === 5 ? 7 : 5)}
              className="px-3 py-1.5 rounded-xl bg-white hover:bg-rose-100 text-rose-800 text-xs font-bold border border-rose-300 btn-chunky"
            >
              Ganti Soal
            </button>
          </div>
        </div>

        {/* Interactive Tree & Apple Canopy */}
        <div className="relative rounded-3xl bg-gradient-to-b from-sky-200 via-emerald-100 to-amber-50 p-6 border-4 border-emerald-300 min-h-[220px] flex flex-col items-center justify-center overflow-hidden">
          {/* Tree Leaf Cloud */}
          <div className="w-full max-w-lg rounded-[40px] bg-emerald-500/90 border-4 border-emerald-600 p-5 shadow-lg flex flex-wrap items-center justify-center gap-3 sm:gap-4 relative z-10">
            {treeApples.map((appleId) => (
              <button
                key={appleId}
                onClick={() => handlePickApple(appleId)}
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-rose-500 hover:bg-rose-600 border-2 border-rose-700 shadow-[0_3px_0_0_#9f1239] flex flex-col items-center justify-center text-white text-lg active:scale-95 transition-transform btn-chunky cursor-pointer group"
                title="Petik apel ini!"
              >
                <span>🍎</span>
              </button>
            ))}

            {treeApples.length === 0 && (
              <p className="text-emerald-100 font-bold text-xs py-4">
                Pohon sudah kosong! Semua apel sudah dipetik.
              </p>
            )}
          </div>

          {/* Tree Trunk */}
          <div className="w-16 h-12 bg-amber-800 border-x-4 border-amber-950 -mt-2 z-0" />

          {/* Floating Instructions */}
          <div className="absolute top-2 left-3 bg-white/80 backdrop-blur-sm px-2.5 py-1 rounded-full text-[11px] font-black text-slate-700 border border-slate-300">
            🌳 Sisa di Pohon: {treeApples.length} Apel
          </div>
        </div>

        {/* The Basket Section */}
        <div className="mt-5 bg-amber-100/90 rounded-3xl p-5 border-4 border-amber-400 shadow-md">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🧺</span>
              <div>
                <h4 className="text-sm sm:text-base font-extrabold text-amber-950 font-display">
                  Keranjang Buah Tobi
                </h4>
                <p className="text-xs text-amber-800 font-semibold">
                  (Klik apel di dalam keranjang jika ingin mengembalikannya ke pohon)
                </p>
              </div>
            </div>

            {/* Live Count Pill */}
            <div className={`px-4 py-1.5 rounded-2xl font-black text-sm border-2 ${
              basketApples.length === targetCount
                ? "bg-emerald-500 text-white border-emerald-600 shadow-[0_3px_0_0_#065f46]"
                : "bg-white text-slate-800 border-amber-400"
            }`}>
              {basketApples.length} / {targetCount} Apel
            </div>
          </div>

          {/* Apples inside Basket */}
          <div className="min-h-[70px] bg-white/80 rounded-2xl p-3 border-2 border-amber-300 flex flex-wrap items-center gap-2.5">
            {basketApples.map((appleId) => (
              <button
                key={appleId}
                onClick={() => handleReturnApple(appleId)}
                className="px-3 py-1.5 rounded-xl bg-rose-100 border border-rose-400 text-rose-900 font-extrabold text-xs flex items-center gap-1 hover:bg-rose-200 btn-chunky"
                title="Kembalikan ke pohon"
              >
                <span>🍎</span>
                <span>Apel #{appleId}</span>
              </button>
            ))}

            {basketApples.length === 0 && (
              <p className="text-slate-400 font-medium text-xs italic mx-auto">
                Keranjang masih kosong. Klik buah apel di atas pohon untuk memetiknya!
              </p>
            )}
          </div>
        </div>

        {/* Concrete-Pictorial-Abstract Equation Bar */}
        <div className="mt-5 p-4 rounded-2xl bg-slate-50 border-2 border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="text-xs font-black uppercase tracking-wider text-slate-500">
              Persamaan CPA:
            </div>
            <div className="font-display font-extrabold text-base sm:text-lg text-slate-800 bg-white px-3 py-1 rounded-xl border border-slate-300">
              {TOTAL_APPLES} - {treeApples.length} = <span className="text-rose-600 font-black">{basketApples.length}</span> Apel
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleReset()}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold btn-chunky"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Mulai Ulang</span>
            </button>

            {completed && (
              <div className="flex items-center gap-1.5 text-xs font-black text-emerald-700 bg-emerald-100 px-3 py-1.5 rounded-xl border border-emerald-300 animate-bounce">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>+30 Bintang Berhasil Diraih!</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
