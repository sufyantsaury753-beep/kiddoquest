"use client";

import React from "react";
import { Zap, Wifi, ShieldCheck, HeartHandshake, CheckCircle2 } from "lucide-react";
import { sound } from "@/lib/sound";

interface TelkomselLiteBannerProps {
  liteMode: boolean;
  onToggleLiteMode: () => void;
}

export default function TelkomselLiteBanner({
  liteMode,
  onToggleLiteMode,
}: TelkomselLiteBannerProps) {
  const handleToggle = () => {
    sound.playChime();
    onToggleLiteMode();
  };

  return (
    <section className="my-8">
      <div className={`rounded-3xl p-6 sm:p-8 transition-all ${
        liteMode
          ? "bg-red-50 border-4 border-red-500 shadow-none"
          : "bg-gradient-to-br from-red-600 via-rose-600 to-amber-600 text-white shadow-[0_8px_0_0_#991b1b] border-4 border-red-700"
      }`}>
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center flex-shrink-0 ${
              liteMode 
                ? "bg-red-600 text-white border-2 border-red-700" 
                : "bg-white/20 backdrop-blur-md text-white border-2 border-white/40"
            }`}>
              <Zap className="w-8 h-8 fill-yellow-300 text-yellow-300 animate-pulse" />
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-xs font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                  liteMode
                    ? "bg-red-200 text-red-900 border border-red-300"
                    : "bg-white/25 text-white border border-white/30"
                }`}>
                  Inovasi Telkomsel: Pemerataan Pendidikan Digital
                </span>
                <span className={`text-xs font-bold ${liteMode ? "text-red-700" : "text-amber-200"}`}>
                  Payload &lt; 500 KB
                </span>
              </div>

              <h3 className={`text-xl sm:text-2xl font-black font-display ${
                liteMode ? "text-slate-900" : "text-white"
              }`}>
                Mode Hemat Data: Telkomsel Lite untuk Anak se-Nusantara 🇮🇩
              </h3>

              <p className={`text-xs sm:text-sm font-medium mt-1.5 max-w-2xl leading-relaxed ${
                liteMode ? "text-slate-700" : "text-red-100"
              }`}>
                Dirancang khusus untuk siswa SD di pelosok dan daerah 3T dengan keterbatasan kuota atau sinyal internet. Seluruh simulasi, suara sintesis, dan manipulatif matematika berjalan 100% di browser tanpa download aset video yang berat.
              </p>

              {/* Badges checklist */}
              <div className="flex flex-wrap items-center gap-3 mt-4 text-xs font-bold">
                <span className={`flex items-center gap-1 ${liteMode ? "text-slate-800" : "text-white"}`}>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Zero Server Crash
                </span>
                <span className={`flex items-center gap-1 ${liteMode ? "text-slate-800" : "text-white"}`}>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Hemat Kuota Maksimal
                </span>
                <span className={`flex items-center gap-1 ${liteMode ? "text-slate-800" : "text-white"}`}>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Aman Tanpa Iklan
                </span>
              </div>
            </div>
          </div>

          {/* Toggle Switch Card */}
          <div className="flex flex-col items-center flex-shrink-0 w-full md:w-auto">
            <button
              onClick={handleToggle}
              className={`w-full md:w-auto px-6 py-3.5 rounded-2xl font-black text-sm sm:text-base border-2 btn-chunky flex items-center justify-center gap-2 shadow-md ${
                liteMode
                  ? "bg-red-600 text-white border-red-700 hover:bg-red-700 shadow-[0_4px_0_0_#7f1d1d]"
                  : "bg-white text-red-700 border-white hover:bg-amber-50 shadow-[0_4px_0_0_#b91c1c]"
              }`}
            >
              {liteMode ? (
                <>
                  <Wifi className="w-5 h-5" />
                  <span>Kembali ke Mode Normal</span>
                </>
              ) : (
                <>
                  <Zap className="w-5 h-5 fill-red-600 text-red-600" />
                  <span>Aktifkan Mode Telkomsel Lite</span>
                </>
              )}
            </button>
            <span className={`text-[11px] font-semibold mt-2 ${
              liteMode ? "text-red-700" : "text-red-200"
            }`}>
              {liteMode ? "⚡ Mode Ringan Aktif" : "Klik untuk mencoba performa super ringan"}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
