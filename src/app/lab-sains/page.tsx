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

interface InteractiveHotspot {
  id: string;
  name: string;
  route: string;
  socraticSpeech: string;
  // Bounding box in percentages relative to the 9:16 background image
  left: number;
  top: number;
  width: number;
  height: number;
  themeColor: string;
}

const MAP_HOTSPOTS: InteractiveHotspot[] = [
  {
    id: "rantai-makanan",
    name: "1. Rantai Makanan",
    route: "/lab-sains/rantai-makanan",
    socraticSpeech: "Stasiun satu: Rantai Makanan dan Krisis Ekosistem!",
    left: 20,
    top: 13,
    width: 32,
    height: 25,
    themeColor: "from-teal-400/0 via-teal-400/40 to-teal-400/0",
  },
  {
    id: "siklus-air",
    name: "2. Siklus Air",
    route: "/lab-sains/siklus-air",
    socraticSpeech: "Stasiun dua: Simulasi Siklus Air Bumi!",
    left: 61,
    top: 13,
    width: 33,
    height: 26,
    themeColor: "from-sky-400/0 via-sky-400/40 to-sky-400/0",
  },
  {
    id: "warna",
    name: "3. Lab Warna",
    route: "/lab-sains/warna",
    socraticSpeech: "Stasiun tiga: Lab Warna dan Pipet Ajaib!",
    left: 8,
    top: 51,
    width: 40,
    height: 25,
    themeColor: "from-emerald-400/0 via-emerald-400/40 to-emerald-400/0",
  },
  {
    id: "listrik",
    name: "4. Sirkuit Listrik",
    route: "/lab-sains/listrik",
    socraticSpeech: "Stasiun empat: Rakit Sirkuit Listrik!",
    left: 56,
    top: 52,
    width: 36,
    height: 18,
    themeColor: "from-amber-400/0 via-amber-400/40 to-amber-400/0",
  },
  {
    id: "magnet",
    name: "5. Lab Magnet",
    route: "/lab-sains/magnet",
    socraticSpeech: "Stasiun lima: Petualangan Magnet Hunter!",
    left: 65,
    top: 72,
    width: 28,
    height: 15,
    themeColor: "from-rose-400/0 via-rose-400/40 to-rose-400/0",
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

  const handleHotspotClick = (hs: InteractiveHotspot, e: React.MouseEvent) => {
    e.preventDefault();
    sound.playCelebration();
    if (profile.audioEnabled) {
      sound.speak(hs.socraticSpeech);
    }
    // Timeout untuk animasi klik
    setTimeout(() => {
      router.push(hs.route);
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
                  Ketuk objek di meja atau poster di dinding untuk mulai!
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
          
          {/* Latar Belakang Interaktif Langsung dari Render AI (Realistic) */}
          <img
            src="/images/science/lab_interactive_bg.jpg"
            alt="Peta Laboratorium Sains Interaktif"
            className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
          />

          {/* Label Panduan */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 z-30 px-3 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-md border border-slate-700 text-[10px] sm:text-xs font-bold text-indigo-300 flex items-center gap-1.5 shadow-lg whitespace-nowrap">
            <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
            Sentuh objek-objek di bawah untuk bereksperimen!
          </div>

          {/* Overlay Invisible Hotspots: Menutupi komponen di gambar */}
          {MAP_HOTSPOTS.map((hs) => (
            <Link
              key={hs.id}
              href={hs.route}
              onClick={(e) => handleHotspotClick(hs, e)}
              style={{
                left: `${hs.left}%`,
                top: `${hs.top}%`,
                width: `${hs.width}%`,
                height: `${hs.height}%`,
              }}
              className="absolute z-20 group cursor-pointer"
              title={hs.name}
            >
              {/* Highlight / Pendaran saat disentuh atau di-hover */}
              <div 
                className={`absolute inset-0 rounded-2xl md:rounded-3xl border-2 border-white/0 group-hover:border-white/80 bg-gradient-to-b ${hs.themeColor} opacity-0 group-hover:opacity-100 group-active:scale-95 transition-all duration-300 flex flex-col items-center justify-center`}
              >
                {/* Tooltip Muncul Saat Hover */}
                <div className="absolute -bottom-8 px-2 py-1 bg-slate-900/90 text-white font-bold text-[10px] sm:text-xs rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all shadow-lg pointer-events-none border border-indigo-500/50">
                  {hs.name}
                </div>
              </div>
            </Link>
          ))}

        </div>
      </main>
    </div>
  );
}
