"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
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
  CheckCircle2,
  Sprout,
  ArrowRight,
  ArrowLeft,
  Shuffle,
  Zap,
  Power,
  Lightbulb,
  Info,
  Magnet,
  Check,
  AlertTriangle,
  Fish
} from "lucide-react";
import { sound } from "@/lib/sound";

interface ScienceLabModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEarnStars: (amount: number) => void;
  audioEnabled: boolean;
  liteMode: boolean;
  isFullPage?: boolean;
  stars?: number;
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

/* =========================================================================
   100% PURE SVG ILUSTRASI MAKHLUK HIDUP RANTAI MAKANAN (NO EMOJI)
   ========================================================================= */

// 1. Padi (Produsen Sawah)
const RicePlantSvg = () => (
  <svg viewBox="0 0 48 48" className="w-10 h-10 sm:w-12 sm:h-12" fill="none">
    <path d="M24 44 V20" stroke="#15803d" strokeWidth="3" strokeLinecap="round" />
    <path d="M24 32 C18 30 14 24 16 16 C22 18 24 26 24 32 Z" fill="#84cc16" stroke="#4d7c0f" strokeWidth="1.5" />
    <path d="M24 28 C30 26 34 20 32 12 C26 14 24 22 24 28 Z" fill="#eab308" stroke="#a16207" strokeWidth="1.5" />
    <path d="M24 20 C20 16 22 8 26 6 C28 12 26 18 24 20 Z" fill="#facc15" stroke="#ca8a04" strokeWidth="1.5" />
    <circle cx="20" cy="18" r="1.5" fill="#fef08a" />
    <circle cx="28" cy="14" r="1.5" fill="#fef08a" />
  </svg>
);

// 2. Belalang (Konsumen 1 Sawah - Herbivora)
const GrasshopperSvg = () => (
  <svg viewBox="0 0 48 48" className="w-10 h-10 sm:w-12 sm:h-12" fill="none">
    <ellipse cx="24" cy="24" rx="14" ry="7" fill="#84cc16" stroke="#4d7c0f" strokeWidth="2" transform="rotate(-15 24 24)" />
    <circle cx="12" cy="20" r="6" fill="#65a30d" stroke="#3f6212" strokeWidth="2" />
    <circle cx="10" cy="19" r="2" fill="white" />
    <circle cx="10" cy="19" r="1" fill="#1e293b" />
    <path d="M10 14 Q8 8 4 6" stroke="#4d7c0f" strokeWidth="2" strokeLinecap="round" />
    <path d="M12 14 Q14 8 18 6" stroke="#4d7c0f" strokeWidth="2" strokeLinecap="round" />
    <path d="M30 22 L38 14 L36 32" stroke="#4d7c0f" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M16 26 L14 34" stroke="#4d7c0f" strokeWidth="2" strokeLinecap="round" />
    <path d="M22 27 L22 35" stroke="#4d7c0f" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// 3. Katak (Konsumen 2 Sawah - Karnivora)
const FrogSvg = () => (
  <svg viewBox="0 0 48 48" className="w-10 h-10 sm:w-12 sm:h-12" fill="none">
    <ellipse cx="24" cy="28" rx="14" ry="12" fill="#22c55e" stroke="#15803d" strokeWidth="2" />
    <ellipse cx="24" cy="30" rx="9" ry="7" fill="#bbf7d0" />
    <circle cx="16" cy="16" r="6" fill="#22c55e" stroke="#15803d" strokeWidth="2" />
    <circle cx="32" cy="16" r="6" fill="#22c55e" stroke="#15803d" strokeWidth="2" />
    <circle cx="16" cy="16" r="3.5" fill="white" />
    <circle cx="32" cy="16" r="3.5" fill="white" />
    <circle cx="16" cy="16" r="2" fill="#0f172a" />
    <circle cx="32" cy="16" r="2" fill="#0f172a" />
    <path d="M19 26 Q24 30 29 26" stroke="#15803d" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="15" cy="25" r="2" fill="#f43f5e" opacity="0.6" />
    <circle cx="33" cy="25" r="2" fill="#f43f5e" opacity="0.6" />
  </svg>
);

// 4. Ular Sawah (Konsumen 3 Sawah - Predator)
const SnakeSvg = () => (
  <svg viewBox="0 0 48 48" className="w-10 h-10 sm:w-12 sm:h-12" fill="none">
    <path
      d="M10 32 C12 22 24 22 24 30 C24 36 34 36 38 28 C40 24 38 18 32 16"
      stroke="#eab308"
      strokeWidth="8"
      strokeLinecap="round"
    />
    <path
      d="M10 32 C12 22 24 22 24 30 C24 36 34 36 38 28 C40 24 38 18 32 16"
      stroke="#ca8a04"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <circle cx="30" cy="16" r="7" fill="#ca8a04" />
    <circle cx="28" cy="14" r="2.5" fill="white" />
    <circle cx="28" cy="14" r="1.5" fill="#0f172a" />
    <path d="M36 16 L42 16 M42 16 L44 14 M42 16 L44 18" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="16" cy="24" r="2" fill="#854d0e" />
    <circle cx="26" cy="32" r="2" fill="#854d0e" />
    <circle cx="36" cy="30" r="2" fill="#854d0e" />
  </svg>
);

// 5. Burung Elang (Konsumen Puncak Sawah)
const EagleSvg = () => (
  <svg viewBox="0 0 48 48" className="w-10 h-10 sm:w-12 sm:h-12" fill="none">
    <path d="M6 24 Q18 10 24 20 Q30 10 42 24 Q30 22 24 32 Q18 22 6 24 Z" fill="#78350f" stroke="#451a03" strokeWidth="2" />
    <ellipse cx="24" cy="26" rx="6" ry="10" fill="#92400e" stroke="#451a03" strokeWidth="1.5" />
    <circle cx="24" cy="14" r="5" fill="#f8fafc" stroke="#451a03" strokeWidth="1.5" />
    <path d="M26 14 Q32 16 30 19 L26 17 Z" fill="#facc15" stroke="#a16207" strokeWidth="1" />
    <circle cx="24" cy="13" r="1.5" fill="#0f172a" />
    <path d="M21 34 L24 40 L27 34 Z" fill="#f8fafc" stroke="#451a03" strokeWidth="1" />
  </svg>
);

// 6. Fitoplankton (Produsen Laut)
const PhytoplanktonSvg = () => (
  <svg viewBox="0 0 48 48" className="w-10 h-10 sm:w-12 sm:h-12" fill="none">
    <circle cx="24" cy="24" r="12" fill="#dcfce7" opacity="0.6" />
    <circle cx="24" cy="24" r="8" fill="#22c55e" stroke="#15803d" strokeWidth="2" />
    <path d="M24 8 V14 M24 34 V40 M8 24 H14 M34 24 H40 M13 13 L17 17 M31 31 L35 35 M35 13 L31 17 M17 31 L13 35" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" />
    <circle cx="22" cy="22" r="2" fill="#86efac" />
    <circle cx="26" cy="25" r="1.5" fill="#86efac" />
  </svg>
);

// 7. Udang Kecil (Konsumen 1 Laut - Herbivora)
const ShrimpSvg = () => (
  <svg viewBox="0 0 48 48" className="w-10 h-10 sm:w-12 sm:h-12" fill="none">
    <path
      d="M14 18 C16 10 28 8 32 14 C36 20 34 28 26 32 C20 34 16 38 14 42"
      stroke="#fb923c"
      strokeWidth="6"
      strokeLinecap="round"
    />
    <path d="M22 10 L20 18 M28 12 L25 21 M31 18 L27 26 M30 25 L24 31" stroke="#ea580c" strokeWidth="2" strokeLinecap="round" />
    <circle cx="14" cy="18" r="5" fill="#f97316" />
    <circle cx="12" cy="17" r="1.5" fill="#0f172a" />
    <path d="M12 15 Q6 8 4 6 M14 14 Q12 6 16 4" stroke="#c2410c" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M14 42 L8 44 M14 42 L12 46" stroke="#ea580c" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// 8. Ikan Tuna (Konsumen 2 Laut - Karnivora)
const TunaFishSvg = () => (
  <svg viewBox="0 0 48 48" className="w-10 h-10 sm:w-12 sm:h-12" fill="none">
    <ellipse cx="22" cy="24" rx="14" ry="8" fill="#38bdf8" stroke="#0284c7" strokeWidth="2" />
    <ellipse cx="20" cy="26" rx="10" ry="4" fill="#e0f2fe" />
    <path d="M34 24 L42 16 L39 24 L42 32 Z" fill="#0284c7" stroke="#0369a1" strokeWidth="1.5" />
    <path d="M20 16 L24 10 L27 16 Z" fill="#0284c7" />
    <path d="M22 32 L25 36 L28 32 Z" fill="#0284c7" />
    <circle cx="14" cy="22" r="2.5" fill="white" />
    <circle cx="14" cy="22" r="1.5" fill="#0f172a" />
    <path d="M18 20 C20 22 20 26 18 28" stroke="#0284c7" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

// 9. Ikan Hiu (Konsumen Puncak Laut)
const SharkSvg = () => (
  <svg viewBox="0 0 48 48" className="w-10 h-10 sm:w-12 sm:h-12" fill="none">
    <path
      d="M6 24 C10 18 22 18 34 22 L42 14 L39 24 L42 34 L34 26 C22 28 10 28 6 24 Z"
      fill="#64748b"
      stroke="#334155"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <path d="M12 25 C20 27 30 26 34 26 L30 28 C20 29 14 27 12 25 Z" fill="#f1f5f9" />
    <path d="M20 19 L25 8 L28 19 Z" fill="#475569" stroke="#334155" strokeWidth="1.5" />
    <path d="M18 26 L14 34 L22 28 Z" fill="#475569" />
    <circle cx="12" cy="22" r="1.5" fill="#0f172a" />
    <line x1="16" y1="22" x2="16" y2="25" stroke="#334155" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="19" y1="22" x2="19" y2="25" stroke="#334155" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

// 10. Pengurai Laut (Dekomposer & Detritivor Samudra)
const DecomposerSeaSvg = () => (
  <svg viewBox="0 0 48 48" className="w-10 h-10 sm:w-12 sm:h-12" fill="none">
    {/* Dasar laut pasir */}
    <path d="M4 42 C14 38 34 38 44 42" stroke="#d97706" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M8 40 Q14 34 20 40 Q28 32 36 40" fill="#fde68a" opacity="0.4" />
    {/* Koloni mikroba & dekomposer laut */}
    <circle cx="16" cy="30" r="7" fill="#10b981" stroke="#047857" strokeWidth="1.5" />
    <circle cx="32" cy="28" r="8" fill="#14b8a6" stroke="#0f766e" strokeWidth="1.5" />
    <circle cx="24" cy="20" r="6" fill="#06b6d4" stroke="#0e7490" strokeWidth="1.5" />
    {/* Partikel nutrisi yang terdaur ulang */}
    <circle cx="14" cy="18" r="1.5" fill="#facc15" />
    <circle cx="34" cy="16" r="2" fill="#facc15" />
    <circle cx="24" cy="10" r="1.5" fill="#facc15" />
    <path d="M16 28 Q18 24 16 22 M32 26 Q30 22 32 20" stroke="white" strokeWidth="1" strokeLinecap="round" opacity="0.8" />
    <circle cx="16" cy="30" r="1.5" fill="white" />
    <circle cx="32" cy="28" r="2" fill="white" />
    <circle cx="24" cy="20" r="1.5" fill="white" />
  </svg>
);

/* =========================================================================
   DATA EKOSISTEM DAN RANTAI MAKANAN
   ========================================================================= */

export interface OrganismItem {
  id: string;
  name: string;
  mysteryHint: string;
  role: string;
  roleType: "producer" | "herbivore" | "carnivore" | "apex" | "decomposer";
  desc: string;
  actionWord: string;
  badgeBg: string;
  borderColor: string;
  bgColor: string;
  SvgComponent: React.ComponentType;
}

export interface Ecosystem {
  id: "sawah" | "laut";
  name: string;
  desc: string;
  bgGradient: string;
  borderTheme: string;
  chain: OrganismItem[];
  successSpeech: string;
}

export type CrisisScenarioId = "ular_hilang" | "kemarau_padi" | "limbah_plastik" | "overfishing_laut";

export interface CrisisScenarioData {
  id: CrisisScenarioId;
  ecosystemId: "sawah" | "laut";
  title: string;
  tabLabel: string;
  badge: string;
  affectedSlotIndex: number;
  effectType: "extinct" | "drought" | "pollution" | "overfishing";
  impactBadges: { slotIdx: number; text: string; color: string }[];
  causeText: string;
  consequenceText: string;
  socraticSpeech: string;
  actionButtonText: string;
  successSpeech: string;
  recoverySummary: string;
}

export const CRISIS_SCENARIOS: CrisisScenarioData[] = [
  {
    id: "ular_hilang",
    ecosystemId: "sawah",
    title: "Perburuan Liar Predator (Ular Sawah Hilang)",
    tabLabel: "Ular Sawah Hilang",
    badge: "Krisis Rantai Predator",
    affectedSlotIndex: 3,
    effectType: "extinct",
    impactBadges: [
      { slotIdx: 1, text: "Hama Belalang Meledak!", color: "bg-rose-500 text-white" },
      { slotIdx: 2, text: "Populasi Katak Tak Terkendali!", color: "bg-amber-500 text-slate-950" },
      { slotIdx: 3, text: "Ular Punah Diburu!", color: "bg-red-600 text-white animate-pulse" },
      { slotIdx: 0, text: "Padi Habis Dimakan Hama!", color: "bg-rose-700 text-white" },
    ],
    causeText: "Ular sawah ditangkapi secara berlebihan hingga punah dari area persawahan.",
    consequenceText: "Tanpa ular predator, katak dan tikus berkembang biak liar. Hama serangga meledak tak terkendali dan melahap seluruh rumpun padi petani hingga gagal panen total!",
    socraticSpeech: "Gawat sekali! Saat predator ular diburu habis, rantai makanan terputus. Hama padi meledak dan petani terancam gagal panen. Ayo pulihkan keseimbangan ekosistem!",
    actionButtonText: "Pulihkan Keseimbangan & Lindungi Ular",
    successSpeech: "Luar biasa! Perlindungan ular sawah berhasil. Populasi katak terkontrol, padi selamat, dan ekosistem sawah kembali harmonis!",
    recoverySummary: "Perburuan liar dihentikan. Ular sawah kembali mengontrol rantai makanan sehingga tanaman padi selamat dari serangan hama masif.",
  },
  {
    id: "kemarau_padi",
    ecosystemId: "sawah",
    title: "Musim Kemarau Ekstrem (Padi Kering & Layu)",
    tabLabel: "Kemarau Padi Kering",
    badge: "Krisis Pondasi Produsen",
    affectedSlotIndex: 0,
    effectType: "drought",
    impactBadges: [
      { slotIdx: 0, text: "Padi Layu & Kering!", color: "bg-amber-600 text-white animate-pulse" },
      { slotIdx: 1, text: "Belalang Kelaparan!", color: "bg-rose-600 text-white" },
      { slotIdx: 2, text: "Katak Kehabisan Makanan!", color: "bg-rose-600 text-white" },
      { slotIdx: 4, text: "Elang Terancam Kelaparan!", color: "bg-rose-700 text-white" },
    ],
    causeText: "Kemarau panjang tanpa hujan membuat sawah retak dan tanaman padi layu mengering.",
    consequenceText: "Pondasi energi terputus! Belalang pemakan daun mati kelaparan, disusul katak, ular, dan elang yang kehabisan mangsa di seluruh tingkatan rantai.",
    socraticSpeech: "Perhatikan akibatnya! Padi adalah produsen penghasil energi pertama. Jika tumbuhan mati, seluruh hewan di atasnya ikut kelaparan. Ayo alirkan air irigasi!",
    actionButtonText: "Irigasi Sawah & Turunkan Hujan",
    successSpeech: "Segar sekali! Air irigasi membasahi sawah. Tanaman padi kembali hijau royo-royo dan kehidupan hewan sawah terselamatkan!",
    recoverySummary: "Irigasi darurat berhasil menyegarkan kembali tanaman padi. Seluruh rantai makanan sawah memperoleh pasokan energi kehidupan.",
  },
  {
    id: "limbah_plastik",
    ecosystemId: "laut",
    title: "Pencemaran Limbah Plastik & Racun Kimia",
    tabLabel: "Limbah Sampah Plastik",
    badge: "Krisis Pencemaran Samudra",
    affectedSlotIndex: 0,
    effectType: "pollution",
    impactBadges: [
      { slotIdx: 0, text: "Fitoplankton Tertutup Plastik!", color: "bg-rose-600 text-white animate-pulse" },
      { slotIdx: 1, text: "Udang Makan Mikroplastik!", color: "bg-amber-600 text-white" },
      { slotIdx: 2, text: "Ikan Tuna Teracuni!", color: "bg-rose-600 text-white" },
      { slotIdx: 3, text: "Hiu Terancam Racun!", color: "bg-rose-700 text-white" },
    ],
    causeText: "Sampah plastik dan limbah kimia tumpah mencemari permukaan laut nusantara.",
    consequenceText: "Sinar matahari terhalang dan fitoplankton mati teracuni. Mikroplastik termakan udang, racun menumpuk ke ikan tuna dan hiu, hingga membahayakan manusia yang memakannya!",
    socraticSpeech: "Bahaya limbah plastik di samudra! Racun mikroplastik masuk ke rantai makanan hingga ke ikan yang kita makan. Ayo bersihkan laut dari sampah plastik!",
    actionButtonText: "Bersihkan Laut dari Sampah Plastik",
    successSpeech: "Luar biasa! Laut kembali bersih dari limbah plastik. Cahaya matahari menembus samudra dan kehidupan laut kembali sehat!",
    recoverySummary: "Operasi pembersihan sampah laut berhasil. Fitoplankton kembali berfotosintesis dan siklus energi samudra pulih bebas dari racun mikroplastik.",
  },
  {
    id: "overfishing_laut",
    ecosystemId: "laut",
    title: "Penangkapan Berlebih (Overfishing Tuna Lenyap)",
    tabLabel: "Overfishing Pukat Harimau",
    badge: "Krisis Eksploitasi Perairan",
    affectedSlotIndex: 2,
    effectType: "overfishing",
    impactBadges: [
      { slotIdx: 2, text: "Tuna Habis Terjaring!", color: "bg-red-600 text-white animate-pulse" },
      { slotIdx: 3, text: "Hiu Kelaparan Tanpa Mangsa!", color: "bg-rose-600 text-white" },
      { slotIdx: 1, text: "Ledakan Kawanan Udang!", color: "bg-amber-500 text-slate-950" },
      { slotIdx: 4, text: "Dekomposer Krisis Nutrisi!", color: "bg-rose-700 text-white" },
    ],
    causeText: "Pukat harimau ilegal menangkap kawanan ikan tuna secara berlebihan tanpa batas kuota.",
    consequenceText: "Populasi tuna hancur! Ikan hiu sebagai predator puncak kelaparan, sementara udang kecil meledak tanpa pemangsa alami hingga ekosistem karang rusak berat.",
    socraticSpeech: "Ini akibat penangkapan ikan berlebih! Jika ikan di tengah rantai habis, predator puncak kelaparan dan rantai makanan samudra runtuh. Ayo tegakkan aturan konservasi!",
    actionButtonText: "Terapkan Konservasi & Batasi Penangkapan",
    successSpeech: "Bagus sekali! Kawasan konservasi laut berhasil melindungi tuna. Populasi pulih dan hiu mendapatkan makanannya kembali secara seimbang!",
    recoverySummary: "Regulasi konservasi laut berhasil diberlakukan. Penangkapan liar dihentikan sehingga populasi tuna dan predator puncak seimbang kembali.",
  },
];

export const ECOSYSTEMS: Ecosystem[] = [
  {
    id: "sawah",
    name: "Ekosistem Sawah",
    desc: "Siklus energi di persawahan tropis Indonesia",
    bgGradient: "from-emerald-500 to-green-600",
    borderTheme: "border-emerald-400",
    successSpeech: "Luar biasa! Rantai makanan sawah seimbang sempurna! Sekarang, mari teliti Laboratorium Krisis Ekosistem untuk melihat apa yang terjadi jika salah satu rantai terputus!",
    chain: [
      {
        id: "padi",
        name: "Padi",
        mysteryHint: "Penghasil Makanan Utama dari Sinar Matahari",
        role: "Produsen Utama",
        roleType: "producer",
        desc: "Menyerap sinar matahari dan air tanah untuk menghasilkan bulir beras bergizi.",
        actionWord: "MEKAR! Padi menyerap cahaya surya & tumbuh subur!",
        badgeBg: "bg-emerald-100 text-emerald-800 border-emerald-300",
        borderColor: "border-emerald-400",
        bgColor: "bg-emerald-50",
        SvgComponent: RicePlantSvg,
      },
      {
        id: "belalang",
        name: "Belalang",
        mysteryHint: "Herbivora Pemakan Tumbuhan Segar",
        role: "Konsumen I",
        roleType: "herbivore",
        desc: "Serangga pelompat lincah pemakan daun hijau di pematang sawah.",
        actionWord: "KRAUK! Belalang melahap dedaunan padi segar!",
        badgeBg: "bg-lime-100 text-lime-800 border-lime-300",
        borderColor: "border-lime-400",
        bgColor: "bg-lime-50",
        SvgComponent: GrasshopperSvg,
      },
      {
        id: "katak",
        name: "Katak Sawah",
        mysteryHint: "Karnivora Pemangsa Serangga Melompat",
        role: "Konsumen II",
        roleType: "carnivore",
        desc: "Memiliki lidah panjang dan lengket secepat kilat untuk menyambar serangga terbang.",
        actionWord: "HAP! Lidah katak menyambar belalang secepat kilat!",
        badgeBg: "bg-amber-100 text-amber-800 border-amber-300",
        borderColor: "border-amber-400",
        bgColor: "bg-amber-50",
        SvgComponent: FrogSvg,
      },
      {
        id: "ular",
        name: "Ular Sawah",
        mysteryHint: "Predator Melata Pemburu Katak & Tikus",
        role: "Konsumen III",
        roleType: "carnivore",
        desc: "Reptil melata tanpa kaki yang merayap senyap berburu mangsa di antara rimbunnya sawah.",
        actionWord: "SREK! Ular sawah menyergap mangsa dalam sekejap!",
        badgeBg: "bg-orange-100 text-orange-800 border-orange-300",
        borderColor: "border-orange-400",
        bgColor: "bg-orange-50",
        SvgComponent: SnakeSvg,
      },
      {
        id: "elang",
        name: "Burung Elang",
        mysteryHint: "Penguasa Puncak Rantai Makanan Angkasa",
        role: "Konsumen Puncak",
        roleType: "apex",
        desc: "Burung pemangsa bermata tajam dan bercakar kokoh yang mengintai dari langit biru.",
        actionWord: "WUSSH! Elang menukik tajam mencengkeram mangsa dari angkasa!",
        badgeBg: "bg-purple-100 text-purple-800 border-purple-300",
        borderColor: "border-purple-400",
        bgColor: "bg-purple-50",
        SvgComponent: EagleSvg,
      },
    ],
  },
  {
    id: "laut",
    name: "Ekosistem Laut",
    desc: "Siklus energi di perairan samudra nusantara",
    bgGradient: "from-sky-500 to-blue-600",
    borderTheme: "border-sky-400",
    successSpeech: "Hebat sekali! Rantai makanan samudra nusantara lengkap sempurna! Sekarang, mari uji daya tahan ekosistem laut di Laboratorium Krisis!",
    chain: [
      {
        id: "fitoplankton",
        name: "Fitoplankton",
        mysteryHint: "Produsen Mikroskopis Penghasil Energi Surya di Laut",
        role: "Produsen Samudra",
        roleType: "producer",
        desc: "Jasad renik nabati melayang di perairan yang mengolah energi surya menjadi nutrisi & oksigen.",
        actionWord: "KILAU! Fitoplankton memanen energi matahari di permukaan samudra!",
        badgeBg: "bg-teal-100 text-teal-800 border-teal-300",
        borderColor: "border-teal-400",
        bgColor: "bg-teal-50",
        SvgComponent: PhytoplanktonSvg,
      },
      {
        id: "udang",
        name: "Udang & Zooplankton",
        mysteryHint: "Herbivora Kecil Pemakan Plankton Nabati",
        role: "Konsumen I",
        roleType: "herbivore",
        desc: "Hewan perenang mungil transparan yang menyaring jasad renik nabati di arus ombak.",
        actionWord: "NYAM! Udang kecil menyaring & melahap fitoplankton!",
        badgeBg: "bg-orange-100 text-orange-800 border-orange-300",
        borderColor: "border-orange-400",
        bgColor: "bg-orange-50",
        SvgComponent: ShrimpSvg,
      },
      {
        id: "tuna",
        name: "Ikan Tuna",
        mysteryHint: "Karnivora Perenang Cepat Pemangsa Udang",
        role: "Konsumen II",
        roleType: "carnivore",
        desc: "Ikan perenang tangguh berbentuk torpedo yang memburu kawanan udang di laut lepas.",
        actionWord: "WUSH! Tuna menyambar kawanan udang dengan kecepatan tinggi!",
        badgeBg: "bg-blue-100 text-blue-800 border-blue-300",
        borderColor: "border-blue-400",
        bgColor: "bg-blue-50",
        SvgComponent: TunaFishSvg,
      },
      {
        id: "hiu",
        name: "Ikan Hiu",
        mysteryHint: "Predator Puncak Penguasa Samudra",
        role: "Konsumen Puncak",
        roleType: "apex",
        desc: "Penguasa perairan bergigi tajam yang mengendus jejak mangsa dari jarak bermil-mil.",
        actionWord: "GELAP! Ikan hiu memburu tangguh dari kedalaman samudra!",
        badgeBg: "bg-indigo-100 text-indigo-800 border-indigo-300",
        borderColor: "border-indigo-400",
        bgColor: "bg-indigo-50",
        SvgComponent: SharkSvg,
      },
      {
        id: "pengurai",
        name: "Pengurai Laut",
        mysteryHint: "Pengurai Alami Pengolah Sisa Organik di Dasar Samudra",
        role: "Dekomposer",
        roleType: "decomposer",
        desc: "Mikroba dan biota dasar laut yang mendaur ulang sisa organisme menjadi nutrisi alami air laut.",
        actionWord: "DAUR ULANG! Pengurai mengembalikan nutrisi alami ke dasar samudra!",
        badgeBg: "bg-emerald-100 text-emerald-800 border-emerald-300",
        borderColor: "border-emerald-400",
        bgColor: "bg-emerald-50",
        SvgComponent: DecomposerSeaSvg,
      },
    ],
  },
];

export const FOODCHAIN_COORDINATES: Record<"sawah" | "laut", Array<{ left: string; top: string }>> = {
  sawah: [
    { left: "14.2%", top: "56.0%" },
    { left: "32.1%", top: "69.2%" },
    { left: "50.0%", top: "55.2%" },
    { left: "68.4%", top: "70.1%" },
    { left: "85.8%", top: "55.5%" },
  ],
  laut: [
    { left: "12.0%", top: "52.0%" },
    { left: "30.0%", top: "64.0%" },
    { left: "50.0%", top: "48.0%" },
    { left: "70.0%", top: "64.0%" },
    { left: "88.0%", top: "52.0%" },
  ],
};

/* =========================================================================
   MAGNET HUNTER: 8 OBJEK EKSPLORASI SIFAT KEMAGNETAN
   ========================================================================= */

export const PakuBesiSvg = () => (
  <svg viewBox="0 0 48 48" className="w-10 h-10 sm:w-12 sm:h-12" fill="none">
    <ellipse cx="24" cy="8" rx="10" ry="3.5" fill="#94a3b8" stroke="#475569" strokeWidth="1.5" />
    <path d="M21 10 L21 14 L27 14 L27 10 Z" fill="#64748b" />
    <path d="M21 14 L21 34 L24 44 L27 34 L27 14 Z" fill="#cbd5e1" stroke="#475569" strokeWidth="1.5" />
    <line x1="23" y1="14" x2="23" y2="34" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
    <line x1="25" y1="14" x2="25" y2="34" stroke="#64748b" strokeWidth="1" strokeLinecap="round" />
  </svg>
);

export const PenitiLogamSvg = () => (
  <svg viewBox="0 0 48 48" className="w-10 h-10 sm:w-12 sm:h-12" fill="none">
    <path d="M14 6 C14 6 22 4 28 6 C32 7.5 33 13 29 16 C25 18 16 18 14 14 Z" fill="#94a3b8" stroke="#475569" strokeWidth="1.5" />
    <circle cx="27" cy="11" r="2" fill="#475569" />
    <circle cx="16" cy="38" r="4.5" fill="none" stroke="#64748b" strokeWidth="2.5" />
    <path d="M15 14 L12 37" stroke="#cbd5e1" strokeWidth="3" strokeLinecap="round" />
    <path d="M15 14 L12 37" stroke="#475569" strokeWidth="1" strokeLinecap="round" />
    <path d="M20 38 L25 13" stroke="#cbd5e1" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M20 38 L25 13" stroke="#ffffff" strokeWidth="1" strokeLinecap="round" />
  </svg>
);

export const KlipKertasSvg = () => (
  <svg viewBox="0 0 48 48" className="w-10 h-10 sm:w-12 sm:h-12" fill="none">
    <path
      d="M17 18 L17 34 C17 38.5 21 41 24.5 41 C28 41 32 38.5 32 34 L32 13 C32 8.5 28 6 24 6 C20 6 16 8.5 16 13 L16 32 C16 34.5 18 36 21 36 C24 36 26 34.5 26 32 L26 18"
      stroke="#94a3b8"
      strokeWidth="4"
      strokeLinecap="round"
    />
    <path
      d="M17 18 L17 34 C17 38.5 21 41 24.5 41 C28 41 32 38.5 32 34 L32 13 C32 8.5 28 6 24 6 C20 6 16 8.5 16 13 L16 32 C16 34.5 18 36 21 36 C24 36 26 34.5 26 32 L26 18"
      stroke="#f8fafc"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

export const PensilKayuSvg = () => (
  <svg viewBox="0 0 48 48" className="w-10 h-10 sm:w-12 sm:h-12" fill="none">
    <path d="M10 38 L14 42 L18 38 L14 34 Z" fill="#f472b6" stroke="#db2777" strokeWidth="1" />
    <path d="M13 35 L17 39 L20 36 L16 32 Z" fill="#cbd5e1" stroke="#64748b" strokeWidth="1" />
    <path d="M16 32 L34 14 L38 18 L20 36 Z" fill="#facc15" stroke="#d97706" strokeWidth="1.5" />
    <line x1="18" y1="34" x2="36" y2="16" stroke="#eab308" strokeWidth="2" />
    <path d="M34 14 L42 6 L38 18 Z" fill="#fed7aa" stroke="#c2410c" strokeWidth="1" />
    <path d="M39 9 L42 6 L40 12 Z" fill="#1e293b" />
  </svg>
);

export const PenghapusKaretSvg = () => (
  <svg viewBox="0 0 48 48" className="w-10 h-10 sm:w-12 sm:h-12" fill="none">
    <path d="M8 26 L22 12 L30 18 L16 32 Z" fill="#38bdf8" stroke="#0284c7" strokeWidth="1.5" />
    <path d="M16 32 L30 18 L38 24 L24 38 Z" fill="#f472b6" stroke="#db2777" strokeWidth="1.5" />
    <path d="M8 26 L10 30 L18 36 L16 32 Z" fill="#0284c7" />
    <path d="M18 36 L26 42 L24 38 Z" fill="#db2777" />
    <line x1="22" y1="12" x2="24" y2="14" stroke="#ffffff" strokeWidth="1" />
  </svg>
);

export const KertasOrigamiSvg = () => (
  <svg viewBox="0 0 48 48" className="w-10 h-10 sm:w-12 sm:h-12" fill="none">
    <polygon points="6,30 24,10 42,30" fill="#06b6d4" stroke="#0891b2" strokeWidth="1.5" />
    <polygon points="12,30 24,18 36,30" fill="#22d3ee" stroke="#0891b2" strokeWidth="1.5" />
    <polygon points="6,30 24,38 42,30" fill="#3b82f6" stroke="#1d4ed8" strokeWidth="1.5" />
    <polygon points="18,30 24,24 30,30" fill="#f43f5e" stroke="#e11d48" strokeWidth="1.5" />
    <line x1="24" y1="10" x2="24" y2="38" stroke="#0e7490" strokeWidth="1.5" strokeDasharray="2 2" />
  </svg>
);

export const KoinEmasSvg = () => (
  <svg viewBox="0 0 48 48" className="w-10 h-10 sm:w-12 sm:h-12" fill="none">
    <circle cx="24" cy="24" r="18" fill="#eab308" stroke="#ca8a04" strokeWidth="2.5" />
    <circle cx="24" cy="24" r="14" fill="#facc15" stroke="#ca8a04" strokeWidth="1.5" />
    <polygon
      points="24,15 26.5,21 33,21.5 28,25.5 29.8,32 24,28 18.2,32 20,25.5 15,21.5 21.5,21"
      fill="#fef08a"
      stroke="#b45309"
      strokeWidth="1"
    />
    <path d="M12 16 A 16 16 0 0 1 28 9" stroke="#fef08a" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const DaunKeringSvg = () => (
  <svg viewBox="0 0 48 48" className="w-10 h-10 sm:w-12 sm:h-12" fill="none">
    <path
      d="M8 38 C8 38 10 24 22 14 C28 9 38 6 42 6 C42 6 39 16 34 22 C24 34 8 38 8 38 Z"
      fill="#d97706"
      stroke="#92400e"
      strokeWidth="2"
    />
    <path
      d="M14 34 C18 26 28 18 38 10"
      stroke="#78350f"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <line x1="22" y1="26" x2="28" y2="22" stroke="#92400e" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="26" y1="21" x2="33" y2="18" stroke="#92400e" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="18" y1="30" x2="22" y2="33" stroke="#92400e" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M8 38 L4 44" stroke="#78350f" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

export interface MagnetObject {
  id: string;
  name: string;
  material: string;
  isMagnetic: boolean;
  category: "Magnetik (Feromagnetik)" | "Non-Magnetik";
  desc: string;
  speechSuccess: string;
  speechFail: string;
  badgeBg: string;
  borderColor: string;
  bgColor: string;
  SvgComponent: React.FC;
}

export const MAGNET_OBJECTS: MagnetObject[] = [
  {
    id: "paku_besi",
    name: "Paku Besi",
    material: "Logam Besi (Fe)",
    isMagnetic: true,
    category: "Magnetik (Feromagnetik)",
    desc: "Paku pertukangan dari besi pejal berkekuatan magnetik tinggi.",
    speechSuccess: "Hebat! Paku besi terbuat dari besi feromagnetik yang ditarik kuat oleh kutub magnet!",
    speechFail: "",
    badgeBg: "bg-emerald-100 text-emerald-800 border-emerald-300",
    borderColor: "border-emerald-400",
    bgColor: "bg-emerald-50",
    SvgComponent: PakuBesiSvg,
  },
  {
    id: "peniti_logam",
    name: "Peniti Logam",
    material: "Baja & Nikel",
    isMagnetic: true,
    category: "Magnetik (Feromagnetik)",
    desc: "Peniti pakaian berbahan kawat baja tahan karat berlapis nikel.",
    speechSuccess: "Bagus sekali! Peniti logam terbuat dari kawat baja berkandungan besi sehingga langsung menempel ke magnet!",
    speechFail: "",
    badgeBg: "bg-emerald-100 text-emerald-800 border-emerald-300",
    borderColor: "border-emerald-400",
    bgColor: "bg-emerald-50",
    SvgComponent: PenitiLogamSvg,
  },
  {
    id: "klip_kertas",
    name: "Klip Kertas",
    material: "Kawat Besi Baja",
    isMagnetic: true,
    category: "Magnetik (Feromagnetik)",
    desc: "Penjepit kertas berpegas lentur dari kawat besi berlapis seng.",
    speechSuccess: "Tepat sekali! Klip kertas terbuat dari kawat besi yang langsung ditarik oleh gaya magnet!",
    speechFail: "",
    badgeBg: "bg-emerald-100 text-emerald-800 border-emerald-300",
    borderColor: "border-emerald-400",
    bgColor: "bg-emerald-50",
    SvgComponent: KlipKertasSvg,
  },
  {
    id: "pensil_kayu",
    name: "Pensil Kayu",
    material: "Kayu & Grafit",
    isMagnetic: false,
    category: "Non-Magnetik",
    desc: "Alat tulis berbahan batang kayu pinus dan inti karbon grafit.",
    speechSuccess: "",
    speechFail: "Wah, pensil ini terbuat dari kayu! Kayu bukan benda feromagnetik, jadi tidak dapat ditarik magnet.",
    badgeBg: "bg-slate-100 text-slate-700 border-slate-300",
    borderColor: "border-slate-300",
    bgColor: "bg-slate-50",
    SvgComponent: PensilKayuSvg,
  },
  {
    id: "penghapus_karet",
    name: "Penghapus Karet",
    material: "Karet Sintetis",
    isMagnetic: false,
    category: "Non-Magnetik",
    desc: "Pembersih goresan pensil dari karet elastis non-logam.",
    speechSuccess: "",
    speechFail: "Penghapus terbuat dari karet elastis! Karet adalah benda non-magnetik dan tidak memiliki sifat kemagnetan.",
    badgeBg: "bg-slate-100 text-slate-700 border-slate-300",
    borderColor: "border-slate-300",
    bgColor: "bg-slate-50",
    SvgComponent: PenghapusKaretSvg,
  },
  {
    id: "kertas_origami",
    name: "Kertas Origami",
    material: "Serat Selulosa",
    isMagnetic: false,
    category: "Non-Magnetik",
    desc: "Lembaran kertas lipat dari bubur serat kayu pohon.",
    speechSuccess: "",
    speechFail: "Kertas terbuat dari serat selulosa tumbuhan! Benda ini non-magnetik sehingga magnet tidak bereaksi.",
    badgeBg: "bg-slate-100 text-slate-700 border-slate-300",
    borderColor: "border-slate-300",
    bgColor: "bg-slate-50",
    SvgComponent: KertasOrigamiSvg,
  },
  {
    id: "koin_emas",
    name: "Koin Emas",
    material: "Logam Mulia (Au)",
    isMagnetic: false,
    category: "Non-Magnetik",
    desc: "Uang logam berharga murni emas, logam mulia non-feromagnetik.",
    speechSuccess: "",
    speechFail: "Emas adalah logam mulia! Meskipun termasuk logam, emas bukan feromagnetik seperti besi, sehingga tidak tertarik magnet.",
    badgeBg: "bg-amber-100 text-amber-800 border-amber-300",
    borderColor: "border-amber-300",
    bgColor: "bg-amber-50",
    SvgComponent: KoinEmasSvg,
  },
  {
    id: "daun_kering",
    name: "Daun Kering",
    material: "Organik Alami",
    isMagnetic: false,
    category: "Non-Magnetik",
    desc: "Guguran daun tanaman dari bahan nabati alami.",
    speechSuccess: "",
    speechFail: "Daun adalah bahan organik alam! Magnet hanya menarik logam-logam tertentu seperti besi, nikel, dan kobalt.",
    badgeBg: "bg-orange-100 text-orange-800 border-orange-300",
    borderColor: "border-orange-300",
    bgColor: "bg-orange-50",
    SvgComponent: DaunKeringSvg,
  },
];

export default function ScienceLabModal({
  isOpen,
  onClose,
  onEarnStars,
  audioEnabled,
  liteMode,
  isFullPage = false,
  stars = 0,
}: ScienceLabModalProps) {
  const [activeTab, setActiveTab] = useState<"colors" | "waterCycle" | "foodChain" | "circuits" | "magnet">("colors");

  // Tab 4: Laboratorium Listrik Cilik State
  const [circuitMode, setCircuitMode] = useState<"assembly" | "basic" | "series" | "parallel">("assembly");
  const [basicSwitch, setBasicSwitch] = useState<boolean>(false);
  const [seriesSwitch, setSeriesSwitch] = useState<boolean>(false);
  const [bulbAAttached, setBulbAAttached] = useState<boolean>(true);
  const [bulbBAttached, setBulbBAttached] = useState<boolean>(true);
  const [parallelSwitchA, setParallelSwitchA] = useState<boolean>(false);
  const [parallelSwitchB, setParallelSwitchB] = useState<boolean>(false);
  const [completedCircuitModes, setCompletedCircuitModes] = useState<string[]>([]);

  // Fitur 1: Rakit Sirkuit Mandiri (Assembly Puzzle) State
  const [assemblySlots, setAssemblySlots] = useState<{
    battery: boolean;
    switch: boolean;
    bulb: boolean;
    wires: boolean;
  }>({
    battery: false,
    switch: false,
    bulb: false,
    wires: false,
  });
  const [assemblySwitchClosed, setAssemblySwitchClosed] = useState<boolean>(false);
  const [assemblyTestItem, setAssemblyTestItem] = useState<"wire" | "paperclip" | "eraser">("wire");
  const [hasEarnedAssemblyStars, setHasEarnedAssemblyStars] = useState<boolean>(false);

  // Fitur 2: Wahana Magnet Hunter State
  const [stuckMagnetIds, setStuckMagnetIds] = useState<string[]>([]);
  const [lastTestedMagnetId, setLastTestedMagnetId] = useState<string | null>(null);
  const [isMagnetShaking, setIsMagnetShaking] = useState<boolean>(false);
  const [hasEarnedMagnetStars, setHasEarnedMagnetStars] = useState<boolean>(false);

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

  // Food Chain Tab
  const [selectedEcosystemId, setSelectedEcosystemId] = useState<"sawah" | "laut">("sawah");
  const [placedChainIds, setPlacedChainIds] = useState<string[]>([]);
  const [availableCardIds, setAvailableCardIds] = useState<string[]>([]);
  const [foodChainComplete, setFoodChainComplete] = useState(false);
  const [chainErrorFeedback, setChainErrorFeedback] = useState<string | null>(null);
  const [actionBurst, setActionBurst] = useState<{ index: number; text: string } | null>(null);

  // Laboratorium Krisis Ekosistem (What If? Mode) State
  const [activeCrisisId, setActiveCrisisId] = useState<CrisisScenarioId | null>(null);
  const [crisisResolved, setCrisisResolved] = useState<boolean>(false);
  const [earnedCrisisStars, setEarnedCrisisStars] = useState<boolean>(false);

  const activeEcosystem = ECOSYSTEMS.find((e) => e.id === selectedEcosystemId) || ECOSYSTEMS[0];

  // Initialize or shuffle food chain
  const resetFoodChain = (ecoId: "sawah" | "laut" = selectedEcosystemId) => {
    const eco = ECOSYSTEMS.find((e) => e.id === ecoId) || ECOSYSTEMS[0];
    setSelectedEcosystemId(ecoId);
    setPlacedChainIds([]);
    setFoodChainComplete(false);
    setChainErrorFeedback(null);
    setActionBurst(null);
    setActiveCrisisId(null);
    setCrisisResolved(false);
    setEarnedCrisisStars(false);
    const shuffled = [...eco.chain].map((c) => c.id).sort(() => Math.random() - 0.5);
    if (shuffled.join() === eco.chain.map((c) => c.id).join()) {
      shuffled.reverse();
    }
    setAvailableCardIds(shuffled);
    sound.playChime();
  };

  useEffect(() => {
    const eco = ECOSYSTEMS.find((e) => e.id === selectedEcosystemId) || ECOSYSTEMS[0];
    const shuffled = [...eco.chain].map((c) => c.id).sort(() => Math.random() - 0.5);
    if (shuffled.join() === eco.chain.map((c) => c.id).join()) {
      shuffled.reverse();
    }
    setAvailableCardIds(shuffled);
    setPlacedChainIds([]);
    setFoodChainComplete(false);
    setChainErrorFeedback(null);
    setActionBurst(null);
    setActiveCrisisId(null);
    setCrisisResolved(false);
    setEarnedCrisisStars(false);
  }, [selectedEcosystemId]);

  // Preload gambar WebP siklus air & rantai makanan untuk instan zero-latency switching
  useEffect(() => {
    if (typeof window !== "undefined") {
      const img1 = new Image();
      img1.src = "/images/evaporasi.webp";
      const img2 = new Image();
      img2.src = "/images/kondensasi.webp";
      const img3 = new Image();
      img3.src = "/images/presipitasi.webp";
      const img4 = new Image();
      img4.src = "/images/foodchain/sawah.webp";
      const img5 = new Image();
      img5.src = "/images/foodchain/laut.webp";
    }
  }, [isOpen, activeTab]);

  const handleSelectOrganism = (organismId: string) => {
    if (foodChainComplete) return;

    const currentStep = placedChainIds.length;
    const expectedOrganism = activeEcosystem.chain[currentStep];

    if (organismId === expectedOrganism.id) {
      sound.playChime();
      setChainErrorFeedback(null);
      const newPlaced = [...placedChainIds, organismId];
      setPlacedChainIds(newPlaced);
      setAvailableCardIds((prev) => prev.filter((id) => id !== organismId));

      // Trigger animasi aksi seru ("HAP!")
      setActionBurst({ index: currentStep, text: expectedOrganism.actionWord });
      setTimeout(() => {
        setActionBurst((curr) => (curr?.index === currentStep ? null : curr));
      }, 2500);

      if (newPlaced.length === activeEcosystem.chain.length) {
        setFoodChainComplete(true);
        const defaultCrisis = CRISIS_SCENARIOS.find((c) => c.ecosystemId === selectedEcosystemId);
        if (defaultCrisis) {
          setActiveCrisisId(defaultCrisis.id);
          setCrisisResolved(false);
        }
        sound.playCelebration();
        onEarnStars(35);
        if (!liteMode) {
          confetti({
            particleCount: 50,
            spread: 75,
            origin: { y: 0.6 },
            colors: ["#22c55e", "#f59e0b", "#3b82f6", "#a855f7", "#facc15"],
          });
        }
        if (audioEnabled) {
          sound.speak(activeEcosystem.successSpeech);
        }
      } else {
        if (audioEnabled) {
          const nextTarget = activeEcosystem.chain[newPlaced.length];
          sound.speak(`Tepat sekali! ${expectedOrganism.name} tersambung. Target berikutnya: cari ${nextTarget.mysteryHint}!`);
        }
      }
    } else {
      sound.playSocraticHint();
      const currentTarget = activeEcosystem.chain[currentStep];
      const errorMsg = `Belum tepat! Perhatikan petunjuknya: "${currentTarget.mysteryHint}". Periksa deskripsi perilaku alami hewan/tumbuhan di bawah!`;
      setChainErrorFeedback(errorMsg);
      if (audioEnabled) {
        sound.speak(errorMsg);
      }
    }
  };

  const handleSelectCrisis = (crisisId: CrisisScenarioId) => {
    const scenario = CRISIS_SCENARIOS.find((c) => c.id === crisisId);
    if (!scenario) return;
    setActiveCrisisId(crisisId);
    setCrisisResolved(false);
    sound.playChime();
    if (audioEnabled) {
      sound.speak(scenario.socraticSpeech);
    }
  };

  const handleResolveCrisis = () => {
    const scenario = CRISIS_SCENARIOS.find((c) => c.id === activeCrisisId);
    if (!scenario) return;
    setCrisisResolved(true);
    sound.playCelebration();
    if (!earnedCrisisStars) {
      onEarnStars(40);
      setEarnedCrisisStars(true);
    }
    if (!liteMode) {
      confetti({
        particleCount: 65,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#10b981", "#06b6d4", "#f59e0b", "#8b5cf6", "#ec4899"],
      });
    }
    if (audioEnabled) {
      sound.speak(scenario.successSpeech);
    }
  };

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

  // Handlers for Tab 4: Laboratorium Listrik Cilik
  const handleToggleBasicSwitch = () => {
    const nextVal = !basicSwitch;
    setBasicSwitch(nextVal);
    sound.playChime();

    if (nextVal) {
      if (!completedCircuitModes.includes("basic")) {
        onEarnStars(45);
        setCompletedCircuitModes((prev) => [...prev, "basic"]);
        if (!liteMode) {
          confetti({
            particleCount: 50,
            spread: 70,
            origin: { y: 0.6 },
          });
        }
      }
      sound.playCelebration();
      if (audioEnabled) {
        sound.speak("Luar biasa! Saklar pisau ditutup, rangkaian listrik tersambung menjadi sirkuit tertutup. Arus listrik mengalir dari kutub baterai menyalakan lampu pijar hingga berpendar emas terang!");
      }
    } else {
      sound.playSocraticHint();
      if (audioEnabled) {
        sound.speak("Saklar pisau dibuka! Rangkaian listrik terputus menjadi sirkuit terbuka, aliran elektron terhenti dan lampu padam.");
      }
    }
  };

  const handleToggleSeriesSwitch = () => {
    const nextVal = !seriesSwitch;
    setSeriesSwitch(nextVal);
    sound.playChime();

    if (nextVal && bulbAAttached && bulbBAttached) {
      if (!completedCircuitModes.includes("series")) {
        onEarnStars(45);
        setCompletedCircuitModes((prev) => [...prev, "series"]);
        if (!liteMode) {
          confetti({
            particleCount: 50,
            spread: 70,
            origin: { y: 0.6 },
          });
        }
      }
      sound.playCelebration();
      if (audioEnabled) {
        sound.speak("Hebat! Pada rangkaian seri, kedua lampu berada dalam satu jalur kawat yang sama sehingga menyala bersamaan.");
      }
    } else if (!nextVal) {
      sound.playSocraticHint();
      if (audioEnabled) {
        sound.speak("Saklar utama dibuka, sirkuit seri terputus dan kedua lampu padam.");
      }
    } else {
      sound.playSocraticHint();
      if (audioEnabled) {
        sound.speak("Saklar sudah ditutup, tetapi salah satu lampu dicopot! Karena kawat terputus, arus listrik tidak dapat mengalir ke lampu lainnya.");
      }
    }
  };

  const handleToggleBulbA = () => {
    const nextVal = !bulbAAttached;
    setBulbAAttached(nextVal);
    sound.playChime();

    if (!nextVal) {
      sound.playSocraticHint();
      if (audioEnabled) {
        sound.speak("Lihat! Saat Lampu 1 dicopot atau rusak, jalur rangkaian seri terputus total. Akibatnya Lampu 2 otomatis ikut padam!");
      }
    } else {
      if (seriesSwitch && bulbBAttached) {
        sound.playCelebration();
        if (audioEnabled) {
          sound.speak("Lampu 1 dipasang kembali! Jalur sirkuit tersambung utuh dan kedua lampu menyala bersamaan.");
        }
      }
    }
  };

  const handleToggleBulbB = () => {
    const nextVal = !bulbBAttached;
    setBulbBAttached(nextVal);
    sound.playChime();

    if (!nextVal) {
      sound.playSocraticHint();
      if (audioEnabled) {
        sound.speak("Lampu 2 dicopot! Karena berada di satu jalur seri, aliran listrik terhenti dan Lampu 1 otomatis ikut padam!");
      }
    } else {
      if (seriesSwitch && bulbAAttached) {
        sound.playCelebration();
        if (audioEnabled) {
          sound.speak("Lampu 2 dipasang kembali! Sirkuit seri kembali tertutup dan kedua lampu menyala.");
        }
      }
    }
  };

  const handleToggleParallelSwitchA = () => {
    const nextVal = !parallelSwitchA;
    setParallelSwitchA(nextVal);
    sound.playChime();

    if (nextVal) {
      handleCheckParallelReward(nextVal, parallelSwitchB);
      if (audioEnabled) {
        sound.speak("Saklar Cabang 1 ditutup! Lampu 1 menyala terang secara mandiri.");
      }
    } else {
      sound.playSocraticHint();
      if (audioEnabled) {
        if (parallelSwitchB) {
          sound.speak("Saklar Cabang 1 dimatikan, namun Lampu 2 di Cabang 2 tetap menyala! Inilah keunggulan rangkaian paralel.");
        } else {
          sound.speak("Cabang 1 dimatikan.");
        }
      }
    }
  };

  const handleToggleParallelSwitchB = () => {
    const nextVal = !parallelSwitchB;
    setParallelSwitchB(nextVal);
    sound.playChime();

    if (nextVal) {
      handleCheckParallelReward(parallelSwitchA, nextVal);
      if (audioEnabled) {
        sound.speak("Saklar Cabang 2 ditutup! Lampu 2 menyala terang secara mandiri.");
      }
    } else {
      sound.playSocraticHint();
      if (audioEnabled) {
        if (parallelSwitchA) {
          sound.speak("Saklar Cabang 2 dimatikan, namun Lampu 1 di Cabang 1 tetap menyala! Persis seperti lampu di rumah kita.");
        } else {
          sound.speak("Cabang 2 dimatikan.");
        }
      }
    }
  };

  const handleCheckParallelReward = (swA: boolean, swB: boolean) => {
    if ((swA || swB) && !completedCircuitModes.includes("parallel")) {
      onEarnStars(45);
      setCompletedCircuitModes((prev) => [...prev, "parallel"]);
      sound.playCelebration();
      if (!liteMode) {
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.6 },
        });
      }
    } else if (swA || swB) {
      sound.playCelebration();
    }
  };

  // Handlers for Circuit Assembly Puzzle
  const isAssemblyComplete =
    assemblySlots.battery && assemblySlots.switch && assemblySlots.bulb && assemblySlots.wires;
  const isAssemblyConducting = assemblyTestItem === "wire" || assemblyTestItem === "paperclip";
  const isAssemblyLit = isAssemblyComplete && assemblySwitchClosed && isAssemblyConducting;

  const triggerAssemblyCelebration = () => {
    setHasEarnedAssemblyStars(true);
    onEarnStars(45);
    sound.playCelebration();
    if (!liteMode) {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  };

  const handleToggleAssemblySlot = (slot: "battery" | "switch" | "bulb" | "wires") => {
    sound.playChime();
    setAssemblySlots((prev) => {
      const nextVal = !prev[slot];
      const updated = { ...prev, [slot]: nextVal };
      const complete = updated.battery && updated.switch && updated.bulb && updated.wires;

      if (nextVal && audioEnabled) {
        const names: Record<string, string> = {
          battery: "Baterai DC 1.5V dipasang!",
          switch: "Saklar pisau dipasang!",
          bulb: "Bohlam pijar dipasang!",
          wires: "Kabel merah dan biru dipasang!",
        };
        sound.speak(names[slot] || "Komponen terpasang.");
      }

      if (complete && assemblySwitchClosed && isAssemblyConducting && !hasEarnedAssemblyStars) {
        triggerAssemblyCelebration();
      }
      return updated;
    });
  };

  const handleToggleAssemblySwitch = () => {
    const nextSwitch = !assemblySwitchClosed;
    setAssemblySwitchClosed(nextSwitch);
    sound.playChime();

    if (nextSwitch) {
      if (isAssemblyComplete) {
        if (isAssemblyConducting) {
          if (!hasEarnedAssemblyStars) {
            triggerAssemblyCelebration();
          } else {
            sound.playCelebration();
          }
          if (audioEnabled) {
            sound.speak(
              assemblyTestItem === "paperclip"
                ? "Saklar ditutup! Klip kertas berbahan logam mengalirkan elektron, sehingga lampu menyala terang!"
                : "Sirkuit tertutup aktif! Aliran elektron mengalir sempurna menyalakan bohlam pijar!"
            );
          }
        } else {
          sound.playSocraticHint();
          if (audioEnabled) {
            sound.speak(
              "Saklar ditutup, tapi penghapus karet adalah isolator listrik! Elektron terhambat dan lampu tetap padam."
            );
          }
        }
      } else {
        sound.playSocraticHint();
        if (audioEnabled) {
          sound.speak("Saklar ditutup, tetapi komponen sirkuit belum lengkap terpasang.");
        }
      }
    } else {
      sound.playSocraticHint();
      if (audioEnabled) {
        sound.speak("Saklar dibuka! Sirkuit terputus dan lampu padam.");
      }
    }
  };

  const handleSelectAssemblyTestItem = (item: "wire" | "paperclip" | "eraser") => {
    setAssemblyTestItem(item);
    sound.playChime();

    const conducting = item === "wire" || item === "paperclip";
    if (isAssemblyComplete && assemblySwitchClosed && conducting) {
      if (!hasEarnedAssemblyStars) {
        triggerAssemblyCelebration();
      } else {
        sound.playCelebration();
      }
      if (audioEnabled) {
        sound.speak(
          item === "paperclip"
            ? "Klip kertas logam dipasang di celah sirkuit! Karena logam adalah konduktor listrik, arus mengalir dan lampu menyala!"
            : "Kabel tembaga dipasang! Tembaga menghantarkan arus listrik dengan lancar."
        );
      }
    } else if (item === "eraser") {
      sound.playSocraticHint();
      if (audioEnabled) {
        sound.speak(
          "Penghapus karet dipasang! Karet adalah bahan isolator yang tidak dapat mengalirkan listrik, sehingga lampu padam."
        );
      }
    }
  };

  const handleResetAssembly = () => {
    setAssemblySlots({ battery: false, switch: false, bulb: false, wires: false });
    setAssemblySwitchClosed(false);
    setAssemblyTestItem("wire");
    sound.playChime();
    if (audioEnabled) {
      sound.speak("Papan sirkuit dirakit ulang dari awal. Pasang komponen dari kotak perkakas!");
    }
  };

  // Handlers for Magnet Hunter
  const handleTestMagnetObject = (obj: MagnetObject) => {
    setLastTestedMagnetId(obj.id);

    if (obj.isMagnetic) {
      if (!stuckMagnetIds.includes(obj.id)) {
        const nextStuck = [...stuckMagnetIds, obj.id];
        setStuckMagnetIds(nextStuck);
        sound.playCelebration();

        if (nextStuck.length === 3 && !hasEarnedMagnetStars) {
          setHasEarnedMagnetStars(true);
          onEarnStars(45);
          sound.playCelebration();
          if (!liteMode) {
            confetti({
              particleCount: 60,
              spread: 80,
              origin: { y: 0.6 },
            });
          }
          if (audioEnabled) {
            sound.speak(
              "Luar biasa, Detektif Cilik! Kamu berhasil menemukan seluruh 3 benda feromagnetik yang menempel kuat pada kutub magnet!"
            );
          }
        } else {
          if (audioEnabled) {
            sound.speak(obj.speechSuccess);
          }
        }
      } else {
        sound.playChime();
        if (audioEnabled) {
          sound.speak(`${obj.name} sudah menempel di kutub magnet!`);
        }
      }
    } else {
      setIsMagnetShaking(true);
      setTimeout(() => setIsMagnetShaking(false), 600);
      sound.playSocraticHint();
      if (audioEnabled) {
        sound.speak(obj.speechFail);
      }
    }
  };

  const handleResetMagnetHunter = () => {
    setStuckMagnetIds([]);
    setLastTestedMagnetId(null);
    sound.playChime();
    if (audioEnabled) {
      sound.speak("Semua benda telah dilepaskan dari magnet. Silakan uji coba kembali!");
    }
  };

  const handleSpeakMagnetExplanation = () => {
    sound.playChime();
    if (!audioEnabled) return;
    sound.speak(
      "Magnet memiliki dua kutub: Kutub Utara berwarna merah dan Kutub Selatan berwarna biru. Magnet hanya menarik benda feromagnetik seperti besi dan baja, sedangkan kayu, karet, kertas, dan emas tidak ditarik magnet!"
    );
  };

  const handleSpeakCircuitExplanation = () => {
    sound.playChime();
    if (!audioEnabled) return;

    if (circuitMode === "assembly") {
      sound.speak(
        isAssemblyLit
          ? "Sirkuit tertutup dan aktif! Elektron mengalir dari baterai melewati saklar, konduktor, dan filamen bohlam."
          : isAssemblyComplete
          ? assemblySwitchClosed
            ? "Bahan di celah sirkuit adalah isolator penghapus karet. Isolator memblokir aliran elektron sehingga lampu padam!"
            : "Sirkuit terbuka karena saklar pisau terangkat. Tutup saklar untuk menyalakan lampu!"
          : "Papan sirkuit belum lengkap! Pasang baterai, saklar, bohlam, dan kabel dari kotak perkakas."
      );
    } else if (circuitMode === "basic") {
      sound.speak(
        basicSwitch
          ? "Rangkaian Dasar sedang tertutup dan aktif! Arus listrik mengalir dari kutub baterai melewati saklar pisau dan filamen lampu, menghasilkan energi panas dan cahaya terang berpendar."
          : "Rangkaian Dasar sedang terbuka. Saklar pisau terangkat sehingga terdapat celah udara yang memutus arus listrik. Klik saklar untuk menutup rangkaian!"
      );
    } else if (circuitMode === "series") {
      sound.speak(
        seriesSwitch && bulbAAttached && bulbBAttached
          ? "Rangkaian Seri menghubungkan dua lampu dalam satu jalur berurutan. Coba kamu copot salah satu lampu untuk membuktikan bahwa lampu lainnya akan otomatis ikut padam!"
          : "Pada rangkaian seri, arus listrik hanya punya satu jalur kawat. Jika salah satu lampu putus atau dicopot, sirkuit langsung terbuka dan seluruh lampu padam."
      );
    } else {
      sound.speak(
        "Rangkaian Paralel memiliki percabangan kabel mandiri. Seperti instalasi listrik di rumah, mematikan saklar lampu satu tidak akan mematikan lampu yang lain!"
      );
    }
  };

  return (
    <div className={isFullPage ? "min-h-screen w-full bg-emerald-50/40 text-slate-800 flex flex-col select-none overflow-x-hidden" : "fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-5 bg-slate-900/65 backdrop-blur-sm overflow-y-auto"}>
      <div className={isFullPage ? "w-full max-w-5xl mx-auto flex-1 flex flex-col bg-white rounded-none sm:rounded-3xl border-0 sm:border-4 border-emerald-400 sm:shadow-xl p-3 sm:p-6 lg:p-7 my-0 sm:my-3 lg:my-5" : "relative w-full max-w-5xl bg-white rounded-3xl border-4 border-emerald-400 shadow-2xl p-4 sm:p-7 overflow-hidden my-auto"}>
        {/* Header */}
        <div className={`flex items-center justify-between pb-3 border-b-2 border-emerald-100 ${isFullPage ? "bg-emerald-50/90 rounded-2xl p-3 sm:p-4 mb-4" : "mb-4"}`}>
          <div className="flex items-center gap-2.5 sm:gap-3">
            {isFullPage && (
              <Link
                href="/"
                onClick={() => sound.stopSpeaking()}
                className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-800 font-black text-xs sm:text-sm border-2 border-slate-300 shadow-[0_2px_0_0_#cbd5e1] btn-chunky"
                title="Kembali ke Beranda"
              >
                <ArrowLeft className="w-4 h-4 text-emerald-700" />
                <span className="hidden sm:inline">Beranda</span>
              </Link>
            )}
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center border border-emerald-300 shrink-0">
              <FlaskConical className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <h3 className="text-lg sm:text-2xl font-black font-display text-slate-800 leading-tight">
                Lab Sains Cilik
              </h3>
              {isFullPage && (
                <span className="text-[10px] sm:text-xs font-bold text-emerald-700 block leading-none">
                  Eksperimen Virtual Kimia, Fisika & Ekosistem
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isFullPage && (
              <div className="flex items-center gap-1 bg-amber-100 px-2.5 py-1 rounded-xl border border-amber-300 text-amber-900 font-black text-xs">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                <span>{stars}</span>
              </div>
            )}
            {!isFullPage && (
              <button
                onClick={onClose}
                className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 btn-chunky"
                title="Tutup Lab Sains"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Tab Switcher (5 Tabs Responsif) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 mb-4 sm:mb-5">
          <button
            onClick={() => {
              setActiveTab("colors");
              sound.playChime();
            }}
            className={`py-2 sm:py-2.5 px-2 sm:px-3 rounded-2xl font-black text-xs sm:text-sm border-2 btn-chunky flex items-center justify-center gap-1.5 transition-all ${
              activeTab === "colors"
                ? "bg-emerald-500 text-white border-emerald-600 shadow-[0_3px_0_0_#065f46]"
                : "bg-slate-100 text-slate-700 border-slate-200 hover:bg-emerald-50"
            }`}
          >
            <FlaskConical className="w-4 h-4 flex-shrink-0" />
            <span>Lab Warna</span>
          </button>

          <button
            onClick={() => {
              setActiveTab("waterCycle");
              sound.playChime();
            }}
            className={`py-2 sm:py-2.5 px-2 sm:px-3 rounded-2xl font-black text-xs sm:text-sm border-2 btn-chunky flex items-center justify-center gap-1.5 transition-all ${
              activeTab === "waterCycle"
                ? "bg-sky-500 text-white border-sky-600 shadow-[0_3px_0_0_#0369a1]"
                : "bg-slate-100 text-slate-700 border-slate-200 hover:bg-sky-50"
            }`}
          >
            <CloudRain className="w-4 h-4 flex-shrink-0" />
            <span>Siklus Air</span>
          </button>

          <button
            onClick={() => {
              setActiveTab("foodChain");
              sound.playChime();
            }}
            className={`py-2 sm:py-2.5 px-2 sm:px-3 rounded-2xl font-black text-xs sm:text-sm border-2 btn-chunky flex items-center justify-center gap-1.5 transition-all ${
              activeTab === "foodChain"
                ? "bg-amber-500 text-white border-amber-600 shadow-[0_3px_0_0_#b45309]"
                : "bg-slate-100 text-slate-700 border-slate-200 hover:bg-amber-50"
            }`}
          >
            <Sprout className="w-4 h-4 flex-shrink-0 text-emerald-600" />
            <span>Rantai Makanan</span>
          </button>

          <button
            onClick={() => {
              setActiveTab("circuits");
              sound.playChime();
            }}
            className={`py-2 sm:py-2.5 px-2 sm:px-3 rounded-2xl font-black text-xs sm:text-sm border-2 btn-chunky flex items-center justify-center gap-1.5 transition-all ${
              activeTab === "circuits"
                ? "bg-amber-500 text-slate-950 border-amber-600 shadow-[0_3px_0_0_#b45309]"
                : "bg-slate-100 text-slate-700 border-slate-200 hover:bg-amber-50"
            }`}
          >
            <Zap className="w-4 h-4 flex-shrink-0 text-amber-600" />
            <span>Rakit Listrik</span>
          </button>

          <button
            onClick={() => {
              setActiveTab("magnet");
              sound.playChime();
            }}
            className={`py-2 sm:py-2.5 px-2 sm:px-3 rounded-2xl font-black text-xs sm:text-sm border-2 btn-chunky flex items-center justify-center gap-1.5 transition-all ${
              activeTab === "magnet"
                ? "bg-rose-500 text-white border-rose-600 shadow-[0_3px_0_0_#9f1239]"
                : "bg-slate-100 text-slate-700 border-slate-200 hover:bg-rose-50"
            }`}
          >
            <Magnet className="w-4 h-4 flex-shrink-0 text-rose-500" />
            <span>Magnet Hunter</span>
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

        {/* ========================================================================= */}
        {/* TAB 3: RANTAI MAKANAN EKOSISTEM INTERAKTIF (BIOLOGI IPAS SD)               */}
        {/* ========================================================================= */}
        {activeTab === "foodChain" && (
          <div>
            {/* Top Toolbar: Pilihan Ekosistem & Tombol Kontrol */}
            <div className="flex flex-wrap items-center justify-between gap-2.5 mb-3">
              {/* Ekosistem Selector Pills */}
              <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-2xl border-2 border-slate-200">
                <button
                  onClick={() => resetFoodChain("sawah")}
                  className={`py-1.5 px-3 rounded-xl font-black text-xs transition-all btn-chunky flex items-center gap-1.5 ${
                    selectedEcosystemId === "sawah"
                      ? "bg-emerald-500 text-white shadow-sm border border-emerald-600"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <Sprout className="w-3.5 h-3.5" />
                  <span>Ekosistem Sawah</span>
                </button>

                <button
                  onClick={() => resetFoodChain("laut")}
                  className={`py-1.5 px-3 rounded-xl font-black text-xs transition-all btn-chunky flex items-center gap-1.5 ${
                    selectedEcosystemId === "laut"
                      ? "bg-sky-500 text-white shadow-sm border border-sky-600"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <Droplets className="w-3.5 h-3.5" />
                  <span>Ekosistem Laut</span>
                </button>
              </div>

              {/* Action Buttons: Dengar Panduan & Acak Ulang */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    const currentStep = placedChainIds.length;
                    const promptText = foodChainComplete
                      ? activeEcosystem.successSpeech
                      : currentStep === 0
                      ? `Langkah 1: ${activeEcosystem.chain[0].mysteryHint}`
                      : `Langkah ${currentStep + 1}: ${activeEcosystem.chain[currentStep].mysteryHint}`;
                    sound.playChime();
                    if (audioEnabled) {
                      sound.speak(promptText);
                    }
                  }}
                  className="p-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border-2 border-slate-200 shadow-sm btn-chunky flex items-center gap-1.5 text-xs font-bold"
                  title="Dengarkan Suara Panduan Tobi"
                >
                  <Volume2 className="w-4 h-4 text-sky-600" />
                  <span className="hidden sm:inline">Dengar Panduan</span>
                </button>

                <button
                  onClick={() => resetFoodChain(selectedEcosystemId)}
                  className="p-2 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 border-2 border-amber-300 shadow-sm btn-chunky flex items-center gap-1.5 text-xs font-black"
                  title="Acak Ulang Kartu"
                >
                  <Shuffle className="w-4 h-4 text-amber-700" />
                  <span>Acak Ulang</span>
                </button>
              </div>
            </div>

            {/* Misi Detektif Aktif Banner (Ketika belum selesai) */}
            {!foodChainComplete && (
              <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-2.5 sm:p-3 mb-3 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-7 h-7 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-black text-xs shrink-0 shadow-sm">
                    ?
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] font-black uppercase tracking-wider text-amber-800 block">
                      Target Urutan #{placedChainIds.length + 1}
                    </span>
                    <p className="text-xs sm:text-sm font-black text-slate-900 truncate">
                      {activeEcosystem.chain[placedChainIds.length]?.mysteryHint}
                    </p>
                  </div>
                </div>
                <span className="text-[11px] font-bold text-amber-900 shrink-0 bg-amber-200/80 px-2 py-0.5 rounded-full border border-amber-300">
                  {placedChainIds.length} / {activeEcosystem.chain.length} Terpasang
                </span>
              </div>
            )}

            {/* Error Feedback jika anak salah memilih kartu */}
            {chainErrorFeedback && (
              <div className="p-3 rounded-2xl border-2 bg-rose-50 border-rose-300 text-rose-900 mb-3 flex items-center gap-2.5 animate-pulse">
                <div className="w-7 h-7 rounded-xl bg-rose-500 text-white border border-rose-600 flex items-center justify-center shrink-0">
                  <AlertTriangle className="w-4 h-4" />
                </div>
                <p className="text-xs sm:text-sm font-black leading-snug">
                  {chainErrorFeedback}
                </p>
              </div>
            )}

            {/* Papan Alur Rantai Makanan (Background Ilustrasi WebP dengan Lingkaran Interaktif) */}
            <div className={`relative w-full aspect-[1024/571] rounded-3xl overflow-hidden border-2 border-slate-200 shadow-lg mb-4 select-none ${
              selectedEcosystemId === "sawah" ? "bg-emerald-100" : "bg-sky-900"
            }`}>
              {/* Latar Belakang Gambar WebP Sesuai Ekosistem */}
              <img
                key={selectedEcosystemId}
                src={selectedEcosystemId === "sawah" ? "/images/foodchain/sawah.webp?v=2" : "/images/foodchain/laut.webp?v=2"}
                alt={`Papan Rantai Makanan ${activeEcosystem.name}`}
                loading="eager"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover pointer-events-none transition-opacity duration-300"
              />

              {/* Overlay Efek Krisis pada Papan jika simulasi aktif */}
              {activeCrisisId && !crisisResolved && (
                <div className="absolute inset-0 bg-red-950/25 pointer-events-none z-[4] backdrop-contrast-125" />
              )}

              {/* Garis Aliran Energi Antar-Slot (SVG Connecting Energy Flow) */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-[5]">
                <defs>
                  <filter id="chainEnergyGlow" x="-30%" y="-30%" width="160%" height="160%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>
                {activeEcosystem.chain.map((_, idx) => {
                  if (idx === activeEcosystem.chain.length - 1) return null;
                  const p1 = FOODCHAIN_COORDINATES[selectedEcosystemId][idx];
                  const p2 = FOODCHAIN_COORDINATES[selectedEcosystemId][idx + 1];
                  if (!p1 || !p2) return null;

                  const isFlowConnected = idx < placedChainIds.length - 1;
                  const isFlowBroken = Boolean(activeCrisisId && !crisisResolved);

                  return (
                    <line
                      key={`flow-line-${idx}`}
                      x1={p1.left}
                      y1={p1.top}
                      x2={p2.left}
                      y2={p2.top}
                      stroke={
                        isFlowBroken && isFlowConnected
                          ? "#ef4444"
                          : isFlowConnected
                          ? "#22c55e"
                          : "rgba(255, 255, 255, 0.28)"
                      }
                      strokeWidth={isFlowConnected ? "4" : "2"}
                      strokeDasharray={isFlowConnected ? "6,4" : "4,4"}
                      filter={isFlowConnected ? "url(#chainEnergyGlow)" : undefined}
                      className={isFlowConnected ? "animate-pulse" : ""}
                    />
                  );
                })}
              </svg>

              {/* Slot Lingkaran Interaktif Berbasis Koordinat Persentase */}
              {activeEcosystem.chain.map((item, idx) => {
                const isPlaced = idx < placedChainIds.length;
                const isNextTarget = idx === placedChainIds.length;
                const placedItem = isPlaced
                  ? activeEcosystem.chain.find((c) => c.id === placedChainIds[idx]) || item
                  : null;
                const PlacedSvg = placedItem ? placedItem.SvgComponent : null;
                const coords = FOODCHAIN_COORDINATES[selectedEcosystemId][idx] || { left: "50%", top: "50%" };

                // Deteksi efek krisis pada slot ini
                const currentCrisis = CRISIS_SCENARIOS.find((c) => c.id === activeCrisisId);
                const isCrisisActive = Boolean(activeCrisisId && !crisisResolved);
                const isDirectlyStruck = isCrisisActive && currentCrisis?.affectedSlotIndex === idx;
                const impactBadge = isCrisisActive ? currentCrisis?.impactBadges.find((b) => b.slotIdx === idx) : null;
                const isCurrentBurst = actionBurst?.index === idx;

                return (
                  <div
                    key={item.id}
                    style={{ left: coords.left, top: coords.top }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center z-10"
                  >
                    {/* Comic Burst "HAP!" Action Animation */}
                    {isCurrentBurst && (
                      <div className="absolute -top-10 sm:-top-12 z-30 animate-bounce pointer-events-none whitespace-nowrap">
                        <div className="px-2.5 py-1 rounded-xl bg-amber-400 text-slate-950 font-black text-[9px] sm:text-xs shadow-2xl border-2 border-amber-600 flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-amber-900" />
                          <span>{actionBurst.text}</span>
                        </div>
                      </div>
                    )}

                    {/* Warning badge saat krisis melanda slot */}
                    {impactBadge && (
                      <div className="absolute -top-6 sm:-top-7 z-25 pointer-events-none whitespace-nowrap animate-bounce">
                        <span className={`px-1.5 py-0.5 rounded-full text-[7px] sm:text-[9px] font-black shadow border border-white/40 ${impactBadge.color}`}>
                          {impactBadge.text}
                        </span>
                      </div>
                    )}

                    {isPlaced && PlacedSvg && placedItem ? (
                      /* Slot Terisi (Organisme Muncul) */
                      <div
                        className={`relative w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full bg-white/95 border-2 sm:border-3 shadow-xl flex items-center justify-center p-1 sm:p-2 transition-all duration-300 transform scale-100 ${
                          isDirectlyStruck
                            ? "border-red-600 ring-4 ring-red-500 ring-offset-2 ring-offset-black/50 animate-pulse bg-red-50"
                            : placedItem.borderColor
                        } ${
                          foodChainComplete && !isCrisisActive
                            ? "ring-4 ring-emerald-400 ring-offset-2 ring-offset-black/50"
                            : ""
                        }`}
                      >
                        <div className={`w-full h-full flex items-center justify-center ${isDirectlyStruck ? "opacity-35 grayscale" : ""}`}>
                          <PlacedSvg />
                        </div>

                        {/* Indikator Silang Merah jika terkena krisis punah/rusak */}
                        {isDirectlyStruck && (
                          <div className="absolute inset-0 flex items-center justify-center bg-red-600/40 rounded-full">
                            <X className="w-6 h-6 sm:w-8 sm:h-8 text-white drop-shadow stroke-[3]" />
                          </div>
                        )}

                        {/* Label Nama Hewan / Tumbuhan */}
                        <span className={`absolute -bottom-4 sm:-bottom-5 px-1.5 sm:px-2 py-0.5 rounded-full text-[8px] sm:text-[10px] font-black whitespace-nowrap shadow-md pointer-events-none border border-white/20 ${
                          isDirectlyStruck ? "bg-red-700 text-white" : "bg-slate-900/90 text-white"
                        }`}>
                          {placedItem.name}
                        </span>
                      </div>
                    ) : isNextTarget ? (
                      /* Slot Target Aktif (Cincin Kuning Berdenyut & Mystery Hint) */
                      <div className="relative group">
                        <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full bg-amber-400/30 border-2 border-amber-300 ring-4 ring-amber-400 ring-offset-2 ring-offset-black/40 animate-pulse flex flex-col items-center justify-center shadow-lg">
                          <span className="text-white font-black text-sm sm:text-xl drop-shadow-md animate-bounce">
                            ?
                          </span>
                          <span className="absolute -bottom-4 sm:-bottom-5 px-1.5 py-0.5 rounded-full text-[7px] sm:text-[9px] font-black bg-amber-500 text-slate-950 whitespace-nowrap shadow border border-amber-300">
                            [ ? ] Target {idx + 1}
                          </span>
                        </div>
                      </div>
                    ) : (
                      /* Slot Terkunci (Belum Terisi, Zero-Spoiler [ ? ]) */
                      <div className="w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-slate-950/45 border border-white/30 backdrop-blur-[1px] flex items-center justify-center shadow-inner">
                        <span className="text-white/60 text-[10px] sm:text-xs font-black">
                          ?
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Kolam Kartu Pilihan Makhluk Hidup (Mode Detektif: Tanpa Spoiler Kategori) */}
            {!foodChainComplete ? (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs sm:text-sm font-black font-display text-slate-800">
                    Teliti Perilaku Alami Makhluk Hidup & Pilih Target #{placedChainIds.length + 1}:
                  </h4>
                  <span className="text-[11px] font-bold text-slate-500">
                    Tersisa: {availableCardIds.length} pilihan
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5 sm:gap-3">
                  {availableCardIds.map((cardId) => {
                    const org = activeEcosystem.chain.find((c) => c.id === cardId);
                    if (!org) return null;
                    const OrgSvg = org.SvgComponent;

                    return (
                      <button
                        key={org.id}
                        onClick={() => handleSelectOrganism(org.id)}
                        className={`p-3 rounded-2xl border-3 sm:border-4 flex flex-col items-center justify-between text-center btn-chunky cursor-pointer transition-all hover:scale-105 active:translate-y-1 ${org.bgColor} ${org.borderColor} shadow-[0_4px_0_0_rgba(0,0,0,0.06)]`}
                      >
                        <div className="my-1.5">
                          <OrgSvg />
                        </div>
                        <span className="font-black text-xs sm:text-sm text-slate-800 leading-tight">
                          {org.name}
                        </span>
                        <p className="mt-1.5 text-[10px] sm:text-[11px] text-slate-600 leading-snug">
                          {org.desc}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : (
              /* ========================================================================= */
              /* LABORATORIUM KRISIS EKOSISTEM (WHAT IF? MODE) SIMULASI KESEIMBANGAN ALAM  */
              /* ========================================================================= */
              <div className="space-y-4">
                {/* Header Laboratorium Krisis */}
                <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-4 rounded-3xl border-2 border-indigo-500 shadow-xl flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-black shadow-md shrink-0">
                      <AlertTriangle className="w-5 h-5 text-slate-950" />
                    </div>
                    <div>
                      <h4 className="text-sm sm:text-base font-black font-display text-white">
                        Laboratorium Krisis Ekosistem (What If? Mode)
                      </h4>
                      <p className="text-xs text-indigo-200">
                        Rantai seimbang sempurna! Uji simulasi apa yang terjadi jika salah satu rantai terputus:
                      </p>
                    </div>
                  </div>

                  <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400 text-emerald-300 text-xs font-black flex items-center gap-1.5 shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Rantai 5/5 Terhubung</span>
                  </span>
                </div>

                {/* Skenario Selector Tabs (2 Skenario Sesuai Ekosistem) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {CRISIS_SCENARIOS.filter((c) => c.ecosystemId === selectedEcosystemId).map((scenario) => {
                    const isSelected = activeCrisisId === scenario.id;
                    return (
                      <button
                        key={scenario.id}
                        onClick={() => handleSelectCrisis(scenario.id)}
                        className={`p-3 rounded-2xl border-2 transition-all btn-chunky flex items-center justify-between text-left ${
                          isSelected
                            ? "bg-amber-500 text-slate-950 border-amber-600 shadow-md ring-2 ring-amber-400"
                            : "bg-white text-slate-800 border-slate-200 hover:bg-slate-50"
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                            isSelected ? "bg-slate-950 text-amber-400" : "bg-slate-100 text-slate-700"
                          }`}>
                            {scenario.id === "ular_hilang" && <AlertTriangle className="w-4 h-4 text-amber-500" />}
                            {scenario.id === "kemarau_padi" && <CloudRain className="w-4 h-4 text-sky-500" />}
                            {scenario.id === "limbah_plastik" && <AlertTriangle className="w-4 h-4 text-rose-500" />}
                            {scenario.id === "overfishing_laut" && <Fish className="w-4 h-4 text-blue-500" />}
                          </div>
                          <div className="min-w-0">
                            <span className={`text-[10px] font-black uppercase tracking-wider block ${
                              isSelected ? "text-slate-900" : "text-slate-500"
                            }`}>
                              {scenario.badge}
                            </span>
                            <span className="text-xs sm:text-sm font-black truncate block">
                              {scenario.tabLabel}
                            </span>
                          </div>
                        </div>

                        <span className={`text-[10px] font-black px-2 py-0.5 rounded-full shrink-0 border ${
                          isSelected
                            ? "bg-slate-950 text-white border-black"
                            : "bg-slate-100 text-slate-600 border-slate-300"
                        }`}>
                          Uji Simulasi
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Detail Panel Krisis Aktif */}
                {(() => {
                  const currentScenario = CRISIS_SCENARIOS.find((c) => c.id === activeCrisisId);
                  if (!currentScenario) return null;

                  return (
                    <div className="bg-white rounded-3xl p-4 sm:p-6 border-2 border-slate-200 shadow-md space-y-4">
                      {/* Judul & Deskripsi Krisis */}
                      <div className="border-b border-slate-100 pb-3">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-rose-100 text-rose-800 border border-rose-300">
                            {currentScenario.badge}
                          </span>
                          <span className="text-xs text-slate-500 font-bold">
                            {selectedEcosystemId === "sawah" ? "Ekosistem Sawah" : "Ekosistem Laut"}
                          </span>
                        </div>
                        <h4 className="text-base sm:text-lg font-black text-slate-900">
                          {currentScenario.title}
                        </h4>
                      </div>

                      {/* Kotak Analisis Penyebab vs Dampak Domino */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                          <span className="font-black text-slate-500 uppercase text-[10px] tracking-wider block mb-1">
                            Pemicu Krisis:
                          </span>
                          <p className="font-bold text-slate-800 leading-relaxed">
                            {currentScenario.causeText}
                          </p>
                        </div>

                        <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200">
                          <span className="font-black text-rose-700 uppercase text-[10px] tracking-wider block mb-1">
                            Dampak Domino Ekologis:
                          </span>
                          <p className="font-bold text-rose-900 leading-relaxed">
                            {currentScenario.consequenceText}
                          </p>
                        </div>
                      </div>

                      {/* Penjelasan Edukasi Socrates dari Tobi */}
                      <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-300 flex items-start gap-3">
                        <div className="w-8 h-8 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center shrink-0 font-black shadow-sm">
                          <Volume2 className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <span className="text-[10px] font-black text-amber-900 uppercase tracking-wider block">
                            Catatan Sains Tobi:
                          </span>
                          <p className="text-xs sm:text-sm font-bold text-amber-950 leading-relaxed">
                            &ldquo;{currentScenario.socraticSpeech}&rdquo;
                          </p>
                        </div>
                      </div>

                      {/* Solusi & Pemulihan Ekosistem (Zero-Emoji Chunky Button) */}
                      {!crisisResolved ? (
                        <div className="pt-1 flex flex-col sm:flex-row items-center justify-between gap-3">
                          <div className="flex items-center gap-2 text-rose-700 text-xs font-bold">
                            <AlertTriangle className="w-4 h-4 shrink-0 text-rose-600 animate-pulse" />
                            <span>Krisis masih berlangsung! Pulihkan rantai makanan untuk menyelamatkan habitat.</span>
                          </div>

                          <button
                            onClick={handleResolveCrisis}
                            className="w-full sm:w-auto px-5 py-2.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xs sm:text-sm border-2 border-emerald-600 btn-chunky flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 shrink-0"
                          >
                            <CheckCircle2 className="w-4 h-4 text-emerald-200" />
                            <span>{currentScenario.actionButtonText}</span>
                            <span className="px-1.5 py-0.5 rounded-full bg-emerald-700/60 text-[10px] text-emerald-100 font-black border border-emerald-400">
                              +40 Bintang
                            </span>
                          </button>
                        </div>
                      ) : (
                        /* Status Sukses Pemulihan */
                        <div className="p-4 rounded-2xl bg-emerald-50 border-2 border-emerald-400 flex flex-col sm:flex-row items-center justify-between gap-3 animate-fadeIn">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-md">
                              <CheckCircle2 className="w-5 h-5" />
                            </div>
                            <div>
                              <div className="flex items-center gap-1.5">
                                <h5 className="font-black text-emerald-900 text-sm">
                                  Keseimbangan Ekosistem Berhasil Dipulihkan!
                                </h5>
                                <span className="px-2 py-0.5 rounded-full bg-emerald-200 text-emerald-900 text-[10px] font-black border border-emerald-300">
                                  +40 Bintang Diperoleh
                                </span>
                              </div>
                              <p className="text-xs text-emerald-800 font-bold mt-0.5 leading-snug">
                                {currentScenario.recoverySummary}
                              </p>
                            </div>
                          </div>

                          <button
                            onClick={() => {
                              sound.playChime();
                              if (audioEnabled) {
                                sound.speak(currentScenario.successSpeech);
                              }
                            }}
                            className="p-2 rounded-xl bg-white text-emerald-800 border border-emerald-300 text-xs font-black btn-chunky flex items-center gap-1.5 shrink-0"
                          >
                            <Volume2 className="w-4 h-4 text-emerald-600" />
                            <span>Dengar Ulasan</span>
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })()}

                {/* Navigasi Bawah: Mainkan Lagi / Ganti Ekosistem */}
                <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2">
                  <button
                    onClick={() => resetFoodChain(selectedEcosystemId)}
                    className="py-2 px-4 rounded-xl bg-white text-slate-800 font-black text-xs sm:text-sm border-2 border-slate-200 btn-chunky flex items-center gap-1.5 shadow-sm"
                  >
                    <Shuffle className="w-4 h-4 text-slate-600" />
                    <span>Acak Ulang Kartu</span>
                  </button>

                  <button
                    onClick={() => resetFoodChain(selectedEcosystemId === "sawah" ? "laut" : "sawah")}
                    className="py-2 px-4 rounded-xl bg-amber-400 text-amber-950 font-black text-xs sm:text-sm border-2 border-amber-500 btn-chunky flex items-center gap-1.5 shadow-sm"
                  >
                    <Sparkles className="w-4 h-4 text-amber-900" />
                    <span>
                      Jelajahi Ekosistem {selectedEcosystemId === "sawah" ? "Laut" : "Sawah"}
                    </span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: LABORATORIUM LISTRIK CILIK (FISIKA IPAS SD KELAS 6)                */}
        {/* ========================================================================= */}
        {activeTab === "circuits" && (
          <div className="space-y-4">
            {/* CSS Animation for Electron Flow Stream */}
            <style>{`
              @keyframes electronStreamMove {
                to {
                  stroke-dashoffset: -24;
                }
              }
              .animate-electron-stream {
                stroke-dasharray: 6 6;
                animation: electronStreamMove 0.8s linear infinite;
              }
            `}</style>

            {/* Top Mode Selector & Audio Explanation Bar */}
            <div className="bg-slate-100 rounded-2xl p-3 border border-slate-200 flex flex-wrap items-center justify-between gap-2.5">
              {/* Mode Buttons */}
              <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                <button
                  onClick={() => {
                    setCircuitMode("assembly");
                    sound.playChime();
                  }}
                  className={`px-3 py-1.5 rounded-xl font-black text-xs sm:text-sm border-2 transition-all btn-chunky flex items-center gap-1.5 ${
                    circuitMode === "assembly"
                      ? "bg-amber-500 text-slate-950 border-amber-600 shadow-[0_2px_0_0_#b45309]"
                      : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
                  }`}
                >
                  <Zap className="w-3.5 h-3.5 text-amber-950" />
                  <span>Rakit Sirkuit (Puzzle)</span>
                </button>

                <button
                  onClick={() => {
                    setCircuitMode("basic");
                    sound.playChime();
                  }}
                  className={`px-3 py-1.5 rounded-xl font-black text-xs sm:text-sm border-2 transition-all btn-chunky ${
                    circuitMode === "basic"
                      ? "bg-amber-500 text-slate-950 border-amber-600 shadow-[0_2px_0_0_#b45309]"
                      : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
                  }`}
                >
                  Rangkaian Dasar
                </button>

                <button
                  onClick={() => {
                    setCircuitMode("series");
                    sound.playChime();
                  }}
                  className={`px-3 py-1.5 rounded-xl font-black text-xs sm:text-sm border-2 transition-all btn-chunky ${
                    circuitMode === "series"
                      ? "bg-amber-500 text-slate-950 border-amber-600 shadow-[0_2px_0_0_#b45309]"
                      : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
                  }`}
                >
                  Rangkaian Seri
                </button>

                <button
                  onClick={() => {
                    setCircuitMode("parallel");
                    sound.playChime();
                  }}
                  className={`px-3 py-1.5 rounded-xl font-black text-xs sm:text-sm border-2 transition-all btn-chunky ${
                    circuitMode === "parallel"
                      ? "bg-amber-500 text-slate-950 border-amber-600 shadow-[0_2px_0_0_#b45309]"
                      : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
                  }`}
                >
                  Rangkaian Paralel
                </button>
              </div>

              {/* Reward & Voice Guide */}
              <div className="flex items-center gap-2">
                <span className="text-[11px] sm:text-xs font-black text-amber-900 bg-amber-100 px-2.5 py-1 rounded-full border border-amber-300 flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  +45 Bintang Tiap Misi
                </span>

                <button
                  onClick={handleSpeakCircuitExplanation}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-amber-50 text-slate-800 text-xs font-bold border border-slate-300 shadow-sm btn-chunky"
                  title="Dengarkan penjelasan Tobi"
                >
                  <Volume2 className="w-4 h-4 text-amber-600" />
                  <span className="hidden sm:inline">Dengarkan Tobi</span>
                </button>
              </div>
            </div>

            {/* Papan Sirkuit Listrik Interaktif (Pure SVG Canvas) */}
            <div className="bg-slate-950 rounded-3xl p-3 sm:p-5 border-4 border-slate-800 shadow-xl relative overflow-hidden">
              {/* Header Status di Atas Papan Sirkuit */}
              <div className="flex items-center justify-between gap-2 mb-3 px-1">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-yellow-400" />
                  <span className="text-xs font-black tracking-wider text-slate-300 uppercase">
                    Papan Sirkuit Fisika Cilik (Tegangan DC 1.5V)
                  </span>
                </div>

                {/* Status Rangkaian */}
                <div>
                  {circuitMode === "assembly" && (
                    <span
                      className={`text-[11px] font-black px-2.5 py-0.5 rounded-full border flex items-center gap-1 ${
                        isAssemblyLit
                          ? "bg-emerald-950 text-emerald-300 border-emerald-500 animate-pulse"
                          : !isAssemblyComplete
                          ? "bg-amber-950/90 text-amber-300 border-amber-600"
                          : assemblySwitchClosed && !isAssemblyConducting
                          ? "bg-rose-950/90 text-rose-300 border-rose-600"
                          : "bg-slate-900 text-slate-400 border-slate-700"
                      }`}
                    >
                      <CheckCircle2 className="w-3 h-3" />
                      {isAssemblyLit
                        ? "Sirkuit Tertutup Aktif (Elektron Mengalir)"
                        : !isAssemblyComplete
                        ? "Rangkaian Belum Lengkap"
                        : assemblySwitchClosed && !isAssemblyConducting
                        ? "Arus Terputus (Isolator Karet)"
                        : "Sirkuit Terbuka (Lampu Padam)"}
                    </span>
                  )}
                  {circuitMode === "basic" && (
                    <span
                      className={`text-[11px] font-black px-2.5 py-0.5 rounded-full border flex items-center gap-1 ${
                        basicSwitch
                          ? "bg-emerald-950 text-emerald-300 border-emerald-500 animate-pulse"
                          : "bg-slate-900 text-slate-400 border-slate-700"
                      }`}
                    >
                      <CheckCircle2 className="w-3 h-3" />
                      {basicSwitch ? "Sirkuit Tertutup (Lampu ON)" : "Sirkuit Terbuka (Lampu OFF)"}
                    </span>
                  )}

                  {circuitMode === "series" && (
                    <span
                      className={`text-[11px] font-black px-2.5 py-0.5 rounded-full border flex items-center gap-1 ${
                        seriesSwitch && bulbAAttached && bulbBAttached
                          ? "bg-emerald-950 text-emerald-300 border-emerald-500 animate-pulse"
                          : "bg-slate-900 text-slate-400 border-slate-700"
                      }`}
                    >
                      <CheckCircle2 className="w-3 h-3" />
                      {seriesSwitch && bulbAAttached && bulbBAttached
                        ? "Seri Menyala Bersama"
                        : "Sirkuit Seri Terputus"}
                    </span>
                  )}

                  {circuitMode === "parallel" && (
                    <span
                      className={`text-[11px] font-black px-2.5 py-0.5 rounded-full border flex items-center gap-1 ${
                        parallelSwitchA || parallelSwitchB
                          ? "bg-emerald-950 text-emerald-300 border-emerald-500"
                          : "bg-slate-900 text-slate-400 border-slate-700"
                      }`}
                    >
                      <CheckCircle2 className="w-3 h-3" />
                      {parallelSwitchA && parallelSwitchB
                        ? "Kedua Cabang Aktif"
                        : parallelSwitchA
                        ? "Cabang 1 Aktif"
                        : parallelSwitchB
                        ? "Cabang 2 Aktif"
                        : "Semua Saklar Terbuka"}
                    </span>
                  )}
                </div>
              </div>

              {/* ============================================================== */}
              {/* SVG DIAGRAM WAHANA RAKIT SIRKUIT (CIRCUIT ASSEMBLY PUZZLE)    */}
              {/* ============================================================== */}
              {circuitMode === "assembly" && (
                <div className="w-full flex items-center justify-center">
                  <svg
                    viewBox="0 0 600 320"
                    className="w-full h-auto max-h-[300px] sm:max-h-[340px] select-none"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <defs>
                      <radialGradient id="assemblyBulbGlowGrad" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#fef08a" stopOpacity="0.95" />
                        <stop offset="45%" stopColor="#facc15" stopOpacity="0.6" />
                        <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
                      </radialGradient>
                      <linearGradient id="assemblyBattGrad" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#1e3a8a" />
                        <stop offset="50%" stopColor="#2563eb" />
                        <stop offset="100%" stopColor="#1d4ed8" />
                      </linearGradient>
                    </defs>

                    {/* Canvas Background */}
                    <rect width="600" height="320" rx="20" fill="#0f172a" />
                    <circle cx="20" cy="20" r="5" fill="#334155" stroke="#1e293b" strokeWidth="1.5" />
                    <circle cx="580" cy="20" r="5" fill="#334155" stroke="#1e293b" strokeWidth="1.5" />
                    <circle cx="20" cy="300" r="5" fill="#334155" stroke="#1e293b" strokeWidth="1.5" />
                    <circle cx="580" cy="300" r="5" fill="#334155" stroke="#1e293b" strokeWidth="1.5" />

                    {/* Wire Base / Electron Flow */}
                    {assemblySlots.wires ? (
                      <>
                        <path
                          d="M 215 260 L 90 260 L 90 200"
                          stroke={isAssemblyLit ? "#60a5fa" : "#3b82f6"}
                          strokeWidth="6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M 90 120 L 90 55 L 210 55"
                          stroke={isAssemblyLit ? "#facc15" : "#eab308"}
                          strokeWidth="6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M 390 55 L 510 55 L 510 120"
                          stroke={isAssemblyLit ? "#facc15" : "#f97316"}
                          strokeWidth="6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M 510 200 L 510 260 L 385 260"
                          stroke={isAssemblyLit ? "#f87171" : "#ef4444"}
                          strokeWidth="6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />

                        {isAssemblyLit && (
                          <>
                            <path
                              d="M 215 260 L 90 260 L 90 200 M 90 120 L 90 55 L 210 55 M 390 55 L 510 55 L 510 120 M 510 200 L 510 260 L 385 260"
                              stroke="#fef08a"
                              strokeWidth="3.5"
                              fill="none"
                              className="animate-electron-stream"
                            />
                            {assemblyTestItem === "wire" && (
                              <line x1="210" y1="55" x2="390" y2="55" stroke="#fef08a" strokeWidth="3" className="animate-electron-stream" />
                            )}
                            {assemblyTestItem === "paperclip" && (
                              <path d="M 210 55 L 390 55" stroke="#fef08a" strokeWidth="3" className="animate-electron-stream" />
                            )}
                          </>
                        )}
                      </>
                    ) : (
                      <path
                        d="M 215 260 L 90 260 L 90 200 M 90 120 L 90 55 L 210 55 M 390 55 L 510 55 L 510 120 M 510 200 L 510 260 L 385 260"
                        stroke="#334155"
                        strokeWidth="3"
                        strokeDasharray="6 6"
                        strokeLinecap="round"
                        fill="none"
                      />
                    )}

                    {/* 1. SLOT BATERAI DC 1.5V */}
                    {assemblySlots.battery ? (
                      <g onClick={() => handleToggleAssemblySlot("battery")} className="cursor-pointer group">
                        <rect x="210" y="247" width="10" height="26" rx="2" fill="#94a3b8" />
                        <text x="200" y="264" fill="#94a3b8" fontSize="14" fontWeight="bold" textAnchor="middle">-</text>
                        <rect x="220" y="238" width="150" height="44" rx="8" fill="url(#assemblyBattGrad)" stroke="#38bdf8" strokeWidth="2" />
                        <text x="295" y="261" fill="#ffffff" fontSize="13" fontWeight="900" textAnchor="middle" letterSpacing="1">1.5V DC</text>
                        <text x="295" y="274" fill="#93c5fd" fontSize="8" fontWeight="bold" textAnchor="middle">BATERAI PRIMER</text>
                        <rect x="370" y="246" width="15" height="28" rx="3" fill="#facc15" stroke="#b45309" strokeWidth="1.5" />
                        <text x="398" y="264" fill="#facc15" fontSize="14" fontWeight="bold" textAnchor="middle">+</text>
                      </g>
                    ) : (
                      <g onClick={() => handleToggleAssemblySlot("battery")} className="cursor-pointer group">
                        <rect x="210" y="235" width="180" height="50" rx="10" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" strokeDasharray="5 5" opacity="0.7" className="group-hover:opacity-100 transition-opacity" />
                        <text x="300" y="265" fill="#38bdf8" fontSize="11" fontWeight="900" textAnchor="middle">
                          + PASANG BATERAI 1.5V
                        </text>
                      </g>
                    )}

                    {/* 2. SLOT SAKLAR PISAU */}
                    {assemblySlots.switch ? (
                      <g onClick={handleToggleAssemblySwitch} className="cursor-pointer group">
                        <rect x="65" y="110" width="50" height="100" rx="6" fill="#78350f" stroke="#451a03" strokeWidth="2" />
                        <circle cx="90" cy="125" r="7" fill="#d97706" stroke="#92400e" strokeWidth="1.5" />
                        <circle cx="90" cy="195" r="7" fill="#d97706" stroke="#92400e" strokeWidth="1.5" />

                        {assemblySwitchClosed ? (
                          <>
                            <line x1="90" y1="195" x2="90" y2="125" stroke="#4ade80" strokeWidth="7" strokeLinecap="round" />
                            <circle cx="90" cy="125" r="8" fill="#16a34a" stroke="#14532d" strokeWidth="1.5" />
                            <text x="40" y="160" fill="#4ade80" fontSize="10" fontWeight="900" textAnchor="middle">ON</text>
                          </>
                        ) : (
                          <>
                            <line x1="90" y1="195" x2="60" y2="135" stroke="#f59e0b" strokeWidth="7" strokeLinecap="round" />
                            <circle cx="60" cy="135" r="8" fill="#dc2626" stroke="#991b1b" strokeWidth="1.5" />
                            <text x="40" y="160" fill="#f87171" fontSize="10" fontWeight="900" textAnchor="middle">OFF</text>
                          </>
                        )}
                        <text x="90" y="222" fill="#cbd5e1" fontSize="9" fontWeight="bold" textAnchor="middle">SAKLAR PISAU</text>
                      </g>
                    ) : (
                      <g onClick={() => handleToggleAssemblySlot("switch")} className="cursor-pointer group">
                        <rect x="60" y="110" width="60" height="100" rx="10" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" strokeDasharray="5 5" opacity="0.7" className="group-hover:opacity-100 transition-opacity" />
                        <text x="90" y="155" fill="#38bdf8" fontSize="10" fontWeight="900" textAnchor="middle">+ PASANG</text>
                        <text x="90" y="170" fill="#38bdf8" fontSize="10" fontWeight="900" textAnchor="middle">SAKLAR</text>
                      </g>
                    )}

                    {/* 3. CELAH UJI MATERIAL KONDUKTOR/ISOLATOR */}
                    <g className="cursor-pointer">
                      <circle cx="210" cy="55" r="8" fill="#d97706" stroke="#92400e" strokeWidth="2" />
                      <circle cx="390" cy="55" r="8" fill="#d97706" stroke="#92400e" strokeWidth="2" />

                      {assemblyTestItem === "wire" && (
                        <>
                          <line x1="210" y1="55" x2="390" y2="55" stroke="#f59e0b" strokeWidth="8" strokeLinecap="round" />
                          <line x1="210" y1="55" x2="390" y2="55" stroke="#fde047" strokeWidth="2" strokeLinecap="round" />
                          <text x="300" y="38" fill="#facc15" fontSize="10" fontWeight="900" textAnchor="middle">
                            KAWAT TEMBAGA (KONDUKTOR)
                          </text>
                        </>
                      )}

                      {assemblyTestItem === "paperclip" && (
                        <>
                          <path
                            d="M 220 55 L 380 55"
                            stroke="#cbd5e1"
                            strokeWidth="8"
                            strokeLinecap="round"
                          />
                          <path
                            d="M 230 48 L 370 48 C 385 48 385 62 370 62 L 240 62 C 225 62 225 50 240 50 L 360 50"
                            stroke="#94a3b8"
                            strokeWidth="3.5"
                            fill="none"
                            strokeLinecap="round"
                          />
                          <text x="300" y="38" fill="#93c5fd" fontSize="10" fontWeight="900" textAnchor="middle">
                            KLIP KERTAS LOGAM (KONDUKTOR)
                          </text>
                        </>
                      )}

                      {assemblyTestItem === "eraser" && (
                        <>
                          <rect x="260" y="40" width="80" height="30" rx="4" fill="#f472b6" stroke="#db2777" strokeWidth="2" />
                          <rect x="260" y="40" width="40" height="30" rx="2" fill="#38bdf8" stroke="#0284c7" strokeWidth="1" />
                          <line x1="218" y1="55" x2="255" y2="55" stroke="#475569" strokeWidth="2" strokeDasharray="3 3" />
                          <line x1="345" y1="55" x2="382" y2="55" stroke="#475569" strokeWidth="2" strokeDasharray="3 3" />
                          <text x="300" y="32" fill="#f87171" fontSize="10" fontWeight="900" textAnchor="middle">
                            PENGHAPUS KARET (ISOLATOR)
                          </text>
                          <text x="300" y="86" fill="#fca5a5" fontSize="8" fontWeight="bold" textAnchor="middle">
                            CELAH TERPUTUS (TIDAK MENGHANTAR LISTRIK)
                          </text>
                        </>
                      )}
                    </g>

                    {/* 4. SLOT BOHLAM PIJAR */}
                    {assemblySlots.bulb ? (
                      <g onClick={() => handleToggleAssemblySlot("bulb")} className="cursor-pointer group">
                        {isAssemblyLit ? (
                          <>
                            <circle cx="510" cy="140" r="54" fill="url(#assemblyBulbGlowGrad)" opacity="0.9" />
                            <line x1="470" y1="100" x2="458" y2="88" stroke="#fde047" strokeWidth="2.5" strokeLinecap="round" />
                            <line x1="550" y1="100" x2="562" y2="88" stroke="#fde047" strokeWidth="2.5" strokeLinecap="round" />
                            <line x1="510" y1="85" x2="510" y2="70" stroke="#fde047" strokeWidth="2.5" strokeLinecap="round" />
                            <line x1="455" y1="140" x2="440" y2="140" stroke="#fde047" strokeWidth="2.5" strokeLinecap="round" />
                            <line x1="565" y1="140" x2="580" y2="140" stroke="#fde047" strokeWidth="2.5" strokeLinecap="round" />
                            <path d="M 496 160 C 490 152 486 142 486 132 C 486 118 497 108 510 108 C 523 108 534 118 534 132 C 534 142 530 152 524 160 Z" fill="#fef08a" stroke="#f59e0b" strokeWidth="2.5" />
                            <path d="M 503 158 L 507 132 L 513 132 L 517 158" fill="none" stroke="#ea580c" strokeWidth="2.5" strokeLinecap="round" />
                            <text x="510" y="215" fill="#facc15" fontSize="9" fontWeight="900" textAnchor="middle">
                              LAMPU MENYALA
                            </text>
                          </>
                        ) : (
                          <>
                            <path d="M 496 160 C 490 152 486 142 486 132 C 486 118 497 108 510 108 C 523 108 534 118 534 132 C 534 142 530 152 524 160 Z" fill="#1e293b" stroke="#64748b" strokeWidth="2" opacity="0.8" />
                            <path d="M 503 158 L 507 132 L 513 132 L 517 158" fill="none" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" />
                            <text x="510" y="215" fill="#64748b" fontSize="9" fontWeight="bold" textAnchor="middle">
                              LAMPU PADAM
                            </text>
                          </>
                        )}
                        <rect x="498" y="160" width="24" height="20" rx="2" fill="#94a3b8" stroke="#475569" strokeWidth="1.5" />
                        <line x1="498" y1="167" x2="522" y2="167" stroke="#475569" strokeWidth="1.5" />
                        <line x1="498" y1="174" x2="522" y2="174" stroke="#475569" strokeWidth="1.5" />
                      </g>
                    ) : (
                      <g onClick={() => handleToggleAssemblySlot("bulb")} className="cursor-pointer group">
                        <circle cx="510" cy="140" r="38" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" strokeDasharray="5 5" opacity="0.7" className="group-hover:opacity-100 transition-opacity" />
                        <text x="510" y="137" fill="#38bdf8" fontSize="10" fontWeight="900" textAnchor="middle">+ PASANG</text>
                        <text x="510" y="152" fill="#38bdf8" fontSize="10" fontWeight="900" textAnchor="middle">BOHLAM</text>
                      </g>
                    )}
                  </svg>
                </div>
              )}

              {/* ============================================================== */}
              {/* SVG DIAGRAM MODE 1: RANGKAIAN DASAR (SEDERHANA)               */}
              {/* ============================================================== */}
              {circuitMode === "basic" && (
                <div className="w-full flex items-center justify-center">
                  <svg
                    viewBox="0 0 600 300"
                    className="w-full h-auto max-h-[290px] sm:max-h-[330px] select-none"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <defs>
                      <radialGradient id="bulbGlowGrad1" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#fef08a" stopOpacity="0.9" />
                        <stop offset="40%" stopColor="#facc15" stopOpacity="0.5" />
                        <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
                      </radialGradient>
                      <linearGradient id="battGrad1" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#1e3a8a" />
                        <stop offset="50%" stopColor="#2563eb" />
                        <stop offset="100%" stopColor="#1d4ed8" />
                      </linearGradient>
                      <linearGradient id="goldCapGrad1" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#fef08a" />
                        <stop offset="100%" stopColor="#d97706" />
                      </linearGradient>
                    </defs>

                    {/* Canvas Background Texture */}
                    <rect width="600" height="300" rx="20" fill="#0f172a" />

                    {/* Wire Base (Tembaga) */}
                    <path
                      d="M 90 94 L 90 50 L 230 50 M 310 50 L 510 50 L 510 120 M 510 178 L 510 250 L 90 250 L 90 201"
                      stroke={basicSwitch ? "#f59e0b" : "#475569"}
                      strokeWidth="6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    {/* Animated Electron Stream (Saat Saklar Tertutup) */}
                    {basicSwitch && (
                      <path
                        d="M 90 94 L 90 50 L 230 50 L 310 50 L 510 50 L 510 120 M 510 178 L 510 250 L 90 250 L 90 201"
                        stroke="#fef08a"
                        strokeWidth="3"
                        fill="none"
                        className="animate-electron-stream"
                      />
                    )}

                    {/* Baterai 1.5V (Kiri) */}
                    <g>
                      {/* Body Baterai */}
                      <rect x="70" y="105" width="40" height="90" rx="6" fill="url(#battGrad1)" stroke="#334155" strokeWidth="2" />
                      {/* Tutup Kutub Positif (+) */}
                      <rect x="83" y="94" width="14" height="11" rx="2" fill="url(#goldCapGrad1)" stroke="#b45309" strokeWidth="1.5" />
                      <text x="90" y="86" fill="#facc15" fontSize="13" fontWeight="bold" textAnchor="middle">+</text>
                      {/* Alas Kutub Negatif (-) */}
                      <rect x="75" y="195" width="30" height="6" rx="1" fill="#94a3b8" />
                      <text x="90" y="217" fill="#94a3b8" fontSize="15" fontWeight="bold" textAnchor="middle">-</text>
                      {/* Label Baterai */}
                      <text x="90" y="148" fill="#ffffff" fontSize="11" fontWeight="900" textAnchor="middle" letterSpacing="1">1.5V</text>
                      <text x="90" y="163" fill="#93c5fd" fontSize="8" fontWeight="bold" textAnchor="middle">BATERAI</text>
                    </g>

                    {/* Saklar Pisau Fisika (Atas) - Interactive Click */}
                    <g onClick={handleToggleBasicSwitch} className="cursor-pointer group">
                      {/* Alas Kayu Saklar */}
                      <rect x="210" y="38" width="120" height="24" rx="4" fill="#78350f" stroke="#451a03" strokeWidth="1.5" />
                      {/* Terminal Kuningan Kiri & Kanan */}
                      <circle cx="230" cy="50" r="7" fill="#d97706" stroke="#92400e" strokeWidth="1.5" />
                      <circle cx="310" cy="50" r="7" fill="#d97706" stroke="#92400e" strokeWidth="1.5" />

                      {/* Bilah Saklar Pisau */}
                      {basicSwitch ? (
                        /* Saklar Tertutup (ON) */
                        <>
                          <line x1="230" y1="50" x2="310" y2="50" stroke="#f59e0b" strokeWidth="6" strokeLinecap="round" />
                          <circle cx="310" cy="50" r="8" fill="#dc2626" stroke="#991b1b" strokeWidth="1.5" />
                        </>
                      ) : (
                        /* Saklar Terbuka (OFF) */
                        <>
                          <line x1="230" y1="50" x2="295" y2="18" stroke="#d97706" strokeWidth="6" strokeLinecap="round" />
                          <circle cx="295" cy="18" r="8" fill="#dc2626" stroke="#991b1b" strokeWidth="1.5" />
                        </>
                      )}
                      <text 
                        x="270" 
                        y="74" 
                        fill={basicSwitch ? "#4ade80" : "#f87171"} 
                        fontSize="10" 
                        fontWeight="900" 
                        textAnchor="middle"
                      >
                        {basicSwitch ? "SAKLAR: ON (TERHUBUNG)" : "SAKLAR: OFF (TERBUKA)"}
                      </text>
                    </g>

                    {/* Lampu Bohlam Pijar (Kanan) */}
                    <g>
                      {basicSwitch ? (
                        /* Lampu Menyala Terang */
                        <>
                          {/* Pendar Sinar Kuning Emas */}
                          <circle cx="510" cy="140" r="50" fill="url(#bulbGlowGrad1)" opacity="0.85" />
                          {/* Garis Kilau Radiasi */}
                          <line x1="475" y1="105" x2="465" y2="95" stroke="#fde047" strokeWidth="2.5" strokeLinecap="round" />
                          <line x1="545" y1="105" x2="555" y2="95" stroke="#fde047" strokeWidth="2.5" strokeLinecap="round" />
                          <line x1="510" y1="90" x2="510" y2="78" stroke="#fde047" strokeWidth="2.5" strokeLinecap="round" />
                          <line x1="460" y1="140" x2="448" y2="140" stroke="#fde047" strokeWidth="2.5" strokeLinecap="round" />
                          <line x1="560" y1="140" x2="572" y2="140" stroke="#fde047" strokeWidth="2.5" strokeLinecap="round" />
                          {/* Kubah Kaca Menyala */}
                          <path d="M 496 160 C 490 152 486 142 486 132 C 486 118 497 108 510 108 C 523 108 534 118 534 132 C 534 142 530 152 524 160 Z" fill="#fef08a" stroke="#f59e0b" strokeWidth="2.5" />
                          {/* Filamen Pijar Membara */}
                          <path d="M 503 158 L 507 132 L 513 132 L 517 158" fill="none" stroke="#ea580c" strokeWidth="2.5" strokeLinecap="round" />
                          <text x="555" y="145" fill="#facc15" fontSize="11" fontWeight="900" textAnchor="start">
                            LAMPU MENYALA
                          </text>
                        </>
                      ) : (
                        /* Lampu Padam */
                        <>
                          {/* Kubah Kaca Padam */}
                          <path d="M 496 160 C 490 152 486 142 486 132 C 486 118 497 108 510 108 C 523 108 534 118 534 132 C 534 142 530 152 524 160 Z" fill="#1e293b" stroke="#64748b" strokeWidth="2" opacity="0.8" />
                          {/* Filamen Dingin */}
                          <path d="M 503 158 L 507 132 L 513 132 L 517 158" fill="none" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" />
                          <text x="555" y="145" fill="#64748b" fontSize="11" fontWeight="bold" textAnchor="start">
                            LAMPU MATI
                          </text>
                        </>
                      )}

                      {/* Fitting Dudukan Logam Berulir */}
                      <rect x="498" y="160" width="24" height="18" rx="2" fill="#94a3b8" stroke="#475569" strokeWidth="1.5" />
                      <line x1="498" y1="166" x2="522" y2="166" stroke="#475569" strokeWidth="1.5" />
                      <line x1="498" y1="172" x2="522" y2="172" stroke="#475569" strokeWidth="1.5" />
                    </g>
                  </svg>
                </div>
              )}

              {/* ============================================================== */}
              {/* SVG DIAGRAM MODE 2: RANGKAIAN SERI (2 LAMPU 1 JALUR)          */}
              {/* ============================================================== */}
              {circuitMode === "series" && (
                <div className="w-full flex items-center justify-center">
                  <svg
                    viewBox="0 0 600 320"
                    className="w-full h-auto max-h-[300px] sm:max-h-[340px] select-none"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <defs>
                      <radialGradient id="bulbGlowGrad2" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#fef08a" stopOpacity="0.85" />
                        <stop offset="50%" stopColor="#facc15" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
                      </radialGradient>
                    </defs>

                    <rect width="600" height="320" rx="20" fill="#0f172a" />

                    {/* Kondisi Nyala Seri: Saklar tertutup DAN kedua lampu terpasang */}
                    {(() => {
                      const isBothLit = seriesSwitch && bulbAAttached && bulbBAttached;
                      return (
                        <>
                          {/* Kawat Sirkuit Utama Seri */}
                          <path
                            d="M 90 94 L 90 50 L 195 50 M 275 50 L 510 50 L 510 95 M 510 145 L 510 185 M 510 235 L 510 270 L 90 270 L 90 201"
                            stroke={isBothLit ? "#f59e0b" : "#475569"}
                            strokeWidth="6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />

                          {/* Aliran Elektron Seri */}
                          {isBothLit && (
                            <path
                              d="M 90 94 L 90 50 L 195 50 L 275 50 L 510 50 L 510 95 L 510 145 L 510 185 L 510 235 L 510 270 L 90 270 L 90 201"
                              stroke="#fef08a"
                              strokeWidth="3"
                              fill="none"
                              className="animate-electron-stream"
                            />
                          )}

                          {/* Baterai 1.5V */}
                          <g>
                            <rect x="70" y="105" width="40" height="90" rx="6" fill="#1e40af" stroke="#334155" strokeWidth="2" />
                            <rect x="83" y="94" width="14" height="11" rx="2" fill="#facc15" stroke="#b45309" strokeWidth="1.5" />
                            <text x="90" y="86" fill="#facc15" fontSize="13" fontWeight="bold" textAnchor="middle">+</text>
                            <rect x="75" y="195" width="30" height="6" rx="1" fill="#94a3b8" />
                            <text x="90" y="217" fill="#94a3b8" fontSize="15" fontWeight="bold" textAnchor="middle">-</text>
                            <text x="90" y="148" fill="#ffffff" fontSize="11" fontWeight="900" textAnchor="middle">1.5V</text>
                            <text x="90" y="163" fill="#93c5fd" fontSize="8" fontWeight="bold" textAnchor="middle">BATERAI</text>
                          </g>

                          {/* Saklar Utama Seri */}
                          <g onClick={handleToggleSeriesSwitch} className="cursor-pointer">
                            <rect x="180" y="38" width="110" height="24" rx="4" fill="#78350f" stroke="#451a03" strokeWidth="1.5" />
                            <circle cx="195" cy="50" r="7" fill="#d97706" />
                            <circle cx="275" cy="50" r="7" fill="#d97706" />
                            {seriesSwitch ? (
                              <>
                                <line x1="195" y1="50" x2="275" y2="50" stroke="#f59e0b" strokeWidth="6" strokeLinecap="round" />
                                <circle cx="275" cy="50" r="8" fill="#dc2626" />
                              </>
                            ) : (
                              <>
                                <line x1="195" y1="50" x2="260" y2="18" stroke="#d97706" strokeWidth="6" strokeLinecap="round" />
                                <circle cx="260" cy="18" r="8" fill="#dc2626" />
                              </>
                            )}
                            <text 
                              x="235" 
                              y="74" 
                              fill={seriesSwitch ? "#4ade80" : "#f87171"} 
                              fontSize="10" 
                              fontWeight="900" 
                              textAnchor="middle"
                            >
                              {seriesSwitch ? "SAKLAR UTAMA: ON" : "SAKLAR UTAMA: OFF"}
                            </text>
                          </g>

                          {/* Lampu Seri 1 (Atas) */}
                          <g onClick={handleToggleBulbA} className="cursor-pointer">
                            {bulbAAttached ? (
                              <>
                                {isBothLit && <circle cx="510" cy="115" r="38" fill="url(#bulbGlowGrad2)" opacity="0.8" />}
                                <path
                                  d="M 498 132 C 493 125 490 117 490 110 C 490 98 499 90 510 90 C 521 90 530 98 530 110 C 530 117 527 125 522 132 Z"
                                  fill={isBothLit ? "#fef08a" : "#1e293b"}
                                  stroke={isBothLit ? "#f59e0b" : "#64748b"}
                                  strokeWidth="2"
                                />
                                <rect x="500" y="132" width="20" height="13" rx="2" fill="#94a3b8" />
                                <text x="545" y="115" fill={isBothLit ? "#facc15" : "#94a3b8"} fontSize="10" fontWeight="900">LAMPU 1</text>
                              </>
                            ) : (
                              /* Lampu 1 Dicopot/Rusak */
                              <>
                                <rect x="495" y="95" width="30" height="40" rx="6" fill="none" stroke="#ef4444" strokeWidth="2" strokeDasharray="4 4" />
                                <text x="510" y="120" fill="#ef4444" fontSize="9" fontWeight="900" textAnchor="middle">DICOPOT</text>
                                <text x="545" y="115" fill="#f87171" fontSize="10" fontWeight="900">LAMPU 1 (PUTUS)</text>
                              </>
                            )}
                          </g>

                          {/* Lampu Seri 2 (Bawah) */}
                          <g onClick={handleToggleBulbB} className="cursor-pointer">
                            {bulbBAttached ? (
                              <>
                                {isBothLit && <circle cx="510" cy="205" r="38" fill="url(#bulbGlowGrad2)" opacity="0.8" />}
                                <path
                                  d="M 498 222 C 493 215 490 207 490 200 C 490 188 499 180 510 180 C 521 180 530 188 530 200 C 530 207 527 215 522 222 Z"
                                  fill={isBothLit ? "#fef08a" : "#1e293b"}
                                  stroke={isBothLit ? "#f59e0b" : "#64748b"}
                                  strokeWidth="2"
                                />
                                <rect x="500" y="222" width="20" height="13" rx="2" fill="#94a3b8" />
                                <text x="545" y="205" fill={isBothLit ? "#facc15" : "#94a3b8"} fontSize="10" fontWeight="900">LAMPU 2</text>
                              </>
                            ) : (
                              /* Lampu 2 Dicopot/Rusak */
                              <>
                                <rect x="495" y="185" width="30" height="40" rx="6" fill="none" stroke="#ef4444" strokeWidth="2" strokeDasharray="4 4" />
                                <text x="510" y="210" fill="#ef4444" fontSize="9" fontWeight="900" textAnchor="middle">DICOPOT</text>
                                <text x="545" y="205" fill="#f87171" fontSize="10" fontWeight="900">LAMPU 2 (PUTUS)</text>
                              </>
                            )}
                          </g>
                        </>
                      );
                    })()}
                  </svg>
                </div>
              )}

              {/* ============================================================== */}
              {/* SVG DIAGRAM MODE 3: RANGKAIAN PARALEL (2 SAKLAR BERCABANG)    */}
              {/* ============================================================== */}
              {circuitMode === "parallel" && (
                <div className="w-full flex items-center justify-center">
                  <svg
                    viewBox="0 0 600 330"
                    className="w-full h-auto max-h-[300px] sm:max-h-[340px] select-none"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <defs>
                      <radialGradient id="bulbGlowGrad3" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#fef08a" stopOpacity="0.85" />
                        <stop offset="45%" stopColor="#facc15" stopOpacity="0.45" />
                        <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
                      </radialGradient>
                    </defs>

                    <rect width="600" height="330" rx="20" fill="#0f172a" />

                    {/* Rel Utama Baterai & Percabangan */}
                    <path
                      d="M 80 108 L 80 60 L 170 60 M 170 60 L 170 200 L 210 200 M 170 60 L 210 60"
                      stroke={parallelSwitchA || parallelSwitchB ? "#f59e0b" : "#475569"}
                      strokeWidth="6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    {/* Cabang 1 (Atas) */}
                    <path
                      d="M 290 60 L 460 60 L 460 75 M 460 115 L 460 125 L 530 125"
                      stroke={parallelSwitchA ? "#f59e0b" : "#475569"}
                      strokeWidth="6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {parallelSwitchA && (
                      <path
                        d="M 80 108 L 80 60 L 210 60 L 290 60 L 460 60 L 460 125 L 530 125 L 530 280 L 80 280 L 80 216"
                        stroke="#fef08a"
                        strokeWidth="3"
                        fill="none"
                        className="animate-electron-stream"
                      />
                    )}

                    {/* Cabang 2 (Bawah) */}
                    <path
                      d="M 290 200 L 460 200 L 460 215 M 460 255 L 460 265 L 530 265"
                      stroke={parallelSwitchB ? "#f59e0b" : "#475569"}
                      strokeWidth="6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {parallelSwitchB && (
                      <path
                        d="M 80 108 L 80 60 L 170 60 L 170 200 L 290 200 L 460 200 L 460 265 L 530 265 L 530 280 L 80 280 L 80 216"
                        stroke="#fef08a"
                        strokeWidth="3"
                        fill="none"
                        className="animate-electron-stream"
                      />
                    )}

                    {/* Rel Kembali Bersama (Bawah) */}
                    <path
                      d="M 530 125 L 530 280 L 80 280 L 80 216"
                      stroke={parallelSwitchA || parallelSwitchB ? "#f59e0b" : "#475569"}
                      strokeWidth="6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    {/* Titik Percabangan Node */}
                    <circle cx="170" cy="60" r="5" fill="#facc15" />
                    <circle cx="530" cy="265" r="5" fill="#facc15" />

                    {/* Baterai 1.5V */}
                    <g>
                      <rect x="60" y="118" width="40" height="90" rx="6" fill="#1e40af" stroke="#334155" strokeWidth="2" />
                      <rect x="73" y="107" width="14" height="11" rx="2" fill="#facc15" stroke="#b45309" strokeWidth="1.5" />
                      <text x="80" y="99" fill="#facc15" fontSize="13" fontWeight="bold" textAnchor="middle">+</text>
                      <rect x="65" y="208" width="30" height="6" rx="1" fill="#94a3b8" />
                      <text x="80" y="230" fill="#94a3b8" fontSize="15" fontWeight="bold" textAnchor="middle">-</text>
                      <text x="80" y="161" fill="#ffffff" fontSize="11" fontWeight="900" textAnchor="middle">1.5V</text>
                      <text x="80" y="176" fill="#93c5fd" fontSize="8" fontWeight="bold" textAnchor="middle">BATERAI</text>
                    </g>

                    {/* Saklar Cabang 1 (Atas) */}
                    <g onClick={handleToggleParallelSwitchA} className="cursor-pointer">
                      <rect x="210" y="48" width="90" height="24" rx="4" fill="#78350f" stroke="#451a03" strokeWidth="1.5" />
                      <circle cx="225" cy="60" r="6" fill="#d97706" />
                      <circle cx="285" cy="60" r="6" fill="#d97706" />
                      {parallelSwitchA ? (
                        <>
                          <line x1="225" y1="60" x2="285" y2="60" stroke="#f59e0b" strokeWidth="5" strokeLinecap="round" />
                          <circle cx="285" cy="60" r="7" fill="#dc2626" />
                        </>
                      ) : (
                        <>
                          <line x1="225" y1="60" x2="275" y2="35" stroke="#d97706" strokeWidth="5" strokeLinecap="round" />
                          <circle cx="275" cy="35" r="7" fill="#dc2626" />
                        </>
                      )}
                      <text 
                        x="255" 
                        y="84" 
                        fill={parallelSwitchA ? "#4ade80" : "#f87171"} 
                        fontSize="9" 
                        fontWeight="900" 
                        textAnchor="middle"
                      >
                        {parallelSwitchA ? "SAKLAR 1: ON" : "SAKLAR 1: OFF"}
                      </text>
                    </g>

                    {/* Lampu Cabang 1 (Atas) */}
                    <g>
                      {parallelSwitchA && <circle cx="460" cy="85" r="35" fill="url(#bulbGlowGrad3)" opacity="0.8" />}
                      <path
                        d="M 448 102 C 443 95 440 87 440 80 C 440 68 449 60 460 60 C 471 60 480 68 480 80 C 480 87 477 95 472 102 Z"
                        fill={parallelSwitchA ? "#fef08a" : "#1e293b"}
                        stroke={parallelSwitchA ? "#f59e0b" : "#64748b"}
                        strokeWidth="2"
                      />
                      <rect x="450" y="102" width="20" height="13" rx="2" fill="#94a3b8" />
                      <text 
                        x="495" 
                        y="85" 
                        fill={parallelSwitchA ? "#facc15" : "#64748b"} 
                        fontSize="10" 
                        fontWeight="900" 
                        textAnchor="start"
                      >
                        LAMPU 1 {parallelSwitchA ? "(ON)" : "(OFF)"}
                      </text>
                    </g>

                    {/* Saklar Cabang 2 (Bawah) */}
                    <g onClick={handleToggleParallelSwitchB} className="cursor-pointer">
                      <rect x="210" y="188" width="90" height="24" rx="4" fill="#78350f" stroke="#451a03" strokeWidth="1.5" />
                      <circle cx="225" cy="200" r="6" fill="#d97706" />
                      <circle cx="285" cy="200" r="6" fill="#d97706" />
                      {parallelSwitchB ? (
                        <>
                          <line x1="225" y1="200" x2="285" y2="200" stroke="#f59e0b" strokeWidth="5" strokeLinecap="round" />
                          <circle cx="285" cy="200" r="7" fill="#dc2626" />
                        </>
                      ) : (
                        <>
                          <line x1="225" y1="200" x2="275" y2="175" stroke="#d97706" strokeWidth="5" strokeLinecap="round" />
                          <circle cx="275" cy="175" r="7" fill="#dc2626" />
                        </>
                      )}
                      <text 
                        x="255" 
                        y="224" 
                        fill={parallelSwitchB ? "#4ade80" : "#f87171"} 
                        fontSize="9" 
                        fontWeight="900" 
                        textAnchor="middle"
                      >
                        {parallelSwitchB ? "SAKLAR 2: ON" : "SAKLAR 2: OFF"}
                      </text>
                    </g>

                    {/* Lampu Cabang 2 (Bawah) */}
                    <g>
                      {parallelSwitchB && <circle cx="460" cy="225" r="35" fill="url(#bulbGlowGrad3)" opacity="0.8" />}
                      <path
                        d="M 448 242 C 443 235 440 227 440 220 C 440 208 449 200 460 200 C 471 200 480 208 480 220 C 480 227 477 235 472 242 Z"
                        fill={parallelSwitchB ? "#fef08a" : "#1e293b"}
                        stroke={parallelSwitchB ? "#f59e0b" : "#64748b"}
                        strokeWidth="2"
                      />
                      <rect x="450" y="242" width="20" height="13" rx="2" fill="#94a3b8" />
                      <text 
                        x="495" 
                        y="225" 
                        fill={parallelSwitchB ? "#facc15" : "#64748b"} 
                        fontSize="10" 
                        fontWeight="900" 
                        textAnchor="start"
                      >
                        LAMPU 2 {parallelSwitchB ? "(ON)" : "(OFF)"}
                      </text>
                    </g>
                  </svg>
                </div>
              )}
            </div>

            {/* Mobile Touch-Friendly Chunky Control Buttons */}
            <div className="bg-white rounded-2xl p-4 border-2 border-slate-200 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase text-slate-500 tracking-wider">
                  Panel Kontrol Saklar & Komponen:
                </span>
                <span className="text-[11px] font-bold text-slate-400">
                  Sentuh tombol di bawah untuk menguji sirkuit
                </span>
              </div>

              {/* Controls Mode Assembly (Wahana Rakit Sirkuit) */}
              {circuitMode === "assembly" && (
                <div className="space-y-4">
                  {/* Status Guidance Banner */}
                  {!isAssemblyComplete && (
                    <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-3 flex items-center justify-between gap-2.5">
                      <div className="flex items-center gap-2">
                        <Info className="w-5 h-5 text-amber-600 flex-shrink-0" />
                        <p className="text-xs font-bold text-amber-900">
                          Rangkaian Belum Lengkap! Pasang semua komponen dari Kotak Perkakas di bawah ini untuk menyalakan lampu.
                        </p>
                      </div>
                    </div>
                  )}

                  {isAssemblyComplete && !assemblySwitchClosed && (
                    <div className="bg-slate-100 border-2 border-slate-300 rounded-2xl p-3 flex items-center justify-between gap-2.5">
                      <div className="flex items-center gap-2">
                        <Power className="w-5 h-5 text-slate-600 flex-shrink-0" />
                        <p className="text-xs font-bold text-slate-800">
                          Sirkuit Terbuka (Arus Terputus) - Lampu Padam. Tekan tombol saklar untuk menutup sirkuit!
                        </p>
                      </div>
                      <button
                        onClick={handleToggleAssemblySwitch}
                        className="px-3 py-1.5 rounded-xl bg-emerald-500 text-white font-black text-xs border border-emerald-600 shadow-sm btn-chunky flex items-center gap-1 shrink-0"
                      >
                        <Power className="w-3.5 h-3.5" />
                        <span>Tutup Saklar</span>
                      </button>
                    </div>
                  )}

                  {isAssemblyComplete && assemblySwitchClosed && !isAssemblyLit && (
                    <div className="bg-rose-50 border-2 border-rose-300 rounded-2xl p-3 flex items-center justify-between gap-2.5">
                      <div className="flex items-center gap-2">
                        <Info className="w-5 h-5 text-rose-600 flex-shrink-0" />
                        <p className="text-xs font-bold text-rose-900">
                          Arus Terputus oleh Penghapus Karet (Isolator)! Karet menghambat elektron. Ganti dengan bahan konduktor agar lampu menyala.
                        </p>
                      </div>
                    </div>
                  )}

                  {isAssemblyLit && (
                    <div className="bg-emerald-50 border-2 border-emerald-400 rounded-2xl p-3 flex items-center justify-between gap-2.5 animate-pulse">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                        <p className="text-xs font-black text-emerald-950">
                          Sirkuit Tertutup Aktif! Elektron Mengalir Sempurna menyalakan bohlam pijar!
                        </p>
                      </div>
                      <button
                        onClick={handleToggleAssemblySwitch}
                        className="px-3 py-1.5 rounded-xl bg-rose-500 text-white font-black text-xs border border-rose-600 shadow-sm btn-chunky flex items-center gap-1 shrink-0"
                      >
                        <Power className="w-3.5 h-3.5" />
                        <span>Buka Saklar</span>
                      </button>
                    </div>
                  )}

                  {/* Kotak Perkakas (Tap to Slot) */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-amber-600" />
                        <span className="text-xs font-black text-slate-800 uppercase tracking-wide">
                          Kotak Perkakas Komponen (Sentuh untuk Memasang):
                        </span>
                      </div>
                      <button
                        onClick={handleResetAssembly}
                        className="px-2.5 py-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[11px] border border-slate-300 flex items-center gap-1 btn-chunky"
                      >
                        <RotateCcw className="w-3 h-3 text-slate-600" />
                        <span>Reset Rakitan</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
                      {/* Komponen 1: Baterai DC */}
                      <div
                        onClick={() => handleToggleAssemblySlot("battery")}
                        className={`p-2.5 rounded-2xl border-2 cursor-pointer transition-all btn-chunky flex flex-col justify-between ${
                          assemblySlots.battery
                            ? "bg-emerald-50 border-emerald-400 shadow-[0_2px_0_0_#059669]"
                            : "bg-slate-50 border-slate-300 hover:border-slate-400"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <Zap className="w-4 h-4 text-amber-500" />
                          <span className={`text-[10px] font-black px-1.5 py-0.5 rounded-md ${
                            assemblySlots.battery ? "bg-emerald-200 text-emerald-900" : "bg-slate-200 text-slate-600"
                          }`}>
                            {assemblySlots.battery ? "Terpasang" : "Perkakas"}
                          </span>
                        </div>
                        <p className="text-xs font-black text-slate-800 leading-tight">Baterai DC (1.5V)</p>
                        <p className="text-[10px] text-slate-500 font-medium">Sumber energi listrik</p>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleToggleAssemblySlot("battery");
                          }}
                          className={`mt-2 py-1 px-2 rounded-xl text-[11px] font-black border flex items-center justify-center gap-1 btn-chunky ${
                            assemblySlots.battery
                              ? "bg-white text-rose-700 border-rose-300 hover:bg-rose-50"
                              : "bg-amber-400 text-amber-950 border-amber-500 shadow-sm"
                          }`}
                        >
                          {assemblySlots.battery ? "Lepas" : "Pasang"}
                        </button>
                      </div>

                      {/* Komponen 2: Saklar Pisau */}
                      <div
                        onClick={() => handleToggleAssemblySlot("switch")}
                        className={`p-2.5 rounded-2xl border-2 cursor-pointer transition-all btn-chunky flex flex-col justify-between ${
                          assemblySlots.switch
                            ? "bg-emerald-50 border-emerald-400 shadow-[0_2px_0_0_#059669]"
                            : "bg-slate-50 border-slate-300 hover:border-slate-400"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <Power className="w-4 h-4 text-emerald-600" />
                          <span className={`text-[10px] font-black px-1.5 py-0.5 rounded-md ${
                            assemblySlots.switch ? "bg-emerald-200 text-emerald-900" : "bg-slate-200 text-slate-600"
                          }`}>
                            {assemblySlots.switch ? "Terpasang" : "Perkakas"}
                          </span>
                        </div>
                        <p className="text-xs font-black text-slate-800 leading-tight">Saklar Pisau</p>
                        <p className="text-[10px] text-slate-500 font-medium">Pemutus & penyambung</p>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleToggleAssemblySlot("switch");
                          }}
                          className={`mt-2 py-1 px-2 rounded-xl text-[11px] font-black border flex items-center justify-center gap-1 btn-chunky ${
                            assemblySlots.switch
                              ? "bg-white text-rose-700 border-rose-300 hover:bg-rose-50"
                              : "bg-amber-400 text-amber-950 border-amber-500 shadow-sm"
                          }`}
                        >
                          {assemblySlots.switch ? "Lepas" : "Pasang"}
                        </button>
                      </div>

                      {/* Komponen 3: Bohlam Pijar */}
                      <div
                        onClick={() => handleToggleAssemblySlot("bulb")}
                        className={`p-2.5 rounded-2xl border-2 cursor-pointer transition-all btn-chunky flex flex-col justify-between ${
                          assemblySlots.bulb
                            ? "bg-emerald-50 border-emerald-400 shadow-[0_2px_0_0_#059669]"
                            : "bg-slate-50 border-slate-300 hover:border-slate-400"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <Lightbulb className="w-4 h-4 text-yellow-500" />
                          <span className={`text-[10px] font-black px-1.5 py-0.5 rounded-md ${
                            assemblySlots.bulb ? "bg-emerald-200 text-emerald-900" : "bg-slate-200 text-slate-600"
                          }`}>
                            {assemblySlots.bulb ? "Terpasang" : "Perkakas"}
                          </span>
                        </div>
                        <p className="text-xs font-black text-slate-800 leading-tight">Bohlam Pijar</p>
                        <p className="text-[10px] text-slate-500 font-medium">Pengubah energi cahaya</p>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleToggleAssemblySlot("bulb");
                          }}
                          className={`mt-2 py-1 px-2 rounded-xl text-[11px] font-black border flex items-center justify-center gap-1 btn-chunky ${
                            assemblySlots.bulb
                              ? "bg-white text-rose-700 border-rose-300 hover:bg-rose-50"
                              : "bg-amber-400 text-amber-950 border-amber-500 shadow-sm"
                          }`}
                        >
                          {assemblySlots.bulb ? "Lepas" : "Pasang"}
                        </button>
                      </div>

                      {/* Komponen 4: Kabel Merah & Biru */}
                      <div
                        onClick={() => handleToggleAssemblySlot("wires")}
                        className={`p-2.5 rounded-2xl border-2 cursor-pointer transition-all btn-chunky flex flex-col justify-between ${
                          assemblySlots.wires
                            ? "bg-emerald-50 border-emerald-400 shadow-[0_2px_0_0_#059669]"
                            : "bg-slate-50 border-slate-300 hover:border-slate-400"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <Shuffle className="w-4 h-4 text-sky-500" />
                          <span className={`text-[10px] font-black px-1.5 py-0.5 rounded-md ${
                            assemblySlots.wires ? "bg-emerald-200 text-emerald-900" : "bg-slate-200 text-slate-600"
                          }`}>
                            {assemblySlots.wires ? "Terpasang" : "Perkakas"}
                          </span>
                        </div>
                        <p className="text-xs font-black text-slate-800 leading-tight">2x Kabel (Merah/Biru)</p>
                        <p className="text-[10px] text-slate-500 font-medium">Jalur aliran elektron</p>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleToggleAssemblySlot("wires");
                          }}
                          className={`mt-2 py-1 px-2 rounded-xl text-[11px] font-black border flex items-center justify-center gap-1 btn-chunky ${
                            assemblySlots.wires
                              ? "bg-white text-rose-700 border-rose-300 hover:bg-rose-50"
                              : "bg-amber-400 text-amber-950 border-amber-500 shadow-sm"
                          }`}
                        >
                          {assemblySlots.wires ? "Lepas" : "Pasang"}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Eksperimen Bahan Celah Uji (Konduktor vs Isolator) */}
                  <div className="pt-2 border-t border-slate-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-black text-slate-800 uppercase tracking-wide">
                        Eksperimen Bahan: Celah Uji Konduktor vs Isolator
                      </span>
                      <span className="text-[11px] font-medium text-slate-500">
                        Uji benda penghantar listrik
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <button
                        onClick={() => handleSelectAssemblyTestItem("wire")}
                        className={`p-2.5 rounded-2xl border-2 font-black text-xs text-left transition-all btn-chunky flex items-center justify-between ${
                          assemblyTestItem === "wire"
                            ? "bg-amber-400 text-amber-950 border-amber-500 shadow-[0_2px_0_0_#b45309]"
                            : "bg-slate-50 text-slate-700 border-slate-300 hover:bg-slate-100"
                        }`}
                      >
                        <div>
                          <p className="font-black text-xs">Kawat Tembaga</p>
                          <span className="text-[10px] font-bold text-amber-900 block">Konduktor Listrik Normal</span>
                        </div>
                        {assemblyTestItem === "wire" && <Check className="w-4 h-4 text-amber-950" />}
                      </button>

                      <button
                        onClick={() => handleSelectAssemblyTestItem("paperclip")}
                        className={`p-2.5 rounded-2xl border-2 font-black text-xs text-left transition-all btn-chunky flex items-center justify-between ${
                          assemblyTestItem === "paperclip"
                            ? "bg-sky-400 text-sky-950 border-sky-500 shadow-[0_2px_0_0_#0284c7]"
                            : "bg-slate-50 text-slate-700 border-slate-300 hover:bg-slate-100"
                        }`}
                      >
                        <div>
                          <p className="font-black text-xs">Klip Kertas Logam</p>
                          <span className="text-[10px] font-bold text-sky-900 block">Konduktor Logam (Besi/Baja)</span>
                        </div>
                        {assemblyTestItem === "paperclip" && <Check className="w-4 h-4 text-sky-950" />}
                      </button>

                      <button
                        onClick={() => handleSelectAssemblyTestItem("eraser")}
                        className={`p-2.5 rounded-2xl border-2 font-black text-xs text-left transition-all btn-chunky flex items-center justify-between ${
                          assemblyTestItem === "eraser"
                            ? "bg-rose-400 text-rose-950 border-rose-500 shadow-[0_2px_0_0_#e11d48]"
                            : "bg-slate-50 text-slate-700 border-slate-300 hover:bg-slate-100"
                        }`}
                      >
                        <div>
                          <p className="font-black text-xs">Penghapus Karet</p>
                          <span className="text-[10px] font-bold text-rose-900 block">Isolator Listrik (Bukan Logam)</span>
                        </div>
                        {assemblyTestItem === "eraser" && <Check className="w-4 h-4 text-rose-950" />}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Controls Mode 1 */}
              {circuitMode === "basic" && (
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={handleToggleBasicSwitch}
                    className={`flex-1 min-w-[200px] py-3 px-4 rounded-2xl font-black text-sm sm:text-base border-3 flex items-center justify-center gap-2 btn-chunky transition-all ${
                      basicSwitch
                        ? "bg-emerald-500 text-white border-emerald-600 shadow-[0_4px_0_0_#065f46]"
                        : "bg-amber-400 text-amber-950 border-amber-500 shadow-[0_4px_0_0_#b45309]"
                    }`}
                  >
                    <Power className="w-5 h-5" />
                    <span>{basicSwitch ? "Buka Saklar (Matikan Lampu)" : "Tutup Saklar (Nyalakan Lampu)"}</span>
                  </button>
                </div>
              )}

              {/* Controls Mode 2 */}
              {circuitMode === "series" && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <button
                    onClick={handleToggleSeriesSwitch}
                    className={`py-3 px-3 rounded-2xl font-black text-xs sm:text-sm border-3 flex items-center justify-center gap-1.5 btn-chunky ${
                      seriesSwitch
                        ? "bg-emerald-500 text-white border-emerald-600 shadow-[0_3px_0_0_#065f46]"
                        : "bg-slate-200 text-slate-800 border-slate-400 shadow-[0_3px_0_0_#94a3b8]"
                    }`}
                  >
                    <Power className="w-4 h-4" />
                    <span>{seriesSwitch ? "Saklar Utama: ON" : "Saklar Utama: OFF"}</span>
                  </button>

                  <button
                    onClick={handleToggleBulbA}
                    className={`py-3 px-3 rounded-2xl font-black text-xs sm:text-sm border-3 flex items-center justify-center gap-1.5 btn-chunky ${
                      bulbAAttached
                        ? "bg-amber-400 text-amber-950 border-amber-500 shadow-[0_3px_0_0_#b45309]"
                        : "bg-rose-500 text-white border-rose-600 shadow-[0_3px_0_0_#9f1239]"
                    }`}
                  >
                    <Lightbulb className="w-4 h-4" />
                    <span>{bulbAAttached ? "Lampu 1: Terpasang" : "Lampu 1: Dicopot (Putus)"}</span>
                  </button>

                  <button
                    onClick={handleToggleBulbB}
                    className={`py-3 px-3 rounded-2xl font-black text-xs sm:text-sm border-3 flex items-center justify-center gap-1.5 btn-chunky ${
                      bulbBAttached
                        ? "bg-amber-400 text-amber-950 border-amber-500 shadow-[0_3px_0_0_#b45309]"
                        : "bg-rose-500 text-white border-rose-600 shadow-[0_3px_0_0_#9f1239]"
                    }`}
                  >
                    <Lightbulb className="w-4 h-4" />
                    <span>{bulbBAttached ? "Lampu 2: Terpasang" : "Lampu 2: Dicopot (Putus)"}</span>
                  </button>
                </div>
              )}

              {/* Controls Mode 3 */}
              {circuitMode === "parallel" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    onClick={handleToggleParallelSwitchA}
                    className={`py-3 px-4 rounded-2xl font-black text-xs sm:text-sm border-3 flex items-center justify-center gap-2 btn-chunky ${
                      parallelSwitchA
                        ? "bg-emerald-500 text-white border-emerald-600 shadow-[0_4px_0_0_#065f46]"
                        : "bg-slate-200 text-slate-800 border-slate-400 shadow-[0_4px_0_0_#94a3b8]"
                    }`}
                  >
                    <Power className="w-4 h-4" />
                    <span>{parallelSwitchA ? "Saklar Cabang 1: ON (Menyala)" : "Saklar Cabang 1: OFF (Mati)"}</span>
                  </button>

                  <button
                    onClick={handleToggleParallelSwitchB}
                    className={`py-3 px-4 rounded-2xl font-black text-xs sm:text-sm border-3 flex items-center justify-center gap-2 btn-chunky ${
                      parallelSwitchB
                        ? "bg-emerald-500 text-white border-emerald-600 shadow-[0_4px_0_0_#065f46]"
                        : "bg-slate-200 text-slate-800 border-slate-400 shadow-[0_4px_0_0_#94a3b8]"
                    }`}
                  >
                    <Power className="w-4 h-4" />
                    <span>{parallelSwitchB ? "Saklar Cabang 2: ON (Menyala)" : "Saklar Cabang 2: OFF (Mati)"}</span>
                  </button>
                </div>
              )}
            </div>

            {/* Catatan Konsep Edukatif IPAS SD Kelas 6 */}
            <div className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-2xl p-4 border-2 border-amber-200 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-200 text-amber-900 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Info className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="font-black text-sm text-slate-900 mb-1">
                    {circuitMode === "assembly" && "Konsep Sirkuit Terbuka vs Tertutup & Konduktor Listrik"}
                    {circuitMode === "basic" && "Konsep Rangkaian Dasar & Arus Listrik"}
                    {circuitMode === "series" && "Karakteristik Kunci Rangkaian Seri"}
                    {circuitMode === "parallel" && "Keunggulan Rangkaian Paralel di Rumah"}
                  </h5>
                  <p className="text-xs text-slate-700 leading-relaxed font-medium">
                    {circuitMode === "assembly" &&
                      "Arus listrik hanya dapat mengalir pada sirkuit tertutup tanpa celah udara. Saklar pisau berfungsi membuka atau menutup rangkaian secara fisik. Bahan konduktor (seperti kawat tembaga dan klip kertas logam) memiliki elektron bebas yang mudah mengalir, sedangkan bahan isolator (seperti karet dan kayu) menghambat aliran elektron sehingga lampu padam!"}
                    {circuitMode === "basic" &&
                      "Arus listrik hanya dapat mengalir pada rangkaian tertutup (sirkuit tanpa celah). Baterai berperan sebagai sumber energi listrik, sedangkan saklar berfungsi sebagai alat pemutus dan penyambung aliran elektron secara aman."}
                    {circuitMode === "series" &&
                      "Pada rangkaian seri, seluruh lampu dipasang secara berurutan dalam satu jalur kawat tunggal. Kelemahannya: jika salah satu lampu rusak atau dicopot, sirkuit langsung terbuka dan seluruh lampu lainnya otomatis ikut padam!"}
                    {circuitMode === "parallel" &&
                      "Pada rangkaian paralel, kawat listrik memiliki percabangan mandiri ke tiap lampu. Tiap cabang memiliki jalur arus sendiri, sehingga saat satu saklar dimatikan, lampu di cabang lain tetap menyala terang. Ini adalah jenis rangkaian yang digunakan pada instalasi listrik rumah tangga!"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 5: WAHANA MAGNET HUNTER (FISIKA KEMAGNETAN IPAS SD)                   */}
        {/* ========================================================================= */}
        {activeTab === "magnet" && (
          <div className="space-y-4">
            <style>{`
              @keyframes magnetShakeKeyframes {
                0%, 100% { transform: translateX(0) rotate(0deg); }
                20% { transform: translateX(-8px) rotate(-1.5deg); }
                40% { transform: translateX(8px) rotate(1.5deg); }
                60% { transform: translateX(-6px) rotate(-1deg); }
                80% { transform: translateX(6px) rotate(1deg); }
              }
              .animate-magnet-shake {
                animation: magnetShakeKeyframes 0.5s ease-in-out;
                transform-origin: center center;
              }
            `}</style>

            {/* Top Bar: Mission Progress, Star Reward, Audio Guide & Reset */}
            <div className="bg-slate-100 rounded-2xl p-3 border border-slate-200 flex flex-wrap items-center justify-between gap-2.5">
              <div className="flex items-center gap-2">
                <span className="text-xs sm:text-sm font-black text-slate-800 flex items-center gap-1.5">
                  <Magnet className="w-4 h-4 text-rose-500" />
                  <span>Benda Magnetik Terkumpul:</span>
                  <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 border border-rose-300 font-black">
                    {stuckMagnetIds.length} / 3
                  </span>
                </span>

                <span className="text-[11px] sm:text-xs font-black text-amber-900 bg-amber-100 px-2.5 py-1 rounded-full border border-amber-300 flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  +45 Bintang Misi
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleResetMagnetHunter}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 text-xs font-bold border border-slate-300 shadow-sm btn-chunky"
                  title="Lepas semua benda dari magnet"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-slate-600" />
                  <span className="hidden sm:inline">Lepas Semua</span>
                </button>

                <button
                  onClick={handleSpeakMagnetExplanation}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-rose-50 text-slate-800 text-xs font-bold border border-slate-300 shadow-sm btn-chunky"
                  title="Dengarkan penjelasan Tobi"
                >
                  <Volume2 className="w-4 h-4 text-rose-600" />
                  <span className="hidden sm:inline">Dengarkan Tobi</span>
                </button>
              </div>
            </div>

            {/* Papan U-Magnet Interaktif (Pure SVG Canvas) */}
            <div className="bg-slate-950 rounded-3xl p-3 sm:p-5 border-4 border-slate-800 shadow-xl relative overflow-hidden">
              {/* Header Status di Atas Papan Magnet */}
              <div className="flex items-center justify-between gap-2 mb-3 px-1">
                <div className="flex items-center gap-2">
                  <Magnet className="w-4 h-4 text-rose-400" />
                  <span className="text-xs font-black tracking-wider text-slate-300 uppercase">
                    Laboratorium Gaya Magnet Ladam (U-Magnet)
                  </span>
                </div>

                <div>
                  <span
                    className={`text-[11px] font-black px-2.5 py-0.5 rounded-full border flex items-center gap-1 ${
                      stuckMagnetIds.length === 3
                        ? "bg-emerald-950 text-emerald-300 border-emerald-500 animate-pulse"
                        : stuckMagnetIds.length > 0
                        ? "bg-rose-950 text-rose-300 border-rose-500"
                        : "bg-slate-900 text-slate-400 border-slate-700"
                    }`}
                  >
                    <CheckCircle2 className="w-3 h-3" />
                    {stuckMagnetIds.length === 3
                      ? "Semua Benda Magnetik Ditemukan"
                      : `${stuckMagnetIds.length} Benda Menempel`}
                  </span>
                </div>
              </div>

              {/* SVG Canvas U-Magnet */}
              <div className="w-full flex items-center justify-center">
                <svg
                  viewBox="0 0 600 320"
                  className={`w-full h-auto max-h-[300px] sm:max-h-[340px] select-none ${
                    isMagnetShaking ? "animate-magnet-shake" : ""
                  }`}
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient id="magnetSteelGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#94a3b8" />
                      <stop offset="50%" stopColor="#64748b" />
                      <stop offset="100%" stopColor="#475569" />
                    </linearGradient>
                    <linearGradient id="poleNorthGrad" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#ef4444" />
                      <stop offset="100%" stopColor="#dc2626" />
                    </linearGradient>
                    <linearGradient id="poleSouthGrad" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="100%" stopColor="#2563eb" />
                    </linearGradient>
                    <radialGradient id="sparkleGrad" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#fef08a" stopOpacity="1" />
                      <stop offset="100%" stopColor="#facc15" stopOpacity="0" />
                    </radialGradient>
                  </defs>

                  {/* Canvas Background */}
                  <rect width="600" height="320" rx="20" fill="#0f172a" />
                  <circle cx="20" cy="20" r="5" fill="#334155" stroke="#1e293b" strokeWidth="1.5" />
                  <circle cx="580" cy="20" r="5" fill="#334155" stroke="#1e293b" strokeWidth="1.5" />
                  <circle cx="20" cy="300" r="5" fill="#334155" stroke="#1e293b" strokeWidth="1.5" />
                  <circle cx="580" cy="300" r="5" fill="#334155" stroke="#1e293b" strokeWidth="1.5" />

                  {/* Garis-Garis Medan Magnet Tak Kasat Mata (Magnetic Flux Lines) */}
                  <path
                    d="M 235 215 C 235 270, 365 270, 365 215"
                    stroke="#38bdf8"
                    strokeWidth="2.5"
                    strokeDasharray="5 5"
                    fill="none"
                    opacity="0.8"
                  />
                  <path
                    d="M 220 215 C 220 300, 380 300, 380 215"
                    stroke="#38bdf8"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                    fill="none"
                    opacity="0.5"
                  />
                  <path
                    d="M 250 215 C 250 245, 350 245, 350 215"
                    stroke="#38bdf8"
                    strokeWidth="2"
                    strokeDasharray="3 3"
                    fill="none"
                    opacity="0.9"
                  />
                  <text x="300" y="275" fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="middle" opacity="0.8">
                    GARIS MEDAN MAGNET (GAYA TARIK)
                  </text>

                  {/* Busur Baja Magnet Ladam (U-Magnet Arch) */}
                  <path
                    d="M 210 140 L 210 95 C 210 30, 390 30, 390 95 L 390 140 L 340 140 L 340 95 C 340 65, 260 65, 260 95 L 260 140 Z"
                    fill="url(#magnetSteelGrad)"
                    stroke="#334155"
                    strokeWidth="2.5"
                  />
                  <path
                    d="M 230 85 C 250 55, 350 55, 370 85"
                    stroke="#ffffff"
                    strokeWidth="3"
                    strokeLinecap="round"
                    opacity="0.4"
                    fill="none"
                  />

                  {/* Kutub Utara (U - Merah) di Kaki Kiri */}
                  <g>
                    <rect x="210" y="140" width="50" height="75" rx="3" fill="url(#poleNorthGrad)" stroke="#b91c1c" strokeWidth="2" />
                    <rect x="210" y="210" width="50" height="10" rx="1.5" fill="#cbd5e1" stroke="#64748b" strokeWidth="1.5" />
                    <text x="235" y="180" fill="#ffffff" fontSize="26" fontWeight="900" textAnchor="middle">
                      U
                    </text>
                    <text x="235" y="198" fill="#fecaca" fontSize="9" fontWeight="900" textAnchor="middle">
                      UTARA
                    </text>
                  </g>

                  {/* Kutub Selatan (S - Biru) di Kaki Kanan */}
                  <g>
                    <rect x="340" y="140" width="50" height="75" rx="3" fill="url(#poleSouthGrad)" stroke="#1d4ed8" strokeWidth="2" />
                    <rect x="340" y="210" width="50" height="10" rx="1.5" fill="#cbd5e1" stroke="#64748b" strokeWidth="1.5" />
                    <text x="365" y="180" fill="#ffffff" fontSize="26" fontWeight="900" textAnchor="middle">
                      S
                    </text>
                    <text x="365" y="198" fill="#bfdbfe" fontSize="9" fontWeight="900" textAnchor="middle">
                      SELATAN
                    </text>
                  </g>

                  {/* Paku Besi menempel di Kutub U (Kiri) */}
                  {stuckMagnetIds.includes("paku_besi") && (
                    <g transform="translate(230, 220) rotate(-22)">
                      <ellipse cx="0" cy="0" rx="9" ry="3" fill="#94a3b8" stroke="#475569" strokeWidth="1.5" />
                      <path d="M -3 3 L -3 28 L 0 38 L 3 28 L 3 3 Z" fill="#cbd5e1" stroke="#475569" strokeWidth="1.5" />
                      <line x1="-1" y1="3" x2="-1" y2="28" stroke="#ffffff" strokeWidth="1.5" />
                      <circle cx="10" cy="5" r="4" fill="url(#sparkleGrad)" />
                      <circle cx="-12" cy="18" r="3" fill="url(#sparkleGrad)" />
                    </g>
                  )}

                  {/* Peniti Logam menempel di Kutub S (Kanan) */}
                  {stuckMagnetIds.includes("peniti_logam") && (
                    <g transform="translate(365, 220) rotate(22)">
                      <path d="M -8 0 C -8 0 0 -2 6 0 C 10 1 11 6 7 9 C 3 11 -6 11 -8 7 Z" fill="#94a3b8" stroke="#475569" strokeWidth="1.5" />
                      <circle cx="5" cy="5" r="1.5" fill="#475569" />
                      <circle cx="-6" cy="30" r="3.5" fill="none" stroke="#64748b" strokeWidth="2" />
                      <path d="M -7 7 L -9 29" stroke="#cbd5e1" strokeWidth="2.5" strokeLinecap="round" />
                      <path d="M -3 30 L 2 7" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" />
                      <circle cx="-10" cy="12" r="4" fill="url(#sparkleGrad)" />
                      <circle cx="8" cy="22" r="3" fill="url(#sparkleGrad)" />
                    </g>
                  )}

                  {/* Klip Kertas menempel di Antara Kedua Kutub */}
                  {stuckMagnetIds.includes("klip_kertas") && (
                    <g transform="translate(300, 225) rotate(12)">
                      <path
                        d="M -12 -12 L -12 12 C -12 18 -6 20 0 20 C 6 20 12 18 12 12 L 12 -15 C 12 -20 6 -22 0 -22 C -6 -22 -10 -20 -10 -15 L -10 10 C -10 13 -8 15 -4 15 C 0 15 4 13 4 10 L 4 -12"
                        stroke="#e2e8f0"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        fill="none"
                      />
                      <path
                        d="M -12 -12 L -12 12 C -12 18 -6 20 0 20 C 6 20 12 18 12 12 L 12 -15 C 12 -20 6 -22 0 -22 C -6 -22 -10 -20 -10 -15 L -10 10 C -10 13 -8 15 -4 15 C 0 15 4 13 4 10 L 4 -12"
                        stroke="#94a3b8"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        fill="none"
                      />
                      <circle cx="14" cy="-5" r="4" fill="url(#sparkleGrad)" />
                      <circle cx="-14" cy="5" r="4" fill="url(#sparkleGrad)" />
                    </g>
                  )}
                </svg>
              </div>
            </div>

            {/* Socratic Feedback Box: Hasil Uji Terakhir */}
            {lastTestedMagnetId && (() => {
              const testedObj = MAGNET_OBJECTS.find((o) => o.id === lastTestedMagnetId);
              if (!testedObj) return null;
              return (
                <div
                  className={`p-3.5 sm:p-4 rounded-2xl border-2 shadow-sm transition-all flex items-start gap-3 ${
                    testedObj.isMagnetic
                      ? "bg-emerald-50 border-emerald-400 text-emerald-950"
                      : "bg-amber-50 border-amber-300 text-amber-950"
                  }`}
                >
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      testedObj.isMagnetic
                        ? "bg-emerald-200 text-emerald-900"
                        : "bg-amber-200 text-amber-900"
                    }`}
                  >
                    {testedObj.isMagnetic ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-700" />
                    ) : (
                      <Info className="w-5 h-5 text-amber-700" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h5 className="font-black text-sm mb-0.5">
                      {testedObj.isMagnetic
                        ? `SNAP & STICK! ${testedObj.name} Tertarik Kuat ke Magnet`
                        : `${testedObj.name} Tidak Tertarik Magnet`}
                    </h5>
                    <p className="text-xs font-medium leading-relaxed">
                      {testedObj.isMagnetic
                        ? testedObj.speechSuccess
                        : testedObj.speechFail}
                    </p>
                  </div>
                </div>
              );
            })()}

            {/* Celebration Banner when 3/3 Objects Found */}
            {stuckMagnetIds.length === 3 && (
              <div className="bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 rounded-2xl p-4 border-2 border-amber-600 shadow-lg text-slate-950 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-white text-amber-600 flex items-center justify-center shadow-md shrink-0">
                    <Trophy className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <h4 className="font-black text-base sm:text-lg leading-tight">
                      Misi Detektif Magnet Selesai!
                    </h4>
                    <p className="text-xs sm:text-sm font-bold text-amber-950">
                      Kamu berhasil menemukan ketiga benda feromagnetik! (+45 Bintang Didapatkan)
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleResetMagnetHunter}
                  className="px-4 py-2 rounded-xl bg-slate-950 text-white font-black text-xs sm:text-sm border-2 border-slate-800 shadow-md flex items-center gap-1.5 btn-chunky"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Ulangi Eksperimen</span>
                </button>
              </div>
            )}

            {/* Meja Percobaan: 8 Kartu Objek Eksplorasi Sifat Kemagnetan */}
            <div>
              <div className="flex items-center justify-between mb-3 px-1">
                <div className="flex items-center gap-1.5">
                  <Magnet className="w-4 h-4 text-rose-500" />
                  <span className="text-xs font-black text-slate-800 uppercase tracking-wide">
                    Meja Percobaan (Sentuh Benda untuk Menguji):
                  </span>
                </div>
                <span className="text-[11px] font-bold text-slate-500">
                  Temukan 3 benda yang ditarik magnet
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
                {MAGNET_OBJECTS.map((obj) => {
                  const isStuck = stuckMagnetIds.includes(obj.id);
                  const SvgIcon = obj.SvgComponent;
                  return (
                    <div
                      key={obj.id}
                      onClick={() => handleTestMagnetObject(obj)}
                      className={`p-3 rounded-2xl border-2 transition-all cursor-pointer btn-chunky flex flex-col justify-between ${
                        isStuck
                          ? "bg-emerald-50 border-emerald-400 shadow-[0_3px_0_0_#059669]"
                          : "bg-white border-slate-200 hover:border-slate-300 shadow-sm"
                      }`}
                    >
                      <div>
                        {/* Status Badge */}
                        <div className="flex items-center justify-between mb-1.5">
                          <span className={`text-[10px] font-black px-1.5 py-0.5 rounded-md border ${
                            isStuck
                              ? "bg-emerald-200 text-emerald-950 border-emerald-400"
                              : obj.badgeBg
                          }`}>
                            {isStuck ? "Menempel di Magnet" : obj.category}
                          </span>
                        </div>

                        {/* Visual SVG Icon */}
                        <div className="flex items-center justify-center py-2">
                          <SvgIcon />
                        </div>

                        {/* Title & Material */}
                        <h5 className="font-black text-xs sm:text-sm text-slate-900 leading-tight">
                          {obj.name}
                        </h5>
                        <p className="text-[10px] text-slate-500 font-bold mb-1">
                          {obj.material}
                        </p>
                        <p className="text-[10px] text-slate-600 line-clamp-2 leading-snug">
                          {obj.desc}
                        </p>
                      </div>

                      {/* Action Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleTestMagnetObject(obj);
                        }}
                        className={`mt-2.5 py-1.5 px-2 rounded-xl text-xs font-black border flex items-center justify-center gap-1.5 btn-chunky transition-all ${
                          isStuck
                            ? "bg-emerald-500 text-white border-emerald-600 shadow-[0_2px_0_0_#065f46]"
                            : "bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300"
                        }`}
                      >
                        {isStuck ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Menempel</span>
                          </>
                        ) : (
                          <>
                            <Magnet className="w-3.5 h-3.5 text-rose-500" />
                            <span>Uji Tempel</span>
                          </>
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Catatan Konsep Edukatif IPAS SD: Teori Kemagnetan */}
            <div className="bg-gradient-to-r from-rose-50 to-pink-50 rounded-2xl p-4 border-2 border-rose-200 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-rose-200 text-rose-900 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Info className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="font-black text-sm text-slate-900 mb-1">
                    Konsep Sifat Kemagnetan Benda (IPAS SD Kelas 4 & 5)
                  </h5>
                  <p className="text-xs text-slate-700 leading-relaxed font-medium">
                    1. <strong>Benda Feromagnetik</strong> adalah benda yang ditarik sangat kuat oleh gaya magnet. Contohnya: paku besi, peniti baja, dan klip kertas logam.
                    <br />
                    2. <strong>Benda Non-Magnetik</strong> adalah benda yang tidak dapat ditarik oleh magnet. Terdiri dari bahan kayu, karet, kertas, plastik, dan bahkan logam mulia tertentu seperti emas murni.
                    <br />
                    3. <strong>Kutub Magnet</strong> selalu berpasangan: Kutub Utara (U/Merah) dan Kutub Selatan (S/Biru). Gaya tarik magnet paling kuat terletak pada kedua ujung kutubnya!
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
