"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { 
  X, 
  Apple, 
  RotateCcw, 
  Sparkles, 
  Star, 
  CheckCircle, 
  Volume2, 
  Layers,
  HelpCircle,
  Shuffle
} from "lucide-react";
import { sound } from "@/lib/sound";

interface MathAdventureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEarnStars: (amount: number) => void;
  audioEnabled: boolean;
  liteMode: boolean;
}

interface StoryProblem {
  id: string;
  initial: number;
  toPick: number;
  story: string;
}

const STORY_PROBLEMS: StoryProblem[] = [
  {
    id: "sp-1",
    initial: 2,
    toPick: 3,
    story: "Di keranjang sudah ada 2 apel manis. Ayo petik 3 apel lagi dari pohon! Berapa total semua apel sekarang?",
  },
  {
    id: "sp-2",
    initial: 1,
    toPick: 4,
    story: "Ibu guru menyimpan 1 apel di keranjang. Ayo petik 4 apel lagi dari pohon rindang!",
  },
  {
    id: "sp-3",
    initial: 3,
    toPick: 2,
    story: "Tobi kemarin mengumpulkan 3 apel. Hari ini bantu Tobi memetik 2 apel lagi ya!",
  },
  {
    id: "sp-4",
    initial: 4,
    toPick: 3,
    story: "Ada 4 apel di dalam keranjang. Ayo petik 3 apel manis lagi dari dahan pohon!",
  },
  {
    id: "sp-5",
    initial: 2,
    toPick: 5,
    story: "Tobi baru punya 2 apel di keranjang. Ayo petik 5 apel segar lagi untuk pesta buah!",
  },
  {
    id: "sp-6",
    initial: 5,
    toPick: 3,
    story: "Di keranjang sudah ada 5 apel merah. Ayo petik 3 apel lagi sampai penuh!",
  },
  {
    id: "sp-7",
    initial: 3,
    toPick: 4,
    story: "Keranjang sudah berisi 3 apel. Petik 4 apel lagi dari pohon ajaib!",
  },
];

export default function MathAdventureModal({
  isOpen,
  onClose,
  onEarnStars,
  audioEnabled,
  liteMode,
}: MathAdventureModalProps) {
  // Mode: "randomPick" (Petik Bebas Target Acak) vs "storyAddition" (Soal Cerita Penjumlahan)
  const [activeMode, setActiveMode] = useState<"randomPick" | "storyAddition">("randomPick");

  const TOTAL_APPLES = 10;

  // Mode 1: Random Target State
  const [randomTarget, setRandomTarget] = useState<number>(() => Math.floor(Math.random() * 8) + 2); // 2-9 initially
  const [treeApples, setTreeApples] = useState<number[]>(
    Array.from({ length: TOTAL_APPLES }, (_, i) => i + 1)
  );
  const [basketApples, setBasketApples] = useState<number[]>([]);
  const [randomCompleted, setRandomCompleted] = useState<boolean>(false);

  // Mode 2: Story Problem State
  const [currentStoryIdx, setCurrentStoryIdx] = useState<number>(0);
  const activeStory = STORY_PROBLEMS[currentStoryIdx];
  const [storyTreeApples, setStoryTreeApples] = useState<number[]>(() => 
    Array.from({ length: TOTAL_APPLES - activeStory.initial }, (_, i) => i + 1)
  );
  const [storyPickedApples, setStoryPickedApples] = useState<number[]>([]);
  const [storyCompleted, setStoryCompleted] = useState<boolean>(false);

  if (!isOpen) return null;

  // --- MODE 1 HANDLERS ---
  const getRandomNumber = (current: number): number => {
    let next = Math.floor(Math.random() * 9) + 1; // 1 to 9
    if (next === current) next = next === 9 ? 4 : next + 1;
    return next;
  };

  const handlePickRandomApple = (id: number) => {
    if (randomCompleted) return;
    sound.playChime();
    setTreeApples((prev) => prev.filter((item) => item !== id));
    setBasketApples((prev) => {
      const next = [...prev, id];
      if (next.length === randomTarget) {
        setRandomCompleted(true);
        sound.playCelebration();
        onEarnStars(30);
        if (!liteMode) {
          confetti({
            particleCount: 50,
            spread: 70,
            origin: { y: 0.6 },
            colors: ["#ef4444", "#f59e0b", "#34d399", "#38bdf8"],
          });
        }
        if (audioEnabled) {
          sound.speak(`Hore! Tepat sekali! Ada ${randomTarget} buah apel di dalam keranjang! Kamu hebat sekali berhitung!`);
        }
      }
      return next;
    });
  };

  const handleReturnRandomApple = (id: number) => {
    if (randomCompleted) return;
    sound.playChime();
    setBasketApples((prev) => prev.filter((item) => item !== id));
    setTreeApples((prev) => [...prev, id]);
  };

  const handleShuffleRandomTarget = () => {
    const newTarget = getRandomNumber(randomTarget);
    setRandomTarget(newTarget);
    setTreeApples(Array.from({ length: TOTAL_APPLES }, (_, i) => i + 1));
    setBasketApples([]);
    setRandomCompleted(false);
    sound.playChime();
    if (audioEnabled) {
      sound.speak(`Soal baru! Ayo petik ${newTarget} apel manis ke dalam keranjang!`);
    }
  };

  const handleResetRandom = () => {
    setTreeApples(Array.from({ length: TOTAL_APPLES }, (_, i) => i + 1));
    setBasketApples([]);
    setRandomCompleted(false);
    sound.playChime();
  };

  // --- MODE 2 HANDLERS ---
  const handlePickStoryApple = (id: number) => {
    if (storyCompleted) return;
    sound.playChime();
    setStoryTreeApples((prev) => prev.filter((item) => item !== id));
    setStoryPickedApples((prev) => {
      const next = [...prev, id];
      if (next.length === activeStory.toPick) {
        setStoryCompleted(true);
        sound.playCelebration();
        onEarnStars(35);
        if (!liteMode) {
          confetti({
            particleCount: 60,
            spread: 75,
            origin: { y: 0.6 },
            colors: ["#ef4444", "#fbbf24", "#10b981", "#8b5cf6"],
          });
        }
        const total = activeStory.initial + activeStory.toPick;
        if (audioEnabled) {
          sound.speak(
            `Luar biasa! ${activeStory.initial} apel awal ditambah ${activeStory.toPick} apel yang kamu petik sama dengan ${total} apel! Penjumlahan berhasil!`
          );
        }
      }
      return next;
    });
  };

  const handleReturnStoryApple = (id: number) => {
    if (storyCompleted) return;
    sound.playChime();
    setStoryPickedApples((prev) => prev.filter((item) => item !== id));
    setStoryTreeApples((prev) => [...prev, id]);
  };

  const handleNextStoryProblem = () => {
    const nextIdx = (currentStoryIdx + 1) % STORY_PROBLEMS.length;
    const nextProblem = STORY_PROBLEMS[nextIdx];
    setCurrentStoryIdx(nextIdx);
    setStoryTreeApples(Array.from({ length: TOTAL_APPLES - nextProblem.initial }, (_, i) => i + 1));
    setStoryPickedApples([]);
    setStoryCompleted(false);
    sound.playChime();
    if (audioEnabled) {
      sound.speak(nextProblem.story);
    }
  };

  const handleResetStory = () => {
    setStoryTreeApples(Array.from({ length: TOTAL_APPLES - activeStory.initial }, (_, i) => i + 1));
    setStoryPickedApples([]);
    setStoryCompleted(false);
    sound.playChime();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-5 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl border-4 border-rose-400 shadow-2xl p-4 sm:p-7 overflow-hidden my-auto">
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
                Manipulatif Matematika Visual Konkret: Sentuh Buah, Hitung & Penjumlahan
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

        {/* Mode Switcher Tabs */}
        <div className="flex items-center gap-2 mb-5">
          <button
            onClick={() => {
              setActiveMode("randomPick");
              sound.playChime();
            }}
            className={`flex-1 py-2 sm:py-2.5 px-3 rounded-2xl font-black text-xs sm:text-sm border-2 btn-chunky flex items-center justify-center gap-2 ${
              activeMode === "randomPick"
                ? "bg-rose-500 text-white border-rose-600 shadow-[0_3px_0_0_#9f1239]"
                : "bg-slate-100 text-slate-700 border-slate-200 hover:bg-rose-50"
            }`}
          >
            <Shuffle className="w-4 h-4" />
            <span>Mode 1: Target Apel Acak (1–10)</span>
          </button>

          <button
            onClick={() => {
              setActiveMode("storyAddition");
              sound.playChime();
              if (audioEnabled) sound.speak(activeStory.story);
            }}
            className={`flex-1 py-2 sm:py-2.5 px-3 rounded-2xl font-black text-xs sm:text-sm border-2 btn-chunky flex items-center justify-center gap-2 ${
              activeMode === "storyAddition"
                ? "bg-purple-600 text-white border-purple-700 shadow-[0_3px_0_0_#581c87]"
                : "bg-slate-100 text-slate-700 border-slate-200 hover:bg-purple-50"
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Mode 2: Soal Cerita Penjumlahan Visual</span>
          </button>
        </div>

        {/* ========================================================= */}
        {/* MODE 1: RANDOM TARGET PICKING */}
        {/* ========================================================= */}
        {activeMode === "randomPick" && (
          <div>
            {/* Mission Goal Box */}
            <div className="bg-rose-50/80 rounded-2xl p-4 border-2 border-rose-200 mb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[11px] font-black uppercase tracking-wider text-rose-800 bg-rose-200 px-2.5 py-0.5 rounded-full border border-rose-300">
                    🎯 Misi Target Acak
                  </span>
                  <span className="text-[11px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full border border-amber-300 flex items-center gap-1">
                    <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                    +30 Bintang
                  </span>
                </div>
                <p className="text-sm sm:text-base font-extrabold text-slate-800">
                  Petik <span className="text-rose-600 text-xl font-black px-1.5 py-0.5 bg-rose-100 rounded-lg">{randomTarget}</span> apel manis dari pohon ke dalam keranjang!
                </p>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center">
                <button
                  onClick={() => {
                    sound.playChime();
                    if (audioEnabled) sound.speak(`Ayo petik ${randomTarget} apel manis ke dalam keranjang!`);
                  }}
                  className="p-2 rounded-xl bg-white hover:bg-rose-100 text-rose-600 border border-rose-300 shadow-sm"
                  title="Dengarkan soal"
                >
                  <Volume2 className="w-5 h-5" />
                </button>
                <button
                  onClick={handleShuffleRandomTarget}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-amber-950 text-xs font-black border border-amber-500 btn-chunky shadow-sm"
                  title="Acak target apel baru"
                >
                  <Shuffle className="w-3.5 h-3.5" />
                  <span>Acak Soal Baru</span>
                </button>
              </div>
            </div>

            {/* Tree Canopy */}
            <div className="relative rounded-3xl bg-gradient-to-b from-sky-200 via-emerald-100 to-amber-50 p-5 sm:p-6 border-4 border-emerald-300 min-h-[200px] flex flex-col items-center justify-center overflow-hidden">
              <div className="w-full max-w-lg rounded-[36px] bg-emerald-500/90 border-4 border-emerald-600 p-4 sm:p-5 shadow-lg flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5 relative z-10">
                {treeApples.map((appleId) => (
                  <button
                    key={appleId}
                    onClick={() => handlePickRandomApple(appleId)}
                    className="w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-rose-500 hover:bg-rose-600 border-2 border-rose-700 shadow-[0_3px_0_0_#9f1239] flex flex-col items-center justify-center text-white text-base active:scale-95 transition-transform btn-chunky cursor-pointer"
                    title="Petik apel ini!"
                  >
                    <span>🍎</span>
                  </button>
                ))}

                {treeApples.length === 0 && (
                  <p className="text-emerald-100 font-bold text-xs py-3">
                    Pohon sudah kosong! Semua apel sudah dipetik.
                  </p>
                )}
              </div>
              <div className="w-14 h-10 bg-amber-800 border-x-4 border-amber-950 -mt-2 z-0" />

              <div className="absolute top-2 left-3 bg-white/85 backdrop-blur-sm px-2.5 py-1 rounded-full text-[11px] font-black text-slate-700 border border-slate-300">
                🌳 Sisa di Pohon: {treeApples.length} Apel
              </div>
            </div>

            {/* Basket */}
            <div className="mt-4 bg-amber-100/90 rounded-3xl p-4 sm:p-5 border-4 border-amber-400 shadow-md">
              <div className="flex items-center justify-between mb-2.5">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🧺</span>
                  <div>
                    <h4 className="text-sm sm:text-base font-extrabold text-amber-950 font-display">
                      Keranjang Buah Tobi
                    </h4>
                    <p className="text-[11px] text-amber-800 font-semibold">
                      (Klik apel di dalam keranjang jika ingin mengembalikannya ke pohon)
                    </p>
                  </div>
                </div>

                <div className={`px-4 py-1.5 rounded-2xl font-black text-sm border-2 ${
                  basketApples.length === randomTarget
                    ? "bg-emerald-500 text-white border-emerald-600 shadow-[0_3px_0_0_#065f46]"
                    : "bg-white text-slate-800 border-amber-400"
                }`}>
                  {basketApples.length} / {randomTarget} Apel
                </div>
              </div>

              <div className="min-h-[65px] bg-white/80 rounded-2xl p-2.5 border-2 border-amber-300 flex flex-wrap items-center gap-2">
                {basketApples.map((appleId) => (
                  <button
                    key={appleId}
                    onClick={() => handleReturnRandomApple(appleId)}
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

            {/* Bottom CPA Equation */}
            <div className="mt-4 p-3.5 rounded-2xl bg-slate-50 border-2 border-slate-200 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="text-xs font-black uppercase text-slate-500">Persamaan CPA:</span>
                <div className="font-display font-extrabold text-sm sm:text-base text-slate-800 bg-white px-3 py-1 rounded-xl border border-slate-300">
                  {TOTAL_APPLES} - {treeApples.length} = <span className="text-rose-600 font-black">{basketApples.length}</span> Apel
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleResetRandom}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold btn-chunky"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset</span>
                </button>
                {randomCompleted && (
                  <button
                    onClick={handleShuffleRandomTarget}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-black btn-chunky animate-bounce"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>Target Berhasil! Soal Baru ➔</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* MODE 2: STORY ADDITION (PENJUMLAHAN VISUAL) */}
        {/* ========================================================= */}
        {activeMode === "storyAddition" && (
          <div>
            {/* Story Prompt Card */}
            <div className="bg-purple-50 rounded-2xl p-4 border-2 border-purple-300 mb-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start gap-3">
                  <span className="text-2xl sm:text-3xl">📖</span>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[11px] font-black uppercase text-purple-900 bg-purple-200 px-2.5 py-0.5 rounded-full border border-purple-400">
                        Soal Cerita Penjumlahan ({currentStoryIdx + 1}/{STORY_PROBLEMS.length})
                      </span>
                      <span className="text-[11px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full border border-amber-300 flex items-center gap-1">
                        <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                        +35 Bintang
                      </span>
                    </div>
                    <p className="text-sm sm:text-base font-black text-slate-800 leading-snug">
                      "{activeStory.story}"
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center flex-shrink-0">
                  <button
                    onClick={() => {
                      sound.playChime();
                      if (audioEnabled) sound.speak(activeStory.story);
                    }}
                    className="p-2 rounded-xl bg-white hover:bg-purple-100 text-purple-800 border border-purple-300 shadow-sm"
                    title="Dengarkan cerita"
                  >
                    <Volume2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleNextStoryProblem}
                    className="px-3 py-1.5 rounded-xl bg-white hover:bg-purple-100 text-purple-900 text-xs font-black border border-purple-300 btn-chunky"
                  >
                    Soal Berikutnya ➔
                  </button>
                </div>
              </div>

              {/* Formula Blueprint */}
              <div className="mt-3 pt-3 border-t border-purple-200/80 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-xs font-black text-purple-950">
                  <span>Misi Penjumlahan:</span>
                  <span className="px-2 py-0.5 rounded-lg bg-amber-200 border border-amber-400">
                    {activeStory.initial} Apel Awal
                  </span>
                  <span>+</span>
                  <span className="px-2 py-0.5 rounded-lg bg-rose-200 border border-rose-400">
                    Petik {activeStory.toPick} Apel Lagi
                  </span>
                  <span>=</span>
                  <span className="px-2 py-0.5 rounded-lg bg-emerald-200 border border-emerald-400">
                    Total {activeStory.initial + activeStory.toPick} Apel
                  </span>
                </div>

                <span className="text-[11px] font-bold text-purple-700">
                  Petik {activeStory.toPick - storyPickedApples.length} apel lagi dari dahan pohon!
                </span>
              </div>
            </div>

            {/* Tree Canopy for Story Mode */}
            <div className="relative rounded-3xl bg-gradient-to-b from-sky-200 via-emerald-100 to-purple-50 p-5 sm:p-6 border-4 border-emerald-300 min-h-[190px] flex flex-col items-center justify-center overflow-hidden">
              <div className="w-full max-w-lg rounded-[36px] bg-emerald-500/90 border-4 border-emerald-600 p-4 sm:p-5 shadow-lg flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5 relative z-10">
                {storyTreeApples.map((appleId) => (
                  <button
                    key={appleId}
                    onClick={() => handlePickStoryApple(appleId)}
                    className="w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-rose-500 hover:bg-rose-600 border-2 border-rose-700 shadow-[0_3px_0_0_#9f1239] flex flex-col items-center justify-center text-white text-base active:scale-95 transition-transform btn-chunky cursor-pointer"
                    title="Petik apel untuk menambah!"
                  >
                    <span>🍎</span>
                  </button>
                ))}

                {storyTreeApples.length === 0 && (
                  <p className="text-emerald-100 font-bold text-xs py-3">
                    Semua apel di pohon sudah dipetik!
                  </p>
                )}
              </div>
              <div className="w-14 h-10 bg-amber-800 border-x-4 border-amber-950 -mt-2 z-0" />

              <div className="absolute top-2 left-3 bg-white/85 backdrop-blur-sm px-2.5 py-1 rounded-full text-[11px] font-black text-slate-700 border border-slate-300">
                🌳 Apel di Pohon: {storyTreeApples.length}
              </div>
            </div>

            {/* Basket in Story Mode */}
            <div className="mt-4 bg-amber-100/90 rounded-3xl p-4 sm:p-5 border-4 border-amber-400 shadow-md">
              <div className="flex items-center justify-between mb-2.5">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🧺</span>
                  <div>
                    <h4 className="text-sm sm:text-base font-extrabold text-amber-950 font-display">
                      Keranjang Penjumlahan Visual
                    </h4>
                    <p className="text-[11px] text-amber-800 font-semibold">
                      Gabungan apel awal ({activeStory.initial}) dan apel yang baru kamu petik ({storyPickedApples.length})
                    </p>
                  </div>
                </div>

                <div className={`px-4 py-1.5 rounded-2xl font-black text-sm border-2 ${
                  storyCompleted
                    ? "bg-emerald-500 text-white border-emerald-600 shadow-[0_3px_0_0_#065f46]"
                    : "bg-white text-purple-900 border-purple-400"
                }`}>
                  Total: {activeStory.initial + storyPickedApples.length} / {activeStory.initial + activeStory.toPick} Apel
                </div>
              </div>

              {/* Basket Content */}
              <div className="min-h-[65px] bg-white/80 rounded-2xl p-2.5 border-2 border-amber-300 flex flex-wrap items-center gap-2">
                {/* 1. Pre-existing Apples */}
                {Array.from({ length: activeStory.initial }, (_, i) => (
                  <div
                    key={`init-${i}`}
                    className="px-2.5 py-1.5 rounded-xl bg-amber-200 border-2 border-amber-500 text-amber-950 font-black text-xs flex items-center gap-1 shadow-sm select-none"
                    title="Apel yang sudah ada di keranjang sejak awal"
                  >
                    <span>🍎</span>
                    <span>Awal #{i + 1}</span>
                  </div>
                ))}

                {/* 2. Newly Picked Apples */}
                {storyPickedApples.map((appleId) => (
                  <button
                    key={appleId}
                    onClick={() => handleReturnStoryApple(appleId)}
                    className="px-2.5 py-1.5 rounded-xl bg-rose-100 border-2 border-rose-400 text-rose-900 font-black text-xs flex items-center gap-1 hover:bg-rose-200 btn-chunky"
                    title="Klik untuk kembalikan ke pohon"
                  >
                    <span>🍎</span>
                    <span>Dipetik #{appleId}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Dynamic Addition Formula Display */}
            <div className="mt-4 p-3.5 rounded-2xl bg-purple-50 border-2 border-purple-300 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="text-xs font-black uppercase text-purple-900">Visualisasi Penjumlahan:</span>
                <div className="font-display font-black text-base sm:text-lg text-slate-800 bg-white px-4 py-1 rounded-xl border border-purple-300 flex items-center gap-2">
                  <span className="text-amber-700">{activeStory.initial} (Awal)</span>
                  <span>+</span>
                  <span className="text-rose-600">{storyPickedApples.length} (Dipetik)</span>
                  <span>=</span>
                  <span className="text-emerald-600 text-xl">{activeStory.initial + storyPickedApples.length} Total</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleResetStory}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold btn-chunky"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Ulangi</span>
                </button>

                {storyCompleted && (
                  <button
                    onClick={handleNextStoryProblem}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-black btn-chunky animate-bounce"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>Penjumlahan Berhasil! Soal Cerita Baru ➔</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
