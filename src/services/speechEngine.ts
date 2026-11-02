import { soundEngine } from './soundEngine';

export interface SpeechSegment {
  id: string;
  title: string;
  text: string;
}

class WebsiteSpeechEngine {
  private segments: SpeechSegment[] = [];
  private currentIndex = 0;
  private isSpeaking = false;
  private isPaused = false;
  private rate = 1.0;
  private selectedVoiceURI: string | null = null;
  private availableVoices: SpeechSynthesisVoice[] = [];
  private pageTitle = 'Pancha Tatva';
  private listeners = new Set<() => void>();
  private utteranceId = 0;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const loadVoices = () => {
        const voices = window.speechSynthesis.getVoices();
        if (voices.length > 0) {
          this.availableVoices = voices.filter((v) => v.lang.startsWith('en') || v.lang.startsWith('hi'));
          if (this.availableVoices.length === 0) {
            this.availableVoices = voices;
          }
          if (!this.selectedVoiceURI) {
            const preferred =
              this.availableVoices.find(
                (v) =>
                  v.lang === 'en-IN' ||
                  v.name.toLowerCase().includes('india') ||
                  v.name.toLowerCase().includes('natural') ||
                  v.name.toLowerCase().includes('google uk english female')
              ) || this.availableVoices[0];
            if (preferred) {
              this.selectedVoiceURI = preferred.voiceURI;
            }
          }
          this.notify();
        }
      };
      loadVoices();
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
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
      isSpeaking: this.isSpeaking,
      isPaused: this.isPaused,
      currentIndex: this.currentIndex,
      totalSegments: this.segments.length,
      currentSegment: this.segments[this.currentIndex] || null,
      rate: this.rate,
      pageTitle: this.pageTitle,
      availableVoices: this.availableVoices,
      selectedVoiceURI: this.selectedVoiceURI,
    };
  }

  public setRate(newRate: number) {
    this.rate = newRate;
    this.notify();
    if (this.isSpeaking && !this.isPaused) {
      this.speakCurrentSegment();
    }
  }

  public setVoice(voiceURI: string) {
    this.selectedVoiceURI = voiceURI;
    this.notify();
    if (this.isSpeaking && !this.isPaused) {
      this.speakCurrentSegment();
    }
  }

  public speakSegments(segments: SpeechSegment[], pageTitle = 'Pancha Tatva', startIndex = 0) {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    const filtered = segments.filter((s) => s.text && s.text.trim().length > 0);
    if (filtered.length === 0) return;

    window.speechSynthesis.cancel();
    this.segments = filtered;
    this.pageTitle = pageTitle;
    this.currentIndex = Math.max(0, Math.min(startIndex, filtered.length - 1));
    this.isSpeaking = true;
    this.isPaused = false;
    soundEngine.setDucking(true);
    this.notify();
    this.speakCurrentSegment();
  }

  public speakSingleSection(id: string, title: string, text: string) {
    this.speakSegments([{ id, title, text }], title, 0);
  }

  public speakCurrentPageFromDOM(customTitle?: string) {
    const main = document.querySelector('main');
    if (!main) return;

    const extracted: SpeechSegment[] = [];
    const sections = main.querySelectorAll('section, article > header');

    if (sections.length > 0) {
      sections.forEach((sec, idx) => {
        const heading = sec.querySelector('h1, h2, h3');
        const title = heading?.textContent?.trim() || `Section ${idx + 1}`;
        const paragraphs = Array.from(sec.querySelectorAll('p, li, td, th, figcaption'))
          .map((el) => el.textContent?.trim() || '')
          .filter((txt) => txt.length > 2 && !txt.startsWith('≈') && !txt.includes('AI-generated illustration'));
        const combined = [title, ...paragraphs].join('. ').replace(/\s+/g, ' ').trim();
        if (combined.length > 5) {
          extracted.push({
            id: sec.id || `dom-sec-${idx}`,
            title,
            text: combined,
          });
        }
      });
    }

    if (extracted.length === 0) {
      const fullText = main.innerText.replace(/\s+/g, ' ').trim();
      if (fullText) {
        extracted.push({
          id: 'dom-main',
          title: customTitle || document.title || 'Pancha Tatva',
          text: fullText,
        });
      }
    }

    const titleEl = main.querySelector('h1');
    const resolvedTitle = customTitle || titleEl?.textContent?.trim() || 'Pancha Tatva';
    this.speakSegments(extracted, resolvedTitle, 0);
  }

  private speakCurrentSegment() {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    const seg = this.segments[this.currentIndex];
    if (!seg) {
      this.stop();
      return;
    }

    const currentCallId = ++this.utteranceId;
    const cleanText = seg.text
      .replace(/[✦◯△◡▢💡→]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    const utter = new SpeechSynthesisUtterance(cleanText);
    utter.rate = this.rate;
    utter.pitch = 1.0;

    if (this.selectedVoiceURI && this.availableVoices.length > 0) {
      const match = this.availableVoices.find((v) => v.voiceURI === this.selectedVoiceURI);
      if (match) {
        utter.voice = match;
      }
    }

    utter.onend = () => {
      if (currentCallId !== this.utteranceId) return;
      if (this.currentIndex + 1 < this.segments.length) {
        this.currentIndex += 1;
        this.notify();
        this.speakCurrentSegment();
      } else {
        this.stop();
      }
    };

    utter.onerror = (e) => {
      if (e.error === 'canceled' || e.error === 'interrupted') return;
      if (currentCallId !== this.utteranceId) return;
      this.stop();
    };

    window.speechSynthesis.speak(utter);
    this.notify();
  }

  public togglePause() {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    if (!this.isSpeaking) return;

    if (this.isPaused) {
      window.speechSynthesis.resume();
      this.isPaused = false;
      soundEngine.setDucking(true);
      this.notify();
    } else {
      window.speechSynthesis.pause();
      this.isPaused = true;
      soundEngine.setDucking(false);
      this.notify();
    }
  }

  public next() {
    if (!this.isSpeaking) return;
    if (this.currentIndex + 1 < this.segments.length) {
      this.currentIndex += 1;
      this.isPaused = false;
      this.notify();
      this.speakCurrentSegment();
    } else {
      this.stop();
    }
  }

  public prev() {
    if (!this.isSpeaking) return;
    if (this.currentIndex > 0) {
      this.currentIndex -= 1;
      this.isPaused = false;
      this.notify();
      this.speakCurrentSegment();
    } else {
      this.isPaused = false;
      this.speakCurrentSegment();
    }
  }

  public stop() {
    this.utteranceId++;
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    this.isSpeaking = false;
    this.isPaused = false;
    soundEngine.setDucking(false);
    this.notify();
  }
}

export const speechEngine = new WebsiteSpeechEngine();
