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

export const AVAILABLE_BADGES = [
  {
    id: "penjelajah-pemula",
    title: "Penjelajah Cilik",
    desc: "Mulai petualangan belajar di TobiQuest",
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
  {
    id: "penjelajah-tatasurya",
    title: "Astronot Cilik",
    desc: "Menjelajahi matahari dan planet di Lab Tata Surya",
    icon: "🪐",
    color: "bg-indigo-100 text-indigo-800 border-indigo-300",
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
