"use client";

import React, { useState } from "react";
import { 
  Sparkles, 
  Volume2, 
  VolumeX, 
  Award, 
  Wifi, 
  Zap, 
  User, 
  Star 
} from "lucide-react";
import { StudentProfile } from "@/lib/storage";
import { sound } from "@/lib/sound";

interface NavbarProps {
  profile: StudentProfile;
  onUpdateProfile: (data: Partial<StudentProfile>) => void;
  onOpenCertificate: () => void;
  onOpenProfile: () => void;
}

export default function Navbar({
  profile,
  onUpdateProfile,
  onOpenCertificate,
  onOpenProfile,
}: NavbarProps) {
  const [starBounce, setStarBounce] = useState(false);

  const toggleSpeech = () => {
    const nextVal = !profile.audioEnabled;
    sound.setSpeechEnabled(nextVal);
    onUpdateProfile({ audioEnabled: nextVal });
    if (nextVal) {
      sound.playChime();
      sound.speak("Suara narator Tobi diaktifkan! Halo sahabat cilik!");
    } else {
      sound.stopSpeaking();
    }
  };

  const toggleLiteMode = () => {
    const nextVal = !profile.liteMode;
    onUpdateProfile({ liteMode: nextVal });
    sound.playChime();
    if (profile.audioEnabled) {
      sound.speak(
        nextVal
          ? "Mode Telkomsel Lite aktif! Halaman menjadi super hemat kuota dan ringan."
          : "Mode reguler aktif dengan animasi penuh."
      );
    }
  };

  const handleStarClick = () => {
    setStarBounce(true);
    sound.playChime();
    setTimeout(() => setStarBounce(false), 600);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b-4 border-amber-200/80 shadow-sm no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3.5 flex items-center justify-between gap-2 sm:gap-4">
        {/* Logo and Competition Badge */}
        <div className="flex items-center gap-3">
          <div 
            onClick={handleStarClick}
            className="cursor-pointer flex items-center justify-center w-11 h-11 sm:w-13 sm:h-13 rounded-2xl bg-gradient-to-br from-amber-400 via-orange-400 to-rose-400 text-white shadow-[0_4px_0_0_#d97706] active:translate-y-1 active:shadow-none transition-transform"
            title="Klik bintang logo!"
          >
            <Sparkles className={`w-6 h-6 sm:w-7 sm:h-7 text-yellow-100 ${starBounce ? "animate-spin" : "animate-pulse"}`} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl sm:text-3xl font-extrabold tracking-tight font-display bg-gradient-to-r from-amber-500 via-rose-500 to-sky-600 bg-clip-text text-transparent">
                KiddoQuest
              </span>
              <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold bg-rose-100 text-rose-700 border border-rose-300">
                SD Merdeka Belajar
              </span>
            </div>
            <p className="text-[10px] sm:text-xs font-semibold text-slate-500 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping inline-block" />
              M-ONE Telkomsel Coding Competition
            </p>
          </div>
        </div>

        {/* Action Controls & Kid Profile */}
        <div className="flex items-center gap-1.5 sm:gap-3">
          {/* Audio TTS Toggle */}
          <button
            onClick={toggleSpeech}
            className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-2xl font-bold text-xs sm:text-sm border-2 transition-all btn-chunky ${
              profile.audioEnabled
                ? "bg-sky-100 text-sky-800 border-sky-300 shadow-[0_3px_0_0_#0284c7]"
                : "bg-slate-100 text-slate-500 border-slate-300 shadow-[0_3px_0_0_#94a3b8]"
            }`}
            title="Nyalakan / Matikan Suara Narator Tobi"
          >
            {profile.audioEnabled ? (
              <>
                <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 text-sky-600 animate-pulse" />
                <span className="hidden sm:inline">Suara Tobi Aktif</span>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4 sm:w-5 sm:h-5 text-slate-500" />
                <span className="hidden sm:inline">Suara Mati</span>
              </>
            )}
          </button>

          {/* Telkomsel Lite Mode Toggle */}
          <button
            onClick={toggleLiteMode}
            className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-2xl font-bold text-xs sm:text-sm border-2 transition-all btn-chunky ${
              profile.liteMode
                ? "bg-red-600 text-white border-red-700 shadow-[0_3px_0_0_#991b1b]"
                : "bg-amber-100 text-amber-900 border-amber-300 shadow-[0_3px_0_0_#d97706]"
            }`}
            title="Mode Telkomsel Lite: Sangat hemat kuota data (< 500 KB) untuk jaringan pelosok"
          >
            {profile.liteMode ? (
              <>
                <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-300 fill-yellow-300" />
                <span className="font-extrabold">Lite &lt;500KB</span>
              </>
            ) : (
              <>
                <Wifi className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600" />
                <span className="hidden sm:inline">Telkomsel Lite</span>
                <span className="sm:hidden font-extrabold">Lite</span>
              </>
            )}
          </button>

          {/* Stars Counter */}
          <div 
            onClick={handleStarClick}
            className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-2xl bg-amber-400 text-amber-950 font-extrabold text-xs sm:text-sm border-2 border-amber-500 shadow-[0_3px_0_0_#b45309] cursor-pointer hover:bg-amber-300 transition-colors"
            title="Koleksi Bintang Prestasimu!"
          >
            <Star className={`w-4 h-4 sm:w-5 sm:h-5 fill-amber-900 text-amber-900 ${starBounce ? "animate-bounce" : ""}`} />
            <span className="font-display text-sm sm:text-base">{profile.stars}</span>
          </div>

          {/* Certificate Button */}
          <button
            onClick={onOpenCertificate}
            className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-extrabold text-xs sm:text-sm border-2 border-emerald-600 shadow-[0_3px_0_0_#065f46] btn-chunky hover:brightness-105"
            title="Cetak Piagam Penghargaan Resmi"
          >
            <Award className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>Piagam Prestasi</span>
          </button>

          {/* Kid Profile Badge */}
          <button
            onClick={onOpenProfile}
            className="flex items-center gap-1.5 p-1.5 sm:px-3 sm:py-1.5 rounded-2xl bg-purple-100 hover:bg-purple-200 border-2 border-purple-300 text-purple-900 font-bold text-xs sm:text-sm shadow-[0_3px_0_0_#7e22ce] btn-chunky"
            title="Lihat & Ganti Profil Siswa"
          >
            <span className="text-lg sm:text-xl leading-none">{profile.avatar}</span>
            <span className="hidden lg:inline max-w-[90px] truncate">{profile.name}</span>
            <User className="w-3.5 h-3.5 text-purple-600 hidden sm:inline" />
          </button>
        </div>
      </div>
    </header>
  );
}
