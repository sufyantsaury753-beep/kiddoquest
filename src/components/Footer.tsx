"use client";

import React from "react";
import { Sparkles, ShieldCheck, Heart, Award, Volume2, RotateCcw } from "lucide-react";
import { sound } from "@/lib/sound";

interface FooterProps {
  onOpenCertificate: () => void;
  onResetProgress: () => void;
}

export default function Footer({
  onOpenCertificate,
  onResetProgress,
}: FooterProps) {
  const handleTestAudio = () => {
    sound.playChime();
    sound.speak("Halo! Sistem suara dan audio KiddoQuest berfungsi dengan sangat baik!");
  };

  return (
    <footer className="mt-auto bg-white border-t-4 border-amber-200/80 pt-10 pb-8 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-slate-100">
          {/* Col 1: About */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-rose-400 text-white flex items-center justify-center font-bold">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="text-2xl font-black font-display bg-gradient-to-r from-amber-500 via-rose-500 to-sky-600 bg-clip-text text-transparent">
                KiddoQuest
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed max-w-md mb-4">
              Platform web edukasi interaktif masa depan untuk siswa Sekolah Dasar (SD Kelas 1–6) se-Indonesia. Diciptakan untuk <strong>M-ONE Telkomsel Coding Competition</strong> dengan misi menghadirkan pembelajaran yang inklusif, menyenangkan, bersuara ramah, dan hemat kuota data.
            </p>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 w-fit">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Privasi 100% Aman: LocalStorage-First, Tanpa Pelacak & Iklan</span>
            </div>
          </div>

          {/* Col 2: Fitur Inovasi */}
          <div>
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

          {/* Col 3: Akses Cepat */}
          <div>
            <h4 className="text-sm font-black font-display uppercase tracking-wider text-slate-800 mb-3">
              Aksi & Aksesibilitas
            </h4>
            <div className="flex flex-col gap-2">
              <button
                onClick={handleTestAudio}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-800 border border-sky-200 text-xs font-bold btn-chunky text-left"
              >
                <Volume2 className="w-4 h-4 text-sky-600" />
                <span>Tes Audio Suara Tobi</span>
              </button>

              <button
                onClick={onOpenCertificate}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold btn-chunky text-left"
              >
                <Award className="w-4 h-4 text-amber-600" />
                <span>Cetak Piagam Prestasi Siswa</span>
              </button>

              <button
                onClick={onResetProgress}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200 text-xs font-bold btn-chunky text-left"
              >
                <RotateCcw className="w-4 h-4 text-slate-400" />
                <span>Reset Petualangan</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-semibold text-slate-500">
          <p className="flex items-center gap-1">
            Dibuat dengan <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> untuk Pendidikan Siswa SD Indonesia
          </p>
          <p>
            M-ONE Telkomsel Coding Competition 2026 • Innovating Education Through Technology
          </p>
        </div>
      </div>
    </footer>
  );
}
