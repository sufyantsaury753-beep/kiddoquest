"use client";

import React from "react";
import { 
  FlaskConical, 
  Apple, 
  BookOpen, 
  Star, 
  ArrowRight, 
  Volume2, 
  Orbit 
} from "lucide-react";
import { sound } from "@/lib/sound";

interface LearningZonesGridProps {
  onSelectZone: (zoneId: string) => void;
  audioEnabled: boolean;
  liteMode: boolean;
}

export const LEARNING_ZONES = [
  {
    id: "sains",
    title: "Lab Sains",
    starsReward: 40,
    icon: FlaskConical,
    colorScheme: {
      bg: "bg-emerald-50",
      border: "border-emerald-400",
      shadow: "shadow-[0_8px_0_0_#059669]",
      btn: "bg-emerald-500 hover:bg-emerald-600 text-white border-emerald-600 shadow-[0_4px_0_0_#065f46]",
      gradient: "from-emerald-400 to-teal-500",
    },
    voiceSummary: "Selamat datang di Lab Sains! Di sini kamu bisa mencampur aneka cairan warna kimia dan melihat tahapan siklus air hujan!",
  },
  {
    id: "berhitung",
    title: "Hitung Ceria",
    starsReward: 35,
    icon: Apple,
    colorScheme: {
      bg: "bg-rose-50",
      border: "border-rose-400",
      shadow: "shadow-[0_8px_0_0_#e11d48]",
      btn: "bg-rose-500 hover:bg-rose-600 text-white border-rose-600 shadow-[0_4px_0_0_#9f1239]",
      gradient: "from-rose-400 to-pink-500",
    },
    voiceSummary: "Ayo berhitung bersama di Pohon Apel Ceria! Petik apel dan selesaikan tantangan penjumlahan konkret!",
  },
  {
    id: "tatasurya",
    title: "Tata Surya",
    starsReward: 35,
    icon: Orbit,
    colorScheme: {
      bg: "bg-indigo-50",
      border: "border-indigo-400",
      shadow: "shadow-[0_8px_0_0_#4338ca]",
      btn: "bg-indigo-600 hover:bg-indigo-700 text-white border-indigo-700 shadow-[0_4px_0_0_#312e81]",
      gradient: "from-indigo-500 via-purple-500 to-sky-500",
    },
    voiceSummary: "Ayo terbang menjelajah antariksa! Di Lab Tata Surya, kamu bisa memutar miniatur orbit matahari dan planet-planet berputar!",
  },
  {
    id: "cerita",
    title: "Cerita Nusantara",
    starsReward: 40,
    icon: BookOpen,
    colorScheme: {
      bg: "bg-purple-50",
      border: "border-purple-400",
      shadow: "shadow-[0_8px_0_0_#9333ea]",
      btn: "bg-purple-600 hover:bg-purple-700 text-white border-purple-700 shadow-[0_4px_0_0_#581c87]",
      gradient: "from-purple-400 to-pink-500",
    },
    voiceSummary: "Jelajahi keindahan budaya Indonesia lewat Cerita Nusantara! Dengarkan kisahnya dan pecahkan teka-teki kata!",
  },
];

export default function LearningZonesGrid({
  onSelectZone,
  audioEnabled,
  liteMode,
}: LearningZonesGridProps) {
  const handlePlayVoice = (text: string, e: React.MouseEvent) => {
    e.stopPropagation();
    sound.playChime();
    if (audioEnabled) {
      sound.speak(text);
    }
  };

  const handleZoneClick = (zoneId: string) => {
    sound.playChime();
    onSelectZone(zoneId);
  };

  return (
    <section className="py-6 sm:py-8">
      <div className="mb-5 sm:mb-6">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-display text-slate-800">
          Pilih Petualangan Serumu!
        </h2>
      </div>

      {/* Grid Cards (Responsive 4 Columns on large screens, 2 on tablet, 1 on mobile) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
        {LEARNING_ZONES.map((zone) => {
          const Icon = zone.icon;
          return (
            <div
              key={zone.id}
              onClick={() => handleZoneClick(zone.id)}
              className={`group relative rounded-3xl p-5 sm:p-6 flex flex-col justify-between border-4 transition-all duration-200 cursor-pointer ${
                zone.colorScheme.bg
              } ${zone.colorScheme.border} ${
                liteMode
                  ? ""
                  : zone.colorScheme.shadow + " hover:-translate-y-2 hover:shadow-[0_12px_0_0_rgba(0,0,0,0.15)]"
              }`}
            >
              {/* Bagian Atas: Tombol Suara Mini & Badge Reward Bintang */}
              <div className="flex items-center justify-between w-full">
                {/* Tombol audio narasi */}
                <button
                  onClick={(e) => handlePlayVoice(zone.voiceSummary, e)}
                  className="p-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border-2 border-slate-200 shadow-sm transition-transform active:scale-90"
                  title="Dengarkan penjelasan zona ini"
                >
                  <Volume2 className="w-4 h-4 text-sky-600" />
                </button>

                {/* Badge Reward Bintang */}
                <div className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-amber-400 text-amber-950 font-black text-xs sm:text-sm border-2 border-amber-500 shadow-sm">
                  <Star className="w-3.5 h-3.5 fill-amber-900" />
                  <span>+{zone.starsReward}</span>
                </div>
              </div>

              {/* Bagian Tengah: Ikon Besar & Judul Singkat Tebal Ceria */}
              <div className="my-6 sm:my-8 flex flex-col items-center text-center">
                <div
                  className={`w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-br ${zone.colorScheme.gradient} text-white flex items-center justify-center shadow-lg border-2 border-white/60 mb-4 transition-transform duration-300 ${
                    liteMode ? "" : "group-hover:scale-110 group-hover:rotate-3"
                  }`}
                >
                  <Icon className="w-10 h-10 sm:w-12 sm:h-12 drop-shadow-md" />
                </div>

                <h3 className="text-xl sm:text-2xl font-black font-display text-slate-800 tracking-wide group-hover:text-amber-800 transition-colors">
                  {zone.title}
                </h3>
              </div>

              {/* Bagian Bawah: Tombol Aksi Chunky Arcade */}
              <div className="w-full">
                <button
                  className={`w-full py-2.5 sm:py-3 px-4 rounded-2xl font-black text-xs sm:text-sm border-2 flex items-center justify-center gap-1.5 btn-chunky ${zone.colorScheme.btn}`}
                >
                  <span>Mainkan Sekarang</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
