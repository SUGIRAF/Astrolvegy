/**
 * Sound FX & Background Music Player Engine for Astrolovegy
 * Features soft romantic sound effects via Web Audio API + music player for NIKI, Taylor Swift, Ed Sheeran
 */

class SoundEngine {
  private ctx: AudioContext | null = null;
  private musicInterval: any = null;
  public isMusicPlaying: boolean = false;
  public currentTrackIndex: number = 0;
  public volume: number = 0.5;

  public playlist = [
    {
      title: 'Every Summertime',
      artist: 'NIKI',
      album: 'Shang-Chi / Nicole',
      mood: 'Warm Breezy Romance',
      bpm: 96,
      rootFreq: 261.63 // C4
    },
    {
      title: 'Lover',
      artist: 'Taylor Swift',
      album: 'Lover',
      mood: 'Tender Dreamy Waltz',
      bpm: 68,
      rootFreq: 293.66 // D4
    },
    {
      title: 'Perfect',
      artist: 'Ed Sheeran',
      album: '÷ (Divide)',
      mood: 'Joyful Acoustic Devotion',
      bpm: 63,
      rootFreq: 277.18 // C#4
    },
    {
      title: 'lowkey',
      artist: 'NIKI',
      album: 'Wanna Take This Downtown?',
      mood: 'Late Night Chill Spark',
      bpm: 110,
      rootFreq: 311.13 // Eb4
    },
    {
      title: 'Enchanted',
      artist: 'Taylor Swift',
      album: 'Speak Now',
      mood: 'Celestial Wonder & Love',
      bpm: 82,
      rootFreq: 329.63 // E4
    }
  ];

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  /**
   * Soft, comforting UI button click tap
   */
  public playTap() {
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(540, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(320, ctx.currentTime + 0.06);

      gain.gain.setValueAtTime(0.08 * this.volume, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.06);
    } catch {
      // ignore
    }
  }

  /**
   * Airy celestial sparkle for likes / superlikes
   */
  public playSparkle() {
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.value = freq;

        const startTime = ctx.currentTime + idx * 0.05;
        gain.gain.setValueAtTime(0, startTime);
        gain.gain.linearRampToValueAtTime(0.09 * this.volume, startTime + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.28);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(startTime);
        osc.stop(startTime + 0.3);
      });
    } catch {
      // ignore
    }
  }

  /**
   * Warm romantic chord for It's a Match!
   */
  public playMatch() {
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      // F# Major 9th chord: F#, A#, C#, E#, G#
      const chord = [369.99, 466.16, 554.37, 659.25, 830.61];
      chord.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.07);

        const start = ctx.currentTime + i * 0.07;
        gain.gain.setValueAtTime(0, start);
        gain.gain.linearRampToValueAtTime(0.12 * this.volume, start + 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 1.2);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(start);
        osc.stop(start + 1.2);
      });
    } catch {
      // ignore
    }
  }

  /**
   * WhatsApp-style soft message sent sound
   */
  public playMessageSent() {
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(680, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.1 * this.volume, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } catch {
      // ignore
    }
  }

  /**
   * Starts simulated lovely background music stream (harmonic chord progressions)
   */
  public toggleMusic(onStateChange?: (playing: boolean) => void) {
    if (this.isMusicPlaying) {
      this.pauseMusic();
      if (onStateChange) onStateChange(false);
    } else {
      this.startMusic();
      if (onStateChange) onStateChange(true);
    }
  }

  public startMusic() {
    const ctx = this.getContext();
    if (!ctx) return;
    this.isMusicPlaying = true;

    // Harmonic chord progression loops
    const currentSong = this.playlist[this.currentTrackIndex];
    const root = currentSong.rootFreq;
    const intervals = [
      [root, root * 1.25, root * 1.5], // I major
      [root * 1.33, root * 1.66, root * 2.0], // IV major
      [root * 1.125, root * 1.35, root * 1.68], // ii minor
      [root * 1.5, root * 1.875, root * 2.25] // V major
    ];

    let chordStep = 0;
    const beatMs = (60 / currentSong.bpm) * 1000 * 2; // slow 2-beat measures

    const playChordStep = () => {
      if (!this.isMusicPlaying) return;
      try {
        const chord = intervals[chordStep % intervals.length];
        chord.forEach(freq => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, ctx.currentTime);

          gain.gain.setValueAtTime(0, ctx.currentTime);
          gain.gain.linearRampToValueAtTime(0.04 * this.volume, ctx.currentTime + 0.4);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + (beatMs / 1000) * 0.95);

          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start();
          osc.stop(ctx.currentTime + beatMs / 1000);
        });
        chordStep++;
      } catch {
        // silent
      }
    };

    playChordStep();
    if (this.musicInterval) clearInterval(this.musicInterval);
    this.musicInterval = setInterval(playChordStep, beatMs);
  }

  public pauseMusic() {
    this.isMusicPlaying = false;
    if (this.musicInterval) {
      clearInterval(this.musicInterval);
      this.musicInterval = null;
    }
  }

  public nextTrack() {
    this.currentTrackIndex = (this.currentTrackIndex + 1) % this.playlist.length;
    if (this.isMusicPlaying) {
      this.pauseMusic();
      this.startMusic();
    }
  }

  public prevTrack() {
    this.currentTrackIndex = (this.currentTrackIndex - 1 + this.playlist.length) % this.playlist.length;
    if (this.isMusicPlaying) {
      this.pauseMusic();
      this.startMusic();
    }
  }

  public setVolume(val: number) {
    this.volume = Math.max(0, Math.min(1, val));
  }
}

export const sound = new SoundEngine();
