// src/data/evaluasi/index.ts

export * from "./types";
export * from "./agama";

import { MapelId, AgamaSubtype, PaketEvaluasi, MapelMetadata } from "./types";
import { getPaketAgama, PAKET_AGAMA_DEFAULT } from "./agama";
import { PAKET_PANCASILA } from "./pancasila";
import { PAKET_BAHASA_INDONESIA } from "./bahasaIndonesia";
import { PAKET_MATEMATIKA } from "./matematika";
import { PAKET_IPAS } from "./ipas";
import { PAKET_SENI_BUDAYA } from "./seniBudaya";
import { PAKET_PJOK } from "./pjok";
import { PAKET_BAHASA_INGGRIS } from "./bahasaInggris";
import { PAKET_MUATAN_LOKAL } from "./muatanLokal";
import { PAKET_KODING_AI } from "./kodingAi";

export {
  PAKET_PANCASILA,
  PAKET_BAHASA_INDONESIA,
  PAKET_MATEMATIKA,
  PAKET_IPAS,
  PAKET_SENI_BUDAYA,
  PAKET_PJOK,
  PAKET_BAHASA_INGGRIS,
  PAKET_MUATAN_LOKAL,
  PAKET_KODING_AI,
};

export const DAFTAR_MAPEL: MapelMetadata[] = [
  {
    id: "agama",
    nama: "Pendidikan Agama",
    kategori: "Karakter & Spiritual",
    deskripsi: "Tersedia 6 pilihan agama resmi (Islam, Kristen, Katolik, Hindu, Buddha, Khonghucu) dengan materi iman, doa, dan budi pekerti.",
    warnaTema: {
      bg: "bg-emerald-50 hover:bg-emerald-100/70",
      border: "border-emerald-500",
      text: "text-emerald-800",
      badge: "bg-emerald-100 text-emerald-800 border-emerald-300",
      shadow: "shadow-[0_4px_0_0_#059669]",
    },
    ikonNama: "Heart",
  },
  {
    id: "pancasila",
    nama: "Pendidikan Pancasila",
    kategori: "Kewarganegaraan",
    deskripsi: "Sila 1-5, simbol Garuda, hak & kewajiban anak, musyawarah, aturan hidup, serta gotong royong Bhinneka Tunggal Ika.",
    warnaTema: {
      bg: "bg-red-50 hover:bg-red-100/70",
      border: "border-red-500",
      text: "text-red-800",
      badge: "bg-red-100 text-red-800 border-red-300",
      shadow: "shadow-[0_4px_0_0_#dc2626]",
    },
    ikonNama: "Shield",
  },
  {
    id: "bahasaIndonesia",
    nama: "Bahasa Indonesia",
    kategori: "Literasi Membaca",
    deskripsi: "Ide pokok paragraf, pemahaman teks fiksi/fabel, kosakata baru, tanda baca EYD, kalimat efektif, dan puisi/pantun.",
    warnaTema: {
      bg: "bg-amber-50 hover:bg-amber-100/70",
      border: "border-amber-500",
      text: "text-amber-800",
      badge: "bg-amber-100 text-amber-800 border-amber-300",
      shadow: "shadow-[0_4px_0_0_#d97706]",
    },
    ikonNama: "BookOpen",
  },
  {
    id: "matematika",
    nama: "Matematika",
    kategori: "Literasi Numerasi",
    deskripsi: "Operasi hitung campuran, FPB & KPK, pecahan & desimal, bangun datar keliling & luas, sudut, serta soal cerita HOTS.",
    warnaTema: {
      bg: "bg-blue-50 hover:bg-blue-100/70",
      border: "border-blue-500",
      text: "text-blue-800",
      badge: "bg-blue-100 text-blue-800 border-blue-300",
      shadow: "shadow-[0_4px_0_0_#2563eb]",
    },
    ikonNama: "Calculator",
  },
  {
    id: "ipas",
    nama: "IPAS (Alam & Sosial)",
    kategori: "Sains & Sosial",
    deskripsi: "Fotosintesis tumbuhan, metamorfosis hewan, rantai makanan, perubahan zat, magnet & listrik, peta, serta sejarah kerajaan.",
    warnaTema: {
      bg: "bg-teal-50 hover:bg-teal-100/70",
      border: "border-teal-500",
      text: "text-teal-800",
      badge: "bg-teal-100 text-teal-800 border-teal-300",
      shadow: "shadow-[0_4px_0_0_#0d9488]",
    },
    ikonNama: "Compass",
  },
  {
    id: "seniBudaya",
    nama: "Seni dan Budaya",
    kategori: "Kreativitas & Kesenian",
    deskripsi: "Warna primer & sekunder, mozaik & kolase, alat musik tradisional, tangga nada lagu, ragam tarian daerah, serta properti seni.",
    warnaTema: {
      bg: "bg-purple-50 hover:bg-purple-100/70",
      border: "border-purple-500",
      text: "text-purple-800",
      badge: "bg-purple-100 text-purple-800 border-purple-300",
      shadow: "shadow-[0_4px_0_0_#9333ea]",
    },
    ikonNama: "Palette",
  },
  {
    id: "pjok",
    nama: "PJOK (Jasmani & Kesehatan)",
    kategori: "Olahraga & Kesehatan",
    deskripsi: "Gerak lokomotor, permainan bola besar & kecil, kebugaran jasmani, senam lantai, gizi Isi Piringku, serta kebersihan diri.",
    warnaTema: {
      bg: "bg-orange-50 hover:bg-orange-100/70",
      border: "border-orange-500",
      text: "text-orange-800",
      badge: "bg-orange-100 text-orange-800 border-orange-300",
      shadow: "shadow-[0_4px_0_0_#ea580c]",
    },
    ikonNama: "Activity",
  },
  {
    id: "bahasaInggris",
    nama: "Bahasa Inggris",
    kategori: "Bahasa Asing",
    deskripsi: "Daily greetings, family & classroom vocabulary, telling time, numbers, simple present tense, prepositions, and reading comprehension.",
    warnaTema: {
      bg: "bg-sky-50 hover:bg-sky-100/70",
      border: "border-sky-500",
      text: "text-sky-800",
      badge: "bg-sky-100 text-sky-800 border-sky-300",
      shadow: "shadow-[0_4px_0_0_#0284c7]",
    },
    ikonNama: "Globe",
  },
  {
    id: "muatanLokal",
    nama: "Muatan Lokal Nusantara",
    kategori: "Kearifan Tradisi",
    deskripsi: "Rumah adat Nusantara, pakaian & senjata pusaka tradisional, upacara adat (Ngaben, Kasada, Sekaten), serta permainan tradisional.",
    warnaTema: {
      bg: "bg-rose-50 hover:bg-rose-100/70",
      border: "border-rose-500",
      text: "text-rose-800",
      badge: "bg-rose-100 text-rose-800 border-rose-300",
      shadow: "shadow-[0_4px_0_0_#e11d48]",
    },
    ikonNama: "Landmark",
  },
  {
    id: "kodingAi",
    nama: "Koding & AI",
    kategori: "Teknologi Masa Depan",
    deskripsi: "4 pilar berpikir komputasional, algoritma runtut, If-Else, looping, variabel, cara kerja AI & Machine Learning, serta internet sehat.",
    warnaTema: {
      bg: "bg-indigo-50 hover:bg-indigo-100/70",
      border: "border-indigo-500",
      text: "text-indigo-800",
      badge: "bg-indigo-100 text-indigo-800 border-indigo-300",
      shadow: "shadow-[0_4px_0_0_#4f46e5]",
    },
    ikonNama: "Cpu",
  },
];

export function getPaketEvaluasi(mapelId: MapelId, agamaSubtype: AgamaSubtype = "islam"): PaketEvaluasi {
  switch (mapelId) {
    case "agama":
      return getPaketAgama(agamaSubtype);
    case "pancasila":
      return PAKET_PANCASILA;
    case "bahasaIndonesia":
      return PAKET_BAHASA_INDONESIA;
    case "matematika":
      return PAKET_MATEMATIKA;
    case "ipas":
      return PAKET_IPAS;
    case "seniBudaya":
      return PAKET_SENI_BUDAYA;
    case "pjok":
      return PAKET_PJOK;
    case "bahasaInggris":
      return PAKET_BAHASA_INGGRIS;
    case "muatanLokal":
      return PAKET_MUATAN_LOKAL;
    case "kodingAi":
      return PAKET_KODING_AI;
    default:
      return PAKET_PANCASILA;
  }
}
