"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  FlaskConical,
  Home,
  Star,
  Volume2,
  VolumeX,
  ArrowRight,
  Compass,
  Sparkles,
  Info,
} from "lucide-react";
import { getStudentProfile, saveStudentProfile, StudentProfile, DEFAULT_PROFILE } from "@/lib/storage";
import { sound } from "@/lib/sound";

interface MapStationHotspot {
  id: string;
  stationNumber: number;
  name: string;
  shortTag: string;
  route: string;
  leftPercent: number;
  topPercent: number;
  iconWebp: string;
  themeBorder: string;
  themeShadow: string;
  themeBadgeBg: string;
  themeGlow: string;
  popoverPlacement: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  socraticSpeech: string;
  rewardStar: string;
  desc: string;
}

const MAP_HOTSPOTS: MapStationHotspot[] = [
  {
    id: "warna",
    stationNumber: 1,
    name: "Stasiun 1: Lab Warna & Pipet Ajaib",
    shortTag: "Kimia & Seni",
    route: "/lab-sains/warna",
    leftPercent: 24.5,
    topPercent: 52.7,
    iconWebp: "/images/science/icon_warna.webp",
    themeBorder: "border-emerald-500",
    themeShadow: "shadow-[0_4px_0_0_#059669]",
    themeBadgeBg: "bg-emerald-500",
    themeGlow: "bg-emerald-400/30",
    popoverPlacement: "top-right",
    socraticSpeech: "Stasiun satu: Lab Warna dan Pipet Ajaib! Ayo teteskan larutan primer dan amati busa reaksi berbuih!",
    rewardStar: "+15 Bintang",
    desc: "Teteskan cairan dengan pipet kaca, aduk pusaran kimia, dan racik ramuan warna ajaib!",
  },
  {
    id: "siklus-air",
    stationNumber: 2,
    name: "Stasiun 2: Simulasi Siklus Air Bumi",
    shortTag: "Bumi & Cuaca",
    route: "/lab-sains/siklus-air",
    leftPercent: 78.4,
    topPercent: 32.7,
    iconWebp: "/images/science/icon_air.webp",
    themeBorder: "border-sky-500",
    themeShadow: "shadow-[0_4px_0_0_#0284c7]",
    themeBadgeBg: "bg-sky-500",
    themeGlow: "bg-sky-400/30",
    popoverPlacement: "bottom-left",
    socraticSpeech: "Stasiun dua: Simulasi Siklus Air Bumi! Amati penguapan air samudra hingga turun hujan badai!",
    rewardStar: "+15 Bintang",
    desc: "Simulasikan evaporasi samudra, awan kondensasi, dan turunnya presipitasi hujan!",
  },
  {
    id: "rantai-makanan",
    stationNumber: 3,
    name: "Stasiun 3: Rantai Makanan Ekosistem",
    shortTag: "Biologi & Ekologi",
    route: "/lab-sains/rantai-makanan",
    leftPercent: 24.5,
    topPercent: 22.8,
    iconWebp: "/images/science/icon_rantai.webp",
    themeBorder: "border-teal-500",
    themeShadow: "shadow-[0_4px_0_0_#0f766e]",
    themeBadgeBg: "bg-teal-500",
    themeGlow: "bg-teal-400/30",
    popoverPlacement: "bottom-right",
    socraticSpeech: "Stasiun tiga: Rantai Makanan dan Krisis Ekosistem! Tebak peran makhluk hidup sawah dan samudra!",
    rewardStar: "+40 Bintang",
    desc: "Detektif peran organisme hidup serta laboratorium dampak kepunahan spesies!",
  },
  {
    id: "listrik",
    stationNumber: 4,
    name: "Stasiun 4: Rakit Sirkuit Listrik",
    shortTag: "Fisika Kelistrikan",
    route: "/lab-sains/listrik",
    leftPercent: 47.4,
    topPercent: 83.5,
    iconWebp: "/images/science/icon_listrik.webp",
    themeBorder: "border-amber-500",
    themeShadow: "shadow-[0_4px_0_0_#d97706]",
    themeBadgeBg: "bg-amber-500",
    themeGlow: "bg-amber-400/30",
    popoverPlacement: "top-right",
    socraticSpeech: "Stasiun empat: Rakit Sirkuit Listrik! Sambungkan baterai, saklar, dan lampu secara mandiri!",
    rewardStar: "+50 Bintang",
    desc: "Rakit mandiri baterai, saklar, bohlam lampu, konduktor vs isolator, seri & paralel!",
  },
  {
    id: "magnet",
    stationNumber: 5,
    name: "Stasiun 5: Petualangan Magnet Hunter",
    shortTag: "Fisika Kemagnetan",
    route: "/lab-sains/magnet",
    leftPercent: 75.8,
    topPercent: 68.6,
    iconWebp: "/images/science/icon_magnet.webp",
    themeBorder: "border-rose-500",
    themeShadow: "shadow-[0_4px_0_0_#e11d48]",
    themeBadgeBg: "bg-rose-500",
    themeGlow: "bg-rose-400/30",
    popoverPlacement: "top-left",
    socraticSpeech: "Stasiun lima: Petualangan Magnet Hunter! Uji benda feromagnetik pada kutub magnet ladam!",
    rewardStar: "+45 Bintang",
    desc: "Uji 8 benda percobaan pada medan kutub magnet ladam U dan bedakan sifat magnetik!",
  },
];

export default function InteractiveScienceLobbyPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<StudentProfile>(DEFAULT_PROFILE);
  const [mounted, setMounted] = useState(false);
  const [activeHotspotId, setActiveHotspotId] = useState<string | null>(null);

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

  const handleHotspotClick = (hs: MapStationHotspot) => {
    sound.playPop();

    if (activeHotspotId === hs.id) {
      // Tap kedua langsung membuka rute
      sound.playCelebration();
      router.push(hs.route);
      return;
    }

    setActiveHotspotId(hs.id);
    if (profile.audioEnabled) {
      sound.speak(hs.socraticSpeech);
    }
  };

  const handleHotspotHover = (hs: MapStationHotspot) => {
    if (activeHotspotId !== hs.id) {
      setActiveHotspotId(hs.id);
      if (profile.audioEnabled) {
        sound.speak(hs.socraticSpeech);
      }
    }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-slate-100 font-sans pb-12 select-none">
      {/* Top Navigation Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b-4 border-amber-200/80 shadow-md no-print">
        <div className="max-w-6xl mx-auto px-3 sm:px-4 py-2 sm:py-2.5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/"
              onClick={() => sound.playPop()}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-bold border-2 border-slate-300 transition-all btn-chunky"
              title="Kembali ke Beranda TobiQuest"
            >
              <Home className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Beranda</span>
            </Link>

            <div className="h-5 w-px bg-slate-200" />

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500 to-yellow-400 text-slate-950 flex items-center justify-center font-black shadow-sm">
                <Compass className="w-4 h-4" />
              </div>
              <div>
                <h1 className="text-xs sm:text-sm font-black text-slate-900 leading-tight">
                  Peta Laboratorium Sains
                </h1>
                <p className="text-[10px] text-slate-500 font-bold hidden sm:block">
                  Pilih stasiun pada peta untuk mulai eksperimen
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Stars Counter */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-400 text-amber-950 font-black text-xs sm:text-sm border-2 border-amber-500 shadow-[0_2px_0_0_#b45309]">
              <Star className="w-3.5 h-3.5 fill-amber-950 text-amber-950" />
              <span>{profile.stars}</span>
            </div>

            {/* Audio Toggle */}
            <button
              onClick={handleToggleAudio}
              className={`p-2 rounded-xl border-2 transition-all btn-chunky flex items-center justify-center ${
                profile.audioEnabled
                  ? "bg-sky-100 text-sky-800 border-sky-300 shadow-[0_2px_0_0_#0284c7]"
                  : "bg-slate-100 text-slate-500 border-slate-300 shadow-[0_2px_0_0_#94a3b8]"
              }`}
              title={profile.audioEnabled ? "Matikan Suara Tobi" : "Nyalakan Suara Tobi"}
            >
              {profile.audioEnabled ? (
                <Volume2 className="w-4 h-4 text-sky-600 animate-pulse" />
              ) : (
                <VolumeX className="w-4 h-4 text-slate-500" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Map Container */}
      <main className="max-w-4xl mx-auto px-3 sm:px-4 pt-3 sm:pt-5 space-y-3 sm:space-y-4">
        {/* Helper Hint Bar */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-2.5 sm:p-3 border-2 border-slate-200/80 shadow-sm flex items-center justify-between gap-3 text-slate-700">
          <div className="flex items-center gap-2 text-xs sm:text-sm font-bold">
            <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
            <span>Sentuh lingkaran stasiun di dalam laboratorium untuk memulai petualangan!</span>
          </div>
          <div className="hidden sm:flex items-center gap-1 text-[11px] font-bold text-slate-500">
            <Info className="w-3.5 h-3.5" />
            <span>5 Stasiun Tersedia</span>
          </div>
        </div>

        {/* Papan Kanvas Peta Laboratorium Sains (Aspect Ratio 819/1024) */}
        <div className="relative w-full max-w-2xl sm:max-w-2xl lg:max-w-3xl mx-auto aspect-[819/1024] rounded-3xl sm:rounded-[36px] overflow-hidden border-4 sm:border-6 border-slate-800 shadow-2xl bg-slate-950">
          {/* Gambar Latar Belakang Ruangan Lab Sains (< 30 KB WebP) */}
          <Image
            src="/images/science/lab_room_map.webp"
            alt="Peta Laboratorium Sains TobiQuest"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 819px"
            className="object-cover pointer-events-none select-none"
          />

          {/* Backdrop click to dismiss open tooltip */}
          <div
            className="absolute inset-0 z-10"
            onClick={() => setActiveHotspotId(null)}
          />

          {/* 5 Tombol Bulat Interaktif (Hotspot Nodes) */}
          {MAP_HOTSPOTS.map((hs) => {
            const isSelected = activeHotspotId === hs.id;

            // Popover positioning logic based on quadrant placement
            let popoverStyle = "";
            switch (hs.popoverPlacement) {
              case "top-left":
                popoverStyle = "bottom-full right-0 mb-2.5 sm:mb-3";
                break;
              case "top-right":
                popoverStyle = "bottom-full left-0 mb-2.5 sm:mb-3";
                break;
              case "bottom-left":
                popoverStyle = "top-full right-0 mt-2.5 sm:mt-3";
                break;
              case "bottom-right":
              default:
                popoverStyle = "top-full left-0 mt-2.5 sm:mt-3";
                break;
            }

            return (
              <div
                key={hs.id}
                style={{
                  left: `${hs.leftPercent}%`,
                  top: `${hs.topPercent}%`,
                }}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group"
              >
                {/* Subtle Pulse Glow Ring */}
                <div
                  className={`absolute -inset-2 sm:-inset-2.5 rounded-full ${hs.themeGlow} animate-ping pointer-events-none ${
                    isSelected ? "opacity-100" : "opacity-40"
                  }`}
                />

                {/* Main Circular Button Node */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleHotspotClick(hs);
                  }}
                  onMouseEnter={() => handleHotspotHover(hs)}
                  className={`relative w-14 h-14 sm:w-18 sm:h-18 md:w-20 md:h-20 rounded-full bg-white border-3 sm:border-4 ${
                    hs.themeBorder
                  } ${hs.themeShadow} flex items-center justify-center transition-transform active:scale-90 cursor-pointer ${
                    isSelected ? "scale-110 ring-4 ring-amber-400" : "hover:scale-105"
                  }`}
                  title={hs.name}
                >
                  {/* Badge Angka Stasiun di Sudut Atas */}
                  <span
                    className={`absolute -top-1.5 -right-1.5 sm:-top-2 sm:-right-2 w-5 h-5 sm:w-6 sm:h-6 rounded-full ${hs.themeBadgeBg} text-white font-black text-[10px] sm:text-xs flex items-center justify-center border-2 border-white shadow-md`}
                  >
                    {hs.stationNumber}
                  </span>

                  {/* Gambar Karakter Stasiun WebP (< 18 KB) */}
                  <div className="relative w-9 h-9 sm:w-12 sm:h-12 md:w-14 md:h-14 flex items-center justify-center">
                    <Image
                      src={hs.iconWebp}
                      alt={hs.name}
                      fill
                      sizes="80px"
                      className="object-contain drop-shadow-sm select-none pointer-events-none group-hover:scale-110 transition-transform"
                    />
                  </div>
                </button>

                {/* Balon Bicara Popover Tooltip saat Node Aktif */}
                {isSelected && (
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className={`absolute ${popoverStyle} z-30 min-w-[200px] sm:min-w-[240px] max-w-[260px] sm:max-w-[280px] bg-white/95 backdrop-blur-md rounded-2xl p-3 sm:p-3.5 border-2 border-slate-700 shadow-2xl animate-in fade-in zoom-in-95 duration-150`}
                  >
                    {/* Tooltip Header: Tag & Bintang */}
                    <div className="flex items-center justify-between gap-1.5 mb-1">
                      <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">
                        Stasiun {hs.stationNumber} • {hs.shortTag}
                      </span>
                      <span className="text-[10px] font-black px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 flex items-center gap-0.5">
                        <Star className="w-2.5 h-2.5 fill-amber-500 text-amber-500" />
                        {hs.rewardStar}
                      </span>
                    </div>

                    {/* Judul Stasiun */}
                    <h4 className="font-black text-xs sm:text-sm text-slate-900 leading-tight mb-1">
                      {hs.name}
                    </h4>

                    {/* Deskripsi Singkat */}
                    <p className="text-[11px] text-slate-600 font-medium leading-snug mb-2.5 line-clamp-2">
                      {hs.desc}
                    </p>

                    {/* Tombol Kuning: Mulai Eksperimen (Zero-Emoji) */}
                    <Link
                      href={hs.route}
                      onClick={() => sound.playCelebration()}
                      className="w-full py-2 px-3 rounded-xl bg-amber-400 hover:bg-amber-500 active:scale-95 text-slate-950 font-black text-xs sm:text-sm border-2 border-amber-600 shadow-[0_2px_0_0_#b45309] flex items-center justify-center gap-1.5 transition-all btn-chunky"
                    >
                      <span>Mulai Eksperimen</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Quick Access Strip Bawah: 5 Tombol Cepat Tanpa Teks Panjang */}
        <div className="grid grid-cols-5 gap-1.5 sm:gap-2 pt-1 max-w-2xl sm:max-w-2xl lg:max-w-3xl mx-auto">
          {MAP_HOTSPOTS.map((hs) => {
            const isSelected = activeHotspotId === hs.id;
            return (
              <button
                key={hs.id}
                type="button"
                onClick={() => handleHotspotClick(hs)}
                className={`py-1.5 sm:py-2 px-1 rounded-2xl border-2 transition-all flex flex-col items-center justify-center gap-1 btn-chunky ${
                  isSelected
                    ? "bg-amber-100 border-amber-400 shadow-[0_2px_0_0_#b45309]"
                    : "bg-white hover:bg-slate-50 border-slate-200 shadow-sm"
                }`}
                title={hs.name}
              >
                <div className="relative w-6 h-6 sm:w-7 sm:h-7">
                  <Image
                    src={hs.iconWebp}
                    alt={hs.name}
                    fill
                    sizes="32px"
                    className="object-contain"
                  />
                </div>
                <span className="text-[10px] sm:text-xs font-black text-slate-800 truncate max-w-full">
                  Stasiun {hs.stationNumber}
                </span>
              </button>
            );
          })}
        </div>
      </main>
    </div>
  );
}
