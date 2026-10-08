// Web Audio API Synthesizer Engine untuk Harmoni Nasional (TobiQuest)
// 100% Bebas Hak Cipta, Tanpa File MP3 Eksternal, 0 KB Kuota, Super Ringan!

export type InstrumentPreset = "pianika" | "glockenspiel";

export interface MelodyNote {
  notAngka: string;
  nadaHz: number;
  durasi: number; // dalam detik pada tempo normal 1.0x
  lirikSukuKata: string;
  barisLirik?: number;
}

export interface LaguNasional {
  id: string;
  judul: string;
  pencipta: string;
  tempoBpm: number;
  birama: string;
  sejarah: string;
  nilaiKarakter: string;
  stanzas: string[];
  melody: MelodyNote[];
}

export class NationalMelodyEngine {
  private ctx: AudioContext | null = null;
  private instrument: InstrumentPreset = "pianika";
  private tempoMultiplier: number = 1.0; // 1.0x (normal) atau 0.75x (belajar)
  private currentSong: LaguNasional | null = null;
  private currentNoteIndex: number = 0;
  private isPlaying: boolean = false;
  private isPaused: boolean = false;
  private timerId: ReturnType<typeof setTimeout> | null = null;
  private activeNodes: Array<{ osc: OscillatorNode; gain: GainNode }> = [];

  // Callback events
  public onNoteChange?: (noteIndex: number, note: MelodyNote | null) => void;
  public onPlaybackStateChange?: (isPlaying: boolean, isPaused: boolean) => void;
  public onComplete?: () => void;

  constructor() {
    // AudioContext akan diinisialisasi saat interaksi pengguna pertama
  }

  private getContext(): AudioContext | null {
    if (typeof window === "undefined") return null;
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public setInstrument(preset: InstrumentPreset) {
    this.instrument = preset;
  }

  public getInstrument(): InstrumentPreset {
    return this.instrument;
  }

  public setTempoMultiplier(mult: number) {
    this.tempoMultiplier = Math.max(0.5, Math.min(1.5, mult));
  }

  public getTempoMultiplier(): number {
    return this.tempoMultiplier;
  }

  public loadSong(song: LaguNasional) {
    this.stop();
    this.currentSong = song;
    this.currentNoteIndex = 0;
  }

  public getCurrentSong(): LaguNasional | null {
    return this.currentSong;
  }

  public getCurrentNoteIndex(): number {
    return this.currentNoteIndex;
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public getIsPaused(): boolean {
    return this.isPaused;
  }

  // Mainkan nada individu (ketika anak mengetuk tuts pianika visual secara manual)
  public playSingleNote(freqHz: number, durationSec: number = 0.45) {
    if (freqHz <= 0) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const dur = durationSec * (1 / this.tempoMultiplier);

    if (this.instrument === "pianika") {
      // PRESET: PIANIKA SEKOLAH
      // Triangle wave + subtle Sine warmth + Lowpass filter
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const filter = ctx.createBiquadFilter();
      const gain = ctx.createGain();

      osc1.type = "triangle";
      osc1.frequency.setValueAtTime(freqHz, now);

      osc2.type = "sine";
      osc2.frequency.setValueAtTime(freqHz * 2, now); // harmonik oktaf halus

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(2200, now);
      filter.Q.setValueAtTime(1.2, now);

      // Envelope ADSR halus agar nyaman di telinga anak
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.22, now + 0.02);
      gain.gain.setValueAtTime(0.18, now + dur * 0.7);
      gain.gain.exponentialRampToValueAtTime(0.001, now + dur);

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + dur + 0.05);
      osc2.stop(now + dur + 0.05);
    } else {
      // PRESET: GLOCKENSPIEL / BEL MUSIK
      // Sine wave jernih dengan lonceng berdentang ceria
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = "sine";
      osc1.frequency.setValueAtTime(freqHz, now);

      osc2.type = "sine";
      osc2.frequency.setValueAtTime(freqHz * 3.01, now); // denting logam lonceng

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.25, now + 0.008);
      gain.gain.exponentialRampToValueAtTime(0.001, now + dur * 1.2);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + dur * 1.25);
      osc2.stop(now + dur * 1.25);
    }
  }

  // Mulai atau lanjutkan pemutaran melodi
  public play() {
    if (!this.currentSong || this.currentSong.melody.length === 0) return;
    const ctx = this.getContext();
    if (!ctx) return;

    this.isPlaying = true;
    this.isPaused = false;
    this.notifyState();
    this.scheduleNextNote();
  }

  // Jeda pemutaran
  public pause() {
    if (!this.isPlaying) return;
    this.clearSchedule();
    this.stopActiveNodes();
    this.isPlaying = false;
    this.isPaused = true;
    this.notifyState();
  }

  // Ulangi dari awal
  public replay() {
    this.stop();
    this.currentNoteIndex = 0;
    this.play();
  }

  // Hentikan pemutaran total
  public stop() {
    this.clearSchedule();
    this.stopActiveNodes();
    this.isPlaying = false;
    this.isPaused = false;
    this.currentNoteIndex = 0;
    this.notifyState();
    if (this.onNoteChange) {
      this.onNoteChange(-1, null);
    }
  }

  private scheduleNextNote() {
    if (!this.isPlaying || !this.currentSong) return;

    if (this.currentNoteIndex >= this.currentSong.melody.length) {
      // Lagu selesai dimainkan
      this.isPlaying = false;
      this.isPaused = false;
      this.currentNoteIndex = 0;
      this.notifyState();
      if (this.onNoteChange) {
        this.onNoteChange(-1, null);
      }
      if (this.onComplete) {
        this.onComplete();
      }
      return;
    }

    const note = this.currentSong.melody[this.currentNoteIndex];
    const adjustedDuration = note.durasi * (1 / this.tempoMultiplier);

    // Mainkan audio jika bukan tanda diam (rest 0 Hz)
    if (note.nadaHz > 0) {
      this.playSingleNote(note.nadaHz, adjustedDuration);
    }

    // Beritahukan UI nada yang sedang berbunyi (untuk highlight lirik dan tuts)
    if (this.onNoteChange) {
      this.onNoteChange(this.currentNoteIndex, note);
    }

    // Jadwalkan nada berikutnya
    this.timerId = setTimeout(() => {
      this.currentNoteIndex++;
      this.scheduleNextNote();
    }, adjustedDuration * 1000);
  }

  private clearSchedule() {
    if (this.timerId !== null) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
  }

  private stopActiveNodes() {
    const ctx = this.ctx;
    if (ctx) {
      this.activeNodes.forEach(({ osc, gain }) => {
        try {
          gain.gain.setValueAtTime(0, ctx.currentTime);
          osc.stop(ctx.currentTime);
          osc.disconnect();
          gain.disconnect();
        } catch {}
      });
    }
    this.activeNodes = [];
  }

  private notifyState() {
    if (this.onPlaybackStateChange) {
      this.onPlaybackStateChange(this.isPlaying, this.isPaused);
    }
  }
}

// Singleton global instance
export const melodyEngine = new NationalMelodyEngine();
