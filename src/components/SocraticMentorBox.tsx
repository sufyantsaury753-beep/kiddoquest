"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { 
  Lightbulb, 
  CheckCircle2, 
  HelpCircle, 
  Volume2, 
  RotateCcw,
  Star
} from "lucide-react";
import { sound } from "@/lib/sound";

interface SocraticMentorBoxProps {
  onEarnStars: (amount: number) => void;
  audioEnabled: boolean;
  liteMode: boolean;
}

interface SocraticChallenge {
  id: string;
  category: string;
  question: string;
  voicePrompt: string;
  options: {
    text: string;
    isCorrect: boolean;
    socraticHint: string;
  }[];
}

const CHALLENGES: SocraticChallenge[] = [
  {
    id: "sains-warna",
    category: "Lab Sains Cilik 🧪",
    question: "Tobi punya cat warna MERAH dan KUNING. Jika kita campur keduanya di mangkuk, akan jadi warna apa ya?",
    voicePrompt: "Tobi punya cat warna merah dan kuning. Jika kita campur keduanya di mangkuk, akan jadi warna apa ya?",
    options: [
      {
        text: "🟢 Hijau Segar",
        isCorrect: false,
        socraticHint: "Wah, hampir tepat! Tapi Tobi ingat, warna Hijau seperti daun itu hasil pertemuan Biru dan Kuning. Nah, kalau Merah dan Kuning bersatu, warnanya hangat seperti buah jeruk! Coba tebak lagi yuk!",
      },
      {
        text: "🟠 Oranye / Jingga Manis",
        isCorrect: true,
        socraticHint: "LUAR BIASA! 🍊 Kamu benar sekali! Merah dicampur Kuning menjadi Oranye yang ceria! Kamu berpikir seperti ilmuwan cilik sejati!",
      },
      {
        text: "🔵 Biru Laut",
        isCorrect: false,
        socraticHint: "Kira-kira begitu bukan ya? Biru itu warna primer murni kawan. Coba bayangkan matahari senja yang berwarna merah dan kuning, langitnya jadi warna apa ya?",
      },
      {
        text: "🟣 Ungu Anggur",
        isCorrect: false,
        socraticHint: "Ide yang bagus! Tapi Ungu itu tercipta jika Merah dicampur dengan Biru. Ayo coba pikirkan warna buah jeruk!",
      },
    ],
  },
  {
    id: "hitung-buah",
    category: "Petualangan Berhitung 🍎",
    question: "Di pohon ada 4 apel merah 🍎. Lalu Tobi memetik 2 apel lagi dari dahan atas. Berapa jumlah semua apel Tobi?",
    voicePrompt: "Di pohon ada empat apel merah. Lalu Tobi memetik dua apel lagi. Berapa jumlah semua apel Tobi?",
    options: [
      {
        text: "4 Apel",
        isCorrect: false,
        socraticHint: "Coba kita hitung jari kita bersama! Empat apel sudah ada, lalu kita tambah dua jari lagi: empat... lima... dan? Coba tebak angka setelah lima!",
      },
      {
        text: "5 Apel",
        isCorrect: false,
        socraticHint: "Dekat sekali! Jika 4 ditambah 1 hasilnya 5. Tapi Tobi kan memetik 2 apel. Jadi setelah 5, berapa ya?",
      },
      {
        text: "6 Apel Manis 🍎",
        isCorrect: true,
        socraticHint: "TEPAT SEKALI! 🎉 Empat ditambah dua sama dengan ENAM! Keranjang buah Tobi sekarang penuh apel lezat!",
      },
      {
        text: "8 Apel",
        isCorrect: false,
        socraticHint: "Wah, kalau delapan itu kebanyakan sahabat cilik! Coba kita hitung pelan-pelan: 4... tambah 1 jadi 5, tambah 1 lagi jadi?",
      },
    ],
  },
  {
    id: "cerita-komodo",
    category: "Cerita Nusantara 🏝️",
    question: "Hewan kadal raksasa yang merupakan kebanggaan Indonesia dan hidup di Nusa Tenggara Timur adalah...",
    voicePrompt: "Hewan kadal raksasa yang merupakan kebanggaan Indonesia dan hidup di Nusa Tenggara Timur adalah...",
    options: [
      {
        text: "🦎 Komodo yang Gagah",
        isCorrect: true,
        socraticHint: "HEBAT! 🏝️ Benar sekali, Komodo adalah hewan purba istimewa kebanggaan Indonesia di Pulau Komodo NTT!",
      },
      {
        text: "🦘 Kanguru Pohon",
        isCorrect: false,
        socraticHint: "Kanguru pohon itu hewan khas yang melompat di Papua sahabat! Hewan ini bentuknya reptil berkaki empat dan lidahnya bercabang.",
      },
      {
        text: "🐅 Harimau Sumatra",
        isCorrect: false,
        socraticHint: "Harimau Sumatra adalah kucing besar loreng yang sangat anggun. Tapi yang Tobi tanyakan adalah bangsa reptil kadal besar!",
      },
    ],
  },
];

export default function SocraticMentorBox({
  onEarnStars,
  audioEnabled,
  liteMode,
}: SocraticMentorBoxProps) {
  const [activeChallengeIdx, setActiveChallengeIdx] = useState(0);
  const [selectedOptionIdx, setSelectedOptionIdx] = useState<number | null>(null);
  const [solved, setSolved] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const currentChallenge = CHALLENGES[activeChallengeIdx];

  const handleSelectOption = (idx: number) => {
    setSelectedOptionIdx(idx);
    const chosen = currentChallenge.options[idx];
    setFeedback(chosen.socraticHint);

    if (chosen.isCorrect) {
      setSolved(true);
      sound.playCelebration();
      if (!liteMode) {
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.7 },
          colors: ["#fbbf24", "#38bdf8", "#34d399", "#fb7185"],
        });
      }
      onEarnStars(15);
      if (audioEnabled) {
        sound.speak(chosen.socraticHint);
      }
    } else {
      setSolved(false);
      sound.playSocraticHint();
      if (audioEnabled) {
        sound.speak(chosen.socraticHint);
      }
    }
  };

  const handleNextChallenge = () => {
    const nextIdx = (activeChallengeIdx + 1) % CHALLENGES.length;
    setActiveChallengeIdx(nextIdx);
    setSelectedOptionIdx(null);
    setSolved(false);
    setFeedback(null);
    sound.playChime();
    if (audioEnabled) {
      sound.speak(CHALLENGES[nextIdx].voicePrompt);
    }
  };

  const handleSpeakQuestion = () => {
    sound.playChime();
    if (audioEnabled) {
      sound.speak(currentChallenge.voicePrompt);
    }
  };

  return (
    <section className="my-8">
      <div className="bg-white rounded-3xl border-4 border-sky-300 shadow-[0_8px_0_0_#0284c7] p-6 sm:p-8 relative overflow-hidden">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-sky-100 border-2 border-sky-300 flex items-center justify-center text-sky-600">
              <Lightbulb className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase tracking-wider text-sky-700 bg-sky-100 px-2.5 py-0.5 rounded-full border border-sky-200">
                  {currentChallenge.category}
                </span>
                <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full border border-amber-300 flex items-center gap-1">
                  <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                  +15 Bintang
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black font-display text-slate-800 mt-1">
                Tantangan Kilat: Socratic AI Kids Mentor 💡
              </h3>
            </div>
          </div>

          {/* Switch Challenge Button */}
          <button
            onClick={handleNextChallenge}
            className="self-start sm:self-auto flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 border-2 border-slate-300 text-xs sm:text-sm font-bold btn-chunky"
          >
            <RotateCcw className="w-4 h-4 text-slate-500" />
            <span>Ganti Tantangan ({activeChallengeIdx + 1}/{CHALLENGES.length})</span>
          </button>
        </div>

        {/* Question Area */}
        <div className="bg-sky-50/70 rounded-2xl p-4 sm:p-5 border-2 border-sky-200 mb-6">
          <div className="flex items-start justify-between gap-3">
            <p className="text-base sm:text-lg font-bold text-slate-800 leading-relaxed font-sans">
              "{currentChallenge.question}"
            </p>
            <button
              onClick={handleSpeakQuestion}
              className="p-2 rounded-xl bg-white hover:bg-sky-100 text-sky-600 border border-sky-300 shadow-sm flex-shrink-0"
              title="Dengarkan soal dibacakan"
            >
              <Volume2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Options Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6">
          {currentChallenge.options.map((opt, idx) => {
            const isSelected = selectedOptionIdx === idx;
            let btnStyle = "bg-white text-slate-700 border-slate-200 hover:border-sky-400 hover:bg-sky-50/50";
            
            if (isSelected) {
              if (opt.isCorrect) {
                btnStyle = "bg-emerald-100 text-emerald-900 border-emerald-400 shadow-[0_4px_0_0_#059669]";
              } else {
                btnStyle = "bg-amber-100 text-amber-900 border-amber-400 shadow-[0_4px_0_0_#d97706]";
              }
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelectOption(idx)}
                className={`p-4 rounded-2xl border-3 text-left font-bold text-sm sm:text-base flex items-center justify-between gap-3 btn-chunky transition-all ${btnStyle}`}
              >
                <span className="font-sans">{opt.text}</span>
                {isSelected && (
                  <span>
                    {opt.isCorrect ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    ) : (
                      <HelpCircle className="w-5 h-5 text-amber-600" />
                    )}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Empathetic Socratic Feedback Box */}
        {feedback && (
          <div
            className={`rounded-2xl p-4 sm:p-5 border-3 transition-all ${
              solved
                ? "bg-emerald-50 border-emerald-400 text-emerald-950"
                : "bg-amber-50 border-amber-300 text-amber-950"
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="text-2xl flex-shrink-0">
                {solved ? "🎉" : "💡"}
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-black uppercase tracking-wide mb-1 flex items-center gap-1.5 font-display">
                  {solved ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Hebat! Jawabanmu Benar!</span>
                    </>
                  ) : (
                    <>
                      <HelpCircle className="w-4 h-4 text-amber-600" />
                      <span>Petunjuk Ramah Tobi (Tidak Ada yang Salah!):</span>
                    </>
                  )}
                </h4>
                <p className="text-sm sm:text-base font-semibold leading-relaxed font-sans">
                  {feedback}
                </p>

                {solved && (
                  <div className="mt-3">
                    <button
                      onClick={handleNextChallenge}
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs sm:text-sm border-2 border-emerald-700 shadow-[0_3px_0_0_#064e3b] btn-chunky"
                    >
                      Lanjut Tantangan Berikutnya 🚀
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
