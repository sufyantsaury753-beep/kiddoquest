"use client";

import React, { useState, useEffect } from "react";
import EvaluasiModal from "@/components/zones/EvaluasiModal";
import { getStudentProfile, saveStudentProfile, StudentProfile, DEFAULT_PROFILE } from "@/lib/storage";

export default function EvaluasiPage() {
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

  if (!mounted) return null;

  return (
    <EvaluasiModal
      isOpen={true}
      onClose={() => {}}
      onEarnStars={handleEarnStars}
      audioEnabled={profile.audioEnabled}
      liteMode={profile.liteMode}
      isFullPage={true}
      stars={profile.stars}
    />
  );
}
