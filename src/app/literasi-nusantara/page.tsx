"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import confetti from "canvas-confetti";
import {
  ArrowLeft,
  Volume2,
  CheckCircle2,
  Shuffle,
  ChevronLeft,
  ChevronRight,
  Star,
  Utensils,
  Landmark,
  Sparkles
} from "lucide-react";
import { sound } from "@/lib/sound";
import { DATA_LITERASI_NUSANTARA, SoalNusantara } from "@/data/literasiNusantaraData";
import { getStudentProfile, saveStudentProfile, StudentProfile, DEFAULT_PROFILE } from "@/lib/storage";

const ISLAND_LABELS: Record<string, string> = {
  all: "Semua Wilayah",
  Jawa: "Pulau Jawa",
  Sumatra: "Pulau Sumatra",
  Kalimantan: "Pulau Kalimantan",
  Sulawesi: "Pulau Sulawesi",
  BaliNusa: "Bali & Nusa Tenggara",
  MalukuPapua: "Maluku & Papua",
};

export default function LiterasiNusantaraPage() {
  const [profile, setProfile] = useState<StudentProfile>(DEFAULT_PROFILE);
  const [mounted, setMounted] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<"all" | "makanan" | "ikon">("all");
  const [selectedIsland, setSelectedIsland] = useState<string>("all");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [solvedIds, setSolvedIds] = useState<string[]>([]);
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    const stored = getStudentProfile();
    setProfile(stored);
    sound.setSpeechEnabled(stored.audioEnabled);
    setMounted(true);
  }, []);

  const handleEarnStars = (amount: number) => {
    const updated = saveStudentProfile({ stars: profile.stars + amount });
    setProfile(updated);
  };

  const makananCount = useMemo(
    () => DATA_LITERASI_NUSANTARA.filter((d) => d.category === "makanan").length,
    []
  );
  const ikonCount = useMemo(
    () => DATA_LITERASI_NUSANTARA.filter((d) => d.category === "ikon").length,
    []
  );

  // Filter bank soal
  const filteredQuestions = useMemo(() => {
    return DATA_LITERASI_NUSANTARA.filter((item) => {
      const matchCat = selectedCategory === "all" || item.category === selectedCategory;
      const matchIsland = selectedIsland === "all" || item.island === selectedIsland;
      return matchCat && matchIsland;
    });
  }, [selectedCategory, selectedIsland]);

  const currentSoal: SoalNusantara =
    filteredQuestions[currentIndex] || filteredQuestions[0] || DATA_LITERASI_NUSANTARA[0];

  const isSolved = solvedIds.includes(currentSoal.id);

  // Narasi suara Tobi (Zero-Spoiler)
  const handleSpeakQuestion = () => {
    sound.playChime();
    if (!profile.audioEnabled) return;

    sound.stopSpeaking();
    setIsSpeaking(true);

    let script = "";
    if (selectedAnswer && isCorrect) {
      script = `Jawabanmu benar! ${currentSoal.title} berasal dari ${currentSoal.correctAnswer}, Provinsi ${currentSoal.province}. Fakta serunya: ${currentSoal.funFact}`;
    } else if (selectedAnswer && isCorrect === false) {
      script = `Hampir tepat! Petunjuk dari Tobi: ${currentSoal.hint}. Coba tebak sekali lagi!`;
    } else {
      script = `Misi Detektif Daerah Cilik! Perhatikan foto ${currentSoal.title}. Dari daerah manakah ${
        currentSoal.category === "makanan" ? "makanan khas" : "ikon budaya"
      } ini berasal?`;
    }

    sound.speak(
      script,
      () => setIsSpeaking(true),
      () => setIsSpeaking(false)
    );
  };

  const handleSelectOption = (option: string) => {
    setSelectedAnswer(option);

    if (option === currentSoal.correctAnswer) {
      setIsCorrect(true);
      sound.playCelebration();

      if (!isSolved) {
        handleEarnStars(40);
        setSolvedIds((prev) => [...prev, currentSoal.id]);
      }

      if (!profile.liteMode) {
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.6 },
        });
      }

      if (profile.audioEnabled) {
        sound.speak(
          `Luar biasa, tebakanmu tepat sekali! ${currentSoal.title} berasal dari ${currentSoal.correctAnswer}, ${currentSoal.province}. ${currentSoal.funFact}`,
          () => setIsSpeaking(true),
          () => setIsSpeaking(false)
        );
      }
    } else {
      setIsCorrect(false);
      sound.playSocraticHint();

      if (profile.audioEnabled) {
        sound.speak(
          `Hampir tepat! Petunjuk Tobi: ${currentSoal.hint}. Ayo coba lagi!`,
          () => setIsSpeaking(true),
          () => setIsSpeaking(false)
        );
      }
    }
  };

  const handleNext = () => {
    sound.stopSpeaking();
    setIsSpeaking(false);
    sound.playChime();
    setSelectedAnswer(null);
    setIsCorrect(null);
    setCurrentIndex((prev) => (prev + 1) % filteredQuestions.length);
  };

  const handlePrev = () => {
    sound.stopSpeaking();
    setIsSpeaking(false);
    sound.playChime();
    setSelectedAnswer(null);
    setIsCorrect(null);
    setCurrentIndex((prev) => (prev - 1 + filteredQuestions.length) % filteredQuestions.length);
  };

  const handleShuffle = () => {
    sound.stopSpeaking();
    setIsSpeaking(false);
    sound.playChime();
    setSelectedAnswer(null);
    setIsCorrect(null);
    if (filteredQuestions.length <= 1) return;
    let nextIdx = Math.floor(Math.random() * filteredQuestions.length);
    if (nextIdx === currentIndex) {
      nextIdx = (nextIdx + 1) % filteredQuestions.length;
    }
    setCurrentIndex(nextIdx);
  };

  const handleChangeCategory = (cat: "all" | "makanan" | "ikon") => {
    sound.playChime();
    sound.stopSpeaking();
    setIsSpeaking(false);
    setSelectedCategory(cat);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setIsCorrect(null);
  };

  const handleChangeIsland = (isl: string) => {
    sound.playChime();
    sound.stopSpeaking();
    setIsSpeaking(false);
    setSelectedIsland(isl);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setIsCorrect(null);
  };

  if (!mounted) return null;

  return (
    <div className={`min-h-screen w-full bg-purple-50/40 text-slate-800 flex flex-col select-none overflow-x-hidden ${profile.liteMode ? "lite-high-contrast" : ""}`}>
      {/* Container Utama Layar Penuh Edge-to-Edge */}
      <div className="w-full max-w-3xl lg:max-w-5xl mx-auto flex-1 flex flex-col bg-white rounded-none sm:rounded-3xl border-0 sm:border-4 border-purple-400 sm:shadow-xl my-0 sm:my-3 lg:my-5">
        
        {/* 1. Header Bar Game */}
        <header className="px-3.5 py-2.5 sm:px-5 sm:py-3 bg-purple-50/90 border-b-2 border-purple-100 flex items-center justify-between gap-2 shrink-0">
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/"
              onClick={() => sound.stopSpeaking()}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-800 font-black text-xs sm:text-sm border-2 border-slate-300 shadow-[0_2px_0_0_#cbd5e1] btn-chunky"
              title="Kembali ke Beranda"
            >
              <ArrowLeft className="w-4 h-4 text-purple-700" />
              <span className="hidden sm:inline">Beranda</span>
            </Link>
            <div>
              <h1 className="text-sm sm:text-lg font-black font-display text-slate-900 tracking-tight leading-tight">
                Literasi Nusantara
              </h1>
              <span className="text-[10px] sm:text-xs font-bold text-purple-700 block leading-none">
                Detektif Daerah Cilik
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className="flex items-center gap-1 bg-amber-100 px-2 sm:px-2.5 py-1 rounded-xl border border-amber-300 text-amber-900 font-black text-xs">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span>{profile.stars}</span>
            </div>
            <button
              onClick={handleSpeakQuestion}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-black border-2 transition-all btn-chunky ${
                isSpeaking
                  ? "bg-rose-500 text-white border-rose-600 animate-pulse"
                  : "bg-purple-600 hover:bg-purple-700 text-white border-purple-700 shadow-[0_2px_0_0_#581c87]"
              }`}
              title="Dengarkan Suara Tobi"
            >
              <Volume2 className="w-3.5 h-3.5 text-yellow-300" />
              <span className="hidden sm:inline">{isSpeaking ? "Membacakan..." : "Dengarkan Tobi"}</span>
            </button>
          </div>
        </header>

        {/* 2. Filter Bar Ringkas (1 Baris Rapi) */}
        <div className="px-3 py-1.5 sm:px-5 sm:py-2 bg-slate-50 border-b border-purple-100 flex items-center justify-between gap-2 text-xs shrink-0">
          <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
            <button
              onClick={() => handleChangeCategory("all")}
              className={`px-2 sm:px-2.5 py-1 rounded-lg font-black text-[11px] sm:text-xs transition-all ${
                selectedCategory === "all" ? "bg-purple-600 text-white shadow-sm" : "bg-white text-slate-700 border border-slate-200"
              }`}
            >
              Semua ({DATA_LITERASI_NUSANTARA.length})
            </button>
            <button
              onClick={() => handleChangeCategory("makanan")}
              className={`px-2 sm:px-2.5 py-1 rounded-lg font-black text-[11px] sm:text-xs transition-all ${
                selectedCategory === "makanan" ? "bg-purple-600 text-white shadow-sm" : "bg-white text-slate-700 border border-slate-200"
              }`}
            >
              Makanan ({makananCount})
            </button>
            <button
              onClick={() => handleChangeCategory("ikon")}
              className={`px-2 sm:px-2.5 py-1 rounded-lg font-black text-[11px] sm:text-xs transition-all ${
                selectedCategory === "ikon" ? "bg-purple-600 text-white shadow-sm" : "bg-white text-slate-700 border border-slate-200"
              }`}
            >
              Ikon ({ikonCount})
            </button>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <select
              value={selectedIsland}
              onChange={(e) => handleChangeIsland(e.target.value)}
              className="bg-white text-purple-900 font-extrabold text-[11px] sm:text-xs px-2 py-1 rounded-lg border border-purple-200 focus:outline-none cursor-pointer"
            >
              <option value="all">Semua Wilayah</option>
              <option value="Jawa">Pulau Jawa</option>
              <option value="Sumatra">Pulau Sumatra</option>
              <option value="Kalimantan">Pulau Kalimantan</option>
              <option value="Sulawesi">Pulau Sulawesi</option>
              <option value="BaliNusa">Bali & Nusa Tenggara</option>
              <option value="MalukuPapua">Maluku & Papua</option>
            </select>
          </div>
        </div>

        {/* 3. Panggung Foto & Pilihan Ganda (Adaptif: Vertikal di Mobile/Tablet, Berdampingan di Desktop) */}
        <main className="p-3 sm:p-5 lg:p-6 flex-1 flex flex-col justify-center overflow-y-auto">
          <div className="w-full max-w-md sm:max-w-xl lg:max-w-4xl mx-auto lg:grid lg:grid-cols-12 lg:gap-8 lg:items-center">
            {/* SISI KIRI (Mobile: Atas, Desktop: Kolom Kiri 5-span) */}
            <div className="lg:col-span-5 flex flex-col items-center text-center space-y-2 lg:space-y-3">
              {/* Foto Objek */}
              <div className="relative w-36 h-28 sm:w-52 sm:h-40 lg:w-64 lg:h-48 shrink-0 rounded-2xl sm:rounded-3xl bg-gradient-to-b from-purple-50/70 to-slate-50 border-2 border-purple-200 shadow-inner flex items-center justify-center p-2.5 sm:p-3 overflow-hidden mx-auto">
                <img
                  src={`/images/nusantara/${currentSoal.id}.webp`}
                  alt={currentSoal.title}
                  loading="eager"
                  className="w-full h-full object-contain filter drop-shadow select-none hover:scale-105 transition-transform"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.style.display = "none";
                    const fb = target.nextElementSibling as HTMLElement;
                    if (fb) fb.style.display = "flex";
                  }}
                  onLoad={(e) => {
                    const target = e.currentTarget;
                    target.style.display = "block";
                    const fb = target.nextElementSibling as HTMLElement;
                    if (fb) fb.style.display = "none";
                  }}
                />
                <div
                  style={{ display: "none" }}
                  className="w-full h-full flex-col items-center justify-center text-center p-2 text-purple-400 bg-purple-50/50 rounded-xl"
                >
                  {currentSoal.category === "makanan" ? (
                    <Utensils className="w-8 h-8 mb-1 opacity-60 text-purple-500" />
                  ) : (
                    <Landmark className="w-8 h-8 mb-1 opacity-60 text-purple-500" />
                  )}
                  <span className="text-[10px] font-extrabold text-purple-700">Foto Segera Hadir</span>
                </div>
              </div>

              {/* Nama Objek */}
              <div>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-black font-display text-slate-900 tracking-tight text-center leading-tight">
                  {currentSoal.title}
                </h2>

                {/* Badge Kategori & Wilayah (Desktop) */}
                <div className="hidden lg:flex items-center justify-center gap-2 mt-2">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-purple-100 text-purple-900 border border-purple-200">
                    {currentSoal.category === "makanan" ? "Makanan Khas" : "Ikon Budaya"}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200">
                    {currentSoal.island}
                  </span>
                </div>

                {/* Pertanyaan Singkat (Mobile / Tablet) */}
                <p className="lg:hidden text-xs sm:text-sm font-bold text-purple-900 bg-purple-50/90 py-1 px-3 sm:px-4 rounded-xl border border-purple-200 text-center inline-block mt-1 leading-tight">
                  {currentSoal.category === "makanan"
                    ? "Dari daerah manakah makanan khas ini berasal?"
                    : "Dari daerah manakah ikon budaya ini berasal?"}
                </p>
              </div>
            </div>

            {/* SISI KANAN (Mobile: Bawah, Desktop: Kolom Kanan 7-span) */}
            <div className="lg:col-span-7 flex flex-col justify-center space-y-2.5 sm:space-y-3.5 mt-2 lg:mt-0 w-full">
              {/* Banner Pertanyaan Khusus Layar Desktop / Laptop */}
              <div className="hidden lg:block bg-gradient-to-r from-purple-50 to-indigo-50/60 p-3.5 rounded-2xl border-2 border-purple-200 text-left">
                <span className="text-[11px] font-black uppercase text-purple-700 tracking-wider block mb-0.5">
                  Misi Detektif Daerah:
                </span>
                <p className="text-base font-extrabold text-slate-900">
                  {currentSoal.category === "makanan"
                    ? "Tebak, dari daerah manakah makanan khas pada foto di samping berasal?"
                    : "Tebak, dari daerah manakah ikon budaya pada foto di samping berasal?"}
                </p>
              </div>

              {/* Grid Pilihan Ganda 2x2 */}
              <div className="w-full grid grid-cols-2 gap-2 sm:gap-2.5 lg:gap-3">
                {currentSoal.options.map((opt, idx) => {
                  const letter = ["A", "B", "C", "D"][idx];
                  const isSelected = selectedAnswer === opt;
                  const isThisCorrect = isCorrect && isSelected;
                  const isThisWrong = isCorrect === false && isSelected;

                  let btnStyle = "bg-white border-purple-200 text-slate-800 hover:bg-purple-50 shadow-[0_2px_0_0_#e9d5ff]";
                  let badgeStyle = "bg-purple-100 text-purple-900 border-purple-300";

                  if (isThisCorrect) {
                    btnStyle = "bg-emerald-500 border-emerald-600 text-white shadow-[0_2px_0_0_#065f46]";
                    badgeStyle = "bg-emerald-600 text-white border-emerald-400";
                  } else if (isThisWrong) {
                    btnStyle = "bg-rose-500 border-rose-600 text-white shadow-[0_2px_0_0_#9f1239]";
                    badgeStyle = "bg-rose-600 text-white border-rose-400";
                  }

                  return (
                    <button
                      key={opt}
                      onClick={() => handleSelectOption(opt)}
                      className={`p-2.5 sm:p-3.5 lg:p-4 rounded-2xl border-2 font-black text-xs sm:text-sm lg:text-base flex items-center justify-between transition-all btn-chunky text-left ${btnStyle}`}
                    >
                      <div className="flex items-center gap-2 overflow-hidden">
                        <span className={`w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 rounded-lg border flex items-center justify-center font-black text-xs lg:text-sm shrink-0 ${badgeStyle}`}>
                          {letter}
                        </span>
                        <span className="font-display tracking-wide truncate">{opt}</span>
                      </div>
                      {isThisCorrect && <CheckCircle2 className="w-4 h-4 lg:w-5 lg:h-5 text-white shrink-0 ml-1" />}
                    </button>
                  );
                })}
              </div>

              {/* Fakta Edukasi di Akhir (Muncul Setelah Menjawab) */}
              {selectedAnswer ? (
                <div className={`p-2.5 sm:p-3 rounded-2xl border text-xs sm:text-sm font-medium flex items-center justify-between gap-2 shrink-0 ${
                  isCorrect ? "bg-emerald-50 border-emerald-300 text-emerald-950" : "bg-amber-50 border-amber-300 text-amber-950"
                }`}>
                  <div className="flex items-center gap-2 overflow-hidden">
                    <Sparkles className="w-4 h-4 lg:w-5 lg:h-5 shrink-0 text-amber-600" />
                    <div className="truncate">
                      <span className="font-black mr-1.5">
                        {isCorrect ? `Tepat! Asal: ${currentSoal.correctAnswer} (${currentSoal.province})` : "Hampir Tepat!"}
                      </span>
                      <span className="text-[11px] sm:text-xs opacity-90 hidden sm:inline">
                        {isCorrect ? currentSoal.funFact : `Petunjuk Tobi: ${currentSoal.hint}`}
                      </span>
                    </div>
                  </div>
                  {isCorrect && (
                    <button
                      onClick={handleNext}
                      className="shrink-0 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs lg:text-sm flex items-center gap-1 shadow-sm btn-chunky"
                    >
                      <span>Lanjut</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ) : (
                <div className="h-9 lg:h-10 shrink-0 flex items-center justify-center text-[11px] sm:text-xs font-bold text-slate-400">
                  Pilih salah satu jawaban di atas untuk melihat fakta edukasi
                </div>
              )}
            </div>
          </div>
        </main>

        {/* 6. Footer Navigasi */}
        <footer className="px-3.5 py-2 sm:px-5 sm:py-2.5 bg-purple-50/80 border-t border-purple-100 flex items-center justify-between gap-2 shrink-0">
          <button
            onClick={handlePrev}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-800 font-extrabold text-xs border border-slate-300 shadow-[0_2px_0_0_#cbd5e1] btn-chunky"
            title="Soal Sebelumnya"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Sebelumnya</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShuffle}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-purple-100 hover:bg-purple-200 text-purple-900 font-extrabold text-xs border border-purple-300 btn-chunky"
              title="Acak Soal"
            >
              <Shuffle className="w-3.5 h-3.5" />
              <span>Acak</span>
            </button>
            <span className="text-[11px] sm:text-xs font-black text-purple-900 bg-white px-2 py-1 rounded-lg border border-purple-200">
              {currentIndex + 1} / {filteredQuestions.length}
            </span>
          </div>

          <button
            onClick={handleNext}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs border border-purple-700 shadow-[0_2px_0_0_#581c87] btn-chunky"
            title="Soal Berikutnya"
          >
            <span className="hidden sm:inline">Berikutnya</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </footer>

      </div>
    </div>
  );
}
