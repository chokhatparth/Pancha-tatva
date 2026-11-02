import { ElementSlug } from '../data/panchaTatvaData';

export type SoundscapeId = 'sanctuary' | ElementSlug;

export interface SoundscapeMeta {
  id: SoundscapeId;
  label: string;
  sanskrit: string;
  subtitle: string;
  colorClass: string;
  audioUrl?: string;
}

export const AUDIO_TRACKS: Partial<Record<SoundscapeId, string>> = {
  fire: '/assets/aistudio/mixkit-campfire-crackles-1330_f3c5ae0a.wav',
  earth: '/assets/aistudio/mixkit-birds-in-the-jungle-2434_7fba8dec.wav',
  space: '/assets/aistudio/ezanarini-air-ambience-234180__1__03ad0618.mp3',
  air: '/assets/aistudio/ezanarini-air-ambience-234180__1__03ad0618.mp3',
  water: '/assets/aistudio/dany_photo-water-423114_8f10ad91.mp3',
};

export const SOUNDSCAPES: SoundscapeMeta[] = [
  {
    id: 'fire',
    label: 'Agni · Fire',
    sanskrit: 'अग्नि',
    subtitle: 'Sacred campfire crackles & Vedic yajna hearth',
    colorClass: 'text-fire',
    audioUrl: AUDIO_TRACKS.fire,
  },
  {
    id: 'earth',
    label: 'Prithvi · Earth',
    sanskrit: 'पृथ्वी',
    subtitle: 'Living earth — birds in the jungle forest ambiance',
    colorClass: 'text-earth',
    audioUrl: AUDIO_TRACKS.earth,
  },
  {
    id: 'water',
    label: 'Apas / Jal · Water',
    sanskrit: 'आपः / जल',
    subtitle: 'Natural flowing sacred water stream ambience',
    colorClass: 'text-water',
    audioUrl: AUDIO_TRACKS.water,
  },
  {
    id: 'space',
    label: 'Akasha · Space',
    sanskrit: 'आकाश',
    subtitle: 'Deep atmospheric expanse & cosmic ether ambience',
    colorClass: 'text-space',
    audioUrl: AUDIO_TRACKS.space,
  },
  {
    id: 'air',
    label: 'Vayu · Air',
    sanskrit: 'वायु',
    subtitle: 'Flowing wind & atmospheric air ambience',
    colorClass: 'text-air',
    audioUrl: AUDIO_TRACKS.air,
  },
  {
    id: 'sanctuary',
    label: 'Sacred Sanctuary',
    sanskrit: 'ॐ नाद',
    subtitle: '136.1 Hz Om tanpura drone & Tibetan singing bowls',
    colorClass: 'text-primary',
  },
];

const ELEMENT_FREQUENCIES: Record<ElementSlug, number> = {
  earth: 256,
  water: 288,
  fire: 320,
  air: 341.3,
  space: 384,
};

class SacredSoundEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private sceneGain: GainNode | null = null;
  private activeNodes: AudioNode[] = [];
  private activeTimers: number[] = [];
  private activeAudioEl: HTMLAudioElement | null = null;

  private isPlaying = false;
  private currentSoundscape: SoundscapeId = 'fire';
  private volume = 0.65;
  private isDucked = false;
  private uiSoundsEnabled = true;
  private autoSyncElement = true;
  private listeners = new Set<() => void>();

  private ensureContext(): AudioContext {
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.value = this.getEffectiveVolume();
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  private getEffectiveVolume(): number {
    return this.isDucked ? this.volume * 0.25 : this.volume;
  }

  public subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify() {
    this.listeners.forEach((fn) => fn());
  }

  public getState() {
    return {
      isPlaying: this.isPlaying,
      currentSoundscape: this.currentSoundscape,
      volume: this.volume,
      uiSoundsEnabled: this.uiSoundsEnabled,
      autoSyncElement: this.autoSyncElement,
    };
  }

  public togglePlay(soundscape?: SoundscapeId) {
    if (soundscape && soundscape !== this.currentSoundscape) {
      this.currentSoundscape = soundscape;
      if (this.isPlaying) {
        this.rebuildScene();
        this.notify();
        return;
      }
    }
    if (this.isPlaying) {
      this.stop();
    } else {
      this.start(soundscape || this.currentSoundscape);
    }
  }

  public start(soundscape: SoundscapeId = this.currentSoundscape) {
    this.ensureContext();
    this.currentSoundscape = soundscape;
    this.isPlaying = true;
    this.rebuildScene();
    this.notify();
  }

  public stop() {
    this.isPlaying = false;
    this.cleanupScene();
    this.notify();
  }

  public setSoundscape(soundscape: SoundscapeId) {
    if (this.currentSoundscape === soundscape && this.isPlaying) return;
    this.currentSoundscape = soundscape;
    if (this.isPlaying) {
      this.rebuildScene();
    }
    this.notify();
  }

  public syncWithElementIfEnabled(slug: ElementSlug) {
    if (!this.autoSyncElement) return;
    if (this.currentSoundscape !== slug) {
      this.currentSoundscape = slug;
      if (this.isPlaying) {
        this.rebuildScene();
      }
      this.notify();
    }
  }

  public setAutoSyncElement(enabled: boolean) {
    this.autoSyncElement = enabled;
    this.notify();
  }

  public setUiSoundsEnabled(enabled: boolean) {
    this.uiSoundsEnabled = enabled;
    this.notify();
  }

  public setVolume(val: number) {
    this.volume = Math.max(0, Math.min(1, val));
    this.updateMasterGain();
    this.notify();
  }

  public setDucking(ducked: boolean) {
    this.isDucked = ducked;
    this.updateMasterGain();
  }

  private updateMasterGain() {
    const target = this.getEffectiveVolume();
    if (this.activeAudioEl) {
      this.activeAudioEl.volume = Math.max(0, Math.min(1, target));
    }
    if (this.ctx && this.masterGain) {
      this.masterGain.gain.setTargetAtTime(target, this.ctx.currentTime, 0.25);
    }
  }

  private cleanupScene() {
    this.activeTimers.forEach((id) => window.clearInterval(id));
    this.activeTimers = [];

    if (this.activeAudioEl) {
      try {
        this.activeAudioEl.pause();
        this.activeAudioEl.src = '';
      } catch {
        // ignore
      }
      this.activeAudioEl = null;
    }

    if (this.ctx && this.sceneGain) {
      try {
        const oldGain = this.sceneGain;
        oldGain.gain.setTargetAtTime(0.0001, this.ctx.currentTime, 0.2);
        setTimeout(() => {
          try {
            oldGain.disconnect();
          } catch {
            // ignore
          }
        }, 350);
      } catch {
        // ignore
      }
      this.sceneGain = null;
    }

    const nodesToStop = [...this.activeNodes];
    this.activeNodes = [];
    setTimeout(() => {
      nodesToStop.forEach((node) => {
        try {
          if (
            'stop' in node &&
            typeof (node as AudioScheduledSourceNode).stop === 'function'
          ) {
            (node as AudioScheduledSourceNode).stop();
          }
          node.disconnect();
        } catch {
          // ignore
        }
      });
    }, 360);
  }

  private createPinkNoiseBuffer(ctx: AudioContext, seconds = 5): AudioBuffer {
    const bufferSize = ctx.sampleRate * seconds;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = buffer.getChannelData(0);
    let b0 = 0,
      b1 = 0,
      b2 = 0,
      b3 = 0,
      b4 = 0,
      b5 = 0,
      b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.969 * b2 + white * 0.153852;
      b3 = 0.8665 * b3 + white * 0.3104856;
      b4 = 0.55 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.016898;
      output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.04;
      b6 = white * 0.115926;
    }
    return buffer;
  }

  private rebuildScene() {
    this.cleanupScene();
    const ctx = this.ensureContext();
    if (!this.masterGain) return;

    const sceneGain = ctx.createGain();
    sceneGain.gain.setValueAtTime(0.001, ctx.currentTime);
    sceneGain.gain.setTargetAtTime(1.0, ctx.currentTime, 0.5);
    sceneGain.connect(this.masterGain);
    this.sceneGain = sceneGain;

    // Check if this soundscape uses one of the uploaded audio tracks
    const audioTrackUrl = AUDIO_TRACKS[this.currentSoundscape];
    if (audioTrackUrl) {
      const audio = new Audio(audioTrackUrl);
      audio.loop = true;
      audio.volume = Math.max(0, Math.min(1, this.getEffectiveVolume()));
      // Give Akasha (Space) a deeper, more expansive cosmic resonance rate (0.88x) vs Vayu (Air) at 1.0x
      if (this.currentSoundscape === 'space') {
        audio.playbackRate = 0.88;
      } else {
        audio.playbackRate = 1.0;
      }
      audio.play().catch(() => {
        // Fallback if autoplay blocked
      });
      this.activeAudioEl = audio;
      return;
    }

    if (this.currentSoundscape === 'water') {
      this.buildWaterScene(ctx, sceneGain);
    } else {
      this.buildSanctuaryScene(ctx, sceneGain);
    }
  }

  private addDroneVoice(
    ctx: AudioContext,
    dest: AudioNode,
    freq: number,
    gainVal: number,
    lfoHz = 0.12,
    type: OscillatorType = 'sine'
  ) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();

    osc.type = type;
    osc.frequency.value = freq;

    gain.gain.value = gainVal;
    lfo.frequency.value = lfoHz;
    lfoGain.gain.value = gainVal * 0.35;

    lfo.connect(lfoGain);
    lfoGain.connect(gain.gain);
    osc.connect(gain);
    gain.connect(dest);

    osc.start();
    lfo.start();
    this.activeNodes.push(osc, gain, lfo, lfoGain);
  }

  private buildSanctuaryScene(ctx: AudioContext, dest: AudioNode) {
    const root = 136.1;
    this.addDroneVoice(ctx, dest, root, 0.16, 0.08, 'sine');
    this.addDroneVoice(ctx, dest, root * 1.5, 0.09, 0.11, 'sine');
    this.addDroneVoice(ctx, dest, root * 2, 0.05, 0.07, 'triangle');

    const triggerBowl = () => {
      if (!this.isPlaying || this.currentSoundscape !== 'sanctuary') return;
      const freqs = [272.2, 408.3, 544.4];
      const pick = freqs[Math.floor(Math.random() * freqs.length)];
      this.strikeHarmonicBell(pick, 0.12, 4.5, dest);
    };
    triggerBowl();
    const timer = window.setInterval(triggerBowl, 6500);
    this.activeTimers.push(timer);
  }

  private buildWaterScene(ctx: AudioContext, dest: AudioNode) {
    const noiseBuffer = this.createPinkNoiseBuffer(ctx, 6);
    const noise = ctx.createBufferSource();
    noise.buffer = noiseBuffer;
    noise.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 650;
    filter.Q.value = 1.8;

    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.frequency.value = 0.22;
    lfoGain.gain.value = 220;
    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);

    const streamGain = ctx.createGain();
    streamGain.gain.value = 0.22;

    noise.connect(filter);
    filter.connect(streamGain);
    streamGain.connect(dest);

    noise.start();
    lfo.start();
    this.activeNodes.push(noise, filter, lfo, lfoGain, streamGain);

    this.addDroneVoice(ctx, dest, 144, 0.09, 0.08, 'sine');
    this.addDroneVoice(ctx, dest, 288, 0.05, 0.12, 'sine');

    const triggerDroplet = () => {
      if (!this.isPlaying || this.currentSoundscape !== 'water') return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const baseFreq = 550 + Math.random() * 450;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(baseFreq, now);
      osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.65, now + 0.09);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.08, now + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.18);

      osc.connect(gain);
      gain.connect(dest);
      osc.start(now);
      osc.stop(now + 0.2);
    };
    const timer = window.setInterval(triggerDroplet, 1800);
    this.activeTimers.push(timer);
  }

  public strikeHarmonicBell(
    freq = 256,
    peakGain = 0.15,
    duration = 4.0,
    targetNode?: AudioNode
  ) {
    const ctx = this.ensureContext();
    const dest = targetNode || this.masterGain;
    if (!dest) return;

    const now = ctx.currentTime;
    const partials = [
      { ratio: 1, amp: 1.0, decay: duration },
      { ratio: 2.0, amp: 0.45, decay: duration * 0.7 },
      { ratio: 2.756, amp: 0.25, decay: duration * 0.5 },
    ];

    partials.forEach((p) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq * p.ratio, now);

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(peakGain * p.amp, now + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + p.decay);

      osc.connect(gain);
      gain.connect(dest);

      osc.start(now);
      osc.stop(now + p.decay + 0.05);
    });
  }

  public playElementChime(slug: ElementSlug) {
    const freq = ELEMENT_FREQUENCIES[slug] || 256;
    this.strikeHarmonicBell(freq, 0.18, 3.8);
  }

  public playUiTap(freq = 528) {
    if (!this.uiSoundsEnabled) return;
    try {
      this.strikeHarmonicBell(freq, 0.06, 0.85);
    } catch {
      // ignore if user hasn't interacted yet
    }
  }
}

export const soundEngine = new SacredSoundEngine();
