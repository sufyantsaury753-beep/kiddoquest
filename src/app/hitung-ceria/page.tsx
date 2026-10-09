"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import confetti from "canvas-confetti";
import { 
  ArrowLeft, 
  Star, 
  Volume2, 
  Shuffle, 
  Calculator, 
  Search,
  CheckCircle2,
  Lightbulb,
  Scale
} from "lucide-react";
import { sound } from "@/lib/sound";
import { getStudentProfile, saveStudentProfile, StudentProfile, DEFAULT_PROFILE, unlockBadge } from "@/lib/storage";

/* =========================================================================
   100% PURE SVG ILUSTRASI 10 BUAH VARIABEL LOGIKA MATEMATIKA (NO EMOJI)
   ========================================================================= */

const CherrySvg = ({ className = "w-8 h-8" }: { className?: string }) => (
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

const AppleSvg = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg viewBox="0 0 48 48" className={className} fill="none">
    <path d="M24 14 C24 8 28 6 30 6" stroke="#78350f" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M25 10 C32 8 34 13 31 16 C26 16 25 12 25 10 Z" fill="#22c55e" stroke="#15803d" strokeWidth="1" />
    <path d="M24 16 C19 12 10 14 10 24 C10 35 18 42 24 42 C30 42 38 35 38 24 C38 14 29 12 24 16 Z" fill="#ef4444" stroke="#b91c1c" strokeWidth="2" />
    <path d="M15 20 C13 24 14 30 16 34" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.65" />
  </svg>
);

const OrangeSvg = ({ className = "w-8 h-8" }: { className?: string }) => (
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

const BananaSvg = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg viewBox="0 0 48 48" className={className} fill="none">
    <path d="M36 12 L38 8" stroke="#65a30d" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M36 12 C30 20 18 28 8 26 C12 34 26 38 36 24 C38 21 38 16 36 12 Z" fill="#facc15" stroke="#ca8a04" strokeWidth="2" strokeLinejoin="round" />
    <path d="M34 16 C26 24 18 30 10 28" stroke="#eab308" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="8" cy="26" r="1.5" fill="#78350f" />
    <path d="M31 19 C24 26 19 31 14 31" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.65" />
  </svg>
);

const StrawberrySvg = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg viewBox="0 0 48 48" className={className} fill="none">
    <path d="M24 14 L24 8" stroke="#15803d" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M24 14 C20 10 14 12 16 16 C20 16 23 15 24 14 Z" fill="#22c55e" stroke="#15803d" strokeWidth="1" />
    <path d="M24 14 C28 10 34 12 32 16 C28 16 25 15 24 14 Z" fill="#22c55e" stroke="#15803d" strokeWidth="1" />
    <path d="M24 16 C14 16 11 25 15 34 C18 40 24 44 24 44 C24 44 30 40 33 34 C37 25 34 16 24 16 Z" fill="#f43f5e" stroke="#be123c" strokeWidth="2" />
    <circle cx="20" cy="24" r="1" fill="#fef08a" />
    <circle cx="28" cy="24" r="1" fill="#fef08a" />
    <circle cx="24" cy="30" r="1" fill="#fef08a" />
    <circle cx="20" cy="36" r="1" fill="#fef08a" />
    <circle cx="28" cy="36" r="1" fill="#fef08a" />
  </svg>
);

const GrapeSvg = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg viewBox="0 0 48 48" className={className} fill="none">
    <path d="M24 12 C24 8 28 6 30 6" stroke="#78350f" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M25 8 C32 6 34 11 31 14 C26 14 25 10 25 8 Z" fill="#22c55e" stroke="#15803d" strokeWidth="1" />
    <circle cx="19" cy="18" r="5" fill="#a855f7" stroke="#7e22ce" strokeWidth="1.5" />
    <circle cx="29" cy="18" r="5" fill="#a855f7" stroke="#7e22ce" strokeWidth="1.5" />
    <circle cx="14" cy="26" r="5" fill="#9333ea" stroke="#6b21a8" strokeWidth="1.5" />
    <circle cx="24" cy="26" r="5" fill="#9333ea" stroke="#6b21a8" strokeWidth="1.5" />
    <circle cx="34" cy="26" r="5" fill="#9333ea" stroke="#6b21a8" strokeWidth="1.5" />
    <circle cx="19" cy="34" r="5" fill="#7e22ce" stroke="#581c87" strokeWidth="1.5" />
    <circle cx="29" cy="34" r="5" fill="#7e22ce" stroke="#581c87" strokeWidth="1.5" />
    <circle cx="24" cy="41" r="4.5" fill="#6b21a8" stroke="#3b0764" strokeWidth="1.5" />
  </svg>
);

const WatermelonSvg = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg viewBox="0 0 48 48" className={className} fill="none">
    <path d="M8 18 C10 36 38 36 40 18 Z" fill="#22c55e" stroke="#15803d" strokeWidth="2" />
    <path d="M10 18 C12 33 36 33 38 18 Z" fill="#fef08a" />
    <path d="M12 18 C14 30 34 30 36 18 Z" fill="#ef4444" />
    <circle cx="18" cy="23" r="1" fill="#18181b" />
    <circle cx="24" cy="26" r="1" fill="#18181b" />
    <circle cx="30" cy="23" r="1" fill="#18181b" />
  </svg>
);

const MangoSvg = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg viewBox="0 0 48 48" className={className} fill="none">
    <path d="M26 12 C26 8 30 6 32 6" stroke="#78350f" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M27 8 C34 6 36 11 33 14 C28 14 27 10 27 8 Z" fill="#22c55e" stroke="#15803d" strokeWidth="1" />
    <path d="M26 14 C16 14 12 24 14 34 C16 42 26 44 32 40 C38 36 40 24 36 18 C33 14 29 14 26 14 Z" fill="#eab308" stroke="#ca8a04" strokeWidth="2" />
    <path d="M16 20 C18 24 22 28 26 30" stroke="#f97316" strokeWidth="2" opacity="0.6" strokeLinecap="round" />
  </svg>
);

const PineappleSvg = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg viewBox="0 0 48 48" className={className} fill="none">
    <path d="M24 16 L20 6 C24 10 24 16 24 16 Z" fill="#22c55e" stroke="#15803d" strokeWidth="1" />
    <path d="M24 16 L28 6 C24 10 24 16 24 16 Z" fill="#22c55e" stroke="#15803d" strokeWidth="1" />
    <path d="M24 16 L14 10 C20 12 24 16 24 16 Z" fill="#16a34a" stroke="#15803d" strokeWidth="1" />
    <path d="M24 16 L34 10 C28 12 24 16 24 16 Z" fill="#16a34a" stroke="#15803d" strokeWidth="1" />
    <rect x="14" y="16" width="20" height="26" rx="10" fill="#f59e0b" stroke="#b45309" strokeWidth="2" />
    <path d="M16 24 L32 36 M32 24 L16 36" stroke="#d97706" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const AvocadoSvg = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg viewBox="0 0 48 48" className={className} fill="none">
    <path d="M24 6 C16 6 10 16 10 28 C10 38 16 44 24 44 C32 44 38 38 38 28 C38 16 32 6 24 6 Z" fill="#15803d" stroke="#14532d" strokeWidth="2" />
    <path d="M24 10 C18 10 13 18 13 28 C13 36 18 41 24 41 C30 41 35 36 35 28 C35 18 30 10 24 10 Z" fill="#bef264" />
    <circle cx="24" cy="30" r="7.5" fill="#78350f" stroke="#451a03" strokeWidth="1.5" />
    <circle cx="22" cy="28" r="1.5" fill="#a16207" />
  </svg>
);

/* =========================================================================
   PURE SVG ILUSTRASI BEBAN TIMBANGAN NERACA (NO EMOJI)
   ========================================================================= */

// 1. Peti Harta Karun Bertanda Tanya Emas [ ? ] (Mystery Chest)
const MysteryChestGraphic = ({ label = "?" }: { label?: string }) => (
  <g>
    <rect x="-18" y="-12" width="36" height="26" rx="5" fill="#854d0e" stroke="#451a03" strokeWidth="2" />
    <path d="M-19 -12 C-19 -20 -10 -24 0 -24 C10 -24 19 -20 19 -12 Z" fill="#a16207" stroke="#451a03" strokeWidth="2" />
    <rect x="-10" y="-24" width="4" height="38" fill="#eab308" stroke="#713f12" strokeWidth="1" />
    <rect x="6" y="-24" width="4" height="38" fill="#eab308" stroke="#713f12" strokeWidth="1" />
    <circle cx="0" cy="1" r="9" fill="#facc15" stroke="#713f12" strokeWidth="1.5" />
    <text x="0" y="5" textAnchor="middle" fill="#713f12" fontSize="12" fontWeight="900" fontFamily="sans-serif">
      {label}
    </text>
  </g>
);

// 2. Anak Timbangan Besi Kuningan Klasik (Brass Weight)
const BrassWeightGraphic = ({ weight = 5 }: { weight?: number }) => (
  <g>
    <circle cx="0" cy="-17" r="5" fill="#facc15" stroke="#713f12" strokeWidth="1.5" />
    <rect x="-2.5" y="-13" width="5" height="4" fill="#eab308" stroke="#713f12" strokeWidth="1" />
    <path d="M-14 12 L-10 -9 L10 -9 L14 12 Z" fill="#eab308" stroke="#713f12" strokeWidth="2" />
    <rect x="-16" y="9" width="32" height="4" rx="1.5" fill="#ca8a04" stroke="#713f12" strokeWidth="1" />
    <text x="0" y="4" textAnchor="middle" fill="#451a03" fontSize="9" fontWeight="900" fontFamily="sans-serif">
      {weight}k
    </text>
  </g>
);

// 3. Kristal Safir / Zamrud Berkilau (Gem Weight)
const GemWeightGraphic = ({ weight = 7 }: { weight?: number }) => (
  <g>
    <polygon points="-8,-16 8,-16 16,-6 0,14 -16,-6" fill="#06b6d4" stroke="#0e7490" strokeWidth="1.5" />
    <polygon points="-8,-16 0,-6 8,-16" fill="#a5f3fc" opacity="0.7" />
    <polygon points="-16,-6 0,-6 0,14" fill="#0891b2" opacity="0.6" />
    <circle cx="0" cy="0" r="7" fill="white" opacity="0.9" />
    <text x="0" y="3" textAnchor="middle" fill="#0e7490" fontSize="8" fontWeight="900" fontFamily="sans-serif">
      {weight}k
    </text>
  </g>
);

// 4. Balok Kayu Ceria (Wood Block Weight)
const WoodBlockGraphic = ({ weight = 10 }: { weight?: number }) => (
  <g>
    <rect x="-14" y="-14" width="28" height="28" rx="3" fill="#d97706" stroke="#78350f" strokeWidth="2" />
    <line x1="-14" y1="-14" x2="14" y2="14" stroke="#b45309" strokeWidth="1.5" />
    <line x1="14" y1="-14" x2="-14" y2="14" stroke="#b45309" strokeWidth="1.5" />
    <circle cx="0" cy="0" r="8" fill="#fef3c7" stroke="#78350f" strokeWidth="1.5" />
    <text x="0" y="3.5" textAnchor="middle" fill="#78350f" fontSize="8.5" fontWeight="900" fontFamily="sans-serif">
      {weight}k
    </text>
  </g>
);

interface FruitVariable {
  id: string;
  name: string;
  value: number;
  badgeBg: string;
  borderColor: string;
  bgColor: string;
  SvgComponent: React.ComponentType<{ className?: string }>;
}

const FRUIT_VARIABLES: FruitVariable[] = [
  { id: "cherry", name: "Ceri", value: 1, badgeBg: "bg-red-100 text-red-800 border-red-300", borderColor: "border-red-400", bgColor: "bg-red-50", SvgComponent: CherrySvg },
  { id: "apple", name: "Apel", value: 2, badgeBg: "bg-rose-100 text-rose-800 border-rose-300", borderColor: "border-rose-400", bgColor: "bg-rose-50", SvgComponent: AppleSvg },
  { id: "orange", name: "Jeruk", value: 3, badgeBg: "bg-orange-100 text-orange-800 border-orange-300", borderColor: "border-orange-400", bgColor: "bg-orange-50", SvgComponent: OrangeSvg },
  { id: "banana", name: "Pisang", value: 4, badgeBg: "bg-yellow-100 text-yellow-800 border-yellow-300", borderColor: "border-yellow-400", bgColor: "bg-yellow-50", SvgComponent: BananaSvg },
  { id: "strawberry", name: "Stroberi", value: 5, badgeBg: "bg-pink-100 text-pink-800 border-pink-300", borderColor: "border-pink-400", bgColor: "bg-pink-50", SvgComponent: StrawberrySvg },
  { id: "grape", name: "Anggur", value: 6, badgeBg: "bg-purple-100 text-purple-800 border-purple-300", borderColor: "border-purple-400", bgColor: "bg-purple-50", SvgComponent: GrapeSvg },
  { id: "watermelon", name: "Semangka", value: 7, badgeBg: "bg-emerald-100 text-emerald-800 border-emerald-300", borderColor: "border-emerald-400", bgColor: "bg-emerald-50", SvgComponent: WatermelonSvg },
  { id: "mango", name: "Mangga", value: 8, badgeBg: "bg-amber-100 text-amber-800 border-amber-300", borderColor: "border-amber-400", bgColor: "bg-amber-50", SvgComponent: MangoSvg },
  { id: "pineapple", name: "Nanas", value: 9, badgeBg: "bg-yellow-100 text-amber-900 border-yellow-400", borderColor: "border-amber-500", bgColor: "bg-amber-50", SvgComponent: PineappleSvg },
  { id: "avocado", name: "Alpukat", value: 10, badgeBg: "bg-lime-100 text-lime-900 border-lime-300", borderColor: "border-lime-500", bgColor: "bg-lime-50", SvgComponent: AvocadoSvg },
];

function generateOptions(correct: number): number[] {
  const opts = new Set<number>([correct]);
  const offsets = [-4, -3, -2, -1, 1, 2, 3, 4, 5, -5];
  while (opts.size < 4) {
    const offset = offsets[Math.floor(Math.random() * offsets.length)];
    const candidate = correct + offset;
    if (candidate > 0 && candidate !== correct) {
      opts.add(candidate);
    }
  }
  return Array.from(opts).sort(() => Math.random() - 0.5);
}

/* =========================================================================
   SISTEM GENERATOR PROSEDURAL TIMBANGAN NERACA MISTERI (INFINITE GENERATOR)
   ========================================================================= */

export interface ScaleWeightItem {
  type: "mystery" | "brass" | "gem" | "wood";
  value: number; // in kg
  label: string;
}

export interface ScaleQuestionData {
  level: 1 | 2 | 3 | 4;
  levelName: string;
  mysteryCount: number; // 1 or 2
  leftItems: ScaleWeightItem[];
  rightItems: ScaleWeightItem[];
  leftKnownWeight: number;
  rightTotalWeight: number;
  correctAnswer: number;
  options: number[];
  hint: string;
  equationText: string;
}

function generateProceduralScaleQuestion(level: 1 | 2 | 3 | 4): ScaleQuestionData {
  let mysteryCount = 1;
  let leftKnownWeight = 0;
  let rightTotalWeight = 0;
  let correctAnswer = 0;
  let leftItems: ScaleWeightItem[] = [];
  let rightItems: ScaleWeightItem[] = [];
  let hint = "";
  let equationText = "";

  if (level === 1) {
    // Level 1 (Pemula - Kelas 1-2 SD): Penjumlahan dasar satu sisi
    // Kiri: 1 Peti [ ? ] + Known A kg. Kanan: Total B kg.
    // ? + A = B -> ? = B - A
    const knownA = Math.floor(Math.random() * 8) + 3; // 3 to 10
    correctAnswer = Math.floor(Math.random() * 9) + 4; // 4 to 12
    rightTotalWeight = knownA + correctAnswer;
    leftKnownWeight = knownA;
    mysteryCount = 1;

    leftItems = [
      { type: "mystery", value: correctAnswer, label: "?" },
      { type: "brass", value: knownA, label: `${knownA} kg` },
    ];
    rightItems = [
      { type: "brass", value: rightTotalWeight, label: `${rightTotalWeight} kg` },
    ];
    equationText = `[ ? ] + ${knownA} kg = ${rightTotalWeight} kg`;
    hint = `Sisi kanan neraca beratnya ${rightTotalWeight} kg. Di sisi kiri sudah ada anak timbangan ${knownA} kg. Agar kedua sisi seimbang, kurangi: ${rightTotalWeight} - ${knownA} = ${correctAnswer} kg.`;
  } else if (level === 2) {
    // Level 2 (Benda Kembar - Kelas 3 SD): Konsep kelipatan/perkalian
    // Kiri: 2 Peti [ ? ] + [ ? ]. Kanan: Total B (Genap).
    // 2 x ? = B -> ? = B / 2
    mysteryCount = 2;
    correctAnswer = Math.floor(Math.random() * 8) + 3; // 3 to 10
    rightTotalWeight = correctAnswer * 2;
    leftKnownWeight = 0;

    leftItems = [
      { type: "mystery", value: correctAnswer, label: "?" },
      { type: "mystery", value: correctAnswer, label: "?" },
    ];
    rightItems = [
      { type: "wood", value: rightTotalWeight, label: `${rightTotalWeight} kg` },
    ];
    equationText = `2 × [ ? ] = ${rightTotalWeight} kg`;
    hint = `Ada 2 peti misteri kembar yang sama beratnya. Total beban di sisi kanan adalah ${rightTotalWeight} kg. Maka berat 1 peti misteri adalah: ${rightTotalWeight} ÷ 2 = ${correctAnswer} kg.`;
  } else if (level === 3) {
    // Level 3 (Dua Sisi - Kelas 4-5 SD): Beban di kedua sisi
    // Kiri: [ ? ] + Known A. Kanan: B1 + B2.
    // ? + A = B1 + B2 -> ? = (B1 + B2) - A
    mysteryCount = 1;
    const knownA = Math.floor(Math.random() * 7) + 4; // 4 to 10
    const rightB1 = Math.floor(Math.random() * 9) + 6; // 6 to 14
    const rightB2 = Math.floor(Math.random() * 7) + 3; // 3 to 9
    rightTotalWeight = rightB1 + rightB2;
    leftKnownWeight = knownA;
    correctAnswer = rightTotalWeight - knownA;

    if (correctAnswer <= 2) {
      correctAnswer = 7;
      rightTotalWeight = knownA + correctAnswer;
    }

    leftItems = [
      { type: "mystery", value: correctAnswer, label: "?" },
      { type: "gem", value: knownA, label: `${knownA} kg` },
    ];
    rightItems = [
      { type: "brass", value: rightB1, label: `${rightB1} kg` },
      { type: "wood", value: rightB2, label: `${rightB2} kg` },
    ];
    equationText = `[ ? ] + ${knownA} kg = ${rightB1} kg + ${rightB2} kg`;
    hint = `Hitung total beban sisi kanan terlebih dahulu: ${rightB1} + ${rightB2} = ${rightTotalWeight} kg. Di sisi kiri ada kristal ${knownA} kg. Maka peti misteri: ${rightTotalWeight} - ${knownA} = ${correctAnswer} kg.`;
  } else {
    // Level 4 (Master Neraca - Kelas 5-6 SD): 3 komponen / angka puluhan
    // Kiri: 2 Peti [ ? ] + Known A. Kanan: B1 + B2.
    // 2 x ? + A = B1 + B2 -> 2 x ? = (B1 + B2) - A
    mysteryCount = 2;
    correctAnswer = Math.floor(Math.random() * 11) + 6; // 6 to 16
    const knownA = (Math.floor(Math.random() * 4) + 2) * 2; // genap: 4, 6, 8, 10
    const totalReq = (2 * correctAnswer) + knownA;
    const rightB1 = Math.floor(totalReq / 2);
    const rightB2 = totalReq - rightB1;
    rightTotalWeight = totalReq;
    leftKnownWeight = knownA;

    leftItems = [
      { type: "mystery", value: correctAnswer, label: "?" },
      { type: "mystery", value: correctAnswer, label: "?" },
      { type: "brass", value: knownA, label: `${knownA} kg` },
    ];
    rightItems = [
      { type: "wood", value: rightB1, label: `${rightB1} kg` },
      { type: "gem", value: rightB2, label: `${rightB2} kg` },
    ];
    equationText = `2 × [ ? ] + ${knownA} kg = ${rightB1} kg + ${rightB2} kg`;
    hint = `Total sisi kanan: ${rightB1} + ${rightB2} = ${rightTotalWeight} kg. Kurangi beban di kiri: ${rightTotalWeight} - ${knownA} = ${2 * correctAnswer} kg. Karena ada 2 peti misteri: ${2 * correctAnswer} ÷ 2 = ${correctAnswer} kg.`;
  }

  const options = generateOptions(correctAnswer);

  const levelNames: Record<number, string> = {
    1: "Level 1: Pemula (Kelas 1-2)",
    2: "Level 2: Benda Kembar (Kelas 3)",
    3: "Level 3: Dua Sisi (Kelas 4-5)",
    4: "Level 4: Master Neraca (Kelas 5-6)",
  };

  return {
    level,
    levelName: levelNames[level],
    mysteryCount,
    leftItems,
    rightItems,
    leftKnownWeight,
    rightTotalWeight,
    correctAnswer,
    options,
    hint,
    equationText,
  };
}

export default function HitungCeriaPage() {
  const [profile, setProfile] = useState<StudentProfile>(DEFAULT_PROFILE);
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<"kalkulasi" | "detektif" | "neraca">("neraca");
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showHint, setShowHint] = useState(false);

  // --- Mode 1: Kalkulasi Buah ---
  const [calcTerms, setCalcTerms] = useState<{ fruit: FruitVariable; count: number; op: "+" | "-" }[]>([]);
  const [calcAnswer, setCalcAnswer] = useState(0);
  const [calcOptions, setCalcOptions] = useState<number[]>([]);
  const [calcHint, setCalcHint] = useState("");

  // --- Mode 2: Detektif Aljabar Buah ---
  const [detFruitA, setDetFruitA] = useState<FruitVariable>(FRUIT_VARIABLES[1]);
  const [detFruitB, setDetFruitB] = useState<FruitVariable>(FRUIT_VARIABLES[2]);
  const [detLine1, setDetLine1] = useState(4);
  const [detLine2, setDetLine2] = useState(5);
  const [detTargetOp, setDetTargetOp] = useState<"+" | "-" | "onlyB">("+");
  const [detAnswer, setDetAnswer] = useState(0);
  const [detOptions, setDetOptions] = useState<number[]>([]);
  const [detHint, setDetHint] = useState("");

  // --- Mode 3: Timbangan Neraca Misteri ---
  const [scaleLevel, setScaleLevel] = useState<1 | 2 | 3 | 4>(1);
  const [scaleQuestion, setScaleQuestion] = useState<ScaleQuestionData>(generateProceduralScaleQuestion(1));
  const [selectedScaleAnswer, setSelectedScaleAnswer] = useState<number | null>(null);
  const [isScaleCorrect, setIsScaleCorrect] = useState<boolean | null>(null);

  const newCalcQuestion = () => {
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
    const ans = (count1 * fruit1.value) + (count2 * fruit2.value);
    setCalcTerms(terms);
    setCalcAnswer(ans);
    setCalcOptions(generateOptions(ans));
    setCalcHint(`1 ${fruit1.name} = ${fruit1.value} (total: ${count1 * fruit1.value}). 1 ${fruit2.name} = ${fruit2.value} (total: ${count2 * fruit2.value}). Jumlahkan: ${count1 * fruit1.value} + ${count2 * fruit2.value} = ${ans}.`);
  };

  const newDetQuestion = () => {
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
    setDetHint(`Baris 1: Dua ${fA.name} = ${l1}, maka 1 ${fA.name} = ${fA.value}. Baris 2: ${fA.value} + ${fB.name} = ${l2}, maka ${fB.name} = ${fB.value}!`);
  };

  const newScaleQuestion = (lvl: 1 | 2 | 3 | 4 = scaleLevel) => {
    setSelectedScaleAnswer(null);
    setIsScaleCorrect(null);
    setShowHint(false);
    setScaleLevel(lvl);
    const q = generateProceduralScaleQuestion(lvl);
    setScaleQuestion(q);
  };

  useEffect(() => {
    const stored = unlockBadge("hitung-ceria");
    setProfile(stored);
    sound.setSpeechEnabled(stored.audioEnabled);
    setMounted(true);
    newCalcQuestion();
    newDetQuestion();
    newScaleQuestion(1);
  }, []);

  // Handler Pemilihan Jawaban Mode 1 & 2
  const handleSelectAnswer = (ans: number) => {
    setSelectedAnswer(ans);
    const target = activeTab === "kalkulasi" ? calcAnswer : detAnswer;

    if (ans === target) {
      setIsCorrect(true);
      sound.playCelebration();
      const updated = saveStudentProfile({ stars: profile.stars + 30 });
      setProfile(updated);
      if (!profile.liteMode) {
        confetti({ particleCount: 45, spread: 60, origin: { y: 0.6 } });
      }
      if (profile.audioEnabled) {
        sound.speak(`Hebat sekali! Jawabanmu benar, yaitu ${ans}! Kamu mendapatkan 30 bintang!`);
      }
    } else {
      setIsCorrect(false);
      sound.playSocraticHint();
      if (profile.audioEnabled) {
        sound.speak("Hampir tepat! Yuk cermati nilai buahnya dan coba lagi!");
      }
    }
  };

  // Handler Pemilihan Jawaban Mode 3: Timbangan Neraca
  const handleSelectScaleAnswer = (ans: number) => {
    setSelectedScaleAnswer(ans);
    const target = scaleQuestion.correctAnswer;
    const chosenWeight = ans;
    const currentLeftTotal = scaleQuestion.leftKnownWeight + (scaleQuestion.mysteryCount * chosenWeight);
    const currentRightTotal = scaleQuestion.rightTotalWeight;

    if (ans === target) {
      setIsScaleCorrect(true);
      sound.playCelebration();
      const updated = saveStudentProfile({ stars: profile.stars + 35 });
      setProfile(updated);
      if (!profile.liteMode) {
        confetti({ particleCount: 55, spread: 65, origin: { y: 0.58 } });
      }
      if (profile.audioEnabled) {
        sound.speak(`Luar biasa! Neraca sekarang seimbang sempurna di ${currentRightTotal} kilogram! Berat setiap peti adalah ${ans} kilogram. Kamu mendapatkan 35 bintang!`);
      }
    } else {
      setIsScaleCorrect(false);
      sound.playSocraticHint();
      if (profile.audioEnabled) {
        if (currentLeftTotal > currentRightTotal) {
          sound.speak(`Belum seimbang! Sisi kiri sekarang terlalu berat dengan total ${currentLeftTotal} kilogram. Coba pilih angka yang lebih ringan!`);
        } else {
          sound.speak(`Belum seimbang! Sisi kanan masih lebih berat dengan ${currentRightTotal} kilogram. Coba pilih angka yang lebih besar!`);
        }
      }
    }
  };

  // Handler Suara Tobi Narator
  const handleSpeakTobi = () => {
    sound.playChime();
    if (!profile.audioEnabled) return;
    if (activeTab === "kalkulasi") {
      sound.speak("Hitung nilai total dari buah-buah di layar! Setiap buah memiliki nilai angka rahasia masing-masing. Berapa totalnya?");
    } else if (activeTab === "detektif") {
      sound.speak("Pecahkan teka-teki misteri buah! Cari nilai buah pertama di baris atas, lalu gunakan untuk mengungkap buah kedua!");
    } else {
      sound.speak(scaleQuestion.hint);
    }
  };

  // Perhitungan Sudut Kemiringan Dinamis Neraca
  let tiltAngle = 12; // default: sisi kanan lebih berat sebelum dijawab (+12 deg)
  if (selectedScaleAnswer !== null) {
    const leftCalc = scaleQuestion.leftKnownWeight + (scaleQuestion.mysteryCount * selectedScaleAnswer);
    const rightCalc = scaleQuestion.rightTotalWeight;
    if (leftCalc === rightCalc) {
      tiltAngle = 0; // SEIMBANG SEMPURNA
    } else if (leftCalc > rightCalc) {
      tiltAngle = -13; // Sisi kiri lebih berat (miring ke kiri)
    } else {
      tiltAngle = 13; // Sisi kanan masih lebih berat (miring ke kanan)
    }
  }

  if (!mounted) return null;

  return (
    <div className={`fixed inset-0 w-full h-[100dvh] max-h-[100dvh] overflow-hidden select-none overscroll-none bg-rose-50/40 text-slate-800 flex flex-col ${profile.liteMode ? "lite-high-contrast" : ""}`}>
      {/* Container Utama Layar Penuh Edge-to-Edge */}
      <div className="w-full max-w-4xl lg:max-w-5xl mx-auto flex-1 min-h-0 flex flex-col bg-white rounded-none sm:rounded-3xl border-0 sm:border-4 border-rose-400 sm:shadow-xl sm:my-1.5 lg:my-2 overflow-hidden">
        
        {/* 1. Header Game */}
        <header className="px-3.5 py-1.5 sm:px-5 sm:py-2 bg-rose-50/90 border-b-2 border-rose-100 flex items-center justify-between gap-2 shrink-0">
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/"
              onClick={() => sound.stopSpeaking()}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-xl bg-white hover:bg-slate-100 text-slate-800 font-black text-xs sm:text-sm border-2 border-slate-300 shadow-[0_2px_0_0_#cbd5e1] btn-chunky"
              title="Kembali ke Beranda"
            >
              <ArrowLeft className="w-4 h-4 text-rose-600" />
              <span className="hidden sm:inline">Beranda</span>
            </Link>
            <div>
              <h1 className="text-sm sm:text-lg font-black font-display text-slate-900 tracking-tight leading-tight">
                Hitung Ceria
              </h1>
              <span className="text-[10px] sm:text-xs font-bold text-rose-700 block leading-none">
                Matematika & Logika Keseimbangan SD
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className="flex items-center gap-1 bg-amber-100 px-2 sm:px-2.5 py-1 rounded-xl border border-amber-300 text-amber-900 font-black text-xs">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span>{profile.stars}</span>
            </div>
            <button
              onClick={handleSpeakTobi}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-xl text-xs font-black border-2 border-rose-600 bg-rose-500 hover:bg-rose-600 text-white shadow-[0_2px_0_0_#9f1239] transition-all btn-chunky"
              title="Dengarkan Suara Tobi"
            >
              <Volume2 className="w-3.5 h-3.5 text-yellow-300" />
              <span className="hidden sm:inline">Dengarkan Tobi</span>
            </button>
          </div>
        </header>

        {/* 2. Mode Switcher (3 Mode Lengkap: Kalkulasi, Detektif, Timbangan Neraca) */}
        <div className="px-3 py-1 sm:px-5 sm:py-1.5 bg-slate-50 border-b border-rose-100 flex items-center justify-between gap-1.5 text-xs shrink-0 overflow-x-auto">
          <div className="flex items-center gap-1 sm:gap-1.5">
            {/* Mode 1 */}
            <button
              onClick={() => { setActiveTab("kalkulasi"); setSelectedAnswer(null); }}
              className={`px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-xl font-black text-xs flex items-center gap-1 sm:gap-1.5 transition-all ${
                activeTab === "kalkulasi" ? "bg-rose-600 text-white shadow-sm" : "bg-white text-slate-700 border border-slate-200"
              }`}
            >
              <Calculator className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Kalkulasi Buah</span>
              <span className="sm:hidden">Buah</span>
            </button>

            {/* Mode 2 */}
            <button
              onClick={() => { setActiveTab("detektif"); setSelectedAnswer(null); }}
              className={`px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-xl font-black text-xs flex items-center gap-1 sm:gap-1.5 transition-all ${
                activeTab === "detektif" ? "bg-rose-600 text-white shadow-sm" : "bg-white text-slate-700 border border-slate-200"
              }`}
            >
              <Search className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Detektif Aljabar</span>
              <span className="sm:hidden">Aljabar</span>
            </button>

            {/* Mode 3: Timbangan Neraca */}
            <button
              onClick={() => { setActiveTab("neraca"); setSelectedScaleAnswer(null); }}
              className={`px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-xl font-black text-xs flex items-center gap-1 sm:gap-1.5 transition-all ${
                activeTab === "neraca" ? "bg-amber-500 text-amber-950 shadow-sm border border-amber-600 font-black" : "bg-white text-slate-700 border border-slate-200"
              }`}
            >
              <Scale className="w-3.5 h-3.5 text-amber-900" />
              <span className="hidden sm:inline">Timbangan Neraca</span>
              <span className="sm:hidden">Neraca</span>
            </button>
          </div>

          {/* Tombol Acak / Soal Baru */}
          <button
            onClick={() => {
              if (activeTab === "kalkulasi") newCalcQuestion();
              else if (activeTab === "detektif") newDetQuestion();
              else newScaleQuestion(scaleLevel);
            }}
            className="flex items-center gap-1 px-2.5 py-0.5 sm:py-1 rounded-xl bg-rose-100 hover:bg-rose-200 text-rose-900 font-extrabold text-xs border border-rose-300 btn-chunky shrink-0"
            title="Ganti Soal Baru"
          >
            <Shuffle className="w-3 h-3" />
            <span>Soal Baru</span>
          </button>
        </div>

        {/* 3. Main Stage Game (Menyatu di Tengah) */}
        <main className="flex-1 min-h-0 overflow-hidden flex flex-col justify-center items-center py-1 sm:py-2 px-3">
          
          {/* =========================================================================
              KONTEN MODE 3: TIMBANGAN NERACA MISTERI (INTERACTIVE BALANCE SCALE PUZZLE)
              ========================================================================= */}
          {activeTab === "neraca" ? (
            <div className="w-full max-w-sm sm:max-w-md lg:max-w-4xl mx-auto flex flex-col items-center justify-center gap-2 lg:grid lg:grid-cols-12 lg:gap-6 lg:items-center">
              
              {/* SISI KIRI: Simulasi Fisika Neraca Pure SVG (7 Kolom di Desktop) */}
              <div className="lg:col-span-7 flex flex-col items-center justify-center w-full shrink-0">
                
                {/* 4 Pilihan Level Kesulitan */}
                <div className="flex items-center justify-center gap-1 sm:gap-1.5 mb-1 sm:mb-1.5 w-full overflow-x-auto">
                  {([1, 2, 3, 4] as const).map((lvl) => (
                    <button
                      key={lvl}
                      onClick={() => newScaleQuestion(lvl)}
                      className={`px-2 sm:px-2.5 py-0.5 rounded-lg text-[10px] sm:text-xs font-black transition-all ${
                        scaleLevel === lvl
                          ? "bg-amber-500 text-amber-950 shadow-sm border border-amber-600 scale-105"
                          : "bg-slate-100 hover:bg-slate-200 text-slate-600 border border-slate-300"
                      }`}
                    >
                      Lvl {lvl}
                    </button>
                  ))}
                  <span className="text-[10px] font-bold text-amber-800 ml-1 hidden sm:inline">
                    {scaleQuestion.levelName}
                  </span>
                </div>

                {/* Ilustrasi Neraca Interaktif Pure SVG dengan Animasi Kemiringan */}
                <div className="w-full max-w-[340px] sm:max-w-[420px] aspect-[360/195] bg-gradient-to-b from-amber-50/70 via-white to-orange-50/40 rounded-2xl sm:rounded-3xl border-2 border-amber-200 shadow-inner relative flex items-center justify-center overflow-hidden">
                  
                  {/* Status Keseimbangan Badge di Sudut Kiri Atas */}
                  <div className="absolute top-2 left-2 z-10">
                    {tiltAngle === 0 ? (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-500 text-white shadow-sm flex items-center gap-1 animate-pulse">
                        <CheckCircle2 className="w-3 h-3 text-white" />
                        <span>SEIMBANG!</span>
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-black bg-amber-100 text-amber-900 border border-amber-300">
                        {tiltAngle > 0 ? "Kanan Lebih Berat" : "Kiri Lebih Berat"}
                      </span>
                    )}
                  </div>

                  {/* SVG Neraca Dua Piringan */}
                  <svg viewBox="0 0 360 200" className="w-full h-full" fill="none">
                    {/* 1. Tiang Poros Tengah & Dasar Penyangga */}
                    <path d="M152 186 L167 80 L193 80 L208 186 Z" fill="#78350f" stroke="#451a03" strokeWidth="2" />
                    <rect x="130" y="180" width="100" height="15" rx="4" fill="#92400e" stroke="#451a03" strokeWidth="2" />
                    <circle cx="180" cy="188" r="3" fill="#facc15" />
                    <circle cx="150" cy="188" r="2" fill="#ca8a04" />
                    <circle cx="210" cy="188" r="2" fill="#ca8a04" />

                    {/* Skala Derajat Pusat (Arc Gauge) */}
                    <path d="M164 116 A 20 20 0 0 0 196 116" stroke="#ca8a04" strokeWidth="2" strokeDasharray="2 3" />
                    <circle cx="180" cy="120" r="3" fill={tiltAngle === 0 ? "#10b981" : "#f59e0b"} />

                    {/* 2. Rangka Lengan Neraca Berputar (Rotating Beam) */}
                    <g
                      style={{
                        transform: `rotate(${tiltAngle}deg)`,
                        transformOrigin: "180px 80px",
                        transition: "transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)",
                      }}
                    >
                      {/* Lengan Kayu / Kuningan */}
                      <rect x="45" y="76" width="270" height="8" rx="4" fill="#d97706" stroke="#78350f" strokeWidth="2" />
                      
                      {/* Jarum Penunjuk Tengah Merah */}
                      <polygon points="178,86 182,86 180,118" fill={tiltAngle === 0 ? "#10b981" : "#ef4444"} stroke="#7f1d1d" strokeWidth="1" />
                      
                      {/* Poros Putar Tengah Emas */}
                      <circle cx="180" cy="80" r="10" fill="#f59e0b" stroke="#78350f" strokeWidth="2.5" />
                      <circle cx="180" cy="80" r="4" fill="#fef08a" />

                      {/* --- PIRINGAN KIRI (Left Pan & Hanger) --- */}
                      <g
                        style={{
                          transform: `rotate(${-tiltAngle}deg)`,
                          transformOrigin: "55px 80px",
                          transition: "transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)",
                        }}
                      >
                        {/* Rantai Gantung */}
                        <line x1="55" y1="80" x2="28" y2="132" stroke="#92400e" strokeWidth="1.5" strokeDasharray="3 2" />
                        <line x1="55" y1="80" x2="82" y2="132" stroke="#92400e" strokeWidth="1.5" strokeDasharray="3 2" />
                        <circle cx="55" cy="80" r="3.5" fill="#f59e0b" stroke="#78350f" strokeWidth="1.5" />

                        {/* Mangkok Piringan Kiri */}
                        <path d="M22 132 C26 148 84 148 88 132 Z" fill="#fde047" stroke="#ca8a04" strokeWidth="2" />
                        <ellipse cx="55" cy="132" rx="33" ry="3.5" fill="#fef08a" stroke="#ca8a04" strokeWidth="1.5" />

                        {/* Beban-beban di Piringan Kiri */}
                        {scaleQuestion.leftItems.map((item, idx) => {
                          const isDouble = scaleQuestion.leftItems.length > 1;
                          const posX = isDouble ? (idx === 0 ? 41 : 69) : 55;
                          const posY = 130;
                          const scaleVal = isDouble ? 0.68 : 0.82;

                          return (
                            <g key={idx} transform={`translate(${posX}, ${posY}) scale(${scaleVal})`}>
                              {item.type === "mystery" ? (
                                <MysteryChestGraphic label={selectedScaleAnswer !== null ? `${selectedScaleAnswer}` : "?"} />
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

                      {/* --- PIRINGAN KANAN (Right Pan & Hanger) --- */}
                      <g
                        style={{
                          transform: `rotate(${-tiltAngle}deg)`,
                          transformOrigin: "305px 80px",
                          transition: "transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)",
                        }}
                      >
                        {/* Rantai Gantung */}
                        <line x1="305" y1="80" x2="278" y2="132" stroke="#92400e" strokeWidth="1.5" strokeDasharray="3 2" />
                        <line x1="305" y1="80" x2="332" y2="132" stroke="#92400e" strokeWidth="1.5" strokeDasharray="3 2" />
                        <circle cx="305" cy="80" r="3.5" fill="#f59e0b" stroke="#78350f" strokeWidth="1.5" />

                        {/* Mangkok Piringan Kanan */}
                        <path d="M272 132 C276 148 334 148 338 132 Z" fill="#fde047" stroke="#ca8a04" strokeWidth="2" />
                        <ellipse cx="305" cy="132" rx="33" ry="3.5" fill="#fef08a" stroke="#ca8a04" strokeWidth="1.5" />

                        {/* Beban-beban di Piringan Kanan */}
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
                <div className="mt-1.5 px-3 py-1 bg-amber-100/80 rounded-xl border border-amber-300 text-center w-full max-w-[340px] sm:max-w-[420px]">
                  <span className="text-xs sm:text-sm font-black font-display text-amber-950">
                    {scaleQuestion.equationText}
                  </span>
                </div>
              </div>

              {/* SISI KANAN: Pilihan Jawaban 2x2 & Feedback Interaktif (5 Kolom di Desktop) */}
              <div className="lg:col-span-5 flex flex-col justify-center space-y-2 lg:space-y-2.5 w-full shrink-0">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-amber-900 uppercase tracking-wider">
                    Tebak Berat 1 Peti [ ? ]:
                  </span>
                  <span className="text-[10px] font-bold text-slate-500">
                    Total Kanan: {scaleQuestion.rightTotalWeight} kg
                  </span>
                </div>

                {/* Grid Pilihan Jawaban 2x2 Chunky */}
                <div className="w-full grid grid-cols-2 gap-2">
                  {scaleQuestion.options.map((opt) => {
                    const isSelected = selectedScaleAnswer === opt;
                    const isThisCorrect = isScaleCorrect && isSelected;
                    const isThisWrong = isScaleCorrect === false && isSelected;

                    let btnStyle = "bg-white border-amber-300 text-slate-800 hover:bg-amber-50 shadow-[0_2px_0_0_#fde68a]";
                    if (isThisCorrect) {
                      btnStyle = "bg-emerald-500 border-emerald-600 text-white shadow-[0_2px_0_0_#065f46]";
                    } else if (isThisWrong) {
                      btnStyle = "bg-rose-500 border-rose-600 text-white shadow-[0_2px_0_0_#9f1239]";
                    }

                    return (
                      <button
                        key={opt}
                        onClick={() => handleSelectScaleAnswer(opt)}
                        className={`py-2 sm:py-2.5 lg:py-3 px-2 rounded-xl sm:rounded-2xl border-2 font-display font-black text-base sm:text-lg lg:text-xl flex items-center justify-center transition-all btn-chunky ${btnStyle}`}
                      >
                        <span>{opt} kg</span>
                        {isThisCorrect && <CheckCircle2 className="w-4 h-4 ml-1.5 text-white shrink-0" />}
                      </button>
                    );
                  })}
                </div>

                {/* Banner Feedback Hasil Uji Coba */}
                <div className="min-h-[42px] h-[42px] sm:h-[46px] w-full shrink-0 flex items-center">
                  {selectedScaleAnswer !== null ? (
                    <div className={`p-1.5 sm:p-2 rounded-xl sm:rounded-2xl border text-[11px] sm:text-xs font-medium flex items-center justify-between gap-1.5 w-full h-full shrink-0 ${
                      isScaleCorrect ? "bg-emerald-50 border-emerald-300 text-emerald-950" : "bg-amber-50 border-amber-300 text-amber-950"
                    }`}>
                      <div className="flex items-center gap-1.5 overflow-hidden">
                        {isScaleCorrect ? (
                          <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 text-emerald-600" />
                        ) : (
                          <Lightbulb className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 text-amber-600" />
                        )}
                        <span className="truncate">
                          {isScaleCorrect
                            ? `Seimbang sempurna! Peti = ${scaleQuestion.correctAnswer} kg (+35 Bintang)`
                            : (tiltAngle < 0
                                ? "Kiri terlalu berat! Pilih angka yang lebih ringan."
                                : "Kanan masih berat! Pilih angka yang lebih besar.")}
                        </span>
                      </div>
                      <button
                        onClick={() => newScaleQuestion(scaleLevel)}
                        className="shrink-0 px-2.5 py-1 rounded-lg sm:rounded-xl bg-amber-500 hover:bg-amber-600 text-amber-950 font-black text-xs btn-chunky shadow-sm border border-amber-600"
                      >
                        <span>Lanjut</span>
                      </button>
                    </div>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[10px] sm:text-xs font-bold text-slate-400 shrink-0 text-center">
                      Pilih angka kg di atas untuk menyeimbangkan kedua piringan!
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            /* =========================================================================
                KONTEN MODE 1 (KALKULASI BUAH) & MODE 2 (DETEKTIF ALJABAR BUAH)
                ========================================================================= */
            <div className="w-full max-w-sm sm:max-w-md lg:max-w-4xl mx-auto flex flex-col items-center justify-center gap-3 lg:grid lg:grid-cols-12 lg:gap-8 lg:items-center">
              
              {/* SISI KIRI: Persamaan Visual Buah */}
              <div className="lg:col-span-6 flex flex-col items-center justify-center w-full shrink-0">
                {activeTab === "kalkulasi" ? (
                  /* Mode 1: Kalkulasi Buah */
                  <div className="flex flex-col items-center justify-center w-full">
                    <span className="text-[10px] font-black uppercase text-rose-700 bg-rose-100 px-2.5 py-0.5 rounded-full border border-rose-200 mb-1.5">
                      Hitung Nilai Total Buah
                    </span>

                    {/* Persamaan Visual Buah */}
                    <div className="flex items-center justify-center gap-1.5 sm:gap-2.5 p-2 sm:p-3 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-rose-50/70 to-amber-50/50 border-2 border-rose-200 shadow-inner w-full">
                      {calcTerms.map((t, idx) => (
                        <React.Fragment key={idx}>
                          {idx > 0 && (
                            <span className="text-lg sm:text-xl font-black text-rose-700">+</span>
                          )}
                          <div className="flex items-center gap-1 bg-white p-1.5 sm:p-2 rounded-xl sm:rounded-2xl border border-rose-200 shadow-sm">
                            <t.fruit.SvgComponent className="w-6 h-6 sm:w-8 sm:h-8" />
                            <div className="text-left">
                              <span className="text-[11px] sm:text-xs font-black text-slate-900 block leading-tight">
                                {t.count > 1 ? `${t.count}x ` : ""}{t.fruit.name}
                              </span>
                              <span className="text-[9px] font-extrabold text-rose-600 block leading-tight">
                                (= {t.fruit.value})
                              </span>
                            </div>
                          </div>
                        </React.Fragment>
                      ))}
                      <span className="text-lg sm:text-xl font-black text-rose-700">=</span>
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-rose-600 text-white text-base sm:text-lg font-black flex items-center justify-center shadow-md">
                        ?
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Mode 2: Detektif Aljabar Buah */
                  <div className="flex flex-col items-center justify-center w-full">
                    <span className="text-[10px] font-black uppercase text-rose-700 bg-rose-100 px-2.5 py-0.5 rounded-full border border-rose-200 mb-1.5">
                      Pecahkan Nilai Rahasia
                    </span>

                    <div className="p-2 sm:p-2.5 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-rose-50/70 to-amber-50/50 border-2 border-rose-200 shadow-inner w-full space-y-1 sm:space-y-1.5">
                      {/* Baris 1 */}
                      <div className="flex items-center justify-between p-1.5 sm:p-2 rounded-xl sm:rounded-2xl bg-white border border-rose-200 text-xs sm:text-sm font-black text-slate-800">
                        <div className="flex items-center gap-1.5">
                          <detFruitA.SvgComponent className="w-5 h-5 sm:w-7 sm:h-7" />
                          <span>+</span>
                          <detFruitA.SvgComponent className="w-5 h-5 sm:w-7 sm:h-7" />
                        </div>
                        <span className="text-sm sm:text-base text-rose-700 font-display">= {detLine1}</span>
                      </div>
                      {/* Baris 2 */}
                      <div className="flex items-center justify-between p-1.5 sm:p-2 rounded-xl sm:rounded-2xl bg-white border border-rose-200 text-xs sm:text-sm font-black text-slate-800">
                        <div className="flex items-center gap-1.5">
                          <detFruitA.SvgComponent className="w-5 h-5 sm:w-7 sm:h-7" />
                          <span>+</span>
                          <detFruitB.SvgComponent className="w-5 h-5 sm:w-7 sm:h-7" />
                        </div>
                        <span className="text-sm sm:text-base text-rose-700 font-display">= {detLine2}</span>
                      </div>
                      {/* Baris Target Pertanyaan */}
                      <div className="flex items-center justify-between p-1.5 sm:p-2 rounded-xl sm:rounded-2xl bg-rose-600 text-white text-xs sm:text-sm font-black shadow-sm">
                        <span>
                          {detTargetOp === "+" ? `Berapa ${detFruitA.name} + ${detFruitB.name}?` : `Berapa nilai 1 ${detFruitB.name}?`}
                        </span>
                        <span className="text-sm sm:text-base font-display">= ?</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* SISI KANAN: Grid Pilihan Jawaban 2x2 & Feedback */}
              <div className="lg:col-span-6 flex flex-col justify-center space-y-2 lg:space-y-2.5 w-full shrink-0">
                <span className="hidden lg:block text-xs font-black text-rose-800 uppercase tracking-wider">
                  Pilih Jawaban yang Tepat:
                </span>

                {/* Grid Pilihan Jawaban 2x2 Kompak */}
                <div className="w-full grid grid-cols-2 gap-2">
                  {(activeTab === "kalkulasi" ? calcOptions : detOptions).map((opt) => {
                    const isSelected = selectedAnswer === opt;
                    const isThisCorrect = isCorrect && isSelected;
                    const isThisWrong = isCorrect === false && isSelected;

                    let btnStyle = "bg-white border-rose-200 text-slate-800 hover:bg-rose-50 shadow-[0_2px_0_0_#fecdd3]";
                    if (isThisCorrect) {
                      btnStyle = "bg-emerald-500 border-emerald-600 text-white shadow-[0_2px_0_0_#065f46]";
                    } else if (isThisWrong) {
                      btnStyle = "bg-rose-500 border-rose-600 text-white shadow-[0_2px_0_0_#9f1239]";
                    }

                    return (
                      <button
                        key={opt}
                        onClick={() => handleSelectAnswer(opt)}
                        className={`py-2 sm:py-2.5 lg:py-3 px-2 rounded-xl sm:rounded-2xl border-2 font-display font-black text-base sm:text-lg lg:text-xl flex items-center justify-center transition-all btn-chunky ${btnStyle}`}
                      >
                        <span>{opt}</span>
                        {isThisCorrect && <CheckCircle2 className="w-4 h-4 ml-1.5 text-white shrink-0" />}
                      </button>
                    );
                  })}
                </div>

                {/* Box Feedback Banner Ramping */}
                <div className="min-h-[40px] h-[40px] sm:h-[44px] w-full shrink-0 flex items-center">
                  {selectedAnswer ? (
                    <div className={`p-1.5 sm:p-2 rounded-xl sm:rounded-2xl border text-[11px] sm:text-xs font-medium flex items-center justify-between gap-1.5 w-full h-full shrink-0 ${
                      isCorrect ? "bg-emerald-50 border-emerald-300 text-emerald-950" : "bg-amber-50 border-amber-300 text-amber-950"
                    }`}>
                      <div className="flex items-center gap-1.5 overflow-hidden">
                        {isCorrect ? (
                          <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 text-emerald-600" />
                        ) : (
                          <Lightbulb className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 text-amber-600" />
                        )}
                        <span className="truncate">
                          {isCorrect ? "Luar biasa! Jawabanmu benar (+30 Bintang)" : "Hampir tepat! Periksa kembali nilai buahnya!"}
                        </span>
                      </div>
                      <button
                        onClick={activeTab === "kalkulasi" ? newCalcQuestion : newDetQuestion}
                        className="shrink-0 px-2.5 py-1 rounded-lg sm:rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs btn-chunky shadow-sm"
                      >
                        <span>Lanjut</span>
                      </button>
                    </div>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[10px] sm:text-xs font-bold text-slate-400 shrink-0">
                      Pilih angka yang tepat di atas untuk menguji logikamu!
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </main>

        {/* 5. Footer & Cheat Sheet / Petunjuk Bantuan */}
        <footer className="px-3 py-1.5 sm:px-5 sm:py-2 bg-rose-50/80 border-t border-rose-100 flex items-center justify-between text-xs text-rose-900 shrink-0">
          {activeTab === "neraca" ? (
            <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto scrollbar-none text-[10px] font-bold text-amber-900">
              <span className="font-black uppercase text-slate-500 shrink-0">Beban:</span>
              <span className="bg-amber-100 px-1.5 py-0.5 rounded border border-amber-300 shrink-0">Peti [?] = Misteri</span>
              <span className="bg-yellow-100 px-1.5 py-0.5 rounded border border-yellow-300 shrink-0">Kuningan = kg Tetap</span>
              <span className="bg-cyan-100 px-1.5 py-0.5 rounded border border-cyan-300 shrink-0">Kristal/Kayu</span>
            </div>
          ) : (
            <div className="flex items-center gap-1 overflow-x-auto scrollbar-none">
              <span className="text-[10px] font-black uppercase text-slate-500 shrink-0 mr-1">Nilai:</span>
              {FRUIT_VARIABLES.slice(0, 5).map((f) => (
                <span key={f.id} className="text-[10px] font-bold bg-white px-1.5 py-0.5 rounded border border-rose-200 shrink-0">
                  {f.name}={f.value}
                </span>
              ))}
            </div>
          )}

          <button
            onClick={() => setShowHint(!showHint)}
            className="flex items-center gap-1 text-[11px] font-black text-rose-700 hover:text-rose-800 ml-2 shrink-0"
          >
            <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
            <span>{showHint ? "Tutup Bantuan" : "Bantuan"}</span>
          </button>
        </footer>

        {/* Popover Bantuan Edukatif */}
        {showHint && (
          <div className="px-4 py-2 bg-amber-50 border-t border-amber-200 text-xs font-semibold text-amber-900 shrink-0">
            {activeTab === "kalkulasi" ? calcHint : activeTab === "detektif" ? detHint : scaleQuestion.hint}
          </div>
        )}

      </div>
    </div>
  );
}
