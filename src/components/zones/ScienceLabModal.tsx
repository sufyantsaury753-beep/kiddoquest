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
  Star,
  Target,
  Trophy,
  CheckCircle2
} from "lucide-react";
import { sound } from "@/lib/sound";

interface ScienceLabModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEarnStars: (amount: number) => void;
  audioEnabled: boolean;
  liteMode: boolean;
}

export interface LabTube {
  id: string;
  name: string;
  colorName: string;
  hex: string;
  gradientFrom: string;
  gradientTo: string;
  category: "Primer" | "Sekunder" | "Pencerah/Penggelap" | "Spesial";
  desc: string;
}

export const LAB_TUBES: LabTube[] = [
  {
    id: "red",
    name: "Merah Delima",
    colorName: "Merah",
    hex: "#ef4444",
    gradientFrom: "#f87171",
    gradientTo: "#dc2626",
    category: "Primer",
    desc: "Warna primer berani pembawa energi cerah.",
  },
  {
    id: "yellow",
    name: "Kuning Matahari",
    colorName: "Kuning",
    hex: "#facc15",
    gradientFrom: "#fde047",
    gradientTo: "#eab308",
    category: "Primer",
    desc: "Warna primer hangat seperti pancaran sinar matahari.",
  },
  {
    id: "blue",
    name: "Biru Samudera",
    colorName: "Biru",
    hex: "#3b82f6",
    gradientFrom: "#60a5fa",
    gradientTo: "#1d4ed8",
    category: "Primer",
    desc: "Warna primer sejuk seperti perairan laut dalam.",
  },
  {
    id: "green",
    name: "Hijau Daun",
    colorName: "Hijau",
    hex: "#22c55e",
    gradientFrom: "#4ade80",
    gradientTo: "#15803d",
    category: "Sekunder",
    desc: "Warna segar dedaunan hutan hujan nusantara.",
  },
  {
    id: "orange",
    name: "Oranye Jeruk",
    colorName: "Oranye",
    hex: "#f97316",
    gradientFrom: "#fb923c",
    gradientTo: "#c2410c",
    category: "Sekunder",
    desc: "Warna ceria penuh vitamin seperti buah jeruk manis.",
  },
  {
    id: "purple",
    name: "Ungu Anggur",
    colorName: "Ungu",
    hex: "#a855f7",
    gradientFrom: "#c084fc",
    gradientTo: "#7e22ce",
    category: "Sekunder",
    desc: "Warna anggun dan manis seperti butiran buah anggur.",
  },
  {
    id: "pink",
    name: "Merah Muda / Pink",
    colorName: "Pink",
    hex: "#ec4899",
    gradientFrom: "#f472b6",
    gradientTo: "#be185d",
    category: "Sekunder",
    desc: "Warna lembut kelopak bunga mawar merekah.",
  },
  {
    id: "cyan",
    name: "Biru Langit / Cyan",
    colorName: "Cyan",
    hex: "#06b6d4",
    gradientFrom: "#22d3ee",
    gradientTo: "#0e7490",
    category: "Sekunder",
    desc: "Warna jernih angkasa cerah di siang hari.",
  },
  {
    id: "brown",
    name: "Cokelat Tanah",
    colorName: "Cokelat",
    hex: "#78350f",
    gradientFrom: "#92400e",
    gradientTo: "#451a03",
    category: "Sekunder",
    desc: "Warna alami tanah subur tempat akar bertumbuh.",
  },
  {
    id: "white",
    name: "Putih Mutiara",
    colorName: "Putih",
    hex: "#f8fafc",
    gradientFrom: "#ffffff",
    gradientTo: "#cbd5e1",
    category: "Pencerah/Penggelap",
    desc: "Cairan pencerah kristal untuk membuat warna pastel lembut.",
  },
  {
    id: "black",
    name: "Hitam Arang",
    colorName: "Hitam",
    hex: "#1e293b",
    gradientFrom: "#334155",
    gradientTo: "#0f172a",
    category: "Pencerah/Penggelap",
    desc: "Cairan penggelap pekat untuk nuansa malam yang dalam.",
  },
  {
    id: "gold",
    name: "Emas Berkilau",
    colorName: "Emas",
    hex: "#eab308",
    gradientFrom: "#fde047",
    gradientTo: "#ca8a04",
    category: "Spesial",
    desc: "Cairan berkilau mewah dengan partikel mineral mulia.",
  },
];

// Pure SVG Quest Illustrations (Zero Emojis)
function QuestSvgRose() {
  return (
    <svg viewBox="0 0 48 48" className="w-9 h-9" fill="none">
      <path d="M24 30C24 38 22 44 22 44" stroke="#15803d" strokeWidth="3" strokeLinecap="round" />
      <path d="M23 36C28 35 34 38 34 38C34 38 32 32 24 33" fill="#22c55e" stroke="#16a34a" strokeWidth="1.5" />
      <circle cx="24" cy="18" r="12" fill="#f472b6" />
      <path d="M24 10C29 10 32 14 32 18C32 23 27 26 24 26C20 26 16 22 16 18C16 14 19 10 24 10Z" fill="#ec4899" />
      <path d="M22 14C25 12 28 15 27 18C26 21 23 21 22 19C21 17 21 15 22 14Z" fill="#be185d" />
    </svg>
  );
}

function QuestSvgOrange() {
  return (
    <svg viewBox="0 0 48 48" className="w-9 h-9" fill="none">
      <circle cx="24" cy="24" r="18" fill="#f97316" stroke="#ea580c" strokeWidth="2" />
      <circle cx="24" cy="24" r="14" fill="#fb923c" />
      <path d="M24 11V37M11 24H37M15 15L33 33M15 33L33 15" stroke="#fed7aa" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="24" cy="24" r="3" fill="#ffedd5" />
    </svg>
  );
}

function QuestSvgEmerald() {
  return (
    <svg viewBox="0 0 48 48" className="w-9 h-9" fill="none">
      <polygon points="14,14 34,14 42,22 24,40 6,22" fill="#10b981" stroke="#059669" strokeWidth="2" />
      <polygon points="14,14 34,14 30,22 18,22" fill="#34d399" />
      <polygon points="6,22 18,22 24,40" fill="#047857" opacity="0.6" />
      <polygon points="42,22 30,22 24,40" fill="#065f46" opacity="0.8" />
      <line x1="14" y1="14" x2="18" y2="22" stroke="#a7f3d0" strokeWidth="1.5" />
      <line x1="34" y1="14" x2="30" y2="22" stroke="#a7f3d0" strokeWidth="1.5" />
    </svg>
  );
}

function QuestSvgBronze() {
  return (
    <svg viewBox="0 0 48 48" className="w-9 h-9" fill="none">
      <circle cx="24" cy="24" r="18" fill="#78350f" stroke="#b45309" strokeWidth="2.5" />
      <circle cx="24" cy="24" r="14" fill="#92400e" stroke="#d97706" strokeWidth="1.5" />
      <polygon points="24,14 27,21 34,22 29,27 30,34 24,30 18,34 19,27 14,22 21,21" fill="#f59e0b" />
    </svg>
  );
}

function QuestSvgGalaxy() {
  return (
    <svg viewBox="0 0 48 48" className="w-9 h-9" fill="none">
      <ellipse cx="24" cy="24" rx="19" ry="9" transform="rotate(-30 24 24)" fill="#312e81" stroke="#818cf8" strokeWidth="1.5" />
      <ellipse cx="24" cy="24" rx="13" ry="6" transform="rotate(-30 24 24)" fill="#4f46e5" />
      <circle cx="24" cy="24" r="4" fill="#a855f7" />
      <circle cx="24" cy="24" r="2" fill="#ffffff" />
      <circle cx="12" cy="18" r="1.5" fill="#fbcfe8" />
      <circle cx="36" cy="30" r="1.5" fill="#bae6fd" />
      <circle cx="34" cy="14" r="1.5" fill="#fef08a" />
    </svg>
  );
}

function QuestSvgLeaf() {
  return (
    <svg viewBox="0 0 48 48" className="w-9 h-9" fill="none">
      <path d="M12 40C20 38 34 28 38 12C22 12 14 24 12 40Z" fill="#22c55e" stroke="#15803d" strokeWidth="2" />
      <path d="M12 40L32 18" stroke="#166534" strokeWidth="2" strokeLinecap="round" />
      <path d="M18 34L26 31M22 27L30 24M26 21L34 18" stroke="#86efac" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function QuestSvgIce() {
  return (
    <svg viewBox="0 0 48 48" className="w-9 h-9" fill="none">
      <polygon points="24,6 40,38 8,38" fill="#38bdf8" stroke="#0284c7" strokeWidth="2" />
      <polygon points="24,6 30,38 8,38" fill="#7dd3fc" />
      <polygon points="24,6 20,20 28,20" fill="#e0f2fe" />
      <line x1="24" y1="6" x2="24" y2="38" stroke="#0369a1" strokeWidth="1.5" />
    </svg>
  );
}

interface ColorQuest {
  id: string;
  targetName: string;
  colors: [string, string];
  prompt: string;
  hint: string;
  illustration: React.ReactNode;
}

const COLOR_QUESTS: ColorQuest[] = [
  {
    id: "rose-pink",
    targetName: "Pink Permen Karet Lembut",
    colors: ["red", "white"],
    prompt: "Tobi ingin mewarnai kelopak bunga mawar taman sekolah. Bisakah kamu meracik warna Pink lembut?",
    hint: "Campurkan Merah Delima dengan Putih Mutiara pencerah!",
    illustration: <QuestSvgRose />,
  },
  {
    id: "orange-citrus",
    targetName: "Oranye Jeruk Segar",
    colors: ["red", "yellow"],
    prompt: "Tobi ingin mewarnai buah jeruk manis yang baru dipetik. Bisakah kamu mencampur warna Oranye?",
    hint: "Campurkan Merah Delima dengan Kuning Matahari!",
    illustration: <QuestSvgOrange />,
  },
  {
    id: "emerald-gem",
    targetName: "Hijau Zamrud Berkilau",
    colors: ["blue", "gold"],
    prompt: "Tobi menemukan kristal batu mulia di gua sains. Bisakah kamu meracik warna Hijau Zamrud berkilau?",
    hint: "Campurkan Biru Samudera dengan Emas Berkilau!",
    illustration: <QuestSvgEmerald />,
  },
  {
    id: "bronze-relic",
    targetName: "Perunggu Kuno Logam Mulia",
    colors: ["black", "gold"],
    prompt: "Tobi ingin membersihkan medali peninggalan sejarah. Bisakah kamu membuat warna Perunggu Kuno?",
    hint: "Campurkan Hitam Arang dengan Emas Berkilau!",
    illustration: <QuestSvgBronze />,
  },
  {
    id: "cosmic-galaxy",
    targetName: "Warna Galaksi Kosmik",
    colors: ["purple", "cyan"],
    prompt: "Tobi ingin melukis pemandangan pusaran bintang antariksa. Bisakah kamu memadukan warna Galaksi Kosmik?",
    hint: "Campurkan Ungu Anggur dengan Biru Langit Cyan!",
    illustration: <QuestSvgGalaxy />,
  },
  {
    id: "tropical-leaf",
    targetName: "Hijau Daun Tropis",
    colors: ["blue", "yellow"],
    prompt: "Tobi ingin menanam bibit pohon pelindung bumi. Bisakah kamu meracik warna Hijau Daun segar?",
    hint: "Campurkan Kuning Matahari dengan Biru Samudera!",
    illustration: <QuestSvgLeaf />,
  },
  {
    id: "polar-ice",
    targetName: "Biru Es Kutub Cerah",
    colors: ["blue", "white"],
    prompt: "Tobi ingin menggambar gunung es di kutub utara. Bisakah kamu meracik warna Biru Es Kutub?",
    hint: "Campurkan Biru Samudera dengan Putih Mutiara pencerah!",
    illustration: <QuestSvgIce />,
  },
];

// Special Curated Mixing Catalog
interface SpecialRecipe {
  name: string;
  hex: string;
  desc: string;
}

const SPECIAL_RECIPES: Record<string, SpecialRecipe> = {
  "red+yellow": {
    name: "Oranye Jeruk Segar",
    hex: "#f97316",
    desc: "Perpaduan energi merah dan keceriaan kuning melahirkan warna oranye yang hangat dan segar.",
  },
  "blue+gold": {
    name: "Hijau Zamrud Berkilau",
    hex: "#10b981",
    desc: "Reaksi langka partikel emas di dalam cairan biru samudera menghasilkan kilau hijau zamrud yang sangat memukau.",
  },
  "red+white": {
    name: "Pink Permen Karet Lembut",
    hex: "#f472b6",
    desc: "Sentuhan pencerah putih melembutkan intensitas merah menjadi merah muda yang manis.",
  },
  "black+gold": {
    name: "Perunggu Kuno Logam Mulia",
    hex: "#92400e",
    desc: "Campuran arang pekat dengan emas mulia menciptakan efek logam perunggu antik bernilai sejarah tinggi.",
  },
  "cyan+purple": {
    name: "Warna Galaksi Kosmik",
    hex: "#6366f1",
    desc: "Pertemuan ungu kosmis dengan biru langit cyan melahirkan gradasi ruang angkasa berbintang.",
  },
  "blue+yellow": {
    name: "Hijau Daun Tropis",
    hex: "#22c55e",
    desc: "Dua warna primer utama bersatu membentuk warna hijau alami fotosintesis pepohonan.",
  },
  "blue+red": {
    name: "Ungu Kerajaan Megah",
    hex: "#8b5cf6",
    desc: "Pertemuan merah berani dan biru tenang menghasilkan warna ungu bangsawan yang anggun.",
  },
  "blue+white": {
    name: "Biru Es Kutub Cerah",
    hex: "#38bdf8",
    desc: "Putih mutiara mencairkan kedalaman biru laut menjadi warna gletser kutub yang dingin dan jernih.",
  },
  "black+red": {
    name: "Merah Marun Kristal",
    hex: "#881337",
    desc: "Pigmen hitam mengentalkan merah menjadi warna marun delima pekat yang sangat mewah.",
  },
  "black+yellow": {
    name: "Zaitun Cokelat Hutan",
    hex: "#713f12",
    desc: "Kuning terang diredam oleh hitam pekat menjadi rona cokelat zaitun menyerupai tanah humus.",
  },
  "black+white": {
    name: "Abu-abu Perak Murni",
    hex: "#64748b",
    desc: "Pertemuan dua kutub pencerah dan penggelap menghasilkan warna abu-abu logam yang seimbang.",
  },
  "green+yellow": {
    name: "Hijau Lemon Segar",
    hex: "#84cc16",
    desc: "Kuning ekstra pada cairan hijau menghidupkan aroma warna lemon yang cerah menyengat.",
  },
  "cyan+pink": {
    name: "Lembayung Senja Pastel",
    hex: "#c084fc",
    desc: "Dua warna pastel bertemu menghasilkan rona langit lembayung saat matahari terbenam di ufuk barat.",
  },
  "gold+orange": {
    name: "Tembaga Surya Hangat",
    hex: "#d97706",
    desc: "Perpaduan emas dan oranye memancarkan gelombang cahaya tembaga yang sangat cerah.",
  },
  "purple+white": {
    name: "Lavender Kristal Manis",
    hex: "#d8b4fe",
    desc: "Putih mutiara mengubah ungu pekat menjadi bunga lavender yang menenangkan pikiran.",
  },
  "blue+green": {
    name: "Toska Samudera Dalam",
    hex: "#0d9488",
    desc: "Pencampuran hijau dan biru menciptakan warna toska jernih seperti terumbu karang laut tropis.",
  },
  "green+red": {
    name: "Cokelat Bumi Alami",
    hex: "#78350f",
    desc: "Dua warna komplementer saling menyeimbangkan menjadi rona tanah liat padat.",
  },
  "black+pink": {
    name: "Merah Anggrek Malam",
    hex: "#831843",
    desc: "Warna merah muda berpadu dengan hitam menghasilkan corak anggrek malam yang memesona.",
  },
  "gold+white": {
    name: "Kuning Berlian Sutra",
    hex: "#fde047",
    desc: "Partikel emas yang dicerahkan memancarkan kilau berlian kuning yang bersinar lembut.",
  },
  "black+green": {
    name: "Hijau Lumut Abadi",
    hex: "#14532d",
    desc: "Penggelapan pigmen hijau melahirkan warna lumut hutan yang sejuk dan menenangkan.",
  },
};

// Zero-Fail Mathematical RGB Interpolator
function hexToRgb(hex: string) {
  const c = hex.replace("#", "");
  const num = parseInt(c, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

function rgbToHex(r: number, g: number, b: number) {
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

function calculateInterpolatedColor(tubeA: LabTube, tubeB: LabTube): SpecialRecipe {
  if (tubeA.id === tubeB.id) {
    return {
      name: `Konsentrasi Murni ${tubeA.name}`,
      hex: tubeA.hex,
      desc: `Dua takaran cairan ${tubeA.name} disatukan menghasilkan konsentrasi larutan murni dengan kepadatan warna maksimal.`,
    };
  }

  const key1 = `${tubeA.id}+${tubeB.id}`;
  const key2 = `${tubeB.id}+${tubeA.id}`;
  if (SPECIAL_RECIPES[key1]) return SPECIAL_RECIPES[key1];
  if (SPECIAL_RECIPES[key2]) return SPECIAL_RECIPES[key2];

  // Mathematical RGB blend
  const c1 = hexToRgb(tubeA.hex);
  const c2 = hexToRgb(tubeB.hex);
  const avgR = Math.round((c1.r + c2.r) / 2);
  const avgG = Math.round((c1.g + c2.g) / 2);
  const avgB = Math.round((c1.b + c2.b) / 2);
  const mixedHex = rgbToHex(avgR, avgG, avgB);

  return {
    name: `Ramuan Sintesis ${tubeA.colorName} & ${tubeB.colorName}`,
    hex: mixedHex,
    desc: `Penyatuan molekul pigmen dari ${tubeA.name} dan ${tubeB.name} berhasil membentuk senyawa larutan baru yang harmonis di dalam labu laboratorium.`,
  };
}

export default function ScienceLabModal({
  isOpen,
  onClose,
  onEarnStars,
  audioEnabled,
  liteMode,
}: ScienceLabModalProps) {
  const [activeTab, setActiveTab] = useState<"colors" | "waterCycle">("colors");

  // Color selection state (tube IDs)
  const [selectedTube1, setSelectedTube1] = useState<string | null>(null);
  const [selectedTube2, setSelectedTube2] = useState<string | null>(null);
  const [mixedResult, setMixedResult] = useState<SpecialRecipe | null>(null);
  const [isPouring, setIsPouring] = useState(false);

  // Quest Mode
  const [isQuestMode, setIsQuestMode] = useState(false);
  const [currentQuestIdx, setCurrentQuestIdx] = useState(0);
  const [questSuccess, setQuestSuccess] = useState(false);

  // Water Cycle Tab
  const [waterStep, setWaterStep] = useState<1 | 2 | 3>(1);

  if (!isOpen) return null;

  const activeQuest = COLOR_QUESTS[currentQuestIdx];

  const handleSelectTube = (tube: LabTube) => {
    sound.playChime();

    if (!selectedTube1) {
      setSelectedTube1(tube.id);
      setMixedResult(null);
      setQuestSuccess(false);
    } else if (!selectedTube2) {
      setSelectedTube2(tube.id);
      executeMixing(selectedTube1, tube.id);
    }
  };

  const executeMixing = (idA: string, idB: string) => {
    setIsPouring(true);
    const tubeA = LAB_TUBES.find((t) => t.id === idA) || LAB_TUBES[0];
    const tubeB = LAB_TUBES.find((t) => t.id === idB) || LAB_TUBES[1];

    const result = calculateInterpolatedColor(tubeA, tubeB);

    setTimeout(() => {
      setIsPouring(false);
      setMixedResult(result);

      // Check Quest Condition
      const isQuestMatch =
        isQuestMode &&
        ((activeQuest.colors[0] === idA && activeQuest.colors[1] === idB) ||
          (activeQuest.colors[0] === idB && activeQuest.colors[1] === idA));

      if (isQuestMatch) {
        setQuestSuccess(true);
        sound.playCelebration();
        onEarnStars(40);
        if (!liteMode) {
          confetti({
            particleCount: 50,
            spread: 70,
            origin: { y: 0.6 },
            colors: [tubeA.hex, tubeB.hex, result.hex, "#facc15"],
          });
        }
        if (audioEnabled) {
          sound.speak(`Luar biasa! Resep rahasia ${activeQuest.targetName} berhasil kamu ciptakan! Kamu mendapat empat puluh bintang!`);
        }
      } else {
        setQuestSuccess(false);
        sound.playCelebration();
        onEarnStars(30);
        if (!liteMode) {
          confetti({
            particleCount: 35,
            spread: 55,
            origin: { y: 0.6 },
          });
        }
        if (audioEnabled) {
          sound.speak(`Selamat! Warna baru tercipta di labu ukur: ${result.name}! ${result.desc}`);
        }
      }
    }, 600);
  };

  const handleResetLab = () => {
    setSelectedTube1(null);
    setSelectedTube2(null);
    setMixedResult(null);
    setQuestSuccess(false);
    sound.playChime();
  };

  const handleNextQuest = () => {
    const nextIdx = (currentQuestIdx + 1) % COLOR_QUESTS.length;
    setCurrentQuestIdx(nextIdx);
    handleResetLab();
    if (audioEnabled) {
      sound.speak(COLOR_QUESTS[nextIdx].prompt);
    }
  };

  const handleWaterStep = (step: 1 | 2 | 3) => {
    setWaterStep(step);
    sound.playChime();

    const explanations = {
      1: "Tahap Evaporasi: Panas matahari memanaskan air laut dan danau hingga menguap naik ke angkasa menjadi butiran uap yang tak terlihat.",
      2: "Tahap Kondensasi: Di atmosfer yang dingin, butiran uap air berkumpul dan memadat membentuk gumpalan awan tebal.",
      3: "Tahap Presipitasi: Awan jenuh yang berat melepaskan muatannya menjadi tetesan air hujan yang menyirami tanah, pepohonan, dan kembali mengalir ke laut.",
    };

    if (audioEnabled) {
      sound.speak(explanations[step]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-5 bg-slate-900/65 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-white rounded-3xl border-4 border-emerald-400 shadow-2xl p-4 sm:p-7 overflow-hidden my-auto">
        {/* Header (No Tata Surya button, clean chemistry focus) */}
        <div className="flex items-center justify-between pb-3 border-b-2 border-emerald-100 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center border border-emerald-300">
              <FlaskConical className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-black font-display text-slate-800">
                Lab Sains Cilik
              </h3>
              <p className="text-xs font-semibold text-emerald-700">
                Eksperimen 12 Tabung Kimia Vektor Murni & Simulasi Siklus Hidrologi
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 btn-chunky"
            title="Tutup Lab Sains"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 mb-5">
          <button
            onClick={() => {
              setActiveTab("colors");
              sound.playChime();
            }}
            className={`flex-1 py-2 sm:py-2.5 px-3 rounded-2xl font-black text-xs sm:text-sm border-2 btn-chunky flex items-center justify-center gap-2 ${
              activeTab === "colors"
                ? "bg-emerald-500 text-white border-emerald-600 shadow-[0_3px_0_0_#065f46]"
                : "bg-slate-100 text-slate-700 border-slate-200 hover:bg-emerald-50"
            }`}
          >
            <FlaskConical className="w-4 h-4" />
            <span>Eksperimen 1: Rak 12 Tabung Kimia & Resep Warna</span>
          </button>

          <button
            onClick={() => {
              setActiveTab("waterCycle");
              sound.playChime();
            }}
            className={`flex-1 py-2 sm:py-2.5 px-3 rounded-2xl font-black text-xs sm:text-sm border-2 btn-chunky flex items-center justify-center gap-2 ${
              activeTab === "waterCycle"
                ? "bg-sky-500 text-white border-sky-600 shadow-[0_3px_0_0_#0369a1]"
                : "bg-slate-100 text-slate-700 border-slate-200 hover:bg-sky-50"
            }`}
          >
            <CloudRain className="w-4 h-4" />
            <span>Eksperimen 2: Siklus Hidrologi & Hujan Ajaib</span>
          </button>
        </div>

        {/* ========================================================================= */}
        {/* TAB 1: 12-TUBE CHEMISTRY LAB & ERLENMEYER FLASK                           */}
        {/* ========================================================================= */}
        {activeTab === "colors" && (
          <div>
            {/* Quest Toggle Bar */}
            <div className="flex flex-wrap items-center justify-between gap-2.5 mb-4">
              <button
                onClick={() => {
                  const nextVal = !isQuestMode;
                  setIsQuestMode(nextVal);
                  handleResetLab();
                  sound.playChime();
                  if (nextVal && audioEnabled) {
                    sound.speak(`Mode Misi Resep Aktif! ${activeQuest.prompt}`);
                  }
                }}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl font-black text-xs sm:text-sm border-2 btn-chunky transition-all ${
                  isQuestMode
                    ? "bg-amber-400 text-amber-950 border-amber-500 shadow-[0_3px_0_0_#b45309]"
                    : "bg-white text-slate-700 border-slate-300 hover:bg-amber-50 shadow-sm"
                }`}
              >
                <Target className="w-4 h-4 text-amber-800" />
                <span>{isQuestMode ? "Mode Misi Resep: AKTIF" : "Aktifkan Misi Resep Warna Akbar"}</span>
              </button>

              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Sistem Zero-Fail: Bebas campur 2 tabung apa saja</span>
              </div>
            </div>

            {/* Quest Banner (Pure SVG Icon, No Emojis) */}
            {isQuestMode && (
              <div className="bg-gradient-to-r from-amber-50 via-rose-50 to-purple-50 rounded-2xl p-4 border-2 border-amber-300 mb-5 relative shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    {/* Pure SVG Quest Illustration */}
                    <div className="w-12 h-12 rounded-2xl bg-white border-2 border-amber-300 shadow-sm flex items-center justify-center flex-shrink-0">
                      {activeQuest.illustration}
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[11px] font-black uppercase tracking-wider text-amber-900 bg-amber-200 px-2.5 py-0.5 rounded-full border border-amber-400">
                          Tantangan Tobi ({currentQuestIdx + 1}/{COLOR_QUESTS.length})
                        </span>
                        <span className="text-[11px] font-bold text-purple-700 bg-purple-100 px-2 py-0.5 rounded-full border border-purple-300 flex items-center gap-1">
                          <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                          +40 Bintang
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm font-black text-slate-800 leading-snug">
                        "{activeQuest.prompt}"
                      </p>
                      <p className="text-[11px] font-semibold text-slate-600 mt-0.5">
                        Petunjuk: {activeQuest.hint}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center flex-shrink-0">
                    <button
                      onClick={() => {
                        sound.playChime();
                        if (audioEnabled) sound.speak(activeQuest.prompt);
                      }}
                      className="p-2 rounded-xl bg-white hover:bg-amber-100 text-amber-900 border border-amber-300 shadow-sm"
                      title="Dengarkan soal misi"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={handleNextQuest}
                      className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold border border-slate-300 btn-chunky"
                    >
                      Ganti Misi
                    </button>
                  </div>
                </div>

                {questSuccess && (
                  <div className="mt-3 p-2.5 rounded-xl bg-emerald-100 border border-emerald-400 text-emerald-950 font-black text-xs flex items-center justify-between gap-2 animate-bounce">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Berhasil! Resep {activeQuest.targetName} Tercipta! (+40 Bintang)</span>
                    </div>
                    <button
                      onClick={handleNextQuest}
                      className="px-3 py-1 rounded-lg bg-emerald-600 text-white font-bold text-xs btn-chunky"
                    >
                      Misi Selanjutnya
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Instruction banner if not in quest mode */}
            {!isQuestMode && (
              <div className="bg-emerald-50/70 rounded-2xl p-3 border border-emerald-200 mb-4 flex items-center justify-between gap-2">
                <p className="text-xs sm:text-sm font-bold text-emerald-900">
                  Instruksi Laboratorium: Pilih 2 tabung dari rak kayu di bawah untuk dituangkan ke labu Erlenmeyer di tengah!
                </p>
                <div className="text-xs font-black text-emerald-700 bg-white px-2.5 py-1 rounded-xl border border-emerald-300 flex-shrink-0">
                  {selectedTube1 && selectedTube2 ? "2/2 Tabung Siap" : selectedTube1 ? "1/2 Tabung Dipilih" : "0/2 Tabung"}
                </div>
              </div>
            )}

            {/* CENTER ERLENMEYER MIXING FLASK (PURE SVG) */}
            <div className="bg-slate-900 rounded-3xl p-5 mb-5 border-4 border-slate-800 shadow-inner flex flex-col items-center justify-center text-center relative overflow-hidden">
              {/* Subtle laboratory grid background */}
              <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" />

              <span className="text-xs font-black uppercase tracking-wider text-emerald-400 mb-2 relative z-10">
                Labu Erlenmeyer Pencampuran Kimia
              </span>

              {/* Erlenmeyer Flask SVG Graphic */}
              <div className="relative w-36 h-44 flex items-center justify-center my-1 z-10">
                <svg viewBox="0 0 120 150" className="w-full h-full filter drop-shadow-[0_10px_15px_rgba(0,0,0,0.5)]">
                  <defs>
                    <linearGradient id="glassShine" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
                      <stop offset="30%" stopColor="#ffffff" stopOpacity="0.1" />
                      <stop offset="85%" stopColor="#ffffff" stopOpacity="0.0" />
                      <stop offset="100%" stopColor="#ffffff" stopOpacity="0.3" />
                    </linearGradient>

                    <linearGradient id="liquidGrad" x1="0" y1="1" x2="0" y2="0">
                      <stop offset="0%" stopColor={mixedResult ? mixedResult.hex : "#38bdf8"} stopOpacity="0.9" />
                      <stop offset="100%" stopColor={mixedResult ? mixedResult.hex : "#67e8f9"} stopOpacity="0.75" />
                    </linearGradient>

                    {/* Clip path matching the Erlenmeyer interior */}
                    <clipPath id="flaskInterior">
                      <polygon points="46,45 74,45 106,134 14,134" />
                    </clipPath>
                  </defs>

                  {/* Liquid inside (Conical Fill) */}
                  {(mixedResult || isPouring || selectedTube1) && (
                    <g clipPath="url(#flaskInterior)">
                      <rect
                        x="0"
                        y={mixedResult ? "65" : isPouring ? "85" : "110"}
                        width="120"
                        height="85"
                        fill={mixedResult ? mixedResult.hex : "#0284c7"}
                        className="transition-all duration-700"
                      />
                      {/* Swirling wave surface */}
                      <path
                        d={`M 10,${mixedResult ? "65" : "110"} Q 35,${mixedResult ? "61" : "106"} 60,${mixedResult ? "65" : "110"} T 110,${mixedResult ? "65" : "110"} L 110,140 L 10,140 Z`}
                        fill={mixedResult ? mixedResult.hex : "#0369a1"}
                        opacity="0.8"
                      />
                      {/* Rising Bubbles */}
                      {mixedResult && (
                        <>
                          <circle cx="45" cy="115" r="3" fill="#ffffff" opacity="0.6" className="animate-bounce" />
                          <circle cx="65" cy="95" r="4" fill="#ffffff" opacity="0.5" className="animate-pulse" />
                          <circle cx="78" cy="120" r="2.5" fill="#ffffff" opacity="0.7" className="animate-bounce" />
                          <circle cx="55" cy="80" r="3.5" fill="#ffffff" opacity="0.8" className="animate-pulse" />
                        </>
                      )}
                    </g>
                  )}

                  {/* Flask Glass Outline */}
                  <polygon
                    points="46,45 74,45 106,134 14,134"
                    fill="url(#glassShine)"
                    stroke="#94a3b8"
                    strokeWidth="4"
                    strokeLinejoin="round"
                  />
                  {/* Flask Rounded Base */}
                  <path d="M 14,134 Q 60,142 106,134" stroke="#94a3b8" strokeWidth="4" fill="none" strokeLinecap="round" />

                  {/* Cylindrical Flask Neck */}
                  <rect x="46" y="15" width="28" height="30" fill="url(#glassShine)" stroke="#94a3b8" strokeWidth="3" />
                  {/* Flask Lip / Flange */}
                  <ellipse cx="60" cy="15" rx="16" ry="4" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="3" />

                  {/* Measurement Lines (Ticks) on side */}
                  <line x1="38" y1="120" x2="52" y2="120" stroke="#ffffff" strokeWidth="2" opacity="0.6" />
                  <text x="56" y="123" fill="#ffffff" fontSize="7" opacity="0.8" fontWeight="bold">50ml</text>

                  <line x1="44" y1="100" x2="56" y2="100" stroke="#ffffff" strokeWidth="2" opacity="0.6" />
                  <text x="60" y="103" fill="#ffffff" fontSize="7" opacity="0.8" fontWeight="bold">100ml</text>

                  <line x1="50" y1="80" x2="60" y2="80" stroke="#ffffff" strokeWidth="2" opacity="0.6" />
                  <text x="64" y="83" fill="#ffffff" fontSize="7" opacity="0.8" fontWeight="bold">150ml</text>

                  {/* Glass curved reflection streak */}
                  <path d="M 28,125 L 49,60" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" opacity="0.4" />
                </svg>

                {/* Pouring stream animation */}
                {isPouring && (
                  <div className="absolute top-2 w-2 h-20 bg-cyan-300 rounded-full animate-pulse shadow-[0_0_10px_#38bdf8]" />
                )}
              </div>

              {/* Status & Result Description */}
              {mixedResult ? (
                <div className="mt-2 max-w-lg z-10">
                  <h4 className="text-lg sm:text-xl font-black font-display text-white">
                    Hasil: {mixedResult.name}
                  </h4>
                  <p className="text-xs sm:text-sm font-semibold text-slate-300 mt-1 leading-relaxed">
                    {mixedResult.desc}
                  </p>

                  <div className="mt-3 flex flex-wrap items-center justify-center gap-3">
                    <button
                      onClick={handleResetLab}
                      className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-700 hover:bg-slate-600 text-white font-bold text-xs btn-chunky border border-slate-600"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Bersihkan Labu Ukur</span>
                    </button>
                    <span className="text-xs font-bold text-amber-400 flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      +{isQuestMode && questSuccess ? "40" : "30"} Bintang diperoleh!
                    </span>
                  </div>
                </div>
              ) : (
                <div className="text-slate-400 text-xs mt-1 z-10">
                  {selectedTube1 ? (
                    <span className="text-emerald-300 font-bold">
                      Tabung ke-1 siap dituangkan. Pilih tabung kedua di rak!
                    </span>
                  ) : (
                    <span>Labu masih kosong. Klik salah satu tabung di bawah untuk menuangkan cairan!</span>
                  )}
                </div>
              )}
            </div>

            {/* ========================================================================= */}
            {/* THE WOODEN LABORATORY RACK WITH 12 SVG TEST TUBES                         */}
            {/* ========================================================================= */}
            <div className="bg-gradient-to-b from-amber-900 via-amber-800 to-amber-950 p-4 sm:p-5 rounded-3xl border-4 border-amber-950 shadow-xl">
              <div className="flex items-center justify-between mb-3 border-b border-amber-700/60 pb-2">
                <span className="text-xs sm:text-sm font-black font-display text-amber-200 uppercase tracking-wider flex items-center gap-2">
                  <FlaskConical className="w-4 h-4 text-amber-300" />
                  Rak Laboratorium Kimia (12 Tabung Vektor Murni)
                </span>
                <span className="text-[11px] font-bold text-amber-300 hidden sm:inline">
                  Sentuh tabung untuk menuangkan cairan
                </span>
              </div>

              {/* 12 Tubes Grid (Desktop: 6 Top, 6 Bottom in 2 shelves. Mobile: scrollable / responsive) */}
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2.5 sm:gap-3.5">
                {LAB_TUBES.map((tube, index) => {
                  const isSelected = selectedTube1 === tube.id || selectedTube2 === tube.id;

                  return (
                    <div
                      key={tube.id}
                      onClick={() => handleSelectTube(tube)}
                      className={`group relative flex flex-col items-center p-2 rounded-2xl cursor-pointer transition-all duration-200 select-none ${
                        isSelected
                          ? "bg-amber-100/30 ring-4 ring-yellow-400 -translate-y-2 shadow-lg"
                          : "hover:bg-amber-700/40 hover:-translate-y-1"
                      }`}
                      title={`${tube.name}: ${tube.desc}`}
                    >
                      {/* PURE SVG TEST TUBE */}
                      <div className="w-14 h-28 sm:w-16 sm:h-32 relative flex items-center justify-center">
                        <svg viewBox="0 0 50 110" className="w-full h-full filter drop-shadow-md">
                          <defs>
                            <linearGradient id={`grad-${tube.id}`} x1="0" y1="0" x2="1" y2="0">
                              <stop offset="0%" stopColor={tube.gradientFrom} />
                              <stop offset="100%" stopColor={tube.gradientTo} />
                            </linearGradient>

                            <linearGradient id="glassSpecular" x1="0" y1="0" x2="1" y2="0">
                              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
                              <stop offset="40%" stopColor="#ffffff" stopOpacity="0.1" />
                              <stop offset="100%" stopColor="#ffffff" stopOpacity="0.3" />
                            </linearGradient>

                            <clipPath id={`clip-${tube.id}`}>
                              {/* Interior tube path */}
                              <rect x="12" y="15" width="26" height="75" rx="0" />
                              <path d="M 12,90 C 12,104 38,104 38,90 Z" />
                            </clipPath>
                          </defs>

                          {/* Top Lip / Rim of Tube */}
                          <ellipse cx="25" cy="8" rx="16" ry="4" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="2" />
                          <ellipse cx="25" cy="8" rx="13" ry="2.5" fill="#64748b" opacity="0.3" />

                          {/* Liquid Cylinder (Inside) */}
                          <g clipPath={`url(#clip-${tube.id})`}>
                            {/* Fluid Body */}
                            <rect
                              x="12"
                              y="30"
                              width="26"
                              height="65"
                              fill={`url(#grad-${tube.id})`}
                            />
                            {/* Bottom Hemispherical Dome filled */}
                            <path
                              d="M 12,90 C 12,105 38,105 38,90 Z"
                              fill={`url(#grad-${tube.id})`}
                            />
                            {/* Fluid Meniscus Curve */}
                            <ellipse
                              cx="25"
                              cy="30"
                              rx="13"
                              ry="3"
                              fill={tube.gradientFrom}
                              opacity="0.9"
                            />

                            {/* Internal Bubbles */}
                            <circle cx="21" cy="78" r="2" fill="#ffffff" opacity="0.6" />
                            <circle cx="29" cy="55" r="2.5" fill="#ffffff" opacity="0.5" />
                            <circle cx="24" cy="40" r="1.5" fill="#ffffff" opacity="0.7" />
                          </g>

                          {/* Outer Glass Body (Cylinder + Rounded Bottom) */}
                          <path
                            d="M 12,10 L 12,90 C 12,107 38,107 38,90 L 38,10"
                            fill="url(#glassSpecular)"
                            stroke="#94a3b8"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                          />

                          {/* Glass Highlight Shine Line */}
                          <line x1="16" y1="18" x2="16" y2="85" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" opacity="0.5" />

                          {/* Graduation Marks (Ticks) */}
                          <line x1="30" y1="45" x2="36" y2="45" stroke="#ffffff" strokeWidth="1.5" opacity="0.7" />
                          <line x1="32" y1="58" x2="36" y2="58" stroke="#ffffff" strokeWidth="1.5" opacity="0.7" />
                          <line x1="30" y1="70" x2="36" y2="70" stroke="#ffffff" strokeWidth="1.5" opacity="0.7" />
                        </svg>

                        {/* Selected Indicator Number */}
                        {isSelected && (
                          <div className="absolute -top-2 bg-yellow-400 text-amber-950 font-black text-[11px] rounded-full w-5 h-5 flex items-center justify-center border border-amber-600 shadow-md animate-bounce">
                            {selectedTube1 === tube.id ? "1" : "2"}
                          </div>
                        )}
                      </div>

                      {/* Wooden Rack Hole Notch Below */}
                      <div className="w-12 h-2.5 bg-amber-950 rounded-full border border-amber-900 shadow-inner my-1" />

                      {/* Tube Label */}
                      <span className="font-extrabold text-[11px] text-amber-100 font-display text-center truncate max-w-full leading-tight mt-0.5">
                        {tube.name}
                      </span>
                      <span className="text-[9px] font-bold text-amber-300">
                        {tube.category}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Wooden Shelf Edge Base */}
              <div className="mt-3 h-3 bg-amber-950/80 rounded-xl border-t border-amber-600/40" />
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: WATER CYCLE SIMULATION (PURE SVG, ZERO EMOJIS)                     */}
        {/* ========================================================================= */}
        {activeTab === "waterCycle" && (
          <div>
            <div className="bg-sky-50/70 rounded-2xl p-4 border border-sky-200 mb-5">
              <p className="text-xs sm:text-sm font-bold text-sky-900">
                Instruksi Siklus Air: Tekan tahapan 1, 2, atau 3 untuk melihat perjalanan ilmiah perputaran air di bumi!
              </p>
            </div>

            {/* Stages Selector Buttons */}
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
                <span className="text-[10px] text-slate-500">Penguapan Air Laut</span>
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
                <span className="text-[10px] text-slate-500">Pembentukan Awan</span>
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
                <span className="text-[10px] text-slate-500">Turun Hujan</span>
              </button>
            </div>

            {/* High-Resolution 2D Educational Illustration Container */}
            <div className="relative rounded-3xl overflow-hidden border-4 border-sky-300 shadow-md aspect-[4/3] sm:aspect-[16/9] bg-sky-950 flex items-center justify-center transition-all duration-300">
              <img
                key={waterStep}
                src={
                  waterStep === 1
                    ? "/images/evaporasi.jpg"
                    : waterStep === 2
                    ? "/images/kondensasi.jpg"
                    : "/images/presipitasi.jpg"
                }
                alt={
                  waterStep === 1
                    ? "Tahap Evaporasi Air Laut"
                    : waterStep === 2
                    ? "Tahap Kondensasi Pembentukan Awan"
                    : "Tahap Presipitasi Turunnya Hujan"
                }
                className="w-full h-full object-cover object-center transition-all duration-500"
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

            {/* Explanation footer */}
            <div className="mt-4 p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between gap-2">
              <p className="text-xs sm:text-sm font-bold text-slate-800">
                {waterStep === 1 && "Tahap Evaporasi: Panas matahari menguapkan air laut menjadi uap air tak kasat mata."}
                {waterStep === 2 && "Tahap Kondensasi: Uap air mendingin dan berkumpul menjadi awan tebal di atmosfer."}
                {waterStep === 3 && "Tahap Presipitasi: Butiran air jatuh sebagai hujan menyegarkan bumi dan kembali ke laut."}
              </p>
              <button
                onClick={() => handleWaterStep(waterStep === 3 ? 1 : ((waterStep + 1) as 1 | 2 | 3))}
                className="px-3 py-1.5 rounded-xl bg-sky-500 text-white font-black text-xs border border-sky-600 btn-chunky flex-shrink-0"
              >
                Tahap Berikutnya
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
