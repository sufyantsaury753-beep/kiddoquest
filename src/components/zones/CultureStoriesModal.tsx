"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { X, BookOpen, Volume2, Sparkles, Star, CheckCircle, MapPin, Award } from "lucide-react";
import { sound } from "@/lib/sound";

interface CultureStoriesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEarnStars: (amount: number) => void;
  audioEnabled: boolean;
  liteMode: boolean;
}

const STORIES = [
  {
    id: "komodo",
    title: "Sang Komodo di Nusa Tenggara Timur",
    location: "Pulau Komodo, NTT 🏝️",
    badge: "Fauna Endemik Indonesia",
    storyText:
      "Di kepulauan Nusa Tenggara Timur yang indah, hidup seekor satwa purba istimewa bernama Komodo. Komodo adalah kadal raksasa terbesar di seluruh dunia! Mereka pandai berenang dan sangat tangguh menjaga keaslian habitat alamnya di Indonesia.",
    quizPrompt: "Susun huruf untuk menebak nama hewan gagah ini: K - O - M - _ - D - O",
    secretWord: "O",
    hint: "Huruf vokal bulat yang sama dengan huruf kedua!",
    options: ["A", "O", "E", "U"],
  },
  {
    id: "gadang",
    title: "Rumah Gadang dan Atap Tanduk Kerbau",
    location: "Sumatra Barat 🏔️",
    badge: "Arsitektur Tradisional",
    storyText:
      "Rumah Gadang adalah rumah adat suku Minangkabau di Sumatra Barat. Keunikannya terletak pada atapnya yang melengkung runcing menjulang ke langit, menyerupai bentuk tanduk kerbau yang gagah! Rumah ini dibangun tanpa menggunakan paku besi, melainkan pasak kayu yang sangat kuat terhadap gempa bumi.",
    quizPrompt: "Atap Rumah Gadang yang runcing menyerupai tanduk hewan apa?",
    secretWord: "Kerbau",
    hint: "Hewan pekerja keras pembajak sawah yang kuat!",
    options: ["Kelinci", "Kerbau", "Kuda", "Kucing"],
  },
  {
    id: "borobudur",
    title: "Kemegahan Candi Borobudur",
    location: "Magelang, Jawa Tengah 🏛️",
    badge: "Warisan Dunia UNESCO",
    storyText:
      "Candi Borobudur adalah candi Buddha terbesar di dunia yang dibangun dari jutaan balok batu andesit alami. Dinding-dindingnya dihiasi ribuan ukiran relief indah yang menceritakan pesan kebijaksanaan dan kasih sayang kepada seluruh makhluk hidup.",
    quizPrompt: "Candi Borobudur dibangun dari jutaan balok batu bernama batu...",
    secretWord: "Andesit",
    hint: "Batu gunung berapi yang sangat kokoh!",
    options: ["Kapur", "Andesit", "Bata Merah", "Pasir"],
  },
];

export default function CultureStoriesModal({
  isOpen,
  onClose,
  onEarnStars,
  audioEnabled,
  liteMode,
}: CultureStoriesModalProps) {
  const [activeStoryIdx, setActiveStoryIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);
  const [isReading, setIsReading] = useState(false);

  const story = STORIES[activeStoryIdx];

  if (!isOpen) return null;

  const handleReadStory = () => {
    sound.playChime();
    if (audioEnabled) {
      setIsReading(true);
      sound.speak(
        `${story.title}. Lokasi di ${story.location}. ${story.storyText}`,
        () => setIsReading(true),
        () => setIsReading(false)
      );
    }
  };

  const handleSelectOption = (opt: string) => {
    setSelectedAnswer(opt);
    if (opt === story.secretWord) {
      setIsAnswerCorrect(true);
      sound.playCelebration();
      onEarnStars(40);
      if (!liteMode) {
        confetti({
          particleCount: 45,
          spread: 65,
          origin: { y: 0.7 },
        });
      }
      if (audioEnabled) {
        sound.speak("Luar biasa! Tebakanmu benar! Kamu adalah sahabat cilik pelestari budaya Nusantara!");
      }
    } else {
      setIsAnswerCorrect(false);
      sound.playSocraticHint();
      if (audioEnabled) {
        sound.speak(`Hampir tepat! Tobi beri petunjuk: ${story.hint}. Coba pilih sekali lagi!`);
      }
    }
  };

  const handleSwitchStory = (idx: number) => {
    setActiveStoryIdx(idx);
    setSelectedAnswer(null);
    setIsAnswerCorrect(null);
    sound.stopSpeaking();
    setIsReading(false);
    sound.playChime();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl border-4 border-purple-400 shadow-2xl p-5 sm:p-7 overflow-hidden my-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b-2 border-purple-100 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center border border-purple-300">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-black font-display text-slate-800">
                Tebak Kata & Cerita Nusantara 🏝️
              </h3>
              <p className="text-xs font-semibold text-purple-700">
                Literasi Bergambar, Cerita Audio Karaoke, & Kuis Budaya Indonesia
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 btn-chunky"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Story Selector Pills */}
        <div className="grid grid-cols-3 gap-2 mb-5">
          {STORIES.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => handleSwitchStory(idx)}
              className={`p-2.5 rounded-2xl border-2 font-bold text-xs flex flex-col items-center gap-1 btn-chunky ${
                activeStoryIdx === idx
                  ? "bg-purple-600 text-white border-purple-700 shadow-[0_3px_0_0_#581c87]"
                  : "bg-purple-50 text-purple-900 border-purple-200 hover:bg-purple-100"
              }`}
            >
              <span className="font-display truncate max-w-full">{s.title.split(" ")[1] || s.title}</span>
              <span className="text-[10px] opacity-90">{idx === 0 ? "NTT" : idx === 1 ? "Sumatra" : "Jawa"}</span>
            </button>
          ))}
        </div>

        {/* Active Story Card */}
        <div className="bg-gradient-to-br from-purple-50 via-white to-amber-50 rounded-3xl p-5 sm:p-6 border-2 border-purple-200 mb-6">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-purple-200 text-purple-900 border border-purple-300">
                {story.badge}
              </span>
              <span className="text-xs font-bold text-slate-600 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-rose-500" />
                {story.location}
              </span>
            </div>

            <button
              onClick={handleReadStory}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-black border-2 btn-chunky ${
                isReading
                  ? "bg-rose-500 text-white border-rose-600 shadow-[0_2px_0_0_#9f1239]"
                  : "bg-purple-600 text-white border-purple-700 shadow-[0_2px_0_0_#581c87]"
              }`}
            >
              <Volume2 className={`w-4 h-4 ${isReading ? "animate-spin" : ""}`} />
              <span>{isReading ? "Membacakan..." : "🔊 Dengarkan Cerita"}</span>
            </button>
          </div>

          <h4 className="text-lg sm:text-xl font-black font-display text-slate-900 mb-2">
            {story.title}
          </h4>

          <p className="text-sm sm:text-base font-medium text-slate-700 leading-relaxed font-sans mb-4">
            {story.storyText}
          </p>

          {/* Interactive Word Literacy Challenge */}
          <div className="mt-4 pt-4 border-t border-purple-100 bg-white/90 rounded-2xl p-4 border border-purple-200">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span className="text-xs font-black uppercase tracking-wider text-purple-900">
                Kuis Tebak Literasi Cilik (+40 Bintang):
              </span>
            </div>

            <p className="text-xs sm:text-sm font-bold text-slate-800 mb-3">
              "{story.quizPrompt}"
            </p>

            {/* Answer Options */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {story.options.map((opt) => {
                const isSelected = selectedAnswer === opt;
                let optStyle = "bg-purple-50 text-purple-900 border-purple-200 hover:bg-purple-100";
                if (isSelected) {
                  optStyle = isAnswerCorrect
                    ? "bg-emerald-500 text-white border-emerald-600 shadow-[0_2px_0_0_#065f46]"
                    : "bg-amber-400 text-amber-950 border-amber-500 shadow-[0_2px_0_0_#b45309]";
                }

                return (
                  <button
                    key={opt}
                    onClick={() => handleSelectOption(opt)}
                    className={`py-2 px-3 rounded-xl border-2 font-black text-xs sm:text-sm btn-chunky text-center ${optStyle}`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>

            {/* Hint & Feedback message */}
            {selectedAnswer && (
              <div className="mt-3 text-xs sm:text-sm font-bold">
                {isAnswerCorrect ? (
                  <div className="text-emerald-700 flex items-center gap-1.5 animate-bounce">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span>Hore Benar! Kamu mendapatkan +40 Bintang Penjelajah Budaya!</span>
                  </div>
                ) : (
                  <div className="text-amber-800">
                    💡 Petunjuk Tobi: {story.hint}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-purple-700 flex items-center gap-1">
            <Award className="w-4 h-4 text-purple-600" />
            Lencana Duta Budaya Terbuka
          </span>

          <button
            onClick={() => handleSwitchStory((activeStoryIdx + 1) % STORIES.length)}
            className="px-4 py-2 rounded-xl bg-purple-100 hover:bg-purple-200 text-purple-900 font-bold text-xs btn-chunky"
          >
            Cerita Pulau Berikutnya ➔
          </button>
        </div>
      </div>
    </div>
  );
}
