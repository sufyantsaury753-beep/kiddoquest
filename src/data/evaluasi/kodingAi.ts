// src/data/evaluasi/kodingAi.ts
import { PaketEvaluasi } from "./types";

export const PAKET_KODING_AI: PaketEvaluasi = {
  mapelId: "kodingAi",
  namaMapel: "Koding & Kecerdasan Buatan (AI)",
  fase: "Fase B (Kelas 3-4)",
  totalSoal: 30,
  daftarSoal: [
    {
      id: "kod-1",
      nomor: 1,
      level: "mudah",
      pertanyaan: "Urutan langkah-langkah logis dan teratur untuk menyelesaikan suatu masalah atau tugas disebut...",
      pilihan: ["Algoritma", "Hardware", "Monitor", "Kabel data"],
      kunciJawaban: 0,
      pembahasan: "Algoritma adalah serangkaian instruksi atau langkah terstruktur langkah demi langkah untuk menyelesaikan suatu pekerjaan."
    },
    {
      id: "kod-2",
      nomor: 2,
      level: "mudah",
      pertanyaan: "Dalam berpikir komputasional, memecah masalah besar yang rumit menjadi bagian-bagian kecil yang lebih mudah diselesaikan disebut...",
      pilihan: ["Dekomposisi", "Pengenalan pola", "Abstraksi", "Algoritma"],
      kunciJawaban: 0,
      pembahasan: "Dekomposisi adalah teknik memecah masalah besar menjadi sub-masalah kecil agar lebih sederhana dan mudah ditangani."
    },
    {
      id: "kod-3",
      nomor: 3,
      level: "mudah",
      pertanyaan: "Melihat kesamaan ciri pada gambar kucing, harimau, dan singa karena sama-sama berkaki empat dan berkumis adalah contoh pilar...",
      pilihan: ["Dekomposisi", "Pengenalan Pola (Pattern Recognition)", "Perulangan", "Debugging"],
      kunciJawaban: 1,
      pembahasan: "Pengenalan pola adalah kemampuan mengenali kesamaan, keteraturan, atau tren pada data atau objek yang diamati."
    },
    {
      id: "kod-4",
      nomor: 4,
      level: "mudah",
      pertanyaan: "Proses memfokuskan perhatian hanya pada informasi yang penting dan mengabaikan detail-detail yang tidak relevan disebut...",
      pilihan: ["Abstraksi", "Algoritma", "Dekomposisi", "Instalasi"],
      kunciJawaban: 0,
      pembahasan: "Abstraksi menyaring hal-hal penting dan mengabaikan rincian yang tidak dibutuhkan, seperti peta jalur MRT yang hanya menampilkan rute stasiun."
    },
    {
      id: "kod-5",
      nomor: 5,
      level: "mudah",
      pertanyaan: "Dalam pemrograman visual seperti Scratch, blok perintah yang digunakan untuk mengulang suatu gerakan berkali-kali disebut...",
      pilihan: ["Perulangan (Loop / Repeat)", "Variabel", "Kondisi If-Else", "Stop all"],
      kunciJawaban: 0,
      pembahasan: "Loop atau perulangan (repeat) digunakan untuk menjalankan sekumpulan kode perintah berulang-ulang tanpa harus menulis ulang."
    },
    {
      id: "kod-6",
      nomor: 6,
      level: "mudah",
      pertanyaan: "Perintah logika: 'JIKA hujan turun, MAKA buka payung, JIKA TIDAK, simpan payung' merupakan contoh struktur logika...",
      pilihan: ["Sekuensial", "Percabangan (If - Else)", "Perulangan tak hingga", "Dekomposisi"],
      kunciJawaban: 1,
      pembahasan: "Struktur If-Else (percabangan) mengambil keputusan berdasarkan kondisi apakah suatu syarat terpenuhi (benar/salah)."
    },
    {
      id: "kod-7",
      nomor: 7,
      level: "mudah",
      pertanyaan: "Kesalahan atau eror pada kode program yang menyebabkan program tidak berjalan semestinya disebut...",
      pilihan: ["Bug", "Virus", "Icon", "Sprite"],
      kunciJawaban: 0,
      pembahasan: "Bug adalah istilah untuk kesalahan atau cacat logika dalam kode program komputer."
    },
    {
      id: "kod-8",
      nomor: 8,
      level: "mudah",
      pertanyaan: "Proses mencari dan memperbaiki kesalahan (bug) di dalam kode program dinamakan...",
      pilihan: ["Debugging", "Downloading", "Browsing", "Typing"],
      kunciJawaban: 0,
      pembahasan: "Debugging adalah kegiatan memeriksa alur kode, menemukan letak kesalahan, dan memperbaikinya agar program berjalan lancar."
    },
    {
      id: "kod-9",
      nomor: 9,
      level: "mudah",
      pertanyaan: "Singkatan dari AI dalam teknologi kecerdasan buatan adalah...",
      pilihan: ["Artificial Intelligence", "Automatic Internet", "Active Information", "Application Interface"],
      kunciJawaban: 0,
      pembahasan: "AI singkatan dari Artificial Intelligence (Kecerdasan Buatan), yaitu sistem komputer cerdas yang mampu meniru kecerdasan manusia."
    },
    {
      id: "kod-10",
      nomor: 10,
      level: "mudah",
      pertanyaan: "Perangkat keras komputer yang berfungsi sebagai indra bagi robot untuk mendeteksi jarak dinding di depannya adalah...",
      pilihan: ["Sensor ultrasonik", "Keyboard", "Printer", "Speaker"],
      kunciJawaban: 0,
      pembahasan: "Sensor ultrasonik memancarkan gelombang suara frekuensi tinggi untuk mengukur jarak benda di depan robot."
    },
    {
      id: "kod-11",
      nomor: 11,
      level: "sedang",
      pertanyaan: "Sebuah robot penyedot debu ingin bergerak membersihkan lantai berbentuk persegi dengan panjang sisi 4 langkah. Perintah efisien menggunakan perulangan adalah...",
      pilihan: [
        "Ulangi 4 kali: [Maju 4 langkah, Belok kanan 90 derajat]",
        "Maju 1 langkah, Berhenti",
        "Belok kiri 10 kali tanpa maju",
        "Ulangi 2 kali: [Mundur 4 langkah]"
      ],
      kunciJawaban: 0,
      pembahasan: "Persegi memiliki 4 sisi dan 4 sudut 90°. Mengulang [Maju 4 langkah, Belok kanan 90°] sebanyak 4 kali akan membentuk rute persegi sempurna."
    },
    {
      id: "kod-12",
      nomor: 12,
      level: "sedang",
      pertanyaan: "Dalam permainan game, 'Skor' dan 'Jumlah Nyawa' pemain disimpan di dalam komputer menggunakan...",
      pilihan: ["Variabel", "Monitor", "Kabel USB", "Mouse pad"],
      kunciJawaban: 0,
      pembahasan: "Variabel adalah wadah penyimpanan dalam memori program yang nilainya dapat berubah-ubah (seperti skor yang bertambah)."
    },
    {
      id: "kod-13",
      nomor: 13,
      level: "sedang",
      pertanyaan: "Bagaimana cara sistem AI pengenal gambar (seperti Google Lens) bisa mengenali bahwa suatu foto adalah seekor kucing?",
      pilihan: [
        "Komputer memiliki mata manusia yang ajaib",
        "Komputer dilatih mempelajari jutaan contoh foto kucing sehingga mengenali pola telinga, kumis, dan bentuk wajahnya",
        "Komputer menebak secara acak setiap saat",
        "Kucing yang berbicara sendiri ke dalam layar"
      ],
      kunciJawaban: 1,
      pembahasan: "AI belajar melalui Machine Learning dengan dilatih ribuan hingga jutaan data contoh untuk mengenali pola-pola khas objek."
    },
    {
      id: "kod-14",
      nomor: 14,
      level: "sedang",
      pertanyaan: "Asisten suara pintar seperti Siri atau Google Assistant yang bisa menjawab pertanyaan suara kita menggunakan teknologi AI berupa...",
      pilihan: [
        "Voice Recognition (Pengenalan Suara) dan Natural Language Processing (Pemrosesan Bahasa)",
        "Kamera pemindai sidik jari",
        "Papan ketik mekanik",
        "Baterai berukuran raksasa"
      ],
      kunciJawaban: 0,
      pembahasan: "AI suara mengubah gelombang suara menjadi teks dan memproses makna bahasa manusia untuk memberikan jawaban yang sesuai."
    },
    {
      id: "kod-15",
      nomor: 15,
      level: "sedang",
      pertanyaan: "Langkah keamanan digital (cyber safety) yang paling tepat untuk melindungi akun belajar online dari orang jahat adalah...",
      pilihan: [
        "Menggunakan kata sandi '123456' agar mudah diingat semua orang",
        "Membuat kata sandi kuat (kombinasi huruf, angka, simbol) dan merahasiakannya dari siapa pun kecuali orang tua",
        "Menuliskan kata sandi di papan pengumuman kelas",
        "Membagikan kata sandi kepada orang asing di internet"
      ],
      kunciJawaban: 1,
      pembahasan: "Kata sandi kuat dan rahasia adalah kunci utama menjaga keamanan akun dan data pribadi di dunia digital."
    },
    {
      id: "kod-16",
      nomor: 16,
      level: "sedang",
      pertanyaan: "Jika kamu menerima pesan dari orang yang tidak dikenal di media sosial yang meminta alamat rumah atau foto pribadimu, tindakan terbaik adalah...",
      pilihan: [
        "Langsung memberikan alamat rumah lengkap",
        "Mengabaikan pesan, memblokir akun tersebut, dan segera memberitahukan kepada orang tua atau guru",
        "Mengajak orang asing tersebut bertemu sendirian",
        "Mengirimkan uang jajan"
      ],
      kunciJawaban: 1,
      pembahasan: "Jangan pernah membagikan data pribadi kepada orang asing di internet dan selalu komunikasikan kepada orang tua/guru."
    },
    {
      id: "kod-17",
      nomor: 17,
      level: "sedang",
      pertanyaan: "Segala jejak aktivitas, foto, komentar, dan video yang kita unggah di internet akan tersimpan dan sulit dihapus sepenuhnya. Hal ini disebut...",
      pilihan: ["Jejak Digital (Digital Footprint)", "Kabel LAN", "Cloud storage penuh", "Screenshot"],
      kunciJawaban: 0,
      pembahasan: "Jejak digital adalah rekam jejak aktivitas kita di dunia maya yang dapat dilihat orang lain di masa sekarang maupun masa depan."
    },
    {
      id: "kod-18",
      nomor: 18,
      level: "sedang",
      pertanyaan: "Perilaku menuliskan komentar kasar, mengejek, atau mengintimidasi teman di grup pesan obrolan internet disebut...",
      pilihan: ["Cyberbullying (Perundungan Siber)", "Algoritma cerdas", "Dekomposisi", "Coding challenge"],
      kunciJawaban: 0,
      pembahasan: "Cyberbullying adalah tindakan perundungan melalui media digital yang dapat melukai perasaan orang lain dan wajib kita jauhi."
    },
    {
      id: "kod-19",
      nomor: 19,
      level: "sedang",
      pertanyaan: "Perhatikan algoritma membuat secangkir teh manis: 1. Masukkan teh celup. 2. Tuang air panas. 3. Masukkan gula. 4. Aduk hingga larut. Jika langkah 2 dan 4 dilewati, maka yang terjadi adalah...",
      pilihan: [
        "Teh menjadi sangat enak",
        "Teh tidak akan terseduh dan gula tidak larut karena tidak ada air panas dan tidak diaduk",
        "Cangkir akan pecah sendiri",
        "Teh berubah menjadi es sirup"
      ],
      kunciJawaban: 1,
      pembahasan: "Algoritma harus dijalankan secara berurutan dan lengkap; jika langkah krusial terlewat, hasil akhir tidak akan tercapai."
    },
    {
      id: "kod-20",
      nomor: 20,
      level: "sedang",
      pertanyaan: "Karakter atau objek bergambar dalam perangkat lunak pemrograman visual Scratch yang dapat diprogram untuk bergerak dan bersuara disebut...",
      pilihan: ["Sprite", "Stage", "Backdrop", "Folder"],
      kunciJawaban: 0,
      pembahasan: "Sprite adalah objek atau karakter (seperti kucing oranye Scratch) yang dikendalikan melalui blok-blok kode program."
    },
    {
      id: "kod-21",
      nomor: 21,
      level: "hots",
      pertanyaan: "Sebuah mobil pintar tanpa sopir (autonomous car) berbasis AI sedang melaju. Di depannya terdapat lampu lalu lintas berwarna merah. Logika algoritma pengambilan keputusan mobil tersebut adalah...",
      pilihan: [
        "JIKA lampu = Merah MAKA [Tekan pedal rem dan berhenti], JIKA TIDAK [Lanjutkan melaju]",
        "JIKA lampu = Merah MAKA [Tancap gas sekencang-kencangnya]",
        "JIKA lampu = Merah MAKA [Bunyikan klakson tanpa henti sambil melompat]",
        "Matikan mesin mobil seketika di tengah jalan"
      ],
      kunciJawaban: 0,
      pembahasan: "Logika kondisional If-Else menginstruksikan sensor mendeteksi warna lampu merah dan segera memerintahkan aktuator rem untuk berhenti aman."
    },
    {
      id: "kod-22",
      nomor: 22,
      level: "hots",
      pertanyaan: "Ketika kamu menggunakan kecerdasan buatan (AI) untuk membantu mengerjakan tugas sekolah, sikap yang paling jujur dan beretika adalah...",
      pilihan: [
        "Menyalin seluruh teks jawaban AI kata demi kata dan mengakuinya sebagai karya buatan sendiri",
        "Memanfaatkan AI sebagai sumber inspirasi belajar, memeriksa kembali kebenaran faktanya di buku, dan menulis ulang dengan pemahaman sendiri",
        "Menyuruh AI mengerjakan semua ujian tanpa belajar",
        "Membohongi guru dan orang tua"
      ],
      kunciJawaban: 1,
      pembahasan: "AI adalah alat bantu belajar. Pelajar yang berintegritas memverifikasi fakta dan menyusun hasil karya berdasarkan pemahamannya sendiri."
    },
    {
      id: "kod-23",
      nomor: 23,
      level: "hots",
      pertanyaan: "Mengapa informasi yang diberikan oleh aplikasi AI terkadang bisa keliru atau salah (halusinasi AI)?",
      pilihan: [
        "Karena AI sengaja ingin membohongi anak-anak",
        "Karena AI menyusun jawaban berdasarkan probabilitas kata dari data yang dilatihkan, sehingga bisa terdapat informasi yang tidak akurat jika datanya bias",
        "Karena listrik komputer terlalu panas",
        "Karena AI tidak memiliki layar"
      ],
      kunciJawaban: 1,
      pembahasan: "Model bahasa AI bekerja memprediksi susunan kata statistik dari data latih, sehingga tetap memerlukan verifikasi akal sehat manusia."
    },
    {
      id: "kod-24",
      nomor: 24,
      level: "hots",
      pertanyaan: "Perhatikan urutan blok kode: [Set Skor = 0] -> [Ulangi 5 kali: Ganti Skor dengan Skor + 10]. Berapakah nilai akhir dari variabel Skor setelah program selesai dijalankan?",
      pilihan: ["10", "30", "50", "60"],
      kunciJawaban: 2,
      pembahasan: "Skor awal = 0. Perulangan bertambah 10 sebanyak 5 kali: 5 × 10 = 50. Maka nilai akhir Skor adalah 50."
    },
    {
      id: "kod-25",
      nomor: 25,
      level: "hots",
      pertanyaan: "Dalam perancangan game labirin, robot kucing terhalang dinding batu di depannya. Algoritma navigasi yang benar untuk menghindar adalah...",
      pilihan: [
        "JIKA [Menyentuh Dinding] MAKA [Mundur 1 langkah dan Putar arah 90 derajat], JIKA TIDAK [Maju 1 langkah]",
        "JIKA [Menyentuh Dinding] MAKA [Terus maju menembus dinding]",
        "Hapus seluruh labirin",
        "Matikan layar komputer"
      ],
      kunciJawaban: 0,
      pembahasan: "Deteksi tabrakan (collision detection) memerintahkan sprite mundur dan berbelok untuk mencari lorong labirin yang terbuka."
    },
    {
      id: "kod-26",
      nomor: 26,
      level: "hots",
      pertanyaan: "Sistem filter spam pada email menggunakan algoritma pengenalan pola untuk memilah surat berbahaya dengan cara...",
      pilihan: [
        "Membuka semua lampiran secara otomatis",
        "Mengenali pola kata kunci mencurigakan, pengirim yang tidak dikenal, dan tautan berbahaya",
        "Menghapus seluruh surat masuk tanpa terkecuali",
        "Mengubah warna font menjadi hijau"
      ],
      kunciJawaban: 1,
      pembahasan: "Filter keamanan menganalisis pola pesan (tautan phishing, kata-kata penipuan) untuk melindungi kotak masuk pengguna."
    },
    {
      id: "kod-27",
      nomor: 27,
      level: "hots",
      pertanyaan: "Kelebihan utama robot otomatis berbasis AI dalam membantu dokter melakukan operasi bedah rumit adalah...",
      pilihan: [
        "Robot bisa bekerja tanpa tenaga listrik",
        "Tingkat presisi ketelitian tangan mekanik yang sangat tinggi dan tidak mengalami kelelahan gemetar",
        "Robot bisa menggantikan seluruh peran manusia seutuhnya",
        "Biaya operasi menjadi gratis"
      ],
      kunciJawaban: 1,
      pembahasan: "Lengan robotik bedah memiliki ketelitian mikroskopis tanpa tremor (gemetar), dipandu oleh dokter ahli bedah."
    },
    {
      id: "kod-28",
      nomor: 28,
      level: "hots",
      pertanyaan: "Mengapa kita tidak boleh sembarangan mengklik tautan (link) mencurigakan yang dikirim oleh nomor asing dengan iming-iming 'Selamat kamu menang hadiah ratusan juta!'?",
      pilihan: [
        "Tautan tersebut bisa berisi malware/phishing yang dapat mencuri data rahasia dan merusak perangkat",
        "Karena hadiahnya terlalu banyak",
        "Supaya orang lain yang mendapatkan hadiah",
        "Karena tautan tersebut membuat kuota menjadi gratis"
      ],
      kunciJawaban: 0,
      pembahasan: "Tautan jebakan (phishing) dirancang peretas untuk mencuri kata sandi dan menginfeksi gawai dengan perangkat lunak perusak (malware)."
    },
    {
      id: "kod-29",
      nomor: 29,
      level: "hots",
      pertanyaan: "Seorang anak ingin membuat aplikasi kalkulator ramah anak. Tahapan pengembangan perangkat lunak yang sistematis adalah...",
      pilihan: [
        "Langsung meluncurkan aplikasi tanpa dibuat kodenya",
        "1. Merencanakan kebutuhan fitur -> 2. Mendesain antarmuka -> 3. Menulis kode logika -> 4. Menguji coba (testing & debugging)",
        "Menulis kode secara acak -> Menghapus aplikasi",
        "Membeli gawai baru setiap hari"
      ],
      kunciJawaban: 1,
      pembahasan: "Siklus rekayasa perangkat lunak (SDLC) dimulai dari perencanaan, desain, pengodean, hingga pengujian dan perbaikan bug."
    },
    {
      id: "kod-30",
      nomor: 30,
      level: "hots",
      pertanyaan: "Tujuan utama anak-anak Indonesia belajar koding dan berpikir komputasional sejak usia sekolah dasar adalah...",
      pilihan: [
        "Supaya bisa bermain game komputer selama 24 jam nonstop",
        "Melatih kemampuan berpikir kritis, logis, kreatif memecahkan masalah nyata, dan menjadi pencipta teknologi masa depan",
        "Agar tidak perlu belajar membaca dan menulis lagi",
        "Menghabiskan baterai laptop"
      ],
      kunciJawaban: 1,
      pembahasan: "Computational thinking membentuk nalar analitis, kreativitas problem-solving, dan menyiapkan generasi muda menjadi inovator teknologi bangsa."
    }
  ]
};
