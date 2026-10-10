// TobiQuest Audio & Speech Synthesis Engine
// Zero external audio files required -> Instant load, 100% offline & Telkomsel Lite friendly!

class SoundEngine {
  private ctx: AudioContext | null = null;
  private soundEnabled: boolean = true;
  private speechEnabled: boolean = true;
  private cachedVoices: SpeechSynthesisVoice[] = [];
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private isAudioUnlocked: boolean = false;

  constructor() {
    if (typeof window !== "undefined") {
      this.initClientVoices();
      this.setupFirstGestureUnlock();
    }
  }

  // Pre-load voices in background as soon as available (prevents mobile queue stall)
  private initClientVoices() {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

    const loadVoices = () => {
      try {
        const voices = window.speechSynthesis.getVoices();
        if (voices && voices.length > 0) {
          this.cachedVoices = voices;
        }
      } catch {
        // silent fallback
      }
    };

    loadVoices();
    if (typeof window.speechSynthesis !== "undefined" && "onvoiceschanged" in window.speechSynthesis) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }

  // Pre-warm audio and speech synthesis on first touch/click anywhere on screen
  private setupFirstGestureUnlock() {
    if (typeof window === "undefined") return;

    const unlockHandler = () => {
      this.unlockAudio();
    };

    window.addEventListener("touchstart", unlockHandler, { once: true, passive: true });
    window.addEventListener("touchend", unlockHandler, { once: true, passive: true });
    window.addEventListener("click", unlockHandler, { once: true, passive: true });
  }

  // Awakens Mobile AudioContext & Google TTS pipeline silently without stutter
  public unlockAudio() {
    if (typeof window === "undefined") return;

    // 1. Resume Web Audio API AudioContext
    try {
      const ctx = this.getContext();
      if (ctx && ctx.state === "suspended") {
        ctx.resume();
      }
    } catch {
      // silent fallback
    }

    // 2. Pre-warm SpeechSynthesis without audible noise
    if ("speechSynthesis" in window) {
      try {
        if (window.speechSynthesis.paused) {
          window.speechSynthesis.resume();
        }

        if (!this.isAudioUnlocked) {
          if (this.cachedVoices.length === 0) {
            this.cachedVoices = window.speechSynthesis.getVoices();
          }

          window.speechSynthesis.resume();
          window.speechSynthesis.cancel();
          this.isAudioUnlocked = true;
        }
      } catch {
        // silent fallback
      }
    }
  }

  private getContext(): AudioContext | null {
    if (typeof window === "undefined") return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
    return this.ctx;
  }

  public setSoundEnabled(enabled: boolean) {
    this.soundEnabled = enabled;
  }

  public setSpeechEnabled(enabled: boolean) {
    this.speechEnabled = enabled;
    if (!enabled && typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  }

  public isSoundEnabled() {
    return this.soundEnabled;
  }

  public isSpeechEnabled() {
    return this.speechEnabled;
  }

  // Play a cheerful chime (e.g. for button clicks or correct mini-answers)
  public playChime() {
    if (!this.soundEnabled) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08);

      gain.gain.setValueAtTime(0, ctx.currentTime + idx * 0.08);
      gain.gain.linearRampToValueAtTime(0.18, ctx.currentTime + idx * 0.08 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.08 + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + idx * 0.08);
      osc.stop(ctx.currentTime + idx * 0.08 + 0.4);
    });
  }

  // Gentle, warm marimba tone for Socratic thinking / hints
  public playSocraticHint() {
    if (!this.soundEnabled) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const notes = [440, 554.37, 659.25]; // A4, C#5, E5
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.09);

      gain.gain.setValueAtTime(0.12, ctx.currentTime + idx * 0.09);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.09 + 0.45);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + idx * 0.09);
      osc.stop(ctx.currentTime + idx * 0.09 + 0.5);
    });
  }

  // Grand celebration fanfare (star rewards, quest completion)
  public playCelebration() {
    if (!this.soundEnabled) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const notes = [523.25, 659.25, 783.99, 1046.5, 1318.51]; // C5 - E5 - G5 - C6 - E6
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.1);

      gain.gain.setValueAtTime(0, ctx.currentTime + idx * 0.1);
      gain.gain.linearRampToValueAtTime(0.22, ctx.currentTime + idx * 0.1 + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.1 + 0.55);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + idx * 0.1);
      osc.stop(ctx.currentTime + idx * 0.1 + 0.6);
    });
  }

  // Cheerful chime for correct answers
  public playCorrect() {
    this.playChime();
  }

  // Gentle tone for incorrect answers / hints
  public playWrong() {
    this.playSocraticHint();
  }

  // Celebration fanfare alias
  public playTada() {
    this.playCelebration();
  }

  public playVictory() {
    this.playCelebration();
  }

  public playPop() {
    this.playChime();
  }

  // Sound of water droplet falling and dripping into flask ("pluk... gluk")
  public playWaterDrop() {
    if (!this.soundEnabled) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    const startFreq = 700 + Math.random() * 150;
    const endFreq = 250 + Math.random() * 50;
    osc.frequency.setValueAtTime(startFreq, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(endFreq, ctx.currentTime + 0.08);

    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.13);
  }

  // Sound of bubbling fizzy chemical reaction ("fizzzz... psst")
  public playFizz() {
    if (!this.soundEnabled) return;
    const ctx = this.getContext();
    if (!ctx) return;

    // Create a burst of modulated bubble pops
    for (let i = 0; i < 5; i++) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const delay = i * 0.04;

      osc.type = "triangle";
      osc.frequency.setValueAtTime(450 + Math.random() * 400, ctx.currentTime + delay);
      osc.frequency.linearRampToValueAtTime(800 + Math.random() * 600, ctx.currentTime + delay + 0.06);

      gain.gain.setValueAtTime(0.08, ctx.currentTime + delay);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + 0.08);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + delay);
      osc.stop(ctx.currentTime + delay + 0.09);
    }
  }

  // Native Web Speech API for Tobi Text-To-Speech (Instant mobile playback)
  public speak(text: string, onStart?: () => void, onEnd?: () => void) {
    if (!this.speechEnabled) return;
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

    try {
      // 1. Anti-freeze: ensure engine is not paused or stuck with stalled queue
      window.speechSynthesis.resume();
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "id-ID";
      utterance.rate = 0.95; // Friendly cadence for elementary school kids
      utterance.pitch = 1.15; // Cheerful robot mascot tone

      // 2. Pick Indonesian voice from cache or fresh voices list
      const voices = this.cachedVoices.length > 0 ? this.cachedVoices : window.speechSynthesis.getVoices();
      if (voices && voices.length > 0) {
        this.cachedVoices = voices;
        const idVoice = voices.find(
          (v) =>
            v.lang.toLowerCase().startsWith("id") ||
            v.name.toLowerCase().includes("indonesia") ||
            v.lang.toLowerCase().includes("id-id")
        );
        if (idVoice) {
          utterance.voice = idVoice;
        }
      }

      // 3. Pin utterance reference to prevent Android Chrome Garbage Collection mid-speech
      this.currentUtterance = utterance;

      let finished = false;
      const handleEnd = () => {
        if (finished) return;
        finished = true;
        if (this.currentUtterance === utterance) {
          this.currentUtterance = null;
        }
        if (onEnd) onEnd();
      };

      if (onStart) utterance.onstart = onStart;
      utterance.onend = handleEnd;
      utterance.onerror = () => {
        handleEnd();
      };

      // 4. Awaken mobile audio pipeline right before speak
      window.speechSynthesis.resume();
      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn("Speech synthesis error:", e);
      this.currentUtterance = null;
      if (onEnd) onEnd();
    }
  }

  public stopSpeaking() {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      this.currentUtterance = null;
    }
  }
}

export const sound = new SoundEngine();
