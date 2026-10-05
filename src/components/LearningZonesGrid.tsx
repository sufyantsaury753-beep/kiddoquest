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
  MapPin
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
    subtitle: "Eksperimen Pencampuran Warna & Siklus Air Hujan",
    target: "Sains SD (Kelas 1–6)",
    starsReward: 30,
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
    voiceSummary: "Selamat datang di Lab Sains Cilik! Di sini kamu bisa mencampur warna-warna ajaib di tabung reaksi dan melihat bagaimana air laut menguap menjadi awan dan hujan!",
    features: [
      { icon: FlaskConical, text: "Campur Cat Warna: Merah + Kuning = Oranye!" },
      { icon: Droplets, text: "Simulasi Siklus Air: Penguapan hingga Hujan" },
    ],
    status: "Siap Dimainkan",
  },
  {
    id: "berhitung",
    title: "Petualangan Berhitung Ceria",
    subtitle: "Manipulatif Visual Buah Apel & Keranjang Ajaib",
    target: "Matematika SD (Kelas 1–4)",
    starsReward: 30,
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
    voiceSummary: "Ayo berhitung bersama di Pohon Apel Ajaib! Kamu bisa memetik apel manis dan menghitung jumlahnya ke dalam keranjang. Belajar tambah dan kurang jadi sangat mudah dan seru!",
    features: [
      { icon: Apple, text: "Petik Apel Visual (Sentuh & Geser ke Keranjang)" },
      { icon: Layers, text: "Metode CPA: Konkret, Gambar, dan Angka Nyata" },
    ],
    status: "Siap Dimainkan",
  },
  {
    id: "cerita",
    title: "Tebak Kata & Cerita Nusantara",
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
      gradient: "from-purple-400 to-indigo-500",
      iconColor: "text-purple-600",
    },
    voiceSummary: "Jelajahi keindahan Indonesia lewat Cerita Nusantara! Ada kisah Komodo dari NTT, Rumah Gadang dari Padang, dan Candi Borobudur. Dengarkan ceritanya dan tebak kata rahasia!",
    features: [
      { icon: MapPin, text: "Jelajah Pulau: Komodo NTT & Rumah Gadang" },
      { icon: Sparkles, text: "Audio Cerita Suara & Tebak Kata Huruf Bergambar" },
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
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-amber-200 text-amber-900 border border-amber-400 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Zona Petualangan Belajar Kurikulum Merdeka</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-display text-slate-800">
            Pilih Petualangan Serumu! 🚀
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-medium">
            Setiap zona dirancang visual, interaktif, dan memberikan bintang penghargaan.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-bold text-slate-500 bg-white px-3 py-2 rounded-2xl border border-slate-200 self-start sm:self-auto">
          <span>Target Usia: SD Kelas 1–6</span>
        </div>
      </div>

      {/* Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7">
        {LEARNING_ZONES.map((zone) => {
          const Icon = zone.icon;
          return (
            <div
              key={zone.id}
              onClick={() => handleZoneClick(zone.id)}
              className={`group relative rounded-3xl p-6 sm:p-7 flex flex-col justify-between border-4 transition-all duration-200 cursor-pointer ${
                zone.colorScheme.bg
              } ${zone.colorScheme.border} ${
                liteMode ? "" : zone.colorScheme.shadow + " hover:-translate-y-1.5 hover:shadow-[0_12px_0_0_rgba(0,0,0,0.15)]"
              }`}
            >
              {/* Top Row: Icon + Reward + Voice Button */}
              <div>
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div
                    className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br ${zone.colorScheme.gradient} text-white flex items-center justify-center shadow-md ${
                      liteMode ? "" : "group-hover:scale-110"
                    } transition-transform`}
                  >
                    <Icon className="w-8 h-8 sm:w-9 sm:h-9" />
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Read summary voice button */}
                    <button
                      onClick={(e) => handlePlayVoice(zone.voiceSummary, e)}
                      className="p-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border-2 border-slate-200 shadow-sm transition-colors"
                      title="Dengarkan penjelasan zona ini"
                    >
                      <Volume2 className="w-4 h-4 text-sky-600" />
                    </button>

                    {/* Star Reward Badge */}
                    <div className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-amber-400 text-amber-950 font-black text-xs border border-amber-500 shadow-sm">
                      <Star className="w-3.5 h-3.5 fill-amber-900" />
                      <span>+{zone.starsReward}</span>
                    </div>
                  </div>
                </div>

                {/* Target Audience Pill */}
                <span className={`inline-block text-[11px] font-black px-2.5 py-0.5 rounded-full border mb-2 ${zone.colorScheme.badge}`}>
                  {zone.target}
                </span>

                {/* Title and Subtitle */}
                <h3 className="text-xl sm:text-2xl font-extrabold font-display text-slate-800 mb-2 group-hover:text-amber-800 transition-colors">
                  {zone.title}
                </h3>
                <p className="text-xs sm:text-sm font-medium text-slate-600 leading-relaxed mb-4">
                  {zone.subtitle}
                </p>

                {/* Key interactive features */}
                <div className="space-y-2 mb-6">
                  {zone.features.map((feat, idx) => {
                    const FeatIcon = feat.icon;
                    return (
                      <div
                        key={idx}
                        className="flex items-center gap-2 text-xs font-semibold text-slate-700 bg-white/80 rounded-xl p-2 border border-slate-200/80"
                      >
                        <FeatIcon className={`w-4 h-4 flex-shrink-0 ${zone.colorScheme.iconColor}`} />
                        <span>{feat.text}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <button
                  className={`w-full py-3 px-4 rounded-2xl font-black text-sm sm:text-base border-2 flex items-center justify-center gap-2 btn-chunky ${zone.colorScheme.btn}`}
                >
                  <span>Mulai Eksplorasi</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
