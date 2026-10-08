"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import confetti from "canvas-confetti";
import {
  ArrowLeft,
  Orbit,
  Sparkles,
  Volume2,
  Star,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Thermometer,
  Moon,
} from "lucide-react";
import { sound } from "@/lib/sound";
import { getStudentProfile, saveStudentProfile, StudentProfile, DEFAULT_PROFILE } from "@/lib/storage";

interface PlanetData {
  id: string;
  name: string;
  order: string;
  image: string;
  tag: string;
  nickname: string;
  funFact: string;
  voiceScript: string;
  temperature: string;
  moons: string;
}

const PLANETS: PlanetData[] = [
  {
    id: "sun",
    name: "Matahari",
    order: "Pusat Tata Surya",
    image: "/images/planets/sun.webp",
    tag: "Bintang Raksasa",
    nickname: "Sang Sumber Energi & Cahaya",
    funFact: "Matahari bukanlah planet, melainkan bintang gas raksasa yang sangat panas! Gravitasi matahari yang kuat menjaga semua planet tetap berputar rapi di jalurnya.",
    voiceScript: "Halo sahabat cilik! Aku Matahari, pusat dari tata surya kita! Aku adalah bintang gas raksasa yang memberi kehangatan, siang hari, dan kehidupan bagi bumi tercinta!",
    temperature: "± 5.500 °C (Permukaan)",
    moons: "0 (Dikelilingi 8 Planet)",
  },
  {
    id: "mercury",
    name: "Merkurius",
    order: "Planet ke-1",
    image: "/images/planets/mercury.webp",
    tag: "Planet Terkecil & Terdekat",
    nickname: "Si Pelari Cepat",
    funFact: "Merkurius adalah planet terkecil di tata surya dan paling dekat dengan Matahari. Karena tidak punya udara, siangnya luar biasa panas dan malamnya sangat membeku!",
    voiceScript: "Bip-bop! Ini Merkurius, planet pertama yang paling dekat dengan matahari! Ukurannya mungil dan berputar mengelilingi matahari sangat cepat, hanya 88 hari!",
    temperature: "430 °C (Siang) / -180 °C (Malam)",
    moons: "0 Bulan",
  },
  {
    id: "venus",
    name: "Venus",
    order: "Planet ke-2",
    image: "/images/planets/venus.webp",
    tag: "Planet Terpanas di Tata Surya",
    nickname: "Bintang Kejora",
    funFact: "Venus sering terlihat bersinar terang di langit fajar atau senja. Meskipun bukan yang paling dekat dengan Matahari, atmosfer tebal gas rumah kaca membuat Venus menjadi planet terpanas!",
    voiceScript: "Halo! Ini Venus, si Bintang Kejora! Planet ini diselimuti awan tebal asam yang memerangkap panas, sehingga suhunya bisa melelehkan timah loh!",
    temperature: "± 465 °C (Konstan)",
    moons: "0 Bulan",
  },
  {
    id: "earth",
    name: "Bumi",
    order: "Planet ke-3",
    image: "/images/planets/earth.webp",
    tag: "Rumah Kita Tercinta",
    nickname: "Planet Biru Kehidupan",
    funFact: "Bumi adalah satu-satunya tempat di alam semesta yang terbukti memiliki kehidupan, air cair di permukaan, dan lapisan ozon pelindung dari radiasi matahari.",
    voiceScript: "Selamat datang di Bumi, rumah kita tercinta! Tiga perempat permukaan bumi adalah lautan biru yang indah. Mari kita jaga kelestarian bumi bersama!",
    temperature: "± 15 °C (Rata-rata)",
    moons: "1 Bulan (Moon)",
  },
  {
    id: "mars",
    name: "Mars",
    order: "Planet ke-4",
    image: "/images/planets/mars.webp",
    tag: "Target Penjelajahan Robot",
    nickname: "Planet Merah",
    funFact: "Warna merah Mars berasal dari karat besi di bebatuan dan tanahnya. Mars memiliki gunung berapi terbesar di tata surya bernama Olympus Mons yang tingginya 3 kali Gunung Everest!",
    voiceScript: "Bip-bop! Ini Mars si Planet Merah! Banyak robot penjelajah canggih dikirim ke sini untuk mencari jejak air purba dan gua bawah tanah!",
    temperature: "-60 °C (Rata-rata)",
    moons: "2 Bulan (Phobos & Deimos)",
  },
  {
    id: "jupiter",
    name: "Jupiter",
    order: "Planet ke-5",
    image: "/images/planets/jupiter.webp",
    tag: "Planet Terbesar di Tata Surya",
    nickname: "Raksasa Gas Pengayom",
    funFact: "Jupiter begitu besar sehingga lebih dari 1.300 planet Bumi bisa muat di dalamnya! Badai raksasanya yang terkenal, Bintik Merah Besar, sudah berputar selama ratusan tahun.",
    voiceScript: "Wah megahnya! Ini Jupiter, raja dari para planet! Dia adalah raksasa gas yang melindungi planet-planet dalam dari tabrakan asteroid dengan gravitasi besarnya!",
    temperature: "-110 °C (Atmosfer)",
    moons: "95 Bulan (Termasuk Ganymede)",
  },
  {
    id: "saturn",
    name: "Saturnus",
    order: "Planet ke-6",
    image: "/images/planets/saturn.webp",
    tag: "Planet Bercincin Terindah",
    nickname: "Permata Tata Surya",
    funFact: "Cincin spektakuler Saturnus terbuat dari miliaran pecahan es murni, debu kosmik, dan batuan antariksa. Massa jenis Saturnus sangat ringan—jika ada bak mandi raksasa, Saturnus bisa mengapung!",
    voiceScript: "Kagum sekali! Ini Saturnus dengan cincin es megah yang berpendar indah. Cincinnya membentang ribuan kilometer namun sangat tipis!",
    temperature: "-140 °C (Atmosfer)",
    moons: "146 Bulan (Terbanyak di Tata Surya)",
  },
  {
    id: "uranus",
    name: "Uranus",
    order: "Planet ke-7",
    image: "/images/planets/uranus.webp",
    tag: "Raksasa Es Berputar Miring",
    nickname: "Planet Es Miring",
    funFact: "Uranus adalah planet es terdingin yang berputar menyamping seperti bola menggelinding dengan warna biru kehijauan dari gas metana.",
    voiceScript: "Brrr dingin sekali! Ini Uranus, raksasa es yang berputar miring hampir 98 derajat! Warnanya toska sejuk karena gas metana di atmosfernya!",
    temperature: "-195 °C (Rata-rata)",
    moons: "28 Bulan",
  },
  {
    id: "neptune",
    name: "Neptunus",
    order: "Planet ke-8",
    image: "/images/planets/neptune.webp",
    tag: "Planet Terjauh dari Matahari",
    nickname: "Raksasa Es Biru Samudera",
    funFact: "Neptunus adalah planet terluar yang memerlukan waktu 165 tahun bumi untuk sekali mengitari matahari! Angin badai di Neptunus bertiup lebih dari 2.000 km/jam, tercepat di tata surya.",
    voiceScript: "Wusss! Ini Neptunus, pos terluar tata surya kita! Planet biru laut yang dingin dengan badai angin supersonik tercepat di seluruh antariksa!",
    temperature: "-200 °C (Rata-rata)",
    moons: "16 Bulan (Termasuk Triton)",
  },
];

export default function TataSuryaPage() {
  const [profile, setProfile] = useState<StudentProfile>(DEFAULT_PROFILE);
  const [mounted, setMounted] = useState(false);
  const [selectedPlanetId, setSelectedPlanetId] = useState<string>("earth");
  const [isSpinning, setIsSpinning] = useState(false);
  const [exploredPlanets, setExploredPlanets] = useState<string[]>(["earth"]);

  // Touch swipe gesture state
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchStartY, setTouchStartY] = useState<number | null>(null);

  // Bottom dock ref for smooth centering
  const dockRef = useRef<HTMLDivElement>(null);
  const activeItemRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const stored = getStudentProfile();
    setProfile(stored);
    sound.setSpeechEnabled(stored.audioEnabled);
    setMounted(true);

    // Preload planet images
    if (typeof window !== "undefined") {
      PLANETS.forEach((planet) => {
        const img = new Image();
        img.src = planet.image;
      });
    }
  }, []);

  const activePlanet = PLANETS.find((p) => p.id === selectedPlanetId) || PLANETS[3];

  // Auto-scroll active item into view in bottom dock
  useEffect(() => {
    if (activeItemRef.current) {
      activeItemRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [selectedPlanetId]);

  const handleSelectPlanet = (planet: PlanetData) => {
    setSelectedPlanetId(planet.id);
    setIsSpinning(true);
    sound.playChime();
    setTimeout(() => setIsSpinning(false), 800);

    if (!exploredPlanets.includes(planet.id)) {
      setExploredPlanets((prev) => [...prev, planet.id]);
      const updated = saveStudentProfile({ stars: profile.stars + 35 });
      setProfile(updated);
      sound.playCelebration();
      if (!profile.liteMode) {
        confetti({
          particleCount: 45,
          spread: 60,
          origin: { y: 0.6 },
          colors: ["#38bdf8", "#fbbf24", "#c084fc", "#f472b6"],
        });
      }
    }

    if (profile.audioEnabled) {
      sound.speak(planet.voiceScript);
    }
  };

  const handleSpeakPlanet = () => {
    sound.playChime();
    setIsSpinning(true);
    setTimeout(() => setIsSpinning(false), 800);
    if (profile.audioEnabled) {
      sound.speak(activePlanet.voiceScript);
    }
  };

  const handleNextPlanet = () => {
    const currentIndex = PLANETS.findIndex((p) => p.id === selectedPlanetId);
    const nextIndex = (currentIndex + 1) % PLANETS.length;
    handleSelectPlanet(PLANETS[nextIndex]);
  };

  const handlePrevPlanet = () => {
    const currentIndex = PLANETS.findIndex((p) => p.id === selectedPlanetId);
    const prevIndex = (currentIndex - 1 + PLANETS.length) % PLANETS.length;
    handleSelectPlanet(PLANETS[prevIndex]);
  };

  // Touch Swipe Gesture Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
    setTouchStartY(e.touches[0].clientY);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null || touchStartY === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    const diffX = touchStartX - touchEndX;
    const diffY = touchStartY - touchEndY;

    // Trigger swipe if horizontal displacement is significant and larger than vertical scroll
    if (Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX > 0) {
        // Swiped left -> Go to Next Planet
        handleNextPlanet();
      } else {
        // Swiped right -> Go to Previous Planet
        handlePrevPlanet();
      }
    }
    setTouchStartX(null);
    setTouchStartY(null);
  };

  if (!mounted) return null;

  return (
    <div
      className={`min-h-[100dvh] w-full bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950 text-white flex flex-col font-sans select-none overflow-x-hidden ${
        profile.liteMode ? "lite-high-contrast" : ""
      }`}
    >
      {/* 1. Header Game */}
      <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b-2 border-indigo-800/80 px-3.5 py-2 sm:px-5 sm:py-2.5 shadow-md">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/"
              onClick={() => sound.stopSpeaking()}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-black text-xs sm:text-sm border border-slate-600 shadow-[0_2px_0_0_#1e1b4b] transition-all btn-chunky"
              title="Kembali ke Beranda"
            >
              <ArrowLeft className="w-4 h-4 text-indigo-400" />
              <span className="hidden sm:inline">Beranda</span>
            </Link>

            <div className="h-5 w-px bg-indigo-800/60" />

            <div>
              <div className="flex items-center gap-2">
                <Orbit className="w-4 h-4 text-indigo-400 animate-spin" style={{ animationDuration: "14s" }} />
                <h1 className="text-sm sm:text-lg font-black font-display text-white tracking-tight leading-tight">
                  Tata Surya Cilik
                </h1>
              </div>
              <span className="text-[10px] sm:text-xs font-bold text-indigo-300 block leading-none">
                Eksplorasi Antariksa & 9 Objek Langit
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className="flex items-center gap-1 bg-amber-950/80 px-2 sm:px-2.5 py-1 rounded-xl border border-amber-600 text-amber-300 font-black text-xs">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{profile.stars}</span>
            </div>

            <button
              onClick={handleSpeakPlanet}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-black border-2 border-sky-400 bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white shadow-[0_2px_0_0_#1e1b4b] transition-all btn-chunky"
              title="Dengarkan Penjelasan Tobi"
            >
              <Volume2 className="w-3.5 h-3.5 text-yellow-300" />
              <span className="hidden sm:inline">Dengarkan Tobi</span>
            </button>
          </div>
        </div>
      </header>

      {/* 2. Main Scrollable Container (Safe padding bottom for Floating Dock) */}
      <main className="flex-1 w-full max-w-5xl mx-auto px-3 sm:px-6 pt-3 sm:pt-6 pb-32 sm:pb-36 flex flex-col justify-center">
        <div className="w-full flex-1 flex flex-col md:grid md:grid-cols-12 md:gap-8 md:items-center">
          
          {/* A. Panggung Planet Megah (Giant Hero Stage) */}
          <div
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="md:col-span-6 flex flex-col items-center justify-center relative py-4 sm:py-6"
          >
            {/* Tombol Panah Geser Kiri (Prev) */}
            <button
              type="button"
              onClick={handlePrevPlanet}
              aria-label="Objek Sebelumnya"
              className="absolute left-1 sm:left-2 z-20 w-11 h-11 sm:w-14 sm:h-14 rounded-2xl sm:rounded-3xl bg-slate-900/85 hover:bg-indigo-600 text-white border-2 border-indigo-500/80 shadow-[0_4px_0_0_#1e1b4b] flex items-center justify-center transition-all hover:scale-110 active:scale-95 btn-chunky backdrop-blur-md cursor-pointer"
            >
              <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
            </button>

            {/* Panggung Visual Planet & Glowing Orbit Ring */}
            <div className="relative flex items-center justify-center my-2">
              {/* Cincin Orbit Berputar Kosmik */}
              <div
                className="absolute w-60 h-60 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-92 lg:h-92 rounded-full border-2 border-dashed border-indigo-400/40 animate-spin pointer-events-none"
                style={{ animationDuration: "35s" }}
              />
              <div
                className="absolute w-52 h-52 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-84 lg:h-84 rounded-full border border-indigo-500/30 shadow-[0_0_40px_rgba(99,102,241,0.3)] pointer-events-none"
              />

              {/* Badan Planet Megah (210px–240px di HP, 280px–320px di Desktop) */}
              <div
                onClick={handleSpeakPlanet}
                className={`relative flex items-center justify-center cursor-pointer transition-transform duration-700 ${
                  isSpinning ? "rotate-180 scale-110" : "hover:scale-105 active:scale-95"
                }`}
                title="Sentuh objek untuk memutar dan mendengarkan penjelasan!"
              >
                <img
                  src={activePlanet.image}
                  alt={activePlanet.name}
                  className="w-52 h-52 sm:w-60 sm:h-60 md:w-72 md:h-72 lg:w-80 lg:h-80 object-contain select-none pointer-events-none drop-shadow-[0_15px_35px_rgba(0,0,0,0.85)] filter transition-all"
                />
              </div>
            </div>

            {/* Tombol Panah Geser Kanan (Next) */}
            <button
              type="button"
              onClick={handleNextPlanet}
              aria-label="Objek Berikutnya"
              className="absolute right-1 sm:right-2 z-20 w-11 h-11 sm:w-14 sm:h-14 rounded-2xl sm:rounded-3xl bg-slate-900/85 hover:bg-indigo-600 text-white border-2 border-indigo-500/80 shadow-[0_4px_0_0_#1e1b4b] flex items-center justify-center transition-all hover:scale-110 active:scale-95 btn-chunky backdrop-blur-md cursor-pointer"
            >
              <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
            </button>

            {/* Petunjuk Interaksi Ceria */}
            <div className="flex items-center gap-1.5 mt-2 px-3 py-1 rounded-full bg-slate-900/70 border border-indigo-800/60 text-indigo-300 text-[11px] sm:text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
              <span>Geser layar atau ketuk planet untuk mendengar suara Tobi!</span>
            </div>
          </div>

          {/* B. Kapsul Fakta Kosmik (Info Card) */}
          <div className="md:col-span-6 space-y-3 sm:space-y-4 text-center sm:text-left mt-2 md:mt-0">
            {/* Header: Tag Kategori & Julukan */}
            <div>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 sm:gap-2 mb-1.5">
                <span className="px-3 py-1 rounded-full text-xs font-black bg-indigo-600 text-white border border-indigo-400 shadow-sm">
                  {activePlanet.tag}
                </span>
                <span className="text-xs sm:text-sm font-bold text-yellow-300 italic">
                  "{activePlanet.nickname}"
                </span>
              </div>

              {/* Judul Besar: Nama Objek & Urutan */}
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black font-display text-white tracking-tight leading-tight">
                {activePlanet.name} ({activePlanet.order})
              </h2>
            </div>

            {/* Kotak Fun Fact Menarik */}
            <div className="bg-slate-900/90 backdrop-blur-md rounded-2xl sm:rounded-3xl p-3.5 sm:p-4 border-2 border-indigo-900/90 text-left shadow-lg">
              <p className="text-xs sm:text-sm text-slate-200 font-medium leading-relaxed font-sans">
                {activePlanet.funFact}
              </p>
            </div>

            {/* Grid 2-Kolom Metrik Kosmik Ringkas */}
            <div className="grid grid-cols-2 gap-2 sm:gap-3 text-left">
              <div className="p-2.5 sm:p-3 rounded-2xl bg-slate-900/85 border border-slate-700/80 shadow-sm flex items-start gap-2 sm:gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Thermometer className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block truncate">
                    Suhu Permukaan:
                  </span>
                  <span className="text-xs sm:text-sm font-extrabold text-amber-300 block truncate">
                    {activePlanet.temperature}
                  </span>
                </div>
              </div>

              <div className="p-2.5 sm:p-3 rounded-2xl bg-slate-900/85 border border-slate-700/80 shadow-sm flex items-start gap-2 sm:gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Moon className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block truncate">
                    Satelit / Bulan:
                  </span>
                  <span className="text-xs sm:text-sm font-extrabold text-sky-300 block truncate">
                    {activePlanet.moons}
                  </span>
                </div>
              </div>
            </div>

            {/* Tombol Aksi Utama */}
            <div className="pt-1 flex flex-wrap items-center justify-center sm:justify-start gap-2.5 sm:gap-3">
              <button
                type="button"
                onClick={handleSpeakPlanet}
                className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-black text-xs sm:text-sm border-2 border-sky-400 shadow-[0_3px_0_0_#1e1b4b] transition-all btn-chunky cursor-pointer"
              >
                <Volume2 className="w-4 h-4 text-yellow-300" />
                <span>Dengarkan Tobi</span>
              </button>

              <button
                type="button"
                onClick={handleNextPlanet}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs sm:text-sm border-2 border-slate-600 shadow-[0_2px_0_0_#0f172a] transition-all btn-chunky cursor-pointer"
              >
                <span>Objek Berikutnya</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Status Eksplorasi Bintang */}
            <div className="pt-2 flex items-center justify-between text-xs text-slate-400 border-t border-indigo-900/40">
              <span className="flex items-center gap-1.5 text-[11px] sm:text-xs text-emerald-400 font-bold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>+35 Bintang Tiap Planet Baru</span>
              </span>
              <span className="text-indigo-300 font-extrabold text-[11px] sm:text-xs">
                {exploredPlanets.length} / {PLANETS.length} Objek Dijelajahi
              </span>
            </div>
          </div>

        </div>
      </main>

      {/* 3. Pemilih Planet di Bawah Layar (Bottom Floating Orbit Dock) */}
      <div className="fixed bottom-2 sm:bottom-4 inset-x-0 z-30 flex justify-center px-2 pointer-events-none">
        <div
          ref={dockRef}
          style={{ scrollbarWidth: "none" }}
          className="pointer-events-auto bg-slate-950/95 backdrop-blur-md rounded-2xl sm:rounded-3xl border-2 border-indigo-600/80 p-1.5 sm:p-2 shadow-[0_10px_35px_rgba(0,0,0,0.85)] max-w-xl sm:max-w-2xl w-full flex items-center gap-1.5 sm:gap-2 overflow-x-auto scroll-smooth [&::-webkit-scrollbar]:hidden"
        >
          {PLANETS.map((planet) => {
            const isSelected = selectedPlanetId === planet.id;
            const isExplored = exploredPlanets.includes(planet.id);

            return (
              <button
                key={planet.id}
                ref={isSelected ? activeItemRef : null}
                type="button"
                onClick={() => handleSelectPlanet(planet)}
                className={`flex-shrink-0 flex flex-col items-center justify-center p-1.5 sm:p-2 rounded-xl sm:rounded-2xl border transition-all btn-chunky min-w-[56px] sm:min-w-[64px] cursor-pointer ${
                  isSelected
                    ? "bg-indigo-600/95 border-yellow-400 ring-2 ring-yellow-400 shadow-[0_0_14px_rgba(250,204,21,0.6)] scale-105"
                    : "bg-slate-900/80 border-slate-700/80 hover:bg-slate-800 text-slate-300"
                }`}
                title={planet.name}
              >
                <div className="relative w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center">
                  <img
                    src={planet.image}
                    alt={planet.name}
                    className="w-full h-full object-contain pointer-events-none drop-shadow-sm"
                  />
                  {isExplored && (
                    <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 border border-slate-950" />
                  )}
                </div>
                <span
                  className={`text-[10px] sm:text-[11px] font-extrabold truncate max-w-[52px] sm:max-w-[60px] mt-0.5 ${
                    isSelected ? "text-yellow-300 font-black" : "text-slate-300"
                  }`}
                >
                  {planet.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
