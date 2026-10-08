"use client";

import React, { useState, useEffect } from "react";
import ScienceNavHeader from "@/components/zones/science/ScienceNavHeader";
import MagnetHunterView from "@/components/zones/science/MagnetHunterView";
import { getStudentProfile, saveStudentProfile, StudentProfile, DEFAULT_PROFILE } from "@/lib/storage";

export default function MagnetStationPage() {
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
          activeStation="magnet"
          stars={profile.stars}
          audioEnabled={profile.audioEnabled}
          onToggleAudio={handleToggleAudio}
          stationTitle="Stasiun 4: Petualangan Magnet Hunter"
          stationSubtitle="Uji 8 objek percobaan pada kutub magnet ladam U dan bedakan sifat feromagnetik vs non-magnetik!"
        />

        <MagnetHunterView
          onEarnStars={handleEarnStars}
          audioEnabled={profile.audioEnabled}
          liteMode={profile.liteMode}
        />
      </div>
    </div>
  );
}
