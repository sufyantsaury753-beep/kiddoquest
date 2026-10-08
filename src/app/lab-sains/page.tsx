"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  FlaskConical,
  CloudRain,
  Sprout,
  Zap,
  Magnet,
  Star,
  ArrowRight,
  Sparkles,
  BookOpen,
  Award,
  Volume2,
  VolumeX,
  Compass,
  Home,
  CheckCircle2,
} from "lucide-react";
import { getStudentProfile, saveStudentProfile, StudentProfile, DEFAULT_PROFILE } from "@/lib/storage";
import { sound } from "@/lib/sound";

interface StationCardData {
  id: string;
  name: string;
  stationNumber: number;
  tag: string;
  route: string;
  desc: string;
  starReward: string;
  bgGradient: string;
  borderTheme: string;
  iconBg: string;
  iconColor: string;
  buttonClass: string;
  features: string[];
  Icon: React.ComponentType<{ className?: string }>;
}

const STATIONS: StationCardData[] = [
  {
    id: "warna",
    name: "Lab Warna & Pipet Ajaib",
    stationNumber: 1,
    tag: "Kimia & Seni",
    route: "/lab-sains/warna",
    desc: "Teteskan larutan primer dengan pipet kaca realistis, amati busa reaksi berbuih, aduk pusaran kimia, dan tuntaskan misi ramuan warna!",
    starReward: "+15 Bintang",
    bgGradient: "from-emerald-50 via-teal-50/50 to-white",
    borderTheme: "border-emerald-300 hover:border-emerald-500",
    iconBg: "bg-emerald-500 text-white",
    iconColor: "text-emerald-600",
    buttonClass: "bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-700 shadow-[0_3px_0_0_#065f46]",
    features: ["Pipet Kaca & Tetes Air", "Busa Reaksi Berbuih", "Misi Resep Warna IPAS"],
    Icon: FlaskConical,
  },
  {
    id: "siklus-air",
    name: "Simulasi Siklus Air Bumi",
    stationNumber: 2,
    tag: "Bumi & Cuaca",
    route: "/lab-sains/siklus-air",
    desc: "Simulasikan panas matahari, penguapan air samudra (evaporasi), pembentukan awan mendung (kondensasi), hingga turun hujan lebat (presipitasi)!",
    starReward: "+15 Bintang",
    bgGradient: "from-sky-50 via-blue-50/50 to-white",
    borderTheme: "border-sky-300 hover:border-sky-500",
    iconBg: "bg-sky-500 text-white",
    iconColor: "text-sky-600",
    buttonClass: "bg-sky-600 hover:bg-sky-700 text-white border-sky-700 shadow-[0_3px_0_0_#0369a1]",
    features: ["3 Fase Siklus Air", "Efek Partikel Hujan & Uap", "Narasi Suara Tobi Interaktif"],
    Icon: CloudRain,
  },
  {
    id: "rantai-makanan",
    name: "Rantai Makanan & Krisis Ekosistem",
    stationNumber: 3,
    tag: "Biologi & Ekologi",
    route: "/lab-sains/rantai-makanan",
    desc: "Tebak misteri peran ekologi makhluk hidup di ekosistem sawah & samudra tropis, serta telusuri laboratorium krisis kepunahan spesies!",
    starReward: "+40 Bintang",
    bgGradient: "from-teal-50 via-emerald-50/50 to-white",
    borderTheme: "border-teal-300 hover:border-teal-500",
    iconBg: "bg-teal-500 text-white",
    iconColor: "text-teal-600",
    buttonClass: "bg-teal-600 hover:bg-teal-700 text-white border-teal-700 shadow-[0_3px_0_0_#0f766e]",
    features: ["Mode Detektif Tanpa Bocoran", "Efek Aksi Terkam HAP!", "4 Skenario Krisis Kepunahan"],
    Icon: Sprout,
  },
  {
    id: "listrik",
    name: "Laboratorium Rakit Listrik",
    stationNumber: 4,
    tag: "Fisika Kelistrikan",
    route: "/lab-sains/listrik",
    desc: "Rakit baterai, saklar, dan bohlam lampu secara mandiri di sirkuit terbuka vs tertutup. Uji celah konduktor vs isolator dan rangkaian seri-paralel!",
    starReward: "+50 Bintang",
    bgGradient: "from-amber-50 via-yellow-50/50 to-white",
    borderTheme: "border-amber-300 hover:border-amber-500",
    iconBg: "bg-amber-500 text-slate-950",
    iconColor: "text-amber-600",
    buttonClass: "bg-amber-500 hover:bg-amber-600 text-slate-950 border-amber-600 shadow-[0_3px_0_0_#b45309]",
    features: ["Puzzle Perakitan Mandiri", "Uji Celah Konduktor & Isolator", "Simulasi Seri & Paralel"],
    Icon: Zap,
  },
  {
    id: "magnet",
    name: "Petualangan Magnet Hunter",
    stationNumber: 5,
    tag: "Fisika Kemagnetan",
    route: "/lab-sains/magnet",
    desc: "Uji 8 benda percobaan pada medan kutub magnet ladam U! Rasakan efek tarikan kutub dan pelajari perbedaan benda feromagnetik vs non-magnetik.",
    starReward: "+45 Bintang",
    bgGradient: "from-rose-50 via-pink-50/50 to-white",
    borderTheme: "border-rose-300 hover:border-rose-500",
    iconBg: "bg-rose-500 text-white",
    iconColor: "text-rose-600",
    buttonClass: "bg-rose-600 hover:bg-rose-700 text-white border-rose-700 shadow-[0_3px_0_0_#be123c]",
    features: ["Simulasi U-Magnet Ladam", "8 Objek Uji Interaktif", "Efek Goyang & Snap Kemagnetan"],
    Icon: Magnet,
  },
];

export default function ScienceLobbyPage() {
  const [profile, setProfile] = useState<StudentProfile>(DEFAULT_PROFILE);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = getStudentProfile();
    setProfile(stored);
    setMounted(true);
  }, []);

  const handleToggleAudio = () => {
    const nextVal = !profile.audioEnabled;
    const updated = saveStudentProfile({ audioEnabled: nextVal });
    setProfile(updated);
    if (nextVal) {
      sound.playChime();
      sound.speak("Suara panduan Tobi diaktifkan.");
    }
  };

  const handleLobbyWelcomeSpeech = () => {
    sound.playChime();
    if (!profile.audioEnabled) return;
    sound.speak(
      "Selamat datang di Laboratorium Sains TobiQuest! Pilih salah satu dari 5 stasiun laboratorium untuk mulai bereksperimen!"
    );
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-16">
      {/* Lobby Top Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b-2 border-slate-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-3 sm:px-4 py-2.5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/"
              onClick={() => sound.playPop()}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-amber-100 text-slate-700 hover:text-amber-900 text-xs sm:text-sm font-bold border border-slate-200 transition-all btn-chunky"
            >
              <Home className="w-4 h-4" />
              <span className="hidden sm:inline">Beranda</span>
            </Link>

            <div className="h-5 w-px bg-slate-200" />

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500 to-yellow-400 text-slate-950 flex items-center justify-center font-black shadow-sm">
                <FlaskConical className="w-4 h-4" />
              </div>
              <div>
                <h1 className="text-xs sm:text-sm font-black text-slate-900 leading-tight">
                  Lab Sains Terpadu
                </h1>
                <p className="text-[10px] text-slate-500 font-bold hidden sm:block">
                  Kurikulum Merdeka IPAS SD
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Stars Counter */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 shadow-sm">
              <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
              <span className="text-xs sm:text-sm font-black">{profile.stars}</span>
            </div>

            {/* Audio Toggle */}
            <button
              onClick={handleToggleAudio}
              className={`p-2 rounded-xl border transition-all btn-chunky flex items-center justify-center ${
                profile.audioEnabled
                  ? "bg-amber-100 text-amber-900 border-amber-300"
                  : "bg-slate-100 text-slate-500 border-slate-200"
              }`}
              title={profile.audioEnabled ? "Matikan Suara" : "Nyalakan Suara"}
            >
              {profile.audioEnabled ? (
                <Volume2 className="w-4 h-4" />
              ) : (
                <VolumeX className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-3 sm:px-4 pt-4 sm:pt-6 space-y-6 sm:space-y-8">
        {/* Hero Section */}
        <div className="relative rounded-3xl bg-gradient-to-br from-indigo-900 via-slate-900 to-sky-950 text-white p-5 sm:p-8 shadow-xl overflow-hidden border-4 border-indigo-950">
          <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/30 border border-indigo-400/40 text-indigo-200 text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Pusat Eksplorasi Sains & Fisika SD Merdeka</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
                Pilih Stasiun Laboratorium Sains
              </h2>

              <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
                Jadilah ilmuwan cilik penemu hal-hal menakjubkan! Pilih stasiun eksperimen di bawah ini untuk belajar warna, siklus air bumi, rantai makanan ekosistem, rakit sirkuit listrik, hingga gaya tarik magnet!
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  onClick={handleLobbyWelcomeSpeech}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 transition-all btn-chunky"
                >
                  <Volume2 className="w-4 h-4 text-amber-300" />
                  <span>Dengarkan Sambutan Tobi</span>
                </button>

                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-400/20 text-amber-300 text-xs font-bold border border-amber-400/30">
                  <Award className="w-3.5 h-3.5" />
                  <span>Total +165 Bintang Hadiah</span>
                </div>
              </div>
            </div>

            {/* Quick Stats Box */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15 sm:min-w-[220px] space-y-3">
              <div className="flex items-center gap-2">
                <Compass className="w-5 h-5 text-amber-400" />
                <h4 className="font-black text-sm text-white">5 Stasiun Sains</h4>
              </div>
              <ul className="text-xs text-slate-200 space-y-1.5">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>Stasiun 1: Lab Warna</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-sky-400" />
                  <span>Stasiun 2: Siklus Air</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-teal-400" />
                  <span>Stasiun 3: Rantai Makanan</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  <span>Stasiun 4: Rakit Listrik</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-rose-400" />
                  <span>Stasiun 5: Magnet Hunter</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* 5 Station Grid Cards */}
        <section className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <FlaskConical className="w-5 h-5 text-indigo-600" />
              <h3 className="text-base sm:text-lg font-black text-slate-900">
                Daftar Stasiun Eksperimen Mandiri
              </h3>
            </div>
            <span className="text-xs font-bold text-slate-500">
              5 Stasiun Siap Digunakan
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {STATIONS.map((station) => {
              const IconComponent = station.Icon;
              return (
                <div
                  key={station.id}
                  className={`rounded-3xl border-3 p-5 sm:p-6 bg-gradient-to-br ${station.bgGradient} ${station.borderTheme} shadow-md transition-all flex flex-col justify-between group`}
                >
                  <div className="space-y-4">
                    {/* Header: Station number, tag, and reward */}
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] font-black uppercase tracking-wider text-slate-500">
                        Stasiun {station.stationNumber}
                      </span>

                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-white text-slate-700 border border-slate-200">
                          {station.tag}
                        </span>
                        <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 flex items-center gap-1">
                          <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                          {station.starReward}
                        </span>
                      </div>
                    </div>

                    {/* Icon and Title */}
                    <div className="flex items-start gap-3.5">
                      <div
                        className={`w-12 h-12 rounded-2xl ${station.iconBg} flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-105 transition-transform`}
                      >
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-black text-base sm:text-lg text-slate-900 leading-tight">
                          {station.name}
                        </h4>
                        <span className={`text-xs font-bold ${station.iconColor}`}>
                          Eksperimen Interaktif
                        </span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                      {station.desc}
                    </p>

                    {/* Feature Highlights */}
                    <div className="space-y-1.5 pt-1 border-t border-slate-200/80">
                      {station.features.map((feat, i) => (
                        <div key={i} className="flex items-center gap-2 text-[11px] text-slate-600 font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Link Button (Zero-Emoji strictly maintained) */}
                  <div className="pt-5">
                    <Link
                      href={station.route}
                      onClick={() => sound.playPop()}
                      className={`w-full py-2.5 px-4 rounded-2xl font-black text-xs sm:text-sm border-2 flex items-center justify-center gap-2 transition-all btn-chunky ${station.buttonClass}`}
                    >
                      <span>Masuk Stasiun Eksperimen</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Footer Concept Note */}
        <div className="bg-white rounded-3xl p-4 sm:p-6 border-2 border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center flex-shrink-0">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-black text-sm text-slate-900">
                Pendekatan Pembelajaran Inkuiri & Eksperimen Mandiri
              </h5>
              <p className="text-xs text-slate-600 font-medium leading-relaxed max-w-2xl">
                Seluruh stasiun laboratorium dirancang dengan metode hands-on virtual dan umpan balik Sokrates. Anak dibebaskan mencoba, mengamati sebab-akibat, dan merumuskan kesimpulan sains tanpa rasa takut berbuat salah.
              </p>
            </div>
          </div>

          <Link
            href="/"
            onClick={() => sound.playPop()}
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs sm:text-sm font-black border border-slate-300 transition-all btn-chunky shrink-0"
          >
            <Home className="w-4 h-4" />
            <span>Kembali ke Beranda TobiQuest</span>
          </Link>
        </div>
      </main>
    </div>
  );
}
