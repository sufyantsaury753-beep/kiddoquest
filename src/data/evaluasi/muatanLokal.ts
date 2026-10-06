// src/data/evaluasi/muatanLokal.ts
import { PaketEvaluasi } from "./types";

export const PAKET_MUATAN_LOKAL: PaketEvaluasi = {
  mapelId: "muatanLokal",
  namaMapel: "Muatan Lokal (Kearifan Tradisi Nusantara)",
  fase: "Fase B (Kelas 3-4)",
  totalSoal: 30,
  daftarSoal: [
    {
      id: "mul-1",
      nomor: 1,
      level: "mudah",
      pertanyaan: "Rumah adat khas Minangkabau, Sumatra Barat yang memiliki bentuk atap melengkung runcing menyerupai tanduk kerbau (gonjong) adalah...",
      pilihan: ["Rumah Gadang", "Rumah Joglo", "Rumah Tongkonan", "Rumah Honai"],
      kunciJawaban: 0,
      pembahasan: "Rumah Gadang adalah rumah adat suku Minangkabau di Sumatra Barat dengan atap gonjong yang khas."
    },
    {
      id: "mul-2",
      nomor: 2,
      level: "mudah",
      pertanyaan: "Rumah adat berbentuk kerucut bulat dengan dinding kayu dan atap jerami tebal khas suku Dani di pegunungan Papua disebut...",
      pilihan: ["Rumah Lamin", "Rumah Honai", "Rumah Baileo", "Rumah Tambi"],
      kunciJawaban: 1,
      pembahasan: "Rumah Honai adalah hunian tradisional masyarakat suku Dani di Papua yang hangat dan tahan terhadap hawa dingin pegunungan."
    },
    {
      id: "mul-3",
      nomor: 3,
      level: "mudah",
      pertanyaan: "Kain tenun tradisional kebanggaan suku Batak di Sumatra Utara yang sering disampirkan dalam upacara adat dan pernikahan adalah...",
      pilihan: ["Kain Ulos", "Kain Songket", "Kain Batik", "Kain Sasirangan"],
      kunciJawaban: 0,
      pembahasan: "Kain Ulos adalah kain tenun khas Batak, Sumatra Utara yang sarat makna simbolis kasih sayang dan berkat leluhur."
    },
    {
      id: "mul-4",
      nomor: 4,
      level: "mudah",
      pertanyaan: "Pakaian adat wanita suku Bugis dan Makassar di Sulawesi Selatan yang berbentuk segi empat tanpa lengan dan berwarna cerah adalah...",
      pilihan: ["Kebaya Encim", "Baju Bodo", "Baju Cele", "Baju Kurung"],
      kunciJawaban: 1,
      pembahasan: "Baju Bodo adalah pakaian adat tradisional tertua di dunia yang dikenakan wanita Bugis-Makassar di Sulawesi Selatan."
    },
    {
      id: "mul-5",
      nomor: 5,
      level: "mudah",
      pertanyaan: "Senjata tradisional khas masyarakat Jawa yang memiliki bilah berlekuk-lekuk (luk) dan sarung berukir indah disebut...",
      pilihan: ["Mandau", "Keris", "Rencong", "Kujang"],
      kunciJawaban: 1,
      pembahasan: "Keris adalah senjata tikam tradisional Indonesia yang diakui UNESCO sebagai mahakarya warisan kemanusiaan."
    },
    {
      id: "mul-6",
      nomor: 6,
      level: "mudah",
      pertanyaan: "Senjata tradisional kebanggaan rakyat Aceh yang menjadi lambang keberanian melawan penjajah adalah...",
      pilihan: ["Rencong", "Kujang", "Badik", "Celurit"],
      kunciJawaban: 0,
      pembahasan: "Rencong adalah belati tradisional khas Tanah Rencong, Aceh, yang diselipkan di pinggang depan sebagai lambang ksatria."
    },
    {
      id: "mul-7",
      nomor: 7,
      level: "mudah",
      pertanyaan: "Upacara adat pembakaran jenazah sakral umat Hindu di Pulau Bali disebut upacara...",
      pilihan: ["Ngaben", "Rambu Solo", "Kasada", "Sekaten"],
      kunciJawaban: 0,
      pembahasan: "Ngaben adalah ritual pembakaran jenazah di Bali untuk menyucikan roh leluhur kembali ke Sang Pencipta."
    },
    {
      id: "mul-8",
      nomor: 8,
      level: "mudah",
      pertanyaan: "Permainan tradisional anak yang menggunakan papan kayu dengan 16 lubang dan biji kerang atau buah sawo adalah...",
      pilihan: ["Congklak (Dakon)", "Egrang", "Gasing", "Bentengan"],
      kunciJawaban: 0,
      pembahasan: "Congklak atau dakon adalah permainan tradisional asah strategi menghitung biji di lubang papan kayu."
    },
    {
      id: "mul-9",
      nomor: 9,
      level: "mudah",
      pertanyaan: "Permainan berjalan menggunakan dua batang bambu panjang yang diberi pijakan kaki kayu disebut...",
      pilihan: ["Egrang", "Engklek", "Bakiak", "Gasing"],
      kunciJawaban: 0,
      pembahasan: "Egrang melatih keseimbangan, kekuatan kaki, dan keberanian anak berjalan tinggi di atas batang bambu."
    },
    {
      id: "mul-10",
      nomor: 10,
      level: "mudah",
      pertanyaan: "Senjata tradisional berbentuk lengkung unik khas masyarakat Sunda di Jawa Barat adalah...",
      pilihan: ["Kujang", "Mandau", "Parang Salawaku", "Badik"],
      kunciJawaban: 0,
      pembahasan: "Kujang merupakan senjata pusaka dan simbol identitas kebudayaan masyarakat Sunda, Jawa Barat."
    },
    {
      id: "mul-11",
      nomor: 11,
      level: "sedang",
      pertanyaan: "Rumah adat suku Toraja di Sulawesi Selatan yang beratap melengkung seperti haluan perahu terbalik dan dihiasi tanduk kerbau di depannya adalah...",
      pilihan: ["Tongkonan", "Rumah Gadang", "Rumah Joglo", "Rumah Lamin"],
      kunciJawaban: 0,
      pembahasan: "Rumah Tongkonan adalah rumah adat megah suku Toraja yang melambangkan status sosial dan ikatan kekeluargaan."
    },
    {
      id: "mul-12",
      nomor: 12,
      level: "sedang",
      pertanyaan: "Upacara pemakaman adat besar dan megah suku Toraja yang diiringi tarian Ma'badong dan penyembelihan kerbau belang adalah...",
      pilihan: ["Rambu Solo", "Ngaben", "Tiwah", "Sekaten"],
      kunciJawaban: 0,
      pembahasan: "Rambu Solo adalah upacara pemakaman adat suku Toraja untuk mengantarkan arwah leluhur menuju alam keabadian (Puya)."
    },
    {
      id: "mul-13",
      nomor: 13,
      level: "sedang",
      pertanyaan: "Sistem irigasi pembagian air sawah tradisional yang berlandaskan filosofi Tri Hita Karana di Bali disebut...",
      pilihan: ["Subak", "Sasi", "Pranata Mangsa", "Gugur Gunung"],
      kunciJawaban: 0,
      pembahasan: "Subak adalah organisasi kemasyarakatan agraris tradisional di Bali yang mengatur tata kelola air persawahan secara adil dan demokratis."
    },
    {
      id: "mul-14",
      nomor: 14,
      level: "sedang",
      pertanyaan: "Kearifan lokal 'Sasi' di Maluku dan Papua mengajarkan masyarakat untuk...",
      pilihan: [
        "Menangkap semua ikan di laut setiap hari",
        "Menjaga kelestarian alam dengan larangan mengambil hasil laut atau hutan tertentu dalam kurun waktu tertentu agar ekosistem pulih",
        "Menebang hutan bakau untuk perumahan",
        "Membakar sampah di tepi pantai"
      ],
      kunciJawaban: 1,
      pembahasan: "Tradisi Sasi adalah kearifan adat timur Indonesia yang melarang penangkapan ikan/biota laut tertentu sampai tiba masa buka sasi, menjaga populasi tetap lestari."
    },
    {
      id: "mul-15",
      nomor: 15,
      level: "sedang",
      pertanyaan: "Senjata tradisional suku Dayak di Kalimantan yang dihiasi ukiran burung enggang dan rambut manusia pada hulunya adalah...",
      pilihan: ["Mandau", "Keris", "Kujang", "Rencong"],
      kunciJawaban: 0,
      pembahasan: "Mandau adalah senjata pusaka dan perlengkapan berburu tradisional suku Dayak di pedalaman Kalimantan."
    },
    {
      id: "mul-16",
      nomor: 16,
      level: "sedang",
      pertanyaan: "Upacara tradisional masyarakat suku Tengger di lereng Gunung Bromo yang mempersembahkan sesajen hasil bumi ke kawah gunung disebut...",
      pilihan: ["Yadnya Kasada", "Grebeg Maulud", "Dugderan", "Pasola"],
      kunciJawaban: 0,
      pembahasan: "Upacara Yadnya Kasada dilakukan setiap bulan Kasada oleh suku Tengger sebagai wujud syukur kepada Sang Hyang Widhi dan leluhur Roro Anteng-Joko Seger."
    },
    {
      id: "mul-17",
      nomor: 17,
      level: "sedang",
      pertanyaan: "Permainan beregu tradisional di lapangan dengan garis-garis petak di mana regu penjaga berusaha menghadang regu penyerang agar tidak lolos melintasi garis adalah...",
      pilihan: ["Gobak Sodor (Galasin)", "Congklak", "Gasing", "Kelereng"],
      kunciJawaban: 0,
      pembahasan: "Gobak Sodor atau Galasin melatih kelincahan, kerja sama tim, dan kewaspadaan menembus barisan penjaga garis."
    },
    {
      id: "mul-18",
      nomor: 18,
      level: "sedang",
      pertanyaan: "Kain tenun mewah dengan kilau benang emas dan perak yang terkenal berasal dari Palembang dan Minangkabau adalah...",
      pilihan: ["Songket", "Batik", "Lurik", "Tenun Ikat NTT"],
      kunciJawaban: 0,
      pembahasan: "Kain Songket ditenun menggunakan benang sutra berhiaskan benang emas atau perak yang memancarkan kemegahan khas rumpun Melayu."
    },
    {
      id: "mul-19",
      nomor: 19,
      level: "sedang",
      pertanyaan: "Tradisi pertarungan berkuda antar-prajurit yang saling melempar tombak kayu tumpul di Sumba, Nusa Tenggara Timur disebut...",
      pilihan: ["Pasola", "Karapan Sapi", "Bambu Gila", "Lompat Batu"],
      kunciJawaban: 0,
      pembahasan: "Pasola adalah ritual adu ketangkasan berkuda suku Sumba dalam menyambut musim panen dan musim tanam baru."
    },
    {
      id: "mul-20",
      nomor: 20,
      level: "sedang",
      pertanyaan: "Tradisi Fahombo atau lompat batu setinggi 2 meter sebagai simbol kedewasaan pemuda berasal dari suku di Pulau...",
      pilihan: ["Pulau Nias", "Pulau Madura", "Pulau Bali", "Pulau Bangka"],
      kunciJawaban: 0,
      pembahasan: "Fahombo adalah tradisi lompat batu spektakuler pemuda di Pulau Nias, Sumatra Utara, menandakan kesiapan fisik dan mental menjadi ksatria."
    },
    {
      id: "mul-21",
      nomor: 21,
      level: "hots",
      pertanyaan: "Rumah adat Lamin khas suku Dayak di Kalimantan Timur dibangun berbentuk rumah panggung sangat panjang hingga ratusan meter. Manfaat arsitektur rumah panggung tersebut adalah...",
      pilihan: [
        "Melindungi warga dari banjir luapan sungai, serangan binatang buas hutan, dan mempererat gotong royong puluhan kepala keluarga",
        "Agar mudah dipindahkan dengan ditarik kerbau",
        "Supaya terlihat lebih tinggi dari pohon kelapa",
        "Menghindari pembayaran pajak tanah"
      ],
      kunciJawaban: 0,
      pembahasan: "Rumah panggung Lamin dirancang cerdas untuk menghindari banjir pasang, binatang liar hutan hujan, serta menampung ratusan anggota keluarga besar secara komunal."
    },
    {
      id: "mul-22",
      nomor: 22,
      level: "hots",
      pertanyaan: "Mengapa sistem pertanian Subak di Bali diakui oleh UNESCO sebagai Warisan Budaya Dunia?",
      pilihan: [
        "Karena menggunakan traktor modern tercanggih",
        "Karena memadukan pembagian air yang adil, keharmonisan lingkungan alam, dan spiritualitas secara turun-temurun",
        "Karena sawah di Bali menghasilkan padi emas",
        "Karena dibangun oleh arsitek luar negeri"
      ],
      kunciJawaban: 1,
      pembahasan: "Subak diakui dunia karena mempraktikkan filosofi Tri Hita Karana: menjaga harmoni hubungan antara manusia dengan Tuhan, sesama manusia, dan alam sekitar."
    },
    {
      id: "mul-23",
      nomor: 23,
      level: "hots",
      pertanyaan: "Tradisi Sekaten di Keraton Yogyakarta dan Surakarta diadakan setiap tahun untuk memperingati...",
      pilihan: [
        "Hari Kemerdekaan RI",
        "Kelahiran (Maulid) Nabi Muhammad SAW dengan membunyikan gamelan Kanjeng Kyai Gunturmadu",
        "Awal musim hujan",
        "Tahun Baru Masehi"
      ],
      kunciJawaban: 1,
      pembahasan: "Sekaten berasal dari kata 'Syahadatain', perayaan menyambut Maulid Nabi Muhammad SAW yang dipelopori oleh para Wali Songo untuk syiar kebaikan."
    },
    {
      id: "mul-24",
      nomor: 24,
      level: "hots",
      pertanyaan: "Cerita rakyat dari Danau Toba, Malin Kundang, dan Roro Jonggrang memiliki kesamaan penting dalam pesan moral yaitu...",
      pilihan: [
        "Mengajarkan kita untuk menjadi sakti mandraguna",
        "Mengajarkan sikap berbakti kepada orang tua, menepati janji, dan menjauhi sifat sombong serta serakah",
        "Menyarankan anak untuk pergi merantau dan melupakan kampung halaman",
        "Mengajarkan cara mengutuk orang lain"
      ],
      kunciJawaban: 1,
      pembahasan: "Legenda Nusantara sarat pesan pendidikan budi pekerti luhur: larangan durhaka kepada ibu (Malin Kundang) dan pentingnya menepati janji."
    },
    {
      id: "mul-25",
      nomor: 25,
      level: "hots",
      pertanyaan: "Dalam tradisi Jawa dan Sunda, makanan tumpeng nasi kuning berbentuk kerucut disajikan saat syukuran. Bentuk kerucut tumpeng melambangkan...",
      pilihan: [
        "Gunung suci dan wujud rasa syukur serta doa permohonan manusia yang tertuju tinggi ke hadirat Tuhan Yang Maha Esa",
        "Tenda kemah pramuka",
        "Bentuk piramida di Mesir",
        "Topi ulang tahun"
      ],
      kunciJawaban: 0,
      pembahasan: "Tumpeng kerucut melambangkan puncak gunung dan keagungan Tuhan, sedangkan aneka lauk di sekelilingnya melambangkan keberagaman ciptaan alam semesta."
    },
    {
      id: "mul-26",
      nomor: 26,
      level: "hots",
      pertanyaan: "Nilai luhur yang dipelajari anak-anak dari permainan tradisional 'Bentengan' adalah...",
      pilihan: [
        "Kerja sama strategi tim, daya tahan lari, dan sportivitas menjaga benteng",
        "Cara merusak benteng musuh dengan kekerasan",
        "Bermain sendiri tanpa teman",
        "Menang dengan cara curang"
      ],
      kunciJawaban: 0,
      pembahasan: "Bentengan mengasah kecepatan fisik, taktik umpan regu, serta kegigihan mempertahankan markas benteng bersama kawan-kawan."
    },
    {
      id: "mul-27",
      nomor: 27,
      level: "hots",
      pertanyaan: "Tradisi 'Karapan Sapi' di Pulau Madura yang menampilkan sepasang sapi berlari kencang menarik luku kayu berawal dari kegiatan...",
      pilihan: [
        "Petani membajak sawah yang kemudian dijadikan ajang uji ketangkasan dan kekuatan ternak penghasil pangan",
        "Perburuan liar di hutan belantara",
        "Lomba pacuan kuda perang",
        "Upacara meminta hujan badai"
      ],
      kunciJawaban: 0,
      pembahasan: "Karapan Sapi dipelopori oleh Kyai Ahmad Baidawi (Pangeran Katandur) untuk menyemangati petani membajak tanah tegalan Madura secara subur."
    },
    {
      id: "mul-28",
      nomor: 28,
      level: "hots",
      pertanyaan: "Upacara 'Tabuik' di Pariaman, Sumatra Barat menampilkan replika buraq yang diarak ke tepi pantai lalu dilarung ke laut lepas. Upacara ini mencerminkan...",
      pilihan: [
        "Peringatan Hari Asyura yang berpadu harmonis dengan kesenian budaya lokal pesisir Minangkabau",
        "Lomba perahu layar nelayan",
        "Pesta kembang api tahun baru",
        "Upacara penobatan raja baru"
      ],
      kunciJawaban: 0,
      pembahasan: "Pesta Budaya Tabuik di Pantai Pariaman memperingati hari Asyura (10 Muharram) yang dirayakan dengan arak-arakan megah khas Minang pesisir."
    },
    {
      id: "mul-29",
      nomor: 29,
      level: "hots",
      pertanyaan: "Alasan generasi muda Indonesia perlu melestarikan permainan tradisional di tengah maraknya game gawai (gadget) adalah...",
      pilihan: [
        "Agar semua gawai dibuang",
        "Karena permainan tradisional melatih aktivitas fisik nyata, interaksi sosial tatap muka, dan melestarikan warisan budaya leluhur",
        "Supaya anak tidak perlu belajar membaca",
        "Karena permainan tradisional tidak memerlukan teman"
      ],
      kunciJawaban: 1,
      pembahasan: "Permainan tradisional memupuk motorik kasar, kesehatan jasmani, empati sosial antarteman, serta kebanggaan pada tradisi lokal bangsa."
    },
    {
      id: "mul-30",
      nomor: 30,
      level: "hots",
      pertanyaan: "Kearifan lokal suku Baduy di Banten yang menolak penggunaan bahan kimia sintetis dan menjaga kemurnian aliran sungai membuktikan bahwa...",
      pilihan: [
        "Masyarakat adat kuno tidak peduli pada kesehatan",
        "Masyarakat adat memiliki kesadaran ekologis tinggi untuk menjaga keseimbangan alam demi kelangsungan hidup generasi masa depan",
        "Sungai di Banten tidak boleh diminum",
        "Masyarakat adat dilarang menanam padi"
      ],
      kunciJawaban: 1,
      pembahasan: "Hukum adat Baduy mengajarkan 'Gunung teu meunang dilebur, lebak teu meunang dirusak' (alam tidak boleh dirusak), bukti nyata konservasi lingkungan leluhur."
    }
  ]
};
