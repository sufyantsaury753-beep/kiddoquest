"use client";

import React, { useState, useEffect } from "react";
import ScienceLabModal from "@/components/zones/ScienceLabModal";
import { getStudentProfile, saveStudentProfile, StudentProfile, DEFAULT_PROFILE } from "@/lib/storage";

export default function LabSainsPage() {
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
    <ScienceLabModal
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
