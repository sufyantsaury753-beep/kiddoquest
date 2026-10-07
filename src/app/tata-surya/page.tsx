"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import confetti from "canvas-confetti";
import { 
  ArrowLeft, 
  Orbit, 
  Sparkles, 
  Volume2, 
  Star, 
  CheckCircle2, 
  ArrowRight
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
    if (profile.audioEnabled) {
      sound.speak(activePlanet.voiceScript);
    }
  };

  const handleNextPlanet = () => {
    const currentIndex = PLANETS.findIndex((p) => p.id === selectedPlanetId);
    const nextIndex = (currentIndex + 1) % PLANETS.length;
    handleSelectPlanet(PLANETS[nextIndex]);
  };

  if (!mounted) return null;

  return (
    <div className={`h-[100dvh] max-h-[100dvh] w-full bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950 text-white flex flex-col select-none overflow-hidden ${profile.liteMode ? "lite-high-contrast" : ""}`}>
      {/* Container Utama Layar Penuh Edge-to-Edge */}
      <div className="w-full max-w-4xl lg:max-w-5xl mx-auto flex-1 min-h-0 flex flex-col bg-slate-900/95 rounded-none sm:rounded-3xl border-0 sm:border-4 border-indigo-500 sm:shadow-[0_0_40px_rgba(99,102,241,0.25)] sm:my-2 lg:my-3 overflow-hidden">
        
        {/* 1. Header Game */}
        <header className="px-3.5 py-2 sm:px-5 sm:py-2.5 bg-indigo-950/90 border-b-2 border-indigo-800/80 flex items-center justify-between gap-2 shrink-0">
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/"
              onClick={() => sound.stopSpeaking()}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-black text-xs sm:text-sm border border-slate-600 shadow-[0_2px_0_0_#1e1b4b] btn-chunky"
              title="Kembali ke Beranda"
            >
              <ArrowLeft className="w-4 h-4 text-indigo-400" />
              <span className="hidden sm:inline">Beranda</span>
            </Link>
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
        </header>

        {/* 2. Mini Orbit Belt / Planet Selector (1 Baris Geser Horisontal) */}
        <div className="px-3 py-1 sm:px-5 sm:py-1.5 bg-slate-950/90 border-b border-indigo-900/80 flex items-center gap-2 overflow-x-auto scrollbar-thin shrink-0">
          <span className="text-[10px] font-black text-indigo-300 uppercase tracking-wider shrink-0 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-yellow-400" />
            Pilih Objek:
          </span>
          <div className="flex items-center gap-1.5 sm:gap-2">
            {PLANETS.map((planet) => {
              const isSelected = selectedPlanetId === planet.id;
              const isExplored = exploredPlanets.includes(planet.id);

              return (
                <button
                  key={planet.id}
                  onClick={() => handleSelectPlanet(planet)}
                  className={`flex-shrink-0 flex items-center gap-1.5 px-2.5 py-1 rounded-xl border transition-all btn-chunky ${
                    isSelected
                      ? "bg-indigo-600 border-yellow-400 shadow-[0_0_10px_#facc15] scale-105"
                      : "bg-slate-800/80 border-slate-700 hover:bg-slate-800 hover:border-indigo-400 text-slate-300"
                  }`}
                >
                  <img
                    src={planet.image}
                    alt={planet.name}
                    className="w-5 h-5 object-contain"
                  />
                  <span className="text-[11px] sm:text-xs font-extrabold font-display">
                    {planet.name}
                  </span>
                  {isExplored && (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. Main Stage: Panggung Planet & Lembar Fakta (Kompak & Menyatu Tanpa Ruang Kosong Berlebih) */}
        <main className="p-3 sm:p-4 lg:p-5 flex-1 min-h-0 flex flex-col justify-center overflow-hidden">
          <div className="w-full max-w-3xl mx-auto flex flex-col md:grid md:grid-cols-12 gap-3 sm:gap-6 items-center my-auto">
            
            {/* Visual Planet Celestial Graphic (Kiri / Atas) */}
            <div className="md:col-span-5 flex flex-col items-center justify-center relative shrink-0">
              <div className="relative w-28 h-28 sm:w-40 sm:h-40 lg:w-48 lg:h-48 flex items-center justify-center">
                {/* Outer Orbit Line */}
                <div className="absolute inset-0 rounded-full border border-dashed border-indigo-400/30 animate-spin" style={{ animationDuration: "35s" }} />
                {/* Middle Glow Ring */}
                <div className="absolute inset-3 rounded-full border border-indigo-500/20" />

                {/* Planet Body Realistic HD Image */}
                <div
                  className={`relative flex items-center justify-center cursor-pointer transition-all duration-700 ${
                    isSpinning ? "rotate-180 scale-110" : "hover:scale-105 active:scale-95"
                  }`}
                  onClick={handleSpeakPlanet}
                  title="Sentuh objek untuk memutar dan mendengarkan!"
                >
                  <img
                    src={activePlanet.image}
                    alt={activePlanet.name}
                    className="w-28 h-28 sm:w-40 sm:h-40 lg:w-48 lg:h-48 object-contain select-none pointer-events-none drop-shadow-[0_10px_25px_rgba(0,0,0,0.8)]"
                  />
                </div>
              </div>
            </div>

            {/* Planet Details & Fact Sheet (Kanan) */}
            <div className="md:col-span-7 space-y-2 sm:space-y-3 text-center sm:text-left">
              <div>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 mb-1">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-black bg-indigo-500 text-white border border-indigo-400">
                    {activePlanet.tag}
                  </span>
                  <span className="text-[11px] sm:text-xs font-bold text-yellow-300 italic">
                    "{activePlanet.nickname}"
                  </span>
                </div>

                <h2 className="text-xl sm:text-2xl lg:text-3xl font-black font-display text-white tracking-tight leading-tight">
                  {activePlanet.name} ({activePlanet.order})
                </h2>
              </div>

              {/* Fact Box */}
              <div className="bg-slate-950/70 rounded-2xl p-2.5 sm:p-3 border border-indigo-900/90 text-left">
                <p className="text-xs sm:text-sm text-slate-200 font-medium leading-relaxed font-sans">
                  {activePlanet.funFact}
                </p>
              </div>

              {/* Quick Metrics */}
              <div className="grid grid-cols-2 gap-1.5 sm:gap-2 text-left">
                <div className="p-2 sm:p-2.5 rounded-xl bg-slate-900/80 border border-slate-700">
                  <span className="text-[9px] sm:text-[10px] uppercase font-bold text-slate-400 block">Suhu Perkiraan:</span>
                  <span className="text-xs font-extrabold text-amber-300 truncate block">{activePlanet.temperature}</span>
                </div>
                <div className="p-2 sm:p-2.5 rounded-xl bg-slate-900/80 border border-slate-700">
                  <span className="text-[9px] sm:text-[10px] uppercase font-bold text-slate-400 block">Satelit / Bulan:</span>
                  <span className="text-xs font-extrabold text-sky-300 truncate block">{activePlanet.moons}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-1 flex items-center justify-center sm:justify-start gap-2 sm:gap-2.5">
                <button
                  onClick={handleSpeakPlanet}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-black text-xs border border-sky-400 shadow-[0_2px_0_0_#1e1b4b] btn-chunky"
                >
                  <Volume2 className="w-3.5 h-3.5 text-yellow-300" />
                  <span>Dengar Penjelasan</span>
                </button>

                <button
                  onClick={handleNextPlanet}
                  className="flex items-center gap-1 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-600 btn-chunky"
                >
                  <span>Objek Berikutnya</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </main>

        {/* 4. Footer */}
        <footer className="px-3.5 py-1.5 sm:px-5 sm:py-2 bg-slate-950/80 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 shrink-0">
          <span className="flex items-center gap-1 text-[11px] text-emerald-400 font-bold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            +35 Bintang Tiap Planet Baru
          </span>
          <span className="text-indigo-300 font-extrabold text-[11px]">
            {exploredPlanets.length} / {PLANETS.length} Objek Dijelajahi
          </span>
        </footer>

      </div>
    </div>
  );
}
