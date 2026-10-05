"use client";

import React, { useState } from "react";
import { X, Check, Star, Award } from "lucide-react";
import { 
  StudentProfile, 
  AVAILABLE_AVATARS, 
  AVAILABLE_BADGES 
} from "@/lib/storage";
import { sound } from "@/lib/sound";

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

  if (!isOpen) return null;

  const handleSave = () => {
    sound.playChime();
    onUpdateProfile({
      name: name.trim() || "Budi Petualang",
      grade,
      avatar: selectedAvatar,
    });
    sound.speak(`Profil berhasil disimpan! Semangat belajar, ${name || "sahabat cilik"}!`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-lg bg-white rounded-3xl border-4 border-purple-400 shadow-2xl p-6 sm:p-7 overflow-hidden my-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-purple-100 mb-5">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{selectedAvatar}</span>
            <h3 className="text-xl font-black font-display text-slate-800">
              Profil Petualang Cilik
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 btn-chunky"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Avatar Selection */}
        <div className="mb-5">
          <label className="block text-xs font-black text-slate-600 uppercase tracking-wider mb-2">
            Pilih Karakter Favoritmu:
          </label>
          <div className="grid grid-cols-6 gap-2">
            {AVAILABLE_AVATARS.map((av) => (
              <button
                key={av.id}
                onClick={() => {
                  setSelectedAvatar(av.emoji);
                  sound.playChime();
                }}
                className={`w-full aspect-square text-2xl flex items-center justify-center rounded-2xl border-3 btn-chunky transition-transform ${
                  selectedAvatar === av.emoji
                    ? "bg-purple-100 border-purple-500 scale-105 shadow-[0_3px_0_0_#7e22ce]"
                    : "bg-slate-50 border-slate-200 hover:bg-purple-50"
                }`}
                title={av.label}
              >
                {av.emoji}
              </button>
            ))}
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
              Lencana Koleksi ({profile.badges.length}/{AVAILABLE_BADGES.length})
            </span>
            <span className="text-xs font-bold text-amber-600 flex items-center gap-1">
              <Star className="w-3 h-3 fill-amber-500" />
              {profile.stars} Bintang
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {AVAILABLE_BADGES.map((b) => {
              const isUnlocked = profile.badges.includes(b.id);
              return (
                <div
                  key={b.id}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-bold border ${
                    isUnlocked
                      ? b.color
                      : "bg-slate-100 text-slate-400 border-slate-200 opacity-60"
                  }`}
                  title={b.desc}
                >
                  <span>{b.icon}</span>
                  <span>{b.title}</span>
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
