import { LaguNasional, MelodyNote } from "@/lib/nationalMelodyEngine";

// Frekuensi nada standar Diatonis Mayor C4 - C5 (Solmisasi Not Angka Indonesia)
export const NADA_FREKUENSI: Record<string, number> = {
  "5.": 196.00, // G3 (Sol Rendah)
  "6.": 220.00, // A3 (La Rendah)
  "7.": 246.94, // B3 (Si Rendah)
  "1": 261.63,  // C4 (Do)
  "2": 293.66,  // D4 (Re)
  "3": 329.63,  // E4 (Mi)
  "4": 349.23,  // F4 (Fa)
  "5": 392.00,  // G4 (Sol)
  "6": 440.00,  // A4 (La)
  "7": 493.88,  // B4 (Si)
  "1'": 523.25, // C5 (Do Tinggi)
  "2'": 587.33, // D5 (Re Tinggi)
  "3'": 659.25, // E5 (Mi Tinggi)
  "4'": 698.46, // F5 (Fa Tinggi)
  "5'": 783.99, // G5 (Sol Tinggi)
  "0": 0,       // Tanda Istirahat / Diam
};

// Daftar tuts visual Pianika yang ditampilkan pada keyboard edukatif
export interface PianikaKey {
  notAngka: string;
  labelSolfegio: string;
  nadaHz: number;
  isAccidental?: boolean;
}

export const PIANIKA_KEYS: PianikaKey[] = [
  { notAngka: "5.", labelSolfegio: "Soḷ", nadaHz: 196.00 },
  { notAngka: "6.", labelSolfegio: "Lạ", nadaHz: 220.00 },
  { notAngka: "7.", labelSolfegio: "Sị", nadaHz: 246.94 },
  { notAngka: "1", labelSolfegio: "Do", nadaHz: 261.63 },
  { notAngka: "2", labelSolfegio: "Re", nadaHz: 293.66 },
  { notAngka: "3", labelSolfegio: "Mi", nadaHz: 329.63 },
  { notAngka: "4", labelSolfegio: "Fa", nadaHz: 349.23 },
  { notAngka: "5", labelSolfegio: "Sol", nadaHz: 392.00 },
  { notAngka: "6", labelSolfegio: "La", nadaHz: 440.00 },
  { notAngka: "7", labelSolfegio: "Si", nadaHz: 493.88 },
  { notAngka: "1'", labelSolfegio: "Dȯ", nadaHz: 523.25 },
  { notAngka: "2'", labelSolfegio: "Rė", nadaHz: 587.33 },
  { notAngka: "3'", labelSolfegio: "Mi̇", nadaHz: 659.25 },
];

export const DATA_LAGU_NASIONAL: LaguNasional[] = [
  // 1. GARUDA PANCASILA
  {
    id: "garuda-pancasila",
    judul: "Garuda Pancasila",
    pencipta: "Prohar Sudharnoto",
    tempoBpm: 100,
    birama: "4/4",
    sejarah:
      "Diciptakan pada tahun 1956 oleh Prohar Sudharnoto, seorang musisi RRI. Lagu ini awalnya berjudul 'Mars Pancasila' dan menjadi penyemangat rakyat Indonesia untuk setia menjaga dasar negara Pancasila serta lambang Garuda.",
    nilaiKarakter:
      "Kewarganegaraan, Kebhinnekaan Global, serta Tekad Membela Dasar Negara dan Keadilan Sosial bagi Seluruh Rakyat Indonesia.",
    stanzas: [
      "Garuda Pancasila, akulah pendukungmu",
      "Patriot proklamasi, sedia berkorban untukmu",
      "Pancasila dasar negara, rakyat adil makmur sentosa",
      "Pribadi bangsaku, ayo maju maju, ayo maju maju, ayo maju maju!",
    ],
    melody: [
      // Baris 1: Ga-ru-da pan-ca-si-la, a-ku-lah pen-du-kung-mu
      { notAngka: "5.", nadaHz: 196.0, durasi: 0.35, lirikSukuKata: "Ga-", barisLirik: 0 },
      { notAngka: "5.", nadaHz: 196.0, durasi: 0.35, lirikSukuKata: "ru-", barisLirik: 0 },
      { notAngka: "1", nadaHz: 261.63, durasi: 0.45, lirikSukuKata: "da ", barisLirik: 0 },
      { notAngka: "1", nadaHz: 261.63, durasi: 0.35, lirikSukuKata: "Pan-", barisLirik: 0 },
      { notAngka: "2", nadaHz: 293.66, durasi: 0.35, lirikSukuKata: "ca-", barisLirik: 0 },
      { notAngka: "2", nadaHz: 293.66, durasi: 0.35, lirikSukuKata: "si-", barisLirik: 0 },
      { notAngka: "3", nadaHz: 329.63, durasi: 0.7, lirikSukuKata: "la, ", barisLirik: 0 },
      { notAngka: "3", nadaHz: 329.63, durasi: 0.35, lirikSukuKata: "a-", barisLirik: 0 },
      { notAngka: "2", nadaHz: 293.66, durasi: 0.35, lirikSukuKata: "ku-", barisLirik: 0 },
      { notAngka: "1", nadaHz: 261.63, durasi: 0.45, lirikSukuKata: "lah ", barisLirik: 0 },
      { notAngka: "2", nadaHz: 293.66, durasi: 0.35, lirikSukuKata: "pen-", barisLirik: 0 },
      { notAngka: "3", nadaHz: 329.63, durasi: 0.35, lirikSukuKata: "du-", barisLirik: 0 },
      { notAngka: "4", nadaHz: 349.23, durasi: 0.7, lirikSukuKata: "kung-", barisLirik: 0 },
      { notAngka: "3", nadaHz: 329.63, durasi: 0.35, lirikSukuKata: "mu! ", barisLirik: 0 },
      { notAngka: "0", nadaHz: 0, durasi: 0.25, lirikSukuKata: "", barisLirik: 0 },

      // Baris 2: Pa-tri-ot pro-kla-ma-si, se-di-a ber-kor-ban un-tuk-mu
      { notAngka: "2", nadaHz: 293.66, durasi: 0.35, lirikSukuKata: "Pa-", barisLirik: 1 },
      { notAngka: "2", nadaHz: 293.66, durasi: 0.35, lirikSukuKata: "tri-", barisLirik: 1 },
      { notAngka: "3", nadaHz: 329.63, durasi: 0.45, lirikSukuKata: "ot ", barisLirik: 1 },
      { notAngka: "4", nadaHz: 349.23, durasi: 0.4, lirikSukuKata: "pro-", barisLirik: 1 },
      { notAngka: "5", nadaHz: 392.0, durasi: 0.35, lirikSukuKata: "kla-", barisLirik: 1 },
      { notAngka: "5", nadaHz: 392.0, durasi: 0.65, lirikSukuKata: "ma-", barisLirik: 1 },
      { notAngka: "5", nadaHz: 392.0, durasi: 0.4, lirikSukuKata: "si, ", barisLirik: 1 },
      { notAngka: "6.", nadaHz: 220.0, durasi: 0.35, lirikSukuKata: "se-", barisLirik: 1 },
      { notAngka: "7.", nadaHz: 246.94, durasi: 0.35, lirikSukuKata: "di-", barisLirik: 1 },
      { notAngka: "1", nadaHz: 261.63, durasi: 0.35, lirikSukuKata: "a ", barisLirik: 1 },
      { notAngka: "2", nadaHz: 293.66, durasi: 0.35, lirikSukuKata: "ber-", barisLirik: 1 },
      { notAngka: "3", nadaHz: 329.63, durasi: 0.45, lirikSukuKata: "kor-", barisLirik: 1 },
      { notAngka: "1", nadaHz: 261.63, durasi: 0.35, lirikSukuKata: "ban ", barisLirik: 1 },
      { notAngka: "2", nadaHz: 293.66, durasi: 0.4, lirikSukuKata: "un-", barisLirik: 1 },
      { notAngka: "3", nadaHz: 329.63, durasi: 0.35, lirikSukuKata: "tuk-", barisLirik: 1 },
      { notAngka: "1", nadaHz: 261.63, durasi: 0.7, lirikSukuKata: "mu. ", barisLirik: 1 },
      { notAngka: "0", nadaHz: 0, durasi: 0.25, lirikSukuKata: "", barisLirik: 1 },

      // Baris 3: Pan-ca-si-la da-sar ne-ga-ra, ray-at a-dil mak-mur sen-to-sa
      { notAngka: "5", nadaHz: 392.0, durasi: 0.35, lirikSukuKata: "Pan-", barisLirik: 2 },
      { notAngka: "5", nadaHz: 392.0, durasi: 0.35, lirikSukuKata: "ca-", barisLirik: 2 },
      { notAngka: "4", nadaHz: 349.23, durasi: 0.35, lirikSukuKata: "si-", barisLirik: 2 },
      { notAngka: "3", nadaHz: 329.63, durasi: 0.35, lirikSukuKata: "la ", barisLirik: 2 },
      { notAngka: "2", nadaHz: 293.66, durasi: 0.35, lirikSukuKata: "da-", barisLirik: 2 },
      { notAngka: "1", nadaHz: 261.63, durasi: 0.45, lirikSukuKata: "sar ", barisLirik: 2 },
      { notAngka: "2", nadaHz: 293.66, durasi: 0.35, lirikSukuKata: "ne-", barisLirik: 2 },
      { notAngka: "3", nadaHz: 329.63, durasi: 0.65, lirikSukuKata: "ga-", barisLirik: 2 },
      { notAngka: "2", nadaHz: 293.66, durasi: 0.4, lirikSukuKata: "ra, ", barisLirik: 2 },
      { notAngka: "3", nadaHz: 329.63, durasi: 0.35, lirikSukuKata: "rak-", barisLirik: 2 },
      { notAngka: "4", nadaHz: 349.23, durasi: 0.35, lirikSukuKata: "yat ", barisLirik: 2 },
      { notAngka: "5", nadaHz: 392.0, durasi: 0.45, lirikSukuKata: "a-", barisLirik: 2 },
      { notAngka: "4", nadaHz: 349.23, durasi: 0.35, lirikSukuKata: "dil ", barisLirik: 2 },
      { notAngka: "3", nadaHz: 329.63, durasi: 0.35, lirikSukuKata: "mak-", barisLirik: 2 },
      { notAngka: "2", nadaHz: 293.66, durasi: 0.4, lirikSukuKata: "mur ", barisLirik: 2 },
      { notAngka: "1", nadaHz: 261.63, durasi: 0.35, lirikSukuKata: "sen-", barisLirik: 2 },
      { notAngka: "7.", nadaHz: 246.94, durasi: 0.35, lirikSukuKata: "to-", barisLirik: 2 },
      { notAngka: "1", nadaHz: 261.63, durasi: 0.7, lirikSukuKata: "sa. ", barisLirik: 2 },
      { notAngka: "0", nadaHz: 0, durasi: 0.25, lirikSukuKata: "", barisLirik: 2 },

      // Baris 4: Pri-ba-di bang-sa-ku, a-yo ma-ju ma-ju, a-yo ma-ju ma-ju!
      { notAngka: "1", nadaHz: 261.63, durasi: 0.35, lirikSukuKata: "Pri-", barisLirik: 3 },
      { notAngka: "2", nadaHz: 293.66, durasi: 0.35, lirikSukuKata: "ba-", barisLirik: 3 },
      { notAngka: "3", nadaHz: 329.63, durasi: 0.45, lirikSukuKata: "di ", barisLirik: 3 },
      { notAngka: "1", nadaHz: 261.63, durasi: 0.35, lirikSukuKata: "bang-", barisLirik: 3 },
      { notAngka: "2", nadaHz: 293.66, durasi: 0.35, lirikSukuKata: "sa-", barisLirik: 3 },
      { notAngka: "1", nadaHz: 261.63, durasi: 0.7, lirikSukuKata: "ku! ", barisLirik: 3 },
      { notAngka: "5.", nadaHz: 196.0, durasi: 0.35, lirikSukuKata: "A-", barisLirik: 3 },
      { notAngka: "1", nadaHz: 261.63, durasi: 0.45, lirikSukuKata: "yo ", barisLirik: 3 },
      { notAngka: "2", nadaHz: 293.66, durasi: 0.35, lirikSukuKata: "ma-", barisLirik: 3 },
      { notAngka: "3", nadaHz: 329.63, durasi: 0.55, lirikSukuKata: "ju ", barisLirik: 3 },
      { notAngka: "2", nadaHz: 293.66, durasi: 0.35, lirikSukuKata: "ma-", barisLirik: 3 },
      { notAngka: "1", nadaHz: 261.63, durasi: 0.8, lirikSukuKata: "ju! ", barisLirik: 3 },
    ],
  },

  // 2. HARI MERDEKA (17 AGUSTUS)
  {
    id: "hari-merdeka",
    judul: "Hari Merdeka (17 Agustus)",
    pencipta: "Husein Mutahar",
    tempoBpm: 115,
    birama: "2/4",
    sejarah:
      "Diciptakan oleh H. Mutahar pada tahun 1946 saat masa perang kemerdekaan di Yogyakarta. Lagu penuh tempo derap langkah ini mengobarkan rasa syukur atas proklamasi kemerdekaan dan janji setia membela Republik Indonesia.",
    nilaiKarakter:
      "Nasionalisme, Semangat Pantang Menyerah, Tanggung Jawab Generasi Muda Mempertahankan Kemerdekaan.",
    stanzas: [
      "Tujuh belas Agustus tahun empat lima",
      "Itulah hari kemerdekaan kita",
      "Hari merdeka nusa dan bangsa",
      "Hari lahirnya bangsa Indonesia, merdeka!",
      "Sekali merdeka tetap merdeka, selama hayat masih dikandung badan",
      "Kita tetap setia tetap sedia, mempertahankan Indonesia, kita tetap setia tetap sedia, membela negara kita!",
    ],
    melody: [
      // Tu-juh be-las A-gus-tus ta-hun em-pat li-ma
      { notAngka: "5.", nadaHz: 196.0, durasi: 0.28, lirikSukuKata: "Tu-", barisLirik: 0 },
      { notAngka: "5.", nadaHz: 196.0, durasi: 0.28, lirikSukuKata: "juh ", barisLirik: 0 },
      { notAngka: "5.", nadaHz: 196.0, durasi: 0.28, lirikSukuKata: "be-", barisLirik: 0 },
      { notAngka: "1", nadaHz: 261.63, durasi: 0.35, lirikSukuKata: "las ", barisLirik: 0 },
      { notAngka: "5.", nadaHz: 196.0, durasi: 0.28, lirikSukuKata: "A-", barisLirik: 0 },
      { notAngka: "5.", nadaHz: 196.0, durasi: 0.28, lirikSukuKata: "gus-", barisLirik: 0 },
      { notAngka: "3", nadaHz: 329.63, durasi: 0.45, lirikSukuKata: "tus ", barisLirik: 0 },
      { notAngka: "1", nadaHz: 261.63, durasi: 0.28, lirikSukuKata: "ta-", barisLirik: 0 },
      { notAngka: "1", nadaHz: 261.63, durasi: 0.28, lirikSukuKata: "hun ", barisLirik: 0 },
      { notAngka: "2", nadaHz: 293.66, durasi: 0.35, lirikSukuKata: "em-", barisLirik: 0 },
      { notAngka: "3", nadaHz: 329.63, durasi: 0.35, lirikSukuKata: "pat ", barisLirik: 0 },
      { notAngka: "2", nadaHz: 293.66, durasi: 0.3, lirikSukuKata: "li-", barisLirik: 0 },
      { notAngka: "1", nadaHz: 261.63, durasi: 0.55, lirikSukuKata: "ma, ", barisLirik: 0 },

      // I-tu-lah ha-ri ke-mer-de-ka-an ki-ta
      { notAngka: "5.", nadaHz: 196.0, durasi: 0.28, lirikSukuKata: "I-", barisLirik: 1 },
      { notAngka: "5.", nadaHz: 196.0, durasi: 0.28, lirikSukuKata: "tu-", barisLirik: 1 },
      { notAngka: "1", nadaHz: 261.63, durasi: 0.35, lirikSukuKata: "lah ", barisLirik: 1 },
      { notAngka: "5.", nadaHz: 196.0, durasi: 0.28, lirikSukuKata: "ha-", barisLirik: 1 },
      { notAngka: "3", nadaHz: 329.63, durasi: 0.45, lirikSukuKata: "ri ", barisLirik: 1 },
      { notAngka: "1", nadaHz: 261.63, durasi: 0.28, lirikSukuKata: "ke-", barisLirik: 1 },
      { notAngka: "2", nadaHz: 293.66, durasi: 0.28, lirikSukuKata: "mer-", barisLirik: 1 },
      { notAngka: "3", nadaHz: 329.63, durasi: 0.35, lirikSukuKata: "de-", barisLirik: 1 },
      { notAngka: "4", nadaHz: 349.23, durasi: 0.35, lirikSukuKata: "ka-", barisLirik: 1 },
      { notAngka: "3", nadaHz: 329.63, durasi: 0.3, lirikSukuKata: "an ", barisLirik: 1 },
      { notAngka: "2", nadaHz: 293.66, durasi: 0.55, lirikSukuKata: "ki-ta, ", barisLirik: 1 },

      // Ha-ri mer-de-ka nu-sa dan bang-sa
      { notAngka: "5", nadaHz: 392.0, durasi: 0.35, lirikSukuKata: "Ha-", barisLirik: 2 },
      { notAngka: "5", nadaHz: 392.0, durasi: 0.35, lirikSukuKata: "ri ", barisLirik: 2 },
      { notAngka: "4", nadaHz: 349.23, durasi: 0.35, lirikSukuKata: "mer-", barisLirik: 2 },
      { notAngka: "3", nadaHz: 329.63, durasi: 0.35, lirikSukuKata: "de-", barisLirik: 2 },
      { notAngka: "2", nadaHz: 293.66, durasi: 0.45, lirikSukuKata: "ka ", barisLirik: 2 },
      { notAngka: "3", nadaHz: 329.63, durasi: 0.35, lirikSukuKata: "nu-", barisLirik: 2 },
      { notAngka: "4", nadaHz: 349.23, durasi: 0.35, lirikSukuKata: "sa ", barisLirik: 2 },
      { notAngka: "3", nadaHz: 329.63, durasi: 0.35, lirikSukuKata: "dan ", barisLirik: 2 },
      { notAngka: "2", nadaHz: 293.66, durasi: 0.35, lirikSukuKata: "bang-", barisLirik: 2 },
      { notAngka: "1", nadaHz: 261.63, durasi: 0.6, lirikSukuKata: "sa! ", barisLirik: 2 },

      // Ha-ri la-hir-nya bang-sa In-do-ne-sia, mer-de-ka!
      { notAngka: "5.", nadaHz: 196.0, durasi: 0.28, lirikSukuKata: "Ha-", barisLirik: 3 },
      { notAngka: "1", nadaHz: 261.63, durasi: 0.28, lirikSukuKata: "ri ", barisLirik: 3 },
      { notAngka: "3", nadaHz: 329.63, durasi: 0.35, lirikSukuKata: "la-", barisLirik: 3 },
      { notAngka: "1", nadaHz: 261.63, durasi: 0.28, lirikSukuKata: "hir-", barisLirik: 3 },
      { notAngka: "2", nadaHz: 293.66, durasi: 0.35, lirikSukuKata: "nya ", barisLirik: 3 },
      { notAngka: "3", nadaHz: 329.63, durasi: 0.28, lirikSukuKata: "bang-", barisLirik: 3 },
      { notAngka: "4", nadaHz: 349.23, durasi: 0.28, lirikSukuKata: "sa ", barisLirik: 3 },
      { notAngka: "3", nadaHz: 329.63, durasi: 0.28, lirikSukuKata: "In-", barisLirik: 3 },
      { notAngka: "2", nadaHz: 293.66, durasi: 0.35, lirikSukuKata: "do-", barisLirik: 3 },
      { notAngka: "1", nadaHz: 261.63, durasi: 0.45, lirikSukuKata: "ne-", barisLirik: 3 },
      { notAngka: "2", nadaHz: 293.66, durasi: 0.6, lirikSukuKata: "sia, ", barisLirik: 3 },
      { notAngka: "1", nadaHz: 261.63, durasi: 0.7, lirikSukuKata: "mer-de-ka! ", barisLirik: 3 },
    ],
  },

  // 3. INDONESIA RAYA
  {
    id: "indonesia-raya",
    judul: "Indonesia Raya",
    pencipta: "Wage Rudolf Supratman",
    tempoBpm: 88,
    birama: "4/4",
    sejarah:
      "Pertama kali diperdengarkan oleh W.R. Supratman dengan gesekan biola pada Kongres Pemuda II tanggal 28 Oktober 1928 di Batavia (Jakarta). Menjadi lagu kebangsaan resmi Negara Kesatuan Republik Indonesia.",
    nilaiKarakter:
      "Persatuan Nasional, Cinta Tanah Air, Rasa Hormat pada Kedaulatan Bangsa.",
    stanzas: [
      "Indonesia tanah airku, tanah tumpah darahku",
      "Di sanalah aku berdiri, jadi pandu ibuku",
      "Indonesia kebangsaanku, bangsa dan tanah airku",
      "Marilah kita berseru: Indonesia bersatu!",
    ],
    melody: [
      // In-do-ne-sia ta-nah a-ir-ku
      { notAngka: "5.", nadaHz: 196.0, durasi: 0.35, lirikSukuKata: "In-", barisLirik: 0 },
      { notAngka: "6.", nadaHz: 220.0, durasi: 0.3, lirikSukuKata: "do-", barisLirik: 0 },
      { notAngka: "5.", nadaHz: 196.0, durasi: 0.45, lirikSukuKata: "ne-", barisLirik: 0 },
      { notAngka: "3", nadaHz: 329.63, durasi: 0.55, lirikSukuKata: "sia ", barisLirik: 0 },
      { notAngka: "3", nadaHz: 329.63, durasi: 0.45, lirikSukuKata: "ta-", barisLirik: 0 },
      { notAngka: "2", nadaHz: 293.66, durasi: 0.35, lirikSukuKata: "nah ", barisLirik: 0 },
      { notAngka: "1", nadaHz: 261.63, durasi: 0.4, lirikSukuKata: "a-", barisLirik: 0 },
      { notAngka: "2", nadaHz: 293.66, durasi: 0.8, lirikSukuKata: "ir-ku, ", barisLirik: 0 },
      { notAngka: "0", nadaHz: 0, durasi: 0.25, lirikSukuKata: "", barisLirik: 0 },

      // Ta-nah tum-pah da-rah-ku
      { notAngka: "2", nadaHz: 293.66, durasi: 0.35, lirikSukuKata: "Ta-", barisLirik: 0 },
      { notAngka: "3", nadaHz: 329.63, durasi: 0.3, lirikSukuKata: "nah ", barisLirik: 0 },
      { notAngka: "2", nadaHz: 293.66, durasi: 0.4, lirikSukuKata: "tum-", barisLirik: 0 },
      { notAngka: "1", nadaHz: 261.63, durasi: 0.45, lirikSukuKata: "pah ", barisLirik: 0 },
      { notAngka: "7.", nadaHz: 246.94, durasi: 0.4, lirikSukuKata: "da-", barisLirik: 0 },
      { notAngka: "6.", nadaHz: 220.0, durasi: 0.35, lirikSukuKata: "rah-", barisLirik: 0 },
      { notAngka: "5.", nadaHz: 196.0, durasi: 0.8, lirikSukuKata: "ku. ", barisLirik: 0 },
      { notAngka: "0", nadaHz: 0, durasi: 0.25, lirikSukuKata: "", barisLirik: 0 },

      // Di sa-na-lah a-ku ber-di-ri
      { notAngka: "5.", nadaHz: 196.0, durasi: 0.35, lirikSukuKata: "Di ", barisLirik: 1 },
      { notAngka: "6.", nadaHz: 220.0, durasi: 0.3, lirikSukuKata: "sa-", barisLirik: 1 },
      { notAngka: "5.", nadaHz: 196.0, durasi: 0.4, lirikSukuKata: "na-", barisLirik: 1 },
      { notAngka: "4", nadaHz: 349.23, durasi: 0.55, lirikSukuKata: "lah ", barisLirik: 1 },
      { notAngka: "4", nadaHz: 349.23, durasi: 0.45, lirikSukuKata: "a-", barisLirik: 1 },
      { notAngka: "3", nadaHz: 329.63, durasi: 0.35, lirikSukuKata: "ku ", barisLirik: 1 },
      { notAngka: "2", nadaHz: 293.66, durasi: 0.4, lirikSukuKata: "ber-", barisLirik: 1 },
      { notAngka: "3", nadaHz: 329.63, durasi: 0.8, lirikSukuKata: "di-ri, ", barisLirik: 1 },
      { notAngka: "0", nadaHz: 0, durasi: 0.25, lirikSukuKata: "", barisLirik: 1 },

      // Ja-di pan-du i-bu-ku
      { notAngka: "3", nadaHz: 329.63, durasi: 0.35, lirikSukuKata: "Ja-", barisLirik: 1 },
      { notAngka: "4", nadaHz: 349.23, durasi: 0.3, lirikSukuKata: "di ", barisLirik: 1 },
      { notAngka: "3", nadaHz: 329.63, durasi: 0.4, lirikSukuKata: "pan-", barisLirik: 1 },
      { notAngka: "2", nadaHz: 293.66, durasi: 0.45, lirikSukuKata: "du ", barisLirik: 1 },
      { notAngka: "1", nadaHz: 261.63, durasi: 0.45, lirikSukuKata: "i-", barisLirik: 1 },
      { notAngka: "7.", nadaHz: 246.94, durasi: 0.4, lirikSukuKata: "bu-", barisLirik: 1 },
      { notAngka: "1", nadaHz: 261.63, durasi: 0.9, lirikSukuKata: "ku! ", barisLirik: 1 },
    ],
  },

  // 4. TANAH AIRKU
  {
    id: "tanah-airku",
    judul: "Tanah Airku",
    pencipta: "Ibu Sud (Saridjah Niung)",
    tempoBpm: 76,
    birama: "4/4",
    sejarah:
      "Diciptakan pada tahun 1927 oleh Ibu Sud, tokoh pencipta lagu anak legendaris Indonesia. Menggambarkan kerinduan mendalam seseorang terhadap tanah tumpah darahnya walau berkelana jauh ke negeri orang.",
    nilaiKarakter:
      "Cinta Alam Nusantara, Rasa Syukur, Kesetiaan pada Ibu Pertiwi di Mana Pun Berada.",
    stanzas: [
      "Tanah airku tidak kulupakan, kan terkenang selama hidupku",
      "Biarpun saya pergi jauh, tidak kan hilang dari kalbu",
      "Tanahku yang kucintai, engkau kuhargai",
    ],
    melody: [
      // Ta-nah a-ir-ku ti-dak ku-lu-pa-kan
      { notAngka: "5", nadaHz: 392.0, durasi: 0.5, lirikSukuKata: "Ta-", barisLirik: 0 },
      { notAngka: "6", nadaHz: 440.0, durasi: 0.4, lirikSukuKata: "nah ", barisLirik: 0 },
      { notAngka: "5", nadaHz: 392.0, durasi: 0.5, lirikSukuKata: "a-", barisLirik: 0 },
      { notAngka: "3", nadaHz: 329.63, durasi: 0.65, lirikSukuKata: "ir-ku ", barisLirik: 0 },
      { notAngka: "2", nadaHz: 293.66, durasi: 0.4, lirikSukuKata: "ti-", barisLirik: 0 },
      { notAngka: "1", nadaHz: 261.63, durasi: 0.4, lirikSukuKata: "dak ", barisLirik: 0 },
      { notAngka: "2", nadaHz: 293.66, durasi: 0.5, lirikSukuKata: "ku-", barisLirik: 0 },
      { notAngka: "3", nadaHz: 329.63, durasi: 0.4, lirikSukuKata: "lu-", barisLirik: 0 },
      { notAngka: "2", nadaHz: 293.66, durasi: 0.4, lirikSukuKata: "pa-", barisLirik: 0 },
      { notAngka: "1", nadaHz: 261.63, durasi: 0.8, lirikSukuKata: "kan, ", barisLirik: 0 },
      { notAngka: "0", nadaHz: 0, durasi: 0.3, lirikSukuKata: "", barisLirik: 0 },

      // Kan ter-ke-nang se-la-ma hi-dup-ku
      { notAngka: "5", nadaHz: 392.0, durasi: 0.5, lirikSukuKata: "Kan ", barisLirik: 0 },
      { notAngka: "6", nadaHz: 440.0, durasi: 0.4, lirikSukuKata: "ter-", barisLirik: 0 },
      { notAngka: "5", nadaHz: 392.0, durasi: 0.5, lirikSukuKata: "ke-", barisLirik: 0 },
      { notAngka: "3", nadaHz: 329.63, durasi: 0.65, lirikSukuKata: "nang ", barisLirik: 0 },
      { notAngka: "2", nadaHz: 293.66, durasi: 0.4, lirikSukuKata: "se-", barisLirik: 0 },
      { notAngka: "1", nadaHz: 261.63, durasi: 0.4, lirikSukuKata: "la-", barisLirik: 0 },
      { notAngka: "2", nadaHz: 293.66, durasi: 0.5, lirikSukuKata: "ma ", barisLirik: 0 },
      { notAngka: "3", nadaHz: 329.63, durasi: 0.4, lirikSukuKata: "hi-", barisLirik: 0 },
      { notAngka: "2", nadaHz: 293.66, durasi: 0.4, lirikSukuKata: "dup-", barisLirik: 0 },
      { notAngka: "1", nadaHz: 261.63, durasi: 0.8, lirikSukuKata: "ku. ", barisLirik: 0 },
      { notAngka: "0", nadaHz: 0, durasi: 0.3, lirikSukuKata: "", barisLirik: 0 },

      // Bi-ar-pun sa-ya per-gi ja-uh
      { notAngka: "1", nadaHz: 261.63, durasi: 0.45, lirikSukuKata: "Bi-", barisLirik: 1 },
      { notAngka: "2", nadaHz: 293.66, durasi: 0.4, lirikSukuKata: "ar-", barisLirik: 1 },
      { notAngka: "3", nadaHz: 329.63, durasi: 0.45, lirikSukuKata: "pun ", barisLirik: 1 },
      { notAngka: "4", nadaHz: 349.23, durasi: 0.55, lirikSukuKata: "sa-", barisLirik: 1 },
      { notAngka: "5", nadaHz: 392.0, durasi: 0.45, lirikSukuKata: "ya ", barisLirik: 1 },
      { notAngka: "6", nadaHz: 440.0, durasi: 0.5, lirikSukuKata: "per-", barisLirik: 1 },
      { notAngka: "5", nadaHz: 392.0, durasi: 0.4, lirikSukuKata: "gi ", barisLirik: 1 },
      { notAngka: "4", nadaHz: 349.23, durasi: 0.5, lirikSukuKata: "ja-", barisLirik: 1 },
      { notAngka: "3", nadaHz: 329.63, durasi: 0.8, lirikSukuKata: "uh, ", barisLirik: 1 },
      { notAngka: "0", nadaHz: 0, durasi: 0.3, lirikSukuKata: "", barisLirik: 1 },

      // Ta-nah-ku yang ku-cin-ta-i, eng-kau ku-har-ga-i
      { notAngka: "5", nadaHz: 392.0, durasi: 0.5, lirikSukuKata: "Ta-", barisLirik: 2 },
      { notAngka: "6", nadaHz: 440.0, durasi: 0.4, lirikSukuKata: "nah-", barisLirik: 2 },
      { notAngka: "5", nadaHz: 392.0, durasi: 0.5, lirikSukuKata: "ku ", barisLirik: 2 },
      { notAngka: "3", nadaHz: 329.63, durasi: 0.6, lirikSukuKata: "yang ", barisLirik: 2 },
      { notAngka: "2", nadaHz: 293.66, durasi: 0.4, lirikSukuKata: "ku-", barisLirik: 2 },
      { notAngka: "1", nadaHz: 261.63, durasi: 0.4, lirikSukuKata: "cin-", barisLirik: 2 },
      { notAngka: "2", nadaHz: 293.66, durasi: 0.6, lirikSukuKata: "ta-", barisLirik: 2 },
      { notAngka: "3", nadaHz: 329.63, durasi: 0.5, lirikSukuKata: "i, ", barisLirik: 2 },
      { notAngka: "2", nadaHz: 293.66, durasi: 0.45, lirikSukuKata: "eng-", barisLirik: 2 },
      { notAngka: "1", nadaHz: 261.63, durasi: 0.4, lirikSukuKata: "kau ", barisLirik: 2 },
      { notAngka: "2", nadaHz: 293.66, durasi: 0.45, lirikSukuKata: "ku-", barisLirik: 2 },
      { notAngka: "3", nadaHz: 329.63, durasi: 0.4, lirikSukuKata: "har-", barisLirik: 2 },
      { notAngka: "1", nadaHz: 261.63, durasi: 1.0, lirikSukuKata: "ga-i. ", barisLirik: 2 },
    ],
  },

  // 5. SATU NUSA SATU BANGSA
  {
    id: "satu-nusa-satu-bangsa",
    judul: "Satu Nusa Satu Bangsa",
    pencipta: "Liberty Manik (L. Manik)",
    tempoBpm: 78,
    birama: "4/4",
    sejarah:
      "Diciptakan oleh komponis tunanetra berbakat Liberty Manik pada tahun 1947 di Yogyakarta. Menggemakan ikrar Sumpah Pemuda 1928 bahwa keberagaman suku, bahasa daerah, dan pulau menyatu kuat dalam satu bangsa Indonesia.",
    nilaiKarakter:
      "Toleransi Antarsuku, Menghargai Keberagaman Budaya, Persatuan Bhinneka Tunggal Ika.",
    stanzas: [
      "Satu nusa, satu bangsa, satu bahasa kita",
      "Tanah air, pasti jaya, untuk selama-lamanya",
      "Indonesia pusaka, Indonesia tercinta",
      "Nusa bangsa dan bahasa, kita bela bersama!",
    ],
    melody: [
      // Sa-tu nu-sa, sa-tu bang-sa
      { notAngka: "5", nadaHz: 392.0, durasi: 0.5, lirikSukuKata: "Sa-", barisLirik: 0 },
      { notAngka: "6", nadaHz: 440.0, durasi: 0.4, lirikSukuKata: "tu ", barisLirik: 0 },
      { notAngka: "5", nadaHz: 392.0, durasi: 0.5, lirikSukuKata: "nu-", barisLirik: 0 },
      { notAngka: "3", nadaHz: 329.63, durasi: 0.7, lirikSukuKata: "sa, ", barisLirik: 0 },
      { notAngka: "5", nadaHz: 392.0, durasi: 0.5, lirikSukuKata: "sa-", barisLirik: 0 },
      { notAngka: "6", nadaHz: 440.0, durasi: 0.4, lirikSukuKata: "tu ", barisLirik: 0 },
      { notAngka: "5", nadaHz: 392.0, durasi: 0.5, lirikSukuKata: "bang-", barisLirik: 0 },
      { notAngka: "3", nadaHz: 329.63, durasi: 0.7, lirikSukuKata: "sa, ", barisLirik: 0 },

      // Sa-tu ba-ha-sa ki-ta
      { notAngka: "1'", nadaHz: 523.25, durasi: 0.5, lirikSukuKata: "sa-", barisLirik: 0 },
      { notAngka: "2'", nadaHz: 587.33, durasi: 0.4, lirikSukuKata: "tu ", barisLirik: 0 },
      { notAngka: "1'", nadaHz: 523.25, durasi: 0.5, lirikSukuKata: "ba-", barisLirik: 0 },
      { notAngka: "6", nadaHz: 440.0, durasi: 0.5, lirikSukuKata: "ha-", barisLirik: 0 },
      { notAngka: "5", nadaHz: 392.0, durasi: 0.4, lirikSukuKata: "sa ", barisLirik: 0 },
      { notAngka: "6", nadaHz: 440.0, durasi: 0.4, lirikSukuKata: "ki-", barisLirik: 0 },
      { notAngka: "5", nadaHz: 392.0, durasi: 0.8, lirikSukuKata: "ta! ", barisLirik: 0 },
      { notAngka: "0", nadaHz: 0, durasi: 0.3, lirikSukuKata: "", barisLirik: 0 },

      // Ta-nah a-ir pas-ti ja-ya
      { notAngka: "5", nadaHz: 392.0, durasi: 0.5, lirikSukuKata: "Ta-", barisLirik: 1 },
      { notAngka: "6", nadaHz: 440.0, durasi: 0.4, lirikSukuKata: "nah ", barisLirik: 1 },
      { notAngka: "5", nadaHz: 392.0, durasi: 0.5, lirikSukuKata: "a-", barisLirik: 1 },
      { notAngka: "3", nadaHz: 329.63, durasi: 0.7, lirikSukuKata: "ir, ", barisLirik: 1 },
      { notAngka: "5", nadaHz: 392.0, durasi: 0.45, lirikSukuKata: "pas-", barisLirik: 1 },
      { notAngka: "6", nadaHz: 440.0, durasi: 0.4, lirikSukuKata: "ti ", barisLirik: 1 },
      { notAngka: "5", nadaHz: 392.0, durasi: 0.5, lirikSukuKata: "ja-", barisLirik: 1 },
      { notAngka: "3", nadaHz: 329.63, durasi: 0.7, lirikSukuKata: "ya, ", barisLirik: 1 },

      // Un-tuk se-la-ma-la-ma-nya
      { notAngka: "2", nadaHz: 293.66, durasi: 0.4, lirikSukuKata: "un-", barisLirik: 1 },
      { notAngka: "3", nadaHz: 329.63, durasi: 0.4, lirikSukuKata: "tuk ", barisLirik: 1 },
      { notAngka: "4", nadaHz: 349.23, durasi: 0.45, lirikSukuKata: "se-", barisLirik: 1 },
      { notAngka: "3", nadaHz: 329.63, durasi: 0.4, lirikSukuKata: "la-", barisLirik: 1 },
      { notAngka: "2", nadaHz: 293.66, durasi: 0.4, lirikSukuKata: "ma-", barisLirik: 1 },
      { notAngka: "1", nadaHz: 261.63, durasi: 0.4, lirikSukuKata: "nya! ", barisLirik: 1 },
      { notAngka: "0", nadaHz: 0, durasi: 0.3, lirikSukuKata: "", barisLirik: 1 },

      // In-do-ne-sia pu-sa-ka, In-do-ne-sia ter-cin-ta
      { notAngka: "1'", nadaHz: 523.25, durasi: 0.5, lirikSukuKata: "In-", barisLirik: 2 },
      { notAngka: "1'", nadaHz: 523.25, durasi: 0.4, lirikSukuKata: "do-", barisLirik: 2 },
      { notAngka: "7", nadaHz: 493.88, durasi: 0.4, lirikSukuKata: "ne-", barisLirik: 2 },
      { notAngka: "6", nadaHz: 440.0, durasi: 0.45, lirikSukuKata: "sia ", barisLirik: 2 },
      { notAngka: "5", nadaHz: 392.0, durasi: 0.6, lirikSukuKata: "pu-", barisLirik: 2 },
      { notAngka: "4", nadaHz: 349.23, durasi: 0.4, lirikSukuKata: "sa-", barisLirik: 2 },
      { notAngka: "3", nadaHz: 329.63, durasi: 0.7, lirikSukuKata: "ka, ", barisLirik: 2 },
      { notAngka: "2", nadaHz: 293.66, durasi: 0.4, lirikSukuKata: "In-", barisLirik: 2 },
      { notAngka: "3", nadaHz: 329.63, durasi: 0.4, lirikSukuKata: "do-", barisLirik: 2 },
      { notAngka: "4", nadaHz: 349.23, durasi: 0.45, lirikSukuKata: "ne-", barisLirik: 2 },
      { notAngka: "5", nadaHz: 392.0, durasi: 0.45, lirikSukuKata: "sia ", barisLirik: 2 },
      { notAngka: "6", nadaHz: 440.0, durasi: 0.4, lirikSukuKata: "ter-", barisLirik: 2 },
      { notAngka: "5", nadaHz: 392.0, durasi: 0.8, lirikSukuKata: "cin-ta! ", barisLirik: 2 },

      // Nu-sa bang-sa dan ba-ha-sa, ki-ta be-la ber-sa-ma!
      { notAngka: "1'", nadaHz: 523.25, durasi: 0.45, lirikSukuKata: "Nu-", barisLirik: 3 },
      { notAngka: "2'", nadaHz: 587.33, durasi: 0.4, lirikSukuKata: "sa ", barisLirik: 3 },
      { notAngka: "1'", nadaHz: 523.25, durasi: 0.45, lirikSukuKata: "bang-", barisLirik: 3 },
      { notAngka: "6", nadaHz: 440.0, durasi: 0.4, lirikSukuKata: "sa ", barisLirik: 3 },
      { notAngka: "5", nadaHz: 392.0, durasi: 0.45, lirikSukuKata: "dan ", barisLirik: 3 },
      { notAngka: "3", nadaHz: 329.63, durasi: 0.4, lirikSukuKata: "ba-", barisLirik: 3 },
      { notAngka: "5", nadaHz: 392.0, durasi: 0.4, lirikSukuKata: "ha-", barisLirik: 3 },
      { notAngka: "4", nadaHz: 349.23, durasi: 0.6, lirikSukuKata: "sa, ", barisLirik: 3 },
      { notAngka: "3", nadaHz: 329.63, durasi: 0.45, lirikSukuKata: "ki-", barisLirik: 3 },
      { notAngka: "2", nadaHz: 293.66, durasi: 0.4, lirikSukuKata: "ta ", barisLirik: 3 },
      { notAngka: "1", nadaHz: 261.63, durasi: 0.45, lirikSukuKata: "be-", barisLirik: 3 },
      { notAngka: "2", nadaHz: 293.66, durasi: 0.45, lirikSukuKata: "la ", barisLirik: 3 },
      { notAngka: "3", nadaHz: 329.63, durasi: 0.4, lirikSukuKata: "ber-", barisLirik: 3 },
      { notAngka: "2", nadaHz: 293.66, durasi: 0.4, lirikSukuKata: "sa-", barisLirik: 3 },
      { notAngka: "1", nadaHz: 261.63, durasi: 1.0, lirikSukuKata: "ma! ", barisLirik: 3 },
    ],
  },

  // 6. IBU KITA KARTINI
  {
    id: "ibu-kita-kartini",
    judul: "Ibu Kita Kartini",
    pencipta: "Wage Rudolf Supratman",
    tempoBpm: 82,
    birama: "4/4",
    sejarah:
      "Diciptakan untuk mengenang Raden Ajeng Kartini, pelopor emansipasi dan pendidikan perempuan Indonesia asal Jepara. Beliau memperjuangkan agar anak perempuan dapat bersekolah dan meraih cita-cita setinggi langit.",
    nilaiKarakter:
      "Semangat Menuntut Ilmu, Kesetaraan Hak Pendidikan, Keberanian Berpikir Maju.",
    stanzas: [
      "Ibu kita Kartini, putri sejati, putri Indonesia, harum namanya",
      "Ibu kita Kartini, pendekar bangsa, pendekar kaumnya, untuk merdeka",
      "Wahai Ibu kita Kartini, putri yang mulia",
      "Sungguh besar cita-citanya, bagi Indonesia!",
    ],
    melody: [
      // I-bu ki-ta Kar-ti-ni, put-ri se-ja-ti
      { notAngka: "1", nadaHz: 261.63, durasi: 0.45, lirikSukuKata: "I-", barisLirik: 0 },
      { notAngka: "2", nadaHz: 293.66, durasi: 0.35, lirikSukuKata: "bu ", barisLirik: 0 },
      { notAngka: "3", nadaHz: 329.63, durasi: 0.45, lirikSukuKata: "ki-", barisLirik: 0 },
      { notAngka: "4", nadaHz: 349.23, durasi: 0.35, lirikSukuKata: "ta ", barisLirik: 0 },
      { notAngka: "5", nadaHz: 392.0, durasi: 0.55, lirikSukuKata: "Kar-", barisLirik: 0 },
      { notAngka: "3", nadaHz: 329.63, durasi: 0.7, lirikSukuKata: "ti-ni, ", barisLirik: 0 },
      { notAngka: "1", nadaHz: 261.63, durasi: 0.45, lirikSukuKata: "put-", barisLirik: 0 },
      { notAngka: "6", nadaHz: 440.0, durasi: 0.45, lirikSukuKata: "ri ", barisLirik: 0 },
      { notAngka: "5", nadaHz: 392.0, durasi: 0.8, lirikSukuKata: "se-ja-ti, ", barisLirik: 0 },

      // Put-ri In-do-ne-sia, ha-rum na-ma-nya
      { notAngka: "4", nadaHz: 349.23, durasi: 0.45, lirikSukuKata: "Put-", barisLirik: 0 },
      { notAngka: "5", nadaHz: 392.0, durasi: 0.35, lirikSukuKata: "ri ", barisLirik: 0 },
      { notAngka: "6", nadaHz: 440.0, durasi: 0.45, lirikSukuKata: "In-", barisLirik: 0 },
      { notAngka: "5", nadaHz: 392.0, durasi: 0.35, lirikSukuKata: "do-", barisLirik: 0 },
      { notAngka: "4", nadaHz: 349.23, durasi: 0.55, lirikSukuKata: "ne-", barisLirik: 0 },
      { notAngka: "3", nadaHz: 329.63, durasi: 0.45, lirikSukuKata: "sia, ", barisLirik: 0 },
      { notAngka: "2", nadaHz: 293.66, durasi: 0.45, lirikSukuKata: "ha-", barisLirik: 0 },
      { notAngka: "3", nadaHz: 329.63, durasi: 0.35, lirikSukuKata: "rum ", barisLirik: 0 },
      { notAngka: "4", nadaHz: 349.23, durasi: 0.4, lirikSukuKata: "na-", barisLirik: 0 },
      { notAngka: "2", nadaHz: 293.66, durasi: 0.4, lirikSukuKata: "ma-", barisLirik: 0 },
      { notAngka: "1", nadaHz: 261.63, durasi: 0.9, lirikSukuKata: "nya. ", barisLirik: 0 },
      { notAngka: "0", nadaHz: 0, durasi: 0.3, lirikSukuKata: "", barisLirik: 0 },

      // Wa-hai I-bu ki-ta Kar-ti-ni, put-ri yang mu-li-a
      { notAngka: "4", nadaHz: 349.23, durasi: 0.45, lirikSukuKata: "Wa-", barisLirik: 2 },
      { notAngka: "3", nadaHz: 329.63, durasi: 0.4, lirikSukuKata: "hai ", barisLirik: 2 },
      { notAngka: "4", nadaHz: 349.23, durasi: 0.4, lirikSukuKata: "I-", barisLirik: 2 },
      { notAngka: "6", nadaHz: 440.0, durasi: 0.45, lirikSukuKata: "bu ", barisLirik: 2 },
      { notAngka: "5", nadaHz: 392.0, durasi: 0.4, lirikSukuKata: "ki-", barisLirik: 2 },
      { notAngka: "4", nadaHz: 349.23, durasi: 0.4, lirikSukuKata: "ta ", barisLirik: 2 },
      { notAngka: "3", nadaHz: 329.63, durasi: 0.55, lirikSukuKata: "Kar-", barisLirik: 2 },
      { notAngka: "1", nadaHz: 261.63, durasi: 0.7, lirikSukuKata: "ti-ni, ", barisLirik: 2 },
      { notAngka: "2", nadaHz: 293.66, durasi: 0.45, lirikSukuKata: "put-", barisLirik: 2 },
      { notAngka: "3", nadaHz: 329.63, durasi: 0.35, lirikSukuKata: "ri ", barisLirik: 2 },
      { notAngka: "4", nadaHz: 349.23, durasi: 0.45, lirikSukuKata: "yang ", barisLirik: 2 },
      { notAngka: "2", nadaHz: 293.66, durasi: 0.45, lirikSukuKata: "mu-", barisLirik: 2 },
      { notAngka: "3", nadaHz: 329.63, durasi: 0.85, lirikSukuKata: "li-a! ", barisLirik: 2 },

      // Sung-guh be-sar ci-ta-ci-ta-nya ba-gi In-do-ne-sia
      { notAngka: "4", nadaHz: 349.23, durasi: 0.4, lirikSukuKata: "Sung-", barisLirik: 3 },
      { notAngka: "3", nadaHz: 329.63, durasi: 0.35, lirikSukuKata: "guh ", barisLirik: 3 },
      { notAngka: "4", nadaHz: 349.23, durasi: 0.4, lirikSukuKata: "be-", barisLirik: 3 },
      { notAngka: "6", nadaHz: 440.0, durasi: 0.45, lirikSukuKata: "sar ", barisLirik: 3 },
      { notAngka: "5", nadaHz: 392.0, durasi: 0.4, lirikSukuKata: "ci-", barisLirik: 3 },
      { notAngka: "4", nadaHz: 349.23, durasi: 0.4, lirikSukuKata: "ta-", barisLirik: 3 },
      { notAngka: "3", nadaHz: 329.63, durasi: 0.45, lirikSukuKata: "ci-", barisLirik: 3 },
      { notAngka: "1", nadaHz: 261.63, durasi: 0.55, lirikSukuKata: "ta-nya, ", barisLirik: 3 },
      { notAngka: "2", nadaHz: 293.66, durasi: 0.45, lirikSukuKata: "ba-", barisLirik: 3 },
      { notAngka: "4", nadaHz: 349.23, durasi: 0.4, lirikSukuKata: "gi ", barisLirik: 3 },
      { notAngka: "3", nadaHz: 329.63, durasi: 0.4, lirikSukuKata: "In-", barisLirik: 3 },
      { notAngka: "2", nadaHz: 293.66, durasi: 0.4, lirikSukuKata: "do-", barisLirik: 3 },
      { notAngka: "1", nadaHz: 261.63, durasi: 1.0, lirikSukuKata: "ne-sia! ", barisLirik: 3 },
    ],
  },

  // 7. MAJU TAK GENTAR
  {
    id: "maju-tak-gentar",
    judul: "Maju Tak Gentar",
    pencipta: "Cornel Simanjuntak",
    tempoBpm: 108,
    birama: "4/4",
    sejarah:
      "Diciptakan pada masa perang revolusi kemerdekaan 1945 oleh pahlawan musisi Cornel Simanjuntak. Lagu bernuansa mars heroik ini membakar keberanian para pejuang laskar rakyat menghadapi penjajah meski bersenjata sederhana.",
    nilaiKarakter:
      "Keberanian Membela Kebenaran, Jiwa Gotong Royong, Keteguhan Hati Menghadapi Rintangan.",
    stanzas: [
      "Maju tak gentar membela yang benar",
      "Maju tak gentar hak kita diserang",
      "Maju serentak mengusir penyerang",
      "Maju serentak tentu kita menang!",
      "Bergerak, bergerak, serentak, serentak, menerkam, menerjang, terjang!",
      "Tak gentar, tak gentar, menyerang, menyerang, majulah, majulah, menang!",
    ],
    melody: [
      // Ma-ju tak gen-tar, mem-be-la yang be-nar
      { notAngka: "5", nadaHz: 392.0, durasi: 0.35, lirikSukuKata: "Ma-", barisLirik: 0 },
      { notAngka: "1'", nadaHz: 523.25, durasi: 0.5, lirikSukuKata: "ju ", barisLirik: 0 },
      { notAngka: "7", nadaHz: 493.88, durasi: 0.35, lirikSukuKata: "tak ", barisLirik: 0 },
      { notAngka: "6", nadaHz: 440.0, durasi: 0.4, lirikSukuKata: "gen-", barisLirik: 0 },
      { notAngka: "5", nadaHz: 392.0, durasi: 0.6, lirikSukuKata: "tar, ", barisLirik: 0 },
      { notAngka: "4", nadaHz: 349.23, durasi: 0.35, lirikSukuKata: "mem-", barisLirik: 0 },
      { notAngka: "3", nadaHz: 329.63, durasi: 0.35, lirikSukuKata: "be-", barisLirik: 0 },
      { notAngka: "4", nadaHz: 349.23, durasi: 0.35, lirikSukuKata: "la ", barisLirik: 0 },
      { notAngka: "5", nadaHz: 392.0, durasi: 0.45, lirikSukuKata: "yang ", barisLirik: 0 },
      { notAngka: "6", nadaHz: 440.0, durasi: 0.4, lirikSukuKata: "be-", barisLirik: 0 },
      { notAngka: "5", nadaHz: 392.0, durasi: 0.7, lirikSukuKata: "nar! ", barisLirik: 0 },
      { notAngka: "0", nadaHz: 0, durasi: 0.25, lirikSukuKata: "", barisLirik: 0 },

      // Ma-ju tak gen-tar, hak ki-ta di-se-rang
      { notAngka: "5", nadaHz: 392.0, durasi: 0.35, lirikSukuKata: "Ma-", barisLirik: 1 },
      { notAngka: "1'", nadaHz: 523.25, durasi: 0.5, lirikSukuKata: "ju ", barisLirik: 1 },
      { notAngka: "7", nadaHz: 493.88, durasi: 0.35, lirikSukuKata: "tak ", barisLirik: 1 },
      { notAngka: "6", nadaHz: 440.0, durasi: 0.4, lirikSukuKata: "gen-", barisLirik: 1 },
      { notAngka: "5", nadaHz: 392.0, durasi: 0.6, lirikSukuKata: "tar, ", barisLirik: 1 },
      { notAngka: "4", nadaHz: 349.23, durasi: 0.35, lirikSukuKata: "hak ", barisLirik: 1 },
      { notAngka: "3", nadaHz: 329.63, durasi: 0.35, lirikSukuKata: "ki-", barisLirik: 1 },
      { notAngka: "2", nadaHz: 293.66, durasi: 0.4, lirikSukuKata: "ta ", barisLirik: 1 },
      { notAngka: "3", nadaHz: 329.63, durasi: 0.4, lirikSukuKata: "di-", barisLirik: 1 },
      { notAngka: "4", nadaHz: 349.23, durasi: 0.4, lirikSukuKata: "se-", barisLirik: 1 },
      { notAngka: "3", nadaHz: 329.63, durasi: 0.7, lirikSukuKata: "rang! ", barisLirik: 1 },
      { notAngka: "0", nadaHz: 0, durasi: 0.25, lirikSukuKata: "", barisLirik: 1 },

      // Ma-ju se-ren-tak, meng-u-sir pe-nye-rang
      { notAngka: "1'", nadaHz: 523.25, durasi: 0.35, lirikSukuKata: "Ma-", barisLirik: 2 },
      { notAngka: "2'", nadaHz: 587.33, durasi: 0.45, lirikSukuKata: "ju ", barisLirik: 2 },
      { notAngka: "1'", nadaHz: 523.25, durasi: 0.35, lirikSukuKata: "se-", barisLirik: 2 },
      { notAngka: "7", nadaHz: 493.88, durasi: 0.4, lirikSukuKata: "ren-", barisLirik: 2 },
      { notAngka: "6", nadaHz: 440.0, durasi: 0.6, lirikSukuKata: "tak, ", barisLirik: 2 },
      { notAngka: "5", nadaHz: 392.0, durasi: 0.35, lirikSukuKata: "meng-", barisLirik: 2 },
      { notAngka: "6", nadaHz: 440.0, durasi: 0.35, lirikSukuKata: "u-", barisLirik: 2 },
      { notAngka: "7", nadaHz: 493.88, durasi: 0.4, lirikSukuKata: "sir ", barisLirik: 2 },
      { notAngka: "1'", nadaHz: 523.25, durasi: 0.4, lirikSukuKata: "pe-", barisLirik: 2 },
      { notAngka: "2'", nadaHz: 587.33, durasi: 0.45, lirikSukuKata: "nye-", barisLirik: 2 },
      { notAngka: "1'", nadaHz: 523.25, durasi: 0.8, lirikSukuKata: "rang! ", barisLirik: 2 },
    ],
  },

  // 8. BAGIMU NEGERI
  {
    id: "bagimu-negeri",
    judul: "Bagimu Negeri",
    pencipta: "Kusbini",
    tempoBpm: 68,
    birama: "4/4",
    sejarah:
      "Diciptakan oleh komponis Kusbini pada tahun 1942 atas dorongan Bung Karno. Lagu khidmat berdurasi singkat namun berbobot sakral ini merupakan janji luhur segenap tumpah darah untuk mempersembahkan jiwa raga demi kejayaan Indonesia.",
    nilaiKarakter:
      "Ketulusan Pengabdian, Rela Berkorban, Integritas dan Bakti Setia Tanpa Pamrih.",
    stanzas: [
      "Padamu negeri, kami berjanji",
      "Padamu negeri, kami berbakti",
      "Padamu negeri, kami mengabdi",
      "Bagimu negeri, jiwa raga kami!",
    ],
    melody: [
      // Pa-da-mu ne-ge-ri, ka-mi ber-jan-ji
      { notAngka: "5", nadaHz: 392.0, durasi: 0.6, lirikSukuKata: "Pa-", barisLirik: 0 },
      { notAngka: "3", nadaHz: 329.63, durasi: 0.5, lirikSukuKata: "da-", barisLirik: 0 },
      { notAngka: "1", nadaHz: 261.63, durasi: 0.65, lirikSukuKata: "mu ", barisLirik: 0 },
      { notAngka: "5", nadaHz: 392.0, durasi: 0.9, lirikSukuKata: "ne-ge-ri, ", barisLirik: 0 },
      { notAngka: "6", nadaHz: 440.0, durasi: 0.55, lirikSukuKata: "ka-", barisLirik: 0 },
      { notAngka: "5", nadaHz: 392.0, durasi: 0.5, lirikSukuKata: "mi ", barisLirik: 0 },
      { notAngka: "4", nadaHz: 349.23, durasi: 0.55, lirikSukuKata: "ber-", barisLirik: 0 },
      { notAngka: "3", nadaHz: 329.63, durasi: 0.9, lirikSukuKata: "jan-ji. ", barisLirik: 0 },
      { notAngka: "0", nadaHz: 0, durasi: 0.35, lirikSukuKata: "", barisLirik: 0 },

      // Pa-da-mu ne-ge-ri, ka-mi ber-bak-ti
      { notAngka: "2", nadaHz: 293.66, durasi: 0.6, lirikSukuKata: "Pa-", barisLirik: 1 },
      { notAngka: "3", nadaHz: 329.63, durasi: 0.5, lirikSukuKata: "da-", barisLirik: 1 },
      { notAngka: "4", nadaHz: 349.23, durasi: 0.65, lirikSukuKata: "mu ", barisLirik: 1 },
      { notAngka: "5", nadaHz: 392.0, durasi: 0.9, lirikSukuKata: "ne-ge-ri, ", barisLirik: 1 },
      { notAngka: "6", nadaHz: 440.0, durasi: 0.55, lirikSukuKata: "ka-", barisLirik: 1 },
      { notAngka: "5", nadaHz: 392.0, durasi: 0.5, lirikSukuKata: "mi ", barisLirik: 1 },
      { notAngka: "6", nadaHz: 440.0, durasi: 0.55, lirikSukuKata: "ber-", barisLirik: 1 },
      { notAngka: "5", nadaHz: 392.0, durasi: 0.9, lirikSukuKata: "bak-ti. ", barisLirik: 1 },
      { notAngka: "0", nadaHz: 0, durasi: 0.35, lirikSukuKata: "", barisLirik: 1 },

      // Pa-da-mu ne-ge-ri, ka-mi meng-ab-di
      { notAngka: "5", nadaHz: 392.0, durasi: 0.6, lirikSukuKata: "Pa-", barisLirik: 2 },
      { notAngka: "3", nadaHz: 329.63, durasi: 0.5, lirikSukuKata: "da-", barisLirik: 2 },
      { notAngka: "1", nadaHz: 261.63, durasi: 0.65, lirikSukuKata: "mu ", barisLirik: 2 },
      { notAngka: "5", nadaHz: 392.0, durasi: 0.9, lirikSukuKata: "ne-ge-ri, ", barisLirik: 2 },
      { notAngka: "1'", nadaHz: 523.25, durasi: 0.55, lirikSukuKata: "ka-", barisLirik: 2 },
      { notAngka: "7", nadaHz: 493.88, durasi: 0.5, lirikSukuKata: "mi ", barisLirik: 2 },
      { notAngka: "6", nadaHz: 440.0, durasi: 0.55, lirikSukuKata: "meng-", barisLirik: 2 },
      { notAngka: "5", nadaHz: 392.0, durasi: 0.9, lirikSukuKata: "ab-di. ", barisLirik: 2 },
      { notAngka: "0", nadaHz: 0, durasi: 0.35, lirikSukuKata: "", barisLirik: 2 },

      // Ba-gi-mu ne-ge-ri, ji-wa ra-ga ka-mi!
      { notAngka: "6", nadaHz: 440.0, durasi: 0.6, lirikSukuKata: "Ba-", barisLirik: 3 },
      { notAngka: "5", nadaHz: 392.0, durasi: 0.5, lirikSukuKata: "gi-", barisLirik: 3 },
      { notAngka: "4", nadaHz: 349.23, durasi: 0.65, lirikSukuKata: "mu ", barisLirik: 3 },
      { notAngka: "3", nadaHz: 329.63, durasi: 0.85, lirikSukuKata: "ne-ge-ri, ", barisLirik: 3 },
      { notAngka: "2", nadaHz: 293.66, durasi: 0.65, lirikSukuKata: "ji-", barisLirik: 3 },
      { notAngka: "3", nadaHz: 329.63, durasi: 0.6, lirikSukuKata: "wa ", barisLirik: 3 },
      { notAngka: "2", nadaHz: 293.66, durasi: 0.65, lirikSukuKata: "ra-ga ", barisLirik: 3 },
      { notAngka: "1", nadaHz: 261.63, durasi: 1.3, lirikSukuKata: "ka-mi! ", barisLirik: 3 },
    ],
  },
];
