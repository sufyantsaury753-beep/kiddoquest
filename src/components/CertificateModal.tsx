"use client";

import React, { useState } from "react";
import { X, Printer, Award, Star, CheckCircle, Bot } from "lucide-react";
import { StudentProfile } from "@/lib/storage";
import { sound } from "@/lib/sound";

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: StudentProfile;
  onUpdateProfile: (data: Partial<StudentProfile>) => void;
}

export default function CertificateModal({
  isOpen,
  onClose,
  profile,
  onUpdateProfile,
}: CertificateModalProps) {
  const [customName, setCustomName] = useState(profile.name);
  const [customGrade, setCustomGrade] = useState(profile.grade);
  const [isEditing, setIsEditing] = useState(false);

  if (!isOpen) return null;

  const handlePrint = () => {
    sound.playCelebration();
    window.print();
  };

  const handleSaveEdits = () => {
    onUpdateProfile({ name: customName, grade: customGrade });
    setIsEditing(false);
    sound.playChime();
  };

  const todayStr = new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/70 backdrop-blur-sm overflow-y-auto">
      {/* Modal Container */}
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden my-auto border-4 border-amber-300">
        {/* Top Controls (Hidden in print) */}
        <div className="no-print bg-amber-500 text-amber-950 p-4 flex flex-wrap items-center justify-between gap-3 border-b-2 border-amber-600">
          <div className="flex items-center gap-2">
            <Award className="w-6 h-6 text-yellow-100" />
            <h3 className="text-lg font-black font-display text-white">
              Piagam Penghargaan Resmi TobiQuest
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-3 py-1.5 rounded-xl bg-amber-100 hover:bg-white text-amber-900 font-bold text-xs border border-amber-400 btn-chunky"
            >
              {isEditing ? "Batal Edit" : "✏️ Ganti Nama / Kelas"}
            </button>

            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm border-2 border-emerald-700 shadow-[0_2px_0_0_#064e3b] btn-chunky"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak / Simpan PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white border border-amber-700 btn-chunky"
              title="Tutup"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Quick Edit Bar */}
        {isEditing && (
          <div className="no-print p-4 bg-amber-50 border-b border-amber-200 flex flex-wrap items-center gap-3">
            <div className="flex-1 min-w-[180px]">
              <label className="block text-xs font-bold text-slate-700 mb-1">Nama Siswa:</label>
              <input
                type="text"
                maxLength={35}
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                className="w-full px-3 py-1.5 rounded-xl border border-amber-300 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
            <div className="w-40">
              <label className="block text-xs font-bold text-slate-700 mb-1">Kelas SD:</label>
              <input
                type="text"
                maxLength={25}
                value={customGrade}
                onChange={(e) => setCustomGrade(e.target.value)}
                className="w-full px-3 py-1.5 rounded-xl border border-amber-300 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
            <button
              onClick={handleSaveEdits}
              className="self-end px-4 py-2 rounded-xl bg-emerald-500 text-white font-black text-xs border border-emerald-600 btn-chunky"
            >
              Simpan Perubahan
            </button>
          </div>
        )}

        {/* THE CERTIFICATE (Ready for Screen and Print) */}
        <div 
          id="printable-certificate"
          className="certificate-container p-6 sm:p-10 md:p-12 bg-[#fffdfa] relative text-center"
        >
          {/* Ornate Double Border */}
          <div 
            id="printable-certificate-inner"
            className="border-4 sm:border-8 border-amber-500 rounded-3xl p-5 sm:p-8 md:p-10 relative bg-radial from-amber-50/50 to-white"
          >
            {/* Corner Decorative Ornaments */}
            <div className="absolute top-2 left-2 text-amber-500 text-xl select-none">✦</div>
            <div className="absolute top-2 right-2 text-amber-500 text-xl select-none">✦</div>
            <div className="absolute bottom-2 left-2 text-amber-500 text-xl select-none">✦</div>
            <div className="absolute bottom-2 right-2 text-amber-500 text-xl select-none">✦</div>

            {/* Header Logos */}
            <div className="flex items-center justify-between border-b-2 border-amber-300 pb-3 mb-3 w-full">
              <div className="text-left">
                <span className="text-xs print:text-xs font-extrabold text-red-600 tracking-wider uppercase block">
                  Telkomsel Indonesia
                </span>
                <span className="text-[10px] print:text-[10px] text-slate-500 font-bold block">
                  M-ONE Coding Competition 2026
                </span>
              </div>

              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 border border-amber-400 text-amber-900 text-xs print:text-xs font-black">
                <Award className="w-3.5 h-3.5 print:w-4 print:h-4 text-amber-600" />
                <span>TobiQuest EdTech</span>
              </div>

              <div className="text-right">
                <span className="text-xs print:text-xs font-extrabold text-sky-700 tracking-wider uppercase block">
                  Kurikulum Merdeka SD
                </span>
                <span className="text-[10px] print:text-[10px] text-slate-500 font-bold block">
                  Joyful & Socratic Learning
                </span>
              </div>
            </div>

            {/* Certificate Title */}
            <div className="my-2 sm:my-3">
              <h1 className="text-3xl sm:text-4xl md:text-5xl print:text-4xl font-black font-display tracking-tight text-amber-900 uppercase">
                Piagam Penghargaan
              </h1>
              <p className="text-xs sm:text-sm print:text-xs font-bold tracking-widest text-amber-700 uppercase mt-0.5">
                Bintang Prestasi Penjelajah Cilik
              </p>
            </div>

            {/* Recipient */}
            <p className="text-xs sm:text-sm print:text-xs text-slate-600 font-medium italic mt-2">
              Dengan penuh kebanggaan dan apresiasi dianugerahkan kepada:
            </p>

            <div className="my-3 sm:my-4">
              <span className="inline-block text-3xl sm:text-4xl md:text-5xl print:text-4xl font-extrabold text-slate-900 border-b-4 border-amber-400 pb-1 px-6 font-display">
                {profile.name}
              </span>
              <p className="text-xs sm:text-sm print:text-xs font-bold text-sky-700 mt-1">
                {profile.grade}
              </p>
            </div>

            {/* Citation */}
            <p className="max-w-2xl mx-auto text-xs sm:text-sm print:text-sm print:leading-normal text-slate-700 leading-relaxed font-medium">
              Atas semangat belajar, rasa ingin tahu yang tinggi, dan keberhasilan luar biasa dalam menuntaskan misi eksplorasi di <strong>Lab Sains</strong>, <strong>Hitung Ceria</strong>, <strong>Tata Surya</strong>, <strong>Literasi Nusantara</strong>, <strong>Lagu Nasional</strong>, serta <strong>Evaluasi SD</strong>.
            </p>

            {/* Star Honor Badge */}
            <div className="inline-flex items-center gap-2 my-3 sm:my-4 px-5 py-2 rounded-2xl bg-amber-100 border-2 border-amber-400 text-amber-950 font-black text-sm sm:text-base print:text-sm shadow-sm w-fit mx-auto self-center">
              <Star className="w-4 h-4 print:w-4 print:h-4 fill-amber-500 text-amber-500" />
              <span>Pencapaian: {profile.stars} Bintang Kehormatan</span>
              <Star className="w-4 h-4 print:w-4 print:h-4 fill-amber-500 text-amber-500" />
            </div>

            {/* Signatures & Seal Section */}
            <div className="grid grid-cols-3 items-end gap-4 mt-3 pt-3 border-t border-amber-200 w-full">
              {/* Left Signer: Mascot Tobi */}
              <div className="text-center flex flex-col items-center">
                <div className="w-8 h-8 print:w-9 print:h-9 rounded-full bg-sky-100 border border-sky-300 flex items-center justify-center text-sky-700 mb-1">
                  <Bot className="w-5 h-5 print:w-5 print:h-5 text-sky-600" />
                </div>
                <div className="font-display font-bold text-xs sm:text-sm print:text-xs text-slate-800">
                  Tobi si Robot
                </div>
                <p className="text-[10px] sm:text-xs print:text-[10px] text-slate-500 font-semibold">
                  Socratic Kids Mentor
                </p>
              </div>

              {/* Center Seal */}
              <div className="flex flex-col items-center justify-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 print:w-16 print:h-16 rounded-full border-4 border-amber-600 bg-gradient-to-br from-amber-400 to-yellow-500 flex flex-col items-center justify-center shadow-md text-amber-950">
                  <Award className="w-6 h-6 sm:w-8 sm:h-8 print:w-7 print:h-7" />
                  <span className="text-[8px] print:text-[7px] font-black uppercase tracking-tighter">RESMI</span>
                </div>
                <span className="text-[9px] print:text-[9px] text-amber-800 font-bold mt-1">
                  M-ONE Telkomsel
                </span>
              </div>

              {/* Right Signer: Competition Committee */}
              <div className="text-center">
                <p className="text-[10px] sm:text-xs print:text-[10px] text-slate-500 mb-1">
                  {todayStr}
                </p>
                <div className="font-display font-bold text-xs sm:text-sm print:text-xs text-slate-800">
                  Komite Juri M-ONE
                </div>
                <p className="text-[10px] sm:text-xs print:text-[10px] text-slate-500 font-semibold">
                  Innovating Education Tech
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
