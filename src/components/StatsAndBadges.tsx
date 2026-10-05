"use client";

import React from "react";
import { Star, Award, Shield, Trophy, ArrowUpRight } from "lucide-react";
import { StudentProfile, AVAILABLE_BADGES } from "@/lib/storage";

interface StatsAndBadgesProps {
  profile: StudentProfile;
  onOpenCertificate: () => void;
  liteMode: boolean;
}

export default function StatsAndBadges({
  profile,
  onOpenCertificate,
  liteMode,
}: StatsAndBadgesProps) {
  // Level progression calculation
  const currentStars = profile.stars;
  const currentLevel = Math.floor(currentStars / 50) + 1;
  const nextLevelStars = currentLevel * 50;
  const starsInCurrentLevel = currentStars % 50;
  const progressPercent = Math.min(100, Math.round((starsInCurrentLevel / 50) * 100));

  return (
    <section className="my-8">
      <div className="bg-white rounded-3xl border-4 border-amber-300 shadow-[0_8px_0_0_#f59e0b] p-6 sm:p-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b-2 border-amber-100">
          {/* Level and Star Progress */}
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-amber-400 to-yellow-500 border-3 border-amber-600 flex flex-col items-center justify-center text-amber-950 shadow-md flex-shrink-0">
              <Trophy className="w-8 h-8 fill-amber-900 text-amber-900" />
              <span className="text-[10px] font-black uppercase">Level {currentLevel}</span>
            </div>

            <div className="flex-1 min-w-[200px]">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-black uppercase tracking-wider text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full border border-amber-300">
                  Peringkat: Penjelajah Bintang SD
                </span>
                <span className="text-xs font-bold text-slate-500">
                  {currentStars} Bintang
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black font-display text-slate-800">
                Kemajuan Belajar {profile.name}
              </h3>

              {/* Progress bar */}
              <div className="mt-2.5">
                <div className="flex justify-between text-xs font-bold text-slate-600 mb-1">
                  <span>Level {currentLevel}</span>
                  <span>Menuju Level {currentLevel + 1} ({starsInCurrentLevel}/50 ⭐)</span>
                </div>
                <div className="w-full h-3.5 bg-amber-100 rounded-full overflow-hidden border border-amber-300">
                  <div
                    className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Certificate Action */}
          <button
            onClick={onOpenCertificate}
            className="w-full md:w-auto flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-black text-sm border-2 border-emerald-600 shadow-[0_4px_0_0_#065f46] btn-chunky flex-shrink-0"
          >
            <Award className="w-5 h-5" />
            <span>Lihat Piagam Penghargaan Resmi</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        {/* Badges Grid */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-base sm:text-lg font-black font-display text-slate-800 flex items-center gap-2">
              <Shield className="w-5 h-5 text-amber-500" />
              <span>Koleksi Lencana Prestasi Kurikulum Merdeka</span>
            </h4>
            <span className="text-xs font-bold text-slate-500">
              {profile.badges.length} dari {AVAILABLE_BADGES.length} Terkumpul
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {AVAILABLE_BADGES.map((b) => {
              const isUnlocked = profile.badges.includes(b.id);
              return (
                <div
                  key={b.id}
                  className={`p-3.5 rounded-2xl border-2 flex flex-col items-center text-center transition-transform ${
                    isUnlocked
                      ? `${b.color} shadow-sm`
                      : "bg-slate-50 border-slate-200 text-slate-400 opacity-60"
                  }`}
                >
                  <div className="text-3xl mb-1">{b.icon}</div>
                  <h5 className="font-black text-xs leading-tight mb-1 font-display">
                    {b.title}
                  </h5>
                  <p className="text-[10px] font-semibold leading-tight line-clamp-2">
                    {b.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
