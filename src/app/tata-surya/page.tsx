"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  Orbit, 
  Volume2, 
  Star, 
  ChevronLeft, 
  ChevronRight,
  Thermometer,
  Moon
} from "lucide-react";
import { sound } from "@/lib/sound";
import { getStudentProfile, saveStudentProfile, StudentProfile, DEFAULT_PROFILE, unlockBadge } from "@/lib/storage";

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
  const [selectedPlanetId, setSelectedPlanetId] = useState<string>("saturn");
  const [isSpinning, setIsSpinning] = useState(false);
  const [exploredPlanets, setExploredPlanets] = useState<string[]>(["earth", "saturn"]);

  // Touch Swipe Gesture State
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const dockRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stored = unlockBadge("tata-surya");
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

  const activePlanet = PLANETS.find((p) => p.id === selectedPlanetId) || PLANETS[6];

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
    }

    if (profile.audioEnabled) {
      sound.speak(planet.voiceScript);
    }
  };

  const handleSpeakPlanet = () => {
    sound.playChime();
    if (profile.audioEnabled) {
      sound.speak(activePlanet.voiceScript);
    }
  };

  const handlePrevPlanet = () => {
    const currentIndex = PLANETS.findIndex((p) => p.id === selectedPlanetId);
    const prevIndex = (currentIndex - 1 + PLANETS.length) % PLANETS.length;
    handleSelectPlanet(PLANETS[prevIndex]);
  };

  const handleNextPlanet = () => {
    const currentIndex = PLANETS.findIndex((p) => p.id === selectedPlanetId);
    const nextIndex = (currentIndex + 1) % PLANETS.length;
    handleSelectPlanet(PLANETS[nextIndex]);
  };

  // Touch Swipe Gesture Handlers
  const minSwipeDistance = 45;

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      handleNextPlanet();
    } else if (isRightSwipe) {
      handlePrevPlanet();
    }
  };

  if (!mounted) return null;

  return (
    <div 
      className={`min-h-[100dvh] w-full flex flex-col justify-between bg-gradient-to-b from-[#060719] via-[#0B0D2E] to-[#050616] text-white select-none relative overflow-x-hidden ${profile.liteMode ? "lite-high-contrast" : ""}`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* 1. Top Header Bar */}
      <header className="w-full px-4 sm:px-8 py-3 flex items-center justify-between border-b border-indigo-950/60 bg-slate-950/50 backdrop-blur-md z-20 shrink-0">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            onClick={() => sound.stopSpeaking()}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-white font-black text-xs sm:text-sm border border-indigo-900/80 shadow-md transition-all btn-chunky"
            title="Kembali ke Beranda"
          >
            <ArrowLeft className="w-4 h-4 text-indigo-400" />
            <span>Beranda</span>
          </Link>
          <div className="hidden xs:flex items-center gap-2">
            <Orbit className="w-4 h-4 text-indigo-400 animate-spin" style={{ animationDuration: "14s" }} />
            <span className="text-xs sm:text-sm font-black font-display text-white tracking-wide">
              Tata Surya Cilik
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 bg-amber-950/70 px-3 py-1.5 rounded-xl border border-amber-600/80 text-amber-300 font-black text-xs sm:text-sm shadow-md">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>{profile.stars} Bintang</span>
          </div>
        </div>
      </header>

      {/* 2. Main Exploration Stage (Hero Planet & Cosmic Fact Card) */}
      <main className="flex-1 w-full max-w-5xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-6 sm:gap-10 px-4 py-4 sm:py-6 z-10">
        
        {/* Kolom Kiri: Panggung Planet Raksasa & Panah Orbit */}
        <div className="flex flex-col items-center justify-center relative shrink-0">
          <div className="relative w-60 h-60 sm:w-72 sm:h-72 lg:w-80 lg:h-80 flex items-center justify-center">
            
            {/* Lingkaran Orbit Dotted Berputar Lembut */}
            <div 
              className="absolute inset-0 rounded-full border-2 border-dashed border-indigo-500/40 animate-spin pointer-events-none" 
              style={{ animationDuration: "50s" }} 
            />
            {/* Pendaran Lingkaran Dalam */}
            <div className="absolute inset-4 rounded-full border border-indigo-400/20 pointer-events-none" />

            {/* Tombol Panah Orbit Kiri (Previous) */}
            <button
              onClick={handlePrevPlanet}
              className="absolute -left-2 sm:-left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-slate-900/90 border-2 border-indigo-500/80 hover:border-yellow-400 hover:bg-indigo-600 text-white flex items-center justify-center shadow-[0_0_15px_rgba(99,102,241,0.4)] active:scale-95 transition-all"
              title="Objek Sebelumnya"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>

            {/* Visual Planet Megah HD */}
            <div
              className={`relative flex items-center justify-center cursor-pointer transition-all duration-700 select-none ${
                isSpinning ? "rotate-180 scale-110" : "hover:scale-105 active:scale-95"
              }`}
              onClick={handleSpeakPlanet}
              title="Ketuk planet untuk memutar & mendengarkan suara Tobi!"
            >
              <img
                src={activePlanet.image}
                alt={activePlanet.name}
                className="w-48 h-48 sm:w-60 sm:h-60 lg:w-72 lg:h-72 object-contain select-none pointer-events-none drop-shadow-[0_15px_35px_rgba(0,0,0,0.9)]"
              />
            </div>

            {/* Tombol Panah Orbit Kanan (Next) */}
            <button
              onClick={handleNextPlanet}
              className="absolute -right-2 sm:-right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-slate-900/90 border-2 border-indigo-500/80 hover:border-yellow-400 hover:bg-indigo-600 text-white flex items-center justify-center shadow-[0_0_15px_rgba(99,102,241,0.4)] active:scale-95 transition-all"
              title="Objek Berikutnya"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>

        {/* Kolom Kanan: Lembar Fakta Kosmik & Tombol Aksi Fokus */}
        <div className="w-full max-w-lg space-y-3 sm:space-y-4 text-center lg:text-left">
          
          {/* Header Kartu: Kategori & Julukan */}
          <div>
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mb-1.5">
              <span className="px-3 py-1 rounded-full text-xs font-black bg-indigo-600 text-white border border-indigo-400 shadow-sm">
                {activePlanet.tag}
              </span>
              <span className="text-xs sm:text-sm font-bold text-yellow-300 italic">
                &ldquo;{activePlanet.nickname}&rdquo;
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black font-display text-white tracking-tight leading-tight">
              {activePlanet.name} ({activePlanet.order})
            </h1>
          </div>

          {/* Kotak Fakta Menarik */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl p-3.5 sm:p-4 border border-indigo-900/80 text-left shadow-lg">
            <p className="text-xs sm:text-sm text-slate-200 font-medium leading-relaxed font-sans">
              {activePlanet.funFact}
            </p>
          </div>

          {/* Grid Metrik Cepat (Suhu & Satelit) */}
          <div className="grid grid-cols-2 gap-2 sm:gap-3 text-left">
            <div className="p-2.5 sm:p-3 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-center gap-2.5 shadow-md">
              <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                <Thermometer className="w-4 h-4" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[9px] sm:text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                  Suhu Permukaan:
                </span>
                <span className="text-xs sm:text-sm font-extrabold text-amber-300 truncate block">
                  {activePlanet.temperature}
                </span>
              </div>
            </div>

            <div className="p-2.5 sm:p-3 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-center gap-2.5 shadow-md">
              <div className="w-8 h-8 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center shrink-0">
                <Moon className="w-4 h-4" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[9px] sm:text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                  Satelit / Bulan:
                </span>
                <span className="text-xs sm:text-sm font-extrabold text-sky-300 truncate block">
                  {activePlanet.moons}
                </span>
              </div>
            </div>
          </div>

          {/* Aksi Tunggal: Dengarkan Tobi (Satu-satunya Tombol Utama yang Jelas & Tidak Membingungkan) */}
          <div className="pt-1">
            <button
              onClick={handleSpeakPlanet}
              className="w-full py-3 sm:py-3.5 px-4 rounded-2xl bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-black text-sm sm:text-base border-2 border-sky-400 shadow-[0_4px_16px_rgba(56,189,248,0.35)] active:scale-[0.98] transition-all flex items-center justify-center gap-2.5 btn-chunky"
            >
              <Volume2 className="w-5 h-5 text-yellow-300 shrink-0" />
              <span>Dengarkan Tobi</span>
            </button>
          </div>

          {/* Status Penjelajahan */}
          <div className="flex items-center justify-center text-center w-full pt-1 px-1">
            <span className="text-center justify-center w-full text-indigo-300 font-extrabold text-xs">
              {exploredPlanets.length} / {PLANETS.length} Objek Dijelajahi
            </span>
          </div>

        </div>
      </main>

      {/* 3. Bottom Orbit Dock: 9 Objek Langit (Ramah Jempol Anak di Layar Bawah) */}
      <footer className="w-full px-2 sm:px-4 py-2 sm:py-3 bg-slate-950/80 backdrop-blur-md border-t border-indigo-950/80 z-20 shrink-0">
        <div 
          ref={dockRef}
          className="max-w-4xl mx-auto flex items-center justify-start sm:justify-center gap-2 sm:gap-3 overflow-x-auto scrollbar-none py-1 px-2"
        >
          {PLANETS.map((planet) => {
            const isSelected = selectedPlanetId === planet.id;
            const isExplored = exploredPlanets.includes(planet.id);

            return (
              <button
                key={planet.id}
                onClick={() => handleSelectPlanet(planet)}
                className={`flex-shrink-0 flex flex-col items-center gap-1 py-1 px-2 sm:px-2.5 rounded-2xl border transition-all btn-chunky ${
                  isSelected
                    ? "bg-indigo-600 border-2 border-yellow-400 shadow-[0_0_14px_rgba(250,204,21,0.7)] scale-105"
                    : "bg-slate-900/80 border-slate-800 hover:bg-slate-800/90 hover:border-indigo-400 text-slate-300"
                }`}
                title={planet.name}
              >
                <div className="relative w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center">
                  <img
                    src={planet.image}
                    alt={planet.name}
                    className="w-full h-full object-contain pointer-events-none select-none drop-shadow-md"
                  />
                  {isExplored && (
                    <span 
                      className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-slate-900" 
                      title="Sudah Dijelajahi"
                    />
                  )}
                </div>
                <span className={`text-[10px] sm:text-xs font-bold leading-none ${isSelected ? "text-yellow-300 font-black" : "text-slate-300"}`}>
                  {planet.name}
                </span>
              </button>
            );
          })}
        </div>
      </footer>

    </div>
  );
}
