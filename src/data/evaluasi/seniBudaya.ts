// src/data/evaluasi/seniBudaya.ts
import { PaketEvaluasi } from "./types";

export const PAKET_SENI_BUDAYA: PaketEvaluasi = {
  mapelId: "seniBudaya",
  namaMapel: "Seni dan Budaya",
  fase: "Fase B (Kelas 3-4)",
  totalSoal: 30,
  daftarSoal: [
    {
      id: "sen-1",
      nomor: 1,
      level: "mudah",
      pertanyaan: "Kelompok warna primer (warna pokok) yang tidak dihasilkan dari campuran warna lain adalah...",
      pilihan: [
        "Merah, Kuning, dan Biru",
        "Hijau, Ungu, dan Oranye",
        "Hitam, Putih, dan Abu-abu",
        "Cokelat, Merah muda, dan Emas"
      ],
      kunciJawaban: 0,
      pembahasan: "Warna primer adalah warna dasar yang terdiri atas merah, kuning, dan biru."
    },
    {
      id: "sen-2",
      nomor: 2,
      level: "mudah",
      pertanyaan: "Campuran warna primer merah dan kuning dengan perbandingan seimbang akan menghasilkan warna sekunder...",
      pilihan: ["Hijau", "Jingga (Oranye)", "Ungu", "Cokelat"],
      kunciJawaban: 1,
      pembahasan: "Warna merah dicampur dengan kuning menghasilkan warna jingga (oranye)."
    },
    {
      id: "sen-3",
      nomor: 3,
      level: "mudah",
      pertanyaan: "Campuran warna primer biru dan kuning akan menghasilkan warna...",
      pilihan: ["Hijau", "Ungu", "Cokelat", "Abu-abu"],
      kunciJawaban: 0,
      pembahasan: "Warna biru dipadukan dengan kuning menghasilkan warna hijau."
    },
    {
      id: "sen-4",
      nomor: 4,
      level: "mudah",
      pertanyaan: "Alat musik tradisional dari bambu yang dimainkan dengan cara digoyangkan dan berasal dari Jawa Barat adalah...",
      pilihan: ["Kolintang", "Angklung", "Sasando", "Gamelan"],
      kunciJawaban: 1,
      pembahasan: "Angklung adalah alat musik multitonal berbahan bambu khas Sunda, Jawa Barat, yang dibunyikan dengan cara digoyangkan."
    },
    {
      id: "sen-5",
      nomor: 5,
      level: "mudah",
      pertanyaan: "Alat musik petik khas dari Pulau Rote, Nusa Tenggara Timur (NTT) yang terbuat dari daun lontar adalah...",
      pilihan: ["Sasando", "Gitar", "Tifa", "Rebab"],
      kunciJawaban: 0,
      pembahasan: "Sasando adalah alat musik dawai petik tradisional dari Nusa Tenggara Timur berwadah anyaman daun lontar."
    },
    {
      id: "sen-6",
      nomor: 6,
      level: "mudah",
      pertanyaan: "Alat musik perkusi pukul sejenis kendang kecil yang berasal dari Maluku dan Papua adalah...",
      pilihan: ["Tifa", "Kendang Sunda", "Gong", "Saluang"],
      kunciJawaban: 0,
      pembahasan: "Tifa adalah alat musik tabuh tradisional khas masyarakat Papua dan Maluku."
    },
    {
      id: "sen-7",
      nomor: 7,
      level: "mudah",
      pertanyaan: "Karya seni rupa yang dibuat dengan menempelkan potongan-potongan kertas, kaca, atau keramik kecil berukuran sama pada pola disebut...",
      pilihan: ["Lukisan cat air", "Mozaik", "Anyaman", "Patung cor"],
      kunciJawaban: 1,
      pembahasan: "Mozaik adalah teknik menempel kepingan bahan kecil sejenis (kertas, keramik, biji-bijian) pada sebuah bidang pola."
    },
    {
      id: "sen-8",
      nomor: 8,
      level: "mudah",
      pertanyaan: "Ciri-ciri lagu dengan tangga nada diatonis mayor adalah...",
      pilihan: [
        "Terdengar sedih dan kurang bersemangat",
        "Bersifat riang gembira dan penuh semangat",
        "Tempo sangat lambat",
        "Dimulai dan diakhiri dengan nada La (6)"
      ],
      kunciJawaban: 1,
      pembahasan: "Tangga nada diatonis mayor memiliki nuansa ceria, bersemangat, dan biasanya diawali serta diakhiri dengan nada Do (1)."
    },
    {
      id: "sen-9",
      nomor: 9,
      level: "mudah",
      pertanyaan: "Tari Saman yang terkenal dengan gerakan tepuk tangan dan duduk berbanjar yang sangat kompak berasal dari daerah...",
      pilihan: ["Aceh", "Sumatra Barat", "Bali", "Papua"],
      kunciJawaban: 0,
      pembahasan: "Tari Saman berasal dari suku Gayo di Provinsi Aceh dan diakui UNESCO sebagai warisan budaya takbenda dunia."
    },
    {
      id: "sen-10",
      nomor: 10,
      level: "mudah",
      pertanyaan: "Properti utama yang wajib dibawa oleh penari Tari Piring dari Sumatra Barat adalah...",
      pilihan: ["Kipas kertas", "Payung geulis", "Dua buah piring porselen kecil di telapak tangan", "Topeng kayu"],
      kunciJawaban: 2,
      pembahasan: "Penari Tari Piring mengayunkan piring di kedua telapak tangannya dengan gerakan lincah dan cepat tanpa terjatuh."
    },
    {
      id: "sen-11",
      nomor: 11,
      level: "sedang",
      pertanyaan: "Perbedaan teknik antara kolase dan montase dalam karya seni rupa tempel adalah...",
      pilihan: [
        "Kolase menggunakan cat minyak, montase menggunakan krayon",
        "Kolase menempel berbagai macam bahan alamiah/buatan, sedangkan montase menggabungkan potongan gambar-gambar jadi dari majalah/koran",
        "Kolase dibuat dengan pahat, montase dengan cetakan",
        "Kolase berbentuk tiga dimensi, montase patung"
      ],
      kunciJawaban: 1,
      pembahasan: "Kolase memanfaatkan berbagai bahan (daun, ranting, kain), sedangkan montase memadukan potongan gambar jadi dari berbagai sumber media cetak."
    },
    {
      id: "sen-12",
      nomor: 12,
      level: "sedang",
      pertanyaan: "Alat musik melodis tradisional dari Minahasa, Sulawesi Utara yang terbuat dari bilah kayu ringan dan dimainkan dengan dipukul adalah...",
      pilihan: ["Kolintang", "Gamelan", "Calung", "Talempong"],
      kunciJawaban: 0,
      pembahasan: "Kolintang adalah instrumen perkusi kayu bernada khas Minahasa, Sulawesi Utara."
    },
    {
      id: "sen-13",
      nomor: 13,
      level: "sedang",
      pertanyaan: "Lagu wajib nasional 'Gugur Bunga' dan 'Syukur' biasanya dinyanyikan dengan tangga nada...",
      pilihan: ["Diatonis Mayor", "Diatonis Minor", "Pentatonis Pelog", "Pentatonis Slendro"],
      kunciJawaban: 1,
      pembahasan: "Tangga nada diatonis minor memiliki sifat khidmat, haru, dan sedih, cocok untuk lagu perjuangan yang mengenang jasa pahlawan."
    },
    {
      id: "sen-14",
      nomor: 14,
      level: "sedang",
      pertanyaan: "Tanda tempo 'Andante' dalam sebuah partitur lagu berarti lagu tersebut dinyanyikan dengan kecepatan...",
      pilihan: ["Sangat cepat seperti berlari", "Sedang seperti orang berjalan santai", "Sangat lambat sekali", "Menghentak-hentak"],
      kunciJawaban: 1,
      pembahasan: "Tempo Andante berarti bertempo sedang dengan kecepatan langkah kaki orang berjalan santai (~76-108 BPM)."
    },
    {
      id: "sen-15",
      nomor: 15,
      level: "sedang",
      pertanyaan: "Kain batik khas Indonesia yang diakui dunia dibuat menggunakan malam panas yang ditorehkan menggunakan alat bernama...",
      pilihan: ["Kuas lukis", "Canting", "Pahat", "Pena"],
      kunciJawaban: 1,
      pembahasan: "Canting adalah alat kecil bermoncong tembaga dengan gagang bambu untuk melukiskan cairan lilin malam pada kain batik."
    },
    {
      id: "sen-16",
      nomor: 16,
      level: "sedang",
      pertanyaan: "Tari Pendet dari Bali awalnya merupakan tari pemujaan di pura yang kini juga difungsikan sebagai...",
      pilihan: ["Tari peperangan", "Tari penyambutan tamu kehormatan", "Tari panen padi", "Tari pengusir hewan buas"],
      kunciJawaban: 1,
      pembahasan: "Tari Pendet kini lazim ditarikan oleh penari wanita yang menaburkan bunga sebagai ucapan selamat datang kepada para tamu."
    },
    {
      id: "sen-17",
      nomor: 17,
      level: "sedang",
      pertanyaan: "Dalam seni tari, gerakan mata yang melirik ke kanan dan ke kiri secara tegas dan ekspresif pada tari Bali disebut...",
      pilihan: ["Agem", "Nyeledet", "Kenser", "Sembahan"],
      kunciJawaban: 1,
      pembahasan: "Gerakan lirikan bola mata yang khas dan dinamis pada tarian Bali disebut 'nyeledet'."
    },
    {
      id: "sen-18",
      nomor: 18,
      level: "sedang",
      pertanyaan: "Unsur dasar seni rupa yang tercipta dari pertemuan kedua ujung garis atau perpaduan beberapa garis adalah...",
      pilihan: ["Titik", "Bidang", "Warna", "Tekstur"],
      kunciJawaban: 1,
      pembahasan: "Bidang adalah unsur seni rupa dua dimensi yang dibatasi oleh garis (misalnya lingkaran, segitiga, persegi)."
    },
    {
      id: "sen-19",
      nomor: 19,
      level: "sedang",
      pertanyaan: "Nilai raba pada permukaan suatu benda seni (misalnya halus, kasar, licin, atau bergelombang) disebut...",
      pilihan: ["Tekstur", "Perspektif", "Gradasi", "Komposisi"],
      kunciJawaban: 0,
      pembahasan: "Tekstur adalah sifat dan keadaan permukaan suatu benda yang dapat dilihat dan dirasakan melalui sentuhan indra peraba."
    },
    {
      id: "sen-20",
      nomor: 20,
      level: "sedang",
      pertanyaan: "Tari Merak dari Jawa Barat terinspirasi dari...",
      pilihan: [
        "Keindahan bulu dan tingkah laku burung merak jantan yang memesona",
        "Gerakan nelayan mendayung perahu",
        "Ksatria yang sedang memanah musuh",
        "Petani yang sedang mencangkul sawah"
      ],
      kunciJawaban: 0,
      pembahasan: "Tari Merak karya koreografer Raden Tjetje Somantri menggambarkan keelokan burung merak dengan kostum sayap warna-warni yang anggun."
    },
    {
      id: "sen-21",
      nomor: 21,
      level: "hots",
      pertanyaan: "Dalam menggambar bentuk tiga dimensi, seniman menambahkan arsiran gelap dan terang pada objek. Tujuan penambahan gelap terang tersebut adalah...",
      pilihan: [
        "Membuat kertas gambar cepat penuh",
        "Memberikan kesan kedalaman, volume, dan ilusi ruang nyata pada gambar",
        "Menghapus garis gambar yang salah",
        "Membuat gambar terlihat membingungkan"
      ],
      kunciJawaban: 1,
      pembahasan: "Teknik gelap terang (shading) menghasilkan ilusi volume tiga dimensi sehingga gambar tampak cembung, nyata, dan memiliki kedalaman."
    },
    {
      id: "sen-22",
      nomor: 22,
      level: "hots",
      pertanyaan: "Perhatikan alat-alat musik: Saluang, Suling bambu, Harmonika, dan Terompet. Berdasarkan sumber bunyi dan cara memainkannya, kesamaan dari keempat alat musik tersebut adalah...",
      pilihan: [
        "Semuanya alat musik perkusi pukul",
        "Semuanya dimainkan dengan cara ditiup (aerofon)",
        "Semuanya menggunakan dawai senar",
        "Semuanya terbuat dari logam tembaga"
      ],
      kunciJawaban: 1,
      pembahasan: "Semua alat musik tersebut memanfaatkan hembusan udara (tiupan) sebagai sumber getaran bunyi (kelompok aerofon)."
    },
    {
      id: "sen-23",
      nomor: 23,
      level: "hots",
      pertanyaan: "Gamelan Jawa menggunakan dua tangga nada pentatonis tradisional, yaitu...",
      pilihan: ["Mayor dan Minor", "Pelog dan Slendro", "Kromatis dan Diatonis", "Sopran dan Alto"],
      kunciJawaban: 1,
      pembahasan: "Pelog (7 nada dasar berjarak variatif) dan Slendro (5 nada berjarak sama) adalah dua laras tangga nada pentatonis gamelan Jawa."
    },
    {
      id: "sen-24",
      nomor: 24,
      level: "hots",
      pertanyaan: "Tari Reog Ponorogo menampilkan penari utama yang mengenakan hiasan topeng kepala singa berhiaskan bulu merak raksasa yang disebut Dadak Merak. Keunikan cara menari Dadak Merak seberat puluhan kilogram ini adalah...",
      pilihan: [
        "Ditarik menggunakan tali kawat dari atas panggung",
        "Diangkat dan ditahan semata-mata menggunakan kekuatan gigitan gigi penari",
        "Diletakkan di atas troli beroda",
        "Diikatkan pada punggung kuda"
      ],
      kunciJawaban: 1,
      pembahasan: "Pembarong memegang dan menggerakkan topeng Dadak Merak seberat ~50 kg hanya dengan kekuatan gigitan gigi dan rahangnya."
    },
    {
      id: "sen-25",
      nomor: 25,
      level: "hots",
      pertanyaan: "Lagu anak bertema persahabatan memiliki birama 4/4. Arti dari birama 4/4 adalah...",
      pilihan: [
        "Terdapat 4 ketukan dalam setiap ruas birama dan tiap ketukan bernilai not seperempat",
        "Lagu hanya boleh dimainkan selama 4 menit",
        "Lagu dinyanyikan oleh 4 orang penyanyi",
        "Lagu hanya memiliki 4 lirik kalimat"
      ],
      kunciJawaban: 0,
      pembahasan: "Angka atas (4) menunjukkan jumlah ketukan per birama, angka bawah (4) menunjukkan nilai not pembagi (not seperempat)."
    },
    {
      id: "sen-26",
      nomor: 26,
      level: "hots",
      pertanyaan: "Jika seorang pelukis mencampurkan warna biru dengan warna merah, warna yang dihasilkan adalah...",
      pilihan: ["Hijau", "Ungu", "Oranye", "Cokelat muda"],
      kunciJawaban: 1,
      pembahasan: "Pencampuran dua warna primer biru dan merah menghasilkan warna sekunder ungu."
    },
    {
      id: "sen-27",
      nomor: 27,
      level: "hots",
      pertanyaan: "Batik yang motifnya digambar langsung menggunakan canting malam oleh tangan perajin tanpa mesin disebut...",
      pilihan: ["Batik cetak sablon", "Batik tulis", "Batik cap stempel", "Batik tenun"],
      kunciJawaban: 1,
      pembahasan: "Batik tulis dikerjakan manual helai demi helai menggunakan canting tulis, membutuhkan ketelitian tinggi dan bernilai seni paling istimewa."
    },
    {
      id: "sen-28",
      nomor: 28,
      level: "hots",
      pertanyaan: "Dalam pola lantai seni tari, penari yang berbaris membentuk garis diagonal memiliki makna simbolis...",
      pilihan: [
        "Kesan lemah dan pasif",
        "Memberikan kesan dinamis, kokoh, dan bergerak maju",
        "Kesan terpecah belah",
        "Kesan lingkaran tanpa henti"
      ],
      kunciJawaban: 1,
      pembahasan: "Garis lurus menyerong (diagonal) pada pola lantai tarian memancarkan energi gerak yang dinamis, dinamis, dan memperkuat ekspresi pertunjukan."
    },
    {
      id: "sen-29",
      nomor: 29,
      level: "hots",
      pertanyaan: "Karya seni kriya anyaman dari bahan rotan dan bambu seperti bakul, caping, dan tikar banyak dihasilkan di perdesaan Indonesia karena...",
      pilihan: [
        "Bahan baku bambu melimpah di alam dan merupakan warisan kearifan lokal yang ramah lingkungan",
        "Mesin pabrik tidak bisa membuat perabotan rumah",
        "Harga rotan lebih mahal dari emas",
        "Bambu tidak bisa dipotong oleh pisau"
      ],
      kunciJawaban: 0,
      pembahasan: "Kriya anyaman memanfaatkan ketersediaan bambu alami yang lentur, kuat, dan terbarukan sebagai bagian kearifan tradisi nusantara."
    },
    {
      id: "sen-30",
      nomor: 30,
      level: "hots",
      pertanyaan: "Seni musik akapela adalah pertunjukan musik yang unik karena...",
      pilihan: [
        "Hanya diiringi oleh drum set bervolume keras",
        "Dinyanyikan secara paduan suara murni tanpa iringan alat musik instrumen apa pun",
        "Dinyanyikan sambil menari di dalam air",
        "Menggunakan suara synthesizer komputer saja"
      ],
      kunciJawaban: 1,
      pembahasan: "Akapela (a cappella) adalah bernyanyi secara kelompok tanpa instrumen musik, di mana seluruh irama dan harmoni dihasilkan dari pita suara manusia."
    }
  ]
};
