// src/data/evaluasi/types.ts

export type MapelId = 
  | "agama" 
  | "pancasila" 
  | "bahasaIndonesia" 
  | "matematika" 
  | "ipas" 
  | "seniBudaya" 
  | "pjok" 
  | "bahasaInggris" 
  | "muatanLokal" 
  | "kodingAi";

export type AgamaSubtype = "islam" | "kristen" | "katolik" | "hindu" | "buddha" | "khonghucu";

export interface SoalEvaluasi {
  id: string;
  nomor: number; // 1 s/d 30
  level: "mudah" | "sedang" | "hots";
  pertanyaan: string;
  pilihan: [string, string, string, string]; // Pilihan A, B, C, D
  kunciJawaban: number; // Index 0 (A), 1 (B), 2 (C), atau 3 (D)
  pembahasan: string; // Penjelasan edukasi ramah anak
}

export interface PaketEvaluasi {
  mapelId: MapelId;
  namaMapel: string;
  fase: "Fase A (Kelas 1-2)" | "Fase B (Kelas 3-4)" | "Fase C (Kelas 5-6)";
  totalSoal: number; // 30 Soal
  daftarSoal: SoalEvaluasi[];
}

export interface MapelMetadata {
  id: MapelId;
  nama: string;
  kategori: string;
  deskripsi: string;
  warnaTema: {
    bg: string;
    border: string;
    text: string;
    badge: string;
    shadow: string;
  };
  ikonNama: string;
}
