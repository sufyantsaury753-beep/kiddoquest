"use client";

import React, { useState } from "react";
import { 
  Zap, 
  Power, 
  Lightbulb, 
  Info, 
  RotateCcw, 
  Check, 
  Volume2,
  Link,
  GitFork 
} from "lucide-react";
import { sound } from "@/lib/sound";

interface ElectricCircuitsViewProps {
  onEarnStars: (amount: number) => void;
  audioEnabled: boolean;
  liteMode: boolean;
}

export default function ElectricCircuitsView({
  onEarnStars,
  audioEnabled,
  liteMode,
}: ElectricCircuitsViewProps) {
  const [circuitMode, setCircuitMode] = useState<"assembly" | "basic" | "series" | "parallel">("assembly");

  // Mode 1: Assembly Puzzle State
  const [assemblySlots, setAssemblySlots] = useState<{
    battery: boolean;
    switch: boolean;
    bulb: boolean;
    wires: boolean;
  }>({
    battery: false,
    switch: false,
    bulb: false,
    wires: false,
  });
  const [assemblySwitchClosed, setAssemblySwitchClosed] = useState<boolean>(false);
  const [assemblyTestItem, setAssemblyTestItem] = useState<"wire" | "paperclip" | "eraser">("wire");
  const [hasEarnedAssemblyStars, setHasEarnedAssemblyStars] = useState<boolean>(false);

  // Mode 2: Basic Circuit State
  const [basicSwitch, setBasicSwitch] = useState<boolean>(false);

  // Mode 3: Series Circuit State
  const [seriesSwitch, setSeriesSwitch] = useState<boolean>(false);
  const [bulbAAttached, setBulbAAttached] = useState<boolean>(true);
  const [bulbBAttached, setBulbBAttached] = useState<boolean>(true);

  // Mode 4: Parallel Circuit State
  const [parallelSwitchA, setParallelSwitchA] = useState<boolean>(false);
  const [parallelSwitchB, setParallelSwitchB] = useState<boolean>(false);

  // Status kelengkapan assembly
  const isAssemblyComplete =
    assemblySlots.battery && assemblySlots.switch && assemblySlots.bulb && assemblySlots.wires;

  const isAssemblyLit =
    isAssemblyComplete &&
    assemblySwitchClosed &&
    (assemblyTestItem === "wire" || assemblyTestItem === "paperclip");

  // Handlers Assembly Puzzle
  const handleToggleAssemblySlot = (slot: "battery" | "switch" | "bulb" | "wires") => {
    sound.playChime();
    setAssemblySlots((prev) => {
      const next = { ...prev, [slot]: !prev[slot] };
      const allDone = next.battery && next.switch && next.bulb && next.wires;

      if (allDone && !hasEarnedAssemblyStars) {
        sound.playCelebration();
        onEarnStars(30);
        setHasEarnedAssemblyStars(true);
        if (audioEnabled) {
          sound.speak("Luar biasa! Seluruh komponen berhasil terpasang di papan sirkuit! Sekarang tutup saklar untuk mengalirkan arus listrik!");
        }
      } else if (next[slot]) {
        if (audioEnabled) {
          const names = {
            battery: "Baterai 1.5V",
            switch: "Saklar Pisau Laboratorium",
            bulb: "Bohlam Pijar",
            wires: "Kabel Tembaga",
          };
          sound.speak(`${names[slot]} berhasil terpasang di tempatnya!`);
        }
      }
      return next;
    });
  };

  const handleToggleAssemblySwitch = () => {
    sound.playChime();
    const nextState = !assemblySwitchClosed;
    setAssemblySwitchClosed(nextState);

    if (audioEnabled) {
      if (nextState) {
        if (assemblyTestItem === "eraser") {
          sound.speak("Saklar ditutup, tetapi penghapus karet adalah bahan isolator! Listrik terhambat dan lampu tetap padam.");
        } else if (isAssemblyComplete) {
          sound.speak("Saklar ditutup! Sirkuit tertutup sempurna dan arus listrik mengalir menyalakan lampu!");
        } else {
          sound.speak("Saklar ditutup, tapi sirkuit masih belum lengkap. Pasang semua komponen terlebih dahulu!");
        }
      } else {
        sound.speak("Saklar dibuka. Sirkuit terputus dan lampu padam kembali.");
      }
    }
  };

  const handleSelectAssemblyTestItem = (item: "wire" | "paperclip" | "eraser") => {
    sound.playChime();
    setAssemblyTestItem(item);

    if (audioEnabled) {
      if (item === "wire") {
        sound.speak("Kawat tembaga dipasang! Tembaga adalah konduktor listrik terbaik.");
      } else if (item === "paperclip") {
        sound.speak("Klip kertas logam dipasang! Logam besi menghantarkan arus listrik dengan sangat baik.");
      } else {
        sound.speak("Penghapus karet dipasang! Karet adalah bahan isolator yang menahan aliran elektron.");
      }
    }
  };

  const handleResetAssembly = () => {
    sound.playChime();
    setAssemblySlots({ battery: false, switch: false, bulb: false, wires: false });
    setAssemblySwitchClosed(false);
    setAssemblyTestItem("wire");
  };

  // Handlers Mode Standar
  const handleToggleBasicSwitch = () => {
    sound.playChime();
    const nextState = !basicSwitch;
    setBasicSwitch(nextState);
    if (audioEnabled) {
      sound.speak(nextState ? "Saklar ditutup! Arus listrik mengalir dan lampu menyala terang!" : "Saklar dibuka! Arus terputus dan lampu padam.");
    }
  };

  const handleToggleSeriesSwitch = () => {
    sound.playChime();
    const nextState = !seriesSwitch;
    setSeriesSwitch(nextState);
    if (audioEnabled) {
      sound.speak(nextState ? "Saklar seri dinyalakan!" : "Saklar seri dimatikan.");
    }
  };

  const handleToggleBulbA = () => {
    sound.playChime();
    setBulbAAttached((prev) => !prev);
  };

  const handleToggleBulbB = () => {
    sound.playChime();
    setBulbBAttached((prev) => !prev);
  };

  const handleToggleParallelSwitchA = () => {
    sound.playChime();
    setParallelSwitchA((prev) => !prev);
  };

  const handleToggleParallelSwitchB = () => {
    sound.playChime();
    setParallelSwitchB((prev) => !prev);
  };

  const isBothLit = seriesSwitch && bulbAAttached && bulbBAttached;

  return (
    <div className="max-w-5xl mx-auto px-3 sm:px-6 py-4 sm:py-6 space-y-4 select-none">
      {/* CSS Animasi Aliran Elektron */}
      <style>{`
        @keyframes electronStreamMove {
          to {
            stroke-dashoffset: -24;
          }
        }
        .animate-electron-stream {
          stroke-dasharray: 6 6;
          animation: electronStreamMove 0.8s linear infinite;
        }
      `}</style>

      {/* Mode Switcher Bar */}
      <div className="bg-white rounded-3xl p-3 sm:p-4 border-2 border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-2.5">
        <div className="grid grid-cols-2 gap-2 w-full sm:flex sm:w-auto">
          {[
            { id: "assembly" as const, label: "Rakit Sirkuit (Puzzle)", icon: Zap },
            { id: "basic" as const, label: "Rangkaian Dasar", icon: Lightbulb },
            { id: "series" as const, label: "Rangkaian Seri", icon: Link },
            { id: "parallel" as const, label: "Rangkaian Paralel", icon: GitFork },
          ].map((mode) => {
            const IconComp = mode.icon;
            const isActive = circuitMode === mode.id;

            return (
              <button
                key={mode.id}
                onClick={() => {
                  setCircuitMode(mode.id);
                  sound.playChime();
                }}
                className={`min-h-[44px] py-2 px-2 sm:px-3 text-center flex items-center justify-center gap-1.5 text-xs sm:text-sm font-black rounded-xl sm:rounded-2xl transition-all btn-chunky ${
                  isActive
                    ? "bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-black border-2 border-amber-600 shadow-[0_3px_0_0_#b45309] scale-[1.02]"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-700 border-2 border-slate-300 font-bold"
                }`}
              >
                <IconComp className={`w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 ${isActive ? "text-slate-950" : "text-slate-600"}`} />
                <span className="leading-tight">{mode.label}</span>
              </button>
            );
          })}
        </div>

        <button
          onClick={() => {
            sound.playChime();
            if (audioEnabled) {
              if (circuitMode === "assembly") {
                sound.speak("Pasang baterai, saklar, bohlam, dan kabel dari kotak perkakas untuk merakit sirkuit listrikmu sendiri!");
              } else if (circuitMode === "series") {
                sound.speak("Rangkaian seri: Jika salah satu lampu dicopot atau rusak, seluruh rangkaian terputus dan semua lampu padam.");
              } else if (circuitMode === "parallel") {
                sound.speak("Rangkaian paralel: Setiap lampu memiliki jalur kawat tersendiri. Mematikan satu saklar tidak mempengaruhi lampu lainnya.");
              } else {
                sound.speak("Rangkaian dasar: Arus listrik hanya mengalir saat saklar ditutup membentuk sirkuit tertutup.");
              }
            }
          }}
          className="w-full sm:w-auto mt-1 sm:mt-0 py-2.5 sm:py-2 px-4 rounded-xl sm:rounded-2xl justify-center flex items-center gap-2 text-xs sm:text-sm font-black sm:font-bold bg-sky-50 hover:bg-sky-100 text-sky-800 border-2 border-sky-300 shadow-sm transition-all active:scale-95"
        >
          <Volume2 className="w-4 h-4 text-sky-700 shrink-0" />
          <span>Dengar Penjelasan</span>
        </button>
      </div>

      {/* Papan Sirkuit Interaktif Pure SVG */}
      <div className="relative rounded-3xl overflow-hidden border-4 border-slate-700 bg-slate-950 shadow-2xl p-4 sm:p-6 select-none">
        {/* MODE 1: ASSEMBLY PUZZLE SVG CANVAS */}
        {circuitMode === "assembly" && (
          <div className="w-full flex items-center justify-center">
            <svg
              viewBox="0 0 600 330"
              className="w-full h-auto max-h-[290px] sm:max-h-[340px] select-none"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <radialGradient id="assemblyBulbGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#fef08a" stopOpacity="0.9" />
                  <stop offset="50%" stopColor="#facc15" stopOpacity="0.45" />
                  <stop offset="100%" stopColor="#eab308" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Slot Garis Kabel Sirkuit */}
              <rect x="70" y="40" width="460" height="240" rx="18" stroke="#1e293b" strokeWidth="12" />

              {assemblySlots.wires && (
                <rect
                  x="70"
                  y="40"
                  width="460"
                  height="240"
                  rx="18"
                  stroke={isAssemblyLit ? "#facc15" : "#3b82f6"}
                  strokeWidth="8"
                  className={isAssemblyLit ? "animate-electron-stream" : ""}
                />
              )}

              {/* Baterai Slot (Kiri) */}
              <g onClick={() => handleToggleAssemblySlot("battery")} className="cursor-pointer">
                {assemblySlots.battery ? (
                  <>
                    <rect x="50" y="110" width="40" height="100" rx="6" fill="#1e40af" stroke="#3b82f6" strokeWidth="2.5" />
                    <rect x="63" y="98" width="14" height="12" rx="2" fill="#facc15" stroke="#b45309" strokeWidth="1.5" />
                    <text x="70" y="90" fill="#facc15" fontSize="14" fontWeight="bold" textAnchor="middle">+</text>
                    <rect x="55" y="210" width="30" height="6" rx="1" fill="#94a3b8" />
                    <text x="70" y="232" fill="#94a3b8" fontSize="16" fontWeight="bold" textAnchor="middle">-</text>
                    <text x="70" y="160" fill="#ffffff" fontSize="12" fontWeight="900" textAnchor="middle">1.5V</text>
                  </>
                ) : (
                  <>
                    <rect x="45" y="105" width="50" height="110" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4 4" opacity="0.75" />
                    <text x="70" y="165" fill="#f59e0b" fontSize="10" fontWeight="bold" textAnchor="middle">[ Pasang Baterai ]</text>
                  </>
                )}
              </g>

              {/* Saklar Slot (Atas) */}
              <g onClick={handleToggleAssemblySwitch} className="cursor-pointer">
                {assemblySlots.switch ? (
                  <>
                    <rect x="235" y="28" width="130" height="24" rx="4" fill="#78350f" stroke="#451a03" strokeWidth="2" />
                    <circle cx="250" cy="40" r="7" fill="#d97706" />
                    <circle cx="350" cy="40" r="7" fill="#d97706" />
                    {assemblySwitchClosed ? (
                      <>
                        <line x1="250" y1="40" x2="350" y2="40" stroke="#f59e0b" strokeWidth="6" strokeLinecap="round" />
                        <circle cx="350" cy="40" r="8" fill="#dc2626" />
                      </>
                    ) : (
                      <>
                        <line x1="250" y1="40" x2="335" y2="10" stroke="#d97706" strokeWidth="6" strokeLinecap="round" />
                        <circle cx="335" cy="10" r="8" fill="#dc2626" />
                      </>
                    )}
                    <text x="300" y="66" fill={assemblySwitchClosed ? "#4ade80" : "#f87171"} fontSize="10" fontWeight="900" textAnchor="middle">
                      {assemblySwitchClosed ? "SAKLAR: TERTUTUP (ON)" : "SAKLAR: TERBUKA (OFF)"}
                    </text>
                  </>
                ) : (
                  <>
                    <rect x="230" y="26" width="140" height="30" rx="6" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4 4" opacity="0.75" />
                    <text x="300" y="45" fill="#f59e0b" fontSize="10" fontWeight="bold" textAnchor="middle">[ Pasang Saklar ]</text>
                  </>
                )}
              </g>

              {/* Bohlam Slot (Kanan) */}
              <g onClick={() => handleToggleAssemblySlot("bulb")} className="cursor-pointer">
                {assemblySlots.bulb ? (
                  <>
                    {isAssemblyLit && <circle cx="530" cy="160" r="50" fill="url(#assemblyBulbGlow)" />}
                    <path
                      d="M 518 178 C 513 171 510 163 510 156 C 510 144 519 136 530 136 C 541 136 550 144 550 156 C 550 163 547 171 542 178 Z"
                      fill={isAssemblyLit ? "#fef08a" : "#1e293b"}
                      stroke={isAssemblyLit ? "#f59e0b" : "#64748b"}
                      strokeWidth="2.5"
                    />
                    <rect x="520" y="178" width="20" height="14" rx="2" fill="#94a3b8" />
                    <text x="530" y="206" fill={isAssemblyLit ? "#facc15" : "#94a3b8"} fontSize="11" fontWeight="bold" textAnchor="middle">
                      {isAssemblyLit ? "MENYALA" : "PADAM"}
                    </text>
                  </>
                ) : (
                  <>
                    <rect x="505" y="130" width="50" height="60" rx="6" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4 4" opacity="0.75" />
                    <text x="530" y="165" fill="#f59e0b" fontSize="10" fontWeight="bold" textAnchor="middle">[ Pasang Bohlam ]</text>
                  </>
                )}
              </g>

              {/* Celah Uji Bahan (Bawah) */}
              <g className="cursor-pointer">
                <rect x="230" y="265" width="140" height="30" rx="6" fill="#0f172a" stroke="#64748b" strokeWidth="2" />
                <text x="300" y="278" fill="#94a3b8" fontSize="8" fontWeight="bold" textAnchor="middle">CELAH UJI PENGHANTAR</text>
                {assemblyTestItem === "wire" && (
                  <>
                    <line x1="240" y1="285" x2="360" y2="285" stroke="#f59e0b" strokeWidth="4" strokeLinecap="round" />
                    <text x="300" y="293" fill="#facc15" fontSize="9" fontWeight="900" textAnchor="middle">KAWAT TEMBAGA (KONDUKTOR)</text>
                  </>
                )}
                {assemblyTestItem === "paperclip" && (
                  <>
                    <rect x="260" y="282" width="80" height="6" rx="3" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="1" />
                    <text x="300" y="293" fill="#38bdf8" fontSize="9" fontWeight="900" textAnchor="middle">KLIP LOGAM (KONDUKTOR)</text>
                  </>
                )}
                {assemblyTestItem === "eraser" && (
                  <>
                    <rect x="270" y="280" width="60" height="10" rx="3" fill="#f43f5e" stroke="#e11d48" strokeWidth="1" />
                    <text x="300" y="293" fill="#fb7185" fontSize="9" fontWeight="900" textAnchor="middle">PENGHAPUS (ISOLATOR)</text>
                  </>
                )}
              </g>
            </svg>
          </div>
        )}

        {/* MODE 2: BASIC CIRCUIT */}
        {circuitMode === "basic" && (
          <div className="w-full flex items-center justify-center">
            <svg viewBox="0 0 600 330" className="w-full h-auto max-h-[290px] sm:max-h-[340px] select-none" fill="none">
              <rect x="70" y="40" width="460" height="240" rx="18" stroke={basicSwitch ? "#facc15" : "#3b82f6"} strokeWidth="8" className={basicSwitch ? "animate-electron-stream" : ""} />
              {/* Baterai */}
              <rect x="50" y="110" width="40" height="100" rx="6" fill="#1e40af" stroke="#3b82f6" strokeWidth="2.5" />
              <rect x="63" y="98" width="14" height="12" rx="2" fill="#facc15" stroke="#b45309" strokeWidth="1.5" />
              <text x="70" y="160" fill="#ffffff" fontSize="12" fontWeight="900" textAnchor="middle">1.5V</text>
              {/* Saklar */}
              <g onClick={handleToggleBasicSwitch} className="cursor-pointer">
                <rect x="240" y="28" width="120" height="24" rx="4" fill="#78350f" stroke="#451a03" strokeWidth="2" />
                <circle cx="255" cy="40" r="7" fill="#d97706" />
                <circle cx="345" cy="40" r="7" fill="#d97706" />
                {basicSwitch ? (
                  <line x1="255" y1="40" x2="345" y2="40" stroke="#f59e0b" strokeWidth="6" strokeLinecap="round" />
                ) : (
                  <line x1="255" y1="40" x2="330" y2="10" stroke="#d97706" strokeWidth="6" strokeLinecap="round" />
                )}
                <text x="300" y="66" fill={basicSwitch ? "#4ade80" : "#f87171"} fontSize="10" fontWeight="900" textAnchor="middle">
                  {basicSwitch ? "SAKLAR: TERTUTUP (ON)" : "SAKLAR: TERBUKA (OFF)"}
                </text>
              </g>
              {/* Lampu */}
              {basicSwitch && <circle cx="530" cy="160" r="50" fill="#fef08a" opacity="0.8" />}
              <path d="M 518 178 C 513 171 510 163 510 156 C 510 144 519 136 530 136 C 541 136 550 144 550 156 C 550 163 547 171 542 178 Z" fill={basicSwitch ? "#fef08a" : "#1e293b"} stroke={basicSwitch ? "#f59e0b" : "#64748b"} strokeWidth="2.5" />
              <rect x="520" y="178" width="20" height="14" rx="2" fill="#94a3b8" />
              <text x="530" y="206" fill={basicSwitch ? "#facc15" : "#94a3b8"} fontSize="11" fontWeight="bold" textAnchor="middle">{basicSwitch ? "MENYALA" : "PADAM"}</text>
            </svg>
          </div>
        )}

        {/* MODE 3: SERIES CIRCUIT */}
        {circuitMode === "series" && (
          <div className="w-full flex items-center justify-center">
            <svg viewBox="0 0 600 330" className="w-full h-auto max-h-[290px] sm:max-h-[340px] select-none" fill="none">
              <rect x="70" y="40" width="460" height="240" rx="18" stroke={isBothLit ? "#facc15" : "#3b82f6"} strokeWidth="8" className={isBothLit ? "animate-electron-stream" : ""} />
              {/* Baterai */}
              <rect x="50" y="110" width="40" height="100" rx="6" fill="#1e40af" stroke="#3b82f6" strokeWidth="2.5" />
              <text x="70" y="160" fill="#ffffff" fontSize="12" fontWeight="900" textAnchor="middle">1.5V</text>
              {/* Saklar Utama */}
              <g onClick={handleToggleSeriesSwitch} className="cursor-pointer">
                <rect x="240" y="28" width="120" height="24" rx="4" fill="#78350f" stroke="#451a03" strokeWidth="2" />
                <circle cx="255" cy="40" r="7" fill="#d97706" />
                <circle cx="345" cy="40" r="7" fill="#d97706" />
                {seriesSwitch ? (
                  <line x1="255" y1="40" x2="345" y2="40" stroke="#f59e0b" strokeWidth="6" strokeLinecap="round" />
                ) : (
                  <line x1="255" y1="40" x2="330" y2="10" stroke="#d97706" strokeWidth="6" strokeLinecap="round" />
                )}
                <text x="300" y="66" fill={seriesSwitch ? "#4ade80" : "#f87171"} fontSize="10" fontWeight="900" textAnchor="middle">
                  {seriesSwitch ? "SAKLAR SERI: ON" : "SAKLAR SERI: OFF"}
                </text>
              </g>
              {/* Lampu 1 Seri (Atas Kanan) */}
              <g onClick={handleToggleBulbA} className="cursor-pointer">
                {bulbAAttached ? (
                  <>
                    {isBothLit && <circle cx="530" cy="110" r="35" fill="#fef08a" opacity="0.8" />}
                    <path d="M 520 125 C 516 118 514 112 514 106 C 514 96 521 90 530 90 C 539 90 546 96 546 106 C 546 112 544 118 540 125 Z" fill={isBothLit ? "#fef08a" : "#1e293b"} stroke={isBothLit ? "#f59e0b" : "#64748b"} strokeWidth="2" />
                    <rect x="522" y="125" width="16" height="10" rx="1.5" fill="#94a3b8" />
                    <text x="530" y="148" fill={isBothLit ? "#facc15" : "#94a3b8"} fontSize="9" fontWeight="bold" textAnchor="middle">LAMPU 1</text>
                  </>
                ) : (
                  <>
                    <rect x="515" y="90" width="30" height="45" rx="4" fill="none" stroke="#ef4444" strokeWidth="2" strokeDasharray="3 3" />
                    <text x="530" y="115" fill="#ef4444" fontSize="8" fontWeight="bold" textAnchor="middle">DICOPOT</text>
                  </>
                )}
              </g>
              {/* Lampu 2 Seri (Bawah Kanan) */}
              <g onClick={handleToggleBulbB} className="cursor-pointer">
                {bulbBAttached ? (
                  <>
                    {isBothLit && <circle cx="530" cy="210" r="35" fill="#fef08a" opacity="0.8" />}
                    <path d="M 520 225 C 516 218 514 212 514 206 C 514 196 521 190 530 190 C 539 190 546 196 546 206 C 546 212 544 218 540 225 Z" fill={isBothLit ? "#fef08a" : "#1e293b"} stroke={isBothLit ? "#f59e0b" : "#64748b"} strokeWidth="2" />
                    <rect x="522" y="225" width="16" height="10" rx="1.5" fill="#94a3b8" />
                    <text x="530" y="248" fill={isBothLit ? "#facc15" : "#94a3b8"} fontSize="9" fontWeight="bold" textAnchor="middle">LAMPU 2</text>
                  </>
                ) : (
                  <>
                    <rect x="515" y="190" width="30" height="45" rx="4" fill="none" stroke="#ef4444" strokeWidth="2" strokeDasharray="3 3" />
                    <text x="530" y="215" fill="#ef4444" fontSize="8" fontWeight="bold" textAnchor="middle">DICOPOT</text>
                  </>
                )}
              </g>
            </svg>
          </div>
        )}

        {/* MODE 4: PARALLEL CIRCUIT */}
        {circuitMode === "parallel" && (
          <div className="w-full flex items-center justify-center">
            <svg viewBox="0 0 600 330" className="w-full h-auto max-h-[290px] sm:max-h-[340px] select-none" fill="none">
              {/* Baterai */}
              <rect x="50" y="110" width="40" height="100" rx="6" fill="#1e40af" stroke="#3b82f6" strokeWidth="2.5" />
              <text x="70" y="160" fill="#ffffff" fontSize="12" fontWeight="900" textAnchor="middle">1.5V</text>

              {/* Jalur Cabang 1 (Atas) */}
              <path d="M 70 110 L 70 60 L 530 60 L 530 120" stroke={parallelSwitchA ? "#facc15" : "#3b82f6"} strokeWidth="6" className={parallelSwitchA ? "animate-electron-stream" : ""} />
              {/* Jalur Cabang 2 (Bawah) */}
              <path d="M 70 210 L 70 260 L 530 260 L 530 200" stroke={parallelSwitchB ? "#facc15" : "#3b82f6"} strokeWidth="6" className={parallelSwitchB ? "animate-electron-stream" : ""} />

              {/* Saklar Cabang A */}
              <g onClick={handleToggleParallelSwitchA} className="cursor-pointer">
                <rect x="230" y="48" width="100" height="24" rx="4" fill="#78350f" stroke="#451a03" strokeWidth="2" />
                <circle cx="245" cy="60" r="6" fill="#d97706" />
                <circle cx="315" cy="60" r="6" fill="#d97706" />
                {parallelSwitchA ? (
                  <line x1="245" y1="60" x2="315" y2="60" stroke="#f59e0b" strokeWidth="5" strokeLinecap="round" />
                ) : (
                  <line x1="245" y1="60" x2="305" y2="35" stroke="#d97706" strokeWidth="5" strokeLinecap="round" />
                )}
                <text x="280" y="84" fill={parallelSwitchA ? "#4ade80" : "#f87171"} fontSize="9" fontWeight="900" textAnchor="middle">CABANG 1: {parallelSwitchA ? "ON" : "OFF"}</text>
              </g>

              {/* Saklar Cabang B */}
              <g onClick={handleToggleParallelSwitchB} className="cursor-pointer">
                <rect x="230" y="248" width="100" height="24" rx="4" fill="#78350f" stroke="#451a03" strokeWidth="2" />
                <circle cx="245" cy="260" r="6" fill="#d97706" />
                <circle cx="315" cy="260" r="6" fill="#d97706" />
                {parallelSwitchB ? (
                  <line x1="245" y1="260" x2="315" y2="260" stroke="#f59e0b" strokeWidth="5" strokeLinecap="round" />
                ) : (
                  <line x1="245" y1="260" x2="305" y2="235" stroke="#d97706" strokeWidth="5" strokeLinecap="round" />
                )}
                <text x="280" y="284" fill={parallelSwitchB ? "#4ade80" : "#f87171"} fontSize="9" fontWeight="900" textAnchor="middle">CABANG 2: {parallelSwitchB ? "ON" : "OFF"}</text>
              </g>

              {/* Lampu Cabang A */}
              {parallelSwitchA && <circle cx="530" cy="110" r="35" fill="#fef08a" opacity="0.8" />}
              <path d="M 520 125 C 516 118 514 112 514 106 C 514 96 521 90 530 90 C 539 90 546 96 546 106 C 546 112 544 118 540 125 Z" fill={parallelSwitchA ? "#fef08a" : "#1e293b"} stroke={parallelSwitchA ? "#f59e0b" : "#64748b"} strokeWidth="2" />
              <rect x="522" y="125" width="16" height="10" rx="1.5" fill="#94a3b8" />
              <text x="530" y="148" fill={parallelSwitchA ? "#facc15" : "#94a3b8"} fontSize="9" fontWeight="bold" textAnchor="middle">LAMPU A</text>

              {/* Lampu Cabang B */}
              {parallelSwitchB && <circle cx="530" cy="210" r="35" fill="#fef08a" opacity="0.8" />}
              <path d="M 520 225 C 516 218 514 212 514 206 C 514 196 521 190 530 190 C 539 190 546 196 546 206 C 546 212 544 218 540 225 Z" fill={parallelSwitchB ? "#fef08a" : "#1e293b"} stroke={parallelSwitchB ? "#f59e0b" : "#64748b"} strokeWidth="2" />
              <rect x="522" y="225" width="16" height="10" rx="1.5" fill="#94a3b8" />
              <text x="530" y="248" fill={parallelSwitchB ? "#facc15" : "#94a3b8"} fontSize="9" fontWeight="bold" textAnchor="middle">LAMPU B</text>
            </svg>
          </div>
        )}
      </div>

      {/* Kontrol Interaktif Panel Perkakas & Pengujian Bahan */}
      {circuitMode === "assembly" && (
        <div className="bg-white rounded-3xl p-4 sm:p-5 border-2 border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase text-slate-800 tracking-wider">
              1. Kotak Perkakas Komponen Listrik:
            </span>
            <button
              onClick={handleResetAssembly}
              className="px-2.5 py-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs border border-slate-300 flex items-center gap-1 btn-chunky"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Rakitan</span>
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <button
              onClick={() => handleToggleAssemblySlot("battery")}
              className={`p-3 rounded-2xl border-2 text-left btn-chunky transition-all ${
                assemblySlots.battery ? "bg-emerald-50 border-emerald-400" : "bg-slate-50 border-slate-200 hover:bg-slate-100"
              }`}
            >
              <span className="text-[10px] font-bold text-slate-500 block">Sumber Daya</span>
              <p className="text-xs font-black text-slate-800">Baterai DC (1.5V)</p>
              <span className={`text-[10px] font-black mt-1 inline-block px-1.5 py-0.5 rounded ${assemblySlots.battery ? "bg-emerald-200 text-emerald-900" : "bg-slate-200 text-slate-600"}`}>
                {assemblySlots.battery ? "Terpasang" : "Pasang"}
              </span>
            </button>

            <button
              onClick={() => handleToggleAssemblySlot("switch")}
              className={`p-3 rounded-2xl border-2 text-left btn-chunky transition-all ${
                assemblySlots.switch ? "bg-emerald-50 border-emerald-400" : "bg-slate-50 border-slate-200 hover:bg-slate-100"
              }`}
            >
              <span className="text-[10px] font-bold text-slate-500 block">Pemutus Arus</span>
              <p className="text-xs font-black text-slate-800">Saklar Pisau</p>
              <span className={`text-[10px] font-black mt-1 inline-block px-1.5 py-0.5 rounded ${assemblySlots.switch ? "bg-emerald-200 text-emerald-900" : "bg-slate-200 text-slate-600"}`}>
                {assemblySlots.switch ? "Terpasang" : "Pasang"}
              </span>
            </button>

            <button
              onClick={() => handleToggleAssemblySlot("bulb")}
              className={`p-3 rounded-2xl border-2 text-left btn-chunky transition-all ${
                assemblySlots.bulb ? "bg-emerald-50 border-emerald-400" : "bg-slate-50 border-slate-200 hover:bg-slate-100"
              }`}
            >
              <span className="text-[10px] font-bold text-slate-500 block">Indikator Cahaya</span>
              <p className="text-xs font-black text-slate-800">Bohlam Pijar</p>
              <span className={`text-[10px] font-black mt-1 inline-block px-1.5 py-0.5 rounded ${assemblySlots.bulb ? "bg-emerald-200 text-emerald-900" : "bg-slate-200 text-slate-600"}`}>
                {assemblySlots.bulb ? "Terpasang" : "Pasang"}
              </span>
            </button>

            <button
              onClick={() => handleToggleAssemblySlot("wires")}
              className={`p-3 rounded-2xl border-2 text-left btn-chunky transition-all ${
                assemblySlots.wires ? "bg-emerald-50 border-emerald-400" : "bg-slate-50 border-slate-200 hover:bg-slate-100"
              }`}
            >
              <span className="text-[10px] font-bold text-slate-500 block">Penghubung Arus</span>
              <p className="text-xs font-black text-slate-800">Kabel Tembaga</p>
              <span className={`text-[10px] font-black mt-1 inline-block px-1.5 py-0.5 rounded ${assemblySlots.wires ? "bg-emerald-200 text-emerald-900" : "bg-slate-200 text-slate-600"}`}>
                {assemblySlots.wires ? "Terpasang" : "Pasang"}
              </span>
            </button>
          </div>

          <div className="pt-3 border-t border-slate-100">
            <span className="text-xs font-black uppercase text-slate-800 tracking-wider block mb-2">
              2. Uji Bahan Celah Konduktor vs Isolator:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <button
                onClick={() => handleSelectAssemblyTestItem("wire")}
                className={`p-2.5 rounded-2xl border-2 text-left btn-chunky flex items-center justify-between ${
                  assemblyTestItem === "wire" ? "bg-amber-400 text-amber-950 border-amber-500" : "bg-slate-50 text-slate-700 border-slate-200"
                }`}
              >
                <div>
                  <p className="font-black text-xs">Kawat Tembaga</p>
                  <span className="text-[10px] font-bold block opacity-80">Konduktor Normal</span>
                </div>
                {assemblyTestItem === "wire" && <Check className="w-4 h-4" />}
              </button>

              <button
                onClick={() => handleSelectAssemblyTestItem("paperclip")}
                className={`p-2.5 rounded-2xl border-2 text-left btn-chunky flex items-center justify-between ${
                  assemblyTestItem === "paperclip" ? "bg-sky-400 text-sky-950 border-sky-500" : "bg-slate-50 text-slate-700 border-slate-200"
                }`}
              >
                <div>
                  <p className="font-black text-xs">Klip Kertas Logam</p>
                  <span className="text-[10px] font-bold block opacity-80">Konduktor Besi</span>
                </div>
                {assemblyTestItem === "paperclip" && <Check className="w-4 h-4" />}
              </button>

              <button
                onClick={() => handleSelectAssemblyTestItem("eraser")}
                className={`p-2.5 rounded-2xl border-2 text-left btn-chunky flex items-center justify-between ${
                  assemblyTestItem === "eraser" ? "bg-rose-400 text-rose-950 border-rose-500" : "bg-slate-50 text-slate-700 border-slate-200"
                }`}
              >
                <div>
                  <p className="font-black text-xs">Penghapus Karet</p>
                  <span className="text-[10px] font-bold block opacity-80">Isolator Listrik</span>
                </div>
                {assemblyTestItem === "eraser" && <Check className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Ringkasan Konsep IPAS SD */}
      <div className="bg-amber-50/70 rounded-3xl p-4 sm:p-5 border-2 border-amber-200 flex items-start gap-3">
        <Info className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div className="text-xs text-slate-700 leading-relaxed font-medium">
          <strong className="text-amber-950 font-black block mb-0.5">
            Konsep Kurikulum Merdeka IPAS SD:
          </strong>
          {circuitMode === "assembly" && "Listrik hanya mengalir pada sirkuit tertutup. Bahan konduktor (tembaga & besi) memiliki elektron yang bebas mengalir, sedangkan isolator (karet) menahan arus listrik."}
          {circuitMode === "basic" && "Saklar berfungsi menyambung dan memutus arus listrik secara terkontrol dan aman."}
          {circuitMode === "series" && "Rangkaian Seri menghubungkan beban dalam satu jalur tunggal. Jika salah satu komponen putus, seluruh aliran berhenti."}
          {circuitMode === "parallel" && "Rangkaian Paralel memiliki percabangan mandiri. Instalasi listrik di rumah kita menggunakan sistem paralel agar satu lampu mati tidak membuat seluruh rumah padam."}
        </div>
      </div>
    </div>
  );
}
