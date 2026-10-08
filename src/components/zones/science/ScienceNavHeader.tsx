"use client";

import React from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  Home, 
  FlaskConical, 
  CloudRain, 
  Sprout, 
  Zap, 
  Magnet, 
  Star, 
  Volume2, 
  VolumeX 
} from "lucide-react";
import { sound } from "@/lib/sound";

export type ScienceStationId = "lobby" | "warna" | "siklus-air" | "rantai-makanan" | "listrik" | "magnet";

interface ScienceNavHeaderProps {
  activeStation: ScienceStationId;
  stars: number;
  audioEnabled: boolean;
  onToggleAudio: () => void;
  stationTitle?: string;
  stationSubtitle?: string;
}

export const SCIENCE_STATIONS = [
  {
    id: "warna",
    name: "Lab Warna",
    path: "/lab-sains/warna",
    Icon: FlaskConical,
    accent: "bg-emerald-500 text-white border-emerald-600",
    hoverAccent: "hover:bg-emerald-50 hover:text-emerald-700",
  },
  {
    id: "siklus-air",
    name: "Siklus Air",
    path: "/lab-sains/siklus-air",
    Icon: CloudRain,
    accent: "bg-sky-500 text-white border-sky-600",
    hoverAccent: "hover:bg-sky-50 hover:text-sky-700",
  },
  {
    id: "rantai-makanan",
    name: "Rantai Makanan",
    path: "/lab-sains/rantai-makanan",
    Icon: Sprout,
    accent: "bg-teal-500 text-white border-teal-600",
    hoverAccent: "hover:bg-teal-50 hover:text-teal-700",
  },
  {
    id: "listrik",
    name: "Rakit Listrik",
    path: "/lab-sains/listrik",
    Icon: Zap,
    accent: "bg-amber-500 text-slate-950 border-amber-600",
    hoverAccent: "hover:bg-amber-50 hover:text-amber-700",
  },
  {
    id: "magnet",
    name: "Magnet Hunter",
    path: "/lab-sains/magnet",
    Icon: Magnet,
    accent: "bg-rose-500 text-white border-rose-600",
    hoverAccent: "hover:bg-rose-50 hover:text-rose-700",
  },
] as const;

export default function ScienceNavHeader({
  activeStation,
  stars,
  audioEnabled,
  onToggleAudio,
  stationTitle,
  stationSubtitle,
}: ScienceNavHeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b-4 border-amber-200/80 shadow-md no-print">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 py-2 sm:py-2.5 flex flex-col gap-2">
        {/* Baris Atas: Tombol Kembali, Info Stasiun, Bintang & Audio */}
        <div className="flex items-center justify-between gap-2">
          {/* Tombol Navigasi Keluar / Ke Lobi */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <Link
              href="/lab-sains"
              onClick={() => sound.playChime()}
              className="h-8 sm:h-9 px-2 sm:px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border-2 border-slate-300 font-bold text-xs flex items-center gap-1.5 transition-all btn-chunky"
              title="Kembali ke Lobi Utama Lab Sains"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Lobi Lab Sains</span>
              <span className="sm:hidden">Lobi</span>
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
            {/* Koleksi Bintang */}
            <div
              className="h-8 sm:h-9 px-2 sm:px-3 rounded-xl bg-amber-400 text-amber-950 font-black text-xs sm:text-sm border-2 border-amber-500 shadow-[0_2px_0_0_#b45309] flex items-center gap-1.5 shrink-0"
              title="Total Bintang Prestasi Siswa"
            >
              <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-amber-950 text-amber-950" />
              <span className="font-display">{stars}</span>
            </div>

            {/* Toggle Suara Tobi */}
            <button
              onClick={() => {
                sound.playChime();
                onToggleAudio();
              }}
              className={`h-8 sm:h-9 px-2 sm:px-3 rounded-xl font-bold text-xs border-2 transition-all btn-chunky flex items-center gap-1.5 shrink-0 ${
                audioEnabled
                  ? "bg-sky-100 text-sky-800 border-sky-300 shadow-[0_2px_0_0_#0284c7]"
                  : "bg-slate-100 text-slate-500 border-slate-300 shadow-[0_2px_0_0_#94a3b8]"
              }`}
              title="Nyalakan / Matikan Narasi Suara Tobi"
            >
              {audioEnabled ? (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-sky-600 animate-pulse" />
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

        {/* Baris Bawah: Quick Switcher Tabs (5 Wahana Lab Sains) */}
        <nav className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto pb-0.5 no-scrollbar select-none">
          {SCIENCE_STATIONS.map((station) => {
            const isActive = activeStation === station.id;
            const Icon = station.Icon;

            return (
              <Link
                key={station.id}
                href={station.path}
                onClick={() => sound.playChime()}
                className={`h-7 sm:h-8 px-2 sm:px-3 rounded-xl font-black text-[11px] sm:text-xs border transition-all btn-chunky flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
                  isActive
                    ? `${station.accent} shadow-sm border-2`
                    : `bg-slate-100 text-slate-600 border-slate-200 ${station.hoverAccent}`
                }`}
              >
                <Icon className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
                <span>{station.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
