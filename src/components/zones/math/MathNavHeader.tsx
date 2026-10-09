"use client";

import React from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  Home, 
  Star, 
  Volume2, 
  VolumeX 
} from "lucide-react";
import { sound } from "@/lib/sound";

export type MathStationId = "lobby" | "kalkulasi" | "neraca" | "detektif";

interface MathNavHeaderProps {
  activeStation?: MathStationId;
  stars: number;
  audioEnabled: boolean;
  onToggleAudio: () => void;
  stationTitle?: string;
  stationSubtitle?: string;
}

export default function MathNavHeader({
  stars,
  audioEnabled,
  onToggleAudio,
  stationTitle,
  stationSubtitle,
}: MathNavHeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b-4 border-amber-200/80 shadow-md no-print">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 py-2 sm:py-2.5 flex items-center justify-between gap-2">
        {/* Tombol Navigasi Keluar: Kembali ke Peta Kelas Hitung & Beranda */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <Link
            href="/hitung-ceria"
            replace
            onClick={() => sound.playChime()}
            className="h-8 sm:h-9 px-2.5 sm:px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border-2 border-slate-300 font-bold text-xs flex items-center gap-1.5 transition-all btn-chunky"
            title="Kembali ke Peta Hitung Ceria"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-rose-600" />
            <span className="hidden sm:inline">Peta Hitung Ceria</span>
            <span className="sm:hidden">Peta Hitung</span>
          </Link>

          <Link
            href="/"
            onClick={() => sound.playChime()}
            className="h-8 sm:h-9 px-2 sm:px-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 border-2 border-slate-300 font-bold text-xs flex items-center gap-1 transition-all btn-chunky"
            title="Kembali ke Beranda Utama TobiQuest"
          >
            <Home className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Beranda</span>
          </Link>

          {stationTitle && (
            <div className="hidden lg:block ml-2 pl-3 border-l-2 border-slate-200">
              <h1 className="text-sm font-black text-slate-800 font-display leading-tight">
                {stationTitle}
              </h1>
              {stationSubtitle && (
                <p className="text-[11px] font-semibold text-slate-500 leading-none">
                  {stationSubtitle}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Indikator Bintang & Tombol Audio Narasi */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <div
            className="h-8 sm:h-9 px-2 sm:px-3 rounded-xl bg-amber-400 text-amber-950 font-black text-xs sm:text-sm border-2 border-amber-500 shadow-[0_2px_0_0_#b45309] flex items-center gap-1.5 shrink-0"
            title="Total Bintang Prestasi Siswa"
          >
            <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-amber-950 text-amber-950" />
            <span className="font-display">{stars}</span>
          </div>

          <button
            onClick={() => {
              sound.playChime();
              onToggleAudio();
            }}
            className={`h-8 sm:h-9 px-2 sm:px-3 rounded-xl font-bold text-xs border-2 transition-all btn-chunky flex items-center gap-1.5 shrink-0 ${
              audioEnabled
                ? "bg-rose-100 text-rose-800 border-rose-300 shadow-[0_2px_0_0_#e11d48]"
                : "bg-slate-100 text-slate-500 border-slate-300 shadow-[0_2px_0_0_#94a3b8]"
            }`}
            title="Nyalakan / Matikan Narasi Suara Tobi"
          >
            {audioEnabled ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-rose-600 animate-pulse" />
                <span className="hidden sm:inline">Suara Tobi</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-slate-500" />
                <span className="hidden sm:inline">Suara Mati</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
