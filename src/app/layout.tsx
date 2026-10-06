import type { Metadata, Viewport } from "next";
import { Fredoka, Quicksand } from "next/font/google";
import "./globals.css";

const fredoka = Fredoka({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-fredoka",
});

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-quicksand",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "TobiQuest - Petualangan Edukasi Interaktif Siswa SD",
  description: "Platform pembelajaran cerdas, ceria, dan inklusif untuk siswa SD se-Indonesia. Inovasi pendidikan Telkomsel dengan audio narasi, manipulatif visual, dan AI Socratic Kids Mentor.",
  keywords: ["TobiQuest", "Telkomsel Coding Competition", "Edukasi SD", "Belajar Interaktif", "Sains Anak", "Matematika SD"],
  authors: [{ name: "Tim TobiQuest" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${fredoka.variable} ${quicksand.variable} scroll-smooth`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="min-h-screen flex flex-col font-sans bg-amber-50/40 text-slate-800 antialiased selection:bg-amber-300 selection:text-slate-900">
        {children}
      </body>
    </html>
  );
}

