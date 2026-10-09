"use client";

import React, { useState, useEffect } from "react";
import MathNavHeader from "@/components/zones/math/MathNavHeader";
import AlgebraDetectiveView from "@/components/zones/math/AlgebraDetectiveView";
import { getStudentProfile, saveStudentProfile, StudentProfile, DEFAULT_PROFILE, unlockBadge } from "@/lib/storage";
import { sound } from "@/lib/sound";

export default function DetektifStationPage() {
  const [profile, setProfile] = useState<StudentProfile>(DEFAULT_PROFILE);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = unlockBadge("hitung-ceria");
    setProfile(stored);
    sound.setSpeechEnabled(stored.audioEnabled);
    setMounted(true);
  }, []);

  const handleEarnStars = (amount: number) => {
    const updated = saveStudentProfile({ stars: profile.stars + amount });
    setProfile(updated);
  };

  const handleToggleAudio = () => {
    const nextVal = !profile.audioEnabled;
    const updated = saveStudentProfile({ audioEnabled: nextVal });
    setProfile(updated);
    sound.setSpeechEnabled(nextVal);
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-rose-50/50 font-sans pb-16">
      <div className="max-w-6xl mx-auto px-3 sm:px-4 pt-3 sm:pt-4 space-y-4 sm:space-y-6">
        <MathNavHeader
          activeStation="detektif"
          stars={profile.stars}
          audioEnabled={profile.audioEnabled}
          onToggleAudio={handleToggleAudio}
          stationTitle="Stasiun 3: Detektif Aljabar Buah"
          stationSubtitle="Pecahkan misteri nilai buah dengan metode eliminasi dan substitusi aljabar cilik!"
        />

        <AlgebraDetectiveView
          onEarnStars={handleEarnStars}
          audioEnabled={profile.audioEnabled}
          liteMode={profile.liteMode}
        />
      </div>
    </div>
  );
}
