"use client";

import React, { useState } from "react";
import { 
  Compass, 
  Volume2, 
  VolumeX, 
  Award, 
  Wifi, 
  Zap, 
  Star
} from "lucide-react";
import { StudentProfile, AVAILABLE_AVATARS } from "@/lib/storage";
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
  const [logoBounce, setLogoBounce] = useState(false);
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

  const handleLogoClick = () => {
    setLogoBounce(true);
    sound.playChime();
    setTimeout(() => setLogoBounce(false), 450);
  };

  const handleStarClick = () => {
    setStarBounce(true);
    sound.playChime();
    setTimeout(() => setStarBounce(false), 600);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b-4 border-amber-200/80 shadow-md no-print">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-2 sm:py-3 flex items-center justify-between gap-1.5 sm:gap-4">
        {/* Logo and Brand */}
        <div className="flex items-center gap-1 sm:gap-2.5 shrink-0">
          <div 
            onClick={handleLogoClick}
            className={`cursor-pointer flex items-center justify-center w-8 h-8 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-gradient-to-br from-amber-400 via-orange-500 to-rose-500 text-white shadow-[0_2px_0_0_#c2410c] sm:shadow-[0_4px_0_0_#c2410c] active:translate-y-1 active:shadow-none transition-all ${
              logoBounce ? "scale-110 -rotate-6" : "hover:scale-105"
            }`}
            title="TobiQuest - Petualangan Edukasi Cilik"
          >
            <Compass className="w-4 h-4 sm:w-7 sm:h-7 text-amber-50" strokeWidth={2.5} />
          </div>
          <div>
            <div className="flex items-center gap-1">
              <span className="text-base sm:text-3xl font-extrabold tracking-tight font-display bg-gradient-to-r from-amber-500 via-orange-600 to-rose-600 bg-clip-text text-transparent">
                TobiQuest
              </span>
            </div>
          </div>
        </div>

        {/* Action Controls & Kid Profile */}
        <div className="flex items-center gap-1 sm:gap-2.5 shrink-0">
          {/* Audio TTS Toggle */}
          <button
            onClick={toggleSpeech}
            className={`h-8 sm:h-11 flex items-center justify-center gap-1 px-1.5 sm:px-3.5 rounded-xl sm:rounded-2xl font-bold text-xs sm:text-sm border-2 transition-all btn-chunky shrink-0 ${
              profile.audioEnabled
                ? "bg-sky-100 text-sky-800 border-sky-300 shadow-[0_2px_0_0_#0284c7] sm:shadow-[0_3px_0_0_#0284c7]"
                : "bg-slate-100 text-slate-500 border-slate-300 shadow-[0_2px_0_0_#94a3b8] sm:shadow-[0_3px_0_0_#94a3b8]"
            }`}
            title="Nyalakan / Matikan Suara Narator Tobi"
          >
            {profile.audioEnabled ? (
              <>
                <Volume2 className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-sky-600 animate-pulse" />
                <span className="hidden sm:inline">Suara Tobi Aktif</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-slate-500" />
                <span className="hidden sm:inline">Suara Mati</span>
              </>
            )}
          </button>

          {/* Telkomsel Lite Mode Toggle */}
          <button
            onClick={toggleLiteMode}
            className={`h-8 sm:h-11 flex items-center justify-center gap-0.5 sm:gap-1 px-1.5 sm:px-3.5 rounded-xl sm:rounded-2xl font-bold text-[11px] sm:text-sm border-2 transition-all btn-chunky shrink-0 ${
              profile.liteMode
                ? "bg-red-600 text-white border-red-700 shadow-[0_2px_0_0_#991b1b] sm:shadow-[0_3px_0_0_#991b1b]"
                : "bg-amber-100 text-amber-900 border-amber-300 shadow-[0_2px_0_0_#d97706] sm:shadow-[0_3px_0_0_#d97706]"
            }`}
            title="Mode Telkomsel Lite: Sangat hemat kuota data (< 500 KB) untuk jaringan pelosok"
          >
            {profile.liteMode ? (
              <>
                <Zap className="w-3 h-3 sm:w-5 sm:h-5 text-yellow-300 fill-yellow-300" />
                <span className="font-extrabold text-[10px] sm:text-sm">Lite</span>
              </>
            ) : (
              <>
                <Wifi className="w-3 h-3 sm:w-5 sm:h-5 text-amber-600" />
                <span className="hidden sm:inline">Telkomsel Lite</span>
                <span className="sm:hidden font-extrabold text-[10px]">Lite</span>
              </>
            )}
          </button>

          {/* Stars Counter */}
          <div 
            onClick={handleStarClick}
            className="h-8 sm:h-11 flex items-center justify-center gap-1 sm:gap-1.5 px-1.5 sm:px-3.5 rounded-xl sm:rounded-2xl bg-amber-400 text-amber-950 font-extrabold text-xs sm:text-sm border-2 border-amber-500 shadow-[0_2px_0_0_#b45309] sm:shadow-[0_3px_0_0_#b45309] cursor-pointer hover:bg-amber-300 transition-colors shrink-0"
            title="Koleksi Bintang Prestasimu!"
          >
            <Star className={`w-3.5 h-3.5 sm:w-5 sm:h-5 fill-amber-900 text-amber-900 ${starBounce ? "animate-bounce" : ""}`} />
            <span className="font-display text-xs sm:text-base">{profile.stars}</span>
          </div>

          {/* Certificate Button */}
          <button
            onClick={onOpenCertificate}
            className="hidden md:flex h-8 sm:h-11 items-center justify-center gap-1.5 px-2.5 sm:px-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-extrabold text-xs sm:text-sm border-2 border-emerald-600 shadow-[0_3px_0_0_#065f46] btn-chunky hover:brightness-105 whitespace-nowrap shrink-0"
            title="Cetak Piagam Penghargaan Resmi"
          >
            <Award className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>Piagam Prestasi</span>
          </button>



          {/* Tombol Profil Avatar Bulat */}
          {(() => {
            const activeChar = AVAILABLE_AVATARS.find(
              (av) => av.emoji === profile.avatar || av.id === profile.avatar
            );
            return (
              <button
                onClick={onOpenProfile}
                className="flex flex-col items-center justify-center group cursor-pointer focus:outline-none shrink-0"
                title={`Lihat & Ganti Profil Siswa (${activeChar ? activeChar.name + " - " + activeChar.role : profile.name})`}
              >
                {/* Lingkaran Avatar */}
                <div
                  className={`w-8 h-8 sm:w-11 sm:h-11 rounded-full ${
                    activeChar ? activeChar.bgColor : "bg-purple-100"
                  } group-hover:brightness-95 border-2 ${
                    activeChar ? activeChar.borderColor : "border-purple-400"
                  } shadow-[0_2px_0_0_#7e22ce] sm:shadow-[0_3px_0_0_#7e22ce] flex items-center justify-center transition-transform group-hover:scale-105 active:scale-95 overflow-hidden shrink-0`}
                >
                  <span className="text-base sm:text-2xl leading-none select-none">
                    {profile.avatar}
                  </span>
                </div>
                <span className="hidden sm:block text-[10px] sm:text-xs font-black text-slate-800 max-w-[85px] truncate mt-0.5 leading-tight">
                  {profile.name}
                </span>
              </button>
            );
          })()}
        </div>
      </div>
    </header>
  );
}
