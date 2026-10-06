// src/data/evaluasi/pancasila.ts
import { PaketEvaluasi } from "./types";

export const PAKET_PANCASILA: PaketEvaluasi = {
  mapelId: "pancasila",
  namaMapel: "Pendidikan Pancasila",
  fase: "Fase B (Kelas 3-4)",
  totalSoal: 30,
  daftarSoal: [
    {
      id: "pan-1",
      nomor: 1,
      level: "mudah",
      pertanyaan: "Simbol Bintang Emas pada perisai Garuda Pancasila melambangkan sila ke...",
      pilihan: ["Pertama", "Kedua", "Ketiga", "Keempat"],
      kunciJawaban: 0,
      pembahasan: "Bintang emas bersudut lima adalah lambang sila pertama Pancasila, yaitu Ketuhanan Yang Maha Esa."
    },
    {
      id: "pan-2",
      nomor: 2,
      level: "mudah",
      pertanyaan: "Menghormati teman yang sedang menjalankan ibadah sesuai agamanya merupakan wujud pengamalan sila...",
      pilihan: ["Pertama", "Kedua", "Ketiga", "Kelima"],
      kunciJawaban: 0,
      pembahasan: "Sila pertama mengajarkan kita untuk saling menghormati dan hidup rukun antarumat beragama."
    },
    {
      id: "pan-3",
      nomor: 3,
      level: "mudah",
      pertanyaan: "Membantu korban bencana alam dan gempa bumi merupakan bentuk kepedulian yang sesuai dengan sila...",
      pilihan: ["Keadilan sosial", "Kemanusiaan yang adil dan beradab", "Persatuan Indonesia", "Ketuhanan"],
      kunciJawaban: 1,
      pembahasan: "Sila kedua, Kemanusiaan yang adil dan beradab, mengajarkan kasih sayang, empati, dan tolong-menolong sesama manusia."
    },
    {
      id: "pan-4",
      nomor: 4,
      level: "mudah",
      pertanyaan: "Lambang rantai emas yang saling mengait pada lambang Garuda Pancasila melambangkan...",
      pilihan: ["Persatuan antarpulau", "Hubungan erat antarmanusia yang bersatu", "Kekuatan militer", "Kemakmuran pangan"],
      kunciJawaban: 1,
      pembahasan: "Mata rantai bulat dan persegi yang saling terikat melambangkan hubungan sesama manusia yang saling membantu dan bersatu."
    },
    {
      id: "pan-5",
      nomor: 5,
      level: "mudah",
      pertanyaan: "Pohon Beringin adalah lambang Pancasila sila ketiga yang berbunyi...",
      pilihan: [
        "Ketuhanan Yang Maha Esa",
        "Kemanusiaan yang adil dan beradab",
        "Persatuan Indonesia",
        "Keadilan sosial bagi seluruh rakyat Indonesia"
      ],
      kunciJawaban: 2,
      pembahasan: "Pohon Beringin merupakan lambang sila ketiga yang berbunyi Persatuan Indonesia, melambangkan tempat berteduh bagi seluruh rakyat."
    },
    {
      id: "pan-6",
      nomor: 6,
      level: "mudah",
      pertanyaan: "Bangga memakai seragam batik dan mencintai produk buatan dalam negeri mencerminkan sila...",
      pilihan: ["Pertama", "Kedua", "Ketiga", "Keempat"],
      kunciJawaban: 2,
      pembahasan: "Rasa cinta tanah air dan bangga memakai produk Indonesia adalah bentuk pengamalan sila ketiga, Persatuan Indonesia."
    },
    {
      id: "pan-7",
      nomor: 7,
      level: "mudah",
      pertanyaan: "Musyawarah untuk mufakat dalam pemilihan ketua kelas adalah contoh pengamalan sila yang dilambangkan dengan...",
      pilihan: ["Bintang emas", "Pohon beringin", "Kepala banteng", "Padi dan kapas"],
      kunciJawaban: 2,
      pembahasan: "Kepala banteng adalah lambang sila keempat, yang mencerminkan musyawarah dan pengambilan keputusan secara bijaksana."
    },
    {
      id: "pan-8",
      nomor: 8,
      level: "mudah",
      pertanyaan: "Padi dan Kapas pada perisai Garuda Pancasila melambangkan kebutuhan dasar manusia yaitu...",
      pilihan: ["Tempat tinggal dan kendaraan", "Pangan dan sandang", "Emas dan perak", "Kesehatan dan rekreasi"],
      kunciJawaban: 1,
      pembahasan: "Padi melambangkan pangan (makanan pokok) dan kapas melambangkan sandang (pakaian), syarat utama mencapai kemakmuran rakyat."
    },
    {
      id: "pan-9",
      nomor: 9,
      level: "mudah",
      pertanyaan: "Semboyan bangsa Indonesia yang tertulis pada pita cengkeraman burung Garuda adalah...",
      pilihan: ["Tut Wuri Handayani", "Bhinneka Tunggal Ika", "Ing Ngarsa Sung Tuladha", "Garuda Pancasila"],
      kunciJawaban: 1,
      pembahasan: "Bhinneka Tunggal Ika bermakna berbeda-beda tetapi tetap satu jua, semboyan pemersatu keberagaman bangsa Indonesia."
    },
    {
      id: "pan-10",
      nomor: 10,
      level: "mudah",
      pertanyaan: "Sikap adil dan tidak membeda-bedakan teman saat bermain bersama merupakan cerminan dari sila...",
      pilihan: ["Kedua", "Ketiga", "Keempat", "Kelima"],
      kunciJawaban: 3,
      pembahasan: "Sila kelima, Keadilan sosial bagi seluruh rakyat Indonesia, mengajarkan perlakuan yang adil tanpa pilih kasih."
    },
    {
      id: "pan-11",
      nomor: 11,
      level: "sedang",
      pertanyaan: "Salah satu contoh kewajiban anak saat berada di lingkungan rumah adalah...",
      pilihan: [
        "Mendapatkan makanan bergizi dari orang tua",
        "Membantu orang tua merapikan kamar tidur sendiri",
        "Menonton televisi sepanjang hari",
        "Mendapatkan kasih sayang dari keluarga"
      ],
      kunciJawaban: 1,
      pembahasan: "Membantu orang tua dan merapikan kamar adalah kewajiban anak di rumah, sedangkan mendapat kasih sayang dan makanan adalah hak."
    },
    {
      id: "pan-12",
      nomor: 12,
      level: "sedang",
      pertanyaan: "Perbedaan utama antara hak dan kewajiban adalah...",
      pilihan: [
        "Hak harus dilakukan, kewajiban diterima",
        "Hak adalah sesuatu yang kita terima, kewajiban adalah tugas yang harus dilakukan",
        "Hak hanya milik orang dewasa, kewajiban milik anak",
        "Hak dan kewajiban tidak memiliki perbedaan"
      ],
      kunciJawaban: 1,
      pembahasan: "Hak adalah hal yang patut kita dapatkan atau nikmati, sedangkan kewajiban adalah tugas tanggung jawab yang wajib kita kerjakan."
    },
    {
      id: "pan-13",
      nomor: 13,
      level: "sedang",
      pertanyaan: "Sebelum menuntut hak untuk mendapatkan nilai rapor yang baik, kewajiban yang wajib dipenuhi siswa adalah...",
      pilihan: [
        "Meminta hadiah kepada guru",
        "Belajar dengan sungguh-sungguh dan mengerjakan tugas",
        "Bermain game bersama kawan",
        "Datang terlambat ke sekolah"
      ],
      kunciJawaban: 1,
      pembahasan: "Kewajiban harus dijalankan terlebih dahulu sebelum kita berhak menerima hasil belajar berupa nilai rapor yang baik."
    },
    {
      id: "pan-14",
      nomor: 14,
      level: "sedang",
      pertanyaan: "Aturan sekolah dibuat bertujuan untuk...",
      pilihan: [
        "Menghukum seluruh siswa",
        "Menciptakan suasana belajar yang tertib, aman, dan nyaman",
        "Membuat siswa merasa terbebani",
        "Mengurangi waktu istirahat siswa"
      ],
      kunciJawaban: 1,
      pembahasan: "Aturan dan tata tertib sekolah bertujuan menjaga kedisiplinan dan menciptakan lingkungan yang kondusif bagi semua warga sekolah."
    },
    {
      id: "pan-15",
      nomor: 15,
      level: "sedang",
      pertanyaan: "Ketika terjadi perbedaan pendapat saat musyawarah kelompok, tindakan yang paling bijak adalah...",
      pilihan: [
        "Memaksakan kehendak sendiri agar disetujui",
        "Keluar dari kelompok dan marah-marah",
        "Mendengarkan pendapat orang lain dan mencari mufakat bersama",
        "Mengabaikan semua usulan teman"
      ],
      kunciJawaban: 2,
      pembahasan: "Musyawarah menuntut sikap saling menghargai pendapat orang lain demi menghasilkan keputusan terbaik yang disepakati bersama."
    },
    {
      id: "pan-16",
      nomor: 16,
      level: "sedang",
      pertanyaan: "Kegiatan gotong royong membersihkan selokan desa mencerminkan manfaat penting yaitu...",
      pilihan: [
        "Pekerjaan menjadi lebih lambat selesai",
        "Pekerjaan berat menjadi ringan dan mempererat persaudaraan",
        "Menghabiskan biaya yang sangat besar",
        "Membuat warga saling berselisih"
      ],
      kunciJawaban: 1,
      pembahasan: "Gotong royong membuat pekerjaan terasa lebih ringan, cepat terselesaikan, dan memupuk rasa persaudaraan antarwarga."
    },
    {
      id: "pan-17",
      nomor: 17,
      level: "sedang",
      pertanyaan: "Norma sopan santun dalam kehidupan bermasyarakat dicontohkan dengan tindakan...",
      pilihan: [
        "Menyapa dan memberi salam saat bertemu tetangga",
        "Berteriak keras di depan rumah warga saat malam hari",
        "Membuang sampah permen ke halaman rumah tetangga",
        "Menyerobot antrean di toko kelontong"
      ],
      kunciJawaban: 0,
      pembahasan: "Memberi salam dan bertutur kata santun kepada tetangga adalah bentuk kepatuhan terhadap norma kesopanan di masyarakat."
    },
    {
      id: "pan-18",
      nomor: 18,
      level: "sedang",
      pertanyaan: "Sikap yang tepat saat melihat teman terpeleset di halaman sekolah adalah...",
      pilihan: [
        "Menertawakannya bersama teman lain",
        "Segera membantunya berdiri dan menolongnya ke ruang UKS",
        "Pura-pura tidak melihat dan meninggalkannya",
        "Memotretnya untuk bahan lelucon"
      ],
      kunciJawaban: 1,
      pembahasan: "Tolong-menolong tanpa pamrih merupakan wujud nyata kepedulian kemanusiaan yang beradab."
    },
    {
      id: "pan-19",
      nomor: 19,
      level: "sedang",
      pertanyaan: "Indonesia memiliki beragam suku bangsa. Sikap terbaik dalam menyikapi keragaman ini adalah...",
      pilihan: [
        "Menganggap suku sendiri paling hebat dibanding suku lain",
        "Menghargai tradisi tiap suku dan hidup berdampingan secara rukun",
        "Menjauhi teman yang berbeda bahasa daerah",
        "Melarang pertunjukan seni dari daerah lain"
      ],
      kunciJawaban: 1,
      pembahasan: "Keberagaman suku bangsa adalah kekayaan budaya bangsa yang harus kita hargai dengan sikap toleran dan rukun."
    },
    {
      id: "pan-20",
      nomor: 20,
      level: "sedang",
      pertanyaan: "Dasar negara Republik Indonesia yang sah dan tercantum dalam Pembukaan UUD 1945 adalah...",
      pilihan: ["Pancasila", "Piagam Jakarta", "Peraturan Pemerintah", "Kitab Hukum Acara"],
      kunciJawaban: 0,
      pembahasan: "Pancasila adalah dasar dan ideologi resmi negara Indonesia yang menjadi pedoman dalam penyelenggaraan tata kehidupan berbangsa."
    },
    {
      id: "pan-21",
      nomor: 21,
      level: "hots",
      pertanyaan: "Dalam sebuah pemilihan ketua kelas, usulan Doni tidak terpilih sebagai hasil keputusan akhir. Sikap Pancasilais yang harus ditunjukkan Doni adalah...",
      pilihan: [
        "Menolak melaksanakan hasil keputusan musyawarah",
        "Menerima keputusan dengan lapang dada dan mendukung ketua terpilih",
        "Mogok belajar dan menyalahkan teman sekelas",
        "Membuat kelompok tandingan di luar kelas"
      ],
      kunciJawaban: 1,
      pembahasan: "Sikap berjiwa besar menerima hasil musyawarah demi kepentingan bersama mencerminkan nilai luhur sila keempat Pancasila."
    },
    {
      id: "pan-22",
      nomor: 22,
      level: "hots",
      pertanyaan: "Di kelas terdapat siswa dari berbagai latar belakang budaya dan agama. Saat jam istirahat, Doni dan Made merapikan meja guru bersama-sama tanpa memandang perbedaan. Hal ini menunjukkan pengamalan sila...",
      pilihan: [
        "Sila pertama dan ketiga",
        "Sila kedua dan kelima",
        "Sila ketiga dan keempat",
        "Sila pertama dan keempat"
      ],
      kunciJawaban: 0,
      pembahasan: "Saling bekerja sama antarumat beragama memadukan sila pertama (kerukunan beragama) dan sila ketiga (persatuan Indonesia)."
    },
    {
      id: "pan-23",
      nomor: 23,
      level: "hots",
      pertanyaan: "Jika seorang siswa hanya menuntut haknya untuk bermain fasilitas sekolah tetapi merusak bangku dan tidak merawatnya, maka siswa tersebut...",
      pilihan: [
        "Sudah menjalankan kewajiban dengan baik",
        "Belum menjalankan tanggung jawab dan kewajiban merawat fasilitas",
        "Berhak mendapatkan penghargaan khusus",
        "Mencerminkan sikap mandiri"
      ],
      kunciJawaban: 1,
      pembahasan: "Hak menikmati fasilitas umum harus selalu diimbangi dengan kewajiban menjaga, memelihara, dan tidak merusaknya."
    },
    {
      id: "pan-24",
      nomor: 24,
      level: "hots",
      pertanyaan: "Mengapa pemungutan suara (voting) baru dilakukan apabila musyawarah mufakat belum mencapai kesepakatan?",
      pilihan: [
        "Karena voting lebih mahal biayanya",
        "Karena musyawarah mengutamakan kebersamaan dan kesepahaman seluruh anggota",
        "Karena voting dilarang di Indonesia",
        "Karena anggota musyawarah tidak boleh berbicara"
      ],
      kunciJawaban: 1,
      pembahasan: "Musyawarah mufakat mengedepankan komunikasi dan kesepakatan hati nurani bersama sebelum menempuh jalur pemungutan suara terbanyak."
    },
    {
      id: "pan-25",
      nomor: 25,
      level: "hots",
      pertanyaan: "Perilaku hidup hemat, tidak boros, serta rajin menabung merupakan pengamalan sila kelima karena...",
      pilihan: [
        "Mencegah kita membeli makanan",
        "Melatih keadilan ekonomi dan tidak bergaya hidup mewah yang merugikan sesama",
        "Mengikuti perintah pedagang di pasar",
        "Merupakan syarat mendapat kartu keluarga"
      ],
      kunciJawaban: 1,
      pembahasan: "Butir sila kelima mengajarkan untuk tidak bergaya hidup boros dan suka bekerja keras demi keadilan dan kesejahteraan bersama."
    },
    {
      id: "pan-26",
      nomor: 26,
      level: "hots",
      pertanyaan: "Hari lahir Pancasila diperingati setiap tanggal...",
      pilihan: ["1 Juni", "17 Agustus", "28 Oktober", "10 November"],
      kunciJawaban: 0,
      pembahasan: "Hari Lahir Pancasila diperingati setiap 1 Juni untuk mengenang pidato Ir. Soekarno pada sidang BPUPKI tahun 1945."
    },
    {
      id: "pan-27",
      nomor: 27,
      level: "hots",
      pertanyaan: "Sikap menjaga kebersihan toilet umum setelah selesai digunakan termasuk cerminan nilai Pancasila karena...",
      pilihan: [
        "Menghargai hak orang lain untuk memakai fasilitas yang bersih dan nyaman",
        "Takut ditegur oleh petugas kebersihan",
        "Merupakan kegiatan perlombaan sekolah",
        "Menghindari pembayaran biaya kebersihan"
      ],
      kunciJawaban: 0,
      pembahasan: "Menjaga kebersihan fasilitas umum adalah wujud menghargai hak kenyamanan orang lain, selaras dengan keadilan sosial dan tenggang rasa."
    },
    {
      id: "pan-28",
      nomor: 28,
      level: "hots",
      pertanyaan: "Tokoh yang menyampaikan usulan lima dasar negara pada tanggal 1 Juni 1945 dan menamakannya Pancasila adalah...",
      pilihan: ["Mohammad Hatta", "Ir. Soekarno", "Mr. Mohammad Yamin", "Prof. Dr. Soepomo"],
      kunciJawaban: 1,
      pembahasan: "Ir. Soekarno menyampaikan pidato rumusan dasar negara dan mengusulkan nama Pancasila pada 1 Juni 1945 di hadapan sidang BPUPKI."
    },
    {
      id: "pan-29",
      nomor: 29,
      level: "hots",
      pertanyaan: "Arti penting menjaga persatuan dan kesatuan di lingkungan sekolah adalah...",
      pilihan: [
        "Agar sekolah terkenal di media sosial",
        "Terciptanya suasana belajar yang damai, kompak, dan bebas dari perundungan",
        "Guru tidak perlu mengajar materi pelajaran",
        "Siswa bisa bermain tanpa perlu belajar"
      ],
      kunciJawaban: 1,
      pembahasan: "Persatuan dan kekompakan di sekolah menciptakan suasana yang harmonis, saling mendukung, dan mencegah tindakan perundungan (bullying)."
    },
    {
      id: "pan-30",
      nomor: 30,
      level: "hots",
      pertanyaan: "Penerapan Profil Pelajar Pancasila yang mandiri dan bernalar kritis dapat dibuktikan saat...",
      pilihan: [
        "Menyontek pekerjaan rumah milik teman",
        "Mencari informasi benar dari sumber tepercaya dan menyelesaikan tugas dengan jujur",
        "Menolak mendengarkan penjelasan dari guru",
        "Hanya menunggu disuapi jawaban oleh orang lain"
      ],
      kunciJawaban: 1,
      pembahasan: "Pelajar yang mandiri dan bernalar kritis mampu menganalisis informasi secara bijak dan bertanggung jawab menuntaskan tugas secara jujur."
    }
  ]
};
