// src/data/evaluasi/agama.ts
import { PaketEvaluasi, AgamaSubtype } from "./types";
import { SOAL_AGAMA_ISLAM } from "./agama/islam";
import { SOAL_AGAMA_KRISTEN } from "./agama/kristen";
import { SOAL_AGAMA_KATOLIK } from "./agama/katolik";
import { SOAL_AGAMA_HINDU } from "./agama/hindu";
import { SOAL_AGAMA_BUDDHA } from "./agama/buddha";
import { SOAL_AGAMA_KHONGHUCU } from "./agama/khonghucu";

export interface AgamaInfo {
  subtype: AgamaSubtype;
  nama: string;
  sebutanTuhan: string;
  tempatIbadah: string;
  kitabSuci: string;
  deskripsi: string;
}

export const DAFTAR_AGAMA: AgamaInfo[] = [
  {
    subtype: "islam",
    nama: "Pendidikan Agama Islam",
    sebutanTuhan: "Allah SWT",
    tempatIbadah: "Masjid",
    kitabSuci: "Al-Qur'an",
    deskripsi: "Rukun Iman, Rukun Islam, Al-Qur'an surah pendek, akhlak terpuji, dan keteladanan Nabi."
  },
  {
    subtype: "kristen",
    nama: "Pendidikan Agama Kristen (Protestan)",
    sebutanTuhan: "Tuhan Allah / Yesus Kristus",
    tempatIbadah: "Gereja",
    kitabSuci: "Alkitab",
    deskripsi: "Kasih Allah, keteladanan Yesus Kristus, Alkitab, doa, buah-buah Roh, dan hidup rukun."
  },
  {
    subtype: "katolik",
    nama: "Pendidikan Agama Katolik",
    sebutanTuhan: "Allah Bapa, Putra, dan Roh Kudus",
    tempatIbadah: "Gereja Katolik",
    kitabSuci: "Alkitab Katolik (Deuterokanonika)",
    deskripsi: "Sakramen-sakramen, Perayaan Ekaristi, teladan Bunda Maria dan para Santo-Santa, serta kasih sesama."
  },
  {
    subtype: "hindu",
    nama: "Pendidikan Agama Hindu",
    sebutanTuhan: "Ida Sang Hyang Widhi Wasa",
    tempatIbadah: "Pura",
    kitabSuci: "Weda",
    deskripsi: "Panca Sradha, Tri Murti, Tri Hita Karana, Tri Kaya Parisudha, dan hari suci keagamaan."
  },
  {
    subtype: "buddha",
    nama: "Pendidikan Agama Buddha",
    sebutanTuhan: "Sang Hyang Adi Buddha / Triratna",
    tempatIbadah: "Vihara",
    kitabSuci: "Tripitaka",
    deskripsi: "Triratna, riwayat Siddharta Gautama, Empat Kebenaran Mulia, Jalan Utama, dan cinta kasih universal."
  },
  {
    subtype: "khonghucu",
    nama: "Pendidikan Agama Khonghucu",
    sebutanTuhan: "Tian (Thian)",
    tempatIbadah: "Litang / Klenteng",
    kitabSuci: "Si Shu dan Wu Jing",
    deskripsi: "Nabi Kongzi, Wu Chang (Lima Kebajikan), bakti (Xiao), budi pekerti luhur (Junzi), dan tradisi suci."
  }
];

export function getPaketAgama(subtype: AgamaSubtype = "islam"): PaketEvaluasi {
  switch (subtype) {
    case "kristen":
      return {
        mapelId: "agama",
        namaMapel: "Pendidikan Agama Kristen",
        fase: "Fase B (Kelas 3-4)",
        totalSoal: SOAL_AGAMA_KRISTEN.length,
        daftarSoal: SOAL_AGAMA_KRISTEN
      };
    case "katolik":
      return {
        mapelId: "agama",
        namaMapel: "Pendidikan Agama Katolik",
        fase: "Fase B (Kelas 3-4)",
        totalSoal: SOAL_AGAMA_KATOLIK.length,
        daftarSoal: SOAL_AGAMA_KATOLIK
      };
    case "hindu":
      return {
        mapelId: "agama",
        namaMapel: "Pendidikan Agama Hindu",
        fase: "Fase B (Kelas 3-4)",
        totalSoal: SOAL_AGAMA_HINDU.length,
        daftarSoal: SOAL_AGAMA_HINDU
      };
    case "buddha":
      return {
        mapelId: "agama",
        namaMapel: "Pendidikan Agama Buddha",
        fase: "Fase B (Kelas 3-4)",
        totalSoal: SOAL_AGAMA_BUDDHA.length,
        daftarSoal: SOAL_AGAMA_BUDDHA
      };
    case "khonghucu":
      return {
        mapelId: "agama",
        namaMapel: "Pendidikan Agama Khonghucu",
        fase: "Fase B (Kelas 3-4)",
        totalSoal: SOAL_AGAMA_KHONGHUCU.length,
        daftarSoal: SOAL_AGAMA_KHONGHUCU
      };
    case "islam":
    default:
      return {
        mapelId: "agama",
        namaMapel: "Pendidikan Agama Islam",
        fase: "Fase B (Kelas 3-4)",
        totalSoal: SOAL_AGAMA_ISLAM.length,
        daftarSoal: SOAL_AGAMA_ISLAM
      };
  }
}

export const PAKET_AGAMA_DEFAULT = getPaketAgama("islam");
