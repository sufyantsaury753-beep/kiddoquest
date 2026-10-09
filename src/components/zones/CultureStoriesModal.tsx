"use client";

import React, { useState, useMemo } from "react";
import confetti from "canvas-confetti";
import {
  X,
  MapPin,
  Utensils,
  Landmark,
  Volume2,
  Lightbulb,
  CheckCircle2,
  Shuffle,
  ArrowRight,
  ArrowLeft,
  Award,
  Star,
  Compass,
  RotateCcw,
  BookOpen
} from "lucide-react";
import { sound } from "@/lib/sound";
import { DATA_LITERASI_NUSANTARA, SoalNusantara } from "@/data/literasiNusantaraData";

interface CultureStoriesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEarnStars: (amount: number) => void;
  audioEnabled: boolean;
  liteMode: boolean;
}

const ISLAND_LABELS: Record<string, string> = {
  all: "Semua Wilayah",
  Jawa: "Jawa",
  Sumatra: "Sumatra",
  Kalimantan: "Kalimantan",
  Sulawesi: "Sulawesi",
  BaliNusa: "Bali & Nusa Tenggara",
  MalukuPapua: "Maluku & Papua",
};

export default function CultureStoriesModal({
  isOpen,
  onClose,
  onEarnStars,
  audioEnabled,
  liteMode,
}: CultureStoriesModalProps) {
  const [selectedCategory, setSelectedCategory] = useState<"all" | "makanan" | "ikon">("all");
  const [selectedIsland, setSelectedIsland] = useState<string>("all");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [solvedIds, setSolvedIds] = useState<string[]>([]);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const makananCount = useMemo(
    () => DATA_LITERASI_NUSANTARA.filter((d) => d.category === "makanan").length,
    []
  );
  const ikonCount = useMemo(
    () => DATA_LITERASI_NUSANTARA.filter((d) => d.category === "ikon").length,
    []
  );

  // Filter bank soal berdasarkan kategori dan kepulauan
  const filteredQuestions = useMemo(() => {
    return DATA_LITERASI_NUSANTARA.filter((item) => {
      const matchCat = selectedCategory === "all" || item.category === selectedCategory;
      const matchIsland = selectedIsland === "all" || item.island === selectedIsland;
      return matchCat && matchIsland;
    });
  }, [selectedCategory, selectedIsland]);

  if (!isOpen) return null;

  // Safe fallback current question
  const currentSoal: SoalNusantara =
    filteredQuestions[currentIndex] || filteredQuestions[0] || DATA_LITERASI_NUSANTARA[0];

  const isSolved = solvedIds.includes(currentSoal.id);

  // Narasi suara Tobi (Speech Synthesis)
  const handleSpeakQuestion = () => {
    sound.playChime();
    if (!audioEnabled) return;

    sound.stopSpeaking();
    setIsSpeaking(true);

    let script = "";
    if (selectedAnswer && isCorrect) {
      script = `Jawabanmu benar! ${currentSoal.title} berasal dari ${currentSoal.correctAnswer}, Provinsi ${currentSoal.province}. Fakta serunya: ${currentSoal.funFact}`;
    } else if (selectedAnswer && isCorrect === false) {
      script = `Hampir tepat! Petunjuk dari Tobi: ${currentSoal.hint}. Coba tebak sekali lagi!`;
    } else {
      script = `Misi Detektif Daerah Cilik! Perhatikan foto ${currentSoal.title}. Tebak, dari daerah manakah ${
        currentSoal.category === "makanan" ? "makanan khas" : "ikon budaya"
      } pada foto di atas berasal?`;
    }

    sound.speak(
      script,
      () => setIsSpeaking(true),
      () => setIsSpeaking(false)
    );
  };

  // Pilih jawaban
  const handleSelectOption = (option: string) => {
    setSelectedAnswer(option);

    if (option === currentSoal.correctAnswer) {
      setIsCorrect(true);
      sound.playCelebration();

      // Dapatkan reward bintang +40 sekali tiap nomor
      if (!isSolved) {
        onEarnStars(40);
        setSolvedIds((prev) => [...prev, currentSoal.id]);
      }

      if (!liteMode) {
        confetti({
          particleCount: 55,
          spread: 70,
          origin: { y: 0.65 },
        });
      }

      if (audioEnabled) {
        sound.speak(
          `Luar biasa, tebakanmu tepat sekali! ${currentSoal.title} berasal dari ${currentSoal.correctAnswer}, ${currentSoal.province}. ${currentSoal.funFact}`,
          () => setIsSpeaking(true),
          () => setIsSpeaking(false)
        );
      }
    } else {
      setIsCorrect(false);
      sound.playSocraticHint();

      if (audioEnabled) {
        sound.speak(
          `Hampir tepat! Petunjuk Tobi: ${currentSoal.hint}. Ayo coba lagi!`,
          () => setIsSpeaking(true),
          () => setIsSpeaking(false)
        );
      }
    }
  };

  // Pindah soal berikutnya
  const handleNext = () => {
    sound.stopSpeaking();
    setIsSpeaking(false);
    sound.playChime();
    setSelectedAnswer(null);
    setIsCorrect(null);
    setCurrentIndex((prev) => (prev + 1) % filteredQuestions.length);
  };

  // Pindah soal sebelumnya
  const handlePrev = () => {
    sound.stopSpeaking();
    setIsSpeaking(false);
    sound.playChime();
    setSelectedAnswer(null);
    setIsCorrect(null);
    setCurrentIndex((prev) => (prev - 1 + filteredQuestions.length) % filteredQuestions.length);
  };

  // Acak soal
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

  // Ganti filter kategori
  const handleChangeCategory = (cat: "all" | "makanan" | "ikon") => {
    sound.playChime();
    sound.stopSpeaking();
    setIsSpeaking(false);
    setSelectedCategory(cat);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setIsCorrect(null);
  };

  // Ganti filter pulau
  const handleChangeIsland = (isl: string) => {
    sound.playChime();
    sound.stopSpeaking();
    setIsSpeaking(false);
    setSelectedIsland(isl);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setIsCorrect(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-5 bg-slate-900/65 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl border-4 border-purple-400 shadow-2xl p-4 sm:p-7 overflow-hidden my-auto max-h-[96vh] flex flex-col">
        {/* Header Modal */}
        <div className="flex items-center justify-between pb-3 sm:pb-4 border-b-2 border-purple-100 flex-shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 text-white flex items-center justify-center shadow-md border border-purple-300">
              <Compass className="w-6 h-6 sm:w-7 sm:h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] sm:text-xs font-black uppercase text-purple-700 bg-purple-100 px-2.5 py-0.5 rounded-full border border-purple-200 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-purple-600" />
                  Sabang sampai Merauke
                </span>
                <span className="text-[10px] sm:text-xs font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full border border-amber-300 flex items-center gap-1">
                  <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                  +40 Bintang
                </span>
              </div>
              <h3 className="text-lg sm:text-2xl font-black font-display text-slate-900 tracking-tight mt-0.5">
                Literasi Nusantara: Detektif Daerah Cilik
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                sound.stopSpeaking();
                onClose();
              }}
              className="p-1.5 sm:p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 btn-chunky"
              title="Tutup Modal"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>
        </div>

        {/* Content Body - Scrollable */}
        <div className="flex-1 overflow-y-auto py-3 space-y-4 pr-0.5">
          {/* Filter Bar: Kategori & Pulau */}
          <div className="bg-purple-50/70 rounded-2xl p-3 border border-purple-100 space-y-2.5">
            {/* Kategori Tabs */}
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <button
                  onClick={() => handleChangeCategory("all")}
                  className={`px-3 py-1.5 rounded-xl font-bold text-xs sm:text-sm border-2 transition-all btn-chunky ${
                    selectedCategory === "all"
                      ? "bg-purple-600 text-white border-purple-700 shadow-[0_2px_0_0_#581c87]"
                      : "bg-white text-purple-900 border-purple-200 hover:bg-purple-100"
                  }`}
                >
                  Semua Topik ({DATA_LITERASI_NUSANTARA.length})
                </button>
                <button
                  onClick={() => handleChangeCategory("makanan")}
                  className={`px-3 py-1.5 rounded-xl font-bold text-xs sm:text-sm border-2 flex items-center gap-1.5 transition-all btn-chunky ${
                    selectedCategory === "makanan"
                      ? "bg-purple-600 text-white border-purple-700 shadow-[0_2px_0_0_#581c87]"
                      : "bg-white text-purple-900 border-purple-200 hover:bg-purple-100"
                  }`}
                >
                  <Utensils className="w-3.5 h-3.5" />
                  <span>Makanan Khas ({makananCount})</span>
                </button>
                <button
                  onClick={() => handleChangeCategory("ikon")}
                  className={`px-3 py-1.5 rounded-xl font-bold text-xs sm:text-sm border-2 flex items-center gap-1.5 transition-all btn-chunky ${
                    selectedCategory === "ikon"
                      ? "bg-purple-600 text-white border-purple-700 shadow-[0_2px_0_0_#581c87]"
                      : "bg-white text-purple-900 border-purple-200 hover:bg-purple-100"
                  }`}
                >
                  <Landmark className="w-3.5 h-3.5" />
                  <span>Ikon & Landmark ({ikonCount})</span>
                </button>
              </div>

              {/* Progress Count */}
              <div className="flex items-center gap-2 text-xs font-bold text-purple-800">
                <Award className="w-4 h-4 text-purple-600" />
                <span>
                  Selesai: {solvedIds.length}/{DATA_LITERASI_NUSANTARA.length} Soal
                </span>
              </div>
            </div>

            {/* Filter Wilayah / Kepulauan (Horizontal Scrollable) */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
              <span className="text-[11px] font-extrabold uppercase text-slate-500 shrink-0 mr-1">
                Wilayah:
              </span>
              {(["all", "Jawa", "Sumatra", "Kalimantan", "Sulawesi", "BaliNusa", "MalukuPapua"] as const).map(
                (islKey) => (
                  <button
                    key={islKey}
                    onClick={() => handleChangeIsland(islKey)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold shrink-0 border transition-all ${
                      selectedIsland === islKey
                        ? "bg-indigo-600 text-white border-indigo-700 shadow-sm"
                        : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    {ISLAND_LABELS[islKey]}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Main Question Card */}
          <div className="bg-gradient-to-br from-purple-50/70 via-white to-amber-50/50 rounded-3xl p-4 sm:p-6 border-3 border-purple-200 shadow-sm relative">
            {/* Top Bar of Active Question */}
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-3 py-1 rounded-full text-xs font-black bg-purple-200 text-purple-900 border border-purple-300 flex items-center gap-1.5">
                  {currentSoal.category === "makanan" ? (
                    <>
                      <Utensils className="w-3.5 h-3.5 text-purple-700" />
                      Makanan Khas
                    </>
                  ) : (
                    <>
                      <Landmark className="w-3.5 h-3.5 text-purple-700" />
                      Ikon & Landmark
                    </>
                  )}
                </span>
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-indigo-100 text-indigo-900 border border-indigo-200 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-indigo-600" />
                  {ISLAND_LABELS[currentSoal.island] || currentSoal.island}
                </span>
                {isSolved && (
                  <span className="px-2.5 py-1 rounded-full text-xs font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <Star className="w-3 h-3 fill-emerald-600 text-emerald-600" />
                    Tuntas (+40 Bintang)
                  </span>
                )}
              </div>

              {/* Dengarkan Tobi Button */}
              <button
                onClick={handleSpeakQuestion}
                className={`flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-black border-2 transition-all btn-chunky ${
                  isSpeaking
                    ? "bg-rose-500 text-white border-rose-600 shadow-[0_2px_0_0_#9f1239] animate-pulse"
                    : "bg-purple-600 hover:bg-purple-700 text-white border-purple-700 shadow-[0_2px_0_0_#581c87]"
                }`}
              >
                <Volume2 className="w-4 h-4 text-yellow-300" />
                <span>{isSpeaking ? "Membacakan..." : "Dengarkan Tobi"}</span>
              </button>
            </div>

            {/* Visual Photo Card Showcase (Posisi Utama & Judul Jelas) */}
            <div className="mb-5 bg-white/95 rounded-3xl p-4 sm:p-6 border-3 border-purple-200 shadow-sm flex flex-col items-center text-center">
              {/* Foto Objek Utama Proporsional */}
              <div className="relative w-full max-w-sm sm:max-w-md h-52 sm:h-64 rounded-3xl bg-gradient-to-b from-purple-50/60 to-slate-50/80 border-2 border-purple-200/80 shadow-inner flex items-center justify-center p-3 overflow-hidden group">
                <img
                  src={`/images/nusantara/${currentSoal.id}.webp`}
                  alt={currentSoal.title}
                  loading="lazy"
                  className="w-full h-full object-contain filter drop-shadow-md transition-transform duration-300 group-hover:scale-105 select-none"
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
                  className="w-full h-full flex-col items-center justify-center text-center p-4 text-purple-400 bg-purple-50/50 rounded-2xl"
                >
                  {currentSoal.category === "makanan" ? (
                    <Utensils className="w-12 h-12 mb-2 opacity-50 text-purple-500" />
                  ) : (
                    <Landmark className="w-12 h-12 mb-2 opacity-50 text-purple-500" />
                  )}
                  <span className="text-xs font-black text-purple-700">Foto Segera Hadir</span>
                </div>
              </div>

              {/* Judul Foto / Nama Objek Secara Tegas & Jelas */}
              <h4 className="text-2xl sm:text-3xl font-black font-display text-slate-900 tracking-tight mt-4">
                {currentSoal.title}
              </h4>

              {/* Pertanyaan Singkat To-The-Point (Zero-Spoiler) */}
              <p className="text-sm sm:text-base font-bold text-purple-900 bg-purple-50/90 py-2 px-5 sm:px-6 rounded-2xl border border-purple-200 mt-2.5 max-w-lg">
                {currentSoal.category === "makanan"
                  ? "Tebak, dari daerah manakah makanan khas pada foto di atas berasal?"
                  : "Tebak, dari daerah manakah ikon budaya pada foto di atas berasal?"}
              </p>
            </div>

            {/* Options Grid (Pilihan Ganda Daerah A, B, C, D) */}
            <div className="space-y-2 mb-4">
              <span className="text-xs font-black text-slate-500 uppercase tracking-wider block text-center sm:text-left">
                Pilih Nama Daerah Asal:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3.5">
                {currentSoal.options.map((opt, idx) => {
                  const letter = ["A", "B", "C", "D"][idx];
                  const isSelected = selectedAnswer === opt;
                  const isThisCorrect = isCorrect && isSelected;
                  const isThisWrong = isCorrect === false && isSelected;

                  let btnStyle =
                    "bg-white border-purple-200 text-slate-800 hover:bg-purple-50/80 hover:border-purple-300 shadow-[0_3px_0_0_#e9d5ff]";
                  let badgeStyle = "bg-purple-100 text-purple-900 border-purple-300";

                  if (isThisCorrect) {
                    btnStyle =
                      "bg-emerald-500 border-emerald-600 text-white shadow-[0_3px_0_0_#065f46] scale-[1.01]";
                    badgeStyle = "bg-emerald-600 text-white border-emerald-400";
                  } else if (isThisWrong) {
                    btnStyle =
                      "bg-rose-500 border-rose-600 text-white shadow-[0_3px_0_0_#9f1239]";
                    badgeStyle = "bg-rose-600 text-white border-rose-400";
                  }

                  return (
                    <button
                      key={opt}
                      onClick={() => handleSelectOption(opt)}
                      className={`p-3.5 sm:p-4 rounded-2xl border-3 font-extrabold text-sm sm:text-base flex items-center justify-between transition-all duration-150 btn-chunky text-left ${btnStyle}`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl border-2 flex items-center justify-center font-black text-xs sm:text-sm shrink-0 ${badgeStyle}`}
                        >
                          {letter}
                        </span>
                        <span className="font-display tracking-wide">{opt}</span>
                      </div>
                      {isThisCorrect && (
                        <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-white shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Fakta Edukasi Di Pindah Ke Akhir (Hanya Muncul Setelah Pemain Memilih Jawaban) */}
            {selectedAnswer && (
              <div className="mt-4 pt-3 border-t border-purple-100">
                {isCorrect ? (
                  <div className="bg-emerald-50 border-2 border-emerald-400 rounded-3xl p-4 sm:p-5 text-emerald-950 space-y-3 shadow-sm">
                    <div className="flex items-center justify-between flex-wrap gap-2 pb-2 border-b border-emerald-200">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                        <div>
                          <span className="text-base sm:text-lg font-black text-emerald-900 block leading-tight">
                            Hebat! Jawabanmu Tepat Sekali!
                          </span>
                          <span className="text-xs font-bold text-emerald-700">
                            {currentSoal.title} berasal dari {currentSoal.correctAnswer}, Provinsi {currentSoal.province}
                          </span>
                        </div>
                      </div>
                      <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-200 text-emerald-900 border border-emerald-300">
                        {currentSoal.province}
                      </span>
                    </div>

                    {/* Fakta Edukasi & Penjelasan Sejarah / Rasa */}
                    <div className="bg-white/85 rounded-2xl p-3.5 sm:p-4 border border-emerald-300 space-y-2">
                      <div className="flex items-center gap-1.5 text-xs font-black text-emerald-800 uppercase tracking-wider">
                        <BookOpen className="w-4 h-4 text-emerald-600" />
                        <span>Fakta Edukasi Nusantara:</span>
                      </div>
                      <p className="text-xs sm:text-sm font-semibold text-slate-700 leading-relaxed">
                        {currentSoal.funFact}
                      </p>
                    </div>

                    <div className="pt-1 flex justify-end">
                      <button
                        onClick={handleNext}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm border-2 border-emerald-700 shadow-[0_3px_0_0_#065f46] btn-chunky cursor-pointer"
                      >
                        <span>Tebak Soal Berikutnya</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-4 text-amber-950 space-y-2 shadow-sm">
                    <div className="flex items-center gap-2">
                      <Lightbulb className="w-5 h-5 text-amber-600 shrink-0" />
                      <span className="text-sm sm:text-base font-black text-amber-900">
                        Hampir Tepat! Yuk Coba Tebak Lagi
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm font-bold text-amber-900 bg-white/70 p-2.5 rounded-xl border border-amber-200">
                      Petunjuk Tobi: {currentSoal.hint}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="pt-3 border-t-2 border-purple-100 flex items-center justify-between flex-wrap gap-2 flex-shrink-0">
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              className="flex items-center gap-1 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs sm:text-sm border border-slate-300 btn-chunky"
              title="Soal Sebelumnya"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Sebelumnya</span>
            </button>

            <button
              onClick={handleShuffle}
              className="flex items-center gap-1 px-3 py-2 rounded-xl bg-purple-100 hover:bg-purple-200 text-purple-900 font-bold text-xs sm:text-sm border border-purple-300 btn-chunky"
              title="Acak Soal"
            >
              <Shuffle className="w-4 h-4" />
              <span>Acak Soal</span>
            </button>

            <button
              onClick={handleNext}
              className="flex items-center gap-1 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs sm:text-sm border border-slate-300 btn-chunky"
              title="Soal Berikutnya"
            >
              <span className="hidden sm:inline">Berikutnya</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="text-xs font-bold text-purple-800 flex items-center gap-1">
            <span>
              Nomor {currentIndex + 1} dari {filteredQuestions.length} Soal
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
