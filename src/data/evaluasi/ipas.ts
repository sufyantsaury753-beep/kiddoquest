// src/data/evaluasi/ipas.ts
import { PaketEvaluasi } from "./types";

export const PAKET_IPAS: PaketEvaluasi = {
  mapelId: "ipas",
  namaMapel: "IPAS (Ilmu Pengetahuan Alam & Sosial)",
  fase: "Fase B (Kelas 3-4)",
  totalSoal: 30,
  daftarSoal: [
    {
      id: "ipa-1",
      nomor: 1,
      level: "mudah",
      pertanyaan: "Bagian tumbuhan yang berfungsi menyerap air dan mineral dari dalam tanah serta memperkokoh tanaman adalah...",
      pilihan: ["Akar", "Batang", "Daun", "Bunga"],
      kunciJawaban: 0,
      pembahasan: "Akar berfungsi menyerap air dan zat hara dari dalam tanah serta menjaga agar tumbuhan tetap berdiri kokoh."
    },
    {
      id: "ipa-2",
      nomor: 2,
      level: "mudah",
      pertanyaan: "Zat hijau daun pada tumbuhan yang berfungsi menangkap cahaya matahari untuk fotosintesis disebut...",
      pilihan: ["Oksigen", "Klorofil", "Karbohidrat", "Stomata"],
      kunciJawaban: 1,
      pembahasan: "Klorofil adalah zat hijau daun yang menyerap energi sinar matahari untuk proses fotosintesis."
    },
    {
      id: "ipa-3",
      nomor: 3,
      level: "mudah",
      pertanyaan: "Gas yang dihasilkan oleh tumbuhan saat proses fotosintesis dan sangat dibutuhkan manusia untuk bernapas adalah...",
      pilihan: ["Karbon dioksida", "Nitrogen", "Oksigen", "Helium"],
      kunciJawaban: 2,
      pembahasan: "Fotosintesis menghasilkan glukosa (makanan tumbuhan) dan melepaskan gas oksigen (O2) ke udara."
    },
    {
      id: "ipa-4",
      nomor: 4,
      level: "mudah",
      pertanyaan: "Perubahan wujud zat dari cair menjadi padat, seperti air yang dimasukkan ke dalam freezer kulkas, disebut...",
      pilihan: ["Mencair", "Membeku", "Menguap", "Menyublim"],
      kunciJawaban: 1,
      pembahasan: "Membeku adalah proses perubahan wujud benda dari cair menjadi padat akibat penurunan suhu (pelepasan kalor)."
    },
    {
      id: "ipa-5",
      nomor: 5,
      level: "mudah",
      pertanyaan: "Proses perubahan wujud dari cair menjadi gas saat air dipanaskan hingga mendidih disebut...",
      pilihan: ["Menguap", "Mengembun", "Membeku", "Mengkristal"],
      kunciJawaban: 0,
      pembahasan: "Menguap adalah proses perubahan wujud benda dari cair menjadi gas akibat penyerapan panas."
    },
    {
      id: "ipa-6",
      nomor: 6,
      level: "mudah",
      pertanyaan: "Titik-titik air embun yang menempel di daun pada pagi hari terjadi karena proses...",
      pilihan: ["Evaporasi", "Kondensasi (mengembun)", "Pembekuan", "Penyubliman"],
      kunciJawaban: 1,
      pembahasan: "Kondensasi adalah perubahan wujud dari uap gas menjadi butiran air cair saat suhu udara mendingin."
    },
    {
      id: "ipa-7",
      nomor: 7,
      level: "mudah",
      pertanyaan: "Jika dua kutub magnet yang senama (misalnya Kutub Utara dan Kutub Utara) didekatkan, maka yang terjadi adalah...",
      pilihan: ["Tarik-menarik", "Tolak-menolak", "Magnet meleleh", "Tidak ada reaksi sama sekali"],
      kunciJawaban: 1,
      pembahasan: "Dua kutub magnet yang senama akan saling tolak-menolak, sedangkan kutub yang berlawanan jenis akan tarik-menarik."
    },
    {
      id: "ipa-8",
      nomor: 8,
      level: "mudah",
      pertanyaan: "Hewan yang memakan tumbuhan secara langsung dalam suatu rantai makanan berkedudukan sebagai...",
      pilihan: ["Produsen", "Konsumen primer (konsumen 1)", "Konsumen sekunder (konsumen 2)", "Dekomposer (pengurai)"],
      kunciJawaban: 1,
      pembahasan: "Hewan herbivora pemakan tumbuhan (seperti belalang atau kelinci) berperan sebagai konsumen tingkat pertama."
    },
    {
      id: "ipa-9",
      nomor: 9,
      level: "mudah",
      pertanyaan: "Organisme yang mampu menghasilkan makanannya sendiri melalui fotosintesis disebut...",
      pilihan: ["Konsumen", "Produsen", "Pengurai", "Predator"],
      kunciJawaban: 1,
      pembahasan: "Tumbuhan hijau disebut produsen karena dapat membuat zat makanannya sendiri menggunakan bantuan cahaya matahari."
    },
    {
      id: "ipa-10",
      nomor: 10,
      level: "mudah",
      pertanyaan: "Gambar tiruan permukaan bumi pada bidang datar dengan skala tertentu disebut...",
      pilihan: ["Globe", "Peta", "Lukisan", "Atlas"],
      kunciJawaban: 1,
      pembahasan: "Peta adalah gambaran konvensional permukaan bumi pada bidang datar yang diperkecil dengan skala tertentu."
    },
    {
      id: "ipa-11",
      nomor: 11,
      level: "sedang",
      pertanyaan: "Urutan tahapan metamorfosis sempurna pada kupu-kupu yang benar adalah...",
      pilihan: [
        "Telur -> Ulat (larva) -> Kepompong (pupa) -> Kupu-kupu dewasa",
        "Telur -> Kupu-kupu muda -> Ulat -> Kupu-kupu dewasa",
        "Ulat -> Telur -> Kepompong -> Kupu-kupu dewasa",
        "Kepompong -> Ulat -> Telur -> Kupu-kupu dewasa"
      ],
      kunciJawaban: 0,
      pembahasan: "Metamorfosis sempurna kupu-kupu mengalami 4 tahapan: telur menetas menjadi ulat (larva), menjadi kepompong (pupa), lalu kupu-kupu dewasa (imago)."
    },
    {
      id: "ipa-12",
      nomor: 12,
      level: "sedang",
      pertanyaan: "Hewan berikut yang mengalami metamorfosis tidak sempurna (tidak melewati tahap kepompong) adalah...",
      pilihan: ["Nyamuk", "Lalat", "Belalang", "Kupu-kupu"],
      kunciJawaban: 2,
      pembahasan: "Belalang dan kecoa mengalami metamorfosis tidak sempurna dengan tahapan: telur -> nimfa (hewan muda) -> imago (hewan dewasa)."
    },
    {
      id: "ipa-13",
      nomor: 13,
      level: "sedang",
      pertanyaan: "Perhatikan rantai makanan: Padi -> Belalang -> Katak -> Ular -> Burung Elang. Jika populasi katak mendadak punah karena diburu, maka akibat yang langsung terjadi adalah...",
      pilihan: [
        "Populasi belalang meningkat pesat dan populasi ular menurun",
        "Populasi padi menjadi sangat melimpah",
        "Populasi elang bertambah banyak",
        "Populasi ular bertambah banyak"
      ],
      kunciJawaban: 0,
      pembahasan: "Katak adalah pemangsa belalang dan mangsa ular. Jika katak habis, belalang bertambah banyak dan ular kekurangan makanan sehingga berkurang."
    },
    {
      id: "ipa-14",
      nomor: 14,
      level: "sedang",
      pertanyaan: "Contoh perubahan energi listrik menjadi energi gerak terdapat pada alat rumah tangga...",
      pilihan: ["Setrika listrik", "Kipas angin dan blender", "Lampu bohlam", "Oven listrik"],
      kunciJawaban: 1,
      pembahasan: "Kipas angin dan blender menggunakan motor listrik untuk mengubah energi listrik menjadi energi kinetik (gerak)."
    },
    {
      id: "ipa-15",
      nomor: 15,
      level: "sedang",
      pertanyaan: "Benda-benda berikut yang termasuk isolator listrik (tidak dapat menghantarkan arus listrik) adalah...",
      pilihan: ["Kawat tembaga dan paku besi", "Karet, plastik, dan kayu kering", "Sendok perak dan koin aluminium", "Air garam dan seng"],
      kunciJawaban: 1,
      pembahasan: "Karet, plastik, kaca, dan kayu kering adalah bahan isolator yang aman untuk membungkus kabel penghantar listrik."
    },
    {
      id: "ipa-16",
      nomor: 16,
      level: "sedang",
      pertanyaan: "Contoh kenampakan buatan yang dibangun manusia untuk menampung air dan pembangkit listrik adalah...",
      pilihan: ["Danau alami", "Gunung berapi", "Waduk (bendungan)", "Sungai"],
      kunciJawaban: 2,
      pembahasan: "Waduk atau bendungan adalah perairan buatan manusia yang difungsikan untuk irigasi, pengendali banjir, dan PLTA."
    },
    {
      id: "ipa-17",
      nomor: 17,
      level: "sedang",
      pertanyaan: "Kegiatan menyalurkan barang hasil produksi dari produsen ke tangan konsumen disebut kegiatan...",
      pilihan: ["Produksi", "Distribusi", "Konsumsi", "Investasi"],
      kunciJawaban: 1,
      pembahasan: "Distribusi adalah kegiatan mengangkut dan menyalurkan barang dan jasa dari produsen ke pemakai (konsumen)."
    },
    {
      id: "ipa-18",
      nomor: 18,
      level: "sedang",
      pertanyaan: "Seseorang yang memakai atau menghabiskan nilai guna suatu barang dan jasa untuk memenuhi kebutuhan hidup disebut...",
      pilihan: ["Distributor", "Produsen", "Konsumen", "Kolektor"],
      kunciJawaban: 2,
      pembahasan: "Konsumen adalah pelaku ekonomi yang menggunakan atau mengonsumsi barang dan jasa."
    },
    {
      id: "ipa-19",
      nomor: 19,
      level: "sedang",
      pertanyaan: "Kerajaan maritim bercorak Buddha terbesar di Nusantara yang berpusat di wilayah Palembang, Sumatra Selatan adalah...",
      pilihan: ["Kerajaan Tarumanegara", "Kerajaan Majapahit", "Kerajaan Sriwijaya", "Kerajaan Mataram Kuno"],
      kunciJawaban: 2,
      pembahasan: "Kerajaan Sriwijaya terkenal sebagai pusat perdagangan maritim dan pembelajaran agama Buddha terbesar di Asia Tenggara."
    },
    {
      id: "ipa-20",
      nomor: 20,
      level: "sedang",
      pertanyaan: "Patih Kerajaan Majapahit yang terkenal dengan Sumpah Palapa untuk menyatukan wilayah Nusantara adalah...",
      pilihan: ["Hayam Wuruk", "Gajah Mada", "Raden Wijaya", "Ken Arok"],
      kunciJawaban: 1,
      pembahasan: "Mahapatih Gajah Mada mengucapkan Sumpah Palapa yang bertekad tidak akan menikmati kenikmatan dunia sebelum mempersatukan Nusantara."
    },
    {
      id: "ipa-21",
      nomor: 21,
      level: "hots",
      pertanyaan: "Mengapa pada siang hari yang terik, duduk di bawah pohon yang rindang terasa lebih sejuk dan menyegarkan dibandingkan di bawah payung kain?",
      pilihan: [
        "Pohon memancarkan hawa dingin dari akar",
        "Pohon melakukan fotosintesis menghasilkan oksigen segar dan mengalami transpirasi uap air",
        "Payung kain memancarkan panas listrik",
        "Pohon menyerap seluruh angin di sekitarnya"
      ],
      kunciJawaban: 1,
      pembahasan: "Tumbuhan menghasilkan oksigen dan menguapkan air lewat daun (transpirasi) sehingga udara di bawah naungan pohon terasa sejuk alami."
    },
    {
      id: "ipa-22",
      nomor: 22,
      level: "hots",
      pertanyaan: "Pada rangkaian listrik seri, jika salah satu lampu dilepas atau kawatnya putus, maka yang terjadi pada lampu lainnya adalah...",
      pilihan: [
        "Menyala semakin terang",
        "Tetap menyala seperti biasa",
        "Otomatis ikut padam karena aliran arus terputus",
        "Meledak"
      ],
      kunciJawaban: 2,
      pembahasan: "Rangkaian seri hanya memiliki 1 jalur edar arus. Jika satu komponen terputus, sirkuit terbuka dan seluruh lampu ikut padam."
    },
    {
      id: "ipa-23",
      nomor: 23,
      level: "hots",
      pertanyaan: "Dalam siklus air, penebangan hutan secara liar di daerah perbukitan dapat mengakibatkan...",
      pilihan: [
        "Meningkatnya cadangan air tanah",
        "Tanah longsor saat hujan lebat dan kekeringan air saat musim kemarau",
        "Hujan es turun terus-menerus",
        "Udara pegunungan menjadi sangat dingin"
      ],
      kunciJawaban: 1,
      pembahasan: "Tanpa akar pohon yang mengikat tanah dan menyerap air hujan, air langsung meluncur memicu erosi, longsor, dan hilangnya sumber mata air."
    },
    {
      id: "ipa-24",
      nomor: 24,
      level: "hots",
      pertanyaan: "Sebuah kapal kargo yang sangat besar dan berat terbuat dari besi dapat mengapung di lautan, sedangkan sebutir kelereng besi kecil tenggelam. Fenomena ini disebabkan oleh...",
      pilihan: [
        "Bentuk lambung kapal berongga udara besar sehingga gaya apung air lebih besar dari berat total kapal",
        "Air laut mengandung garam berkadar nol",
        "Kapal memiliki baling-baling berkecepatan tinggi",
        "Kelereng besi memiliki massa jenis lebih kecil dari air"
      ],
      kunciJawaban: 0,
      pembahasan: "Prinsip Archimedes menyatakan lambung kapal yang berongga memindahkan volume air sangat besar, menciptakan gaya apung yang menopang kapal."
    },
    {
      id: "ipa-25",
      nomor: 25,
      level: "hots",
      pertanyaan: "Jika di peta terdapat skala 1 : 100.000, artinya setiap 1 cm jarak pada peta mewakili jarak sebenarnya di muka bumi sejauh...",
      pilihan: ["100 meter", "1 kilometer", "10 kilometer", "100 kilometer"],
      kunciJawaban: 1,
      pembahasan: "100.000 cm = 1.000 meter = 1 kilometer jarak sebenarnya."
    },
    {
      id: "ipa-26",
      nomor: 26,
      level: "hots",
      pertanyaan: "Mengapa pembuangan limbah plastik sembarangan ke sungai dan laut sangat membahayakan ekosistem rantai makanan perairan?",
      pilihan: [
        "Plastik membuat air laut terasa manis",
        "Plastik terurai menjadi mikroplastik yang tertelan plankton dan ikan, lalu terakumulasi racun hingga ke manusia",
        "Plastik membuat tanaman laut tumbuh sangat cepat",
        "Plastik menambah oksigen di dasar laut"
      ],
      kunciJawaban: 1,
      pembahasan: "Mikroplastik tidak bisa dicerna, meracuni hewan laut dari plankton hingga ikan besar, dan akhirnya mencemari makanan manusia."
    },
    {
      id: "ipa-27",
      nomor: 27,
      level: "hots",
      pertanyaan: "Candi Borobudur di Jawa Tengah adalah peninggalan bersejarah dari wangsa Syailendra yang bercorak agama...",
      pilihan: ["Hindu Syiwa", "Buddha Mahayana", "Islam", "Khonghucu"],
      kunciJawaban: 1,
      pembahasan: "Candi Borobudur dibangun pada abad ke-8 oleh Dinasti Syailendra sebagai monumen suci dan candi Buddha terbesar di dunia."
    },
    {
      id: "ipa-28",
      nomor: 28,
      level: "hots",
      pertanyaan: "Mengapa bunyi petir terdengar beberapa detik setelah kilatan cahaya petir terlihat di langit?",
      pilihan: [
        "Karena petir terjadi dua kali",
        "Kecepatan rambat cahaya di udara jauh lebih cepat dibandingkan kecepatan rambat bunyi",
        "Mata manusia lebih dekat dengan awan daripada telinga",
        "Bunyi petir memantul terlebih dahulu di permukaan air"
      ],
      kunciJawaban: 1,
      pembahasan: "Cahaya merambat ~300.000.000 m/s sehingga terlihat instan, sedangkan bunyi merambat hanya ~340 m/s di udara, sehingga suaranya menyusul kemudian."
    },
    {
      id: "ipa-29",
      nomor: 29,
      level: "hots",
      pertanyaan: "Tindakan bijak memanfaatkan sumber daya alam yang tidak dapat diperbarui (seperti minyak bumi dan batu bara) adalah...",
      pilihan: [
        "Menggunakannya sebanyak-banyaknya tanpa batas",
        "Menghemat penggunaan energi listrik dan beralih ke energi alternatif ramah lingkungan (surya dan angin)",
        "Membuang bahan bakar ke sungai",
        "Menutup semua pabrik di dunia"
      ],
      kunciJawaban: 1,
      pembahasan: "Energi fosil dapat habis, sehingga kita perlu berhemat dan mengembangkan energi terbarukan seperti tenaga surya dan bayu."
    },
    {
      id: "ipa-30",
      nomor: 30,
      level: "hots",
      pertanyaan: "Pengurai (dekomposer) seperti jamur dan bakteri memiliki peran sangat penting di alam karena...",
      pilihan: [
        "Memangsa hewan herbivora yang masih hidup",
        "Menguraikan sisa bangkai makhluk hidup menjadi zat hara penyubur tanah bagi tanaman",
        "Menghabiskan seluruh oksigen di bumi",
        "Membuat tanah menjadi keras dan tandus"
      ],
      kunciJawaban: 1,
      pembahasan: "Tanpa dekomposer, rantai makanan terputus karena bangkai dan daun kering diolah kembali menjadi unsur hara yang menyuburkan tanah."
    }
  ]
};
