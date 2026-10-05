"use client";

import React from "react";
import { 
  FlaskConical, 
  Apple, 
  BookOpen, 
  Star, 
  ArrowRight, 
  Volume2, 
  Sparkles,
  Droplets,
  Layers,
  MapPin,
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
    title: "Lab Sains Cilik",
    subtitle: "Eksperimen Campur Warna Ajaib, Misi Resep & Siklus Air",
    target: "Sains SD (Kelas 1–6)",
    starsReward: 40,
    icon: FlaskConical,
    colorScheme: {
      bg: "bg-emerald-50",
      border: "border-emerald-400",
      shadow: "shadow-[0_8px_0_0_#059669]",
      badge: "bg-emerald-100 text-emerald-800 border-emerald-300",
      btn: "bg-emerald-500 hover:bg-emerald-600 text-white border-emerald-600 shadow-[0_4px_0_0_#065f46]",
      gradient: "from-emerald-400 to-teal-500",
      iconColor: "text-emerald-500",
    },
    voiceSummary: "Selamat datang di Lab Sains Cilik! Di sini kamu bisa mencampur 5 warna ajaib termasuk putih dan hitam, bermain misi resep rahasia Tobi, dan melihat siklus hujan!",
    features: [
      { icon: FlaskConical, text: "5 Tabung Reaksi: Primer + Putih ⚪ & Hitam ⚫" },
      { icon: Sparkles, text: "Misi Resep Warna Ajaib Berhadiah Bintang" },
    ],
    status: "Diperbarui (Tahap 2)",
  },
  {
    id: "berhitung",
    title: "Petualangan Berhitung",
    subtitle: "Pohon Apel Target Acak & Penjumlahan Visual (CPA)",
    target: "Matematika SD (Kelas 1–4)",
    starsReward: 35,
    icon: Apple,
    colorScheme: {
      bg: "bg-rose-50",
      border: "border-rose-400",
      shadow: "shadow-[0_8px_0_0_#e11d48]",
      badge: "bg-rose-100 text-rose-800 border-rose-300",
      btn: "bg-rose-500 hover:bg-rose-600 text-white border-rose-600 shadow-[0_4px_0_0_#9f1239]",
      gradient: "from-rose-400 to-pink-500",
      iconColor: "text-rose-500",
    },
    voiceSummary: "Ayo berhitung bersama di Pohon Apel Ajaib! Sekarang ada target acak 1 sampai 10 dan soal cerita penjumlahan visual nyata di keranjang!",
    features: [
      { icon: Apple, text: "Target Apel Dinamis Diacak Otomatis (1–10)" },
      { icon: Layers, text: "Mode Soal Cerita Penjumlahan Konkret (A + B = C)" },
    ],
    status: "Diperbarui (Tahap 2)",
  },
  {
    id: "tatasurya",
    title: "Lab Tata Surya Cilik",
    subtitle: "Miniatur Orbit Matahari & Eksplorasi Planet Ceria",
    target: "IPA Astronomi (Kelas 3–6)",
    starsReward: 35,
    icon: Orbit,
    colorScheme: {
      bg: "bg-indigo-50",
      border: "border-indigo-400",
      shadow: "shadow-[0_8px_0_0_#4338ca]",
      badge: "bg-indigo-100 text-indigo-800 border-indigo-300",
      btn: "bg-indigo-600 hover:bg-indigo-700 text-white border-indigo-700 shadow-[0_4px_0_0_#312e81]",
      gradient: "from-indigo-500 via-purple-500 to-sky-500",
      iconColor: "text-indigo-600",
    },
    voiceSummary: "Ayo terbang menjelajah antariksa! Di Lab Tata Surya, kamu bisa memutar miniatur orbit matahari, bumi, mars, jupiter, dan cincin indah saturnus dengan narasi suara Tobi!",
    features: [
      { icon: Orbit, text: "Miniatur Orbit: Matahari & 6 Planet Utama" },
      { icon: Sparkles, text: "Sentuh Planet Berputar & Narasi Suara Astronomi" },
    ],
    status: "Modul Baru (Tahap 2)",
  },
  {
    id: "cerita",
    title: "Cerita Nusantara",
    subtitle: "Literasi Bergambar & Legenda Kekayaan Budaya Indonesia",
    target: "Literasi SD (Kelas 1–6)",
    starsReward: 40,
    icon: BookOpen,
    colorScheme: {
      bg: "bg-purple-50",
      border: "border-purple-400",
      shadow: "shadow-[0_8px_0_0_#9333ea]",
      badge: "bg-purple-100 text-purple-800 border-purple-300",
      btn: "bg-purple-600 hover:bg-purple-700 text-white border-purple-700 shadow-[0_4px_0_0_#581c87]",
      gradient: "from-purple-400 to-pink-500",
      iconColor: "text-purple-600",
    },
    voiceSummary: "Jelajahi keindahan Indonesia lewat Cerita Nusantara! Ada kisah Komodo dari NTT, Rumah Gadang dari Padang, dan Candi Borobudur. Dengarkan ceritanya dan tebak kata rahasia!",
    features: [
      { icon: MapPin, text: "Jelajah Pulau: Komodo NTT & Rumah Gadang" },
      { icon: Sparkles, text: "Audio Cerita Karaoke & Kuis Susun Kata" },
    ],
    status: "Siap Dimainkan",
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

      {/* Grid Cards (Responsive 4 Columns on large screen, 2 on tablet, 1 on mobile) */}
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
                liteMode ? "" : zone.colorScheme.shadow + " hover:-translate-y-1.5 hover:shadow-[0_12px_0_0_rgba(0,0,0,0.15)]"
              }`}
            >
              {/* Top Row: Icon + Reward + Voice Button */}
              <div>
                <div className="flex items-start justify-between gap-2 mb-3.5">
                  <div
                    className={`w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br ${zone.colorScheme.gradient} text-white flex items-center justify-center shadow-md ${
                      liteMode ? "" : "group-hover:scale-110"
                    } transition-transform`}
                  >
                    <Icon className="w-7 h-7 sm:w-8 sm:h-8" />
                  </div>

                  <div className="flex items-center gap-1.5">
                    {/* Read summary voice button */}
                    <button
                      onClick={(e) => handlePlayVoice(zone.voiceSummary, e)}
                      className="p-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border-2 border-slate-200 shadow-sm transition-colors"
                      title="Dengarkan penjelasan zona ini"
                    >
                      <Volume2 className="w-3.5 h-3.5 text-sky-600" />
                    </button>

                    {/* Star Reward Badge */}
                    <div className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-amber-400 text-amber-950 font-black text-xs border border-amber-500 shadow-sm">
                      <Star className="w-3 h-3 fill-amber-900" />
                      <span>+{zone.starsReward}</span>
                    </div>
                  </div>
                </div>

                {/* Target Audience Pill & Status */}
                <div className="flex items-center gap-1.5 mb-2">
                  <span className={`inline-block text-[10px] font-black px-2 py-0.5 rounded-full border ${zone.colorScheme.badge}`}>
                    {zone.target}
                  </span>
                  {zone.status.includes("Tahap 2") && (
                    <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded-md bg-amber-300 text-amber-950 border border-amber-400">
                      Baru ✨
                    </span>
                  )}
                </div>

                {/* Title and Subtitle */}
                <h3 className="text-lg sm:text-xl font-extrabold font-display text-slate-800 mb-1.5 group-hover:text-amber-800 transition-colors leading-snug">
                  {zone.title}
                </h3>
                <p className="text-xs font-medium text-slate-600 leading-relaxed mb-4 line-clamp-2">
                  {zone.subtitle}
                </p>

                {/* Key interactive features */}
                <div className="space-y-1.5 mb-5">
                  {zone.features.map((feat, idx) => {
                    const FeatIcon = feat.icon;
                    return (
                      <div
                        key={idx}
                        className="flex items-center gap-2 text-[11px] font-semibold text-slate-700 bg-white/80 rounded-xl p-2 border border-slate-200/80"
                      >
                        <FeatIcon className={`w-3.5 h-3.5 flex-shrink-0 ${zone.colorScheme.iconColor}`} />
                        <span className="line-clamp-1">{feat.text}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <button
                  className={`w-full py-2.5 px-3 rounded-2xl font-black text-xs sm:text-sm border-2 flex items-center justify-center gap-1.5 btn-chunky ${zone.colorScheme.btn}`}
                >
                  <span>Mulai Eksplorasi</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
