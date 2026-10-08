"use client";

import React, { useState, useEffect, useRef } from "react";
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
  Tv,
  Headphones,
  Sliders
} from "lucide-react";
import {
  DAFTAR_12_LAGU_NASIONAL,
  YOUTUBE_VIDEO_ID,
  VideoLaguNasional
} from "@/data/videoLaguNasionalData";
import {
  DATA_LAGU_NASIONAL,
  PIANIKA_KEYS,
  PianikaKey
} from "@/data/laguNasionalData";
import {
  melodyEngine,
  InstrumentPreset,
  MelodyNote,
  LaguNasional
} from "@/lib/nationalMelodyEngine";
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

  // Mode Tampilan: Panggung Video YouTube (Default) ATAU Lab Sintesis Melodi
  const [activeMode, setActiveMode] = useState<"video" | "synthesizer">("video");

  // --- STATE PANGGUNG VIDEO YOUTUBE ---
  const [activeSongIndex, setActiveSongIndex] = useState<number>(0);
  const activeVideoSong: VideoLaguNasional = DAFTAR_12_LAGU_NASIONAL[activeSongIndex];

  // Tab Sisi Kanan: 'rak' (Daftar 12 Lagu), 'lirik' (Lirik Lagu), 'makna' (Makna & Sejarah)
  const [rightPanelTab, setRightPanelTab] = useState<"rak" | "lirik" | "makna">("rak");

  // Lagu-lagu yang sudah diklaim bintangnya
  const [claimedSongs, setClaimedSongs] = useState<string[]>([]);
  const [isNarrating, setIsNarrating] = useState<boolean>(false);

  // --- STATE LAB SINTESIS MELODI (WEB AUDIO) ---
  const [synthSongId, setSynthSongId] = useState<string>(DATA_LAGU_NASIONAL[0].id);
  const activeSynthSong: LaguNasional =
    DATA_LAGU_NASIONAL.find((s) => s.id === synthSongId) || DATA_LAGU_NASIONAL[0];
  const [isPlayingSynth, setIsPlayingSynth] = useState<boolean>(false);
  const [isPausedSynth, setIsPausedSynth] = useState<boolean>(false);
  const [activeNoteIndex, setActiveNoteIndex] = useState<number>(-1);
  const [instrument, setInstrument] = useState<InstrumentPreset>("pianika");
  const [tempoMultiplier, setTempoMultiplier] = useState<number>(1.0);
  const [activeKeyNotAngka, setActiveKeyNotAngka] = useState<string | null>(null);

  // Inisialisasi Profil Siswa & Local Storage
  useEffect(() => {
    const stored = getStudentProfile();
    setProfile(stored);
    sound.setSpeechEnabled(stored.audioEnabled);

    // Ambil riwayat klaim bintang lagu nasional dari localStorage jika ada
    try {
      const savedClaimed = localStorage.getItem("tobiquest_claimed_national_songs");
      if (savedClaimed) {
        setClaimedSongs(JSON.parse(savedClaimed));
      }
    } catch {
      // fallback safe
    }

    setMounted(true);
  }, []);

  // Update engine lagu saat berpindah ke mode synthesizer
  useEffect(() => {
    if (activeMode === "synthesizer") {
      melodyEngine.stop();
      melodyEngine.loadSong(activeSynthSong);
      melodyEngine.setInstrument(instrument);
      melodyEngine.setTempoMultiplier(tempoMultiplier);
      setActiveNoteIndex(-1);
      setIsPlayingSynth(false);
      setIsPausedSynth(false);
    }
  }, [activeMode, activeSynthSong, instrument, tempoMultiplier]);

  // Pasang listener event engine Web Audio
  useEffect(() => {
    melodyEngine.onNoteChange = (idx, note) => {
      setActiveNoteIndex(idx);
      if (note && note.notAngka) {
        setActiveKeyNotAngka(note.notAngka);
      } else {
        setActiveKeyNotAngka(null);
      }
    };

    melodyEngine.onPlaybackStateChange = (playing, paused) => {
      setIsPlayingSynth(playing);
      setIsPausedSynth(paused);
      if (!playing) {
        setActiveKeyNotAngka(null);
      }
    };

    melodyEngine.onComplete = () => {
      setIsPlayingSynth(false);
      setIsPausedSynth(false);
      setActiveNoteIndex(-1);
      setActiveKeyNotAngka(null);
      sound.playVictory();
    };

    return () => {
      melodyEngine.stop();
    };
  }, []);

  // Handler Ganti Lagu Video (Chapter Jumper)
  const handleSelectVideoSong = (index: number) => {
    sound.playChime();
    setActiveSongIndex(index);
    // Berhenti berbicara jika Tobi sedang bernarasi
    if (isNarrating) {
      sound.stopSpeaking();
      setIsNarrating(false);
    }
  };

  // Handler Klaim Bintang Lagu (+25 Bintang)
  const handleClaimStars = () => {
    if (claimedSongs.includes(activeVideoSong.id)) return;

    const newStars = profile.stars + 25;
    const updatedProfile = saveStudentProfile({ stars: newStars });
    setProfile(updatedProfile);

    const updatedClaimed = [...claimedSongs, activeVideoSong.id];
    setClaimedSongs(updatedClaimed);
    try {
      localStorage.setItem("tobiquest_claimed_national_songs", JSON.stringify(updatedClaimed));
    } catch {
      // fallback
    }

    // Suara selebrasi & Tobi Narator
    sound.playVictory();
    sound.speak(
      `Hebat sekali! Kamu berhasil menyanyikan lagu ${activeVideoSong.title} dan mendapatkan 25 bintang prestasi!`
    );

    // Efek Konfeti Ceria (hanya di mode reguler, bukan liteMode)
    if (!profile.liteMode) {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.65 },
        colors: ["#ef4444", "#ffffff", "#f59e0b", "#3b82f6"],
      });
    }
  };

  // Handler Narasi Makna Lagu oleh Tobi
  const toggleNarration = () => {
    if (isNarrating) {
      sound.stopSpeaking();
      setIsNarrating(false);
    } else {
      setIsNarrating(true);
      const textToSpeak = `Lagu ${activeVideoSong.title}, ciptaan ${activeVideoSong.composer}. ${activeVideoSong.meaning}. Pesan karakter: ${activeVideoSong.characterProfile}`;
      sound.speak(textToSpeak);
    }
  };

  // Handler Sentuhan Tuts Pianika Manual (Companion)
  const handleTapPianikaKey = (key: PianikaKey) => {
    melodyEngine.playSingleNote(key.nadaHz, 0.4);
    setActiveKeyNotAngka(key.notAngka);
    setTimeout(() => {
      setActiveKeyNotAngka(null);
    }, 350);
  };

  // Handler Kontrol Pemutaran Web Audio Synthesizer
  const handlePlaySynth = () => {
    melodyEngine.play();
  };

  const handlePauseSynth = () => {
    melodyEngine.pause();
  };

  const handleReplaySynth = () => {
    melodyEngine.replay();
  };

  // URL Sematan YouTube resmi dengan parameter jumping waktu
  const youtubeEmbedUrl = `https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?start=${activeVideoSong.startTime}&autoplay=1&rel=0`;

  return (
    <div
      className={`min-h-screen w-full flex flex-col bg-amber-50/40 text-slate-800 ${
        profile.liteMode ? "lite-high-contrast" : ""
      }`}
    >
      {/* 1. Header Bar Responsif & Sticky */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b-4 border-amber-200/80 shadow-sm py-2 sm:py-3.5 px-3 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          {/* Tombol Kembali ke Beranda */}
          <Link
            href="/"
            onClick={() => sound.stopSpeaking()}
            className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl bg-amber-100 hover:bg-amber-200 text-amber-950 font-extrabold text-xs sm:text-sm border-2 border-amber-300 shadow-[0_2px_0_0_#d97706] btn-chunky shrink-0"
            title="Kembali ke Beranda TobiQuest"
          >
            <ArrowLeft className="w-4 h-4 text-amber-900" />
            <span className="hidden sm:inline">Kembali ke Beranda</span>
            <span className="sm:hidden">Beranda</span>
          </Link>

          {/* Judul Modul */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-1.5 sm:gap-2">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-red-600 animate-ping sm:hidden" />
              <Music className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />
              <h1 className="text-sm sm:text-xl md:text-2xl font-black font-display text-slate-800 tracking-tight">
                Panggung Lagu Nasional
              </h1>
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500 hidden sm:inline" />
            </div>
            <p className="text-[10px] sm:text-xs text-slate-500 font-bold hidden sm:block">
              12 Lagu Wajib & Perjuangan Anak Indonesia (MJP Advertising Channel)
            </p>
          </div>

          {/* Pengukur Bintang Siswa & Mode Switcher */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Mode Switcher: Video YouTube vs Lab Pianika */}
            <div className="hidden md:flex items-center bg-slate-100 p-1 rounded-2xl border-2 border-slate-300">
              <button
                onClick={() => {
                  sound.playChime();
                  melodyEngine.stop();
                  setActiveMode("video");
                }}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-black transition-all ${
                  activeMode === "video"
                    ? "bg-red-600 text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Tv className="w-3.5 h-3.5" />
                <span>Panggung Video</span>
              </button>
              <button
                onClick={() => {
                  sound.playChime();
                  setActiveMode("synthesizer");
                }}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-black transition-all ${
                  activeMode === "synthesizer"
                    ? "bg-purple-600 text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Headphones className="w-3.5 h-3.5" />
                <span>Lab Pianika (0 KB)</span>
              </button>
            </div>

            {/* Bintang Counter */}
            <div
              className="flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 rounded-xl sm:rounded-2xl bg-amber-400 text-amber-950 font-black text-xs sm:text-sm border-2 border-amber-500 shadow-[0_2px_0_0_#b45309]"
              title="Koleksi Bintang Prestasi"
            >
              <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-amber-950 text-amber-950" />
              <span className="font-display text-xs sm:text-base">{profile.stars}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Switcher Tab Mode di Layar HP (Mobile) */}
      <div className="md:hidden bg-amber-100/70 border-b border-amber-200 px-3 py-2 flex items-center justify-center gap-2">
        <button
          onClick={() => {
            sound.playChime();
            melodyEngine.stop();
            setActiveMode("video");
          }}
          className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-xl text-xs font-black border transition-all ${
            activeMode === "video"
              ? "bg-red-600 text-white border-red-700 shadow-sm"
              : "bg-white text-slate-700 border-slate-300"
          }`}
        >
          <Tv className="w-3.5 h-3.5" />
          <span>Panggung Video</span>
        </button>
        <button
          onClick={() => {
            sound.playChime();
            setActiveMode("synthesizer");
          }}
          className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-xl text-xs font-black border transition-all ${
            activeMode === "synthesizer"
              ? "bg-purple-600 text-white border-purple-700 shadow-sm"
              : "bg-white text-slate-700 border-slate-300"
          }`}
        >
          <Headphones className="w-3.5 h-3.5" />
          <span>Lab Pianika</span>
        </button>
      </div>

      {/* Konten Utama */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6">
        {/* =========================================================================
            MODE 1: PANGGUNG VIDEO YOUTUBE RESMI & CHAPTER JUMPER 12 LAGU
            ========================================================================= */}
        {activeMode === "video" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start">
            {/* SISI KIRI (Layar Video YouTube Embed & Companion Pianika) - 7 Kolom */}
            <div className="lg:col-span-7 space-y-4">
              {/* 1. Container Pemutar Video YouTube 16:9 Sesuai Spesifikasi */}
              <div className="relative aspect-video w-full rounded-2xl sm:rounded-3xl overflow-hidden border-4 border-amber-400 shadow-xl bg-slate-900 group">
                <iframe
                  key={`${activeVideoSong.id}-${activeVideoSong.startTime}`}
                  src={youtubeEmbedUrl}
                  title={`Panggung Lagu Nasional - ${activeVideoSong.title}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              </div>

              {/* 2. Kartu Status Lagu Aktif & Tombol Klaim Bintang */}
              <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-5 border-3 sm:border-4 border-amber-200 shadow-md">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-black bg-red-600 text-white tracking-wider">
                        LAGU #{activeVideoSong.nomor}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-black bg-amber-100 text-amber-900 border border-amber-300">
                        Mulai {activeVideoSong.timestampText}
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700">
                        {activeVideoSong.badge}
                      </span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-black font-display text-slate-800">
                      {activeVideoSong.title}
                    </h2>
                    <p className="text-xs sm:text-sm font-bold text-slate-500">
                      Karya Cipta: {activeVideoSong.composer}
                    </p>
                  </div>

                  {/* Tombol Klaim Bintang (+25 Bintang) */}
                  <button
                    onClick={handleClaimStars}
                    disabled={claimedSongs.includes(activeVideoSong.id)}
                    className={`flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl font-black text-xs sm:text-sm border-2 transition-all btn-chunky shrink-0 ${
                      claimedSongs.includes(activeVideoSong.id)
                        ? "bg-emerald-100 text-emerald-800 border-emerald-300 cursor-default"
                        : "bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 text-amber-950 border-amber-500 shadow-[0_3px_0_0_#b45309] hover:brightness-105 active:translate-y-1"
                    }`}
                    title="Klaim 25 Bintang setelah bernyanyi bersama Tobi"
                  >
                    {claimedSongs.includes(activeVideoSong.id) ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                        <span>Bintang Sudah Diklaim (+25)</span>
                      </>
                    ) : (
                      <>
                        <Star className="w-4 h-4 fill-amber-950 text-amber-950 animate-bounce" />
                        <span>Klaim +25 Bintang</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* 3. Keyboard Mini-Pianika Companion (Anak bisa ikut mengetuk tuts saat mendengarkan video!) */}
              <div className="bg-white rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 border-3 sm:border-4 border-amber-200 shadow-md">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Music className="w-4 h-4 text-rose-500" />
                    <h3 className="text-xs sm:text-sm font-black text-slate-800 uppercase tracking-wider">
                      Keyboard Pianika Latihan (Sentuh & Bunyikan)
                    </h3>
                  </div>
                  <span className="text-[10px] sm:text-xs font-bold text-slate-500">
                    Diatonis C Mayor
                  </span>
                </div>

                {/* Tuts Pianika Responsif */}
                <div className="flex items-center justify-center gap-1 sm:gap-1.5 overflow-x-auto py-1">
                  {PIANIKA_KEYS.map((key) => {
                    const isKeyActive = activeKeyNotAngka === key.notAngka;
                    return (
                      <button
                        key={key.notAngka}
                        onClick={() => handleTapPianikaKey(key)}
                        className={`flex-1 min-w-[30px] sm:min-w-[42px] max-w-[56px] h-20 sm:h-28 rounded-b-xl sm:rounded-b-2xl border-2 sm:border-3 flex flex-col justify-end items-center pb-2 transition-all cursor-pointer select-none active:scale-95 ${
                          isKeyActive
                            ? "bg-amber-300 border-amber-500 shadow-[0_2px_0_0_#b45309] translate-y-1"
                            : "bg-white hover:bg-amber-50 border-slate-300 shadow-[0_3px_0_0_#94a3b8]"
                        }`}
                        title={`Tekan tuts ${key.labelSolfegio} (${key.notAngka})`}
                      >
                        <span className="font-extrabold text-[10px] sm:text-xs text-slate-500">
                          {key.labelSolfegio}
                        </span>
                        <span className="font-display font-black text-sm sm:text-lg text-slate-800">
                          {key.notAngka}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* SISI KANAN (Rak 12 Lagu, Lirik, dan Makna Sejarah) - 5 Kolom */}
            <div className="lg:col-span-5 space-y-4">
              {/* Tab Selector Sisi Kanan: Rak Lagu / Lirik / Makna */}
              <div className="bg-amber-100/80 p-1.5 rounded-2xl border-2 border-amber-300 flex items-center gap-1">
                <button
                  onClick={() => {
                    sound.playPop();
                    setRightPanelTab("rak");
                  }}
                  className={`flex-1 py-2 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-1.5 ${
                    rightPanelTab === "rak"
                      ? "bg-white text-amber-950 shadow-sm border border-amber-300"
                      : "text-amber-900/70 hover:text-amber-950"
                  }`}
                >
                  <Music className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-600" />
                  <span>Daftar 12 Lagu</span>
                </button>
                <button
                  onClick={() => {
                    sound.playPop();
                    setRightPanelTab("lirik");
                  }}
                  className={`flex-1 py-2 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-1.5 ${
                    rightPanelTab === "lirik"
                      ? "bg-white text-amber-950 shadow-sm border border-amber-300"
                      : "text-amber-900/70 hover:text-amber-950"
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600" />
                  <span>Teks Lirik</span>
                </button>
                <button
                  onClick={() => {
                    sound.playPop();
                    setRightPanelTab("makna");
                  }}
                  className={`flex-1 py-2 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-1.5 ${
                    rightPanelTab === "makna"
                      ? "bg-white text-amber-950 shadow-sm border border-amber-300"
                      : "text-amber-900/70 hover:text-amber-950"
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-600" />
                  <span>Makna Sejarah</span>
                </button>
              </div>

              {/* KONTEN TAB 1: RAK PEMILIH 12 LAGU NASIONAL (CHAPTER JUMPER) */}
              {rightPanelTab === "rak" && (
                <div className="bg-white rounded-2xl sm:rounded-3xl p-3 sm:p-4 border-3 sm:border-4 border-amber-200 shadow-md">
                  <div className="mb-3 px-1 flex items-center justify-between">
                    <span className="text-xs font-black text-slate-700 uppercase tracking-wider">
                      Pilih Lagu untuk Diputar:
                    </span>
                    <span className="text-[11px] font-bold text-slate-500">
                      Otomatis Melompat Detik
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-2 gap-2 sm:gap-2.5 max-h-[520px] overflow-y-auto pr-1">
                    {DAFTAR_12_LAGU_NASIONAL.map((song, idx) => {
                      const isCurrent = idx === activeSongIndex;
                      const isClaimed = claimedSongs.includes(song.id);

                      return (
                        <button
                          key={song.id}
                          onClick={() => handleSelectVideoSong(idx)}
                          className={`p-2.5 sm:p-3 rounded-2xl border-2 sm:border-3 text-left transition-all btn-chunky cursor-pointer select-none flex flex-col justify-between ${
                            isCurrent
                              ? "bg-amber-50 border-amber-500 shadow-[0_3px_0_0_#d97706] ring-2 ring-amber-400"
                              : "bg-white hover:bg-slate-50 border-slate-300 shadow-[0_2px_0_0_#cbd5e1]"
                          }`}
                        >
                          <div className="flex items-start justify-between gap-1 mb-1">
                            <span
                              className={`text-[10px] font-black px-1.5 py-0.5 rounded-md ${
                                isCurrent
                                  ? "bg-red-600 text-white"
                                  : "bg-slate-100 text-slate-700"
                              }`}
                            >
                              #{song.nomor}
                            </span>
                            <span className="text-[10px] font-extrabold text-amber-700 bg-amber-100/80 px-1.5 py-0.5 rounded">
                              {song.timestampText}
                            </span>
                          </div>

                          <h4 className="font-black text-xs sm:text-sm text-slate-800 line-clamp-1 mb-0.5">
                            {song.title}
                          </h4>

                          <div className="flex items-center justify-between mt-1 text-[10px] text-slate-500 font-bold">
                            <span className="truncate max-w-[90px]">{song.composer}</span>
                            {isClaimed && (
                              <Star className="w-3 h-3 fill-amber-500 text-amber-500 shrink-0" />
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* KONTEN TAB 2: TEKS LIRIK LAGU AKTIF */}
              {rightPanelTab === "lirik" && (
                <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-5 border-3 sm:border-4 border-amber-200 shadow-md space-y-4">
                  <div className="flex items-center justify-between border-b pb-3">
                    <div>
                      <h3 className="text-lg sm:text-xl font-black font-display text-slate-800">
                        {activeVideoSong.title}
                      </h3>
                      <p className="text-xs font-bold text-slate-500">
                        Ciptaan: {activeVideoSong.composer}
                      </p>
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-xs font-black bg-blue-100 text-blue-800 border border-blue-200">
                      {activeVideoSong.durationText}
                    </span>
                  </div>

                  {/* Bait Lirik Lagu */}
                  <div className="bg-amber-50/50 rounded-2xl p-4 sm:p-5 border-2 border-amber-200/80 space-y-2 max-h-[380px] overflow-y-auto">
                    {activeVideoSong.lyrics.map((baris, lIdx) => (
                      <p
                        key={lIdx}
                        className="text-sm sm:text-base font-extrabold text-slate-800 leading-relaxed text-center sm:text-left"
                      >
                        {baris}
                      </p>
                    ))}
                  </div>

                  <p className="text-[11px] text-slate-400 font-bold text-center">
                    Bernyanyilah dengan sikap sempurna, penuh rasa bangga dan cinta tanah air!
                  </p>
                </div>
              )}

              {/* KONTEN TAB 3: MAKNA SEJARAH & NILAI KARAKTER PANCASILA */}
              {rightPanelTab === "makna" && (
                <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-5 border-3 sm:border-4 border-amber-200 shadow-md space-y-4">
                  <div className="flex items-center justify-between border-b pb-3">
                    <div>
                      <h3 className="text-base sm:text-lg font-black font-display text-slate-800">
                        Makna & Pesan Moral Edukasi
                      </h3>
                      <p className="text-xs font-bold text-slate-500">
                        Profil Pelajar Pancasila Kurikulum Merdeka
                      </p>
                    </div>

                    {/* Tombol Suara Narator Tobi */}
                    <button
                      onClick={toggleNarration}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-extrabold text-xs border transition-all btn-chunky ${
                        isNarrating
                          ? "bg-sky-600 text-white border-sky-700 shadow-sm"
                          : "bg-sky-100 text-sky-800 border-sky-300 hover:bg-sky-200"
                      }`}
                      title="Dengarkan cerita makna lagu dari Tobi"
                    >
                      {isNarrating ? (
                        <>
                          <VolumeX className="w-3.5 h-3.5" />
                          <span>Hentikan</span>
                        </>
                      ) : (
                        <>
                          <Volume2 className="w-3.5 h-3.5 text-sky-700" />
                          <span>Dengarkan Tobi</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Kotak Narasi Sejarah */}
                  <div className="bg-rose-50/60 rounded-2xl p-3.5 sm:p-4 border-2 border-rose-200 space-y-2">
                    <h4 className="text-xs font-black text-rose-800 uppercase tracking-wider">
                      Latar Belakang & Sejarah:
                    </h4>
                    <p className="text-xs sm:text-sm font-semibold text-slate-700 leading-relaxed">
                      {activeVideoSong.meaning}
                    </p>
                  </div>

                  {/* Kotak Nilai Karakter */}
                  <div className="bg-emerald-50/60 rounded-2xl p-3.5 sm:p-4 border-2 border-emerald-200 space-y-2">
                    <h4 className="text-xs font-black text-emerald-800 uppercase tracking-wider">
                      Pesan Karakter Anak Bangsa:
                    </h4>
                    <p className="text-xs sm:text-sm font-semibold text-slate-700 leading-relaxed">
                      {activeVideoSong.characterProfile}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* =========================================================================
            MODE 2: LAB SINTESIS MELODI WEB AUDIO (0 KB MP3, HEMAT KUOTA & OFFLINE)
            ========================================================================= */}
        {activeMode === "synthesizer" && (
          <div className="space-y-6">
            {/* Header Lab Sintesis */}
            <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 border-3 sm:border-4 border-purple-200 shadow-md flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-purple-100 text-purple-800 border border-purple-300">
                  Web Audio Synthesizer (0 KB MP3)
                </span>
                <h2 className="text-xl sm:text-2xl font-black font-display text-slate-800 mt-1">
                  Lab Melodi & Not Angka Indonesia
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 font-bold">
                  Belajar solmisasi not angka secara langsung dengan nada sintetis browser.
                </p>
              </div>

              {/* Kontrol Instrumen & Tempo */}
              <div className="flex items-center gap-2">
                {/* Instrumen Preset */}
                <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-300">
                  <button
                    onClick={() => {
                      sound.playPop();
                      setInstrument("pianika");
                    }}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                      instrument === "pianika"
                        ? "bg-white text-slate-800 shadow-sm font-black"
                        : "text-slate-500"
                    }`}
                  >
                    Pianika
                  </button>
                  <button
                    onClick={() => {
                      sound.playPop();
                      setInstrument("glockenspiel");
                    }}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                      instrument === "glockenspiel"
                        ? "bg-white text-slate-800 shadow-sm font-black"
                        : "text-slate-500"
                    }`}
                  >
                    Bel Musik
                  </button>
                </div>

                {/* Tempo */}
                <button
                  onClick={() => {
                    sound.playPop();
                    setTempoMultiplier((prev) => (prev === 1.0 ? 0.75 : 1.0));
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-black border transition-all btn-chunky ${
                    tempoMultiplier === 0.75
                      ? "bg-amber-100 text-amber-900 border-amber-300"
                      : "bg-slate-100 text-slate-700 border-slate-300"
                  }`}
                  title="Ganti kecepatan melodi"
                >
                  Tempo {tempoMultiplier === 1.0 ? "1.0x" : "0.75x Belajar"}
                </button>
              </div>
            </div>

            {/* Pilihan Lagu Synthesizer */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {DATA_LAGU_NASIONAL.map((s) => (
                <button
                  key={s.id}
                  onClick={() => {
                    sound.playPop();
                    setSynthSongId(s.id);
                  }}
                  className={`p-3 rounded-2xl border-2 sm:border-3 text-left transition-all btn-chunky ${
                    s.id === synthSongId
                      ? "bg-purple-50 border-purple-500 shadow-[0_3px_0_0_#9333ea] ring-2 ring-purple-300"
                      : "bg-white border-slate-300 shadow-[0_2px_0_0_#cbd5e1]"
                  }`}
                >
                  <h4 className="font-black text-xs sm:text-sm text-slate-800 truncate">
                    {s.judul}
                  </h4>
                  <p className="text-[10px] text-slate-500 font-bold truncate">
                    Cipt. {s.pencipta}
                  </p>
                </button>
              ))}
            </div>

            {/* Area Lirik Suku Kata Karaoke Glowing */}
            <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 border-3 sm:border-4 border-amber-200 shadow-md">
              <div className="flex items-center justify-between mb-4 pb-3 border-b">
                <div>
                  <h3 className="text-xl font-black text-slate-800">{activeSynthSong.judul}</h3>
                  <p className="text-xs font-bold text-slate-500">
                    Birama: {activeSynthSong.birama} | Tempo: {activeSynthSong.tempoBpm} BPM
                  </p>
                </div>

                {/* Kontrol Play/Pause/Replay */}
                <div className="flex items-center gap-2">
                  {!isPlayingSynth ? (
                    <button
                      onClick={handlePlaySynth}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-emerald-500 text-white font-black text-xs sm:text-sm border-2 border-emerald-600 shadow-[0_3px_0_0_#059669] btn-chunky"
                    >
                      <Play className="w-4 h-4 fill-white" />
                      <span>Putar Melodi</span>
                    </button>
                  ) : (
                    <button
                      onClick={handlePauseSynth}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-amber-400 text-amber-950 font-black text-xs sm:text-sm border-2 border-amber-500 shadow-[0_3px_0_0_#b45309] btn-chunky"
                    >
                      <Pause className="w-4 h-4" />
                      <span>Jeda</span>
                    </button>
                  )}

                  <button
                    onClick={handleReplaySynth}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-black text-xs sm:text-sm border-2 border-slate-300 shadow-[0_2px_0_0_#94a3b8] btn-chunky"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Ulangi</span>
                  </button>
                </div>
              </div>

              {/* Suku Kata Melodi Glowing */}
              <div className="p-4 bg-amber-50/60 rounded-2xl border-2 border-amber-200 flex flex-wrap gap-2 items-center justify-center min-h-[120px]">
                {activeSynthSong.melody.map((note, idx) => {
                  if (!note.lirikSukuKata) return null;
                  const isCurrentNote = activeNoteIndex === idx;

                  return (
                    <span
                      key={idx}
                      className={`px-2.5 py-1 rounded-xl text-sm sm:text-base font-black transition-all ${
                        isCurrentNote
                          ? "bg-amber-300 text-amber-950 scale-110 shadow-md ring-2 ring-amber-500"
                          : "bg-white text-slate-700 border border-slate-200"
                      }`}
                    >
                      {note.lirikSukuKata}
                      <sub className="text-[10px] ml-1 text-slate-400 font-bold">
                        {note.notAngka}
                      </sub>
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
