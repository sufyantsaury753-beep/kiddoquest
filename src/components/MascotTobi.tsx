"use client";

import React, { useState, useEffect } from "react";
import { Volume2, HelpCircle, Heart, Lightbulb, Compass } from "lucide-react";
import { sound } from "@/lib/sound";

interface MascotTobiProps {
  studentName: string;
  liteMode: boolean;
  audioEnabled: boolean;
}

const TOBI_DIALOGUES = [
  {
    question: "Apa misi petualanganku hari ini? 🎯",
    speech: "Halo! Hari ini kita akan menjelajah Lab Sains Cilik, memetik buah di Petualangan Berhitung, dan membaca legenda Nusantara. Siap kumpulkan banyak bintang?",
  },
  {
    question: "Kenapa belajar sains itu seru? 🧪",
    speech: "Karena sains seperti sihir yang nyata! Kamu bisa mencampur warna baru dan melihat air laut berubah menjadi awan lalu turun hujan. Ayo coba sekarang di Lab Sains!",
  },
  {
    question: "Tobi, bagaimana jika aku salah menjawab? 💡",
    speech: "Tenang saja sahabat cilik! Di TobiQuest, salah itu tanda otakmu sedang berkembang! Tobi akan selalu mendampingi dan memberi petunjuk ramah sampai kamu paham.",
  },
  {
    question: "Tobi, apa itu Telkomsel Lite Mode? ⚡",
    speech: "Telkomsel Lite Mode dibuat khusus agar kawan-kawan kita di seluruh pelosok Indonesia bisa belajar dengan lancar tanpa takut kuota internet habis!",
  },
];

export default function MascotTobi({
  studentName,
  liteMode,
  audioEnabled,
}: MascotTobiProps) {
  const [currentText, setCurrentText] = useState(
    `Halo ${studentName}! Aku Tobi si Robot Sahabat Belajarmu. Mau mulai petualangan seru apa hari ini? Tekan tombol di bawah untuk mendengarkanku!`
  );
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [activeMood, setActiveMood] = useState<"happy" | "thinking" | "excited">("happy");

  useEffect(() => {
    // If student name changes, update greeting
    setCurrentText(
      `Halo ${studentName}! Aku Tobi si Robot Sahabat Belajarmu. Pilih petualangan seru di bawah dan kumpulkan bintang prestasimu!`
    );
  }, [studentName]);

  const handleSpeak = (text: string, mood: "happy" | "thinking" | "excited" = "happy") => {
    setActiveMood(mood);
    setCurrentText(text);
    sound.playChime();

    if (audioEnabled) {
      setIsSpeaking(true);
      sound.speak(
        text,
        () => setIsSpeaking(true),
        () => {
          setIsSpeaking(false);
          setActiveMood("happy");
        }
      );
    }
  };

  const stopSpeaking = () => {
    sound.stopSpeaking();
    setIsSpeaking(false);
  };

  return (
    <div className={`relative rounded-3xl p-5 sm:p-7 md:p-8 transition-all ${
      liteMode 
        ? "bg-amber-50 border-4 border-amber-400" 
        : "bg-gradient-to-br from-amber-100/90 via-sky-50/80 to-purple-100/90 border-4 border-amber-300 shadow-[0_8px_0_0_#f59e0b]"
    }`}>
      <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
        {/* Robot Tobi Avatar */}
        <div className="relative flex-shrink-0 flex flex-col items-center">
          <div className={`relative w-36 h-36 sm:w-44 sm:h-44 flex items-center justify-center cursor-pointer transition-transform ${
            liteMode ? "" : isSpeaking ? "scale-105" : "hover:scale-105"
          }`}
          onClick={() => handleSpeak(`Bip-bop! Aku Tobi, senang sekali berteman denganmu, ${studentName}!`, "excited")}
          title="Klik Tobi untuk menyapa!"
          >
            {/* Robot SVG Graphics */}
            <svg
              viewBox="0 0 200 200"
              className={`w-full h-full drop-shadow-md ${liteMode ? "" : "animate-soft-bounce"}`}
            >
              {/* Antenna */}
              <line x1="100" y1="42" x2="100" y2="18" stroke="#0284c7" strokeWidth="6" strokeLinecap="round" />
              <circle cx="100" cy="14" r="10" fill={isSpeaking ? "#ef4444" : "#38bdf8"} className={isSpeaking ? "animate-ping" : ""} />
              <circle cx="100" cy="14" r="8" fill={isSpeaking ? "#f87171" : "#0284c7"} />

              {/* Ears / Headphone side bolts */}
              <rect x="24" y="78" width="14" height="28" rx="6" fill="#f59e0b" />
              <rect x="162" y="78" width="14" height="28" rx="6" fill="#f59e0b" />

              {/* Robot Head */}
              <rect x="34" y="42" width="132" height="100" rx="36" fill="#38bdf8" stroke="#0284c7" strokeWidth="6" />
              {/* Visor / Face Screen */}
              <rect x="48" y="58" width="104" height="68" rx="24" fill="#0f172a" />

              {/* Big Expressive Eyes */}
              {activeMood === "thinking" ? (
                <>
                  <circle cx="76" cy="88" r="14" fill="#38bdf8" />
                  <path d="M70 78 Q76 72 82 78" stroke="#0f172a" strokeWidth="3" fill="none" />
                  <circle cx="124" cy="88" r="14" fill="#38bdf8" />
                  <path d="M118 78 Q124 72 130 78" stroke="#0f172a" strokeWidth="3" fill="none" />
                </>
              ) : activeMood === "excited" ? (
                <>
                  {/* Happy closed-arc eyes */}
                  <path d="M64 92 Q76 76 88 92" stroke="#38bdf8" strokeWidth="7" strokeLinecap="round" fill="none" />
                  <path d="M112 92 Q124 76 136 92" stroke="#38bdf8" strokeWidth="7" strokeLinecap="round" fill="none" />
                </>
              ) : (
                <>
                  {/* Normal Friendly Eyes with highlights */}
                  <circle cx="76" cy="88" r="15" fill="#38bdf8" />
                  <circle cx="72" cy="83" r="5" fill="#ffffff" />
                  <circle cx="124" cy="88" r="15" fill="#38bdf8" />
                  <circle cx="120" cy="83" r="5" fill="#ffffff" />
                </>
              )}

              {/* Cheerful Mouth */}
              {isSpeaking ? (
                <rect x="88" y="106" width="24" height="12" rx="6" fill="#fb7185" className="animate-pulse" />
              ) : activeMood === "excited" ? (
                <path d="M84 106 Q100 120 116 106" stroke="#fbbf24" strokeWidth="6" strokeLinecap="round" fill="none" />
              ) : (
                <path d="M88 108 Q100 118 112 108" stroke="#38bdf8" strokeWidth="5" strokeLinecap="round" fill="none" />
              )}

              {/* Cheeks */}
              <circle cx="56" cy="98" r="6" fill="#fb7185" opacity="0.7" />
              <circle cx="144" cy="98" r="6" fill="#fb7185" opacity="0.7" />

              {/* Robot Body Preview */}
              <path d="M64 142 L64 185 Q100 195 136 185 L136 142 Z" fill="#0284c7" stroke="#0369a1" strokeWidth="5" />
              <circle cx="100" cy="164" r="10" fill={isSpeaking ? "#ef4444" : "#fbbf24"} />
            </svg>

            {/* Speaking Sound Waves Indicator */}
            {isSpeaking && (
              <div className="absolute -top-1 -right-1 flex items-center justify-center bg-rose-500 text-white rounded-full p-2 shadow-lg animate-bounce">
                <Volume2 className="w-5 h-5" />
              </div>
            )}
          </div>
        </div>

        {/* Speech Bubble & Interactive Prompts */}
        <div className="flex-1 w-full">
          {/* Main Bubble */}
          <div className="relative bg-white rounded-3xl p-5 sm:p-6 border-3 border-amber-300 shadow-[0_4px_0_0_#fde68a]">
            {/* Small pointer triangle on desktop */}
            <div className="hidden md:block absolute -left-3 top-8 w-6 h-6 bg-white border-l-3 border-b-3 border-amber-300 transform rotate-45" />

            <div className="flex items-center gap-2 mb-2">
              <Lightbulb className="w-5 h-5 text-amber-500 fill-amber-400" />
              <h3 className="text-base sm:text-lg font-black font-display text-slate-800">
                Kata Tobi Hari Ini:
              </h3>
            </div>

            <p className="text-base sm:text-lg font-medium text-slate-700 leading-relaxed font-sans min-h-[56px]">
              "{currentText}"
            </p>

            {/* Read Aloud Button & Voice Controls */}
            <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
              <div className="grid grid-cols-2 gap-2 w-full sm:flex sm:w-auto">
                <button
                  onClick={() => (isSpeaking ? stopSpeaking() : handleSpeak(currentText, "happy"))}
                  className={`min-h-[44px] py-2.5 px-2 sm:px-4 rounded-2xl font-black text-xs sm:text-sm border-2 btn-chunky flex items-center justify-center text-center gap-1.5 leading-tight whitespace-normal ${
                    isSpeaking
                      ? "bg-rose-500 text-white border-rose-600 shadow-[0_3px_0_0_#9f1239]"
                      : "bg-sky-500 text-white border-sky-600 shadow-[0_3px_0_0_#0369a1] hover:bg-sky-400"
                  }`}
                >
                  <Volume2 className={`w-4 h-4 shrink-0 ${isSpeaking ? "animate-spin" : ""}`} />
                  <span>{isSpeaking ? "Berhenti Bicara" : "Dengarkan Tobi"}</span>
                </button>

                <button
                  onClick={() => handleSpeak("Semangat belajarnya ya sahabat cilik! Kamu adalah anak hebat dan cerdas!", "excited")}
                  className="min-h-[44px] py-2.5 px-2 sm:px-3.5 rounded-2xl bg-amber-100 hover:bg-amber-200 text-amber-900 border-2 border-amber-300 font-black text-xs sm:text-sm shadow-[0_3px_0_0_#d97706] btn-chunky flex items-center justify-center text-center gap-1.5 leading-tight whitespace-normal"
                >
                  <Heart className="w-4 h-4 shrink-0 text-rose-500 fill-rose-500" />
                  <span>Beri Semangat</span>
                </button>
              </div>
            </div>
          </div>

          {/* Interactive Dialogue Buttons for Children */}
          <div className="mt-4 flex flex-wrap gap-2">
            {TOBI_DIALOGUES.map((item, idx) => (
              <button
                key={idx}
                onClick={() => handleSpeak(item.speech, idx === 1 ? "thinking" : "happy")}
                className="flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-white hover:bg-amber-50 text-slate-700 hover:text-amber-900 border-2 border-slate-200 hover:border-amber-300 text-xs sm:text-sm font-bold shadow-[0_2px_0_0_#cbd5e1] hover:shadow-[0_2px_0_0_#f59e0b] btn-chunky transition-all"
              >
                <HelpCircle className="w-3.5 h-3.5 text-amber-500" />
                <span>{item.question}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
