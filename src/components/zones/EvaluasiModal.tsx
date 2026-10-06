"use client";

import React, { useState, useEffect } from "react";
import { 
  X, 
  BookOpen, 
  Award, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  Volume2, 
  VolumeX, 
  ArrowRight, 
  ArrowLeft, 
  RotateCcw, 
  Sparkles, 
  Compass, 
  Heart, 
  Shield, 
  Calculator, 
  Palette, 
  Activity, 
  Globe, 
  Landmark, 
  Cpu, 
  ChevronRight, 
  GraduationCap, 
  Star,
  Check,
  ListOrdered
} from "lucide-react";
import { sound } from "@/lib/sound";
import { 
  MapelId, 
  AgamaSubtype, 
  SoalEvaluasi, 
  PaketEvaluasi, 
  DAFTAR_MAPEL, 
  DAFTAR_AGAMA, 
  getPaketEvaluasi 
} from "@/data/evaluasi";

interface EvaluasiModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEarnStars: (amount: number) => void;
  audioEnabled: boolean;
  liteMode: boolean;
}

// Icon mapper for the 10 subjects
const getMapelIcon = (ikonNama: string) => {
  switch (ikonNama) {
    case "Heart":
      return Heart;
    case "Shield":
      return Shield;
    case "BookOpen":
      return BookOpen;
    case "Calculator":
      return Calculator;
    case "Compass":
      return Compass;
    case "Palette":
      return Palette;
    case "Activity":
      return Activity;
    case "Globe":
      return Globe;
    case "Landmark":
      return Landmark;
    case "Cpu":
      return Cpu;
    default:
      return BookOpen;
  }
};

export default function EvaluasiModal({
  isOpen,
  onClose,
  onEarnStars,
  audioEnabled,
  liteMode,
}: EvaluasiModalProps) {
  // Modal Navigation State: 'select-mapel' | 'select-agama' | 'quiz' | 'result'
  const [viewState, setViewState] = useState<"select-mapel" | "select-agama" | "quiz" | "result">("select-mapel");
  
  // Selected Subject and Religion Subtype
  const [selectedMapelId, setSelectedMapelId] = useState<MapelId>("pancasila");
  const [selectedAgamaSubtype, setSelectedAgamaSubtype] = useState<AgamaSubtype>("islam");
  const [currentPaket, setCurrentPaket] = useState<PaketEvaluasi | null>(null);

  // Quiz Arena States
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({}); // index -> choice index (0..3)
  const [showPembahasan, setShowPembahasan] = useState<boolean>(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [starsAwarded, setStarsAwarded] = useState(false);

  // Reset states when modal is opened or closed
  useEffect(() => {
    if (isOpen) {
      setViewState("select-mapel");
      setCurrentQuestionIndex(0);
      setUserAnswers({});
      setStarsAwarded(false);
      sound.stopSpeaking();
    } else {
      sound.stopSpeaking();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Handle Selecting a Subject
  const handleSelectMapel = (mapelId: MapelId) => {
    sound.playChime();
    setSelectedMapelId(mapelId);

    if (mapelId === "agama") {
      setViewState("select-agama");
    } else {
      startQuiz(mapelId, "islam");
    }
  };

  // Handle Selecting a Religion
  const handleSelectAgama = (subtype: AgamaSubtype) => {
    sound.playChime();
    setSelectedAgamaSubtype(subtype);
    startQuiz("agama", subtype);
  };

  // Start the 30-Question Quiz
  const startQuiz = (mapelId: MapelId, agamaSubtype: AgamaSubtype) => {
    const paket = getPaketEvaluasi(mapelId, agamaSubtype);
    setCurrentPaket(paket);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setStarsAwarded(false);
    setViewState("quiz");

    if (audioEnabled) {
      sound.speak(`Memulai simulasi asesmen ${paket.namaMapel}! Ada 30 soal pilihan ganda. Selamat mengerjakan!`);
    }
  };

  const currentQuestion: SoalEvaluasi | undefined = currentPaket?.daftarSoal[currentQuestionIndex];

  // User chooses an option (0=A, 1=B, 2=C, 3=D)
  const handleSelectOption = (choiceIndex: number) => {
    if (!currentQuestion) return;
    
    const isFirstTime = userAnswers[currentQuestionIndex] === undefined;
    const isCorrect = choiceIndex === currentQuestion.kunciJawaban;

    setUserAnswers((prev) => ({
      ...prev,
      [currentQuestionIndex]: choiceIndex,
    }));

    if (isFirstTime) {
      if (isCorrect) {
        sound.playCorrect();
      } else {
        sound.playWrong();
      }
    } else {
      sound.playChime();
    }
  };

  // Speech TTS for Current Question
  const handleSpeakQuestion = () => {
    if (!currentQuestion) return;
    
    if (isSpeaking) {
      sound.stopSpeaking();
      setIsSpeaking(false);
      return;
    }

    const letters = ["A", "B", "C", "D"];
    const optionsText = currentQuestion.pilihan
      .map((p, idx) => `Pilihan ${letters[idx]}, ${p}`)
      .join(". ");
    
    const speechText = `Soal nomor ${currentQuestion.nomor}. Tingkat ${currentQuestion.level}. ${currentQuestion.pertanyaan}. ${optionsText}`;
    
    setIsSpeaking(true);
    sound.speak(
      speechText,
      () => setIsSpeaking(true),
      () => setIsSpeaking(false)
    );
  };

  // Navigation handlers in quiz
  const handleNextQuestion = () => {
    sound.stopSpeaking();
    setIsSpeaking(false);
    sound.playChime();
    if (currentPaket && currentQuestionIndex < currentPaket.daftarSoal.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePrevQuestion = () => {
    sound.stopSpeaking();
    setIsSpeaking(false);
    sound.playChime();
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  // Finish quiz and show results
  const handleFinishQuiz = () => {
    sound.stopSpeaking();
    setIsSpeaking(false);
    sound.playTada();
    setViewState("result");

    // Calculate score
    if (currentPaket && !starsAwarded) {
      let correctCount = 0;
      currentPaket.daftarSoal.forEach((soal, idx) => {
        if (userAnswers[idx] === soal.kunciJawaban) {
          correctCount++;
        }
      });

      // Earn stars: 1 star per 3 correct answers, bonus +5 if all correct
      const earned = Math.max(5, Math.floor(correctCount / 2));
      onEarnStars(earned);
      setStarsAwarded(true);

      if (audioEnabled) {
        sound.speak(`Hebat! Kamu berhasil menyelesaikan asesmen dengan ${correctCount} jawaban benar dari 30 soal! Kamu mendapatkan ${earned} bintang prestasi!`);
      }
    }
  };

  // Calculate score statistics
  const calculateStats = () => {
    if (!currentPaket) return { correct: 0, total: 30, scorePercent: 0, mudahCorrect: 0, sedangCorrect: 0, hotsCorrect: 0 };
    
    let correct = 0;
    let mudahCorrect = 0;
    let sedangCorrect = 0;
    let hotsCorrect = 0;

    currentPaket.daftarSoal.forEach((soal, idx) => {
      const isCorrect = userAnswers[idx] === soal.kunciJawaban;
      if (isCorrect) {
        correct++;
        if (soal.level === "mudah") mudahCorrect++;
        if (soal.level === "sedang") sedangCorrect++;
        if (soal.level === "hots") hotsCorrect++;
      }
    });

    const scorePercent = Math.round((correct / currentPaket.daftarSoal.length) * 100);
    return {
      correct,
      total: currentPaket.daftarSoal.length,
      scorePercent,
      mudahCorrect,
      sedangCorrect,
      hotsCorrect,
    };
  };

  const stats = calculateStats();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-900/80 backdrop-blur-md animate-fade-in no-print">
      <div className="relative w-full max-w-4xl max-h-[94vh] bg-white rounded-3xl border-4 border-indigo-400 shadow-[0_12px_0_0_#4338ca] flex flex-col overflow-hidden">
        
        {/* ============================================================== */}
        {/* TOP HEADER MODAL                                              */}
        {/* ============================================================== */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 sm:py-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 text-white border-b-4 border-indigo-800">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-white/20 backdrop-blur-sm border-2 border-white/40 flex items-center justify-center shadow-inner">
              <GraduationCap className="w-6 h-6 text-yellow-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-xl font-black font-display tracking-tight">
                  Pusat Evaluasi Literasi SD
                </h2>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-black bg-yellow-400 text-yellow-950">
                  Kurikulum Merdeka 2026
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-indigo-100 font-bold">
                {viewState === "select-mapel" && "Pilih 1 dari 10 Mata Pelajaran Lengkap SD"}
                {viewState === "select-agama" && "Pilih 1 dari 6 Agama Resmi di Indonesia"}
                {viewState === "quiz" && `${currentPaket?.namaMapel} • Soal ${currentQuestionIndex + 1} dari ${currentPaket?.totalSoal}`}
                {viewState === "result" && `Hasil Evaluasi: ${currentPaket?.namaMapel}`}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {viewState === "quiz" && (
              <button
                onClick={handleSpeakQuestion}
                className={`p-2 rounded-xl border-2 transition-all ${
                  isSpeaking
                    ? "bg-yellow-400 text-yellow-950 border-yellow-500 animate-pulse"
                    : "bg-white/20 hover:bg-white/30 text-white border-white/40"
                }`}
                title="Dengarkan Soal & Pilihan dari Tobi"
              >
                {isSpeaking ? <Volume2 className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </button>
            )}

            <button
              onClick={() => {
                sound.stopSpeaking();
                onClose();
              }}
              className="p-2 rounded-xl bg-white/20 hover:bg-red-500 hover:text-white border-2 border-white/40 transition-colors"
              title="Tutup Modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ============================================================== */}
        {/* MODAL BODY (SCROLLABLE)                                        */}
        {/* ============================================================== */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-50/60 space-y-6">

          {/* ------------------------------------------------------------ */}
          {/* VIEW 1: PILIH MATA PELAJARAN (10 MAPEL)                     */}
          {/* ------------------------------------------------------------ */}
          {viewState === "select-mapel" && (
            <div className="space-y-5">
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-4 sm:p-5 border-2 border-indigo-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center flex-shrink-0 shadow-md">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-black text-slate-800">
                      Asesmen Diagnostik & Ujian Mandiri SD
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 font-medium">
                      Tersedia 30 soal terstandar per mata pelajaran, lengkap dengan pembahasan ramah anak dan kunci jawaban edukatif.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-indigo-300 text-xs font-bold text-indigo-700 shadow-sm flex-shrink-0">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>300+ Bank Soal SD</span>
                </div>
              </div>

              {/* Grid 10 Mapel */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-3.5 sm:gap-4">
                {DAFTAR_MAPEL.map((mapel, index) => {
                  const Icon = getMapelIcon(mapel.ikonNama);
                  return (
                    <div
                      key={mapel.id}
                      onClick={() => handleSelectMapel(mapel.id)}
                      className={`group rounded-2xl p-4 sm:p-5 border-3 transition-all duration-200 cursor-pointer select-none bg-white ${
                        mapel.warnaTema.border
                      } hover:shadow-lg hover:-translate-y-1 active:translate-y-0.5 ${
                        liteMode ? "" : mapel.warnaTema.shadow
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3 mb-2.5">
                        <div className="flex items-center gap-3">
                          <div className={`w-11 h-11 rounded-2xl flex items-center justify-center text-white shadow-md ${
                            mapel.id === "agama" ? "bg-emerald-600" :
                            mapel.id === "pancasila" ? "bg-red-600" :
                            mapel.id === "bahasaIndonesia" ? "bg-amber-600" :
                            mapel.id === "matematika" ? "bg-blue-600" :
                            mapel.id === "ipas" ? "bg-teal-600" :
                            mapel.id === "seniBudaya" ? "bg-purple-600" :
                            mapel.id === "pjok" ? "bg-orange-600" :
                            mapel.id === "bahasaInggris" ? "bg-sky-600" :
                            mapel.id === "muatanLokal" ? "bg-rose-600" :
                            "bg-indigo-600"
                          }`}>
                            <Icon className="w-6 h-6" />
                          </div>
                          <div>
                            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                              Mapel #{index + 1} • {mapel.kategori}
                            </span>
                            <h4 className="text-base sm:text-lg font-black text-slate-800 group-hover:text-indigo-600 transition-colors">
                              {mapel.nama}
                            </h4>
                          </div>
                        </div>
                        <span className={`text-[11px] font-black px-2.5 py-0.5 rounded-full border ${mapel.warnaTema.badge}`}>
                          30 Soal
                        </span>
                      </div>

                      <p className="text-xs text-slate-500 font-medium line-clamp-2 mb-3">
                        {mapel.deskripsi}
                      </p>

                      <div className="flex items-center justify-between pt-2.5 border-t border-slate-100 text-xs font-bold text-slate-600">
                        <span className="text-[11px] text-slate-400">Mudah • Sedang • HOTS</span>
                        <div className="flex items-center gap-1 text-indigo-600 font-black group-hover:translate-x-1 transition-transform">
                          <span>Mulai Evaluasi</span>
                          <ChevronRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ------------------------------------------------------------ */}
          {/* VIEW 2: PEMILIH 6 AGAMA                                      */}
          {/* ------------------------------------------------------------ */}
          {viewState === "select-agama" && (
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => {
                    sound.playChime();
                    setViewState("select-mapel");
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border-2 border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-100 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Kembali ke Daftar Mapel</span>
                </button>

                <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
                  Pendidikan Karakter & Budi Pekerti
                </span>
              </div>

              <div className="text-center max-w-lg mx-auto py-2">
                <h3 className="text-lg sm:text-2xl font-black text-slate-800">
                  Pilih Mata Pelajaran Agama
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Pilih salah satu dari 6 agama resmi di Indonesia untuk memulai evaluasi 30 soal pilihan ganda sesuai keyakinanmu:
                </p>
              </div>

              {/* Grid 6 Agama */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
                {DAFTAR_AGAMA.map((item) => (
                  <div
                    key={item.subtype}
                    onClick={() => handleSelectAgama(item.subtype)}
                    className="group rounded-2xl p-4 sm:p-5 bg-white border-3 border-emerald-400 shadow-[0_4px_0_0_#059669] hover:shadow-lg hover:-translate-y-1 active:translate-y-0.5 transition-all cursor-pointer select-none flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-black text-sm mb-3 border border-emerald-300">
                        <Heart className="w-5 h-5 fill-emerald-600 text-emerald-600" />
                      </div>

                      <h4 className="text-base font-black text-slate-800 group-hover:text-emerald-700 transition-colors">
                        {item.nama}
                      </h4>

                      <div className="space-y-1 my-2.5 text-[11px] text-slate-600 font-semibold bg-emerald-50/60 p-2.5 rounded-xl border border-emerald-200">
                        <p><strong className="text-slate-800">Kitab Suci:</strong> {item.kitabSuci}</p>
                        <p><strong className="text-slate-800">Rumah Ibadah:</strong> {item.tempatIbadah}</p>
                      </div>

                      <p className="text-xs text-slate-500 font-medium line-clamp-2">
                        {item.deskripsi}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-black text-emerald-600">
                      <span>30 Soal Lengkap</span>
                      <div className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        <span>Pilih</span>
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ------------------------------------------------------------ */}
          {/* VIEW 3: ARENA SIMULASI KUIS EVALUASI (30 SOAL)               */}
          {/* ------------------------------------------------------------ */}
          {viewState === "quiz" && currentPaket && currentQuestion && (
            <div className="space-y-5">
              
              {/* Top Question Progress & Badge Bar */}
              <div className="bg-white rounded-2xl p-3.5 sm:p-4 border-2 border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 w-full sm:w-auto">
                  <span className="text-xs font-black px-2.5 py-1 rounded-xl bg-indigo-100 text-indigo-800 border border-indigo-300">
                    Soal #{currentQuestion.nomor}
                  </span>
                  
                  {/* Level Badge */}
                  <span className={`text-xs font-black px-2.5 py-1 rounded-xl border ${
                    currentQuestion.level === "mudah"
                      ? "bg-emerald-100 text-emerald-800 border-emerald-300"
                      : currentQuestion.level === "sedang"
                      ? "bg-amber-100 text-amber-800 border-amber-300"
                      : "bg-purple-100 text-purple-800 border-purple-300"
                  }`}>
                    Level: {currentQuestion.level.toUpperCase()}
                  </span>

                  <span className="text-xs font-bold text-slate-400 hidden md:inline">
                    • {currentPaket.fase}
                  </span>
                </div>

                {/* Progress Bar & Counter */}
                <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                  <div className="text-xs font-black text-slate-600">
                    <span>{Object.keys(userAnswers).length}</span>
                    <span className="text-slate-400">/30 Terjawab</span>
                  </div>
                  <div className="w-28 sm:w-36 h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-300"
                      style={{
                        width: `${Math.round(((currentQuestionIndex + 1) / currentPaket.totalSoal) * 100)}%`,
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Question Statement Box */}
              <div className="bg-white rounded-2xl p-4 sm:p-6 border-3 border-slate-300 shadow-sm space-y-4">
                <p className="text-base sm:text-lg md:text-xl font-extrabold text-slate-800 leading-relaxed font-display">
                  {currentQuestion.pertanyaan}
                </p>

                {/* 4 Chunky Touch Option Buttons */}
                <div className="grid grid-cols-1 gap-2.5 sm:gap-3 pt-2">
                  {currentQuestion.pilihan.map((optionText, choiceIdx) => {
                    const letters = ["A", "B", "C", "D"];
                    const isSelected = userAnswers[currentQuestionIndex] === choiceIdx;
                    const isAnswered = userAnswers[currentQuestionIndex] !== undefined;
                    const isCorrectAnswer = choiceIdx === currentQuestion.kunciJawaban;

                    let buttonStyles = "bg-white border-slate-200 text-slate-800 hover:bg-slate-50 hover:border-indigo-300";
                    let letterCircleStyles = "bg-slate-100 text-slate-700 border-slate-300";

                    if (isAnswered) {
                      if (isCorrectAnswer) {
                        buttonStyles = "bg-emerald-50 border-emerald-500 text-emerald-950 shadow-[0_3px_0_0_#059669]";
                        letterCircleStyles = "bg-emerald-500 text-white border-emerald-600";
                      } else if (isSelected && !isCorrectAnswer) {
                        buttonStyles = "bg-red-50 border-red-500 text-red-950 shadow-[0_3px_0_0_#dc2626]";
                        letterCircleStyles = "bg-red-500 text-white border-red-600";
                      } else {
                        buttonStyles = "bg-white/60 border-slate-200 text-slate-400 opacity-60";
                        letterCircleStyles = "bg-slate-100 text-slate-400 border-slate-200";
                      }
                    } else if (isSelected) {
                      buttonStyles = "bg-indigo-50 border-indigo-500 text-indigo-950 shadow-[0_3px_0_0_#4f46e5]";
                      letterCircleStyles = "bg-indigo-600 text-white border-indigo-700";
                    }

                    return (
                      <button
                        key={choiceIdx}
                        onClick={() => handleSelectOption(choiceIdx)}
                        className={`w-full p-3.5 sm:p-4 rounded-2xl border-2 sm:border-3 text-left font-bold text-sm sm:text-base flex items-center justify-between gap-3 transition-all duration-150 btn-chunky active:scale-[0.99] select-none ${buttonStyles}`}
                      >
                        <div className="flex items-center gap-3">
                          <span className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-sm border-2 flex-shrink-0 ${letterCircleStyles}`}>
                            {letters[choiceIdx]}
                          </span>
                          <span className="leading-snug">{optionText}</span>
                        </div>

                        {/* Status Icon */}
                        {isAnswered && (
                          <div className="flex-shrink-0">
                            {isCorrectAnswer ? (
                              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                            ) : isSelected ? (
                              <XCircle className="w-5 h-5 text-red-500" />
                            ) : null}
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Educational Explanation Box (Pembahasan Ramah Anak) */}
              {userAnswers[currentQuestionIndex] !== undefined && showPembahasan && (
                <div className={`rounded-2xl p-4 sm:p-5 border-2 animate-fade-in ${
                  userAnswers[currentQuestionIndex] === currentQuestion.kunciJawaban
                    ? "bg-emerald-50 border-emerald-300 text-emerald-950"
                    : "bg-amber-50 border-amber-300 text-amber-950"
                }`}>
                  <div className="flex items-start gap-3">
                    <div className="p-1.5 rounded-xl bg-white shadow-sm flex-shrink-0 mt-0.5">
                      {userAnswers[currentQuestionIndex] === currentQuestion.kunciJawaban ? (
                        <Check className="w-5 h-5 text-emerald-600" strokeWidth={3} />
                      ) : (
                        <HelpCircle className="w-5 h-5 text-amber-600" strokeWidth={2.5} />
                      )}
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-xs sm:text-sm font-black uppercase tracking-wider">
                        {userAnswers[currentQuestionIndex] === currentQuestion.kunciJawaban
                          ? "Jawabanmu Tepat Sekali!"
                          : "Yuk Pelajari Penjelasannya!"}
                      </h4>
                      <p className="text-xs sm:text-sm font-medium leading-relaxed">
                        {currentQuestion.pembahasan}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Question Number Quick Jump Pills */}
              <div className="bg-white rounded-2xl p-3 sm:p-4 border-2 border-slate-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <ListOrdered className="w-3.5 h-3.5" />
                    Daftar Nomor Soal:
                  </span>
                  <span className="text-[11px] font-bold text-slate-400">
                    Klik nomor untuk berpindah soal
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto p-1">
                  {currentPaket.daftarSoal.map((soal, idx) => {
                    const isAnswered = userAnswers[idx] !== undefined;
                    const isCurrent = currentQuestionIndex === idx;
                    const isCorrect = userAnswers[idx] === soal.kunciJawaban;

                    let pillClass = "bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200";
                    if (isCurrent) {
                      pillClass = "bg-indigo-600 text-white border-indigo-700 shadow-sm scale-110 font-black";
                    } else if (isAnswered) {
                      pillClass = isCorrect
                        ? "bg-emerald-100 text-emerald-800 border-emerald-300 font-bold"
                        : "bg-red-100 text-red-800 border-red-300 font-bold";
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => {
                          sound.stopSpeaking();
                          setIsSpeaking(false);
                          sound.playChime();
                          setCurrentQuestionIndex(idx);
                        }}
                        className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg text-xs border flex items-center justify-center transition-all ${pillClass}`}
                      >
                        {soal.nomor}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Bottom Navigation Buttons */}
              <div className="flex items-center justify-between gap-3 pt-2">
                <button
                  onClick={handlePrevQuestion}
                  disabled={currentQuestionIndex === 0}
                  className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl border-2 font-bold text-xs sm:text-sm btn-chunky transition-all ${
                    currentQuestionIndex === 0
                      ? "bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed opacity-50"
                      : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50 shadow-[0_3px_0_0_#94a3b8]"
                  }`}
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Sebelumnya</span>
                </button>

                <div className="flex items-center gap-2">
                  {currentQuestionIndex < currentPaket.daftarSoal.length - 1 ? (
                    <button
                      onClick={handleNextQuestion}
                      className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white border-2 border-indigo-800 font-black text-xs sm:text-sm shadow-[0_3px_0_0_#3730a3] btn-chunky transition-all"
                    >
                      <span>Selanjutnya</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      onClick={handleFinishQuiz}
                      className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white border-2 border-emerald-700 font-black text-xs sm:text-sm shadow-[0_3px_0_0_#065f46] btn-chunky transition-all animate-pulse"
                    >
                      <Award className="w-4 h-4" />
                      <span>Selesai & Lihat Nilai</span>
                    </button>
                  )}
                </div>
              </div>

            </div>
          )}

          {/* ------------------------------------------------------------ */}
          {/* VIEW 4: HASIL SKOR & PIAGAM PRESTASI                         */}
          {/* ------------------------------------------------------------ */}
          {viewState === "result" && currentPaket && (
            <div className="space-y-6 text-center max-w-xl mx-auto py-2 animate-fade-in">
              
              {/* Trophy Header */}
              <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto rounded-3xl bg-gradient-to-br from-amber-400 via-yellow-400 to-orange-500 text-amber-950 border-4 border-amber-600 shadow-[0_8px_0_0_#b45309] flex items-center justify-center">
                <Award className="w-12 h-12 text-amber-950" />
              </div>

              <div>
                <span className="text-xs font-black uppercase tracking-wider text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
                  Evaluasi Mandiri Selesai
                </span>
                <h3 className="text-xl sm:text-3xl font-black font-display text-slate-800 mt-2">
                  Luar Biasa, Sahabat Cilik!
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 font-medium">
                  Kamu telah menyelesaikan 30 soal pilihan ganda {currentPaket.namaMapel}.
                </p>
              </div>

              {/* Big Score Card */}
              <div className="bg-white rounded-3xl p-6 border-4 border-indigo-300 shadow-[0_8px_0_0_#6366f1] space-y-4">
                <div className="flex items-center justify-center gap-2">
                  <span className="text-5xl sm:text-6xl font-black font-display text-indigo-600 tracking-tight">
                    {stats.scorePercent}
                  </span>
                  <span className="text-xl sm:text-2xl font-black text-slate-400">/ 100</span>
                </div>

                <div className="text-xs font-bold text-slate-600 bg-indigo-50 p-2.5 rounded-xl border border-indigo-200">
                  {stats.correct} soal dijawab dengan benar dari total {stats.total} soal
                </div>

                {/* Level Breakdown Grid */}
                <div className="grid grid-cols-3 gap-2.5 pt-2">
                  <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-center">
                    <span className="text-[10px] font-black uppercase text-emerald-600 block">Level Mudah</span>
                    <span className="text-base font-black text-emerald-800">{stats.mudahCorrect}/10</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-center">
                    <span className="text-[10px] font-black uppercase text-amber-600 block">Level Sedang</span>
                    <span className="text-base font-black text-amber-800">{stats.sedangCorrect}/10</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-purple-50 border border-purple-200 text-center">
                    <span className="text-[10px] font-black uppercase text-purple-600 block">Level HOTS</span>
                    <span className="text-base font-black text-purple-800">{stats.hotsCorrect}/10</span>
                  </div>
                </div>

                {/* Star Reward Banner */}
                <div className="flex items-center justify-center gap-2 p-3 rounded-2xl bg-gradient-to-r from-amber-400 to-yellow-400 text-amber-950 font-black text-sm border-2 border-amber-500 shadow-sm">
                  <Star className="w-5 h-5 fill-amber-900 text-amber-900" />
                  <span>+{Math.max(5, Math.floor(stats.correct / 2))} Bintang Prestasi Ditambahkan ke Profilmu!</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => {
                    sound.playChime();
                    setCurrentQuestionIndex(0);
                    setViewState("quiz");
                  }}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-white border-2 border-slate-300 text-slate-700 font-bold text-sm hover:bg-slate-50 btn-chunky shadow-[0_3px_0_0_#94a3b8]"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Review & Pembahasan Soal</span>
                </button>

                <button
                  onClick={() => {
                    sound.playChime();
                    setViewState("select-mapel");
                  }}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-sm border-2 border-indigo-800 btn-chunky shadow-[0_3px_0_0_#3730a3]"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Pilih Mata Pelajaran Lain</span>
                </button>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}
