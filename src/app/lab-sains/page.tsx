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
import { getStudentProfile, saveStudentProfile, StudentProfile, DEFAULT_PROFILE } from "@/lib/storage";
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
  idleGlow: string; // Pendaran lembut yang selalu menyala saat idle
  hoverGlow: string; // Pendaran ekstra terang saat kursor mendekat / disentuh
  auraBg: string; // Halo cahaya di belakang objek
}

// Koordinat & Ukuran Ekstra Besar untuk Tampilan HP (Mobile) - Aspek Rasio 9:16
const MOBILE_SPRITES: InteractiveSprite[] = [
  {
    id: "rantai-makanan",
    name: "1. Ekosistem",
    route: "/lab-sains/rantai-makanan",
    socraticSpeech: "Stasiun satu: Rantai Makanan dan Krisis Ekosistem!",
    leftPercent: 33,
    topPercent: 24,
    widthClass: "w-32 sm:w-40",
    iconSrc: "/images/science/sprite_rantai.png?v=5",
    idleGlow: "drop-shadow-[0_0_12px_rgba(20,184,166,0.7)]",
    hoverGlow: "drop-shadow-[0_0_30px_rgba(20,184,166,1)]",
    auraBg: "bg-teal-400/25",
  },
  {
    id: "siklus-air",
    name: "2. Siklus Air",
    route: "/lab-sains/siklus-air",
    socraticSpeech: "Stasiun dua: Simulasi Siklus Air Bumi!",
    leftPercent: 75,
    topPercent: 24,
    widthClass: "w-32 sm:w-40",
    iconSrc: "/images/science/sprite_air.png?v=5",
    idleGlow: "drop-shadow-[0_0_12px_rgba(14,165,233,0.7)]",
    hoverGlow: "drop-shadow-[0_0_30px_rgba(14,165,233,1)]",
    auraBg: "bg-sky-400/25",
  },
  {
    id: "warna",
    name: "3. Lab Warna",
    route: "/lab-sains/warna",
    socraticSpeech: "Stasiun tiga: Lab Warna dan Pipet Ajaib!",
    leftPercent: 26,
    topPercent: 62,
    widthClass: "w-44 sm:w-56",
    iconSrc: "/images/science/sprite_warna.png?v=5",
    idleGlow: "drop-shadow-[0_0_16px_rgba(16,185,129,0.75)]",
    hoverGlow: "drop-shadow-[0_0_35px_rgba(16,185,129,1)]",
    auraBg: "bg-emerald-400/30",
  },
  {
    id: "listrik",
    name: "4. Sirkuit Listrik",
    route: "/lab-sains/listrik",
    socraticSpeech: "Stasiun empat: Rakit Sirkuit Listrik!",
    leftPercent: 66,
    topPercent: 63,
    widthClass: "w-32 sm:w-44",
    iconSrc: "/images/science/sprite_listrik.png?v=5",
    idleGlow: "drop-shadow-[0_0_18px_rgba(251,191,36,0.85)]",
    hoverGlow: "drop-shadow-[0_0_40px_rgba(251,191,36,1)]",
    auraBg: "bg-amber-400/35",
  },
  {
    id: "magnet",
    name: "5. Lab Magnet",
    route: "/lab-sains/magnet",
    socraticSpeech: "Stasiun lima: Petualangan Magnet Hunter!",
    leftPercent: 80,
    topPercent: 82,
    widthClass: "w-36 sm:w-48",
    iconSrc: "/images/science/sprite_magnet.png?v=5",
    idleGlow: "drop-shadow-[0_0_14px_rgba(244,63,94,0.75)]",
    hoverGlow: "drop-shadow-[0_0_35px_rgba(244,63,94,1)]",
    auraBg: "bg-rose-400/30",
  },
];

// Koordinat & Ukuran Proporsional Pas untuk Tampilan Laptop (Desktop) - Aspek Rasio 16:9
const DESKTOP_SPRITES: InteractiveSprite[] = [
  {
    id: "rantai-makanan",
    name: "1. Ekosistem",
    route: "/lab-sains/rantai-makanan",
    socraticSpeech: "Stasiun satu: Rantai Makanan!",
    leftPercent: 33, // Digeser agak ke tengah agar tidak mepet jendela / lengkungan sudut
    topPercent: 29, // Diturunkan agar tidak terpotong oleh sudut border rounded atas
    widthClass: "w-32 md:w-40 lg:w-44 xl:w-48", // Ukuran pas: tidak raksasa, tidak kekecilan
    iconSrc: "/images/science/sprite_rantai.png?v=6",
    idleGlow: "drop-shadow-[0_0_14px_rgba(20,184,166,0.75)]",
    hoverGlow: "drop-shadow-[0_0_35px_rgba(20,184,166,1)]",
    auraBg: "bg-teal-400/25",
  },
  {
    id: "siklus-air",
    name: "2. Siklus Air",
    route: "/lab-sains/siklus-air",
    socraticSpeech: "Stasiun dua: Siklus Air Bumi!",
    leftPercent: 68,
    topPercent: 29, // Sejajar presisi dengan poster rantai makanan
    widthClass: "w-32 md:w-40 lg:w-44 xl:w-48",
    iconSrc: "/images/science/sprite_air.png?v=6",
    idleGlow: "drop-shadow-[0_0_14px_rgba(14,165,233,0.75)]",
    hoverGlow: "drop-shadow-[0_0_35px_rgba(14,165,233,1)]",
    auraBg: "bg-sky-400/25",
  },
  {
    id: "warna",
    name: "3. Lab Warna",
    route: "/lab-sains/warna",
    socraticSpeech: "Stasiun tiga: Lab Warna!",
    leftPercent: 24, // Pas di atas meja lab kiri
    topPercent: 68,
    widthClass: "w-36 md:w-48 lg:w-56 xl:w-64", // Proporsional (sebelumnya terlalu raksasa 384px)
    iconSrc: "/images/science/sprite_warna.png?v=6",
    idleGlow: "drop-shadow-[0_0_18px_rgba(16,185,129,0.8)]",
    hoverGlow: "drop-shadow-[0_0_40px_rgba(16,185,129,1)]",
    auraBg: "bg-emerald-400/30",
  },
  {
    id: "listrik",
    name: "4. Listrik",
    route: "/lab-sains/listrik",
    socraticSpeech: "Stasiun empat: Sirkuit Listrik!",
    leftPercent: 49, // Di tengah meja
    topPercent: 70,
    widthClass: "w-24 md:w-32 lg:w-36 xl:w-40",
    iconSrc: "/images/science/sprite_listrik.png?v=6",
    idleGlow: "drop-shadow-[0_0_20px_rgba(251,191,36,0.9)]",
    hoverGlow: "drop-shadow-[0_0_45px_rgba(251,191,36,1)]",
    auraBg: "bg-amber-400/35",
  },
  {
    id: "magnet",
    name: "5. Magnet",
    route: "/lab-sains/magnet",
    socraticSpeech: "Stasiun lima: Magnet Hunter!",
    leftPercent: 77, // Di atas meja kanan
    topPercent: 79,
    widthClass: "w-28 md:w-36 lg:w-40 xl:w-44",
    iconSrc: "/images/science/sprite_magnet.png?v=6",
    idleGlow: "drop-shadow-[0_0_16px_rgba(244,63,94,0.8)]",
    hoverGlow: "drop-shadow-[0_0_40px_rgba(244,63,94,1)]",
    auraBg: "bg-rose-400/30",
  },
];

export default function InteractiveScienceLobbyPage() {
  const router = useRouter();
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

  const handleSpriteClick = (sprite: InteractiveSprite, e: React.MouseEvent) => {
    e.preventDefault();
    sound.playCelebration();
    if (profile.audioEnabled) {
      sound.speak(sprite.socraticSpeech);
    }
    // Waktu tunggu agar efek animasi klik terlihat sebelum berpindah halaman
    setTimeout(() => {
      router.push(sprite.route);
    }, 400);
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#758ba8] font-sans pb-10 select-none flex flex-col">
      {/* Top Navigation Header */}
      <header className="sticky top-0 z-40 bg-[#4e6480]/95 backdrop-blur-md border-b-2 border-[#33465e] shadow-md no-print shrink-0">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2 sm:py-2.5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/"
              onClick={() => sound.playPop()}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#33465e] hover:bg-[#25364d] text-white text-xs sm:text-sm font-bold border-2 border-[#25364d] transition-all"
              title="Kembali ke Beranda TobiQuest"
            >
              <Home className="w-3.5 h-3.5 text-blue-300" />
              <span className="hidden sm:inline">Beranda</span>
            </Link>

            <div className="h-5 w-px bg-[#758ba8]" />

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-400 to-yellow-300 text-slate-900 flex items-center justify-center font-black shadow-sm">
                <Compass className="w-4 h-4" />
              </div>
              <div>
                <h1 className="text-xs sm:text-sm font-black text-white leading-tight">
                  Peta Laboratorium Sains
                </h1>
                <p className="text-[10px] text-blue-200 font-bold hidden sm:block">
                  Pilih stasiun laboratorium untuk bereksperimen!
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#33465e] text-amber-400 font-black text-xs sm:text-sm border border-[#25364d] shadow-sm">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span>{profile.stars}</span>
            </div>

            <button
              onClick={handleToggleAudio}
              className={`p-2 rounded-xl border transition-all flex items-center justify-center ${
                profile.audioEnabled
                  ? "bg-blue-500 text-white border-blue-400 shadow-sm"
                  : "bg-[#33465e] text-slate-400 border-[#25364d]"
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
        {/* ======================================================== */}
        {/* LAYOUT UNTUK HP (MOBILE ONLY) - Tampil di bawah layar md */}
        {/* ======================================================== */}
        <div className="relative w-full max-w-md mx-auto aspect-[9/16] rounded-3xl overflow-hidden border-4 border-[#33465e] shadow-2xl bg-[#1e293b] block md:hidden">
          {/* Background KOSONG Mobile dengan efek redup (dimmed) */}
          <img
            src="/images/science/lab_empty_bg_mobile.jpg"
            alt="Laboratorium Mobile"
            className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none brightness-[0.68] contrast-[1.08]"
          />
          {/* Lapisan Ambient Vignette / Kegelapan agar ruangan lebih dramatis */}
          <div className="absolute inset-0 bg-slate-950/25 pointer-events-none" />

          {/* Sprite Components Mobile (Bercahaya & Hidup) */}
          {MOBILE_SPRITES.map((sprite) => (
            <Link
              key={sprite.id}
              href={sprite.route}
              onClick={(e) => handleSpriteClick(sprite, e)}
              style={{ left: `${sprite.leftPercent}%`, top: `${sprite.topPercent}%` }}
              className="absolute z-20 group cursor-pointer -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center"
            >
              {/* Radial Aura Belakang (Ambient Halo Cahaya Berdenyut) */}
              <div
                className={`absolute inset-0 -m-3 rounded-full ${sprite.auraBg} opacity-60 group-hover:opacity-95 blur-xl animate-pulse pointer-events-none transition-all duration-300`}
              />

              {/* Gambar Objek: Terang, Bercahaya Idle, Membesar & Bercahaya Ekstra saat disentuh */}
              <img
                src={sprite.iconSrc}
                alt={sprite.name}
                className={`${sprite.widthClass} object-contain transition-all duration-300 ease-out transform group-hover:scale-120 group-hover:-translate-y-3 group-active:scale-90 ${sprite.idleGlow} group-hover:${sprite.hoverGlow} brightness-105 group-hover:brightness-125 filter`}
              />
              <div className="absolute -bottom-6 px-2.5 py-1 bg-slate-900/90 text-white font-black text-[10px] rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all shadow-lg pointer-events-none border border-blue-400/50 z-30">
                {sprite.name}
              </div>
            </Link>
          ))}
        </div>


        {/* ======================================================== */}
        {/* LAYOUT UNTUK LAPTOP (DESKTOP ONLY) - Tampil di layar md+ */}
        {/* ======================================================== */}
        <div className="relative w-full max-w-6xl mx-auto aspect-[16/9] rounded-[2rem] overflow-hidden border-6 border-[#33465e] shadow-2xl bg-[#1e293b] hidden md:block">
          {/* Background KOSONG Desktop dengan efek redup (dimmed) */}
          <img
            src="/images/science/lab_empty_bg_desktop.jpg"
            alt="Laboratorium Desktop"
            className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none brightness-[0.68] contrast-[1.08]"
          />
          {/* Lapisan Ambient Vignette / Kegelapan agar ruangan lebih dramatis */}
          <div className="absolute inset-0 bg-slate-950/25 pointer-events-none" />

          {/* Sprite Components Desktop (Bercahaya & Hidup) */}
          {DESKTOP_SPRITES.map((sprite) => (
            <Link
              key={sprite.id}
              href={sprite.route}
              onClick={(e) => handleSpriteClick(sprite, e)}
              style={{ left: `${sprite.leftPercent}%`, top: `${sprite.topPercent}%` }}
              className="absolute z-20 group cursor-pointer -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center"
            >
              {/* Radial Aura Belakang (Ambient Halo Cahaya Berdenyut) */}
              <div
                className={`absolute inset-0 -m-4 rounded-full ${sprite.auraBg} opacity-60 group-hover:opacity-95 blur-xl animate-pulse pointer-events-none transition-all duration-300`}
              />

              {/* Gambar Objek: Terang, Bercahaya Idle, Membesar & Bercahaya Ekstra saat disentuh */}
              <img
                src={sprite.iconSrc}
                alt={sprite.name}
                className={`${sprite.widthClass} object-contain transition-all duration-300 ease-out transform group-hover:scale-120 group-hover:-translate-y-4 group-active:scale-90 ${sprite.idleGlow} group-hover:${sprite.hoverGlow} brightness-105 group-hover:brightness-125 filter`}
              />
              <div className="absolute -bottom-8 px-3.5 py-1.5 bg-slate-900/90 text-white font-black text-xs rounded-xl whitespace-nowrap opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all shadow-xl pointer-events-none border border-blue-400/50 z-30">
                {sprite.name}
              </div>
            </Link>
          ))}
        </div>

      </main>
    </div>
  );
}
