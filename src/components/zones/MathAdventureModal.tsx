"use client";

import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { 
  X, 
  RotateCcw, 
  Sparkles, 
  Star, 
  CheckCircle, 
  Volume2, 
  HelpCircle, 
  Shuffle,
  ArrowRight,
  Lightbulb,
  Search,
  Calculator
} from "lucide-react";
import { sound } from "@/lib/sound";

interface MathAdventureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEarnStars: (amount: number) => void;
  audioEnabled: boolean;
  liteMode: boolean;
}

/* =========================================================================
   100% PURE SVG ILUSTRASI 10 BUAH VARIABEL LOGIKA MATEMATIKA (NO EMOJI)
   ========================================================================= */

// 1. Ceri (Nilai: 1)
const CherrySvg = ({ className = "w-10 h-10" }: { className?: string }) => (
  <svg viewBox="0 0 48 48" className={className} fill="none">
    <path d="M24 8 C25 6 27 6 28 7" stroke="#65a30d" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M26 8 C32 6 34 10 30 12 C26 12 26 9 26 8 Z" fill="#22c55e" stroke="#15803d" strokeWidth="1" />
    <path d="M26 8 C21 16 16 22 17 28" stroke="#65a30d" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M26 8 C28 16 33 22 32 28" stroke="#65a30d" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="16" cy="32" r="8" fill="#dc2626" stroke="#991b1c" strokeWidth="2" />
    <circle cx="13" cy="29" r="2" fill="white" opacity="0.65" />
    <circle cx="32" cy="32" r="8" fill="#dc2626" stroke="#991b1c" strokeWidth="2" />
    <circle cx="29" cy="29" r="2" fill="white" opacity="0.65" />
  </svg>
);

// 2. Apel (Nilai: 2)
const AppleSvg = ({ className = "w-10 h-10" }: { className?: string }) => (
  <svg viewBox="0 0 48 48" className={className} fill="none">
    <path d="M24 14 C24 8 28 6 30 6" stroke="#78350f" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M25 10 C32 8 34 13 31 16 C26 16 25 12 25 10 Z" fill="#22c55e" stroke="#15803d" strokeWidth="1" />
    <path
      d="M24 16 C19 12 10 14 10 24 C10 35 18 42 24 42 C30 42 38 35 38 24 C38 14 29 12 24 16 Z"
      fill="#ef4444"
      stroke="#b91c1c"
      strokeWidth="2"
    />
    <path d="M15 20 C13 24 14 30 16 34" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.65" />
  </svg>
);

// 3. Jeruk (Nilai: 3)
const OrangeSvg = ({ className = "w-10 h-10" }: { className?: string }) => (
  <svg viewBox="0 0 48 48" className={className} fill="none">
    <path d="M24 12 V8" stroke="#78350f" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M24 10 C30 6 34 9 32 14 C27 15 25 12 24 10 Z" fill="#22c55e" stroke="#15803d" strokeWidth="1" />
    <circle cx="24" cy="27" r="15" fill="#f97316" stroke="#c2410c" strokeWidth="2" />
    <circle cx="20" cy="23" r="1" fill="#fdba74" />
    <circle cx="28" cy="22" r="1" fill="#fdba74" />
    <circle cx="25" cy="30" r="1" fill="#fdba74" />
    <circle cx="18" cy="31" r="1" fill="#fdba74" />
    <path d="M15 22 C14 25 15 29 17 33" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.55" />
  </svg>
);

// 4. Pisang (Nilai: 4)
const BananaSvg = ({ className = "w-10 h-10" }: { className?: string }) => (
  <svg viewBox="0 0 48 48" className={className} fill="none">
    <path d="M36 12 L38 8" stroke="#65a30d" strokeWidth="2.5" strokeLinecap="round" />
    <path
      d="M36 12 C30 20 18 28 8 26 C12 34 26 38 36 24 C38 21 38 16 36 12 Z"
      fill="#facc15"
      stroke="#ca8a04"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <path d="M34 16 C26 24 18 30 10 28" stroke="#eab308" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="8" cy="26" r="1.5" fill="#78350f" />
    <path d="M31 19 C24 26 19 31 14 31" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.65" />
  </svg>
);

// 5. Stroberi (Nilai: 5)
const StrawberrySvg = ({ className = "w-10 h-10" }: { className?: string }) => (
  <svg viewBox="0 0 48 48" className={className} fill="none">
    <path d="M24 14 L24 8" stroke="#15803d" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M24 14 C20 10 14 12 16 16 C20 16 23 15 24 14 Z" fill="#22c55e" stroke="#15803d" strokeWidth="1" />
    <path d="M24 14 C28 10 34 12 32 16 C28 16 25 15 24 14 Z" fill="#22c55e" stroke="#15803d" strokeWidth="1" />
    <path
      d="M24 16 C14 16 11 25 15 34 C18 40 24 44 24 44 C24 44 30 40 33 34 C37 25 34 16 24 16 Z"
      fill="#f43f5e"
      stroke="#be123c"
      strokeWidth="2"
    />
    <circle cx="20" cy="23" r="1" fill="#fef08a" />
    <circle cx="28" cy="23" r="1" fill="#fef08a" />
    <circle cx="17" cy="29" r="1" fill="#fef08a" />
    <circle cx="24" cy="29" r="1" fill="#fef08a" />
    <circle cx="31" cy="29" r="1" fill="#fef08a" />
    <circle cx="21" cy="35" r="1" fill="#fef08a" />
    <circle cx="27" cy="35" r="1" fill="#fef08a" />
  </svg>
);

// 6. Anggur (Nilai: 6)
const GrapeSvg = ({ className = "w-10 h-10" }: { className?: string }) => (
  <svg viewBox="0 0 48 48" className={className} fill="none">
    <path d="M24 12 C24 6 28 6 30 8" stroke="#78350f" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M24 10 C20 8 16 10 18 14" stroke="#15803d" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="19" cy="18" r="5" fill="#a855f7" stroke="#7e22ce" strokeWidth="1.5" />
    <circle cx="29" cy="18" r="5" fill="#a855f7" stroke="#7e22ce" strokeWidth="1.5" />
    <circle cx="24" cy="20" r="5" fill="#9333ea" stroke="#6b21a8" strokeWidth="1.5" />
    <circle cx="15" cy="26" r="5" fill="#a855f7" stroke="#7e22ce" strokeWidth="1.5" />
    <circle cx="24" cy="27" r="5" fill="#9333ea" stroke="#6b21a8" strokeWidth="1.5" />
    <circle cx="33" cy="26" r="5" fill="#a855f7" stroke="#7e22ce" strokeWidth="1.5" />
    <circle cx="19" cy="33" r="5" fill="#9333ea" stroke="#6b21a8" strokeWidth="1.5" />
    <circle cx="29" cy="33" r="5" fill="#9333ea" stroke="#6b21a8" strokeWidth="1.5" />
    <circle cx="24" cy="39" r="4.5" fill="#7e22ce" stroke="#581c87" strokeWidth="1.5" />
    <circle cx="17" cy="16" r="1.5" fill="white" opacity="0.6" />
    <circle cx="22" cy="25" r="1.5" fill="white" opacity="0.6" />
  </svg>
);

// 7. Semangka (Nilai: 7)
const WatermelonSvg = ({ className = "w-10 h-10" }: { className?: string }) => (
  <svg viewBox="0 0 48 48" className={className} fill="none">
    <path
      d="M10 36 C18 42 30 42 38 36 L24 8 Z"
      fill="#15803d"
      stroke="#14532d"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <path d="M12 34 C19 39 29 39 36 34 L24 11 Z" fill="#bbf7d0" />
    <path d="M14 32 C20 37 28 37 34 32 L24 14 Z" fill="#ef4444" stroke="#dc2626" strokeWidth="1" />
    <circle cx="20" cy="27" r="1" fill="#0f172a" />
    <circle cx="28" cy="27" r="1" fill="#0f172a" />
    <circle cx="24" cy="22" r="1" fill="#0f172a" />
    <circle cx="24" cy="31" r="1" fill="#0f172a" />
  </svg>
);

// 8. Nanas (Nilai: 8)
const PineappleSvg = ({ className = "w-10 h-10" }: { className?: string }) => (
  <svg viewBox="0 0 48 48" className={className} fill="none">
    <path d="M24 18 L24 6 L20 14" stroke="#15803d" strokeWidth="2" strokeLinejoin="round" fill="#22c55e" />
    <path d="M24 18 L29 8 L24 16" stroke="#15803d" strokeWidth="2" strokeLinejoin="round" fill="#22c55e" />
    <path d="M24 18 L17 10 L19 18" stroke="#15803d" strokeWidth="2" strokeLinejoin="round" fill="#16a34a" />
    <path d="M24 18 L31 10 L29 18" stroke="#15803d" strokeWidth="2" strokeLinejoin="round" fill="#16a34a" />
    <ellipse cx="24" cy="29" rx="12" ry="14" fill="#f59e0b" stroke="#b45309" strokeWidth="2" />
    <path d="M16 22 L32 36 M16 36 L32 22 M14 29 L34 29 M24 16 L24 42" stroke="#d97706" strokeWidth="1.5" />
    <circle cx="20" cy="26" r="1" fill="#78350f" />
    <circle cx="28" cy="26" r="1" fill="#78350f" />
    <circle cx="24" cy="33" r="1" fill="#78350f" />
  </svg>
);

// 9. Mangga (Nilai: 9)
const MangoSvg = ({ className = "w-10 h-10" }: { className?: string }) => (
  <svg viewBox="0 0 48 48" className={className} fill="none">
    <path d="M24 12 V8" stroke="#78350f" strokeWidth="2" strokeLinecap="round" />
    <path d="M24 10 C20 7 16 9 18 13 C21 13 23 11 24 10 Z" fill="#22c55e" stroke="#15803d" strokeWidth="1" />
    <path
      d="M24 12 C32 14 36 22 34 32 C32 40 22 43 17 38 C12 33 13 22 19 15 C21 13 23 12 24 12 Z"
      fill="#f97316"
      stroke="#c2410c"
      strokeWidth="2"
    />
    <path d="M26 16 C31 20 32 28 28 34" stroke="#facc15" strokeWidth="3" strokeLinecap="round" opacity="0.8" />
    <path d="M18 20 C16 24 16 28 18 31" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
  </svg>
);

// 10. Melon (Nilai: 10)
const MelonSvg = ({ className = "w-10 h-10" }: { className?: string }) => (
  <svg viewBox="0 0 48 48" className={className} fill="none">
    <path
      d="M8 32 C12 42 36 42 40 32 L24 16 Z"
      fill="#15803d"
      stroke="#14532d"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <path
      d="M10 31 C15 39 33 39 38 31 L24 19 Z"
      fill="#a7f3d0"
      stroke="#6ee7b7"
      strokeWidth="1.5"
    />
    <path d="M16 29 C19 33 29 33 32 29 L24 22 Z" fill="#fef08a" />
    <circle cx="22" cy="28" r="1" fill="#ca8a04" />
    <circle cx="26" cy="28" r="1" fill="#ca8a04" />
  </svg>
);

/* =========================================================================
   DEFINISI 10 VARIABEL BUAH LOGIKA KOMPUTASIONAL
   ========================================================================= */

export interface FruitVariable {
  id: string;
  name: string;
  value: number;
  badgeBg: string;
  borderColor: string;
  bgColor: string;
  SvgComponent: React.ComponentType<{ className?: string }>;
}

export const FRUIT_VARIABLES: FruitVariable[] = [
  {
    id: "cherry",
    name: "Ceri",
    value: 1,
    badgeBg: "bg-red-100 text-red-800 border-red-300",
    borderColor: "border-red-400",
    bgColor: "bg-red-50",
    SvgComponent: CherrySvg,
  },
  {
    id: "apple",
    name: "Apel",
    value: 2,
    badgeBg: "bg-rose-100 text-rose-800 border-rose-300",
    borderColor: "border-rose-400",
    bgColor: "bg-rose-50",
    SvgComponent: AppleSvg,
  },
  {
    id: "orange",
    name: "Jeruk",
    value: 3,
    badgeBg: "bg-orange-100 text-orange-800 border-orange-300",
    borderColor: "border-orange-400",
    bgColor: "bg-orange-50",
    SvgComponent: OrangeSvg,
  },
  {
    id: "banana",
    name: "Pisang",
    value: 4,
    badgeBg: "bg-yellow-100 text-yellow-800 border-yellow-300",
    borderColor: "border-yellow-400",
    bgColor: "bg-yellow-50",
    SvgComponent: BananaSvg,
  },
  {
    id: "strawberry",
    name: "Stroberi",
    value: 5,
    badgeBg: "bg-pink-100 text-pink-800 border-pink-300",
    borderColor: "border-pink-400",
    bgColor: "bg-pink-50",
    SvgComponent: StrawberrySvg,
  },
  {
    id: "grape",
    name: "Anggur",
    value: 6,
    badgeBg: "bg-purple-100 text-purple-800 border-purple-300",
    borderColor: "border-purple-400",
    bgColor: "bg-purple-50",
    SvgComponent: GrapeSvg,
  },
  {
    id: "watermelon",
    name: "Semangka",
    value: 7,
    badgeBg: "bg-emerald-100 text-emerald-800 border-emerald-300",
    borderColor: "border-emerald-400",
    bgColor: "bg-emerald-50",
    SvgComponent: WatermelonSvg,
  },
  {
    id: "pineapple",
    name: "Nanas",
    value: 8,
    badgeBg: "bg-amber-100 text-amber-800 border-amber-300",
    borderColor: "border-amber-400",
    bgColor: "bg-amber-50",
    SvgComponent: PineappleSvg,
  },
  {
    id: "mango",
    name: "Mangga",
    value: 9,
    badgeBg: "bg-amber-100 text-amber-900 border-amber-400",
    borderColor: "border-amber-500",
    bgColor: "bg-amber-50",
    SvgComponent: MangoSvg,
  },
  {
    id: "melon",
    name: "Melon",
    value: 10,
    badgeBg: "bg-teal-100 text-teal-800 border-teal-300",
    borderColor: "border-teal-400",
    bgColor: "bg-teal-50",
    SvgComponent: MelonSvg,
  },
];

/* =========================================================================
   TYPES & GENERATOR SOAL
   ========================================================================= */

interface VariableQuestion {
  activeFruits: FruitVariable[];
  terms: { fruit: FruitVariable; count: number; op: "+" | "-" }[];
  questionText: string;
  correctAnswer: number;
  options: number[];
  hint: string;
}

interface DetectivePuzzle {
  fruitA: FruitVariable;
  fruitB: FruitVariable;
  line1Result: number; // fruitA + fruitA
  line2Result: number; // fruitA + fruitB
  targetOp: "+" | "-" | "doubleB" | "onlyB";
  questionText: string;
  correctAnswer: number;
  options: number[];
  hint: string;
}

// Utility to generate unique randomized options
function generateOptions(correct: number): number[] {
  const opts = new Set<number>([correct]);
  const offsets = [-3, -2, -1, 1, 2, 3, 4, -4];
  
  while (opts.size < 4) {
    const offset = offsets[Math.floor(Math.random() * offsets.length)];
    const candidate = correct + offset;
    if (candidate > 0 && candidate !== correct) {
      opts.add(candidate);
    }
  }
  return Array.from(opts).sort(() => Math.random() - 0.5);
}

// Generate Mode 1: Kalkulasi Variabel Koding
function generateVariableQuestion(): VariableQuestion {
  // Pick 2 or 3 distinct fruits
  const shuffled = [...FRUIT_VARIABLES].sort(() => Math.random() - 0.5);
  const fruit1 = shuffled[0];
  const fruit2 = shuffled[1];
  const useThree = Math.random() > 0.6;
  const fruit3 = useThree ? shuffled[2] : null;

  const count1 = Math.floor(Math.random() * 2) + 1; // 1 or 2
  const count2 = Math.floor(Math.random() * 2) + 1; // 1 or 2
  const isSubtraction = !fruit3 && count1 * fruit1.value > count2 * fruit2.value && Math.random() > 0.6;

  let terms: { fruit: FruitVariable; count: number; op: "+" | "-" }[] = [];
  let answer = 0;
  let text = "";
  let hint = "";

  if (isSubtraction) {
    terms = [
      { fruit: fruit1, count: count1, op: "+" },
      { fruit: fruit2, count: count2, op: "-" },
    ];
    answer = (count1 * fruit1.value) - (count2 * fruit2.value);
    text = `Berapa nilai dari: ${count1 > 1 ? count1 + " " : ""}${fruit1.name} dikurang ${count2 > 1 ? count2 + " " : ""}${fruit2.name}?`;
    hint = `Nilai 1 ${fruit1.name} adalah ${fruit1.value} (total = ${count1 * fruit1.value}). Nilai 1 ${fruit2.name} adalah ${fruit2.value} (total = ${count2 * fruit2.value}). Sekarang kurangkan: ${count1 * fruit1.value} - ${count2 * fruit2.value}.`;
  } else if (fruit3) {
    terms = [
      { fruit: fruit1, count: 1, op: "+" },
      { fruit: fruit2, count: 1, op: "+" },
      { fruit: fruit3, count: 1, op: "+" },
    ];
    answer = fruit1.value + fruit2.value + fruit3.value;
    text = `Berapa nilai total dari: 1 ${fruit1.name} + 1 ${fruit2.name} + 1 ${fruit3.name}?`;
    hint = `Tambahkan bertahap: ${fruit1.name} (${fruit1.value}) + ${fruit2.name} (${fruit2.value}) = ${fruit1.value + fruit2.value}. Lalu tambahkan ${fruit3.name} (${fruit3.value}).`;
  } else {
    terms = [
      { fruit: fruit1, count: count1, op: "+" },
      { fruit: fruit2, count: count2, op: "+" },
    ];
    answer = (count1 * fruit1.value) + (count2 * fruit2.value);
    text = `Berapa nilai dari: ${count1 > 1 ? count1 + " " : ""}${fruit1.name} + ${count2 > 1 ? count2 + " " : ""}${fruit2.name}?`;
    hint = `Satu ${fruit1.name} bernilai ${fruit1.value} (total: ${count1 * fruit1.value}). Satu ${fruit2.name} bernilai ${fruit2.value} (total: ${count2 * fruit2.value}). Sekarang jumlahkan: ${count1 * fruit1.value} + ${count2 * fruit2.value}.`;
  }

  const active = [fruit1, fruit2, ...(fruit3 ? [fruit3] : [])];
  return {
    activeFruits: active,
    terms,
    questionText: text,
    correctAnswer: answer,
    options: generateOptions(answer),
    hint,
  };
}

// Generate Mode 2: Detektif Misteri Buah (Visual Algebra)
function generateDetectivePuzzle(): DetectivePuzzle {
  const shuffled = [...FRUIT_VARIABLES].sort(() => Math.random() - 0.5);
  const fruitA = shuffled[0];
  const fruitB = shuffled[1];

  const line1Result = fruitA.value * 2;
  const line2Result = fruitA.value + fruitB.value;

  const types: ("+" | "-" | "doubleB" | "onlyB")[] = ["+", "onlyB", "doubleB"];
  if (fruitB.value > fruitA.value) {
    types.push("-");
  }
  const chosenType = types[Math.floor(Math.random() * types.length)];

  let answer = 0;
  let text = "";
  let hint = `Lihat Baris 1: Dua buah ${fruitA.name} bernilai ${line1Result}. Berarti 1 ${fruitA.name} = ${fruitA.value}! Masukkan nilai itu ke Baris 2 untuk menemukan nilai ${fruitB.name} (${line2Result} - ${fruitA.value} = ${fruitB.value}).`;

  if (chosenType === "+") {
    answer = fruitA.value + fruitB.value;
    text = `Berapa nilai dari: ${fruitA.name} + ${fruitB.name}?`;
  } else if (chosenType === "-") {
    answer = fruitB.value - fruitA.value;
    text = `Berapa nilai dari: ${fruitB.name} - ${fruitA.name}?`;
  } else if (chosenType === "doubleB") {
    answer = fruitB.value * 2;
    text = `Berapa nilai dari: 2 ${fruitB.name}?`;
  } else {
    answer = fruitB.value;
    text = `Berapa nilai rahasia dari 1 ${fruitB.name}?`;
  }

  return {
    fruitA,
    fruitB,
    line1Result,
    line2Result,
    targetOp: chosenType,
    questionText: text,
    correctAnswer: answer,
    options: generateOptions(answer),
    hint,
  };
}

/* =========================================================================
   KOMPONEN UTAMA MATH ADVENTURE MODAL
   ========================================================================= */

export default function MathAdventureModal({
  isOpen,
  onClose,
  onEarnStars,
  audioEnabled,
  liteMode,
}: MathAdventureModalProps) {
  // Mode Permainan: "variables" (Kalkulasi Variabel Koding) vs "detective" (Detektif Aljabar Visual)
  const [activeMode, setActiveMode] = useState<"variables" | "detective">("variables");

  // State Mode 1
  const [varQuestion, setVarQuestion] = useState<VariableQuestion>(generateVariableQuestion);
  
  // State Mode 2
  const [detPuzzle, setDetPuzzle] = useState<DetectivePuzzle>(generateDetectivePuzzle);

  // Common State
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [streakCount, setStreakCount] = useState<number>(0);

  // Reset and generate new problem when modal opens or mode changes
  useEffect(() => {
    if (isOpen) {
      handleNewQuestion();
    }
  }, [isOpen, activeMode]);

  if (!isOpen) return null;

  const handleNewQuestion = () => {
    setSelectedAnswer(null);
    setIsCorrect(null);
    setShowHint(false);
    sound.playChime();

    if (activeMode === "variables") {
      const q = generateVariableQuestion();
      setVarQuestion(q);
      if (audioEnabled) {
        sound.speak(q.questionText);
      }
    } else {
      const p = generateDetectivePuzzle();
      setDetPuzzle(p);
      if (audioEnabled) {
        sound.speak(`Pecahkan teka-teki misteri: ${p.questionText}`);
      }
    }
  };

  const handleSelectAnswer = (ans: number) => {
    if (selectedAnswer !== null && isCorrect) return; // Prevent multiple clicks on success

    setSelectedAnswer(ans);
    const targetCorrect = activeMode === "variables" ? varQuestion.correctAnswer : detPuzzle.correctAnswer;

    if (ans === targetCorrect) {
      setIsCorrect(true);
      sound.playCelebration();
      onEarnStars(35);
      setStreakCount((prev) => prev + 1);

      if (!liteMode) {
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#fbbf24", "#f43f5e", "#38bdf8", "#10b981", "#a855f7"],
        });
      }

      if (audioEnabled) {
        sound.speak(`Luar biasa cerdas! Jawabanmu benar ${ans}. Kamu mendapatkan tiga puluh lima bintang!`);
      }
    } else {
      setIsCorrect(false);
      sound.playSocraticHint();
      if (audioEnabled) {
        sound.speak(`Hampir tepat! Jawaban ${ans} belum cocok. Coba cek kembali perhitungannya atau gunakan Petunjuk Tobi.`);
      }
    }
  };

  const handleToggleHint = () => {
    const nextVal = !showHint;
    setShowHint(nextVal);
    sound.playChime();
    if (nextVal && audioEnabled) {
      const hintText = activeMode === "variables" ? varQuestion.hint : detPuzzle.hint;
      sound.speak(hintText);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-5 bg-slate-900/65 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl border-4 border-rose-400 shadow-2xl p-4 sm:p-7 overflow-hidden my-auto">
        
        {/* ========================================================================= */}
        {/* MODAL HEADER: JUDUL & TOMBOL CLOSE                                        */}
        {/* ========================================================================= */}
        <div className="flex items-center justify-between pb-3 border-b-2 border-rose-100 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center border border-rose-300">
              <Calculator className="w-6 h-6 text-rose-600" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-black font-display text-slate-800">
                Detektif Logika 10 Variabel Buah
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {streakCount > 0 && (
              <div className="hidden sm:flex items-center gap-1 px-3 py-1 bg-amber-100 text-amber-900 rounded-xl border border-amber-300 text-xs font-black">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                <span>Streak: {streakCount}</span>
              </div>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 btn-chunky"
              title="Tutup Modal Matematika"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* MODE SWITCHER: 2 MODE LOGIKA (RESPONSIF MOBILE & DESKTOP)                  */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-2 gap-2.5 mb-5">
          <button
            onClick={() => {
              setActiveMode("variables");
              sound.playChime();
            }}
            className={`py-2 sm:py-2.5 px-3 rounded-2xl font-black text-xs sm:text-sm border-2 btn-chunky flex items-center justify-center gap-2 transition-all ${
              activeMode === "variables"
                ? "bg-rose-500 text-white border-rose-600 shadow-[0_3px_0_0_#9f1239]"
                : "bg-slate-100 text-slate-700 border-slate-200 hover:bg-rose-50"
            }`}
          >
            <Calculator className="w-4 h-4" />
            <span>Mode 1: Kalkulasi Variabel Koding</span>
          </button>

          <button
            onClick={() => {
              setActiveMode("detective");
              sound.playChime();
            }}
            className={`py-2 sm:py-2.5 px-3 rounded-2xl font-black text-xs sm:text-sm border-2 btn-chunky flex items-center justify-center gap-2 transition-all ${
              activeMode === "detective"
                ? "bg-indigo-600 text-white border-indigo-700 shadow-[0_3px_0_0_#312e81]"
                : "bg-slate-100 text-slate-700 border-slate-200 hover:bg-indigo-50"
            }`}
          >
            <Search className="w-4 h-4" />
            <span>Mode 2: Detektif Misteri Buah</span>
          </button>
        </div>

        {/* ========================================================================= */}
        {/* ARENA PERMAINAN BERDASARKAN MODE                                          */}
        {/* ========================================================================= */}
        {activeMode === "variables" ? (
          /* ======================================================================= */
          /* MODE 1: KALKULASI VARIABEL KODING                                       */
          /* ======================================================================= */
          <div>
            {/* 1. Kamus Nilai Variabel Aktif (Papan Pengumuman Koding) */}
            <div className="mb-4">
              <div className="mb-2">
                <span className="text-xs font-black text-slate-600 uppercase tracking-wider">
                  Variabel Buah Terdaftar:
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                {varQuestion.activeFruits.map((f) => {
                  const Svg = f.SvgComponent;
                  return (
                    <div
                      key={f.id}
                      className={`p-2.5 sm:p-3 rounded-2xl border-2 flex items-center justify-between gap-2 ${f.bgColor} ${f.borderColor} shadow-sm`}
                    >
                      <div className="flex items-center gap-2">
                        <Svg className="w-7 h-7 sm:w-8 sm:h-8 flex-shrink-0" />
                        <span className="font-black text-xs sm:text-sm text-slate-800">
                          {f.name}
                        </span>
                      </div>
                      <div className="px-2.5 py-1 rounded-xl bg-white border border-slate-300 shadow-inner font-mono font-black text-xs sm:text-sm text-slate-800">
                        = {f.value}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 2. Papan Persamaan Matematika Visual */}
            <div className="p-4 sm:p-6 rounded-3xl bg-slate-50 border-3 border-rose-300 mb-5 text-center shadow-inner">
              {/* Barisan Buah Visual & Operator */}
              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 my-2">
                {varQuestion.terms.map((t, idx) => {
                  const Svg = t.fruit.SvgComponent;
                  return (
                    <React.Fragment key={idx}>
                      {idx > 0 && (
                        <span className="text-2xl sm:text-3xl font-black text-rose-500 px-1 font-mono">
                          {t.op}
                        </span>
                      )}
                      
                      <div className="flex items-center gap-2 p-2 sm:p-2.5 rounded-2xl bg-white border-2 border-slate-200 shadow-sm">
                        {/* Repeat fruit icons visually based on count */}
                        <div className="flex items-center gap-0.5">
                          {Array.from({ length: t.count }).map((_, cIdx) => (
                            <Svg key={cIdx} className="w-8 h-8 sm:w-10 sm:h-10" />
                          ))}
                        </div>
                        <span className="text-xs sm:text-sm font-black text-slate-800">
                          {t.count > 1 ? `${t.count} ` : ""}{t.fruit.name}
                        </span>
                      </div>
                    </React.Fragment>
                  );
                })}

                <span className="text-2xl sm:text-3xl font-black text-slate-700 px-1 font-mono">
                  = ?
                </span>
              </div>
            </div>
          </div>
        ) : (
          /* ======================================================================= */
          /* MODE 2: DETEKTIF MISTERI BUAH (ALJABAR VISUAL)                          */
          /* ======================================================================= */
          <div>
            <div className="mb-4">
              <span className="text-xs font-black text-indigo-700 uppercase tracking-wider block mb-2">
                Papan Bukti Detektif (Pecahkan Nilai Rahasia Tiap Buah):
              </span>

              {/* Papan Clue 2 Baris Persamaan */}
              <div className="p-3.5 sm:p-5 rounded-3xl bg-indigo-50/70 border-3 border-indigo-300 space-y-3 shadow-inner">
                {/* Baris 1: Buah A + Buah A = 2 * A */}
                <div className="flex items-center justify-between p-2.5 sm:p-3 rounded-2xl bg-white border-2 border-indigo-200 shadow-sm">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <span className="text-[10px] sm:text-xs font-black text-indigo-600 bg-indigo-100 px-2 py-0.5 rounded-lg">
                      Bukti 1
                    </span>
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <detPuzzle.fruitA.SvgComponent className="w-7 h-7 sm:w-9 sm:h-9" />
                      <span className="text-xl font-black text-indigo-600">+</span>
                      <detPuzzle.fruitA.SvgComponent className="w-7 h-7 sm:w-9 sm:h-9" />
                    </div>
                  </div>
                  <div className="font-mono font-black text-base sm:text-xl text-indigo-900 bg-indigo-100/60 px-3 py-1 rounded-xl">
                    = {detPuzzle.line1Result}
                  </div>
                </div>

                {/* Baris 2: Buah A + Buah B = A + B */}
                <div className="flex items-center justify-between p-2.5 sm:p-3 rounded-2xl bg-white border-2 border-indigo-200 shadow-sm">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <span className="text-[10px] sm:text-xs font-black text-indigo-600 bg-indigo-100 px-2 py-0.5 rounded-lg">
                      Bukti 2
                    </span>
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <detPuzzle.fruitA.SvgComponent className="w-7 h-7 sm:w-9 sm:h-9" />
                      <span className="text-xl font-black text-indigo-600">+</span>
                      <detPuzzle.fruitB.SvgComponent className="w-7 h-7 sm:w-9 sm:h-9" />
                    </div>
                  </div>
                  <div className="font-mono font-black text-base sm:text-xl text-indigo-900 bg-indigo-100/60 px-3 py-1 rounded-xl">
                    = {detPuzzle.line2Result}
                  </div>
                </div>

                {/* Baris Pertanyaan Tantangan */}
                <div className="p-3 rounded-2xl bg-gradient-to-r from-amber-200 to-amber-100 border-2 border-amber-400 flex items-center justify-between shadow-sm">
                  <div className="flex items-center gap-2">
                    <Search className="w-4 h-4 text-amber-900" />
                    <span className="text-xs sm:text-sm font-black text-amber-950">
                      Tantangan: {detPuzzle.questionText}
                    </span>
                  </div>
                  <span className="font-mono font-black text-lg text-amber-950">
                    = ?
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TOMBOL PETUNJUK TOBI (AI SOCRATIC MENTOR)                                 */}
        {/* ========================================================================= */}
        <div className="mb-4">
          <div className="flex items-center justify-between gap-2">
            <button
              onClick={handleToggleHint}
              className={`py-1.5 px-3 rounded-xl border-2 font-black text-xs btn-chunky flex items-center gap-1.5 transition-all ${
                showHint
                  ? "bg-amber-400 text-amber-950 border-amber-500 shadow-sm"
                  : "bg-white text-slate-700 border-slate-200 hover:bg-amber-50"
              }`}
            >
              <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
              <span>{showHint ? "Sembunyikan Petunjuk" : "Petunjuk Tobi"}</span>
            </button>

            <button
              onClick={handleNewQuestion}
              className="py-1.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border-2 border-slate-200 font-black text-xs btn-chunky flex items-center gap-1.5"
            >
              <Shuffle className="w-3.5 h-3.5 text-slate-600" />
              <span>Acak Soal Baru</span>
            </button>
          </div>

          {/* Kotak Balon Petunjuk Socratic */}
          {showHint && (
            <div className="mt-2.5 p-3 rounded-2xl bg-amber-50 border-2 border-amber-300 flex items-start gap-2.5 animate-fadeIn">
              <div className="p-1 rounded-lg bg-amber-400 text-amber-950 flex-shrink-0 mt-0.5">
                <Lightbulb className="w-4 h-4" />
              </div>
              <p className="text-xs sm:text-sm font-bold text-amber-950 leading-relaxed">
                {activeMode === "variables" ? varQuestion.hint : detPuzzle.hint}
              </p>
            </div>
          )}
        </div>

        {/* ========================================================================= */}
        {/* PILIHAN TOMBOL JAWABAN EMPUK (4 CHUNKY BUTTONS)                           */}
        {/* ========================================================================= */}
        <div className="space-y-3">
          <span className="text-xs font-black text-slate-600 uppercase tracking-wider block">
            Pilih Jawaban yang Benar:
          </span>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
            {(activeMode === "variables" ? varQuestion.options : detPuzzle.options).map((opt) => {
              const isSelected = selectedAnswer === opt;
              const targetCorrect = activeMode === "variables" ? varQuestion.correctAnswer : detPuzzle.correctAnswer;
              const isOptionCorrect = opt === targetCorrect;

              let btnStyle = "bg-white text-slate-800 border-slate-300 hover:bg-rose-50 shadow-[0_4px_0_0_#cbd5e1]";

              if (isSelected) {
                if (isCorrect) {
                  btnStyle = "bg-emerald-500 text-white border-emerald-600 shadow-[0_4px_0_0_#059669]";
                } else {
                  btnStyle = "bg-rose-500 text-white border-rose-600 shadow-[0_4px_0_0_#9f1239]";
                }
              } else if (isCorrect && isOptionCorrect) {
                btnStyle = "bg-emerald-400 text-white border-emerald-500 shadow-[0_4px_0_0_#059669]";
              }

              return (
                <button
                  key={opt}
                  onClick={() => handleSelectAnswer(opt)}
                  className={`py-3 sm:py-4 px-3 rounded-2xl font-mono font-black text-xl sm:text-2xl border-3 btn-chunky transition-all active:translate-y-1 ${btnStyle}`}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* FEEDBACK STATUS DAN TOMBOL SOAL BERIKUTNYA                                */}
        {/* ========================================================================= */}
        {isCorrect !== null && (
          <div className="mt-4 pt-3 border-t-2 border-slate-100 flex flex-wrap items-center justify-between gap-2.5">
            <div className="flex items-center gap-2">
              {isCorrect ? (
                <>
                  <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  <span className="text-xs sm:text-sm font-black text-emerald-700">
                    Benar! Hebat sekali, kamu mendapat +35 Bintang! 🎉
                  </span>
                </>
              ) : (
                <>
                  <HelpCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />
                  <span className="text-xs sm:text-sm font-bold text-rose-700">
                    Belum tepat. Coba lagi atau baca Petunjuk Tobi!
                  </span>
                </>
              )}
            </div>

            {isCorrect && (
              <button
                onClick={handleNewQuestion}
                className="py-2 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xs sm:text-sm border-2 border-emerald-600 shadow-[0_3px_0_0_#065f46] btn-chunky flex items-center gap-1.5"
              >
                <span>Soal Berikutnya</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
