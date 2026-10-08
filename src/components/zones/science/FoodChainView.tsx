"use client";

import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { 
  Sprout, 
  Droplets, 
  Volume2, 
  Shuffle, 
  AlertTriangle, 
  RotateCcw, 
  Sparkles, 
  CheckCircle2, 
  Fish, 
  CloudRain, 
  X,
  Trophy
} from "lucide-react";
import { sound } from "@/lib/sound";

interface FoodChainViewProps {
  onEarnStars: (amount: number) => void;
  audioEnabled: boolean;
  liteMode: boolean;
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
    <path d="M21 34 L24 40 L27 34 Z" fill="#f8fafc" stroke="#451a03" strokeWidth="1.5" />
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
    <path d="M4 42 C14 38 34 38 44 42" stroke="#d97706" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M8 40 Q14 34 20 40 Q28 32 36 40" fill="#fde68a" opacity="0.4" />
    <circle cx="16" cy="30" r="7" fill="#10b981" stroke="#047857" strokeWidth="1.5" />
    <circle cx="32" cy="28" r="8" fill="#14b8a6" stroke="#0f766e" strokeWidth="1.5" />
    <circle cx="24" cy="20" r="6" fill="#06b6d4" stroke="#0e7490" strokeWidth="1.5" />
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
   DATA EKOSISTEM DAN KRISIS
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

export default function FoodChainView({
  onEarnStars,
  audioEnabled,
  liteMode,
}: FoodChainViewProps) {
  const [selectedEcosystemId, setSelectedEcosystemId] = useState<"sawah" | "laut">("sawah");
  const [placedChainIds, setPlacedChainIds] = useState<string[]>([]);
  const [availableCardIds, setAvailableCardIds] = useState<string[]>([]);
  const [foodChainComplete, setFoodChainComplete] = useState<boolean>(false);
  const [chainErrorFeedback, setChainErrorFeedback] = useState<string | null>(null);
  const [actionBurst, setActionBurst] = useState<{ index: number; text: string } | null>(null);

  // Laboratorium Krisis Ekosistem (What If? Mode) State
  const [activeCrisisId, setActiveCrisisId] = useState<CrisisScenarioId | null>(null);
  const [crisisResolved, setCrisisResolved] = useState<boolean>(false);
  const [earnedCrisisStars, setEarnedCrisisStars] = useState<boolean>(false);

  const activeEcosystem = ECOSYSTEMS.find((e) => e.id === selectedEcosystemId) || ECOSYSTEMS[0];

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

  return (
    <div className="max-w-5xl mx-auto px-3 sm:px-6 py-4 sm:py-6 space-y-4 select-none">
      {/* Top Toolbar: Pilihan Ekosistem & Kontrol */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 bg-white p-3 sm:p-4 rounded-3xl border-2 border-slate-200 shadow-sm">
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

      {/* Misi Detektif Aktif Banner */}
      {!foodChainComplete && (
        <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-2.5 sm:p-3 flex items-center justify-between gap-2 shadow-sm">
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

      {/* Error Feedback */}
      {chainErrorFeedback && (
        <div className="p-3 rounded-2xl border-2 bg-rose-50 border-rose-300 text-rose-900 flex items-center gap-2.5 animate-pulse shadow-sm">
          <div className="w-7 h-7 rounded-xl bg-rose-500 text-white border border-rose-600 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-4 h-4" />
          </div>
          <p className="text-xs sm:text-sm font-black leading-snug">
            {chainErrorFeedback}
          </p>
        </div>
      )}

      {/* Papan Alur Rantai Makanan (Ilustrasi WebP dengan Lingkaran Interaktif) */}
      <div className="relative w-full aspect-[1024/571] rounded-3xl overflow-hidden border-2 border-slate-200 shadow-xl select-none bg-slate-900">
        <img
          src={selectedEcosystemId === "sawah" ? "/images/foodchain/sawah.webp" : "/images/foodchain/laut.webp"}
          alt={`Papan Rantai Makanan ${activeEcosystem.name}`}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />

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

        {/* Slot Lingkaran Interaktif */}
        {activeEcosystem.chain.map((item, idx) => {
          const isPlaced = idx < placedChainIds.length;
          const isNextTarget = idx === placedChainIds.length;
          const placedItem = isPlaced
            ? activeEcosystem.chain.find((c) => c.id === placedChainIds[idx]) || item
            : null;
          const PlacedSvg = placedItem ? placedItem.SvgComponent : null;
          const coords = FOODCHAIN_COORDINATES[selectedEcosystemId][idx] || { left: "50%", top: "50%" };

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
              {isCurrentBurst && (
                <div className="absolute -top-10 sm:-top-12 z-30 animate-bounce pointer-events-none whitespace-nowrap">
                  <div className="px-2.5 py-1 rounded-xl bg-amber-400 text-slate-950 font-black text-[9px] sm:text-xs shadow-2xl border-2 border-amber-600 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-900" />
                    <span>{actionBurst.text}</span>
                  </div>
                </div>
              )}

              {impactBadge && (
                <div className="absolute -top-6 sm:-top-7 z-25 pointer-events-none whitespace-nowrap animate-bounce">
                  <span className={`px-1.5 py-0.5 rounded-full text-[7px] sm:text-[9px] font-black shadow border border-white/40 ${impactBadge.color}`}>
                    {impactBadge.text}
                  </span>
                </div>
              )}

              {isPlaced && PlacedSvg && placedItem ? (
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

                  {isDirectlyStruck && (
                    <div className="absolute inset-0 flex items-center justify-center bg-red-600/40 rounded-full">
                      <X className="w-6 h-6 sm:w-8 sm:h-8 text-white drop-shadow stroke-[3]" />
                    </div>
                  )}

                  <span className={`absolute -bottom-4 sm:-bottom-5 px-1.5 sm:px-2 py-0.5 rounded-full text-[8px] sm:text-[10px] font-black whitespace-nowrap shadow-md pointer-events-none border border-white/20 ${
                    isDirectlyStruck ? "bg-red-700 text-white" : "bg-slate-900/90 text-white"
                  }`}>
                    {placedItem.name}
                  </span>
                </div>
              ) : isNextTarget ? (
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
        <div className="bg-white p-4 sm:p-5 rounded-3xl border-2 border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-3">
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
        /* LABORATORIUM KRISIS EKOSISTEM (WHAT IF? MODE) */
        <div className="space-y-4">
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

          {/* Skenario Selector Tabs */}
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

          {/* Navigasi Bawah */}
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
  );
}
