"use client";

import React, { useState, useEffect } from "react";
import ScienceNavHeader from "@/components/zones/science/ScienceNavHeader";
import FoodChainView from "@/components/zones/science/FoodChainView";
import { getStudentProfile, saveStudentProfile, StudentProfile, DEFAULT_PROFILE } from "@/lib/storage";

export default function RantaiMakananStationPage() {
  const [profile, setProfile] = useState<StudentProfile>(DEFAULT_PROFILE);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = getStudentProfile();
    setProfile(stored);
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
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-16">
      <div className="max-w-6xl mx-auto px-3 sm:px-4 pt-3 sm:pt-4 space-y-4 sm:space-y-6">
        <ScienceNavHeader
          activeStation="rantai-makanan"
          stars={profile.stars}
          audioEnabled={profile.audioEnabled}
          onToggleAudio={handleToggleAudio}
          stationTitle="Stasiun 1: Papan Rantai Makanan & Krisis Ekosistem"
          stationSubtitle="Tebak misteri peran ekologi makhluk hidup di sawah & laut, serta telusuri dampak kepunahan spesies!"
        />

        <FoodChainView
          onEarnStars={handleEarnStars}
          audioEnabled={profile.audioEnabled}
          liteMode={profile.liteMode}
        />
      </div>
    </div>
  );
}
