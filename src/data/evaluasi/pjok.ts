// src/data/evaluasi/pjok.ts
import { PaketEvaluasi } from "./types";

export const PAKET_PJOK: PaketEvaluasi = {
  mapelId: "pjok",
  namaMapel: "PJOK (Pendidikan Jasmani, Olahraga, & Kesehatan)",
  fase: "Fase B (Kelas 3-4)",
  totalSoal: 30,
  daftarSoal: [
    {
      id: "pjo-1",
      nomor: 1,
      level: "mudah",
      pertanyaan: "Gerakan berpindah tempat dari satu titik ke titik lain seperti berjalan, berlari, dan melompat disebut gerak...",
      pilihan: ["Lokomotor", "Non-lokomotor", "Manipulatif", "Refleks"],
      kunciJawaban: 0,
      pembahasan: "Gerak lokomotor adalah gerak dasar yang ditandai dengan perpindahan seluruh tubuh dari satu tempat ke tempat lain."
    },
    {
      id: "pjo-2",
      nomor: 2,
      level: "mudah",
      pertanyaan: "Contoh gerak non-lokomotor (gerak di tempat tanpa berpindah posisi) adalah...",
      pilihan: ["Berlari cepat mengejar bola", "Melompat melewati rintangan", "Meliukkan badan dan mengayunkan lengan", "Berenang di kolam"],
      kunciJawaban: 2,
      pembahasan: "Meliuk, meregang, mengayun lengan, dan menekuk lutut di tempat merupakan contoh gerak non-lokomotor."
    },
    {
      id: "pjo-3",
      nomor: 3,
      level: "mudah",
      pertanyaan: "Gerak manipulatif adalah gerak yang melibatkan penggunaan benda atau alat. Contohnya adalah...",
      pilihan: ["Berjalan santai", "Menendang dan melempar bola", "Duduk tegak", "Tidur terlentang"],
      kunciJawaban: 1,
      pembahasan: "Menendang, melempar, menangkap, dan memukul benda dengan raket/tongkat merupakan contoh gerak manipulatif."
    },
    {
      id: "pjo-4",
      nomor: 4,
      level: "mudah",
      pertanyaan: "Tujuan utama melakukan pemanasan (stretching) sebelum berolahraga adalah...",
      pilihan: [
        "Membuat tubuh cepat lelah",
        "Menyiapkan otot dan mencegah risiko terjadinya cedera",
        "Menghabiskan waktu jam pelajaran",
        "Mendinginkan suhu tubuh"
      ],
      kunciJawaban: 1,
      pembahasan: "Pemanasan meningkatkan denyut nadi, melenturkan otot dan sendi, serta mencegah kram dan cedera saat berolahraga."
    },
    {
      id: "pjo-5",
      nomor: 5,
      level: "mudah",
      pertanyaan: "Dalam permainan sepak bola, pemain yang bertugas khusus menjaga gawang dan boleh memegang bola di kotak penalti adalah...",
      pilihan: ["Bek bertahan", "Kiper (penjaga gawang)", "Gelandang serang", "Penyerang (striker)"],
      kunciJawaban: 1,
      pembahasan: "Kiper adalah satu-satunya pemain yang diizinkan menyentuh bola menggunakan tangan di dalam area kotak penaltinya."
    },
    {
      id: "pjo-6",
      nomor: 6,
      level: "mudah",
      pertanyaan: "Jumlah pemain dalam satu regu sepak bola di lapangan adalah...",
      pilihan: ["5 orang", "6 orang", "11 orang", "15 orang"],
      kunciJawaban: 2,
      pembahasan: "Satu tim sepak bola terdiri dari 11 orang pemain di lapangan, sehingga sering disebut kesebelasan."
    },
    {
      id: "pjo-7",
      nomor: 7,
      level: "mudah",
      pertanyaan: "Teknik memantul-mantulkan bola ke lantai menggunakan satu tangan secara berulang dalam permainan bola basket disebut...",
      pilihan: ["Dribbling (menggiring)", "Passing (mengoper)", "Shooting (menembak)", "Rebound"],
      kunciJawaban: 0,
      pembahasan: "Dribbling dalam bola basket adalah memantulkan bola ke lantai dengan telapak tangan rileks sambil bergerak atau diam."
    },
    {
      id: "pjo-8",
      nomor: 8,
      level: "mudah",
      pertanyaan: "Latihan fisik 'push-up' bertujuan untuk melatih kekuatan otot...",
      pilihan: ["Lengan dan dada", "Betis dan paha", "Leher", "Jari kaki"],
      kunciJawaban: 0,
      pembahasan: "Push-up melatih kekuatan otot lengan (trisep), bahu, dan dada."
    },
    {
      id: "pjo-9",
      nomor: 9,
      level: "mudah",
      pertanyaan: "Latihan fisik 'sit-up' secara teratur bermanfaat untuk melatih kekuatan otot...",
      pilihan: ["Punggung atas", "Perut", "Tumit", "Pergelangan tangan"],
      kunciJawaban: 1,
      pembahasan: "Sit-up melatih otot dinding perut (abdominal) agar lebih kencang dan kuat."
    },
    {
      id: "pjo-10",
      nomor: 10,
      level: "mudah",
      pertanyaan: "Manfaat utama membiasakan mencuci tangan menggunakan sabun di bawah air mengalir adalah...",
      pilihan: [
        "Membuat tangan menjadi wangi saja",
        "Membunuh kuman, bakteri, dan virus penyebab penyakit",
        "Menghemat air bersih",
        "Menghilangkan sidik jari"
      ],
      kunciJawaban: 1,
      pembahasan: "Sabun dan air mengalir efektif melepaskan dan membunuh kuman mikroorganisme berbahaya dari permukaan kulit tangan."
    },
    {
      id: "pjo-11",
      nomor: 11,
      level: "sedang",
      pertanyaan: "Dalam permainan bola kasti, regu yang bertugas melempar bola dan menangkap bola pukulan disebut...",
      pilihan: ["Regu pemukul", "Regu penjaga", "Regu pelari", "Regu penonton"],
      kunciJawaban: 1,
      pembahasan: "Regu penjaga bertugas mematikan lawan dengan menangkap bola lambung dan melempar bola ke arah pelari kasti."
    },
    {
      id: "pjo-12",
      nomor: 12,
      level: "sedang",
      pertanyaan: "Gaya renang yang gerakannya menyerupai gerakan katak saat berenang di air disebut...",
      pilihan: ["Renang gaya dada", "Renang gaya bebas", "Renang gaya punggung", "Renang gaya kupu-kupu"],
      kunciJawaban: 0,
      pembahasan: "Renang gaya dada (breaststroke) sering disebut gaya katak karena ayunan kaki dan tangannya meniru gerakan katak."
    },
    {
      id: "pjo-13",
      nomor: 13,
      level: "sedang",
      pertanyaan: "Pukulan awal untuk memulai reli dalam permainan bulu tangkis disebut pukulan...",
      pilihan: ["Smash", "Dropshot", "Servis", "Lob"],
      kunciJawaban: 2,
      pembahasan: "Servis adalah pukulan pertama untuk menerbangkan shuttlecock ke bidang lapangan lawan sebagai tanda dimulainya reli."
    },
    {
      id: "pjo-14",
      nomor: 14,
      level: "sedang",
      pertanyaan: "Sikap lilin dalam senam lantai melatih unsur kebugaran jasmani yaitu...",
      pilihan: ["Kecepatan lari", "Keseimbangan dan kelenturan tubuh", "Daya ledak otot kaki", "Kekuatan memukul"],
      kunciJawaban: 1,
      pembahasan: "Sikap lilin bertumpu pada pundak dengan kedua kaki lurus ke atas tegak, menguji keseimbangan dan kekuatan otot inti."
    },
    {
      id: "pjo-15",
      nomor: 15,
      level: "sedang",
      pertanyaan: "Panduan gizi seimbang 'Isi Piringku' dari Kementerian Kesehatan menganjurkan porsi terbesar dalam satu piring makan terdiri atas...",
      pilihan: [
        "Permen manis dan minuman bersoda",
        "Makanan pokok (karbohidrat) dan sayur-sayuran",
        "Gorengan berlemak jenuh",
        "Kue kering cokelat"
      ],
      kunciJawaban: 1,
      pembahasan: "Isi Piringku membagi piring makan menjadi: 2/3 sayuran dan makanan pokok, serta 1/3 lauk-pauk sumber protein dan buah-buahan."
    },
    {
      id: "pjo-16",
      nomor: 16,
      level: "sedang",
      pertanyaan: "Waktu tidur malam yang ideal bagi anak usia sekolah dasar untuk menjaga pertumbuhan optimal dan konsentrasi belajar adalah...",
      pilihan: ["3-4 jam", "5-6 jam", "8-10 jam", "12-14 jam"],
      kunciJawaban: 2,
      pembahasan: "Anak usia 6-12 tahun membutuhkan tidur berkualitas selama 8-10 jam setiap malam untuk pelepasan hormon pertumbuhan."
    },
    {
      id: "pjo-17",
      nomor: 17,
      level: "sedang",
      pertanyaan: "Jika teman mengalami mimisan (hidung berdarah) saat upacara bendera, pertolongan pertama yang tepat adalah...",
      pilihan: [
        "Mendongakkan kepala tinggi-tinggi ke belakang",
        "Mendudukkan korban dengan kepala sedikit menunduk ke depan dan memencet cuping hidung selama beberapa menit",
        "Menyiram kepala dengan air panas",
        "Menyuruh korban langsung berlari"
      ],
      kunciJawaban: 1,
      pembahasan: "Menundukkan kepala mencegah darah tertelan ke tenggorokan/paru-paru, dan menekan lembut cuping hidung membantu membekukan pendarahan."
    },
    {
      id: "pjo-18",
      nomor: 18,
      level: "sedang",
      pertanyaan: "Dalam permainan bola voli, gerakan menerima bola dengan kedua lengan dirapatkan lurus ke depan bawah disebut...",
      pilihan: ["Passing bawah", "Passing atas", "Servis atas", "Spike/smash"],
      kunciJawaban: 0,
      pembahasan: "Passing bawah dilakukan dengan mengaitkan kedua ibu jari tangan, merapatkan lengan lurus, dan menyambut bola yang datang rendah."
    },
    {
      id: "pjo-19",
      nomor: 19,
      level: "sedang",
      pertanyaan: "Gerakan guling depan (forward roll) pada senam lantai harus mendarat pada bagian...",
      pilihan: ["Ujung dahi", "Tengkuk leher belakang", "Dagu", "Punggung tangan"],
      kunciJawaban: 1,
      pembahasan: "Saat mengguling ke depan, kepala ditundukkan hingga dagu menempel dada, dan bagian pertama yang menyentuh matras adalah tengkuk."
    },
    {
      id: "pjo-20",
      nomor: 20,
      level: "sedang",
      pertanyaan: "Bahan makanan berikut yang merupakan sumber protein hewani terbaik untuk pertumbuhan anak adalah...",
      pilihan: ["Nasi putih dan jagung", "Ikan, telur, dan daging ayam", "Singkong dan ubi jalar", "Minyak kelapa sawit"],
      kunciJawaban: 1,
      pembahasan: "Ikan, telur, daging sapi, dan ayam kaya akan protein hewani serta zat besi yang mendukung pertumbuhan sel dan jaringan tubuh."
    },
    {
      id: "pjo-21",
      nomor: 21,
      level: "hots",
      pertanyaan: "Mengapa pendinginan (cooling down) setelah melakukan olahraga berat sangat penting dilakukan?",
      pilihan: [
        "Agar detak jantung dan pernapasan kembali stabil secara bertahap serta mengurangi penumpukan asam laktat",
        "Agar otot tubuh menjadi kaku",
        "Membuat rasa haus hilang seketika",
        "Hanya sebagai formalitas tanpa manfaat"
      ],
      kunciJawaban: 0,
      pembahasan: "Pendinginan menurunkan frekuensi detak jantung perlahan, mencegah pusing akibat aliran darah mendadak turun, dan mengendurkan asam laktat otot."
    },
    {
      id: "pjo-22",
      nomor: 22,
      level: "hots",
      pertanyaan: "Doni gemar mengonsumsi makanan cepat saji (junk food) yang tinggi gula dan garam serta malas berolahraga. Risiko kesehatan yang paling mungkin dihadapi Doni di masa depan adalah...",
      pilihan: [
        "Kekurangan berat badan kronis",
        "Obesitas (kegemukan berlebih) dan risiko penyakit diabetes sejak dini",
        "Kekuatan tulang bertambah kuat",
        "Denyut nadi melambat drastis"
      ],
      kunciJawaban: 1,
      pembahasan: "Pola makan tinggi gula/lemak tanpa diimbangi aktivitas fisik membakar kalori dapat memicu penimbunan lemak (obesitas) dan gangguan metabolisme."
    },
    {
      id: "pjo-23",
      nomor: 23,
      level: "hots",
      pertanyaan: "Saat berolahraga lari lintas alam di hari yang terik, Andi merasa lemas, pusing, dan bibirnya kering. Gejala tersebut menandakan bahwa Andi mengalami...",
      pilihan: ["Kelebihan cairan", "Dehidrasi (kekurangan cairan tubuh)", "Hipotermia", "Alergi debu"],
      kunciJawaban: 1,
      pembahasan: "Keringat berlebih saat berolahraga panas tanpa minum cukup air menyebabkan dehidrasi, ditandai pusing, lemas, dan mulut kering."
    },
    {
      id: "pjo-24",
      nomor: 24,
      level: "hots",
      pertanyaan: "Perbedaan antara aktivitas lari cepat (sprint) dan lari jarak jauh (maraton) dalam penggunaan energi tubuh adalah...",
      pilihan: [
        "Sprint mengutamakan kecepatan maksimal dalam waktu singkat, sedangkan maraton mengutamakan daya tahan kardiovaskular stabil",
        "Sprint tidak membutuhkan oksigen sama sekali",
        "Maraton harus lari sekencang mungkin di detik pertama",
        "Keduanya tidak memiliki perbedaan teknik"
      ],
      kunciJawaban: 0,
      pembahasan: "Sprint menguji kecepatan dan daya ledak anaerobik jarak pendek, sedangkan maraton menguji efisiensi daya tahan aerobik jantung-paru jarak jauh."
    },
    {
      id: "pjo-25",
      nomor: 25,
      level: "hots",
      pertanyaan: "Tindakan pertama (metode RICE) saat kaki teman mengalami keseleo (terkilir) pada pergelangan kaki adalah...",
      pilihan: [
        "Mengurut dan memijatnya sekuat tenaga",
        "Mengistirahatkan kaki dan mengompres bagian yang bengkak dengan es batu (Rest & Ice)",
        "Mengajaknya langsung berlari keliling lapangan",
        "Menempelkan handuk panas mendidih"
      ],
      kunciJawaban: 1,
      pembahasan: "Protokol penanganan terkilir akut adalah RICE (Rest, Ice, Compression, Elevation). Memijat saat baru bengkak justru memperparah robekan ligamen."
    },
    {
      id: "pjo-26",
      nomor: 26,
      level: "hots",
      pertanyaan: "Dalam permainan beregu seperti sepak bola atau basket, sikap sportif (fair play) ditunjukkan saat...",
      pilihan: [
        "Menyalahkan wasit jika tim kita kalah",
        "Menghargai keputusan wasit, bermain jujur tanpa mencederai lawan, dan memberi selamat kepada tim pemenang",
        "Mengejek pemain lawan yang gagal memasukkan bola",
        "Membuat keributan antarsuporter"
      ],
      kunciJawaban: 1,
      pembahasan: "Sportivitas mengajarkan kejujuran, disiplin, menghormati lawan dan wasit, serta berjiwa besar dalam menerima hasil pertandingan."
    },
    {
      id: "pjo-27",
      nomor: 27,
      level: "hots",
      pertanyaan: "Menjaga kebersihan pakaian dalam dan menggantinya minimal dua kali sehari sangat penting karena...",
      pilihan: [
        "Mencegah pertumbuhan jamur, bakteri, dan bau tidak sedap pada area organ intim",
        "Membuat pakaian cepat usang",
        "Agar terlihat keren oleh teman",
        "Merupakan syarat masuk sekolah"
      ],
      kunciJawaban: 0,
      pembahasan: "Area intim yang lembap mudah menjadi sarang berkembang biaknya jamur dan kuman bila pakaian dalam tidak diganti secara higienis."
    },
    {
      id: "pjo-28",
      nomor: 28,
      level: "hots",
      pertanyaan: "Alat pengaman wajib yang harus digunakan saat bersepeda di jalan raya untuk melindungi bagian tubuh paling vital dari benturan adalah...",
      pilihan: ["Topi rajut", "Helm pengaman kepala standar", "Kacamata hitam", "Sepatu roda"],
      kunciJawaban: 1,
      pembahasan: "Helm sepeda melindungi tempurung kepala dan otak dari bahaya benturan keras jika sewaktu-waktu terjadi kecelakaan jatuh."
    },
    {
      id: "pjo-29",
      nomor: 29,
      level: "hots",
      pertanyaan: "Latihan lari bolak-balik memindahkan balok (shuttle run) bertujuan utama untuk melatih komponen kebugaran...",
      pilihan: ["Kelenturan tubuh", "Kelincahan (agility) dan koordinasi arah", "Daya tahan paru-paru statis", "Kekuatan tarikan lengan"],
      kunciJawaban: 1,
      pembahasan: "Shuttle run melatih kelincahan, yaitu kemampuan mengubah arah gerak tubuh secara cepat dan tepat tanpa kehilangan keseimbangan."
    },
    {
      id: "pjo-30",
      nomor: 30,
      level: "hots",
      pertanyaan: "Mengapa kita tidak boleh berenang di kolam yang dalam tanpa pengawasan orang dewasa atau pelatih?",
      pilihan: [
        "Air dalam terasa lebih dingin",
        "Menghindari risiko tenggelam dan situasi panik saat stamina habis atau terjadi kram otot di air",
        "Kolam dalam hanya untuk ikan besar",
        "Biaya tiketnya berbeda"
      ],
      kunciJawaban: 1,
      pembahasan: "Keselamatan di air adalah prioritas utama; anak membutuhkan pendampingan ahli untuk mengantisipasi kram mendadak dan bahaya tenggelam."
    }
  ]
};
