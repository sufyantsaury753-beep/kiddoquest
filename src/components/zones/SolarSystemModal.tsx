"use client";

import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { 
  X, 
  Orbit, 
  Sparkles, 
  Volume2, 
  Star, 
  CheckCircle2, 
  Info, 
  Compass, 
  ArrowRight, 
  Sun 
} from "lucide-react";
import { sound } from "@/lib/sound";

interface SolarSystemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEarnStars: (amount: number) => void;
  audioEnabled: boolean;
  liteMode: boolean;
}

interface PlanetData {
  id: string;
  name: string;
  order: string;
  image: string;
  emoji?: string;
  colorHex: string;
  gradient: string;
  sizeRem?: string;
  orbitRadius: number; // for visual representation
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
    emoji: "☀️",
    colorHex: "#f59e0b",
    gradient: "from-yellow-400 via-amber-500 to-orange-600",
    sizeRem: "w-20 h-20 sm:w-24 sm:h-24",
    orbitRadius: 0,
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
    emoji: "🪨",
    colorHex: "#94a3b8",
    gradient: "from-slate-300 via-slate-400 to-slate-600",
    sizeRem: "w-10 h-10 sm:w-12 sm:h-12",
    orbitRadius: 1,
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
    emoji: "🟡",
    colorHex: "#eab308",
    gradient: "from-yellow-300 via-amber-400 to-yellow-600",
    sizeRem: "w-12 h-12 sm:w-14 sm:h-14",
    orbitRadius: 2,
    tag: "Planet Paling Panas",
    nickname: "Bintang Fajar / Bintang Kejora",
    funFact: "Venus sering terlihat bersinar indah di waktu subuh atau senja! Walaupun bukan yang paling dekat dengan matahari, Venus adalah planet terpanas karena diselimuti awan tebal gas rumah kaca.",
    voiceScript: "Ini adalah Venus! Dari bumi, Venus terlihat bersinar terang seperti bintang kejora. Tapi hati-hati, udaranya terperangkap gas tebal sehingga menjadikannya planet paling panas di tata surya!",
    temperature: "± 465 °C (Sangat Panas)",
    moons: "0 Bulan",
  },
  {
    id: "earth",
    name: "Bumi",
    order: "Planet ke-3",
    image: "/images/planets/earth.webp",
    emoji: "🌍",
    colorHex: "#0284c7",
    gradient: "from-sky-400 via-blue-500 to-emerald-500",
    sizeRem: "w-14 h-14 sm:w-16 sm:h-16",
    orbitRadius: 3,
    tag: "Rumah Kita",
    nickname: "Planet Biru Kehidupan",
    funFact: "Bumi adalah satu-satunya tempat di alam semesta yang diketahui memiliki air cair yang melimpah, oksigen segar, tumbuhan, hewan, dan kita semua! Bumi punya satu teman setia yaitu Bulan.",
    voiceScript: "Lihat betapa cantiknya Bumi, planet rumah kita! Tiga perempat permukaannya adalah lautan biru yang indah. Di sinilah tempat tinggal jutaan makhluk hidup dan kita semua!",
    temperature: "Rata-rata 15 °C (Nyaman)",
    moons: "1 Bulan (Moon)",
  },
  {
    id: "mars",
    name: "Mars",
    order: "Planet ke-4",
    image: "/images/planets/mars.webp",
    emoji: "🔴",
    colorHex: "#ef4444",
    gradient: "from-red-400 via-rose-500 to-orange-700",
    sizeRem: "w-11 h-11 sm:w-13 sm:h-13",
    orbitRadius: 4,
    tag: "Planet Gurun Karat",
    nickname: "Planet Merah",
    funFact: "Warna merah Mars berasal dari debu besi berkarat di permukaannya. Di Mars terdapat gunung berapi tertinggi di tata surya bernama Olympus Mons, tingginya tiga kali Gunung Everest!",
    voiceScript: "Ini adalah Mars, si Planet Merah! Tanahnya penuh bebatuan dan debu besi berkarat. Di Mars ada gunung raksasa Olympus Mons yang luar biasa tinggi!",
    temperature: "Rata-rata -60 °C (Dingin)",
    moons: "2 Bulan (Phobos & Deimos)",
  },
  {
    id: "jupiter",
    name: "Jupiter",
    order: "Planet ke-5",
    image: "/images/planets/jupiter.webp",
    emoji: "🪐",
    colorHex: "#d97706",
    gradient: "from-amber-300 via-orange-400 to-amber-700",
    sizeRem: "w-20 h-20 sm:w-24 sm:h-24",
    orbitRadius: 5,
    tag: "Planet Terbesar",
    nickname: "Sang Raksasa Gas",
    funFact: "Jupiter begitu raksasa sampai bisa memuat lebih dari 1.300 planet Bumi di dalamnya! Jupiter memiliki badai angin dahsyat yang berputar selama ratusan tahun, disebut Bintik Merah Raksasa.",
    voiceScript: "Wah, ini dia Jupiter si Raksasa Gas! Dia adalah planet terbesar di tata surya kita! Coba lihat lingkaran di badannya, itu adalah badai raksasa yang berputar kencang!",
    temperature: "-110 °C (Awan Luar)",
    moons: "95 Bulan (Banyak sekali!)",
  },
  {
    id: "saturn",
    name: "Saturnus",
    order: "Planet ke-6",
    image: "/images/planets/saturn.webp",
    emoji: "🪐",
    colorHex: "#eab308",
    gradient: "from-yellow-200 via-amber-300 to-yellow-600",
    sizeRem: "w-16 h-16 sm:w-20 sm:h-20",
    orbitRadius: 6,
    tag: "Planet Bercincin Megah",
    nickname: "Permata Tata Surya",
    funFact: "Saturnus terkenal dengan cincinnya yang luar biasa memukau! Cincin tersebut terbuat dari miliaran serpihan es, debu, dan bebatuan angkasa yang berkilauan memantulkan cahaya matahari.",
    voiceScript: "Lihatlah cincin indah Saturnus! Saturnus adalah permata tata surya yang anggun. Cincinnya terbentuk dari jutaan serpihan es dan bebatuan berkilau yang berputar melingkar!",
    temperature: "-140 °C (Sangat Dingin)",
    moons: "146 Bulan (Terbanyak!)",
  },
  {
    id: "uranus",
    name: "Uranus",
    order: "Planet ke-7",
    image: "/images/planets/uranus.webp",
    emoji: "🔵",
    colorHex: "#38bdf8",
    gradient: "from-cyan-300 via-sky-400 to-teal-600",
    sizeRem: "w-14 h-14 sm:w-17 sm:h-17",
    orbitRadius: 7,
    tag: "Planet Es",
    nickname: "Raksasa Es Cincin Miring",
    funFact: "Uranus adalah planet es terdingin yang berputar menyamping seperti bola menggelinding!",
    voiceScript: "Halo! Aku Uranus, planet ketujuh yang berputar menyamping seperti bola menggelinding di luar angkasa! Warnaku biru kehijauan yang dingin dan tenang!",
    temperature: "-224 °C (Ekstrem Dingin)",
    moons: "27 Bulan",
  },
  {
    id: "neptune",
    name: "Neptunus",
    order: "Planet ke-8",
    image: "/images/planets/neptune.webp",
    emoji: "🌊",
    colorHex: "#2563eb",
    gradient: "from-blue-400 via-indigo-600 to-blue-900",
    sizeRem: "w-14 h-14 sm:w-17 sm:h-17",
    orbitRadius: 8,
    tag: "Planet Terluar",
    nickname: "Planet Biru Badai Terjauh",
    funFact: "Neptunus memiliki angin tercepat di tata surya yang melesat melampaui kecepatan suara!",
    voiceScript: "Ini adalah Neptunus, planet kedelapan yang paling jauh dari matahari! Di sini ada badai angin supersonik yang melesat melampaui kecepatan suara!",
    temperature: "-214 °C (Membeku)",
    moons: "14 Bulan",
  },
];

export default function SolarSystemModal({
  isOpen,
  onClose,
  onEarnStars,
  audioEnabled,
  liteMode,
}: SolarSystemModalProps) {
  const [selectedPlanetId, setSelectedPlanetId] = useState<string>("earth");
  const [isSpinning, setIsSpinning] = useState(false);
  const [exploredPlanets, setExploredPlanets] = useState<string[]>(["earth"]);

  // Preload semua gambar planet WebP ke memori browser
  useEffect(() => {
    if (typeof window !== "undefined") {
      PLANETS.forEach((planet) => {
        const img = new Image();
        img.src = planet.image;
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const activePlanet = PLANETS.find((p) => p.id === selectedPlanetId) || PLANETS[3];

  const handleSelectPlanet = (planet: PlanetData) => {
    setSelectedPlanetId(planet.id);
    setIsSpinning(true);
    sound.playChime();
    setTimeout(() => setIsSpinning(false), 900);

    if (!exploredPlanets.includes(planet.id)) {
      setExploredPlanets((prev) => [...prev, planet.id]);
      onEarnStars(35);
      sound.playCelebration();
      if (!liteMode) {
        confetti({
          particleCount: 45,
          spread: 60,
          origin: { y: 0.6 },
          colors: ["#38bdf8", "#fbbf24", "#c084fc", "#f472b6"],
        });
      }
    }

    if (audioEnabled) {
      sound.speak(planet.voiceScript);
    }
  };

  const handleSpeakPlanet = () => {
    sound.playChime();
    if (audioEnabled) {
      sound.speak(activePlanet.voiceScript);
    }
  };

  const handleNextPlanet = () => {
    const currentIndex = PLANETS.findIndex((p) => p.id === selectedPlanetId);
    const nextIndex = (currentIndex + 1) % PLANETS.length;
    handleSelectPlanet(PLANETS[nextIndex]);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-5 bg-slate-950/75 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-slate-900 text-white rounded-3xl border-4 border-indigo-400 shadow-[0_0_40px_rgba(99,102,241,0.3)] p-4 sm:p-7 overflow-hidden my-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b-2 border-indigo-800/80 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-indigo-950 border border-indigo-500 text-indigo-300 flex items-center justify-center shadow-inner">
              <Orbit className="w-6 h-6 animate-spin" style={{ animationDuration: "14s" }} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] sm:text-xs font-black uppercase text-indigo-300 bg-indigo-900/80 px-2.5 py-0.5 rounded-full border border-indigo-700">
                  IPA Astronomi SD
                </span>
                <span className="text-[10px] sm:text-xs font-bold text-amber-300 bg-amber-950/60 px-2 py-0.5 rounded-full border border-amber-600 flex items-center gap-1">
                  <Star className="w-3 h-3 fill-amber-400" />
                  +35 Bintang Tiap Planet
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black font-display text-white mt-0.5">
                Penjelajah Tata Surya Cilik 🪐
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-indigo-300 font-bold hidden sm:inline">
              Dijelajahi: {exploredPlanets.length}/{PLANETS.length} Objek
            </span>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 btn-chunky"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mini Orbit Belt / Planet Selector (Touch-friendly & Horizontal Scroll on Mobile) */}
        <div className="mb-6 bg-slate-950/80 rounded-2xl p-3 sm:p-4 border border-indigo-900/80">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-black text-indigo-300 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
              Sentuh Objek Antariksa untuk Menjelajah:
            </span>
            <span className="text-[11px] text-slate-400 font-semibold">
              Geser ke kanan ➔
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-2 pt-1 scrollbar-thin">
            {PLANETS.map((planet) => {
              const isSelected = selectedPlanetId === planet.id;
              const isExplored = exploredPlanets.includes(planet.id);

              return (
                <button
                  key={planet.id}
                  onClick={() => handleSelectPlanet(planet)}
                  className={`flex-shrink-0 flex flex-col items-center p-2.5 sm:p-3 rounded-2xl border-2 transition-all btn-chunky min-w-[76px] sm:min-w-[88px] ${
                    isSelected
                      ? "bg-indigo-600/90 border-yellow-400 shadow-[0_0_15px_#facc15] scale-105"
                      : "bg-slate-800/80 border-slate-700 hover:bg-slate-800 hover:border-indigo-400"
                  }`}
                >
                  <div
                    className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden flex items-center justify-center shadow-md transition-transform ${
                      isSelected ? "animate-bounce ring-2 ring-yellow-400" : ""
                    }`}
                  >
                    <img
                      src={planet.image}
                      alt={planet.name}
                      className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover mx-auto"
                    />
                  </div>
                  <span className="text-xs font-extrabold text-white mt-1.5 font-display truncate max-w-[70px]">
                    {planet.name}
                  </span>
                  <span className="text-[9px] text-slate-300 font-semibold">
                    {planet.id === "sun" ? "Pusat" : planet.order.replace("Planet ", "")}
                  </span>

                  {isExplored && (
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1" title="Sudah Dijelajahi" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Planet Spotlight Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6 items-center bg-gradient-to-br from-indigo-950/60 via-slate-900 to-purple-950/60 rounded-3xl p-5 sm:p-6 border-2 border-indigo-800">
          {/* Visual Planet Celestial Graphic (Left) */}
          <div className="md:col-span-5 flex flex-col items-center justify-center py-2 sm:py-4 relative">
            {/* Orbital Rings Background */}
            <div className="relative w-52 h-52 sm:w-64 sm:h-64 flex items-center justify-center">
              {/* Outer Orbit Line */}
              <div className="absolute inset-0 rounded-full border border-dashed border-indigo-400/30 animate-spin" style={{ animationDuration: "35s" }} />
              {/* Middle Glow Ring */}
              <div className="absolute inset-4 rounded-full border border-indigo-500/20" />

              {/* Planet Body Realistic HD Image */}
              <div
                className={`relative rounded-full shadow-[0_0_50px_rgba(255,255,255,0.3)] flex items-center justify-center cursor-pointer transition-all duration-700 ${
                  isSpinning ? "rotate-180 scale-110" : "hover:scale-105 active:scale-95"
                }`}
                onClick={handleSpeakPlanet}
                title="Klik planet untuk mendengarkan narasi!"
              >
                <img
                  src={activePlanet.image}
                  alt={activePlanet.name}
                  className="w-44 h-44 sm:w-56 sm:h-56 rounded-full object-cover select-none pointer-events-none drop-shadow-2xl"
                />
              </div>
            </div>
          </div>

          {/* Planet Details & Fact Sheet (Right) */}
          <div className="md:col-span-7 space-y-4">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                <span className="px-3 py-1 rounded-full text-xs font-black bg-indigo-500 text-white border border-indigo-400">
                  {activePlanet.tag}
                </span>
                <span className="text-xs font-bold text-yellow-300 italic">
                  "{activePlanet.nickname}"
                </span>
              </div>

              <h4 className="text-2xl sm:text-3xl font-black font-display text-white">
                {activePlanet.name} ({activePlanet.order})
              </h4>
            </div>

            {/* Fact Box */}
            <div className="bg-slate-950/70 rounded-2xl p-4 border border-indigo-900/90">
              <p className="text-xs sm:text-sm text-slate-200 font-medium leading-relaxed font-sans">
                {activePlanet.funFact}
              </p>
            </div>

            {/* Quick Metrics (Temperature & Moons) */}
            <div className="grid grid-cols-2 gap-2.5">
              <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-700">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Suhu Perkiraan:</span>
                <span className="text-xs font-extrabold text-amber-300">{activePlanet.temperature}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-700">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Satelit / Bulan:</span>
                <span className="text-xs font-extrabold text-sky-300">{activePlanet.moons}</span>
              </div>
            </div>

            {/* Audio Voice Narration & Next Planet Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={handleSpeakPlanet}
                className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-black text-xs sm:text-sm border-2 border-sky-400 shadow-[0_3px_0_0_#1e1b4b] btn-chunky"
              >
                <Volume2 className="w-4 h-4 text-yellow-300" />
                <span>🔊 Dengarkan Penjelasan Tobi</span>
              </button>

              <button
                onClick={handleNextPlanet}
                className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs sm:text-sm border border-slate-600 btn-chunky"
              >
                <span>Objek Berikutnya</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="mt-4 pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between text-xs text-slate-400">
          <span className="flex items-center gap-1">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            Materi Selaras Kurikulum Merdeka IPAS SD Kelas 4–6
          </span>
          <span className="text-indigo-300 font-bold">
            Total {PLANETS.length} Objek Angkasa Siap Dieksplorasi
          </span>
        </div>
      </div>
    </div>
  );
}
