"use client";

import React, { useState, useEffect } from "react";
import { 
  X, 
  Check, 
  Star, 
  Award,
  FlaskConical,
  Scale,
  Orbit,
  Landmark,
  Music,
  GraduationCap
} from "lucide-react";
import { 
  StudentProfile, 
  AVAILABLE_AVATARS, 
  AVAILABLE_BADGES,
  isBadgeUnlocked
} from "@/lib/storage";
import { sound } from "@/lib/sound";

function RenderBadgeIcon({ type, className = "w-3.5 h-3.5" }: { type: string; className?: string }) {
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

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: StudentProfile;
  onUpdateProfile: (data: Partial<StudentProfile>) => void;
}

const GRADES = [
  "Kelas 1 SD",
  "Kelas 2 SD",
  "Kelas 3 SD",
  "Kelas 4 SD",
  "Kelas 5 SD",
  "Kelas 6 SD",
];

export default function ProfileModal({
  isOpen,
  onClose,
  profile,
  onUpdateProfile,
}: ProfileModalProps) {
  const [name, setName] = useState(profile.name);
  const [grade, setGrade] = useState(profile.grade);
  const [selectedAvatar, setSelectedAvatar] = useState(profile.avatar);

  // Sync state whenever modal opens or profile changes
  useEffect(() => {
    setName(profile.name);
    setGrade(profile.grade);
    setSelectedAvatar(profile.avatar);
  }, [profile.name, profile.grade, profile.avatar, isOpen]);

  const activeChar = AVAILABLE_AVATARS.find((av) => av.emoji === selectedAvatar || av.id === selectedAvatar) || AVAILABLE_AVATARS[0];

  if (!isOpen) return null;

  const handleSave = () => {
    sound.playChime();
    onUpdateProfile({
      name: name.trim() || "Budi Petualang",
      grade,
      avatar: selectedAvatar,
    });
    sound.speak(`Profil berhasil disimpan! Semangat belajar bersama ${activeChar.name}, ${name || "sahabat cilik"}!`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white rounded-3xl border-4 border-purple-400 shadow-2xl p-5 sm:p-7 overflow-hidden my-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-3.5 border-b border-purple-100 mb-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl select-none">{activeChar.emoji}</span>
            <h3 className="text-xl font-black font-display text-slate-800">
              Profil Petualang Cilik
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 btn-chunky cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Pratinjau Karakter Terpilih ala Kahoot! Kids */}
        <div className={`flex items-center gap-3.5 p-3.5 sm:p-4 rounded-3xl ${activeChar.bgColor} border-2 ${activeChar.borderColor} mb-4 shadow-sm transition-all`}>
          <div className={`w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-white/90 border-2 ${activeChar.borderColor} shadow-sm flex items-center justify-center text-3xl sm:text-4xl flex-shrink-0`}>
            <span className="select-none">{activeChar.emoji}</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <h4 className="text-lg sm:text-xl font-black font-display text-slate-900 leading-tight">
                {activeChar.name}
              </h4>
              <span className={`text-[10px] sm:text-xs font-black px-2.5 py-0.5 rounded-full bg-white/95 ${activeChar.textColor} border ${activeChar.borderColor}`}>
                {activeChar.role}
              </span>
            </div>
            <p className="text-xs text-slate-600 font-medium">
              Karakter aktif untuk petualangan dan piagam prestasimu!
            </p>
          </div>
        </div>

        {/* Avatar Selection (20 Karakter Kahoot! Kids) */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <label className="block text-xs font-black text-slate-600 uppercase tracking-wider">
              Pilih Karakter Favoritmu ({AVAILABLE_AVATARS.length} Pilihan):
            </label>
            <span className="text-[10px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md border border-purple-200">
              Sentuh untuk Memilih
            </span>
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 max-h-56 sm:max-h-64 overflow-y-auto p-1.5 pr-2 rounded-2xl bg-slate-50/70 border border-slate-200">
            {AVAILABLE_AVATARS.map((av) => {
              const isSelected = selectedAvatar === av.emoji || selectedAvatar === av.id;
              return (
                <button
                  key={av.id}
                  type="button"
                  onClick={() => {
                    setSelectedAvatar(av.emoji);
                    sound.playChime();
                  }}
                  className={`group relative flex flex-col items-center p-2 rounded-2xl border-2 transition-all btn-chunky cursor-pointer ${
                    isSelected
                      ? `${av.bgColor} ${av.borderColor} ring-2 ring-purple-500 shadow-[0_3px_0_0_rgba(0,0,0,0.12)] scale-105 z-10`
                      : "bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                  }`}
                  title={`${av.name} (${av.role})`}
                >
                  {/* Lingkaran Avatar Bulat */}
                  <div
                    className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full ${av.bgColor} border-2 ${av.borderColor} flex items-center justify-center text-xl sm:text-2xl shadow-sm group-hover:scale-110 transition-transform`}
                  >
                    <span className="select-none leading-none">{av.emoji}</span>
                  </div>
                  {/* Nama Karakter */}
                  <span className="text-[11px] font-black text-slate-800 mt-1 truncate max-w-full leading-tight">
                    {av.name}
                  </span>
                  {/* Julukan Karakter */}
                  <span className="text-[9px] font-bold text-slate-500 truncate max-w-full leading-tight">
                    {av.role}
                  </span>

                  {/* Badge Centang Terpilih */}
                  {isSelected && (
                    <div className="absolute -top-1.5 -right-1.5 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-md">
                      <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 stroke-[3]" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Name input */}
        <div className="mb-4">
          <label className="block text-xs font-black text-slate-600 uppercase tracking-wider mb-1">
            Nama Panggilan / Nama Lengkap:
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Tulis namamu di sini..."
            className="w-full px-4 py-2.5 rounded-2xl border-2 border-slate-300 font-bold text-slate-800 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200 text-base"
          />
        </div>

        {/* Grade selection */}
        <div className="mb-5">
          <label className="block text-xs font-black text-slate-600 uppercase tracking-wider mb-1">
            Tingkat Kelas SD:
          </label>
          <div className="grid grid-cols-3 gap-2">
            {GRADES.map((g) => (
              <button
                key={g}
                onClick={() => {
                  setGrade(g);
                  sound.playChime();
                }}
                className={`py-2 px-2 rounded-xl text-xs font-bold border-2 btn-chunky ${
                  grade === g
                    ? "bg-purple-600 text-white border-purple-700 shadow-[0_2px_0_0_#581c87]"
                    : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        {/* Badges overview */}
        <div className="mb-6 pt-3 border-t border-slate-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-black text-slate-600 uppercase tracking-wider flex items-center gap-1">
              <Award className="w-3.5 h-3.5 text-purple-600" />
              Lencana Koleksi ({AVAILABLE_BADGES.filter((b) => isBadgeUnlocked(profile.badges, b)).length}/{AVAILABLE_BADGES.length})
            </span>
            <span className="text-xs font-bold text-amber-600 flex items-center gap-1">
              <Star className="w-3 h-3 fill-amber-500" />
              {profile.stars} Bintang
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {AVAILABLE_BADGES.map((b) => {
              const isUnlocked = isBadgeUnlocked(profile.badges, b);
              return (
                <div
                  key={b.id}
                  className={`flex items-center gap-2 p-2 rounded-xl text-xs font-bold border transition-all ${
                    isUnlocked
                      ? b.color
                      : "bg-slate-50 text-slate-400 border-slate-200 opacity-60"
                  }`}
                  title={`${b.title} (${b.zoneTitle}): ${b.desc}`}
                >
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                    isUnlocked ? `bg-gradient-to-br ${b.badgeBg} text-white` : "bg-slate-200 text-slate-400"
                  }`}>
                    <RenderBadgeIcon type={b.iconType} className="w-4 h-4" />
                  </div>
                  <div className="truncate">
                    <span className="block truncate font-black text-[11px] leading-tight">{b.title}</span>
                    <span className="block truncate text-[9px] opacity-80 leading-tight">{b.zoneTitle}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Submit */}
        <div className="flex items-center justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm btn-chunky"
          >
            Batal
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-black text-sm border-2 border-purple-700 shadow-[0_3px_0_0_#581c87] btn-chunky"
          >
            <Check className="w-4 h-4" />
            <span>Simpan Profil</span>
          </button>
        </div>
      </div>
    </div>
  );
}
