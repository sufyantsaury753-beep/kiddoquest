export interface VideoLaguNasional {
  id: string;
  nomor: number;
  title: string;
  composer: string;
  startTime: number; // detik mulai di video YouTube
  timestampText: string; // MM:SS atau MM.SS
  meaning: string;
  lyrics: string[];
  badge?: string;
}

export const YOUTUBE_VIDEO_ID = "grTRqNH4--8";
export const YOUTUBE_EMBED_BASE = `https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}`;

export const DAFTAR_11_LAGU_NASIONAL: VideoLaguNasional[] = [
  {
    id: "garuda-pancasila",
    nomor: 1,
    title: "Garuda Pancasila",
    composer: "Prohar Sudharnoto",
    startTime: 95,
    timestampText: "01.35",
    badge: "Dasar Negara",
    meaning:
      "Kesetiaan dan keteguhan rakyat Indonesia menjunjung tinggi ideologi Pancasila.",
    lyrics: [
      "Garuda Pancasila",
      "Akulah pendukungmu",
      "Patriot proklamasi",
      "Sedia berkorban untukmu",
      "Pancasila dasar negara",
      "Rakyat adil makmur sentosa",
      "Pribadi bangsaku",
      "Ayo maju maju, ayo maju maju, ayo maju maju!",
    ],
  },
  {
    id: "hari-merdeka",
    nomor: 2,
    title: "Hari Merdeka",
    composer: "H. Mutahar",
    startTime: 140,
    timestampText: "02.20",
    badge: "Kemerdekaan",
    meaning:
      "Gelora syukur dan semangat mempertahankan kemerdekaan Republik Indonesia.",
    lyrics: [
      "Tujuh belas Agustus tahun empat lima",
      "Itulah hari kemerdekaan kita",
      "Hari merdeka nusa dan bangsa",
      "Hari lahirnya bangsa Indonesia, merdeka!",
      "Sekali merdeka tetap merdeka",
      "Selama hayat masih dikandung badan",
      "Kita tetap setia, tetap sedia",
      "Mempertahankan Indonesia",
      "Kita tetap setia, tetap sedia",
      "Membela negara kita!",
    ],
  },
  {
    id: "indonesia-raya",
    nomor: 3,
    title: "Indonesia Raya",
    composer: "W.R. Supratman",
    startTime: 242,
    timestampText: "04.02",
    badge: "Lagu Kebangsaan",
    meaning:
      "Lagu Kebangsaan lambang persatuan, kehormatan, dan kedaulatan bangsa.",
    lyrics: [
      "Indonesia tanah airku, tanah tumpah darahku",
      "Di sanalah aku berdiri, jadi pandu ibuku",
      "Indonesia kebangsaanku, bangsa dan tanah airku",
      "Marilah kita berseru: Indonesia bersatu!",
      "Hiduplah tanahku, hiduplah negeriku",
      "Bangsaku, rakyatku, semuanya",
      "Bangunlah jiwanya, bangunlah badannya",
      "Untuk Indonesia Raya!",
      "Indonesia Raya, merdeka, merdeka!",
      "Tanahku, negeriku yang kucinta",
      "Indonesia Raya, merdeka, merdeka!",
      "Hiduplah Indonesia Raya!",
    ],
  },
  {
    id: "halo-halo-bandung",
    nomor: 4,
    title: "Halo-Halo Bandung",
    composer: "Ismail Marzuki",
    startTime: 427,
    timestampText: "07.07",
    badge: "Heroisme Kota",
    meaning:
      "Semangat patriotisme peristiwa heroik Bandung Lautan Api membela tanah air.",
    lyrics: [
      "Halo-halo Bandung, ibukota periangan",
      "Halo-halo Bandung, kota kenang-kenangan",
      "Sudah lama beta tidak berjumpa dengan kau",
      "Sekarang telah menjadi lautan api",
      "Mari bung rebut kembali!",
    ],
  },
  {
    id: "dari-sabang-sampai-merauke",
    nomor: 5,
    title: "Dari Sabang Sampai Merauke",
    composer: "R. Suharjo",
    startTime: 514,
    timestampText: "08.34",
    badge: "Wawasan Nusantara",
    meaning:
      "Indonesia adalah kesatuan pulau-pulau yang utuh dan tak terpisahkan.",
    lyrics: [
      "Dari Sabang sampai Merauke",
      "Berjajar pulau-pulau",
      "Sambung menyambung menjadi satu",
      "Itulah Indonesia",
      "Indonesia tanah airku",
      "Aku berjanji padamu",
      "Menjunjung tanah airku",
      "Tanah airku Indonesia!",
    ],
  },
  {
    id: "satu-nusa-satu-bangsa",
    nomor: 6,
    title: "Satu Nusa Satu Bangsa",
    composer: "L. Manik",
    startTime: 602,
    timestampText: "10.02",
    badge: "Sumpah Pemuda",
    meaning:
      "Ikrar persatuan satu nusa, satu bangsa, dan satu bahasa Indonesia.",
    lyrics: [
      "Satu nusa, satu bangsa, satu bahasa kita",
      "Tanah air pasti jaya untuk selama-lamanya",
      "Indonesia pusaka, Indonesia tercinta",
      "Nusa bangsa dan bahasa kita bela bersama!",
    ],
  },
  {
    id: "berkibarlah-benderaku",
    nomor: 7,
    title: "Berkibarlah Benderaku",
    composer: "Ibu Sud",
    startTime: 722,
    timestampText: "12.02",
    badge: "Sang Merah Putih",
    meaning:
      "Keberanian dan kesetiaan menjaga kehormatan Sang Saka Merah Putih.",
    lyrics: [
      "Berkibarlah benderaku",
      "Lambang suci gagah perwira",
      "Di seluruh pantai Indonesia",
      "Kau tetap pujaan bangsa",
      "Siapa berani menurunkan engkau",
      "Serentak rakyatmu membela",
      "Sang merah putih yang perwira",
      "Berkibarlah selama-lamanya!",
    ],
  },
  {
    id: "bangun-pemudi-pemuda",
    nomor: 8,
    title: "Bangun Pemudi Pemuda",
    composer: "A. Simanjuntak",
    startTime: 809,
    timestampText: "13.29",
    badge: "Generasi Penerus",
    meaning:
      "Ajakan kepada generasi muda Indonesia untuk giat belajar dan berkarya.",
    lyrics: [
      "Bangun pemudi pemuda Indonesia",
      "Tangan bajumu singsingkan untuk negara",
      "Masa yang akan datang kewajibanmulah",
      "Menjadi tanggunganmu terhadap nusa",
      "Menjadi tanggunganmu terhadap nusa",
      "Sudi tetap berusaha, jujur dan ikhlas",
      "Tak usah banyak bicara, t'rus kerja keras",
      "Hati teguh dan lurus, pikir tetap jernih",
      "Bertingkah laku halus, hai putra negeri",
      "Bertingkah laku halus, hai putra negeri!",
    ],
  },
  {
    id: "indonesia-pusaka",
    nomor: 9,
    title: "Indonesia Pusaka",
    composer: "Ismail Marzuki",
    startTime: 930,
    timestampText: "15.30",
    badge: "Cinta Tanah Air",
    meaning:
      "Rasa cinta dan bangga pada tanah air tempat berlindung di hari tua.",
    lyrics: [
      "Indonesia tanah air beta",
      "Pusaka abadi nan jaya",
      "Indonesia sejak dulu kala",
      "Tetap dipuja-puja bangsa",
      "Di sana tempat lahir beta",
      "Dibuai dibesarkan bunda",
      "Tempat berlindung di hari tua",
      "Sampai akhir menutup mata",
    ],
  },
  {
    id: "bagimu-negeri",
    nomor: 10,
    title: "Bagimu Negeri",
    composer: "Kusbini",
    startTime: 1074,
    timestampText: "17.54",
    badge: "Janji Pengabdian",
    meaning:
      "Janji bakti, pengabdian, dan ketulusan jiwa raga untuk ibu pertiwi.",
    lyrics: [
      "Padamu negeri kami berjanji",
      "Padamu negeri kami berbakti",
      "Padamu negeri kami mengabdi",
      "Bagimu negeri jiwa raga kami!",
    ],
  },
  {
    id: "syukur",
    nomor: 11,
    title: "Syukur",
    composer: "H. Mutahar",
    startTime: 1165,
    timestampText: "19.25",
    badge: "Rasa Syukur",
    meaning:
      "Doa dan rasa syukur mendalam atas karunia kemerdekaan dari Tuhan YME.",
    lyrics: [
      "Dari yakin kuteguh",
      "Hati ikhlasku penuh",
      "Akan karunia-Mu",
      "Tanah air pusaka",
      "Indonesia merdeka",
      "Syukur aku sembahkan",
      "Ke hadirat-Mu Tuhan!",
    ],
  },
];

// Alias untuk kompatibilitas jika dibutuhkan
export const DAFTAR_12_LAGU_NASIONAL = DAFTAR_11_LAGU_NASIONAL;
