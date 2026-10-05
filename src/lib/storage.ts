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
  badges: ["penjelajah-pemula", "sahabat-tobi"],
  completedQuests: ["warna-dasar"],
  audioEnabled: true,
  soundEffects: true,
  liteMode: false,
};

export const AVAILABLE_AVATARS = [
  { id: "rocket", emoji: "🚀", label: "Penjelajah Antariksa" },
  { id: "fox", emoji: "🦊", label: "Rubah Pintar" },
  { id: "dino", emoji: "🦖", label: "Dino Penasaran" },
  { id: "star", emoji: "⭐", label: "Bintang Juara" },
  { id: "robot", emoji: "🤖", label: "Kawan Robot" },
  { id: "plant", emoji: "🌱", label: "Tunas Cerdas" },
];

export const AVAILABLE_BADGES = [
  {
    id: "penjelajah-pemula",
    title: "Penjelajah Cilik",
    desc: "Mulai petualangan belajar di KiddoQuest",
    icon: "🌟",
    color: "bg-amber-100 text-amber-800 border-amber-300",
  },
  {
    id: "sahabat-tobi",
    title: "Sahabat Karib Tobi",
    desc: "Menyapa maskot robot Tobi dan mendengarkan suaranya",
    icon: "🤖",
    color: "bg-sky-100 text-sky-800 border-sky-300",
  },
  {
    id: "penemu-warna",
    title: "Ilmuwan Warna",
    desc: "Mencampur warna primer dan sekunder di Lab Sains",
    icon: "🧪",
    color: "bg-emerald-100 text-emerald-800 border-emerald-300",
  },
  {
    id: "juara-hitung",
    title: "Master Hitung Apel",
    desc: "Menyelesaikan manipulatif matematika pohon buah",
    icon: "🍎",
    color: "bg-rose-100 text-rose-800 border-rose-300",
  },
  {
    id: "penjaga-nusantara",
    title: "Duta Budaya Cilik",
    desc: "Mengenal kekayaan budaya dan cerita Nusantara",
    icon: "🏝️",
    color: "bg-purple-100 text-purple-800 border-purple-300",
  },
];

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
