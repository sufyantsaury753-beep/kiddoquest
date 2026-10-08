"use client";

import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { 
  RotateCcw, 
  Sparkles, 
  Trophy, 
  CheckCircle2, 
  Volume2, 
  Info, 
  Droplets,
  BookOpen,
  ArrowRight,
  Shuffle
} from "lucide-react";
import { sound } from "@/lib/sound";

interface ColorLabPipetteViewProps {
  onEarnStars: (amount: number) => void;
  audioEnabled: boolean;
  liteMode: boolean;
}

export interface ColorTube {
  id: string;
  name: string;
  colorType: "primary" | "tint";
  hex: string;
  gradientFrom: string;
  gradientTo: string;
  desc: string;
}

export const COLOR_TUBES: ColorTube[] = [
  {
    id: "red",
    name: "Merah Delima",
    colorType: "primary",
    hex: "#ef4444",
    gradientFrom: "from-red-500",
    gradientTo: "to-rose-600",
    desc: "Warna primer hangat lambang semangat dan keberanian.",
  },
  {
    id: "yellow",
    name: "Kuning Matahari",
    colorType: "primary",
    hex: "#facc15",
    gradientFrom: "from-amber-300",
    gradientTo: "to-yellow-500",
    desc: "Warna primer cerah seperti pancaran sinar mentari pagi.",
  },
  {
    id: "blue",
    name: "Biru Samudera",
    colorType: "primary",
    hex: "#0284c7",
    gradientFrom: "from-sky-400",
    gradientTo: "to-blue-600",
    desc: "Warna primer sejuk seperti kedalaman samudra nusantara.",
  },
  {
    id: "white",
    name: "Putih Salju",
    colorType: "tint",
    hex: "#f8fafc",
    gradientFrom: "from-slate-100",
    gradientTo: "to-white",
    desc: "Warna netral terang untuk menerangi dan melembutkan warna.",
  },
  {
    id: "black",
    name: "Hitam Pekat",
    colorType: "tint",
    hex: "#1e293b",
    gradientFrom: "from-slate-700",
    gradientTo: "to-slate-900",
    desc: "Warna netral gelap untuk memberi kedalaman bayangan pekat.",
  },
];

export interface ColorQuest {
  id: string;
  title: string;
  targetName: string;
  targetHex: string;
  ingredients: [string, string];
  scienceDesc: string;
  funFact: string;
}

export const COLOR_QUESTS: ColorQuest[] = [
  {
    id: "quest-orange",
    title: "Sirup Jeruk Segar",
    targetName: "Oranye Jingga",
    targetHex: "#f97316",
    ingredients: ["red", "yellow"],
    scienceDesc: "Penyatuan warna primer Merah + Kuning membentuk warna sekunder Oranye yang segar ceria!",
    funFact: "Buah jeruk dan wortel kaya beta-karoten yang memantulkan pigmen jingga alami.",
  },
  {
    id: "quest-green",
    title: "Ramuan Daun Rindang",
    targetName: "Hijau Zamrud",
    targetHex: "#10b981",
    ingredients: ["yellow", "blue"],
    scienceDesc: "Kuning hangat berpadu dengan Biru sejuk melahirkan warna sekunder Hijau alami klorofil tumbuhan!",
    funFact: "Zat hijau daun (klorofil) membantu tumbuhan berfotosintesis menghasilkan oksigen untuk kita bernapas.",
  },
  {
    id: "quest-purple",
    title: "Anggur Bintang Malam",
    targetName: "Ungu Violet",
    targetHex: "#8b5cf6",
    ingredients: ["red", "blue"],
    scienceDesc: "Pencampuran Merah Delima dengan Biru Samudera menghasilkan warna sekunder Ungu bangsawan yang anggun!",
    funFact: "Bunga anggrek ungu di hutan tropis Indonesia adalah salah satu keajaiban pigmen antosianin alam.",
  },
  {
    id: "quest-pink",
    title: "Kelopak Mawar Cantik",
    targetName: "Merah Muda (Pink)",
    targetHex: "#fb7185",
    ingredients: ["red", "white"],
    scienceDesc: "Merah terang yang diencerkan oleh Putih Salju membentuk warna pastel Merah Muda yang lembut!",
    funFact: "Warna merah muda sering dijumpai pada bulu burung flamingo dan kelopak bunga sakura.",
  },
  {
    id: "quest-grey",
    title: "Awan Mendung Ceria",
    targetName: "Abu-Abu Elegan",
    targetHex: "#64748b",
    ingredients: ["black", "white"],
    scienceDesc: "Dua warna netral Hitam + Putih menyatu harmonis membentuk warna monokrom Abu-Abu!",
    funFact: "Batu candi Borobudur terbuat dari batuan andesit vulkanik berwarna abu-abu kokoh tahan ribuan tahun.",
  },
];

export function calculateColorMix(idA: string, idB: string): { name: string; hex: string; desc: string } {
  const pair = [idA, idB].sort().join("-");
  switch (pair) {
    case "red-yellow":
      return {
        name: "Oranye Jingga",
        hex: "#f97316",
        desc: "Sintesis Merah + Kuning: Terbentuk warna sekunder Oranye yang hangat dan penuh energi kehidupan!",
      };
    case "blue-yellow":
      return {
        name: "Hijau Zamrud",
        hex: "#10b981",
        desc: "Sintesis Kuning + Biru: Terbentuk warna sekunder Hijau yang menyejukkan seperti rimbunnya hutan tropis!",
      };
    case "blue-red":
      return {
        name: "Ungu Violet",
        hex: "#8b5cf6",
        desc: "Sintesis Merah + Biru: Terbentuk warna sekunder Ungu magis yang memesona dan elegan!",
      };
    case "red-white":
      return {
        name: "Merah Muda (Pink)",
        hex: "#fb7185",
        desc: "Pencerahan Merah + Putih: Pigmen merah terurai menjadi warna pastel merah muda yang manis!",
      };
    case "blue-white":
      return {
        name: "Biru Muda Langit",
        hex: "#38bdf8",
        desc: "Pencerahan Biru + Putih: Terbentuk warna biru langit cerah seperti angkasa di siang hari!",
      };
    case "white-yellow":
      return {
        name: "Kuning Mentega",
        hex: "#fef08a",
        desc: "Pencerahan Kuning + Putih: Terbentuk warna kuning lembut yang hangat di mata!",
      };
    case "black-white":
      return {
        name: "Abu-Abu Elegan",
        hex: "#64748b",
        desc: "Netralisasi Hitam + Putih: Menghasilkan rona abu-abu monokromatik yang seimbang!",
      };
    case "black-red":
      return {
        name: "Merah Marun Pekat",
        hex: "#7f1d1d",
        desc: "Pemekatan Merah + Hitam: Menghasilkan rona marun gelap berwibawa!",
      };
    case "black-yellow":
      return {
        name: "Hijau Zaitun Gelap",
        hex: "#4d7c0f",
        desc: "Kombinasi Kuning + Hitam: Menghasilkan rona zaitun alami seperti buah zaitun matang!",
      };
    case "black-blue":
      return {
        name: "Biru Dongker Malam",
        hex: "#0f172a",
        desc: "Pemekatan Biru + Hitam: Menghasilkan warna biru malam samudra yang dalam!",
      };
    default:
      return {
        name: "Campuran Warna Unik",
        hex: "#a855f7",
        desc: "Kedua cairan berhasil larut dan membentuk senyawa larutan molekul warna baru!",
      };
  }
}

export default function ColorLabPipetteView({
  onEarnStars,
  audioEnabled,
  liteMode,
}: ColorLabPipetteViewProps) {
  // Mode Quest vs Bebas
  const [isQuestMode, setIsQuestMode] = useState<boolean>(true);
  const [currentQuestIdx, setCurrentQuestIdx] = useState<number>(0);
  const [questSuccess, setQuestSuccess] = useState<boolean>(false);

  // Status Tabung & Pipet
  const [activePipetteTube, setActivePipetteTube] = useState<ColorTube | null>(null);
  const [drippedColors, setDrippedColors] = useState<ColorTube[]>([]);
  const [isDrippingAnimation, setIsDrippingAnimation] = useState<boolean>(false);
  const [liquidVolumeMl, setLiquidVolumeMl] = useState<number>(0); // 0, 50, 100, 150 ml

  // Reaksi Busa & Pengadukan
  const [isFizzing, setIsFizzing] = useState<boolean>(false);
  const [isStirring, setIsStirring] = useState<boolean>(false);
  const [mixedResult, setMixedResult] = useState<{ name: string; hex: string; desc: string } | null>(null);

  const activeQuest = COLOR_QUESTS[currentQuestIdx];

  // Efek suara narasi saat beralih quest
  useEffect(() => {
    if (isQuestMode && audioEnabled) {
      sound.speak(`Misi Ramuan Sains: ${activeQuest.title}. Campurkan bahan untuk menghasilkan warna ${activeQuest.targetName}!`);
    }
  }, [currentQuestIdx, isQuestMode]);

  // Klik tabung warna di rak laboratorium
  const handleSelectTube = (tube: ColorTube) => {
    if (drippedColors.length >= 2 && !mixedResult) {
      if (audioEnabled) {
        sound.speak("Labu kaca sudah berisi 2 warna! Aduk cairan terlebih dahulu dengan Batang Pengaduk.");
      }
      return;
    }
    sound.playChime();
    setActivePipetteTube(tube);
    if (audioEnabled) {
      sound.speak(`Pipet kaca mengambil cairan ${tube.name}. Sekarang ketuk tombol teteskan!`);
    }
  };

  // Tekan tombol tetes pipet ke labu
  const handleDripFromPipette = () => {
    if (!activePipetteTube || isDrippingAnimation) return;

    setIsDrippingAnimation(true);
    sound.playWaterDrop();

    // Animasi tetesan air jatuh berirama (2 tetesan)
    setTimeout(() => {
      sound.playWaterDrop();
    }, 280);

    setTimeout(() => {
      const nextColors = [...drippedColors, activePipetteTube];
      setDrippedColors(nextColors);
      const nextVol = Math.min(150, liquidVolumeMl + 50);
      setLiquidVolumeMl(nextVol);
      setIsDrippingAnimation(false);
      setActivePipetteTube(null);

      // Jika ada 2 warna berbeda di dalam labu -> PICU REAKSI BUSA CERIA!
      if (nextColors.length === 2) {
        setIsFizzing(true);
        sound.playFizz();

        if (audioEnabled) {
          sound.speak("Busa reaksi kimia ceria muncul! Dua cairan molekul warna mulai berinteraksi! Ayo aduk dengan Batang Pengaduk Kaca!");
        }

        setTimeout(() => {
          setIsFizzing(false);
        }, 3200);
      }
    }, 600);
  };

  // Batang Pengaduk Kaca: Putar pusaran cairan & satukan warna
  const handleStirLiquid = () => {
    if (drippedColors.length < 2 || isStirring) return;

    setIsStirring(true);
    sound.playChime();

    setTimeout(() => {
      const result = calculateColorMix(drippedColors[0].id, drippedColors[1].id);
      setMixedResult(result);
      setIsStirring(false);

      // Cek apakah menyelesaikan quest aktif
      if (isQuestMode) {
        const sortedDripped = drippedColors.map((c) => c.id).sort().join("-");
        const sortedQuest = [...activeQuest.ingredients].sort().join("-");

        if (sortedDripped === sortedQuest) {
          setQuestSuccess(true);
          sound.playCelebration();
          onEarnStars(15);
          if (!liteMode) {
            confetti({
              particleCount: 55,
              spread: 75,
              origin: { y: 0.6 },
              colors: [result.hex, "#facc15", "#38bdf8", "#10b981"],
            });
          }
          if (audioEnabled) {
            sound.speak(`Luar biasa! Kamu berhasil meracik ${activeQuest.title}. ${result.desc}`);
          }
        } else {
          sound.playSocraticHint();
          if (audioEnabled) {
            sound.speak(`Hasil ramuan adalah ${result.name}. Namun untuk misi ${activeQuest.title}, periksa kembali warna yang diminta!`);
          }
        }
      } else {
        sound.playCelebration();
        if (audioEnabled) {
          sound.speak(`Hebat! ${result.name} berhasil tercipta! ${result.desc}`);
        }
      }
    }, 1200);
  };

  // Kosongkan dan cuci labu Erlenmeyer
  const handleWashFlask = () => {
    sound.playChime();
    setDrippedColors([]);
    setActivePipetteTube(null);
    setLiquidVolumeMl(0);
    setIsFizzing(false);
    setIsStirring(false);
    setMixedResult(null);
    setQuestSuccess(false);

    if (audioEnabled) {
      sound.speak("Labu kaca laboratorium telah dicuci bersih dengan air murni. Siap untuk eksperimen berikutnya!");
    }
  };

  // Ganti Quest berikutnya
  const handleNextQuest = () => {
    handleWashFlask();
    const nextIdx = (currentQuestIdx + 1) % COLOR_QUESTS.length;
    setCurrentQuestIdx(nextIdx);
  };

  // Hitung warna visual cairan saat ini di dalam labu
  const currentLiquidColor = mixedResult
    ? mixedResult.hex
    : drippedColors.length === 2
    ? `linear-gradient(to right, ${drippedColors[0].hex}, ${drippedColors[1].hex})`
    : drippedColors.length === 1
    ? drippedColors[0].hex
    : "transparent";

  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-6 py-4 sm:py-6 space-y-5">
      {/* Top Banner: Mode Switcher & TTS Guidance */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3.5 sm:p-4 rounded-3xl border-2 border-amber-200/90 shadow-sm">
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setIsQuestMode(true);
              sound.playChime();
            }}
            className={`px-3.5 py-1.5 rounded-xl font-black text-xs sm:text-sm border-2 transition-all btn-chunky flex items-center gap-1.5 ${
              isQuestMode
                ? "bg-amber-500 text-slate-950 border-amber-600 shadow-sm"
                : "bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200"
            }`}
          >
            <Trophy className="w-3.5 h-3.5" />
            <span>Mode Misi Ramuan</span>
          </button>

          <button
            onClick={() => {
              setIsQuestMode(false);
              sound.playChime();
            }}
            className={`px-3.5 py-1.5 rounded-xl font-black text-xs sm:text-sm border-2 transition-all btn-chunky flex items-center gap-1.5 ${
              !isQuestMode
                ? "bg-emerald-500 text-white border-emerald-600 shadow-sm"
                : "bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Eksplorasi Bebas</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              sound.playChime();
              if (audioEnabled) {
                if (isQuestMode) {
                  sound.speak(`Petunjuk Misi: Campurkan 2 warna primer untuk menghasilkan ${activeQuest.targetName}. ${activeQuest.scienceDesc}`);
                } else {
                  sound.speak("Ketuk tabung warna di rak, lalu gunakan pipet tetes untuk memasukkan cairan ke dalam labu Erlenmeyer!");
                }
              }
            }}
            className="px-3 py-1.5 rounded-xl bg-sky-50 text-sky-800 border-2 border-sky-200 text-xs font-bold btn-chunky flex items-center gap-1.5"
            title="Dengarkan Suara Panduan Tobi"
          >
            <Volume2 className="w-3.5 h-3.5 text-sky-600" />
            <span className="hidden sm:inline">Dengar Panduan</span>
          </button>

          <button
            onClick={handleWashFlask}
            className="px-3 py-1.5 rounded-xl bg-rose-50 text-rose-800 border-2 border-rose-200 text-xs font-black btn-chunky flex items-center gap-1.5"
            title="Kosongkan Labu Kaca"
          >
            <RotateCcw className="w-3.5 h-3.5 text-rose-600" />
            <span>Cuci Labu</span>
          </button>
        </div>
      </div>

      {/* Misi Ramuan Aktif Card */}
      {isQuestMode && (
        <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white p-4 sm:p-5 rounded-3xl border-3 border-amber-600 shadow-lg flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3.5 min-w-0">
            <div
              style={{ backgroundColor: activeQuest.targetHex }}
              className="w-12 h-12 rounded-2xl border-3 border-white/80 shadow-md shrink-0 flex items-center justify-center"
            >
              <Sparkles className="w-6 h-6 text-white drop-shadow" />
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider bg-black/25 px-2 py-0.5 rounded-full">
                  Misi #{currentQuestIdx + 1} dari {COLOR_QUESTS.length}
                </span>
                <span className="text-xs font-bold text-amber-100 hidden sm:inline">
                  +15 Bintang Prestasi
                </span>
              </div>
              <h3 className="text-base sm:text-xl font-black font-display truncate">
                {activeQuest.title}: Target Warna {activeQuest.targetName}
              </h3>
              <p className="text-xs text-amber-100 font-semibold line-clamp-1">
                {activeQuest.scienceDesc}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleNextQuest}
              className="px-3.5 py-2 rounded-xl bg-white text-amber-900 font-black text-xs border-2 border-amber-200 btn-chunky flex items-center gap-1.5 shadow-sm"
            >
              <Shuffle className="w-3.5 h-3.5 text-amber-700" />
              <span>Ganti Misi</span>
            </button>
          </div>
        </div>
      )}

      {/* Meja Laboratorium Sains Cilik (Warm Wood Texture + Transparent Glassware) */}
      <div className="relative bg-gradient-to-b from-amber-50/70 via-orange-50/40 to-amber-100/60 rounded-3xl border-4 border-amber-300 p-4 sm:p-8 shadow-xl overflow-hidden select-none">
        {/* Rak Kaca Bagian Atas: 5 Tabung Warna */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-black uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
              <Droplets className="w-4 h-4 text-amber-700" />
              <span>1. Rak Tabung Reaksi (Pilih Warna Cairan):</span>
            </span>
            <span className="text-[11px] font-bold text-slate-500">
              {activePipetteTube ? `Terpilih: ${activePipetteTube.name}` : "Klik tabung untuk mengambil pipet"}
            </span>
          </div>

          <div className="grid grid-cols-5 gap-2 sm:gap-4 p-3 bg-white/90 backdrop-blur-md rounded-2xl border-2 border-amber-200 shadow-inner">
            {COLOR_TUBES.map((tube) => {
              const isSelected = activePipetteTube?.id === tube.id;
              return (
                <button
                  key={tube.id}
                  onClick={() => handleSelectTube(tube)}
                  className={`group relative flex flex-col items-center justify-between p-2 sm:p-3 rounded-2xl border-2 sm:border-3 transition-all btn-chunky cursor-pointer ${
                    isSelected
                      ? "bg-amber-100 border-amber-500 ring-4 ring-amber-400 ring-offset-2 scale-105"
                      : "bg-slate-50 hover:bg-slate-100 border-slate-200"
                  }`}
                >
                  {/* Ilustrasi Tabung Reaksi Kaca Pure SVG */}
                  <div className="relative w-7 h-16 sm:w-10 sm:h-24 mb-1.5">
                    {/* Badan Tabung Kaca Transparan */}
                    <div className="absolute inset-0 rounded-b-full border-2 border-slate-400/80 bg-white/40 overflow-hidden shadow-inner flex flex-col justify-end">
                      {/* Cairan di Dalam Tabung */}
                      <div
                        style={{ backgroundColor: tube.hex }}
                        className="w-full h-3/4 rounded-b-full opacity-90 transition-all group-hover:h-4/5"
                      />
                    </div>
                    {/* Pantulan Cahaya Kaca */}
                    <div className="absolute left-1 top-2 bottom-3 w-1 bg-white/70 rounded-full pointer-events-none" />
                  </div>

                  {/* Label Nama Warna */}
                  <span className="text-[10px] sm:text-xs font-black text-slate-800 text-center leading-tight truncate w-full">
                    {tube.name}
                  </span>
                  <span className="text-[8px] sm:text-[9px] font-bold text-slate-500 uppercase mt-0.5">
                    {tube.colorType === "primary" ? "Primer" : "Netral"}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Area Meja Tengah: Pipet Tetes & Labu Erlenmeyer Kaca Berskala */}
        <div className="relative grid grid-cols-1 md:grid-cols-12 gap-6 items-center my-4">
          {/* Kolom Kiri: Panel Kontrol Pipet & Aksi Tetes (md:col-span-4) */}
          <div className="md:col-span-4 flex flex-col gap-3">
            <div className="bg-white/95 rounded-2xl p-4 border-2 border-amber-200 shadow-md">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 block mb-1">
                2. Kontrol Pipet Kaca Ajaib:
              </span>

              {activePipetteTube ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-2.5 p-2 rounded-xl bg-amber-50 border border-amber-200">
                    <div
                      style={{ backgroundColor: activePipetteTube.hex }}
                      className="w-6 h-6 rounded-lg border border-black/20 shrink-0"
                    />
                    <div className="min-w-0">
                      <span className="text-xs font-black text-slate-800 block truncate">
                        Pipet terisi {activePipetteTube.name}
                      </span>
                      <span className="text-[10px] text-slate-500 font-bold block">
                        Siap diteteskan ke labu kaca
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={handleDripFromPipette}
                    disabled={isDrippingAnimation}
                    className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-black text-xs sm:text-sm border-2 border-amber-600 shadow-md btn-chunky flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <Droplets className="w-4 h-4 text-yellow-200 animate-bounce" />
                    <span>{isDrippingAnimation ? "Meneteskan..." : "Teteskan Cairan (Pluk!)"}</span>
                  </button>
                </div>
              ) : (
                <div className="text-center py-3">
                  <p className="text-xs font-bold text-slate-600">
                    Pipet kaca masih kosong. Silakan pilih tabung warna di rak atas!
                  </p>
                </div>
              )}
            </div>

            {/* Tombol Batang Pengaduk Kaca */}
            <div className="bg-white/95 rounded-2xl p-4 border-2 border-amber-200 shadow-md">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 block mb-1">
                3. Batang Pengaduk Kaca:
              </span>

              <button
                onClick={handleStirLiquid}
                disabled={drippedColors.length < 2 || isStirring || Boolean(mixedResult)}
                className={`w-full py-2.5 px-4 rounded-xl font-black text-xs sm:text-sm border-2 transition-all btn-chunky flex items-center justify-center gap-2 ${
                  drippedColors.length >= 2 && !mixedResult
                    ? "bg-emerald-500 hover:bg-emerald-600 text-white border-emerald-600 shadow-md animate-pulse cursor-pointer"
                    : "bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed"
                }`}
              >
                <Sparkles className="w-4 h-4 text-emerald-200" />
                <span>{isStirring ? "Mengaduk Cairan..." : "Aduk dengan Batang Pengaduk"}</span>
              </button>
            </div>
          </div>

          {/* Kolom Tengah-Kanan: Erlenmeyer Kaca Raksasa & Animasi Busa (md:col-span-8) */}
          <div className="md:col-span-8 flex flex-col items-center justify-center relative min-h-[320px] sm:min-h-[380px]">
            {/* Animasi Pipet di Atas Mulut Labu saat Aktif */}
            <div
              className={`absolute top-0 transition-all duration-300 z-20 flex flex-col items-center ${
                activePipetteTube ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
              }`}
            >
              {/* Batang Pipet Kaca SVG */}
              <div className="relative w-4 h-20 bg-white/70 border-2 border-slate-400 rounded-t-lg flex flex-col justify-end shadow-md">
                {/* Karet Penekan Atas Pipet */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-5 rounded-t-full bg-rose-500 border-2 border-rose-700" />
                {/* Cairan di Dalam Pipet */}
                {activePipetteTube && (
                  <div
                    style={{ backgroundColor: activePipetteTube.hex }}
                    className="w-full h-12 opacity-85 transition-all"
                  />
                )}
                {/* Ujung Lancip Pipet */}
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-3 bg-white/80 border-x border-b border-slate-400" />
              </div>

              {/* Animasi Butiran Air Menetes Jatuh */}
              {isDrippingAnimation && activePipetteTube && (
                <div className="w-3 h-4 rounded-full animate-bounce mt-2 shadow" style={{ backgroundColor: activePipetteTube.hex }} />
              )}
            </div>

            {/* Wadah Labu Erlenmeyer Kaca Bening */}
            <div className="relative w-56 sm:w-72 aspect-[1/1.2] flex items-end justify-center">
              {/* SVG Labu Erlenmeyer dengan Skala Ukur & Refleksi Kaca */}
              <svg viewBox="0 0 200 240" className="w-full h-full drop-shadow-2xl overflow-visible" fill="none">
                <defs>
                  {/* Efek Gradasi Pantulan Kaca Transparan */}
                  <linearGradient id="glassShine" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="white" stopOpacity="0.75" />
                    <stop offset="30%" stopColor="white" stopOpacity="0.15" />
                    <stop offset="100%" stopColor="white" stopOpacity="0.4" />
                  </linearGradient>

                  {/* Masker Tubuh Labu untuk Cairan */}
                  <clipPath id="flaskBodyClip">
                    <path d="M78 50 L30 190 C24 205 35 220 52 220 L148 220 C165 220 176 205 170 190 L122 50 Z" />
                  </clipPath>
                </defs>

                {/* 1. Cairan di Dalam Labu (Dipotong oleh ClipPath) */}
                <g clipPath="url(#flaskBodyClip)">
                  {liquidVolumeMl > 0 && (
                    <g className="transition-all duration-500">
                      {/* Tinggi cairan dihitung dari volume: 50ml -> y=180, 100ml -> y=140, 150ml -> y=95 */}
                      {(() => {
                        const liquidY = liquidVolumeMl === 50 ? 180 : liquidVolumeMl === 100 ? 135 : 90;
                        return (
                          <g>
                            {/* Lapisan Cairan 1 & 2 */}
                            {mixedResult ? (
                              <rect x="0" y={liquidY} width="200" height="150" fill={mixedResult.hex} opacity="0.9" />
                            ) : drippedColors.length === 2 ? (
                              <>
                                <rect x="0" y={liquidY} width="100" height="150" fill={drippedColors[0].hex} opacity="0.85" />
                                <rect x="100" y={liquidY} width="100" height="150" fill={drippedColors[1].hex} opacity="0.85" />
                              </>
                            ) : drippedColors.length === 1 ? (
                              <rect x="0" y={liquidY} width="200" height="150" fill={drippedColors[0].hex} opacity="0.85" />
                            ) : null}

                            {/* Efek Riak Gelombang Permukaan Cairan */}
                            <path
                              d={`M20 ${liquidY} Q50 ${liquidY - 5} 100 ${liquidY} T180 ${liquidY} L180 230 L20 230 Z`}
                              fill="white"
                              opacity="0.15"
                            />
                          </g>
                        );
                      })()}
                    </g>
                  )}
                </g>

                {/* 2. Garis Dinding Kaca Erlenmeyer */}
                <path
                  d="M78 20 L78 50 L30 190 C24 205 35 220 52 220 L148 220 C165 220 176 205 170 190 L122 50 L122 20 Z"
                  stroke="#334155"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Mulut Bibir Labu Kaca Atas */}
                <rect x="72" y="14" width="56" height="8" rx="4" fill="#e2e8f0" stroke="#334155" strokeWidth="4" />

                {/* 3. Garis Skala Ukur Mililiter (50ml, 100ml, 150ml) */}
                <g stroke="#475569" strokeWidth="2.5" strokeLinecap="round">
                  {/* Skala 50 ml */}
                  <line x1="56" y1="180" x2="74" y2="180" />
                  <text x="78" y="184" fill="#475569" fontSize="10" fontWeight="bold">50 ml</text>

                  {/* Skala 100 ml */}
                  <line x1="68" y1="135" x2="86" y2="135" />
                  <text x="90" y="139" fill="#475569" fontSize="10" fontWeight="bold">100 ml</text>

                  {/* Skala 150 ml */}
                  <line x1="80" y1="90" x2="98" y2="90" />
                  <text x="102" y="94" fill="#475569" fontSize="10" fontWeight="bold">150 ml</text>
                </g>

                {/* 4. Pantulan Garis Cahaya Kaca */}
                <path d="M42 185 L84 65 L84 25" stroke="url(#glassShine)" strokeWidth="6" strokeLinecap="round" opacity="0.8" />
                <circle cx="152" cy="195" r="4" fill="white" opacity="0.6" />

                {/* 5. Batang Pengaduk Kaca saat Mengaduk */}
                {isStirring && (
                  <g className="animate-spin origin-[100px_100px]">
                    <line x1="70" y1="10" x2="130" y2="210" stroke="#cbd5e1" strokeWidth="7" strokeLinecap="round" opacity="0.8" />
                    <line x1="70" y1="10" x2="130" y2="210" stroke="white" strokeWidth="3" strokeLinecap="round" />
                  </g>
                )}
              </svg>

              {/* Efek Busa Reaksi Kimia Mendidih Ceria (Fizzing Bubbles Eruption) */}
              {isFizzing && (
                <div className="absolute inset-x-8 bottom-12 top-24 pointer-events-none flex flex-col items-center justify-end z-25 overflow-hidden">
                  <div className="w-full flex items-center justify-center gap-2 mb-2 animate-bounce">
                    <span className="px-2.5 py-1 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black shadow-lg border border-amber-500 animate-pulse">
                      Desis Reaksi Kimia!
                    </span>
                  </div>
                  {/* Butiran Gelembung Naik */}
                  <div className="w-full h-32 relative">
                    <div className="absolute bottom-2 left-6 w-5 h-5 rounded-full bg-white/90 border-2 border-emerald-400 animate-ping" />
                    <div className="absolute bottom-6 right-8 w-4 h-4 rounded-full bg-white/90 border-2 border-yellow-400 animate-bounce" />
                    <div className="absolute bottom-12 left-14 w-6 h-6 rounded-full bg-white/90 border-2 border-rose-400 animate-pulse" />
                    <div className="absolute bottom-16 right-16 w-3 h-3 rounded-full bg-white/90 border border-sky-400 animate-ping" />
                  </div>
                </div>
              )}
            </div>

            {/* Label Status Reaksi / Hasil Campuran di Bawah Labu */}
            <div className="mt-3 text-center">
              {mixedResult ? (
                <div className="p-3 bg-white/95 rounded-2xl border-2 border-emerald-400 shadow-md inline-block max-w-md animate-fadeIn">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <div
                      style={{ backgroundColor: mixedResult.hex }}
                      className="w-4 h-4 rounded-full border border-black/20"
                    />
                    <span className="text-sm font-black text-emerald-950 font-display">
                      Berhasil Disintesis: {mixedResult.name}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 font-semibold leading-relaxed">
                    {mixedResult.desc}
                  </p>
                </div>
              ) : drippedColors.length === 2 ? (
                <span className="text-xs font-black text-amber-900 bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
                  Dua warna bertemu di dalam labu! Klik Batang Pengaduk Kaca untuk menyatukan molekulnya.
                </span>
              ) : drippedColors.length === 1 ? (
                <span className="text-xs font-bold text-slate-600 bg-white/80 px-3 py-1 rounded-full border border-slate-200">
                  Terisi {drippedColors[0].name} (50 ml). Tambahkan 1 warna lagi!
                </span>
              ) : (
                <span className="text-xs font-bold text-slate-500">
                  Labu kaca kosong (0 ml). Siap untuk ditetesi cairan.
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Kartu Penjelasan Edukasi Sains Teori Warna (IPAS SD Kurikulum Merdeka) */}
      <div className="bg-white rounded-3xl p-5 border-2 border-slate-200 shadow-sm space-y-3">
        <div className="flex items-center gap-2 text-slate-800">
          <BookOpen className="w-5 h-5 text-emerald-600" />
          <h4 className="text-sm sm:text-base font-black font-display">
            Wawasan Sains: Teori Warna IPAS Sekolah Dasar
          </h4>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs leading-relaxed">
          <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200">
            <span className="font-black text-amber-900 block mb-1">
              1. Warna Primer (Warna Pokok Dasar):
            </span>
            <p className="text-slate-700 font-medium">
              Warna primer adalah warna asli yang tidak dapat dihasilkan dari campuran warna lain. Di alam, ada 3 warna primer: <strong>Merah</strong>, <strong>Kuning</strong>, dan <strong>Biru</strong>.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200">
            <span className="font-black text-emerald-900 block mb-1">
              2. Warna Sekunder (Warna Turunan):
            </span>
            <p className="text-slate-700 font-medium">
              Warna sekunder terbentuk dari perpaduan dua warna primer dengan perbandingan seimbang:
              <br />• Merah + Kuning = <strong>Oranye</strong>
              <br />• Kuning + Biru = <strong>Hijau</strong>
              <br />• Merah + Biru = <strong>Ungu</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
