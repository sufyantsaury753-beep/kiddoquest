// src/data/evaluasi/matematika.ts
import { PaketEvaluasi } from "./types";

export const PAKET_MATEMATIKA: PaketEvaluasi = {
  mapelId: "matematika",
  namaMapel: "Matematika",
  fase: "Fase B (Kelas 3-4)",
  totalSoal: 30,
  daftarSoal: [
    {
      id: "mat-1",
      nomor: 1,
      level: "mudah",
      pertanyaan: "Hasil dari 345 + 287 adalah...",
      pilihan: ["622", "632", "532", "642"],
      kunciJawaban: 1,
      pembahasan: "345 + 287 = 632 (5 + 7 = 12 simpan 1, 4 + 8 + 1 = 13 simpan 1, 3 + 2 + 1 = 6)."
    },
    {
      id: "mat-2",
      nomor: 2,
      level: "mudah",
      pertanyaan: "Hasil pengurangan dari 750 - 385 adalah...",
      pilihan: ["365", "375", "465", "355"],
      kunciJawaban: 0,
      pembahasan: "750 - 385 = 365."
    },
    {
      id: "mat-3",
      nomor: 3,
      level: "mudah",
      pertanyaan: "Hasil perkalian dari 14 × 8 adalah...",
      pilihan: ["102", "112", "122", "114"],
      kunciJawaban: 1,
      pembahasan: "14 × 8 = (10 × 8) + (4 × 8) = 80 + 32 = 112."
    },
    {
      id: "mat-4",
      nomor: 4,
      level: "mudah",
      pertanyaan: "Hasil pembagian dari 96 ÷ 6 adalah...",
      pilihan: ["14", "15", "16", "18"],
      kunciJawaban: 2,
      pembahasan: "96 ÷ 6 = 16 karena 16 × 6 = 96."
    },
    {
      id: "mat-5",
      nomor: 5,
      level: "mudah",
      pertanyaan: "Nilai pecahan dari satu buah semangka yang dipotong menjadi 8 bagian sama besar dan diambil 3 bagian adalah...",
      pilihan: ["1/8", "3/8", "5/8", "8/3"],
      kunciJawaban: 1,
      pembahasan: "Bagian yang diambil adalah pembilang (3) dan total potongan adalah penyebut (8), sehingga nilainya 3/8."
    },
    {
      id: "mat-6",
      nomor: 6,
      level: "mudah",
      pertanyaan: "Pecahan yang senilai dengan 2/5 adalah...",
      pilihan: ["4/10", "4/15", "3/10", "6/12"],
      kunciJawaban: 0,
      pembahasan: "Mengalikan pembilang dan penyebut dengan angka 2: (2 × 2) / (5 × 2) = 4/10."
    },
    {
      id: "mat-7",
      nomor: 7,
      level: "mudah",
      pertanyaan: "Bentuk desimal dari pecahan 1/2 adalah...",
      pilihan: ["0,2", "0,25", "0,5", "0,75"],
      kunciJawaban: 2,
      pembahasan: "1/2 senilai dengan 5/10 yang ditulis dalam pecahan desimal sebagai 0,5."
    },
    {
      id: "mat-8",
      nomor: 8,
      level: "mudah",
      pertanyaan: "Sudut yang besarnya tepat 90 derajat disebut sudut...",
      pilihan: ["Sudut lancip", "Sudut siku-siku", "Sudut tumpul", "Sudut lurus"],
      kunciJawaban: 1,
      pembahasan: "Sudut yang besarnya tepat 90° disebut sudut siku-siku."
    },
    {
      id: "mat-9",
      nomor: 9,
      level: "mudah",
      pertanyaan: "Keliling persegi yang memiliki panjang sisi 7 cm adalah...",
      pilihan: ["14 cm", "21 cm", "28 cm", "49 cm"],
      kunciJawaban: 2,
      pembahasan: "Keliling persegi = 4 × sisi = 4 × 7 cm = 28 cm."
    },
    {
      id: "mat-10",
      nomor: 10,
      level: "mudah",
      pertanyaan: "Jumlah rusuk pada sebuah bangun ruang kubus adalah...",
      pilihan: ["6", "8", "12", "14"],
      kunciJawaban: 2,
      pembahasan: "Kubus memiliki 6 sisi, 8 titik sudut, dan 12 rusuk yang sama panjang."
    },
    {
      id: "mat-11",
      nomor: 11,
      level: "sedang",
      pertanyaan: "Hasil dari 3/7 + 2/7 adalah...",
      pilihan: ["5/14", "5/7", "6/7", "1/7"],
      kunciJawaban: 1,
      pembahasan: "Jika penyebutnya sudah sama (7), cukup jumlahkan pembilangnya: 3 + 2 = 5, sehingga hasilnya 5/7."
    },
    {
      id: "mat-12",
      nomor: 12,
      level: "sedang",
      pertanyaan: "Hasil dari 5/6 - 1/3 adalah...",
      pilihan: ["4/3", "4/6 atau 2/3", "3/6 atau 1/2", "1/6"],
      kunciJawaban: 2,
      pembahasan: "Samakan penyebut: 1/3 = 2/6. Maka 5/6 - 2/6 = 3/6 = 1/2."
    },
    {
      id: "mat-13",
      nomor: 13,
      level: "sedang",
      pertanyaan: "Faktor Persekutuan Terbesar (FPB) dari 12 dan 18 adalah...",
      pilihan: ["2", "3", "6", "9"],
      kunciJawaban: 2,
      pembahasan: "Faktor dari 12 = 1, 2, 3, 4, 6, 12. Faktor dari 18 = 1, 2, 3, 6, 9, 18. Faktor persekutuan terbesarnya adalah 6."
    },
    {
      id: "mat-14",
      nomor: 14,
      level: "sedang",
      pertanyaan: "Kelipatan Persekutuan Terkecil (KPK) dari 4 dan 6 adalah...",
      pilihan: ["8", "12", "18", "24"],
      kunciJawaban: 1,
      pembahasan: "Kelipatan 4: 4, 8, 12, 16... Kelipatan 6: 6, 12, 18... Kelipatan persekutuan terkecilnya adalah 12."
    },
    {
      id: "mat-15",
      nomor: 15,
      level: "sedang",
      pertanyaan: "Sebuah persegi panjang memiliki panjang 12 cm dan lebar 5 cm. Luas persegi panjang tersebut adalah...",
      pilihan: ["34 cm²", "60 cm²", "70 cm²", "120 cm²"],
      kunciJawaban: 1,
      pembahasan: "Luas persegi panjang = panjang × lebar = 12 cm × 5 cm = 60 cm²."
    },
    {
      id: "mat-16",
      nomor: 16,
      level: "sedang",
      pertanyaan: "Konversi satuan panjang: 3 meter + 45 sentimeter = ... sentimeter.",
      pilihan: ["345 cm", "3045 cm", "75 cm", "3450 cm"],
      kunciJawaban: 0,
      pembahasan: "1 meter = 100 cm. Jadi 3 meter = 300 cm. 300 cm + 45 cm = 345 cm."
    },
    {
      id: "mat-17",
      nomor: 17,
      level: "sedang",
      pertanyaan: "Berat 2 kilogram beras setara dengan berapa gram?",
      pilihan: ["20 gram", "200 gram", "2.000 gram", "20.000 gram"],
      kunciJawaban: 2,
      pembahasan: "1 kilogram = 1.000 gram. Jadi 2 kg = 2 × 1.000 = 2.000 gram."
    },
    {
      id: "mat-18",
      nomor: 18,
      level: "sedang",
      pertanyaan: "Waktu belajar Ani dimulai pukul 14.15 dan selesai pukul 15.45. Berapa lama Ani belajar?",
      pilihan: ["1 jam", "1 jam 15 menit", "1 jam 30 menit", "1 jam 45 menit"],
      kunciJawaban: 2,
      pembahasan: "15.45 - 14.15 = 1 jam 30 menit."
    },
    {
      id: "mat-19",
      nomor: 19,
      level: "sedang",
      pertanyaan: "Sebuah segitiga memiliki alas 10 cm dan tinggi 6 cm. Luas segitiga tersebut adalah...",
      pilihan: ["60 cm²", "30 cm²", "20 cm²", "16 cm²"],
      kunciJawaban: 1,
      pembahasan: "Luas segitiga = (alas × tinggi) ÷ 2 = (10 × 6) ÷ 2 = 60 ÷ 2 = 30 cm²."
    },
    {
      id: "mat-20",
      nomor: 20,
      level: "sedang",
      pertanyaan: "Bentuk persen dari pecahan 3/4 adalah...",
      pilihan: ["25%", "50%", "75%", "80%"],
      kunciJawaban: 2,
      pembahasan: "3/4 × 100% = 75%."
    },
    {
      id: "mat-21",
      nomor: 21,
      level: "hots",
      pertanyaan: "Paman memiliki 4 kotak apel. Setiap kotak berisi 24 buah apel. Paman ingin membagikan seluruh apel tersebut sama rata kepada 6 keponakannya. Berapa buah apel yang diterima setiap keponakan?",
      pilihan: ["12 buah", "14 buah", "16 buah", "18 buah"],
      kunciJawaban: 2,
      pembahasan: "Total apel = 4 × 24 = 96 buah. Dibagikan ke 6 keponakan = 96 ÷ 6 = 16 buah per anak."
    },
    {
      id: "mat-22",
      nomor: 22,
      level: "hots",
      pertanyaan: "Lampu A menyala setiap 4 detik sekali, sedangkan lampu B menyala setiap 6 detik sekali. Jika kedua lampu menyala bersamaan pada detik ke-0, pada detik ke berapa kedua lampu akan menyala bersamaan lagi untuk pertama kalinya?",
      pilihan: ["Detik ke-8", "Detik ke-10", "Detik ke-12", "Detik ke-24"],
      kunciJawaban: 2,
      pembahasan: "Mencari KPK dari 4 dan 6. KPK(4, 6) = 12. Jadi kedua lampu menyala bersamaan di detik ke-12."
    },
    {
      id: "mat-23",
      nomor: 23,
      level: "hots",
      pertanyaan: "Ibu membeli kain sepanjang 5 1/2 meter. Kain tersebut digunakan untuk membuat baju seragam anak sepanjang 2 1/4 meter. Sisa kain yang belum digunakan adalah...",
      pilihan: ["3 1/4 meter", "3 1/2 meter", "3 3/4 meter", "2 3/4 meter"],
      kunciJawaban: 0,
      pembahasan: "5 1/2 - 2 1/4 = 5 2/4 - 2 1/4 = (5 - 2) + (2/4 - 1/4) = 3 1/4 meter."
    },
    {
      id: "mat-24",
      nomor: 24,
      level: "hots",
      pertanyaan: "Sebuah kolam renang berbentuk persegi panjang memiliki keliling 48 meter. Jika panjang kolam tersebut adalah 16 meter, berapakah lebar kolam tersebut?",
      pilihan: ["8 meter", "10 meter", "12 meter", "16 meter"],
      kunciJawaban: 0,
      pembahasan: "Keliling = 2 × (p + l). 48 = 2 × (16 + l) -> 24 = 16 + l -> l = 24 - 16 = 8 meter."
    },
    {
      id: "mat-25",
      nomor: 25,
      level: "hots",
      pertanyaan: "Dalam sebuah ujian dengan 20 butir soal, setiap jawaban benar diberi nilai 5, dan jawaban salah diberi nilai 0. Jika Budi menjawab 17 soal dengan benar, berapa nilai yang diperoleh Budi?",
      pilihan: ["75", "80", "85", "90"],
      kunciJawaban: 2,
      pembahasan: "Nilai Budi = 17 × 5 = 85."
    },
    {
      id: "mat-26",
      nomor: 26,
      level: "hots",
      pertanyaan: "Data nilai ulangan matematika 5 orang siswa adalah: 80, 75, 90, 85, dan 70. Berapakah nilai rata-rata (mean) dari kelima siswa tersebut?",
      pilihan: ["78", "80", "82", "85"],
      kunciJawaban: 1,
      pembahasan: "Jumlah nilai = 80 + 75 + 90 + 85 + 70 = 400. Rata-rata = 400 ÷ 5 = 80."
    },
    {
      id: "mat-27",
      nomor: 27,
      level: "hots",
      pertanyaan: "Sebuah bak mandi berbentuk kubus dengan panjang rusuk bagian dalam 50 cm. Volume bak mandi tersebut adalah...",
      pilihan: ["2.500 cm³", "15.000 cm³", "125.000 cm³", "250.000 cm³"],
      kunciJawaban: 2,
      pembahasan: "Volume kubus = s × s × s = 50 × 50 × 50 = 125.000 cm³ (setara 125 liter)."
    },
    {
      id: "mat-28",
      nomor: 28,
      level: "hots",
      pertanyaan: "Toko mainan memberikan diskon 20% untuk sebuah mobil remote seharga Rp100.000,00. Berapa rupiah yang harus dibayar pembeli setelah mendapat diskon?",
      pilihan: ["Rp20.000,00", "Rp70.000,00", "Rp80.000,00", "Rp85.000,00"],
      kunciJawaban: 2,
      pembahasan: "Besar diskon = 20% × Rp100.000 = Rp20.000. Harga bayar = Rp100.000 - Rp20.000 = Rp80.000,00."
    },
    {
      id: "mat-29",
      nomor: 29,
      level: "hots",
      pertanyaan: "Berapa banyak simetri lipat yang dimiliki oleh sebuah bangun datar persegi?",
      pilihan: ["2", "3", "4", "8"],
      kunciJawaban: 2,
      pembahasan: "Persegi memiliki 4 simetri lipat (horizontal, vertikal, dan 2 diagonal)."
    },
    {
      id: "mat-30",
      nomor: 30,
      level: "hots",
      pertanyaan: "Sebuah drum minyak berisi 20 liter. Jika minyak tersebut dituangkan ke dalam botol-botol kecil berukuran 1/4 liter, berapa botol yang dapat terisi penuh?",
      pilihan: ["40 botol", "60 botol", "80 botol", "100 botol"],
      kunciJawaban: 2,
      pembahasan: "Jumlah botol = 20 ÷ (1/4) = 20 × 4 = 80 botol."
    }
  ]
};
