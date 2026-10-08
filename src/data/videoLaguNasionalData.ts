export interface VideoLaguNasional {
  id: string;
  nomor: number;
  title: string;
  composer: string;
  startTime: number; // detik mulai di video YouTube
  durationText: string;
  timestampText: string; // MM:SS
  badge: string;
  lyrics: string[];
  meaning: string;
  characterProfile: string; // Profil Pelajar Pancasila
}

export const YOUTUBE_VIDEO_ID = "grTRqNH4--8";
export const YOUTUBE_EMBED_BASE = `https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}`;

export const DAFTAR_12_LAGU_NASIONAL: VideoLaguNasional[] = [
  {
    id: "garuda-pancasila",
    nomor: 1,
    title: "Garuda Pancasila",
    composer: "Prohar Sudharnoto",
    startTime: 0,
    durationText: "01:50",
    timestampText: "00:00",
    badge: "Dasar Negara",
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
    meaning:
      "Diciptakan oleh Prohar Sudharnoto pada tahun 1956. Lagu ini menegaskan kesetiaan seluruh rakyat Indonesia kepada Pancasila sebagai ideologi dan dasar negara, serta tekad untuk terus maju membangun bangsa yang adil dan makmur.",
    characterProfile:
      "Berkebinekaan Global, Bernalar Kritis, dan Berjiwa Patriotik menjaga keutuhan Negara Kesatuan Republik Indonesia.",
  },
  {
    id: "hari-merdeka",
    nomor: 2,
    title: "Hari Merdeka",
    composer: "H. Mutahar",
    startTime: 110,
    durationText: "01:45",
    timestampText: "01:50",
    badge: "Kemerdekaan",
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
    meaning:
      "Diciptakan oleh Husein Mutahar pada tahun 1946 saat masa Revolusi Kemerdekaan. Lagu ini mengobarkan semangat perjuangan 17 Agustus 1945 dan tekad bulat untuk membela kedaulatan bangsa sampai akhir hayat.",
    characterProfile:
      "Mandiri, Rela Berkorban, serta Bergotong Royong dalam mempertahankan kedaulatan tanah air.",
  },
  {
    id: "indonesia-pusaka",
    nomor: 3,
    title: "Indonesia Pusaka",
    composer: "Ismail Marzuki",
    startTime: 225,
    durationText: "01:45",
    timestampText: "03:45",
    badge: "Cinta Tanah Air",
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
    meaning:
      "Karya legendaris maestro Ismail Marzuki pada tahun 1949. Lagu ini melukiskan keindahan alam, kemakmuran, dan rasa syukur yang mendalam atas tanah kelahiran yang selalu melindungi kita seumur hidup.",
    characterProfile:
      "Beriman, Bertakwa kepada Tuhan YME, Berakhlak Mulia, dan Menyayangi kelestarian bumi pertiwi.",
  },
  {
    id: "tanah-airku",
    nomor: 4,
    title: "Tanah Airku",
    composer: "Ibu Sud",
    startTime: 330,
    durationText: "01:25",
    timestampText: "05:30",
    badge: "Kerinduan Bangsa",
    lyrics: [
      "Tanah airku tidak kulupakan",
      "Kan terkenang selama hidupku",
      "Biar pun saya pergi jauh",
      "Tidak kan hilang dari kalbu",
      "Tanahku yang kucintai",
      "Engkau kuhargai",
      "Walaupun banyak negeri kujalani",
      "Yang masyhur permai dikata orang",
      "Tetapi kampung dan rumahku",
      "Di sanalah kurasa senang",
      "Tanahku tak kulupakan",
      "Engkau kubanggakan!",
    ],
    meaning:
      "Diciptakan oleh Saridjah Niung (Ibu Sud) pada tahun 1927. Menuturkan bahwa sejauh apa pun anak bangsa merantau dan mengelilingi dunia, tanah air Indonesia selalu menjadi tempat terhangat yang paling dicintai.",
    characterProfile:
      "Rasa Bangga Berbangsa, Integritas, serta Kesetiaan mengharumkan nama Indonesia di kancah internasional.",
  },
  {
    id: "berkibarlah-benderaku",
    nomor: 5,
    title: "Berkibarlah Benderaku",
    composer: "Ibu Sud",
    startTime: 415,
    durationText: "01:40",
    timestampText: "06:55",
    badge: "Sang Merah Putih",
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
    meaning:
      "Diciptakan oleh Ibu Sud pada tahun 1947 terinspirasi dari keberanian seorang pemuda di Surabaya yang mempertahankan bendera Merah Putih agar tetap berkibar tinggi menantang ancaman penjajah.",
    characterProfile:
      "Keberanian Moral, Teguh Pendirian, dan Menjunjung Tinggi kehormatan simbol pemersatu bangsa.",
  },
  {
    id: "maju-tak-gentar",
    nomor: 6,
    title: "Maju Tak Gentar",
    composer: "Cornel Simanjuntak",
    startTime: 515,
    durationText: "01:15",
    timestampText: "08:35",
    badge: "Semangat Juang",
    lyrics: [
      "Maju tak gentar membela yang benar",
      "Maju tak gentar hak kita diserang",
      "Maju serentak mengusir penyerang",
      "Maju serentak tentu kita menang",
      "Bergerak, bergerak, serentak, serentak",
      "Menerkam, menerjang, terjang!",
      "Tak gentar, tak gentar, menyerang, menyerang",
      "Majulah, majulah menang!",
    ],
    meaning:
      "Diciptakan oleh Cornel Simanjuntak pada tahun 1945 untuk membakar keberanian laskar pejuang rakyat Indonesia. Mengajarkan bahwa kebenaran dan keadilan harus dibela bersama dengan penuh keberanian tanpa rasa takut.",
    characterProfile:
      "Bernalar Kritis, Berani Bersuara Benar, dan Kompak bergotong royong dalam kebaikan.",
  },
  {
    id: "dari-sabang-sampai-merauke",
    nomor: 7,
    title: "Dari Sabang Sampai Merauke",
    composer: "R. Suharjo",
    startTime: 590,
    durationText: "01:50",
    timestampText: "09:50",
    badge: "Wawasan Nusantara",
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
    meaning:
      "Diciptakan oleh R. Suharjo pada era pembebasan Irian Barat (1960-an). Lagu ini menegaskan bahwa ribuan pulau dari barat (Sabang) hingga timur (Merauke) terikat erat menjadi satu kesatuan bangsa Indonesia yang utuh.",
    characterProfile:
      "Berkebinekaan Global, Menghargai Keragaman Budaya, dan Menjaga Persatuan Lintas Pulau.",
  },
  {
    id: "satu-nusa-satu-bangsa",
    nomor: 8,
    title: "Satu Nusa Satu Bangsa",
    composer: "L. Manik",
    startTime: 700,
    durationText: "01:25",
    timestampText: "11:40",
    badge: "Sumpah Pemuda",
    lyrics: [
      "Satu nusa, satu bangsa, satu bahasa kita",
      "Tanah air pasti jaya untuk selama-lamanya",
      "Indonesia pusaka, Indonesia tercinta",
      "Nusa bangsa dan bahasa kita bela bersama!",
    ],
    meaning:
      "Diciptakan oleh Liberty Manik pada tahun 1947 berakar dari ikrar agung Sumpah Pemuda 1928. Menanamkan kesadaran bahwa perbedaan suku, agama, dan ras dipersatukan oleh satu tanah air, satu bangsa, dan satu bahasa Indonesia.",
    characterProfile:
      "Toleransi, Menghargai Pluralisme, dan Persaudaraan Sejati sesama anak bangsa.",
  },
  {
    id: "halo-halo-bandung",
    nomor: 9,
    title: "Halo-Halo Bandung",
    composer: "Ismail Marzuki",
    startTime: 785,
    durationText: "02:05",
    timestampText: "13:05",
    badge: "Heroisme Kota",
    lyrics: [
      "Halo-halo Bandung, ibukota periangan",
      "Halo-halo Bandung, kota kenang-kenangan",
      "Sudah lama beta tidak berjumpa dengan kau",
      "Sekarang telah menjadi lautan api",
      "Mari bung rebut kembali!",
    ],
    meaning:
      "Karya Ismail Marzuki yang mengabadikan peristiwa bersejarah Bandung Lautan Api pada 23 Maret 1946. Mengajarkan jiwa patriotik dan pengorbanan rakyat demi mempertahankan kedaulatan tanah air.",
    characterProfile:
      "Ketangguhan Diri, Rela Berkorban, dan Semangat Pantang Menyerah menghadapi tantangan zaman.",
  },
  {
    id: "bagimu-negeri",
    nomor: 10,
    title: "Bagimu Negeri",
    composer: "Kusbini",
    startTime: 910,
    durationText: "02:05",
    timestampText: "15:10",
    badge: "Janji Pengabdian",
    lyrics: [
      "Padamu negeri kami berjanji",
      "Padamu negeri kami berbakti",
      "Padamu negeri kami mengabdi",
      "Bagimu negeri jiwa raga kami!",
    ],
    meaning:
      "Diciptakan oleh Kusbini pada tahun 1942 di masa pendudukan Jepang. Liriknya sangat singkat namun sarat makna ketulusan janji, pengabdian murni, dan keikhlasan jiwa raga untuk kemakmuran ibu pertiwi.",
    characterProfile:
      "Integritas Luhur, Jiwa Pengabdian, dan Dedikasi Ikhlas bagi kemajuan masyarakat dan bangsa.",
  },
  {
    id: "ibu-kita-kartini",
    nomor: 11,
    title: "Ibu Kita Kartini",
    composer: "W.R. Supratman",
    startTime: 1035,
    durationText: "02:00",
    timestampText: "17:15",
    badge: "Emansipasi Bangsa",
    lyrics: [
      "Ibu kita Kartini, putri sejati",
      "Putri Indonesia, harum namanya",
      "Ibu kita Kartini, pendekar bangsa",
      "Pendekar kaumnya untuk merdeka",
      "Wahai Ibu kita Kartini, putri yang mulia",
      "Sungguh besar cita-citanya bagi Indonesia!",
    ],
    meaning:
      "Diciptakan oleh Wage Rudolf Supratman pada tahun 1929 untuk mengenang jasa Raden Ajeng Kartini dalam memperjuangkan hak pendidikan kaum perempuan agar bangsa Indonesia dapat bangkit dari kebodohan dan keterbelakangan.",
    characterProfile:
      "Semangat Belajar Sepanjang Hayat, Kesetaraan Hak, dan Berdaya Cipta bagi kemajuan negeri.",
  },
  {
    id: "indonesia-raya",
    nomor: 12,
    title: "Indonesia Raya",
    composer: "W.R. Supratman",
    startTime: 1155,
    durationText: "02:42",
    timestampText: "19:15",
    badge: "Lagu Kebangsaan",
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
    meaning:
      "Lagu kebangsaan resmi Indonesia yang pertama kali diperdengarkan secara instrumental biola oleh W.R. Supratman pada Kongres Pemuda II tanggal 28 Oktober 1928. Menjadi simfoni persatuan dan kebangkitan jiwa raga seluruh bangsa.",
    characterProfile:
      "Kewarganegaraan Universal, Martabat Bangsa, dan Kebanggaan Nasional sebagai Warga Negara Indonesia.",
  },
];
