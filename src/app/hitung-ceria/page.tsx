"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Home,
  Star,
  Volume2,
  VolumeX,
  Compass,
} from "lucide-react";
import { getStudentProfile, saveStudentProfile, StudentProfile, DEFAULT_PROFILE, unlockBadge } from "@/lib/storage";
import { sound } from "@/lib/sound";

interface InteractiveSprite {
  id: string;
  name: string;
  route: string;
  socraticSpeech: string;
  leftPercent: number;
  topPercent: number;
  widthClass: string;
  iconSrc: string;
  idleGlow: string;
  hoverGlow: string;
  auraBg: string;
}

// Koordinat & Ukuran untuk Tampilan HP (Mobile) - Aspek Rasio 9:16
const MOBILE_SPRITES: InteractiveSprite[] = [
  {
    id: "kalkulasi",
    name: "1. Kalkulasi Buah",
    route: "/hitung-ceria/kalkulasi",
    socraticSpeech: "Stasiun satu: Kalkulasi Buah Ajaib!",
    leftPercent: 25,
    topPercent: 67.5,
    widthClass: "w-32 sm:w-36",
    iconSrc: "/images/math/sprite_kalkulasi.png?v=2",
    idleGlow: "drop-shadow-[0_0_16px_rgba(244,63,94,0.75)]",
    hoverGlow: "drop-shadow-[0_0_35px_rgba(244,63,94,1)]",
    auraBg: "bg-rose-400/30",
  },
  {
    id: "detektif",
    name: "3. Detektif Aljabar",
    route: "/hitung-ceria/detektif",
    socraticSpeech: "Stasiun tiga: Detektif Aljabar Buah!",
    leftPercent: 50,
    topPercent: 64,
    widthClass: "w-32 sm:w-40",
    iconSrc: "/images/math/sprite_detektif.png?v=2",
    idleGlow: "drop-shadow-[0_0_14px_rgba(14,165,233,0.75)]",
    hoverGlow: "drop-shadow-[0_0_35px_rgba(14,165,233,1)]",
    auraBg: "bg-sky-400/25",
  },
  {
    id: "neraca",
    name: "2. Timbangan Neraca",
    route: "/hitung-ceria/neraca",
    socraticSpeech: "Stasiun dua: Timbangan Neraca Misteri!",
    leftPercent: 76,
    topPercent: 72,
    widthClass: "w-32 sm:w-40",
    iconSrc: "/images/math/sprite_neraca.png?v=2",
    idleGlow: "drop-shadow-[0_0_16px_rgba(245,158,11,0.8)]",
    hoverGlow: "drop-shadow-[0_0_35px_rgba(245,158,11,1)]",
    auraBg: "bg-amber-400/30",
  },
];

// Koordinat & Ukuran untuk Tampilan Laptop (Desktop) - Aspek Rasio 16:9
const DESKTOP_SPRITES: InteractiveSprite[] = [
  {
    id: "kalkulasi",
    name: "1. Kalkulasi Buah",
    route: "/hitung-ceria/kalkulasi",
    socraticSpeech: "Stasiun satu: Kalkulasi Buah Ajaib!",
    leftPercent: 24,
    topPercent: 71.5,
    widthClass: "w-40 md:w-52 lg:w-56",
    iconSrc: "/images/math/sprite_kalkulasi.png?v=2",
    idleGlow: "drop-shadow-[0_0_16px_rgba(244,63,94,0.75)]",
    hoverGlow: "drop-shadow-[0_0_35px_rgba(244,63,94,1)]",
    auraBg: "bg-rose-400/30",
  },
  {
    id: "neraca",
    name: "2. Timbangan Neraca",
    route: "/hitung-ceria/neraca",
    socraticSpeech: "Stasiun dua: Timbangan Neraca Misteri!",
    leftPercent: 54,
    topPercent: 70,
    widthClass: "w-36 md:w-44 lg:w-48",
    iconSrc: "/images/math/sprite_neraca.png?v=2",
    idleGlow: "drop-shadow-[0_0_16px_rgba(245,158,11,0.8)]",
    hoverGlow: "drop-shadow-[0_0_35px_rgba(245,158,11,1)]",
    auraBg: "bg-amber-400/30",
  },
  {
    id: "detektif",
    name: "3. Detektif Aljabar",
    route: "/hitung-ceria/detektif",
    socraticSpeech: "Stasiun tiga: Detektif Aljabar Buah!",
    leftPercent: 81,
    topPercent: 72,
    widthClass: "w-36 md:w-44 lg:w-50",
    iconSrc: "/images/math/sprite_detektif.png?v=2",
    idleGlow: "drop-shadow-[0_0_14px_rgba(14,165,233,0.75)]",
    hoverGlow: "drop-shadow-[0_0_35px_rgba(14,165,233,1)]",
    auraBg: "bg-sky-400/25",
  },
];

export default function InteractiveMathLobbyPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<StudentProfile>(DEFAULT_PROFILE);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = unlockBadge("hitung-ceria");
    setProfile(stored);
    sound.setSpeechEnabled(stored.audioEnabled);
    setMounted(true);
  }, []);

  const handleToggleAudio = () => {
    const nextVal = !profile.audioEnabled;
    const updated = saveStudentProfile({ audioEnabled: nextVal });
    setProfile(updated);
    sound.setSpeechEnabled(nextVal);
    if (nextVal) {
      sound.playChime();
      sound.speak("Suara panduan Tobi diaktifkan.");
    }
  };

  const handleSpriteClick = (sprite: InteractiveSprite, e: React.MouseEvent) => {
    e.preventDefault();
    sound.playCelebration();
    if (profile.audioEnabled) {
      sound.speak(sprite.socraticSpeech);
    }
    setTimeout(() => {
      router.push(sprite.route);
    }, 400);
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#6b829d] font-sans pb-10 select-none flex flex-col">
      {/* Top Navigation Header */}
      <header className="sticky top-0 z-40 bg-[#445b77]/95 backdrop-blur-md border-b-2 border-[#2c4059] shadow-md no-print shrink-0">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2 sm:py-2.5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/"
              onClick={() => sound.playPop()}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#2c4059] hover:bg-[#1f2f42] text-white text-xs sm:text-sm font-bold border-2 border-[#1f2f42] transition-all"
              title="Kembali ke Beranda TobiQuest"
            >
              <Home className="w-3.5 h-3.5 text-rose-300" />
              <span className="hidden sm:inline">Beranda</span>
            </Link>

            <div className="h-5 w-px bg-[#6b829d]" />

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-400 to-yellow-300 text-slate-900 flex items-center justify-center font-black shadow-sm">
                <Compass className="w-4 h-4" />
              </div>
              <div>
                <h1 className="text-xs sm:text-sm font-black text-white leading-tight">
                  Peta Ruang Belajar Hitung Ceria
                </h1>
                <p className="text-[10px] text-rose-200 font-bold hidden sm:block">
                  Pilih stasiun matematika untuk memecahkan teka-teki logika!
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#2c4059] text-amber-400 font-black text-xs sm:text-sm border border-[#1f2f42] shadow-sm">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span>{profile.stars}</span>
            </div>

            <button
              onClick={handleToggleAudio}
              className={`p-2 rounded-xl border transition-all flex items-center justify-center ${
                profile.audioEnabled
                  ? "bg-rose-500 text-white border-rose-400 shadow-sm"
                  : "bg-[#2c4059] text-slate-400 border-[#1f2f42]"
              }`}
            >
              {profile.audioEnabled ? (
                <Volume2 className="w-4 h-4 text-yellow-300 animate-pulse" />
              ) : (
                <VolumeX className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Map Container */}
      <main className="flex-1 w-full flex items-center justify-center pt-2 sm:pt-6 px-3">
        {/* ======================================================== */}
        {/* LAYOUT UNTUK HP (MOBILE ONLY) - Tampil di bawah layar md */}
        {/* ======================================================== */}
        <div className="relative w-full max-w-md mx-auto aspect-[9/16] rounded-3xl overflow-hidden border-4 border-[#2c4059] shadow-2xl bg-[#1e293b] block md:hidden">
          {/* Background Mobile */}
          <img
            src="/images/math/math_room_mobile.webp?v=1"
            alt="Ruang Belajar Hitung Ceria Mobile"
            className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none brightness-[0.72] contrast-[1.05]"
          />
          {/* Lapisan Ambient Kegelapan */}
          <div className="absolute inset-0 bg-slate-950/20 pointer-events-none" />

          {/* Sprite Components Mobile */}
          {MOBILE_SPRITES.map((sprite) => (
            <Link
              key={sprite.id}
              href={sprite.route}
              onClick={(e) => handleSpriteClick(sprite, e)}
              style={{ left: `${sprite.leftPercent}%`, top: `${sprite.topPercent}%` }}
              className="absolute z-20 group cursor-pointer -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center"
            >
              {/* Radial Aura Belakang */}
              <div
                className={`absolute inset-0 -m-3 rounded-full ${sprite.auraBg} opacity-60 group-hover:opacity-95 blur-xl animate-pulse pointer-events-none transition-all duration-300`}
              />

              {/* Gambar Objek */}
              <img
                src={sprite.iconSrc}
                alt={sprite.name}
                className={`${sprite.widthClass} object-contain transition-all duration-300 ease-out transform group-hover:scale-120 group-hover:-translate-y-3 group-active:scale-90 ${sprite.idleGlow} group-hover:${sprite.hoverGlow} brightness-105 group-hover:brightness-125 filter`}
              />
              <div className="absolute -bottom-6 px-2.5 py-1 bg-slate-900/90 text-white font-black text-[10px] rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all shadow-lg pointer-events-none border border-rose-400/50 z-30">
                {sprite.name}
              </div>
            </Link>
          ))}
        </div>

        {/* ======================================================== */}
        {/* LAYOUT UNTUK LAPTOP (DESKTOP ONLY) - Tampil di layar md+ */}
        {/* ======================================================== */}
        <div className="relative w-full max-w-6xl mx-auto aspect-[16/9] rounded-[2rem] overflow-hidden border-6 border-[#2c4059] shadow-2xl bg-[#1e293b] hidden md:block">
          {/* Background Desktop */}
          <img
            src="/images/math/math_room_desktop.webp?v=1"
            alt="Ruang Belajar Hitung Ceria Desktop"
            className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none brightness-[0.72] contrast-[1.05]"
          />
          {/* Lapisan Ambient Kegelapan */}
          <div className="absolute inset-0 bg-slate-950/20 pointer-events-none" />

          {/* Sprite Components Desktop */}
          {DESKTOP_SPRITES.map((sprite) => (
            <Link
              key={sprite.id}
              href={sprite.route}
              onClick={(e) => handleSpriteClick(sprite, e)}
              style={{ left: `${sprite.leftPercent}%`, top: `${sprite.topPercent}%` }}
              className="absolute z-20 group cursor-pointer -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center"
            >
              {/* Radial Aura Belakang */}
              <div
                className={`absolute inset-0 -m-4 rounded-full ${sprite.auraBg} opacity-60 group-hover:opacity-95 blur-xl animate-pulse pointer-events-none transition-all duration-300`}
              />

              {/* Gambar Objek */}
              <img
                src={sprite.iconSrc}
                alt={sprite.name}
                className={`${sprite.widthClass} object-contain transition-all duration-300 ease-out transform group-hover:scale-120 group-hover:-translate-y-4 group-active:scale-90 ${sprite.idleGlow} group-hover:${sprite.hoverGlow} brightness-105 group-hover:brightness-125 filter`}
              />
              <div className="absolute -bottom-8 px-3.5 py-1.5 bg-slate-900/90 text-white font-black text-xs rounded-xl whitespace-nowrap opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all shadow-xl pointer-events-none border border-rose-400/50 z-30">
                {sprite.name}
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
