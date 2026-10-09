"use client";

import React from "react";
import { Compass, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-auto bg-white border-t-4 border-amber-200/80 pt-10 pb-8 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-slate-100">
          {/* Col 1: About (2 Kolom di Desktop) */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="flex items-center justify-center w-8 h-8 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-gradient-to-br from-amber-400 via-orange-500 to-rose-500 text-white shadow-[0_2px_0_0_#c2410c] sm:shadow-[0_3px_0_0_#c2410c]">
                <Compass className="w-4 h-4 sm:w-6 sm:h-6 text-amber-50" strokeWidth={2.5} />
              </div>
              <span className="text-xl sm:text-2xl font-black font-display bg-gradient-to-r from-amber-500 via-orange-600 to-rose-600 bg-clip-text text-transparent">
                TobiQuest
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed max-w-xl">
              Platform web edukasi interaktif masa depan untuk siswa Sekolah Dasar (SD Kelas 1–6) se-Indonesia. Diciptakan untuk <strong>M-ONE Telkomsel Coding Competition</strong> dengan misi menghadirkan pembelajaran yang inklusif, menyenangkan, bersuara ramah, dan hemat kuota data.
            </p>
          </div>

          {/* Col 2: Fitur Inovasi (1 Kolom di Desktop) */}
          <div className="md:col-span-1">
            <h4 className="text-sm font-black font-display uppercase tracking-wider text-slate-800 mb-3">
              Inovasi Utama
            </h4>
            <ul className="space-y-2 text-xs font-semibold text-slate-600">
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>Maskot Tobi (Web Speech API TTS)</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                <span>AI Socratic Mentor (Zero-Scold)</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Lab Sains Campur Warna & Siklus Air</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                <span>Manipulatif Pohon Apel CPA</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                <span>Telkomsel Lite Mode (&lt;500 KB)</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar Responsif (Rata Tengah di Mobile, Kiri-Kanan di Desktop) */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-semibold text-slate-500">
          <p className="flex items-center justify-center sm:justify-start text-center gap-1">
            Dibuat dengan <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 shrink-0" /> untuk Pendidikan Siswa SD Indonesia
          </p>
          <p className="text-center sm:text-right">
            M-ONE Telkomsel Coding Competition 2026 • Innovating Education Through Technology
          </p>
        </div>
      </div>
    </footer>
  );
}
