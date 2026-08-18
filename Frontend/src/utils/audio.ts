/**
 * Procedural Temple Singing Bowl / Bell Synthesizer (Web Audio API)
 * Zero external audio files required. Completely lightweight and pure.
 */

class TempleAudioEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = true;

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggleMute(): boolean {
    this.initContext();
    this.isMuted = !this.isMuted;
    if (!this.isMuted) {
      this.playGentleBell();
    }
    return !this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  /**
   * Plays a rich, resonant harmonic temple bell tone
   */
  public playGentleBell(freq = 280) {
    if (this.isMuted || !this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const partials = [
        { ratio: 1.0, gain: 0.4, decay: 4.0 },
        { ratio: 2.76, gain: 0.2, decay: 3.0 },
        { ratio: 5.4, gain: 0.1, decay: 2.2 },
        { ratio: 8.9, gain: 0.05, decay: 1.5 },
      ];

      partials.forEach(({ ratio, gain, decay }) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gainNode = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq * ratio, now);

        gainNode.gain.setValueAtTime(0.001, now);
        gainNode.gain.exponentialRampToValueAtTime(gain, now + 0.04);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, now + decay);

        osc.connect(gainNode);
        gainNode.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + decay);
      });
    } catch {
      // Audio playback safety catch
    }
  }
}

export const templeAudio = new TempleAudioEngine();
