"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
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
  Compass,
  BookOpen,
  Lightbulb,
  Search,
} from "lucide-react";
import { sound } from "@/lib/sound";
import { DATA_LITERASI_NUSANTARA, SoalNusantara } from "@/data/literasiNusantaraData";
import { getStudentProfile, saveStudentProfile, StudentProfile, DEFAULT_PROFILE, unlockBadge } from "@/lib/storage";

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
    const stored = unlockBadge("literasi-nusantara");
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
    <div
      className={`min-h-[100dvh] w-full bg-gradient-to-br from-purple-50/70 via-slate-50 to-indigo-50/50 text-slate-800 flex flex-col font-sans select-none overflow-x-hidden ${
        profile.liteMode ? "lite-high-contrast" : ""
      }`}
    >
      {/* 1. Header Bar Game */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b-2 border-purple-200/80 px-3.5 py-2 sm:px-5 sm:py-2.5 shadow-sm">
        <div className="max-w-4xl lg:max-w-5xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/"
              onClick={() => sound.stopSpeaking()}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-black text-xs sm:text-sm border-2 border-slate-300 shadow-[0_2px_0_0_#cbd5e1] transition-all btn-chunky"
              title="Kembali ke Beranda"
            >
              <ArrowLeft className="w-4 h-4 text-purple-700" />
              <span className="hidden sm:inline">Beranda</span>
            </Link>

            <div className="h-5 w-px bg-purple-200" />

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
            <div className="flex items-center gap-1 bg-amber-100 px-2.5 py-1.5 rounded-xl border-2 border-amber-300 text-amber-950 font-black text-xs sm:text-sm shadow-sm">
              <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
              <span>{profile.stars}</span>
            </div>

            <button
              onClick={handleSpeakQuestion}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-black border-2 transition-all btn-chunky cursor-pointer ${
                isSpeaking
                  ? "bg-rose-500 text-white border-rose-600 animate-pulse"
                  : "bg-purple-600 hover:bg-purple-700 text-white border-purple-700 shadow-[0_2px_0_0_#581c87]"
              }`}
              title="Dengarkan Suara Tobi"
            >
              <Volume2 className="w-4 h-4 text-yellow-300" />
              <span className="hidden sm:inline">{isSpeaking ? "Membacakan..." : "Dengarkan Tobi"}</span>
            </button>
          </div>
        </div>
      </header>

      {/* 2. Filter Bar Kategori & Wilayah */}
      <div className="bg-white/80 border-b border-purple-100 px-3 py-2 sm:px-5 shadow-xs">
        <div className="max-w-4xl lg:max-w-5xl mx-auto flex flex-wrap items-center justify-between gap-2 text-xs">
          {/* Kapsul Tab Kategori */}
          <div className="flex items-center gap-1 sm:gap-1.5 shrink-0 overflow-x-auto no-scrollbar">
            <button
              onClick={() => handleChangeCategory("all")}
              className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl font-black text-[11px] sm:text-xs border transition-all btn-chunky cursor-pointer ${
                selectedCategory === "all"
                  ? "bg-purple-600 text-white border-purple-700 shadow-sm"
                  : "bg-white text-slate-700 border-slate-200 hover:bg-purple-50"
              }`}
            >
              Semua ({DATA_LITERASI_NUSANTARA.length})
            </button>
            <button
              onClick={() => handleChangeCategory("makanan")}
              className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl font-black text-[11px] sm:text-xs border transition-all btn-chunky cursor-pointer ${
                selectedCategory === "makanan"
                  ? "bg-purple-600 text-white border-purple-700 shadow-sm"
                  : "bg-white text-slate-700 border-slate-200 hover:bg-purple-50"
              }`}
            >
              Makanan ({makananCount})
            </button>
            <button
              onClick={() => handleChangeCategory("ikon")}
              className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl font-black text-[11px] sm:text-xs border transition-all btn-chunky cursor-pointer ${
                selectedCategory === "ikon"
                  ? "bg-purple-600 text-white border-purple-700 shadow-sm"
                  : "bg-white text-slate-700 border-slate-200 hover:bg-purple-50"
              }`}
            >
              Ikon ({ikonCount})
            </button>
          </div>

          {/* Dropdown Pulau */}
          <div className="flex items-center gap-1 shrink-0">
            <select
              value={selectedIsland}
              onChange={(e) => handleChangeIsland(e.target.value)}
              className="bg-white text-purple-900 font-extrabold text-[11px] sm:text-xs px-2.5 py-1 sm:py-1.5 rounded-xl border-2 border-purple-200 focus:outline-none cursor-pointer shadow-xs"
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
      </div>

      {/* 3. Main Stage: Panggung Kartu Budaya & Panel Kuis Detektif */}
      <main className="flex-1 max-w-4xl lg:max-w-5xl mx-auto w-full px-3 sm:px-6 py-4 sm:py-6 flex flex-col justify-center">
        <div className="w-full flex-1 flex flex-col lg:grid lg:grid-cols-12 gap-4 lg:gap-8 items-start my-auto">
          
          {/* 1. Panggung Kartu Budaya Nusantara (Hero Cultural Card) */}
          <div className="w-full lg:col-span-5 flex flex-col items-center">
            <div className="w-full max-w-sm sm:max-w-md lg:max-w-none bg-white rounded-3xl p-3.5 sm:p-5 border-2 border-purple-200/90 shadow-md flex flex-col items-center">
              
              {/* Badges Bar di Bagian Atas Kartu */}
              <div className="w-full flex items-center justify-between gap-2 mb-2 sm:mb-3">
                <span className="px-2.5 py-1 rounded-full text-[11px] sm:text-xs font-black bg-purple-100 text-purple-900 border border-purple-200 flex items-center gap-1.5">
                  {currentSoal.category === "makanan" ? (
                    <Utensils className="w-3.5 h-3.5 text-purple-700" />
                  ) : (
                    <Landmark className="w-3.5 h-3.5 text-purple-700" />
                  )}
                  <span>{currentSoal.category === "makanan" ? "Makanan Khas" : "Ikon Budaya"}</span>
                </span>

                <span className="px-2.5 py-1 rounded-full text-[11px] sm:text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200">
                  {ISLAND_LABELS[currentSoal.island] || currentSoal.island}
                </span>
              </div>

              {/* Wadah Foto Objek Budaya - Format Besar & Jelas (Aspect 4/3) */}
              <div className="relative w-full max-w-[280px] sm:max-w-[320px] lg:max-w-[360px] aspect-[4/3] rounded-2xl bg-gradient-to-b from-purple-50/70 to-slate-50 border-2 border-purple-200/80 shadow-inner flex items-center justify-center p-2 sm:p-3 overflow-hidden">
                <img
                  src={`/images/nusantara/${currentSoal.id}.webp`}
                  alt={currentSoal.title}
                  loading="eager"
                  className="w-full h-full object-contain filter drop-shadow select-none hover:scale-105 transition-transform duration-300"
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
                  className="w-full h-full flex flex-col items-center justify-center text-center p-3 text-purple-400 bg-purple-50/50 rounded-xl"
                >
                  {currentSoal.category === "makanan" ? (
                    <Utensils className="w-8 h-8 mb-1 opacity-60 text-purple-500" />
                  ) : (
                    <Landmark className="w-8 h-8 mb-1 opacity-60 text-purple-500" />
                  )}
                  <span className="text-xs font-extrabold text-purple-700">Foto Segera Hadir</span>
                </div>
              </div>

              {/* Judul Nama Objek Tebal */}
              <h2 className="text-lg sm:text-2xl font-black font-display text-slate-900 tracking-tight leading-tight mt-2.5 sm:mt-3 text-center">
                {currentSoal.title}
              </h2>
            </div>
          </div>

          {/* 2. Panel Kuis Detektif & 4 Pilihan Jawaban Ramah Jempol */}
          <div className="w-full lg:col-span-7 flex flex-col space-y-3 sm:space-y-3.5">
            
            {/* Kotak Pertanyaan Misi Detektif */}
            <div className="bg-gradient-to-r from-purple-100/80 via-indigo-50/80 to-purple-50 p-3 sm:p-4 rounded-2xl sm:rounded-3xl border-2 border-purple-200 text-left shadow-sm">
              <div className="flex items-center gap-1.5 mb-1">
                <Search className="w-3.5 h-3.5 text-purple-600" />
                <span className="text-[10px] sm:text-xs font-black uppercase text-purple-700 tracking-wider">
                  Misi Detektif Daerah:
                </span>
              </div>
              <p className="text-xs sm:text-base font-extrabold text-slate-900 leading-snug">
                {currentSoal.category === "makanan"
                  ? "Tebak, dari daerah manakah makanan khas pada foto di samping berasal?"
                  : "Tebak, dari daerah manakah ikon budaya pada foto di samping berasal?"}
              </p>
            </div>

            {/* Grid Pilihan Ganda 2x2 yang Lega */}
            <div className="w-full grid grid-cols-2 gap-2.5 sm:gap-3">
              {currentSoal.options.map((opt, idx) => {
                const letter = ["A", "B", "C", "D"][idx];
                const isSelected = selectedAnswer === opt;
                const isThisCorrect = isCorrect && isSelected;
                const isThisWrong = isCorrect === false && isSelected;

                let btnStyle =
                  "bg-white border-2 border-purple-200/90 text-slate-800 hover:bg-purple-50 hover:border-purple-300 shadow-[0_3px_0_0_#e9d5ff]";
                let badgeStyle = "bg-purple-100 text-purple-900 border-purple-300";

                if (isThisCorrect) {
                  btnStyle =
                    "bg-emerald-500 border-2 border-emerald-600 text-white shadow-[0_3px_0_0_#065f46]";
                  badgeStyle = "bg-emerald-600 text-white border-emerald-400";
                } else if (isThisWrong) {
                  btnStyle =
                    "bg-rose-500 border-2 border-rose-600 text-white shadow-[0_3px_0_0_#9f1239]";
                  badgeStyle = "bg-rose-600 text-white border-rose-400";
                }

                return (
                  <button
                    key={opt}
                    onClick={() => handleSelectOption(opt)}
                    className={`py-3 sm:py-3.5 px-3 sm:px-4 rounded-2xl border-2 font-black text-xs sm:text-sm flex items-center justify-between transition-all btn-chunky text-left cursor-pointer ${btnStyle}`}
                  >
                    <div className="flex items-center gap-2 overflow-hidden">
                      <span
                        className={`w-6 h-6 sm:w-7 sm:h-7 rounded-lg sm:rounded-xl border flex items-center justify-center font-black text-xs sm:text-sm shrink-0 shadow-xs ${badgeStyle}`}
                      >
                        {letter}
                      </span>
                      <span className="font-display tracking-wide truncate">{opt}</span>
                    </div>
                    {isThisCorrect && (
                      <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-white shrink-0 ml-1" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* 3. Lembar Fakta Edukasi Lengkap (Tidak Terpotong) */}
            <div className="w-full">
              {selectedAnswer ? (
                isCorrect ? (
                  /* Kapsul Fakta Nusantara Sukses */
                  <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-400 rounded-2xl sm:rounded-3xl p-3.5 sm:p-4 shadow-md text-left space-y-2.5 animate-in fade-in zoom-in-95 duration-200">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-sm">
                          <CheckCircle2 className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-black text-xs sm:text-sm text-emerald-950 leading-tight">
                            Hebat Sekali, Tebakanmu Tepat!
                          </h4>
                          <span className="text-[11px] sm:text-xs font-bold text-emerald-800">
                            Asal: {currentSoal.correctAnswer}, Provinsi {currentSoal.province}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={handleNext}
                        className="px-3 sm:px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs sm:text-sm flex items-center gap-1.5 shadow-[0_2px_0_0_#065f46] btn-chunky shrink-0 cursor-pointer"
                      >
                        <span>Lanjut Soal</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="bg-white/90 rounded-2xl p-3 border border-emerald-200 shadow-xs">
                      <div className="flex items-start gap-2">
                        <BookOpen className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <p className="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed">
                          {currentSoal.funFact}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Kotak Petunjuk Sokrates saat Salah */
                  <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-3 sm:p-3.5 shadow-sm text-left flex items-start gap-2.5 animate-in fade-in duration-150">
                    <div className="w-7 h-7 rounded-lg bg-amber-400/30 text-amber-900 flex items-center justify-center shrink-0 mt-0.5">
                      <Lightbulb className="w-4 h-4 text-amber-600" />
                    </div>
                    <div className="flex-1">
                      <h5 className="font-black text-xs sm:text-sm text-amber-950 mb-0.5">
                        Hampir Tepat!
                      </h5>
                      <p className="text-xs sm:text-sm text-amber-900 font-medium leading-relaxed">
                        Petunjuk Tobi: {currentSoal.hint}. Ayo coba pilih jawaban lainnya!
                      </p>
                    </div>
                  </div>
                )
              ) : (
                /* Panduan Ringan Sebelum Memilih */
                <div className="bg-purple-50/70 border-2 border-purple-200/80 rounded-2xl p-3 text-center text-xs text-purple-900 font-bold flex items-center justify-center gap-2 shadow-xs">
                  <Compass className="w-4 h-4 text-purple-500" />
                  <span>Pilih salah satu jawaban di atas untuk memecahkan misi detektif!</span>
                </div>
              )}
            </div>

          </div>
        </div>
      </main>

      {/* 4. Footer Navigasi Bawah */}
      <footer className="sticky bottom-0 z-30 bg-white/95 backdrop-blur-md border-t-2 border-purple-200 px-3.5 py-2 sm:px-5 sm:py-2.5 shadow-lg">
        <div className="max-w-4xl lg:max-w-5xl mx-auto flex items-center justify-between gap-2">
          <button
            onClick={handlePrev}
            className="flex items-center gap-1 sm:gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl bg-white hover:bg-slate-100 text-slate-800 font-extrabold text-xs sm:text-sm border-2 border-slate-300 shadow-[0_2px_0_0_#cbd5e1] btn-chunky cursor-pointer"
            title="Soal Sebelumnya"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Sebelumnya</span>
          </button>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={handleShuffle}
              className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl bg-purple-100 hover:bg-purple-200 text-purple-900 font-extrabold text-xs sm:text-sm border-2 border-purple-300 btn-chunky cursor-pointer"
              title="Acak Soal"
            >
              <Shuffle className="w-3.5 h-3.5" />
              <span>Acak Soal</span>
            </button>

            <span className="text-xs sm:text-sm font-black text-purple-900 bg-white px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl border-2 border-purple-200 shadow-sm">
              {currentIndex + 1} / {filteredQuestions.length}
            </span>
          </div>

          <button
            onClick={handleNext}
            className="flex items-center gap-1 sm:gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs sm:text-sm border-2 border-purple-700 shadow-[0_2px_0_0_#581c87] btn-chunky cursor-pointer"
            title="Soal Berikutnya"
          >
            <span className="hidden sm:inline">Berikutnya</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </footer>
    </div>
  );
}
