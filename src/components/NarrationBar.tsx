import React from 'react';
import {
  Play,
  Pause,
  Square,
  SkipBack,
  SkipForward,
  Volume2,
  Gauge,
} from 'lucide-react';
import { useSpeechState } from '../hooks/useAudioState';
import { speechEngine } from '../services/speechEngine';

const RATES = [0.85, 1.0, 1.15, 1.3];

export const NarrationBar: React.FC = () => {
  const speech = useSpeechState();

  if (!speech.isSpeaking) return null;

  const currentSeg = speech.currentSegment;

  const cycleRate = () => {
    const idx = RATES.indexOf(speech.rate);
    const nextRate = RATES[(idx + 1) % RATES.length];
    speechEngine.setRate(nextRate);
  };

  return (
    <div
      role="region"
      aria-label="Website Read Aloud Player"
      className="fixed bottom-4 left-1/2 z-50 w-[calc(100%-2rem)] max-w-3xl -translate-x-1/2 rounded-2xl border bg-popover/95 p-3.5 shadow-2xl backdrop-blur-xl transition-all"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
            <Volume2 className={`h-5 w-5 ${!speech.isPaused ? 'animate-pulse' : ''}`} />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="font-semibold text-primary">Reading Aloud</span>
              <span>·</span>
              <span className="truncate">{speech.pageTitle}</span>
              <span>·</span>
              <span className="tabular-nums">
                {speech.currentIndex + 1} / {speech.totalSegments}
              </span>
            </div>
            <p className="truncate text-sm font-medium text-foreground">
              {currentSeg ? `${currentSeg.title}: ${currentSeg.text}` : 'Narrating content...'}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between gap-1.5 sm:justify-end shrink-0">
          <button
            type="button"
            onClick={() => speechEngine.prev()}
            disabled={speech.currentIndex === 0}
            aria-label="Previous section"
            className="rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground disabled:opacity-40"
          >
            <SkipBack className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={() => speechEngine.togglePause()}
            aria-label={speech.isPaused ? 'Resume reading' : 'Pause reading'}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground shadow hover:opacity-90"
          >
            {speech.isPaused ? (
              <Play className="h-4 w-4 fill-current" />
            ) : (
              <Pause className="h-4 w-4 fill-current" />
            )}
          </button>

          <button
            type="button"
            onClick={() => speechEngine.next()}
            disabled={speech.currentIndex + 1 >= speech.totalSegments}
            aria-label="Next section"
            className="rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground disabled:opacity-40"
          >
            <SkipForward className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={cycleRate}
            title="Change reading speed"
            className="inline-flex items-center gap-1 rounded-lg border px-2.5 py-1.5 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground tabular-nums"
          >
            <Gauge className="h-3.5 w-3.5" />
            {speech.rate}x
          </button>

          {speech.availableVoices.length > 1 && (
            <select
              aria-label="Select voice"
              value={speech.selectedVoiceURI || ''}
              onChange={(e) => speechEngine.setVoice(e.target.value)}
              className="hidden md:block max-w-[140px] truncate rounded-lg border bg-background px-2 py-1.5 text-xs text-muted-foreground outline-none"
            >
              {speech.availableVoices.map((v) => (
                <option key={v.voiceURI} value={v.voiceURI}>
                  {v.name.replace(/Microsoft |Google /g, '')}
                </option>
              ))}
            </select>
          )}

          <button
            type="button"
            onClick={() => speechEngine.stop()}
            aria-label="Stop reading"
            className="inline-flex items-center gap-1 rounded-lg border border-destructive/40 bg-destructive/10 px-2.5 py-1.5 text-xs font-medium text-destructive hover:bg-destructive/20"
          >
            <Square className="h-3.5 w-3.5 fill-current" />
            Stop
          </button>
        </div>
      </div>
    </div>
  );
};
