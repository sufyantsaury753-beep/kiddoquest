"use client";

import React from "react";
import { 
  Star, 
  Award, 
  Shield, 
  Trophy, 
  ArrowUpRight,
  FlaskConical,
  Scale,
  Orbit,
  Landmark,
  Music,
  GraduationCap,
  Check,
  Lock
} from "lucide-react";
import { StudentProfile, AVAILABLE_BADGES, isBadgeUnlocked } from "@/lib/storage";

function RenderBadgeIcon({ type, className = "w-6 h-6 text-white" }: { type: string; className?: string }) {
  switch (type) {
    case "science":
      return <FlaskConical className={className} />;
    case "math":
      return <Scale className={className} />;
    case "solar":
      return <Orbit className={className} />;
    case "culture":
      return <Landmark className={className} />;
    case "music":
      return <Music className={className} />;
    case "exam":
      return <GraduationCap className={className} />;
    default:
      return <Award className={className} />;
  }
}

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
                  <span>Menuju Level {currentLevel + 1} ({starsInCurrentLevel}/50 Bintang)</span>
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
              {AVAILABLE_BADGES.filter((b) => isBadgeUnlocked(profile.badges, b)).length} dari {AVAILABLE_BADGES.length} Terkumpul
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {AVAILABLE_BADGES.map((b) => {
              const isUnlocked = isBadgeUnlocked(profile.badges, b);
              return (
                <div
                  key={b.id}
                  className={`p-3.5 rounded-2xl border-2 flex flex-col items-center justify-between text-center transition-all ${
                    isUnlocked
                      ? `${b.color} shadow-sm hover:scale-105 hover:shadow-md cursor-pointer`
                      : "bg-slate-50 border-slate-200 text-slate-400 opacity-60"
                  }`}
                  title={`${b.title} (${b.zoneTitle}): ${b.desc}`}
                >
                  {/* Badge Icon Medallion */}
                  <div className="relative mb-2">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-md transition-transform ${
                        isUnlocked
                          ? `bg-gradient-to-br ${b.badgeBg} border-2 border-white/60`
                          : "bg-slate-200 border-2 border-slate-300"
                      }`}
                    >
                      <RenderBadgeIcon
                        type={b.iconType}
                        className={`w-6 h-6 ${isUnlocked ? "text-white drop-shadow-sm" : "text-slate-400"}`}
                      />
                    </div>
                    {isUnlocked && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-xs">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                    )}
                  </div>

                  {/* Title & Zone */}
                  <div className="w-full">
                    <h5 className="font-black text-xs leading-tight font-display text-center mb-0.5">
                      {b.title}
                    </h5>
                    <span className="text-[10px] font-bold opacity-80 block truncate">
                      {b.zoneTitle}
                    </span>
                  </div>

                  {/* Status Pill */}
                  <div className="mt-2 w-full">
                    {isUnlocked ? (
                      <span className="inline-flex items-center gap-1 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/80 border border-current shadow-2xs">
                        Terbuka
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-400 border border-slate-300">
                        <Lock className="w-2.5 h-2.5" />
                        Terkunci
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
