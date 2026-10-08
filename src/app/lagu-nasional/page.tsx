"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import confetti from "canvas-confetti";
import {
  ArrowLeft,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Star,
  Music,
  Sparkles,
  BookOpen,
  Award,
  CheckCircle2,
  Sliders,
  GraduationCap,
  Info
} from "lucide-react";
import {
  melodyEngine,
  InstrumentPreset,
  MelodyNote,
  LaguNasional
} from "@/lib/nationalMelodyEngine";
import {
  DATA_LAGU_NASIONAL,
  PIANIKA_KEYS,
  PianikaKey
} from "@/data/laguNasionalData";
import {
  getStudentProfile,
  saveStudentProfile,
  StudentProfile,
  DEFAULT_PROFILE
} from "@/lib/storage";
import { sound } from "@/lib/sound";

export default function LaguNasionalPage() {
  const [profile, setProfile] = useState<StudentProfile>(DEFAULT_PROFILE);
  const [mounted, setMounted] = useState(false);

  // Status lagu aktif
  const [selectedSongId, setSelectedSongId] = useState<string>(DATA_LAGU_NASIONAL[0].id);
  const activeSong: LaguNasional =
    DATA_LAGU_NASIONAL.find((s) => s.id === selectedSongId) || DATA_LAGU_NASIONAL[0];

  // Status pemutaran synthesizer
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [activeNoteIndex, setActiveNoteIndex] = useState<number>(-1);
  const [currentNote, setCurrentNote] = useState<MelodyNote | null>(null);

  // Pengaturan instrumen & tempo
  const [instrument, setInstrument] = useState<InstrumentPreset>("pianika");
  const [tempoMultiplier, setTempoMultiplier] = useState<number>(1.0);

  // Riwayat lagu yang sudah diselesaikan (untuk reward & badge)
  const [completedSongIds, setCompletedSongIds] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<"karaoke" | "sejarah">("karaoke");

  // Keyboard Pianika yang sedang berbunyi (baik via lagu atau sentuhan manual)
  const [activeKeyNotAngka, setActiveKeyNotAngka] = useState<string | null>(null);

  // Inisialisasi profil siswa
  useEffect(() => {
    const stored = getStudentProfile();
    setProfile(stored);
    sound.setSpeechEnabled(stored.audioEnabled);
    setMounted(true);
  }, []);

  // Update engine lagu saat lagu aktif berubah
  useEffect(() => {
    melodyEngine.stop();
    melodyEngine.loadSong(activeSong);
    melodyEngine.setInstrument(instrument);
    melodyEngine.setTempoMultiplier(tempoMultiplier);
    setActiveNoteIndex(-1);
    setCurrentNote(null);
    setIsPlaying(false);
    setIsPaused(false);
  }, [activeSong, instrument, tempoMultiplier]);

  // Pasang listener event engine
  useEffect(() => {
    melodyEngine.onNoteChange = (idx, note) => {
      setActiveNoteIndex(idx);
      setCurrentNote(note);
      if (note && note.notAngka) {
        setActiveKeyNotAngka(note.notAngka);
      } else {
        setActiveKeyNotAngka(null);
      }
    };

    melodyEngine.onPlaybackStateChange = (playing, paused) => {
      setIsPlaying(playing);
      setIsPaused(paused);
    };

    melodyEngine.onComplete = () => {
      handleSongCompleted();
    };

    return () => {
      melodyEngine.stop();
    };
  }, [selectedSongId, profile, completedSongIds]);

  // Handler saat sebuah lagu selesai dimainkan
  const handleSongCompleted = useCallback(() => {
    sound.playCelebration();

    // Reward bintang hanya diberikan sekali per lagu dalam sesi
    if (!completedSongIds.includes(activeSong.id)) {
      const updated = saveStudentProfile({ stars: profile.stars + 30 });
      setProfile(updated);
      setCompletedSongIds((prev) => [...prev, activeSong.id]);

      if (profile.audioEnabled) {
        sound.speak(
          `Hebat sekali! Kamu berhasil menyelesaikan melodi lagu ${activeSong.judul}. Kamu mendapatkan 30 bintang prestasi!`
        );
      }
    } else {
      if (profile.audioEnabled) {
        sound.speak(`Lagu ${activeSong.judul} selesai dimainkan.`);
      }
    }

    if (!profile.liteMode) {
      confetti({
        particleCount: 55,
        spread: 75,
        origin: { y: 0.6 },
      });
    }
  }, [activeSong, completedSongIds, profile]);

  // Kontrol putar
  const handleTogglePlay = () => {
    sound.playChime();
    if (isPlaying) {
      melodyEngine.pause();
    } else {
      melodyEngine.play();
    }
  };

  // Kontrol replay
  const handleReplay = () => {
    sound.playChime();
    melodyEngine.replay();
  };

  // Kontrol ganti instrumen
  const handleSelectInstrument = (inst: InstrumentPreset) => {
    sound.playChime();
    setInstrument(inst);
    melodyEngine.setInstrument(inst);
    if (profile.audioEnabled) {
      sound.speak(
        inst === "pianika"
          ? "Instrumen Pianika Sekolah diaktifkan."
          : "Instrumen Bel Musik Glockenspiel diaktifkan."
      );
    }
  };

  // Kontrol ganti tempo
  const handleSelectTempo = (mult: number) => {
    sound.playChime();
    setTempoMultiplier(mult);
    melodyEngine.setTempoMultiplier(mult);
    if (profile.audioEnabled) {
      sound.speak(
        mult === 1.0 ? "Tempo normal satu kali." : "Mode belajar tempo pelan nol koma tujuh lima kali."
      );
    }
  };

  // Mainkan tuts pianika manual saat ditekan anak
  const handleKeyClick = (key: PianikaKey) => {
    setActiveKeyNotAngka(key.notAngka);
    melodyEngine.playSingleNote(key.nadaHz, 0.45);
    setTimeout(() => {
      setActiveKeyNotAngka((prev) => (prev === key.notAngka ? null : prev));
    }, 450);
  };

  // Narasi suara sejarah lagu
  const handleSpeakHistory = () => {
    sound.playChime();
    if (profile.audioEnabled) {
      sound.speak(
        `Kisah Lagu ${activeSong.judul}, ciptaan ${activeSong.pencipta}. ${activeSong.sejarah} Nilai karakter Profil Pelajar Pancasila: ${activeSong.nilaiKarakter}`
      );
    }
  };

  if (!mounted) return null;

  const totalNotes = activeSong.melody.length;
  const progressPercent =
    totalNotes > 0 && activeNoteIndex >= 0
      ? Math.min(100, Math.round(((activeNoteIndex + 1) / totalNotes) * 100))
      : 0;

  return (
    <div
      className={`min-h-screen w-full bg-gradient-to-b from-rose-50/70 via-amber-50/40 to-slate-50 text-slate-800 flex flex-col select-none overflow-x-hidden ${
        profile.liteMode ? "lite-high-contrast" : ""
      }`}
    >
      <div className="w-full max-w-5xl mx-auto flex-1 flex flex-col p-2.5 sm:p-5 my-0 sm:my-3">
        {/* ========================================================================= */}
        {/* HEADER BAR EDUKASI: KEMBALI, JUDUL, PRESET, TEMPO, BINTANG               */}
        {/* ========================================================================= */}
        <header className="bg-white rounded-3xl border-4 border-rose-300 shadow-md p-3 sm:p-4 mb-3 sm:mb-4 shrink-0">
          <div className="flex flex-wrap items-center justify-between gap-2.5">
            {/* Navigasi Kiri & Judul */}
            <div className="flex items-center gap-2.5 sm:gap-3">
              <Link
                href="/"
                onClick={() => {
                  melodyEngine.stop();
                  sound.stopSpeaking();
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 sm:py-2 rounded-2xl bg-white hover:bg-slate-100 text-slate-800 font-black text-xs sm:text-sm border-2 border-slate-300 shadow-[0_2px_0_0_#cbd5e1] btn-chunky shrink-0"
                title="Kembali ke Beranda"
              >
                <ArrowLeft className="w-4 h-4 text-rose-600" />
                <span className="hidden sm:inline">Beranda</span>
              </Link>

              <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-2xl bg-rose-500 text-white flex items-center justify-center border-2 border-rose-600 shadow-sm shrink-0">
                <Music className="w-5 h-5 sm:w-6 sm:h-6 text-amber-200" />
              </div>

              <div>
                <div className="flex items-center gap-1.5">
                  <h1 className="text-base sm:text-xl font-black font-display text-slate-900 leading-tight">
                    Harmoni Nasional
                  </h1>
                  <span className="text-[10px] font-black bg-rose-100 text-rose-800 px-2 py-0.5 rounded-full border border-rose-300 hidden sm:inline-block">
                    Web Audio Synthesizer 0 KB
                  </span>
                </div>
                <span className="text-[11px] sm:text-xs font-bold text-rose-700 block leading-none">
                  Melodi Lagu Wajib & Not Angka Diatonis SD
                </span>
              </div>
            </div>

            {/* Opsi Kanan: Preset Suara, Tempo, & Bintang */}
            <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
              {/* Preset Instrumen Switcher */}
              <div className="bg-slate-100 p-1 rounded-2xl border border-slate-300 flex items-center gap-1">
                <button
                  onClick={() => handleSelectInstrument("pianika")}
                  className={`px-2.5 py-1 rounded-xl text-[11px] sm:text-xs font-black transition-all btn-chunky ${
                    instrument === "pianika"
                      ? "bg-rose-500 text-white shadow-sm border border-rose-600"
                      : "text-slate-700 hover:bg-slate-200"
                  }`}
                  title="Preset Suara Pianika Sekolah (Hangat & Lembut)"
                >
                  Pianika
                </button>
                <button
                  onClick={() => handleSelectInstrument("glockenspiel")}
                  className={`px-2.5 py-1 rounded-xl text-[11px] sm:text-xs font-black transition-all btn-chunky ${
                    instrument === "glockenspiel"
                      ? "bg-amber-500 text-slate-950 shadow-sm border border-amber-600"
                      : "text-slate-700 hover:bg-slate-200"
                  }`}
                  title="Preset Suara Bel Musik Glockenspiel (Denting Ceria)"
                >
                  Bel Musik
                </button>
              </div>

              {/* Tempo Switcher */}
              <div className="bg-slate-100 p-1 rounded-2xl border border-slate-300 flex items-center gap-1">
                <button
                  onClick={() => handleSelectTempo(1.0)}
                  className={`px-2 py-1 rounded-xl text-[10px] sm:text-xs font-black transition-all btn-chunky ${
                    tempoMultiplier === 1.0
                      ? "bg-slate-800 text-white shadow-sm"
                      : "text-slate-600 hover:bg-slate-200"
                  }`}
                  title="Tempo Normal (1.0x)"
                >
                  1.0x
                </button>
                <button
                  onClick={() => handleSelectTempo(0.75)}
                  className={`px-2 py-1 rounded-xl text-[10px] sm:text-xs font-black transition-all btn-chunky ${
                    tempoMultiplier === 0.75
                      ? "bg-emerald-600 text-white shadow-sm"
                      : "text-slate-600 hover:bg-slate-200"
                  }`}
                  title="Mode Belajar Pelan (0.75x)"
                >
                  0.75x Belajar
                </button>
              </div>

              {/* Stars Badge */}
              <div className="flex items-center gap-1 bg-amber-100 px-2.5 py-1.5 rounded-2xl border-2 border-amber-300 text-amber-900 font-black text-xs sm:text-sm shadow-sm">
                <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-amber-500 text-amber-500" />
                <span>{profile.stars}</span>
              </div>
            </div>
          </div>
        </header>

        {/* ========================================================================= */}
        {/* SELECTOR DRAWER: 8 LAGU WAJIB NASIONAL                                    */}
        {/* ========================================================================= */}
        <section className="mb-3 sm:mb-4 shrink-0 overflow-x-auto pb-1 no-scrollbar">
          <div className="flex items-center gap-2 min-w-max">
            {DATA_LAGU_NASIONAL.map((song) => {
              const isSelected = song.id === selectedSongId;
              const isDone = completedSongIds.includes(song.id);
              return (
                <button
                  key={song.id}
                  onClick={() => {
                    sound.playChime();
                    setSelectedSongId(song.id);
                  }}
                  className={`px-3 py-2 rounded-2xl border-2 font-black text-xs sm:text-sm flex items-center gap-2 transition-all btn-chunky ${
                    isSelected
                      ? "bg-rose-500 text-white border-rose-600 shadow-[0_3px_0_0_#9f1239]"
                      : "bg-white text-slate-700 border-slate-300 hover:bg-rose-50 hover:border-rose-300"
                  }`}
                >
                  <Music className={`w-3.5 h-3.5 ${isSelected ? "text-amber-200" : "text-rose-500"}`} />
                  <span>{song.judul}</span>
                  {isDone && (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 fill-emerald-100" />
                  )}
                </button>
              );
            })}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* PANGGUNG UTAMA: KARAOKE, MINI PIANIKA, & KONTROL MUSIK                   */}
        {/* ========================================================================= */}
        <main className="flex-1 flex flex-col gap-3 sm:gap-4">
          {/* Card Wadah Melodi */}
          <div className="bg-white rounded-3xl border-4 border-rose-300 shadow-xl p-4 sm:p-6 flex flex-col justify-between">
            {/* Header Informasi Lagu yang Sedang Dipilih */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b-2 border-slate-100 mb-3 sm:mb-4">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg sm:text-2xl font-black font-display text-slate-900">
                    {activeSong.judul}
                  </h2>
                  <span className="text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300 px-2 py-0.5 rounded-full">
                    Birama {activeSong.birama}
                  </span>
                </div>
                <p className="text-xs sm:text-sm font-bold text-slate-500">
                  Ciptaan: <span className="text-rose-700">{activeSong.pencipta}</span>
                </p>
              </div>

              {/* Tab Switcher: Karaoke vs Sejarah */}
              <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-2xl border border-slate-300">
                <button
                  onClick={() => {
                    sound.playChime();
                    setActiveTab("karaoke");
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all btn-chunky flex items-center gap-1.5 ${
                    activeTab === "karaoke"
                      ? "bg-rose-500 text-white shadow-sm"
                      : "text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  <Music className="w-3.5 h-3.5" />
                  <span>Karaoke Not Angka</span>
                </button>

                <button
                  onClick={() => {
                    sound.playChime();
                    setActiveTab("sejarah");
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all btn-chunky flex items-center gap-1.5 ${
                    activeTab === "sejarah"
                      ? "bg-amber-500 text-slate-950 shadow-sm"
                      : "text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Kisah Sejarah</span>
                </button>
              </div>
            </div>

            {/* TAB 1: PANGGUNG KARAOKE LIRIK & NOT ANGKA */}
            {activeTab === "karaoke" && (
              <div className="space-y-4 sm:space-y-5">
                {/* Layar Karaoke Dinamis */}
                <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 rounded-3xl p-4 sm:p-6 border-4 border-slate-800 shadow-inner text-center min-h-[140px] sm:min-h-[160px] flex flex-col justify-center items-center relative overflow-hidden">
                  {/* Subtle Sound Wave Line di Belakang */}
                  <div className="absolute inset-0 opacity-10 flex items-center justify-around pointer-events-none">
                    <div className={`w-1.5 bg-rose-400 rounded-full h-16 ${isPlaying ? "animate-pulse" : ""}`} />
                    <div className={`w-1.5 bg-amber-400 rounded-full h-24 ${isPlaying ? "animate-pulse" : ""}`} />
                    <div className={`w-1.5 bg-rose-400 rounded-full h-32 ${isPlaying ? "animate-pulse" : ""}`} />
                    <div className={`w-1.5 bg-amber-400 rounded-full h-20 ${isPlaying ? "animate-pulse" : ""}`} />
                    <div className={`w-1.5 bg-rose-400 rounded-full h-14 ${isPlaying ? "animate-pulse" : ""}`} />
                  </div>

                  {/* Status Banner Nada yang Sedang Berbunyi */}
                  <div className="mb-2">
                    {currentNote && currentNote.notAngka && currentNote.nadaHz > 0 ? (
                      <span className="inline-flex items-center gap-1.5 bg-rose-500/90 text-white px-3 py-1 rounded-full text-xs font-black tracking-wider uppercase border border-rose-400 shadow-lg animate-bounce">
                        <Sparkles className="w-3 h-3 text-yellow-300" />
                        Nada: {currentNote.notAngka} ({Math.round(currentNote.nadaHz)} Hz)
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 bg-slate-800 text-slate-400 px-3 py-1 rounded-full text-xs font-bold border border-slate-700">
                        {isPlaying ? "Bersiap nada berikutnya..." : "Tekan tombol Putar untuk mulai bernyanyi"}
                      </span>
                    )}
                  </div>

                  {/* Aliran Suku Kata Karaoke yang Menyala Real-Time */}
                  <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-2 max-w-2xl px-2">
                    {activeSong.melody.map((m, idx) => {
                      if (!m.lirikSukuKata) return null;
                      const isCurrent = idx === activeNoteIndex;
                      const isPast = idx < activeNoteIndex;

                      return (
                        <span
                          key={idx}
                          className={`transition-all duration-150 inline-block rounded-xl px-1.5 py-0.5 sm:px-2 sm:py-1 ${
                            isCurrent
                              ? "bg-gradient-to-r from-amber-400 to-yellow-300 text-slate-950 font-black text-lg sm:text-2xl scale-125 shadow-lg ring-4 ring-amber-300/60 z-10 animate-pulse"
                              : isPast
                              ? "text-emerald-400 font-bold text-sm sm:text-lg opacity-85"
                              : "text-slate-400 font-medium text-xs sm:text-base opacity-45"
                          }`}
                        >
                          <span className="block text-[10px] sm:text-xs text-center font-mono opacity-80">
                            {m.notAngka}
                          </span>
                          {m.lirikSukuKata}
                        </span>
                      );
                    })}
                  </div>
                </div>

                {/* Papan Not Angka / Mini Pianika Visual Edukatif */}
                <div>
                  <div className="flex items-center justify-between mb-2 px-1">
                    <span className="text-xs font-black uppercase text-slate-600 tracking-wider flex items-center gap-1.5">
                      <GraduationCap className="w-4 h-4 text-rose-600" />
                      Papan Not Angka Diatonis (Sentuh Tuts untuk Bunyi):
                    </span>
                    <span className="text-[11px] font-bold text-slate-400 hidden sm:inline">
                      1=Do, 2=Re, 3=Mi, 4=Fa, 5=Sol, 6=La, 7=Si, 1̇=Do Tinggi
                    </span>
                  </div>

                  {/* Tuts Pianika Visual */}
                  <div className="bg-slate-900 rounded-3xl p-3 sm:p-4 border-4 border-slate-800 shadow-xl overflow-x-auto no-scrollbar">
                    <div className="flex items-stretch justify-center gap-1 sm:gap-2 min-w-max">
                      {PIANIKA_KEYS.map((k) => {
                        const isActive = activeKeyNotAngka === k.notAngka;
                        return (
                          <button
                            key={k.notAngka}
                            onClick={() => handleKeyClick(k)}
                            className={`flex flex-col justify-between items-center w-10 sm:w-14 h-28 sm:h-36 rounded-2xl p-1.5 sm:p-2 border-3 transition-all cursor-pointer btn-chunky active:translate-y-1 ${
                              isActive
                                ? "bg-gradient-to-b from-amber-300 to-yellow-400 text-slate-950 border-amber-500 shadow-[0_6px_0_0_#ca8a04] -translate-y-1 scale-105 z-10"
                                : "bg-white text-slate-800 border-slate-300 hover:bg-slate-50 shadow-[0_4px_0_0_#94a3b8]"
                            }`}
                            title={`Tuts ${k.labelSolfegio} (Not ${k.notAngka})`}
                          >
                            <span className="text-[10px] sm:text-xs font-black px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200">
                              {k.notAngka}
                            </span>
                            <div className="w-2 h-2 rounded-full bg-slate-300 mb-1" />
                            <span className="text-xs sm:text-sm font-black text-slate-900">
                              {k.labelSolfegio}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Progress Bar Lagu & Counter */}
                <div className="bg-slate-100 rounded-2xl p-2.5 sm:p-3 border border-slate-200">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-600 mb-1.5">
                    <span className="flex items-center gap-1">
                      <Music className="w-3.5 h-3.5 text-rose-600" />
                      Progres Melodi Lagu:
                    </span>
                    <span className="font-mono font-black text-rose-700">
                      {activeNoteIndex >= 0 ? activeNoteIndex + 1 : 0} / {totalNotes} Nada ({progressPercent}%)
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden border border-slate-300">
                    <div
                      className="bg-gradient-to-r from-rose-500 via-amber-400 to-yellow-400 h-full transition-all duration-200 rounded-full"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>

                {/* Panel Kontrol Pemutaran: Putar, Jeda, Ulangi */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <div className="flex items-center gap-2.5 sm:gap-3 flex-1">
                    <button
                      onClick={handleTogglePlay}
                      className={`flex-1 sm:flex-none sm:min-w-[180px] py-3 sm:py-3.5 px-5 rounded-2xl font-black text-sm sm:text-base border-3 flex items-center justify-center gap-2 btn-chunky transition-all ${
                        isPlaying
                          ? "bg-amber-400 text-amber-950 border-amber-500 shadow-[0_4px_0_0_#b45309]"
                          : "bg-rose-500 text-white border-rose-600 shadow-[0_4px_0_0_#9f1239]"
                      }`}
                    >
                      {isPlaying ? (
                        <>
                          <Pause className="w-5 h-5 fill-amber-950 text-amber-950" />
                          <span>Jeda Melodi</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-5 h-5 fill-white text-white" />
                          <span>{isPaused ? "Lanjutkan" : "Putar Lagu"}</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={handleReplay}
                      className="py-3 sm:py-3.5 px-4 rounded-2xl font-black text-sm border-3 bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300 shadow-[0_3px_0_0_#94a3b8] flex items-center justify-center gap-1.5 btn-chunky"
                      title="Ulangi Lagu dari Awal"
                    >
                      <RotateCcw className="w-4 h-4 text-slate-700" />
                      <span className="hidden sm:inline">Ulangi</span>
                    </button>
                  </div>

                  {/* Reward Badge Indikator */}
                  <div className="flex items-center gap-2 bg-gradient-to-r from-amber-50 to-yellow-50 px-3.5 py-2 rounded-2xl border-2 border-amber-300 text-amber-950 font-black text-xs sm:text-sm shadow-sm">
                    <Award className="w-4 h-4 text-amber-600" />
                    <span>Reward: +30 Bintang Tiap Lagu Selesai</span>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: KISAH SEJARAH & NILAI KARAKTER PROFIL PELAJAR PANCASILA */}
            {activeTab === "sejarah" && (
              <div className="space-y-4">
                {/* Banner Kisah Sejarah */}
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-4 sm:p-5 border-2 border-amber-300 shadow-sm space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-2xl bg-amber-400 text-amber-950 flex items-center justify-center border border-amber-500 shrink-0 font-black">
                        <BookOpen className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-black text-base sm:text-lg text-slate-900 leading-tight">
                          Sejarah Lagu {activeSong.judul}
                        </h3>
                        <p className="text-xs font-bold text-slate-500">
                          Karya Komponis: {activeSong.pencipta}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={handleSpeakHistory}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-amber-100 text-slate-800 text-xs font-black border-2 border-amber-300 shadow-sm btn-chunky shrink-0"
                      title="Dengarkan cerita sejarah dibacakan Tobi"
                    >
                      <Volume2 className="w-4 h-4 text-amber-700" />
                      <span className="hidden sm:inline">Dengarkan Tobi</span>
                    </button>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                    {activeSong.sejarah}
                  </p>
                </div>

                {/* Kotak Nilai Karakter Profil Pelajar Pancasila */}
                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-4 sm:p-5 border-2 border-emerald-300 shadow-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-emerald-200 text-emerald-900 flex items-center justify-center shrink-0 mt-0.5">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-black text-sm text-emerald-950 mb-1">
                        Pesan Moral & Profil Pelajar Pancasila
                      </h4>
                      <p className="text-xs text-slate-700 leading-relaxed font-medium">
                        {activeSong.nilaiKarakter}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Teks Lirik Lengkap Per Bait */}
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-2">
                  <h4 className="font-black text-xs uppercase text-slate-500 tracking-wider mb-2">
                    Teks Lirik Lengkap Bait per Bait:
                  </h4>
                  {activeSong.stanzas.map((stanza, sIdx) => (
                    <div key={sIdx} className="bg-white p-3 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold text-slate-800">
                      <span className="text-[10px] font-black text-rose-600 block mb-0.5">
                        Bait {sIdx + 1}
                      </span>
                      {stanza}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
