"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import confetti from "canvas-confetti";
import { 
  ArrowLeft, 
  Sparkles, 
  Star, 
  Volume2, 
  Shuffle, 
  Calculator, 
  Search,
  CheckCircle2,
  Lightbulb
} from "lucide-react";
import { sound } from "@/lib/sound";
import { getStudentProfile, saveStudentProfile, StudentProfile, DEFAULT_PROFILE } from "@/lib/storage";

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

export default function HitungCeriaPage() {
  const [profile, setProfile] = useState<StudentProfile>(DEFAULT_PROFILE);
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<"kalkulasi" | "detektif">("kalkulasi");
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showHint, setShowHint] = useState(false);

  // Mode 1: Kalkulasi
  const [calcTerms, setCalcTerms] = useState<{ fruit: FruitVariable; count: number; op: "+" | "-" }[]>([]);
  const [calcAnswer, setCalcAnswer] = useState(0);
  const [calcOptions, setCalcOptions] = useState<number[]>([]);
  const [calcHint, setCalcHint] = useState("");

  // Mode 2: Detektif
  const [detFruitA, setDetFruitA] = useState<FruitVariable>(FRUIT_VARIABLES[1]);
  const [detFruitB, setDetFruitB] = useState<FruitVariable>(FRUIT_VARIABLES[2]);
  const [detLine1, setDetLine1] = useState(4);
  const [detLine2, setDetLine2] = useState(5);
  const [detTargetOp, setDetTargetOp] = useState<"+" | "-" | "onlyB">("+");
  const [detAnswer, setDetAnswer] = useState(0);
  const [detOptions, setDetOptions] = useState<number[]>([]);
  const [detHint, setDetHint] = useState("");

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

  useEffect(() => {
    const stored = getStudentProfile();
    setProfile(stored);
    sound.setSpeechEnabled(stored.audioEnabled);
    setMounted(true);
    newCalcQuestion();
    newDetQuestion();
  }, []);

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

  const handleSpeakTobi = () => {
    sound.playChime();
    if (!profile.audioEnabled) return;
    const script = activeTab === "kalkulasi"
      ? "Hitung nilai total dari buah-buah di layar! Setiap buah memiliki nilai angka rahasia masing-masing. Berapa totalnya?"
      : "Pecahkan teka-teki misteri buah! Cari nilai buah pertama di baris atas, lalu gunakan untuk mengungkap buah kedua!";
    sound.speak(script);
  };

  if (!mounted) return null;

  return (
    <div className={`h-screen max-h-screen overflow-hidden bg-gradient-to-br from-rose-950 via-slate-900 to-amber-950 text-slate-800 flex flex-col justify-center p-2 sm:p-4 select-none ${profile.liteMode ? "lite-high-contrast" : ""}`}>
      {/* Container Utama 1 Layar Penuh (Zero-Scroll Viewport) */}
      <div className="w-full max-w-4xl mx-auto h-full max-h-full bg-white rounded-3xl border-3 sm:border-4 border-rose-400 shadow-2xl flex flex-col overflow-hidden my-auto">
        
        {/* 1. Header Game */}
        <header className="px-3.5 py-2.5 sm:px-5 sm:py-3 bg-rose-50/90 border-b-2 border-rose-100 flex items-center justify-between gap-2 shrink-0">
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/"
              onClick={() => sound.stopSpeaking()}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-800 font-black text-xs sm:text-sm border-2 border-slate-300 shadow-[0_2px_0_0_#cbd5e1] btn-chunky"
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
                Matematika & Logika Koding SD
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
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-black border-2 border-rose-600 bg-rose-500 hover:bg-rose-600 text-white shadow-[0_2px_0_0_#9f1239] transition-all btn-chunky"
              title="Dengarkan Suara Tobi"
            >
              <Volume2 className="w-3.5 h-3.5 text-yellow-300" />
              <span className="hidden sm:inline">Dengarkan Tobi</span>
            </button>
          </div>
        </header>

        {/* 2. Mode Switcher (1 Baris Rapi) */}
        <div className="px-3 py-1.5 sm:px-5 sm:py-2 bg-slate-50 border-b border-rose-100 flex items-center justify-between gap-2 text-xs shrink-0">
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => { setActiveTab("kalkulasi"); setSelectedAnswer(null); }}
              className={`px-3 py-1 rounded-xl font-black text-xs flex items-center gap-1.5 transition-all ${
                activeTab === "kalkulasi" ? "bg-rose-600 text-white shadow-sm" : "bg-white text-slate-700 border border-slate-200"
              }`}
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>Kalkulasi Buah</span>
            </button>
            <button
              onClick={() => { setActiveTab("detektif"); setSelectedAnswer(null); }}
              className={`px-3 py-1 rounded-xl font-black text-xs flex items-center gap-1.5 transition-all ${
                activeTab === "detektif" ? "bg-rose-600 text-white shadow-sm" : "bg-white text-slate-700 border border-slate-200"
              }`}
            >
              <Search className="w-3.5 h-3.5" />
              <span>Detektif Misteri</span>
            </button>
          </div>

          <button
            onClick={activeTab === "kalkulasi" ? newCalcQuestion : newDetQuestion}
            className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-rose-100 hover:bg-rose-200 text-rose-900 font-extrabold text-xs border border-rose-300 btn-chunky"
            title="Ganti Soal Baru"
          >
            <Shuffle className="w-3 h-3" />
            <span>Soal Baru</span>
          </button>
        </div>

        {/* 3. Main Stage Game (Pas 1 Layar Penuh) */}
        <main className="p-3.5 sm:p-5 flex-1 flex flex-col justify-between overflow-hidden">
          {activeTab === "kalkulasi" ? (
            /* Mode 1: Kalkulasi Buah */
            <div className="flex flex-col items-center justify-center flex-1 my-auto">
              <span className="text-[11px] font-black uppercase text-rose-700 bg-rose-100 px-3 py-0.5 rounded-full border border-rose-200 mb-2">
                Hitung Nilai Total Buah
              </span>

              {/* Persamaan Visual Buah */}
              <div className="flex items-center justify-center gap-2 sm:gap-4 p-3 sm:p-5 rounded-3xl bg-gradient-to-br from-rose-50/70 to-amber-50/50 border-2 border-rose-200 shadow-inner max-w-lg w-full">
                {calcTerms.map((t, idx) => (
                  <React.Fragment key={idx}>
                    {idx > 0 && (
                      <span className="text-2xl sm:text-3xl font-black text-rose-700">+</span>
                    )}
                    <div className="flex items-center gap-1.5 bg-white p-2 sm:p-3 rounded-2xl border border-rose-200 shadow-sm">
                      <t.fruit.SvgComponent className="w-8 h-8 sm:w-11 sm:h-11" />
                      <div className="text-left">
                        <span className="text-xs sm:text-sm font-black text-slate-900 block leading-tight">
                          {t.count > 1 ? `${t.count}x ` : ""}{t.fruit.name}
                        </span>
                        <span className="text-[10px] font-extrabold text-rose-600 block leading-tight">
                          (= {t.fruit.value})
                        </span>
                      </div>
                    </div>
                  </React.Fragment>
                ))}
                <span className="text-2xl sm:text-3xl font-black text-rose-700">=</span>
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-rose-600 text-white text-xl sm:text-2xl font-black flex items-center justify-center shadow-md">
                  ?
                </div>
              </div>
            </div>
          ) : (
            /* Mode 2: Detektif Misteri Buah */
            <div className="flex flex-col items-center justify-center flex-1 my-auto">
              <span className="text-[11px] font-black uppercase text-rose-700 bg-rose-100 px-3 py-0.5 rounded-full border border-rose-200 mb-2">
                Pecahkan Nilai Rahasia
              </span>

              <div className="p-3 sm:p-4 rounded-3xl bg-gradient-to-br from-rose-50/70 to-amber-50/50 border-2 border-rose-200 shadow-inner max-w-lg w-full space-y-2">
                {/* Baris 1 */}
                <div className="flex items-center justify-between p-2 rounded-2xl bg-white border border-rose-200 text-xs sm:text-sm font-black text-slate-800">
                  <div className="flex items-center gap-2">
                    <detFruitA.SvgComponent className="w-7 h-7 sm:w-9 sm:h-9" />
                    <span>+</span>
                    <detFruitA.SvgComponent className="w-7 h-7 sm:w-9 sm:h-9" />
                  </div>
                  <span className="text-base sm:text-lg text-rose-700 font-display">= {detLine1}</span>
                </div>
                {/* Baris 2 */}
                <div className="flex items-center justify-between p-2 rounded-2xl bg-white border border-rose-200 text-xs sm:text-sm font-black text-slate-800">
                  <div className="flex items-center gap-2">
                    <detFruitA.SvgComponent className="w-7 h-7 sm:w-9 sm:h-9" />
                    <span>+</span>
                    <detFruitB.SvgComponent className="w-7 h-7 sm:w-9 sm:h-9" />
                  </div>
                  <span className="text-base sm:text-lg text-rose-700 font-display">= {detLine2}</span>
                </div>
                {/* Baris Target Pertanyaan */}
                <div className="flex items-center justify-between p-2.5 rounded-2xl bg-rose-600 text-white text-xs sm:text-sm font-black shadow-sm">
                  <span>
                    {detTargetOp === "+" ? `Berapa ${detFruitA.name} + ${detFruitB.name}?` : `Berapa nilai 1 ${detFruitB.name}?`}
                  </span>
                  <span className="text-base sm:text-lg font-display">= ?</span>
                </div>
              </div>
            </div>
          )}

          {/* 4. Grid Pilihan Jawaban 2x2 */}
          <div className="my-2 grid grid-cols-2 gap-2 sm:gap-2.5 max-w-lg mx-auto w-full">
            {(activeTab === "kalkulasi" ? calcOptions : detOptions).map((opt) => {
              const isSelected = selectedAnswer === opt;
              const target = activeTab === "kalkulasi" ? calcAnswer : detAnswer;
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
                  className={`p-3 sm:p-4 rounded-2xl border-2 font-display font-black text-lg sm:text-xl flex items-center justify-center transition-all btn-chunky ${btnStyle}`}
                >
                  <span>{opt}</span>
                  {isThisCorrect && <CheckCircle2 className="w-5 h-5 ml-2 text-white shrink-0" />}
                </button>
              );
            })}
          </div>

          {/* Feedback & Hint Banner */}
          {selectedAnswer ? (
            <div className={`p-2 sm:p-2.5 rounded-2xl border text-xs font-medium flex items-center justify-between gap-2 max-w-lg mx-auto w-full shrink-0 ${
              isCorrect ? "bg-emerald-50 border-emerald-300 text-emerald-950" : "bg-amber-50 border-amber-300 text-amber-950"
            }`}>
              <div className="flex items-center gap-1.5 overflow-hidden">
                <Sparkles className="w-4 h-4 shrink-0 text-amber-600" />
                <span className="truncate">
                  {isCorrect ? "Luar biasa! Jawabanmu benar (+30 Bintang)" : "Hampir tepat! Periksa kembali nilai buahnya!"}
                </span>
              </div>
              <button
                onClick={activeTab === "kalkulasi" ? newCalcQuestion : newDetQuestion}
                className="shrink-0 px-2.5 py-1 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-[11px] btn-chunky"
              >
                Soal Lanjut
              </button>
            </div>
          ) : (
            <div className="h-8 shrink-0 flex items-center justify-center text-[11px] font-bold text-slate-400">
              Pilih angka yang tepat di atas untuk menguji logikamu!
            </div>
          )}
        </main>

        {/* 5. Footer & Cheat Sheet Buah */}
        <footer className="px-3 py-1.5 sm:px-5 sm:py-2 bg-rose-50/80 border-t border-rose-100 flex items-center justify-between text-xs text-rose-900 shrink-0">
          <div className="flex items-center gap-1 overflow-x-auto scrollbar-none">
            <span className="text-[10px] font-black uppercase text-slate-500 shrink-0 mr-1">Nilai:</span>
            {FRUIT_VARIABLES.slice(0, 5).map((f) => (
              <span key={f.id} className="text-[10px] font-bold bg-white px-1.5 py-0.5 rounded border border-rose-200 shrink-0">
                {f.name}={f.value}
              </span>
            ))}
          </div>

          <button
            onClick={() => setShowHint(!showHint)}
            className="flex items-center gap-1 text-[11px] font-black text-rose-700 hover:text-rose-800 ml-2 shrink-0"
          >
            <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
            <span>{showHint ? "Tutup Bantuan" : "Bantuan"}</span>
          </button>
        </footer>

        {/* Popover Bantuan */}
        {showHint && (
          <div className="px-4 py-2 bg-amber-50 border-t border-amber-200 text-xs font-semibold text-amber-900">
            {activeTab === "kalkulasi" ? calcHint : detHint}
          </div>
        )}

      </div>
    </div>
  );
}
