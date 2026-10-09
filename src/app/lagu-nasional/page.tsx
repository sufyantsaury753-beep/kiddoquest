"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import confetti from "canvas-confetti";
import {
  ArrowLeft,
  Play,
  Star,
  Music,
  Heart,
  BookOpen,
  CheckCircle2,
  Volume2,
  VolumeX,
} from "lucide-react";
import {
  DAFTAR_11_LAGU_NASIONAL,
  YOUTUBE_VIDEO_ID,
  VideoLaguNasional,
} from "@/data/videoLaguNasionalData";
import { PIANIKA_KEYS, PianikaKey } from "@/data/laguNasionalData";
import { melodyEngine } from "@/lib/nationalMelodyEngine";
import {
  getStudentProfile,
  saveStudentProfile,
  StudentProfile,
  DEFAULT_PROFILE,
  unlockBadge,
} from "@/lib/storage";
import { sound } from "@/lib/sound";

export default function LaguNasionalPage() {
  const [profile, setProfile] = useState<StudentProfile>(DEFAULT_PROFILE);
  const [mounted, setMounted] = useState<boolean>(false);

  // Lagu yang sedang aktif diputar (Default: Lagu 1 - Garuda Pancasila)
  const [activeSongIndex, setActiveSongIndex] = useState<number>(0);
  const activeSong: VideoLaguNasional = DAFTAR_11_LAGU_NASIONAL[activeSongIndex];

  // Daftar ID lagu yang sudah diklaim bintang prestasinya
  const [claimedSongs, setClaimedSongs] = useState<string[]>([]);

  // Status narasi suara Tobi
  const [isNarrating, setIsNarrating] = useState<boolean>(false);

  // Tuts pianika yang sedang aktif berbunyi
  const [activeKeyNotAngka, setActiveKeyNotAngka] = useState<string | null>(null);

  // Tab Sisi Kanan: 'lagu' (Daftar 11 Lagu) atau 'lirik' (Lirik & Makna)
  const [activeTab, setActiveTab] = useState<"lagu" | "lirik">("lagu");

  // Inisialisasi profil siswa dan penyimpanan lokal
  useEffect(() => {
    const stored = unlockBadge("lagu-nasional");
    setProfile(stored);
    sound.setSpeechEnabled(stored.audioEnabled);

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

  // Ganti lagu aktif (Chapter / Timestamp Jumper)
  const handleSelectSong = (index: number) => {
    sound.playChime();
    setActiveSongIndex(index);
    if (isNarrating) {
      sound.stopSpeaking();
      setIsNarrating(false);
    }
  };

  // Klaim Bintang Edukasi (+25 Bintang)
  const handleClaimStars = () => {
    if (claimedSongs.includes(activeSong.id)) return;

    const newStars = profile.stars + 25;
    const updatedProfile = saveStudentProfile({ stars: newStars });
    setProfile(updatedProfile);

    const updatedClaimed = [...claimedSongs, activeSong.id];
    setClaimedSongs(updatedClaimed);
    try {
      localStorage.setItem("tobiquest_claimed_national_songs", JSON.stringify(updatedClaimed));
    } catch {
      // fallback safe
    }

    // Selebrasi suara & apresiasi Tobi
    sound.playVictory();
    sound.speak(
      `Luar biasa! Kamu telah mendengarkan dan bernyanyi lagu ${activeSong.title} bersama Tobi. Kamu mendapatkan 25 bintang prestasi!`
    );

    // Efek konfeti visual (disembunyikan saat liteMode aktif)
    if (!profile.liteMode) {
      confetti({
        particleCount: 75,
        spread: 65,
        origin: { y: 0.65 },
        colors: ["#ef4444", "#ffffff", "#f59e0b", "#3b82f6"],
      });
    }
  };

  // Toggle Narasi Makna Lagu oleh Tobi
  const toggleNarration = () => {
    if (isNarrating) {
      sound.stopSpeaking();
      setIsNarrating(false);
    } else {
      setIsNarrating(true);
      const text = `Lagu ${activeSong.title}, karya ${activeSong.composer}. Makna lagu: ${activeSong.meaning}`;
      sound.speak(
        text,
        undefined,
        () => setIsNarrating(false)
      );
    }
  };

  // Sentuhan Tuts Pianika Companion
  const handleTapKey = (key: PianikaKey) => {
    melodyEngine.playSingleNote(key.nadaHz, 0.4);
    setActiveKeyNotAngka(key.notAngka);
    setTimeout(() => {
      setActiveKeyNotAngka(null);
    }, 350);
  };

  // URL Sematan YouTube resmi dengan parameter timestamp akurat
  const youtubeUrl = `https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?start=${activeSong.startTime}&autoplay=1`;

  return (
    <div
      className={`min-h-screen w-full flex flex-col bg-amber-50/40 text-slate-800 ${
        profile.liteMode ? "lite-high-contrast" : ""
      }`}
    >
      {/* 1. Header Bar Responsif & Sticky */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b-4 border-amber-200/80 shadow-sm py-2.5 sm:py-3.5 px-3 sm:px-6">
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
              <Music className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />
              <h1 className="text-sm sm:text-xl md:text-2xl font-black font-display text-slate-800 tracking-tight">
                Panggung Lagu Nasional
              </h1>
            </div>
            <p className="text-[10px] sm:text-xs text-slate-500 font-bold hidden sm:block">
              11 Lagu Wajib & Perjuangan Anak Indonesia (MJP Advertising Channel)
            </p>
          </div>

          {/* Indikator Bintang Siswa */}
          <div
            className="flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 rounded-xl sm:rounded-2xl bg-amber-400 text-amber-950 font-black text-xs sm:text-sm border-2 border-amber-500 shadow-[0_2px_0_0_#b45309] shrink-0"
            title="Koleksi Bintang Prestasi Siswa"
          >
            <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-amber-950 text-amber-950" />
            <span className="font-display text-xs sm:text-base">{profile.stars}</span>
          </div>
        </div>
      </header>

      {/* 2. Konten Utama: 2 Kolom di Desktop/Tablet, 1 Kolom di Layar HP */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start">
          {/* =========================================================================
              KOLOM KIRI (Layar Video YouTube Embed & Status Lagu Aktif) - lg:col-span-7
              ========================================================================= */}
          <div className="lg:col-span-7 space-y-4">
            {/* Pemutar Video YouTube Embed 16:9 Sesuai Spesifikasi */}
            <div className="relative aspect-video w-full rounded-2xl sm:rounded-3xl overflow-hidden border-4 border-amber-400 shadow-xl bg-slate-900 group">
              <iframe
                key={`${activeSong.id}-${activeSong.startTime}`}
                src={youtubeUrl}
                title={`Panggung Lagu Nasional - ${activeSong.title}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>

            {/* Kartu Status Lagu Aktif & Tombol Klaim Bintang */}
            <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-5 border-3 sm:border-4 border-amber-200 shadow-md">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-black bg-red-600 text-white tracking-wider">
                      LAGU #{activeSong.nomor}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-black bg-amber-100 text-amber-900 border border-amber-300">
                      Menit {activeSong.timestampText} ({activeSong.startTime} detik)
                    </span>
                    {activeSong.badge && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700">
                        {activeSong.badge}
                      </span>
                    )}
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black font-display text-slate-800">
                    {activeSong.title}
                  </h2>
                  <p className="text-xs sm:text-sm font-bold text-slate-500">
                    Ciptaan: {activeSong.composer}
                  </p>
                </div>

                {/* Tombol Klaim Bintang (+25 Bintang) */}
                <button
                  onClick={handleClaimStars}
                  disabled={claimedSongs.includes(activeSong.id)}
                  className={`flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl font-black text-xs sm:text-sm border-2 transition-all btn-chunky shrink-0 ${
                    claimedSongs.includes(activeSong.id)
                      ? "bg-emerald-100 text-emerald-800 border-emerald-300 cursor-default"
                      : "bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 text-amber-950 border-amber-500 shadow-[0_3px_0_0_#b45309] hover:brightness-105 active:translate-y-1"
                  }`}
                  title="Klaim 25 Bintang setelah bernyanyi bersama Tobi"
                >
                  {claimedSongs.includes(activeSong.id) ? (
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

            {/* Keyboard Mini-Pianika Companion (Latihan Nada & Solmisasi) */}
            <div className="bg-white rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 border-3 sm:border-4 border-amber-200 shadow-md">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Music className="w-4 h-4 text-rose-500" />
                  <h3 className="text-xs sm:text-sm font-black text-slate-800 uppercase tracking-wider">
                    Pianika Latihan (Sentuh & Bunyikan Tuts)
                  </h3>
                </div>
                <span className="text-[10px] sm:text-xs font-bold text-slate-500">
                  Diatonis C Mayor
                </span>
              </div>

              {/* Barisan Tuts Pianika */}
              <div className="flex items-center justify-center gap-1 sm:gap-1.5 overflow-x-auto py-1">
                {PIANIKA_KEYS.map((key) => {
                  const isKeyActive = activeKeyNotAngka === key.notAngka;
                  return (
                    <button
                      key={key.notAngka}
                      onClick={() => handleTapKey(key)}
                      className={`flex-1 min-w-[28px] sm:min-w-[40px] max-w-[54px] h-20 sm:h-26 rounded-b-xl sm:rounded-b-2xl border-2 sm:border-3 flex flex-col justify-end items-center pb-2 transition-all cursor-pointer select-none active:scale-95 ${
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

          {/* =========================================================================
              KOLOM KANAN (Daftar 11 Tombol Lagu + Kartu Lirik & Makna) - lg:col-span-5
              ========================================================================= */}
          <div className="lg:col-span-5 space-y-4">
            {/* Tab Switcher: Daftar 11 Lagu vs Lirik & Makna Edukasi */}
            <div className="bg-amber-100/80 p-1.5 rounded-2xl border-2 border-amber-300 flex items-center gap-1">
              <button
                onClick={() => {
                  sound.playPop();
                  setActiveTab("lagu");
                }}
                className={`flex-1 py-2 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === "lagu"
                    ? "bg-white text-amber-950 shadow-sm border border-amber-300"
                    : "text-amber-900/70 hover:text-amber-950"
                }`}
              >
                <Music className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-600" />
                <span>Pilih 11 Lagu</span>
              </button>
              <button
                onClick={() => {
                  sound.playPop();
                  setActiveTab("lirik");
                }}
                className={`flex-1 py-2 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === "lirik"
                    ? "bg-white text-amber-950 shadow-sm border border-amber-300"
                    : "text-amber-900/70 hover:text-amber-950"
                }`}
              >
                <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600" />
                <span>Lirik & Makna</span>
              </button>
            </div>

            {/* TAB 1: DAFTAR 11 TOMBOL LAGU NASIONAL CHUNKY */}
            {activeTab === "lagu" && (
              <div className="bg-white rounded-2xl sm:rounded-3xl p-3 sm:p-4 border-3 sm:border-4 border-amber-200 shadow-md">
                <div className="mb-2 px-1 flex items-center justify-between">
                  <span className="text-xs font-black text-slate-700 uppercase tracking-wider">
                    Ketuk untuk Melompat Lagu:
                  </span>
                  <span className="text-[11px] font-bold text-amber-800">
                    Timestamp Akurat
                  </span>
                </div>

                {/* Grid Tombol 11 Lagu Chunky */}
                <div className="space-y-2 max-h-[540px] overflow-y-auto pr-1">
                  {DAFTAR_11_LAGU_NASIONAL.map((song, idx) => {
                    const isCurrent = idx === activeSongIndex;
                    const isClaimed = claimedSongs.includes(song.id);

                    return (
                      <button
                        key={song.id}
                        onClick={() => handleSelectSong(idx)}
                        className={`w-full p-2.5 sm:p-3 rounded-2xl border-2 sm:border-3 text-left transition-all btn-chunky cursor-pointer select-none flex items-center justify-between gap-3 ${
                          isCurrent
                            ? "bg-amber-50 border-amber-500 shadow-[0_3px_0_0_#d97706] ring-2 ring-amber-400"
                            : "bg-white hover:bg-slate-50 border-slate-300 shadow-[0_2px_0_0_#cbd5e1]"
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          {/* Badge Nomor / Play */}
                          <div
                            className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs shrink-0 ${
                              isCurrent
                                ? "bg-amber-500 text-amber-950"
                                : "bg-slate-100 text-slate-600"
                            }`}
                          >
                            {isCurrent ? (
                              <Play className="w-4 h-4 fill-amber-950 animate-pulse" />
                            ) : (
                              <span>{song.nomor}</span>
                            )}
                          </div>

                          {/* Info Judul & Pencipta */}
                          <div className="min-w-0">
                            <h4
                              className={`font-black text-xs sm:text-sm truncate ${
                                isCurrent ? "text-amber-950 font-display" : "text-slate-800"
                              }`}
                            >
                              {song.title}
                            </h4>
                            <p className="text-[11px] text-slate-500 font-bold truncate">
                              {song.composer}
                            </p>
                          </div>
                        </div>

                        {/* Timestamp Menit Mulai & Status Klaim */}
                        <div className="flex items-center gap-1.5 shrink-0">
                          <span
                            className={`text-[10px] sm:text-xs font-black px-2 py-0.5 rounded-lg border ${
                              isCurrent
                                ? "bg-amber-200/80 text-amber-950 border-amber-300"
                                : "bg-slate-100 text-slate-600 border-slate-200"
                            }`}
                          >
                            {song.timestampText}
                          </span>
                          {isClaimed && (
                            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500 shrink-0" />
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB 2: KARTU EDUKASI LIRIK & MAKNA KEBANGSAAN */}
            {activeTab === "lirik" && (
              <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-5 border-3 sm:border-4 border-amber-200 shadow-md space-y-4">
                {/* Header Lirik */}
                <div className="flex items-center justify-between border-b pb-3">
                  <div>
                    <h3 className="text-base sm:text-lg font-black font-display text-slate-800">
                      {activeSong.title}
                    </h3>
                    <p className="text-xs font-bold text-slate-500">
                      Ciptaan: {activeSong.composer} | Mulai: Menit {activeSong.timestampText}
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
                    title="Dengarkan penjelasan makna lagu dari Tobi"
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

                {/* Kotak Makna Karakter Kebangsaan */}
                <div className="bg-rose-50/70 rounded-2xl p-3.5 sm:p-4 border-2 border-rose-200 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-rose-800">
                    <Heart className="w-3.5 h-3.5 text-rose-600" />
                    <h4 className="text-xs font-black uppercase tracking-wider">
                      Makna Karakter Kebangsaan:
                    </h4>
                  </div>
                  <p className="text-xs sm:text-sm font-semibold text-slate-700 leading-relaxed">
                    {activeSong.meaning}
                  </p>
                </div>

                {/* Area Teks Lirik Lengkap untuk Bernyanyi Bersama (Sing-Along) */}
                <div className="space-y-1.5">
                  <div className="flex items-center gap-1.5 text-slate-600 px-1">
                    <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                    <h4 className="text-xs font-black uppercase tracking-wider">
                      Teks Lirik Lengkap (Ayo Bernyanyi):
                    </h4>
                  </div>
                  <div className="bg-amber-50/60 rounded-2xl p-4 border-2 border-amber-200/80 space-y-2 max-h-[300px] overflow-y-auto">
                    {activeSong.lyrics.map((baris, lIdx) => (
                      <p
                        key={lIdx}
                        className="text-sm sm:text-base font-extrabold text-slate-800 leading-relaxed text-center sm:text-left"
                      >
                        {baris}
                      </p>
                    ))}
                  </div>
                </div>

                <p className="text-[11px] text-slate-400 font-bold text-center">
                  Bernyanyilah dengan sikap khidmat, bangga, dan cinta tanah air Indonesia!
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
