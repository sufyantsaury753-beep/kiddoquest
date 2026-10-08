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
  Sparkles
} from "lucide-react";
import { getStudentProfile, saveStudentProfile, StudentProfile, DEFAULT_PROFILE } from "@/lib/storage";
import { sound } from "@/lib/sound";

interface InteractiveSprite {
  id: string;
  name: string;
  route: string;
  socraticSpeech: string;
  // Posisi tengah (X, Y) dalam persen terhadap background 9:16
  leftPercent: number;
  topPercent: number;
  widthClass: string;
  iconSrc: string;
  hoverGlow: string;
}

const SPRITE_HOTSPOTS: InteractiveSprite[] = [
  {
    id: "rantai-makanan",
    name: "1. Ekosistem",
    route: "/lab-sains/rantai-makanan",
    socraticSpeech: "Stasiun satu: Rantai Makanan dan Krisis Ekosistem!",
    leftPercent: 25,
    topPercent: 22,
    widthClass: "w-24 h-24 sm:w-32 sm:h-32",
    iconSrc: "/images/science/icon_rantai.webp",
    hoverGlow: "drop-shadow-[0_0_20px_rgba(20,184,166,0.8)]",
  },
  {
    id: "siklus-air",
    name: "2. Siklus Air",
    route: "/lab-sains/siklus-air",
    socraticSpeech: "Stasiun dua: Simulasi Siklus Air Bumi!",
    leftPercent: 75,
    topPercent: 22,
    widthClass: "w-24 h-24 sm:w-32 sm:h-32",
    iconSrc: "/images/science/icon_air.webp",
    hoverGlow: "drop-shadow-[0_0_20px_rgba(14,165,233,0.8)]",
  },
  {
    id: "warna",
    name: "3. Lab Warna",
    route: "/lab-sains/warna",
    socraticSpeech: "Stasiun tiga: Lab Warna dan Pipet Ajaib!",
    leftPercent: 20,
    topPercent: 62,
    widthClass: "w-20 h-20 sm:w-28 sm:h-28", // Di atas meja kiri
    iconSrc: "/images/science/icon_warna.webp",
    hoverGlow: "drop-shadow-[0_0_20px_rgba(16,185,129,0.8)]",
  },
  {
    id: "listrik",
    name: "4. Sirkuit Listrik",
    route: "/lab-sains/listrik",
    socraticSpeech: "Stasiun empat: Rakit Sirkuit Listrik!",
    leftPercent: 50,
    topPercent: 64,
    widthClass: "w-20 h-20 sm:w-28 sm:h-28", // Di atas meja tengah
    iconSrc: "/images/science/icon_listrik.webp",
    hoverGlow: "drop-shadow-[0_0_20px_rgba(245,158,11,0.8)]",
  },
  {
    id: "magnet",
    name: "5. Lab Magnet",
    route: "/lab-sains/magnet",
    socraticSpeech: "Stasiun lima: Petualangan Magnet Hunter!",
    leftPercent: 80,
    topPercent: 74,
    widthClass: "w-16 h-16 sm:w-24 sm:h-24", // Di atas meja kanan bawah
    iconSrc: "/images/science/icon_magnet.webp",
    hoverGlow: "drop-shadow-[0_0_20px_rgba(225,29,72,0.8)]",
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
    // Timeout untuk memberi waktu animasi klik terlihat (active:scale) sebelum pindah halaman
    setTimeout(() => {
      router.push(sprite.route);
    }, 400);
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-slate-900 font-sans pb-10 select-none flex flex-col">
      {/* Top Navigation Header */}
      <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b-2 border-indigo-900 shadow-md no-print shrink-0">
        <div className="max-w-6xl mx-auto px-3 sm:px-4 py-2 sm:py-2.5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/"
              onClick={() => sound.playPop()}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs sm:text-sm font-bold border-2 border-slate-700 transition-all btn-chunky"
              title="Kembali ke Beranda TobiQuest"
            >
              <Home className="w-3.5 h-3.5 text-indigo-400" />
              <span className="hidden sm:inline">Beranda</span>
            </Link>

            <div className="h-5 w-px bg-slate-700" />

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500 to-yellow-400 text-slate-950 flex items-center justify-center font-black shadow-sm">
                <Compass className="w-4 h-4" />
              </div>
              <div>
                <h1 className="text-xs sm:text-sm font-black text-white leading-tight">
                  Peta Laboratorium Sains
                </h1>
                <p className="text-[10px] text-indigo-300 font-bold hidden sm:block">
                  Ketuk objek di meja atau dinding untuk mulai eksperimen!
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 text-amber-400 font-black text-xs sm:text-sm border border-slate-700 shadow-sm">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span>{profile.stars}</span>
            </div>

            <button
              onClick={handleToggleAudio}
              className={`p-2 rounded-xl border transition-all btn-chunky flex items-center justify-center ${
                profile.audioEnabled
                  ? "bg-indigo-600 text-white border-indigo-500 shadow-sm"
                  : "bg-slate-800 text-slate-400 border-slate-700"
              }`}
              title={profile.audioEnabled ? "Matikan Suara Tobi" : "Nyalakan Suara Tobi"}
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
      <main className="flex-1 w-full flex items-center justify-center pt-2 sm:pt-4 px-3">
        {/* Papan Kanvas Peta Laboratorium (Aspect Ratio 9:16 untuk Vertical Image) */}
        <div className="relative w-full max-w-md mx-auto aspect-[9/16] rounded-3xl overflow-hidden border-4 sm:border-6 border-slate-800 shadow-2xl bg-slate-800">
          
          {/* Latar Belakang Lab KOSONG (Background Saja) */}
          <img
            src="/images/science/lab_empty_bg.jpg"
            alt="Laboratorium Sains Kosong"
            className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
          />

          {/* Label Panduan */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 z-30 px-3 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-md border border-slate-700 text-[10px] sm:text-xs font-bold text-indigo-300 flex items-center gap-1.5 shadow-lg whitespace-nowrap pointer-events-none">
            <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
            Sentuh objek yang menyala!
          </div>

          {/* Sprite Interaktif Transparan (Objek-Objek yang Hidup) */}
          {SPRITE_HOTSPOTS.map((sprite) => (
            <Link
              key={sprite.id}
              href={sprite.route}
              onClick={(e) => handleSpriteClick(sprite, e)}
              style={{
                left: `${sprite.leftPercent}%`,
                top: `${sprite.topPercent}%`,
              }}
              // Group untuk mendeteksi hover dan active pada container koordinat
              className="absolute z-20 group cursor-pointer -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center"
              title={sprite.name}
            >
              {/* Gambar Objek (Transparan PNG/WebP) yang Hidup */}
              {/* Saat hover: membesar (scale-125), naik sedikit (-translate-y-2), dan bercahaya (hoverGlow) */}
              {/* Saat klik (active): mengecil (scale-90) seperti ditekan */}
              <img
                src={sprite.iconSrc}
                alt={sprite.name}
                className={`${sprite.widthClass} object-contain transition-all duration-300 ease-out transform group-hover:scale-125 group-hover:-translate-y-2 group-active:scale-90 drop-shadow-md group-hover:${sprite.hoverGlow}`}
              />

              {/* Tooltip Nama Stasiun (Muncul saat Hover) */}
              <div className="absolute -bottom-6 px-2 py-1 bg-slate-900/90 text-white font-bold text-[10px] sm:text-xs rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all shadow-lg pointer-events-none border border-indigo-500/50">
                {sprite.name}
              </div>
            </Link>
          ))}

        </div>
      </main>
    </div>
  );
}
