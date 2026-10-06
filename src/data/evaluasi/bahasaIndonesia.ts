// src/data/evaluasi/bahasaIndonesia.ts
import { PaketEvaluasi } from "./types";

export const PAKET_BAHASA_INDONESIA: PaketEvaluasi = {
  mapelId: "bahasaIndonesia",
  namaMapel: "Bahasa Indonesia",
  fase: "Fase B (Kelas 3-4)",
  totalSoal: 30,
  daftarSoal: [
    {
      id: "bin-1",
      nomor: 1,
      level: "mudah",
      pertanyaan: "Ide pokok atau gagasan utama dalam sebuah paragraf biasanya terdapat pada...",
      pilihan: ["Kalimat utama", "Kalimat penjelas", "Kata sambung", "Judul buku"],
      kunciJawaban: 0,
      pembahasan: "Kalimat utama memuat ide pokok atau inti pembahasan yang mendasari sebuah paragraf."
    },
    {
      id: "bin-2",
      nomor: 2,
      level: "mudah",
      pertanyaan: "Kata tanya yang tepat untuk menanyakan tempat terjadinya suatu peristiwa adalah...",
      pilihan: ["Kapan", "Di mana", "Mengapa", "Bagaimana"],
      kunciJawaban: 1,
      pembahasan: "Kata tanya 'di mana' digunakan untuk menanyakan lokasi atau tempat berlangsungnya peristiwa."
    },
    {
      id: "bin-3",
      nomor: 3,
      level: "mudah",
      pertanyaan: "Kata tanya 'mengapa' digunakan dalam sebuah teks untuk menanyakan...",
      pilihan: ["Waktu terjadinya peristiwa", "Alasan atau sebab terjadinya sesuatu", "Jumlah benda", "Cara membuat sesuatu"],
      kunciJawaban: 1,
      pembahasan: "Kata tanya 'mengapa' berfungsi untuk menanyakan alasan, latar belakang, atau sebab sebuah kejadian."
    },
    {
      id: "bin-4",
      nomor: 4,
      level: "mudah",
      pertanyaan: "Cerita fiksi yang tokoh-tokohnya diperankan oleh hewan yang bertingkah laku seperti manusia disebut...",
      pilihan: ["Fabel", "Mite", "Legenda", "Sage"],
      kunciJawaban: 0,
      pembahasan: "Fabel adalah dongeng atau cerita binatang yang mengajarkan budi pekerti dan pesan moral kepada pembaca."
    },
    {
      id: "bin-5",
      nomor: 5,
      level: "mudah",
      pertanyaan: "Lawan kata (antonim) dari kata 'rajin' adalah...",
      pilihan: ["Pandai", "Malas", "Pintar", "Cekatan"],
      kunciJawaban: 1,
      pembahasan: "Antonim adalah lawan kata. Lawan dari kata 'rajin' adalah 'malas'."
    },
    {
      id: "bin-6",
      nomor: 6,
      level: "mudah",
      pertanyaan: "Persamaan kata (sinonim) dari kata 'girang' adalah...",
      pilihan: ["Sedih", "Gembira", "Marah", "Kecewa"],
      kunciJawaban: 1,
      pembahasan: "Sinonim adalah persamaan makna kata. Kata 'girang' memiliki makna yang sama dengan 'gembira'."
    },
    {
      id: "bin-7",
      nomor: 7,
      level: "mudah",
      pertanyaan: "Penggunaan huruf kapital yang tepat pada penulisan nama orang dan kota adalah...",
      pilihan: [
        "budi pergi ke surabaya.",
        "Budi pergi ke Surabaya.",
        "Budi pergi ke surabaya.",
        "budi pergi ke Surabaya."
      ],
      kunciJawaban: 1,
      pembahasan: "Huruf kapital digunakan pada awal kalimat, nama diri seseorang (Budi), dan nama geografi atau kota (Surabaya)."
    },
    {
      id: "bin-8",
      nomor: 8,
      level: "mudah",
      pertanyaan: "Tanda baca yang digunakan untuk mengakhiri kalimat tanya adalah...",
      pilihan: ["Tanda titik (.)", "Tanda seru (!)", "Tanda tanya (?)", "Tanda koma (,)"],
      kunciJawaban: 2,
      pembahasan: "Tanda tanya (?) selalu diletakkan pada akhir kalimat tanya."
    },
    {
      id: "bin-9",
      nomor: 9,
      level: "mudah",
      pertanyaan: "Kalimat perintah atau ajakan biasanya diakhiri dengan tanda baca...",
      pilihan: ["Titik dua (:)", "Tanda petik (\")", "Tanda seru (!)", "Tanda tanya (?)"],
      kunciJawaban: 2,
      pembahasan: "Tanda seru (!) digunakan untuk menegaskan kalimat perintah, ajakan, seruan, atau emosi yang kuat."
    },
    {
      id: "bin-10",
      nomor: 10,
      level: "mudah",
      pertanyaan: "Pesan kebaikan atau nasihat moral yang dapat dipetik dari sebuah cerita dongeng disebut...",
      pilihan: ["Latar", "Amanat", "Alur", "Tema"],
      kunciJawaban: 1,
      pembahasan: "Amanat adalah pesan moral dan nasihat berharga yang ingin disampaikan pengarang kepada pembaca cerita."
    },
    {
      id: "bin-11",
      nomor: 11,
      level: "sedang",
      pertanyaan: "Bacalah teks berikut: 'Kelinci melompat riang di kebun wortel Pak Tani. Tiba-tiba ia mendengar suara gemerisik daun di balik semak-semak.' Latar tempat pada kutipan cerita tersebut adalah...",
      pilihan: ["Rumah Pak Tani", "Kebun wortel", "Tepi sungai", "Dalam goa"],
      kunciJawaban: 1,
      pembahasan: "Kutipan teks secara jelas menyebutkan kelinci berada di 'kebun wortel Pak Tani'."
    },
    {
      id: "bin-12",
      nomor: 12,
      level: "sedang",
      pertanyaan: "Kata dasar dari kata berimbuhan 'menari' adalah...",
      pilihan: ["Tari", "Nari", "Menar", "Tarikan"],
      kunciJawaban: 0,
      pembahasan: "Awalan me- bertemu huruf awal 't' akan meluluhkan huruf 't' menjadi bunyi sengau 'n', sehingga kata dasarnya adalah 'tari'."
    },
    {
      id: "bin-13",
      nomor: 13,
      level: "sedang",
      pertanyaan: "Perhatikan kalimat berikut: 'Ibu membeli sayur, ikan, dan buah di pasar.' Fungsi tanda koma (,) pada kalimat tersebut adalah...",
      pilihan: [
        "Mengakhiri kalimat berita",
        "Memisahkan unsur-unsur dalam suatu rincian atau pembilangan",
        "Menyatakan kalimat tanya",
        "Mengutip kalimat langsung"
      ],
      kunciJawaban: 1,
      pembahasan: "Tanda koma digunakan di antara unsur-unsur dalam perincian (sayur, ikan, dan buah)."
    },
    {
      id: "bin-14",
      nomor: 14,
      level: "sedang",
      pertanyaan: "Ciri-ciri pantun anak yang tepat di bawah ini adalah...",
      pilihan: [
        "Terdiri atas 6 baris setiap bait",
        "Bersajak a-b-a-b dan tiap baris terdiri atas 8-12 suku kata",
        "Semua baris merupakan isi",
        "Tidak memiliki rima akhir"
      ],
      kunciJawaban: 1,
      pembahasan: "Pantun terdiri dari 4 baris sebait, bersajak a-b-a-b, baris 1-2 sampiran, baris 3-4 isi, serta 8-12 suku kata per baris."
    },
    {
      id: "bin-15",
      nomor: 15,
      level: "sedang",
      pertanyaan: "Perhatikan sampiran pantun: 'Pergi ke pasar beli blewah, Pulang ke rumah memetik nangka.' Baris isi yang berima selaras (a-b-a-b) adalah...",
      pilihan: [
        "Kalau kamu rajin sekolah, Pasti kelak jadi juara.",
        "Mari kawan kita melangkah, Jangan lupa memakai celana.",
        "Makan bakso hangat sekali, Enak rasanya manis pedas.",
        "Bunga mawar harum baunya, Warnanya merah indah memesona."
      ],
      kunciJawaban: 0,
      pembahasan: "Rima baris 1 (blewah) bersajak dengan baris 3 (sekolah), dan baris 2 (nangka) bersajak dengan baris 4 (juara)."
    },
    {
      id: "bin-16",
      nomor: 16,
      level: "sedang",
      pertanyaan: "Kalimat berikut yang merupakan kalimat fakta adalah...",
      pilihan: [
        "Matahari terbit di sebelah timur dan terbenam di sebelah barat.",
        "Pantai Kuta adalah tempat wisata paling indah sedunia.",
        "Semua orang pasti menyukai rasa es krim vanila.",
        "Besok sore kemungkinan besar akan turun hujan lebat."
      ],
      kunciJawaban: 0,
      pembahasan: "Fakta adalah kenyataan yang dapat dibuktikan kebenarannya secara ilmiah, seperti arah terbit dan terbenamnya matahari."
    },
    {
      id: "bin-17",
      nomor: 17,
      level: "sedang",
      pertanyaan: "Kalimat berikut yang merupakan kalimat opini atau pendapat pribadi adalah...",
      pilihan: [
        "Buku cerita dongeng ini sangat menarik untuk dibaca.",
        "Ibu kota negara Indonesia saat ini adalah Jakarta.",
        "Sapi adalah hewan mamalia pemakan rumput.",
        "Air membeku pada suhu nol derajat Celsius."
      ],
      kunciJawaban: 0,
      pembahasan: "Kata 'sangat menarik' bersifat relatif dan bergantung pada penilaian subjektif masing-masing pembaca (opini)."
    },
    {
      id: "bin-18",
      nomor: 18,
      level: "sedang",
      pertanyaan: "Kata berimbuhan yang menyatakan perbuatan yang dilakukan secara berulang-ulang adalah...",
      pilihan: ["Melompat-lompat", "Tertidur", "Membaca", "Bersepeda"],
      kunciJawaban: 0,
      pembahasan: "Kata ulang berimbuhan 'melompat-lompat' menunjukkan perbuatan melompat yang dilakukan berkali-kali."
    },
    {
      id: "bin-19",
      nomor: 19,
      level: "sedang",
      pertanyaan: "Urutan peristiwa yang saling berhubungan dalam sebuah jalan cerita disebut...",
      pilihan: ["Alur (plot)", "Latar tempat", "Perwatakan", "Sudut pandang"],
      kunciJawaban: 0,
      pembahasan: "Alur adalah rangkaian peristiwa yang membentuk jalan cerita dari awal, pertengahan, hingga penyelesaian."
    },
    {
      id: "bin-20",
      nomor: 20,
      level: "sedang",
      pertanyaan: "Tokoh utama dalam sebuah cerita yang berwatak baik dan disenangi pembaca disebut tokoh...",
      pilihan: ["Antagonis", "Protagonis", "Tritagonis", "Figuran"],
      kunciJawaban: 1,
      pembahasan: "Tokoh protagonis adalah tokoh sentral berkarakter baik yang menjadi tumpuan cerita, sedangkan antagonis adalah penentangnya."
    },
    {
      id: "bin-21",
      nomor: 21,
      level: "hots",
      pertanyaan: "Bacalah paragraf berikut: 'Pohon mangga di halaman rumah Edo sangat lebat buahnya. Daun-daunnya yang hijau rindang membuat udara sekitar terasa sejuk. Setiap sore, burung-burung kecil berkicau riang di dahannya. Halaman rumah Edo menjadi tempat yang asri.' Ide pokok paragraf di atas adalah...",
      pilihan: [
        "Jenis burung yang berkicau di pohon",
        "Keadaan pohon mangga yang membuat halaman rumah Edo asri",
        "Cara menanam pohon mangga di kebun",
        "Warna daun mangga yang hijau"
      ],
      kunciJawaban: 1,
      pembahasan: "Seluruh kalimat penjelas menguraikan bagaimana pohon mangga memberi manfaat dan menciptakan suasana halaman rumah Edo yang asri."
    },
    {
      id: "bin-22",
      nomor: 22,
      level: "hots",
      pertanyaan: "Dalam sebuah poster lingkungan tertulis: 'Buanglah sampah pada tempatnya, selamatkan bumi kita!' Kalimat tersebut tergolong jenis teks...",
      pilihan: ["Teks deskripsi", "Teks narasi fiksi", "Teks persuasif (ajakan)", "Teks laporan hasil observasi"],
      kunciJawaban: 2,
      pembahasan: "Teks persuasi berisi ajakan atau imbauan yang bertujuan membujuk orang lain melakukan tindakan positif menjaga lingkungan."
    },
    {
      id: "bin-23",
      nomor: 23,
      level: "hots",
      pertanyaan: "Perhatikan kalimat majas: 'Angin malam membelai rambut Ani dengan lembut.' Majas yang digunakan pada kalimat tersebut adalah...",
      pilihan: ["Hiperbola", "Personifikasi", "Metafora", "Asosiasi"],
      kunciJawaban: 1,
      pembahasan: "Majas personifikasi mengumpamakan benda mati (angin malam) seolah-olah memiliki sifat manusiawi yang dapat membelai."
    },
    {
      id: "bin-24",
      nomor: 24,
      level: "hots",
      pertanyaan: "Manakah penulisan kalimat langsung yang memenuhi kaidah tata bahasa Indonesia yang benar?",
      pilihan: [
        "\"Kapan kita akan berangkat ke museum?\" tanya Rina kepada ayahnya.",
        "\"Kapan kita akan berangkat ke museum? Tanya Rina kepada ayahnya.",
        "Kapan kita akan berangkat ke museum? Tanya Rina.",
        "\"kapan kita akan berangkat ke museum!\" Tanya Rina."
      ],
      kunciJawaban: 0,
      pembahasan: "Kalimat langsung diawali dan diakhiri tanda petik, tanda baca tanya sebelum tanda petik tutup, dan kata pengiring 'tanya' memakai huruf kecil."
    },
    {
      id: "bin-25",
      nomor: 25,
      level: "hots",
      pertanyaan: "Pada fabel 'Semut dan Belalang', belalang menghabiskan musim panas bernyanyi tanpa mengumpulkan makanan, sedangkan semut giat bekerja. Saat musim dingin tiba, belalang kelaparan. Pesan moral dari cerita tersebut adalah...",
      pilihan: [
        "Kita harus suka bernyanyi sepanjang waktu",
        "Jangan suka membuang waktu dan persiapkanlah masa depan dengan bekerja giat",
        "Semut adalah hewan yang kikir",
        "Musim dingin adalah waktu yang paling menyenangkan"
      ],
      kunciJawaban: 1,
      pembahasan: "Kisah semut dan belalang mengajarkan pentingnya memanfaatkan waktu sebaik mungkin dan rajin berikhtiar sebelum datang masa sulit."
    },
    {
      id: "bin-26",
      nomor: 26,
      level: "hots",
      pertanyaan: "Bacalah kalimat rancu berikut: 'Bagi seluruh para siswa-siswa semua diwajibkan masuk kelas.' Perbaikan menjadi kalimat efektif yang tepat adalah...",
      pilihan: [
        "Semua seluruh para siswa wajib masuk kelas.",
        "Seluruh siswa wajib masuk kelas.",
        "Siswa-siswa para semuanya wajib masuk kelas.",
        "Bagi semua para siswa wajib masuk kelas."
      ],
      kunciJawaban: 1,
      pembahasan: "Kalimat efektif tidak menggunakan kata pemborosan jamak ganda seperti 'bagi', 'seluruh', 'para', dan pengulangan 'siswa-siswa'."
    },
    {
      id: "bin-27",
      nomor: 27,
      level: "hots",
      pertanyaan: "Langkah pertama yang harus dilakukan ketika ingin menyusun ringkasan dari sebuah teks bacaan adalah...",
      pilihan: [
        "Langsung menyalin kalimat terakhir setiap paragraf",
        "Membaca seluruh teks dengan cermat dan menemukan ide pokok tiap paragraf",
        "Menghitung jumlah kata dalam teks",
        "Mengganti semua tokoh dalam cerita"
      ],
      kunciJawaban: 1,
      pembahasan: "Membuat ringkasan memerlukan pemahaman utuh isi teks dengan membaca cermat dan mencatat ide-ide pokok."
    },
    {
      id: "bin-28",
      nomor: 28,
      level: "hots",
      pertanyaan: "Makna kiasan dari ungkapan 'kutu buku' dalam kalimat 'Doni dikenal sebagai anak kutu buku di sekolahnya' adalah...",
      pilihan: [
        "Anak yang rambutnya banyak kutu",
        "Orang yang sangat gemar dan rajin membaca buku",
        "Anak yang suka merobek buku",
        "Pedagang yang menjual buku bekas"
      ],
      kunciJawaban: 1,
      pembahasan: "'Kutu buku' adalah ungkapan kiasan positif untuk seseorang yang sangat rajin membaca dan mencintai buku pengetahuan."
    },
    {
      id: "bin-29",
      nomor: 29,
      level: "hots",
      pertanyaan: "Perhatikan teks petunjuk: '1. Masukkan steker ke stopkontak. 2. Tekan tombol power. 3. Masukkan roti tawar. 4. Atur pengatur waktu.' Urutan petunjuk di atas merupakan cara mengoperasikan...",
      pilihan: ["Penanak nasi", "Pemanggang roti (toaster)", "Setrika listrik", "Kipas angin"],
      kunciJawaban: 1,
      pembahasan: "Langkah-langkah memasukkan roti tawar dan mengatur waktu pemanggangan adalah cara menggunakan pemanggang roti (toaster)."
    },
    {
      id: "bin-30",
      nomor: 30,
      level: "hots",
      pertanyaan: "Tujuan utama penulis mencantumkan gambar ilustrasi atau diagram dalam sebuah teks non-fiksi adalah...",
      pilihan: [
        "Menghabiskan ruang kosong di halaman kertas",
        "Membantu pembaca memahami informasi bacaan secara lebih visual dan jelas",
        "Membuat harga buku menjadi lebih mahal",
        "Mengelabui pembaca agar tidak membaca tulisan"
      ],
      kunciJawaban: 1,
      pembahasan: "Ilustrasi dan diagram berfungsi memperjelas gagasan, menyajikan data visual, dan mempermudah pemahaman konsep bagi pembaca."
    }
  ]
};
