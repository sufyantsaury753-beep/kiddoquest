// Zero-Crash LocalStorage-first State Management for KiddoQuest

export interface StudentProfile {
  name: string;
  grade: string;
  avatar: string;
  stars: number;
  badges: string[];
  completedQuests: string[];
  audioEnabled: boolean;
  soundEffects: boolean;
  liteMode: boolean;
}

const STORAGE_KEY = "kiddoquest_profile_v1";

export const DEFAULT_PROFILE: StudentProfile = {
  name: "Budi Pratama",
  grade: "Kelas 2 SD",
  avatar: "🚀",
  stars: 65,
  badges: ["lab-sains", "hitung-ceria"],
  completedQuests: ["warna-dasar"],
  audioEnabled: true,
  soundEffects: true,
  liteMode: false,
};

export interface AvatarCharacter {
  id: string;
  name: string;
  role: string;
  emoji: string;
  bgColor: string;      // Tailwind bg color
  borderColor: string;  // Tailwind border color
  textColor: string;
}

export const AVAILABLE_AVATARS: AvatarCharacter[] = [
  { id: "tobi", name: "Tobi", role: "Maskot Cerdas", emoji: "🐱", bgColor: "bg-amber-100", borderColor: "border-amber-400", textColor: "text-amber-900" },
  { id: "robot", name: "Bip-Bop", role: "Ahli Koding & AI", emoji: "🤖", bgColor: "bg-sky-100", borderColor: "border-sky-400", textColor: "text-sky-900" },
  { id: "owl", name: "Prof. Boni", role: "Profesor Sains", emoji: "🦉", bgColor: "bg-indigo-100", borderColor: "border-indigo-400", textColor: "text-indigo-900" },
  { id: "fox", name: "Reno", role: "Jago Matematika", emoji: "🦊", bgColor: "bg-orange-100", borderColor: "border-orange-400", textColor: "text-orange-900" },
  { id: "dino", name: "Dino", role: "Penjelajah Alam", emoji: "🦖", bgColor: "bg-emerald-100", borderColor: "border-emerald-400", textColor: "text-emerald-900" },
  { id: "astro", name: "Astro Cilik", role: "Kosmonot Antariksa", emoji: "🚀", bgColor: "bg-blue-100", borderColor: "border-blue-400", textColor: "text-blue-900" },
  { id: "octopus", name: "Oki", role: "Penyelam Laut", emoji: "🐙", bgColor: "bg-purple-100", borderColor: "border-purple-400", textColor: "text-purple-900" },
  { id: "panda", name: "Pandi", role: "Pecinta Lingkungan", emoji: "🐼", bgColor: "bg-teal-100", borderColor: "border-teal-400", textColor: "text-teal-900" },
  { id: "lion", name: "Leo", role: "Juara Olahraga", emoji: "🦁", bgColor: "bg-yellow-100", borderColor: "border-yellow-400", textColor: "text-yellow-900" },
  { id: "tiger", name: "Loreng", role: "Sahabat Nusantara", emoji: "🐯", bgColor: "bg-amber-100", borderColor: "border-amber-500", textColor: "text-amber-950" },
  { id: "frog", name: "Kiki", role: "Asisten Lab Sains", emoji: "🐸", bgColor: "bg-lime-100", borderColor: "border-lime-400", textColor: "text-lime-900" },
  { id: "dolphin", name: "Doli", role: "Perenang Riang", emoji: "🐬", bgColor: "bg-cyan-100", borderColor: "border-cyan-400", textColor: "text-cyan-900" },
  { id: "rabbit", name: "Cimi", role: "Pelari Cepat", emoji: "🐰", bgColor: "bg-rose-100", borderColor: "border-rose-400", textColor: "text-rose-900" },
  { id: "bear", name: "Bobi", role: "Penjelajah Kuat", emoji: "🐻", bgColor: "bg-stone-100", borderColor: "border-stone-400", textColor: "text-stone-900" },
  { id: "alien", name: "Zog", role: "Kawan Galaksi", emoji: "👾", bgColor: "bg-fuchsia-100", borderColor: "border-fuchsia-400", textColor: "text-fuchsia-900" },
  { id: "koala", name: "Koko", role: "Sahabat Ramah", emoji: "🐨", bgColor: "bg-slate-100", borderColor: "border-slate-400", textColor: "text-slate-900" },
  { id: "monkey", name: "Moni", role: "Lincah & Ceria", emoji: "🐵", bgColor: "bg-yellow-100", borderColor: "border-yellow-500", textColor: "text-yellow-950" },
  { id: "penguin", name: "Pingo", role: "Sahabat Kutub Es", emoji: "🐧", bgColor: "bg-sky-100", borderColor: "border-sky-500", textColor: "text-sky-950" },
  { id: "star", name: "Super Star", role: "Bintang Juara", emoji: "⭐", bgColor: "bg-amber-100", borderColor: "border-amber-400", textColor: "text-amber-900" },
  { id: "spark", name: "Petir Cilik", role: "Energi Listrik", emoji: "⚡", bgColor: "bg-yellow-100", borderColor: "border-yellow-400", textColor: "text-yellow-900" },
];

export interface BadgeCharacter {
  id: string;
  legacyIds?: string[];
  title: string;
  zoneTitle: string;
  desc: string;
  iconType: "science" | "math" | "solar" | "culture" | "music" | "exam";
  color: string;
  badgeBg: string;
}

export const AVAILABLE_BADGES: BadgeCharacter[] = [
  {
    id: "lab-sains",
    legacyIds: ["penemu-warna", "penjelajah-pemula"],
    title: "Saintis Lab Sains",
    zoneTitle: "Lab Sains",
    desc: "Eksperimen 5 stasiun laboratorium sains: warna, air, rantai makanan, listrik & magnet",
    iconType: "science",
    color: "bg-emerald-50 text-emerald-900 border-emerald-300",
    badgeBg: "from-emerald-400 to-teal-500",
  },
  {
    id: "hitung-ceria",
    legacyIds: ["juara-hitung", "sahabat-tobi"],
    title: "Pakar Hitung Ceria",
    zoneTitle: "Hitung Ceria",
    desc: "Menaklukkan neraca timbangan logika & tantangan berhitung matematika ceria",
    iconType: "math",
    color: "bg-rose-50 text-rose-900 border-rose-300",
    badgeBg: "from-rose-400 to-amber-500",
  },
  {
    id: "tata-surya",
    legacyIds: ["penjelajah-tatasurya"],
    title: "Penjelajah Tata Surya",
    zoneTitle: "Tata Surya",
    desc: "Menjelajahi matahari, 8 planet & rahasia orbit kosmik antariksa",
    iconType: "solar",
    color: "bg-indigo-50 text-indigo-900 border-indigo-300",
    badgeBg: "from-indigo-500 to-purple-600",
  },
  {
    id: "literasi-nusantara",
    legacyIds: ["penjaga-nusantara"],
    title: "Duta Literasi Nusantara",
    zoneTitle: "Literasi Nusantara",
    desc: "Mengenal kekayaan tradisi, ikon budaya & kuliner khas nusantara se-Indonesia",
    iconType: "culture",
    color: "bg-purple-50 text-purple-900 border-purple-300",
    badgeBg: "from-purple-500 to-fuchsia-600",
  },
  {
    id: "lagu-nasional",
    legacyIds: ["lagu-nasional"],
    title: "Bintang Lagu Nasional",
    zoneTitle: "Lagu Nasional",
    desc: "Memainkan pianika & menghayati 11 lagu wajib perjuangan bangsa Indonesia",
    iconType: "music",
    color: "bg-red-50 text-red-900 border-red-300",
    badgeBg: "from-red-500 to-rose-600",
  },
  {
    id: "evaluasi-sd",
    legacyIds: ["evaluasi-sd"],
    title: "Pahlawan Asesmen SD",
    zoneTitle: "Evaluasi SD",
    desc: "Menuntaskan 300+ bank soal asesmen diagnostik Kurikulum Merdeka",
    iconType: "exam",
    color: "bg-amber-50 text-amber-900 border-amber-300",
    badgeBg: "from-amber-400 to-yellow-500",
  },
];

export function isBadgeUnlocked(profileBadges: string[] = [], badge: BadgeCharacter): boolean {
  if (!profileBadges || !Array.isArray(profileBadges)) return false;
  if (profileBadges.includes(badge.id)) return true;
  if (badge.legacyIds && badge.legacyIds.some((lid) => profileBadges.includes(lid))) return true;
  return false;
}

export function unlockBadge(badgeId: string): StudentProfile {
  if (typeof window === "undefined") return DEFAULT_PROFILE;
  try {
    const current = getStudentProfile();
    if (!current.badges.includes(badgeId)) {
      const updated = { ...current, badges: [...current.badges, badgeId] };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    }
    return current;
  } catch (e) {
    return DEFAULT_PROFILE;
  }
}

export function getStudentProfile(): StudentProfile {
  if (typeof window === "undefined") {
    return DEFAULT_PROFILE;
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PROFILE;
    const parsed = JSON.parse(raw);
    return { ...DEFAULT_PROFILE, ...parsed };
  } catch (e) {
    console.warn("Error reading KiddoQuest profile from localStorage:", e);
    return DEFAULT_PROFILE;
  }
}

export function saveStudentProfile(profile: Partial<StudentProfile>): StudentProfile {
  if (typeof window === "undefined") {
    return DEFAULT_PROFILE;
  }

  try {
    const current = getStudentProfile();
    const updated = { ...current, ...profile };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.warn("Error saving KiddoQuest profile to localStorage:", e);
    return DEFAULT_PROFILE;
  }
}
