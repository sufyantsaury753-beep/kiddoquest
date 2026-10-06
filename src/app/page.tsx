"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import MascotTobi from "@/components/MascotTobi";
import LearningZonesGrid from "@/components/LearningZonesGrid";
import SocraticMentorBox from "@/components/SocraticMentorBox";
import StatsAndBadges from "@/components/StatsAndBadges";
import TelkomselLiteBanner from "@/components/TelkomselLiteBanner";
import Footer from "@/components/Footer";

// Modals
import CertificateModal from "@/components/CertificateModal";
import ProfileModal from "@/components/ProfileModal";
import ScienceLabModal from "@/components/zones/ScienceLabModal";
import MathAdventureModal from "@/components/zones/MathAdventureModal";
import SolarSystemModal from "@/components/zones/SolarSystemModal";
import EvaluasiModal from "@/components/zones/EvaluasiModal";

import { 
  StudentProfile, 
  DEFAULT_PROFILE, 
  getStudentProfile, 
  saveStudentProfile 
} from "@/lib/storage";
import { sound } from "@/lib/sound";

export default function TobiQuestHomePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<StudentProfile>(DEFAULT_PROFILE);
  const [mounted, setMounted] = useState(false);

  // Modal States
  const [isCertificateOpen, setIsCertificateOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [activeZoneModal, setActiveZoneModal] = useState<string | null>(null);

  useEffect(() => {
    // Hydrate state from localStorage
    const stored = getStudentProfile();
    setProfile(stored);
    setMounted(true);
    sound.setSpeechEnabled(stored.audioEnabled);
  }, []);

  useEffect(() => {
    if (mounted) {
      if (profile.liteMode) {
        document.body.classList.add("telkomsel-lite");
      } else {
        document.body.classList.remove("telkomsel-lite");
      }
    }
  }, [profile.liteMode, mounted]);

  const handleUpdateProfile = (data: Partial<StudentProfile>) => {
    const updated = saveStudentProfile(data);
    setProfile(updated);
  };

  const handleEarnStars = (amount: number) => {
    const newStars = profile.stars + amount;
    handleUpdateProfile({ stars: newStars });
  };

  const handleResetProgress = () => {
    if (window.confirm("Apakah kamu yakin ingin mereset bintang dan kembali ke awal?")) {
      const reset = saveStudentProfile(DEFAULT_PROFILE);
      setProfile(reset);
      sound.playChime();
    }
  };

  return (
    <div className={`min-h-screen flex flex-col bg-amber-50/40 text-slate-800 ${profile.liteMode ? "lite-high-contrast" : ""}`}>
      {/* 1. Interactive Navbar */}
      <Navbar
        profile={profile}
        onUpdateProfile={handleUpdateProfile}
        onOpenCertificate={() => setIsCertificateOpen(true)}
        onOpenProfile={() => setIsProfileOpen(true)}
        onOpenEvaluasi={() => setActiveZoneModal("evaluasi")}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8">
        {/* 2. Mascot Tobi Hero Section */}
        <MascotTobi
          studentName={profile.name}
          liteMode={profile.liteMode}
          audioEnabled={profile.audioEnabled}
        />

        {/* 3. Core Learning Zones Grid */}
        <LearningZonesGrid
          onSelectZone={(zoneId) => {
            if (zoneId === "cerita") {
              router.push("/literasi-nusantara");
            } else {
              setActiveZoneModal(zoneId);
            }
          }}
          audioEnabled={profile.audioEnabled}
          liteMode={profile.liteMode}
        />

        {/* 4. Socratic AI Kids Mentor Mini Challenge */}
        <SocraticMentorBox
          onEarnStars={handleEarnStars}
          audioEnabled={profile.audioEnabled}
          liteMode={profile.liteMode}
        />

        {/* 5. Gamification Stats, Levels, & Badges */}
        <StatsAndBadges
          profile={profile}
          onOpenCertificate={() => setIsCertificateOpen(true)}
          liteMode={profile.liteMode}
        />

        {/* 6. Telkomsel Lite Mode Innovation Banner */}
        <TelkomselLiteBanner
          liteMode={profile.liteMode}
          onToggleLiteMode={() => handleUpdateProfile({ liteMode: !profile.liteMode })}
        />
      </main>

      {/* 7. Footer & Teacher Guide */}
      <Footer
        onOpenCertificate={() => setIsCertificateOpen(true)}
        onResetProgress={handleResetProgress}
      />

      {/* --- MODAL DIALOGS --- */}

      {/* Certificate Modal */}
      <CertificateModal
        isOpen={isCertificateOpen}
        onClose={() => setIsCertificateOpen(false)}
        profile={profile}
        onUpdateProfile={handleUpdateProfile}
      />

      {/* Profile Modal */}
      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        profile={profile}
        onUpdateProfile={handleUpdateProfile}
      />

      {/* Zone 1: Lab Sains Cilik Modal */}
      <ScienceLabModal
        isOpen={activeZoneModal === "sains"}
        onClose={() => setActiveZoneModal(null)}
        onEarnStars={handleEarnStars}
        audioEnabled={profile.audioEnabled}
        liteMode={profile.liteMode}
      />

      {/* Zone 2: Petualangan Berhitung Ceria Modal */}
      <MathAdventureModal
        isOpen={activeZoneModal === "berhitung"}
        onClose={() => setActiveZoneModal(null)}
        onEarnStars={handleEarnStars}
        audioEnabled={profile.audioEnabled}
        liteMode={profile.liteMode}
      />

      {/* Zone 3: Penjelajah Tata Surya Cilik Modal (Baru) */}
      <SolarSystemModal
        isOpen={activeZoneModal === "tatasurya"}
        onClose={() => setActiveZoneModal(null)}
        onEarnStars={handleEarnStars}
        audioEnabled={profile.audioEnabled}
        liteMode={profile.liteMode}
      />



      {/* Zone 5: Pusat Evaluasi Literasi SD Modal (10 Mapel Lengkap) */}
      <EvaluasiModal
        isOpen={activeZoneModal === "evaluasi"}
        onClose={() => setActiveZoneModal(null)}
        onEarnStars={handleEarnStars}
        audioEnabled={profile.audioEnabled}
        liteMode={profile.liteMode}
      />
    </div>
  );
}
